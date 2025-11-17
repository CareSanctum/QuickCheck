import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, BackHandler, Platform } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';

export default function Index() {
    return (
        <SafeAreaView className="flex-1">
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                bottomOffset={10}
                keyboardShouldPersistTaps="handled"
            > */}
                <WebView
                    source={{ uri: 'https://wapp.caresanctum.com/auth'}}
                    style={{ flex: 1 }}
                />
            {/* </KeyboardAwareScrollView> */}
        </SafeAreaView>
    )
}