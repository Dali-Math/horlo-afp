// src/app/outils/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Calculator,
  Compass,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Layers,
  Activity,
  ShieldCheck,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Search,
  Copy,
  Check,
  Hammer,
  Gauge,
  Clock,
  Zap,
  Award
} from 'lucide-react';

// --- TYPES ---
interface DiagnosticProblem {
  id: number;
  cat: 'marche' | 'echappement' | 'remontage' | 'complications';
  symptom: string;
  cause: string;
  solution: string;
  tools: string[];
  time: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';
}

interface TorqueItem {
  component: string;
  calibres: string;
  torque: string;
  blade: string;
  risk: string;
  gesture: string;
  category: 'all' | 'eta2824' | 'valjoux7750' | 'eta6497' | 'rolex3135';
}

export default function OutilsPage() {
  const [activeTab, setActiveTab] = useState<
    'diagnostic' | 'couples' | 'amplitude' | 'calculateurs' | 'cosc' | 'brucelles'
  >('diagnostic');

  // =========================================================================
  // 1. DIAGNOSTICS D'ATELIER (12 CAS RÉELS)
  // =========================================================================
  const [diagSearch, setDiagSearch] = useState('');
  const [diagCategory, setDiagCategory] = useState<'all' | 'marche' | 'echappement' | 'remontage' | 'complications'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const diagnosticsData: DiagnosticProblem[] = [
    {
      id: 1,
      cat: 'marche',
      symptom: "Avance brutale (+5 min à +2 h par jour)",
      cause: "Spiral magnétisé ou spires gommées collées par de l'huile projetée.",
      solution: "1. Passer au démagnétiseur professionnel (tunnel). 2. Si persistance, dégraisser le balancier-spiral à la benzine dans une coupelle agate.",
      tools: ["Démagnétiseur Bergeon", "Essence C / One-Dip", "Brucelles N°5"],
      time: "15 - 30 min",
      level: "Intermédiaire"
    },
    {
      id: 2,
      cat: 'echappement',
      symptom: "Chute brutale d'amplitude en position verticale (> 50° de perte)",
      cause: "Pivots de balancier tordus, usés ou huilage de contre-pivot sec/gommé.",
      solution: "Démonter les antichocs (Incabloc/Kif), nettoyer les contre-pivots, déposer une goutte calibrée de Moebius 9010 (diamètre 2/3 du contre-pivot).",
      tools: ["Pique-huile fin (noir)", "Moebius 9010", "Pince à Incabloc"],
      time: "45 min",
      level: "Avancé"
    },
    {
      id: 3,
      cat: 'marche',
      symptom: "Défaut de repère excessif au Witschi (Beat Error > 1.5 ms)",
      cause: "La cheville de plateau n'est pas centrée sur l'axe reliant le balancier et l'ancre au repos.",
      solution: "Ajuster le porte-piton mobile pour ramener le repère entre 0.0 et 0.3 ms. Sur balancier vintage, pivoter la virole.",
      tools: ["Micro-tournevis", "Timegrapher / Micro acoustique"],
      time: "10 - 20 min",
      level: "Débutant"
    },
    {
      id: 4,
      cat: 'echappement',
      symptom: "Bruit de galop accéléré & amplitude > 325° (Rebatement / Knocking)",
      cause: "Ressort-moteur trop fort (bride trop épaisse) ou impulsion excessive. La cheville heurte l'extérieur des cornes d'ancre.",
      solution: "Remplacer le ressort de barillet par la référence exacte aux cotes d'origine (épaisseur e réduite).",
      tools: ["Pied à coulisse horloger", "Extracteur d'estrapade"],
      time: "1 - 2 h",
      level: "Avancé"
    },
    {
      id: 5,
      cat: 'remontage',
      symptom: "La couronne tourne dans le vide au remontage manuel",
      cause: "Tige de remontoir cassée, pignon coulant désengagé ou tirette dévissée.",
      solution: "Déposer le pont de tigerie, vérifier la clavette de tirette, le ressort sautoir et la denture Bréguet du pignon de remontoir.",
      tools: ["Tournevis 1.00 mm", "Brucelles N°3", "Graisse 9504"],
      time: "30 - 45 min",
      level: "Intermédiaire"
    },
    {
      id: 6,
      cat: 'complications',
      symptom: "Arrêt net de la montre entre 23h45 et 00h15",
      cause: "Manque de couple pour passer le sautoir de date, came encrassée ou doigt de quantième mal indexé.",
      solution: "Vérifier le couple de roue des heures, nettoyer et lubrifier le galet et le sautoir de date à la graisse HP1300.",
      tools: ["Moebius HP1300", "Brucelles laiton"],
      time: "45 min",
      level: "Intermédiaire"
    },
    {
      id: 7,
      cat: 'complications',
      symptom: "Les aiguilles tournent librement sans résistance (mise à l'heure molle)",
      cause: "Lanternage de chaussée trop lâche (manque de friction sur le pignon de centre).",
      solution: "Resserrer délicatement le pincement de la chaussée à l'aide d'un pointeau à lanterner en insérant une cheville acier de sécurité.",
      tools: ["Pointeau à lanterner", "Cheville acier calibrée"],
      time: "30 min",
      level: "Expert"
    },
    {
      id: 8,
      cat: 'remontage',
      symptom: "Le rotor automatique tourne à grande vitesse lors du remontage manuel",
      cause: "Roues inverseuses gommées (les cliquets microscopiques intérieurs ne débrayent plus).",
      solution: "Tremper les roues inverseuses dans du Lubeta V105 ou solvant dédié. Ne jamais huiler au pique-huile classique !",
      tools: ["Lubeta V105", "Bain de trempage"],
      time: "20 min",
      level: "Avancé"
    },
    {
      id: 9,
      cat: 'marche',
      symptom: "Tracé Witschi instable avec deux lignes qui divergent ou ondulent",
      cause: "Roue d'échappement voilée, dent tordue ou ébat de pivot irrégulier.",
      solution: "Inspecter les 15 dents de la roue d'échappement sous binoculaire x20. Remplacer la roue si une pointe d'impulsion est émoussée.",
      tools: ["Binoculaire", "Brucelles N°5 Dumont"],
      time: "1 h",
      level: "Expert"
    },
    {
      id: 10,
      cat: 'echappement',
      symptom: "La montre s'arrête dès qu'elle est retournée (Cadran Bas)",
      cause: "Pivot supérieur ou inférieur de balancier cassé ; l'axe ne repose plus que sur un moignon de pivot.",
      solution: "Remplacement complet de l'axe de balancier sur potence à river ou échange standard du balancier complet monté sur pont.",
      tools: ["Potence Seitz / Horia", "Pointeaux de rivetage"],
      time: "2 - 3 h",
      level: "Expert"
    },
    {
      id: 11,
      cat: 'remontage',
      symptom: "Bruit sec de dérapage métallique au fond du boîtier après 15 tours de remontoir",
      cause: "Bride glissante de barillet automatique qui décroche trop tôt (manque de graisse de freinage sur le tambour).",
      solution: "Nettoyer l'intérieur du tambour de barillet et appliquer 3 touches de graisse de freinage Klüber P125 sur les parois.",
      tools: ["Graisse Klüber P125", "Pique-huile"],
      time: "45 min",
      level: "Intermédiaire"
    },
    {
      id: 12,
      cat: 'complications',
      symptom: "L'aiguille des secondes du chronographe sautille au démarrage",
      cause: "Pénétration d'engrenage trop faible entre la roue de seconde et la roue entraîneuse de chronographe.",
      solution: "Régler l'excentrique d'embrayage pour assurer un engagement d'environ 1/3 de la hauteur des dents.",
      tools: ["Tournevis fin", "Loupe x12"],
      time: "20 min",
      level: "Avancé"
    }
  ];

  const filteredDiagnostics = useMemo(() => {
    return diagnosticsData.filter((d) => {
      const matchCat = diagCategory === 'all' || d.cat === diagCategory;
      const search = diagSearch.toLowerCase();
      const matchSearch =
        d.symptom.toLowerCase().includes(search) ||
        d.cause.toLowerCase().includes(search) ||
        d.solution.toLowerCase().includes(search);
      return matchCat && matchSearch;
    });
  }, [diagCategory, diagSearch]);

  const handleCopyDiagnostic = (d: DiagnosticProblem) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(`SYMPTÔME : ${d.symptom}\nCAUSE : ${d.cause}\nPROTOCOLE : ${d.solution}`);
      setCopiedId(d.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // =========================================================================
  // 2. COUPLES DE SERRAGE & TOURNEVIS
  // =========================================================================
  const [torqueFilter, setTorqueFilter] = useState<'all' | 'eta2824' | 'valjoux7750' | 'eta6497' | 'rolex3135'>('all');

  const torqueData: TorqueItem[] = [
    {
      component: "Vis de Pont de Balancier (Coq)",
      calibres: "ETA 2824, 7750, 6497, Rolex 3135",
      torque: "1.8 - 2.5 cNm",
      blade: "Ø 1.00 mm (Noir)",
      risk: "Cisaillement de la vis dans la platine (irrécupérable sans acide)",
      gesture: "Approche douce jusqu'au contact, puis blocage sec sur 1/8e de tour.",
      category: "eta2824"
    },
    {
      component: "Vis de Rochet sur Arbre de Barillet",
      calibres: "ETA 2824-2, 6497-1, 7750",
      torque: "3.5 - 5.0 cNm",
      blade: "Ø 1.40 mm (Gris)",
      risk: "Rochet qui se desserre lors du remontage automatique / manuel",
      gesture: "Vis à pas à gauche sur certains calibres vintage. Toujours vérifier le sens !",
      category: "eta2824"
    },
    {
      component: "Vis de Roue de Couronne",
      calibres: "ETA 2824, 6497",
      torque: "2.5 - 3.5 cNm",
      blade: "Ø 1.20 mm (Rouge)",
      risk: "Blocage de la roue de couronne si la vis est trop serrée sans bague",
      gesture: "Attention : Filetage souvent à GAUCHE (vis marquée de traits ou de creux).",
      category: "eta2824"
    },
    {
      component: "Vis de Fixation de Masse Oscillante (Rotor)",
      calibres: "ETA 2824, 7750, SW200",
      torque: "3.0 - 4.5 cNm",
      blade: "Ø 1.60 mm (Violet)",
      risk: "Rotor qui se détache et raye les ponts décorés",
      gesture: "Serrage ferme avec tournevis parfaitement affûté pour ne pas marquer la fente.",
      category: "valjoux7750"
    },
    {
      component: "Vis de Pont de Rouage",
      calibres: "Standard NIHS, Tous Calibres",
      torque: "1.5 - 2.2 cNm",
      blade: "Ø 1.00 mm (Noir)",
      risk: "Pincement des pivots de roues si le pont est mal engagé",
      gesture: "Vérifier la liberté de rotation (ébat) avant le serrage final !",
      category: "all"
    },
    {
      component: "Vis de Pont d'Ancre",
      calibres: "Standard NIHS, Tous Calibres",
      torque: "1.0 - 1.6 cNm",
      blade: "Ø 0.80 mm (Jaune)",
      risk: "Rupture immédiate des pivots d'ancre (extrêmement fins, ~0.08 mm)",
      gesture: "Toucher ultra-léger. Ne jamais forcer. L'ancre doit battre librement.",
      category: "all"
    },
    {
      component: "Vis de Fixation Boîtier (Brides d'Emboîtage)",
      calibres: "Tous Calibres",
      torque: "2.0 - 3.0 cNm",
      blade: "Ø 1.20 mm (Rouge)",
      risk: "Déformation de la bride ou arrachement du filet de boîte",
      gesture: "Serrage symétrique alterné entre les deux brides.",
      category: "all"
    },
    {
      component: "Vis de Piton de Spiral",
      calibres: "ETA 2824, 6497, Rolex 3135",
      torque: "0.6 - 1.0 cNm",
      blade: "Ø 0.60 mm (Blanc)",
      risk: "Écrasement du piton ou déformation de la virole",
      gesture: "Serrage de maintien très doux. Le piton ne doit pas tourner.",
      category: "eta2824"
    }
  ];

  const filteredTorque = useMemo(() => {
    return torqueData.filter((t) => torqueFilter === 'all' || t.category === torqueFilter || t.category === 'all');
  }, [torqueFilter]);

  // =========================================================================
  // 3. AMPLITUDE & REBATEMENT (WITSCHI ANALYSIS)
  // =========================================================================
  const [ampPlat, setAmpPlat] = useState<number>(295);
  const [ampPendu, setAmpPendu] = useState<number>(260);
  const [liftAngle, setLiftAngle] = useState<number>(52);
  const [beatError, setBeatError] = useState<number>(0.2);

  const deltaAmp = ampPendu - ampPlat;
  const gaugePercent = Math.min(100, Math.max(0, ((ampPlat - 150) / 200) * 100));

  const amplitudeVerdict = useMemo(() => {
    if (ampPlat >= 320) {
      return {
        title: "ALERTE : Rebatement Détecté (Knocking)",
        badge: "DANGER REBATEMENT",
        badgeColor: "bg-red-500/10 text-red-500 border-red-500/30",
        titleColor: "text-red-500",
        rebatStatus: "CRITIQUE (> 320°)",
        rebatColor: "text-red-500",
        advice: "L'amplitude dépasse 320°. La cheville de plateau percute l'extérieur des cornes de l'ancre à chaque alternance. Action : La bride glissante ou le ressort de barillet est trop puissant. Remplacer par un ressort d'épaisseur inférieure ou contrôler l'huilage des parois du tambour."
      };
    }
    if (ampPlat < 220) {
      return {
        title: "Amplitude Insuffisante (Frottements Anormaux)",
        badge: "RÉVISION NÉCESSAIRE",
        badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
        titleColor: "text-amber-500",
        rebatStatus: "Néant (0%)",
        rebatColor: "text-slate-500 dark:text-slate-400",
        advice: "L'amplitude à plat est inférieure à 220°. Causes probables : huile gommée sur les contre-pivots de balancier, pivots encrassés, ébat de pont de rouage trop serré ou ressort de barillet fatigué."
      };
    }
    if (Math.abs(deltaAmp) > 45) {
      return {
        title: "Chute Verticale Excessive (Pivots ou Huilage)",
        badge: "DÉSÉQUILIBRE VERTICAL",
        badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/30",
        titleColor: "text-amber-500",
        rebatStatus: "Néant (0%)",
        rebatColor: "text-emerald-500",
        advice: `La perte de ${Math.abs(deltaAmp)}° entre horizontal et vertical dépasse le seuil normal (30°-40°). Vérifier l'état de surface des pivots de balancier et s'assurer que le contre-pivot n'est pas sec de Moebius 9010.`
      };
    }
    return {
      title: "Isochronisme & Amplitude Excellents",
      badge: "CONFORME MANUFACTURE",
      badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
      titleColor: "text-emerald-500",
      rebatStatus: "Néant (0%)",
      rebatColor: "text-emerald-500",
      advice: `Le balancier oscille dans la fenêtre idéale (${ampPlat}° à plat, chute de ${Math.abs(deltaAmp)}° au pendu). Le défaut de repère de ${beatError.toFixed(1)} ms est parfaitement toléré. Prêt pour le test 24h.`
    };
  }, [ampPlat, deltaAmp, beatError]);

  // =========================================================================
  // 4. CALCULATEURS D'ATELIER (LIGNES, HZ & RÉSERVE)
  // =========================================================================
  const [inputLignes, setInputLignes] = useState<string>('16.5');
  const [inputMm, setInputMm] = useState<string>('36.60');

  const handleLignesChange = (val: string) => {
    setInputLignes(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setInputMm((num * 2.2558291).toFixed(2));
    } else {
      setInputMm('');
    }
  };

  const handleMmChange = (val: string) => {
    setInputMm(val);
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setInputLignes((num / 2.2558291).toFixed(2));
    } else {
      setInputLignes('');
    }
  };

  const [freqHz, setFreqHz] = useState<number>(4);
  const freqCalculations = useMemo(() => {
    const alternancesParHeure = Math.round(freqHz * 2 * 3600);
    const alternancesParSeconde = Math.round(freqHz * 2);
    const periodeMs = Number((1000 / freqHz).toFixed(1));
    const demiPeriodeMs = Number((500 / freqHz).toFixed(1));

    let calibreExemple = 'Calibres de poche & ETA 6497-1 (Unitas)';
    if (freqHz === 3) calibreExemple = 'Calibres vintage 1960 & Patek Philippe 240';
    if (freqHz === 4) calibreExemple = 'Standard moderne suisse (ETA 2824-2, Rolex 3135/3235)';
    if (freqHz === 5) calibreExemple = 'Haute Fréquence : Zenith El Primero (mesure au 1/10e s)';
    if (freqHz === 10) calibreExemple = 'Ultra Fréquence : Breguet Classique Chronométrie 7727';

    return {
      alternancesParHeure,
      alternancesParSeconde,
      periodeMs,
      demiPeriodeMs,
      calibreExemple
    };
  }, [freqHz]);

  const [barrelTurns, setBarrelTurns] = useState<number>(7.5);
  const [ratioWheel, setRatioWheel] = useState<number>(6.5);
  const calculatedAutonomy = useMemo(() => {
    const hours = Math.round(barrelTurns * ratioWheel);
    const days = (hours / 24).toFixed(1);
    return { hours, days };
  }, [barrelTurns, ratioWheel]);

  // =========================================================================
  // 5. CONTRÔLE OFFICIEL COSC (NORME ISO 3159)
  // =========================================================================
  const [coscCh, setCoscCh] = useState<number>(1.5);
  const [coscCb, setCoscCb] = useState<number>(2.0);
  const [cosc6h, setCosc6h] = useState<number>(3.5);
  const [cosc9h, setCosc9h] = useState<number>(2.5);
  const [cosc3h, setCosc3h] = useState<number>(1.0);

  const coscResults = useMemo(() => {
    const positions = [coscCh, coscCb, cosc6h, cosc9h, cosc3h];
    const m = positions.reduce((a, b) => a + b, 0) / 5;
    const variations = [
      Math.abs(coscCb - coscCh),
      Math.abs(cosc6h - coscCb),
      Math.abs(cosc9h - cosc6h),
      Math.abs(cosc3h - cosc9h)
    ];
    const v = variations.reduce((a, b) => a + b, 0) / 4;
    const maxVal = Math.max(...positions);
    const minVal = Math.min(...positions);
    const vmax = maxVal - minVal;
    const d = cosc6h - coscCh;
    const p = Math.max(...positions.map((val) => Math.abs(val - m)));

    const okM = m >= -4.0 && m <= 6.0;
    const okV = v <= 2.0;
    const okVmax = vmax <= 10.0;
    const okD = d >= -6.0 && d <= 8.0;
    const okP = p <= 10.0;
    const allOk = okM && okV && okVmax && okD && okP;

    return { m, v, vmax, d, p, okM, okV, okVmax, okD, okP, allOk };
  }, [coscCh, coscCb, cosc6h, cosc9h, cosc3h]);

  const applyCoscPreset = (type: 'chronometre' | 'ecart' | 'refuse') => {
    if (type === 'chronometre') {
      setCoscCh(1.5);
      setCoscCb(2.0);
      setCosc6h(3.5);
      setCosc9h(2.5);
      setCosc3h(1.0);
    } else if (type === 'ecart') {
      setCoscCh(0.0);
      setCoscCb(1.0);
      setCosc6h(9.5);
      setCosc9h(7.0);
      setCosc3h(6.0);
    } else {
      setCoscCh(-6.5);
      setCoscCb(-5.0);
      setCosc6h(7.5);
      setCosc9h(4.0);
      setCosc3h(-2.0);
    }
  };

  // =========================================================================
  // 6. BRUCELLES DUMONT SUISSE DATA
  // =========================================================================
  const BRUCELLES_DATA = [
    {
      ref: "Dumont N° 1",
      title: "Brucelle Standard d'Atelier",
      alloy: "Acier Inox antimagnétique ou Carbolex",
      points: "Pointes robustes biseautées (0.20 mm)",
      application: "Manipulation des ponts, barillets, roues de moyenne et travaux d'assemblage général.",
      caution: "Ne jamais utiliser sur le spiral sous peine de le tordre."
    },
    {
      ref: "Dumont N° 3",
      title: "Brucelle Fine de Rhabillage",
      alloy: "Inox antimagnétique haute élasticité",
      points: "Pointes demi-fines élancées (0.12 mm)",
      application: "Prise des mobiles de seconde, échappement, ancre et amortisseurs Incabloc.",
      caution: "Garder les becs parfaitement parallèles en les affûtant régulièrement à la pierre d'Arkansas."
    },
    {
      ref: "Dumont N° 5",
      title: "Brucelle de Précision pour Spiral",
      alloy: "Dumont Dumoxel antimagnétique 100%",
      points: "Pointes ultra-fines aiguilles (0.04 mm)",
      application: "Travail exclusif sur le balancier-spiral, virolage, redressage du plat et du rond.",
      caution: "À réserver strictement au spiral. Une seule chute sur l'établi détruit irrémédiablement les pointes."
    },
    {
      ref: "Brucelles en Laiton (Brass)",
      title: "Brucelle Douce Anti-Rayures",
      alloy: "Laiton horloger massif",
      points: "Pointes polies tendres",
      application: "Pose des roues dorées, ponts perlés et vis bleuies sans laisser la moindre micro-rayure.",
      caution: "Le laiton est plus tendre que l'acier : nettoyer fréquemment pour enlever les résidus."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* --- HERO HEADER --- */}
      <section className="relative pt-10 pb-8 border-b border-slate-200 dark:border-white/10 bg-white/70 dark:bg-[#0A0E18]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l&apos;Accueil</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Établi Numérique de Précision • Normes NIHS</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Cockpit &amp; Outils d&apos;Établi Horloger
              </h1>

              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Le banc de travail numérique conçu pour rester ouvert sur votre écran pendant vos révisions. 
                Diagnostic de pannes par symptômes, couples de serrage en cNm, jauge de rebatement Witschi, 
                contrôle chronométrique officiel COSC (ISO 3159) et métrologie d&apos;atelier.
              </p>
            </div>

            {/* Quick Access Pill to Witschi Micro */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/outils/chronocomparateur"
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-mono text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Micro Witschi Live ↗</span>
              </Link>
              <Link
                href="/outils/ebats-ajustements"
                className="px-4 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold hover:bg-amber-500/20 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Ébats &amp; 24 Organes ↗</span>
              </Link>
            </div>
          </div>

          {/* Onglets de navigation des 5 Postes */}
          <div className="flex overflow-x-auto gap-2 mt-8 pt-6 border-t border-slate-200 dark:border-white/10 no-scrollbar">
            {[
              { id: 'diagnostic', label: '1. Diagnostic Pannes', sub: '12 Cas d\'Atelier' },
              { id: 'couples', label: '2. Couples de Serrage', sub: 'cNm & Tournevis' },
              { id: 'amplitude', label: '3. Amplitude & Rebatement', sub: 'Analyse Witschi' },
              { id: 'calculateurs', label: '4. Métrologie Express', sub: 'Lignes, Hz & Réserve' },
              { id: 'cosc', label: '5. Contrôle COSC', sub: 'Norme ISO 3159' },
              { id: 'brucelles', label: '6. Brucelles Dumont', sub: 'N° 1 à 5 & Laiton' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-2xl text-left transition-all shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-white dark:bg-[#0D121F] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-amber-500'
                }`}
              >
                <div className="text-xs sm:text-sm font-semibold">{tab.label}</div>
                <div className={`text-[10px] font-mono ${activeTab === tab.id ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                  {tab.sub}
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* --- CONTENU DU MODULE ACTIF --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* ========================================================================= */}
        {/* POSTE 1 : DIAGNOSTIC DE PANNES D'ATELIER */}
        {/* ========================================================================= */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-6">
            
            {/* Barre de Recherche & Filtres */}
            <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm transition-colors">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={diagSearch}
                    onChange={(e) => setDiagSearch(e.target.value)}
                    placeholder="Rechercher symptôme (avance, arrêt, repère, rebatement, date)..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono focus:outline-none focus:border-amber-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {(
                    [
                      { id: 'all', label: 'Tous (12)' },
                      { id: 'marche', label: 'Marche & Witschi' },
                      { id: 'echappement', label: 'Échappement & Spiral' },
                      { id: 'remontage', label: 'Remontage & Réserve' },
                      { id: 'complications', label: 'Date & Aiguillage' }
                    ] as const
                  ).map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setDiagCategory(btn.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                        diagCategory === btn.id
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Grille des Diagnostics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDiagnostics.map((d) => {
                let levelColor = 'text-emerald-500 bg-emerald-500/10';
                if (d.level === 'Intermédiaire') levelColor = 'text-amber-500 bg-amber-500/10';
                if (d.level === 'Avancé') levelColor = 'text-blue-500 bg-blue-500/10';
                if (d.level === 'Expert') levelColor = 'text-red-500 bg-red-500/10';

                return (
                  <div
                    key={d.id}
                    className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-3">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${levelColor}`}>
                          {d.level}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{d.time}</span>
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
                        {d.symptom}
                      </h3>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/60 dark:border-white/5 text-xs font-mono mb-3 space-y-1.5">
                        <div className="text-slate-500 dark:text-slate-400">
                          <strong className="text-amber-600 dark:text-amber-400">Cause :</strong> {d.cause}
                        </div>
                        <div className="text-slate-700 dark:text-slate-300">
                          <strong className="text-emerald-600 dark:text-emerald-400">Protocole :</strong> {d.solution}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span className="truncate max-w-[200px]" title={d.tools.join(', ')}>
                        Outils : {d.tools.join(', ')}
                      </span>
                      <button
                        onClick={() => handleCopyDiagnostic(d)}
                        className="text-amber-600 dark:text-amber-400 hover:opacity-80 font-bold ml-2 shrink-0 flex items-center gap-1"
                      >
                        {copiedId === d.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copié</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* POSTE 2 : COUPLES DE SERRAGE & TOURNEVIS */}
        {/* ========================================================================= */}
        {activeTab === 'couples' && (
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm transition-colors space-y-6">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-amber-500">🔩</span> Couples de Serrage Officiels en Atelier
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Valeurs en centinewton-mètres (cNm ou cN·m) et correspondance avec le code couleur suisse des tournevis Bergeon / Horotec.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Filtrer par Calibre :</span>
                <select
                  value={torqueFilter}
                  onChange={(e) => setTorqueFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 focus:outline-none"
                >
                  <option value="all">Tous les Organes Suisses (Standard NIHS)</option>
                  <option value="eta2824">ETA 2824-2 / SW200 (Automatique)</option>
                  <option value="valjoux7750">Valjoux 7750 (Chronographe)</option>
                  <option value="eta6497">ETA 6497-1 / Unitas (Manuel 16½ lignes)</option>
                  <option value="rolex3135">Rolex Calibre 3135 / 3235</option>
                </select>
              </div>
            </div>

            {/* Code Couleur Standard Tournevis */}
            <div className="py-2 border-b border-slate-200 dark:border-white/10">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-2">
                Code Couleur Standard Tournevis d&apos;Atelier (Lame en mm) :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-center text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-orange-500 mb-1" />
                  <span className="font-bold">Ø 0.50</span> mm <br />
                  <span className="text-[10px] text-slate-500">Orange</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-white border border-slate-300 dark:border-slate-600 mb-1" />
                  <span className="font-bold">Ø 0.60</span> mm <br />
                  <span className="text-[10px] text-slate-500">Blanc</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-yellow-400 mb-1" />
                  <span className="font-bold">Ø 0.80</span> mm <br />
                  <span className="text-[10px] text-slate-500">Jaune</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-black border border-white/20 mb-1" />
                  <span className="font-bold">Ø 1.00</span> mm <br />
                  <span className="text-[10px] text-slate-500">Noir (Ponts)</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-red-600 mb-1" />
                  <span className="font-bold">Ø 1.20</span> mm <br />
                  <span className="text-[10px] text-slate-500">Rouge (Barillet)</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-gray-400 mb-1" />
                  <span className="font-bold">Ø 1.40</span> mm <br />
                  <span className="text-[10px] text-slate-500">Gris (Rochet)</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="w-full h-2 rounded bg-purple-600 mb-1" />
                  <span className="font-bold">Ø 1.60</span> mm <br />
                  <span className="text-[10px] text-slate-500">Violet (Masse)</span>
                </div>
              </div>
            </div>

            {/* Tableau des couples */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Organe / Vis</th>
                    <th className="py-3 px-3">Calibres Types</th>
                    <th className="py-3 px-3">Couple Recommandé</th>
                    <th className="py-3 px-3">Tournevis Recommandé</th>
                    <th className="py-3 px-3">Risque si Dépassement</th>
                    <th className="py-3 px-3">Geste d&apos;Atelier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {filteredTorque.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{t.component}</td>
                      <td className="py-3 px-3 text-slate-500">{t.calibres}</td>
                      <td className="py-3 px-3 font-bold text-amber-600 dark:text-amber-400">{t.torque}</td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{t.blade}</td>
                      <td className="py-3 px-3 text-red-500">{t.risk}</td>
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{t.gesture}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* POSTE 3 : AMPLITUDE & REBATEMENT (WITSCHI) */}
        {/* ========================================================================= */}
        {activeTab === 'amplitude' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Colonne Saisie */}
            <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm transition-colors space-y-5">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-amber-500">⏱️</span> Mesures au Chronocomparateur
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Entrez vos relevés Witschi pour évaluer instantanément la santé de l&apos;échappement.
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Angle de Levée (Lift Angle) :</label>
                  <span className="text-xs font-mono font-bold text-amber-500">{liftAngle}°</span>
                </div>
                <input
                  type="range"
                  min="44"
                  max="58"
                  value={liftAngle}
                  onChange={(e) => setLiftAngle(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Standard ETA 2824: 50° • Valjoux 7750: 52° • 6497: 44° • Rolex 3135: 52°
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Amplitude Horizontale (CH / CB) :</label>
                  <span className="text-xs font-mono font-bold text-emerald-500">{ampPlat}°</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="360"
                  value={ampPlat}
                  onChange={(e) => setAmpPlat(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Amplitude Verticale (Pendu 6H / 9H) :</label>
                  <span className="text-xs font-mono font-bold text-blue-500">{ampPendu}°</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="340"
                  value={ampPendu}
                  onChange={(e) => setAmpPendu(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Défaut de Repère (Beat Error) :</label>
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">{beatError.toFixed(1)} ms</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4.0"
                  step="0.1"
                  value={beatError}
                  onChange={(e) => setBeatError(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

            </div>

            {/* Colonne Diagnostic & Verdict */}
            <div className="lg:col-span-2 bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm transition-colors flex flex-col justify-between">
              
              <div className="space-y-6">
                
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Verdict Diagnostique Witschi</span>
                    <h3 className={`text-xl font-bold mt-0.5 ${amplitudeVerdict.titleColor}`}>
                      {amplitudeVerdict.title}
                    </h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border self-start sm:self-auto ${amplitudeVerdict.badgeColor}`}>
                    {amplitudeVerdict.badge}
                  </div>
                </div>

                {/* Jauge d'Amplitude Dynamique */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-red-500">Frottement &lt; 200°</span>
                    <span className="text-amber-500">Faible 220°</span>
                    <span className="text-emerald-500 font-bold">Optimal 270°-310°</span>
                    <span className="text-red-500 font-bold">Rebatement &gt; 325°</span>
                  </div>
                  <div className="w-full h-4 bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden p-0.5 flex relative">
                    <div className="h-full bg-red-500/20 w-[25%] rounded-l-full" />
                    <div className="h-full bg-amber-500/20 w-[15%]" />
                    <div className="h-full bg-emerald-500/30 w-[45%]" />
                    <div className="h-full bg-red-500/30 w-[15%] rounded-r-full" />
                    <div
                      className="absolute top-0 bottom-0 w-2.5 bg-amber-400 rounded-full shadow-lg border border-white dark:border-black transition-all duration-300"
                      style={{ left: `calc(${gaugePercent}% - 5px)` }}
                    />
                  </div>
                </div>

                {/* 3 KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Chute Plat ➔ Pendu</span>
                    <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{deltaAmp}°</div>
                    <span className="text-[11px] text-emerald-500 mt-1 block">
                      {Math.abs(deltaAmp) <= 45 ? 'Normal (Friction cylindrique)' : 'Excessif (Vérifier pivots)'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Risque de Rebatement</span>
                    <div className={`text-xl font-bold font-mono ${amplitudeVerdict.rebatColor}`}>{amplitudeVerdict.rebatStatus}</div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      {ampPlat < 320 ? 'Pas de choc sur cornes d\'ancre' : 'Cheville percute cornes'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Symétrie d&apos;Impulsion</span>
                    <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{beatError.toFixed(1)} ms</div>
                    <span className="text-[11px] text-emerald-500 mt-1 block">
                      {beatError <= 0.5 ? 'Centrage optimal' : 'Ajuster porte-piton'}
                    </span>
                  </div>

                </div>

                {/* Recommandation */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-2 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
                    Geste Horloger Recommandé :
                  </span>
                  <p>{amplitudeVerdict.advice}</p>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                <span>Correction d&apos;angle : <code>Amp_réelle = Amp_mesurée × sin(θ_réel/2) / sin(θ_étalon/2)</code></span>
                <button onClick={() => setActiveTab('cosc')} className="text-amber-500 hover:underline">
                  Vérifier Normes COSC ➔
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* POSTE 4 : MÉTROLOGIE EXPRESS (LIGNES, HZ & RÉSERVE) */}
        {/* ========================================================================= */}
        {activeTab === 'calculateurs' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LIGNES SUISSES */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-white/10 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                      Norme NIHS 01-01
                    </span>
                    <span className="text-xs">🇨🇭</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Lignes Suisses &harr; Millimètres
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    1 Ligne suisse (&apos;&apos;&apos;) = 2.2558291 mm. Norme universelle de mesure de diamètre d&apos;encageage.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Lignes Horlogères (&apos;&apos;&apos;)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={inputLignes}
                      onChange={(e) => handleLignesChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono text-lg font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex justify-center">
                    <span className="text-xs font-mono text-amber-500">&uarr;&darr; Conversion Directe</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Millimètres (mm)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputMm}
                      onChange={(e) => handleMmChange(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono text-lg font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono text-amber-700 dark:text-amber-400">
                  Exemple : Un calibre 16½ lignes (ETA 6497 Unitas) équivaut à 36.60 mm.
                </div>
              </div>

              {/* FRÉQUENCE HZ <-> A/H */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-white/10 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-500">
                      Chronométrie NIHS 91-10
                    </span>
                    <Activity className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Fréquence &harr; Alternances (A/h)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Déterminez la période d&apos;oscillation, la demi-période et la résolution chronographique.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-slate-600 dark:text-slate-400">Fréquence du Balancier :</span>
                      <span className="font-bold text-emerald-500">{freqHz} Hz</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[2.5, 3, 4, 5, 10].map((hz) => (
                        <button
                          key={hz}
                          onClick={() => setFreqHz(hz)}
                          className={`py-2 rounded-xl text-xs font-mono font-bold transition ${
                            freqHz === hz
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                          }`}
                        >
                          {hz} Hz
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Alternances / Heure :</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {freqCalculations.alternancesParHeure.toLocaleString()} A/h
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Alternances / Seconde :</span>
                      <span className="font-bold text-emerald-500">
                        {freqCalculations.alternancesParSeconde} battements
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Période Complète (T) :</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {freqCalculations.periodeMs} ms
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  {freqCalculations.calibreExemple}
                </div>
              </div>

              {/* RÉSERVE DE MARCHE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-white/10 shadow-xl space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-500">
                      Ressort Moteur &amp; Rouages
                    </span>
                    <Gauge className="w-4 h-4 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Autonomie &amp; Barillet
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Autonomie théorique calculée d&apos;après le nombre de tours de développement du ressort.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Tours Utiles du Barillet :</span>
                      <span className="font-bold text-blue-500">{barrelTurns} tours</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="12"
                      step="0.5"
                      value={barrelTurns}
                      onChange={(e) => setBarrelTurns(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-600 dark:text-slate-400">Rapport vers Roue de Centre :</span>
                      <span className="font-bold text-blue-500">1 : {ratioWheel}</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="10"
                      step="0.5"
                      value={ratioWheel}
                      onChange={(e) => setRatioWheel(parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center font-mono">
                    <span className="text-[10px] uppercase text-blue-600 dark:text-blue-400 block mb-1">
                      Réserve de Marche Estimée
                    </span>
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                      {calculatedAutonomy.hours} Heures
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      (soit environ {calculatedAutonomy.days} jours d&apos;autonomie)
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-500">
                  Formule : Heures = Tours de barillet &times; Rapport de roue des heures (1 tour = 1 h).
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* POSTE 5 : CONTRÔLE OFFICIEL COSC (NORME ISO 3159) */}
        {/* ========================================================================= */}
        {activeTab === 'cosc' && (
          <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm transition-colors space-y-6">
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 dark:border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-red-600/10 border border-red-600/30 text-red-600 dark:text-red-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <span>🇨🇭 Standard Officiel Suisse • ISO 3159 Catégorie 1</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🏛️</span> Contrôle Chronométrique COSC (5 Positions)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Testez vos relevés de marche (s/j) par rapport aux 5 critères éliminatoires du Contrôle Officiel Suisse des Chronomètres.
                </p>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Préréglages :</span>
                <button
                  onClick={() => applyCoscPreset('chronometre')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all"
                >
                  Calibre Certifié (+2.2 s/j)
                </button>
                <button
                  onClick={() => applyCoscPreset('ecart')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
                >
                  Chute Verticale (+7 s/j)
                </button>
                <button
                  onClick={() => applyCoscPreset('refuse')}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all"
                >
                  Hors Normes (-6.5 s/j)
                </button>
              </div>
            </div>

            {/* 2 Columns Layout : Inputs vs Official Criteria Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1 : 5 Positions Relevés Witschi */}
              <div className="space-y-4 bg-slate-50 dark:bg-black/20 p-5 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                  Marches Diurnes Mesurées (s/j) :
                </span>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">1. CH (Cadran Haut / Plat) :</span>
                    <span className="font-bold text-amber-500">{(coscCh >= 0 ? '+' : '') + coscCh.toFixed(1)} s/j</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={coscCh}
                    onChange={(e) => setCoscCh(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">2. CB (Cadran Bas / Plat) :</span>
                    <span className="font-bold text-amber-500">{(coscCb >= 0 ? '+' : '') + coscCb.toFixed(1)} s/j</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={coscCb}
                    onChange={(e) => setCoscCb(parseFloat(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">3. 6H (Couronne Bas / Pendu) :</span>
                    <span className="font-bold text-blue-500">{(cosc6h >= 0 ? '+' : '') + cosc6h.toFixed(1)} s/j</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={cosc6h}
                    onChange={(e) => setCosc6h(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">4. 9H (Couronne Gauche / Pendu) :</span>
                    <span className="font-bold text-blue-500">{(cosc9h >= 0 ? '+' : '') + cosc9h.toFixed(1)} s/j</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={cosc9h}
                    onChange={(e) => setCosc9h(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-600 dark:text-slate-400 font-bold">5. 3H (Couronne Haut / Pendu) :</span>
                    <span className="font-bold text-blue-500">{(cosc3h >= 0 ? '+' : '') + cosc3h.toFixed(1)} s/j</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="25"
                    step="0.5"
                    value={cosc3h}
                    onChange={(e) => setCosc3h(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-200/50 dark:bg-white/5 text-[11px] font-mono text-slate-500 mt-4">
                  Norme ISO 3159 : Mesures relevées après stabilisation thermique à 23°C (&plusmn;1°C).
                </div>
              </div>

              {/* Column 2 : Results & 5 Official Criteria Table */}
              <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
                
                {/* Global Verdict Banner */}
                <div
                  className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-3 ${
                    coscResults.allOk
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest block">
                      Verdict Métrologique Officiel
                    </span>
                    <h3 className="text-xl font-bold mt-0.5">
                      {coscResults.allOk ? 'CONFORME AU TITRE DE CHRONOMÈTRE' : 'HORS CRITÈRES CHRONOMÉTRIQUES COSC'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {coscResults.allOk
                        ? "Le mouvement respecte l'ensemble des 5 critères d'isochronisme et de marche diurne de la norme ISO 3159."
                        : "Un ou plusieurs écarts dépassent les tolérances officielles de l'observatoire suisse. Retouche de raquette ou équilibrage requis."}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider self-start sm:self-auto shrink-0 shadow-md ${
                      coscResults.allOk
                        ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                        : 'bg-red-500 text-white shadow-red-500/20'
                    }`}
                  >
                    {coscResults.allOk ? '100% CONFORME' : 'NON-CONFORME'}
                  </div>
                </div>

                {/* The Official 5 Criteria Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-2.5 px-3">Critère Officiel ISO 3159</th>
                        <th className="py-2.5 px-3">Tolérance Maximale</th>
                        <th className="py-2.5 px-3">Valeur Calculée</th>
                        <th className="py-2.5 px-3 text-right">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                      
                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 dark:text-white block">1. Marche Diurne Moyenne (M)</strong>
                          <span className="text-[10px] text-slate-400">Moyenne arithmétique des 5 positions</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500">-4.0 à +6.0 s/j</td>
                        <td className={`py-3 px-3 font-bold ${coscResults.okM ? 'text-emerald-500' : 'text-red-500'}`}>
                          {(coscResults.m >= 0 ? '+' : '') + coscResults.m.toFixed(1)} s/j
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              coscResults.okM ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {coscResults.okM ? 'VALIDE' : 'HORS TOLÉRANCE'}
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 dark:text-white block">2. Variation Moyenne (V)</strong>
                          <span className="text-[10px] text-slate-400">Écart moyen d&apos;une position à l&apos;autre</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500">&le; 2.0 s/j</td>
                        <td className={`py-3 px-3 font-bold ${coscResults.okV ? 'text-emerald-500' : 'text-red-500'}`}>
                          {coscResults.v.toFixed(1)} s/j
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              coscResults.okV ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {coscResults.okV ? 'VALIDE' : 'HORS TOLÉRANCE'}
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 dark:text-white block">3. Plus Grand Écart entre Positions (Vmax)</strong>
                          <span className="text-[10px] text-slate-400">Différence absolue Max - Min</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500">&le; 10.0 s/j</td>
                        <td className={`py-3 px-3 font-bold ${coscResults.okVmax ? 'text-emerald-500' : 'text-red-500'}`}>
                          {coscResults.vmax.toFixed(1)} s/j
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              coscResults.okVmax ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {coscResults.okVmax ? 'VALIDE' : 'HORS TOLÉRANCE'}
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 dark:text-white block">4. Différence Plat / Pendu (D)</strong>
                          <span className="text-[10px] text-slate-400">Marche en 6H moins marche en CH</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500">-6.0 à +8.0 s/j</td>
                        <td className={`py-3 px-3 font-bold ${coscResults.okD ? 'text-emerald-500' : 'text-red-500'}`}>
                          {(coscResults.d >= 0 ? '+' : '') + coscResults.d.toFixed(1)} s/j
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              coscResults.okD ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {coscResults.okD ? 'VALIDE' : 'HORS TOLÉRANCE'}
                          </span>
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
                        <td className="py-3 px-3">
                          <strong className="text-slate-900 dark:text-white block">5. Plus Grande Reprise de Marche (P)</strong>
                          <span className="text-[10px] text-slate-400">Écart maximal par rapport à la moyenne M</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500">&le; 10.0 s/j</td>
                        <td className={`py-3 px-3 font-bold ${coscResults.okP ? 'text-emerald-500' : 'text-red-500'}`}>
                          {coscResults.p.toFixed(1)} s/j
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              coscResults.okP ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
                            }`}
                          >
                            {coscResults.okP ? 'VALIDE' : 'HORS TOLÉRANCE'}
                          </span>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Practical Workshop Tip */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-start gap-3">
                  <span className="text-amber-500 text-base">💡</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block">Conseil d&apos;Établi de l&apos;Horloger :</strong>
                    Si la différence Plat / Pendu (D) dépasse +8 s/j, le balancier subit un défaut d&apos;équilibrage dynamique (balourd) ou les goupilles de raquette ne sont pas parfaitement parallèles.
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* POSTE 6 : GUIDE DES BRUCELLES DUMONT */}
        {/* ========================================================================= */}
        {activeTab === 'brucelles' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRUCELLES_DATA.map((b, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
                      {b.ref}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{b.alloy}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{b.title}</h3>
                  <div className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-1">
                    {b.points}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                    {b.application}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-800 dark:text-amber-300">
                  <div className="font-bold uppercase text-[10px] tracking-wider mb-1">
                    ⚠️ Précautions d&apos;Établi :
                  </div>
                  {b.caution}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}
