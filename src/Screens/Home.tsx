import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useLogout } from "../Hooks/Logout.hook";
const Home = () => {
    const { mutate: logout, status: logoutStatus } = useLogout();

    const handleLogout = () => {
        logout();
    }

    return(
        <SafeAreaView className="flex-1 p-5 bg-background items-center justify-center">
            <Button className="bg-primary" onPress={handleLogout} isDisabled={logoutStatus === "pending"}>
                {logoutStatus === "pending" ? <ButtonSpinner /> : <ButtonText className="text-white">Logout</ButtonText>}
            </Button>
        </SafeAreaView>
    );
}

export default Home;    