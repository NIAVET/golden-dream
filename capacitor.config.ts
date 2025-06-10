
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.657065bbccc54f4d8729509b31f5cb69',
  appName: 'Dream-golden',
  webDir: 'dist',
  server: {
    url: "https://657065bb-ccc5-4f4d-8729-509b31f5cb69.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1e3a8a",
      showSpinner: false
    }
  }
};

export default config;
