// src/app/pratique/demontage/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  RotateCcw,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Droplet,
  Layers
} from 'lucide-react';

interface StepDetail {
  number: number;
  title: string;
  side: 'Ponts (Mouvement)' | 'Cadran (Affichage)' | 'Organe Régulateur';
  screwdriver: { name: string; colorClass: string; diam: string };
  tweezer: string;
  actionProtocol: string[];
  atelierWarning: string;
  remontageTip: string;
  moebiusOil?: string;
}

const DISASSEMBLY_STEPS: StepDetail[] = [
  {
    number: 1,
    title: 'Mise sur Porte-Mouvement & Désarment du Barillet',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3 & Cheville de bois taillée',
    actionProtocol: [
      'Positionner le calibre ETA 6497-1 sur un porte-mouvement approprié et serrer la vis de serrage sans forcer.',
      'DÉSARMEMENT OBLIGATOIRE : Tenir fermement la couronne de remontoir entre le pouce et l’index.',
      'Avec une cheville de bois ou une pointe en plastique, écarter délicatement le bec du cliquet de la denture du rochet.',
      'Laisser la couronne tourner doucement et lentement entre les doigts pour détendre complètement le ressort moteur.'
    ],
    atelierWarning: 'DANGER MORTEL POUR LE CALIBRE : Si vous démontez les ponts sans désarmer le ressort, le couple brutal détruira instantanément les pivots des mobiles de rouage et projettera les pièces.',
    remontageTip: 'Lors du remontage, tester l’armage de 2 ou 3 clics pour vérifier que le ressort moteur accroche bien la bonde.',
    moebiusOil: 'Moebius 8200 pour le ressort moteur'
  },
  {
    number: 2,
    title: 'Dépose de la Tige de Remontoir & Couronne',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Repérer la vis de tirette située à proximité de la tige de remontoir.',
      'Dévisser la vis de tirette d’exactement 1 tour à 1 tour et demi au maximum.',
      'Tirer doucement sur la tige de remontoir dans l’axe pour la faire glisser hors du mouvement.'
    ],
    atelierWarning: 'PIÈGE CLASSIQUE : Ne JAMAIS dévisser la vis de tirette à fond ! Si elle se détache, la tirette tombe sous la platine et nécessite le démontage complet du côté cadran pour être repositionnée.',
    remontageTip: 'Vérifier la libre translation du pignon coulant sur le carré de la tige lors de la réinsertion.'
  },
  {
    number: 3,
    title: 'Dépose de l’Organe Régulateur (Coq & Balancier-Spiral)',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3 (manipulation du coq)',
    actionProtocol: [
      'Dévisser la vis de fixation du Coq (pont de balancier).',
      'Insérer l’embout biseauté des brucelles dans la coche de dégagement du Coq.',
      'Lever délicatement le Coq à la verticale sans jamais toucher au spiral.',
      'Pivoter légèrement le Coq pour dégager la cheville de plateau de la fourchette de l’ancre.',
      'Déposer immédiatement l’ensemble Coq et Balancier sous cloche de protection ou sur un porte-balancier.'
    ],
    atelierWarning: 'ZONE D’EXTRÊME FRAGILITÉ : La moindre torsion sur la lame du spiral Nivarox détruit son isochronisme. Ne déposez jamais le balancier à plat sur l’établi.',
    remontageTip: 'Engager d’abord le pivot inférieur dans la pierre de platine, orienter la cheville dans la fourchette, puis rabattre le Coq horizontalement sans forcer.',
    moebiusOil: 'Moebius 9010 sur les contre-pivots Incabloc'
  },
  {
    number: 4,
    title: 'Dépose de l’Échappement (Pont d’Ancre & Ancre Suisse)',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Blanc ou Jaune', colorClass: 'bg-yellow-400 text-slate-900', diam: '0.80 mm' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      'Dévisser les deux vis de pont d’ancre de manière symétrique.',
      'Lever le pont d’ancre bien perpendiculairement à la platine pour ne pas cisailler le pivot supérieur.',
      'Saisir délicatement le corps de l’ancre au niveau de la tige de fourchette avec les brucelles.',
      'Extraire l’ancre sans frotter les palettes en rubis contre la denture de la roue d’échappement.'
    ],
    atelierWarning: 'ATTENTION AU DARD : Le dard sous la fourchette mesure 0.10 mm de diamètre. Tout choc contre la platine le pliera et bloquera la sécurité anti-renversement.',
    remontageTip: 'Au remontage, vérifier la liberté de pivotement de l’ancre par un souffle léger : elle doit sauter d’une touche à l’autre.',
    moebiusOil: 'Moebius 9415 (graisse thixotrope sur les levées de rubis uniquement)'
  },
  {
    number: 5,
    title: 'Dépose du Rochet & de la Roue de Couronne',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Violet / Rouge', colorClass: 'bg-purple-500 text-white', diam: '1.40 à 1.60 mm' },
    tweezer: 'Brucelles Dumont N° 1 ou Laiton',
    actionProtocol: [
      'Dévisser la vis de rochet (vis centrale standard, pas à droite). Retirer le rochet de barillet.',
      'ATTENTION PAS INVERSÉ : La vis de roue de couronne possède un PAS À GAUCHE (signalée par 3 fentes ou gravure).',
      'Pour DÉVISSER la roue de couronne, tourner le tournevis DANS LE SENS DES AIGUILLES D’UNE MONTRE.',
      'Retirer la roue de couronne et sa bague de calage en laiton.'
    ],
    atelierWarning: 'PIÈGE NUMÉRO 1 EN ÉCOLE : Forcer dans le sens habituel pour dévisser la roue de couronne casse net la tête de vis dans le pont de barillet.',
    remontageTip: 'Bien positionner la bague intermédiaire sous la roue de couronne pour éviter le grippage.'
  },
  {
    number: 6,
    title: 'Dépose du Pont de Barillet & Tambour de Barillet',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 1',
    actionProtocol: [
      'Dévisser les deux vis du pont de barillet.',
      'Dégager le pont par ses encoches de levage à l’aide d’un tournevis approprié.',
      'Saisir le tambour de barillet complet avec les brucelles et le sortir de son logement sur la platine.',
      'Inspecter les dentures du tambour pour s’assurer qu’aucune dent n’est faussée.'
    ],
    atelierWarning: 'Veiller à ce que le cliquet et son ressort ne sautent pas hors du pont lors de la manipulation.',
    remontageTip: 'Vérifier l’ébat de hauteur du barillet entre platine et pont (0.05 à 0.08 mm).',
    moebiusOil: 'Moebius HP-1300 sur les portées de l’arbre de barillet'
  },
  {
    number: 7,
    title: 'Dépose du Pont de Rouage',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Tournevis Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Dévisser progressivement et en croix les 3 vis du pont de rouage.',
      'Prendre appui dans les coches de levage pour décoller le pont des pieds de positionnement.',
      'Lever le pont STRICTEMENT verticalement pour accompagner la sortie des pivots de roue des pierres.',
      'Déposer le pont sur un papier d’observation propre.'
    ],
    atelierWarning: 'Ne jamais faire levier d’un seul côté : un pivot de roue coincé dans une pierre se pliera immédiatement.',
    remontageTip: 'Au remontage, guider chaque pivot l’un après l’autre dans sa pierre respective avec une cheville avant de visser.'
  },
  {
    number: 8,
    title: 'Extraction des Mobiles de Rouage',
    side: 'Ponts (Mouvement)',
    screwdriver: { name: 'Aucun (Manipulation manuelle)', colorClass: 'bg-slate-400 text-slate-900', diam: 'Brucelles' },
    tweezer: 'Brucelles Dumont N° 3 fines',
    actionProtocol: [
      '1. Retirer la roue d’échappement à 15 dents en la saisissant par sa serpe.',
      '2. Retirer la roue des secondes (9 heures) en veillant à ne pas plier son long axe.',
      '3. Retirer la roue moyenne en la soulevant par le centre.',
      'Classer les roues dans les compartiments d’une boîte de lavage compartimentée.'
    ],
    atelierWarning: 'Le pivot de roue des secondes est le plus vulnérable de tout le train cinématique (Ø 0.12 mm).',
    remontageTip: 'Vérifier que les ailes de pignons sont exemptes de tout débris ou cambouis séché avant le nettoyage.',
    moebiusOil: 'Moebius 9010 sur pivots de seconde et échappement'
  },
  {
    number: 9,
    title: 'Dépose de la Chaussée & Roue de Centre',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Outil aux aiguilles / Presto', colorClass: 'bg-amber-500 text-slate-950', diam: 'Tire-chaussée' },
    tweezer: 'Brucelles Dumont N° 1',
    actionProtocol: [
      'Retourner le mouvement côté cadran sur le porte-mouvement.',
      'Extraire la chaussée (chassée à friction sur l’axe de centre) avec un outil tire-chaussée Presto.',
      'Retourner le mouvement côté ponts et extraire la roue de centre (grande moyenne).',
      'Vérifier la lanterne de la chaussée (cran de friction assurant la mise à l’heure).'
    ],
    atelierWarning: 'Ne jamais tenter d’extraire la roue de centre tant que la chaussée n’a pas été retirée côté cadran !',
    remontageTip: 'Vérifier le gras de chaussée : la mise à l’heure doit offrir une résistance ferme mais onctueuse.',
    moebiusOil: 'Moebius HP-1300 sur les portées centrales'
  },
  {
    number: 10,
    title: 'Démontage de la Minuterie (Côté Cadran)',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Noir', colorClass: 'bg-slate-900 text-white border border-slate-700', diam: '1.00 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Retirer la rondelle clinquant de roue des heures.',
      'Extraire la roue des heures en la soulevant de son canon.',
      'Dévisser la vis de couvre-minuterie (si présent) et retirer la roue de minuterie.',
      'Inspecter les dentures de renvoi pour détecter toute usure anormale.'
    ],
    atelierWarning: 'Ne pas égarer le clinquant (fine rondelle en cuivre courbée) qui maintient le jeu de la roue des heures.',
    remontageTip: 'Contrôler le bon engrenage avec la chaussée lors de la rotation de la minuterie.',
    moebiusOil: 'Graisse Moebius 9504 ou D5 sur le canon de roue des heures'
  },
  {
    number: 11,
    title: 'Démontage du Mécanisme de Remontoir & Mise à l’Heure',
    side: 'Cadran (Affichage)',
    screwdriver: { name: 'Tournevis Noir / Rouge', colorClass: 'bg-red-500 text-white', diam: '1.20 mm' },
    tweezer: 'Brucelles Dumont N° 3',
    actionProtocol: [
      'Dévisser la vis du ressort de bascule en maintenant le ressort avec le doigt pour éviter qu’il ne saute.',
      'Retirer la bascule et son ressort.',
      'Dévisser la vis de tirette et extraire la tirette.',
      'Extraire le pignon coulant (à dents de loup) et le pignon de remontoir de la gorge de platine.'
    ],
    atelierWarning: 'PROJECTION DE RESSORT : Les ressorts de bascule ont une fâcheuse tendance à sauter à travers l’atelier. Gardez TOUJOURS un doigt posé dessus lors du dévissage.',
    remontageTip: 'Vérifier la netteté des dents de loup du pignon coulant pour garantir un remontage sans accroc.',
    moebiusOil: 'Graisse Moebius 9504 sur la gorge du pignon coulant et les crans de tirette'
  },
  {
    number: 12,
    title: 'Démontage des Antichocs Incabloc pour Nettoyage',
    side: 'Organe Régulateur',
    screwdriver: { name: 'Outil Incabloc / Brucelles N° 5', colorClass: 'bg-amber-500 text-slate-950', diam: 'Pointe 0.05 mm' },
    tweezer: 'Brucelles Dumont N° 5 fines',
    actionProtocol: [
      'Avec la pointe d’une brucelle N° 5, désengager les deux bras du ressort lyre Incabloc de leurs crans de verrouillage.',
      'Faire basculer le ressort lyre comme une charnière sans le tordre.',
      'Retourner la pièce sur du papier de soie pour faire glisser le contre-pivot en rubis et la pierre percée sertie.',
      'Répéter la même opération sur le bloc Incabloc du Coq.'
    ],
    atelierWarning: 'Le ressort lyre Incabloc ne s’enlève pas : il reste articulé dans son logement. Tirer dessus le détruira.',
    remontageTip: 'Après nettoyage, déposer une goutte d’huile Moebius 9010 occupant exactement 2/3 du diamètre du contre-pivot avant de refermer la lyre.',
    moebiusOil: 'Moebius 9010 (la goutte d’or au centre du contre-pivot)'
  }
];

