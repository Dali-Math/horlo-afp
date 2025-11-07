// lib/searchData.ts
// Centralisez ici toutes vos données de recherche

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  type: 'fiche' | 'article' | 'video' | 'quiz';
  url: string;
  keywords?: string[]; // Mots-clés supplémentaires pour améliorer la recherche
}

export const searchData: SearchItem[] = [
  // FICHES TECHNIQUES
  {
    id: 1,
    title: "ETA 6497 - Fiche Technique",
    description: "Calibre mécanique à remontage manuel, mouvement emblématique de l'horlogerie suisse",
    type: "fiche",
    url: "/fiches/eta-6497",
    keywords: ["6497", "eta", "manuel", "remontage", "calibre", "mouvement"]
  },
  {
    id: 2,
    title: "ETA 2824-2 - Fiche Technique",
    description: "Mouvement automatique de référence, base de nombreuses montres suisses",
    type: "fiche",
    url: "/fiches/eta-2824-2",
    keywords: ["2824", "eta", "automatique", "self-winding", "calibre"]
  },
  {
    id: 3,
    title: "Valjoux 7750 - Fiche Technique",
    description: "Chronographe automatique légendaire, utilisé par de nombreuses manufactures",
    type: "fiche",
    url: "/fiches/valjoux-7750",
    keywords: ["7750", "valjoux", "chronographe", "automatique", "complication"]
  },

  // ARTICLES
  {
    id: 10,
    title: "Les Complications Horlogères",
    description: "Découvrez les différentes complications : chronographe, quantième, phases de lune, tourbillon",
    type: "article",
    url: "/articles/complications",
    keywords: ["complication", "chronographe", "quantième", "lune", "tourbillon", "répétition"]
  },
  {
    id: 11,
    title: "Le Spiral: Cœur du Mouvement",
    description: "Comprendre le rôle et la fabrication du spiral dans un mouvement mécanique",
    type: "article",
    url: "/articles/spiral",
    keywords: ["spiral", "balancier", "oscillateur", "réglage", "précision"]
  },
  {
    id: 12,
    title: "L'Échappement Suisse à Ancre",
    description: "Fonctionnement et importance de l'échappement à ancre dans l'horlogerie moderne",
    type: "article",
    url: "/articles/echappement-ancre",
    keywords: ["échappement", "ancre", "palette", "roue", "échappement suisse"]
  },
  {
    id: 13,
    title: "Histoire de l'Horlogerie Suisse",
    description: "Des origines à nos jours : l'évolution de l'horlogerie en Suisse",
    type: "article",
    url: "/articles/histoire-horlogerie",
    keywords: ["histoire", "suisse", "manufacture", "tradition", "patrimoine"]
  },

  // VIDÉOS
  {
    id: 20,
    title: "Démontage d'un Mouvement ETA",
    description: "Tutoriel vidéo complet sur le démontage et remontage d'un calibre ETA",
    type: "video",
    url: "/videos/demontage-eta",
    keywords: ["démontage", "remontage", "tutoriel", "pratique", "atelier"]
  },
  {
    id: 21,
    title: "Réglage de la Précision",
    description: "Techniques de réglage pour optimiser la précision d'un mouvement mécanique",
    type: "video",
    url: "/videos/reglage-precision",
    keywords: ["réglage", "précision", "ajustement", "horloger", "technique"]
  },
  {
    id: 22,
    title: "Fabrication d'un Spiral",
    description: "Découvrez les étapes de fabrication d'un spiral horloger",
    type: "video",
    url: "/videos/fabrication-spiral",
    keywords: ["fabrication", "spiral", "manufacture", "artisan", "savoir-faire"]
  },

  // QUIZ
  {
    id: 30,
    title: "Quiz: Les Bases de l'Horlogerie",
    description: "Testez vos connaissances sur les mécanismes horlogers fondamentaux",
    type: "quiz",
    url: "/quiz/bases-horlogerie",
    keywords: ["quiz", "test", "apprentissage", "bases", "débutant"]
  },
  {
    id: 31,
    title: "Quiz: Les Calibres ETA",
    description: "Évaluez vos connaissances sur les différents calibres ETA",
    type: "quiz",
    url: "/quiz/calibres-eta",
    keywords: ["quiz", "eta", "calibre", "mouvement", "test"]
  },
  {
    id: 32,
    title: "Quiz: Les Complications",
    description: "Testez votre expertise sur les complications horlogères",
    type: "quiz",
    url: "/quiz/complications",
    keywords: ["quiz", "complication", "chronographe", "quantième", "expert"]
  }
];

// Fonction de recherche améliorée
export function searchContent(query: string): SearchItem[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  
  return searchData.filter(item => {
    // Recherche dans le titre
    if (item.title.toLowerCase().includes(lowerQuery)) return true;
    
    // Recherche dans la description
    if (item.description.toLowerCase().includes(lowerQuery)) return true;
    
    // Recherche dans les mots-clés
    if (item.keywords?.some(keyword => keyword.toLowerCase().includes(lowerQuery))) return true;
    
    return false;
  });
}

// Fonction pour obtenir des suggestions
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  if (!query || query.length < 2) return [];

  const allKeywords = searchData.flatMap(item => [
    item.title,
    ...(item.keywords || [])
  ]);

  const lowerQuery = query.toLowerCase();
  const suggestions = allKeywords
    .filter(keyword => keyword.toLowerCase().includes(lowerQuery))
    .slice(0, limit);

  return [...new Set(suggestions)]; // Supprime les doublons
}
