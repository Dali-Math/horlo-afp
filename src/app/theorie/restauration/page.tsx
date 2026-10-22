// src/app/theorie/restauration/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Wrench,
  Compass,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Droplet,
  Layers,
  Search,
  BookOpen,
  ExternalLink,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Award
} from 'lucide-react';

interface RestorationStep {
  number: string;
  title: string;
  subtitle: string;
  tools: string[];
  protocol: string[];
  warning: string;
  precisionTip: string;
}

const RESTORATION_STEPS: RestorationStep[] = [
  {
    number: '01',
    title: 'Diagnostic Préliminaire & Désarment',
    subtitle: 'Évaluation non-destructive sous cloche d’atelier',
    tools: ['Loupe d’œil 10x et 12x', 'Brucelles Dumont n°3 et n°5', 'Pique d’huile en sureau', 'Cheville de bois'],
    protocol: [
      'Contrôle visuel intégral de la pièce : cadran, aiguilles, boîtier et fond.',
      'Désarmer impérativement le ressort moteur avant toute intervention en retenant la couronne et en libérant le cliquet avec une pointe de cheville.',
      'Tester la liberté d’oscillation du balancier par un souffle léger de poire à air.',
      'Contrôler les jeux d’ébat de hauteur et latéraux des mobiles de rouage à la brucelle.'
    ],
    warning: 'Ne JAMAIS dévisser le pont de barillet ou le pont de rouage sans s’être assuré à 100% que le barillet est complètement désarmé, sous peine de briser net les pivots de roue.',
    precisionTip: 'Inspectez les rubis au microscope : une pierre fêlée ou déchassée use le pivot en quelques heures.'
  },
  {
    number: '02',
    title: 'Nettoyage Chimique Douce & Dégommage',
    subtitle: 'Élimination des huiles fossilisées et des oxydes d’époque',
    tools: ['Machine à laver horlogère ou bains de verre', 'Solution Rubisol / Elma', 'Alcool isopropylique', 'Sciure de buis déshydratée'],
    protocol: [
      'Bain n°1 (Nettoyage actif) : Solution ammoniacale dissolvant les graisses séchées et les dépôts carbonés.',
      'Bains n°2 et n°3 (Rinçages) : Alcool isopropylique pur puis essence C rectifiée pour éliminer toute trace d’eau et de détergent.',
      'Séchage doux sous cloche chauffante ou dans de la sciure de buis ultrafine non résineuse.',
      'Brossage délicat des ponts à la brosse horlogère en poils de martre.'
    ],
    warning: 'Ne jamais immerger une ancre suisse ancienne scellée à la gomme-laque dans de l’alcool pur chaud, cela dissoudrait la fixation des levées en rubis.',
    precisionTip: 'Passez une cheville de sureau taillée en biseau dans chaque trou de pierre pour retirer le cambouis récalcitrant.'
  },
  {
    number: '03',
    title: 'Le Bouchonnage des Paliers Ovalisés',
    subtitle: 'Re-baguage micrométrique des trous de platine en laiton',
    tools: ['Potence à river et à boucher', 'Forets de centrage calibrés', 'Bouchons en laiton suisse H7', 'Équarrissoirs et alésoirs'],
    protocol: [
      'Repérer l’axe d’ovalisation créé par la poussée radiale de l’engrenage sur plusieurs décennies.',
      'Fraiser la platine à la potence pour retrouver une circularité parfaite tout en conservant scrupuleusement l’entracte d’engrenage.',
      'Chasser un bouchon en laiton de dureté adaptée au marteau léger ou à la potence Seitz.',
      'Percer puis aléser le trou au diamètre exact du pivot du mobile + 0.015 mm d’ébat fonctionnel.',
      'Fraiser la creusure à huile (godet) pour retenir le lubrifiant par capillarité.'
    ],
    warning: 'Une erreur de positionnement de 0.02 mm sur le bouchon modifie la pénétration de denture et engendre des coincements d’engrenage.',
    precisionTip: 'Toujours adoucir les arêtes du trou avec un petit alésoir poli pour éviter d’entailler le pivot.'
  },
  {
    number: '04',
    title: 'Roulage & Brunissage des Pivots',
    subtitle: 'Écrouissage et finition poli miroir au tour d’horloger',
    tools: ['Tour à pivoter Jacot ou tour d’horloger 8 mm', 'Brunissoir en carbure de tungstène', 'Huile fine de roulage', 'Papier d’argent'],
    protocol: [
      'Monter le mobile entre pointes ou sur encoches appropriées sur le tour Jacot.',
      'Enduire le brunissoir poli d’une micro-goutte d’huile fine de coupe.',
      'Faire tourner le mobile tout en appliquant une pression parfaitement dosée et horizontale avec le brunissoir.',
      'Resserrer le grain de l’acier (écrouissage) et éliminer toutes les stries microscopiques pour atteindre un poli miroir parfait.'
    ],
    warning: 'Une pression excessive peut voiler ou casser net le pivot de seconde ou de balancier dont le diamètre n’excède pas 0.10 mm.',
    precisionTip: 'Un pivot roulé et poli miroir réduit les frottements de 60% et multiplie la durée de vie de la lubrification par 3.'
  },
  {
    number: '05',
    title: 'Redressage & Réglage du Spiral',
    subtitle: 'Correction du plat, du rond et de la courbe terminale',
    tools: ['Brucelles d’horloger n°5 fines affûtées', 'Miroir d’établi', 'Papier blanc d’observation', 'Banc de réglage'],
    protocol: [
      'Poser le balancier sur un miroir pour vérifier la planéité parfaite du spiral (mise au plat).',
      'Contrôler le développement concentrique des spires sans frottement ni touchement (mise au rond).',
      'Corriger les plis accidentels ou les spires écrasées par de micro-flexions contrôlées aux brucelles n°5.',
      'Vérifier le passage libre de la spire extérieure entre les deux goupilles de raquette (jeu de 0.005 mm).'
    ],
    warning: 'Le spiral Nivarox ou acier bleui réagit au quart de micron : tout geste brusque ou hésitant est irréversible.',
    precisionTip: 'Démagnétisez systématiquement le mouvement sur un démagnétiseur professionnel après toute manipulation métallique.'
  },
  {
    number: '06',
    title: 'Finitions Décoratives & Anglage Main',
    subtitle: 'La noblesse artisanale du savoir-faire traditionnel',
    tools: ['Limes suisses d’horlogerie taille 6', 'Cabron de peau et bois de sureau', 'Pâte diamantine blanche', 'Plaque de zinc rodée'],
    protocol: [
      'Anglage : Chanfreiner les arêtes des ponts à 45° régulier avec une lime de précision puis un cabron.',
      'Adoucissage : Éliminer les traits de lime pour obtenir une texture satinée parfaitement homogène.',
      'Poli noir (poli bloqué) : Frotter les têtes de vis en acier sur une plaque de zinc chargée de pâte diamantine jusqu’à obtenir un noir profond réfléchissant la lumière sans déformation.'
    ],
    warning: 'Ne jamais arrondir les angles rentrants : un bel anglage horloger se caractérise par des angles vifs et nets.',
    precisionTip: 'Le poli miroir véritable disparaît sous un certain angle pour devenir d’un noir d’encre absolu.'
  }
];

