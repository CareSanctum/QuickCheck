import { useMutation} from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";
import { getItem, KEYS} from "../Storage";

async function requestPasswordReset(email: string) {
    try{
        const response = await axiosInstance.post(generateUrl('REQUEST_PASSWORD_RESET'), {
            email
        },{
            validateStatus: function(status: number){ return status >= 200 && status < 300 || status === 401},
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function verifyCode(code: string){    
    const sessionToken = getItem(KEYS.SESSION_TOKEN);
    try{
        const response = await axiosInstance.get(generateUrl('VERIFY_CODE'), {
            headers: {
                'X-Password-Reset-Key': code,
                'X-Session-Token': sessionToken,
            }
        });
        return response.data;
    }catch(error: any){
        throw error;
    }
}

async function resetPassword({key, password}: {key: string, password: string}) {
    try{
        const sessionToken = await getItem(KEYS.SESSION_TOKEN);
        const response = await axiosInstance.post(generateUrl('RESET_PASSWORD'), {
            key,
            password,
        }, {
            headers: {
                'X-Session-Token': sessionToken,
            },
            validateStatus: function(status: number){ return status >= 200 && status < 300 || status === 401},
        });
        return response.data;
    }catch (error: any) {
        throw error;
    }
}

export function useVerifyCode() {
    return useMutation({
        mutationFn: verifyCode,
    });
}
export function useRequestPasswordReset() {
    return useMutation({
        mutationFn: requestPasswordReset,
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: resetPassword,
    });
}