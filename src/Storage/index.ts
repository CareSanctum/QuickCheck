import { MMKV } from 'react-native-mmkv';
import { logger } from '../Logger';
import type { SupportedStorage } from "@supabase/supabase-js";

const storage = new MMKV({id: 'session-storage'});

function setItem(key: string, value: any) {
    logger.debug(`Setting KV pair: ${key}: ${value}`);
    storage.set(key, value)
}

function getItem(key: string) {
    const value = storage.getString(key) ?? null;   
    logger.debug(`Getting KV pair: ${key}: ${value}`);
    return value;
}

function removeItem(key: string) {
    logger.debug(`Removing KV pair: ${key}`);
    storage.delete(key);
}

function removeMany(keys: string[]){
    keys.forEach(key => {
        removeItem(key);
    });
}

export const MMKV_SUPABASE: SupportedStorage = {
    setItem,
    getItem,
    removeItem
}

const KEYS = {
    SESSION_TOKEN: 'SESSION_TOKEN',
    PASSWORD_RESET_KEY: 'PASSWORD_RESET_KEY',
    PASSWORD_RESET_TOKEN: 'PASSWORD_RESET_TOKEN',
    AUTHENTICATION_STATUS: 'AUTHENTICATION_STATUS', 
    USER_DATA: 'USER_DATA',
    SIGNUP_BONUS_SEEN: 'SIGNUP_BONUS_SEEN',
}

export { setItem, getItem, removeItem, removeMany, KEYS };
