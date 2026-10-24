"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Grid,
  HelpCircle,
  BookOpen,
  Award,
  ListChecks,
  ChevronDown,
  ChevronUp,
  X,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  Info
} from "lucide-react";

// --- DATA TYPES ---
type TabType = "champs" | "cartouche" | "tableaux" | "memo" | "quiz" | "faq" | "normes";
type SubTableType = "formats" | "materiaux" | "traitements";

interface ChampItem {
  id: string;
  name: string;
  category: "Identification" | "Descriptif" | "Technique" | "Représentation" | "Document" | "Gestion" | "Administratif";
  obligation: "Obligatoire" | "Conditionnel";
  description: string;
  example: string;
  characters: string;
  rule: string;
}

// 14 Champs ISO 7200
const CHAMPS_DATA: ChampItem[] = [
  {
    id: "entreprise",
    name: "Nom de l'entreprise",
    category: "Identification",
    obligation: "Obligatoire",
    description: "Raison sociale officielle de la manufacture ou logo vectorisé.",
    example: "Manufacture Horlogère SA",
    characters: "30 caractères",
    rule: "Ne jamais abréger arbitrairement la dénomination pour garantir la valeur légale du plan."
  },
  {
    id: "titre",
    name: "Titre du document",
    category: "Descriptif",
    obligation: "Obligatoire",
    description: "Désignation claire et fonctionnelle de la pièce ou du composant.",
    example: "Platine calibre 2824-2",
    characters: "25-30 caractères",
    rule: "Utiliser la nomenclature officielle du calibre sans adjectifs superflus."
  },
  {
    id: "numero-piece",
    name: "Numéro de pièce",
    category: "Identification",
    obligation: "Obligatoire",
    description: "Référence unique d'identification du composant.",
    example: "P-2824-001-A",
    characters: "15-20 caractères",
    rule: "Identifiant clé pour la traçabilité FAO, le stock et la nomenclature de montage."
  },
  {
    id: "materiau",
    name: "Matériau",
    category: "Technique",
    obligation: "Obligatoire",
    description: "Désignation normalisée de la matière première.",
    example: "Maillechort CuNi18Zn20",
    characters: "20 caractères",
    rule: "Toujours utiliser la nuance métallurgique précise selon la norme EN / ISO / NIHS."
  },
  {
    id: "traitement",
    name: "Traitement de surface",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Traitements galvaniques, thermiques ou finitions horlogères.",
    example: "Rhodiage 2µm",
    characters: "30 caractères",
    rule: "Indiquer l'épaisseur minimale et la nature du dépôt électrolytique."
  },
  {
    id: "masse",
    name: "Masse",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Poids réel du composant fini après usinage.",
    example: "0.45 g",
    characters: "10 caractères",
    rule: "Critique pour le balancier, la masse oscillante et les calculs d'inertie dynamique."
  },
  {
    id: "echelle",
    name: "Échelle",
    category: "Représentation",
    obligation: "Obligatoire",
    description: "Rapport entre les dimensions du dessin et la réalité.",
    example: "2:1",
    characters: "10 caractères",
    rule: "En horlogerie, l'échelle est très fréquemment agrandie (2:1, 5:1 ou 10:1) pour la lisibilité."
  },
  {
    id: "tolerance-generale",
    name: "Tolérance générale",
    category: "Technique",
    obligation: "Conditionnel",
    description: "Tolérances appliquées aux cotes sans tolérance individuelle.",
    example: "ISO 2768-m",
    characters: "20 caractères",
    rule: "Définit les limites d'usinage pour toutes les cotes libres (ISO 2768-m ou f)."
  },
  {
    id: "projection",
    name: "Méthode de projection",
    category: "Représentation",
    obligation: "Obligatoire",
    description: "Symbole normalisé indiquant la disposition des vues (E ou A).",
    example: "Symbole E (Européen)",
    characters: "Symbole ISO",
    rule: "En Suisse et en Europe, la méthode E (premier dièdre) est la règle absolue."
  },
  {
    id: "format",
    name: "Format du plan",
    category: "Document",
    obligation: "Obligatoire",
    description: "Format normalisé de la feuille de dessin technique.",
    example: "A4",
    characters: "4 caractères",
    rule: "Doit concorder strictement avec les dimensions et marges ISO 5457."
  },
  {
    id: "indice",
    name: "Indice de révision",
    category: "Gestion",
    obligation: "Obligatoire",
    description: "Lettre de version reflétant le statut et l'historique du plan.",
    example: "A / B / C",
    characters: "4 caractères",
    rule: "Toute modification d'une cote ou d'un texte exige l'incrémentation de l'indice."
  },
  {
    id: "dessinateur",
    name: "Dessinateur",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Nom ou visa de l'auteur du document technique.",
    example: "J. Dupont",
    characters: "20 caractères",
    rule: "Engage la responsabilité technique directe de la mise en plan DAO."
  },
  {
    id: "verificateur",
    name: "Vérificateur",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Nom ou visa du responsable de conformité / chef de projet.",
    example: "M. Martin",
    characters: "20 caractères",
    rule: "Contrôle la fabricabilité, la cohérence des cotations et la conformité aux normes."
  },
  {
    id: "date",
    name: "Date de validation",
    category: "Administratif",
    obligation: "Obligatoire",
    description: "Date d'approbation ou de dernière modification.",
    example: "17.10.2025",
    characters: "10 caractères",
    rule: "Format normalisé JJ.MM.AAAA pour prévenir toute ambiguïté temporelle."
  }
];

