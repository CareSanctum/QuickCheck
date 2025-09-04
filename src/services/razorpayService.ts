import { CreateOrderResponse } from '../Hooks/Wallet.hook';

// Dynamic import for Razorpay to handle cases where it's not available
let RazorpayCheckout: any = null;
try {
    const RazorpayModule = require('react-native-razorpay');
    RazorpayCheckout = RazorpayModule.default || RazorpayModule;
} catch (error) {
    console.warn('Razorpay module not available:', error);
}

export interface RazorpayOptions {
    description: string;
    image: string;
    currency: string;
    key: string;
    amount: number;
    name: string;
    order_id: string;
    prefill: {
        email: string;
        contact: string;
        name: string;
    };
    theme: {
        color: string;
    };
}

export interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export const initiateRazorpayPayment = async (
    orderData: CreateOrderResponse
): Promise<RazorpayResponse> => {
    console.log('orderData', orderData);
    const options: RazorpayOptions = {
        description: 'Credit topup',
        image: orderData.wallet_display_image,
        currency: orderData.currency,
        key: orderData.external_key_id,
        amount: orderData.amount * 100, // Razorpay expects amount in paise
        name: 'QuickCheck',
        order_id: orderData.external_order_id,
        prefill: {
            email: orderData.email,
            contact: orderData.contact,
            name: orderData.name,
        },
        theme: {
            color: '#3399cc',
        },
    };

    try {
        if (!RazorpayCheckout) {
            throw new Error('Razorpay module is not available. Please ensure you are running a development build.');
        }
        
        if (!RazorpayCheckout.open) {
            throw new Error('Razorpay checkout method is not available');
        }
        
        const response = await RazorpayCheckout.open(options);
        return response;
    } catch (error: any) {
        console.error('Razorpay payment failed:', error);
        throw new Error(`Payment failed: ${error.description || error.message}`);
    }
}; 