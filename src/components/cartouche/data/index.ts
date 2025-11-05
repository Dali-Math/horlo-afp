import { CartoucheField, QuizQuestion, TableData, FAQItem } from '../../../types';

// 14 Champs de cartouches horlogers selon ISO 7200
export const cartoucheFieldsData: CartoucheField[] = [
  {
    id: 'entreprise',
    name: 'Nom de l\'entreprise',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Raison sociale de l\'entreprise ou logo.',
    example: 'Manufacture Horlogère SA',
    characters: '30 caractères',
    x: 10,
    y: 10,
    width: 100,
    height: 40
  },
  {
    id: 'titre',
    name: 'Titre',
    category: 'Descriptif',
    obligation: 'Obligatoire',
    description: 'Désignation de la pièce ou de l\'ensemble. Doit être clair et normalisé.',
    example: 'Platine calibre 2824 / Pont de balancier',
    characters: '25-30 caractères',
    x: 120,
    y: 10,
    width: 180,
    height: 25
  },
  {
    id: 'numero-piece',
    name: 'Numéro de pièce',
    category: 'Identification',
    obligation: 'Obligatoire',
    description: 'Référence unique de la pièce dans le système de gestion.',
    example: 'P-2824-001-A / MB-453-12',
    characters: '15-20 caractères',
    x: 310,
    y: 10,
    width: 90,
    height: 25
  },
  {
    id: 'materiau',
    name: 'Matériau',
    category: 'Technique',
    obligation: 'Obligatoire',
    description: 'Matière première utilisée selon nomenclature normalisée.',
    example: 'Maillechort / Laiton CuZn40 / Acier inox 316L',
    characters: '20 caractères',
    x: 120,
    y: 40,
    width: 90,
    height: 20
  },
  {
    id: 'traitement',
    name: 'Traitement de surface',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Traitements thermiques, revêtements, finitions spéciales.',
    example: 'Rhodiage / Anglage / Perlage / PVD',
    characters: '30 caractères',
    x: 215,
    y: 40,
    width: 85,
    height: 20
  },
  {
    id: 'masse',
    name: 'Masse',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Poids théorique de la pièce (important en horlogerie).',
    example: '0.45 g / 2.3 g',
    characters: '10 caractères',
    x: 310,
    y: 40,
    width: 45,
    height: 20
  },
  {
    id: 'echelle',
    name: 'Échelle',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Rapport entre les dimensions du dessin et les dimensions réelles.',
    example: '1:1 / 2:1 / 5:1 / 10:1',
    characters: '10 caractères',
    x: 360,
    y: 40,
    width: 40,
    height: 20
  },
  {
    id: 'tolerance-generale',
    name: 'Tolérance générale',
    category: 'Technique',
    obligation: 'Conditionnel',
    description: 'Tolérances applicables aux cotes non tolérancées individuellement.',
    example: 'ISO 2768-m / ±0.1 mm',
    characters: '20 caractères',
    x: 120,
    y: 65,
    width: 90,
    height: 20
  },
  {
    id: 'projection',
    name: 'Méthode de projection',
    category: 'Représentation',
    obligation: 'Obligatoire',
    description: 'Symbole indiquant la méthode européenne (E) ou américaine (A).',
    example: 'Symbole E (1er dièdre) en Suisse',
    characters: 'Symbole',
    x: 215,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'format',
    name: 'Format',
    category: 'Document',
    obligation: 'Obligatoire',
    description: 'Format du plan selon ISO 5457 (A0, A1, A2, A3, A4).',
    example: 'A4 / A3',
    characters: '4 caractères',
    x: 260,
    y: 65,
    width: 40,
    height: 20
  },
  {
    id: 'indice',
    name: 'Indice de révision',
    category: 'Gestion',
    obligation: 'Obligatoire',
    description: 'Lettre ou numéro indiquant la version du document.',
    example: 'A / B / C / Rev.1',
    characters: '4 caractères',
    x: 310,
    y: 65,
    width: 45,
    height: 20
  },
  {
    id: 'dessinateur',
    name: 'Dessinateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant réalisé le dessin.',
    example: 'J. Dupont / JD',
    characters: '20 caractères',
    x: 10,
    y: 55,
    width: 100,
    height: 15
  },
  {
    id: 'verificateur',
    name: 'Vérificateur',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Nom ou initiales de la personne ayant vérifié le dessin.',
    example: 'M. Martin / MM',
    characters: '20 caractères',
    x: 10,
    y: 75,
    width: 100,
    height: 15
  },
  {
    id: 'date',
    name: 'Date',
    category: 'Administratif',
    obligation: 'Obligatoire',
    description: 'Date de création ou de dernière modification.',
    example: '17.10.2025 / 2025-10-17',
    characters: '10 caractères',
    x: 360,
    y: 65,
    width: 40,
    height: 20
  }
];

