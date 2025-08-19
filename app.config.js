const variant = process.env.APP_VARIANT ?? "production";

const name = {
  "development": "QC-Dev",
  "preview": "QC-Preview",
  "production": "CareSanctum"
}[variant];

const bundleIdentifier = {
  "development": "com.lucitang.QuickCheck.dev",
  "preview": "com.lucitang.QuickCheck.preview",
  "production": "com.lucitang.QuickCheck"
}[variant];

const pkg = require('./package.json')
const VERSION = pkg.version


export default {
    "name": name,
    "slug": "caresanctum-qc",
    "version": VERSION,
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": bundleIdentifier
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icons/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": bundleIdentifier
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-secure-store",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#ffffff",
          "image": "./assets/icons/splash-icon-light.png",
          "dark": {
            "image": "./assets/icons/splash-icon-dark.png",
            "backgroundColor": "#000000"
          },
        }
      ]
    ],
    "updates": {
      "url": "https://u.expo.dev/a8e03478-2376-444b-b249-01fcd5f20c2f"
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "extra": {
      "eas": {
        "projectId": "a8e03478-2376-444b-b249-01fcd5f20c2f"
      }
    },
    "owner": "caresanctum"
}
