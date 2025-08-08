import { View, ActivityIndicator} from "react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";

export const LoadingScreen = () => {
    const secondary = useThemeVariables('--secondary');
    const { colorScheme } = useColorScheme();
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={secondary} />
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} /> 
        </View>
    )
}