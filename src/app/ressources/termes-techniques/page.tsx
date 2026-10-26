'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Layers,
  Cog,
  ShieldCheck,
  Sparkles,
  Wrench,
  Filter
} from 'lucide-react';

interface EbauchePart {
  code: string;
  family: '100' | '200' | '400' | '700' | '1100' | '8000';
  fr: string;
  de: string;
  en: string;
  role: string;
  lubricant: string;
  benchTip: string;
}

const EBAUCHES_PARTS: EbauchePart[] = [
  // SÉRIE 100 : BÂTI, PLATINE & PONTS
  {
    code: '100',
    family: '100',
    fr: 'Platine',
    de: 'Werkplatte / Grundplatine',
    en: 'Mainplate',
    role: 'Socle d’usinage micrométrique (laiton maillechort rhodié) supportant l’ensemble des ponts et mobiles.',
    lubricant: 'Sec (sauf portées de tige 9504)',
    benchTip: 'Toujours manipuler par la tranche ou avec brucelles laiton pour ne jamais rayer le perlage.'
  },
  {
    code: '105',
    family: '100',
    fr: 'Pont de barillet',
    de: 'Federhausbrücke',
    en: 'Barrel bridge',
    role: 'Maintient l’arbre de barillet supérieur, le rochet (415), la roue de couronne (420) et le cliquet (425).',
    lubricant: 'Moebius HP-1300 (portée d’arbre)',
    benchTip: 'Contrôler le jeu axial du barillet (20–40 µm) après serrage des vis de pont.'
  },
  {
    code: '110',
    family: '100',
    fr: 'Pont de rouage',
    de: 'Räderwerkbrücke',
    en: 'Train wheel bridge',
    role: 'Guide les pivots supérieurs des mobiles de moyenne (210), de seconde (220) et parfois d’échappement (705).',
    lubricant: 'Moebius 9010 / HP-1300 dans les huiliers des rubis',
    benchTip: 'Aligner délicatement chaque pivot au micro-brucelle N°3 avant de poser la moindre pression sur le pont.'
  },
  {
    code: '121',
    family: '100',
    fr: 'Coq (Pont de balancier)',
    de: 'Unruhkloben',
    en: 'Balance cock',
    role: 'Supporte le balancier-spiral (721), la raquetterie (300/310), le porte-piton et l’antichoc supérieur.',
    lubricant: 'Moebius 9010 (sur contre-pivot Incabloc)',
    benchTip: 'Ne jamais retourner un coq équipé de son balancier directement à plat sur le tapis d’établi.'
  },
  {
    code: '125',
    family: '100',
    fr: 'Pont d’ancre',
    de: 'Ankerkloben',
    en: 'Pallet bridge',
    role: 'Maintient le pivot supérieur de l’ancre suisse (710) avec un ébat axial strictement calibré.',
    lubricant: 'STRICTEMENT À SEC (0 huile sur les pivots d’ancre)',
    benchTip: 'Couple de serrage très doux (1.0 à 1.6 cNm) : les pivots d’ancre mesurent ~0.07 mm.'
  },

  // SÉRIE 180-300 : BARILLET & ROUAGE DE FINISSAGE
  {
    code: '180',
    family: '200',
    fr: 'Barillet complet (Tambour & Couvercle)',
    de: 'Federhaus komplett',
    en: 'Complete barrel',
    role: 'Emmagasine l’énergie du ressort-moteur (770) et entraîne le pignon de grande moyenne (200).',
    lubricant: 'Moebius 8217 (paroi de tambour auto) + HP-1300 (spires & arbre)',
    benchTip: 'Ne jamais fermer le couvercle aux brucelles acier : utiliser une pince laiton ou un tasseau bois/Delrin.'
  },
  {
    code: '195',
    family: '200',
    fr: 'Arbre de barillet',
    de: 'Federkern',
    en: 'Barrel arbor',
    role: 'Axe central muni d’une bonde et d’un crochet sur lequel s’accroche la spire interne du ressort-moteur.',
    lubricant: 'Moebius HP-1300 sur les portées et le crochet',
    benchTip: 'L’arbre doit présenter un jeu égal réparti entre le tambour et le couvercle.'
  },
  {
    code: '200',
    family: '200',
    fr: 'Roue de grande moyenne (Roue de centre)',
    de: 'Minutenrad (Grossbodenrad)',
    en: 'Center wheel (Great wheel)',
    role: 'Accomplit exactement 1 tour par heure et porte la chaussée (240) côté cadran.',
    lubricant: 'Moebius HP-1300 aux pivots',
    benchTip: 'Forte charge radiale transmise par le barillet : toujours utiliser l’huile haute pression HP-1300.'
  },
  {
    code: '210',
    family: '200',
    fr: 'Roue de moyenne',
    de: 'Kleinbodenrad',
    en: 'Third wheel',
    role: 'Mobile intermédiaire démultiplicateur reliant la grande moyenne (200) au pignon de seconde (220).',
    lubricant: 'Moebius HP-1300 ou 9010 selon calibre',
    benchTip: 'Vérifier la planéité de la planche de roue avant la pose du pont de rouage.'
  },
  {
    code: '220',
    family: '200',
    fr: 'Roue de seconde',
    de: 'Sekundenrad',
    en: 'Fourth wheel (Seconds wheel)',
    role: 'Effectue 1 tour en 60 secondes, porte l’aiguille de seconde et entraîne le pignon d’échappement (705).',
    lubricant: 'Moebius 9010 (faible viscosité)',
    benchTip: 'Pivot inférieur prolongé très fragile sur les calibres à petite seconde (ex: ETA 6497) ou seconde centrale.'
  },
  {
    code: '240',
    family: '200',
    fr: 'Chaussée (avec lanternage)',
    de: 'Minutenrohr',
    en: 'Cannon pinion',
    role: 'Pignon tubulaire monté à friction grasse sur la grande moyenne permettant le débrayage lors de la mise à l’heure.',
    lubricant: 'Moebius 9504 ou HP-1300 (dans la gorge de friction)',
    benchTip: 'Extraction verticale stricte à l’outil Presto pour ne jamais fléchir l’axe de centre.'
  },
  {
    code: '250',
    family: '200',
    fr: 'Roue des heures',
    de: 'Stundenrad',
    en: 'Hour wheel',
    role: 'Effectue 1 tour en 12 heures (démultiplication 1:12 depuis la chaussée via la minuterie 255).',
    lubricant: 'Légère trace Moebius 9010 / HP-1300 sur canon',
    benchTip: 'Ne jamais oublier le clinquant (ressort-rondelle doré) sous le cadran qui maintient la roue des heures en place.'
  },

  // SÉRIE 400 : TIGERIE, REMONTOIR & MISE À L'HEURE
  {
    code: '401',
    family: '400',
    fr: 'Tige de remontoir',
    de: 'Aufzugwelle',
    en: 'Winding stem',
    role: 'Axe acier profilé (carré d’entraînement, gorge de tirette, portée de guidage et filetage de couronne).',
    lubricant: 'Moebius 9504 (carré, gorge et portée)',
    benchTip: 'Toujours insérer la tige en position de mise à l’heure lors du démontage sur ETA 2824-2 pour ne pas faire sauter la bascule.'
  },
  {
    code: '405',
    family: '400',
    fr: 'Pignon coulant',
    de: 'Schiebetrieb',
    en: 'Sliding pinion (Clutch wheel)',
    role: 'Coulisse sur le carré de la tige : embraye sur le pignon de remontoir (407) via sa denture Breguet ou sur le renvoi.',
    lubricant: 'Moebius 9504 (gorge de bascule, carré et denture Breguet)',
    benchTip: 'Sens de montage impératif : denture Breguet (dents de loup) orientée vers le pignon de remontoir (407).'
  },
  {
    code: '407',
    family: '400',
    fr: 'Pignon de remontoir',
    de: 'Aufzugtrieb',
    en: 'Winding pinion',
    role: 'Tourne librement sur la portée cylindrique de la tige et transmet la rotation à la roue de couronne (420).',
    lubricant: 'Moebius 9504 / HP-1300',
    benchTip: 'Denture Breguet inclinée permettant le débrayage à cliquet en rotation inverse de la couronne.'
  },
  {
    code: '415',
    family: '400',
    fr: 'Rochet',
    de: 'Sperrrad',
    en: 'Ratchet wheel',
    role: 'Monté sur le carré de l’arbre de barillet ; arme le ressort-moteur et est retenu par le cliquet (425).',
    lubricant: 'Sec sur la denture (HP-1300 sous la tête de vis)',
    benchTip: 'Toujours désarmer le barillet en retenant la couronne avant de soulever le cliquet avant démontage.'
  },
  {
    code: '420',
    family: '400',
    fr: 'Roue de couronne',
    de: 'Kronrad',
    en: 'Crown wheel',
    role: 'Transmet l’effort du pignon de remontoir (407) au rochet de barillet (415).',
    lubricant: 'Moebius HP-1300 sur le noyau (bague)',
    benchTip: 'ATTENTION : la vis de roue de couronne possède très souvent un PAS À GAUCHE (repérée par 2 ou 3 fentes sur la tête).'
  },
  {
    code: '435',
    family: '400',
    fr: 'Bascule',
    de: 'Winkelhebelfeder / Stellhebel',
    en: 'Yoke (Clutch lever)',
    role: 'Levier poussé par son ressort (440) qui déplace le pignon coulant (405) entre remontage et mise à l’heure.',
    lubricant: 'Moebius 9504 aux points de friction avec la tirette et le ressort',
    benchTip: 'Lors de la pose du ressort de bascule (440), maintenir une feuille de Rodico ou de cabron pour éviter toute éjection.'
  },
  {
    code: '443',
    family: '400',
    fr: 'Tirette',
    de: 'Winkelhebel',
    en: 'Setting lever',
    role: 'Levier dont le plot s’engage dans la gorge de la tige (401) pour verrouiller et commander les positions axiales.',
    lubricant: 'Moebius 9504 sur le plot et l’axe',
    benchTip: 'Ne jamais dévisser la vis de tirette de plus de 1,5 tour : sinon elle tombe côté cadran et oblige à déposer les aiguilles.'
  },
  {
    code: '445',
    family: '400',
    fr: 'Ressort de tirette (Sautoir de tirette)',
    de: 'Stellhebelfeder',
    en: 'Setting lever jumper / spring',
    role: 'Crante fermement les positions de la tirette (Pos. 1 Remontage, Pos. 2 Date rapide, Pos. 3 Mise à l’heure).',
    lubricant: 'Moebius 9504 sur les crans de sautoir',
    benchTip: 'Une usure du bec de sautoir rend le passage des crans de couronne flou.'
  },

  // SÉRIE 700 : ÉCHAPPEMENT & ORGANE RÉGLANT
  {
    code: '705',
    family: '700',
    fr: 'Roue d’échappement montée',
    de: 'Hemmungsrad (Ankerrad)',
    en: 'Escape wheel',
    role: 'Roue à 15 dents (forme talon ou club) qui distribue l’énergie aux palettes de rubis de l’ancre (710).',
    lubricant: 'Moebius 9010 aux pivots + Moebius 9415 (1 dent sur 3 via palette de sortie)',
    benchTip: 'Ne jamais toucher les dents avec des doigts nus : l’acidité cutanée oxyde l’acier poli et dégrade le rendement.'
  },
  {
    code: '710',
    family: '700',
    fr: 'Ancre montée',
    de: 'Anker komplett',
    en: 'Pallet fork',
    role: 'Organe distributeur alternatif muni de deux palettes en rubis synthétique (entrée/sortie), d’une fourchette et d’un dard.',
    lubricant: 'Moebius 9415 uniquement sur les plans d’impulsion des rubis (PIVOTS ET FOURCHETTE 100% SECS)',
    benchTip: 'Contrôler le tirage (12° à 15°) : l’ancre doit être aspirée franchement contre chaque goupille de limitation.'
  },
  {
    code: '721',
    family: '700',
    fr: 'Balancier complet avec spiral',
    de: 'Unruh komplett mit Spirale',
    en: 'Complete balance with hairspring',
    role: 'Oscillateur harmonique (inertie I du balancier + couple de rappel élastique C du spiral Nivarox / Silicium).',
    lubricant: 'Moebius 9010 sur les contre-pivots uniquement (goutte centrée à 60% du diamètre)',
    benchTip: 'Le spiral doit être parfaitement plat, centré et jouer librement entre les goupilles de raquette sans jamais coller.'
  },
  {
    code: '730',
    family: '700',
    fr: 'Double plateau (Grand plateau & Petit plateau)',
    de: 'Doppelrolle mit Hebelstein',
    en: 'Double roller with impulse jewel',
    role: 'Chassé sur l’axe de balancier : porte la cheville de plateau (ellipse en rubis) et l’encoche de sécurité du dard.',
    lubricant: 'STRICTEMENT À SEC',
    benchTip: 'Vérifier l’alignement parfait de la cheville de plateau avec le croissant du petit plateau.'
  },
  {
    code: '770',
    family: '700',
    fr: 'Amortisseur de chocs (Incabloc / Kif)',
    de: 'Stosssicherung (Incabloc)',
    en: 'Shock absorber assembly',
    role: 'Bloc chaton mobile + pierre percée + contre-pivot maintenus par un ressort-lyre qui absorbe les chocs axiaux et radiaux.',
    lubricant: 'Moebius 9010 au centre de la face plane du contre-pivot',
    benchTip: 'Décrocher les deux branches de la lyre avec une aiguille noire fine sans jamais déformer les charnières.'
  },

  // SÉRIE 1100-1500 : REMONTAGE AUTOMATIQUE
  {
    code: '1143',
    family: '1100',
    fr: 'Masse oscillante (Rotor)',
    de: 'Schwingmasse (Rotor)',
    en: 'Oscillating weight (Rotor)',
    role: 'Secteur lourd (laiton lourd, tungstène ou or 21ct/22ct) pivotant sur roulement à billes sous l’effet de la gravité.',
    lubricant: 'Moebius 9010 (micro-goutte sur 1 bille sur 3 du roulement)',
    benchTip: 'Vérifier que la jupe de la masse ne frotte ni contre le pont de mouvement ni contre le fond du boîtier.'
  },
  {
    code: '1488',
    family: '1100',
    fr: 'Roue inverseuse',
    de: 'Wechsler (Umkehrrad)',
    en: 'Reversing wheel',
    role: 'Redresse les deux sens de rotation de la masse oscillante en un seul sens d’armage vers le rochet.',
    lubricant: 'Bain dédié Lubeta V105 (jamais d’huile épaisse au pique-huile !)',
    benchTip: 'Une goutte d’huile classique colle les cliquets internes : le rotor se met alors à tourner en « hélicoptère » au remontage manuel.'
  },

  // SÉRIE 2500 & 8000 : QUANTIÈME & CHRONOGRAPHE
  {
    code: '2557',
    family: '8000',
    fr: 'Indicateur de quantième (Disque de date)',
    de: 'Datumanzeiger (Datumsring)',
    en: 'Date indicator disc',
    role: 'Couronne à 31 dents internes indexée par le sautoir de quantième (2576) une fois par 24 heures.',
    lubricant: 'Légère trace HP-1300 sur le bec du sautoir 2576',
    benchTip: 'Zone rouge horlogère : ne jamais actionner la correction rapide de date entre 21h00 et 03h00.'
  },
  {
    code: '8080',
    family: '8000',
    fr: 'Pignon oscillant (Valjoux 7750)',
    de: 'Schwingtrieb',
    en: 'Oscillating pinion',
    role: 'Système d’embrayage de chronographe conçu par Ed. Heuer : bascule pour accoupler la roue de seconde (220) au mobile de chrono.',
    lubricant: 'Sec sur la denture fine (HP-1300 au pivot inférieur)',
    benchTip: 'Régler l’excentrique de pénétration pour obtenir un engrènement exact à 1/3 de la hauteur de dent (zéro saut au départ).'
  },
  {
    code: '8139',
    family: '8000',
    fr: 'Came navette (ou Roue à colonnes)',
    de: 'Schaltnocke / Säulenrad',
    en: 'Coulisse cam / Column wheel',
    role: 'Cerveau mécanique du chronographe : coordonne le départ (Start), l’arrêt (Stop), le frein et les marteaux de remise à zéro (8200).',
    lubricant: 'Moebius 9504 / HP-1300 sur les flancs de came et leviers',
    benchTip: 'Ne jamais déclencher la remise à zéro (poussoir à 4h) pendant que le chronographe est embrayé en marche.'
  }
];

