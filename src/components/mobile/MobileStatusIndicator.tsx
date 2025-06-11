
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Wifi, WifiOff, Battery } from 'lucide-react';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

const MobileStatusIndicator = () => {
  const { isNative, networkStatus } = useMobileFeatures();

  if (!isNative) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      <Badge className="bg-blue-600 text-white">
        <Smartphone className="w-3 h-3 mr-1" />
        App Mobile
      </Badge>
      
      {networkStatus && (
        <Badge className={networkStatus.connected ? "bg-green-600 text-white" : "bg-red-600 text-white"}>
          {networkStatus.connected ? (
            <>
              <Wifi className="w-3 h-3 mr-1" />
              En ligne
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 mr-1" />
              Hors ligne
            </>
          )}
        </Badge>
      )}
    </div>
  );
};

export default MobileStatusIndicator;
