'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sliders,
  Wrench,
  Search,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Compass,
  Layers,
  ShieldCheck,
  Activity,
  FileText,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';

interface TableItem {
  cat: 'reglant' | 'rouage' | 'barillet' | 'remontoir' | 'auto' | 'complications';
  name: string;
  axial: string;
  radial: string;
  oil: string;
  method: string;
}

const FULL_OFFICIAL_TABLE: TableItem[] = [
  // 1. ÉCHAPPEMENT & BALANCIER
  {
    cat: 'reglant',
    name: 'Balancier (Organe Réglant)',
    axial: '10 à 20 µm (0.01 - 0.02 mm)',
    radial: '5 à 8 µm',
    oil: 'Moebius 9010 (Goutte à 1/2 du contre-pivot)',
    method: 'Contrôle sous loupe x12 : débattement souple de l\'antichoc Incabloc / KIF.'
  },
  {
    cat: 'reglant',
    name: 'Roue d\'Échappement',
    axial: '15 à 25 µm (0.015 - 0.025 mm)',
    radial: '8 à 12 µm',
    oil: 'Moebius 9010 sur pivots (9415 sur lèvres)',
    method: 'Palpation au brunissoir / micro-brucelle N°5. Jeu impératif pour la transmission d\'impulsion.'
  },
  {
    cat: 'reglant',
    name: 'Ancre Suisse (Levier d\'Échappement)',
    axial: '15 à 25 µm (0.015 - 0.025 mm)',
    radial: '8 à 12 µm',
    oil: 'PIVOTS STRICTEMENT À SEC (Jamais d\'huile !)',
    method: 'Contrôle de liberté au souffle de poire : l\'ancre doit tomber d\'un coup sans hésitation.'
  },
  {
    cat: 'reglant',
    name: 'Garde de Dard contre le Plateau',
    axial: 'Position axiale centrée sur encoche',
    radial: 'Jeu de dard : 15 à 25 µm',
    oil: 'Aucun lubrifiant',
    method: 'Vérification du tirage et sécurité de renversement de l\'échappement en positions extrêmes.'
  },
  {
    cat: 'reglant',
    name: 'Goupilles de Raquette (Clé de spiral)',
    axial: 'Guidage vertical de la lame',
    radial: 'Jeu dynamique : 5 à 15 µm',
    oil: 'Aucun lubrifiant (Interdit)',
    method: 'La lame de spiral doit battre librement entre les goupilles sans coller ni pincer.'
  },

  // 2. ROUAGE DE FINISSAGE
  {
    cat: 'rouage',
    name: 'Roue de Seconde',
    axial: '20 à 35 µm (0.02 - 0.035 mm)',
    radial: '10 à 15 µm',
    oil: 'Moebius HP1300 / 9010',
    method: 'Palpation axiale douce. La roue tourne à 1 tr/min, le jeu doit être net sans basculement.'
  },
  {
    cat: 'rouage',
    name: 'Roue Moyenne',
    axial: '25 à 45 µm (0.025 - 0.045 mm)',
    radial: '12 à 18 µm',
    oil: 'Moebius HP1300',
    method: 'Contrôle d\'engrenage parfait avec le pignon de seconde avant pose du barillet.'
  },
  {
    cat: 'rouage',
    name: 'Grande Moyenne (Roue de Centre)',
    axial: '30 à 50 µm (0.03 - 0.05 mm)',
    radial: '12 à 18 µm',
    oil: 'Moebius HP1300',
    method: 'Supporte le couple direct du barillet. Ébat franc pour éviter l\'écrasement des dentures.'
  },
  {
    cat: 'rouage',
    name: 'Pignon de Seconde au Centre (Trotteuse)',
    axial: '30 à 60 µm (0.03 - 0.06 mm)',
    radial: '10 à 15 µm',
    oil: 'Moebius 9010 sous friction',
    method: 'Contrôler la tension du ressort de friction pour éliminer les saccades de trotteuse.'
  },

  // 3. BARILLET & ÉNERGIE
  {
    cat: 'barillet',
    name: 'Barillet Complet (Tambour + Couvercle)',
    axial: '80 à 150 µm (0.08 - 0.15 mm)',
    radial: '20 à 40 µm',
    oil: 'Moebius D5 / Klüber P125 sur bonde',
    method: 'Ébat visible à l\'œil nu sans loupe : évite tout frottement sur platine et pont de rouage.'
  },
  {
    cat: 'barillet',
    name: 'Arbre de Barillet dans Platine/Pont',
    axial: '50 à 100 µm (0.05 - 0.10 mm)',
    radial: '20 à 35 µm',
    oil: 'Moebius HP1300 / D5',
    method: 'Vérifier la rondeur des trous en platine. Si ovalisé : poser un bouchon de réduction.'
  },
  {
    cat: 'barillet',
    name: 'Bonde d\'Arbre dans Tambour',
    axial: '40 à 80 µm (0.04 - 0.08 mm)',
    radial: '25 à 40 µm',
    oil: 'Graisse Moebius 8200 / D5',
    method: 'L\'arbre doit tourner librement dans le tambour vide avant l\'armage du ressort moteur.'
  },
  {
    cat: 'barillet',
    name: 'Roue de Couronne (sous Vis)',
    axial: '20 à 40 µm (0.02 - 0.04 mm)',
    radial: '15 à 30 µm sur bague',
    oil: 'Moebius D5 / Graisse 9504',
    method: 'Attention au pas inversé à gauche de la vis. La roue ne doit pas coincer au remontage manuel.'
  },
  {
    cat: 'barillet',
    name: 'Rochet sur Carré d\'Arbre',
    axial: '20 à 40 µm (0.02 - 0.04 mm)',
    radial: 'Ajustement juste (10 à 20 µm)',
    oil: 'Moebius D5 sous la tête de vis',
    method: 'Le rochet doit être fermement plaqué sur la portée sans frotter contre les ponts voisins.'
  },
  {
    cat: 'barillet',
    name: 'Cliquet et Sautoir de Cliquet',
    axial: '30 à 60 µm (0.03 - 0.06 mm)',
    radial: 'Libre autour de sa vis/noyau',
    oil: 'Moebius 9504 (Graisse fine)',
    method: 'Vérifier le recul de détente d\'armage : 2 à 3 dents de dégagement pour soulager le train.'
  },

  // 4. REMONTOIR & MINUTERIE
  {
    cat: 'remontoir',
    name: 'Tige de Remontoir dans Platine',
    axial: 'Ébat de tirette : 50 à 100 µm',
    radial: '20 à 40 µm dans canon',
    oil: 'Graisse Moebius 9504 / 9501',
    method: 'La tige doit coulisser sans point dur en position remontage, date rapide et mise à l\'heure.'
  },
  {
    cat: 'remontoir',
    name: 'Pignon Coulant sur Carré de Tige',
    axial: 'Bascule : 50 à 100 µm',
    radial: 'Jeu de glissement : 15 à 30 µm',
    oil: 'Moebius 9504 sur gorge et denture Breguet',
    method: 'Glissement franc sur le carré lors de l\'actionnement de la tirette.'
  },
  {
    cat: 'remontoir',
    name: 'Pignon de Remontoir sur Tige',
    axial: '20 à 40 µm (0.02 - 0.04 mm)',
    radial: '15 à 25 µm sur portée cylindrique',
    oil: 'Moebius 9504 sur portée',
    method: 'Vérifier la liberté de rotation quand le pignon coulant est en retrait.'
  },
  {
    cat: 'remontoir',
    name: 'Chaussée sur Tigeron de Centre',
    axial: 'Garde sous aiguilles : 30 à 60 µm',
    radial: 'Frottement gras contrôlé',
    oil: 'Graisse Moebius 9501 / HP1300',
    method: 'Contrôle au dynamomètre : couple de glissement de 2.0 à 3.5 N·cm pour entraîner les aiguilles.'
  },
  {
    cat: 'remontoir',
    name: 'Roue de Minuterie & Renvoi',
    axial: '30 à 60 µm (0.03 - 0.06 mm)',
    radial: '15 à 25 µm sur tige/tenon',
    oil: 'Moebius HP1300 sur tenon',
    method: 'Vérifier la liberté sous la barrette ou pont de minuterie avant repose du cadran.'
  },
  {
    cat: 'remontoir',
    name: 'Roue des Heures sous Cadran',
    axial: '40 à 80 µm (avec rondelle foliotante)',
    radial: '20 à 35 µm sur chaussée',
    oil: 'Moebius 9010 / HP1300',
    method: 'La rondelle ressort en clinquant évite le chevauchement avec l\'aiguille des minutes.'
  },

  // 5. SYSTÈME AUTOMATIQUE
  {
    cat: 'auto',
    name: 'Masse Oscillante (Rotor sur Roulement)',
    axial: '15 à 30 µm (0.015 - 0.03 mm)',
    radial: '10 à 20 µm (Billes céramique/acier)',
    oil: 'Moebius 9010 (1 gouttelette sur billes)',
    method: 'Garde obligatoire de 0.15 mm minimum par rapport aux ponts et au fond de boîte fermé.'
  },
  {
    cat: 'auto',
    name: 'Roues Inversatrices (Cliquet Interne)',
    axial: '25 à 45 µm (0.025 - 0.045 mm)',
    radial: '12 à 20 µm',
    oil: 'Lubrita / Moebius 9010 (Dégraissage strict)',
    method: 'Test de roue libre : débrayage instantané dans un sens, blocage franc dans l\'autre.'
  },
  {
    cat: 'auto',
    name: 'Roue Réductrice Automatique',
    axial: '30 à 60 µm (0.03 - 0.06 mm)',
    radial: '15 à 25 µm',
    oil: 'Moebius HP1300',
    method: 'Vérifier l\'engrenage progressif avec le rochet lors des oscillations du rotor.'
  },

  // 6. COMPLICATIONS (DATE & CHRONO)
  {
    cat: 'complications',
    name: 'Disque / Étoile de Quantième (Date)',
    axial: '30 à 60 µm sous plaque de maintien',
    radial: '20 à 40 µm sur portée platine',
    oil: 'Moebius 9504 sur sautoir de date',
    method: 'Saut instantané à minuit : le disque ne doit jamais frotter sur le dos du cadran.'
  },
  {
    cat: 'complications',
    name: 'Roue de Chronographe au Centre',
    axial: '30 à 50 µm (0.03 - 0.05 mm)',
    radial: '10 à 18 µm dans rubis/canon',
    oil: 'Moebius HP1300 sur pivots',
    method: 'Contrôler la concentricité et le jeu d\'embrayage horizontal ou vertical.'
  },
  {
    cat: 'complications',
    name: 'Roue d\'Embrayage Chrono (Bascule)',
    axial: '30 à 60 µm (0.03 - 0.06 mm)',
    radial: '15 à 25 µm',
    oil: 'Moebius HP1300 sur tenon de bascule',
    method: 'Pénétration de denture : exactement 1/3 de la hauteur de dent lors de l\'enclenchement.'
  }
];

