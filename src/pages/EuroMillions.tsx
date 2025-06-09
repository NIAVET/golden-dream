
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calculator, TrendingUp, Star, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EuroMillions = () => {
  const navigate = useNavigate();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);

  const calculateProbability = (rang: number) => {
    const probabilities = {
      1: { chance: 139838160, gain: "17 000 000 €" },
      2: { chance: 6991908, gain: "200 000 €" },
      3: { chance: 3107515, gain: "10 000 €" },
      4: { chance: 621503, gain: "150 €" },
      5: { chance: 31076, gain: "50 €" },
      6: { chance: 14125, gain: "25 €" },
      7: { chance: 13811, gain: "15 €" },
      8: { chance: 986, gain: "12 €" },
      9: { chance: 188, gain: "6 €" },
      10: { chance: 49, gain: "4 €" },
      11: { chance: 28, gain: "4 €" },
      12: { chance: 22, gain: "4 €" },
      13: { chance: 14, gain: "4 €" }
    };
    return probabilities[rang as keyof typeof probabilities];
  };

  const selectNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    }
  };

  const selectStar = (star: number) => {
    if (selectedStars.includes(star)) {
      setSelectedStars(selectedStars.filter(s => s !== star));
    } else if (selectedStars.length < 2) {
      setSelectedStars([...selectedStars, star].sort((a, b) => a - b));
    }
  };

  const generateRandomGrid = () => {
    const numbers = [];
    const stars = [];
    
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    
    while (stars.length < 2) {
      const star = Math.floor(Math.random() * 12) + 1;
      if (!stars.includes(star)) stars.push(star);
    }
    
    setSelectedNumbers(numbers.sort((a, b) => a - b));
    setSelectedStars(stars.sort((a, b) => a - b));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EuroMillions
              </h1>
              <p className="text-sm text-gray-600">Analyseur de Probabilités</p>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Jackpot: 17M€
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grid Selection */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Sélection de Grille
                </CardTitle>
                <CardDescription>
                  Choisissez 5 numéros (1-50) et 2 étoiles (1-12)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Numbers */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    Numéros ({selectedNumbers.length}/5)
                  </h3>
                  <div className="grid grid-cols-10 gap-2">
                    {Array.from({ length: 50 }, (_, i) => i + 1).map(num => (
                      <Button
                        key={num}
                        variant={selectedNumbers.includes(num) ? "default" : "outline"}
                        size="sm"
                        className={`h-10 w-10 ${
                          selectedNumbers.includes(num) 
                            ? "bg-blue-600 hover:bg-blue-700" 
                            : "hover:bg-blue-50"
                        }`}
                        onClick={() => selectNumber(num)}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Stars */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    Étoiles ({selectedStars.length}/2)
                  </h3>
                  <div className="grid grid-cols-12 gap-2">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(star => (
                      <Button
                        key={star}
                        variant={selectedStars.includes(star) ? "default" : "outline"}
                        size="sm"
                        className={`h-10 w-10 ${
                          selectedStars.includes(star) 
                            ? "bg-yellow-500 hover:bg-yellow-600" 
                            : "hover:bg-yellow-50"
                        }`}
                        onClick={() => selectStar(star)}
                      >
                        {star}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={generateRandomGrid} variant="outline" className="flex-1">
                    <Calculator className="w-4 h-4 mr-2" />
                    Grille Aléatoire
                  </Button>
                  <Button 
                    onClick={() => {
                      setSelectedNumbers([]);
                      setSelectedStars([]);
                    }}
                    variant="outline"
                  >
                    Effacer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Grid Display */}
            {(selectedNumbers.length > 0 || selectedStars.length > 0) && (
              <Card>
                <CardHeader>
                  <CardTitle>Votre Grille</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {selectedNumbers.map(num => (
                        <div key={num} className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                          {num}
                        </div>
                      ))}
                      {Array.from({ length: 5 - selectedNumbers.length }).map((_, i) => (
                        <div key={i} className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400">
                          ?
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {selectedStars.map(star => (
                        <div key={star} className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold">
                          {star}
                        </div>
                      ))}
                      {Array.from({ length: 2 - selectedStars.length }).map((_, i) => (
                        <div key={i} className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400">
                          ⭐
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Probability Table */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Probabilités de Gain
                </CardTitle>
                <CardDescription>
                  Chances par rang de gain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 13 }, (_, i) => i + 1).map(rang => {
                    const prob = calculateProbability(rang);
                    if (!prob) return null;
                    
                    return (
                      <div key={rang} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-sm">Rang {rang}</div>
                          <div className="text-xs text-gray-600">
                            1 chance sur {prob.chance.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{prob.gain}</div>
                          <div className="text-xs text-gray-500">
                            {((1 / prob.chance) * 100).toExponential(2)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Statistiques Générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1/22</div>
                    <div className="text-sm text-gray-600">Chance de gagner</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">€8.5</div>
                    <div className="text-sm text-gray-600">Gain moyen</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Basé sur l'historique complet des tirages
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EuroMillions;
