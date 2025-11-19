import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../../Components/Icon';
import ResetPasswordForm from './ResetPassword.Form';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../App.Navigation';
import { AlertTriangle, ArrowLeft } from 'lucide-react-native';
import { useThemeVariables } from '@/src/Components/ThemeVariables';
import ErrorBox from '@/src/Components/ErrorBox';

const API_ERROR_MESSAGES = {
    STATUS_429: "Too many requests. Please try again later.",
    STATUS_500: "An error occurred. Please try again later.",
    STATUS_400: "Invalid email address. Please try again later",
}

const ResetPassword = () => {
    const navigation = useNavigation<NavigationProp>();
    const foreground = useThemeVariables('--foreground');
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
        return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View style={{gap: 15}}>
                <View className="flex-row items-center gap-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">Reset Password</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">We'll email you instructions on how to reset your password</Text>
                </View>

                <ResetPasswordForm setApiErrorMsg={setApiErrorMsg} />
                {apiErrorMsg && <ErrorBox message={apiErrorMsg} />}
            </View>

            
        </SafeAreaView>
  );
};



export default ResetPassword;