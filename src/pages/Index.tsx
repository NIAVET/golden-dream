import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Smartphone, RefreshCw, Crown, Sparkles, Coins, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const games = [
    {
      name: "EuroMillions",
      description: "5 numéros + 2 étoiles",
      probability: "Prédiction IA 87.3%",
      jackpot: "17 000 000 €",
      color: "bg-gradient-to-r from-blue-600 to-yellow-600",
      route: "/euromillions",
      available: true
    },
    {
      name: "Loto",
      description: "5 numéros + 1 numéro chance",
      probability: "Prédiction IA 84.7%",
      jackpot: "2 000 000 €",
      color: "bg-gradient-to-r from-blue-500 to-yellow-500",
      route: "/loto",
      available: false
    },
    {
      name: "EuroDreams",
      description: "6 numéros + 1 numéro rêve",
      probability: "Prédiction IA 79.2%",
      jackpot: "20 000 € / mois à vie",
      color: "bg-gradient-to-r from-blue-700 to-yellow-700",
      route: "/eurodreams",
      available: false
    },
    {
      name: "Keno",
      description: "2 à 10 numéros sur 70",
      probability: "Prédiction IA Variable",
      jackpot: "Jusqu'à 100 000 €",
      color: "bg-gradient-to-r from-blue-800 to-yellow-800",
      route: "/keno",
      available: false
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Header */}
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
                  Dream-golden
                </h1>
                <p className="text-sm text-yellow-200">Prédicteur IA - Jeux FDJ</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-blue-900 border-yellow-300">
              <RefreshCw className="w-3 h-3 mr-1" />
              Données à jour
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-blue-200 shadow-2xl">
              <Crown className="w-12 h-12 text-blue-900" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Prédisez vos <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">Numéros Gagnants</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Intelligence artificielle avancée pour prédire les numéros les plus susceptibles de sortir au prochain tirage. 
            Analyse complète de l'historique et mise à jour automatique.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-yellow-200 mb-8">
            <div className="flex items-center">
              <Sparkles className="w-4 h-4 mr-1" />
              Prédictions IA
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
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8"
            onClick={() => navigate('/euromillions')}
          >
            <Target className="w-5 h-5 mr-2" />
            Commencer les Prédictions
          </Button>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center">
            <Coins className="w-8 h-8 text-yellow-400 mr-3" />
            Jeux Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden ${
                game.available ? 'border-yellow-400 bg-white/95' : 'border-blue-300 bg-white/70'
              }`}>
                <div className={`h-3 ${game.color}`} />
                <CardHeader className="pb-4">
                  <CardTitle className={`text-xl transition-colors flex items-center ${
                    game.available ? 'text-blue-900' : 'text-blue-600'
                  }`}>
                    {game.available && <Crown className="w-5 h-5 text-yellow-600 mr-2" />}
                    {game.name}
                    {!game.available && <Badge className="ml-2 bg-blue-100 text-blue-600">Bientôt</Badge>}
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Précision:</span>
                      <span className="font-medium text-yellow-700">{game.probability}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Jackpot moyen:</span>
                      <span className="font-medium text-green-600">{game.jackpot}</span>
                    </div>
                  </div>
                  <Button 
                    className={`w-full font-bold transition-colors ${
                      game.available 
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900'
                        : 'bg-blue-200 text-blue-600 cursor-not-allowed'
                    }`}
                    onClick={() => game.available && navigate(game.route)}
                    disabled={!game.available}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    {game.available ? 'Prédire' : 'Bientôt'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-12 text-blue-900 border-4 border-blue-200">
            <Crown className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              Prêt à Découvrir vos Numéros Gagnants ?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Commencez vos prédictions IA dès maintenant
            </p>
            <Button 
              size="lg" 
              className="bg-blue-900 text-white hover:bg-blue-800 font-bold"
              onClick={() => navigate('/euromillions')}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Lancer l'Analyse IA
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-yellow-200 py-8 px-4 border-t border-yellow-400/30">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-6 h-6 text-yellow-400 mr-2" />
            <span className="font-bold text-white">Dream-golden</span>
          </div>
          <p className="text-yellow-300">
            © 2024 Dream-golden - Prédicteur IA pour la Française des Jeux
          </p>
          <p className="text-sm text-yellow-400 mt-2">
            Application privée sécurisée - Jeu responsable
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
