
export const APP_CONFIG = {
  name: 'Golden-Dream',
  version: '1.0.0',
  description: 'Prédicteur IA pour jeux de loterie',
  author: 'Golden-Dream Team',
  
  // Configuration des jeux supportés
  supportedGames: ['euromillions', 'loto', 'keno'],
  
  // Configuration du mode démonstration
  demoMode: {
    enabled: true,
    message: 'Mode démonstration - Connectez Supabase pour les vraies prédictions'
  },
  
  // URLs de déploiement
  urls: {
    production: 'https://657065bb-ccc5-4f4d-8729-509b31f5cb69.lovableproject.com',
    staging: 'https://657065bb-ccc5-4f4d-8729-509b31f5cb69.lovableproject.com'
  }
};
