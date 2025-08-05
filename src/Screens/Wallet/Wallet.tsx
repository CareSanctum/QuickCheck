import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { useWalletBalance } from "../../Hooks/Wallet.hook";
import Header from "../../Components/Header";

const Wallet = () => {
    const navigation = useNavigation<NavigationProp>();
    const { data: walletData, isLoading, error } = useWalletBalance();

    const handleBackToHome = () => {
        navigation.goBack();
    }

    const handleHistoryPress = () => {
        navigation.navigate('History');
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
            <View className="flex-1 px-5 py-0">
                {/* Header */}
                <Header className="my-4"/>

                <ScrollView 
                    className="flex-1" 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {/* 1. Wallet Section */}
                    <View className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="text-lg font-semibold text-gray-800">Current Credits</Text>
                            <TouchableOpacity onPress={handleHistoryPress}>
                                <Text className="text-primary text-sm">History</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="text-3xl font-bold text-primary">
                            {isLoading ? 'Loading...' : `₹${walletData?.balance?.toFixed(2) || '0.00'}`}
                        </Text>
                    </View>

                    {/* 2. Quick Recharge Section */}
                    <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                        <View className="flex-row items-center mb-2">
                            <Text className="text-xl font-bold text-gray-800">⚡ Quick Recharge</Text>
                        </View>
                        <Text className="text-gray-600 mb-4">Choose from popular recharge amounts</Text>
                        
                        {/* Recharge Options Grid */}
                        <View className="space-y-3">
                            {/* ₹50 Option */}
                            <TouchableOpacity 
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200 relative"
                                onPress={() => handleRechargePress(50)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">₹50</Text>
                                        <Text className="text-gray-600 text-sm">50 credits</Text>
                                    </View>
                                    <View className="bg-primary px-2 py-1 rounded-full">
                                        <Text className="text-white text-xs font-medium">Popular</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹100 Option */}
                            <TouchableOpacity 
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                onPress={() => handleRechargePress(100)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">₹100</Text>
                                        <Text className="text-gray-600 text-sm">100 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹250 Option */}
                            <TouchableOpacity 
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                onPress={() => handleRechargePress(250)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">₹250</Text>
                                        <Text className="text-gray-600 text-sm">250 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* ₹500 Option */}
                            <TouchableOpacity 
                                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                onPress={() => handleRechargePress(500)}
                            >
                                <View className="flex-row justify-between items-center">
                                    <View>
                                        <Text className="text-lg font-semibold text-gray-800">₹500</Text>
                                        <Text className="text-gray-600 text-sm">500 credits</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 3. Secure Payment Disclaimer Section */}
                    <View className="bg-white rounded-lg p-4 shadow-sm">
                        <View className="flex-row items-start mb-2">
                            <Text className="text-green-500 mr-3 mt-1">✅</Text>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-semibold mb-1">Secure Payment</Text>
                                <Text className="text-gray-600 text-sm leading-5">
                                    Your payment information is encrypted and secure. We never store your card details. Payments are processed through Razorpay.
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default Wallet; 