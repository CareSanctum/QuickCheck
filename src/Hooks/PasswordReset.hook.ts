import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { generateUrl } from "../Network/Urls";
import { getItem, KEYS, setItem} from "../Storage";

async function requestPasswordReset(email: string) {
    try{
        const response = await axios.post(generateUrl('REQUEST_PASSWORD_RESET'), {
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
    const passwordResetToken = getItem(KEYS.PASSWORD_RESET_TOKEN);
    if(!passwordResetToken){
        throw new Error('Password reset token not found');
    }
    try{
        const response = await axios.get(generateUrl('VERIFY_CODE'), {
            headers: {
                'X-Password-Reset-Key': code,
                'X-Session-Token': passwordResetToken,
            }
        });
        return response.data;
    }catch(error: any){
        throw error;
    }
}

async function resetPassword({password}: {password: string}) {
    try{
        const passwordResetKey = getItem(KEYS.PASSWORD_RESET_KEY);
        const passwordResetToken = getItem(KEYS.PASSWORD_RESET_TOKEN);
        if(!passwordResetKey || !passwordResetToken){
            throw new Error('Password reset key or token not found');
        }
        const response = await axios.post(generateUrl('RESET_PASSWORD'), {
            key: passwordResetKey,
            password,
        }, {
            headers: {
                'X-Session-Token': passwordResetToken,
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