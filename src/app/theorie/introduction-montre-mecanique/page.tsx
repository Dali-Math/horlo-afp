"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Zap,
  ShieldCheck,
  Award,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  RefreshCw,
  Sliders,
  Activity,
  Layers,
  Gauge,
  Cog,
  Info,
  BookOpen,
  Sparkles,
  Watch
} from "lucide-react";

interface OrganDetail {
  id: string;
  number: string;
  title: string;
  role: string;
  components: string[];
  materials: string;
  physicsFormula: string;
  workshopSecret: string;
  color: string;
  svgIcon: string;
}

const ORGANS: OrganDetail[] = [
  {
    id: "moteur",
    number: "01",
    title: "L'Organe Moteur (Source d'Énergie)",
    role: "Emmagasiner l'énergie mécanique potentielle élastique lors du remontage et la restituer sous la forme d'un couple moteur continu et régulé.",
    components: [
      "Tambour de barillet avec denture extérieure",
      "Arbre de barillet (noyau et tigerons)",
      "Couvercle de barillet clippé",
      "Ressort de barillet (lame d'acier trempé ou Nivaflex)",
      "Bride glissante (calibres automatiques) ou crochet d'accrochage (calibres manuels)"
    ],
    materials: "Alliage Nivaflex (Cobalt-Nickel-Chrome amagnétique, incassable et autolubrifié). Laiton horloger CuZn39Pb2 pour le tambour.",
    physicsFormula: "C = (E · e³ · h) / (12 · L) [Couple élastique en mN·mm]",
    workshopSecret: "Un ressort de barillet graissé avec une graisse trop épaisse perd jusqu'à 20% de sa force motrice disponible. En automatique, l'encollage de la bride sur la paroi interne du barillet avec une graisse au bisulfure de molybdène (Moebius Klüber P125) détermine le déclenchement du glissement anti-casse.",
    color: "#E2B44F",
    svgIcon: "barrel"
  },
  {
    id: "transmission",
    number: "02",
    title: "L'Organe de Transmission (Le Rouage)",
    role: "Acheminer le couple moteur du barillet vers l'échappement tout en démultipliant considérablement la vitesse de rotation avec un rendement mécanique supérieur à 95%.",
    components: [
      "Roue de centre (grande moyenne) : effectue 1 tour par heure (porte la chaussée)",
      "Roue moyenne (ou troisième roue) : mobile intermédiaire de démultiplication",
      "Roue de seconde : effectue exactement 1 tour par minute (60 secondes)",
      "Pignons en acier trempé 20AP aux ailes polies",
      "Pierres synthétiques (coussinets en rubis Al₂O₃) pour les pivots"
    ],
    materials: "Planches de roues en laiton horloger écroui ou maillechort doré. Pignons et axes en acier au carbone Finemac / 20AP trempé et revenu.",
    physicsFormula: "q_total = (z_barillet · z_centre · z_moyenne · z_seconde) / (z'_centre · z'_moyenne · z'_seconde · z'_echappement) ≈ 1 : 3600",
    workshopSecret: "Les engrenages horlogers n'utilisent pas la développante de cercle industrielle classique mais des profils cycloïdaux à ogives. Ces profils réduisent le frottement par glissement à un pur roulement quasi idéal, indispensable quand le couple final à l'échappement ne dépasse pas quelques micro-newtons mètres.",
    color: "#60A5FA",
    svgIcon: "geartrain"
  },
  {
    id: "distribution",
    number: "03",
    title: "L'Organe Distributeur (L'Échappement)",
    role: "Transformer le mouvement rotatif continu du rouage en impulsions intermittentes pour entretenir les oscillations du balancier, tout en bloquant et libérant le rouage au rythme de la régulation.",
    components: [
      "Roue d'échappement (15 ou 20 dents à talons inclinés)",
      "Pignon d'échappement",
      "Ancre suisse avec dard de sécurité et cornes de fourchette",
      "Palette d'entrée et palette de sortie en rubis synthétique taillé",
      "Goupilles de limitation (butées d'ébat d'ancre)"
    ],
    materials: "Ancre et roue en acier poli bloqué ou en silicium monocristallin amagnétique et ultra-léger. Palettes en corindon rouge synthétique.",
    physicsFormula: "5 phases cinématiques fondamentales : Repos ➔ Tirage ➔ Dégagement ➔ Impulsion ➔ Chute",
    workshopSecret: "Le tirage est l'angle de sécurité géométrique qui plaque automatiquement l'ancre contre sa goupille de repos sous la poussée de la dent de roue. Sans angle de tirage rigoureux (typiquement 12° à 14°), la moindre secousse ou choc sur la montre ferait sauter l'ancre et bloquerait la montre.",
    color: "#F43F5E",
    svgIcon: "escapement"
  },
  {
    id: "regulation",
    number: "04",
    title: "L'Organe Régulateur (Le Balancier-Spiral)",
    role: "Constituer le métronome absolu du mouvement. Par ses oscillations isochrones d'une extrême régularité, il dicte la cadence temporelle de toute la chaîne mécanique.",
    components: [
      "Serge de balancier (volant d'inertie circulaire équilibré)",
      "Bras de balancier et axe de balancier en acier poli trempé",
      "Spiral horloger (ruban élastique enroulé en spirale d'Archimède)",
      "Virole fendue fixant l'extrémité intérieure du spiral à l'axe",
      "Piton et raquette de réglage fin de longueur active (ou masselottes d'inertie inertielle)",
      "Double plateau avec cheville de plateau (rubis d'impulsion) et creusure de sécurité"
    ],
    materials: "Serge en Glucydur (alliage Béryllium-Bronze à très faible dilatation thermique). Spiral en Nivarox amagnétique ou en Silicium pur (Silinvar / Parachrom).",
    physicsFormula: "T = 2π · √(I / C_s)  [Période d'oscillation en secondes, indépendante de l'amplitude]",
    workshopSecret: "Le spiral respire : à chaque demi-tour, il se contracte puis se dilate. Pour qu'il conserve un développement parfaitement concentrique et concentre son centre de gravité sur l'axe de pivotement dans toutes les positions verticales, la courbe terminale relevée imaginée par Abraham-Louis Breguet (courbe Breguet) demeure la référence de la haute chronométrie.",
    color: "#10B981",
    svgIcon: "balance"
  },
  {
    id: "affichage",
    number: "05",
    title: "Affichage & Commande (Minuterie & Remontoir)",
    role: "Traduire les micro-impulsions cinématiques en lecture visuelle des heures, minutes et secondes, et offrir à l'utilisateur le contrôle ergonomique du remontage et de la mise à l'heure.",
    components: [
      "Chaussée à friction (lanterne) montée sur le tigeron de roue de centre",
      "Roue de minuterie et son pignon",
      "Roue des heures (démultiplication 1:12 sous le cadran)",
      "Aiguilles des heures, minutes et trotteuse des secondes",
      "Mécanisme de tirette, bascule, tige de remontoir, pignon coulant et pignon de remontoir"
    ],
    materials: "Laiton horloger CuZn39Pb2 doré ou rhodié, acier inoxydable pour la tige de remontoir, aiguilles en acier bleui thermiquement ou or 18k.",
    physicsFormula: "Rapport de minuterie : (z_chaussee / z_roue_minuterie) · (z_pignon_minuterie / z_roue_heures) = 1 / 12",
    workshopSecret: "La chaussée est pincée sur l'arbre de roue de centre avec une graisse spécifique (Moebius 9504). Si le serrage de la lanterne est trop dur, la mise à l'heure brise les dents de minuterie. S'il est trop lâche, les aiguilles s'arrêtent alors que le mouvement continue de tourner : c'est le classique symptôme du calibre qui 'retarde' sans dysfonctionnement du balancier.",
    color: "#A855F7",
    svgIcon: "dial"
  }
];

