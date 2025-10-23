export interface QuizQuestion {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  answer: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    question: "Quelle est la fonction du balancier dans une montre mécanique ?",
    options: [
      "Réguler la marche du mouvement",
      "Indiquer l'heure",
      "Remonter le ressort moteur",
      "Afficher la date"
    ],
    answer: 0
  },
  {
    id: 2,
    difficulty: 'easy',
    question: "Combien de rubis trouve-t-on typiquement dans un calibre ETA 2824-2 ?",
    options: ["15", "17", "21", "25"],
    answer: 3
  },
  {
    id: 3,
    difficulty: 'medium',
    question: "Quel composant relie le spiral au balancier ?",
    options: ["La raquette", "La virole", "Le piton", "Le collet"],
    answer: 2
  },
  {
    id: 4,
    difficulty: 'medium',
    question: "Quel est le rôle du barillet ?",
    options: [
      "Emmagasiner et restituer l’énergie",
      "Mesurer le temps",
      "Afficher la réserve de marche",
      "Compter les oscillations"
    ],
    answer: 0
  },
  {
    id: 5,
    difficulty: 'hard',
    question: "Quelle est la fréquence d’oscillation standard d’un calibre ETA 7750 ?",
    options: ["18'000 A/h", "21'600 A/h", "28'800 A/h", "36'000 A/h"],
    answer: 2
  }
];

export function getQuestionsByDifficulty(level: 'easy' | 'medium' | 'hard') {
  return quizQuestions.filter(q => q.difficulty === level);
}

export default quizQuestions;
