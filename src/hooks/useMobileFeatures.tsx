
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Network } from '@capacitor/network';
import { useToast } from '@/hooks/use-toast';

export const useMobileFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initMobile = async () => {
      if (Capacitor.isNativePlatform()) {
        setIsNative(true);
        
        // Configure status bar
        await StatusBar.setStyle({ style: Style.Dark });
        
        // Hide splash screen after app loads
        await SplashScreen.hide();
        
        // Setup push notifications
        await setupPushNotifications();
        
        // Setup network monitoring
        await setupNetworkMonitoring();
        
        // Request local notification permissions
        await LocalNotifications.requestPermissions();
        
        console.log('Mobile features initialized');
      }
    };

    initMobile();
  }, []);

  const setupPushNotifications = async () => {
    try {
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
      console.error('Push notification setup error:', error);
    }
  };

  const setupNetworkMonitoring = async () => {
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
  };

  const sendLocalNotification = async (title: string, body: string) => {
    if (isNative) {
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
  };

  const vibrate = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (isNative) {
      await Haptics.impact({ style });
    }
  };

  return {
    isNative,
    networkStatus,
    sendLocalNotification,
    vibrate
  };
};