// 6 ERREURS ET LEURS SOLUTIONS D'ATELIER
const ERREURS_DATA = [
  {
    erreur: "Oublier de remplir tous les champs obligatoires du cartouche",
    solution: "Utilisez une checklist ISO 7200 et vérifiez chaque champ obligatoire avant la validation finale du dessin."
  },
  {
    erreur: "Ne pas mettre à jour l'indice de révision lors des modifications",
    solution: "Mettre en place un système de versionning rigoureux et ne jamais modifier un plan sans incrémenter l'indice."
  },
  {
    erreur: "Utiliser des abréviations non normalisées pour les matériaux",
    solution: "Toujours utiliser les désignations normalisées selon les normes horlogères (ex: CuNi18Zn20 pour le maillechort)."
  },
  {
    erreur: "Positionner le cartouche au mauvais endroit sur le plan",
    solution: "Respecter rigoureusement la position en bas à droite selon ISO 5457, adossé aux marges normalisées."
  },
  {
    erreur: "Oublier d'indiquer la méthode de projection (E ou A)",
    solution: "Indiquer systématiquement le cône tronqué méthode E (projection européenne) en Suisse et dans l'arc jurassien."
  },
  {
    erreur: "Ne pas spécifier les tolérances générales du dessin",
    solution: "Toujours spécifier les tolérances générales (ISO 2768-m ou f) même si certaines cotes ont des tolérances individuelles."
  }
];

// 6 BONNES PRATIQUES D'ATELIER
const BONNES_PRATIQUES = [
  "Remplir systématiquement tous les champs obligatoires (11 champs ISO)",
  "Utiliser des désignations métallurgiques normalisées et abréviations ISO",
  "Mettre à jour l'indice de révision à chaque modification de cote",
  "Positionner le cartouche dans l'angle inférieur droit selon ISO 5457",
  "Indiquer clairement la méthode de projection (E pour l'Europe)",
  "Spécifier les tolérances générales appropriées (ISO 2768-m ou f)"
];

// FORMATS ISO 5457
const FORMATS_DATA = [
  { format: "A4", dimensions: "210 × 297 mm", marge: "10 mm", usage: "Pièces unitaires, axes, pivots, composants simples, vis" },
  { format: "A3", dimensions: "297 × 420 mm", marge: "10 mm", usage: "Platines complètes, ponts de rouage, pont de balancier" },
  { format: "A2", dimensions: "420 × 594 mm", marge: "10 mm", usage: "Mouvements complets, éclatés complexes, sous-ensembles" },
  { format: "A1", dimensions: "594 × 841 mm", marge: "20 mm", usage: "Plans d'ensemble de calibre, documentation technique générale" },
  { format: "A0", dimensions: "841 × 1189 mm", marge: "20 mm", usage: "Documentation spécialisée d'assemblage en manufacture, archives" }
];

// MATÉRIAUX HORLOGERS STANDARDS
const MATERIAUX_DATA = [
  { nom: "Maillechort", designation: "CuNi18Zn20", composition: "Cu-Ni-Zn", usage: "Roues, pignons, ponts - Excellent pour l'usinage de précision sans contrainte résiduelle" },
  { nom: "Laiton", designation: "CuZn40", composition: "Cu-Zn", usage: "Composants secondaires, platines courantes, bagues décoratives" },
  { nom: "Acier inoxydable", designation: "X5CrNi18-10", composition: "Fe-Cr-Ni", usage: "Axes, pivots, vis, ressorts - Haute résistance à la corrosion et à l'usure mécanique" },
  { nom: "Glucydur", designation: "Be-Cu", composition: "Cu-Be", usage: "Balanciers, pièces à ressort thermiquement stables - Très faible coefficient de dilatation" },
  { nom: "Titane Grade 5", designation: "Ti-6Al-4V", composition: "Ti-Al-V", usage: "Composants ultra-légers, cages de tourbillon, pièces de montres de sport" },
  { nom: "Or 18K", designation: "Au750", composition: "Au-Ag-Cu", usage: "Complications haut de gamme, masses oscillantes, chatons sertis" }
];