export default function DemontagePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'disassembly' | 'assembly'>('disassembly');

  const currentStep = DISASSEMBLY_STEPS[currentStepIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Pratique</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Wrench className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Protocole d’Atelier Officiel • Calibre ETA 6497-1</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Simulateur Séquentiel de Démontage & Remontage
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Le cheminement d’établi rigoureux enseigné dans les écoles d’horlogerie suisses (AFP & CFC). Maîtrisez l’ordre précis des opérations, le tournevis exact à chaque vis et les gestes de sécurité vitaux.
              </p>
            </div>

            {/* Bascule Mode Démontage vs Mode Remontage */}
            <div className="flex p-1.5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex-shrink-0">
              <button
                onClick={() => setDirection('disassembly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  direction === 'disassembly'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1. Séquence Démontage (1 à 12)
              </button>
              <button
                onClick={() => setDirection('assembly')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  direction === 'assembly'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2. Ordre Remontage & Huilage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORPS DU SIMULATEUR --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Barre de navigation des 12 étapes */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-max">
            {DISASSEMBLY_STEPS.map((s, idx) => (
              <button
                key={s.number}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-10 h-10 rounded-2xl text-xs font-bold transition-all flex flex-col items-center justify-center ${
                  currentStepIndex === idx
                    ? 'bg-amber-500 text-slate-950 scale-105 shadow-md shadow-amber-500/25 font-extrabold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{s.number < 10 ? `0${s.number}` : s.number}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:border-amber-500 border border-transparent"
              title="Étape Précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.min(DISASSEMBLY_STEPS.length - 1, prev + 1))}
              disabled={currentStepIndex === DISASSEMBLY_STEPS.length - 1}
              className="p-2.5 rounded-xl bg-amber-500 text-slate-950 disabled:opacity-30 font-bold hover:bg-amber-400"
              title="Étape Suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fiche Technique d'Étape Active */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Panneau Principal de l'Opération */}
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-amber-500 text-slate-950">
                  ÉTAPE {currentStep.number < 10 ? `0${currentStep.number}` : currentStep.number} / 12
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Côté : {currentStep.side}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentStep.title}
              </h2>
            </div>

            {/* Protocole d'intervention */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                Protocole Opératoire à l’Établi :
              </h3>
              <div className="space-y-2.5">
                {currentStep.actionProtocol.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 text-xs sm:text-sm"
                  >
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Avertissement & Conseil de Remontage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1.5">
                <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <span>Alerte Casse & Risque d’Atelier</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentStep.atelierWarning}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Consigne de Remontage & Finition</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {currentStep.remontageTip}
                </p>
              </div>
            </div>
          </div>

          {/* Panneau Latéral : Outillage Spécifique Requis pour cette Étape */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Outils Exacts à Préparer</span>
              </div>

              {/* Tournevis Requis */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400">Tournevis Recommandé :</div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-xl font-bold text-xs ${currentStep.screwdriver.colorClass}`}>
                    Ø {currentStep.screwdriver.diam}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white text-xs">
                    {currentStep.screwdriver.name}
                  </span>
                </div>
              </div>

              {/* Brucelles Requises */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Brucelles & Précision :</div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">
                  {currentStep.tweezer}
                </div>
              </div>

              {/* Huilage Associé si présent */}
              {currentStep.moebiusOil && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                  <div className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Lubrification au Remontage :</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {currentStep.moebiusOil}
                  </div>
                </div>
              )}

              {/* Bouton de progression rapide */}
              <button
                onClick={() => setCurrentStepIndex((prev) => (prev + 1) % DISASSEMBLY_STEPS.length)}
                className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Valider & Passer à l’Étape Suivante</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
