
import React from 'react';
import { Crown, TrendingUp, RefreshCw, Smartphone, Sparkles } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Crown,
      title: "IA Prédictive",
      description: "Algorithmes d'intelligence artificielle pour prédire les numéros gagnants"
    },
    {
      icon: TrendingUp,
      title: "Analyse Historique",
      description: "Analyse complète de tous les tirages depuis la création de chaque jeu"
    },
    {
      icon: RefreshCw,
      title: "Mise à Jour Auto",
      description: "Synchronisation automatique après chaque nouveau tirage"
    },
    {
      icon: Smartphone,
      title: "Mobile Sécurisé",
      description: "Application mobile avec authentification PIN et empreinte"
    }
  ];

  return (
    <section className="py-16 px-4 bg-blue-900/50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-yellow-400 mr-3" />
          Fonctionnalités Avancées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border-2 border-blue-200">
                <feature.icon className="w-8 h-8 text-blue-900" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">{feature.title}</h4>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