const COMPARATIVE_DATA = [
  {
    criterion: "Source d'énergie",
    mecaniqueManuel: "Ressort de barillet armé à la main via la couronne",
    mecaniqueAuto: "Ressort de barillet armé par un rotor oscillant à roulement à billes",
    quartz: "Pile bouton électrochimique (oxyde d'argent 1.55V)"
  },
  {
    criterion: "Organe régulateur",
    mecaniqueManuel: "Oscillateur mécanique Balancier-Spiral (2.5 à 5 Hz)",
    mecaniqueAuto: "Oscillateur mécanique Balancier-Spiral (4 Hz standard)",
    quartz: "Lamelle de quartz piézoélectrique sous vide (32'768 Hz)"
  },
  {
    criterion: "Déplacement trotteuse",
    mecaniqueManuel: "Fluide et continu (5 à 10 sauts par seconde selon fréquence)",
    mecaniqueAuto: "Fluide et continu (8 sauts par seconde à 28'800 A/h)",
    quartz: "Saccadé (1 saut sec par seconde actionné par moteur Lavet)"
  },
  {
    criterion: "Précision typique",
    mecaniqueManuel: "-4 à +6 sec / jour (Norme Chronomètre Suisse COSC)",
    mecaniqueAuto: "-4 à +6 sec / jour (COSC) / ±2 sec (Superlative Chronometer)",
    quartz: "±10 à ±15 secondes par MOIS"
  },
  {
    criterion: "Autonomie / Réserve",
    mecaniqueManuel: "42 à 72 heures (jusqu'à 8 jours avec double barillet)",
    mecaniqueAuto: "38 à 80 heures (Powermatic 80) / infinie au poignet",
    quartz: "2 à 5 ans selon capacité de la pile"
  },
  {
    criterion: "Durabilité & Héritage",
    mecaniqueManuel: "Séculaire : réparable à l'infini par tout horloger rhabilleur",
    mecaniqueAuto: "Séculaire : patrimoine transmissible de génération en génération",
    quartz: "Limitée : composants électroniques et circuits intégrés obsolètes"
  }
];

