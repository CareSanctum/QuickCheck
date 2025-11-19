import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";
import * as Application from 'expo-application';


async function getRemainingScreens() {
    try{
        const { nativeApplicationVersion } = Application;
        const response = await axiosInstance.get(generateUrl('REMAINING_SCREENS'), {
            headers: {
                'X-App-Version': nativeApplicationVersion,
            }
        });
        return response.data;
    }
    catch(error: any){
        console.log(error);
        throw error;
    }

}

export const useRemainingScreens = () => {
    return useQuery({
        queryKey: ['onboarding'],
        queryFn: () => getRemainingScreens(),
    });
}