// src/app/outils/analyseur/types.ts

// États possibles de l’application
export type AppState = 'initial' | 'loading' | 'result' | 'error';

// Résultat retourné par l'analyse Gemini
export interface AnalysisResult {
  report: string; // texte du rapport (Markdown)
}
