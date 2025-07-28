import * as SecureStore from 'expo-secure-store';

// CRUD functions for secure storage
const setItem = async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
}

const getItem = async (key: string) => {
    return await SecureStore.getItemAsync(key);
}

const removeItem = async (key: string) => {
    await SecureStore.deleteItemAsync(key);
}

//Key constants
const KEYS = {
    SESSION_TOKEN: 'SESSION_TOKEN',
}
export { setItem, getItem, removeItem, KEYS };