import { generateUrl } from "../Network/Urls";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";


async function createLovedOne(data: any) {
    try{
        const response = await axiosInstance.post(generateUrl('LOVED_ONE_CREATE'), data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useCreateLovedOne() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createLovedOne,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quick-check-list'] });
            
        },
    })
}