// Quiz complet avec 15 questions
export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Quelle norme ISO régit les champs de données dans les cartouches d'inscription ?",
    options: ["ISO 5457", "ISO 7200", "ISO 128-1", "ISO 1101"],
    correctAnswer: 1,
    explanation: "La norme ISO 7200:2004 spécifie les champs de données à utiliser dans les cartouches d'inscription et les têtes de documents techniques."
  },
  {
    id: 2,
    question: "Où doit obligatoirement se situer le cartouche sur un plan technique ?",
    options: ["En haut à gauche", "En bas à gauche", "En haut à droite", "En bas à droite"],
    correctAnswer: 3,
    explanation: "Selon ISO 5457, le cartouche doit obligatoirement se situer dans le coin inférieur droit du document, dans le sens de lecture."
  },
  {
    id: 3,
    question: "Quelle est la dimension maximale de la zone d'identification du cartouche selon ISO 7200 ?",
    options: ["100 mm", "120 mm", "170 mm", "210 mm"],
    correctAnswer: 2,
    explanation: "La zone d'identification du cartouche doit avoir une longueur maximale de 170 mm selon ISO 7200."
  },
  {
    id: 4,
    question: "Pour un format A4, quelle est la marge minimale recommandée selon ISO 5457 ?",
    options: ["5 mm", "10 mm", "20 mm", "25 mm"],
    correctAnswer: 1,
    explanation: "Les formats A4, A3 et A2 ont une marge de 10 mm, tandis que les formats A1 et A0 ont une marge de 20 mm."
  },
  {
    id: 5,
    question: "Quel champ du cartouche est obligatoire selon ISO 7200 ?",
    options: ["Masse de la pièce", "Titre", "Traitement de surface", "Tolérance générale"],
    correctAnswer: 1,
    explanation: "Le titre est un champ obligatoire (O) selon ISO 7200, car il identifie le contenu du document."
  },
  {
    id: 6,
    question: "Que signifie un indice de révision 'C' sur un plan ?",
    options: ["Confidentiel", "3ème révision", "Contrôlé", "Copie"],
    correctAnswer: 1,
    explanation: "L'indice de révision suit généralement l'ordre alphabétique : A (1ère révision), B (2ème), C (3ème), etc."
  },
  {
    id: 7,
    question: "Quel format de plan est le plus utilisé en horlogerie pour les pièces de mouvement ?",
    options: ["A0", "A1", "A2", "A3 ou A4"],
    correctAnswer: 3,
    explanation: "En horlogerie, les formats A3 et A4 sont les plus courants pour les pièces de mouvement, en raison de leur taille réduite."
  },
  {
    id: 8,
    question: "Que doit contenir le champ 'Méthode de projection' en Suisse ?",
    options: ["Méthode américaine (A)", "Méthode européenne (E)", "Méthode asiatique", "Projection isométrique"],
    correctAnswer: 1,
    explanation: "En Suisse et en Europe, la méthode européenne (E) ou projection du 1er dièdre est le standard."
  },
  {
    id: 9,
    question: "Quelle tolérance générale est souvent indiquée dans les cartouches horlogers ?",
    options: ["ISO 2768-c", "ISO 2768-m", "ISO 2768-f", "ISO 2768-v"],
    correctAnswer: 1,
    explanation: "ISO 2768-m (moyenne) est couramment utilisée en horlogerie, sauf pour les pièces nécessitant une précision fine (ISO 2768-f)."
  },
  {
    id: 10,
    question: "Combien de caractères sont recommandés pour le champ 'Titre' selon ISO 7200 ?",
    options: ["10-15", "15-20", "25-30", "40-50"],
    correctAnswer: 2,
    explanation: "ISO 7200 recommande 25 à 30 caractères pour le titre (30 pour les langues à caractères doubles comme le japonais)."
  },
  {
    id: 11,
    question: "Quel matériau horloger traditionnel est souvent indiqué dans le cartouche ?",
    options: ["Aluminium", "Maillechort", "Plastique", "Titane"],
    correctAnswer: 1,
    explanation: "Le maillechort (alliage cuivre-nickel-zinc) est un matériau traditionnel très utilisé en horlogerie pour les platines et ponts."
  },
  {
    id: 12,
    question: "À quoi sert le tableau de révision au-dessus du cartouche ?",
    options: ["Décoration", "Tracer l'historique des modifications", "Indiquer les tolérances", "Ajouter des notes"],
    correctAnswer: 1,
    explanation: "Le tableau de révision documente l'historique des modifications : indice, date, auteur, nature des changements."
  },
  {
    id: 13,
    question: "Quelle information n'est PAS obligatoire dans un cartouche selon ISO 7200 ?",
    options: ["Titre", "Auteur", "Masse", "Format"],
    correctAnswer: 2,
    explanation: "La masse est un champ conditionnel (C), pas obligatoire, bien qu'elle soit importante en horlogerie pour l'équilibrage."
  },
  {
    id: 14,
    question: "Quel traitement de surface est typique en horlogerie de luxe ?",
    options: ["Galvanisation", "Rhodiage", "Peinture", "Vernissage"],
    correctAnswer: 1,
    explanation: "Le rhodiage est un traitement de surface noble très utilisé en haute horlogerie pour protéger et embellir les pièces."
  },
  {
    id: 15,
    question: "Que signifie une échelle '5:1' sur un plan horloger ?",
    options: ["La pièce est 5 fois plus petite", "La pièce est 5 fois plus grande", "5 pièces identiques", "5 vues différentes"],
    correctAnswer: 1,
    explanation: "Une échelle 5:1 signifie que le dessin est 5 fois plus grand que la pièce réelle, nécessaire pour les composants miniatures horlogers."
  }
];

