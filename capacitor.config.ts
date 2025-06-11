
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.657065bbccc54f4d8729509b31f5cb69',
  appName: 'Golden-Dream',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://657065bb-ccc5-4f4d-8729-509b31f5cb69.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#1e3a8a",
      showSpinner: false,
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      iosSpinnerStyle: "small",
      splashFullScreen: true,
      splashImmersive: true
    },
    StatusBar: {
      style: "DARK"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#1e3a8a",
      sound: "beep.wav"
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      releaseType: "AAB"
    }
  },
  ios: {
    scheme: "Golden Dream"
  }
};

export default config;
