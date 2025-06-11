
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Target, TrendingUp, Activity, Cpu, BarChart3, Sparkles } from "lucide-react";

interface AdvancedMetricsProps {
  prediction: {
    accuracy: number;
    confidence: number;
    algorithmVersion: string;
    featureWeights: Record<string, number>;
    quantumCoherence?: number;
    neuralActivation?: number[];
    bayesianCertainty?: number;
  };
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ prediction }) => {
  const getAlgorithmColor = (weight: number) => {
    if (weight >= 0.15) return "bg-green-500";
    if (weight >= 0.10) return "bg-blue-500";
    return "bg-gray-400";
  };

  const formatAlgorithmName = (name: string) => {
    const names: Record<string, string> = {
      quantumInspired: "Quantum IA",
      deepLearning: "Deep Learning",
      markovChain: "Chaîne Markov",
      geneticAlgorithm: "Algorithme Génétique",
      fuzzyLogic: "Logique Floue",
      waveletAnalysis: "Analyse Ondelettes",
      chaosTheory: "Théorie Chaos",
      bayesianNetwork: "Réseau Bayésien"
    };
    return names[name] || name;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Métriques principales */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-blue-900">
            <Target className="w-5 h-5 mr-2" />
            Métriques de Précision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700">Précision IA</span>
              <span className="text-sm font-bold text-blue-900">{prediction.accuracy}%</span>
            </div>
            <Progress value={prediction.accuracy} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-700">Confiance</span>
              <span className="text-sm font-bold text-blue-900">{Math.round(prediction.confidence * 100)}%</span>
            </div>
            <Progress value={prediction.confidence * 100} className="h-2" />
          </div>

          {prediction.quantumCoherence && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-purple-700 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Cohérence Quantique
                </span>
                <span className="text-sm font-bold text-purple-900">{Math.round(prediction.quantumCoherence * 100)}%</span>
              </div>
              <Progress value={prediction.quantumCoherence * 100} className="h-2" />
            </div>
          )}

          {prediction.bayesianCertainty && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-700 flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  Certitude Bayésienne
                </span>
                <span className="text-sm font-bold text-green-900">{Math.round(prediction.bayesianCertainty * 100)}%</span>
              </div>
              <Progress value={prediction.bayesianCertainty * 100} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Poids des algorithmes */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-green-900">
            <Cpu className="w-5 h-5 mr-2" />
            Algorithmes IA
          </CardTitle>
          <CardDescription className="text-green-600">
            Contribution de chaque algorithme
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(prediction.featureWeights)
              .sort(([,a], [,b]) => b - a)
              .slice(0, 6)
              .map(([algorithm, weight]) => (
                <div key={algorithm} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getAlgorithmColor(weight)}`} />
                    <span className="text-sm font-medium text-gray-700">
                      {formatAlgorithmName(algorithm)}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(weight * 100)}%
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Version et performance */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center text-yellow-900">
            <BarChart3 className="w-5 h-5 mr-2" />
            Système IA Ultra-Avancé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-900 mb-1">
                {prediction.algorithmVersion.includes('v3.0') ? '3.0' : '2.0'}
              </div>
              <div className="text-sm text-yellow-700">Version IA</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-900 mb-1">
                {Object.keys(prediction.featureWeights).length}
              </div>
              <div className="text-sm text-orange-700">Algorithmes</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-red-900 mb-1 flex items-center justify-center">
                <Activity className="w-6 h-6 mr-1" />
                {prediction.accuracy >= 90 ? 'ULTRA' : 'HAUTE'}
              </div>
              <div className="text-sm text-red-700">Performance</div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-yellow-300">
            <div className="text-xs text-yellow-800">
              <strong>Algorithme:</strong> {prediction.algorithmVersion}
            </div>
            {prediction.accuracy >= 90 && (
              <div className="text-xs text-green-700 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                <strong>Objectif 90%+ atteint !</strong>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMetrics;
