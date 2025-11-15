// Types simples pour la référence horlogère

export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';

export interface Concept {
  id: string;
  title: string;
  desc: string;
  level: DifficultyLevel;
}

export interface Module {
  id: string;
  title: string;
  icon: string; // On stockera juste le nom de l'icône
  color: string; // Classe Tailwind pour le dégradé
  concepts: Concept[];
}
