import { SafeAreaView } from "react-native-safe-area-context";
import { OTP } from "@/src/Components/OTP";
import { useVerifyEmail } from "@/src/Hooks/Signup.hook";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useResendEmailVerificationCode } from "@/src/Hooks/Signup.hook";

interface SignUpOTPProps {
    route: {
        params: {
            userEmail?: string;
        };
    };
}
const SignupVerifyOTP: React.FC<SignUpOTPProps> = ({route}) => {
    const {mutate: verifyEmail, status: verifyEmailStatus, error: verifyEmailError} = useVerifyEmail();
    const {mutate: resendEmailVerificationCode, status: resendEmailVerificationCodeStatus, error: resendEmailVerificationCodeError} = useResendEmailVerificationCode();
    const [disableReset, setDisableReset] = useState< boolean>(false);
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
    const [apiSuccessMsg, setApiSuccessMsg] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const {userEmail} = route.params;

    const handleTryAgain = () => {
        resendEmailVerificationCode(undefined, {
            onSuccess: () => {
                setApiSuccessMsg("Code resent successfully. Please check your email.");
                setApiErrorMsg("");
            },

            onError: (error: any) => {
                setApiSuccessMsg("");
                setApiErrorMsg("Something went wrong. Please try again later.");
                switch(error?.response?.status){
                    case 429:
                        setDisableReset(true);
                        setApiErrorMsg("Too many requests. Please try again later.");
                        break;
                    case 409:
                        setApiErrorMsg("You have tried too many times. Please try again later.");
                        break;
                    case 500:
                        setApiErrorMsg("Something went wrong. Please try again later.");
                        break;
                }
            }
        });
    }

    async function onSubmit(key: string){
        verifyEmail({key}, {
            onSuccess: () => {
                console.log("Email verified");
                setKey("");
            }, 
            onError: (error: any) => {
                console.log(error);
                setApiErrorMsg("Something went wrong. Please try again later.");
                switch(error?.response?.status){
                    case 429:
                        setDisableReset(true);
                        setApiErrorMsg("Too many requests. Please try again later.");
                        break;
                    case 400:
                        setApiErrorMsg("The code is invalid or expired now. Please try again later.");
                        break;
                    case 409:
                        setApiErrorMsg("The code is invalid. Please try again later.");
                }
            }
        });
    }
    return(
        <SafeAreaView className="flex-1 p-5 bg-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            <OTP 
                onSubmit={onSubmit} 
                code={key} 
                setCode={setKey} 
                disableReset={disableReset} 
                verifyCodeStatus={verifyEmailStatus} 
                apiErrorMsg={apiErrorMsg} 
                apiSuccessMsg={apiSuccessMsg}
                PageTitle="Verification Code" 
                PageSubtitle={`Enter the 5 digit code sent to ${userEmail} to verify your email` }
                onTryAgainPress={handleTryAgain}
                onTryAgainPressStatus={resendEmailVerificationCodeStatus}
            />
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default SignupVerifyOTP;