export interface Mouvement {
  nom: string;
  type: string;
  marque: string;
  taille: 'petit' | 'moyen' | 'grand';
  diametre: string;
  hauteur: string;
  rubis: string;
  frequence: string;
  reserve: string;
  complications?: string[];
  annee?: number;
  prix?: string;
  image?: string;
}

export const mouvementsDatabase: Mouvement[] = [
  // ETA
  {
    nom: 'ETA 2824-2',
    type: 'Automatique',
    marque: 'ETA',
    taille: 'moyen',
    diametre: '25.6mm (11.5 lignes)',
    hauteur: '4.6mm',
    rubis: '25 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '38 heures',
    annee: 1982,
    prix: 'Mouvement industriel',
    complications: ['Date']
  },
  {
    nom: 'ETA 2892-A2',
    type: 'Automatique',
    marque: 'ETA',
    taille: 'moyen',
    diametre: '25.6mm (11.5 lignes)',
    hauteur: '3.6mm',
    rubis: '21 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '42 heures',
    annee: 1975,
    prix: 'Haut de gamme ETA'
  },
  {
    nom: 'ETA 6497',
    type: 'Remontage manuel',
    marque: 'ETA',
    taille: 'grand',
    diametre: '36.6mm (16.5 lignes)',
    hauteur: '4.5mm',
    rubis: '17 jewels',
    frequence: '18,000 A/h (2.5 Hz)',
    reserve: '46 heures',
    annee: 1950,
    prix: 'Mouvement de poche'
  },
  {
    nom: 'ETA 6498',
    type: 'Remontage manuel',
    marque: 'ETA',
    taille: 'grand',
    diametre: '36.6mm (16.5 lignes)',
    hauteur: '4.5mm',
    rubis: '17 jewels',
    frequence: '18,000 A/h (2.5 Hz)',
    reserve: '46 heures',
    annee: 1950,
    prix: 'Variante petite seconde'
  },
  {
    nom: 'ETA 7750',
    type: 'Chronographe',
    marque: 'ETA',
    taille: 'grand',
    diametre: '30mm (13.25 lignes)',
    hauteur: '7.9mm',
    rubis: '25 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '48 heures',
    annee: 1974,
    prix: 'Chrono automatique',
    complications: ['Chronographe', 'Date', 'Jour']
  },
  
  // Sellita
  {
    nom: 'Sellita SW200-1',
    type: 'Automatique',
    marque: 'Sellita',
    taille: 'moyen',
    diametre: '25.6mm (11.5 lignes)',
    hauteur: '4.6mm',
    rubis: '26 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '38 heures',
    annee: 2000,
    prix: 'Clone ETA 2824'
  },
  {
    nom: 'Sellita SW300-1',
    type: 'Automatique',
    marque: 'Sellita',
    taille: 'moyen',
    diametre: '25.6mm (11.5 lignes)',
    hauteur: '3.6mm',
    rubis: '25 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '42 heures',
    annee: 2009,
    prix: 'Clone ETA 2892'
  },
  {
    nom: 'Sellita SW500',
    type: 'Chronographe',
    marque: 'Sellita',
    taille: 'grand',
    diametre: '30mm (13.25 lignes)',
    hauteur: '7.9mm',
    rubis: '27 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '48 heures',
    annee: 2010,
    prix: 'Clone ETA 7750',
    complications: ['Chronographe', 'Date']
  },

  // Miyota
  {
    nom: 'Miyota 9015',
    type: 'Automatique',
    marque: 'Miyota',
    taille: 'moyen',
    diametre: '26mm (11.6 lignes)',
    hauteur: '3.9mm',
    rubis: '24 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '42 heures',
    annee: 2009,
    prix: 'Entrée de gamme japonais'
  },
  {
    nom: 'Miyota 8215',
    type: 'Automatique',
    marque: 'Miyota',
    taille: 'moyen',
    diametre: '26.2mm (11.6 lignes)',
    hauteur: '5.32mm',
    rubis: '21 jewels',
    frequence: '21,600 A/h (3 Hz)',
    reserve: '42 heures',
    annee: 1977,
    prix: 'Très économique',
    complications: ['Date', 'Jour']
  },

  // Seiko
  {
    nom: 'Seiko NH35A',
    type: 'Automatique',
    marque: 'Seiko',
    taille: 'moyen',
    diametre: '27.4mm (12.2 lignes)',
    hauteur: '5.32mm',
    rubis: '24 jewels',
    frequence: '21,600 A/h (3 Hz)',
    reserve: '41 heures',
    annee: 2000,
    prix: 'Fiable et robuste',
    complications: ['Date', 'Jour']
  },
  {
    nom: 'Seiko 4R36',
    type: 'Automatique',
    marque: 'Seiko',
    taille: 'moyen',
    diametre: '27mm (12 lignes)',
    hauteur: '5.32mm',
    rubis: '24 jewels',
    frequence: '21,600 A/h (3 Hz)',
    reserve: '41 heures',
    annee: 2011,
    prix: 'Version améliorée',
    complications: ['Date', 'Jour', 'Hacking']
  },

  // Valjoux (historique)
  {
    nom: 'Valjoux 7750',
    type: 'Chronographe',
    marque: 'Valjoux',
    taille: 'grand',
    diametre: '30mm (13.25 lignes)',
    hauteur: '7.9mm',
    rubis: '17 jewels',
    frequence: '28,800 A/h (4 Hz)',
    reserve: '44 heures',
    annee: 1974,
    prix: 'Légende horlogère',
    complications: ['Chronographe', 'Date', 'Jour']
  },

  // AS (A. Schild - historique)
  {
    nom: 'AS 1187',
    type: 'Automatique',
    marque: 'AS',
    taille: 'petit',
    diametre: '23.3mm (10.5 lignes)',
    hauteur: '5.25mm',
    rubis: '17 jewels',
    frequence: '18,000 A/h (2.5 Hz)',
    reserve: '36 heures',
    annee: 1960,
    prix: 'Vintage suisse'
  }
];

export function findMovement(type?: string, marque?: string, taille?: string): Mouvement | null {
  const matches = mouvementsDatabase.filter(m => {
    let score = 0;
    if (type && m.type.toLowerCase().includes(type.toLowerCase())) score++;
    if (marque && m.marque.toLowerCase() === marque.toLowerCase()) score++;
    if (taille && m.taille === taille) score++;
    return score >= 2;
  });
  
  return matches.length > 0 ? matches[0] : mouvementsDatabase[0];
}
