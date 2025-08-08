import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import {  useNavigation } from '@react-navigation/native';
import { useThemeVariables } from "../Components/ThemeVariables";
import { NavigationProp } from "../App.Navigation";

const Welcome = () => {
    const navigation = useNavigation<NavigationProp>();
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const primaryForeground = useThemeVariables('--primary-foreground');

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    const handleSignupPress = () => {
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            {/* Centered Content */}
            <View className="flex-1 justify-center items-center">
                <View className="items-center" style={{ gap: 32 }}>
                    {/* CareSanctum Text */}
                    <View className="items-center">
                        <Text className="text-center font-bold text-[48px] text-foreground">
                            CareSanctum
                        </Text>
                    </View>
                </View>
            </View>

            {/* Bottom Buttons */}
            <View className="w-full gap-4 items-center">
                <Button
                    className="items-center justify-center  h-[56px] bg-primary w-[90%]"
                    onPress={handleLoginPress}
                    style={{borderRadius: 10}} 
                >
                    <ButtonText className="font-semibold text-[16px] text-primaryForeground">
                        Login
                    </ButtonText>
                </Button>
                
                <Button
                    className="items-center justify-center  h-[56px] bg-secondary w-[90%]"
                    onPress={handleSignupPress}
                    style={{borderRadius: 10}} 
                >
                    <ButtonText className="font-semibold text-[16px] text-secondaryForeground">
                        Sign Up
                    </ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    );
}

export default Welcome;