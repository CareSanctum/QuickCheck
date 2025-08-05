import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarFallbackText, AvatarBadge } from "@/components/ui/avatar";
import { useLogout } from "../../Hooks/Logout.hook";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import AccountItemsCard from "./AccountItemsCard";
import { useProfile } from "@/src/Hooks/Profile.hook";
import { HomeHeader } from "@/src/Components/Header";

const Account = () => {
    const { mutate: logout, status: logoutStatus } = useLogout();
    const handleLogout = () => {
        logout();
    }
    const {data: profile, status: profileStatus} = useProfile();
    const foreground = useThemeVariables('--foreground'); 
    const destructive = useThemeVariables('--destructive');

    return (
        <SafeAreaView className="flex-1 bg-background">
            <HomeHeader title="Account"/>
            <ScrollView className="flex-1 px-4 pt-2">
                {/* Profile Section */}
                <View className="flex-row items-center mb-8 mt-8">
                    <View className="relative">
                        <Avatar size="xl" className="bg-primary rounded-full">
                            <AvatarFallbackText className="text-white">
                                Sarang Dutta
                            </AvatarFallbackText>
                        </Avatar>
                    </View>
                    
                    <View className="ml-2 flex-1">
                        <Text className="text-2xl font-bold text-foreground">
                            John Doe
                        </Text>
                        <Text className="font-medium text-mutedForeground">
                            johndoe@email.com
                        </Text>
                    </View>
                </View>
                <AccountItemsCard />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Account;