import axiosInstance from "../Network/Axios.config";
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import { AxiosResponse } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "../App.Navigation";
import { useFocusEffect } from "@react-navigation/native";

// Hook for refreshing queries on screen focus
export function useRefreshOnScreenFocus<T>(queryKey: any[]) {
  const queryClient = useQueryClient()
  const firstTimeRef = React.useRef(true)

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false
        return
      }

      // refetch all stale active queries matching the key pattern
      queryClient.refetchQueries({
        queryKey,
        stale: true,
        type: 'active',
      })
    }, [queryClient, queryKey]),
  )
}

export interface QuickCheckListItem {
    id: number,
    nickname: string,
    latest_quickcheck_id: number | null,
    latest_response_preview: string | null,
    latest_response_status: string | null,
    latest_response_urgency: string | null,
    latest_response_closed_at: string | null,
    latest_response_is_seen: boolean | null,
    unseen_count: number | null
}

async function getQuickCheckList() {
    try{
        const response: AxiosResponse<QuickCheckListItem[]> = await axiosInstance.get(generateUrl('QUICK_CHECK_LIST'));
        return response.data;
    } catch (error) {
        throw error;
    }
}



export function useQuickCheckList() {
    const query = useQuery({
        queryKey: ['quick-check-list'],
        queryFn: getQuickCheckList,
    })

    // Enable screen focus refetching
    useRefreshOnScreenFocus(['quick-check-list'])

    return query
}

export interface QuickCheckHistoryItem {
    id: number,
    status: string | null,
    urgency: string | null,
    message: string | null,
    initiated_at: string,
    closed_at: string | null,
}

export interface QuickCheckHistoryResponse {
    count: number,
    next: string | null,
    previous: string | null,
    results: QuickCheckHistoryItem[]
}

async function getQuickCheckHistory(loved_one_id: number, url?: string) {
    try{
        const finalUrl = url || generateUrl('QUICK_CHECK_HISTORY', {loved_one_id});
        const response: AxiosResponse<QuickCheckHistoryResponse> = await axiosInstance.get(finalUrl);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useQuickCheckHistory(loved_one_id: number, url?: string | null) {
    const query = useQuery({
        queryKey: ['quick-check-history', loved_one_id, url],
        queryFn: () => getQuickCheckHistory(loved_one_id, url || undefined),
        enabled: !!loved_one_id,
    })

    // Enable screen focus refetching
    useRefreshOnScreenFocus(['quick-check-history', loved_one_id])

    return query
}

async function createQuickCheck(initiated_for_id: number) {
    try{
        const response = await axiosInstance.post(generateUrl('QUICK_CHECK_CREATE'), {initiated_for_id});
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useCreateQuickCheck(initiated_for_id: number) {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp>();
    return useMutation({
        mutationFn: () => createQuickCheck(initiated_for_id),
        onSuccess: () => {
            // Invalidate quick check history to refresh the list
            queryClient.invalidateQueries({ queryKey: ['quick-check-history', initiated_for_id] });
            // Invalidate wallet balance since QuickCheck creation deducts from wallet
            queryClient.invalidateQueries({ queryKey: ['wallet-balance'] });
            // Invalidate quick check list to refresh the main list
            queryClient.invalidateQueries({ queryKey: ['quick-check-list'] });
            // navigation.navigate('LovedOneHistory', {loved_one_id: initiated_for_id});
        },
        onError: (error) => {
            console.log(error);
        },
    })
}
