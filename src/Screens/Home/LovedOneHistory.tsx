import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { QuickCheckHeader } from "@/src/Components/Header";
import { Card } from "@/components/ui/card";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { Plus, Phone } from "lucide-react-native";

// Mock data for chat bubbles
const mockChatData = [
    {
        id: 1,
        priority: "Medium",
        status: "Completed",
        message: "Feeling a bit tired today, but nothing serious. Taking it easy.",
        initiated: "Jan 15, 10:15",
        closed: "Jan 15, 10:20",
        priorityColor: "bg-yellow-500/20",
        priorityTextColor: "text-yellow-400",
        statusColor: "bg-green-500/20",
        statusTextColor: "text-green-400"
    },
    {
        id: 2,
        priority: "High",
        status: "Completed",
        message: "Had a small fall but I'm okay. Just a bruised knee.",
        initiated: "Jan 14, 16:45",
        closed: "Jan 14, 16:50",
        priorityColor: "bg-orange-500/20",
        priorityTextColor: "text-orange-400",
        statusColor: "bg-green-500/20",
        statusTextColor: "text-green-400"
    },
    {
        id: 3,
        priority: "Urgent",
        status: "Completed",
        message: "Need help immediately! Having chest pains.",
        initiated: "Jan 14, 09:20",
        closed: "Jan 14, 09:25",
        priorityColor: "bg-pink-500/20",
        priorityTextColor: "text-pink-400",
        statusColor: "bg-green-500/20",
        statusTextColor: "text-green-400"
    },
    {
        id: 4,
        priority: "Low",
        status: "Pending",
        message: "Everything is fine today. Just checking in as usual.",
        initiated: "Jan 15, 16:00",
        closed: null,
        priorityColor: "bg-purple-500/20",
        priorityTextColor: "text-purple-400",
        statusColor: "bg-blue-500/20",
        statusTextColor: "text-blue-400"
    }
];

const ChatBubble = ({ item }: { item: typeof mockChatData[0] }) => {
    const foreground = useThemeVariables('--foreground');
    const cardBackground = useThemeVariables('--card');
    
    return (
        <View className="flex-row justify-start mb-2 mx-2">
            <Card className="bg-card border-border" style={{borderRadius: 12, borderWidth: 1, width: '100%'}}>
                <View className="p-2">
                    {/* Badges */}
                    <View className="flex-row gap-2 mb-1">
                        <View className={`px-2 py-1 rounded-full ${item.priorityColor}`}>
                            <Text className={`text-xs font-medium ${item.priorityTextColor}`}>
                                {item.priority}
                            </Text>
                        </View>
                        <View className={`px-2 py-1 rounded-full ${item.statusColor}`}>
                            <Text className={`text-xs font-medium ${item.statusTextColor}`}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                    
                    {/* Message */}
                    <Text className="text-foreground text-base mb-2 leading-5" numberOfLines={0}>
                        {item.message}
                    </Text>
                    
                    {/* Timestamps */}
                    <View className="flex-row justify-between items-start">
                        <View className="flex-row gap-4">
                            <View>
                                <Text className="text-mutedForeground text-sm">Initiated</Text>
                                <Text className="text-foreground text-sm font-medium">{item.initiated}</Text>
                            </View>
                            {item.closed && (
                                <View>
                                    <Text className="text-mutedForeground text-sm">Closed</Text>
                                    <Text className="text-foreground text-sm font-medium">{item.closed}</Text>
                                </View>
                            )}
                        </View>
                        {/* Purple circle indicator */}
                    </View>
                </View>
            </Card>
        </View>
    );
};

const LovedOneHistory = () => {
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const secondary = useThemeVariables('--secondary');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const secondaryForeground = useThemeVariables('--secondary-foreground');
    
    const handleQuickCheck = () => {
        console.log('QuickCheck pressed');
    };
    
    const handleCall = () => {
        console.log('Call pressed');
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <QuickCheckHeader />
            
            {/* Chat bubbles */}
            <FlatList
                data={mockChatData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ChatBubble item={item} />}
                className="flex-1"
                contentContainerStyle={{ paddingBottom: 96 }}
                showsVerticalScrollIndicator={false}
            />
            
            {/* Floating Action Buttons */}
            <View className="absolute bottom-6 left-4 right-4 flex-row justify-between">
                {/* QuickCheck Button */}
                <TouchableOpacity 
                    className="bg-primary px-6 py-3 rounded-full shadow-lg flex-row items-center"
                    onPress={handleQuickCheck}
                    style={{elevation: 8}}
                >
                    <Plus color={primaryForeground} size={20} />
                    <Text className="text-primaryForeground font-medium ml-2">QuickCheck</Text>
                </TouchableOpacity>
                
                {/* Call Button */}
                <TouchableOpacity 
                    className="bg-secondary w-14 h-14 rounded-full shadow-lg items-center justify-center"
                    onPress={handleCall}
                    style={{elevation: 8}}
                >
                    <Phone color={secondaryForeground} size={24} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LovedOneHistory;