// TRAITEMENTS ET FINITIONS DE SURFACE
const TRAITEMENTS_DATA = [
  { traitement: "Rhodiage", description: "Dépôt électrolytique de rhodium brillant (0.5 à 2 µm)", objectif: "Protection anti-oxydation et éclat blanc argenté inaltérable", application: "Toutes pièces externes du calibre, ponts, platines" },
  { traitement: "Anglage", description: "Biseautage manuel ou mécanique des arêtes vives à 45° poli", objectif: "Signature Haute Horlogerie et élimination totale des micro-bavures", application: "Ponts, coqs, bras de rouage, leviers" },
  { traitement: "Côtes de Genève", description: "Rayures régulières ondulées ou droites à la meule abrasive", objectif: "Décoration premium et piégeage des micro-poussières résiduelles", application: "Ponts supérieurs, masses oscillantes" },
  { traitement: "Trempe & Revenu", description: "Traitement thermique de durcissement suivi d'un adoucissement", objectif: "Augmentation drastique de la dureté et résistance au matage", application: "Axes, pignons, tigerons, tirettes, sautoirs" },
  { traitement: "Polissage miroir", description: "Finition ultra-lisse sans aucune micro-rayure (poli noir)", objectif: "Minimisation des frottements et réflexion optique pure", application: "Têtes de vis, chatons, coqs de tourbillon" },
  { traitement: "Passivation", description: "Traitement chimique dissolvant le fer libre en surface", objectif: "Génération d'un film d'oxyde de chrome étanche et passif", application: "Pièces en acier inoxydable exposées aux huiles et ambiances humides" }
];

// QUESTIONS QUIZ CFC/AFP
const QUIZ_DATA = [
  {
    question: "Quelle norme internationale définit les cartouches d'inscription en dessin technique ?",
    options: ["ISO 5457", "ISO 7200", "ISO 9001", "ISO 2768"],
    correct: 1,
    explanation: "La norme ISO 7200:2004 spécifie les champs de données et l'organisation fonctionnelle des cartouches."
  },
  {
    question: "Quel est le rôle fondamental du balancier-spiral dans une montre mécanique ?",
    options: ["Réguler la fréquence du mouvement", "Afficher l'heure sur le cadran", "Fournir l'énergie mécanique motrice", "Lubrifier le rouage de finissage"],
    correct: 0,
    explanation: "Le balancier-spiral constitue l'organe régulateur chronométrique oscillant à fréquence déterminée."
  },
  {
    question: "Que représente l'échelle 1:1 sur un plan horloger ?",
    options: ["La taille réelle exacte du composant", "Une réduction de moitié (0.5x)", "Un agrandissement au double (2x)", "Une projection en coupe axiale"],
    correct: 0,
    explanation: "1:1 est la vraie grandeur. En micromécanique horlogère, on utilise couramment 2:1, 5:1 ou 10:1."
  },
  {
    question: "Quel document officiel définit les dimensions des formats et les marges du cadre ?",
    options: ["ISO 7200", "ISO 5457", "ISO 216", "ISO 1302"],
    correct: 1,
    explanation: "ISO 5457 encadre les formats de plans (A4 à A0), les marges de 10 ou 20 mm et la position du cartouche en bas à droite."
  }
];

// FAQ ATELIER
const FAQ_DATA = [
  {
    id: "obligatoire-conditionnel",
    question: "Quelle est la différence entre un champ obligatoire (O) et conditionnel (C) ?",
    answer: "Un champ obligatoire (O) doit impérativement figurer et être renseigné sur tout document technique selon ISO 7200 (titre, référence, auteur, date, format, échelle). Un champ conditionnel (C) n'est requis que si l'information apporte une valeur technique réelle (masse, traitement de surface, tolérance générale). En haute horlogerie, la masse et les traitements sont considérés comme indispensables de facto."
  },
  {
    id: "revisions",
    question: "Comment gérer les révisions d'un plan technique horloger ?",
    answer: "Chaque modification technique (cote, matière, tolérance) doit être enregistrée dans la table des modifications au-dessus du cartouche : Indice (A, B, C...), Date, Auteur, Nature concise du changement, Visa du vérificateur. L'indice dans le cartouche principal doit être incrémenté. En atelier d'usinage, seul le plan portant le dernier indice validé est légalement applicable."
  },
  {
    id: "echelle-horlogerie",
    question: "Pourquoi l'échelle est-elle presque toujours supérieure à 1:1 en horlogerie ?",
    answer: "Les composants horlogers sont miniatures (pivots de 0.08 mm, rubis de 0.20 mm). Une échelle 2:1, 5:1 ou même 10:1 agrandit le dessin pour rendre la cotation et les symboles d'états de surface lisibles sans loupe par le régleur ou l'opérateur CNC. L'échelle réelle doit obligatoirement figurer dans le cartouche."
  },
  {
    id: "tolerances",
    question: "Quelles tolérances générales spécifier dans le cartouche horloger ?",
    answer: "En horlogerie, on utilise généralement ISO 2768-m (moyenne) ou ISO 2768-f (fine) pour les usinages courants. Ces normes fixent les limites de variation admissibles pour toutes les cotes sans tolérance individuelle inscrite sur le tracé. Pour les composants sensibles de mouvements haut de gamme, ISO 2768-f est la norme de référence."
  },
  {
    id: "personnalisation",
    question: "Une manufacture horlogère peut-elle personnaliser son cartouche ?",
    answer: "Oui, les manufactures horlogères adaptent fréquemment leur cartouche à leurs spécificités (logo d'entreprise, numéro de calibre, identification de client, visa qualité), tant que les exigences minimales et les 11 champs obligatoires de la norme ISO 7200 sont rigoureusement respectés et que le cartouche demeure logé dans l'angle inférieur droit du dessin."
  }
];

