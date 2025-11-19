import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import axiosInstance from "../Network/Axios.config";

// Types
export interface CreateOrderRequest {
    amount: number;
    currency: string;
    purpose: string;
}

export interface CreateOrderResponse {
    internal_order_id: number;
    external_order_id: string;
    amount: number;
    currency: string;
    external_key_id: string;
    email: string;
    contact: string;
    name: string;
    wallet_display_image: string;
}

export interface VerifyPaymentRequest {
    external_order_id: string;
    external_payment_id: string;
    external_signature: string;
}

export interface VerifyPaymentResponse {
    success: boolean;
    message: string;
}

export interface WalletBalanceResponse {
    balance: number;
    updated_at: string;
    user_username: string;
    recent_transactions: Transaction[];
}

export interface Transaction {
    id: number;
    type: string;
    type_display: string;
    amount: number;
    source: string;
    source_display: string;
    related_feature: string;
    related_feature_display: string;
    note: string;
    created_at: string;
    payment_transaction: any;
}

// API Functions
async function createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    try {
        console.log(data)
        const response = await axiosInstance.post(generateUrl('CREATE_ORDER'), data);
        return response.data;
    } catch (error: any) {
        console.log('Create order error:', error);
        throw error;
    }
}

async function verifyPayment(data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> {
    try {
        const response = await axiosInstance.post(generateUrl('VERIFY_PAYMENT'), data);
        return response.data;
    } catch (error: any) {
        console.log('Verify payment error:', error);
        throw error;
    }
}

async function getWalletBalance(): Promise<WalletBalanceResponse> {
    try {
        const response = await axiosInstance.get(generateUrl('WALLET_BALANCE'));
        return response.data;
    } catch (error: any) {
        console.log('Get wallet balance error:', error);
        throw error;
    }
}

// Hooks
export function useCreateOrder() {
    return useMutation({
        mutationFn: createOrder,
    });
}

export function useVerifyPayment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: verifyPayment,
        onSuccess: () => {
            // Invalidate wallet balance query to refresh data
            queryClient.invalidateQueries({ queryKey: ['wallet-balance'] });
        },
    });
}

export function useWalletBalance() {
    return useQuery({
        queryKey: ['wallet-balance'],
        queryFn: getWalletBalance,
        retry: 1, // Only retry once instead of default 3 times
        retryDelay: 1000, // Wait 1 second before retry
        staleTime: 10 * 60 * 1000, // Consider data fresh for 10 minutes
        refetchOnWindowFocus: false, // Don't refetch when app comes to focus
        refetchOnMount: false, // Don't refetch when component mounts if data exists
        refetchOnReconnect: false, // Don't refetch when network reconnects
    });
} 