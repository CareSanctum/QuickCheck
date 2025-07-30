# Payment Integration Setup Guide

## 🎯 **Complete Payment Flow**

Your payment integration now includes:

1. **Create Order API** → Get order ID from backend
2. **RazorPay Payment** → Process payment with order ID
3. **Verify Payment API** → Validate payment with backend
4. **CSRF Token Support** → Security token input

## 🔧 **Configuration Required**

### **1. Update API Configuration**

Edit `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000', // Your backend URL
  AUTH_TOKEN: 'YOUR_ACTUAL_TOKEN', // Replace with real token
  USER_ID: 'YOUR_USER_ID', // Replace with real user ID
};
```

### **2. Update RazorPay Configuration**

Edit `src/config/razorpay.ts`:

```typescript
export const RAZORPAY_CONFIG = {
  TEST_KEY: 'rzp_test_YOUR_ACTUAL_KEY',
  LIVE_KEY: 'rzp_live_YOUR_ACTUAL_KEY',
  CURRENT_KEY: __DEV__ ? 'rzp_test_YOUR_ACTUAL_KEY' : 'rzp_live_YOUR_ACTUAL_KEY',
};
```

## 🚀 **How It Works**

### **Step 1: Create Order**
```javascript
// Calls your backend API
POST /api/payments/create-order/
{
  "amount": 499,
  "currency": "INR", 
  "purpose": "credit_topup",
  "user_id": "1234"
}

// Returns order data for RazorPay
{
  "internal_order_id": "abc123",
  "external_order_id": "order_xyz",
  "amount": 499,
  "currency": "INR",
  "external_key_id": "public_key_id"
}
```

### **Step 2: RazorPay Payment**
```javascript
// Uses order data from backend
RazorpayCheckout.open({
  key: orderData.external_key_id,
  order_id: orderData.external_order_id,
  amount: amountInPaise,
  // ... other options
})
```

### **Step 3: Verify Payment**
```javascript
// Calls your backend API
POST /api/payments/verify-payment/
{
  "external_order_id": "order_xyz",
  "external_payment_id": "pay_abc", 
  "external_signature": "generated_signature"
}

// Returns verification result
{
  "success": true,
  "message": "Payment verified and credits added."
}
```

## 📱 **UI Features**

- ✅ **Amount Input** - Payment amount
- ✅ **Name Input** - Customer name
- ✅ **Email Input** - Customer email
- ✅ **Phone Input** - Customer phone
- ✅ **Description Input** - Payment description
- ✅ **CSRF Token Input** - Security token
- ✅ **Pay Now Button** - Initiates payment flow
- ✅ **Loading States** - Visual feedback
- ✅ **Error Handling** - Comprehensive error messages

## 🔒 **Security Features**

- ✅ **CSRF Token Validation** - Prevents CSRF attacks
- ✅ **Backend Order Creation** - Secure order generation
- ✅ **Payment Verification** - Server-side signature verification
- ✅ **Error Handling** - Graceful failure handling

## 🧪 **Testing**

### **Test Data:**
- Amount: `10` (₹10.00)
- Name: `test`
- Email: `test@gmail.com`
- Phone: `9282882822`
- Description: `test`
- CSRF Token: `your_csrf_token`

### **Test Cards:**
- Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

## 🎯 **Next Steps**

1. **Update API Configuration** with your actual tokens
2. **Test with Your Backend** - Ensure APIs are working
3. **Add Error Handling** - Customize error messages
4. **Add Success Handling** - Navigate to success page
5. **Add Loading States** - Improve UX

## 📋 **API Requirements**

Your backend APIs should handle:

### **Create Order API:**
- ✅ Accept amount, currency, purpose, user_id
- ✅ Return external_order_id, external_key_id
- ✅ Handle authentication and CSRF

### **Verify Payment API:**
- ✅ Accept order_id, payment_id, signature
- ✅ Verify RazorPay signature
- ✅ Return success/failure status
- ✅ Handle authentication and CSRF

## 🔍 **Debugging**

Check console logs for:
- `Creating order with backend...`
- `Order created: {...}`
- `RazorPay options: {...}`
- `Payment successful: {...}`
- `Verifying payment with backend...`
- `Payment verified: {...}`

## 🚨 **Common Issues**

1. **Network Error** - Check backend URL and connectivity
2. **Authentication Error** - Verify API token
3. **CSRF Error** - Check CSRF token format
4. **Order Creation Failed** - Check backend API
5. **Payment Verification Failed** - Check signature verification

Your payment integration is now complete and ready for testing! 🎉 