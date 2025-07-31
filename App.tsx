import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigation } from './src/App.Navigation';
import { AuthProvider, useAuth } from './src/Context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { getItem, KEYS } from './src/Storage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider mode="system">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppScreen />
        </AuthProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
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
  
  // Show loading indicator only when status is pending and a token exists
  if (authStatus === "pending" && token) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }
  
  // For other states (error, success, or pending without a token), render the navigation
  return <AppNavigation />
}
