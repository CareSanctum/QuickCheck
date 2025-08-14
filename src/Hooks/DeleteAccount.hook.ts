import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";

async function deleteAccount() {
    try{
        const response = await axiosInstance.post(generateUrl('DELETE_ACCOUNT'));
        return response.data;
    } catch (error) {
        throw error;
    }

}

export const useDeleteAccount = () => {
    return useMutation({
        mutationFn: deleteAccount,
    });
}