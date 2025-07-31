import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Wallet from '../Screens/Wallet/Wallet';
import Account from '../Screens/Account';
import { Home as HomeIcon, Wallet as WalletIcon, User as UserIcon } from 'lucide-react-native';
import { useThemeVariables } from './ThemeVariables';

export type HomeTabParamList = {
    HomeTab: undefined;
    WalletTab: undefined;
    AccountsTab: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabNavigator = () => {
    const primaryForeground = useThemeVariables('--primary-foreground');
    const primary = useThemeVariables('--primary');
    const background = useThemeVariables('--background');
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: background, // dark background
                    borderTopColor: '#374151',
                    borderTopWidth: 0.2,
                },
                tabBarItemStyle: {
                    paddingTop: 10,
                },
                tabBarActiveTintColor: primary, // blue color
                tabBarInactiveTintColor: primaryForeground, // gray color
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
        </Tab.Navigator>
    );
};

export default HomeTabNavigator; 