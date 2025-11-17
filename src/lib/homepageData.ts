// lib/homepageData.ts

import { LucideIcon } from 'lucide-react';

// Définition des types pour une meilleure clarté
export interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  subLinks?: { label: string; href: string }[];
}

export interface Stat {
  value: string;
  label: string;
  icon: LucideIcon;
}

export interface Thematique {
  icon: string;
  title: string;
  description: string;
  items: string[];
  color: string;
  resources: string;
  link: string;
}

export interface FeaturedResource {
  type: string;
  title: string;
  description: string;
  author: string;
  downloads: string;
  readTime: string;
  badge: string;
  href: string;
}

export interface Actualite {
  title: string;
  time?: string;
  category: string;
  link?: string;
}

// --- Données exportées ---
export const navigationLinks: NavLink[] = [
  { 
    label: 'Théorie', 
    href: '/theorie', 
    hasDropdown: true,
    subLinks: [
      { label: 'Lecture de plan', href: '/theorie/lecture-de-plan' },
    ]
  },
  { label: 'Pratique', href: '/pratique' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Outils', href: '/outils' },
  { label: 'Ressources', href: '/ressources' },
  { label: 'CH Horlogerie Suisse', href: '/ch-horlogerie-suisse' },
  { label: 'Podcasts', href: '/podcasts' },
  { label: 'Culture', href: '/culture' },
  { label: 'Événements', href: '/evenements' },
  { label: 'Communauté', href: '/communaute' },
];

export const stats: Stat[] = [
  { value: '2,500+', label: 'Ressources Partagées', icon: require('lucide-react').FileText },
  { value: '1,200+', label: 'Passionnés Actifs', icon: require('lucide-react').Users },
  { value: '150h+', label: 'Vidéos Tutoriels', icon: require('lucide-react').PlayCircle },
  { value: '100%', label: 'Gratuit & Libre', icon: require('lucide-react').Heart },
];

export const thematiques: Thematique[] = [
  {
    icon: '📚',
    title: 'Théorie',
    description: 'Principes fondamentaux, histoire et terminologie horlogère',
    items: ['Cours détaillés', 'Schémas annotés', 'Glossaire illustré'],
    color: 'from-blue-500 to-cyan-500',
    resources: '850+',
    link: '/theorie'
  },
  {
    icon: '🔧',
    title: 'Pratique',
    description: 'Démontage, remontage et réglage de mouvements',
    items: ['Tutoriels vidéo', 'Plans techniques', 'Guides pas-à-pas'],
    color: 'from-amber-500 to-orange-500',
    resources: '1,200+',
    link: '/pratique'
  },
  {
    icon: '✅',
    title: 'Évaluation',
    description: 'Testez vos connaissances avec nos quiz interactifs',
    items: ['Quiz interactifs', 'Correction détaillée', 'Suivi progrès'],
    color: 'from-green-500 to-emerald-500',
    resources: '450+',
    link: '/quiz'
  },
];

export const featuredResources: FeaturedResource[] = [
  {
    type: 'Outil IA',
    title: 'Analyseur de Montres IA',
    description: 'Déposez une photo et obtenez une analyse détaillée : boîtier, cadran, index, aiguilles et style horloger.',
    author: 'HorloLearn',
    downloads: 'Nouveau',
    readTime: '—',
    badge: 'Ressource de la semaine',
    href: '/outils/analyseur',
  },
  {
    type: 'Vidéo',
    title: 'Montage démontage mouvement 6497',
    description: 'Tutoriel vidéo HD : technique professionnelle de montage et démontage mouvement 6497.',
    badge: 'Populaire',
    href: 'https://www.horlolearn.ch/pratique/demontage',
  },
  {
    type: 'Ressource',
    title: 'Outils de mesure en horlogerie moderne',
    description: 'Découvrez les 10 instruments essentiels utilisés aujourd’hui pour garantir la précision du travail horloger.',
    badge: 'Nouveau',
    href: 'https://www.horlolearn.ch/outils/outils-de-mesure',
  },
];

export const actualites: Actualite[] = [
  {
    title: 'Watches & Wonders 2026 : Dates confirmées',
    time: 'Il y a 2 jours',
    category: 'Événement'
  },
  {
    title: 'Rapport complet sur l’Horlogerie Suisse 2024',
    time: 'Publié par HorloLearn',
    category: 'Découverte',
    link: '/horlogerie/ecoles/rapport-horlogerie-suisse'
  },
  {
    title: 'Les Écoles Suisses d’Horlogerie',
    category: 'Découverte',
    link: '/horlogerie/ecoles'
  },
];
