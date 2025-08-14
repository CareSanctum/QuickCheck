import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView, Platform } from "react-native";
import Header from "@/src/Components/Header";
import EditProfileForm from "./EditProfile.Form";

interface EditProfileProps {
    onBackPress: () => void;
}

const EditProfile = ({ onBackPress }: EditProfileProps) => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header title="Edit Profile" onBackPress={onBackPress} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
            >
                <EditProfileForm />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditProfile;
