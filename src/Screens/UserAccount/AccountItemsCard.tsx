import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { ChevronRightIcon, Handshake, KeyRound, LogOutIcon, UserPen } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { useLogout } from "@/src/Hooks/Logout.hook";
import { Fragment } from "react";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@/src/App.Navigation";

type AccountItemsCardProps = {
  onEditProfile: () => void;
};

const AccountItemsCard = ({ onEditProfile }: AccountItemsCardProps) => {
    const foreground = useThemeVariables('--foreground'); 
    const destructive = useThemeVariables('--destructive');
    const { mutate: logout, status: logoutStatus } = useLogout();
    const handleLogout = () => {
        logout();
    }
    const navigation = useNavigation<NavigationProp>();
    const menuItems = [
        { id: 1, title: "Edit Profile", onPress: () => { onEditProfile() }, icon: <UserPen size={22} color={foreground} /> },
        { id: 2, title: "Change Password", onPress: () => { navigation.navigate('ChangePassword') }, icon: <KeyRound size={22} color={foreground} /> },
        // { id: 3, title: "QuickCheck History", onPress: () => {}, icon: <History size={22} color={foreground} /> },
        { id: 4, title: "Terms and Conditions", onPress: () => {}, icon: <Handshake size={22} color={foreground} /> },
    ];
    return (
        <Card className="p-4 bg-card gap-4 border-border" style={{borderRadius: 10, borderWidth: 1}}>
            {menuItems.map((item, index) => (
                <Fragment key={item.id}>
                    <View key={item.id}>
                        <TouchableOpacity onPress={item.onPress}>
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    {item.icon}
                                    <Text className="pl-2 text-lg text-foreground">
                                        {item.title}
                                    </Text>
                                </View>
                                <ChevronRightIcon size={22} color={foreground}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Divider className="bg-border" />
                </Fragment>
            ))}
            <View>
                <TouchableOpacity onPress={handleLogout}>
                    { logoutStatus === "pending" ? 
                        ( <ActivityIndicator size="small" color={destructive} />) : 
                        (
                            <View className="flex-row items-center justify-between">
                                <View className="flex-row items-center">
                                    <LogOutIcon size={22} color={destructive}/>
                                    <Text className="pl-2 text-lg text-destructive">
                                        Sign Out
                                    </Text>
                                </View>
                                <ChevronRightIcon size={22} color={destructive}/>
                            </View>
                        )
                    }
                </TouchableOpacity>
            </View>
        </Card>
    )
}

export default AccountItemsCard;