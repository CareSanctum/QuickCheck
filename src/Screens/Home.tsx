import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useLogout } from "../Hooks/Logout.hook";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
const Home = () => {
    const { mutate: logout, status: logoutStatus } = useLogout();
    const navigation = useNavigation<NavigationProp>();

    const handleLogout = () => {
        logout();
    }

    const handleWalletPress = () => {
        navigation.navigate('Wallet');
    }

    return(
        <SafeAreaView className="flex-1 p-5 bg-background">
            <View className="flex-1 items-center justify-center space-y-4">
                <Button className="bg-primary" onPress={handleWalletPress}>
                    <ButtonText className="text-white">Go to Wallet</ButtonText>
                </Button>
                
                <Button className="bg-red-500" onPress={handleLogout} isDisabled={logoutStatus === "pending"}>
                    {logoutStatus === "pending" ? <ButtonSpinner /> : <ButtonText className="text-white">Logout</ButtonText>}
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default Home;    