const DIAGNOSTIC_CASES = [
  {
    id: 'case1',
    symptom: 'La montre fonctionne cadran en bas, mais s’arrête subitement cadran en haut.',
    cause: 'Pivot supérieur de balancier brisé ou contre-pivot Incabloc supérieur encrassé/délogé.',
    solution: 'Démonter le coq, inspecter le pivot supérieur au microscope. Si le pivot est rompu, remplacer l’axe de balancier ou pivoter un nouvel axe au tour.',
    criticalTool: 'Tour d’horloger & Potence à river'
  },
  {
    id: 'case2',
    symptom: 'L’amplitude du balancier est très faible (< 170°) alors que le ressort est armé à bloc.',
    cause: 'Huiles de pivots polymérisées (gommage), ressort moteur affaissé ou ébat axial insuffisant.',
    solution: 'Nettoyage complet par ultrasons, remplacement du ressort de barillet par un ressort Nivaflex moderne, vérification des ébats de ponts.',
    criticalTool: 'Machine à laver horlogère & Estrapade'
  },
  {
    id: 'case3',
    symptom: 'La montre avance d’une heure par jour de manière erratique.',
    cause: 'Spires du spiral magnétisées qui se collent entre elles, ou présence d’une micro-goutte d’huile sur la lame.',
    solution: 'Passage au démagnétiseur d’atelier, dégraissage du spiral à la benzine pure dans un godet d’observation.',
    criticalTool: 'Démagnétiseur électronique & Benzine rectifiée'
  },
  {
    id: 'case4',
    symptom: 'Lors du remontage à la couronne, la montre saute des crans et émet un claquement sec.',
    cause: 'Dents du rochet ou du pignon de remontoir émoussées, ou ressort de cliquet brisé.',
    solution: 'Remplacement du ressort de cliquet en corde à piano ou reprise de la denture du rochet à la lime aux tiers-points.',
    criticalTool: 'Brucelles brucelles fortes & Limes horlogères'
  }
];