// NORMES OFFICIELLES ISO
const NORMES_DATA: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  sections: { id: string; title: string; content: string }[];
}> = {
  "7200": {
    title: "ISO 7200:2004",
    subtitle: "Cartouches d'inscription",
    description: "Spécification des champs de données pour les cartouches et têtes de documents techniques",
    sections: [
      {
        id: "presentation",
        title: "Présentation générale",
        content: "La norme internationale ISO 7200:2004 définit les éléments d'information qui doivent figurer dans les cartouches d'inscription et têtes de documents techniques. Elle garantit l'interopérabilité et la compréhension univoque des plans horlogers à l'échelle mondiale."
      },
      {
        id: "champs",
        title: "Structure des champs et dimensions",
        content: "Le cartouche est compartimenté en zones fonctionnelles normalisées :\n- Zone d'identification (obligatoire, largeur maximale de 170 mm)\n- Champ titre (25-30 caractères recommandés)\n- Zone administrative (dessinateur, vérificateur, date, indice)\n- Champs techniques (matériau, traitement, masse, tolérances, échelle)"
      },
      {
        id: "applications",
        title: "Applications pratiques en Haute Horlogerie",
        content: "En horlogerie suisse, la rigueur ISO 7200 est cruciale : platines, coqs, roues, axes et pignons nécessitent une nomenclature normalisée des métaux (CuNi18Zn20, CuZn40, 20AP, Au750) et la traçabilité intégrale des révisions de cotation."
      },
      {
        id: "bonnes-pratiques",
        title: "Règles d'or d'atelier et DAO",
        content: "Uniformiser la hauteur des rangées de texte (8 à 10 mm). Renseigner systématiquement les 11 champs obligatoires. Éviter toute redondance avec les notes de dessin. Tenir un registre de révision rigoureux."
      }
    ]
  },
  "5457": {
    title: "ISO 5457:1999",
    subtitle: "Formats de dessin & éléments graphiques",
    description: "Spécification des formats, marges et disposition des éléments d'annotation",
    sections: [
      {
        id: "presentation",
        title: "Formats standards et marges",
        content: "ISO 5457 régit les formats de plans de la série A : A4 (210×297mm) et A3 (297×420mm) pour les composants horlogers, avec marges de 10 mm (ou 20 mm pour A1/A0) et repères de cadrage."
      },
      {
        id: "cartouche",
        title: "Emplacement obligatoire du cartouche",
        content: "Le cartouche d'inscription doit être positionné dans le coin inférieur droit de la surface utile de dessin, orienté de manière à être immédiatement visible lors du pliage normalisé de la feuille."
      },
      {
        id: "projection",
        title: "Méthode de projection et orientation",
        content: "Spécification de l'orientation du plan, des repères de coupe, des coordonnées de grille alphanuémriques (A-B-C-D / 1-2-3-4) et du symbole de projection du premier dièdre (Méthode E européenne)."
      }
    ]
  }
};

