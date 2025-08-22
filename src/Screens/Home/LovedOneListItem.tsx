import { QuickCheckListItem, useCreateQuickCheck } from "@/src/Hooks/QuickCheck.hook";
import { View, TouchableOpacity, Text } from "react-native";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Button, ButtonSpinner } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { formatDate, getPriorityColor, getStatusBadgeColor} from "./utils";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { LinearGradient } from "expo-linear-gradient";
import { Phone } from "lucide-react-native";
import { Dot } from "@/src/Components/TypingAnimation";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedProps, withTiming, withSequence, withRepeat, interpolate, Easing, withDelay, runOnJS } from 'react-native-reanimated';
import { useState } from "react";

const LovedOneListItem = ({item}: {item: QuickCheckListItem}) => {
    const navigation = useNavigation<NavigationProp>();
    const {mutate: createQuickCheck, status: createQuickCheckStatus, error: createQuickCheckError} = useCreateQuickCheck(item.id);
    const primaryForeground = useThemeVariables('--primary-foreground');
    const [typing, setTyping] = useState(true)
    const typingWidth = useSharedValue(20)
    const [animatedText, setAnimatedText] = useState("")
    const onTypingDone = () => {
        typingWidth.value = withTiming(80, { duration: 400, easing: Easing.linear })
        setTyping(false)
    }

    const animateText = (text: string, speed: number) => {
        let currentIndex = 0;
        let lastTime = 0;

        const updateText = (currentTime: number) => {
            if (currentTime - lastTime > speed) {
                setAnimatedText(text.slice(0, currentIndex));
                currentIndex++;
                lastTime = currentTime;
            }

            if (currentIndex <= text.length) {
                requestAnimationFrame(updateText);
            }
        };

        updateText(0);
    };

    const statusBadgeColor = item.latest_response_status 
        ? item.latest_response_status === "IN_PROGRESS" 
            ? getStatusBadgeColor(item.latest_response_status)
            : getPriorityColor(item.latest_response_urgency)
        : 'bg-gray-500';

    const statusBadgeText = item.latest_response_status === "IN_PROGRESS" 
        ? item.latest_response_status 
        : item.latest_response_urgency;

    return (
        <TouchableOpacity
            onPress={() => {navigation.navigate('LovedOneHistory', {loved_one_id: item.id});}}
            delayPressIn={100}
            className="mb-4"
        >
            {/* Main card container */}
            <View className="bg-card rounded-2xl p-4 shadow-lg border border-border">
                
                {/* Top section with tags and timestamp */}
                {/* <View className="flex-row items-center justify-end mb-3">
                    
                    <View className="flex-row items-center gap-2">
                        {item.latest_response_status  && (
                            <View className={`bg-red-500 rounded-full px-3 py-1`}>
                                <Text className="text-white text-xs font-semibold uppercase">{statusBadgeText?.replace('_', ' ')}</Text>
                            </View>
                        )}
                    </View>

                </View> */}
                
                {/* Profile and contact info section */}
                <View className="flex-row items-start mb-4">
                    {/* Avatar - keeping your existing style */}
                    <Avatar className="bg-primary mr-4" size="md">
                        <AvatarFallbackText className="text-xl text-primaryForeground">
                            {item.nickname}
                        </AvatarFallbackText>
                    </Avatar>
                    
                    {/* Contact information */}
                    <View className="flex-1">
                        {/* Name */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-foreground text-xl font-semibold mb-1">
                                {item.nickname}
                            </Text>
                            <View className="flex-row items-center gap-2">
                        {item.latest_response_status  && (
                            <View className={`bg-red-500 rounded-full px-3 py-1`}>
                                <Text className="text-white text-xs font-semibold uppercase">{statusBadgeText?.replace('_', ' ')}</Text>
                            </View>
                        )}
                    </View>
                        </View>
                        
                        
                        {/* Status/Description text */}
                        <View className="flex-row gap-2">
                        <Text
                            numberOfLines={1}
                            className={`text-base font-medium text-mutedForeground`}
                        >
                            {item.latest_response_status === "IN_PROGRESS"
                                ? "Your QuickCheck is in progress"
                                : item.latest_response_preview}
                        </Text>
                        <Text className={`text-mutedForeground text-sm font-semibold `}>
                                {item.latest_response_closed_at ? formatDate(item.latest_response_closed_at) : "Just now"}
                            </Text>

                        </View>
                    </View>
                </View>
                
                {/* Action button with gradient - Material 3 design */}
                <LinearGradient
                    colors={["#A93EAC", "#B745B1",  "#C24CB7", "#FE6ED0"]} // Blue to purple gradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    className="rounded-3xl overflow-hidden w-[75%] mx-auto"
                    style={{
                        shadowColor: "#3B82F6",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                    }}
                >
                    <Button 
                        className="bg-transparent  h-12 px-5" 
                        onPress={() => createQuickCheck()} 
                        isDisabled={createQuickCheckStatus === 'pending'}
                        disabled={item.latest_response_status === "IN_PROGRESS"}
                        style={{
                            shadowColor: "transparent",
                            elevation: 0,
                        }}
                        
                    >
                        {createQuickCheckStatus === 'pending' ? (
                            <ButtonSpinner color="white" />
                        ) : (
                            item.latest_response_status === "IN_PROGRESS" ? (
                                // <View className="flex-row items-center">
                                //     <Phone size={22} color="white"/>
                                //     <View className="w-1" />
                                //     <Text className="text-white text-base font-semibold uppercase tracking-wide">
                                //         QuickCheck
                                //     </Text>
                                // </View>
                                <View className="flex-row items-center">
                                    {[0, 1, 2].map((value) => (
                                        <Dot key={value} value={value} onCompleteTyping={onTypingDone} />
                                    ))}
                                </View>
                            ) : (
                                <View className="flex-row items-center">
                                    <Phone size={18} color="white"/>
                                    <View className="w-1" />
                                    <Text className="text-white text-sm font-semibold uppercase tracking-wide">
                                        QuickCheck
                                    </Text>
                                </View>
                            )
                        )}
                    </Button>
                </LinearGradient>
                
            </View>
        </TouchableOpacity>
    )
}

export default LovedOneListItem;

