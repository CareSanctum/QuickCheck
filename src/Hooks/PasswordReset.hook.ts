import { useMutation} from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";

async function requestPasswordReset(email: string) {
    try{
        const response = await axiosInstance.post(generateUrl('REQUEST_PASSWORD_RESET'), {
            email
        },{
            validateStatus: function(status: number){ return status === 401},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export function useRequestPasswordReset() {
    return useMutation({
        mutationFn: requestPasswordReset,
    });
}