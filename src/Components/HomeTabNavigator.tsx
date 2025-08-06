import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home/Home';
import Wallet from '../Screens/Wallet/Wallet';
import Account from '../Screens/UserAccount/Account';
import LovedOneHistory from '../Screens/Home/LovedOneHistory';
import LovedOnes from '../Screens/LovedOnes';
import { Home as HomeIcon, Wallet as WalletIcon, User as UserIcon, HeartIcon } from 'lucide-react-native';
import { useThemeVariables } from './ThemeVariables';

export type HomeTabParamList = {
    HomeTab: undefined;
    WalletTab: undefined;
    AccountsTab: undefined;
    LovedOnesTab: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
    const foreground = useThemeVariables('--foreground');
    const primary = useThemeVariables('--primary');
    const secondary = useThemeVariables('--secondary');
    const background = useThemeVariables('--background');
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: background, // dark background
                    borderTopWidth: 0,
                },
                tabBarItemStyle: {
                    paddingTop: 10,
                },
                tabBarActiveTintColor: secondary, // blue color
                tabBarInactiveTintColor: foreground, // gray color
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <HomeIcon size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="WalletTab"
                component={Wallet}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <WalletIcon size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="AccountsTab"
                component={Account}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <UserIcon size={size} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="LovedOnesTab"
                component={LovedOnes}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <HeartIcon size={size} color={color} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default HomeTabNavigator; 