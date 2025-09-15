import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";
import { getItem, removeItem, KEYS } from "../Storage";
import { useAuth } from "../Context/AuthContext";

async function logout(){
    try{
        const token = getItem(KEYS.SESSION_TOKEN);
        const response = await axiosInstance.delete(generateUrl('AUTH'), {
            headers: {
                'X-Session-Token': token,
            },
        });
        return response.data;
    }catch(error){
        throw error;
    }
}

export function useLogout(){
    const queryClient = useQueryClient();
    const {setToken} = useAuth();

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            // Clear client-side auth data
            removeItem(KEYS.SESSION_TOKEN);
            // Invalidate auth-status to refresh state
            setToken(null);
            queryClient.clear();
        }
    });
}