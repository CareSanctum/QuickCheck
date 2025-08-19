import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useThemeVariables } from "./ThemeVariables";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { OtpInput } from "react-native-otp-entry";
import { useState } from "react";
import { NavigationProp } from "../App.Navigation";
import { useNavigation } from "@react-navigation/native";
import ErrorBox from "./ErrorBox";

interface OTPProps {
    onSubmit: (code: string) => void;
    code: string;
    setCode: (code: string) => void;
    disableReset: boolean;
    verifyCodeStatus: 'idle' | 'pending' | 'success' | 'error';
    apiErrorMsg: string;
    PageTitle: string;
    PageSubtitle: string;
    onTryAgainPress: () => void;
}

export const OTP = ({onSubmit, code, setCode, disableReset, verifyCodeStatus, apiErrorMsg, PageTitle, PageSubtitle, onTryAgainPress}: OTPProps) => {
    const foreground = useThemeVariables('--foreground');
    const navigation = useNavigation<NavigationProp>();
    const styles = useOTPStyles();
    return(
        <>
            <View style={{gap: 15}}>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">{PageTitle}</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">{PageSubtitle}</Text>
                </View>
                <View style={{alignItems: "center"}}>
                    <OtpInput 
                        numberOfDigits={5}
                        type="alphanumeric"
                        onTextChange={(text) => setCode(text.toUpperCase())}
                        textInputProps={{
                            autoCapitalize: "characters",
                        }}
                        theme={{
                            containerStyle: styles.OTPContainer,
                            pinCodeContainerStyle: styles.pinCodeContainerStyle,
                            pinCodeTextStyle: styles.pinCodeTextStyle,
                            focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
                            focusStickStyle: styles.focusStickStyle,
                            filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
                        }}
                    />
                </View>

                <View className="flex-row justify-center"> 
                    <Button className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-primary" 
                        style={{borderRadius: 10}} 
                        onPress={() => onSubmit(code)}
                        isDisabled={code.length != 5 || disableReset || verifyCodeStatus === 'pending'}
                    >
                        {
                            verifyCodeStatus === 'pending' ? 
                                <ButtonSpinner className="text-primaryForeground" /> : 
                                <ButtonText className="text-primaryForeground font-medium">Verify Code</ButtonText>
                        }
                    </Button>
                </View>
            </View>

            <View className="flex-row justify-center mt-4">
                <Text className="font-medium text-mutedForeground text-[16px] ">Didn't receive the code?</Text>
            </View>
            <TouchableOpacity className="flex-row justify-center" onPress={onTryAgainPress}>
                <Text className="font-medium text-secondary text-[16px] ">Try again</Text>
            </TouchableOpacity>
            {apiErrorMsg && <ErrorBox message={apiErrorMsg} />}
        </>
    );
}

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