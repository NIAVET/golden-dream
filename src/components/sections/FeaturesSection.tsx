
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, BarChart3, Shield, Zap, Target, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Intelligence Artificielle',
      description: 'Algorithmes d\'apprentissage automatique analysant des milliers de tirages pour identifier les tendances cachées.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Analyse Statistique Avancée',
      description: 'Calculs de fréquence, patterns temporels et corrélations entre les numéros pour des prédictions précises.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Target,
      title: 'Prédictions Optimisées',
      description: 'Combinaisons générées selon votre profil de jeu pour maximiser vos probabilités de gain.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Zap,
      title: 'Mises à Jour en Temps Réel',
      description: 'Base de données actualisée automatiquement après chaque tirage officiel de la FDJ.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: 'Sécurité Maximale',
      description: 'Données chiffrées, authentification sécurisée et respect total de votre vie privée.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: TrendingUp,
      title: 'Suivi de Performance',
      description: 'Historique détaillé de vos prédictions et statistiques de réussite personnalisées.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-800/50 to-yellow-600/50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pourquoi Choisir Dream-golden ?
          </h3>
          <p className="text-yellow-200 text-lg max-w-3xl mx-auto">
            Notre plateforme combine technologie de pointe et expertise en analyse de données 
            pour vous offrir l'expérience de prédiction la plus avancée du marché.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/95 border-2 border-white/20 hover:border-yellow-400 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-blue-900 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-blue-700 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
