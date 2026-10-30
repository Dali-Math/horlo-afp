'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Award,
  Compass,
  CheckCircle2,
  Layers,
  ChevronRight,
  Sparkles,
  ZoomIn,
  Sliders
} from 'lucide-react';

interface CalibreProfile {
  id: string;
  name: string;
  manufacture: string;
  year: string;
  category: 'manuel' | 'automatique' | 'chronographe' | 'haute_horlogerie';
  diameterLines: string;
  diameterMm: string;
  thickness: string;
  frequencyHz: string;
  frequencyA_h: string;
  jewels: number;
  powerReserve: string;
  escapement: string;
  historicLegacy: string;
  finishing: string[];
  strengths: string[];
}

const MYTHIC_CALIBRES: CalibreProfile[] = [
  {
    id: 'eta6497',
    name: 'ETA 6497-1 Unitas',
    manufacture: 'Unitas / ETA SA Manufacture Horlogère Suisse',
    year: '1950 (Création Auguste Reymond)',
    category: 'manuel',
    diameterLines: "16½ '''",
    diameterMm: '36.60 mm',
    thickness: '4.50 mm',
    frequencyHz: '2.5 Hz',
    frequencyA_h: '18’000 A/h',
    jewels: 17,
    powerReserve: '46 heures',
    escapement: 'Échappement à ancre suisse 15 dents, balancier Glucydur',
    historicLegacy: 'Conçu à l’origine pour les montres de poche de précision, il est devenu le calibre roi indiscutable des établis en Suisse pour la maîtrise du rhabillage.',
    finishing: ['Perlage circulaire sur platine', 'Côtes de Genève sur ponts', 'Vis bleuies thermiquement', 'Rochet soleillé'],
    strengths: ['Architecture aérée idéale à l’établi', 'Fiabilité légendaire', 'Pièces standards interchangeables NIHS']
  },
  {
    id: 'eta2824',
    name: 'ETA 2824-2 Automatique',
    manufacture: 'ETA SA (Grenchen, Suisse)',
    year: '1971 (Dérivé de la lignée Eterna 1427)',
    category: 'automatique',
    diameterLines: "11½ '''",
    diameterMm: '25.60 mm',
    thickness: '4.60 mm',
    frequencyHz: '4.0 Hz',
    frequencyA_h: '28’800 A/h',
    jewels: 25,
    powerReserve: '38 heures',
    escapement: 'Ancre suisse, balancier Glucydur, raquetterie Etachron',
    historicLegacy: 'Surnommé « le tracteur suisse », c’est le calibre automatique le plus éprouvé et respecté de toute l’histoire de l’horlogerie moderne.',
    finishing: ['Masse oscillante décorée Côtes de Genève', 'Rhodiage haute résistance', 'Gravure dorée ETA'],
    strengths: ['Remontage automatique bidirectionnel fluide', 'Système Etachron pour un réglage fin', 'Robustesse absolue au quotidien']
  },
  {
    id: 'valjoux7750',
    name: 'Valjoux 7750 Chronographe',
    manufacture: 'Valjoux / ETA SA (Vallée de Joux)',
    year: '1973 (Création par Edmond Capt)',
    category: 'chronographe',
    diameterLines: "13¼ '''",
    diameterMm: '30.00 mm',
    thickness: '7.90 mm',
    frequencyHz: '4.0 Hz',
    frequencyA_h: '28’800 A/h',
    jewels: 25,
    powerReserve: '48 heures',
    escapement: 'Commande par navette à coulisse, pignon oscillant Edouard Heuer',
    historicLegacy: 'Premier chronographe conçu avec assistance informatique précoce. Sauvé par Edmond Capt lors de la crise du quartz, il motorise les plus grands chronographes suisses.',
    finishing: ['Rotor monté sur roulement à billes', 'Ponts satinés brossés', 'Cames et leviers en acier trempé'],
    strengths: ['Déclenchement franc et indestructible', 'Engrènement à 1/3 de dent du pignon oscillant', 'Facilité de révision d’atelier']
  },
  {
    id: 'elprimero',
    name: 'Zenith El Primero 400',
    manufacture: 'Zenith Manufacture (Le Locle, Suisse)',
    year: '1969 (Présenté le 10 janvier 1969)',
    category: 'chronographe',
    diameterLines: "13¼ '''",
    diameterMm: '30.00 mm',
    thickness: '6.50 mm',
    frequencyHz: '5.0 Hz',
    frequencyA_h: '36’000 A/h',
    jewels: 31,
    powerReserve: '50 heures',
    escapement: 'Roue à colonnes, embrayage horizontal, haute fréquence 5 Hz',
    historicLegacy: 'Le premier chronographe automatique intégré à haute fréquence au monde. Capable de mesurer les temps courts avec une résolution chirurgicale au 1/10e de seconde.',
    finishing: ['Roue à colonnes en acier bleui', 'Platine perlée', 'Masse oscillante ajourée avec étoile Zenith'],
    strengths: ['Haute fréquence 36’000 A/h ultra-stable', 'Précision chronométrique légendaire', 'A motorisé la Rolex Daytona (Cal. 4030)']
  },
  {
    id: 'rolex3235',
    name: 'Rolex Calibre 3235 Chronomètre Superlatif',
    manufacture: 'Manufacture des Montres Rolex (Genève / Bienne)',
    year: '2015 (14 brevets exclusifs)',
    category: 'automatique',
    diameterLines: "12 '''",
    diameterMm: '28.50 mm',
    thickness: '6.00 mm',
    frequencyHz: '4.0 Hz',
    frequencyA_h: '28’800 A/h',
    jewels: 31,
    powerReserve: '70 heures',
    escapement: 'Échappement Chronergy à haut rendement énergétique en nickel-phosphore',
    historicLegacy: 'Le standard contemporain de la manufacture à la couronne. Certifié Chronomètre Superlatif avec une tolérance stricte de -2/+2 secondes par jour après emboîtage.',
    finishing: ['Spiral Parachrom bleu paramagnétique', 'Amortisseurs de chocs haute performance Paraflex', 'Masse monobloc'],
    strengths: ['70h d’autonomie grâce au barillet haute capacité', 'Insensible aux champs magnétiques', 'Précision extrême -2/+2 s/jour']
  },
  {
    id: 'patek240',
    name: 'Patek Philippe Calibre 240 Micro-Rotor',
    manufacture: 'Patek Philippe (Plan-les-Ouates, Genève)',
    year: '1977',
    category: 'haute_horlogerie',
    diameterLines: "12½ '''",
    diameterMm: '27.50 mm',
    thickness: '2.53 mm (Extra-plat)',
    frequencyHz: '3.0 Hz',
    frequencyA_h: '21’600 A/h',
    jewels: 27,
    powerReserve: '48 heures',
    escapement: 'Balancier Gyromax à masselottes, spiral Spiromax en Silinvar',
    historicLegacy: 'Le summum de l’élégance genevoise : un calibre automatique extra-plat dont la masse oscillante en or massif 22K est intégrée dans l’épaisseur même des ponts.',
    finishing: ['Poinçon Patek Philippe', 'Côtes de Genève circulaires', 'Anglage rentrant fait main à la lime', 'Flancs étirés'],
    strengths: ['Épaisseur miraculeuse de 2.53 mm', 'Micro-rotor en or lourd 22K', 'Esthétique pure sans masque de rotor']
  },
  {
    id: 'jlc101',
    name: 'Jaeger-LeCoultre Calibre 101',
    manufacture: 'Jaeger-LeCoultre (Le Sentier, Vallée de Joux)',
    year: '1929 (Record du monde inégalé)',
    category: 'haute_horlogerie',
    diameterLines: 'Rectangle 14 x 4.8 mm',
    diameterMm: 'Longueur 14.0 mm • Largeur 4.8 mm',
    thickness: '3.40 mm',
    frequencyHz: '3.0 Hz',
    frequencyA_h: '21’600 A/h',
    jewels: 19,
    powerReserve: '33 heures',
    escapement: 'Échappement miniature à ancre sur deux étages',
    historicLegacy: 'Le plus petit mouvement mécanique au monde depuis près d’un siècle. Porté par la reine Élisabeth II lors de son couronnement en 1953.',
    finishing: ['98 composants microscopiques assemblés sous loupe binoculaire', 'Poids total : 0.98 gramme'],
    strengths: ['Poids total inférieur à 1 gramme', 'Micro-mécanique d’art absolue', 'Produit en quelques dizaines d’exemplaires par an']
  }
];

