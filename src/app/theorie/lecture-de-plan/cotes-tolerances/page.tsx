"use client";

import Link from "next/link";
import NihsToleranceCalculator from "../../../pratique/laboratoire/NihsToleranceCalculator";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  Award,
  RotateCcw,
  ChevronDown,
  Info,
  CheckCircle2,
  XCircle,
  Layers,
  Compass,
  Gauge,
  Sliders,
  AlertTriangle,
  BookOpen
} from "lucide-react";

type ToleranceItem = {
  id: string;
  symbol: string;
  name: string;
  category: "Forme" | "Orientation" | "Position" | "Battement";
  description: string;
  zoneType: string;
  reference: string;
  example: string;
};

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type IndicatorItem = {
  symbol: string;
  name: string;
  description: string;
  exemple: string;
  usageHorloger: string;
  standard: string;
};

type ApplicationItem = {
  composant: string;
  fonction: string;
  tolerance: string;
  justification: string;
  impact: string;
  isoType: string;
};

type MemoItem = {
  id: number;
  titre: string;
  desc: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

// ==========================================
// DATASETS OFFICIELS ISO 129-1 & ISO 1101
// ==========================================

const TOLERANCES: ToleranceItem[] = [
  {
    "id": "rectitude",
    "symbol": "—",
    "name": "Rectitude",
    "category": "Forme",
    "description": "Spécifie que l'élément (ligne ou axe) doit être contenu dans une zone de tolérance",
    "zoneType": "Espace entre deux droites parallèles ou cylindre",
    "reference": "Non nécessaire",
    "example": "Axe de pivotage balancier : rectitude Ø 0.002 mm"
  },
  {
    "id": "planeite",
    "symbol": "⏥",
    "name": "Planéité",
    "category": "Forme",
    "description": "Spécifie que la surface doit être contenue entre deux plans parallèles distants de la valeur de tolérance",
    "zoneType": "Espace entre deux plans parallèles",
    "reference": "Non nécessaire",
    "example": "Face de platine : planéité 0.005 mm pour montage précis"
  },
  {
    "id": "circularite",
    "symbol": "○",
    "name": "Circularité",
    "category": "Forme",
    "description": "Spécifie que le contour d'une section circulaire doit être compris entre deux cercles concentriques",
    "zoneType": "Espace entre deux cercles concentriques",
    "reference": "Non nécessaire",
    "example": "Section de pivot : circularité 0.001 mm"
  },
  {
    "id": "cylindricite",
    "symbol": "⌭",
    "name": "Cylindricité",
    "category": "Forme",
    "description": "Spécifie que la surface cylindrique doit être comprise entre deux cylindres coaxiaux",
    "zoneType": "Espace entre deux cylindres coaxiaux",
    "reference": "Non nécessaire",
    "example": "Alésage de barillet : cylindricité 0.003 mm"
  },
  {
    "id": "parallelisme",
    "symbol": "∥",
    "name": "Parallélisme",
    "category": "Orientation",
    "description": "Spécifie que l'élément doit être contenu dans une zone parallèle à la référence",
    "zoneType": "Plans parallèles ou cylindre parallèle",
    "reference": "Oui (nécessaire)",
    "example": "Face de pont parallèle à platine : 0.01 mm / A"
  },
  {
    "id": "perpendicularite",
    "symbol": "⊥",
    "name": "Perpendicularité",
    "category": "Orientation",
    "description": "Spécifie que l'élément doit être perpendiculaire à la référence spécifiée",
    "zoneType": "Plans perpendiculaires ou cylindre perpendiculaire",
    "reference": "Oui (nécessaire)",
    "example": "Axe perpendiculaire à platine : Ø 0.02 mm / A"
  },
  {
    "id": "inclinaison",
    "symbol": "∠",
    "name": "Inclinaison",
    "category": "Orientation",
    "description": "Spécifie que l'élément doit être incliné d'un angle théorique par rapport à la référence",
    "zoneType": "Plans ou cylindre incliné",
    "reference": "Oui (nécessaire)",
    "example": "Surface inclinée 30° : 0.05 mm / A"
  },
  {
    "id": "localisation",
    "symbol": "⊕",
    "name": "Localisation",
    "category": "Position",
    "description": "Spécifie la position théorique exacte d'un élément par rapport aux références",
    "zoneType": "Cylindre, sphère ou plans parallèles",
    "reference": "Oui (nécessaire)",
    "example": "Position trou fixation : Ø 0.05 mm / A B"
  },
  {
    "id": "coaxialite",
    "symbol": "◎",
    "name": "Coaxialité",
    "category": "Position",
    "description": "Spécifie que l'axe d'un élément doit coïncider avec l'axe de référence",
    "zoneType": "Cylindre coaxial",
    "reference": "Oui (nécessaire)",
    "example": "Coaxialité pivots : Ø 0.005 mm / A"
  },
  {
    "id": "symetrie",
    "symbol": "⌯",
    "name": "Symétrie",
    "category": "Position",
    "description": "Spécifie que l'élément médian doit être symétrique par rapport au plan de référence",
    "zoneType": "Espace entre deux plans parallèles",
    "reference": "Oui (nécessaire)",
    "example": "Symétrie rainure : 0.01 mm / A"
  },
  {
    "id": "battement-circulaire",
    "symbol": "↗",
    "name": "Battement circulaire",
    "category": "Battement",
    "description": "Spécifie la variation radiale ou axiale lors d'une rotation complète autour de l'axe de référence",
    "zoneType": "Zone entre deux cercles concentriques",
    "reference": "Oui (nécessaire)",
    "example": "Battement roue : 0.02 mm / A-B"
  },
  {
    "id": "battement-total",
    "symbol": "⤧",
    "name": "Battement total",
    "category": "Battement",
    "description": "Spécifie la variation totale de la surface lors d'une rotation et d'un déplacement axial",
    "zoneType": "Zone entre deux cylindres ou plans",
    "reference": "Oui (nécessaire)",
    "example": "Battement total arbre : 0.03 mm / A-B"
  }
];

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": 1,
    "question": "Quelle norme ISO régit la représentation des dimensions et tolérances sur les plans ?",
    "options": [
      "ISO 128-2",
      "ISO 129-1",
      "ISO 1302",
      "ISO 13715"
    ],
    "correctAnswer": 1,
    "explanation": "La norme ISO 129-1:2018 établit les principes généraux pour la représentation des dimensions et des tolérances associées sur les dessins techniques."
  },
  {
    "id": 2,
    "question": "Quelle norme ISO traite du tolérancement géométrique ?",
    "options": [
      "ISO 128-3",
      "ISO 1302",
      "ISO 1101",
      "ISO 129-1"
    ],
    "correctAnswer": 2,
    "explanation": "La norme ISO 1101 définit les tolérances géométriques : forme, orientation, position et battement des éléments."
  },
  {
    "id": 3,
    "question": "Combien de groupes de tolérances géométriques existe-t-il selon ISO 1101 ?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 2,
    "explanation": "Il existe 4 groupes de tolérances géométriques : forme, orientation, position et battement."
  },
  {
    "id": 4,
    "question": "Quel symbole représente la planéité ?",
    "options": [
      "—",
      "⏥",
      "○",
      "⊥"
    ],
    "correctAnswer": 1,
    "explanation": "Le symbole de la planéité est ⏥ (parallélogramme), utilisé pour spécifier qu'une surface doit être plane."
  },
  {
    "id": 5,
    "question": "Les tolérances de forme nécessitent-elles une référence spécifiée ?",
    "options": [
      "Oui, toujours",
      "Non, jamais",
      "Parfois",
      "Seulement pour les cylindres"
    ],
    "correctAnswer": 1,
    "explanation": "Les tolérances de forme (rectitude, planéité, circularité, cylindricité) ne nécessitent JAMAIS de référence spécifiée."
  },
  {
    "id": 6,
    "question": "Que signifie le symbole ⊕ en tolérancement géométrique ?",
    "options": [
      "Coaxialité",
      "Localisation",
      "Concentricité",
      "Symétrie"
    ],
    "correctAnswer": 1,
    "explanation": "Le symbole ⊕ représente la localisation (position), qui spécifie la position théorique exacte d'un élément par rapport aux références."
  },
  {
    "id": 7,
    "question": "Quelle tolérance garantit qu'un axe est perpendiculaire à une surface de référence ?",
    "options": [
      "Parallélisme",
      "Perpendicularité",
      "Inclinaison",
      "Rectitude"
    ],
    "correctAnswer": 1,
    "explanation": "La perpendicularité (symbole ⊥) garantit qu'un élément est perpendiculaire à 90° par rapport à la référence spécifiée."
  },
  {
    "id": 8,
    "question": "Que signifie l'acronyme GPS en cotation ?",
    "options": [
      "Global Positioning System",
      "Géométrie Précise Suisse",
      "Spécification Géométrique des Produits",
      "Guide de Production Standard"
    ],
    "correctAnswer": 2,
    "explanation": "GPS signifie Spécification Géométrique des Produits (Geometrical Product Specifications), un système cohérent de normes ISO."
  },
  {
    "id": 9,
    "question": "En horlogerie, les tolérances sont souvent exprimées en :",
    "options": [
      "Millimètres",
      "Micromètres (microns)",
      "Nanomètres",
      "Centimètres"
    ],
    "correctAnswer": 1,
    "explanation": "En horlogerie de précision, les tolérances sont généralement exprimées en micromètres (µm), voire en nanomètres pour les pièces critiques."
  },
  {
    "id": 10,
    "question": "Quel symbole indique un diamètre avant une cote ?",
    "options": [
      "R",
      "Ø",
      "□",
      "SR"
    ],
    "correctAnswer": 1,
    "explanation": "Le symbole Ø (lettre grecque phi) précède toujours une cote de diamètre sans espace, par exemple : Ø 10."
  },
  {
    "id": 11,
    "question": "Que représente une cote entre parenthèses sur un plan ?",
    "options": [
      "Cote critique",
      "Cote auxiliaire (non à contrôler)",
      "Cote théorique exacte",
      "Cote avec tolérance serrée"
    ],
    "correctAnswer": 1,
    "explanation": "Une cote entre parenthèses est une cote auxiliaire (de repère) donnée à titre indicatif, qui ne doit pas être contrôlée."
  },
  {
    "id": 12,
    "question": "Quelle zone de tolérance pour la circularité ?",
    "options": [
      "Deux plans parallèles",
      "Deux cercles concentriques",
      "Deux cylindres coaxiaux",
      "Un cylindre unique"
    ],
    "correctAnswer": 1,
    "explanation": "La zone de tolérance de circularité est l'espace entre deux cercles concentriques distants de la valeur de tolérance."
  },
  {
    "id": 13,
    "question": "Combien de références spécifiées au maximum peut-on utiliser ?",
    "options": [
      "1",
      "2",
      "3",
      "Illimité"
    ],
    "correctAnswer": 2,
    "explanation": "On peut utiliser jusqu'à 3 références spécifiées (primaire, secondaire, tertiaire) pour définir un système de références complet."
  },
  {
    "id": 14,
    "question": "Que signifie une cote encadrée sur un plan ?",
    "options": [
      "Cote avec tolérance serrée",
      "Cote théorique exacte (TED)",
      "Cote à mesurer en priorité",
      "Cote en millimètres"
    ],
    "correctAnswer": 1,
    "explanation": "Une cote encadrée est une cote Théoriquement Exacte (TED), qui définit la position théorique exacte sans tolérance."
  },
  {
    "id": 15,
    "question": "Quel est le principe de base du tolérancement ISO GPS ?",
    "options": [
      "Maximiser les tolérances",
      "Minimiser les coûts",
      "Spécifier selon la fonction",
      "Simplifier les contrôles"
    ],
    "correctAnswer": 2,
    "explanation": "Le principe de base du GPS est de spécifier les tolérances selon les exigences fonctionnelles, sans sur-spécifier ni sous-spécifier."
  }
];