export default function RestaurationPage() {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [activeDiagnosticId, setActiveDiagnosticId] = useState<string>('case1');

  const currentStep = RESTORATION_STEPS[selectedStepIndex];
  const activeDiagnostic = DIAGNOSTIC_CASES.find((c) => c.id === activeDiagnosticId) || DIAGNOSTIC_CASES[0];

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
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Rhabillage d’Art & Conservation du Patrimoine Horloger</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              L’Atelier Virtuel de Restauration Horlogère
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Le protocole technique pas-à-pas des maîtres horlogers pour redonner vie aux garde-temps anciens : diagnostic sous cloche, bouchonnage de platine, roulage des pivots au tour Jacot et redressement de spiral.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORPS PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* SECTION 1 : LE PROTOCOLE EN 6 ÉTAPES D'ATELIER */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                Guide Méthodologique d’Établi
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Les 6 Étapes de Rhabillage d’une Montre Ancienne
              </h2>
            </div>

            {/* Sélecteur d'étapes */}
            <div className="flex flex-wrap gap-1.5">
              {RESTORATION_STEPS.map((s, idx) => (
                <button
                  key={s.number}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-all ${
                    selectedStepIndex === idx
                      ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-[#0f1422] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>
          </div>

          {/* Fiche active de l'étape */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-amber-500 text-slate-950">
                    ÉTAPE {currentStep.number} / 06
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {currentStep.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {currentStep.title}
                </h3>
              </div>

              {/* Protocole détaillé */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                  Protocole Opératoire d’Atelier :
                </h4>
                <div className="space-y-2.5">
                  {currentStep.protocol.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs sm:text-sm"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Avertissement & Astuce de précision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-1">
                  <div className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Alerte Critique Risque de Casse</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.warning}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Secret de Maître Horloger</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentStep.precisionTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Outillage Requis pour cette étape */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                <span>Outillage d’Atelier Indispensable</span>
              </div>

              <div className="space-y-2">
                {currentStep.tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{tool}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                ℹ️ Travaillez toujours sur un établi horloger ergonomique avec accoudoirs à hauteur d’yeux et sous éclairage daylight sans ombre.
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 : LABORATOIRE INTERACTIF DE DIAGNOSTIC DE PANNES ANCIENNES */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Cas Pratiques d’Établi
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Laboratoire de Diagnostic de Pannes Réelles
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Sélectionnez un symptôme d’avarie rencontré sur une montre ancienne pour découvrir l’origine mécanique et la méthode de réparation :
            </p>
          </div>

          {/* Boutons des pannes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DIAGNOSTIC_CASES.map((diag) => (
              <button
                key={diag.id}
                onClick={() => setActiveDiagnosticId(diag.id)}
                className={`p-4 rounded-2xl text-left text-xs transition-all flex flex-col justify-between min-h-[90px] ${
                  activeDiagnosticId === diag.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-amber-500'
                }`}
              >
                <span>{diag.symptom}</span>
                <span className={`text-[10px] uppercase font-bold mt-2 ${activeDiagnosticId === diag.id ? 'text-slate-950 underline' : 'text-amber-500'}`}>
                  Inspecter la Panne →
                </span>
              </button>
            ))}
          </div>

          {/* Fiche Solution de Panne */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#07090e] border-2 border-amber-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="text-xs font-bold uppercase text-slate-400">
                Symptôme sélectionné :
              </div>
              <div className="text-xs font-mono font-bold text-amber-500">
                Outil clé requis : {activeDiagnostic.criticalTool}
              </div>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              « {activeDiagnostic.symptom} »
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-500">Origine Mécanique :</span>
                <div className="text-slate-700 dark:text-slate-300 font-medium">
                  {activeDiagnostic.cause}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-500">Solution d’Atelier Concrète :</span>
                <div className="text-slate-700 dark:text-slate-300 font-medium">
                  {activeDiagnostic.solution}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3 : LES GRANDES ARCHIVES & VIDÉOTHÈQUE HORLOGÈRE SUISSE */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Patrimoine & Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Grandes Références de la Restauration Suisse
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🏛️</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Musée International d’Horlogerie (MIH)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Situé à La Chaux-de-Fonds, le MIH abrite le centre de restauration le plus prestigieux au monde pour la conservation des pièces séculaires.
              </p>
              <a
                href="https://www.mih.ch/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Explorer les Collections MIH</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">📜</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Fédération de l’Industrie Horlogère Suisse (FH)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Les normes NIHS officielles régissant les filetages, dentures, emboîtages et tolérances d’ébats appliquées dans toute la Suisse.
              </p>
              <a
                href="https://www.fhs.swiss/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Consulter les Normes FH</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-md space-y-3">
              <div className="text-2xl">🔍</div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Base Ranfft des Calibres Historiques
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                L’encyclopédie de référence mondiale répertoriant les calibres anciens, leurs dimensions en lignes, leurs tiges de remontoir et balanciers.
              </p>
              <a
                href="https://www.ranfft.de/cgi-bin/bidfun-db.cgi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
              >
                <span>Accéder à la Base Ranfft</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
