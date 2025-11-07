// lib/searchData.ts
// Moteur de recherche complet : toutes les pages + sous-pages réelles d'HorloLearn

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  type: 'page' | 'quiz' | 'outil' | 'ressource' | 'culture' | 'theorie' | 'evenement';
  url: string;
  keywords?: string[];
}

export const searchData: SearchItem[] = [
  // === Accueil ===
  {
    id: 1,
    title: "Accueil HorloLearn",
    description: "Découvrez la plateforme HorloLearn – culture, savoir-faire et outils horlogers.",
    type: "page",
    url: "/",
    keywords: ["accueil", "horlomain", "introduction", "horlogerie", "site principal"]
  },

  // === THÉORIE ===
  {
    id: 10,
    title: "Théorie Horlogère",
    description: "Explorez les bases techniques et scientifiques de l'horlogerie suisse.",
    type: "theorie",
    url: "/theorie",
    keywords: ["théorie", "cours", "bases", "technique", "mécanique"]
  },
  {
    id: 11,
    title: "Lecture de Plan Horloger",
    description: "Comprendre les symboles, cotations et conventions utilisées sur un plan horloger.",
    type: "theorie",
    url: "/theorie/lecture-de-plan",
    keywords: ["plan", "lecture", "dessin", "technique", "symboles"]
  },
  {
    id: 12,
    title: "Cartouche Horloger",
    description: "Apprenez à lire les champs du cartouche horloger selon les normes ISO 7200 et 5457.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/cartouche-horloger",
    keywords: ["cartouche", "plan", "normes", "iso", "dessin"]
  },
  {
    id: 13,
    title: "Champs du Cartouche",
    description: "Détail de chaque champ du cartouche : matière, échelle, auteur, révision, etc.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/champs",
    keywords: ["champs", "matière", "dessiné", "contrôlé", "référence"]
  },
  {
    id: 14,
    title: "Tables et Symboles Horlogers",
    description: "Accédez aux tables de conversion et aux symboles techniques normalisés.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/tables",
    keywords: ["table", "symbole", "iso", "tolérance", "conversion"]
  },
  {
    id: 15,
    title: "Mémos et Notes Techniques",
    description: "Fiches mémoire et rappels techniques pour la lecture de plans horlogers.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/memo",
    keywords: ["mémo", "rappel", "fiche", "technique", "plan"]
  },
  {
    id: 16,
    title: "FAQ Lecture de Plan",
    description: "Questions fréquentes autour du dessin technique et des plans horlogers.",
    type: "theorie",
    url: "/theorie/lecture-de-plan/faq",
    keywords: ["faq", "questions", "plan", "dessin", "horlogerie"]
  },
  {
    id: 17,
    title: "Normes Horlogères",
    description: "Normes ISO et pratiques de dessin utilisées dans l’industrie horlogère suisse.",
    type: "theorie",
    url: "/theorie/normes",
    keywords: ["normes", "iso", "standard", "dessin", "plans"]
  },

  // === PRATIQUE ===
  {
    id: 20,
    title: "Pratique Horlogère",
    description: "Ateliers pratiques, démontage, réglage et observation de mouvements.",
    type: "page",
    url: "/pratique",
    keywords: ["atelier", "mécanique", "réglage", "assemblage", "balancier"]
  },

  // === QUIZ ===
  {
    id: 30,
    title: "Quiz Général d’Horlogerie",
    description: "Testez vos connaissances sur les bases techniques et culturelles horlogères.",
    type: "quiz",
    url: "/quiz",
    keywords: ["quiz", "test", "bases", "connaissances"]
  },
  {
    id: 31,
    title: "Quiz Lecture de Plan",
    description: "Évaluez votre compréhension du dessin technique horloger.",
    type: "quiz",
    url: "/quiz/lecture-de-plan",
    keywords: ["quiz", "plan", "symboles", "cotations"]
  },
  {
    id: 32,
    title: "Quiz Complications Horlogères",
    description: "Quiz sur les complications : chronographe, quantième, tourbillon, etc.",
    type: "quiz",
    url: "/quiz/complications",
    keywords: ["complications", "chronographe", "calibre", "tourbillon"]
  },

  // === OUTILS ===
  {
    id: 40,
    title: "Outils Horlogers",
    description: "Convertisseurs et calculateurs dédiés aux horlogers et élèves.",
    type: "outil",
    url: "/outils",
    keywords: ["outil", "convertisseur", "calculateur", "horlogerie"]
  },
  {
    id: 41,
    title: "Convertisseur d’Unités Horlogères",
    description: "Convertissez lignes, millimètres, VPH et autres unités horlogères.",
    type: "outil",
    url: "/outils/convertisseur",
    keywords: ["lignes", "mm", "unité", "conversion"]
  },
  {
    id: 42,
    title: "Calculateur COSC",
    description: "Outil de calcul pour les tolérances et précisions selon le COSC.",
    type: "outil",
    url: "/outils/cosc",
    keywords: ["cosc", "chronomètre", "tolérance", "précision"]
  },
  {
    id: 43,
    title: "Calculateur d’Amplitude",
    description: "Calculez la variation d’amplitude en fonction des positions.",
    type: "outil",
    url: "/outils/amplitude",
    keywords: ["amplitude", "oscillation", "balancier", "mouvement"]
  },

  // === RESSOURCES ===
  {
    id: 50,
    title: "Ressources Horlogères",
    description: "Téléchargez des PDF et fiches techniques pour vos études horlogères.",
    type: "ressource",
    url: "/ressources",
    keywords: ["pdf", "fiches", "documents", "ressources"]
  },

  // === CULTURE & SUISSE ===
  {
    id: 60,
    title: "Horlogerie Suisse",
    description: "Histoire, traditions et innovations de l’horlogerie helvétique.",
    type: "culture",
    url: "/suisse",
    keywords: ["suisse", "culture", "manufacture", "histoire"]
  },
  {
    id: 61,
    title: "Culture Horlogère",
    description: "Comprendre les valeurs et la culture de l’horlogerie traditionnelle.",
    type: "culture",
    url: "/culture",
    keywords: ["culture", "patrimoine", "tradition", "valeurs"]
  },

  // === PODCASTS ===
  {
    id: 70,
    title: "Podcasts Horlogers",
    description: "Écoutez des discussions et interviews autour de l’horlogerie suisse.",
    type: "page",
    url: "/podcasts",
    keywords: ["podcast", "audio", "discussion", "interview"]
  },

  // === ÉVÉNEMENTS & COMMUNAUTÉ ===
  {
    id: 80,
    title: "Événements Horlogers",
    description: "Agenda des salons, conférences et expositions horlogères.",
    type: "evenement",
    url: "/evenements",
    keywords: ["salon", "événement", "exposition", "agenda"]
  },
  {
    id: 81,
    title: "Communauté HorloLearn",
    description: "Rejoignez les membres et partagez vos expériences horlogères.",
    type: "page",
    url: "/communaute",
    keywords: ["communauté", "membres", "partage", "forum"]
  },

  // === ACTUALITÉS ===
  {
    id: 90,
    title: "Actualités Horlogères",
    description: "Dernières nouvelles du monde de l’horlogerie suisse et internationale.",
    type: "page",
    url: "/actualites",
    keywords: ["actualité", "news", "montres", "industrie"]
  }
]

// === FONCTION DE RECHERCHE ===
export function searchContent(query: string): SearchItem[] {
  if (!query || query.length < 2) return []

  const lower = query.toLowerCase()
  return searchData.filter(item =>
    item.title.toLowerCase().includes(lower) ||
    item.description.toLowerCase().includes(lower) ||
    item.keywords?.some(k => k.toLowerCase().includes(lower))
  )
}
