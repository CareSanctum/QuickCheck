import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigation } from './src/App.Navigation';

const queryClient = new QueryClient();

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
        <AppNavigation />
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}
