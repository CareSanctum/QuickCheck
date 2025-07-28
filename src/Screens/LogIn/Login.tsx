import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../Components/Icon';
import { useThemeVariables } from '../../Components/ThemeVariables';
import LoginForm from './LoginForm';



const Login = () => {
  const mutedForeground = useThemeVariables('--muted-foreground');
  const foreground = useThemeVariables('--foreground');
  const [showPassword, setShowPassword] = useState(true);
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
          {/* Main container with padding and spacing */}
          <View style={{gap: 15}}>
            {/* Sign in title */}
            <View className="flex-row items-center gap-4">
              <TouchableOpacity>
                <Icon
                  name="ArrowLeft"
                  className="text-foreground"
                  size={26}
                />
              </TouchableOpacity>
            </View>

            <View className="my-10 justify-center items-center">
              <Text className="font-semibold text-foreground text-[30px]">Welcome Back</Text>
            </View>

            <LoginForm />
            
            <View className="flex-row justify-center mt-4">
              <TouchableOpacity 
                className="px-4 py-2 self-end"
                style={{borderRadius: 5}}
               >
                 <Text className="text-secondary font-medium text-lg">Forgot password?</Text>
               </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
}




export default Login;