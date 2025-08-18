import { ChevronLeft } from "lucide-react-native";
import { View, TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { useThemeVariables } from "./ThemeVariables";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
import { LinearGradient } from "expo-linear-gradient";
import { Wallet, EllipsisVertical, Phone } from "lucide-react-native";
import { useWalletBalance } from "@/src/Hooks/Wallet.hook";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";

const headerStyle = tva({
    base: 'flex-row items-center px-4 py-2',
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
                <ChevronLeft color={foreground} size={22} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-foreground ml-2">{title}</Text>
        </View>   
    );
}

const HomeHeaderStyle = tva({
    base: 'flex-row justify-between px-4 py-2',
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
                        <Text className="text-primaryForeground font-semibold">{walletData?.balance?.toFixed(2) || '0.00'}</Text>
                    )}
                </View>
            </LinearGradient>}
        </View>
    )
}

import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";
import { UserPen } from "lucide-react-native";
interface QuickCheckHeaderProps {
    name?: string;
    phone?: string;
    onBackPress?: () => void;
    onMenuPress?: () => void;
    onEditPress?: () => void;
    className?: string;
    style?: StyleProp<ViewStyle>;
  }
  
  const QuickCheckHeaderStyle = tva({
    base: [
      'bg-card rounded-b-[28px] mb-1 border border-border',
      'shadow-lg',
    ],
  });
  
  const QuickCheckHeader = ({
    name = 'Dad',
    phone = '+911823344567',
    onBackPress,
    onMenuPress,
    onEditPress,
    className,
    style,
  }: QuickCheckHeaderProps) => {
    const navigation = useNavigation<NavigationProp>();
    const handleBack = onBackPress ?? (() => navigation.goBack());
    const handleMenu = onMenuPress ?? (() => console.log('Menu pressed'));
  
    const foreground = useThemeVariables('--foreground');
    const mutedForeground = useThemeVariables('--muted-foreground');
    const primaryForeground = useThemeVariables('--primary-foreground');
    
    return (
      <View className={QuickCheckHeaderStyle({ class: className })} style={style}>
        <View className="flex-row justify-between items-center px-4 py-2 mb-8">
            <TouchableOpacity onPress={handleBack} className="">
              <ChevronLeft color={foreground} size={26} />
            </TouchableOpacity>
            <View className="flex-row items-center gap-2">
                <Button className="bg-primary rounded-full px-4 shadow-md" onPress={onEditPress}>
                    <ButtonIcon as= {UserPen} color={primaryForeground} size="sm"/>
                    <ButtonText className="text-primaryForeground text-sm font-semibold">
                        Edit
                    </ButtonText>
                </Button>
                <TouchableOpacity onPress={handleMenu} className="">
                    <EllipsisVertical color={foreground} size={22} />
                </TouchableOpacity>
            </View>
        </View>
        <View className="flex-row items-start px-4 pb-4">
            <Avatar size='md' className="bg-primary mr-4">
                <AvatarFallbackText className="text-primaryForeground text-lg font-semibold">
                    {name}
                </AvatarFallbackText>
            </Avatar>
            <View className="flex-col">
                <Text className="text-foreground text-2xl font">
                    {name}
                </Text>
                <View className="flex-row items-center">
                    <Text className="text-mutedForeground text-base ml-0.5">{phone}</Text>
                </View>
            </View>
        </View>
      </View>
    );
  };

export { QuickCheckHeader };
export default Header;