const INDICATORS: IndicatorItem[] = [
  {
    "symbol": "Ø",
    "name": "Diamètre",
    "description": "Indique que la dimension cotée est un diamètre. Placé avant la valeur sans espace.",
    "exemple": "Ø 1.20 h6",
    "usageHorloger": "Pivot de balancier, arbre de barillet, pierre chassée, alésage de platine",
    "standard": "ISO 129-1:2018"
  },
  {
    "symbol": "R",
    "name": "Rayon",
    "description": "Indique que la dimension cotée est un rayon d'arc de cercle. La ligne de cote pointe vers le centre.",
    "exemple": "R 0.15 ±0.02",
    "usageHorloger": "Congés de raccordement de ponts, arrondis d'ailes de pignons, becs d'ancres",
    "standard": "ISO 129-1:2018"
  },
  {
    "symbol": "SR",
    "name": "Rayon sphérique",
    "description": "Indique que la surface est une portion de calotte sphérique tridimensionnelle.",
    "exemple": "SR 3.50",
    "usageHorloger": "Contre-pivot en rubis sphérique (pare-choc Incabloc), glace saphir bombée",
    "standard": "ISO 129-1:2018"
  },
  {
    "symbol": "□",
    "name": "Côté carré",
    "description": "Indique la dimension d'une section carrée sans avoir à répéter la cote en largeur et hauteur.",
    "exemple": "□ 0.90",
    "usageHorloger": "Carré de remontoir (tige de remontoir), tenon de chaussée, clé de barillet",
    "standard": "ISO 129-1:2018"
  },
  {
    "symbol": "( ... )",
    "name": "Cote auxiliaire",
    "description": "Cote indicative fournie pour repérage ou information. Elle ne fait l'objet d'aucun contrôle de conformité.",
    "exemple": "(12.40)",
    "usageHorloger": "Épaisseur globale indicative d'un mouvement emboîté, cote de sécurité d'encombrement",
    "standard": "ISO 129-1:2018"
  },
  {
    "symbol": "⌈ ... ⌉",
    "name": "Cote théorique exacte (TED)",
    "description": "Dimension Théoriquement Exacte encadrée sans tolérance propre. Sa conformité est assurée par une tolérance géométrique.",
    "exemple": "⌈ 8.50 ⌉ [⊕|Ø0.02|A|B]",
    "usageHorloger": "Entraxe géométrique entre l'axe de balancier et l'axe d'ancre, positions des colonnes de chronographe",
    "standard": "ISO 1101 & ISO 5459"
  }
];

