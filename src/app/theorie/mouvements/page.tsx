// src/app/theorie/mouvements/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Clock,
  Compass,
  CheckCircle2,
  Info,
  Layers,
  Activity,
  Sliders,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Zap
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
    diameterLines: '16½ \'\'\'',
    diameterMm: '36.60 mm',
    thickness: '4.50 mm',
    frequencyHz: '2.5 Hz',
    frequencyA_h: '18’000 A/h',
    jewels: 17,
    powerReserve: '46 heures',
    escapement: 'Échappement à ancre suisse 15 dents, balancier Glucydur',
    historicLegacy: 'Conçu à l’origine pour les montres de poche de précision, il est devenu le calibre roi indiscutable des écoles d’horlogerie en Suisse pour l’apprentissage du rhabillage.',
    finishing: ['Perlage circulaire sur platine', 'Côtes de Genève sur ponts', 'Vis bleuies thermiquement', 'Rochet soleillé'],
    strengths: ['Architecture aérée parfaite pour l’apprentissage', 'Fiabilité légendaire', 'Pièces standards interchangeables NIHS']
  },
  {
    id: 'eta2824',
    name: 'ETA 2824-2 Automatique',
    manufacture: 'ETA SA (Grenchen, Suisse)',
    year: '1971 (Dérivé de la lignée Eterna 1427)',
    category: 'automatique',
    diameterLines: '11½ \'\'\'',
    diameterMm: '25.60 mm',
    thickness: '4.60 mm',
    frequencyHz: '4.0 Hz',
    frequencyA_h: '28’800 A/h',
    jewels: 25,
    powerReserve: '38 heures',
    escapement: 'Ancre suisse, balancier Glucydur, raquetterie Etachron',
    historicLegacy: 'Surnommé « le tracteur suisse », c’est le calibre automatique le plus éprouvé, copié et respecté de toute l’histoire de l’industrie horlogère moderne.',
    finishing: ['Masse oscillante décorée Côtes de Genève', 'Rhodiage haute résistance', 'Gravure dorée ETA'],
    strengths: ['Remontage automatique bidirectionnel fluide', 'Système Etachron pour un réglage fin', 'Robustesse absolue au quotidien']
  },
  {
    id: 'valjoux7750',
    name: 'Valjoux 7750 Chronographe',
    manufacture: 'Valjoux / ETA SA (Vallée de Joux)',
    year: '1973 (Création par Edmond Capt)',
    category: 'chronographe',
    diameterLines: '13¼ \'\'\'',
    diameterMm: '30.00 mm',
    thickness: '7.90 mm',
    frequencyHz: '4.0 Hz',
    frequencyA_h: '28’800 A/h',
    jewels: 25,
    powerReserve: '48 heures',
    escapement: 'Commande par navette à coulisse, ancre suisse',
    historicLegacy: 'Premier chronographe conçu avec assistance informatique précoce. Sauvé clandestinement de la destruction lors de la crise du quartz, il motorise aujourd’hui les chronos Breitling, IWC, TAG Heuer.',
    finishing: ['Rotor monté sur roulement à billes', 'Ponts satinés brossés', 'Cames et leviers en acier trempé'],
    strengths: ['Déclenchement franc et indestructible', 'Rotor puissant avec sensation tactile au poignet', 'Facilité de révision d’atelier']
  },
  {
    id: 'elprimero',
    name: 'Zenith El Primero 400',
    manufacture: 'Zenith Manufacture (Le Locle, Suisse)',
    year: '1969 (Présenté le 10 janvier 1969)',
    category: 'chronographe',
    diameterLines: '13¼ \'\'\'',
    diameterMm: '30.00 mm',
    thickness: '6.50 mm',
    frequencyHz: '5.0 Hz',
    frequencyA_h: '36’000 A/h',
    jewels: 31,
    powerReserve: '50 heures',
    escapement: 'Roue à colonnes, embrayage horizontal, lubrification sèche',
    historicLegacy: 'Le premier chronographe automatique intégré à haute fréquence au monde. Capable de mesurer les temps courts avec une résolution chirurgicale au 1/10e de seconde.',
    finishing: ['Roue à colonnes en acier bleui', 'Platine perlée', 'Masse oscillante ajourée avec étoile Zenith'],
    strengths: ['Haute fréquence 36’000 A/h ultra-stable', 'Précision chronométrique légendaire', 'A motorisé la Rolex Daytona pendant 12 ans']
  },
  {
    id: 'rolex3235',
    name: 'Rolex Calibre 3235 Chronomètre Superlatif',
    manufacture: 'Manufacture des Montres Rolex (Genève / Bienne)',
    year: '2015 (14 brevets exclusifs)',
    category: 'automatique',
    diameterLines: '12 \'\'\'',
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
    diameterLines: '12½ \'\'\'',
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
    historicLegacy: 'Le plus petit mouvement mécanique au monde depuis près d’un siècle. Porté par la reine Élisabeth II lors de son couronnement à l’abbaye de Westminster en 1953.',
    finishing: ['98 composants microscopiques assemblés sous loupe binoculaire', 'Poids total : 0.98 gramme'],
    strengths: ['Poids total inférieur à 1 gramme', 'Micro-mécanique d’art absolue', 'Produit en quelques dizaines d’exemplaires par an']
  }
];

