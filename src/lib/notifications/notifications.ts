import { TablesInsert } from '@/src/types/supabase-db.types'
import * as Notifications from 'expo-notifications'
import {Platform} from 'react-native'
import {supabase} from '../../supabase/client'
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { useNotification } from '@/src/Context/ExpoPushNotifcation';
import { Logger} from '@/src/Logger';
import { LogContext } from '@/src/Logger/types';

const logger = Logger.create(LogContext.Notifications);



/** 
 * Register the Push Token with Supabase Server
 */
async function registerTokenInSupabase(pushToken: string, user_id: string) {
    logger.debug('Registering push token with Supabase', { 
        userId: user_id, 
        platform: Platform.OS,
        token: pushToken
    });
    try{
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
        const TableInput: TablesInsert<'expo_push_tokens'> = {
            push_token: pushToken,
            platform: Platform.OS === 'android' ? 'android' : 'ios',
            user_id: user_id,
            is_active: true,
            project_id: projectId,
        }
        const {error} = await supabase.from('expo_push_tokens').upsert(TableInput, {onConflict: 'project_id, push_token'})
        if (error) {
            logger.error('Failed to register push token with Supabase', { error, userId: user_id });
            throw error
        }
        logger.info('Push token successfully registered with Supabase', { userId: user_id });
    }catch (error)  {
        logger.error('Error Registering Push Token with Supabase', { error });
        throw error;
    }
}

async function _supabase_unregisterPushToken() {

}

/**
 * Effecrt for getting and registering push token with supabase server
 */

export function useGetandRegisterPushToken() {
    const { expoPushToken } = useNotification();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        logger.debug("Setting up native auth listener for push token hook");
    
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          const newUserId = session?.user?.id ?? null;
          logger.info("Native auth state changed", { event, newUserId });
          setUserId(newUserId);
        });
    
        // initial user resolve
        supabase.auth.getUser().then(({ data: userData, error }) => {
          if (error) {
            logger.error("Error getting initial user for push token hook", {
              error,
            });
            return;
          }
          const initialUserId = userData.user?.id ?? null;
          logger.info("Initial native user for push token hook", {
            initialUserId,
          });
          setUserId(initialUserId);
        });
    
        return () => {
          data.subscription.unsubscribe();
        };
      }, []);
      
    useEffect(() => {
        if (!expoPushToken || !userId) return;
    
        logger.debug('Starting push token sync', { userId });
        let tokenListener: Notifications.Subscription | undefined;
    
        async function sync(currentUserId: string, currentToken: string) {
          logger.debug('Syncing push token', { userId: currentUserId });
          await registerTokenInSupabase(currentToken, currentUserId);
    
          // listen for token refresh
          logger.debug('Setting up push token refresh listener', { userId: currentUserId });
          tokenListener = Notifications.addPushTokenListener(async (token) => {
            const newTokenString = token.data;
            logger.info('Push token refreshed, re-registering', { userId: currentUserId });
            await registerTokenInSupabase(newTokenString, currentUserId);
          });
          logger.info('Push token sync completed and listener active', { userId: currentUserId });
        }
    
        sync(userId, expoPushToken);
    
        return () => {
          if (tokenListener) tokenListener.remove();
        };
      }, [expoPushToken, userId]);
}