const APPLICATIONS: ApplicationItem[] = [
  {
    "composant": "Axe de balancier",
    "fonction": "Organe régulateur oscillant (28'800 alt/h)",
    "tolerance": "Rectitude de l'axe : Ø 0.002 mm",
    "justification": "Garantir une oscillation pure et parfaitement plane sans frottement asymétrique sur les pivots.",
    "impact": "Préservation de l'amplitude du balancier et stabilité de la marche chronométrique.",
    "isoType": "Forme (Rectitude —)"
  },
  {
    "composant": "Platine de base",
    "fonction": "Châssis porteur de l'ensemble du calibre",
    "tolerance": "Planéité de la face de montage : 0.005 mm",
    "justification": "Assurer l'assiette plane rigoureuse et le parallélisme absolu pour le vissage des ponts.",
    "impact": "Empêche tout coincement des mobiles et garantit les ébats d'engrenage.",
    "isoType": "Forme (Planéité ⏥)"
  },
  {
    "composant": "Alésage de tambour de barillet",
    "fonction": "Réserve d'énergie motrice (ressort moteur)",
    "tolerance": "Circularité de la paroi : 0.003 mm",
    "justification": "Permettre un déroulement concentrique du ressort et une rotation régulière sans point dur.",
    "impact": "Couple moteur constant transmis au rouage jusqu'à l'échappement.",
    "isoType": "Forme (Circularité ○)"
  },
  {
    "composant": "Pont de balancier (Coq)",
    "fonction": "Maintien supérieur de l'axe de régulation",
    "tolerance": "Perpendicularité trou / face : Ø 0.02 mm / A",
    "justification": "Assurer l'alignement orthogonal parfait du contre-pivot avec le châssis de platine.",
    "impact": "Élimination des forces de cisaillement sur les pivots extrêmement fins (Ø 0.08 mm).",
    "isoType": "Orientation (Perpendicularité ⊥)"
  },
  {
    "composant": "Roue d'échappement",
    "fonction": "Distribution d'impulsion et comptage temporel",
    "tolerance": "Battement circulaire de serge : 0.004 mm / A",
    "justification": "Garantir un engagement micrométrique constant des palettes de l'ancre sur les dents d'impulsion.",
    "impact": "Prévention des ratés d'impulsion, des butées parasites et du phénomène de galop.",
    "isoType": "Battement (Battement circulaire ↗)"
  },
  {
    "composant": "Trous de centrage & Pieds de pont",
    "fonction": "Indexation rigoureuse des sous-ensembles",
    "tolerance": "Localisation : Ø 0.015 mm / A | B",
    "justification": "Garantir l'interchangeabilité immédiate des composants en SAV horloger sans retouche.",
    "impact": "Gain de temps au rhabillage et respect des cotes de fabrication suisse d'origine.",
    "isoType": "Position (Localisation ⊕)"
  }
];

const ERREURS_MEMO: MemoItem[] = [
  {
    "id": 1,
    "titre": "Tolérance de forme avec référence",
    "desc": "Associer une référence spécifiée (ex: | — | 0.01 | A |) à une tolérance de rectitude ou planéité. Une forme s'auto-contrôle toujours sans référence."
  },
  {
    "id": 2,
    "titre": "Oubli du symbole Ø",
    "desc": "Omettre le symbole Ø devant la valeur d'une zone cylindrique (ex: | ⊕ | 0.02 | au lieu de | ⊕ | Ø 0.02 |). Cela restreint la zone à un carré théorique."
  },
  {
    "id": 3,
    "titre": "Sur-spécification coûteuse",
    "desc": "Imposer des tolérances de quelques microns sur des surfaces non fonctionnelles. Cela explose les coûts d'usinage et le taux de rebuts sans bénéfice."
  },
  {
    "id": 4,
    "titre": "Mélange incohérent taille/forme",
    "desc": "Confondre la tolérance dimensionnelle (limites de matière) et la tolérance géométrique (enveloppe de forme) sans respecter le principe de l'enveloppe ISO."
  },
  {
    "id": 5,
    "titre": "Système de références bancal",
    "desc": "Ne pas respecter l'ordre hiérarchique A (primaire, 3 pts), B (secondaire, 2 pts), C (tertiaire, 1 pt), ce qui rend le contrôle métrologique impossible."
  },
  {
    "id": 6,
    "titre": "Cotation sur arêtes cachées",
    "desc": "Accrocher des lignes de cote ou des cadres de tolérances géométriques sur des traits interrompus (arêtes invisibles), source majeure de litiges d'atelier."
  }
];

const BONNES_PRATIQUES_MEMO: MemoItem[] = [
  {
    "id": 1,
    "titre": "Principe fonctionnel GPS",
    "desc": "Chaque cote et tolérance doit refléter une fonction mécanique réelle (assemblage, étanchéité, liberté d'oscillation, frottement)."
  },
  {
    "id": 2,
    "titre": "Clarté visuelle ISO 129-1",
    "desc": "Placer toujours les cotes sur la vue montrant la forme la plus caractéristique et à l'extérieur des contours de la pièce."
  },
  {
    "id": 3,
    "titre": "Référentiel fonctionnel hiérarchisé",
    "desc": "Établir un trièdre de référence robuste basé sur les appuis mécaniques réels d'emboîtement (face d'appui platine = A, trou de centrage = B)."
  },
  {
    "id": 4,
    "titre": "Indicateurs normalisés stricts",
    "desc": "Utiliser systématiquement les symboles normalisés (Ø, R, SR, □, TED encadrées) pour lever toute équivoque d'interprétation d'usinage."
  },
  {
    "id": 5,
    "titre": "Tolérances géométriques ciblées",
    "desc": "Privilégier le tolérancement géométrique ISO 1101 pour découpler la fonction géométrique des tolérances dimensionnelles d'usinage."
  },
  {
    "id": 6,
    "titre": "Non-redondance absolue",
    "desc": "Chaque élément de dimension ou géométrie ne doit être spécifié qu'une seule et unique fois sur l'ensemble de la liasse de plans."
  }
];

