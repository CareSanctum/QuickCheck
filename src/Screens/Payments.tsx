// Import RazorPay with error handling
let RazorpayCheckout: any = null;
try {
  const RazorpayModule = require('react-native-razorpay');
  RazorpayCheckout = RazorpayModule.default || RazorpayModule;
  console.log('✅ RazorPay module loaded successfully');
  console.log('Module type:', typeof RazorpayCheckout);
  console.log('Available methods:', Object.keys(RazorpayCheckout || {}));
} catch (error) {
  console.warn('❌ RazorPay module not available:', error);
}
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { RAZORPAY_CONFIG } from '../config/razorpay';
import { getApiUrl, getAuthHeaders, API_CONFIG } from '../config/api';


interface PaymentDetails {
  amount: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  csrfToken: string;
}

interface CreateOrderResponse {
  internal_order_id: string;
  external_order_id: string;
  amount: number;
  currency: string;
  external_key_id: string;
}

interface VerifyPaymentResponse {
  success: boolean;
  message: string;
}

const Payments: React.FC = () => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    amount: '10',
    name: 'test',
    email: 'test@gmail.com',
    phone: '9282882822',
    description: 'test',
    csrfToken: '',
  });
  const [loading, setLoading] = useState(false);

  // Environment check
  console.log('Environment check:', {
    isDev: __DEV__,
    platform: Platform.OS,
    hasRazorPay: !!RazorpayCheckout,
    razorPayType: typeof RazorpayCheckout
  });

  const handleInputChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (!paymentDetails.amount || parseFloat(paymentDetails.amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return false;
    }
    if (!paymentDetails.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!paymentDetails.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!paymentDetails.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!paymentDetails.csrfToken.trim()) {
      Alert.alert('Error', 'Please enter CSRF token');
      return false;
    }
    return true;
  };

  // API Functions
  const createOrder = async (): Promise<CreateOrderResponse> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.CREATE_ORDER), {
        method: 'POST',
        headers: getAuthHeaders(paymentDetails.csrfToken),
        body: JSON.stringify({
          amount: parseInt(paymentDetails.amount),
          currency: 'INR',
          purpose: 'credit_topup',
          user_id: API_CONFIG.USER_ID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Order created:', data);
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (
    externalOrderId: string,
    externalPaymentId: string,
    externalSignature: string
  ): Promise<VerifyPaymentResponse> => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.VERIFY_PAYMENT), {
        method: 'POST',
        headers: getAuthHeaders(paymentDetails.csrfToken),
        body: JSON.stringify({
          external_order_id: externalOrderId,
          external_payment_id: externalPaymentId,
          external_signature: externalSignature,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Payment verified:', data);
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

        const initiatePayment = async () => {
    if (!validateForm()) return;

    // Debug RazorPay module status
    console.log('🔍 RazorPay Debug Info:', {
      isAvailable: !!RazorpayCheckout,
      type: typeof RazorpayCheckout,
      hasOpenMethod: RazorpayCheckout && typeof RazorpayCheckout.open === 'function',
      moduleKeys: RazorpayCheckout ? Object.keys(RazorpayCheckout) : []
    });

    // Check if RazorPay is available
    if (!RazorpayCheckout) {
      Alert.alert(
        'Payment Unavailable',
        'RazorPay module is not available. Please use a development build or physical device.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Check if open method exists
    if (typeof RazorpayCheckout.open !== 'function') {
      Alert.alert(
        'Payment Error',
        'RazorPay module is not properly initialized. Please restart the app.',
        [{ text: 'OK' }]
      );
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Order with Backend API
      console.log('Creating order with backend...');
      const orderData = await createOrder();
      
      // Step 2: Initiate RazorPay Payment
      const amountInPaise = Math.round(parseFloat(paymentDetails.amount) * 100);
      
      var options = {
        description: paymentDetails.description || 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.jpg',
        currency: 'INR',
        key: orderData.external_key_id, // Use key from backend
        amount: amountInPaise.toString(),
        name: 'QuickCheck',
        order_id: orderData.external_order_id, // Use order ID from backend
        prefill: {
          email: paymentDetails.email,
          contact: paymentDetails.phone,
          name: paymentDetails.name
        },
        theme: {color: '#53a20e'}
      };

      console.log('RazorPay options:', options);
      console.log('About to call RazorpayCheckout.open...');

      // Step 3: Process Payment
      RazorpayCheckout.open(options).then(async (data: any) => {
        console.log('Payment successful:', data);
        
        // Step 4: Verify Payment with Backend
        try {
          console.log('Verifying payment with backend...');
          const verificationResult = await verifyPayment(
            data.razorpay_order_id,
            data.razorpay_payment_id,
            data.razorpay_signature
          );
          
          if (verificationResult.success) {
            Alert.alert('Success', verificationResult.message);
          } else {
            Alert.alert('Verification Failed', verificationResult.message);
          }
        } catch (verifyError) {
          console.error('Payment verification failed:', verifyError);
          Alert.alert('Verification Error', 'Payment verification failed. Please contact support.');
        }
        
        // Reset form
        setPaymentDetails({
          amount: '',
          name: '',
          email: '',
          phone: '',
          description: '',
          csrfToken: '',
        });
      }).catch((error: any) => {
        console.error('Payment error:', error);
        Alert.alert('Error', `Error: ${error.code} | ${error.description}`);
      }).finally(() => {
        setLoading(false);
      });
    } catch (apiError) {
      console.error('API error:', apiError);
      Alert.alert('API Error', 'Failed to create order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-900">
      <View className="p-6">
        <Text className="text-3xl font-bold text-white mb-8 text-center">
          Payment Gateway
        </Text>

        <View className="bg-gray-800 rounded-lg p-6 mb-6">
          <Text className="text-xl font-semibold text-white mb-4">
            Payment Details
          </Text>

          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Amount (₹)</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Enter amount"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.amount}
              onChangeText={(value) => handleInputChange('amount', value)}
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Full Name</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Email</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Phone Number</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-300 mb-2">Description (Optional)</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Payment description"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={3}
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-300 mb-2">CSRF Token</Text>
            <TextInput
              className="bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
              placeholder="Enter CSRF token"
              placeholderTextColor="#9CA3AF"
              value={paymentDetails.csrfToken}
              onChangeText={(value) => handleInputChange('csrfToken', value)}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            className={`bg-blue-600 p-4 rounded-lg items-center ${
              loading ? 'opacity-50' : ''
            }`}
            onPress={initiatePayment}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                Pay Now
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="bg-gray-800 rounded-lg p-4">
          <Text className="text-gray-300 text-sm text-center">
            Secure payment powered by RazorPay
          </Text>
          <Text className="text-gray-400 text-xs text-center mt-2">
            Your payment information is encrypted and secure
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Payments; 