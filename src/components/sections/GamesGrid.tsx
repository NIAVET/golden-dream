
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Coins, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GamesGrid = () => {
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

  return (
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
  );
};

export default GamesGrid;
