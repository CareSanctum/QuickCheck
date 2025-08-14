import { CheckCircle } from "lucide-react-native";
import { View } from "react-native";
import { Text } from "react-native";
import { useThemeVariables } from "./ThemeVariables";


const SuccessBox = ({message}: {message: string}) => {
    const primaryForeground = useThemeVariables('--primary-foreground');
    return (
        <View className="flex-row items-center bg-green-500 px-4 py-3 mt-auto rounded-[10px]">
            <CheckCircle color={primaryForeground} size={20} className="text-primaryForeground" />
            <Text className="text-primaryForeground text-[16px] ml-2 font-semibold flex-1 flex-wrap">
                {message}
            </Text>
        </View>
    )
}

export default SuccessBox;