const FAQ_ITEMS: FaqItem[] = [
  {
    "question": "Quelle est la différence fondamentale entre tolérance dimensionnelle et tolérance géométrique ?",
    "answer": "La tolérance dimensionnelle (ISO 129-1) régit exclusivement la taille locale (longueur, diamètre, entraxe) entre deux points opposés. La tolérance géométrique (ISO 1101) contrôle la forme, l'orientation, la position ou le battement de l'élément dans l'espace. Exemple classique en horlogerie : un arbre peut être rigoureusement dans sa tolérance de diamètre (Ø 2.00 ± 0.005 mm) tout en étant courbé comme une banane. La tolérance géométrique de rectitude garantit que l'axe reste parfaitement droit."
  },
  {
    "question": "Pourquoi les 4 tolérances de forme ne nécessitent-elles jamais de référence spécifiée ?",
    "answer": "Les tolérances de forme (Rectitude, Planéité, Circularité, Cylindricité) qualifient la perfection intrinsèque d'une surface ou d'une ligne prise isolément. Elles mesurent la déviation de l'élément par rapport à sa propre forme géométrique idéale, sans se soucier de l'orientation ou de l'emplacement du reste de la pièce. Ajouter une référence (A, B ou C) à un cadre de planéité constitue une faute normative majeure selon l'ISO 1101."
  },
  {
    "question": "Comment concevoir un système de références (A, B, C) cohérent selon l'ISO 5459 ?",
    "answer": "On applique la règle de l'isostatisme (3-2-1) : La référence primaire (A) bloque 3 degrés de liberté (généralement la face plane d'appui de la platine ou du pont). La référence secondaire (B), perpendiculaire à A, bloque 2 degrés de liberté (souvent un alésage de goupille ou une portée cylindrique). La référence tertiaire (C), perpendiculaire à A et B, bloque le dernier degré de liberté (rotation ou arrêt en translation). Ce trièdre garantit que la pièce est inspectée sur banc de mesure exactement comme elle est assemblée en mouvement."
  },
  {
    "question": "Qu'est-ce qu'une Cote Théoriquement Exacte (TED - Cote encadrée) ?",
    "answer": "Une cote TED (Théoriquement Exacte Dimension, ex: [ 14.50 ]) indique une position mathématique nominale sans aucune marge de tolérance sur le chiffre lui-même. Elle s'utilise obligatoirement de concert avec une tolérance géométrique de localisation (symbole ⊕). La marge de tolérance n'est plus un intervalle ± sur la longueur, mais une zone spatiale (ex: un cylindre de Ø 0.02 mm) à l'intérieur duquel l'axe réel doit se trouver. Cela évite les cumuls d'erreurs et maximise la zone d'acceptation fonctionnelle."
  },
  {
    "question": "Pourquoi l'horlogerie suisse exige-t-elle des tolérances micrométriques (µm) ?",
    "answer": "Un calibre horloger fonctionne avec des énergies infimes (de l'ordre du microwatt fourni par le ressort de barillet) et une fréquence d'oscillation élevée (ex: 4 Hz = 28'800 alternances/heure, soit plus de 250 millions de battements par an). Pour éviter que les pivots ne bloquent dans leurs coussinets en rubis tout en maintenant des jeux d'engrenage rigoureux de quelques centièmes de millimètre, les écarts géométriques et dimensionnels doivent impérativement être maîtrisés au micromètre (0.001 mm à 0.003 mm)."
  }
];

