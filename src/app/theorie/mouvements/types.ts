// app/theorie/mouvements/types.ts

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';

export interface Concept {
  id: string;
  title: string;
  desc: string;
  level: DifficultyLevel;
  tags?: string[];
  iso?: string[];
  manufactures?: string[];
  history?: string;
  formula?: string;
  patent?: string[];
  [key: string]: any; // Pour champs optionnels supplémentaires
}

export interface Module {
  id: string;
  title: string;
  icon: string; // Nom de l'icône Lucide
  color: string; // Classes Tailwind gradient
  concepts: Concept[];
}
