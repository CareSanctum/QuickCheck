import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { QuickCheckHeader } from "@/src/Components/Header";
import { Card } from "@/components/ui/card";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { Plus, Phone } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useCallback, useEffect } from "react";
import { useQuickCheckHistory, QuickCheckHistoryItem } from "@/src/Hooks/QuickCheck.hook";
import { useRoute } from "@react-navigation/native";
import { formatDate, getPriorityColor } from "./utils";



const ChatBubble = ({ item }: { item: QuickCheckHistoryItem }) => {
    const foreground = useThemeVariables('--foreground');
    
    // Format dates

    
    return (
        <View className="flex-row justify-start mb-2 mx-2">
            <Card className="bg-card border-border" style={{borderRadius: 12, borderWidth: 1, width: '100%'}}>
                <View className="p-2">
                    {/* Badges */}
                    {item.priority ? (<View className="flex-row justify-end gap-2 mb-1">
                        <View className={`px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                            <Text className="text-xs font-medium text-white">
                                {item.priority}
                            </Text>
                        </View>
                    </View>) : (
                        <View className="flex-row justify-end gap-2 mb-1">
                            <View className="px-2 py-1 rounded-full bg-sky-300">
                                <Text className="text-xs font-medium text-primaryForeground">
                                    {item.status?.replaceAll("_", " ")}
                                </Text>
                            </View>
                        </View>
                    )}
                    
                    {/* Message */}
                    <Text className="text-foreground text-base mb-2 leading-5" numberOfLines={0}>
                        {item.message || 'No message available'}
                    </Text>
                    
                    {/* Timestamps */}
                    <View className="flex">
                        <View className="flex-row justify-between">
                            <Text className="text-sm font-medium">Initiated</Text>
                            <Text className="text-sm font-medium">Responded</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-foreground text-sm font-medium">
                                {formatDate(item.initiated_at)}
                            </Text>
                            <Text className="text-foreground text-sm font-medium">
                                {item.closed_at ? formatDate(item.closed_at) : '-'}
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    );
};

interface LovedOneHistoryProps {
    route: {
        params: {
            loved_one_id: number;
        };
    };
}

const LovedOneHistory: React.FC<LovedOneHistoryProps> = ({ route }) => {
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const secondary = useThemeVariables('--secondary');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const secondaryForeground = useThemeVariables('--secondary-foreground');
    
    const { loved_one_id } = route.params;
    
    const [currentUrl, setCurrentUrl] = useState<string | undefined>(undefined);
    const [allData, setAllData] = useState<QuickCheckHistoryItem[]>([]);
    
    const { data: historyData, isLoading, error, refetch } = useQuickCheckHistory(loved_one_id, currentUrl || undefined);
    
    const handleQuickCheck = () => {
        console.log('QuickCheck pressed');
    };
    
    const handleCall = () => {
        console.log('Call pressed');
    };
    
    // Accumulate data when new data comes in
    useEffect(() => {
        if (historyData?.results) {
            if (currentUrl) {
                // Append new data for pagination
                setAllData(prev => [...prev, ...historyData.results]);
            } else {
                // Replace data for refresh
                setAllData(historyData.results);
            }
        }
    }, [historyData?.results, currentUrl]);

    const handleLoadMore = useCallback(() => {
        if (historyData?.next && !isLoading) {
            setCurrentUrl(historyData.next);
        }
    }, [historyData?.next, isLoading]);
    
    const handleRefresh = useCallback(() => {
        setCurrentUrl(undefined);
        setAllData([]);
        refetch();
    }, [refetch]);
    
    const insets = useSafeAreaInsets();

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={['right', 'bottom', 'left']}>
                <QuickCheckHeader style={{paddingTop: insets.top}}/>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-foreground text-lg">Error loading history</Text>
                    <TouchableOpacity onPress={handleRefresh} className="mt-4">
                        <Text className="text-primary">Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['right', 'bottom', 'left']}>
            <QuickCheckHeader style={{paddingTop: insets.top}}/>
            
            {/* Chat bubbles */}
            <FlatList
                data={allData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <ChatBubble item={item} />}
                className="flex-1 mt-4 px-4"
                contentContainerStyle={{ paddingBottom: 96 }}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={
                    isLoading && currentUrl ? (
                        <View className="py-4 items-center">
                            <ActivityIndicator size="small" color={primary} />
                        </View>
                    ) : null
                }
                ListEmptyComponent={
                    !isLoading ? (
                        <View className="flex-1 justify-center items-center py-8">
                            <Text className="text-foreground text-lg">No quick checks found</Text>
                        </View>
                    ) : null
                }
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
                    <Phone color={primaryForeground} size={24} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LovedOneHistory;