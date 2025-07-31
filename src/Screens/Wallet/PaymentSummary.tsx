import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { useState } from "react";
import { useCreateOrder, useVerifyPayment, useWalletBalance } from "../../Hooks/Wallet.hook";
import { initiateRazorpayPayment } from "../../services/razorpayService";
import Header from "@/src/Components/Header";

interface PaymentSummaryProps {
    route: {
        params: {
            amount: number;
            credits: number;
        };
    };
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ route }) => {
    const navigation = useNavigation<NavigationProp>();
    const { amount, credits } = route.params;
    const [loading, setLoading] = useState(false);
    
    // Hooks
    const { data: walletData, isLoading: loadingBalance } = useWalletBalance();
    const createOrderMutation = useCreateOrder();
    const verifyPaymentMutation = useVerifyPayment();
    
    const currentCredits = walletData?.balance || 0;
    const totalCredits = currentCredits + credits;

    const handleBackToWallet = () => {
        navigation.navigate('Wallet');
    }

    const handleProceedToPayment = async () => {
        setLoading(true);
        try {
            // Step 1: Create order on backend
            console.log(amount)
            const orderData = await createOrderMutation.mutateAsync({
                amount: amount,
                currency: 'INR',
                purpose: 'credit_topup',
                user_id: '2', // TODO: Get from auth context
            });

            // Step 2: Initiate Razorpay payment
            let paymentResponse;
            try {
                paymentResponse = await initiateRazorpayPayment(orderData);
            } catch (razorpayError: any) {
                if (razorpayError.message.includes('module is not available')) {
                    Alert.alert(
                        'Development Build Required',
                        'Razorpay integration requires a development build. Please run:\n\nnpx expo prebuild --clean\nnpx expo run:android',
                        [{ text: 'OK' }]
                    );
                    return;
                }
                throw razorpayError;
            }

            // Step 3: Verify payment on backend
            const verificationResult = await verifyPaymentMutation.mutateAsync({
                external_order_id: paymentResponse.razorpay_order_id,
                external_payment_id: paymentResponse.razorpay_payment_id,
                external_signature: paymentResponse.razorpay_signature,
            });

            if (verificationResult.success) {
                Alert.alert(
                    'Payment Successful!',
                    verificationResult.message,
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('HomeTabNavigator', {screen: 'WalletTab'})
                        }
                    ]
                );
            } else {
                Alert.alert('Payment Verification Failed', verificationResult.message);
            }

        } catch (error: any) {
            console.error('Payment error:', error);
            Alert.alert('Payment Error', error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-5">
                {/* Header */}
                <Header className="my-4"/>

                <ScrollView className="flex-1">
                    {/* Payment Summary Section */}
                    <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                        <Text className="text-xl font-bold text-gray-800 mb-4">Payment Summary</Text>
                        
                        {/* Amount to Pay */}
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <Text className="text-gray-600">Amount to pay:</Text>
                            <View className="flex-row items-center">
                                <Text className="text-2xl font-bold text-gray-800 mr-2">₹{amount}</Text>
                                <Text className="text-gray-500">🇮🇳</Text>
                            </View>
                        </View>

                        {/* Credits to Add */}
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <Text className="text-gray-600">Credits to add:</Text>
                            <Text className="text-lg font-semibold text-gray-800">{credits} credits</Text>
                        </View>

                        {/* Current Credits */}
                        <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
                            <Text className="text-gray-600">Current Credits:</Text>
                            <Text className="text-lg font-semibold text-gray-800">
                                {loadingBalance ? 'Loading...' : `${currentCredits} credits`}
                            </Text>
                        </View>

                        {/* Total Credits */}
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-lg font-bold text-gray-800">Total Credits:</Text>
                            <Text className="text-xl font-bold text-primary">{totalCredits} credits</Text>
                        </View>
                    </View>

                    {/* Disclaimer Section */}
                    <View className="bg-white rounded-lg p-6 mb-6 shadow-sm">
                        <View className="flex-row items-start mb-3">
                            <Text className="text-orange-500 mr-3 mt-1">⚠️</Text>
                            <Text className="text-gray-800 font-semibold flex-1">Important Notice</Text>
                        </View>
                        <Text className="text-gray-600 text-sm leading-5">
                            Credits once added can not be refunded back to source account.
                        </Text>
                    </View>

                    {/* Action Buttons */}
                    <View className="space-y-3">
                        <Button 
                            className="bg-primary w-full" 
                            onPress={handleProceedToPayment}
                            isDisabled={loading}
                        >
                            {loading ? (
                                <ButtonSpinner />
                            ) : (
                                <ButtonText className="text-white">Proceed to Payment</ButtonText>
                            )}
                        </Button>
                        
                        <Button 
                            className="bg-gray-200 w-full" 
                            onPress={handleBackToWallet}
                            isDisabled={loading}
                        >
                            <ButtonText className="text-gray-800">Cancel</ButtonText>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default PaymentSummary; 