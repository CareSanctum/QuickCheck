import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { OtpInput } from "react-native-otp-entry";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { ArrowLeft } from "lucide-react-native";
import { useState, useRef } from "react";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from "../../App.Navigation";
const PasswordResetOTP = () => {
    const foreground = useThemeVariables('--foreground');
    const styles = useOTPStyles();
    const [code, setCode] = useState('');
    const navigation = useNavigation<NavigationProp>();
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View style={{gap: 15}}>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">Verification Code</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">Enter the 5 digit code sent to your email</Text>
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
                    <TouchableOpacity 
                        className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center" 
                        style= {{borderRadius: 10}}  
                    >
                        <Text className="text-primaryForeground font-medium">
                            Verify Code
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex-row justify-center mt-4">
                <Text className="font-medium text-mutedForeground text-[16px] ">Didn't receive the code?</Text>
            </View>
            <TouchableOpacity className="flex-row justify-center">
                <Text className="font-medium text-secondary text-[16px] ">Try again</Text>
            </TouchableOpacity>
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