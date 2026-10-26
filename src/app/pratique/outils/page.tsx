'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wrench,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Eye,
  Sliders,
  Search,
  ZoomIn,
  Sparkles,
  Crosshair
} from 'lucide-react';

interface PracticalTool {
  id: string;
  name: string;
  code: string;
  spec: string;
  role: string;
  bestPractices: string[];
  maintenance: string;
  dangerToAvoid: string;
}

const PRACTICAL_TOOLS: PracticalTool[] = [
  {
    id: 'brucelles',
    name: '1. Brucelles de Précision (Dumont N° 3 & N° 5)',
    code: 'Acier Inox Antimag. / Dumoxel / Bronze Al.',
    spec: 'Pointes 0.05 × 0.01 mm (N° 5) • Portée 1.5 mm',
    role: 'Prolongement direct des doigts de l’horloger pour saisir, positionner et manipuler 95 % des composants sans les marquer ni les aimanter.',
    bestPractices: [
      'Tenir la brucelle souple sans crisper la main : la pression de serrage doit être minimale pour ne jamais catapulter la pièce.',
      'Contrôler la planéité et le parallélisme parfait des becs sous la loupe 10x avant toute intervention sur l’assortiment.',
      'Réserver impérativement une brucelle N° 5 en Dumoxel aux travaux sur le spiral, et une brucelle en laiton/bronze ou bois aux ponts rhodiés.'
    ],
    maintenance: 'Dressage régulier des faces internes et externes à la pierre d’Arkansas blanche lubrifiée à l’huile fine, suivi d’un cassage d’arête au cabron d’émeri 4/0.',
    dangerToAvoid: 'Ne jamais utiliser une brucelle N° 5 pour faire levier sur un pont ou débloquer une vis grippée : les pointes se croisent instantanément.'
  },
  {
    id: 'tournevis',
    name: '2. Tournevis Dynamométriques & Calibrés',
    code: 'Bagues codées Ø 0.50 mm à Ø 2.50 mm',
    spec: 'Profil d’affûtage en « T » • Couples 0.8 à 3.5 cNm',
    role: 'Transmission perpendiculaire du couple de serrage sur les vis de ponts, rochets et pitons sans refouler l’acier poli de la fente.',
    bestPractices: [
      'Choisir une lame dont la largeur couvre 90 % à 95 % du diamètre de la tête de vis sans jamais déborder dans le lamage du pont.',
      'L’épaisseur de l’extrémité doit entrer librement jusqu’au fond de la fente avec un jeu inférieur à 0.02 mm.',
      'Poser l’index sur la tête octogonale pivotante et faire tourner le fût moleté uniquement avec le pouce et le majeur.'
    ],
    maintenance: 'Affûtage au chariot guide-lame sur pierre d’Arkansas à deux faces strictement parallèles (profil en T), jamais en biseau tranchant.',
    dangerToAvoid: 'Une lame en coin (biseau usé) génère une composante verticale d’éjection (cam-out) qui ripe hors de la fente et raye la platine.'
  },
  {
    id: 'loupe',
    name: '3. Loupes d’Horloger Aplanétiques (N° 2.5 à 10x)',
    code: 'Focale f = 100 mm (2.5x) à f = 25 mm (10x)',
    spec: 'Optique minérale traitée anti-reflet • Trous d’aération',
    role: 'Inspection optique sans distorsion sphérique des ébats de hauteur, de l’état des pivots, du centrage du spiral et du ménisque d’huile.',
    bestPractices: [
      'Loupe N° 2.5 ou N° 3 (3.3x à 4x) : assemblage général, pose des rouages, vissage des ponts et travail à distance ergonomique.',
      'Loupe N° 1 (10x / f = 25 mm) : contrôle critique du ménisque Moebius 9010 dans l’Incabloc, pénétration des palettes d’ancre et polissage des pivots.',
      'Conserver les deux yeux ouverts en permanence pour supprimer la fatigue nerveuse et conserver la perception de l’établi.'
    ],
    maintenance: 'Dévissage périodique de la bague optique pour nettoyer la lentille au papier optique et soufflette sèche.',
    dangerToAvoid: 'Éviter les lentilles acryliques bas de gamme dont les aberrations chromatiques faussent l’appréciation du ménisque d’huile.'
  },
  {
    id: 'porte_mouvement',
    name: '4. Porte-Mouvement Extensible d’Établi',
    code: 'Entraxe 8¾‴ à 16½‴ (19.4 mm à 36.6 mm)',
    spec: 'Appui périphérique 3 points • Acier inox amagnétique',
    role: 'Maintien rigide, plan et sans flexion de la platine principale lors du démontage, du chassage des aiguilles et du réglage.',
    bestPractices: [
      'Engager la portée cylindrique de la platine dans l’épaulement des mors en vérifiant qu’aucun mobile ni pont côté cadran n’est comprimé.',
      'Orienter la tige de remontoir vers l’échancrure dégagée pour permettre le tirage libre en positions T1, T2 et T3.',
      'Serrer la vis micrométrique de blocage avec deux doigts seulement : le calibre doit être maintenu sans bridage mécanique.'
    ],
    maintenance: 'Dépoussiérage quotidien au Rodico et à la soufflette des rainures d’appui pour éliminer toute limaille résiduelle.',
    dangerToAvoid: 'Un serrage excessif voile élastiquement la platine de quelques microns et annule l’ébat de hauteur du mobile de centre !'
  },
  {
    id: 'huiliers',
    name: '5. Pique-Huiles Codés & Moelle de Sureau',
    code: 'Noir (0.08) • Rouge (0.12) • Bleu (0.18) • Vert (0.25)',
    spec: 'Palette spatulée calibrée • Godets agates anti-poussière',
    role: 'Prélèvement et dépose par capillarité pure de micro-volumes de lubrifiants Moebius (9010, HP-1300, 9415) au centième de millimètre.',
    bestPractices: [
      'Tremper uniquement l’extrémité de la palette perpendiculairement dans le godet agate : la goutte retenue doit être sphérique.',
      'Approcher la pointe du contre-pivot sans heurter l’acier : laisser le ménisque d’huile sauter par tension superficielle.',
      'Piquer systématiquement la lame dans de la moelle de sureau sèche ou de la mousse Pégase avant et après chaque point d’huilage.'
    ],
    maintenance: 'Remplacer régulièrement le bloc de moelle de sureau dès que sa surface présente des traces saturées de lubrifiant.',
    dangerToAvoid: 'Ne jamais mélanger deux huiles (ex: Moebius 9010 et 9415) avec un pique-huile non nettoyé : contamination chimique immédiate.'
  }
];