const AXIAL_PRESETS: Record<string, { min: number; max: number; name: string }> = {
  balancier: { min: 10, max: 20, name: 'Balancier sous Antichoc' },
  echappement: { min: 15, max: 25, name: 'Roue d\'Échappement' },
  ancre: { min: 15, max: 25, name: 'Ancre Suisse' },
  seconde: { min: 20, max: 35, name: 'Roue de Seconde' },
  moyenne: { min: 25, max: 45, name: 'Roue Moyenne' },
  centre: { min: 30, max: 50, name: 'Grande Moyenne / Centre' },
  seconde_centre: { min: 30, max: 60, name: 'Pignon de Seconde au Centre' },
  barillet: { min: 80, max: 150, name: 'Barillet Complet' },
  bonde_barillet: { min: 40, max: 80, name: 'Bonde de Barillet' },
  roue_couronne: { min: 20, max: 40, name: 'Roue de Couronne' },
  tige_remontoir: { min: 50, max: 100, name: 'Tige de Remontoir' },
  roue_minuterie: { min: 30, max: 60, name: 'Roue de Minuterie' },
  roue_heures: { min: 40, max: 80, name: 'Roue des Heures' },
  masse_oscillante: { min: 15, max: 30, name: 'Masse Oscillante (Rotor)' },
  roue_inversatrice: { min: 25, max: 45, name: 'Roues Inversatrices' },
  roue_reductrice: { min: 30, max: 60, name: 'Roue Réductrice Auto' },
  disque_date: { min: 30, max: 60, name: 'Disque de Date' },
  chrono_centre: { min: 30, max: 50, name: 'Roue Chrono Centre' },
  embrayage_chrono: { min: 30, max: 60, name: 'Roue d\'Embrayage Chrono' }
};