const ARCHITECTURE_DOSSIERS = [
  {
    title: 'Finitions Décoratives & Anglage Main',
    badge: 'Comparateur Binoculaire SVG',
    desc: 'Brut d’étampage vs Chanfrein CNC 45° vs Anglage main bercé à la gentiane, angle rentrant et poli noir.',
    href: '/theorie/mouvements/finitions-decoratives'
  },
  {
    title: 'Platine Principale & Ponts',
    badge: 'Laiton CuZn37Pb2 & Maillechort',
    desc: 'Noyures, pieds de positionnement, goupilles coniques et rigidité structurelle.',
    href: '/theorie/mouvements/platine-ponts'
  },
  {
    title: 'Stabilité Dimensionnelle & Ébats',
    badge: 'Tolérances au Micron',
    desc: 'Ébats de hauteur (0.015–0.030 mm), jeux radiaux et dilatation thermique des ponts.',
    href: '/theorie/mouvements/stabilite-dimensionnelle'
  },
  {
    title: 'Systèmes de Fixation & Visserie',
    badge: 'Filetages NIHS & Couples cNm',
    desc: 'Vis de ponts, brides de boîte, clés de fixage et goupilles de centrage.',
    href: '/theorie/mouvements/systeme-fixation'
  },
  {
    title: 'Palier & Fixation du Spiral',
    badge: 'Antichoc Incabloc & NIHS 92-11',
    desc: 'Coupe SVG Incabloc, ressort lyre, trou olivé, virolage et lubrification Moebius 9010.',
    href: '/theorie/mouvements/palier-spiral'
  }
];

