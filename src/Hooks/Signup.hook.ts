import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";
import { getItem, KEYS, setItem } from "../Storage";
import { useAuth } from "../Context/AuthContext";

async function signup({email, phone_number, password}: {email: string, phone_number: string, password: string}) {
    try{
        // Add country code +91 to phone number if it doesn't already have it
        const formattedPhoneNumber = phone_number.startsWith('+91') ? phone_number : `+91${phone_number}`;
        
        const response = await axiosInstance.post(generateUrl('SIGNUP'), {
            email,
            phone: formattedPhoneNumber,
            password,
            role: 'USERS'
        },{
            validateStatus: function(status: number){ return status >= 200 && status < 300 || status === 401},
        });
        return response.data;
    }catch(error: any){
        console.log(error);
        throw error;
    }
}

async function verifyEmail({key}: {key: string}) {
    try{
        // const session_token = getItem(KEYS.SESSION_TOKEN);
        // console.log("Session token sent: ", session_token);
        const response = await axiosInstance.post(generateUrl('VERIFY_EMAIL'), {
            key,
        }, {
            // headers: {
            //     'X-Session-Token': session_token,
            // },
            // validateStatus: function(status: number){ return status >= 200 && status < 300 || status === 401},
        }); 
        return response.data;
    }catch(error: any){
        console.log(error);
        throw error;
    }
}

async function resendEmailVerificationcode() {
    try{
        const response = await axiosInstance.post(generateUrl('RESEND_EMAIL_CODE'));
        return response.data;
    }catch(error: any){
        throw error;
    }
}
export function useResendEmailVerificationCode() {
    return useMutation({
        mutationFn: resendEmailVerificationcode,
    });
}

export function useVerifyEmail() {
    const queryClient = useQueryClient();
    const {setToken} = useAuth();
    return useMutation({
        mutationFn: verifyEmail,
        onSuccess: () => {
            setToken(getItem(KEYS.SESSION_TOKEN) ?? null);
            queryClient.invalidateQueries({ queryKey: ['auth-status'] });
            setItem(KEYS.SIGNUP_BONUS_SEEN, 'true');
        },
    });
}

export function useSignup() {
    return useMutation({
        mutationFn: signup,
    });
}