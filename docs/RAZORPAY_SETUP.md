# RazorPay Integration Setup Guide

## Prerequisites

1. **RazorPay Account**: Sign up at [razorpay.com](https://razorpay.com)
2. **React Native Development Environment**: Ensure your React Native app is properly configured

## Step 1: Get RazorPay API Keys

1. Log in to your RazorPay Dashboard
2. Go to **Settings** → **API Keys**
3. Generate a new API key pair
4. Copy the **Key ID** and **Key Secret**

## Step 2: Configure API Keys

Update the `src/config/razorpay.ts` file with your actual API keys:

```typescript
export const RAZORPAY_CONFIG = {
  // Replace with your actual keys from RazorPay dashboard
  TEST_KEY: 'rzp_test_YOUR_ACTUAL_TEST_KEY',
  LIVE_KEY: 'rzp_live_YOUR_ACTUAL_LIVE_KEY',
  
  // Use test key for development, live key for production
  CURRENT_KEY: __DEV__ ? 'rzp_test_YOUR_ACTUAL_TEST_KEY' : 'rzp_live_YOUR_ACTUAL_LIVE_KEY',
  
  // App settings
  APP_NAME: 'QuickCheck',
  CURRENCY: 'INR',
  THEME_COLOR: '#3399cc',
};
```

## Step 3: Platform-Specific Setup

### For Android

1. **Add to android/app/build.gradle**:
```gradle
android {
    defaultConfig {
        // ... other configs
        manifestPlaceholders = [
            'razorpay_key': 'rzp_test_YOUR_TEST_KEY'
        ]
    }
}
```

2. **Add to android/app/src/main/AndroidManifest.xml**:
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### For iOS

1. **Add to ios/Podfile**:
```ruby
target 'YourAppName' do
  # ... other pods
  pod 'razorpay-pod'
end
```

2. **Run pod install**:
```bash
cd ios && pod install
```

## Step 4: Testing

1. **Test Mode**: Use test cards provided by RazorPay
   - Card Number: `4111 1111 1111 1111`
   - Expiry: Any future date
   - CVV: Any 3 digits
   - Name: Any name

2. **Test UPI**: Use `success@razorpay` for successful payments

## Step 5: Production Deployment

1. **Switch to Live Keys**: Update `CURRENT_KEY` to use live keys
2. **Enable Webhooks**: Set up webhook URLs for payment verification
3. **SSL Certificate**: Ensure your app has proper SSL certificates

## Features Included

✅ **Payment Form**: Collects amount, name, email, phone, and description
✅ **Form Validation**: Validates all required fields
✅ **RazorPay Integration**: Seamless payment gateway integration
✅ **Error Handling**: Handles payment failures and cancellations
✅ **Loading States**: Shows loading indicator during payment processing
✅ **Success Handling**: Displays success message with payment ID
✅ **Dark Theme**: Matches your app's dark theme design

## Customization

### Styling
The payment form uses Tailwind classes and can be customized in `src/Screens/Payments.tsx`

### Payment Options
Modify the `options` object in the `initiatePayment` function to customize:
- Currency
- Theme colors
- Pre-filled data
- Payment description

### Validation
Update the `validateForm` function to add custom validation rules

## Security Best Practices

1. **Never expose Key Secret** in client-side code
2. **Verify payments** on your backend using webhooks
3. **Use HTTPS** in production
4. **Validate payment responses** server-side
5. **Store sensitive data** securely

## Troubleshooting

### Common Issues

1. **"Key not found" error**: Check if API key is correctly configured
2. **Payment modal not opening**: Ensure internet permission is added
3. **iOS build errors**: Run `pod install` in ios directory
4. **Android build errors**: Check manifest permissions

### Debug Mode

Enable debug logging by adding:
```typescript
console.log('RazorPay Options:', options);
```

## Support

- [RazorPay Documentation](https://razorpay.com/docs/)
- [React Native SDK](https://razorpay.com/docs/payments/payment-gateway/react-native-integration/standard/)
- [Test Cards](https://razorpay.com/docs/payments/payment-gateway/test-mode/test-cards/)

## Next Steps

1. **Backend Integration**: Set up webhook endpoints for payment verification
2. **Order Management**: Create order IDs before initiating payments
3. **Payment History**: Store and display payment history
4. **Refund Handling**: Implement refund functionality
5. **Analytics**: Track payment success/failure rates 