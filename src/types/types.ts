export interface StrapOption {
  id: string;
  name: string;
  material: string;
  color: string;
  image?: string;
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

export interface WatchDetailParams {
  id: string;
}

export interface Quote {
  text: string;
  author?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
