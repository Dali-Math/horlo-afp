// app/theorie/mouvements/types.ts

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';

export interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  concepts: Concept[];
}

export interface Concept {
  id: string;
  title: string;
  desc: string;
  level: DifficultyLevel;

  // Enrichissements
  tags?: string[];
  iso?: string[];
  manufactures?: string[];
  history?: string;
  formula?: string;
  patent?: string[];

  // Contenu structuré
  details?: {
    principle?: string;        // Principe de fonctionnement
    materials?: string[];      // Matériaux spécifiques
    dimensions?: Record<string, string>; // Cotes techniques
    adjustment?: string;       // Procédure de réglage
    commonErrors?: string[];   // Erreurs courantes
    tools?: string[];          // Outils nécessaires
    
    // ✅ applications est maintenant ICI, à l'intérieur de details
    applications?: {
      realWorld?: string[];
      variations?: string[];
      progressions?: string[];
    };
  };

  gallery?: string[];          // URLs images
  relatedConcepts?: string[];  // IDs de concepts liés

  // 🔥 NOUVEAU : Ressources pédagogiques
  resources?: {
    videos?: Array<{ title: string; url: string }>;
    articles?: Array<{ title: string; url: string }>;
    books?: Array<{ title: string; author: string }>;
  };
}
