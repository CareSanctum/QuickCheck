import axiosInstance from "../Network/Axios.config";
import { useMutation, useQuery } from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";

async function isSignupOpen() {
    try{
        const response = await axiosInstance.get(generateUrl('IS_SIGNUP_OPEN'));
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

async function addToWaitlist(email: string) {
    try{
        const response = await axiosInstance.post(generateUrl('ADD_TO_WAITLIST'), {email});
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const useIsSignupOpen = () => {
    return useQuery({
        queryKey: ['isSignupOpen'],
        queryFn: isSignupOpen,
    });
}

export const useAddToWaitlist = () => {
    return useMutation({
        mutationFn: addToWaitlist,
    });
}