export default function EbatsAjustementsPage() {
  const [activeTab, setActiveTab] = useState<'axial' | 'radial' | 'chassage'>('axial');

  // État Calculateur Axial
  const [axialPresetKey, setAxialPresetKey] = useState<string>('seconde');
  const [axialPlatines, setAxialPlatines] = useState<number>(2.850);
  const [axialArbre, setAxialArbre] = useState<number>(2.825);

  // État Calculateur Radial
  const [radPivot, setRadPivot] = useState<number>(0.120);
  const [radHole, setRadHole] = useState<number>(0.132);

  // État Calculateur Chassage
  const [fitHole, setFitHole] = useState<number>(1.200);
  const [fitPart, setFitPart] = useState<number>(1.205);

  // Filtre et recherche tableau officiel
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // =========================================================================
  // CALCULS ÉBAT AXIAL
  // =========================================================================
  const axialResult = useMemo(() => {
    const ebatMm = axialPlatines - axialArbre;
    const ebatUm = Math.round(ebatMm * 1000);
    const p = AXIAL_PRESETS[axialPresetKey] || { min: 20, max: 35, name: 'Mobile' };

    let status: 'ok' | 'tight' | 'loose' | 'blocked' = 'ok';
    let badgeText = `✅ CONFORME & OPTIMAL (${p.min} à ${p.max} µm)`;
    let instruction = 'L\'ébat de hauteur est conforme aux préconisations d\'usine. Aucun déplacement de rubis n\'est nécessaire.';
    let seitzText = '0 graduation (Réglage Parfait)';

    if (ebatUm < 0) {
      status = 'blocked';
      badgeText = `❌ SERRAGE NÉGATIF : ARBRE BLOQUÉ (${ebatUm} µm)`;
      instruction = `L'arbre est plus long que l'espace entre pierres. Il va pincer et se casser lors du serrage du pont ! Rehaussez le rubis à la potence Seitz de ${Math.abs(ebatUm) + p.min} µm.`;
      seitzText = `Rehausser de ${((Math.abs(ebatUm) + p.min) / 10).toFixed(1)} graduations Seitz`;
    } else if (ebatUm < p.min) {
      status = 'tight';
      badgeText = `⚠️ ÉBAT TROP FAIBLE (${ebatUm} µm < ${p.min} µm)`;
      const delta = p.min - ebatUm;
      instruction = `Risque d'arc-boutement à chaud ou lors de la lubrification. Donnez ${delta} µm de liberté supplémentaire.`;
      seitzText = `Desserrer de ${(delta / 10).toFixed(1)} graduation Seitz`;
    } else if (ebatUm > p.max) {
      status = 'loose';
      badgeText = `⚠️ TROP D'ÉBAT (${ebatUm} µm > ${p.max} µm)`;
      const delta = ebatUm - p.max;
      instruction = `Le mobile flotte excessivement. Les dentures risquent de s'égrener de biais et frotter sur les ponts voisins. Enfoncez le rubis à la potence Seitz.`;
      seitzText = `Enfoncer de ${(delta / 10).toFixed(1)} graduation Seitz`;
    }

    return { ebatUm, status, badgeText, instruction, seitzText, preset: p };
  }, [axialPlatines, axialArbre, axialPresetKey]);

  // =========================================================================
  // CALCULS ÉBAT RADIAL
  // =========================================================================
  const radialResult = useMemo(() => {
    const diffUm = Math.round((radHole - radPivot) * 1000);
    let status: 'ok' | 'tight' | 'loose' | 'blocked' = 'ok';
    let badgeText = '✅ JEU IDÉAL DE ROUAGE (10 à 18 µm)';
    let desc = 'Le jeu diamétral permet à l\'huile Moebius 9010 de former son ménisque sans fuir. Transmission de couple sans frottement excessif.';

    if (diffUm <= 0) {
      status = 'blocked';
      badgeText = '❌ PIVOT TROP GROS (EMMANCHÉ / BLOCAGE)';
      desc = 'Le pivot ne peut pas entrer dans le trou de rubis ou est bloqué sans aucun jeu. Alésez le rubis ou roulez le pivot pour réduire son diamètre.';
    } else if (diffUm < 6) {
      status = 'tight';
      badgeText = '⚠️ JEU TRÈS SERRÉ (< 6 µm)';
      desc = 'Réservé uniquement aux pivots de balancier sous Incabloc. Pour un rouage de finissage, l\'huile sera cisaillée et freinera le train de rouage.';
    } else if (diffUm <= 18) {
      status = 'ok';
      badgeText = '✅ JEU IDÉAL DE ROUAGE (10 à 18 µm)';
      desc = 'Le jeu diamétral permet à l\'huile Moebius 9010 de former son ménisque sans fuir. Transmission de couple sans frottement excessif.';
    } else {
      status = 'loose';
      badgeText = '⚠️ TROP DE JEU RADIAL (> 18 µm)';
      desc = 'Le pivot bat dans son trou. Risque d\'engrenage défectueux, usure ovalisée du trou et dépointage des mobiles.';
    }

    return { diffUm, status, badgeText, desc };
  }, [radPivot, radHole]);

  // =========================================================================
  // CALCULS CHASSAGE & SERRAGE
  // =========================================================================
  const chassageResult = useMemo(() => {
    const fitUm = Math.round((fitPart - fitHole) * 1000);
    let status: 'ok' | 'weak' | 'loose' | 'danger' = 'ok';
    let badgeText = '✅ CHASSAGE OPTIMAL LAITON (3 à 7 µm)';
    let desc = 'Valeur d\'ajustement H7/p6 standard de manufacture suisse. Le rubis s\'emmanche proprement sans fendre ni marquer la platine.';

    if (fitUm < 0) {
      status = 'loose';
      badgeText = '❌ JEU LIBRE : LA PIÈCE VA TOMBER';
      desc = 'La pièce est plus petite que le trou ! Le rubis ou le canon ne tiendra pas et se délogera au premier choc.';
    } else if (fitUm < 3) {
      status = 'weak';
      badgeText = '⚠️ SERRAGE FAIBLE (1 à 2 µm)';
      desc = 'Serrage trop juste. La pièce risque de se desserrer avec les vibrations thermiques.';
    } else if (fitUm <= 7) {
      status = 'ok';
      badgeText = '✅ CHASSAGE OPTIMAL LAITON (3 à 7 µm)';
      desc = 'Valeur d\'ajustement H7/p6 standard de manufacture suisse. Le rubis s\'emmanche proprement sans fendre ni marquer la platine.';
    } else {
      status = 'danger';
      badgeText = '❌ RISQUE MAJEUR : ÉCLATEMENT DU RUBIS (> 8 µm)';
      desc = 'Serrage excessif ! Le rubis synthétique (corindon) va éclater sous la pression du tasseau Seitz, ou la platine en laiton va se déformer.';
    }

    return { fitUm, status, badgeText, desc };
  }, [fitHole, fitPart]);

  // =========================================================================
  // FILTRE TABLEAU OFFICIEL (24 ORGANES)
  // =========================================================================
  const filteredTable = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FULL_OFFICIAL_TABLE.filter(item => {
      const matchCat = currentCategory === 'all' || item.cat === currentCategory;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.oil.toLowerCase().includes(q) ||
        item.axial.toLowerCase().includes(q) ||
        item.method.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [currentCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 font-sans antialiased py-8 px-4 md:px-8 transition-colors duration-300">
      
      {/* Navigation Retour */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/outils"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux Outils d&apos;Établi</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 border border-emerald-500/30">
          <span>🇨🇭</span>
          <span>Norme Horlogère Suisse NIHS 91-10 • 24 Organes Référencés</span>
        </div>
      </div>

      {/* Titre & Entête */}
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Précision d&apos;Atelier au Micron (0.001 mm)</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black font-serif tracking-tight text-slate-900 dark:text-white">
          Calculateur d&apos;Ébats &amp; d&apos;Ajustements
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto">
          L&apos;outil d&apos;établi quotidien pour mesurer et ajuster les jeux axiaux, les jeux de trous de rubis et les serrages de chassage à la potence Seitz.
        </p>

        {/* Sélecteur des 3 modes */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          <button
            onClick={() => setActiveTab('axial')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'axial'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <span>1. Ébat de Hauteur (Axial)</span>
          </button>
          <button
            onClick={() => setActiveTab('radial')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'radial'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <span>2. Ébat de Trou (Pivot vs Rubis)</span>
          </button>
          <button
            onClick={() => setActiveTab('chassage')}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'chassage'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 shadow-sm'
            }`}
          >
            <span>3. Chassage &amp; Serrage (Seitz)</span>
          </button>
        </div>
      </div>

      {/* MODULE 1 : ÉBAT DE HAUTEUR (AXIAL / ENDSHAKE) */}
      {activeTab === 'axial' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Formulaire de saisie */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <span>📏 Ébat de Hauteur d&apos;Axe</span>
              </h2>
              <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Jeu Entre-Pierres
              </span>
            </div>

            {/* Choix du Mobile étendu */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold block">
                Sélectionner le Mobile Horloger :
              </label>
              <select
                value={axialPresetKey}
                onChange={e => setAxialPresetKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-200 outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
              >
                <optgroup label="Échappement & Organe Réglant">
                  <option value="balancier">Balancier sous Antichoc (10 à 20 µm)</option>
                  <option value="echappement">Roue d&apos;Échappement (15 à 25 µm)</option>
                  <option value="ancre">Ancre Suisse (15 à 25 µm)</option>
                </optgroup>
                <optgroup label="Rouage de Finissage">
                  <option value="seconde">Roue de Seconde (20 à 35 µm)</option>
                  <option value="moyenne">Roue Moyenne (25 à 45 µm)</option>
                  <option value="centre">Grande Moyenne / Roue de Centre (30 à 50 µm)</option>
                  <option value="seconde_centre">Pignon de Seconde au Centre (30 à 60 µm)</option>
                </optgroup>
                <optgroup label="Barillet & Remontoir">
                  <option value="barillet">Barillet Complet (80 à 150 µm)</option>
                  <option value="bonde_barillet">Bonde dans Tambour (40 à 80 µm)</option>
                  <option value="roue_couronne">Roue de Couronne sous Vis (20 à 40 µm)</option>
                  <option value="tige_remontoir">Tige de Remontoir dans Platine (50 à 100 µm)</option>
                  <option value="roue_minuterie">Roue de Minuterie (30 à 60 µm)</option>
                  <option value="roue_heures">Roue des Heures sous Cadran (40 à 80 µm)</option>
                </optgroup>
                <optgroup label="Système Automatique">
                  <option value="masse_oscillante">Masse Oscillante / Rotor (15 à 30 µm)</option>
                  <option value="roue_inversatrice">Roues Inversatrices (25 à 45 µm)</option>
                  <option value="roue_reductrice">Roue Réductrice Automatique (30 à 60 µm)</option>
                </optgroup>
                <optgroup label="Complications">
                  <option value="disque_date">Disque de Quantième / Date (30 à 60 µm)</option>
                  <option value="chrono_centre">Roue de Chronographe au Centre (30 à 50 µm)</option>
                  <option value="embrayage_chrono">Roue d&apos;Embrayage Chrono (30 à 60 µm)</option>
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block">
                  Distance Entre Pierres (H) :
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={axialPlatines}
                    step="0.005"
                    onChange={e => setAxialPlatines(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Mesure platine / pont</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block">
                  Longueur d&apos;Arbre (L) :
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={axialArbre}
                    step="0.005"
                    onChange={e => setAxialArbre(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block">Mesure entre épaulements</span>
              </div>
            </div>

            {/* Curseur rapide d'ajustement fin */}
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-400">Ajustement rapide au dixième de micron :</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{axialArbre.toFixed(3)} mm</span>
              </div>
              <input
                type="range"
                min="2.800"
                max="2.860"
                step="0.001"
                value={axialArbre}
                onChange={e => setAxialArbre(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Résultat et diagnostic Seitz */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">
                RÉSULTAT DU CONTRÔLE D&apos;ÉBAT :
              </span>

              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#050A12] border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-inner">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">Ébat Axial Mesuré</div>
                <div
                  className={`text-4xl lg:text-5xl font-mono font-black ${
                    axialResult.status === 'ok'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : axialResult.status === 'tight'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-500'
                  }`}
                >
                  {axialResult.ebatUm >= 0 ? `+${axialResult.ebatUm}` : axialResult.ebatUm}{' '}
                  <span className="text-xl font-normal">µm</span>
                </div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    axialResult.status === 'ok'
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                      : axialResult.status === 'tight'
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/40'
                      : 'bg-red-500/15 text-red-800 dark:text-red-300 border border-red-500/40'
                  }`}
                >
                  {axialResult.badgeText}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Plage tolérée sur calibre :</span>
                <strong className="text-slate-900 dark:text-white">
                  {(axialResult.preset.min / 1000).toFixed(3)} à {(axialResult.preset.max / 1000).toFixed(3)} mm ({axialResult.preset.min} à {axialResult.preset.max} µm)
                </strong>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800/80 pt-2.5">
                <span className="text-[10px] text-amber-800 dark:text-amber-400 block uppercase font-bold mb-1">Action d&apos;Atelier Conseillée :</span>
                <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">{axialResult.instruction}</p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-amber-500/20 flex items-center justify-between shadow-sm">
                <span className="text-slate-600 dark:text-slate-400">Ajustement Potence Seitz :</span>
                <span className="text-amber-800 dark:text-amber-400 font-bold">{axialResult.seitzText}</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* MODULE 2 : ÉBAT DE TROU (PIVOT VS RUBIS) */}
      {activeTab === 'radial' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <span>🔘 Ébat de Trou (Radial / Sideshake)</span>
              </h2>
              <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Jeu Pivot / Rubis
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1">Diamètre du Pivot d&apos;Arbre (Ø Pivot) :</label>
                <div className="relative">
                  <input
                    type="number"
                    value={radPivot}
                    step="0.001"
                    onChange={e => setRadPivot(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Mesure au palmer micrométrique d&apos;établi</span>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1">Diamètre du Trou de Rubis (Ø Trou) :</label>
                <div className="relative">
                  <input
                    type="number"
                    value={radHole}
                    step="0.001"
                    onChange={e => setRadHole(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Référence du rubis chassé</span>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1">Lubrifiant Recommandé :</label>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-slate-950 border border-emerald-200 dark:border-slate-800 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-medium">
                  Moebius 9010 (Huile fine synthétique) · Goutte à 1/2 du trou
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">JEU DIAMÉTRAL RÉSULTANT :</span>
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#050A12] border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-inner">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">Jeu Radial (Ø Trou - Ø Pivot)</div>
                <div
                  className={`text-4xl lg:text-5xl font-mono font-black ${
                    radialResult.status === 'ok'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : radialResult.status === 'tight'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-500'
                  }`}
                >
                  {radialResult.diffUm >= 0 ? `+${radialResult.diffUm}` : radialResult.diffUm}{' '}
                  <span className="text-xl font-normal">µm</span>
                </div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    radialResult.status === 'ok'
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                      : radialResult.status === 'tight'
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/40'
                      : 'bg-red-500/15 text-red-800 dark:text-red-300 border border-red-500/40'
                  }`}
                >
                  {radialResult.badgeText}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-amber-800 dark:text-amber-400 block uppercase font-bold">Analyse Mécanique :</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">{radialResult.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3 : CHASSAGE & SERRAGE */}
      {activeTab === 'chassage' && (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                <span>🔨 Serrage de Chassage (Press-Fit)</span>
              </h2>
              <span className="text-[10px] font-mono text-amber-800 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                Ajustement H7/p6
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1">Diamètre du Trou de Platine (Alésage) :</label>
                <div className="relative">
                  <input
                    type="number"
                    value={fitHole}
                    step="0.005"
                    onChange={e => setFitHole(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-700 dark:text-slate-300 block mb-1">Diamètre Extérieur de la Pièce (Rubis/Canon) :</label>
                <div className="relative">
                  <input
                    type="number"
                    value={fitPart}
                    step="0.005"
                    onChange={e => setFitPart(parseFloat(e.target.value) || 0)}
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-mono text-slate-400 dark:text-slate-500">mm</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 space-y-5 shadow-xl dark:shadow-2xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2">VALEUR DE SERRAGE :</span>
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-[#050A12] border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-inner">
                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 uppercase">Serrage d&apos;Ajustement</div>
                <div
                  className={`text-4xl lg:text-5xl font-mono font-black ${
                    chassageResult.status === 'ok'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : chassageResult.status === 'weak'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-500'
                  }`}
                >
                  {chassageResult.fitUm >= 0 ? `+${chassageResult.fitUm}` : chassageResult.fitUm}{' '}
                  <span className="text-xl font-normal">µm</span>
                </div>
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    chassageResult.status === 'ok'
                      ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                      : chassageResult.status === 'weak'
                      ? 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/40'
                      : 'bg-red-500/15 text-red-800 dark:text-red-300 border border-red-500/40'
                  }`}
                >
                  {chassageResult.badgeText}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <span className="text-[10px] text-amber-800 dark:text-amber-400 block uppercase font-bold">Consigne de Chassage Seitz :</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">{chassageResult.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* TABLEAU RÉCAPITULATIF OFFICIEL COMPLET (24 ORGANES) */}
      <div className="max-w-7xl mx-auto p-6 rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl space-y-5">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
              <span>📋 Référentiel Officiel Exhaustif des Tolérances Suisses (NIHS)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-0.5">
              Tableau complet d&apos;atelier couvrant les 24 organes clés : Organe Réglant, Rouage, Barillet, Remontoir, Automatique et Complications.
            </p>
          </div>

          {/* Recherche rapide */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher (ex: chaussée, masse, tige, Incabloc)..."
              className="w-full pl-3 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:border-amber-500 focus:bg-white dark:focus:bg-slate-900 transition"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Filtres de catégories */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          {[
            { id: 'all', label: 'Tous (24)' },
            { id: 'reglant', label: '⏱️ Échappement & Balancier' },
            { id: 'rouage', label: '⚙️ Rouage de Finissage' },
            { id: 'barillet', label: '🌀 Barillet & Énergie' },
            { id: 'remontoir', label: '🔄 Remontoir & Minuterie' },
            { id: 'auto', label: '🛡️ Système Automatique' },
            { id: 'complications', label: '📅 Date & Chrono' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setCurrentCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg transition ${
                currentCategory === c.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800/80">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Organe / Mobile Horloger</th>
                <th className="px-3">Ébat Axial (Hauteur)</th>
                <th className="px-3">Ébat Radial (Trou/Jeu)</th>
                <th className="px-3">Lubrifiant Recommandé</th>
                <th className="px-3">Procédure &amp; Contrôle d&apos;Établi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900/40">
              {filteredTable.map((item, idx) => (
                <tr key={idx} className="hover:bg-amber-50/60 dark:hover:bg-slate-800/60 transition">
                  <td className="py-3 px-3 font-bold text-amber-800 dark:text-amber-400">
                    {item.name}
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal uppercase">
                      {item.cat}
                    </span>
                  </td>
                  <td className="px-3 text-slate-900 dark:text-white font-semibold">{item.axial}</td>
                  <td className="px-3 text-emerald-700 dark:text-emerald-400 font-medium">{item.radial}</td>
                  <td className="px-3 text-blue-700 dark:text-blue-300 font-medium">{item.oil}</td>
                  <td className="px-3 text-slate-600 dark:text-slate-300 font-sans text-[11px] leading-snug">{item.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pt-1 gap-2">
          <span>Affichage de {filteredTable.length} organe(s) horloger(s) sur 24</span>
          <span className="text-amber-800 dark:text-amber-400 font-medium">Sources : NIHS 91-10, ETA Technical Communications, Bergeon Seitz Manual</span>
        </div>
      </div>

    </div>
  );
}
