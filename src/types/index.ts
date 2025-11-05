export interface CartoucheField {
  id: string;
  name: string;
  category: string;
  obligation: string;
  description: string;
  example: string;
  characters: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface TableData {
  [key: string]: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface MemoItem {
  text: string;
}

export interface UserProgress {
  currentSection: string;
  completedQuizzes: number;
  totalScore: number;
  achievements: string[];
  currentQuizIndex: number;
  quizAnswers: (number | null)[];
  quizScore: number;
}

export type SectionType = 
  | 'champs' 
  | 'quiz' 
  | 'memo' 
  | 'tableaux' 
  | 'faq' 
  | 'normes'
  | 'cartouche';
export default {}
