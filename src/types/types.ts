// src/types/types.ts
// Fichier de définition des types & interfaces du projet

export interface StrapOption {
  id: string;
  name: string;
  material: string;
  color: string;
  image?: string; // Optionnel : image spécifique au bracelet
}

export interface Watch {
  id: string;
  name: string;
  collection: string;
  image: string;
  description: string;
  features: string[];
  longDescription?: string;
  technicalSpecs?: {
    reference: string;
    movement: string;
    caseMaterial: string;
    diameter: string;
    dial: string;
    powerReserve: string;
    waterResistance: string;
    strap: string;
    jewels?: string;
    caseBack?: string;
  };
  strapOptions?: StrapOption[];
}

// Pour usage avec React Router (paramètres de la route détail montre)
export interface WatchDetailParams {
  id: string;
}

// Citation inspirante ou informative
export interface Quote {
  text: string;
  author?: string;
}

// Message d’un chat (AI ou utilisateur)
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

// Thème UI 
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

// Contexte thème global (provider React)
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
