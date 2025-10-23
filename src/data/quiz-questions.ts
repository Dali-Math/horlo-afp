// ===============================
// 🎯 Quiz Questions - Horlogerie
// ===============================

export interface QuizQuestion {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  answer: number;
}

// --- Liste principale des questions ---
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    question: "Quelle est la fonction du balancier dans une montre mécanique ?",
    options: [
      "Réguler la marche du mouvement",
      "Indiquer l'heure",
      "Remonter le ressort moteur",
      "Afficher la date",
    ],
    answer: 0,
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Combien de rubis trouve-t-on typiquement dans un calibre ETA 2824-2 ?",
    options: ["15", "17", "21", "25"],
    answer: 3,
  },
  {
    id: 3,
    difficulty: 'medium',
    question: "Quel composant relie le spiral au balancier ?",
    options: ["La raquette", "La virole", "Le piton", "Le collet"],
    answer: 2,
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "Quel est le rôle du barillet ?",
    options: [
      "Emmagasiner et restituer l’énergie",
      "Mesurer le temps",
      "Afficher la réserve de marche",
      "Compter les oscillations",
    ],
    answer: 0,
  },
  {
    id: 5,
    difficulty: 'medium',
    question: "Quel est le rôle de l’ancre dans l’échappement ?",
    options: [
      "Distribuer l’énergie au balancier",
      "Bloquer le barillet",
      "Relier la tige de remontoir",
      "Maintenir le spiral en tension",
    ],
    answer: 0,
  },
  {
    id: 6,
    difficulty: 'hard',
    question: "Quelle est la fréquence d’oscillation standard d’un calibre ETA 7750 ?",
    options: ["18'000 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
    answer: 2,
  },
  {
    id: 7,
    difficulty: 'hard',
    question: "Quel horloger est considéré comme l'inventeur du tourbillon ?",
    options: ["Breguet", "Lépine", "Huygens", "Harrison"],
    answer: 0,
  },
  {
    id: 8,
    difficulty: 'hard',
    question: "Quel type d’échappement équipe principalement les montres suisses modernes ?",
    options: [
      "Échappement à détente",
      "Échappement à cylindre",
      "Échappement à ancre suisse",
      "Échappement à verge",
    ],
    answer: 2,
  },
  {
    id: 9,
    difficulty: 'easy',
    question: "Quelle unité est utilisée pour mesurer la précision d’une montre ?",
    options: ["Seconde par jour", "Minute par heure", "Tour par minute", "Battement par cycle"],
    answer: 0,
  },
  {
    id: 10,
    difficulty: 'medium',
    question: "Quel organe transmet l’énergie du ressort moteur vers le rouage ?",
    options: ["L’ancre", "Le barillet", "La roue d’échappement", "Le balancier"],
    answer: 1,
  },
];

// --- Fonction de sélection ---
export function getQuestionsByDifficulty(
  level: 'easy' | 'medium' | 'hard' | 'facile' | 'moyen' | 'difficile' | 'mixte',
  limit?: number
): QuizQuestion[] {
  const translatedLevel = translateLevel(level);

  // Si "mixte", toutes les questions
  const filtered =
    translatedLevel === 'mixte'
      ? quizQuestions
      : quizQuestions.filter((q) => q.difficulty === translatedLevel);

  // Limiter le nombre si précisé
  if (limit && limit > 0) {
    return filtered.slice(0, limit);
  }

  return filtered;
}

// --- Conversion FR → EN ---
function translateLevel(level: string): 'easy' | 'medium' | 'hard' | 'mixte' {
  switch (level) {
    case 'facile':
      return 'easy';
    case 'moyen':
      return 'medium';
    case 'difficile':
      return 'hard';
    case 'mixte':
      return 'mixte';
    default:
      return 'easy';
  }
}

export default quizQuestions;
