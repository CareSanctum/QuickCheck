import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeVariables } from "../../Components/ThemeVariables";
import { useState } from "react";
import SignupForm from "./Signup.Form";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.Navigation";
import Header from "@/src/Components/Header";

const SignUp = () => {
    const foreground = useThemeVariables('--foreground');
    const mutedForeground = useThemeVariables('--muted-foreground');
    const styles = useSignUpStyles();
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
            <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
                <View style={{gap: 15}}>
                    <Header />

                    <View className="my-10 justify-center">
                        <Text className="font-semibold text-foreground text-[30px]">Welcome</Text>
                        <Text className="font-medium text-mutedForeground text-[16px] ">Let's get your account set up</Text>
                    </View>

                    <View style={{gap: 10}}>
                        <SignupForm />
                    </View>

                    <View className="flex justify-center mt-4 items-center">
                        <Text className="font-base text-foreground text-[16px] ">By creating an account, you agree to our</Text>
                        <TouchableOpacity>
                            <Text className="font-medium text-secondary text-[16px] ">Terms & Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>
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