// Tableaux techniques éducatifs
export const formatsISOData: TableData[] = [
  { format: 'A4', dimensions: '210 × 297', marge: '10 mm', usage: 'Pièces de mouvement, composants unitaires' },
  { format: 'A3', dimensions: '297 × 420', marge: '10 mm', usage: 'Ensembles de mouvement, platines complètes' },
  { format: 'A2', dimensions: '420 × 594', marge: '10 mm', usage: 'Éclatés complexes, assemblages complets' },
  { format: 'A1', dimensions: '594 × 841', marge: '20 mm', usage: 'Plans d\'atelier, nomenclatures étendues' },
  { format: 'A0', dimensions: '841 × 1189', marge: '20 mm', usage: 'Rarement utilisé en horlogerie' }
];

export const materiauxData: TableData[] = [
  { designation: 'CuNi18Zn20', nom: 'Maillechort', composition: 'Cu-Ni 18% - Zn 20%', usage: 'Platines, ponts, leviers' },
  { designation: 'CuZn40', nom: 'Laiton', composition: 'Cu-Zn 40%', usage: 'Roues, pignons, platines' },
  { designation: 'X5CrNi18-10 (316L)', nom: 'Acier inoxydable', composition: 'Acier austénitique', usage: 'Axes, visserie, boîtiers' },
  { designation: 'Glucydur', nom: 'Glucydur', composition: 'Alliage Cu-Be', usage: 'Balanciers (antimagnétique)' },
  { designation: 'Nivaflex', nom: 'Nivaflex', composition: 'Alliage Ni-Cr-Co-Ti-Be', usage: 'Spiraux (antimagnétique)' },
  { designation: 'Rubis synthétique', nom: 'Rubis', composition: 'Corindon Al₂O₃', usage: 'Paliers, contre-pivots' }
];

export const traitementsData: TableData[] = [
  { traitement: 'Rhodiage', description: 'Dépôt électrolytique de rhodium', objectif: 'Protection, aspect blanc brillant', application: 'Platines, ponts de luxe' },
  { traitement: 'Anglage', description: 'Polissage des arêtes à 45°', objectif: 'Esthétique haute horlogerie', application: 'Ponts, leviers, bascules' },
  { traitement: 'Perlage', description: 'Motif circulaire décoratif', objectif: 'Esthétique, finition noble', application: 'Platines, ponts' },
  { traitement: 'Côtes de Genève', description: 'Rayures parallèles ondulées', objectif: 'Finition traditionnelle genevoise', application: 'Ponts, masses oscillantes' },
  { traitement: 'PVD', description: 'Dépôt physique en phase vapeur', objectif: 'Dureté, résistance, couleur', application: 'Boîtiers, composants sportifs' },
  { traitement: 'Satinage', description: 'Finition mate directionnelle', objectif: 'Esthétique, anti-reflets', application: 'Boîtiers, bracelets' }
];

