import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { useWalletBalance } from "../../Hooks/Wallet.hook";
import { HomeHeader } from "@/src/Components/Header";
import { Card } from "@/components/ui/card";
import { useThemeVariables } from "@/src/Components/ThemeVariables";
const Wallet = () => {
    const navigation = useNavigation<NavigationProp>();
    const { data: walletData, isLoading, error } = useWalletBalance();
    const cardForeground = useThemeVariables('--card-foreground');
    const handleBackToHome = () => {
        navigation.goBack();
    }

    const handleHistoryPress = () => {
        navigation.navigate('WalletHistory');
    }

    const handleRechargePress = (amount: number) => {
        // Navigate to Payment Summary with amount and credits
        navigation.navigate('PaymentSummary', {
            amount: amount,
            credits: amount // 1:1 ratio for now
        });
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            
                {/* Header */}
                <HomeHeader showWallet={false} title="Wallet"/>

                <ScrollView 
                    className="flex-1 px-4 pt-2" 
                    showsVerticalScrollIndicator={false}
                >
                    {/* 1. Wallet Section */}
                    <Card className="p-4 bg-card border-border mt-8 mb-8" style={{borderRadius: 10, borderWidth: 1}}>
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-xl font-semibold text-cardForeground">Current Credits</Text>
                            <TouchableOpacity onPress={handleHistoryPress}>
                                <Text className="text-secondary font-bold">History</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-3xl font-bold text-cardForeground">
                            {isLoading ? <ActivityIndicator size="small" color={cardForeground} /> : `₹${walletData?.balance?.toFixed(2) || '0.00'}`}
                        </Text>
                    </Card>


                    {/* 2. Quick Recharge Section */}
                    <Card className="bg-card p-6 mb-6 border-border" style={{borderRadius: 10, borderWidth: 1}}>
                        <View className="flex-row items-center mb-2">
                            <Text className="text-xl font-bold text-cardForeground"> Quick Recharge</Text>
                        </View>
                        <Text className="text-mutedForeground mb-4">Choose from popular recharge amounts</Text>
                        
                        {/* Recharge Options Grid */}
                        <View>
                            {/* ₹50 Option */}
                            <TouchableOpacity 
                                className="p-4 border-border relative"
                                style={{borderRadius: 10, borderWidth: 1}}
                                onPress={() => handleRechargePress(50)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-cardForeground">₹50</Text>
                                        <Text className="text-mutedForeground text-sm">50 credits</Text>
                                    </View>
                                    <View className="bg-secondary px-2 py-1 rounded-full">
                                        <Text className="text-cardForeground text-xs font-medium">Popular</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹100 Option */}
                            <TouchableOpacity 
                                className="p-4 border-border relative"
                                style={{borderRadius: 10, borderWidth: 1}}
                                onPress={() => handleRechargePress(100)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-cardForeground">₹100</Text>
                                        <Text className="text-mutedForeground text-sm">100 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹250 Option */}
                            <TouchableOpacity 
                                className="p-4 border-border relative"
                                style={{borderRadius: 10, borderWidth: 1}}
                                onPress={() => handleRechargePress(250)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-cardForeground">₹250</Text>
                                        <Text className="text-mutedForeground text-sm">250 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹500 Option */}
                            <TouchableOpacity 
                                className="p-4 border-border relative"
                                style={{borderRadius: 10, borderWidth: 1}}
                                onPress={() => handleRechargePress(500)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-cardForeground">₹500</Text>
                                        <Text className="text-mutedForeground text-sm">500 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Card>

                    {/* 3. Secure Payment Disclaimer Section */}
                    {/* <View className="bg-white rounded-lg p-4 shadow-sm">
                        <View className="flex-row items-start mb-2">
                            <Text className="text-green-500 mr-3 mt-1">✅</Text>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold mb-1">Secure Payment</Text>
                                <Text className="text-gray-600 text-sm leading-5">
                                    Your payment information is encrypted and secure. We never store your card details. Payments are processed through Razorpay.
                                </Text>
                            </View>
                        </View>
                    </View> */}
                </ScrollView>
        </SafeAreaView>
    );
}

export default Wallet; 