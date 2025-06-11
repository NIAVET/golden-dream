import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface UltraAdvancedPrediction {
  predictedNumbers: number[];
  predictedStars?: number[];
  predictedChance?: number;
  predictedDream?: number;
  totalDraws: number;
  lastUpdate: string;
  accuracy: number;
  confidence: number;
  algorithmVersion: string;
  featureWeights: Record<string, number>;
  quantumCoherence?: number;
  neuralActivation?: number[];
  bayesianCertainty?: number;
}

export const usePredictions = (game: string) => {
  return useQuery({
    queryKey: ['ultra-predictions', game],
    queryFn: async (): Promise<UltraAdvancedPrediction> => {
      if (!isSupabaseConfigured()) {
        // Mode démonstration avec précision simulée de 90%+
        return {
          predictedNumbers: generateDemoUltraPredictions(game),
          predictedStars: game === 'euromillions' ? [3, 8] : undefined,
          predictedChance: game === 'loto' ? 7 : undefined,
          totalDraws: 2847,
          lastUpdate: new Date().toISOString(),
          accuracy: 91.3,
          confidence: 0.94,
          algorithmVersion: 'Ultra-Advanced-Quantum-AI-v3.0 (Mode Démo)',
          featureWeights: {
            quantumInspired: 0.20,
            deepLearning: 0.18,
            markovChain: 0.15,
            geneticAlgorithm: 0.12,
            fuzzyLogic: 0.10,
            waveletAnalysis: 0.08,
            chaosTheory: 0.07,
            bayesianNetwork: 0.10
          },
          quantumCoherence: 0.95,
          bayesianCertainty: 0.93
        };
      }

      // Appeler la fonction Supabase ultra-avancée
      const { data, error } = await supabase.functions.invoke('advanced-predictions', {
        body: { game }
      });

      if (error) {
        throw new Error(`Erreur lors de la prédiction ultra-avancée: ${error.message}`);
      }

      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (données plus fraîches)
    refetchInterval: 5 * 60 * 1000, // Rafraîchir toutes les 5 minutes
  });
};

function generateDemoUltraPredictions(game: string): number[] {
  // Générateur de prédictions démo ultra-sophistiqué
  const algorithms = [
    () => quantumDemoPredict(game),
    () => aiDemoPredict(game),
    () => patternDemoPredict(game)
  ];
  
  const predictions = algorithms.map(algo => algo());
  
  // Combiner les prédictions avec pondération
  const combined = combineDemoPredictions(predictions, game);
  
  return combined;
}

function quantumDemoPredict(game: string): number[] {
  const max = game === 'euromillions' ? 50 : game === 'loto' ? 49 : 70;
  const count = game === 'euromillions' || game === 'loto' ? 5 : 10;
  
  // Simulation quantique avec biais vers certains numéros "chauds"
  const hotNumbers = [7, 14, 21, 35, 42, 3, 12, 28, 39, 47];
  const predictions = new Set<number>();
  
  while (predictions.size < count) {
    const isHot = Math.random() < 0.4; // 40% de chance de choisir un numéro chaud
    
    if (isHot && hotNumbers.length > 0) {
      const hotIndex = Math.floor(Math.random() * hotNumbers.length);
      const hotNum = hotNumbers[hotIndex];
      if (hotNum <= max) {
        predictions.add(hotNum);
      }
    } else {
      predictions.add(Math.floor(Math.random() * max) + 1);
    }
  }
  
  return Array.from(predictions).sort((a, b) => a - b);
}

function aiDemoPredict(game: string): number[] {
  const max = game === 'euromillions' ? 50 : game === 'loto' ? 49 : 70;
  const count = game === 'euromillions' || game === 'loto' ? 5 : 10;
  
  // Simulation IA avec distribution gaussienne
  const predictions = new Set<number>();
  
  while (predictions.size < count) {
    const gaussian = boxMullerRandom();
    const normalized = Math.abs(gaussian) % 1;
    const num = Math.floor(normalized * max) + 1;
    predictions.add(num);
  }
  
  return Array.from(predictions).sort((a, b) => a - b);
}

function patternDemoPredict(game: string): number[] {
  const max = game === 'euromillions' ? 50 : game === 'loto' ? 49 : 70;
  const count = game === 'euromillions' || game === 'loto' ? 5 : 10;
  
  // Simulation basée sur des patterns mathématiques
  const predictions = new Set<number>();
  const fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34];
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  
  // Mélanger fibonacci et premiers
  while (predictions.size < count) {
    const useFib = Math.random() < 0.5;
    const source = useFib ? fibonacci : primes;
    const num = source[Math.floor(Math.random() * source.length)];
    
    if (num <= max) {
      predictions.add(num);
    } else {
      predictions.add(Math.floor(Math.random() * max) + 1);
    }
  }
  
  return Array.from(predictions).sort((a, b) => a - b);
}

function combineDemoPredictions(predictions: number[][], game: string): number[] {
  const count = game === 'euromillions' || game === 'loto' ? 5 : 10;
  const frequency = new Map<number, number>();
  
  // Compter la fréquence de chaque numéro
  predictions.forEach(pred => {
    pred.forEach(num => {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    });
  });
  
  // Trier par fréquence et prendre les plus fréquents
  const sorted = Array.from(frequency.entries())
    .sort(([,a], [,b]) => b - a)
    .map(([num]) => num);
  
  return sorted.slice(0, count).sort((a, b) => a - b);
}

function boxMullerRandom(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export const useLatestDraws = (game: string, limit = 10) => {
  return useQuery({
    queryKey: ['latest-draws', game, limit],
    queryFn: async () => {
      if (!isSupabaseConfigured()) {
        // Retourner des données de démonstration
        return [
          {
            draw_date: '2024-06-07',
            numbers: [3, 12, 21, 35, 47],
            stars: [2, 9]
          },
          {
            draw_date: '2024-06-04', 
            numbers: [7, 15, 28, 39, 42],
            stars: [1, 11]
          },
          {
            draw_date: '2024-05-31',
            numbers: [14, 19, 26, 33, 44],
            stars: [5, 8]
          }
        ];
      }

      const { data, error } = await supabase
        .from('draw_history')
        .select('*')
        .eq('game_type', game)
        .order('draw_date', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(`Erreur lors de la récupération des tirages: ${error.message}`);
      }

      return data;
    },
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};
