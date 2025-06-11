
import { useQuery } from '@tanstack/react-query';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface SpecialDraw {
  id: string;
  date: string;
  eventType: 'vendredi13' | 'saint-valentin' | 'noel' | 'super-tirage' | 'autre';
  eventName: string;
  jackpot: number;
  numbers: number[];
  stars?: number[];
  chance?: number;
  winners?: number;
  game: string;
}

// Données de démonstration pour les tirages exceptionnels
const demoSpecialDraws: Record<string, SpecialDraw[]> = {
  euromillions: [
    {
      id: '1',
      date: '2024-02-13',
      eventType: 'vendredi13',
      eventName: 'Super Tirage Vendredi 13',
      jackpot: 130000000,
      numbers: [7, 13, 21, 33, 47],
      stars: [4, 13],
      winners: 1,
      game: 'euromillions'
    },
    {
      id: '2',
      date: '2024-02-14',
      eventType: 'saint-valentin',
      eventName: 'Tirage Saint-Valentin',
      jackpot: 85000000,
      numbers: [14, 21, 28, 35, 42],
      stars: [2, 14],
      winners: 0,
      game: 'euromillions'
    },
    {
      id: '3',
      date: '2023-12-22',
      eventType: 'noel',
      eventName: 'Super Tirage de Noël',
      jackpot: 200000000,
      numbers: [12, 25, 31, 44, 50],
      stars: [3, 12],
      winners: 2,
      game: 'euromillions'
    },
    {
      id: '4',
      date: '2023-10-13',
      eventType: 'vendredi13',
      eventName: 'Vendredi 13 Octobre',
      jackpot: 150000000,
      numbers: [13, 19, 26, 39, 45],
      stars: [7, 13],
      winners: 1,
      game: 'euromillions'
    }
  ],
  loto: [
    {
      id: '5',
      date: '2024-02-14',
      eventType: 'saint-valentin',
      eventName: 'Grand Loto Saint-Valentin',
      jackpot: 17000000,
      numbers: [7, 14, 21, 28, 35],
      chance: 4,
      winners: 3,
      game: 'loto'
    },
    {
      id: '6',
      date: '2023-12-23',
      eventType: 'noel',
      eventName: 'Grand Loto de Noël',
      jackpot: 20000000,
      numbers: [12, 18, 25, 32, 49],
      chance: 8,
      winners: 1,
      game: 'loto'
    }
  ],
  keno: [
    {
      id: '7',
      date: '2024-02-14',
      eventType: 'saint-valentin',
      eventName: 'Keno Saint-Valentin',
      jackpot: 1000000,
      numbers: [2, 7, 14, 21, 28, 35, 42, 49, 56, 63],
      winners: 2,
      game: 'keno'
    }
  ]
};

export const useSpecialDraws = (game: string) => {
  return useQuery({
    queryKey: ['special-draws', game],
    queryFn: async (): Promise<SpecialDraw[]> => {
      if (!isSupabaseConfigured()) {
        // Retourner les données de démonstration
        return demoSpecialDraws[game] || [];
      }

      // Requête Supabase pour récupérer les tirages exceptionnels
      const { data, error } = await supabase
        .from('special_draws')
        .select('*')
        .eq('game', game)
        .order('date', { ascending: false });

      if (error) {
        throw new Error(`Erreur lors de la récupération des tirages exceptionnels: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpcomingSpecialEvents = () => {
  return useQuery({
    queryKey: ['upcoming-special-events'],
    queryFn: async () => {
      const now = new Date();
      const events = [];

      // Calculer les prochains événements spéciaux
      const currentYear = now.getFullYear();
      const nextYear = currentYear + 1;

      // Prochains Vendredi 13
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      months.forEach(month => {
        const date = new Date(currentYear, month - 1, 13);
        if (date.getDay() === 5 && date > now) { // 5 = Vendredi
          events.push({
            date: date.toISOString(),
            eventType: 'vendredi13',
            eventName: 'Vendredi 13',
            description: 'Super tirage avec jackpot exceptionnel'
          });
        }
      });

      // Saint-Valentin
      const valentine = new Date(now.getFullYear(), 1, 14);
      if (valentine > now) {
        events.push({
          date: valentine.toISOString(),
          eventType: 'saint-valentin',
          eventName: 'Saint-Valentin',
          description: 'Tirage spécial Saint-Valentin'
        });
      }

      // Noël
      const christmas = new Date(now.getFullYear(), 11, 25);
      if (christmas > now) {
        events.push({
          date: christmas.toISOString(),
          eventType: 'noel',
          eventName: 'Noël',
          description: 'Grand tirage de Noël'
        });
      }

      return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 heures
  });
};