const FREQUENCIES = [
  { hz: 2.5, ah: "18'000 A/h", stepsSec: 5, label: "2.5 Hz (Basse Fréquence)", calibres: "Unitas 6497-1, montres de poche d'école, calibres vintage" },
  { hz: 3.0, ah: "21'600 A/h", stepsSec: 6, label: "3.0 Hz (Fréquence Classique)", calibres: "Seiko NH35/4R35, Patek Philippe 240, calibres manuels historiques" },
  { hz: 4.0, ah: "28'800 A/h", stepsSec: 8, label: "4.0 Hz (Standard Moderne Suisse)", calibres: "ETA 2824-2, Sellita SW200, Rolex 3135/3235, Omega 8500" },
  { hz: 5.0, ah: "36'000 A/h", stepsSec: 10, label: "5.0 Hz (Haute Fréquence)", calibres: "Zenith El Primero, Grand Seiko Hi-Beat 9S85" }
];

const QUIZ_QUESTIONS = [
  {
    question: "Dans la chaîne cinématique d'une montre mécanique, quel organe transforme le mouvement rotatif continu en impulsions alternatives ?",
    options: [
      "Le rouage de grande moyenne",
      "L'organe distributeur (l'échappement à ancre suisse)",
      "Le ressort de barillet",
      "La chaussée de minuterie"
    ],
    correctAnswer: 1,
    explanation: "C'est la fonction primordiale de l'échappement : il bloque et libère séquentiellement le rouage de finissage et transmet une impulsion d'entretien au balancier pour vaincre les frottements."
  },
  {
    question: "Quelle est la relation physique exacte entre une oscillation et une alternance de balancier ?",
    options: [
      "1 oscillation = 1 alternance",
      "1 oscillation = 2 alternances (un aller et un retour)",
      "1 alternance = 2 oscillations",
      "1 oscillation = 4 battements de roue d'échappement"
    ],
    correctAnswer: 1,
    explanation: "Une oscillation est un cycle complet d'aller-retour du balancier. Elle est donc composée de 2 alternances (un trajet de gauche à droite, puis le retour de droite à gauche)."
  },
  {
    question: "Pour une montre battant à la fréquence standard suisse de 28'800 A/h (4 Hz), combien de sauts l'aiguille des secondes effectue-t-elle par seconde ?",
    options: [
      "4 sauts par seconde",
      "6 sauts par seconde",
      "8 sauts par seconde",
      "10 sauts par seconde"
    ],
    correctAnswer: 2,
    explanation: "La fréquence est de 4 Hz (4 oscillations complètes/seconde). Comme 1 oscillation = 2 alternances (2 chutes de roue d'échappement), l'aiguille avance de 4 × 2 = 8 sauts par seconde, donnant cette impression de fluidité visuelle."
  },
  {
    question: "Quel composant permet de régler l'heure sur les aiguilles sans risquer de casser les fragiles dents du rouage de transmission ?",
    options: [
      "Le cliquet de rochet",
      "Le dard d'ancre",
      "La friction grasse de la chaussée (lanternage)",
      "La bride glissante du ressort"
    ],
    correctAnswer: 2,
    explanation: "La chaussée est emmanchée à friction contrôlée (grâce à son étranglement ou 'lanterne') sur l'axe de la roue de centre. Lors de la mise à l'heure, elle patine sur l'axe, permettant aux aiguilles de tourner sans forcer le rouage bloqué."
  },
  {
    question: "Quelle est la principale raison de l'utilisation de rubis synthétiques (corindon Al₂O₃) pour les paliers de pivotement en horlogerie ?",
    options: [
      "Améliorer l'esthétique et la valeur marchande du mouvement",
      "Dureté extrême (9 Mohs) et coefficient de frottement minimal avec l'acier poli pour limiter l'usure",
      "Empêcher la magnétisation du spiral",
      "Conduire l'électricité statique vers la platine"
    ],
    correctAnswer: 1,
    explanation: "Le corindon synthétique possède une dureté exceptionnelle de 9 sur l'échelle de Mohs (juste sous le diamant). Poli miroir et lubrifié, il offre un coefficient de frottement quasi nul avec les pivots en acier trempé 20AP, garantissant une longévité de plusieurs décennies."
  }
];

