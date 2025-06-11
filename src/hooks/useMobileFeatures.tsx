
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

export const useMobileFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initMobile = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        try {
          // Configure status bar
          const { StatusBar, Style } = await import('@capacitor/status-bar');
          await StatusBar.setStyle({ style: Style.Dark });
        } catch (error) {
          console.log('StatusBar not available:', error);
        }
        
        try {
          // Hide splash screen after app loads
          const { SplashScreen } = await import('@capacitor/splash-screen');
          await SplashScreen.hide();
        } catch (error) {
          console.log('SplashScreen not available:', error);
        }
        
        // Setup push notifications
        await setupPushNotifications();
        
        // Setup network monitoring
        await setupNetworkMonitoring();
        
        // Request local notification permissions
        await setupLocalNotifications();
        
        console.log('Mobile features initialized');
      }
    };

    initMobile();
  }, []);

  const setupPushNotifications = async () => {
    try {
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
      }
    } catch (error) {
      console.log('Push notifications not available:', error);
    }
  };

  const setupLocalNotifications = async () => {
    try {
      const { LocalNotifications } = await import('@capacitor/local-notifications');
      await LocalNotifications.requestPermissions();
    } catch (error) {
      console.log('Local notifications not available:', error);
    }
  };

  const setupNetworkMonitoring = async () => {
    try {
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
    } catch (error) {
      console.log('Network monitoring not available:', error);
    }
  };

  const sendLocalNotification = async (title: string, body: string) => {
    if (isNative) {
      try {
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
      } catch (error) {
        console.log('Local notification failed:', error);
      }
    }
  };

  const vibrate = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (isNative) {
      try {
        const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
        const impactStyle = style === 'light' ? ImpactStyle.Light : 
                           style === 'heavy' ? ImpactStyle.Heavy : 
                           ImpactStyle.Medium;
        await Haptics.impact({ style: impactStyle });
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
