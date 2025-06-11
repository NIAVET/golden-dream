
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

export const useMobileFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initMobile = async () => {
      try {
        if (Capacitor.isNativePlatform()) {
          setIsNative(true);
          console.log('Initializing mobile features...');
          
          // Configure status bar with error handling
          await setupStatusBar();
          
          // Hide splash screen with error handling
          await setupSplashScreen();
          
          // Setup push notifications with error handling
          await setupPushNotifications();
          
          // Setup network monitoring with error handling
          await setupNetworkMonitoring();
          
          // Request local notification permissions with error handling
          await setupLocalNotifications();
          
          console.log('Mobile features initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing mobile features:', error);
      }
    };

    initMobile();
  }, []);

  const setupStatusBar = async () => {
    try {
      if (Capacitor.isPluginAvailable('StatusBar')) {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        await StatusBar.setStyle({ style: Style.Dark });
        console.log('StatusBar configured');
      }
    } catch (error) {
      console.log('StatusBar not available or failed to configure:', error);
    }
  };

  const setupSplashScreen = async () => {
    try {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.hide();
        console.log('SplashScreen hidden');
      }
    } catch (error) {
      console.log('SplashScreen not available or failed to hide:', error);
    }
  };

  const setupPushNotifications = async () => {
    try {
      if (Capacitor.isPluginAvailable('PushNotifications')) {
        const { PushNotifications } = await import('@capacitor/push-notifications');
        const permission = await PushNotifications.requestPermissions();
        
        if (permission.receive === 'granted') {
          await PushNotifications.register();
          
          PushNotifications.addListener('registration', (token) => {
            console.log('Push registration success, token: ' + token.value);
          });

          PushNotifications.addListener('pushNotificationReceived', (notification) => {
            toast({
              title: notification.title || 'Nouvelle notification',
              description: notification.body || 'Vous avez reçu une notification'
            });
          });
          
          console.log('Push notifications configured');
        }
      }
    } catch (error) {
      console.log('Push notifications not available or failed to configure:', error);
    }
  };

  const setupLocalNotifications = async () => {
    try {
      if (Capacitor.isPluginAvailable('LocalNotifications')) {
        const { LocalNotifications } = await import('@capacitor/local-notifications');
        await LocalNotifications.requestPermissions();
        console.log('Local notifications configured');
      }
    } catch (error) {
      console.log('Local notifications not available or failed to configure:', error);
    }
  };

  const setupNetworkMonitoring = async () => {
    try {
      if (Capacitor.isPluginAvailable('Network')) {
        const { Network } = await import('@capacitor/network');
        const status = await Network.getStatus();
        setNetworkStatus(status);

        Network.addListener('networkStatusChange', (status) => {
          setNetworkStatus(status);
          if (!status.connected) {
            toast({
              title: 'Connexion perdue',
              description: 'Vérifiez votre connexion Internet',
              variant: 'destructive'
            });
          }
        });
        
        console.log('Network monitoring configured');
      }
    } catch (error) {
      console.log('Network monitoring not available or failed to configure:', error);
    }
  };

  const sendLocalNotification = async (title: string, body: string) => {
    if (isNative) {
      try {
        if (Capacitor.isPluginAvailable('LocalNotifications')) {
          const { LocalNotifications } = await import('@capacitor/local-notifications');
          await LocalNotifications.schedule({
            notifications: [
              {
                title,
                body,
                id: Date.now(),
                schedule: { at: new Date(Date.now() + 1000) }
              }
            ]
          });
        }
      } catch (error) {
        console.log('Local notification failed:', error);
      }
    }
  };

  const vibrate = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (isNative) {
      try {
        if (Capacitor.isPluginAvailable('Haptics')) {
          const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
          const impactStyle = style === 'light' ? ImpactStyle.Light : 
                             style === 'heavy' ? ImpactStyle.Heavy : 
                             ImpactStyle.Medium;
          await Haptics.impact({ style: impactStyle });
        }
      } catch (error) {
        console.log('Haptics not available:', error);
      }
    }
  };

  return {
    isNative,
    networkStatus,
    sendLocalNotification,
    vibrate
  };
};
