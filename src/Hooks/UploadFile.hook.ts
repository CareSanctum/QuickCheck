import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import axiosInstance from "../Network/Axios.config";

async function uploadFile(data: FormData) {
    try{
        const response = await axiosInstance.post(generateUrl('UPLOAD_PROFILE_PIC'), data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export function useUploadFile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadFile,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
    });
}