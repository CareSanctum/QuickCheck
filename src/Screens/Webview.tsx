import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, BackHandler, Platform } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { supabase } from "../supabase/client";

WebBrowser.maybeCompleteAuthSession();

async function loginWithGoogleNative() {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "caresanctum",
    path: "auth"
  });
  console.log("redirectUri", redirectUri);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUri,
      skipBrowserRedirect: true
    }
  });

  console.log("signInWithOAuth data", data, "error", error);
  if (error || !data?.url) {
    return;
  }
  const authUrl = data?.url;
  console.log("authUrl opened in browser", authUrl);

  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
  console.log("openAuthSessionAsync result", result);
  
  if (result.type !== "success") {
    return;
  }

  // Supabase should have handled the code exchange on redirect
  const session = await supabase.auth.getSession();

  if (session.data.session) {
    // await sendSessionIntoWebView(session.data.session);
    console.log('session', session.data.session);
  }
}

async function handleOauthCallback(event: any){
    const data = JSON.parse(event.nativeEvent.data);
    if(data.type === 'GOOGLE_SIGNIN'){
        await loginWithGoogleNative();
    }
}

export default function Index() {
    return (
        <SafeAreaView className="flex-1">
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                bottomOffset={10}
                keyboardShouldPersistTaps="handled"
            > */}
                <WebView
                    source={{ uri: 'http://192.168.1.93:8080/auth'}}
                    style={{ flex: 1 }}
                    onMessage={handleOauthCallback}
                />
            {/* </KeyboardAwareScrollView> */}
        </SafeAreaView>
    )
}