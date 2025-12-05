import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet, BackHandler, Platform, Linking, Alert } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import SendIntentAndroid from "react-native-send-intent";

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
import { supabase } from "../supabase/client";

WebBrowser.maybeCompleteAuthSession();

async function loginWithGoogleNative(webViewRef: React.RefObject<WebView | null>) {
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: "caresanctum",
    path: "auth"
  });
  console.log("redirectUri", redirectUri);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUri,
      skipBrowserRedirect: true,
    },
  });
  
  if (error) {
    console.log("Supabase OAuth error", error);
    return;
  }
  
  if (!data?.url) {
    console.log("Supabase OAuth did not return auth url");
    return;
  }
  
  const authUrl = data.url;
  console.log("Opening auth url in browser", authUrl);
  
  // 1. Open the Supabase auth url in a secure browser
  const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
  console.log("openAuthSessionAsync result", result);
  
  // User closed or cancelled
  if (result.type !== "success" || !result.url) {
    console.log("User did not complete Google login");
    return;
  }
  
  // 2. Parse tokens from the callback url fragment
  try {
    const urlObj = new URL(result.url);
    const hash = urlObj.hash.startsWith("#")
      ? urlObj.hash.slice(1)
      : urlObj.hash;

    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    const expiresAtRaw = params.get("expires_at");
    const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : null;

    console.log("Parsed tokens", {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      expiresAt,
    });

    if (!accessToken || !refreshToken) {
      console.log("Missing tokens in callback url");
      return;
    }

    const js = `
      if (window.handleNativeOAuthSession) {
        window.handleNativeOAuthSession(
          ${JSON.stringify(accessToken)},
          ${JSON.stringify(refreshToken)},
          ${JSON.stringify(expiresAt)}
        );
      }
      true;
    `;

    webViewRef.current?.injectJavaScript(js);
  } catch (e) {
    console.log("Failed to parse callback url", e, result.url);
  }
}

const TARGET_PACKAGE = "com.tgelec.setracker"; // your package name here

async function openSETrackerApp() {
  try {
    const isInstalled = await SendIntentAndroid.isAppInstalled(TARGET_PACKAGE);

    if (!isInstalled) {
      // Fallback to Play Store if app is not installed
      const playStoreUrl = `market://details?id=${TARGET_PACKAGE}`;
      const httpUrl = `https://play.google.com/store/apps/details?id=${TARGET_PACKAGE}`;

      const canOpenMarket = await Linking.canOpenURL(playStoreUrl);
      const storeUrl = canOpenMarket ? playStoreUrl : httpUrl;

      await Linking.openURL(storeUrl);
      return;
    }

    // App is installed, try to open it
    await SendIntentAndroid.openApp(TARGET_PACKAGE, {});
  } catch (err) {
    console.error("Failed to open app", err);
    Alert.alert("Error", "Could not open the app");
  }
}

function handleOauthCallbackFactory(webViewRef: React.RefObject<WebView | null>) {
  return async function handleOauthCallback(event: any) {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const type = data.type;
      if (type === "GOOGLE_SIGNIN") {
        await loginWithGoogleNative(webViewRef);
        return;
      }
      if (type === "OPEN_DEVICE_APP" ){
        await openSETrackerApp();
        return;
      }
      console.log("Unknown message type from webview", type);

    } catch (e) {
      console.log("Invalid webview message", e);
    }
  };
}

export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const webappUrl = process.env.EXPO_PUBLIC_WEBAPP_URL;
  if (!webappUrl) {
    throw new Error("EXPO_PUBLIC_WEBAPP_URL is not set");
  }
  return (
        <SafeAreaView className="flex-1">
            {/* <KeyboardAwareScrollView
                style={{ flex: 1 }}
                bottomOffset={10}
                keyboardShouldPersistTaps="handled"
            > */}
                <WebView
                    ref={webViewRef}
                    source={{ uri: `${webappUrl}/auth`}}
                    style={{ flex: 1 }}
                    onMessage={handleOauthCallbackFactory(webViewRef)}
                />
            {/* </KeyboardAwareScrollView> */}
        </SafeAreaView>
    )
}



