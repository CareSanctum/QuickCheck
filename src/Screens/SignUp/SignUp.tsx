import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone } from "lucide-react-native";
import { useThemeVariables } from "../../components/ThemeVariables";
import { Input, InputSlot, InputField, InputIcon } from "@/components/ui/input";
import { useState } from "react";
import SignupForm from "./SignupForm";

const SignUp = () => {
    const foreground = useThemeVariables('--foreground');
    const mutedForeground = useThemeVariables('--muted-foreground');
    const styles = useSignUpStyles();
    const [showPassword, setShowPassword] = useState(false);
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View style={{gap: 15}}>
                <View className="flex-row items-center">
                    <TouchableOpacity>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center items-center">
                    <Text className="font-semibold text-foreground text-[30px]">Welcome</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">Let's get your account set up</Text>
                </View>

                <View style={{gap: 10}}>
                    <SignupForm />
                </View>

                <View className="flex-row justify-center">
                    <TouchableOpacity className="px-6 py-3 bg-primary w-[75%] h-[50px] items-center justify-center"
                        style= {{borderRadius: 10}}  
                    >
                        <Text className="text-primaryForeground font-medium">
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex justify-center mt-4 items-center">
                    <Text className="font-medium text-mutedForeground text-[16px] ">By creating an account, you agree to our</Text>
                    <TouchableOpacity>
                        <Text className="font-medium text-secondary text-[16px] ">Terms & Conditions</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

function useSignUpStyles() {
    const foreground = useThemeVariables('--foreground');
    return {
        input: {
            color: foreground,
        }
    }
}

export default SignUp;