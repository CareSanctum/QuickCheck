import { useEffect } from "react";
import { StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, withRepeat, interpolate, Easing, withDelay } from 'react-native-reanimated';

export const Dot = ({ value, onCompleteTyping }: { value: number, onCompleteTyping?: () => void }) => {
    const dot = useSharedValue(0)
    useEffect(() => {
        const total = 1000;
        const bump = 250;

        dot.value = withRepeat(
            withSequence(
                withDelay(bump * value, withTiming(1, {
                    duration: bump,
                    easing: Easing.linear,
                })),
                withTiming(0, {
                    duration: bump,
                    easing: Easing.linear,
                }),

                withDelay(total - bump * 2 - bump * value, withTiming(0, {
                    duration: bump,
                    easing: Easing.linear,
                })),
            ),
            -1, // loop infinitely
            true
        );

    }, [])
    const animatedDotStyle = useAnimatedStyle(() => {
        const translateY = interpolate(dot.value, [0, 1], [0, -10])
        return {
            transform: [{ translateY: translateY }]
        }
    })
    return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "white",
        marginHorizontal: 4,
    }
})