// FAQ complète
export const faqData: FAQItem[] = [
  {
    id: 'obligatoire-conditionnel',
    question: 'Quelle est la différence entre un champ obligatoire (O) et conditionnel (C) ?',
    answer: 'Un champ obligatoire (O) doit toujours être renseigné selon ISO 7200 (titre, auteur, date, format, etc.). Un champ conditionnel (C) n\'est obligatoire que si l\'information est pertinente pour le document (masse, traitement de surface, tolérance générale). En horlogerie, la masse et les traitements sont souvent considérés comme obligatoires de facto.'
  },
  {
    id: 'revisions',
    question: 'Comment gérer les révisions d\'un plan technique ?',
    answer: 'Chaque modification doit être documentée dans un tableau de révision au-dessus du cartouche : Indice (A, B, C...), Date, Auteur, Nature de la modification (description concise), Visa (vérificateur). L\'indice dans le cartouche principal doit être mis à jour. En production, seule la dernière révision est valide.'
  },
  {
    id: 'echelle-horlogerie',
    question: 'Pourquoi l\'échelle est-elle souvent supérieure à 1:1 en horlogerie ?',
    answer: 'Les composants horlogers sont miniatures (pivots de 0.08 mm, rubis de 0.2 mm). Une échelle 2:1, 5:1 ou même 10:1 agrandit le dessin pour permettre une cotation lisible et précise. Le dessinateur peut ainsi spécifier des tolérances de l\'ordre du micromètre. L\'échelle réelle doit toujours être clairement indiquée dans le cartouche.'
  },
  {
    id: 'tolerances',
    question: 'Quelles tolérances générales indiquer dans le cartouche horloger ?',
    answer: 'En horlogerie, on utilise généralement ISO 2768-m (moyenne) ou ISO 2768-f (fine) pour les pièces de précision. Ces normes définissent les tolérances linéaires et angulaires pour les cotes non tolérancées individuellement. Pour les mouvements haut de gamme, ISO 2768-f est préférable. Les cotes critiques doivent toujours avoir des tolérances spécifiques.'
  },
  {
    id: 'personnalisation',
    question: 'Peut-on personnaliser le cartouche selon l\'entreprise ?',
    answer: 'Oui, les entreprises peuvent créer des cartouches personnalisés tant que les champs obligatoires ISO 7200 sont présents et que le cartouche reste en bas à droite. La plupart des manufactures horlogères suisses ont un modèle standardisé incluant leur logo, des champs spécifiques (n° de calibre, série, client) et des zones pour validation qualité. Le respect des normes ISO garantit néanmoins l\'interchangeabilité des documents.'
  }
];

// Erreurs fréquentes et bonnes pratiques
export const erreursFrequentes = [
  "Oublier de renseigner les champs obligatoires (titre, auteur, date).",
  "Ne pas mettre à jour l'indice de révision après modification.",
  "Utiliser des abréviations non normalisées pour le matériau.",
  "Placer le cartouche ailleurs qu'en bas à droite.",
  "Omettre la méthode de projection (symbole E/A).",
  "Ne pas spécifier les tolérances générales applicables."
];

export const bonnesPratiques = [
  "Remplir systématiquement tous les champs obligatoires (O) selon ISO 7200.",
  "Utiliser des désignations normalisées pour les matériaux horlogers.",
  "Indiquer clairement les tolérances générales (ISO 2768-m ou f).",
  "Maintenir un tableau de révision au-dessus du cartouche.",
  "Préciser les traitements de surface spécifiques (rhodiage, anglage, etc.).",
  "Respecter les marges ISO 5457 pour archivage et pliage."
];

// Mapping des catégories vers les couleurs
export const categoryColors = {
  'Identification': 'purple',
  'Descriptif': 'blue', 
  'Technique': 'green',
  'Représentation': 'orange',
  'Document': 'cyan',
  'Administratif': 'pink',
  'Gestion': 'amber'
} as const;
