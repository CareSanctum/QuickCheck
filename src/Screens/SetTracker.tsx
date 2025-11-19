import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import React from "react";
import {  Linking, Alert } from "react-native";
import SendIntentAndroid from "react-native-send-intent";

const TARGET_PACKAGE = "com.tgelec.setracker"; // your package name here

async function openOtherApp() {
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



const SetTracker = () => {
    const handlePress = () => {
        // Add functionality here
    };

    return (
        <View className="flex-1 justify-center items-center">
            <Button
                className="items-center justify-center h-[56px] bg-primary w-[90%] rounded-full"
                onPress={handlePress}
            >
                <ButtonText className="font-semibold text-[16px] text-primaryForeground" onPress={openOtherApp}>
                   OPEN SETRACKER
                </ButtonText>
            </Button>
        </View>
    );
}

export default SetTracker;

