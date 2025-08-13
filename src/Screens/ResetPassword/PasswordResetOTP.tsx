import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { OtpInput } from "react-native-otp-entry";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { ArrowLeft } from "lucide-react-native";
import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from "../../App.Navigation";
import { useVerifyCode } from "../../Hooks/Password.hook";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import * as SecureStore from 'expo-secure-store';
import { setItem, KEYS } from "@/src/Storage";
import { ErrorBox } from "@/src/Components/ErrorBox";
import { OTP } from "@/src/Components/OTP";

const PasswordResetOTP = () => {
    const foreground = useThemeVariables('--foreground');
    const styles = useOTPStyles();
    const [code, setCode] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const { mutate: verifyCode, status: verifyCodeStatus, error: verifyCodeError } = useVerifyCode();
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
    const [disableReset, setDisableReset] = useState< boolean>(false);

    async function onSubmit(code: string){
        verifyCode(code, {
            onSuccess: async () => {
                setItem(KEYS.PASSWORD_RESET_KEY, code);
                setCode("");
                console.log('Verification code successful');
                navigation.navigate('NewPassword');
            },
            onError: (error: any) => {
                console.log(error);
                setCode("");
                switch (error?.response?.status) {
                    case 409:
                        setDisableReset(true);
                        setApiErrorMsg("The code is expired now. Please try again later.");
                        break;
                    case 400:
                        setApiErrorMsg("The code is invalid now. Please try again later.");
                        break;
                    case 500:
                        setApiErrorMsg("Something went wrong. Please try again later.");
                        break;
                    default:
                        setApiErrorMsg("Something went wrong. Please try again later.");
                        break;
                }
            }
        });
    }
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <OTP onSubmit={onSubmit} code={code} setCode={setCode} disableReset={disableReset} verifyCodeStatus={verifyCodeStatus} apiErrorMsg={apiErrorMsg} PageTitle="Verification Code" PageSubtitle="Enter the 5 digit code sent to your email" />
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

function useOTPStyles() {
    const foreground = useThemeVariables('--foreground');
    const mutedForeground = useThemeVariables('--muted-foreground');
    const secondary = useThemeVariables('--secondary');
    const styles = StyleSheet.create({
        OTPContainer: {
            gap: 15,
            width: "auto",
            
            
        },
        pinCodeContainerStyle: {
            height: 50,
            width: 45,
            borderColor: mutedForeground,
        },
        pinCodeTextStyle: {
            color: foreground,
        },
        focusedPinCodeContainerStyle: {
            borderColor: secondary,
        },
        focusStickStyle:{
            backgroundColor: secondary,
        },
        filledPinCodeContainerStyle: {
            borderColor: foreground,
        }
    })
    return styles;
  }
export default PasswordResetOTP;