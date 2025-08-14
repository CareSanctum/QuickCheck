import { View, Text, TouchableOpacity, ScrollView, BackHandler, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "../../Hooks/Logout.hook";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import AccountItemsCard from "./AccountItemsCard";
import { useProfile } from "@/src/Hooks/Profile.hook";
import Header, { HomeHeader } from "@/src/Components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useCallback, useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTabVisibilityStore } from "@/src/Store/tabVisibility";
import { LoadingScreen } from "../LoadingScreen";
import { User } from "lucide-react-native";
import EditProfile from "./AccountItems/EditProfile";

const Account = () => {
    const { mutate: logout, status: logoutStatus } = useLogout();
    const { data: profile, status: profileStatus, error: profileError } = useProfile();
    const foreground = useThemeVariables('--foreground');
    const destructive = useThemeVariables('--destructive');
    const background = useThemeVariables('--background');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const { top, bottom } = useSafeAreaInsets();
    const { height: screenHeight } = useWindowDimensions();
    const navigation = useNavigation();
    const setTabHidden = useTabVisibilityStore((s) => s.setTabHidden);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [collapsedHeaderHeight, setCollapsedHeaderHeight] = useState<number>(0);
    const expandProgress = useSharedValue(0);

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

    // Hide/show bottom tab bar via global store to ensure consistent behavior
    useEffect(() => {
        setTabHidden(isEditingProfile);
    }, [isEditingProfile, setTabHidden]);

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

    if (profileError) {
        return <View className="flex-1 items-center justify-center">
            <Text className="text-destructive text-base font-medium">Something went wrong</Text>
        </View>
    }
    if (profileStatus === 'pending') {
        return <LoadingScreen />
    }
    return (
        <SafeAreaView className="flex-1 bg-background" edges={['bottom', 'left', 'right']}>
            {/* Curtain header overlay */}
            <Animated.View
                className="bg-card border border-border rounded-b-[28px] absolute left-0 right-0"
                style={[{  zIndex: 10 }, collapsedHeaderHeight > 0 ? animatedHeaderStyle : undefined]}
                onLayout={(e) => {
                    if (collapsedHeaderHeight === 0) {
                        setCollapsedHeaderHeight(e.nativeEvent.layout.height);
                    }
                }}
            >
                {/* Summary content (overlayed, so it doesn't occupy layout) */}
                <Animated.View style={[collapsedHeaderHeight > 0 ? StyleSheet.absoluteFillObject : null, headerSummaryOpacity, {paddingTop: top}]}>
                    <HomeHeader title="Account" className="" />
                    <View className="flex-row items-center mb-8 mt-8 px-4 pt-2">
                        <View className="relative">
                            <Avatar size="xl" className="bg-primary overflow-hidden rounded-full p-0">
                                {profile.profile_picture_url ? (
                                    <AvatarImage
                                    source={{uri: profile.profile_picture_url}}
                                    resizeMode="cover"
                                    className="absolute inset-0 w-full h-full"
                                    style={{ transform: [{ scale: 2 }] }}
                                    />
                                ) : (
                                    <User color={primaryForeground} size={40} />
                                )}
                            </Avatar>
                        </View>
                        <View className="ml-2 flex-1">
                            <Text className="text-2xl font-bold text-foreground">{profile.full_name}</Text>
                            <Text className="font-medium text-mutedForeground">{profile.email}</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Edit content */}
                {isEditingProfile && (
                    <Animated.View style={[collapsedHeaderHeight > 0 ? StyleSheet.absoluteFillObject : null, headerEditOpacity]}> 
                        <EditProfile onBackPress={handleCloseEdit} />
                    </Animated.View>
                )}
            </Animated.View>

            {/* Background content */}
            <Animated.View style={[{ flex: 1, paddingTop: collapsedHeaderHeight + 16 }, backgroundContentStyle]} pointerEvents={isEditingProfile ? 'none' : 'auto'}>
                <ScrollView className="flex-1 px-4">
                    <AccountItemsCard onEditProfile={handleStartEdit} />
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
};

export default Account;