import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

//Screens
import ResetPassword from "./Screens/ResetPassword/ResetPassword";
import PasswordResetOTP from "./Screens/ResetPassword/PasswordResetOTP";
import NewPassword from "./Screens/ResetPassword/NewPassword";
import PasswordResetSuccess from "./Screens/ResetPassword/PasswordResetSuccess";
import Login from "./Screens/LogIn/Login";
import SignUp from "./Screens/SignUp/SignUp";
import SignupVerifyOTP from "./Screens/SignUp/SignupVerifyOTP";
import Welcome from "./Screens/Welcome";
import HomeTabNavigator from "./Components/HomeTabNavigator";
import PaymentSummary from "./Screens/Wallet/PaymentSummary";
import History from "./Screens/Wallet/History";
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
                HomeTabNavigator: HomeTabNavigator,
                PaymentSummary: PaymentSummary,
                History: History,
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

export type RootStackParamList = StaticParamList<typeof RootStack> & {
    HomeTabNavigator: {
        screen: 'HomeTab' | 'WalletTab' | 'AccountsTab';
    };
};

export type NavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList>,
    BottomTabNavigationProp<any>
>;

export const AppNavigation = createStaticNavigation(RootStack);