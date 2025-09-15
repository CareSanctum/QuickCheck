import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import SVGComponent from "../Components/Icons/SvgLogo";
import { Button, ButtonText } from "@/components/ui/button";
import {  useNavigation } from '@react-navigation/native';
import { useThemeVariables } from "../Components/ThemeVariables";
import { NavigationProp } from "../App.Navigation";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DecorativeShapes from "../Components/DecorativeShapes";

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
    const {top, bottom} = useSafeAreaInsets();

    return (
        <View className="flex-1">
            {/* Centered Content */}
            <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={[ '#A93EAC',  '#C24CB7', '#FE6ED0']}
                // colors={['#000000', '#3D007D']}
                style={{flex: 1}}
            >

                {/* 2) Add subtle shapes behind content */}
                <DecorativeShapes />

                <View className="flex-1 justify-center items-center">
                    <View className="items-center" style={{ gap: 32 }}>
                        <SVGComponent />
                    </View>
                </View>

                {/* Bottom Buttons */}
                <View className="w-full gap-4 items-center" style={{paddingBottom: bottom*4}}>
                    <Button
                        className="items-center justify-center h-[56px] bg-secondary w-[90%] rounded-full"
                        onPress={handleSignupPress}
                    >
                        <ButtonText className="font-semibold text-[16px] text-secondaryForeground">
                            Sign Up
                        </ButtonText>
                    </Button>
                    <Button
                        className="items-center justify-center h-[56px] bg-transparent w-[90%] rounded-full"
                        onPress={handleLoginPress}
                    >
                        <ButtonText className="font-semibold text-xl text-primaryForeground">
                            Login
                        </ButtonText>
                    </Button>
                </View>
            </LinearGradient>
        </View>
    );
}

export default Welcome;