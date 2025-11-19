import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigation } from './src/App.Navigation';
import { AuthProvider, useAuth } from './src/Context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { LoadingScreen as LoadingScreenComponent } from './src/Screens/LoadingScreen';
import { getItem, KEYS } from './src/Storage';
import { useColorScheme } from 'nativewind';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ToastOutlet } from './src/Components/ui/Toast';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { focusManager } from '@tanstack/react-query';
import type { AppStateStatus } from 'react-native';
import { NotificationProvider } from './src/Context/ExpoPushNotifcation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Webview from './src/Screens/Webview';
import SetTracker from './src/Screens/SetTracker';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider mode="light">
      <KeyboardProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NotificationProvider>
                <BottomSheetModalProvider> 
                  <SafeAreaProvider>
                    {/* <AppScreen /> */}
                    <SetTracker />
                    <ToastOutlet />
                  </SafeAreaProvider>
                </BottomSheetModalProvider>
              </NotificationProvider>
            </GestureHandlerRootView>
          </AuthProvider>
        </QueryClientProvider>
      </KeyboardProvider>
    </GluestackUIProvider>
    // <Webview />
  );
}

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" className="text-primary" />
    </View>
  )
}

const AppScreen = () => {
  const { authStatus } = useAuth();
  const token = getItem(KEYS.SESSION_TOKEN);
  const { colorScheme } = useColorScheme();

  // App focus management for React Query
  useEffect(() => {
    const onAppStateChange = (status: AppStateStatus) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

  // Show loading indicator only when status is pending and a token exists
  if (authStatus === "pending" && token) {
    return <LoadingScreenComponent />
  }

  // For other states (error, success, or pending without a token), render the navigation
  return (
    <>
        <AppNavigation />
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  )
}
