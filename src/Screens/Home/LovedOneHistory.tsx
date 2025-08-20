import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, BackHandler, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import Header, { QuickCheckHeader } from "@/src/Components/Header";
import { Card } from "@/components/ui/card";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { Plus, Phone } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, useCallback, useEffect } from "react";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useWindowDimensions } from "react-native";
import { useQuickCheckHistory, QuickCheckHistoryItem } from "@/src/Hooks/QuickCheck.hook";
import { useRoute } from "@react-navigation/native";
import { formatDate, getPriorityColor } from "./utils";
import { useLovedOneDetails } from "@/src/Hooks/LovedOne.hook";
import AddLovedOneForm from "../LovedOne/AddLovedOneForm";



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

    // Header expand animation (mirror of Account.tsx)
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [collapsedHeaderHeight, setCollapsedHeaderHeight] = useState<number>(0);
    const expandProgress = useSharedValue(0);
    const { height: screenHeight } = useWindowDimensions();

    const handleStartEdit = useCallback(() => {
        setIsEditingProfile(true);
        expandProgress.value = withTiming(1, { duration: 350 });
    }, [expandProgress]);

    const handleCloseEdit = useCallback(() => {
        expandProgress.value = withTiming(0, { duration: 300 }, (finished) => {
            if (finished) {
                runOnJS(setIsEditingProfile)(false);
            }
        });
    }, [expandProgress]);

    useEffect(() => {
        const backSub = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isEditingProfile) {
                handleCloseEdit();
                return true;
            }
            return false;
        });
        return () => backSub.remove();
    }, [isEditingProfile, handleCloseEdit]);

    const animatedHeaderStyle = useAnimatedStyle(() => {
        const targetHeight = collapsedHeaderHeight > 0 ? collapsedHeaderHeight : 0;
        const height = interpolate(
            expandProgress.value,
            [0, 1],
            [targetHeight, screenHeight],
            Extrapolation.CLAMP
        );
        const radius = interpolate(expandProgress.value, [0, 1], [28, 0], Extrapolation.CLAMP);
        return {
            height,
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
        } as const;
    });

    const headerSummaryOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(expandProgress.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }));

    const headerEditOpacity = useAnimatedStyle(() => ({
        opacity: interpolate(expandProgress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    }));

    const backgroundContentStyle = useAnimatedStyle(() => ({
        opacity: interpolate(expandProgress.value, [0, 1], [1, 0], Extrapolation.CLAMP),
    }));

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-background" edges={['right', 'bottom', 'left']}>
                <QuickCheckHeader style={{paddingTop: insets.top}} lovedOneId={loved_one_id}/>
                <View className="flex-1 justify-center items-center">
                    <Text className="text-foreground text-lg">Error loading history</Text>
                    <TouchableOpacity onPress={handleRefresh} className="mt-4">
                        <Text className="text-primary">Retry</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const { data: lovedOneDetails, status: lovedOneDetailsStatus, error: lovedOneDetailsError } = useLovedOneDetails(loved_one_id);
    
    return (
            <SafeAreaView className="flex-1 bg-background" edges={['right', 'bottom', 'left']}>
                {/* Curtain header overlay */}
                <Animated.View
                    className="bg-card border border-border rounded-b-[28px] absolute left-0 right-0"
                    style={[{ zIndex: 10 }, collapsedHeaderHeight > 0 ? animatedHeaderStyle : undefined]}
                    onLayout={(e) => {
                        if (collapsedHeaderHeight === 0) {
                            setCollapsedHeaderHeight(e.nativeEvent.layout.height);
                        }
                    }}
                >
                    {/* Summary content */}
                    <Animated.View style={[collapsedHeaderHeight > 0 ? StyleSheet.absoluteFillObject : null, headerSummaryOpacity, { paddingTop: insets.top }]}>
                        <QuickCheckHeader
                            className="bg-transparent border-0 rounded-none shadow-none mb-0"
                            style={{ paddingTop: 0 }}
                            name={lovedOneDetailsStatus === 'success' ? lovedOneDetails.data.name : ''}
                            phone={lovedOneDetailsStatus === 'success' ? lovedOneDetails.data.phone : ''}
                            lovedOneId={loved_one_id}
                            onEditPress={handleStartEdit}
                        />
                    </Animated.View>

                    {/* Edit content */}
                    {isEditingProfile && (
                        <Animated.View style={[collapsedHeaderHeight > 0 ? StyleSheet.absoluteFillObject : null, headerEditOpacity, { paddingTop: insets.top }]}> 
                        {lovedOneDetailsStatus === 'success' && (
                            <>
                            <Header title={"Edit Details"} onBackPress={handleCloseEdit} />
                            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                                <ScrollView className="px-4 py-4">
                                    <AddLovedOneForm defaultValues={lovedOneDetails.data} isEdit={true} lovedOneId={loved_one_id} />
                                </ScrollView>
                            </KeyboardAvoidingView>
                            </>
                            
                        )}
                        </Animated.View>
                    )}
                </Animated.View>
            
            {/* Chat bubbles */}
            <Animated.View style={[{ flex: 1, paddingTop: collapsedHeaderHeight + 16 }, backgroundContentStyle]} pointerEvents={isEditingProfile ? 'none' : 'auto'}>
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
            </Animated.View>
            
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