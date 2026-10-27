'use client';

import React, { useState } from 'react';
import {
  Droplet,
  ZoomIn,
  Layers,
  Clock,
  RefreshCw,
  Crosshair,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Copy,
  Check,
  Database,
  HelpCircle,
  ArrowRight,
  Wrench,
} from 'lucide-react';

type LayerId = 'bridges' | 'dial' | 'auto';
type MapMode = 'study' | 'quiz' | 'data';
type LubricantKey =
  | 'MOEBIUS_9010'
  | 'MOEBIUS_HP1300'
  | 'MOEBIUS_9415'
  | 'MOEBIUS_9504_8217'
  | 'LUBETA_V105'
  | 'NO_OIL';

interface LubricantMeta {
  id: LubricantKey;
  shortName: string;
  fullName: string;
  oiler: string;
  hex: string;
  badgeClass: string;
  viscosity: string;
}

interface EtaPoint {
  id: string;
  code: string;
  layer: LayerId;
  x: number;
  y: number;
  organ: string;
  group: string;
  lubricantId: LubricantKey;
  productLabel: string;
  oiler: string;
  protocol: string;
  watchmakerRule: string;
}

const LUBRICANTS: Record<LubricantKey, LubricantMeta> = {
  MOEBIUS_9010: {
    id: 'MOEBIUS_9010',
    shortName: 'Moebius 9010',
    fullName: 'Moebius Synt-A-Lube 9010 (Synthétique fluide)',
    oiler: 'Pique-huile Noir (Ø 0.08 mm)',
    hex: '#38BDF8',
    badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    viscosity: '150 cSt à 20°C',
  },
  MOEBIUS_HP1300: {
    id: 'MOEBIUS_HP1300',
    shortName: 'Moebius HP-1300',
    fullName: 'Moebius Synt-HP-1300 (Haute Pression)',
    oiler: 'Pique-huile Rouge / Bleu (Ø 0.12–0.18 mm)',
    hex: '#F59E0B',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    viscosity: '1300 cSt à 20°C',
  },
  MOEBIUS_9415: {
    id: 'MOEBIUS_9415',
    shortName: 'Moebius 9415',
    fullName: 'Moebius 9415 (Graisse thixotrope échappement 4 Hz)',
    oiler: 'Pique-huile Rouge (Ø 0.12 mm)',
    hex: '#F43F5E',
    badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    viscosity: 'Thixotrope 28’800 A/h',
  },
  MOEBIUS_9504_8217: {
    id: 'MOEBIUS_9504_8217',
    shortName: 'Moebius 9504 / 8217',
    fullName: 'Moebius 9504 (Remontoir) & Moebius 8217 (Bride barillet)',
    oiler: 'Pique-huile Vert (Ø 0.25 mm)',
    hex: '#10B981',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    viscosity: 'Graisse haute pression / freinage',
  },
  LUBETA_V105: {
    id: 'LUBETA_V105',
    shortName: 'Lubeta V105',
    fullName: 'Lubeta V105 (Fluide film sec pour roues d’inversion)',
    oiler: 'Applicateur / Bain V105',
    hex: '#A855F7',
    badgeClass: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    viscosity: 'Film autolubrifiant',
  },
  NO_OIL: {
    id: 'NO_OIL',
    shortName: 'INTERDIT (À sec)',
    fullName: 'Aucun lubrifiant — Organe fonctionnant strictement à sec',
    oiler: 'Aucun huilier (Zone sèche)',
    hex: '#EF4444',
    badgeClass: 'bg-red-500/25 text-red-300 border-red-500/50',
    viscosity: '0 cSt (Sec)',
  },
};

