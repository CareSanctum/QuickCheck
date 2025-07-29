// import * as SecureStore from 'expo-secure-store';

// // CRUD functions for secure storage
// const setItem = async (key: string, value: string) => {
//     console.log(`Setting ${key}:`, value);
//     await SecureStore.setItemAsync(key, value);
// }

// const getItem = async (key: string) => {
//     const value = await SecureStore.getItemAsync(key);
//     console.log(`Getting ${key}:`, value);
//     return value;
// }

// const removeItem = async (key: string) => {
//     console.log(`Removing ${key}`);
//     await SecureStore.deleteItemAsync(key);
// }

// //Key constants
// const KEYS = {
//     SESSION_TOKEN: 'SESSION_TOKEN',
//     PASSWORD_RESET_KEY: 'PASSWORD_RESET_KEY',
// }
// export { setItem, getItem, removeItem, KEYS };


import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({id: 'session-storage'});

function setItem(key: string, value: any) {
    console.log(`Setting ${key}:`, value);
    storage.set(key, value)
}

function getItem(key: string) {
    const value = storage.getString(key);
    console.log(`Getting ${key}:`, value);
    return value;
}

function removeItem(key: string) {
    console.log(`Removing ${key}`);
    storage.delete(key);
}

const KEYS = {
    SESSION_TOKEN: 'SESSION_TOKEN',
    PASSWORD_RESET_KEY: 'PASSWORD_RESET_KEY',
    AUTHENTICATION_STATUS: 'AUTHENTICATION_STATUS',
    USER_DATA: 'USER_DATA',
}

export { setItem, getItem, removeItem, KEYS };
