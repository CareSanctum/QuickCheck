import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import axiosInstance from "../Network/Axios.config";
import { useAuth } from "../Context/AuthContext";
import { getItem, KEYS } from "../Storage";

async function login({username, password}: {username: string, password: string}) {
    try{
        // Check if username is a phone number (10 digits) or already has country code
        const isPhoneNumber = /^\d{10}$/.test(username) || /^\+91\d{10}$/.test(username);
        
        // Format username: add +91 if it's a 10-digit phone number, otherwise keep as is
        const formattedUsername = isPhoneNumber && !username.startsWith('+91') 
            ? `+91${username}` 
            : username;
        
        const response = await axiosInstance.post(generateUrl('LOGIN'), {
            username: formattedUsername,
            password,
        });
        return response.data;
    }catch(error: any){
        console.log(error);
        throw error;
    }
}

export function useLogin() {
    const queryClient = useQueryClient();
    const {setToken} = useAuth();
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            setToken(getItem(KEYS.SESSION_TOKEN) ?? null);
            queryClient.invalidateQueries({ queryKey: ['auth-status'] });
        },
    });
}