const ETA_2824_POINTS: EtaPoint[] = [
  {
    id: 'P01',
    code: '1',
    layer: 'bridges',
    x: 155,
    y: 195,
    organ: 'Amortisseurs de Balancier Incabloc (Haut & Bas)',
    group: 'Organe réglant 4 Hz',
    lubricantId: 'MOEBIUS_9010',
    productLabel: 'Moebius 9010',
    oiler: 'Pique-huile Noir (Ø 0.08 mm)',
    protocol: 'Ménisque centré couvrant 50 % à 66 % (2/3) du contre-pivot épilamé après fermeture de la lyre.',
    watchmakerRule: 'Ne jamais huiler par le trou du chaton sans déposer le contre-pivot : tout contact avec le laiton vide la réserve.',
  },
  {
    id: 'P02',
    code: '2',
    layer: 'bridges',
    x: 182,
    y: 318,
    organ: 'Palettes d’Ancre (Plans d’impulsion)',
    group: 'Échappement à ancre suisse',
    lubricantId: 'MOEBIUS_9415',
    productLabel: 'Moebius 9415 (Thixotrope)',
    oiler: 'Pique-huile Rouge (Ø 0.12 mm)',
    protocol: 'Micro-touche sur le plan d’impulsion de la palette de sortie toutes les 5 dents (3 dépôts sur les 15 dents).',
    watchmakerRule: 'À 28’800 A/h, seule la 9415 résiste à l’éjection centrifuge tout en se liquéfiant à l’impact.',
  },
  {
    id: 'P03',
    code: '3',
    layer: 'bridges',
    x: 150,
    y: 308,
    organ: 'Pivots d’Ancre, Dard & Cheville de Plateau',
    group: 'Zone Sèche Obligatoire',
    lubricantId: 'NO_OIL',
    productLabel: 'AUCUN LUBRIFIANT (100 % à sec)',
    oiler: 'Interdit',
    protocol: 'Zéro dépôt. Les pivots d’ancre, les cornes de fourchette et l’ellipse restent secs après lavage.',
    watchmakerRule: 'Piège critique à l’établi : la moindre trace d’huile colle le dégagement et ampute l’amplitude de 40°.',
  },
  {
    id: 'P04',
    code: '4',
    layer: 'bridges',
    x: 202,
    y: 342,
    organ: 'Pivots de Roue d’Échappement (Haut & Bas)',
    group: 'Rouage rapide (5e mobile)',
    lubricantId: 'MOEBIUS_9010',
    productLabel: 'Moebius 9010',
    oiler: 'Pique-huile Noir (Ø 0.08 mm)',
    protocol: 'Remplir uniquement la moitié de l’huilier du rubis en touchant le tenon du pivot.',
    watchmakerRule: 'Éviter tout sur-dosage susceptible de migrer le long du pignon jusqu’au pignon et aux dents épilamées.',
  },
  {
    id: 'P05',
    code: '5',
    layer: 'bridges',
    x: 255,
    y: 355,
    organ: 'Pivots de Roue de Seconde Centrale (4e Mobile)',
    group: 'Rouage de finissage (1 tr/min)',
    lubricantId: 'MOEBIUS_9010',
    productLabel: 'Moebius 9010',
    oiler: 'Pique-huile Noir / Rouge',
    protocol: 'Goutte modérée dans le réservoir capillaire du rubis côté pont et côté platine.',
    watchmakerRule: 'Contrôler l’ébat axial avant huilage et veiller à ne jamais souiller la lame du stop-seconde.',
  },
  {
    id: 'P06',
    code: '6',
    layer: 'bridges',
    x: 245,
    y: 260,
    organ: 'Pivots de Roue de Moyenne (3e Mobile)',
    group: 'Rouage de transmission',
    lubricantId: 'MOEBIUS_HP1300',
    productLabel: 'Moebius HP-1300',
    oiler: 'Pique-huile Rouge (Ø 0.12 mm)',
    protocol: 'Déposer dans l’huilier du rubis côté pont de rouage et côté platine.',
    watchmakerRule: 'Transition tribologique : le couple radial augmente, on passe de la 9010 à la HP-1300 dès la roue de moyenne.',
  },
  {
    id: 'P07',
    code: '7',
    layer: 'bridges',
    x: 300,
    y: 300,
    organ: 'Pivots de Roue de Centre (2e Mobile)',
    group: 'Rouage sous fort couple (1 tr/h)',
    lubricantId: 'MOEBIUS_HP1300',
    productLabel: 'Moebius HP-1300',
    oiler: 'Pique-huile Bleu (Ø 0.18 mm)',
    protocol: 'Lubrifier les paliers rubis de la roue de centre avant le chassage de la chaussée.',
    watchmakerRule: 'Forte charge issue du barillet : la viscosité 1300 cSt empêche le cisaillement du film d’huile.',
  },
  {
    id: 'P08',
    code: '8',
    layer: 'bridges',
    x: 380,
    y: 185,
    organ: 'Arbre de Barillet (Portées Tambour, Couvercle & Paliers)',
    group: 'Organe moteur',
    lubricantId: 'MOEBIUS_HP1300',
    productLabel: 'Moebius HP-1300',
    oiler: 'Pique-huile Bleu (Ø 0.18 mm)',
    protocol: '1 point sur les portées cylindriques de l’arbre ainsi que sur les paliers platine et pont de barillet.',
    watchmakerRule: 'Doser proprement afin que l’huile ne remonte jamais vers le carré du rochet.',
  },
  {
    id: 'P09',
    code: '9',
    layer: 'bridges',
    x: 438,
    y: 155,
    organ: 'Paroi Interne du Tambour de Barillet (Bride Glissante)',
    group: 'Limiteur de surtension automatique',
    lubricantId: 'MOEBIUS_9504_8217',
    productLabel: 'Moebius 8217 (Graisse freinante)',
    oiler: 'Pique-huile Vert (Ø 0.25 mm)',
    protocol: '3 touches régulières réparties à 120° sur la paroi intérieure du tambour avant l’estrapadage.',
    watchmakerRule: 'Calibre automatique : la Moebius 8217 stabilise le couple de patinage de la bride à pleine charge.',
  },
  {
    id: 'P10',
    code: '10',
    layer: 'dial',
    x: 515,
    y: 300,
    organ: 'Tige de Remontoir (Carré, Portée Pilote & Gorge)',
    group: 'Remontoir & Mise à l’heure (Code 401)',
    lubricantId: 'MOEBIUS_9504_8217',
    productLabel: 'Moebius 9504',
    oiler: 'Pique-huile Vert (Ø 0.25 mm)',
    protocol: 'Film très fin sur les 4 pans du carré, le tenon pilote et la gorge de tirette.',
    watchmakerRule: 'Un excès de graisse sur la tige finit par migrer sous le cadran ou encrasser le joint de couronne.',
  },
  {
    id: 'P11',
    code: '11',
    layer: 'dial',
    x: 440,
    y: 300,
    organ: 'Pignon Coulant & Denture Breguet (Code 407)',
    group: 'Embrayage de remontage',
    lubricantId: 'MOEBIUS_9504_8217',
    productLabel: 'Moebius 9504',
    oiler: 'Pique-huile Vert (Ø 0.25 mm)',
    protocol: 'Lubrifier la gorge circulaire du pignon coulant et effleurer les dents de loup Breguet.',
    watchmakerRule: 'Garantit un enclenchement souple sans limaille lors du remontage manuel.',
  },
  {
    id: 'P12',
    code: '12',
    layer: 'dial',
    x: 418,
    y: 230,
    organ: 'Bec de Bascule, Plot de Tirette & Ressort-Sautoir',
    group: 'Commande des 3 positions de couronne',
    lubricantId: 'MOEBIUS_9504_8217',
    productLabel: 'Moebius 9504',
    oiler: 'Pique-huile Vert (Ø 0.25 mm)',
    protocol: 'Point localisé sur le bec du ressort de bascule et sur l’axe du plot de tirette.',
    watchmakerRule: 'Zone de pression acier/acier maximale lors du passage entre remontage, date rapide et mise à l’heure.',
  },
  {
    id: 'P13',
    code: '13',
    layer: 'dial',
    x: 300,
    y: 300,
    organ: 'Chaussée à Friction (Tube de Roue de Centre)',
    group: 'Minuterie',
    lubricantId: 'MOEBIUS_9504_8217',
    productLabel: 'Moebius 9504 (ou HP-1300)',
    oiler: 'Pique-huile Bleu / Vert',
    protocol: 'Infime trace sur la portée de l’arbre de centre avant l’enfoncement de la chaussée.',
    watchmakerRule: 'À sec : grippage de la chaussée. Noyée d’huile fluide : perte du couple d’entraînement des aiguilles.',
  },
  {
    id: 'P14',
    code: '14',
    layer: 'dial',
    x: 190,
    y: 205,
    organ: 'Bec du Sautoir de Quantième & Came de Date',
    group: 'Calendrier instantané 31 dents',
    lubricantId: 'MOEBIUS_HP1300',
    productLabel: 'Moebius HP-1300',
    oiler: 'Pique-huile Rouge (Ø 0.12 mm)',
    protocol: '1 micro-touche sur le bec rubis/acier du sautoir en appui sur la couronne de quantième.',
    watchmakerRule: 'Soulage la consommation d’amplitude entre 23h30 et minuit lors de l’armement du saut instantané.',
  },
  {
    id: 'P15',
    code: '15',
    layer: 'auto',
    x: 295,
    y: 215,
    organ: 'Roues d’Inversion (Inverseurs à Cliquets)',
    group: 'Redresseur automatique bidirectionnel',
    lubricantId: 'LUBETA_V105',
    productLabel: 'Lubeta V105 (Pivots : HP-1300)',
    oiler: 'Bain / Point Lubeta V105',
    protocol: 'Traitement interne des cliquets au Lubeta V105 uniquement ; pivots externes au HP-1300.',
    watchmakerRule: 'CRITIQUE : Ne jamais huiler les cliquets internes à la 9010 ou HP-1300 (effet hélicoptère de la masse).',
  },
  {
    id: 'P16',
    code: '16',
    layer: 'auto',
    x: 300,
    y: 300,
    organ: 'Roulement à Billes de Masse Oscillante (5 billes)',
    group: 'Support de rotor central',
    lubricantId: 'MOEBIUS_9010',
    productLabel: 'Moebius 9010',
    oiler: 'Pique-huile Noir (Ø 0.08 mm)',
    protocol: 'Fine goutte sur le chemin de roulement répartie entre 2 billes.',
    watchmakerRule: 'Un excès de viscosité freine l’inertie du rotor lors des mouvements lents du poignet.',
  },
];

