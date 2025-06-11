
import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface SecuritySettings {
  pinEnabled: boolean;
}

export const useMobileSecurity = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<SecuritySettings>({
    pinEnabled: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadSecuritySettings();
    }
  }, [user]);

  const loadSecuritySettings = async () => {
    if (!user) return;

    try {
      const { data } = await supabase
        .from('user_settings')
        .select('pin_enabled')
        .eq('id', user.id)
        .single();

      if (data) {
        setSettings({
          pinEnabled: data.pin_enabled || false
        });
      }
    } catch (error) {
      console.error('Error loading security settings:', error);
    }
  };

  const setupPin = async (pin: string) => {
    if (!user) return false;

    setIsLoading(true);
    try {
      // Hash the PIN (in production, use a proper hashing library)
      const pinHash = btoa(pin + user.id);
      
      const { error } = await supabase
        .from('user_settings')
        .update({ 
          pin_enabled: true, 
          pin_hash: pinHash 
        })
        .eq('id', user.id);

      if (error) throw error;

      // Store PIN locally for quick access
      await Preferences.set({
        key: 'userPin',
        value: pinHash
      });

      setSettings({ pinEnabled: true });
      
      toast({
        title: "Code PIN configuré",
        description: "Votre code PIN a été configuré avec succès"
      });
      
      return true;
    } catch (error) {
      console.error('Error setting up PIN:', error);
      toast({
        title: "Erreur",
        description: "Impossible de configurer le code PIN",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPin = async (pin: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const expectedHash = btoa(pin + user.id);
      const { value: storedHash } = await Preferences.get({ key: 'userPin' });
      
      return storedHash === expectedHash;
    } catch (error) {
      console.error('Error verifying PIN:', error);
      return false;
    }
  };

  const disablePin = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({ 
          pin_enabled: false, 
          pin_hash: null 
        })
        .eq('id', user.id);

      if (error) throw error;

      await Preferences.remove({ key: 'userPin' });
      setSettings({ pinEnabled: false });

      toast({
        title: "Sécurité désactivée",
        description: "Code PIN désactivé"
      });
    } catch (error) {
      console.error('Error disabling PIN:', error);
      toast({
        title: "Erreur",
        description: "Impossible de désactiver le code PIN",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    settings,
    isLoading,
    setupPin,
    verifyPin,
    disablePin
  };
};
