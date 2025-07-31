import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';

//Screens
import ResetPassword from "./Screens/ResetPassword/ResetPassword";
import PasswordResetOTP from "./Screens/ResetPassword/PasswordResetOTP";
import NewPassword from "./Screens/ResetPassword/NewPassword";
import PasswordResetSuccess from "./Screens/ResetPassword/PasswordResetSuccess";
import Login from "./Screens/LogIn/Login";
import SignUp from "./Screens/SignUp/SignUp";
import SignupVerifyOTP from "./Screens/SignUp/SignupVerifyOTP";
import Welcome from "./Screens/Welcome";
import Home from "./Screens/Home";
import Wallet from "./Screens/Wallet";
import PaymentSummary from "./Screens/PaymentSummary";
import { AuthContext, useAuth } from "./Context/AuthContext";
import { ActivityIndicator } from "react-native";
import { useContext } from "react";

function useIsAuthenticated() {
    const data = useContext(AuthContext);
    return data?.isSignedIn ?? false;
}

function useIsNotAuthenticated() {
    const data = useContext(AuthContext);
    return data?.isSignedOut ?? true;
}

const RootStack = createNativeStackNavigator({
    screenOptions: {
        headerShown: false,
    },
    groups: {
        SignedIn: {
            if: useIsAuthenticated,
            screens: {
                Home: Home,
                Wallet: Wallet,
                PaymentSummary: PaymentSummary,
            }
        },
        SignedOut: {
            if: useIsNotAuthenticated,
            screens: {
                Welcome: Welcome,
                Login: Login,
                SignUp: SignUp,
                SignupVerifyOTP: SignupVerifyOTP,
                ResetPassword: ResetPassword,
                PasswordResetOTP: PasswordResetOTP,
                NewPassword: NewPassword, 
                PasswordResetSuccess: PasswordResetSuccess,
            }
        }
    }
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AppNavigation = createStaticNavigation(RootStack);