export default function MouvementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCalibreId, setActiveCalibreId] = useState<string>('eta6497');
  const [compareId, setCompareId] = useState<string>('eta2824');
  const [finishingLevel, setFinishingLevel] = useState<number>(88);
  const [loupe10x, setLoupe10x] = useState<boolean>(false);

  const getAnglageState = (val: number) => {
    if (val < 35) {
      return {
        mode: 'raw',
        badge: 'BRUT D’ÉTAMPAGE / FRAISAGE — BAVURE NON ÉLIMINÉE',
        color: 'text-rose-500 border-rose-500/40 bg-rose-500/10',
        title: 'Arête vive à 90° avec bavure métallique résiduelle (Risque d’arrêt)',
        desc: 'Une lèvre de métal écroui (bavure de 15 µm) subsiste sur l’arête supérieure et peut se détacher dans le rouage.',
        surfaceRa: 'Ra 0.80 µm (Stries brutes)',
        interiorCorner: 'Brut / Écrasé',
        verdict: 'INACCEPTABLE EN HORLOGERIE SOIGNÉE (DANGER DE COPEAU LIBRE)'
      };
    }
    if (val <= 72) {
      return {
        mode: 'cnc',
        badge: 'CHANFREIN MACHINE CNC À 45° — FINITION INDUSTRIELLE',
        color: 'text-amber-500 border-amber-500/40 bg-amber-500/10',
        title: 'Chanfrein plat usiné à la fraise diamant : rayon résiduel dans l’angle',
        desc: 'La fraise rotative coupe un plan à 45° mais laisse obligatoirement son rayon d’outil (R = 0.20 mm) au fond du creux.',
        surfaceRa: 'Ra 0.12 µm (Facettes fraise)',
        interiorCorner: 'Rayon R = 0.20 mm (Arrondi)',
        verdict: 'PROPRE MÉCANIQUEMENT MAIS SANS ANGLE RENTRANT ARTISANAL'
      };
    }
    return {
      mode: 'hand',
      badge: 'HAUTE HORLOGERIE — ANGLAGE MAIN BERCÉ & ANGLE RENTRANT',
      color: 'text-emerald-500 border-emerald-500/40 bg-emerald-500/10',
      title: 'Anglage bercé poli miroir à la tige de gentiane & arête rentrante vive',
      desc: 'Poli miroir à la cheville de gentiane + pâte diamant 0.25 µm : profil convexe bercé, flanc étiré au trait et angle rentrant vif.',
      surfaceRa: 'Ra < 0.01 µm (Poli miroir)',
      interiorCorner: 'Angle rentrant vif (Arête pure)',
      verdict: 'EXCELLENCE ARTISANALE (POINÇON DE GENÈVE / FINITION MAIN)'
    };
  };

  const anglageInfo = getAnglageState(finishingLevel);

  const filteredCalibres = useMemo(() => {
    if (selectedCategory === 'all') return MYTHIC_CALIBRES;
    return MYTHIC_CALIBRES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const activeCalibre = MYTHIC_CALIBRES.find((c) => c.id === activeCalibreId) || MYTHIC_CALIBRES[0];
  const compareCalibre = MYTHIC_CALIBRES.find((c) => c.id === compareId) || MYTHIC_CALIBRES[1];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/theorie"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Théorie</span>
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Architecture, Finitions &amp; Calibres Suisses</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Architecture des Mouvements &amp; <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                Finitions de Haute Horlogerie
              </span>
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Inspectez sous binoculaire la géométrie d’un anglage main à angle rentrant, explorez les 5 traités d’architecture structurelle (platine, ponts, ébats, finitions) et comparez les 7 calibres mythiques de l’horlogerie helvétique.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {ARCHITECTURE_DOSSIERS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="p-5 rounded-2xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 shadow-lg transition-all group flex flex-col justify-between gap-3"
            >
              <div className="space-y-1.5">
                <span className="inline-block text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  {d.badge}
                </span>
                <h2 className="font-serif text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  {d.title}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {d.desc}
                </p>
              </div>
              <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span>Ouvrir le traité complet</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <section className="rounded-3xl bg-white dark:bg-[#0b101b] border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Comparateur Optique sous Binoculaire (x25) • Coupe &amp; Vue de Dessus</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Brut d’Étampage vs Chanfrein CNC 45° vs Anglage Main Bercé (Angle Rentrant)
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setLoupe10x(!loupe10x)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  loupe10x
                    ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
                <span>Loupe 10x {loupe10x ? 'ON' : 'OFF'}</span>
              </button>
              <Link
                href="/theorie/mouvements/finitions-decoratives"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
              >
                <span>Cours Complet Finitions</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-3">
                <span>COUPE TRANSVERSALE DE L’ARÊTE (x25)</span>
                <span>VUE DE DESSUS : ANGLE RENTRANT (x15)</span>
              </div>

              <div className="overflow-hidden rounded-xl bg-[#060a12]">
                <svg
                  viewBox="0 0 680 340"
                  className="w-full h-auto transition-transform duration-300"
                  style={{
                    transform: loupe10x ? 'scale(1.48)' : 'scale(1)',
                    transformOrigin: '340px 165px'
                  }}
                >
                  <defs>
                    <linearGradient id="mirrorBevelHub" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="45%" stopColor="#fde047" />
                      <stop offset="55%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                  </defs>

                  <line x1="340" y1="15" x2="340" y2="325" stroke="#1e293b" strokeWidth="2" strokeDasharray="5 5" />

                  <g transform="translate(25, 25)">
                    <text x="145" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      Profil de la Tranche du Pont
                    </text>

                    {anglageInfo.mode === 'raw' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 225 95 L 234 78 L 228 98 L 225 265 Z"
                          fill="#334155"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                        />
                        <circle cx="230" cy="86" r="18" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="230" y="58" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">
                          Bavure d’étampage (15 µm)
                        </text>
                        <text x="135" y="290" textAnchor="middle" fill="#fb7185" fontSize="10" fontFamily="monospace">
                          Flanc brut d’arrachement • Arête vive 90°
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'cnc' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 175 95 L 225 145 L 225 265 Z"
                          fill="#334155"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                        />
                        <line x1="175" y1="95" x2="225" y2="145" stroke="#f59e0b" strokeWidth="5" />
                        <text x="215" y="82" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          Plan 45° plat (Fraise CNC)
                        </text>
                        <text x="135" y="290" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                          Micro-stries d’outil • Arêtes latérales cassées
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'hand' && (
                      <g>
                        <path
                          d="M 35 265 L 35 95 L 165 95 Q 208 102 225 152 L 225 265 Z"
                          fill="#334155"
                          stroke="#e2e8f0"
                          strokeWidth="2"
                        />
                        <path
                          d="M 165 95 Q 208 102 225 152"
                          fill="none"
                          stroke="url(#mirrorBevelHub)"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        <text x="205" y="76" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                          Anglage bercé poli miroir (Gentiane)
                        </text>
                        <text x="135" y="290" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
                          Flanc étiré au trait horizontal • Reflet spéculaire
                        </text>
                      </g>
                    )}
                  </g>

                  <g transform="translate(365, 25)">
                    <text x="145" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                      Intersection de Deux Courbes (Angle Rentrant)
                    </text>

                    {anglageInfo.mode === 'raw' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 205 110, 165 140, 125 155 C 165 170, 205 200, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#f43f5e"
                          strokeWidth="2.5"
                        />
                        <circle cx="125" cy="155" r="24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="145" y="290" textAnchor="middle" fill="#fb7185" fontSize="10" fontFamily="monospace">
                          Aucun chanfrein • Bavures dans le creux
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'cnc' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 205 110, 165 140, 138 148 Q 120 155 138 162 C 165 170, 205 200, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#94a3b8"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 225 60 C 195 108, 160 135, 136 145 Q 112 155 136 165 C 160 175, 195 202, 225 250"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        <circle cx="124" cy="155" r="14" fill="none" stroke="#f43f5e" strokeWidth="2" />
                        <text x="195" y="158" fill="#fbbf24" fontSize="10" fontWeight="bold">
                          Rayon fraise R = 0.20 mm
                        </text>
                        <text x="145" y="290" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                          Creux arrondi par le diamètre de la fraise CNC
                        </text>
                      </g>
                    )}

                    {anglageInfo.mode === 'hand' && (
                      <g>
                        <path
                          d="M 35 60 L 235 60 C 200 112, 162 142, 118 155 C 162 168, 200 198, 235 250 L 35 250 Z"
                          fill="#334155"
                          stroke="#e2e8f0"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 235 60 C 200 112, 162 142, 118 155 L 92 155 C 145 138, 182 108, 215 60 Z"
                          fill="url(#mirrorBevelHub)"
                        />
                        <path
                          d="M 235 250 C 200 198, 162 168, 118 155 L 92 155 C 145 172, 182 202, 215 250 Z"
                          fill="url(#mirrorBevelHub)"
                        />
                        <line x1="92" y1="155" x2="122" y2="155" stroke="#10b981" strokeWidth="3" />
                        <circle cx="105" cy="155" r="22" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="195" y="158" fill="#34d399" fontSize="10" fontWeight="bold">
                          Arête Rentrante Vive !
                        </text>
                        <text x="145" y="290" textAnchor="middle" fill="#34d399" fontSize="10" fontFamily="monospace">
                          Intersection franche taillée main à la lime &amp; gentiane
                        </text>
                      </g>
                    )}
                  </g>
                </svg>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border ${anglageInfo.color}`}>
                <span>{anglageInfo.badge}</span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                {anglageInfo.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {anglageInfo.desc}
              </p>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" />
                    Degré de Finition de l’Arête :
                  </span>
                  <span className="font-mono text-amber-600 dark:text-amber-400">{finishingLevel} %</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={98}
                  value={finishingLevel}
                  onChange={(e) => setFinishingLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => setFinishingLevel(15)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  >
                    1. Brut (Bavure)
                  </button>
                  <button
                    onClick={() => setFinishingLevel(52)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  >
                    2. Chanfrein CNC
                  </button>
                  <button
                    onClick={() => setFinishingLevel(88)}
                    className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                  >
                    3. Anglage Main
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-800 dark:text-amber-300">
                VERDICT BINOCULAIRE : {anglageInfo.verdict}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tous les Calibres' },
              { id: 'manuel', label: 'Remontage Manuel' },
              { id: 'automatique', label: 'Automatiques Standards' },
              { id: 'chronographe', label: 'Chronographes' },
              { id: 'haute_horlogerie', label: 'Haute Horlogerie d’Art' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                    : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-500">
            {filteredCalibres.length} mouvement(s) affiché(s)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-amber-500 text-slate-950">
                  {activeCalibre.diameterLines} • {activeCalibre.diameterMm}
                </span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  {activeCalibre.year}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {activeCalibre.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                Manufacture : {activeCalibre.manufacture}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2 leading-relaxed">
              <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Héritage Historique &amp; Rôle dans l’Horlogerie Suisse :</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {activeCalibre.historicLegacy}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Fréquence</div>
                <div className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm mt-0.5">
                  {activeCalibre.frequencyHz}
                </div>
                <div className="text-[10px] text-slate-500">({activeCalibre.frequencyA_h})</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Réserve</div>
                <div className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm mt-0.5">
                  {activeCalibre.powerReserve}
                </div>
                <div className="text-[10px] text-slate-500">Autonomie réelle</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Pierres</div>
                <div className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm mt-0.5">
                  {activeCalibre.jewels} Rubis
                </div>
                <div className="text-[10px] text-slate-500">Pivotements</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Épaisseur</div>
                <div className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm mt-0.5">
                  {activeCalibre.thickness}
                </div>
                <div className="text-[10px] text-slate-500">Hauteur calibre</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Finitions d’Atelier &amp; Décoration</span>
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc pl-4">
                  {activeCalibre.finishing.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Atouts &amp; Réputation Technique</span>
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                  {activeCalibre.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400">
                Choisir un Mouvement à Inspecter
              </div>

              <div className="space-y-2">
                {MYTHIC_CALIBRES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCalibreId(c.id)}
                    className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between ${
                      activeCalibreId === c.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{c.name}</div>
                      <div className={`text-[10px] ${activeCalibreId === c.id ? 'text-slate-900' : 'text-slate-400'}`}>
                        {c.diameterLines} • {c.frequencyHz}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Outil Métrologique
            </span>
            <h3 className="font-serif text-2xl font-extrabold text-slate-900 dark:text-white">
              Comparateur Face-à-Face de Calibres
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Calibre 1 :</span>
                <select
                  value={activeCalibreId}
                  onChange={(e) => setActiveCalibreId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  {MYTHIC_CALIBRES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Diamètre :</span>
                  <span className="font-bold">{activeCalibre.diameterLines} ({activeCalibre.diameterMm})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Épaisseur :</span>
                  <span className="font-bold">{activeCalibre.thickness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Fréquence :</span>
                  <span className="font-mono font-bold text-amber-500">{activeCalibre.frequencyHz} ({activeCalibre.frequencyA_h})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Réserve de marche :</span>
                  <span className="font-bold">{activeCalibre.powerReserve}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Calibre 2 :</span>
                <select
                  value={compareId}
                  onChange={(e) => setCompareId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  {MYTHIC_CALIBRES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Diamètre :</span>
                  <span className="font-bold">{compareCalibre.diameterLines} ({compareCalibre.diameterMm})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Épaisseur :</span>
                  <span className="font-bold">{compareCalibre.thickness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Fréquence :</span>
                  <span className="font-mono font-bold text-amber-500">{compareCalibre.frequencyHz} ({compareCalibre.frequencyA_h})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Réserve de marche :</span>
                  <span className="font-bold">{compareCalibre.powerReserve}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
