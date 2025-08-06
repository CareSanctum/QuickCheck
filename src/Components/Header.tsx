import { ChevronLeft } from "lucide-react-native";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useThemeVariables } from "./ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, EllipsisVertical } from "lucide-react-native";
import { useWalletBalance } from "@/src/Hooks/Wallet.hook";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

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
                <ChevronLeft color={foreground} size={26} />
            </TouchableOpacity>
        </View>   
    );
}

const HomeHeaderStyle = tva({
    base: 'flex-row justify-between px-6 py-2',
});

interface HomeHeaderProps {
    title?: string;
    className?: string;
    showWallet?: boolean;
}
export const HomeHeader = ({ className, showWallet = true, title = 'CareSanctum' }: HomeHeaderProps) => {
    const foreground = useThemeVariables('--foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const { data: walletData, status: walletStatus, error: walletError } = useWalletBalance();
    return (
        <View className={HomeHeaderStyle({ class: className })}>
            <Text className="text-2xl font-bold text-foreground">{title}</Text>
            {showWallet && <LinearGradient 
                colors={["#3d007d", "#fe6ed0"]} 
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="" 
                style={{borderRadius: 15, borderWidth: 0.5, borderColor: foreground}}
            >
                <View className="flex-row items-center gap-2 px-4 py-1">
                    <Wallet color={primaryForeground} size={20} />
                    {walletStatus === 'pending' ? (
                        <ActivityIndicator size="small" color={primaryForeground} />
                    ) : (
                        <Text className="text-primaryForeground font-semibold">₹{walletData?.balance?.toFixed(2) || '0.00'}</Text>
                    )}
                </View>
            </LinearGradient>}
        </View>
    )
}

const QuickCheckHeaderStyle = tva({
    base: 'flex-row items-center justify-between px-4 py-4',
});

interface QuickCheckHeaderProps {
    name?: string;
    onBackPress?: () => void;
    onMenuPress?: () => void;
    className?: string;
}

const QuickCheckHeader = ({ name = "Dad", onBackPress, onMenuPress, className }: QuickCheckHeaderProps) => {
    const foreground = useThemeVariables('--foreground');
    const navigation = useNavigation<NavigationProp>();
    
    const handleBackPress = onBackPress || (() => navigation.goBack());
    const handleMenuPress = onMenuPress || (() => console.log('Menu pressed'));
    
    return (
        <View className={QuickCheckHeaderStyle({ class: className })}>
            {/* Back Button */}
            <TouchableOpacity onPress={handleBackPress}>
                <ChevronLeft color={foreground} size={24} />
            </TouchableOpacity>
            
            {/* Center Content - Avatar and Name */}
            <View className="flex-row items-center flex-1 justify-center">
                <Avatar size="sm" className="bg-primary mr-2">
                    <AvatarFallbackText className="text-foreground text-sm">
                        {name}
                    </AvatarFallbackText>
                </Avatar>
                <Text className="text-foreground text-lg font-medium">
                    {name}
                </Text>
            </View>
            
            {/* Kebab Menu */}
            <TouchableOpacity onPress={handleMenuPress}>
                <EllipsisVertical color={foreground} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export { QuickCheckHeader };
export default Header;