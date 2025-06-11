
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Crown, Coins, RefreshCw } from "lucide-react";
import UserProfile from '@/components/auth/UserProfile';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-blue-200">
              <Coins className="w-7 h-7 text-blue-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Crown className="w-6 h-6 text-yellow-400 mr-2" />
                Golden-Dream
              </h1>
              <p className="text-sm text-yellow-200">Prédicteur IA - Jeux FDJ</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 border-yellow-300">
              <RefreshCw className="w-3 h-3 mr-1" />
              Données à jour
            </Badge>
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
