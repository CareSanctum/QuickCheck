import axiosInstance from "../Network/Axios.config";
import { useQuery } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import { AxiosResponse } from "axios";

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
    return useQuery({
        queryKey: ['quick-check-list'],
        queryFn: getQuickCheckList,
    })
}