export default function IntroductionMontreMecaniquePage() {
  const [selectedOrgan, setSelectedOrgan] = useState(0);
  const [selectedFreqIndex, setSelectedFreqIndex] = useState(2);
  const [barrelTurns, setBarrelTurns] = useState(7);
  const [gearRatio, setGearRatio] = useState(6);

  // Quiz State (Stepper Compact)
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const calculatedPowerReserve = Math.round(barrelTurns * gearRatio);

  const handleSelectQuizAnswer = (optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [currentQuizIdx]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setCurrentQuizIdx(0);
    setQuizFinished(false);
  };

  const activeOrganData = ORGANS[selectedOrgan];

  return (
    <div className="bg-[#FDFCFB] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100 antialiased selection:bg-[#B08D57]/20 selection:text-[#8A6A3B] dark:selection:text-[#D4B483] min-h-screen pb-24 transition-colors duration-200">
      
      {/* =================================================================== */}
      {/* TOP APP BAR & BREADCRUMB */}
      {/* =================================================================== */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#15161A]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 overflow-x-auto no-scrollbar">
            <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100 tracking-wider hover:opacity-80 transition-opacity whitespace-nowrap">
              HORLOLEARN
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/theorie" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors whitespace-nowrap">
              Théorie
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-neutral-500 dark:text-neutral-400 whitespace-nowrap">Pilier I</span>
            <span className="opacity-40">/</span>
            <span className="font-medium text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
              Introduction à la Montre Mécanique
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              SEFRI · CPIH / FET
            </span>
          </div>
        </div>
      </header>

      {/* =================================================================== */}
      {/* MAIN CONTAINER */}
      {/* =================================================================== */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16">

        {/* 1. HERO SECTION & NORMATIVE BADGES */}
        <section className="space-y-4 border-b border-neutral-200 dark:border-neutral-800 pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
              Module 01 · Traité d&apos;Établi Fondamental
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              Niveau : AFP / CFC Horloger Praticien &amp; Rhabilleur
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
              15 min de lecture · Théorie &amp; Simulateur
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight leading-tight">
            Introduction à la Montre Mécanique : Principes &amp; Chaîne Cinématique
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-4xl leading-relaxed">
            Une montre mécanique est un chef-d&apos;œuvre de micro-ingénierie qui accomplit une prouesse physique fascinante : 
            prendre la force brute désordonnée d&apos;un ressort d&apos;acier comprimé et la transformer, par une succession 
            de <strong>5 organes cinématiques interconnectés</strong>, en un découpage du temps d&apos;une précision micrométrique. 
            Découvrez comment circule le flux d&apos;énergie selon les principes enseignés dans les écoles d&apos;horlogerie suisses.
          </p>
        </section>

        {/* =================================================================== */}
        {/* 2. CONCEPT FONDAMENTAL : DU TEMPS CONTINU AU TEMPS QUANTIFIÉ */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 1 · Fondements Physiques
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Qu&apos;est-ce qu&apos;une Montre Mécanique ? La Quantification du Temps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                La Force Motrice (Énergie)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Contrairement à une montre à quartz alimentée par pile, la montre mécanique tire son énergie d&apos;une déformation élastique pure : 
                un ruban d&apos;alliage métallique bobiné à l&apos;intérieur d&apos;un tambour rotatif appelé <strong>barillet</strong>.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                L&apos;Échappement (Le Verrou)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Si le ressort se détendait librement, le rouage tournerait à toute allure en quelques secondes. 
                L&apos;<strong>échappement à ancre suisse</strong> agit comme un gardien impitoyable : il bloque le rouage et ne le libère que d&apos;une fraction de dent à chaque alternance.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-neutral-900 dark:text-neutral-100">
                Le Régulateur (Le Métronome)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Le couple <strong>balancier-spiral</strong> est le métronome universel. Grâce à sa période d&apos;oscillation isochrone, 
                il dicte à l&apos;échappement le moment précis où déverrouiller la dent suivante, découpant ainsi le flot continu en secondes régulières.
              </p>
            </div>
          </div>

          {/* TABLEAU COMPARATIF MANUEL / AUTO / QUARTZ */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-mono font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Tableau Comparatif : Remontage Manuel vs Automatique vs Quartz Électronique
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#191C23] font-mono text-neutral-500 dark:text-neutral-400">
                    <th className="p-4">Critère Technique</th>
                    <th className="p-4 text-[#8A6A3B] dark:text-[#D4B483]">Mécanique Manuel</th>
                    <th className="p-4 text-sky-600 dark:text-sky-400">Mécanique Automatique</th>
                    <th className="p-4 text-neutral-600 dark:text-neutral-400">Quartz Électronique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {COMPARATIVE_DATA.map((row, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                      <td className="p-4 font-mono font-bold text-neutral-900 dark:text-neutral-100">{row.criterion}</td>
                      <td className="p-4 text-neutral-700 dark:text-neutral-300 font-medium">{row.mecaniqueManuel}</td>
                      <td className="p-4 text-neutral-700 dark:text-neutral-300 font-medium">{row.mecaniqueAuto}</td>
                      <td className="p-4 text-neutral-500 dark:text-neutral-400">{row.quartz}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. LE CŒUR ACADÉMIQUE : LES 5 GRANDS ORGANES CINÉMATIQUES */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 2 · Traité d&apos;Établi SEFRI / CPIH
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Les 5 Grands Organes Fonctionnels du Calibre
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              En théorie horlogère suisse (Traité Reymondin), tout mouvement mécanique — du calibre de montre de poche Unitas 6497 
              aux mouvements ultra-plats ou aux grandes complications — se décompose immuablement en 5 ensembles fonctionnels.
            </p>
          </div>

          {/* SÉLECTEUR D'ORGANES INTERACTIF */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {ORGANS.map((organ, idx) => (
              <button
                key={organ.id}
                type="button"
                onClick={() => setSelectedOrgan(idx)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedOrgan === idx
                    ? "bg-[#B08D57] text-neutral-950 font-bold shadow-md scale-[1.02]"
                    : "bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
                }`}
              >
                <span className="opacity-70">{organ.number}.</span>
                <span>{organ.title.split(" (")[0]}</span>
              </button>
            ))}
          </div>

          {/* FICHE TECHNIQUE DÉTAILLÉE DE L'ORGANE SÉLECTIONNÉ */}
          <div className="p-6 sm:p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase">
                  Organe n°{activeOrganData.number} · Décomposition Cinématique
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  {activeOrganData.title}
                </h3>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-300">
                <Info className="w-4 h-4 text-[#B08D57]" />
                <span>Rôle : {activeOrganData.role.slice(0, 45)}...</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Colonne Gauche : Rôle & Composants */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider">
                    Fonction Principale dans la Chaîne
                  </h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {activeOrganData.role}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider">
                    Composants Clés d&apos;Atelier
                  </h4>
                  <ul className="space-y-2">
                    {activeOrganData.components.map((comp, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle2 className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Colonne Droite : Matériaux, Formule & Secret d'Établi */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1A1D24] border border-neutral-200/60 dark:border-neutral-800/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">
                    Matériaux Horlogers Normalisés (NIHS)
                  </span>
                  <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium">
                    {activeOrganData.materials}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#B08D57]/5 dark:bg-[#B08D57]/10 border border-[#B08D57]/20 space-y-1 font-mono">
                  <span className="text-[11px] font-bold text-[#8A6A3B] dark:text-[#D4B483] uppercase tracking-wider block">
                    Formule Physique / Relation Fondamentale
                  </span>
                  <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    {activeOrganData.physicsFormula}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300">
                    💡 Règle d&apos;or du Maître Horloger :
                  </span>
                  <p className="leading-relaxed">
                    {activeOrganData.workshopSecret}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. SCHÉMA INTERACTIF CAD DE LA CHAÎNE CINÉMATIQUE (SVG) */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 3 · Visualisation Graphique
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Flux d&apos;Énergie Linéaire : Du Barillet aux Aiguilles
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Suivez le parcours complet de la puissance mécanique : le couple élevé et lent du barillet est démultiplié 
              en vitesse rapide par le rouage, puis transformé en impulsions par l&apos;échappement sous le contrôle du balancier.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-neutral-700/60 bg-[#15171D] text-[#E0E2E6] space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
              <span className="text-neutral-400 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B08D57] animate-pulse"></span>
                DIAGRAMME CINÉMATIQUE SYNOPTIQUE DE TRANSMISSION
              </span>
              <span className="text-neutral-400">CLIQUEZ SUR UN ÉLÉMENT POUR L&apos;EXPLORER</span>
            </div>

            <div className="w-full overflow-x-auto py-6">
              <svg viewBox="0 0 920 220" className="w-full min-w-[850px] h-auto select-none font-mono">
                <defs>
                  <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E2B44F" />
                    <stop offset="25%" stopColor="#60A5FA" />
                    <stop offset="60%" stopColor="#F43F5E" />
                    <stop offset="85%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>

                <path d="M 60 110 L 860 110" stroke="url(#flow-gradient)" strokeWidth="3" strokeDasharray="6 4" />

                {/* 1. Barillet Moteur */}
                <g transform="translate(60, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(0)}>
                  <circle cx="0" cy="0" r="38" fill="#1C1F26" stroke="#E2B44F" strokeWidth="2.5" />
                  <path d="M -15 0 A 15 15 0 0 1 15 0 A 22 22 0 0 1 -20 0 A 28 28 0 0 1 25 0" fill="none" stroke="#E2B44F" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="6" fill="#E2B44F" />
                  <text x="0" y="55" fill="#E2B44F" fontSize="11" fontWeight="bold" textAnchor="middle">1. BARILLET</text>
                  <text x="0" y="70" fill="#94A3B8" fontSize="9" textAnchor="middle">Couple Moteur</text>
                </g>

                <polygon points="135,110 125,105 125,115" fill="#60A5FA" />

                {/* 2. Roue de Centre */}
                <g transform="translate(190, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(1)}>
                  <circle cx="0" cy="0" r="30" fill="#1C1F26" stroke="#60A5FA" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#60A5FA" />
                  <line x1="-25" y1="0" x2="25" y2="0" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="0" y1="-25" x2="0" y2="25" stroke="#60A5FA" strokeWidth="1" />
                  <text x="0" y="50" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">R. CENTRE</text>
                  <text x="0" y="65" fill="#94A3B8" fontSize="9" textAnchor="middle">1 tr / heure</text>
                </g>

                {/* 3. Roue Moyenne */}
                <g transform="translate(310, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(1)}>
                  <circle cx="0" cy="0" r="24" fill="#1C1F26" stroke="#60A5FA" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#60A5FA" />
                  <line x1="-20" y1="0" x2="20" y2="0" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="0" y1="-20" x2="0" y2="20" stroke="#60A5FA" strokeWidth="1" />
                  <text x="0" y="45" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">R. MOYENNE</text>
                  <text x="0" y="60" fill="#94A3B8" fontSize="9" textAnchor="middle">Démultiplication</text>
                </g>

                {/* 4. Roue de Seconde */}
                <g transform="translate(430, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(1)}>
                  <circle cx="0" cy="0" r="26" fill="#1C1F26" stroke="#60A5FA" strokeWidth="2" />
                  <circle cx="0" cy="0" r="4" fill="#60A5FA" />
                  <line x1="-22" y1="0" x2="22" y2="0" stroke="#60A5FA" strokeWidth="1" />
                  <line x1="0" y1="-22" x2="0" y2="22" stroke="#60A5FA" strokeWidth="1" />
                  <text x="0" y="48" fill="#60A5FA" fontSize="10" fontWeight="bold" textAnchor="middle">R. SECONDE</text>
                  <text x="0" y="63" fill="#94A3B8" fontSize="9" textAnchor="middle">1 tr / minute</text>
                </g>

                <polygon points="495,110 485,105 485,115" fill="#F43F5E" />

                {/* 5. Échappement (Roue & Ancre) */}
                <g transform="translate(560, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(2)}>
                  <circle cx="0" cy="0" r="25" fill="#1C1F26" stroke="#F43F5E" strokeWidth="2" />
                  <path d="M 0 -22 L 4 -16 L -2 -14 Z M 22 0 L 16 4 L 14 -2 Z M 0 22 L -4 16 L 2 14 Z M -22 0 L -16 -4 L -14 2 Z" fill="#F43F5E" />
                  <circle cx="0" cy="0" r="4" fill="#F43F5E" />
                  <text x="0" y="48" fill="#F43F5E" fontSize="10" fontWeight="bold" textAnchor="middle">ÉCHAPPEMENT</text>
                  <text x="0" y="63" fill="#94A3B8" fontSize="9" textAnchor="middle">Ancre &amp; Dents</text>
                </g>

                <polygon points="620,105 630,110 620,115" fill="#10B981" />
                <polygon points="635,115 625,110 635,105" fill="#F43F5E" />

                {/* 6. Balancier-Spiral */}
                <g transform="translate(700, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(3)}>
                  <circle cx="0" cy="0" r="36" fill="#1C1F26" stroke="#10B981" strokeWidth="2.5" />
                  <path d="M 0 0 A 6 6 0 0 1 6 0 A 12 12 0 0 1 -12 0 A 18 18 0 0 1 18 0 A 24 24 0 0 1 -24 0" fill="none" stroke="#10B981" strokeWidth="1.2" />
                  <circle cx="0" cy="0" r="4" fill="#10B981" />
                  <circle cx="-34" cy="0" r="2" fill="#E2E8F0" />
                  <circle cx="34" cy="0" r="2" fill="#E2E8F0" />
                  <circle cx="0" cy="-34" r="2" fill="#E2E8F0" />
                  <circle cx="0" cy="34" r="2" fill="#E2E8F0" />
                  <text x="0" y="55" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">BALANCIER</text>
                  <text x="0" y="70" fill="#94A3B8" fontSize="9" textAnchor="middle">Cadence 4 Hz</text>
                </g>

                {/* Branching to Affichage */}
                <path d="M 190 80 L 190 35 L 830 35 L 830 75" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 3" />
                <polygon points="830,85 825,75 835,75" fill="#A855F7" />

                {/* 7. Affichage & Minuterie */}
                <g transform="translate(830, 110)" className="cursor-pointer" onClick={() => setSelectedOrgan(4)}>
                  <circle cx="0" cy="0" r="28" fill="#1C1F26" stroke="#A855F7" strokeWidth="2" />
                  <line x1="0" y1="0" x2="0" y2="-18" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="12" y2="0" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
                  <line x1="0" y1="0" x2="-8" y2="14" stroke="#F43F5E" strokeWidth="1" />
                  <circle cx="0" cy="0" r="3" fill="#E2B44F" />
                  <text x="0" y="50" fill="#A855F7" fontSize="10" fontWeight="bold" textAnchor="middle">AFFICHAGE</text>
                  <text x="0" y="65" fill="#94A3B8" fontSize="9" textAnchor="middle">Minuterie 1:12</text>
                </g>
              </svg>
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
              <span>🔵 Le couple décroît du Barillet vers l&apos;Échappement</span>
              <span>⚡ La vitesse de rotation est multipliée par ~3&apos;600</span>
              <span>🟢 Le Balancier impose sa loi temporelle à l&apos;ensemble</span>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. LABORATOIRE & SIMULATEUR HORLOGER INTERACTIF */}
        {/* =================================================================== */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
              Chapitre 4 · Pratique de Calcul
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
              Laboratoire Interactif : Fréquences &amp; Réserve de Marche
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Expérimentez directement les grandeurs mathématiques clés qui régissent le fonctionnement d&apos;un calibre mécanique.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Outil 1 : Simulateur de Fréquence & Fluidité */}
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <Activity className="w-4 h-4 text-[#B08D57]" />
                <span>SIMULATEUR DE FRÉQUENCE &amp; BATTEMENTS</span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono font-semibold text-neutral-600 dark:text-neutral-400">
                  Sélectionnez la fréquence du calibre :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FREQUENCIES.map((freq, fIdx) => (
                    <button
                      key={fIdx}
                      type="button"
                      onClick={() => setSelectedFreqIndex(fIdx)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedFreqIndex === fIdx
                          ? "border-[#B08D57] bg-[#B08D57]/10 text-neutral-900 dark:text-neutral-100 font-bold shadow-sm"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:border-neutral-400"
                      }`}
                    >
                      <div className="text-sm font-mono font-bold">{freq.hz} Hz</div>
                      <div className="text-[11px] font-mono text-neutral-500">{freq.ah}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rendu Dynamique */}
              <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#1A1D24] border border-neutral-200 dark:border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-neutral-500">Fluidité de la Trotteuse :</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {FREQUENCIES[selectedFreqIndex].stepsSec} sauts par seconde
                  </span>
                </div>

                {/* Jauge Visuelle de Pas */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>1 seconde divisée en {FREQUENCIES[selectedFreqIndex].stepsSec} pas :</span>
                    <span>{(1000 / FREQUENCIES[selectedFreqIndex].stepsSec).toFixed(1)} ms / pas</span>
                  </div>
                  <div className="flex gap-1 h-3 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full p-0.5 overflow-hidden">
                    {Array.from({ length: FREQUENCIES[selectedFreqIndex].stepsSec }).map((_, stepIdx) => (
                      <div
                        key={stepIdx}
                        className="flex-1 bg-[#B08D57] rounded-sm transition-all"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800 pt-3">
                  <strong>Calibres représentatifs :</strong> {FREQUENCIES[selectedFreqIndex].calibres}.
                </div>
              </div>
            </div>

            {/* Outil 2 : Calculateur de Réserve de Marche */}
            <div className="p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                <Gauge className="w-4 h-4 text-[#B08D57]" />
                <span>CALCULATEUR DE RÉSERVE DE MARCHE HORLOGÈRE</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Nombre de tours de barillet utiles (n) :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{barrelTurns} tours</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    step="0.5"
                    value={barrelTurns}
                    onChange={(e) => setBarrelTurns(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>4 tours (ressort court)</span>
                    <span>7 tours (standard)</span>
                    <span>14 tours (longue réserve)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-neutral-600 dark:text-neutral-400">Rapport de démultiplication Roue de Centre / Barillet :</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{gearRatio} : 1</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="9"
                    step="0.5"
                    value={gearRatio}
                    onChange={(e) => setGearRatio(parseFloat(e.target.value))}
                    className="w-full accent-[#B08D57] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                    <span>5:1 (couple fort)</span>
                    <span>6:1 (ETA 2824)</span>
                    <span>9:1 (haute démultiplication)</span>
                  </div>
                </div>

                {/* Résultat Calculé */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#B08D57]/10 to-transparent border border-[#B08D57]/30 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 block">
                      Autonomie Théorique Totale :
                    </span>
                    <span className="text-2xl sm:text-3xl font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">
                      {calculatedPowerReserve} heures
                    </span>
                  </div>
                  <div className="text-right text-xs font-mono text-neutral-500">
                    <div>Soit ~{(calculatedPowerReserve / 24).toFixed(1)} jours</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">R = n × q_centre</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. BILAN ÉNERGÉTIQUE & RÈGLE D'ÉTABLI */}
        {/* =================================================================== */}
        <section className="p-8 rounded-3xl border border-sky-300 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200 space-y-4">
          <div className="flex items-center gap-2 font-bold text-sm text-sky-800 dark:text-sky-300">
            <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <span>Où disparaît l&apos;énergie d&apos;une montre mécanique ? Le Bilan des Pertes</span>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-sky-800 dark:text-sky-300/90">
            Le rendement global d&apos;une montre mécanique est un sujet d&apos;étude fascinant : 
            sur 100% de l&apos;énergie stockée dans le ressort de barillet, <strong>moins de 5% est réellement utilisé pour animer le balancier</strong> ! 
            Voici la répartition exacte des pertes :
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/70 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/50 space-y-1">
              <div className="font-bold text-sky-900 dark:text-sky-100">Pertes au Barillet (~15%)</div>
              <p className="text-[11px] text-sky-700 dark:text-sky-300 font-sans">
                Frottement des spires du ressort entre elles et contre les parois du tambour.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/50 space-y-1">
              <div className="font-bold text-sky-900 dark:text-sky-100">Pertes au Rouage (~5%)</div>
              <p className="text-[11px] text-sky-700 dark:text-sky-300 font-sans">
                Excellent rendement : seulement 2 à 5% de perte grâce aux rubis olivés et profils cycloïdaux.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/70 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800/50 space-y-1">
              <div className="font-bold text-rose-700 dark:text-rose-300">Pertes à l&apos;Échappement (~60%)</div>
              <p className="text-[11px] text-sky-700 dark:text-sky-300 font-sans">
                Le goulet d&apos;étranglement : frottement de glissement des palettes et pertes par chocs à la chute.
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 7. QUIZ DE VALIDATION THÉORIQUE (FORMAT STEPPER COMPACT) */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#8A6A3B] dark:text-[#D4B483] font-bold">
                Contrôle des Connaissances
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Quiz de Validation Rapide (Format Examen Suisse)
              </h2>
            </div>

            {/* Mini Progress Pills */}
            <div className="flex items-center gap-1.5">
              {QUIZ_QUESTIONS.map((_, idx) => {
                const ans = userAnswers[idx];
                const isCurrent = currentQuizIdx === idx && !quizFinished;
                let bg = "bg-neutral-200 dark:bg-neutral-800 text-neutral-500";
                if (ans !== undefined) {
                  bg = ans === QUIZ_QUESTIONS[idx].correctAnswer
                    ? "bg-emerald-500 text-white font-bold"
                    : "bg-rose-500 text-white font-bold";
                } else if (isCurrent) {
                  bg = "bg-[#B08D57] text-neutral-950 font-bold ring-2 ring-[#B08D57]/40";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setCurrentQuizIdx(idx);
                      setQuizFinished(false);
                    }}
                    className={`w-7 h-7 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center justify-center ${bg}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN QUIZ CARD (Compact Stepper) */}
          <div className="p-6 sm:p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
            {!quizFinished ? (
              <div className="space-y-5">
                {/* Question Header */}
                <div className="flex items-center justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/20">
                      Question {currentQuizIdx + 1} / {QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">
                      {userAnswers[currentQuizIdx] !== undefined ? "✓ Réponse enregistrée" : "Choisissez une option"}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-neutral-500 font-semibold">
                    Score : {calculateScore()} / {Object.keys(userAnswers).length}
                  </span>
                </div>

                {/* Question Title */}
                <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {QUIZ_QUESTIONS[currentQuizIdx].question}
                </h3>

                {/* Options Grid (2x2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUIZ_QUESTIONS[currentQuizIdx].options.map((opt, optIdx) => {
                    const selected = userAnswers[currentQuizIdx];
                    const isSelected = selected === optIdx;
                    const isAnswered = selected !== undefined;
                    const isOptionCorrect = optIdx === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer;

                    let btnStyle = "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/60 dark:bg-neutral-900/40 text-neutral-700 dark:text-neutral-300";

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300 font-semibold";
                      } else {
                        btnStyle = "opacity-50 border-neutral-200 dark:border-neutral-800";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectQuizAnswer(optIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${btnStyle}`}
                      >
                        <span className="leading-snug">{opt}</span>
                        {isAnswered && isOptionCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation Box */}
                {userAnswers[currentQuizIdx] !== undefined && (
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                      ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/40 text-rose-900 dark:text-rose-200"
                  }`}>
                    <span className="font-bold block mb-0.5">
                      {userAnswers[currentQuizIdx] === QUIZ_QUESTIONS[currentQuizIdx].correctAnswer
                        ? "✅ Exact !"
                        : "❌ Explication technique :"}
                    </span>
                    {QUIZ_QUESTIONS[currentQuizIdx].explanation}
                  </div>
                )}

                {/* Stepper Controls */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <button
                    type="button"
                    disabled={currentQuizIdx === 0}
                    onClick={() => setCurrentQuizIdx(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    ← Précédent
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuizIdx < QUIZ_QUESTIONS.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentQuizIdx(prev => prev + 1)}
                        className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-all cursor-pointer"
                      >
                        Suivant →
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuizFinished(true)}
                        className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all shadow-sm cursor-pointer"
                      >
                        Voir le Bilan Final ✓
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Summary / Result View */
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] mx-auto flex items-center justify-center font-serif text-2xl font-bold">
                  {calculateScore()} / {QUIZ_QUESTIONS.length}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-neutral-100">
                    {calculateScore() >= 4
                      ? "Félicitations ! Notions théoriques validées."
                      : "Bon début d'apprentissage !"}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto">
                    {calculateScore() >= 4
                      ? "Vous maîtrisez parfaitement les 5 grands organes et la chaîne cinématique. Vous êtes prêt pour le Module 02 sur le Barillet."
                      : "Prenez le temps de revoir les phases de l'échappement et le calcul d'isochronisme avant de poursuivre."}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentQuizIdx(0);
                      setQuizFinished(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    Revoir mes réponses
                  </button>

                  <button
                    type="button"
                    onClick={resetQuiz}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#B08D57] text-neutral-950 hover:bg-[#9c7b48] transition-all cursor-pointer shadow-sm"
                  >
                    Recommencer le quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =================================================================== */}
        {/* BOTTOM NAVIGATION BAR */}
        {/* =================================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Retour au Sommaire Théorique</span>
          </Link>

          <Link
            href="/theorie/barillet-ressort-moteur"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-sm"
          >
            <span>Module 02 : Le Barillet et le Ressort Moteur</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
