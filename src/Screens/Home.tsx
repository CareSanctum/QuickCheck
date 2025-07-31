import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useLogout } from "../Hooks/Logout.hook";

const Home = () => {
    const { mutate: logout, status: logoutStatus } = useLogout();

    const handleLogout = () => {
        logout();
    }

    return(
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View className="flex-1 items-center justify-center space-y-4">
                <Text className="text-2xl font-bold text-white mb-8">Welcome to QuickCheck</Text>
                
                <Button className="bg-red-500" onPress={handleLogout} isDisabled={logoutStatus === "pending"}>
                    {logoutStatus === "pending" ? <ButtonSpinner /> : <ButtonText className="text-white">Logout</ButtonText>}
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default Home;    