import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';

//Screens
import ResetPassword from "./Screens/ResetPassword/ResetPassword";
import PasswordResetOTP from "./Screens/ResetPassword/PasswordResetOTP";

const RootStack = createNativeStackNavigator({
    initialRouteName: 'ResetPassword',
    screens: {
        ResetPassword: {
            screen: ResetPassword,
            options: {
                headerShown: false,
            }
        },
        PasswordResetOTP: {
            screen: PasswordResetOTP,
            options: {
                headerShown: false,
            }
        }
    }
});

export type RootStackParamList = StaticParamList<typeof RootStack>;

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AppNavigation = createStaticNavigation(RootStack);