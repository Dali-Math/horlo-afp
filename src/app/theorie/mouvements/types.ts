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
    
    // ✅ AJOUTEZ CES PROPRIÉTÉS
    howItWorks?: string;       // Comment ça fonctionne
    advantages?: string[];     // Avantages
    limitations?: string[];    // Limitations
    keyPoints?: string[];      // Points clés
    
    applications?: {
      realWorld?: string[];
      variations?: string[];
      progressions?: string[];
    };
  };

  gallery?: string[];          
  relatedConcepts?: string[];  

  resources?: {
    videos?: Array<{ title: string; url: string }>;
    articles?: Array<{ title: string; url: string }>;
    books?: Array<{ title: string; author: string }>;
  };
}
