
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.657065bbccc54f4d8729509b31f5cb69',
  appName: 'mega-loto-chute-tracker',
  webDir: 'dist',
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
    BiometricAuth: {
      allowDeviceCredential: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true
  }
};

export default config;
