import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
        {/* <View className="flex-1 bg-chart4">
            <Text className="text-primary-foreground">Login2</Text>
        </View> */}
      <Login />
    </GluestackUIProvider>
  );
}
