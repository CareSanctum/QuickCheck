import axiosInstance from "../Network/Axios.config";
import { useQuery, useMutation, QueryClient, useQueryClient} from "@tanstack/react-query";
import { generateUrl } from "../Network/Urls";
import { AxiosResponse } from "axios";

export interface ProfileResponse {
    full_name: string | null;
    email: string;
    phone: string;
    profile_picture_url: string | null;
}
async function getProfile() {
    try{
        const response: AxiosResponse<ProfileResponse> = await axiosInstance.get(generateUrl('PROFILE'));
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const useProfile = () => {
    return useQuery({queryKey: ['profile'], queryFn: getProfile});
}

export interface UpdateProfileRequest {
    full_name: string;
}

async function updateProfile(data: UpdateProfileRequest) {
    try{
        const response  = await axiosInstance.post(generateUrl('PROFILE_UPDATE'), data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn: updateProfile,
            onSuccess: () => {queryClient.invalidateQueries({queryKey: ['profile']})}
        }
    );
}