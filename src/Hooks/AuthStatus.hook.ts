import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../Network/Axios.config";
import { generateUrl } from "../Network/Urls";
import { getItem, KEYS, removeItem } from "../Storage";

async function getAuthStatus(token: string){
    try {
      const response = await axiosInstance.get(generateUrl('AUTH'), {
        headers: {
          'X-Session-Token': token,
        },
      });
      return response.data;
    } catch (error:any) {
      if (error.response.status === 401 || error.response.status === 410) {
        removeItem(KEYS.SESSION_TOKEN);
      }
      throw error;
    }
  }

export function useAuthStatus(token?: string| null) {
    return useQuery({
        queryKey: ['auth-status', token],
        queryFn: () => getAuthStatus(token!), // will never fire when token is falsy
        enabled: !!token,            // Only fetch when token exists
        retry: false,
        staleTime: 1000 * 60 * 5,
    });
}