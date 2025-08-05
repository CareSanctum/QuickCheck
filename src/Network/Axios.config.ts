import axios from "axios";
import { getItem, setItem, KEYS} from "../Storage";

const axiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        if (config.headers['X-Session-Token']) {
            return config;
        }
        const token = getItem(KEYS.SESSION_TOKEN);
        if (token) {
            config.headers['X-Session-Token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        const sessionToken = response?.data?.meta?.session_token;
        if (sessionToken) {
                console.log('Session token found in response:', sessionToken);
                setItem(KEYS.SESSION_TOKEN, sessionToken);
            }
        return response;
    },
    (error) => {
        const sessionToken = error?.response?.data?.meta?.session_token;
        if (sessionToken) {
                console.log('Session token found in error response:', sessionToken);
                setItem(KEYS.SESSION_TOKEN, sessionToken);
            }
        return Promise.reject(error);
    }
)

export default axiosInstance;