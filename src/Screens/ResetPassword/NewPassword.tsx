import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Lock } from "lucide-react-native";
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { useThemeVariables } from "../../Components/ThemeVariables";
import { useState } from "react";
import { NewPasswordForm } from "./NewPassword.Form";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { ErrorBox } from "@/src/Components/ErrorBox";

const NewPassword = () => {
    const foreground = useThemeVariables('--foreground');
    const navigation = useNavigation<NavigationProp>();
    const [apiErrorMsg, setApiErrorMsg] = useState<string>("");
    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{gap: 15}}>
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color={foreground} size={26} />
                    </TouchableOpacity>
                </View>

                <View className="my-10 justify-center">
                    <Text className="font-semibold text-foreground text-[30px]">Update Password</Text>
                    <Text className="font-medium text-mutedForeground text-[16px] ">Enter your new password</Text>
                </View>

                <NewPasswordForm setApiErrorMsg={setApiErrorMsg} />
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
            {apiErrorMsg && <ErrorBox errorMsg={apiErrorMsg} />}
        </SafeAreaView>
    );
}

function useLoginStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
      input: {
        color: foreground,
        fontSize: 16,
        fontWeight: '500',
      }
    })
  }

export default NewPassword;