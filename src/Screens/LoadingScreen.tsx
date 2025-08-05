import { View, ActivityIndicator } from "react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
const LoadingScreen = () => {
    const secondary = useThemeVariables('--secondary');
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={secondary} />
        </View>
    )
}
export default LoadingScreen;