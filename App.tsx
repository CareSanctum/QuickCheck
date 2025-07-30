import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screens/Login';
import ResetPassword from './src/Screens/ResetPassword';
import NewPassword from './src/Screens/NewPassword';
import PasswordResetOTP from './src/Screens/PasswordResetOTP';
import SignUp from './src/Screens/SignUp/SignUp';
import Payments from './src/Screens/Payments';

export default function App() {
  return (
    <GluestackUIProvider mode="dark">
     <Payments />
    </GluestackUIProvider>
  );
}
