const pkg = require('./package.json')

module.exports = function(_config) {
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

  const VERSION = pkg.version

  return {
    "name": name,
    "slug": "caresanctum-qc",
    "version": VERSION,
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "scheme": "caresanctum",
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
      "package": bundleIdentifier,
      "googleServicesFile": "./google-services.json"
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
          "image": "./assets/icons/splash-icon.png",
          // "dark": {
          //   "image": "./assets/icons/splash-icon-dark.png",
          //   "backgroundColor": "#000000"
          // },
          "imageWidth": 200,
        }
      ],
      './plugins/withGradleJVMHeapSizeIncrease.js',
      [
        "expo-notifications",
      ],
      [
        "expo-web-browser",
        {
          "experimentalLauncherActivity": true
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
}