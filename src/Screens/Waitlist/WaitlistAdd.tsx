import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SvgComponent from "@/src/Components/Icons/SvgLogo";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";

import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Mail } from "lucide-react-native";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DecorativeShapes from "@/src/Components/DecorativeShapes";
import { useEffect, useMemo, useState } from "react";
import { useAddToWaitlist } from "@/src/Hooks/Waitlist.hook";
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import SuccessBox from "@/src/Components/SuccessBox";
import ErrorBox from "@/src/Components/ErrorBox";

import {toast} from 'sonner-native';

const WaitlistAdd = () => {
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const primaryForeground = useThemeVariables('--primary-foreground');
    const {top, bottom} = useSafeAreaInsets();
    const [email, setEmail] = useState("");
    const isValidEmail = useMemo(() => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email), [email]);
    const { mutate: addToWaitlist, status: addStatus } = useAddToWaitlist();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (successMsg) {
            const t = setTimeout(() => setSuccessMsg(""), 3000);
            return () => clearTimeout(t);
        }
    }, [successMsg]);

    useEffect(() => {
        if (errorMsg) {
            const t = setTimeout(() => setErrorMsg(""), 3000);
            return () => clearTimeout(t);
        }
    }, [errorMsg]);

    const handleJoinWaitlist = () => {
        if (!isValidEmail) return;
        addToWaitlist(email, {
            onSuccess: () => {
                setSuccessMsg("You're on the list! We'll email you soon.");
                setEmail("");
            },
            onError: () => {
                setErrorMsg("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <KeyboardAwareScrollView className="flex-1" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={[ '#A93EAC',  '#C24CB7', '#FE6ED0']}
                style={{flex: 1}}
            >
                <DecorativeShapes />
                <SafeAreaView className="flex-1 justify-center items-center px-6">
                    <View className="items-center" style={{ gap: 32 }}>
                        {/* Logo */}
                        <View className="items-center">
                            <SvgComponent />
                        </View>

                        {/* Main Title */}
                        <View className="items-center">
                            <Text className="text-white text-3xl font-bold text-center leading-tight">
                                Join the Waitlist
                            </Text>
                        </View>

                        {/* Description */}
                        <Text className="text-white text-center text-base leading-6 px-4">
                            Be the first to get early access to our app. Join our waitlist and stay updated.
                        </Text>

                        {/* Email Input - match SignUp styling */}
                        <View className="w-full max-w-sm px-2">
                            <Input className="bg-card border border-border data-[focus=true]:border-foreground w-full"
                                style={{ borderRadius: 10, height: 55 }}
                                isInvalid={email.length > 0 && !isValidEmail}
                            >
                                <InputSlot className="pl-3">
                                    <InputIcon as={Mail} className="text-foreground" />
                                </InputSlot>
                                <InputField 
                                    placeholder="Email Address" 
                                    cursorColor={foreground} style = {useWaitlistStyles().input}
                                    placeholderTextColor={useThemeVariables('--muted-foreground')}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    className="w-full"
                                    value={email}
                                    onChangeText={setEmail}
                                    returnKeyType="done"
                                    onSubmitEditing={handleJoinWaitlist}
                                />
                            </Input>
                        </View>

                        {/* Join Waitlist Button - secondary color, centered text */}
                        <View className="w-full items-center">
                            <Button
                                className="px-6 py-3 w-[75%] h-[50px] items-center justify-center bg-secondary"
                                style={{ borderRadius: 10 }}
                                onPress={handleJoinWaitlist}
                                isDisabled={!isValidEmail || addStatus === 'pending'}
                            >
                                {addStatus === 'pending' && (
                                    <ButtonSpinner className="mr-2" />
                                )}
                                <ButtonText className="text-secondaryForeground font-medium text-center w-full">
                                    Join Waitlist
                                </ButtonText>
                            </Button>
                        </View>
                    </View>
                </SafeAreaView>
                {/* Bottom inline status */}
                {(successMsg || errorMsg) && (
                    <View style={{ position: 'absolute', left: 16, right: 16, bottom: bottom + 12 }}>
                        {successMsg ? (
                            <SuccessBox message={successMsg} />
                        ) : (
                            <ErrorBox message={errorMsg} />
                        )}
                    </View>
                )}
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
}

function useWaitlistStyles() {
    const foreground = useThemeVariables('--foreground');
    return StyleSheet.create({
        input: {
          color: foreground,
          fontSize: 16,
          fontWeight: '400',
        }
      })
}

export default WaitlistAdd;