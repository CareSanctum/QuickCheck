import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../Components/Icon';
import { useThemeVariables } from '../../Components/ThemeVariables';
import LoginForm from './Login.Form';
import { ErrorBox } from '@/src/Components/ErrorBox';
import { NavigationProp } from '../../App.Navigation';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { getItem, KEYS } from '@/src/Storage';



const Login = () => {
  const foreground = useThemeVariables('--foreground');
  const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
  const navigation = useNavigation<NavigationProp>();
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
          {/* Main container with padding and spacing */}
          <View style={{gap: 15}}>
            {/* Sign in title */}
            <View className="flex-row items-center gap-4">
              <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowLeft color={foreground} size={26} />
              </TouchableOpacity>
            </View>

            <View className="my-10 justify-center items-center">
              <Text className="font-semibold text-foreground text-[30px]">Welcome Back</Text>
            </View>

            <LoginForm setApiErrorMsg={setApiErrorMsg} />
            
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
          </KeyboardAvoidingView>

          {apiErrorMsg && <ErrorBox errorMsg={apiErrorMsg} />}
        </SafeAreaView>
      );
}




export default Login;