export default function PratiqueOutilsPage() {
  const [selectedToolId, setSelectedToolId] = useState<string>('brucelles');
  const [comparatorTab, setComparatorTab] = useState<'screwdriver' | 'tweezers'>('screwdriver');
  const [bladeProfileValue, setBladeProfileValue] = useState<number>(55);
  const [tweezerProfileValue, setTweezerProfileValue] = useState<number>(85);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null
  });

  const activeTool = PRACTICAL_TOOLS.find((t) => t.id === selectedToolId) || PRACTICAL_TOOLS[0];

  const getBladeStatus = (val: number) => {
    if (val < 36) {
      return {
        state: 'worn',
        badge: 'DANGER — PROFIL EN COIN / BISEAU USÉ',
        color: 'text-rose-500 border-rose-500/40 bg-rose-500/10',
        title: 'Lame émoussée en coin : Éjection verticale (« Cam-Out ») & Rayure du pont',
        desc: 'Les flancs obliques de la lame ne portent que sur les arêtes supérieures de la fente. Dès que le couple dépasse 0.8 cNm, la composante verticale Fz = F·tan(α) soulève la lame qui ripe hors de la vis, refoule l’acier poli et balafre le rhodiage du pont.',
        slotWidthPct: 82,
        tipThicknessPct: 45,
        camOutForce: '+68 % (Éjection)',
        verdict: 'REFOULEMENT DE LA FENTE & RISQUE MAJEUR DE RAYURE'
      };
    }
    if (val <= 74) {
      return {
        state: 'optimal',
        badge: 'CONFORME NIHS — AFFÛTAGE EN « T » PARALLÈLE',
        color: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
        title: 'Affûtage horloger à faces parallèles (Pierre d’Arkansas)',
        desc: 'Les deux méplats terminaux sont strictement parallèles sur 0.35 mm de hauteur et remplissent 95 % de la largeur de fente. La lame touche le fond plat de la fente : la force est 100 % tangentielle (Fz = 0), transmettant le couple sans marquer l’acier.',
        slotWidthPct: 95,
        tipThicknessPct: 92,
        camOutForce: '0 % (Transmission pure)',
        verdict: 'PORTÉE OPTIMALE 95 % • AUCUN MARQUAGE DE LA VIS'
      };
    }
    return {
      state: 'wide',
      badge: 'ERREUR DE CALIBRE — LAME TROP LARGE (> 100 %)',
      color: 'text-amber-500 border-amber-500/40 bg-amber-500/10',
      title: 'Lame débordante : Usinage accidentel du lamage de pont',
      desc: 'La largeur de la lame dépasse le diamètre de la tête de vis. Lors de la rotation dans une noyure (lamage de pont), les coins vifs de la lame mordent la paroi circulaire en laiton rhodié et laissent un sillon concentrique irréparable.',
      slotWidthPct: 118,
      tipThicknessPct: 95,
      camOutForce: 'Frottement périphérique',
      verdict: 'BLESSURE DU LAMAGE DE PONT EN ROTATION'
    };
  };

  const getTweezerStatus = (val: number) => {
    if (val < 36) {
      return {
        state: 'crossed',
        badge: 'DANGER — BECS CROISÉS & ASYMÉTRIQUES',
        color: 'text-rose-500 border-rose-500/40 bg-rose-500/10',
        title: 'Pointes décalées (ΔL = 0.12 mm) : L’effet « Catapulte » d’atelier',
        desc: 'Une branche est plus courte ou tordue. Au serrage d’un mobile ou d’une vis, le couple de torsion latéral fait basculer les pointes l’une sur l’autre : la pièce est projetée à plusieurs mètres dans l’atelier.',
        contactLen: '0.05 mm (Ponctuel instable)',
        parallelAngle: '4.8° (Divergent)',
        verdict: 'ÉJECTION IMMÉDIATE DE LA PIÈCE AU SERRAGE'
      };
    }
    if (val <= 70) {
      return {
        state: 'blunt',
        badge: 'USURE — BECS ARRONDIS / BAVURE INTERNE',
        color: 'text-amber-500 border-amber-500/40 bg-amber-500/10',
        title: 'Portée interne bombée : Glissement et crispation des doigts',
        desc: 'Les faces internes ne sont plus planes. L’horloger est forcé d’exercer une pression excessive pour retenir la pièce, ce qui marque l’or ou le laiton des ponts et fatigue le nerf médian.',
        contactLen: '0.30 mm (Bombé)',
        parallelAngle: '1.9° (Ouvert en bout)',
        verdict: 'PRÉHENSION INCERTAINE • MARQUAGE DES COMPOSANTS'
      };
    }
    return {
      state: 'optimal',
      badge: 'DRESSAGE PARFAIT — PIERRE D’ARKANSAS BLANCHE',
      color: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
      title: 'Portée plane parallèle sur 1.5 mm & pointes jointives au micron',
      desc: 'Dressées à plat sur la pierre d’Arkansas entre les pointes fermées, les deux faces internes offrent 1.5 mm d’appui plan rigoureusement parallèle. La pièce est tenue fermement avec une pression minimale des doigts.',
      contactLen: '1.50 mm (Plan parallèle)',
      parallelAngle: '0.0° (Jointif parfait)',
      verdict: 'MAINTIEN SÛR SANS EFFORT • IDÉAL SPIRAL & ASSORTIMENT'
    };
  };

  const bladeInfo = getBladeStatus(bladeProfileValue);
  const tweezerInfo = getTweezerStatus(tweezerProfileValue);

  const quizQuestions = [
    {
      question: "Quel est l’instrument le plus essentiel pour manipuler les petits composants d’un calibre sans les rayer ?",
      options: [
        "Une pince universelle d’atelier",
        "Des brucelles horlogères de précision adaptées (Dumont)",
        "Une pointe à tracer métallique",
        "Les doigts nus"
      ],
      correct: 1,
      explanation: "Les brucelles horlogères (en Dumoxel, bronze ou laiton) permettent une préhension douce, amagnétique et micrométrique des pièces fines."
    },
    {
      question: "Pourquoi les lames de tournevis d’horloger doivent-elles avoir un profil à faces parallèles (en T) ?",
      options: [
        "Pour s’asseoir à plat au fond de la fente et transmettre le couple sans composante verticale d’éjection (cam-out)",
        "Par simple tradition esthétique de Genève",
        "Pour couper le métal des vis usées",
        "Pour pouvoir visser plus rapidement"
      ],
      correct: 0,
      explanation: "Un profil à faces parallèles annule la force verticale d’éjection Fz = F·tan(α), épouse la fente sur 95 % de sa largeur et prévient tout refoulement d’acier."
    },
    {
      question: "Quelle précaution fondamentale doit-on respecter lors du nettoyage des pique-huiles d’établi ?",
      options: [
        "Les essuyer sur un tablier en coton",
        "Les piquer dans un bloc de moelle de sureau déshydratée ou mousse Pégase",
        "Les frotter avec du papier de verre",
        "Les laver à l’eau savonneuse"
      ],
      correct: 1,
      explanation: "La moelle de sureau naturelle absorbe les résidus d’huile sans laisser aucune micro-fibre ni contaminer le godet suivant."
    }
  ];

  const handleAnswer = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Pratique</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Maîtrise Technique, Affûtage & Gestuelle d’Atelier</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Outils & Équipement <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Fondamentaux d’Atelier
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Un bon horloger se reconnaît à l’état de ses pointes de brucelles et de ses mêches de tournevis. Explorez notre banc de contrôle optique d’affûtage à la pierre d’Arkansas et les fiches d’atelier des 5 instruments maîtres.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Banc d’Inspection Binoculaire • Pierre d’Arkansas</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Comparateur Visuel SVG d’Affûtage & de Dressage d’Outils
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Faites glisser le curseur micrométrique pour observer pourquoi un mauvais affûtage provoque le ripage des vis (« cam-out ») ou l’éjection catastrophique des fournitures.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setComparatorTab('screwdriver')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  comparatorTab === 'screwdriver'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                1. Lame de Tournevis & Fente de Vis
              </button>
              <button
                onClick={() => setComparatorTab('tweezers')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  comparatorTab === 'tweezers'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                2. Becs de Brucelles Dumont N° 5
              </button>
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  loupe10x
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {comparatorTab === 'screwdriver' ? (
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                  <span>COUPE AXIALE (FENTE ACIER POLI)</span>
                  <span>VUE DE DESSUS (LAMAGE DE PONT)</span>
                </div>

                <div className="overflow-hidden rounded-xl bg-[#070b14]">
                  <svg
                    viewBox="0 0 680 340"
                    className="w-full h-auto transition-transform duration-300"
                    style={{
                      transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                      transformOrigin: '340px 190px'
                    }}
                  >
                    <defs>
                      <linearGradient id="steelScrew" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="50%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                      <linearGradient id="brassBridge" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>
                      <linearGradient id="bladeSteel" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#cbd5e1" />
                        <stop offset="50%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#64748b" />
                      </linearGradient>
                    </defs>

                    <line x1="340" y1="15" x2="340" y2="325" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />

                    <g transform="translate(20, 20)">
                      <rect x="10" y="185" width="290" height="105" rx="6" fill="url(#brassBridge)" stroke="#475569" strokeWidth="1.5" />
                      <path d="M 55 185 L 75 225 L 235 225 L 255 185 Z" fill="#070b14" stroke="#64748b" strokeWidth="1" />

                      <path
                        d="M 82 225 L 82 175 C 82 162, 115 155, 134 155 L 134 205 L 176 205 L 176 155 C 195 155, 228 162, 228 175 L 228 225 L 185 225 L 185 290 L 125 290 L 125 225 Z"
                        fill="url(#steelScrew)"
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                      />

                      {bladeInfo.state === 'worn' && (
                        <g>
                          <path
                            d="M 118 25 L 192 25 L 174 148 Q 155 185 136 148 Z"
                            fill="url(#bladeSteel)"
                            stroke="#f43f5e"
                            strokeWidth="2"
                          />
                          <circle cx="134" cy="158" r="5" fill="#f43f5e" />
                          <circle cx="176" cy="158" r="5" fill="#f43f5e" />
                          <path d="M 155 135 L 155 75" stroke="#f43f5e" strokeWidth="3" />
                          <polygon points="155,65 147,80 163,80" fill="#f43f5e" />
                          <text x="155" y="55" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">
                            ÉJECTION Fz = F·tan(α)
                          </text>
                          <text x="155" y="218" textAnchor="middle" fill="#fb7185" fontSize="9" fontWeight="bold">
                            Fond non atteint (Vide)
                          </text>
                        </g>
                      )}

                      {bladeInfo.state === 'optimal' && (
                        <g>
                          <path
                            d="M 115 25 L 195 25 L 174 152 L 174 203 L 136 203 L 136 152 Z"
                            fill="url(#bladeSteel)"
                            stroke="#10b981"
                            strokeWidth="2"
                          />
                          <line x1="136" y1="155" x2="136" y2="203" stroke="#10b981" strokeWidth="3" />
                          <line x1="174" y1="155" x2="174" y2="203" stroke="#10b981" strokeWidth="3" />
                          <text x="155" y="55" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                            PROFIL EN « T » PARALLÈLE (90°)
                          </text>
                          <text x="155" y="218" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                            Assise plane au fond (Fz = 0)
                          </text>
                        </g>
                      )}

                      {bladeInfo.state === 'wide' && (
                        <g>
                          <path
                            d="M 110 25 L 200 25 L 175 152 L 175 203 L 135 203 L 135 152 Z"
                            fill="url(#bladeSteel)"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <circle cx="66" cy="200" r="6" fill="#f59e0b" />
                          <circle cx="244" cy="200" r="6" fill="#f59e0b" />
                          <line x1="66" y1="200" x2="244" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                          <text x="155" y="55" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                            DÉBORDEMENT LATÉRAL (&gt; 100 %)
                          </text>
                        </g>
                      )}

                      <text x="18" y="280" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        Pont Rhodié (Lamage)
                      </text>
                    </g>

                    <g transform="translate(360, 20)">
                      <rect x="20" y="30" width="270" height="260" rx="14" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                      <circle cx="155" cy="160" r="92" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                      <circle cx="155" cy="160" r="72" fill="url(#steelScrew)" stroke="#e2e8f0" strokeWidth="2" />

                      <rect x="83" y="146" width="144" height="28" rx="2" fill="#090d16" stroke="#475569" strokeWidth="1" />

                      {(() => {
                        const bladeW = (144 * bladeInfo.slotWidthPct) / 100;
                        const bladeH = (26 * bladeInfo.tipThicknessPct) / 100;
                        const bladeX = 155 - bladeW / 2;
                        const bladeY = 160 - bladeH / 2;
                        const strokeCol =
                          bladeInfo.state === 'optimal'
                            ? '#10b981'
                            : bladeInfo.state === 'worn'
                            ? '#f43f5e'
                            : '#f59e0b';
                        return (
                          <g>
                            <rect
                              x={bladeX}
                              y={bladeY}
                              width={bladeW}
                              height={bladeH}
                              rx="2"
                              fill={strokeCol}
                              fillOpacity="0.35"
                              stroke={strokeCol}
                              strokeWidth="2.5"
                            />
                            {bladeInfo.state === 'wide' && (
                              <circle
                                cx="155"
                                cy="160"
                                r="84"
                                fill="none"
                                stroke="#f43f5e"
                                strokeWidth="2.5"
                                strokeDasharray="6 4"
                              />
                            )}
                            {bladeInfo.state === 'worn' && (
                              <path
                                d="M 110 146 L 195 122 M 115 174 L 205 198"
                                stroke="#f43f5e"
                                strokeWidth="2.5"
                              />
                            )}
                          </g>
                        );
                      })()}

                      <text x="155" y="52" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                        Largeur Lame : {bladeInfo.slotWidthPct}% Ø Vis
                      </text>
                      <text x="155" y="276" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                        {bladeInfo.state === 'wide'
                          ? '⚠️ Sillon rayé dans le lamage du pont !'
                          : bladeInfo.state === 'worn'
                          ? '⚠️ Ripage de la lame sur la tête polie !'
                          : '✓ Marge de sécurité dans le lamage'}
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${bladeInfo.color}`}>
                  <span>{bladeInfo.badge}</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {bladeInfo.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {bladeInfo.desc}
                </p>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      Curseur Micrométrique d’Affûtage :
                    </span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">{bladeProfileValue} %</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={98}
                    value={bladeProfileValue}
                    onChange={(e) => setBladeProfileValue(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={() => setBladeProfileValue(18)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
                    >
                      Biseau Usé (Ripage)
                    </button>
                    <button
                      onClick={() => setBladeProfileValue(55)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                    >
                      Profil « T » (95 %)
                    </button>
                    <button
                      onClick={() => setBladeProfileValue(90)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                    >
                      Trop Large (&gt;100%)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400 font-mono text-[10px]">COMPOSANTE VERTICALE Fz</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{bladeInfo.camOutForce}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400 font-mono text-[10px]">REMPLISSAGE FENTE</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{bladeInfo.slotWidthPct} % largeur</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                  VERDICT ATELIER : {bladeInfo.verdict}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 relative overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                  <span>BECS DE BRUCELLES DUMONT N° 5 (PROFIL)</span>
                  <span>COMPORTEMENT AU SERRAGE D’UN PITON</span>
                </div>

                <div className="overflow-hidden rounded-xl bg-[#070b14]">
                  <svg
                    viewBox="0 0 680 340"
                    className="w-full h-auto transition-transform duration-300"
                    style={{
                      transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                      transformOrigin: '340px 175px'
                    }}
                  >
                    <line x1="340" y1="15" x2="340" y2="325" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />

                    <g transform="translate(25, 20)">
                      <text x="145" y="25" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                        Géométrie des Pointes (x20)
                      </text>

                      {tweezerInfo.state === 'crossed' && (
                        <g>
                          <path d="M 45 45 L 138 225 L 154 225 L 95 45 Z" fill="#94a3b8" stroke="#f43f5e" strokeWidth="2" />
                          <path d="M 245 45 L 136 242 L 152 242 L 195 45 Z" fill="#cbd5e1" stroke="#f43f5e" strokeWidth="2" />
                          <line x1="120" y1="225" x2="180" y2="225" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                          <line x1="120" y1="242" x2="180" y2="242" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                          <text x="145" y="275" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">
                            ΔL = 0.12 mm • Pointes croisées
                          </text>
                        </g>
                      )}

                      {tweezerInfo.state === 'blunt' && (
                        <g>
                          <path d="M 55 45 L 128 220 Q 138 238 148 220 L 105 45 Z" fill="#94a3b8" stroke="#f59e0b" strokeWidth="2" />
                          <path d="M 235 45 L 148 220 Q 158 238 168 220 L 185 45 Z" fill="#cbd5e1" stroke="#f59e0b" strokeWidth="2" />
                          <text x="145" y="275" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Extrémités bombées • Pas de méplat interne
                          </text>
                        </g>
                      )}

                      {tweezerInfo.state === 'optimal' && (
                        <g>
                          <path d="M 60 45 L 132 165 L 146 165 L 146 238 L 136 238 L 95 45 Z" fill="#cbd5e1" stroke="#10b981" strokeWidth="2" />
                          <path d="M 230 45 L 158 165 L 146 165 L 146 238 L 156 238 L 195 45 Z" fill="#e2e8f0" stroke="#10b981" strokeWidth="2" />
                          <rect x="143" y="165" width="6" height="73" fill="#10b981" fillOpacity="0.45" />
                          <text x="145" y="275" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            Portée plane parallèle 1.50 mm (Pierre d’Arkansas)
                          </text>
                        </g>
                      )}
                    </g>

                    <g transform="translate(365, 20)">
                      <text x="145" y="25" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                        Vecteurs de Force sur la Fourniture
                      </text>

                      {tweezerInfo.state === 'crossed' && (
                        <g>
                          <path d="M 75 60 L 128 190 L 138 190 L 105 60 Z" fill="#94a3b8" />
                          <path d="M 215 60 L 160 202 L 150 202 L 185 60 Z" fill="#cbd5e1" />
                          <circle cx="178" cy="155" r="16" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <path d="M 155 182 Q 195 140 245 105" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="5 3" />
                          <polygon points="250,100 234,104 243,116" fill="#f43f5e" />
                          <text x="145" y="268" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">
                            ⚠️ EFFET CATAPULTE : Pièce éjectée !
                          </text>
                        </g>
                      )}

                      {tweezerInfo.state === 'blunt' && (
                        <g>
                          <path d="M 75 60 L 122 195 Q 130 206 135 195 L 105 60 Z" fill="#94a3b8" />
                          <path d="M 215 60 L 168 195 Q 160 206 155 195 L 185 60 Z" fill="#cbd5e1" />
                          <circle cx="145" cy="202" r="15" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <path d="M 145 215 L 145 248" stroke="#f59e0b" strokeWidth="3" />
                          <text x="145" y="275" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                            Glissement vers le bas &amp; rayure
                          </text>
                        </g>
                      )}

                      {tweezerInfo.state === 'optimal' && (
                        <g>
                          <path d="M 80 60 L 122 155 L 130 155 L 130 225 L 120 225 L 105 60 Z" fill="#cbd5e1" stroke="#10b981" strokeWidth="1.5" />
                          <path d="M 210 60 L 168 155 L 160 155 L 160 225 L 170 225 L 185 60 Z" fill="#e2e8f0" stroke="#10b981" strokeWidth="1.5" />
                          <rect x="130" y="172" width="30" height="32" rx="4" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                          <path d="M 95 188 L 125 188" stroke="#10b981" strokeWidth="3" />
                          <path d="M 195 188 L 165 188" stroke="#10b981" strokeWidth="3" />
                          <text x="145" y="275" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                            ✓ Forces opposées coplanaires (Équilibre stable)
                          </text>
                        </g>
                      )}
                    </g>
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${tweezerInfo.color}`}>
                  <span>{tweezerInfo.badge}</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {tweezerInfo.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tweezerInfo.desc}
                </p>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-500" />
                      État de Dressage des Pointes N° 5 :
                    </span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">{tweezerProfileValue} %</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={98}
                    value={tweezerProfileValue}
                    onChange={(e) => setTweezerProfileValue(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button
                      onClick={() => setTweezerProfileValue(15)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20"
                    >
                      Becs Croisés
                    </button>
                    <button
                      onClick={() => setTweezerProfileValue(52)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                    >
                      Becs Bombés
                    </button>
                    <button
                      onClick={() => setTweezerProfileValue(88)}
                      className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                    >
                      Dressé Arkansas
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400 font-mono text-[10px]">PORTÉE INTERNE</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{tweezerInfo.contactLen}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <div className="text-slate-400 font-mono text-[10px]">PARALLÉLISME BECS</div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">{tweezerInfo.parallelAngle}</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                  VERDICT ATELIER : {tweezerInfo.verdict}
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="flex flex-wrap gap-2">
          {PRACTICAL_TOOLS.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedToolId(tool.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                selectedToolId === tool.id
                  ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                  : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
              }`}
            >
              {tool.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                  Fiche Pratique d’Atelier • {activeTool.code}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {activeTool.name}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                {activeTool.spec}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {activeTool.role}
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" />
                <span>Repère Géométrique & Étalonnage d’Établi</span>
              </div>
              <svg viewBox="0 0 620 120" className="w-full h-auto">
                {selectedToolId === 'brucelles' && (
                  <g>
                    <path d="M 30 35 L 420 52 L 540 57 L 420 57 L 30 48 Z" fill="#94a3b8" />
                    <path d="M 30 85 L 420 68 L 540 63 L 420 63 L 30 72 Z" fill="#cbd5e1" />
                    <circle cx="540" cy="60" r="18" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                    <text x="35" y="24" fill="#e2e8f0" fontSize="11" fontFamily="monospace">
                      Dumont N° 5 (Spiral : Acier Dumoxel amagnétique) • N° 3 (Rouage) • Laiton (Ponts)
                    </text>
                    <text x="395" y="102" fill="#34d399" fontSize="10" fontFamily="monospace">
                      Portée plane 1.5 mm dressée à l’Arkansas
                    </text>
                  </g>
                )}
                {selectedToolId === 'tournevis' && (
                  <g>
                    {[
                      { x: 30, col: '#f43f5e', d: 'Ø 0.60', c: 'Rouge' },
                      { x: 140, col: '#eab308', d: 'Ø 0.80', c: 'Jaune' },
                      { x: 250, col: '#1e293b', d: 'Ø 1.00', c: 'Noir' },
                      { x: 360, col: '#8b5cf6', d: 'Ø 1.20', c: 'Violet' },
                      { x: 470, col: '#94a3b8', d: 'Ø 1.60', c: 'Gris' }
                    ].map((b, i) => (
                      <g key={i} transform={`translate(${b.x}, 22)`}>
                        <rect x="0" y="0" width="95" height="72" rx="8" fill="#0f172a" stroke="#334155" />
                        <rect x="12" y="12" width="71" height="14" rx="3" fill={b.col} stroke="#cbd5e1" strokeWidth="0.8" />
                        <text x="47" y="46" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold" fontFamily="monospace">
                          {b.d} mm
                        </text>
                        <text x="47" y="62" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          Bague {b.c}
                        </text>
                      </g>
                    ))}
                  </g>
                )}
                {selectedToolId === 'loupe' && (
                  <g>
                    <rect x="35" y="25" width="70" height="70" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <path d="M 105 35 L 320 60 L 105 85 Z" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeDasharray="4 3" />
                    <circle cx="320" cy="60" r="8" fill="#10b981" />
                    <text x="150" y="30" fill="#f8fafc" fontSize="11" fontFamily="monospace">
                      Loupe N° 2.5 (4x) : Focale 62 mm (Assemblage)
                    </text>
                    <text x="150" y="102" fill="#38bdf8" fontSize="11" fontFamily="monospace">
                      Loupe N° 1 (10x) : Focale 25 mm (Contrôle ménisque 9010 &amp; levées)
                    </text>
                  </g>
                )}
                {selectedToolId === 'porte_mouvement' && (
                  <g>
                    <rect x="60" y="25" width="180" height="70" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                    <circle cx="150" cy="60" r="28" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                    <text x="270" y="48" fill="#f8fafc" fontSize="11" fontFamily="monospace">
                      Maintien périphérique sur l’épaulement de platine
                    </text>
                    <text x="270" y="72" fill="#fbbf24" fontSize="11" fontFamily="monospace">
                      Couple de serrage modéré : éviter tout voilage de la platine
                    </text>
                  </g>
                )}
                {selectedToolId === 'huiliers' && (
                  <g>
                    {[
                      { x: 25, col: '#334155', name: 'Noir (Ø 0.08)', usage: 'Pivot Balancier / Ancre' },
                      { x: 175, col: '#ef4444', name: 'Rouge (Ø 0.12)', usage: 'Roue Échapp. / Seconde' },
                      { x: 325, col: '#3b82f6', name: 'Bleu (Ø 0.18)', usage: 'Roue Moyenne / Centre' },
                      { x: 475, col: '#10b981', name: 'Vert (Ø 0.25)', usage: 'Barillet / Minuterie' }
                    ].map((p, i) => (
                      <g key={i} transform={`translate(${p.x}, 20)`}>
                        <rect x="0" y="0" width="135" height="78" rx="8" fill="#0f172a" stroke={p.col} strokeWidth="2" />
                        <circle cx="22" cy="24" r="7" fill={p.col} />
                        <text x="36" y="28" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                          {p.name}
                        </text>
                        <text x="14" y="56" fill="#94a3b8" fontSize="10">
                          {p.usage}
                        </text>
                      </g>
                    ))}
                  </g>
                )}
              </svg>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Règles d’Or de Manipulation d’Établi :</span>
              </h3>
              <div className="space-y-2.5">
                {activeTool.bestPractices.map((bp, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs sm:text-sm"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {bp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Entretien &amp; Dressage à la Pierre :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeTool.maintenance}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1.5">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Piège / Erreur Fréquente :</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeTool.dangerToAvoid}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Démonstration d’Atelier</span>
              </div>

              <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/4tl7xNPvmyM?start=573"
                  title="Présentation des outils horlogers"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic text-center">
                Observation du geste d’établi, hauteur des accoudoirs et posture des mains.
              </p>
            </div>
          </div>
        </div>

        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Auto-Évaluation Pratique
            </span>
            <h3 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white">
              Quiz : Bonnes Pratiques &amp; Affûtage d’Établi
            </h3>
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, qIdx) => {
              const userAnswer = quizAnswers[qIdx];
              const isAnswered = userAnswer !== null;

              return (
                <div
                  key={qIdx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isCorrect = optIdx === q.correct;

                      let btnStyle =
                        'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500';

                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle =
                            'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-600 font-bold';
                        } else {
                          btnStyle = 'opacity-50 border-transparent bg-slate-100 dark:bg-slate-800';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswer(qIdx, optIdx)}
                          disabled={isAnswered}
                          className={`p-3 rounded-xl border text-left transition-all ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
                      💡 <strong>Explication :</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