const FAMILIES = [
  { id: 'all', label: 'Toutes les Séries (30)', sub: 'Codes 100 à 8000' },
  { id: '100', label: 'Série 100 · Bâti & Ponts', sub: 'Platine, Coq, Ponts' },
  { id: '200', label: 'Série 200 · Barillet & Rouage', sub: '180 à 255' },
  { id: '400', label: 'Série 400 · Tigerie & Remontoir', sub: '401, 405, 443, 445' },
  { id: '700', label: 'Série 700 · Échappement & Réglant', sub: '705, 710, 721, 770' },
  { id: '1100', label: 'Série 1100 · Automatique', sub: 'Rotor 1143, Inverseur 1488' },
  { id: '8000', label: 'Série 2500/8000 · Complications', sub: 'Quantième & Chrono' }
] as const;

export default function TermesTechniquesPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFamily, setSelectedFamily] = useState<'all' | '100' | '200' | '400' | '700' | '1100' | '8000'>('all');

  const filteredParts = useMemo(() => {
    return EBAUCHES_PARTS.filter((part) => {
      const matchFam = selectedFamily === 'all' || part.family === selectedFamily;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        part.code.toLowerCase().includes(q) ||
        part.fr.toLowerCase().includes(q) ||
        part.de.toLowerCase().includes(q) ||
        part.en.toLowerCase().includes(q) ||
        part.role.toLowerCase().includes(q);
      return matchFam && matchSearch;
    });
  }, [searchQuery, selectedFamily]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070A10] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Navigation */}
        <div>
          <Link
            href="/ressources"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour aux Ressources Horlogères</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Codification Universelle Suisse Ebauches SA • Trilingue FR / DE / EN</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Dictionnaire Officiel des Fournitures &amp; Codes Ebauches SA
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                En horlogerie suisse, chaque pièce porte un numéro normalisé universel (de <code>100</code> Platine à <code>8200</code> Marteau de chronographe). Retrouvez le code de commande, la nomenclature trilingue d&apos;usine (Français, Allemand, Anglais), le lubrifiant Moebius certifié et le geste d&apos;établi.
              </p>
            </div>
          </div>
        </div>

        {/* Planche Synoptique Vectorielle des 6 Grandes Familles Ebauches SA */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold">
                Planche Technique Synoptique • Silhouettes d&apos;Identification Rapide
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Repères Visuels des Organes Normalisés (Codes 100 · 200 · 400 · 700 · 8000)
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Cliquez sur une série ci-dessous pour filtrer la nomenclature
            </span>
          </div>

          <div
            className="w-full rounded-2xl border border-amber-500/30 overflow-x-auto p-4"
            style={{ background: '#070C18' }}
          >
            <svg viewBox="0 0 920 190" className="w-full min-w-[720px] h-auto block select-none">
              <defs>
                <linearGradient id="ebGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#9A7B2C" />
                </linearGradient>
                <linearGradient id="ebSteel" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F1F5F9" />
                  <stop offset="50%" stopColor="#94A3B8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>

              {/* Case 1 : Série 100 Platine & Coq */}
              <g transform="translate(15, 15)" onClick={() => setSelectedFamily('100')} className="cursor-pointer">
                <rect x="0" y="0" width="165" height="160" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="82" y="22" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">SÉRIE 100 · BÂTI</text>
                {/* Dessin Coq 121 */}
                <path d="M 42,82 C 42,62 68,58 82,58 C 102,58 122,68 122,82 C 122,96 102,102 82,102 C 62,102 42,96 42,82 Z" fill="none" stroke="url(#ebGold)" strokeWidth="2.5" />
                <circle cx="62" cy="80" r="6" fill="#E11D48" stroke="#FDE68A" strokeWidth="1.2" />
                <circle cx="106" cy="80" r="5" fill="url(#ebSteel)" />
                <text x="82" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">100 Platine · 121 Coq</text>
                <text x="82" y="147" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">105 Barillet · 110 Rouage</text>
              </g>

              {/* Case 2 : Série 200 Barillet & Rouage */}
              <g transform="translate(196, 15)" onClick={() => setSelectedFamily('200')} className="cursor-pointer">
                <rect x="0" y="0" width="165" height="160" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="82" y="22" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">SÉRIE 200 · ROUAGE</text>
                {/* Dessin Roue 200 à 5 bras */}
                <circle cx="82" cy="78" r="26" fill="none" stroke="url(#ebGold)" strokeWidth="3" strokeDasharray="4 2" />
                <circle cx="82" cy="78" r="21" fill="none" stroke="url(#ebGold)" strokeWidth="1.5" />
                <line x1="82" y1="57" x2="82" y2="99" stroke="url(#ebGold)" strokeWidth="2" />
                <line x1="61" y1="78" x2="103" y2="78" stroke="url(#ebGold)" strokeWidth="2" />
                <circle cx="82" cy="78" r="5" fill="url(#ebSteel)" />
                <text x="82" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">180 Barillet · 200 Centre</text>
                <text x="82" y="147" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">210 Moyenne · 240 Chaussée</text>
              </g>

              {/* Case 3 : Série 400 Tigerie */}
              <g transform="translate(377, 15)" onClick={() => setSelectedFamily('400')} className="cursor-pointer">
                <rect x="0" y="0" width="165" height="160" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="82" y="22" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">SÉRIE 400 · TIGERIE</text>
                {/* Dessin Tige 401 + Tirette 443 + Pignon coulant 405 */}
                <rect x="24" y="74" width="116" height="6" rx="2" fill="url(#ebSteel)" />
                <rect x="64" y="64" width="22" height="26" rx="2" fill="none" stroke="#38BDF8" strokeWidth="2" />
                <path d="M 46,55 L 56,74 L 95,94" fill="none" stroke="url(#ebGold)" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="46" cy="55" r="4" fill="#FBBF24" />
                <text x="82" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">401 Tige · 405 Coulant</text>
                <text x="82" y="147" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">435 Bascule · 443 Tirette</text>
              </g>

              {/* Case 4 : Série 700 Échappement & Balancier */}
              <g transform="translate(558, 15)" onClick={() => setSelectedFamily('700')} className="cursor-pointer">
                <rect x="0" y="0" width="165" height="160" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="82" y="22" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">SÉRIE 700 · RÉGLANT</text>
                {/* Dessin Ancre 710 & Palettes Rubis */}
                <path d="M 55,92 L 82,66 L 109,92" fill="none" stroke="url(#ebSteel)" strokeWidth="3" strokeLinecap="round" />
                <line x1="82" y1="66" x2="82" y2="46" stroke="url(#ebSteel)" strokeWidth="2.5" />
                <rect x="50" y="88" width="8" height="12" transform="rotate(-20 54 94)" fill="#E11D48" />
                <rect x="105" y="88" width="8" height="12" transform="rotate(20 109 94)" fill="#E11D48" />
                <circle cx="82" cy="66" r="3.5" fill="#FBBF24" />
                <text x="82" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">705 Échap. · 710 Ancre</text>
                <text x="82" y="147" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">721 Balancier · 770 Incabloc</text>
              </g>

              {/* Case 5 : Série 8000 Chronographe & Quantième */}
              <g transform="translate(739, 15)" onClick={() => setSelectedFamily('8000')} className="cursor-pointer">
                <rect x="0" y="0" width="165" height="160" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <text x="82" y="22" textAnchor="middle" fill="#FBBF24" fontSize="10" fontFamily="monospace" fontWeight="bold">SÉRIE 8000 · CHRONO</text>
                {/* Dessin Came Cœur & Pignon Oscillant */}
                <path d="M 82,96 C 62,82 58,60 70,52 C 78,47 82,56 82,56 C 82,56 86,47 94,52 C 106,60 102,82 82,96 Z" fill="none" stroke="#10B981" strokeWidth="2.2" />
                <circle cx="82" cy="70" r="3.5" fill="url(#ebGold)" />
                <text x="82" y="132" textAnchor="middle" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">8080 Pignon Oscillant</text>
                <text x="82" y="147" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="monospace">8139 Came · 2557 Date</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Barre de Recherche & Filtres par Série */}
        <div className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tapez un code (443, 710, 240) ou nom FR / DE / EN (Tirette, Anker, Yoke)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-xs font-mono focus:outline-none focus:border-amber-500 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {FAMILIES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFamily(f.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    selectedFamily === f.id
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:border-amber-500/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des Pièces Normalisées Ebauches SA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredParts.map((part) => (
            <div
              key={part.code}
              className="bg-white dark:bg-[#0D121F] rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-mono text-xs font-extrabold tracking-wider">
                    N° {part.code}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                    Série {part.family}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {part.fr}
                </h3>

                {/* Traductions d'usine DE / EN */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200/70 dark:border-white/5 text-[11px] font-mono space-y-1 mb-3">
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400">🇩🇪 DE :</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 text-right">{part.de}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-400">🇬🇧 EN :</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 text-right">{part.en}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {part.role}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/10 space-y-2 text-[11px] font-mono">
                <div className="text-emerald-600 dark:text-emerald-400">
                  <strong>💧 Lubrification :</strong> {part.lubricant}
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  <strong className="text-amber-600 dark:text-amber-400">🔧 Établi :</strong> {part.benchTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