export default function CotesEtTolerancesPage() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<string>("tolerances");
  const [selectedTolId, setSelectedTolId] = useState<string>(TOLERANCES[0].id);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Quiz States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // FAQ Accordions State
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Comparateur Métrologique SVG ISO 286 / NIHS States
  const [fitMode, setFitMode] = useState<"glissant" | "incertain" | "serre">("glissant");
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  // Selected tolerance helper
  const activeTolerance = TOLERANCES.find((t) => t.id === selectedTolId) || TOLERANCES[0];

  // Filtered tolerances
  const filteredTolerances =
    categoryFilter === "all"
      ? TOLERANCES
      : TOLERANCES.filter((t) => t.category === categoryFilter);

  // Quiz Handlers
  const handleAnswerSelect = (optionIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswer(optionIdx);
    setShowExplanation(true);
    if (optionIdx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ESPACE DE DÉGAGEMENT HAUT : Empêche toute superposition avec la navbar capsule flottante */}
      <div className="pt-8 sm:pt-10 md:pt-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* HERO SECTION DE HAUTE HORLOGERIE */}
        <section className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
            <Link
              href="/theorie"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Théorie
            </Link>
            <span>›</span>
            <Link
              href="/theorie/lecture-de-plan"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Lecture de Plan
            </Link>
            <span>›</span>
            <span className="text-slate-800 dark:text-slate-200 font-semibold">
              Cotes & Tolérances (ISO 129-1 & 1101)
            </span>
          </nav>

          {/* Badge Horlogerie Suisse */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 mb-5 shadow-sm">
            <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Spécification Géométrique des Produits (GPS) • Précision Micrométrique</span>
          </div>

          {/* Grand Titre conforme /theorie */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4 font-serif leading-tight">
            Cotes &amp; Tolérances Horlogères <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Métrologie ISO 286, ISO 129-1 &amp; GPS 1101
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            Maîtrisez les trois piliers normatifs indispensables du dessin technique horloger : les ajustements cylindriques{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">ISO 286 / NIHS</span>, la cotation dimensionnelle{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">ISO 129-1</span> et le tolérancement géométrique GPS{" "}
            <span className="font-semibold text-slate-900 dark:text-amber-300">ISO 1101</span> au micron près.
          </p>

          {/* Ruban de Métriques Rapides */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">4</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Groupes GPS</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">12</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Tolérances ISO 1101</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">6</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Symboles ISO 129-1</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">15</div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">Questions Quiz NIHS</div>
            </div>
          </div>
        </section>

        {/* ⭐ ACCÈS DIRECT AU CALCULATEUR D'ÉBATS D'ÉTABLI */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border-2 border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 text-xl font-bold">
              ⚙️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Besoin de calculer un ébat ou un ajustement pour votre établi ?</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase tracking-wider">Outil Direct</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                Calculez en direct le jeu axial, le jeu de trou pivot/rubis et le serrage Seitz pour 24 organes horlogers avec notre Calculateur d&apos;Ébats.
              </p>
            </div>
          </div>
          <Link
            href="/outils/ebats-ajustements"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono uppercase transition shadow-lg shadow-amber-500/20 shrink-0 inline-flex items-center gap-2"
          >
            <span>Ouvrir le Calculateur d&apos;Ébats</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* COMPARATEUR MÉTROLOGIQUE SVG DES AJUSTEMENTS HORLOGERS ISO 286 / NIHS     */}
        {/* ========================================================================= */}
        <section className="mb-14 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Gauge className="w-4 h-4" />
                <span>Comparateur Métrologique SVG • Norme ISO 286 &amp; NIHS (Alésage Normal H)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Les 3 Ajustements Fondamentaux de l’Horloger sous Loupe 10x
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFitMode("glissant")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  fitMode === "glissant"
                    ? "bg-emerald-500 text-slate-950 shadow-sm"
                    : "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                1. Libre / Glissant (H7/g6 • Pivot / Rubis)
              </button>
              <button
                onClick={() => setFitMode("incertain")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  fitMode === "incertain"
                    ? "bg-amber-500 text-slate-950 shadow-sm"
                    : "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                2. Incertain / Centrage (H7/k6 • Pied de Pont)
              </button>
              <button
                onClick={() => setFitMode("serre")}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  fitMode === "serre"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                3. Serré / Chassage (H7/p6 • Rubis / Platine)
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                  loupe10x
                    ? "bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300"
                    : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                {loupe10x ? "Loupe 10x Active" : "Loupe 10x"}
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* CANVAS SVG : COUPE MICRO-MÉCANIQUE + DIAGRAMME DES ZONES DE TOLÉRANCE ISO 286 */}
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-hidden">
              <div className="overflow-hidden rounded-xl bg-[#060a12] border border-slate-800/80">
                <svg
                  viewBox="0 0 720 350"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? "scale(1.38)" : "scale(1)",
                    transformOrigin: "215px 175px"
                  }}
                >
                  <line x1="380" y1="20" x2="380" y2="330" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 6" />

                  {/* ========================================================= */}
                  {/* GAUCHE : COUPE RADIALE ET AXIALE DE L'ASSEMBLAGE          */}
                  {/* ========================================================= */}
                  <g transform="translate(190, 175)">
                    <text x="0" y="-140" fill="#94a3b8" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      COUPE MICRO-MÉCANIQUE DE L’ASSEMBLAGE
                    </text>

                    {fitMode === "glissant" && (
                      <g>
                        {/* Pierre percée en rubis synthétique (Alésage Ø 0.120 mm H7) */}
                        <circle cx="0" cy="0" r="105" fill="#9f1239" stroke="#fda4af" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="68" fill="#060a12" stroke="#f43f5e" strokeWidth="2" />
                        {/* Film d'huile Moebius 9010 dans le jeu radial de 4 µm */}
                        <circle
                          cx="0"
                          cy="0"
                          r="60"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="12"
                          strokeDasharray="8 3"
                          opacity="0.75"
                        />
                        {/* Pivot en acier trempé poli (Arbre Ø 0.112 mm g6) */}
                        <circle cx="0" cy="0" r="52" fill="#cbd5e1" stroke="#f8fafc" strokeWidth="2.5" />

                        <text x="0" y="4" fill="#0f172a" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          PIVOT Ø 0.112
                        </text>
                        <text x="0" y="128" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Jeu radial = +4 µm (Film d’huile Moebius 9010)
                        </text>
                      </g>
                    )}

                    {fitMode === "incertain" && (
                      <g>
                        {/* Alésage de platine laiton (Ø 0.800 mm H7) */}
                        <circle cx="0" cy="0" r="105" fill="#b45309" stroke="#fde68a" strokeWidth="2.5" />
                        {/* Goupille / Pied de pont en acier (Ø 0.800 mm k6 : contact juste) */}
                        <circle cx="0" cy="0" r="65" fill="#cbd5e1" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6 3" />

                        <text x="0" y="4" fill="#0f172a" fontSize="10.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          PIED DE PONT k6
                        </text>
                        <text x="0" y="128" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Jeu/Serrage = ±1.5 µm (Centrage sans jeu d’entraxe)
                        </text>
                      </g>
                    )}

                    {fitMode === "serre" && (
                      <g>
                        {/* Alésage de platine laiton Ø 1.200 mm H7 */}
                        <circle cx="0" cy="0" r="108" fill="#b45309" stroke="#fde68a" strokeWidth="2.5" />
                        {/* Zone de compression élasto-plastique (-10 µm) */}
                        <circle cx="0" cy="0" r="74" fill="none" stroke="#f43f5e" strokeWidth="8" strokeDasharray="4 2" />
                        {/* Rubis synthétique chassé Ø 1.210 mm p6 */}
                        <circle cx="0" cy="0" r="70" fill="#be123c" stroke="#fecdd3" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="22" fill="#060a12" stroke="#fda4af" strokeWidth="1.5" />

                        <text x="0" y="-36" fill="#fff1f2" fontSize="9.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          RUBIS CHASSÉ Ø 1.210
                        </text>
                        <text x="0" y="128" fill="#fb7185" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Serrage = -10 µm (Chassage à la potence Seitz/Horia)
                        </text>
                      </g>
                    )}
                  </g>

                  {/* ========================================================= */}
                  {/* DROITE : DIAGRAMME NORMALISÉ DES INTERVALLES ISO 286      */}
                  {/* ========================================================= */}
                  <g transform="translate(415, 65)">
                    <text x="135" y="-20" fill="#e2e8f0" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      DIAGRAMME DES ZONES DE TOLÉRANCE ISO 286
                    </text>

                    <rect x="0" y="0" width="275" height="220" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

                    {/* Ligne Zéro (Cote Nominale) */}
                    <line x1="20" y1="115" x2="255" y2="115" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 3" />
                    <text x="25" y="108" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      Ligne Zéro (Cote Nominale)
                    </text>

                    {/* Zone Alésage H7 (toujours posée sur la ligne zéro : +0 / +IT7) */}
                    <rect x="45" y="65" width="75" height="50" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="2" />
                    <text x="82" y="94" fill="#bae6fd" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      H7
                    </text>
                    <text x="82" y="55" fill="#38bdf8" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                      Alésage (+10 µm / 0)
                    </text>

                    {/* Zone Arbre selon fitMode (g6 en dessous, k6 à cheval, p6 au-dessus) */}
                    {fitMode === "glissant" && (
                      <g>
                        <rect
                          x="155"
                          y="138"
                          width="75"
                          height="38"
                          fill="rgba(16, 185, 129, 0.3)"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                        <text x="192" y="162" fill="#a7f3d0" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          g6
                        </text>
                        <text x="192" y="192" fill="#34d399" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                          Arbre (-4 / -12 µm)
                        </text>
                      </g>
                    )}

                    {fitMode === "incertain" && (
                      <g>
                        <rect
                          x="155"
                          y="92"
                          width="75"
                          height="36"
                          fill="rgba(245, 158, 11, 0.3)"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        />
                        <text x="192" y="114" fill="#fde68a" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          k6
                        </text>
                        <text x="192" y="145" fill="#fbbf24" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                          Arbre (+7 / +1 µm)
                        </text>
                      </g>
                    )}

                    {fitMode === "serre" && (
                      <g>
                        <rect
                          x="155"
                          y="28"
                          width="75"
                          height="36"
                          fill="rgba(244, 63, 94, 0.3)"
                          stroke="#f43f5e"
                          strokeWidth="2"
                        />
                        <text x="192" y="50" fill="#fecdd3" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          p6
                        </text>
                        <text x="192" y="20" fill="#fb7185" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                          Arbre (+18 / +10 µm)
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </div>

            {/* FICHE D'ANALYSE MÉTROLOGIQUE DE L'AJUSTEMENT ACTIF */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    fitMode === "glissant"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                      : fitMode === "incertain"
                      ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                      : "bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {fitMode === "glissant"
                    ? "Ajustement Avec Jeu Garanti (H7/g6)"
                    : fitMode === "incertain"
                    ? "Ajustement Incertain de Centrage (H7/k6)"
                    : "Ajustement Avec Serrage Garanti (H7/p6)"}
                </span>

                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white">
                  {fitMode === "glissant"
                    ? "Pivot de Mobile dans Pierre Percée Rubis"
                    : fitMode === "incertain"
                    ? "Pied de Pont / Goupille dans Platine"
                    : "Chassage d’un Rubis ou Chaussée sur Axe"}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {fitMode === "glissant"
                    ? "La lettre majuscule H7 indique un alésage normal (écart inférieur nul). La lettre minuscule g6 place toute la zone de tolérance de l’arbre sous la ligne zéro : il subsiste toujours un jeu fonctionnel de 6 à 12 µm pour la libre rotation et le film d’huile Moebius 9010."
                    : fitMode === "incertain"
                    ? "La zone de tolérance k6 de la goupille chevauche la zone H7 de l’alésage : le jeu ou le serrage reste inférieur à 2 µm, garantissant la reproductibilité parfaite des entraxes d’engrènement à chaque démontage."
                    : "La zone p6 (ou r6) est intégralement située au-dessus de la borne supérieure de H7 : le diamètre extérieur du rubis est plus grand que le trou de la platine de ~10 µm. L’assemblage exige une potence micrométrique Seitz ou Horia."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALCULATEUR DYNAMIQUE D'AJUSTEMENTS ISO 286 / NIHS */}
        <section className="mb-14">
          <NihsToleranceCalculator />
        </section>

        {/* NAVIGATION PRO PAR ONGLETS FLUIDES */}
        <div className="sticky top-20 z-30 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => scrollToSection("sec-tolerances")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-tolerances"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Inspecteur ISO 1101</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-normes")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-normes"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Fondements GPS</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-indicateurs")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-indicateurs"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Cotation ISO 129-1</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-applications")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-applications"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Atelier & Précision</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-memo")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-memo"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Mémo & Pièges</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-quiz")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-quiz"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Grand Quiz (15 Q)</span>
            </button>

            <button
              onClick={() => scrollToSection("sec-faq")}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                activeTab === "sec-faq"
                  ? "bg-amber-500 text-white dark:bg-amber-400 dark:text-slate-950 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ & Normes</span>
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECTION 1 : INSPECTEUR INTERACTIF (ISO 1101) */}
        {/* ========================================== */}
        <section id="sec-tolerances" className="mb-16 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 mb-2">
                Norme ISO 1101:2017
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Inspecteur des 12 Tolérances Géométriques
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                Sélectionnez un filtre ou cliquez sur un symbole pour inspecter sa zone de tolérance et son application horlogère.
              </p>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1.5 bg-slate-200/80 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800">
              {(["all", "Forme", "Orientation", "Position", "Battement"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategoryFilter(cat);
                    const firstMatch =
                      cat === "all" ? TOLERANCES[0] : TOLERANCES.find((t) => t.category === cat);
                    if (firstMatch) setSelectedTolId(firstMatch.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    categoryFilter === cat
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat === "all"
                    ? "Toutes (12)"
                    : cat === "Forme"
                    ? "Forme (4)"
                    : cat === "Orientation"
                    ? "Orientation (3)"
                    : cat === "Position"
                    ? "Position (3)"
                    : "Battement (2)"}
                </button>
              ))}
            </div>
          </div>

          {/* Grille Master / Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Colonne gauche : 12 Badges de Tolérance (7 colonnes) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredTolerances.map((item) => {
                const isSelected = item.id === selectedTolId;
                let categoryBadgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
                if (item.category === "Orientation")
                  categoryBadgeClass = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
                if (item.category === "Position")
                  categoryBadgeClass = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300";
                if (item.category === "Battement")
                  categoryBadgeClass = "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";

                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTolId(item.id)}
                    className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 shadow-md ring-2 ring-amber-500/30 dark:bg-slate-800 dark:border-amber-400"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2 w-full">
                      <span
                        className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold font-mono ${
                          isSelected
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {item.symbol}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${categoryBadgeClass}`}>
                        {item.category}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.example}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Colonne droite : Fiche Technique Détaillée Dynamique (5 colonnes) */}
            <div className="lg:col-span-5 sticky top-36">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-amber-500/30 dark:border-amber-500/30 p-6 sm:p-7 shadow-xl relative overflow-hidden transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      activeTolerance.category === "Forme"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                        : activeTolerance.category === "Orientation"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : activeTolerance.category === "Position"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                    }`}
                  >
                    {activeTolerance.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">ISO 1101:2017</span>
                </div>

                {/* Symbole & Nom */}
                <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-200 dark:border-slate-800">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-slate-800 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-4xl font-bold font-mono text-amber-700 dark:text-amber-400 shadow-inner">
                    {activeTolerance.symbol}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-serif">
                      {activeTolerance.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                      Tolérance géométrique normalisée
                    </p>
                  </div>
                </div>

                {/* Champs de spécification */}
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Définition technique
                    </h4>
                    <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                      {activeTolerance.description}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Zone de tolérance
                    </h4>
                    <p className="text-slate-800 dark:text-slate-200 font-mono text-xs">
                      {activeTolerance.zoneType}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Référence spécifiée
                      </h4>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {activeTolerance.reference}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Règle de contrôle
                      </h4>
                      <span
                        className={`text-xs font-bold ${
                          activeTolerance.category === "Forme"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {activeTolerance.category === "Forme"
                          ? "Auto-contrôle"
                          : "Référence requise"}
                      </span>
                    </div>
                  </div>

                  {/* Application Horlogère */}
                  <div className="p-4 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 dark:border-amber-500/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Gauge className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                        Application Horlogère Pratique
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      {activeTolerance.example}
                    </p>
                  </div>
                </div>

                {/* Cadre de Tolérance Normalisé Preview */}
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Écriture normalisée :</span>
                  <div className="inline-flex border-2 border-slate-900 dark:border-amber-400 font-mono text-xs font-bold divide-x-2 divide-slate-900 dark:divide-amber-400 bg-white dark:bg-slate-950">
                    <span className="px-2 py-0.5 text-slate-900 dark:text-white">{activeTolerance.symbol}</span>
                    {activeTolerance.category === "Forme" ? (
                      <span className="px-2 py-0.5 text-slate-900 dark:text-amber-400">0.002</span>
                    ) : activeTolerance.category === "Orientation" || activeTolerance.category === "Battement" ? (
                      <>
                        <span className="px-2 py-0.5 text-slate-900 dark:text-amber-400">0.010</span>
                        <span className="px-2 py-0.5 text-slate-900 dark:text-white">A</span>
                      </>
                    ) : (
                      <>
                        <span className="px-2 py-0.5 text-slate-900 dark:text-amber-400">Ø 0.015</span>
                        <span className="px-2 py-0.5 text-slate-900 dark:text-white">A</span>
                        <span className="px-2 py-0.5 text-slate-900 dark:text-white">B</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 2 : FONDEMENTS GPS & LES 4 GROUPES */}
        {/* ========================================== */}
        <section id="sec-normes" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 mb-2">
              Architecture Normative ISO GPS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Les 4 Groupes de Tolérances Géométriques
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Le système ISO GPS structure rigoureusement les tolérances selon leur degré de dépendance vis-à-vis des références.
            </p>
          </div>

          {/* 2 Cartes Comparatives ISO 129-1 vs ISO 1101 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  ISO 129-1:2018
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Cotation Dimensionnelle</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Établit les principes généraux pour la représentation des dimensions et tolérances de taille sur les dessins techniques : lignes de dimension, flèches, lignes d&apos;attache, indicateurs de propriétés (Ø, R, SR, □) et cotations théoriques ou auxiliaires.
              </p>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>Règle fondamentale : La taille contrôle uniquement les distances locales à deux points opposés.</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                  ISO 1101:2017
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tolérancement Géométrique (GPS)</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Définit les tolérances géométriques de forme, orientation, position et battement. Permet de spécifier sans aucune ambiguïté les exigences fonctionnelles réelles d&apos;assemblage et de cinématique au-delà des simples dimensions.
              </p>
              <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Principe fondamental : L&apos;indépendance stricte entre dimension de taille et géométrie.</span>
              </div>
            </div>
          </div>

          {/* Tableau Comparatif des 4 Groupes */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    <th className="py-4 px-5">Groupe GPS</th>
                    <th className="py-4 px-5">Tolérances incluses</th>
                    <th className="py-4 px-5">Objectif fonctionnel</th>
                    <th className="py-4 px-5">Référence spécifiée (A, B, C)</th>
                    <th className="py-4 px-5">Exemple Atelier Suisse</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-sm">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-blue-600 dark:text-blue-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span>Forme</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-800 dark:text-slate-200">
                      Rectitude, Planéité, Circularité, Cylindricité
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                      Contrôler la forme intrinsèque d&apos;un élément seul
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40">
                        Non jamais
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 dark:text-slate-300">
                      Face d&apos;appui platine (Planéité 0.005 mm)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-emerald-600 dark:text-emerald-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span>Orientation</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-800 dark:text-slate-200">
                      Parallélisme, Perpendicularité, Inclinaison
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                      Contrôler l&apos;angle par rapport à un repère
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40">
                        Oui obligatoire
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 dark:text-slate-300">
                      Trou de pont / Face d&apos;appui (Perpendicularité ⊥ 0.02 / A)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-amber-600 dark:text-amber-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        <span>Position</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-800 dark:text-slate-200">
                      Localisation, Coaxialité, Symétrie
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                      Contrôler la position spatiale exacte (TED)
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40">
                        Oui obligatoire
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 dark:text-slate-300">
                      Pieds de centrage de pont (Localisation ⊕ Ø 0.015 / A|B)
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-5 font-bold text-purple-600 dark:text-purple-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        <span>Battement</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-800 dark:text-slate-200">
                      Battement circulaire, Battement total
                    </td>
                    <td className="py-4 px-5 text-slate-600 dark:text-slate-300">
                      Contrôler le voile et faux-rond en rotation
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40">
                        Oui obligatoire
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-700 dark:text-slate-300">
                      Serge de roue d&apos;échappement (Battement circulaire ↗ 0.004 / A)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 3 : INDICATEURS ISO 129-1 */}
        {/* ========================================== */}
        <section id="sec-indicateurs" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-2">
              Norme ISO 129-1:2018
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Indicateurs de Propriétés & Cotation
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Les symboles normalisés qui qualifient la géométrie des cotes sur un dessin technique d&apos;horlogerie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDICATORS.map((ind, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-slate-800 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">
                      {ind.symbol}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {ind.standard}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                    {ind.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {ind.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Exemple :</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{ind.exemple}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Horlogerie :</span>{" "}
                    {ind.usageHorloger}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 4 : APPLICATIONS HORLOGÈRES */}
        {/* ========================================== */}
        <section id="sec-applications" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-2">
              Excellence & Ateliers Suisses
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Applications Réelles en Haute Horlogerie
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Pourquoi chaque micron compte : cas réels d&apos;usinage et de contrôle métrologique dans un mouvement mécanique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {APPLICATIONS.map((app, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/40">
                      {app.isoType}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {app.composant}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {app.fonction}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 mb-3">
                    <span className="text-[11px] uppercase font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      Tolérance requise
                    </span>
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {app.tolerance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                    <strong className="text-slate-800 dark:text-slate-200">Justification :</strong>{" "}
                    {app.justification}
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                  ✦ Impact : {app.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 5 : MÉMO TECHNIQUE (ERREURS & BONNES PRATIQUES) */}
        {/* ========================================== */}
        <section id="sec-memo" className="mb-16 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 mb-2">
              Vigilance Atelier CFC / AFP
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Mémo Technique : Pièges & Bonnes Pratiques
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Les erreurs récurrentes à bannir en bureau technique et les réflexes des meilleurs horlogers-constructeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 6 Erreurs Fréquentes (Rouge) */}
            <div className="bg-rose-50/70 dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-rose-200 dark:border-rose-900/40">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  <X className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-900 dark:text-rose-300">
                    6 Erreurs Fréquentes à Éviter
                  </h3>
                  <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                    Sources de litiges d&apos;atelier et de surcoûts
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {ERREURS_MEMO.map((err) => (
                  <div
                    key={err.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-rose-200 dark:border-rose-900/30 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {err.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-0.5">
                        {err.titre}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {err.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Bonnes Pratiques (Émeraude) */}
            <div className="bg-emerald-50/70 dark:bg-slate-900 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-emerald-200 dark:border-emerald-900/40">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-md">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-300">
                    6 Bonnes Pratiques Recommandées
                  </h3>
                  <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                    Garantie de qualité et d&apos;assemblage parfait
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {BONNES_PRATIQUES_MEMO.map((bon) => (
                  <div
                    key={bon.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-emerald-200 dark:border-emerald-900/30 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {bon.id}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mb-0.5">
                        {bon.titre}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {bon.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 6 : GRAND QUIZ CFC / AFP (15 QUESTIONS) */}
        {/* ========================================== */}
        <section id="sec-quiz" className="mb-16 scroll-mt-28">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-500/20 mb-2">
                Évaluation Officielle
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Grand Quiz Horloger : Cotes & Tolérances
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                15 questions complètes pour tester et certifier vos connaissances normatives ISO 129-1 & ISO 1101.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {!quizFinished ? (
                <>
                  {/* Progress Bar & Header */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
                      <span>
                        Question {currentQuestionIdx + 1} sur {QUIZ_QUESTIONS.length}
                      </span>
                      <span className="text-amber-600 dark:text-amber-400">
                        Score : {quizScore} / {QUIZ_QUESTIONS.length}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-500 to-amber-400 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
                    {QUIZ_QUESTIONS[currentQuestionIdx].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected = selectedAnswer === optIdx;
                      const isCorrect = optIdx === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswer;

                      let btnStyle =
                        "bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-slate-800 dark:hover:border-amber-500/40";

                      if (showExplanation) {
                        if (isCorrect) {
                          btnStyle =
                            "border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold";
                        } else if (isSelected) {
                          btnStyle =
                            "border-2 border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-medium";
                        } else {
                          btnStyle =
                            "border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showExplanation}
                          onClick={() => handleAnswerSelect(optIdx)}
                          className={`w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm font-medium flex items-center justify-between group ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold font-mono text-slate-600 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                              {["A", "B", "C", "D"][optIdx]}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {showExplanation && (
                            <span>
                              {isCorrect ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : isSelected ? (
                                <XCircle className="w-5 h-5 text-rose-500" />
                              ) : null}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explication après réponse */}
                  {showExplanation && (
                    <div
                      className={`p-4 rounded-xl border text-sm font-medium mb-6 transition-all duration-300 ${
                        selectedAnswer === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswer
                          ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/80 dark:bg-emerald-950/40"
                          : "border-rose-300 dark:border-rose-800 bg-rose-50/80 dark:bg-rose-950/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1.5 font-bold">
                        {selectedAnswer === QUIZ_QUESTIONS[currentQuestionIdx].correctAnswer ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-800 dark:text-emerald-300">Excellente réponse !</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                            <span className="text-rose-800 dark:text-rose-300">Réponse incorrecte</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {QUIZ_QUESTIONS[currentQuestionIdx].explanation}
                      </p>
                    </div>
                  )}

                  {/* Bouton Suivant */}
                  {showExplanation && (
                    <div className="flex items-center justify-end">
                      <button
                        onClick={handleNextQuestion}
                        className="px-6 py-2.5 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 transition-all shadow-md"
                      >
                        {currentQuestionIdx === QUIZ_QUESTIONS.length - 1
                          ? "Voir le résultat final 🏆"
                          : "Question suivante →"}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* Écran de Résultats Finaux */
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">
                    {quizScore === 15 ? "🎉" : quizScore >= 12 ? "👏" : quizScore >= 8 ? "💪" : "📚"}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Quiz Terminé !
                  </h3>
                  <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-2">
                    Votre résultat : {quizScore} / {QUIZ_QUESTIONS.length}
                  </p>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8 font-medium">
                    {quizScore === 15
                      ? "Parfait ! Tu maîtrises les cotes et tolérances ISO à la perfection ! Niveau CFC Horloger atteint."
                      : quizScore >= 12
                      ? "Excellent travail ! Quelques révisions de détail et ce sera absolument irréprochable."
                      : quizScore >= 8
                      ? "Bon résultat ! Poursuis ton entraînement pour consolider les tolérances géométriques."
                      : "Révise les notions clés ci-dessus et retente le quiz pour progresser !"}
                  </p>

                  <button
                    onClick={handleRestartQuiz}
                    className="px-8 py-3 rounded-xl font-bold text-sm bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300 transition-all shadow-lg inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Recommencer le quiz</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================== */}
        {/* SECTION 7 : QUESTIONS FRÉQUENTES (FAQ) & NORMES */}
        {/* ========================================== */}
        <section id="sec-faq" className="mb-16 scroll-mt-28">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-500/10 text-slate-700 dark:text-slate-300 border border-slate-500/20 mb-2">
                Clarifications Normatives
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Questions Fréquentes (FAQ)
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
                Les réponses aux questions d&apos;atelier les plus pointues sur les tolérances horlogères.
              </p>
            </div>

            <div className="space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Références Officielles */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-blue-500/10 border border-slate-200 dark:border-slate-800 text-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                📘 Vous souhaitez approfondir les textes officiels ?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-4">
                Consultez les recueils de normes éditées par l&apos;Organisation Internationale de Normalisation (ISO) et la Convention Patronale de l&apos;industrie horlogère suisse (CP).
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                  Norme ISO 129-1:2018 (Cotation)
                </span>
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                  Norme ISO 1101:2017 (GPS)
                </span>
                <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                  Norme ISO 5459:2011 (Références)
                </span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
