import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NavigationProp } from "../../App.Navigation";
import { useWalletBalance } from "../../Hooks/Wallet.hook";
import Header from "../../Components/Header";
import { useState, useCallback } from "react";
import { Transaction } from "../../Hooks/Wallet.hook";
import { ArrowLeft, Calendar, CreditCard, TrendingUp, TrendingDown } from "lucide-react-native";

const WalletHistory = () => {
    const navigation = useNavigation<NavigationProp>();
    const { data: walletData, isLoading, error, refetch } = useWalletBalance();
    const [refreshing, setRefreshing] = useState(false);

    // Refresh wallet data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            // Refresh wallet balance and history when WalletHistory screen is opened
            refetch();
        }, [refetch])
    );

    const handleBackPress = () => {
        navigation.goBack();
    }

    const handleRefresh = async () => {
        if (refreshing) return; // Prevent multiple simultaneous refreshes
        setRefreshing(true);
        try {
            await refetch();
        } catch (error) {
            console.log('Refresh failed:', error);
        } finally {
            setRefreshing(false);
        }
    }

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'credit_added':
                return <TrendingUp size={20} color="#10B981" />;
            case 'credit_spent':
                return <TrendingDown size={20} color="#EF4444" />;
            default:
                return <CreditCard size={20} color="#6B7280" />;
        }
    }

    const formatDate = (timestamp: string, type: string) => {
        const date = new Date(timestamp);
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12;
        hours = hours ? hours : 12;

        const preStr = type === 'credit_added' ? 'Credited on' : 'Spent on';

        return `${preStr} ${month} ${day}, ${year} ${hours}:${minutes}${ampm}`;
    }

    const transactions = walletData?.recent_transactions || [];

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#3399cc" />
                    <Text className="text-gray-600 mt-4">Loading transaction history...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 px-5 py-0">
                    {/* Header */}
                    <View className="flex-row items-center justify-between py-4">
                        <TouchableOpacity onPress={handleBackPress} className="p-2">
                            <ArrowLeft size={24} color="#374151" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold text-gray-800">Transaction History</Text>
                        <View className="w-10" />
                    </View>

                    {/* Error State */}
                    <View className="flex-1 justify-center items-center">
                        <View className="bg-white rounded-lg p-8 shadow-sm items-center">
                            <Calendar size={48} color="#EF4444" />
                            <Text className="text-gray-800 text-lg font-medium mt-4">Connection Error</Text>
                            <Text className="text-gray-500 text-center mt-2 mb-4">
                                Unable to load transaction history. Please check your connection and try again.
                            </Text>
                            <TouchableOpacity 
                                className="bg-primary px-6 py-3 rounded-lg"
                                onPress={handleRefresh}
                            >
                                <Text className="text-white font-medium">Try Again</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-5 py-0">
                {/* Header */}
                <View className="flex-row items-center py-6">
                    <TouchableOpacity
                        onPress={handleBackPress}
                        className="p-2"
                        style={{ minWidth: 40 }}
                    >
                        <ArrowLeft size={24} color="#374151" />
                    </TouchableOpacity>
                    <Text
                        className="flex-1 text-xl font-bold text-gray-800 text-center"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        Transaction History
                    </Text>
                    {/* Invisible view to balance the header for centering */}
                    <View style={{ minWidth: 40 }} />
                </View>



                {/* Transactions List */}
                <ScrollView 
                    className="flex-1" 
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    }
                    contentContainerStyle={{ paddingBottom: 20 }}
                >
                    {transactions.length === 0 ? (
                        <View className="bg-white rounded-lg p-8 shadow-sm items-center">
                            <Calendar size={48} color="#D1D5DB" />
                            <Text className="text-gray-500 text-lg font-medium mt-4">No transactions found</Text>
                            <Text className="text-gray-400 text-center mt-2">
                                You haven't made any transactions yet.
                            </Text>
                        </View>
                    ) : (
                        <View className="space-y-3">
                            <View className="bg-white shadow-sm" style={{borderRadius: 10}}>
                            {transactions.map((transaction: Transaction) => (
                                <View key={transaction.id} className="rounded-lg p-4 border-t border-gray-100 ml-3 mr-3" style={{borderRadius: 10}}>
                                    <View className="flex-row items-center justify-between">
                                        <View className="flex-row items-center flex-1">
                                            <View className="mr-3">
                                                {getTransactionIcon(transaction.type)}
                                            </View>
                                            <View className="flex-1">
                                                <Text className="text-gray-800 font-semibold">
                                                    {transaction.source_display} {transaction.related_feature_display? `• ${transaction.related_feature_display}` : ''}
                                                </Text>
                                            </View>
                                        </View>
                                        <View className="items-end">
                                            <Text className={`text-lg font-bold ${
                                                transaction.type === 'credit_added' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                                {transaction.type === 'credit_added' ? '+' : '-'}{Math.abs(transaction.amount)}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    {/* Transaction Details */}
                                    <View>
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row items-center">
                                                <Text className="text-gray-500 text-sm ml-1">
                                                    {formatDate(transaction.created_at, transaction.type)}
                                                </Text>
                                            </View>
                                        </View>
                                        
                                        {/* Transaction Note */}
                                        {transaction.note && (
                                            <Text className="text-gray-600 text-sm mt-2 italic">
                                                {transaction.note}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            ))}
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default WalletHistory; 