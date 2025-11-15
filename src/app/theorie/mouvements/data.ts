import type { Module } from './types';

export const modules: Module[] = [
  {
    id: 'architecture',
    title: "🏗️ Architecture du Mouvement",
    icon: "Layers",
    color: "from-blue-500 to-cyan-600",
    concepts: [
      { id: 'platine-ponts', title: "Platine & Ponts", desc: "Le squelette du mouvement", level: "Débutant" },
      { id: 'systeme-fixation', title: "Systèmes de Fixation", desc: "Vis et assemblage", level: "Intermédiaire" },
      { id: 'stabilite-dimensionnelle', title: "Stabilité Dimensionnelle", desc: "Dilatation et matériaux", level: "Expert" },
      { id: 'finitions-decoratives', title: "Finitions Décoratives", desc: "Côtes de Genève, perlage", level: "Intermédiaire" },
    ]
  },
  {
    id: 'rouages',
    title: "⚙️ Rouages & Transmission",
    icon: "Zap",
    color: "from-purple-500 to-pink-600",
    concepts: [
      { id: 'roue-de-rencontre', title: "Roue de Rencontre", desc: "Transmission primaire", level: "Débutant" },
      { id: 'roue-aubier', title: "Roue d'Aubier", desc: "Pont de roue mobile", level: "Intermédiaire" },
    ]
  },
  {
    id: 'echappement',
    title: "⏱️ Échappements",
    icon: "Clock",
    color: "from-amber-500 to-orange-600",
    concepts: [
      { id: 'echappement-ancre', title: "Échappement à Ane", desc: "Système classique", level: "Expert" },
    ]
  }
];
