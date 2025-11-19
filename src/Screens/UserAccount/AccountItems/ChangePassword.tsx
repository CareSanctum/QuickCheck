import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/Components/Header";
import ChangePasswordForm from "./ChangePassword.Form";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const ChangePassword = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header title="Change Password" />
            <KeyboardAwareScrollView bottomOffset={10} keyboardShouldPersistTaps="handled">
                <ChangePasswordForm/>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default ChangePassword;