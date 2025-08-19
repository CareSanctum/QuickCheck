import { CheckCircle } from "lucide-react-native";
import { Text, View } from "react-native";
import { useThemeVariables } from "./ThemeVariables";

const SuccessBox = ({message}: {message: string}) => {
    const successForeground = useThemeVariables('--success-foreground');
    return (
        <View className="flex-row items-center bg-success px-4 py-3 mt-auto rounded-[10px]">
            <CheckCircle color={successForeground} size={20}/>
            <Text 
                className="text-successForeground text-base ml-2 font-medium flex-1 flex-wrap"
                numberOfLines={0}
            >
                {message}
            </Text>
        </View>
    )
}

export default SuccessBox;