export default function Eta2824LubricationMap() {
  const [mode, setMode] = useState<MapMode>('study');
  const [layer, setLayer] = useState<LayerId>('bridges');
  const [oilFilter, setOilFilter] = useState<LubricantKey | 'ALL'>('ALL');
  const [selectedId, setSelectedId] = useState<string>('P01');
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // États du Quiz d'Établi sur le calibre
  const [quizSelectedLub, setQuizSelectedLub] = useState<LubricantKey>('MOEBIUS_9010');
  const [quizTarget, setQuizTarget] = useState<EtaPoint>(ETA_2824_POINTS[0]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizAttempts, setQuizAttempts] = useState<number>(0);
  const [quizResult, setQuizResult] = useState<{
    answered: boolean;
    isCorrect: boolean;
    chosenLub: LubricantKey;
    wrongPointCode?: string;
  } | null>(null);

  const selectedPoint =
    ETA_2824_POINTS.find((p) => p.id === selectedId) || ETA_2824_POINTS[0];
  const layerPoints = ETA_2824_POINTS.filter((p) => p.layer === layer);

  const pickRandomQuizPoint = () => {
    const next =
      ETA_2824_POINTS[Math.floor(Math.random() * ETA_2824_POINTS.length)];
    setQuizTarget(next);
    setLayer(next.layer);
    setQuizResult(null);
  };

  const handleModeChange = (nextMode: MapMode) => {
    setMode(nextMode);
    if (nextMode === 'quiz') {
      setOilFilter('ALL');
      pickRandomQuizPoint();
    } else if (nextMode === 'study') {
      setQuizResult(null);
    }
  };

  const handleLayerChange = (nextLayer: LayerId) => {
    setLayer(nextLayer);
    if (mode === 'study') {
      const first = ETA_2824_POINTS.find((p) => p.layer === nextLayer);
      if (first) setSelectedId(first.id);
    }
  };

  const handleHotspotClick = (pt: EtaPoint) => {
    if (mode === 'study') {
      setSelectedId(pt.id);
      if (pt.layer !== layer) setLayer(pt.layer);
      return;
    }

    if (mode === 'quiz') {
      if (pt.id !== quizTarget.id) {
        setQuizResult({
          answered: false,
          isCorrect: false,
          chosenLub: quizSelectedLub,
          wrongPointCode: pt.code,
        });
        return;
      }
      const isCorrect = quizSelectedLub === quizTarget.lubricantId;
      setQuizAttempts((a) => a + 1);
      if (isCorrect) setQuizScore((s) => s + 1);
      setQuizResult({
        answered: true,
        isCorrect,
        chosenLub: quizSelectedLub,
      });
    }
  };

  const handleCopyJson = () => {
    const payload = JSON.stringify(
      {
        calibre: 'ETA 2824-2',
        diameter_mm: 25.6,
        height_mm: 4.6,
        frequency_vph: 28800,
        lift_angle_deg: 50,
        jewels: 25,
        points: ETA_2824_POINTS,
      },
      null,
      2
    );
    navigator.clipboard.writeText(payload);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2500);
  };

  // Calcul du viewBox pour la Loupe 10x centrée sur le point actif
  const activeFocusPoint = mode === 'quiz' ? quizTarget : selectedPoint;
  const svgViewBox = loupe10x
    ? `${Math.max(0, Math.min(340, activeFocusPoint.x - 130))} ${Math.max(
        0,
        Math.min(340, activeFocusPoint.y - 130)
      )} 260 260`
    : '0 0 600 600';

  return (
    <section className="rounded-3xl bg-white dark:bg-[#0B0F17] border-2 border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
      {/* --- BARRE D'EN-TÊTE & SÉLECTEUR DE MODE --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
            <Wrench className="w-4 h-4" /> Communication Technique ETA SA · 16 Points de Contrôle
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 dark:text-white mt-1">
            Carte Interactive de Huilage — Calibre ETA 2824-2
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Inspectez les <strong>3 vues du mouvement</strong> (Côté Ponts, Côté Cadran, Bloc Automatique), filtrez par huilier Bergeon ou testez votre précision en mode <strong>Quiz d’Établi</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-[#131926] border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => handleModeChange('study')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'study'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              Mode Étude (16 Points)
            </button>
            <button
              onClick={() => handleModeChange('quiz')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'quiz'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              Quiz d’Établi
            </button>
            <button
              onClick={() => handleModeChange('data')}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'data'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
            >
              Tableau &amp; JSON
            </button>
          </div>
        </div>
      </div>

      {/* --- BANDEAU CARACTÉRISTIQUES TECHNIQUES DU CALIBRE ETA 2824-2 --- */}
      <div className="rounded-2xl bg-slate-900 dark:bg-[#0F1521] border border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span>
            <strong className="text-amber-400">CALIBRE :</strong> ETA 2824-2 (Seconde centrale, Stop-seconde)
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-white">Ø :</strong> 25.60 mm (11 ½&apos;&apos;&apos;)
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-white">Hauteur :</strong> 4.60 mm
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-white">Fréquence :</strong> 28&apos;800 A/h (4 Hz)
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-emerald-400">Angle de levée :</strong> 50°
          </span>
          <span className="text-slate-600">|</span>
          <span>
            <strong className="text-rose-400">Empierrage :</strong> 25 Rubis
          </span>
        </div>
        <span className="text-[11px] text-amber-400">Norme NIHS / Prescriptions ETA</span>
      </div>

      {mode !== 'data' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* --- COLONNE GAUCHE (7 cols) : ONGLETS DE VUE + CANVAS SVG + PORTE-HUILIERS --- */}
          <div className="lg:col-span-7 space-y-4">
            {/* Sélecteur des 3 couches du mouvement */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-[#131926] border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => handleLayerChange('bridges')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  layer === 'bridges'
                    ? 'bg-slate-900 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>1. Côté Ponts (#1–#9)</span>
              </button>
              <button
                onClick={() => handleLayerChange('dial')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  layer === 'dial'
                    ? 'bg-slate-900 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>2. Côté Cadran (#10–#14)</span>
              </button>
              <button
                onClick={() => handleLayerChange('auto')}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  layer === 'auto'
                    ? 'bg-slate-900 text-amber-400 border border-amber-500/40 shadow'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>3. Automatique (#15–#16)</span>
              </button>
            </div>

            {/* Bandeau de consigne en Mode Quiz */}
            {mode === 'quiz' && (
              <div className="rounded-2xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-slate-900 border border-amber-500/50 p-4 text-white flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                    <Crosshair className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-amber-400">
                      Entraînement Pratique d’Établi
                    </div>
                    <p className="text-xs sm:text-sm font-bold">
                      Cible : <span className="text-amber-300 font-mono">#{quizTarget.code} ({quizTarget.organ})</span> — Choisissez l’huilier puis cliquez sur <span className="text-amber-300 font-mono">?</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  <div className="text-right font-mono">
                    <div className="text-[10px] text-slate-400">SCORE</div>
                    <div className="text-base font-extrabold text-amber-400">
                      {quizScore} / {quizAttempts}
                    </div>
                  </div>
                  <button
                    onClick={pickRandomQuizPoint}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 border border-slate-700 transition"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            )}

            {/* Carte du Schéma SVG ETA 2824-2 */}
            <div className="rounded-2xl bg-[#0B0F17] border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-[#0E1420] border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono font-bold text-slate-200">
                    {layer === 'bridges' && 'VUE 1 : PLATINE & CÔTÉ PONTS (MOUVEMENT DE BASE)'}
                    {layer === 'dial' && 'VUE 2 : CÔTÉ CADRAN (REMONTOIR, MISE À L’HEURE & DATE)'}
                    {layer === 'auto' && 'VUE 3 : BLOC AUTOMATIQUE (MASSE OSCILLANTE & INVERSEURS)'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={showNumbers}
                      onChange={(e) => setShowNumbers(e.target.checked)}
                      className="accent-amber-500 rounded cursor-pointer"
                    />
                    <span>Numéros</span>
                  </label>

                  <button
                    onClick={() => setLoupe10x(!loupe10x)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                      loupe10x
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-amber-500'
                    }`}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    {loupe10x ? 'Loupe 10x Active' : 'Loupe 10x'}
                  </button>
                </div>
              </div>

              {/* Canvas SVG 600x600 */}
              <div className="p-3 sm:p-5 flex items-center justify-center bg-[#090D15]">
                <svg
                  viewBox={svgViewBox}
                  className="w-full max-w-[500px] aspect-square transition-all duration-500 select-none"
                >
                  <defs>
                    <radialGradient id="etaPlatineGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="85%" stopColor="#0F172A" />
                      <stop offset="100%" stopColor="#090D16" />
                    </radialGradient>
                    <linearGradient id="etaRhodiumBridge" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="50%" stopColor="#1E293B" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="etaGoldWheel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="etaSteelPart" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#64748B" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#334155" stopOpacity="0.35" />
                    </linearGradient>
                    <radialGradient id="etaRubyJewel" cx="35%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FB7185" />
                      <stop offset="60%" stopColor="#E11D48" />
                      <stop offset="100%" stopColor="#881337" />
                    </radialGradient>
                  </defs>

                  {/* CARRURE / PLATINE DE BASE COMMUNE */}
                  <g>
                    <circle
                      cx="300"
                      cy="300"
                      r="280"
                      fill="url(#etaPlatineGrad)"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeOpacity="0.55"
                    />
                    <circle
                      cx="300"
                      cy="300"
                      r="270"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="1"
                      strokeDasharray="4 6"
                    />
                    <circle
                      cx="300"
                      cy="300"
                      r="256"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="300"
                      y1="15"
                      x2="300"
                      y2="585"
                      stroke="#334155"
                      strokeWidth="0.7"
                      strokeDasharray="3 6"
                    />
                    <line
                      x1="15"
                      y1="300"
                      x2="585"
                      y2="300"
                      stroke="#334155"
                      strokeWidth="0.7"
                      strokeDasharray="3 6"
                    />
                    {/* Repère Couronne à 3H */}
                    <g transform="translate(555, 300)">
                      <rect
                        x="0"
                        y="-10"
                        width="28"
                        height="20"
                        rx="3"
                        fill="#334155"
                        stroke="#94A3B8"
                        strokeWidth="1.2"
                      />
                      <line x1="-25" y1="0" x2="0" y2="0" stroke="#94A3B8" strokeWidth="6" />
                      <text
                        x="14"
                        y="4"
                        textAnchor="middle"
                        fill="#D4AF37"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        3H
                      </text>
                    </g>
                    <text
                      x="300"
                      y="34"
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      12H • CALIBRE ETA 2824-2 (25.60 MM)
                    </text>
                  </g>

                  {/* VUE 1 : CÔTÉ PONTS */}
                  {layer === 'bridges' && (
                    <g>
                      <path
                        d="M 285 95 C 380 95, 455 155, 465 245 L 350 265 C 320 235, 290 210, 275 170 Z"
                        fill="url(#etaRhodiumBridge)"
                        stroke="#64748B"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="380"
                        cy="185"
                        r="68"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                        strokeDasharray="5 3"
                      />
                      <circle
                        cx="380"
                        cy="185"
                        r="22"
                        fill="#1E293B"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                      />
                      <text x="395" y="130" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                        BARILLET
                      </text>

                      <path
                        d="M 185 220 C 245 200, 325 245, 345 320 L 295 435 C 215 425, 165 340, 185 220 Z"
                        fill="url(#etaRhodiumBridge)"
                        stroke="#64748B"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="300"
                        cy="300"
                        r="42"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="245"
                        cy="260"
                        r="30"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="255"
                        cy="355"
                        r="28"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx="195"
                        cy="335"
                        r="22"
                        fill="none"
                        stroke="#F43F5E"
                        strokeWidth="1.2"
                        strokeDasharray="2 4"
                      />
                      <text x="235" y="405" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                        PONT DE ROUAGE
                      </text>

                      <path
                        d="M 125 270 L 185 280 L 180 355 L 125 340 Z"
                        fill="#1E293B"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 155 310 L 190 325 M 155 310 L 145 255"
                        stroke="#CBD5E1"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <text x="112" y="368" fill="#94A3B8" fontSize="9" fontFamily="monospace">
                        ANCRE
                      </text>

                      <path
                        d="M 95 190 C 115 130, 195 110, 235 155 L 185 245 C 135 250, 90 225, 95 190 Z"
                        fill="url(#etaRhodiumBridge)"
                        stroke="#D4AF37"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="155"
                        cy="195"
                        r="56"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="4"
                        strokeOpacity="0.65"
                      />
                      <circle
                        cx="155"
                        cy="195"
                        r="48"
                        fill="none"
                        stroke="#FDE047"
                        strokeWidth="1"
                        strokeDasharray="8 6"
                      />
                      <circle
                        cx="155"
                        cy="195"
                        r="20"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="1"
                        strokeDasharray="3 2"
                      />
                      <circle
                        cx="155"
                        cy="195"
                        r="9"
                        fill="url(#etaRubyJewel)"
                        stroke="#FDE047"
                        strokeWidth="1.5"
                      />
                      <text
                        x="105"
                        y="122"
                        fill="#D4AF37"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        BALANCIER 4 Hz (INCABLOC)
                      </text>
                    </g>
                  )}

                  {/* VUE 2 : CÔTÉ CADRAN */}
                  {layer === 'dial' && (
                    <g>
                      <circle
                        cx="300"
                        cy="300"
                        r="235"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="18"
                        strokeOpacity="0.14"
                      />
                      <circle
                        cx="300"
                        cy="300"
                        r="224"
                        fill="none"
                        stroke="#D4AF37"
                        strokeWidth="1"
                        strokeDasharray="8 4"
                      />
                      <text
                        x="300"
                        y="88"
                        textAnchor="middle"
                        fill="#D4AF37"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        COURONNE DE QUANTIÈME (31 DENTS)
                      </text>

                      <circle
                        cx="300"
                        cy="300"
                        r="34"
                        fill="url(#etaSteelPart)"
                        stroke="#94A3B8"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="300"
                        cy="300"
                        r="12"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="2"
                      />
                      <circle
                        cx="350"
                        cy="355"
                        r="26"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="230"
                        cy="375"
                        r="35"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 155 240 L 185 190 L 210 205"
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      <rect
                        x="395"
                        y="291"
                        width="150"
                        height="18"
                        rx="3"
                        fill="url(#etaSteelPart)"
                        stroke="#CBD5E1"
                        strokeWidth="1.5"
                      />
                      <rect
                        x="425"
                        y="282"
                        width="32"
                        height="36"
                        rx="4"
                        fill="#334155"
                        stroke="#D4AF37"
                        strokeWidth="1.8"
                      />
                      <rect
                        x="475"
                        y="284"
                        width="22"
                        height="32"
                        rx="3"
                        fill="#475569"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                      />

                      <path
                        d="M 410 235 C 435 245, 445 275, 440 295 L 395 270 Z"
                        fill="url(#etaSteelPart)"
                        stroke="#94A3B8"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M 340 195 C 385 180, 445 205, 435 255"
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 445 315 L 485 345 L 435 375 L 410 340 Z"
                        fill="url(#etaSteelPart)"
                        stroke="#CBD5E1"
                        strokeWidth="1.8"
                      />
                      <text
                        x="455"
                        y="210"
                        textAnchor="middle"
                        fill="#38BDF8"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        MÉCANISME REMONTOIR / TIRETTE
                      </text>
                    </g>
                  )}

                  {/* VUE 3 : SYSTÈME AUTOMATIQUE */}
                  {layer === 'auto' && (
                    <g>
                      <path
                        d="M 160 175 C 245 125, 365 130, 435 190 L 410 385 C 325 425, 215 410, 175 335 Z"
                        fill="url(#etaRhodiumBridge)"
                        stroke="#94A3B8"
                        strokeWidth="2"
                      />
                      <path
                        d="M 75 300 A 225 225 0 1 1 525 300 L 445 300 A 145 145 0 1 0 155 300 Z"
                        fill="#1E293B"
                        fillOpacity="0.55"
                        stroke="#D4AF37"
                        strokeWidth="2"
                        strokeDasharray="8 4"
                      />
                      <text
                        x="300"
                        y="505"
                        textAnchor="middle"
                        fill="#D4AF37"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        MASSE OSCILLANTE SUR ROULEMENT À BILLES
                      </text>

                      <circle
                        cx="300"
                        cy="300"
                        r="46"
                        fill="#0F172A"
                        stroke="#CBD5E1"
                        strokeWidth="2.5"
                      />
                      <circle cx="300" cy="268" r="5" fill="#FDE047" />
                      <circle cx="330" cy="288" r="5" fill="#FDE047" />
                      <circle cx="319" cy="324" r="5" fill="#FDE047" />
                      <circle cx="281" cy="324" r="5" fill="#FDE047" />
                      <circle cx="270" cy="288" r="5" fill="#FDE047" />

                      <circle
                        cx="245"
                        cy="215"
                        r="32"
                        fill="url(#etaGoldWheel)"
                        stroke="#A855F7"
                        strokeWidth="2"
                      />
                      <circle
                        cx="345"
                        cy="215"
                        r="32"
                        fill="url(#etaGoldWheel)"
                        stroke="#A855F7"
                        strokeWidth="2"
                      />
                      <text
                        x="295"
                        y="168"
                        textAnchor="middle"
                        fill="#C084FC"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        INVERSEURS (LUBETA V105)
                      </text>
                      <circle
                        cx="375"
                        cy="310"
                        r="28"
                        fill="url(#etaGoldWheel)"
                        stroke="#D4AF37"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}

                  {/* POINTS INTERACTIFS (HOTSPOTS #1 À #16) */}
                  {layerPoints.map((pt) => {
                    const lub = LUBRICANTS[pt.lubricantId];
                    const isFilteredOut =
                      mode === 'study' &&
                      oilFilter !== 'ALL' &&
                      oilFilter !== pt.lubricantId;
                    const isSelected = mode === 'study' && selectedId === pt.id;
                    const isQuizTarget = mode === 'quiz' && quizTarget.id === pt.id;
                    const dotColor =
                      mode === 'quiz'
                        ? isQuizTarget
                          ? '#D4AF37'
                          : '#64748B'
                        : lub.hex;

                    return (
                      <g
                        key={pt.id}
                        onClick={() => handleHotspotClick(pt)}
                        className={`cursor-pointer transition-opacity ${
                          isFilteredOut ? 'opacity-20 pointer-events-none' : 'opacity-100'
                        }`}
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected || isQuizTarget ? 22 : 16}
                          fill={dotColor}
                          fillOpacity="0.22"
                          stroke={isSelected || isQuizTarget ? dotColor : 'none'}
                          strokeWidth="2"
                        />
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected || isQuizTarget ? 12 : 10}
                          fill={dotColor}
                          stroke="#0B0F17"
                          strokeWidth="2.5"
                        />
                        {(showNumbers || isQuizTarget) && (
                          <text
                            x={pt.x}
                            y={pt.y + 3.5}
                            textAnchor="middle"
                            fill="#0B0F17"
                            fontSize="10"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {mode === 'quiz' && isQuizTarget ? '?' : pt.code}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Porte-Huiliers Bergeon & Filtres de Lubrifiants Moebius */}
              <div className="bg-[#0E1420] border-t border-slate-800 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-amber-400" />
                    {mode === 'quiz' ? (
                      <strong className="text-amber-400">
                        Étape 1 : Sélectionnez l’huilier ci-dessous avant de cliquer sur le point ?
                      </strong>
                    ) : (
                      <span>Porte-Huiliers Bergeon &amp; Filtres de Lubrifiants Moebius :</span>
                    )}
                  </span>
                  {mode === 'study' && oilFilter !== 'ALL' && (
                    <button
                      onClick={() => setOilFilter('ALL')}
                      className="text-xs font-mono text-amber-400 hover:underline"
                    >
                      Réinitialiser le filtre (Voir tout)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                  {Object.values(LUBRICANTS).map((lub) => {
                    const active =
                      (mode === 'study' && oilFilter === lub.id) ||
                      (mode === 'quiz' && quizSelectedLub === lub.id);
                    return (
                      <button
                        key={lub.id}
                        onClick={() => {
                          if (mode === 'study') {
                            setOilFilter(oilFilter === lub.id ? 'ALL' : lub.id);
                          } else {
                            setQuizSelectedLub(lub.id);
                          }
                        }}
                        className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 ${
                          active
                            ? 'bg-slate-800 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                            : 'bg-[#131926] border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{
                              backgroundColor: lub.hex,
                              boxShadow: `0 0 8px ${lub.hex}`,
                            }}
                          />
                          <span className="text-[10px] font-mono text-slate-400 truncate">
                            {lub.id === 'NO_OIL' ? 'Zone sèche' : 'Moebius'}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-white leading-tight mt-0.5">
                          {lub.shortName}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {lub.oiler.split('(')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* --- COLONNE DROITE (5 cols) : FICHE D'INSPECTION + LISTE RAPIDE --- */}
          <div className="lg:col-span-5 space-y-4">
            {/* Fiche d'inspection ou Résultat du Quiz */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#131926] border border-slate-200 dark:border-slate-800 p-5 shadow-lg relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{
                  backgroundColor:
                    mode === 'study'
                      ? LUBRICANTS[selectedPoint.lubricantId].hex
                      : quizResult?.answered
                      ? quizResult.isCorrect
                        ? '#10B981'
                        : '#EF4444'
                      : '#D4AF37',
                }}
              />

              {mode === 'study' ? (
                <div className="space-y-4 pt-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-900 text-amber-400">
                          POINT #{selectedPoint.code}
                        </span>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                          {selectedPoint.group}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                        {selectedPoint.organ}
                      </h3>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shrink-0 ${
                        LUBRICANTS[selectedPoint.lubricantId].badgeClass
                      }`}
                    >
                      {LUBRICANTS[selectedPoint.lubricantId].shortName}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                        Lubrifiant Prescrit
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              LUBRICANTS[selectedPoint.lubricantId].hex,
                          }}
                        />
                        <span>{selectedPoint.productLabel}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800">
                      <div className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                        Pique-Huile Bergeon
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        {selectedPoint.oiler}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold mb-1">
                      Dosage &amp; Protocole d’Application
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {selectedPoint.protocol}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30">
                    <div className="text-[11px] font-mono uppercase text-rose-600 dark:text-rose-400 font-bold mb-1 flex items-center gap-1.5">
                      {selectedPoint.lubricantId === 'NO_OIL' ? (
                        <Ban className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      <span>Point Critique d’Établi</span>
                    </div>
                    <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
                      {selectedPoint.watchmakerRule}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  {!quizResult?.answered ? (
                    <div className="py-4 text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500 mx-auto flex items-center justify-center text-amber-500">
                        <HelpCircle className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                        Question Pratique d’Établi
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                        #{quizTarget.code} — {quizTarget.organ}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        1. Sélectionnez le lubrifiant adéquat dans le porte-huiliers Bergeon.
                        <br />
                        2. Cliquez sur le point <strong className="text-amber-500">#{quizTarget.code} (?)</strong> sur le schéma du calibre ETA 2824-2.
                      </p>
                      {quizResult?.wrongPointCode && (
                        <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-700 dark:text-amber-300 font-semibold">
                          Vous avez cliqué sur le point #{quizResult.wrongPointCode}. Cliquez sur la cible #{quizTarget.code} (?) !
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div
                        className={`p-3.5 rounded-xl border ${
                          quizResult.isCorrect
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 dark:text-emerald-200'
                            : 'bg-rose-500/15 border-rose-500/40 text-rose-800 dark:text-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            {quizResult.isCorrect
                              ? 'Excellent ! Lubrification conforme aux prescriptions ETA.'
                              : `Erreur : vous avez choisi ${LUBRICANTS[quizResult.chosenLub].shortName} au lieu de ${LUBRICANTS[quizTarget.lubricantId].shortName}.`}
                          </span>
                          <button
                            onClick={pickRandomQuizPoint}
                            className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1 shrink-0"
                          >
                            <span>Suivant</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        #{quizTarget.code} — {quizTarget.organ}
                      </h4>
                      <div className="p-3 rounded-xl bg-white dark:bg-[#0B0F17] border border-slate-200 dark:border-slate-800 text-xs space-y-1 text-slate-700 dark:text-slate-300">
                        <div>
                          <strong className="text-amber-600 dark:text-amber-400">Prescription :</strong>{' '}
                          {quizTarget.productLabel} ({quizTarget.oiler})
                        </div>
                        <div>
                          <strong>Protocole :</strong> {quizTarget.protocol}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-800 dark:text-rose-200">
                        <strong>Règle d’atelier :</strong> {quizTarget.watchmakerRule}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Liste rapide des points de la vue active */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#131926] border border-slate-200 dark:border-slate-800 p-4 shadow-md">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  Points de cette vue ({layerPoints.length})
                </h3>
                <span className="text-[11px] text-slate-500">Cliquez pour inspecter</span>
              </div>

              <div className="space-y-1.5 max-h-[270px] overflow-y-auto pr-1">
                {layerPoints.map((pt) => {
                  const lub = LUBRICANTS[pt.lubricantId];
                  const active =
                    (mode === 'study' && selectedId === pt.id) ||
                    (mode === 'quiz' && quizTarget.id === pt.id);
                  return (
                    <button
                      key={pt.id}
                      onClick={() => handleHotspotClick(pt)}
                      className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-amber-500/15 border-amber-500 text-slate-900 dark:text-white font-bold'
                          : 'bg-white dark:bg-[#0B0F17] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-amber-400 font-mono text-[10px] flex items-center justify-center shrink-0">
                          {pt.code}
                        </span>
                        <span className="truncate">{pt.organ}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${
                          mode === 'quiz'
                            ? 'bg-slate-800 text-amber-400 border-amber-500/30'
                            : lub.badgeClass
                        }`}
                      >
                        {mode === 'quiz' ? 'Cible ?' : lub.shortName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Encart des 3 Règles d'Or ETA 2824-2 */}
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs space-y-2">
              <div className="font-mono uppercase font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Règles d’Or d’Atelier — ETA 2824-2</span>
              </div>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-rose-600 dark:text-rose-400">Zéro tolérance (#3) :</strong>{' '}
                  Pivots d’ancre, dard et cheville de plateau restent 100 % à sec.
                </li>
                <li>
                  <strong className="text-sky-600 dark:text-sky-400">Épilamage Fixodrop (#2) :</strong>{' '}
                  Les palettes d’ancre et la roue d’échappement sont épilamées pour retenir la Moebius 9415.
                </li>
                <li>
                  <strong className="text-purple-600 dark:text-purple-400">Inverseurs (#15) :</strong>{' '}
                  Lubeta V105 exclusivement pour les cliquets internes ; jamais d’huile 9010 dans la cage.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        /* --- VUE 3 : TABLEAU RÉCAPITULATIF DES 16 POINTS & EXPORT JSON --- */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#131926] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Protocole Complet ETA 2824-2 (16 Points) &amp; Schéma JSON
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tableau récapitulatif d’atelier et jeu de données structuré.
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyJson}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs inline-flex items-center gap-2 shadow transition"
            >
              {copiedJson ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedJson ? 'JSON Copié !' : 'Copier le JSON (16 points)'}</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-[#0E1420] text-slate-600 dark:text-slate-400 font-mono uppercase border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-3">#</th>
                  <th className="py-3 px-3">Vue</th>
                  <th className="py-3 px-3">Organe</th>
                  <th className="py-3 px-3">Lubrifiant</th>
                  <th className="py-3 px-3">Huilier</th>
                  <th className="py-3 px-3">Dosage &amp; Méthode</th>
                  <th className="py-3 px-3">Vigilance d’Établi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {ETA_2824_POINTS.map((pt) => (
                  <tr
                    key={pt.id}
                    className="hover:bg-slate-50 dark:hover:bg-[#131926]/60 transition"
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                      #{pt.code}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                      {pt.layer === 'bridges'
                        ? '1. Ponts'
                        : pt.layer === 'dial'
                        ? '2. Cadran'
                        : '3. Auto'}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                      {pt.organ}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-amber-700 dark:text-amber-300">
                      {pt.productLabel}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-300">
                      {pt.oiler}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300 max-w-xs">
                      {pt.protocol}
                    </td>
                    <td className="py-2.5 px-3 text-rose-600 dark:text-rose-300 max-w-xs">
                      {pt.watchmakerRule}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
