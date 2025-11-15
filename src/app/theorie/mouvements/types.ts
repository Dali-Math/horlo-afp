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
    principle?: string;                        // Principe de fonctionnement
    materials?: string[];                      // Matériaux utilisés
    dimensions?: Record<string, string>;       // Cotes techniques
    adjustment?: string;                       // Procédure de réglage
    commonErrors?: string[];                   // Erreurs courantes
    tools?: string[];                          // Outils nécessaires

    // Ajouts
    howItWorks?: string;                       // Comment ça fonctionne
    advantages?: string[];                     // Avantages
    limitations?: string[];                    // Limitations
    keyPoints?: string[];                      // Points clés

    applications?: {
      realWorld?: string[];                    // Exemples concrets
      variations?: string[];                   // Variantes existantes
      progressions?: string[];                 // Progressions d’apprentissage
    };
  };

  gallery?: string[];                           // URLs d'images
  relatedConcepts?: string[];                   // Liens vers d'autres concepts

  resources?: {
    videos?: Array<{ title: string; url: string }>;
    articles?: Array<{ title: string; url: string }>;
    books?: Array<{ title: string; author: string }>;
  };
}
