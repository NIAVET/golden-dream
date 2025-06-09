
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Smartphone, RefreshCw, BarChart3, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const games = [
    {
      name: "EuroMillions",
      description: "5 numéros + 2 étoiles",
      probability: "1 sur 139 838 160",
      jackpot: "17 000 000 €",
      color: "bg-gradient-to-r from-blue-600 to-purple-600",
      route: "/euromillions"
    },
    {
      name: "Loto",
      description: "5 numéros + 1 numéro chance",
      probability: "1 sur 19 068 840",
      jackpot: "2 000 000 €",
      color: "bg-gradient-to-r from-green-600 to-emerald-600",
      route: "/loto"
    },
    {
      name: "EuroDreams",
      description: "6 numéros + 1 numéro rêve",
      probability: "1 sur 19 191 900",
      jackpot: "20 000 € / mois à vie",
      color: "bg-gradient-to-r from-purple-600 to-pink-600",
      route: "/eurodreams"
    },
    {
      name: "Keno",
      description: "2 à 10 numéros sur 70",
      probability: "Variable selon mise",
      jackpot: "Jusqu'à 100 000 €",
      color: "bg-gradient-to-r from-orange-600 to-red-600",
      route: "/keno"
    }
  ];

  const features = [
    {
      icon: Calculator,
      title: "Calculs Probabilistes",
      description: "Algorithmes avancés pour calculer vos chances de gain"
    },
    {
      icon: TrendingUp,
      title: "Analyses Statistiques",
      description: "Tendances et patterns basés sur l'historique complet"
    },
    {
      icon: RefreshCw,
      title: "Mise à Jour Auto",
      description: "Synchronisation automatique après chaque tirage"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Application optimisée pour tous les appareils"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LotoAnalytics Pro</h1>
                <p className="text-sm text-gray-600">Calculateur de Probabilités FDJ</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <RefreshCw className="w-3 h-3 mr-1" />
              Données à jour
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Maximisez vos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Chances de Gain</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Application professionnelle d'analyse probabiliste pour tous les jeux de la Française des Jeux. 
            Calculs précis, statistiques avancées et mise à jour automatique.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Calculs en temps réel
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Historique complet
            </div>
            <div className="flex items-center">
              <RefreshCw className="w-4 h-4 mr-1" />
              Auto-sync
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Jeux Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                <div className={`h-2 ${game.color}`} />
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                    {game.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Probabilité:</span>
                      <span className="font-medium">{game.probability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Jackpot moyen:</span>
                      <span className="font-medium text-green-600">{game.jackpot}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full group-hover:bg-blue-600 transition-colors"
                    onClick={() => navigate(game.route)}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Analyser
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Fonctionnalités Avancées
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à Optimiser vos Jeux ?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Commencez votre analyse probabiliste dès maintenant
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => navigate('/euromillions')}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Commencer l'Analyse
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2024 LotoAnalytics Pro - Calculateur de probabilités pour la Française des Jeux
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Application indépendante - Jeu responsable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
