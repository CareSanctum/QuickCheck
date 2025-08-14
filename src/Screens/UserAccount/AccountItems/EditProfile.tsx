import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/src/Components/Header";
import EditProfileForm from "./EditProfile.Form";

const EditProfile = () => {
    return (
        <SafeAreaView className="flex-1 bg-background">
            <Header title="Edit Profile" />
            <EditProfileForm />
        </SafeAreaView>
    );
};

export default EditProfile;
