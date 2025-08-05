import { View, Text, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootStackParamList } from '../../App.Navigation';
import { useThemeVariables } from "../../Components/ThemeVariables";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem, KEYS } from "@/src/Storage";

export const PasswordResetSuccess = () => {
    const navigation = useNavigation<NavigationProp>();
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const secondary = useThemeVariables('--secondary');
    console.log('Password Reset key', getItem(KEYS.PASSWORD_RESET_KEY));
    console.log('Password Reset token', getItem(KEYS.PASSWORD_RESET_TOKEN));
    const handleDonePress = () => {
        // Navigate back to reset password screen
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView className="flex-1 p-5 bg-background">
            {/* Centered Content */}
            <View className="flex-1 justify-center items-center">
                <View className="items-center" style={{ gap: 32 }}>
                    {/* Checkmark Icon */}
                    <View className="items-center">
                        <View 
                            className="items-center justify-center rounded-full w-[100px] h-[100px] bg-primary"
                        >
                            <Check size={50} color={primaryForeground} strokeWidth={3} />
                        </View>
                    </View>

                    {/* Success Text */}
                    <View className="items-center" style={{ gap: 8 }}>
                        <Text 
                            className="text-center font-semibold text-[28px] text-foreground mt-6"
                        >
                            All done
                        </Text>
                        <Text className="text-center text-[16px] font-semibold leading-6 mt-2 text-foreground">
                            Congratulations! Your password has been successfully reset.
                        </Text>
                    </View>
                </View>
            </View>

            {/* Bottom Button */}
            <View className="w-full">
                <TouchableOpacity
                    className="items-center justify-center rounded-full h-[56px] bg-primary w-full"
                    onPress={handleDonePress}
                >
                    <Text className="font-semibold text-[16px] text-primaryForeground">
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PasswordResetSuccess;
