import { AlertTriangle } from "lucide-react-native"
import { Text, View } from "react-native"   
import { useThemeVariables } from "./ThemeVariables";

 const ErrorBox = ({message}: {message: string}) => {
    const destructiveForeground = useThemeVariables('--destructive-foreground');
    return (
        <View className="flex-row items-center bg-destructive px-4 py-3 mt-auto rounded-[10px]">    
            <AlertTriangle color={destructiveForeground} size={20} />
            <Text 
                className="text-destructiveForeground text-base ml-2 font-medium flex-1 flex-wrap"
                numberOfLines={0}
            >
                {message}
            </Text>
        </View>
    )
}

export default ErrorBox;