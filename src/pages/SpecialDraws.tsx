
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Crown, Heart, Sparkles, Gift, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSpecialDraws } from "@/hooks/useSpecialDraws";

const SpecialDraws = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('euromillions');
  const { data: specialDraws, isLoading } = useSpecialDraws(selectedGame);

  const games = [
    { id: 'euromillions', name: 'EuroMillions', icon: Crown, color: 'from-blue-600 to-blue-700' },
    { id: 'loto', name: 'Loto', icon: Star, color: 'from-green-600 to-green-700' },
    { id: 'keno', name: 'Keno', icon: TrendingUp, color: 'from-purple-600 to-purple-700' }
  ];

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'vendredi13': return <Sparkles className="w-5 h-5" />;
      case 'saint-valentin': return <Heart className="w-5 h-5" />;
      case 'noel': return <Gift className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'vendredi13': return 'bg-black text-white';
      case 'saint-valentin': return 'bg-red-500 text-white';
      case 'noel': return 'bg-green-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const formatJackpot = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(0)}M€`;
    }
    return `${amount.toLocaleString()}€`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-yellow-600">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/90 to-yellow-600/90 backdrop-blur-sm border-b border-yellow-400/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-2 border-blue-200">
                  <Sparkles className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Tirages Exceptionnels</h1>
                  <p className="text-sm text-yellow-200">Historique FDJ des événements spéciaux</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Sélecteur de jeu */}
        <div className="mb-8">
          <Card className="bg-white/95 border-2 border-yellow-400">
            <CardHeader>
              <CardTitle className="text-blue-900">Choisir un jeu</CardTitle>
              <CardDescription>Sélectionnez le jeu pour voir ses tirages exceptionnels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {games.map((game) => (
                  <Button
                    key={game.id}
                    variant={selectedGame === game.id ? "default" : "outline"}
                    className={`h-16 ${selectedGame === game.id ? `bg-gradient-to-r ${game.color} text-white` : ''}`}
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <game.icon className="w-5 h-5 mr-2" />
                    {game.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des tirages exceptionnels */}
        <Card className="bg-white/95 border-2 border-blue-400">
          <CardHeader className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Historique des Tirages Exceptionnels - {games.find(g => g.id === selectedGame)?.name}
            </CardTitle>
            <CardDescription className="text-blue-200">
              Événements spéciaux et super-tirages avec jackpots exceptionnels
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-blue-600">Chargement de l'historique...</p>
              </div>
            ) : specialDraws && specialDraws.length > 0 ? (
              <div className="space-y-6">
                {specialDraws.map((draw: any, index: number) => (
                  <div key={index} className="border border-blue-200 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-yellow-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getEventColor(draw.eventType)} font-medium`}>
                          {getEventIcon(draw.eventType)}
                          <span className="ml-2">{draw.eventName}</span>
                        </Badge>
                        <div className="text-sm text-blue-600">
                          {new Date(draw.date).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatJackpot(draw.jackpot)}
                        </div>
                        <div className="text-sm text-blue-600">Jackpot</div>
                      </div>
                    </div>

                    {/* Numéros gagnants */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-blue-700">Numéros:</span>
                        <div className="flex space-x-2">
                          {draw.numbers?.map((num: number, idx: number) => (
                            <div
                              key={idx}
                              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                      </div>

                      {draw.stars && (
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium text-yellow-700">Étoiles:</span>
                          <div className="flex space-x-2">
                            {draw.stars.map((star: number, idx: number) => (
                              <div
                                key={idx}
                                className="w-10 h-10 bg-yellow-500 text-blue-900 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                              >
                                {star}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {draw.winners && (
                        <div className="bg-white/50 rounded-lg p-3 mt-4">
                          <div className="text-sm text-blue-700">
                            <strong>{draw.winners}</strong> gagnant{draw.winners > 1 ? 's' : ''} au rang 1
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-300" />
                <h3 className="text-xl font-semibold text-blue-700 mb-2">Aucun tirage exceptionnel</h3>
                <p className="text-blue-600">L'historique des tirages exceptionnels sera bientôt disponible</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SpecialDraws;
