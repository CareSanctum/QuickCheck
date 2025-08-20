import { QuickCheckListItem, useCreateQuickCheck } from "@/src/Hooks/QuickCheck.hook";
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonSpinner } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { formatDate, getPriorityColor } from "./utils";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { LinearGradient } from "expo-linear-gradient";
import { Phone } from "lucide-react-native";

const LovedOneListItem = ({item}: {item: QuickCheckListItem}) => {
    const navigation = useNavigation<NavigationProp>();
    const {mutate: createQuickCheck, status: createQuickCheckStatus, error: createQuickCheckError} = useCreateQuickCheck(item.id);
    const primaryForeground = useThemeVariables('--primary-foreground');
    
    return (
        <TouchableOpacity
            onPress={() => {navigation.navigate('LovedOneHistory', {loved_one_id: item.id});}}
            delayPressIn={100}
            className="mb-4"
        >
            {/* Main card container */}
            <View className="bg-card rounded-2xl p-4 shadow-lg border border-border">
                
                {/* Top section with tags and timestamp */}
                <View className="flex-row items-center justify-between mb-3">
                    {/* Tags container */}
                    <View className="flex-row items-center gap-2">
                        {/* NEW tag - show for recent items */}
                        {item.latest_response_status === "IN_PROGRESS" && (
                            <View className="bg-blue-400 rounded-full px-3 py-1">
                                <Text className="text-white text-xs font-semibold uppercase">NEW</Text>
                            </View>
                        )}
                        
                        {/* URGENT tag - show for urgent items */}
                        {item.latest_response_urgency === "URGENT" && (
                            <View className="bg-red-500 rounded-full px-3 py-1">
                                <Text className="text-white text-xs font-semibold uppercase">URGENT</Text>
                            </View>
                        )}
                    </View>
                    
                    {/* Timestamp */}
                    <Text className="text-mutedForeground text-sm">
                        {item.latest_response_closed_at ? formatDate(item.latest_response_closed_at) : "Just now"}
                    </Text>
                </View>
                
                {/* Profile and contact info section */}
                <View className="flex-row items-start mb-4">
                    {/* Avatar - keeping your existing style */}
                    <Avatar className="bg-primary mr-4" size="lg">
                        <AvatarFallbackText className="text-xl text-primaryForeground">
                            {item.nickname}
                        </AvatarFallbackText>
                    </Avatar>
                    
                    {/* Contact information */}
                    <View className="flex-1">
                        {/* Name */}
                        <Text className="text-foreground text-2xl font-bold mb-1">
                            {item.nickname}
                        </Text>
                        
                        
                        {/* Status/Description text */}
                        <Text 
                            numberOfLines={2}
                            className={`text-base ${item.latest_response_is_seen ? "text-mutedForeground" : "text-foreground"}`}
                        >
                            {item.latest_response_preview 
                                ? item.latest_response_preview 
                                : "You can check up on this person!"}
                        </Text>
                    </View>
                </View>
                
                {/* Action button with gradient - Material 3 design */}
                <LinearGradient
                    colors={["#3B82F6", "#8B5CF6"]} // Blue to purple gradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="rounded-3xl overflow-hidden"
                    style={{
                        shadowColor: "#3B82F6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Button 
                        className="bg-transparent rounded-3xl h-14 px-6" 
                        onPress={() => createQuickCheck()} 
                        isDisabled={createQuickCheckStatus === 'pending'}
                        style={{
                            shadowColor: "transparent",
                            elevation: 0,
                        }}
                    >
                        {createQuickCheckStatus === 'pending' ? (
                            <ButtonSpinner color="white" />
                        ) : (
                            <View className="flex-row items-center">
                                <Phone size={22} color="white"/>
                                <View className="w-1" />
                                <Text className="text-white text-base font-semibold uppercase tracking-wide">
                                    QuickCheck
                                </Text>
                            </View>
                        )}
                    </Button>
                </LinearGradient>
                
            </View>
        </TouchableOpacity>
    )
}

export default LovedOneListItem;

