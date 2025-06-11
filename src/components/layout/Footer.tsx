
import React from 'react';
import { Coins } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-yellow-200 py-8 px-4 border-t border-yellow-400/30">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Coins className="w-6 h-6 text-yellow-400 mr-2" />
          <span className="font-bold text-white">Golden-Dream</span>
        </div>
        <p className="text-yellow-300">
          © 2024 Golden-Dream - Prédicteur IA pour la Française des Jeux
        </p>
        <p className="text-sm text-yellow-400 mt-2">
          Application privée sécurisée - Jeu responsable
        </p>
      </div>
    </footer>
  );
};

export default Footer;
