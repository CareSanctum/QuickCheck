import axios from "axios";
import { getItem, setItem, KEYS} from "../Storage";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const sessionToken = await getItem(KEYS.SESSION_TOKEN);
        if (sessionToken) {
            config.headers['X-Session-Token'] = sessionToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    async (response) => {
        const sessionToken = response?.data?.meta?.session_token;
        if (sessionToken) {
            await setItem(KEYS.SESSION_TOKEN, sessionToken);
        }
        return response;
    },
    async (error) => {
        const sessionToken = error?.response?.data?.meta?.session_token;
        if (sessionToken) {
            await setItem(KEYS.SESSION_TOKEN, sessionToken);
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;