export default function MouvementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCalibreId, setActiveCalibreId] = useState<string>('eta6497');
  const [compareId, setCompareId] = useState<string>('eta2824');

  const filteredCalibres = useMemo(() => {
    if (selectedCategory === 'all') return MYTHIC_CALIBRES;
    return MYTHIC_CALIBRES.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const activeCalibre = MYTHIC_CALIBRES.find((c) => c.id === activeCalibreId) || MYTHIC_CALIBRES[0];
  const compareCalibre = MYTHIC_CALIBRES.find((c) => c.id === compareId) || MYTHIC_CALIBRES[1];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
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
              <span>🇨🇭 Le Panthéon Mécanique Suisse</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Les Grands Calibres Mythiques Suisses
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              L’encyclopédie comparative des mouvements légendaires qui ont forgé la réputation mondiale de la précision helvétique : du tracteur ETA 2824 au micro-rotor Patek Philippe et à la haute fréquence El Primero.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORPS PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Filtres par Catégorie */}
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

        {/* Fiche d'Honneur du Calibre Sélectionné */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panneau Principal Calibre */}
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

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                {activeCalibre.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold">
                Manufacture : {activeCalibre.manufacture}
              </p>
            </div>

            {/* Récit Historique & Héritage */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm space-y-2 leading-relaxed">
              <div className="font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <span>Héritage Historique & Rôle dans l’Horlogerie Suisse :</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                {activeCalibre.historicLegacy}
              </p>
            </div>

            {/* Grille de Spécifications d'Atelier */}
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

            {/* Échappement & Régulation */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Architecture d'Échappement & Système Réglant :</span>
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {activeCalibre.escapement}
              </div>
            </div>

            {/* Décors d'Art & Points Forts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Finitions d’Atelier & Décoration</span>
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
                  <span>Atouts & Réputation Technique</span>
                </span>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-4">
                  {activeCalibre.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sélecteur Latéral des 7 Calibres */}
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

        {/* COMPARATEUR DIRECT ENTRE 2 CALIBRES */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Outil Métrologique
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Comparateur Face-à-Face de Calibres
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Sélectionnez deux mouvements pour comparer instantanément leurs spécifications de manufacture :
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Calibre A */}
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
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Rubis :</span>
                  <span className="font-bold">{activeCalibre.jewels} pierres</span>
                </div>
              </div>
            </div>

            {/* Calibre B */}
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
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500">Rubis :</span>
                  <span className="font-bold">{compareCalibre.jewels} pierres</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