export default function CartoucheHorlogerPage() {
  const [activeTab, setActiveTab] = useState<TabType>("champs");
  const [activeSubTable, setActiveSubTable] = useState<SubTableType>("formats");
  const [selectedCellId, setSelectedCellId] = useState<string>("entreprise");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [checklistMode, setChecklistMode] = useState<boolean>(false);
  const [checkedPracticeIndices, setCheckedPracticeIndices] = useState<Set<number>>(new Set());
  const [activeErrorModalIndex, setActiveErrorModalIndex] = useState<number | null>(null);
  
  // Quiz states
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // FAQ states
  const [expandedFaqIds, setExpandedFaqIds] = useState<Set<string>>(new Set());

  // Normes states
  const [currentNorme, setCurrentNorme] = useState<"7200" | "5457">("7200");
  const [expandedNormeSections, setExpandedNormeSections] = useState<Set<string>>(new Set(["presentation"]));

  // Filtered champs
  const filteredChamps = useMemo(() => {
    return CHAMPS_DATA.filter((champ) => {
      const matchCategory = selectedCategory === "Tous" || champ.category === selectedCategory;
      const matchSearch =
        champ.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champ.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champ.example.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champ.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Selected cell data
  const currentCellData = useMemo(() => {
    return CHAMPS_DATA.find((c) => c.id === selectedCellId) || CHAMPS_DATA[0];
  }, [selectedCellId]);

  // Checklist handlers
  const toggleChecklistPractice = (index: number) => {
    setCheckedPracticeIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Quiz handlers
  const handleQuizAnswer = (optionIndex: number) => {
    if (quizFeedback !== null) return;
    const currentQ = QUIZ_DATA[quizIndex];
    const isCorrect = optionIndex === currentQ.correct;

    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      setQuizFeedback({
        isCorrect: true,
        text: `Correct ! ${currentQ.explanation}`
      });
    } else {
      setQuizFeedback({
        isCorrect: false,
        text: `Incorrect. La réponse exacte était : "${currentQ.options[currentQ.correct]}". ${currentQ.explanation}`
      });
    }

    setTimeout(() => {
      setQuizFeedback(null);
      if (quizIndex + 1 < QUIZ_DATA.length) {
        setQuizIndex((prev) => prev + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizFeedback(null);
  };

  // FAQ accordion handler
  const toggleFaq = (id: string) => {
    setExpandedFaqIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Norme section accordion handler
  const toggleNormeSection = (id: string) => {
    setExpandedNormeSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllNormeSections = () => {
    const allIds = NORMES_DATA[currentNorme].sections.map((s) => s.id);
    if (expandedNormeSections.size === allIds.length) {
      setExpandedNormeSections(new Set());
    } else {
      setExpandedNormeSections(new Set(allIds));
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* HEADER / TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/theorie/lecture-de-plan"
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Théorie / Lecture de plan</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ISO 7200 &amp; ISO 5457
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
              Haute Horlogerie
            </span>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-slate-800/60 overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-amber-500/30 via-blue-600/20 to-transparent blur-3xl rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-3">
            <FileText className="w-3.5 h-3.5" />
            Métrologie &amp; Normalisation Horlogère
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Le Cartouche <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">Horloger</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Structure normalisée selon <strong className="text-slate-200">ISO 7200</strong> et <strong className="text-slate-200">ISO 5457</strong> :
            les 14 champs d&apos;inscription, schémas interactifs, tableaux de matériaux et finitions, mémo de contrôle qualité et évaluation formative.
          </p>

          {/* 7 TABS SWITCHER */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-xl">
              {[
                { id: "champs", label: "14 Champs ISO", count: "14", icon: Layers, color: "text-amber-400" },
                { id: "cartouche", label: "Schéma Interactif", icon: Grid, color: "text-sky-400" },
                { id: "tableaux", label: "Tableaux Techniques", icon: FileText, color: "text-emerald-400" },
                { id: "memo", label: "Mémo & Pièges", icon: ListChecks, color: "text-rose-400" },
                { id: "quiz", label: "Quiz Interactif", icon: Award, color: "text-purple-400" },
                { id: "faq", label: "FAQ Atelier", icon: HelpCircle, color: "text-cyan-400" },
                { id: "normes", label: "Normes ISO", icon: BookOpen, color: "text-yellow-400" }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? "bg-gradient-to-r from-amber-500/20 to-blue-600/30 border-amber-500/80 text-amber-200 shadow-lg"
                        : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <span>{tab.label}</span>
                    {tab.count && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ==================================================== */}
        {/* TAB 1: 14 CHAMPS ISO 7200                            */}
        {/* ==================================================== */}
        {activeTab === "champs" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold">
                  14
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">14</div>
                  <div className="text-xs text-slate-400 font-medium">Champs ISO 7200</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-mono font-bold">
                  11
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">11</div>
                  <div className="text-xs text-slate-400 font-medium">Obligatoires (O)</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold">
                  3
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">3</div>
                  <div className="text-xs text-slate-400 font-medium">Conditionnels (C)</div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-mono font-bold">
                  7
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-white">7</div>
                  <div className="text-xs text-slate-400 font-medium">Catégories d&apos;info</div>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un champ (ex: Matériau, Échelle, Dessinateur, 2768...)"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "Tous",
                  "Identification",
                  "Descriptif",
                  "Technique",
                  "Représentation",
                  "Document",
                  "Gestion",
                  "Administratif"
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 14 Field Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredChamps.map((champ) => {
                const isOblig = champ.obligation === "Obligatoire";
                return (
                  <div
                    key={champ.id}
                    onClick={() => {
                      setSelectedCellId(champ.id);
                      setActiveTab("cartouche");
                    }}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all hover:-translate-y-1 group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded font-mono font-bold ${
                          isOblig
                            ? "bg-red-500/10 text-red-400 border border-red-500/30"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {champ.obligation}
                      </span>
                      <span className="text-[11px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        {champ.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                      {champ.name}
                    </h3>

                    <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                      {champ.description}
                    </p>

                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono mb-2">
                      <div className="text-[10px] text-slate-500">Exemple concret :</div>
                      <div className="text-amber-300 font-semibold">{champ.example}</div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                      <span>Longueur max :</span>
                      <span className="font-mono text-slate-300">{champ.characters}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: CARTOUCHE INTERACTIF                          */}
        {/* ==================================================== */}
        {activeTab === "cartouche" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Schéma Haute Horlogerie du Cartouche</h2>
                    <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 font-mono">170 mm max</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Sélectionnez une cellule pour visualiser sa fiche descriptive et ses critères de tolérance d&apos;atelier.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                    Obligatoire
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[9px]">C</span>
                    Conditionnel
                  </span>
                </div>
              </div>

              {/* 6-COLUMN SCHEMATIC GRID */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[720px] bg-slate-950 p-4 rounded-xl border-2 border-slate-800 shadow-2xl">
                  <div className="text-[11px] text-slate-400 font-mono mb-3 flex items-center justify-between px-1">
                    <span>POSITION : COIN INFÉRIEUR DROIT DU PLAN (ISO 5457)</span>
                    <span className="text-amber-400 font-bold">LARGEUR CADRE : 170 mm</span>
                  </div>

                  <div className="grid grid-cols-6 gap-2 text-xs font-mono">
                    {/* Row 1 */}
                    <div
                      onClick={() => setSelectedCellId("entreprise")}
                      className={`col-span-4 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "entreprise"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>NOM ENTREPRISE / LOGO</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-sm">Manufacture Horlogère SA</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Raison sociale officielle</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("format")}
                      className={`col-span-1 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "format"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>FORMAT</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-sm">A4</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">ISO 5457</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("indice")}
                      className={`col-span-1 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "indice"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>INDICE</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-amber-400 text-sm">B</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Révision</div>
                    </div>

                    {/* Row 2 */}
                    <div
                      onClick={() => setSelectedCellId("titre")}
                      className={`col-span-4 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "titre"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>TITRE DU DESSIN</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-amber-300 text-sm">Platine Calibre 2824-2</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Désignation claire du composant</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("numero-piece")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "numero-piece"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>NUMÉRO DE PIÈCE</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-sm">P-2824-001-A</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Référence FAO/ERP</div>
                    </div>

                    {/* Row 3 */}
                    <div
                      onClick={() => setSelectedCellId("materiau")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "materiau"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>MATÉRIAU</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-xs">Maillechort CuNi18Zn20</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Nuance normalisée</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("traitement")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "traitement"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>TRAITEMENT SURFACE</span>
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[9px]">C</span>
                      </div>
                      <div className="font-bold text-sky-300 text-xs">Rhodiage 2µm</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Galvanoplastie</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("masse")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "masse"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>MASSE</span>
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[9px]">C</span>
                      </div>
                      <div className="font-bold text-sky-300 text-xs">0.45 g</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Poids fini usiné</div>
                    </div>

                    {/* Row 4 */}
                    <div
                      onClick={() => setSelectedCellId("echelle")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "echelle"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>ÉCHELLE</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-sm">2:1</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Agrandissement horloger</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("projection")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "projection"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>MÉTHODE PROJECTION</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-xs flex items-center gap-1.5">
                        <span>Méthode E (Europe)</span>
                        <span className="text-[11px] font-mono">◎⌸</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Symbole normalisé</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("tolerance-generale")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "tolerance-generale"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>TOLÉRANCE GÉNÉRALE</span>
                        <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-[9px]">C</span>
                      </div>
                      <div className="font-bold text-sky-300 text-xs">ISO 2768-m</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Précision moyenne</div>
                    </div>

                    {/* Row 5 */}
                    <div
                      onClick={() => setSelectedCellId("dessinateur")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "dessinateur"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>DESSINATEUR</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-xs">J. Dupont</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Bureau technique DAO</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("verificateur")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "verificateur"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>VÉRIFICATEUR</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-xs">M. Martin</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Visa contrôle qualité</div>
                    </div>

                    <div
                      onClick={() => setSelectedCellId("date")}
                      className={`col-span-2 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedCellId === "date"
                          ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/50"
                          : "border-slate-700 bg-slate-900 hover:border-slate-500"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                        <span>DATE</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-[9px]">O</span>
                      </div>
                      <div className="font-bold text-white text-xs">17.10.2025</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Format JJ.MM.AAAA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INSPECTOR CARD */}
              <div className="mt-6 p-5 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                        currentCellData.obligation === "Obligatoire"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      }`}
                    >
                      {currentCellData.obligation} ({currentCellData.obligation === "Obligatoire" ? "O" : "C"})
                    </span>
                    <h3 className="text-lg font-bold text-white">{currentCellData.name}</h3>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {currentCellData.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-amber-400">Longueur max : {currentCellData.characters}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="text-xs text-slate-400 font-semibold mb-1">Description ISO 7200</div>
                    <p className="text-sm text-slate-200">{currentCellData.description}</p>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold mb-1">Exemple Horloger</div>
                    <p className="text-sm text-amber-300 font-mono bg-slate-900 p-2 rounded border border-slate-800">
                      {currentCellData.example}
                    </p>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold mb-1">Règle de rigueur atelier</div>
                    <p className="text-sm text-slate-300">{currentCellData.rule}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: TABLEAUX TECHNIQUES                           */}
        {/* ==================================================== */}
        {activeTab === "tableaux" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="text-center max-w-2xl mx-auto mb-6">
                <h2 className="text-2xl font-bold text-white">Tableaux Techniques Horlogers</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Données normées des formats de plan ISO 5457, des nuances métallurgiques horlogères et des finitions de surface.
                </p>
              </div>

              {/* Subtabs */}
              <div className="flex justify-center gap-2 mb-6">
                {[
                  { id: "formats", label: "Formats ISO 5457" },
                  { id: "materiaux", label: "Matériaux Horlogers" },
                  { id: "traitements", label: "Traitements & Finitions" }
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveSubTable(st.id as SubTableType)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      activeSubTable === st.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Subtable 1: Formats */}
              {activeSubTable === "formats" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/80 text-slate-300 font-semibold">
                        <th className="p-3">Format</th>
                        <th className="p-3">Dimensions</th>
                        <th className="p-3">Marge du cadre</th>
                        <th className="p-3">Usage horloger typique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-300">
                      {FORMATS_DATA.map((f) => (
                        <tr key={f.format} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-amber-400">{f.format}</td>
                          <td className="p-3">{f.dimensions}</td>
                          <td className="p-3">{f.marge}</td>
                          <td className="p-3 font-sans">{f.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subtable 2: Matériaux */}
              {activeSubTable === "materiaux" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/80 text-slate-300 font-semibold">
                        <th className="p-3">Nom</th>
                        <th className="p-3">Désignation ISO</th>
                        <th className="p-3">Composition</th>
                        <th className="p-3">Usage &amp; Propriétés horlogères</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {MATERIAUX_DATA.map((m) => (
                        <tr key={m.nom} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-amber-400">{m.nom}</td>
                          <td className="p-3 font-mono text-emerald-400">{m.designation}</td>
                          <td className="p-3 font-mono">{m.composition}</td>
                          <td className="p-3">{m.usage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Subtable 3: Traitements */}
              {activeSubTable === "traitements" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/80 text-slate-300 font-semibold">
                        <th className="p-3">Traitement</th>
                        <th className="p-3">Description technique</th>
                        <th className="p-3">Objectif fonctionnel</th>
                        <th className="p-3">Pièces concernées</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {TRAITEMENTS_DATA.map((t) => (
                        <tr key={t.traitement} className="hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-sky-400">{t.traitement}</td>
                          <td className="p-3">{t.description}</td>
                          <td className="p-3">{t.objectif}</td>
                          <td className="p-3">{t.application}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 4 Practical Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-amber-400 mb-1">📐 Formats recommandés</div>
                  <div className="text-xs text-slate-300">Format A4 pour composants unitaires et A3 pour sous-ensembles ou platines complètes.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-emerald-400 mb-1">⚙️ Matériaux standards</div>
                  <div className="text-xs text-slate-300">Privilégiez le Maillechort CuNi18Zn20 pour la stabilité des ponts et l&apos;Acier inox pour les axes.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-sky-400 mb-1">✨ Finitions de prestige</div>
                  <div className="text-xs text-slate-300">Rhodiage systématique pour protéger le laiton et Côtes de Genève pour la signature visuelle.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-semibold text-purple-400 mb-1">🎯 Tolérances critiques</div>
                  <div className="text-xs text-slate-300">ISO 2768-m par défaut ; réglez en ISO 2768-f pour les ajustements de pivots micrométriques.</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: MÉMO TECHNIQUE & PIÈGES                       */}
        {/* ==================================================== */}
        {activeTab === "memo" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Mémo Technique &amp; Contrôle Qualité</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Les 6 pièges récurrents et les 6 règles d&apos;or pour un cartouche 100% conforme ISO 7200.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setChecklistMode(!checklistMode);
                    setCheckedPracticeIndices(new Set());
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                    checklistMode
                      ? "bg-amber-600 hover:bg-amber-500 text-white"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{checklistMode ? "Réinitialiser Checklist" : "Activer Mode Checklist"}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 6 Erreurs */}
                <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-900/40">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base mb-4">
                    <AlertTriangle className="w-5 h-5" />
                    <span>6 Erreurs Fréquentes (Cliquez pour la solution)</span>
                  </div>

                  <div className="space-y-2.5">
                    {ERREURS_DATA.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveErrorModalIndex(idx)}
                        className="p-3 rounded-lg bg-slate-900/90 border border-rose-900/30 hover:border-rose-500 cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm"
                      >
                        <span className="text-slate-200">{idx + 1}. {item.erreur}</span>
                        <span className="text-rose-400 text-xs font-semibold">Conseil →</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6 Bonnes Pratiques */}
                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base mb-4">
                    <ShieldCheck className="w-5 h-5" />
                    <span>6 Bonnes Pratiques (Cochez au contrôle)</span>
                  </div>

                  <div className="space-y-2.5">
                    {BONNES_PRATIQUES.map((practice, idx) => {
                      const isChecked = checkedPracticeIndices.has(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleChecklistPractice(idx)}
                          className="p-3 rounded-lg bg-slate-900/90 border border-emerald-900/30 hover:border-emerald-500 cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm"
                        >
                          <span className={isChecked ? "line-through text-slate-500" : "text-slate-200"}>
                            {idx + 1}. {practice}
                          </span>
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border text-xs font-bold transition-all ${
                              isChecked
                                ? "bg-emerald-500 border-emerald-400 text-white"
                                : "border-slate-700 bg-slate-800 text-transparent"
                            }`}
                          >
                            ✓
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Conseils d'expert */}
              <div className="mt-8 p-6 rounded-2xl bg-slate-950 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-4">
                  <Zap className="w-5 h-5" />
                  <span>Conseils d&apos;Expert &amp; Rigueur Horlogère</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold text-white">🎯 Avant de dessiner :</div>
                    <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                      <li>Préparez tous les champs du cartouche au gabarit DAO</li>
                      <li>Vérifiez les normes ISO applicables au projet</li>
                      <li>Choisissez le bon format normalisé (A4 ou A3)</li>
                      <li>Définissez l&apos;échelle appropriée pour la cotation micrométrique</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="font-semibold text-white">✅ Avant de finaliser :</div>
                    <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                      <li>Contrôlez l&apos;intégralité des 11 champs obligatoires</li>
                      <li>Mettez impérativement à jour l&apos;indice de révision</li>
                      <li>Vérifiez la position en bas à droite selon ISO 5457</li>
                      <li>Contrôlez les tolérances générales et la désignation matière</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: QUIZ INTERACTIF                               */}
        {/* ==================================================== */}
        {activeTab === "quiz" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8">
              {!quizCompleted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Évaluation Théorique</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">Quiz Cartouche Horloger</h2>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Score actuel</div>
                      <div className="text-lg font-mono font-bold text-amber-400">{quizScore} / {QUIZ_DATA.length}</div>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300"
                      style={{ width: `${((quizIndex + 1) / QUIZ_DATA.length) * 100}%` }}
                    />
                  </div>

                  <div className="text-xs text-slate-400 font-mono mb-2">
                    Question {quizIndex + 1} sur {QUIZ_DATA.length}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                    {QUIZ_DATA[quizIndex].question}
                  </h3>

                  <div className="space-y-3">
                    {QUIZ_DATA[quizIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizAnswer(idx)}
                        disabled={quizFeedback !== null}
                        className="w-full text-left p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs sm:text-sm text-slate-200 hover:text-white transition-all flex items-center justify-between group disabled:opacity-50"
                      >
                        <span>{option}</span>
                        <span className="w-6 h-6 rounded-full border border-slate-600 group-hover:border-amber-400 flex items-center justify-center text-xs font-mono text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </button>
                    ))}
                  </div>

                  {quizFeedback && (
                    <div
                      className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm ${
                        quizFeedback.isCorrect
                          ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                          : "bg-rose-950/40 border-rose-500/40 text-rose-300"
                      }`}
                    >
                      <div className="font-bold mb-1">
                        {quizFeedback.isCorrect ? "✅ Bonne réponse !" : "❌ Mauvaise réponse"}
                      </div>
                      <div>{quizFeedback.text}</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl font-bold">
                    🏆
                  </div>
                  <h3 className="text-2xl font-bold text-white">Félicitations, Quiz Terminé !</h3>
                  <p className="text-slate-300 text-sm">
                    Votre score final est de <strong>{quizScore} sur {QUIZ_DATA.length}</strong> ({Math.round((quizScore / QUIZ_DATA.length) * 100)}%).
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-colors"
                  >
                    Recommencer le Quiz
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: FAQ ATELIER                                   */}
        {/* ==================================================== */}
        {activeTab === "faq" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white">Questions Fréquentes d&apos;Atelier &amp; CFC</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Éclaircissements techniques sur la cotation, les échelles et les règles d&apos;entreprise.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_DATA.map((item) => {
                const isOpen = expandedFaqIds.has(item.id);
                return (
                  <div key={item.id} className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden">
                    <button
                      onClick={() => toggleFaq(item.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-bold text-white">{item.question}</span>
                      <span className="text-amber-400 text-lg font-bold">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 leading-relaxed bg-slate-950/40">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ==================================================== */}
        {/* TAB 7: NORMES ISO                                    */}
        {/* ==================================================== */}
        {activeTab === "normes" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl mx-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Textes des Normes Officielles</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Consultation des articles normatifs applicables aux dessins d&apos;horlogerie.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentNorme("7200")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                      currentNorme === "7200"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    ISO 7200:2004
                  </button>
                  <button
                    onClick={() => setCurrentNorme("5457")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                      currentNorme === "5457"
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    ISO 5457:1999
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 text-xs">
                <div className="text-slate-400">
                  {NORMES_DATA[currentNorme].title} — {NORMES_DATA[currentNorme].subtitle}
                </div>
                <button onClick={toggleAllNormeSections} className="text-amber-400 hover:underline font-medium">
                  Tout déplier / replier
                </button>
              </div>

              <div className="space-y-3">
                {NORMES_DATA[currentNorme].sections.map((sec) => {
                  const isOpen = expandedNormeSections.has(sec.id);
                  return (
                    <div key={sec.id} className="rounded-xl bg-slate-950/60 border border-slate-800 overflow-hidden">
                      <button
                        onClick={() => toggleNormeSection(sec.id)}
                        className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-800/40 transition-colors"
                      >
                        <span className="text-sm font-bold text-amber-300">{sec.title}</span>
                        <span className="text-slate-400 font-mono text-sm">{isOpen ? "▲" : "▼"}</span>
                      </button>
                      {isOpen && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 whitespace-pre-line">
                          {sec.content.replace(/\\n/g, "\n")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </main>

      {/* ERROR SOLUTION MODAL */}
      <AnimatePresence>
        {activeErrorModalIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveErrorModalIndex(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-rose-400 font-bold">
                    Erreur #{activeErrorModalIndex + 1}
                  </span>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {ERREURS_DATA[activeErrorModalIndex].erreur}
                  </h4>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/50">
                <div className="text-xs font-semibold text-rose-300 mb-1">💡 Comment l&apos;éviter :</div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {ERREURS_DATA[activeErrorModalIndex].solution}
                </p>
              </div>

              <div className="mt-5 text-right">
                <button
                  onClick={() => setActiveErrorModalIndex(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
