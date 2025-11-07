// lib/searchData.ts
// Moteur de recherche complet : toutes les pages + sous-pages réelles d'HorloLearn

export interface SearchItem {
  id: number;
  title: string;
  description: string;
  type: 'page' | 'quiz' | 'outil' | 'ressource' | 'culture' | 'theorie' | 'evenement';
  url: string;
  keywords?: string[];
}

export const searchData: SearchItem[] = [
  // === ACCUEIL ===
  { id: 1, title: "Accueil HorloLearn", description: "Découvrez la plateforme HorloLearn – culture, savoir-faire et outils horlogers.", type: "page", url: "/", keywords: ["accueil", "horlomain", "introduction", "horlogerie", "site principal"] },

  // === THÉORIE PRINCIPALE ===
  { id: 10, title: "Théorie Horlogère", description: "Bases techniques et scientifiques de l'horlogerie suisse.", type: "theorie", url: "/theorie", keywords: ["théorie", "cours", "bases", "technique", "mécanique"] },
  { id: 11, title: "Lecture de Plan Horloger", description: "Symboles, cotations et conventions du plan horloger.", type: "theorie", url: "/theorie/lecture-de-plan", keywords: ["plan", "lecture", "dessin", "technique", "symboles"] },
  { id: 12, title: "Cartouche Horloger", description: "Lire les champs du cartouche horloger (ISO 7200/5457).", type: "theorie", url: "/theorie/lecture-de-plan/cartouche-horloger", keywords: ["cartouche", "plan", "normes", "iso", "dessin"] },
  { id: 13, title: "Champs du Cartouche", description: "Détail de chaque champ du cartouche : matière, auteur, échelle, etc.", type: "theorie", url: "/theorie/lecture-de-plan/champs", keywords: ["champs", "matière", "dessiné", "contrôlé", "référence"] },
  { id: 14, title: "Tables et Symboles Horlogers", description: "Tables de conversion et symboles techniques normalisés.", type: "theorie", url: "/theorie/lecture-de-plan/tables", keywords: ["table", "symbole", "iso", "tolérance", "conversion"] },
  { id: 15, title: "Mémos et Notes Techniques", description: "Fiches mémoire et rappels techniques pour la lecture de plans.", type: "theorie", url: "/theorie/lecture-de-plan/memo", keywords: ["mémo", "rappel", "fiche", "technique", "plan"] },
  { id: 16, title: "FAQ Lecture de Plan", description: "Questions fréquentes sur le dessin technique horloger.", type: "theorie", url: "/theorie/lecture-de-plan/faq", keywords: ["faq", "questions", "plan", "dessin", "horlogerie"] },
  { id: 17, title: "Normes Horlogères", description: "Normes ISO et pratiques de dessin dans l'industrie horlogère suisse.", type: "theorie", url: "/theorie/normes", keywords: ["normes", "iso", "standard", "dessin", "plans"] },

  // === THÉORIE SOUS-PAGES ===
  { id: 18, title: "Introduction à la montre mécanique", description: "Principes de fonctionnement d’une montre mécanique suisse.", type: "theorie", url: "/theorie/introduction-montre-mecanique", keywords: ["montre", "mécanique", "introduction", "fonctionnement"] },
  { id: 19, title: "Barillet et Ressort Moteur", description: "Description et fonctionnement du barillet et ressort.", type: "theorie", url: "/theorie/barillet-ressort-moteur", keywords: ["barillet", "ressort", "moteur", "mouvement"] },
  { id: 20, title: "Rouage", description: "Structure, composition et rôle du rouage horloger.", type: "theorie", url: "/theorie/rouage", keywords: ["rouage", "engrenage", "transmission"] },
  { id: 21, title: "Échappement à Ancre", description: "Principe de l'échappement à ancre dans la montre mécanique.", type: "theorie", url: "/theorie/echappement-ancre", keywords: ["échappement", "ancre", "mouvement"] },
  { id: 22, title: "Balancier Spiral", description: "Comportement et réglage du balancier spiral.", type: "theorie", url: "/theorie/balancier-spiral", keywords: ["balancier", "spiral", "réglage"] },
  { id: 23, title: "Remontage", description: "Différents types et systèmes de remontage de montre.", type: "theorie", url: "/theorie/remontage", keywords: ["remontage", "manuel", "automatique"] },
  { id: 24, title: "Matériaux horlogers", description: "Étude des matériaux utilisés en horlogerie.", type: "theorie", url: "/materiaux", keywords: ["matériaux", "alliages", "innovation"] },

  // === MODULES MOUVEMENTS & MANUFACTURES ===
  { id: 25, title: "Mouvements horlogers", description: "Présentation des différents mouvements (mécanique, quartz, etc.).", type: "theorie", url: "/theorie/mouvements", keywords: ["mouvement", "quartz", "mécanique"] },
  { id: 26, title: "Platine et ponts", description: "Composants principaux du mouvement : platine et ponts.", type: "theorie", url: "/theorie/mouvements/platine-ponts", keywords: ["platine", "pont", "structure"] },
  // ... répète la logique pour chaque sous-page mouvements, manufactures, complications, technologies, entretien, etc.

  // === PRATIQUE ===
  { id: 30, title: "Pratique Horlogère", description: "Ateliers pratiques, démontage, réglage et observation de mouvements.", type: "page", url: "/pratique", keywords: ["atelier", "mécanique", "réglage", "assemblage", "balancier"] },
  { id: 31, title: "Démontage de mouvement", description: "Tutoriel et étapes pour le démontage.", type: "theorie", url: "/pratique/demontage", keywords: ["démontage", "mouvement", "étapes"] },
  { id: 32, title: "Réglage", description: "Guide pratique pour le réglage horloger.", type: "theorie", url: "/pratique/reglage", keywords: ["réglage", "pratique", "balancier"] },
  { id: 33, title: "Huilage", description: "Techniques de huilage en horlogerie mécanique.", type: "theorie", url: "/pratique/huilage", keywords: ["huilage", "huile", "lubrification"] },
  { id: 34, title: "Fiches pratiques", description: "Recueil de fiches techniques pour l’apprentissage.", type: "ressource", url: "/pratique/fiches", keywords: ["fiches", "pratique", "révision"] },
  { id: 35, title: "Fiche ETA 6497", description: "Etude du mouvement ETA 6497.", type: "ressource", url: "/pratique/fiches/eta6497", keywords: ["eta6497", "fiche", "analyse"] },
  { id: 36, title: "Fiche ETA 2824", description: "Etude du mouvement ETA 2824.", type: "ressource", url: "/pratique/fiches/eta2824", keywords: ["eta2824", "fiche", "analyse"] },
  { id: 37, title: "Outils pratiques", description: "Présentation des principaux outils utilisés en atelier.", type: "ressource", url: "/pratique/outils", keywords: ["outils", "atelier", "pratique"] },
  { id: 38, title: "Certifications horlogères", description: "Informations sur les certifications et diplômes.", type: "ressource", url: "/pratique/certifications", keywords: ["certification", "diplôme", "horlogerie"] },
  { id: 39, title: "Remontage pratique", description: "Guide détaillé du remontage en horlogerie.", type: "theorie", url: "/pratique/remontage", keywords: ["remontage", "pratique", "mouvement"] },

  // === QUIZ ===
  { id: 40, title: "Quiz Général d’Horlogerie", description: "Testez vos connaissances sur les bases techniques et culturelles.", type: "quiz", url: "/quiz", keywords: ["quiz", "test", "bases", "connaissances"] },
  { id: 41, title: "Quiz Lecture de Plan", description: "Comprehension du dessin technique horloger.", type: "quiz", url: "/quiz/lecture-de-plan", keywords: ["quiz", "plan", "symboles", "cotations"] },
  { id: 42, title: "Quiz Complications Horlogères", description: "Quiz sur les complications : chronographe, quantième, tourbillon, etc.", type: "quiz", url: "/quiz/complications", keywords: ["complications", "chronographe", "calibre", "tourbillon"] },

  // === OUTILS ===
  { id: 50, title: "Outils Horlogers", description: "Convertisseurs et calculateurs dédiés.", type: "outil", url: "/outils", keywords: ["outil", "convertisseur", "calculateur", "horlogerie"] },
  { id: 51, title: "Analyseur d'amplitude", description: "Analyseur d’amplitude pour les mouvements.", type: "outil", url: "/outils/analyseur", keywords: ["amplitude", "analyseur", "balancier"] },
  { id: 52, title: "Outils de mesure", description: "Présentation des outils de mesure horlogers.", type: "outil", url: "/outils/outils-de-mesure", keywords: ["mesure", "outil", "atelier"] },
  { id: 53, title: "Convertisseur d’Unités", description: "Conversion lignes, mm, VPH et autres unités.", type: "outil", url: "/outils/convertisseur", keywords: ["lignes", "mm", "unité", "conversion"] },
  { id: 54, title: "Calculateur COSC", description: "Calcul des tolérances et précisions COSC.", type: "outil", url: "/outils/cosc", keywords: ["cosc", "chronomètre", "tolérance", "précision"] },
  { id: 55, title: "Calculateur d’Amplitude", description: "Calcul de l’amplitude selon position.", type: "outil", url: "/outils/amplitude", keywords: ["amplitude", "oscillation", "balancier", "mouvement"] },

  // === RESSOURCES ===
  { id: 60, title: "Ressources Horlogères", description: "PDF et fiches techniques pour vos études.", type: "ressource", url: "/ressources", keywords: ["pdf", "fiches", "documents", "ressources"] },

  // === CULTURE & SUISSE ===
  { id: 70, title: "Horlogerie Suisse", description: "Histoire, traditions et innovations helvétiques.", type: "culture", url: "/suisse", keywords: ["suisse", "culture", "manufacture", "histoire"] },
  { id: 71, title: "Culture Horlogère", description: "Valeurs et culture de l’horlogerie traditionnelle.", type: "culture", url: "/culture", keywords: ["culture", "patrimoine", "tradition", "valeurs"] },
  { id: 72, title: "Métiers horlogers", description: "Découverte des métiers de l’horlogerie suisse.", type: "culture", url: "/suisse/metiers-horlogerie", keywords: ["métiers", "suisse", "formation"] },
  { id: 73, title: "Rapport FHH", description: "Rapport FHH sur l’industrie horlogère suisse.", type: "culture", url: "/suisse/rapport-fhh", keywords: ["rapport", "FHH", "industrie"] },

  // === PODCASTS ===
  { id: 80, title: "Podcasts Horlogers", description: "Discussions et interviews sur l’horlogerie suisse.", type: "page", url: "/podcasts", keywords: ["podcast", "audio", "discussion", "interview"] },

  // === ÉVÉNEMENTS & COMMUNAUTÉ ===
  { id: 90, title: "Événements Horlogers", description: "Agenda des salons, conférences et expositions.", type: "evenement", url: "/evenements", keywords: ["salon", "événement", "exposition", "agenda"] },
  { id: 91, title: "Communauté HorloLearn", description: "Partage d’expériences entre membres.", type: "page", url: "/communaute", keywords: ["communauté", "membres", "partage", "forum"] },

  // === ACTUALITÉS ===
  { id: 100, title: "Actualités Horlogères", description: "Dernières nouvelles de l’horlogerie suisse et internationale.", type: "page", url: "/actualites", keywords: ["actualité", "news", "montres", "industrie"] },

  // === ÉCOLES HORLOGÈRES ===
  { id: 120, title: "École CFPT Genève", description: "Présentation de l’école horlogère CFPT Genève.", type: "ressource", url: "/horlogerie/ecoles/cfpt-geneve", keywords: ["école", "genève", "CFPT", "formation"] },
  { id: 121, title: "École IFAGE Genève", description: "Présentation de l’école IFAGE Genève.", type: "ressource", url: "/horlogerie/ecoles/ifage-geneve", keywords: ["école", "genève", "IFAGE", "formation"] },
  { id: 122, title: "École CFP Arts Genève", description: "Présentation du CFP Arts Genève.", type: "ressource", url: "/horlogerie/ecoles/cfp-arts-geneve", keywords: ["école", "genève", "CFP Arts", "formation"] },
  { id: 123, title: "École HEPIA Genève", description: "Présentation de HEPIA Genève.", type: "ressource", url: "/horlogerie/ecoles/hepia-geneve", keywords: ["école", "genève", "HEPIA", "formation"] },
  { id: 124, title: "École ETVJ Le Sentier", description: "École technique ETVJ Le Sentier.", type: "ressource", url: "/horlogerie/ecoles/etvj-le-sentier", keywords: ["école", "Le Sentier", "ETVJ"] },
  { id: 125, title: "École HEIG-VD Yverdon", description: "HEIG-VD à Yverdon-les-Bains.", type: "ressource", url: "/horlogerie/ecoles/heigvd-yverdon", keywords: ["école", "Yverdon", "HEIG-VD"] },
  { id: 126, title: "École CPNE Le Locle", description: "Centre professionnel CPNE Le Locle.", type: "ressource", url: "/horlogerie/ecoles/cpne-le-locle", keywords: ["école", "Le Locle", "CPNE"] },
  { id: 127, title: "CPNE AA La Chaux-de Fonds", description: "CPNE AA La Chaux-de Fonds.", type: "ressource", url: "/horlogerie/ecoles/cpne-aa-chauxdefonds", keywords: ["école", "La Chaux-de-Fonds", "CPNE"] },
  { id: 128, title: "Haute École ARC Neuchâtel", description: "Présentation Haute École ARC.", type: "ressource", url: "/horlogerie/ecoles/haute-ecole-arc", keywords: ["école", "ARC", "Neuchâtel"] },
  { id: 129, title: "WOSTEP Neuchâtel", description: "Présentation WOSTEP.", type: "ressource", url: "/horlogerie/ecoles/wostep-neuchatel", keywords: ["école", "WOSTEP", "Neuchâtel"] },
  { id: 130, title: "CEJEF Porrentruy", description: "CEJEF Porrentruy.", type: "ressource", url: "/horlogerie/ecoles/cejef-porrentruy", keywords: ["école", "CEJEF", "Porrentruy"] },
  { id: 131, title: "Lycée Technique Bienne", description: "Présentation Lycée Technique Bienne.", type: "ressource", url: "/horlogerie/ecoles/lycee-technique-bienne", keywords: ["école", "Bienne", "lycée"] },
  { id: 132, title: "CEFF St-Imier", description: "Présentation CEFF St-Imier.", type: "ressource", url: "/horlogerie/ecoles/ceff-st-imier", keywords: ["école", "St-Imier", "CEFF"] },
  { id: 133, title: "Zeitzentrum Granges", description: "Présentation Zeitzentrum Granges.", type: "ressource", url: "/horlogerie/ecoles/zeitzentrum-granges", keywords: ["école", "Granges", "Zeitzentrum"] },

  // === AUTRES ===
  { id: 200, title: "Contact", description: "Contactez HorloLearn.", type: "page", url: "/contact", keywords: ["contact", "formulaire", "mail"] }
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
