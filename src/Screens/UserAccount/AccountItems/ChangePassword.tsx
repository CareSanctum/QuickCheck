import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/Components/Header";
import ChangePasswordForm from "./ChangePassword.Form";

const ChangePassword = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header title="Change Password" />
            <ChangePasswordForm />
        </SafeAreaView>
    )
}

export default ChangePassword;