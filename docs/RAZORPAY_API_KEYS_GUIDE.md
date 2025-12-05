# How to Get Your RazorPay API Keys

## 🔑 **Step-by-Step Guide**

### **1. Login to RazorPay Dashboard**
- Go to [dashboard.razorpay.com](https://dashboard.razorpay.com)
- Login with your credentials

### **2. Navigate to API Keys**
- Click on **Settings** (gear icon) in the left sidebar
- Click on **API Keys**

### **3. Generate New Key Pair**
- Click **Generate Key Pair**
- Give it a name (e.g., "QuickCheck App")
- Select **Test Mode** for development
- Click **Generate**

### **4. Copy Your Keys**
You'll see two keys:
- **Key ID**: `rzp_test_xxxxxxxxxxxxx` (Use this in your app)
- **Key Secret**: `xxxxxxxxxxxxxxxxxxxxxx` (Keep this secret, never use in frontend)

### **5. Update Your Config**
Replace in `src/config/razorpay.ts`:

```typescript
TEST_KEY: 'rzp_test_YOUR_ACTUAL_KEY_ID_HERE', // Copy from dashboard
```

## ⚠️ **Important Notes**

- **Key ID** starts with `rzp_test_` (test mode) or `rzp_live_` (live mode)
- **Key Secret** should NEVER be used in frontend code
- Use **Test Mode** keys for development
- Use **Live Mode** keys only for production

## 🧪 **Test Cards**

Once you have the correct keys, use these test cards:

**Success Card:**
- Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

**Test UPI:**
- UPI ID: `success@razorpay`

## 🔍 **Common Errors**

1. **"Key not found"**: Wrong Key ID or using Key Secret instead
2. **"Invalid key"**: Key doesn't exist or is disabled
3. **"Test mode only"**: Using test key in live environment 