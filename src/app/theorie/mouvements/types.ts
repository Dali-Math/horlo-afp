// app/theorie/mouvements/types.ts

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';

export interface ConceptGroup {
  id: string;
  title: string;
  icon: string;
  color: string;
  concepts: Concept[];
}

// Alias pour compatibilité
export type Module = ConceptGroup;

export interface Concept {
  id: string;
  title: string;
  desc?: string;
  description?: string;  // Alias pour compatibilité
  level: DifficultyLevel;
  category?: string;

  // Enrichissements
  tags?: string[];
  iso?: string[];
  manufactures?: string[];
  history?: string;
  formula?: string;
  patent?: string[];

  // Contenu structuré
  details?: {
    principle?: string;
    materials?: string[];
    dimensions?: Record<string, string>;
    adjustment?: string;
    commonErrors?: string[];
    tools?: string[];

    // Ajouts pédagogiques
    howItWorks?: string;
    advantages?: string[];
    limitations?: string[];
    keyPoints?: string[];
    examples?: string[];
    relatedConcepts?: string[];
    prerequisites?: string[];
    
    // Spécifications techniques
    specs?: {
      difficulty?: string;
      equipment?: string[];
      safetyNotes?: string[];
      [key: string]: string | string[] | undefined;
    };

    // Ressources pédagogiques
    resources?: {
      videos?: Array<{ title: string; url: string }>;
      articles?: Array<{ title: string; url: string }>;
      books?: Array<{ title: string; author: string }>;
    };

    // Applications pratiques
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
