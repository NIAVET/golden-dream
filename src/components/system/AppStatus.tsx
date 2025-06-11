
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Wifi, Database } from "lucide-react";
import { isSupabaseConfigured } from '@/lib/supabase';
import { APP_CONFIG } from '@/config/app';

const AppStatus = () => {
  const supabaseStatus = isSupabaseConfigured();
  
  return (
    <Card className="bg-white/95 border-2 border-blue-400">
      <CardHeader>
        <CardTitle className="text-lg text-blue-900 flex items-center">
          <Wifi className="w-5 h-5 mr-2" />
          Statut de l'Application
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Application</span>
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Opérationnelle
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Base de données</span>
          {supabaseStatus ? (
            <Badge className="bg-green-500 text-white">
              <Database className="w-3 h-3 mr-1" />
              Connectée
            </Badge>
          ) : (
            <Badge className="bg-yellow-500 text-white">
              <AlertCircle className="w-3 h-3 mr-1" />
              Mode Démo
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Version</span>
          <Badge variant="outline">
            v{APP_CONFIG.version}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppStatus;
