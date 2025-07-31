import { ArrowLeft } from "lucide-react-native";
import { View, TouchableOpacity } from "react-native";
import { useThemeVariables } from "./ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
import { tva } from "@gluestack-ui/nativewind-utils/tva";

const headerStyle = tva({
    base: 'flex-row items-center gap-4',
  });
  
interface HeaderProps {
    title?: string;
    onBackPress?: () => void;
    className?: string;
}

const Header = ({ title, onBackPress, className }: HeaderProps) => {
    const foreground = useThemeVariables('--foreground');
    const navigation = useNavigation<NavigationProp>();
    return (
        <View className={headerStyle({ class: className })}>
            <TouchableOpacity onPress={onBackPress ? onBackPress : () => navigation.goBack()}>
                <ArrowLeft color={foreground} size={26} />
            </TouchableOpacity>
        </View>   
    );
}

export default Header;