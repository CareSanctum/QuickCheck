## 📋 Prerequisites

### System Requirements
- **Node.js**: `v22.17.1` or higher
- **npm**: `v10.9.2` or higher
- **Expo CLI**: Latest version
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Required Tools
- **JDK**: OpenJDK 17 or higher
- **Android SDK**: API level 24+
- **Gradle**: 8.13+

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/CareSanctum/QuickCheck.git
cd QuickCheck
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory with the following variables:

```env
# Backend Configuration
EXPO_PUBLIC_BACKEND_URL=http://localhost:8000
EXPO_PUBLIC_CLIENT_TYPE=web

# RazorPay Configuration (Add your actual keys)
RAZORPAY_KEY_ID=rzp_test_YOUR_TEST_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_TEST_KEY_SECRET
```

### 4. Prebuild Native Code
```bash
npx expo prebuild --clean
```

## 🏃‍♂️ Running the Application

### Development Mode
Create Dev Build
```bash
APP_VARIANT=development npx expo run:android
```
Start Dev Server
```bash
APP_VARIANT=development npx expo start
```