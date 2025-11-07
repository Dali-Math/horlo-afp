// lib/searchData.ts
// Liste des vraies pages HorloLearn accessibles via la recherche

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  type: 'page' | 'quiz' | 'outil' | 'ressource' | 'culture';
  url: string;
  keywords?: string[];
}

export const searchData: SearchItem[] = [
  {
    id: 1,
    title: "Cartouche Horloger",
    description: "Explorer le cartouche technique horloger et ses éléments normalisés.",
    type: "page",
    url: "/theorie/lecture-de-plan/cartouche-horloger",
    keywords: ["plan", "cartouche", "dessin", "lecture de plan", "normes"]
  },
  {
    id: 2,
    title: "Lecture de Plan Horloger",
    description: "Apprenez à lire et comprendre un plan horloger avec ses symboles techniques.",
    type: "page",
    url: "/theorie/lecture-de-plan",
    keywords: ["plan", "lecture", "technique", "symboles", "dimensions"]
  },
  {
    id: 3,
    title: "Quiz Horlogerie",
    description: "Testez vos connaissances sur les bases de l’horlogerie suisse.",
    type: "quiz",
    url: "/quiz",
    keywords: ["quiz", "test", "connaissance", "apprentissage", "horlogerie"]
  },
  {
    id: 4,
    title: "Outils Horlogers",
    description: "Convertisseurs, calculatrices et utilitaires pour les horlogers.",
    type: "outil",
    url: "/outils",
    keywords: ["convertisseur", "outil", "mesure", "calcul", "horlogerie"]
  },
  {
    id: 5,
    title: "Culture Horlogère Suisse",
    description: "Découvrez l’histoire et les traditions de l’horlogerie suisse.",
    type: "culture",
    url: "/suisse",
    keywords: ["histoire", "suisse", "patrimoine", "culture", "manufacture"]
  },
  {
    id: 6,
    title: "Ressources Horlogères",
    description: "Téléchargez des documents et fiches techniques utiles.",
    type: "ressource",
    url: "/ressources",
    keywords: ["fiches", "documents", "pdf", "ressources", "techniques"]
  },
  {
    id: 7,
    title: "Communauté HorloLearn",
    description: "Rejoignez la communauté et partagez vos expériences horlogères.",
    type: "page",
    url: "/communaute",
    keywords: ["forum", "échange", "partage", "membres", "communauté"]
  },
  {
    id: 8,
    title: "Événements Horlogers",
    description: "Suivez les salons, conférences et expositions en Suisse.",
    type: "page",
    url: "/evenements",
    keywords: ["salon", "événement", "exposition", "suisse", "agenda"]
  },
  {
    id: 9,
    title: "Actualités Horlogères",
    description: "Les dernières nouvelles du monde horloger suisse et international.",
    type: "page",
    url: "/actualites",
    keywords: ["news", "horlogerie", "suisse", "montres", "actualité"]
  },
  {
    id: 10,
    title: "Podcasts Horlogers",
    description: "Écoutez des discussions et interviews autour de l’horlogerie suisse.",
    type: "page",
    url: "/podcasts",
    keywords: ["audio", "podcast", "discussion", "horlogerie", "interview"]
  }
];

// Fonction de recherche
export function searchContent(query: string): SearchItem[] {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();

  return searchData.filter(item =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.keywords?.some(k => k.toLowerCase().includes(lowerQuery))
  );
}
