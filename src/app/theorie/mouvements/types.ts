export type DifficultyLevel = 'Débutant' | 'Intermédiaire' | 'Expert';

export interface Concept {
  id: string;
  title: string;
  desc: string;
  level: DifficultyLevel;
  // Métadonnées optionnelles
  tags?: string[];
  iso?: string[];
  manufactures?: string[];
  history?: string;
  formula?: string;
  patent?: string[];
  [key: string]: any; // Permet d'ajouter n'importe quel champ sans erreur TypeScript
}

export interface Module {
  id: string;
  title: string;
  icon: string; // Nom de l'icône Lucide
  color: string; // Classes Tailwind (ex: "from-blue-500 to-cyan-600")
  concepts: Concept[];
}
