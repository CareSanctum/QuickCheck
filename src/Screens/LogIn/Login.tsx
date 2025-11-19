import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeVariables } from '../../Components/ThemeVariables';
import LoginForm from './Login.Form';
import ErrorBox from '@/src/Components/ErrorBox';
import { NavigationProp } from '../../App.Navigation';
import { useNavigation } from '@react-navigation/native';
import Header from '@/src/Components/Header';



const Login = () => {
  const foreground = useThemeVariables('--foreground');
  const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
          <KeyboardAwareScrollView
            style={{ flex: 1 }}
            bottomOffset={10}
            keyboardShouldPersistTaps="handled"
          >
            <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main container with padding and spacing */}
          <View style={{gap: 15}}>
            {/* Sign in title */}
            <Header />

            <View className="my-10 justify-center">
              <Text className="font-semibold text-foreground text-[30px]">Welcome Back!</Text>
              <Text className="font-medium text-mutedForeground text-[16px] ">Let's get you back in</Text>
            </View>

            <LoginForm setApiErrorMsg={setApiErrorMsg} />
            {apiErrorMsg && <ErrorBox message={apiErrorMsg} />}
            <View className="flex-row justify-center mt-4">
              <TouchableOpacity 
                className="px-4 py-2 self-end"
                style={{borderRadius: 5}}
                onPress={() => navigation.navigate('ResetPassword')}
               >
                 <Text className="text-secondary font-medium text-lg">Forgot password?</Text>
               </TouchableOpacity>
            </View>
          </View>
          </ScrollView>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      );
}




export default Login;