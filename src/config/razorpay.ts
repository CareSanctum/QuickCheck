// RazorPay Configuration
export const RAZORPAY_CONFIG = {
  // Test keys - Replace with your actual keys from RazorPay dashboard
  TEST_KEY: 'rzp_test_zEZ0LcBVHXxLjV',
  LIVE_KEY: 'rzp_test_zEZ0LcBVHXxLjV',
  
  // Use test key for development, live key for production
  CURRENT_KEY: __DEV__ ? 'rzp_test_YRmGxNaJ5o4ejY' : 'rzp_test_YRmGxNaJ5o4ejY',
  
  // App settings
  APP_NAME: 'QuickCheck',
  CURRENCY: 'INR',
  THEME_COLOR: '#3399cc',
  
  // Webhook URL (optional - for server-side verification)
//   WEBHOOK_URL: 'https://your-backend.com/api/razorpay/webhook',
};

// Payment validation helper
export const validatePaymentResponse = (response: any) => {
  // Add your payment verification logic here
  // This should ideally be done on your backend
  return {
    isValid: true,
    paymentId: response.razorpay_payment_id,
    orderId: response.razorpay_order_id,
    signature: response.razorpay_signature,
  };
}; 