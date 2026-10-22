// src/app/pratique/huilage/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Droplet,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Wrench,
  Clock,
  BookOpen,
  Eye,
  SlidersHorizontal,
  Award,
  Zap
} from 'lucide-react';

interface LubePoint {
  id: string;
  name: string;
  category: 'échappement' | 'balancier' | 'rouage' | 'barillet' | 'remontoir';
  oil: string;
  oilColor: string;
  toolColor: string;
  toolName: string;
  dosage: string;
  instructions: string;
  warning: string;
}

const LUBE_POINTS: LubePoint[] = [
  {
    id: 'incabloc',
    name: 'Pivots de Balancier & Amortisseurs Incabloc',
    category: 'balancier',
    oil: 'Moebius 9010 (Synthétique Fluide)',
    oilColor: 'bg-amber-400 text-slate-950',
    toolColor: 'bg-black text-white border-slate-600',
    toolName: 'Pique-huile Noir (0.06 mm) ou automatique',
    dosage: 'Micro-goutte couvrant 2/3 de la pierre contre-pivot',
    instructions:
      'Démonter la lyre Incabloc, déposer la goutte d’huile au centre exact du contre-pivot poli. Poser le rubis percé : un ménisque circulaire régulier doit apparaître sans jamais toucher le chaton.',
    warning: 'Si l’huile déborde sur le chaton, nettoyer immédiatement à la benzine et recommencer.'
  },
  {
    id: 'levees',
    name: 'Levées d’Ancre & Impulsion d’Échappement',
    category: 'échappement',
    oil: 'Moebius 9415 (Spéciale Échappement)',
    oilColor: 'bg-rose-500 text-white',
    toolColor: 'bg-rose-600 text-white',
    toolName: 'Pique-huile Rouge (0.15 mm)',
    dosage: 'Demi-goutte étalée sur 3 dents de la roue',
    instructions:
      'Déposer une infime quantité de Moebius 9415 sur le plan d’impulsion d’une dent de roue d’échappement. Actionner doucement l’ancre pour faire passer 5 dents. Répéter sur 3 dents réparties.',
    warning: 'INTERDICTION ABSOLUE : Ne jamais huiler la tige d’ancre, le dard, la fourchette ou les pivots d’ancre !'
  },
  {
    id: 'seconde',
    name: 'Pivots Rapides (Roue de Seconde & Roue d’Échappement)',
    category: 'rouage',
    oil: 'Moebius 9010',
    oilColor: 'bg-amber-400 text-slate-950',
    toolColor: 'bg-rose-600 text-white',
    toolName: 'Pique-huile Rouge (0.15 mm)',
    dosage: '1/3 du réservoir du rubis',
    instructions:
      'Amener la pointe du pique-huile chargé au centre du rubis huilier. Laisser la capillarité aspirer la goutte sans appuyer sur le pivot.',
    warning: 'Ne pas huiler à sec sans avoir contrôlé la propreté du trou de rubis.'
  },
  {
    id: 'centre',
    name: 'Pivots Lents (Roue de Centre & Grande Moyenne)',
    category: 'rouage',
    oil: 'Moebius HP-1300 (Haute Pression)',
    oilColor: 'bg-blue-500 text-white',
    toolColor: 'bg-blue-600 text-white',
    toolName: 'Pique-huile Bleu (0.25 mm)',
    dosage: '1/2 du réservoir du rubis',
    instructions:
      'Ces mobiles subissent un fort couple moteur transmis par le barillet. Utiliser une huile visqueuse résistante au cisaillement.',
    warning: 'Une huile trop fluide (type 9010) serait expulsée en quelques semaines.'
  },
  {
    id: 'barillet',
    name: 'Tambour de Barillet & Ressort Moteur',
    category: 'barillet',
    oil: 'Moebius 8200 / Klüber P125 (Graisse Barillet)',
    oilColor: 'bg-emerald-600 text-white',
    toolColor: 'bg-emerald-600 text-white',
    toolName: 'Pique-huile Vert (0.35 mm) ou spatule',
    dosage: 'Film ultra-fin sur la lame et parois',
    instructions:
      'Appliquer une fine trace le long du ressort déroulé. Pour les calibres automatiques, déposer 3 touches de graisse freinante (Moebius 8217) sur la paroi interne du tambour.',
    warning: 'Un excès de graisse étouffera le ressort et fera chuter l’amplitude de 40°.'
  },
  {
    id: 'remontoir',
    name: 'Mécanisme de Remontage & Tirette / Bascule',
    category: 'remontoir',
    oil: 'Moebius 9501 / 9504 (Graisse Synthétique)',
    oilColor: 'bg-purple-600 text-white',
    toolColor: 'bg-emerald-600 text-white',
    toolName: 'Pique-huile Vert (0.35 mm)',
    dosage: 'Micro-touche sur chaque friction métal/métal',
    instructions:
      'Graisser la gorge du pignon coulant, les dentures bréguez (dents de loup) du pignon de remontoir et la goupille de tirette.',
    warning: 'Éviter de faire déborder la graisse vers le cadran ou le pont de minuterie.'
  }
];

export default function HuilagePage() {
  const [selectedPoint, setSelectedPoint] = useState<LubePoint>(LUBE_POINTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null
  });

  const questions = [
    {
      question: 'Quelle est la quantité idéale d’huile à appliquer sur un pivot de balancier ?',
      options: [
        'Une goutte épaisse pour être certain qu’elle dure des années',
        'Une micro-goutte couvrant précisément les 2/3 de la pierre contre-pivot',
        'Plusieurs gouttes débordant sur le chaton pour lubrifier le ressort lyre',
        'Aucune huile : le balancier doit tourner totalement à sec'
      ],
      correct: 1
    },
    {
      question: 'Pourquoi faut-il utiliser différentes huiles (9010, HP-1300, 9415) selon les zones du mouvement ?',
      options: [
        'Par simple habitude esthétique d’atelier',
        'Pour créer des reflets de différentes couleurs sous le fond saphir',
        'Parce que les vitesses de rotation et les pressions varient considérablement selon les mobiles',
        'Pour économiser le prix des flacons de synthèse'
      ],
      correct: 2
    },
    {
      question: 'Quelle est la conséquence immédiate d’un excès d’huile sur les levées de l’ancre ?',
      options: [
        'Une meilleure amplitude et une marche plus rapide',
        'L’huile migre vers le dard et le spiral, créant un collage et l’arrêt du calibre',
        'Aucune conséquence : l’excès s’évapore naturellement sans résidu',
        'Le boîtier devient étanche à 300 mètres'
      ],
      correct: 1
    }
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const filteredPoints = LUBE_POINTS.filter(
    (pt) => filterCategory === 'all' || pt.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/pratique"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Atelier Pratique</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Droplet className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Protocole Officiel Moebius Suisse</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Huilage & Lubrification d’Établi
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Le secret de la longévité et de l’amplitude d’une montre suisse réside dans la micro-goutte. Explorez le plan de lubrification officiel, le code couleur des pique-huiles et les gestes de précision exigés aux examens CFC.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 max-w-xs font-medium">
              💡 <strong>Règle d’Or Horlogère :</strong> « Trop d’huile est pire que pas assez d’huile. » Moins c’est étalé, plus c’est parfait.
            </div>
          </div>
        </div>
      </section>

      {/* --- PLAN INTERACTIF DE LUBRIFICATION --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Droplet className="w-5 h-5 text-amber-500" />
                <span>Plan de Lubrification par Organe Mécanique</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sélectionnez un point de graissage pour afficher le lubrifiant, la taille du pique-huile et la procédure exacte.
              </p>
            </div>

            {/* Filtres par catégorie */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'Tous les organes' },
                { id: 'balancier', label: 'Balancier / Incabloc' },
                { id: 'échappement', label: 'Échappement' },
                { id: 'rouage', label: 'Train de rouage' },
                { id: 'barillet', label: 'Barillet' },
                { id: 'remontoir', label: 'Remontoir' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCategory(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    filterCategory === f.id
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-amber-500'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille Interactive : Liste des points + Fiche Focus */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Liste des points de lubrification */}
            <div className="lg:col-span-5 space-y-3">
              {filteredPoints.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;

                return (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedPoint(pt)}
                    className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 dark:bg-[#141a2b] shadow-md ring-1 ring-amber-400/40'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0f1422] hover:border-amber-500/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="space-y-1 pr-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {pt.category}
                      </div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {pt.name}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{pt.oil}</div>
                    </div>

                    <div
                      className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
                        isSelected ? 'bg-amber-500 ring-4 ring-amber-500/20' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Fiche Technique Focus Haute Horlogerie */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl dark:shadow-2xl dark:shadow-black/70 ring-1 ring-slate-900/5 dark:ring-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-700/80">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500 font-mono">
                    Fiche Technique de Graissage
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {selectedPoint.name}
                  </h3>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${selectedPoint.oilColor}`}>
                  {selectedPoint.oil}
                </span>
              </div>

              {/* Outil & Dosage */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Pique-Huile Recommandé :
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 flex-shrink-0" />
                    <span>{selectedPoint.toolName}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                    Dosage Prescrit :
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {selectedPoint.dosage}
                  </div>
                </div>
              </div>

              {/* Procédure pas-à-pas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Procédure d’application à l’établi :
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700">
                  {selectedPoint.instructions}
                </p>
              </div>

              {/* Avertissement / Piège critique */}
              <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-500 mt-0.5" />
                <div>
                  <strong className="font-bold">Erreur fatale à éviter : </strong>
                  <span>{selectedPoint.warning}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- LE GUIDE VISUEL DES PIQUE-HUILES HORLOGERS --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md ring-1 ring-slate-900/5 dark:ring-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Le Code Couleur Officiel des Pique-Huiles
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                La taille de la goutte dépend de la largeur de la spatule capillaire.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-500 font-bold px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30">
              Standard Bergeon & Horotec
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                color: 'bg-black text-white',
                label: 'Noir — 0.06 mm (Extra Fin)',
                use: 'Pivots balancier, antichocs Incabloc, micro-pierres',
                oil: 'Moebius 9010'
              },
              {
                color: 'bg-rose-600 text-white',
                label: 'Rouge — 0.15 mm (Fin)',
                use: 'Levées d’ancre, roue d’échappement, pivots seconde',
                oil: 'Moebius 9415 / 9010'
              },
              {
                color: 'bg-blue-600 text-white',
                label: 'Bleu — 0.25 mm (Moyen)',
                use: 'Roue de centre, grande moyenne, tigeron',
                oil: 'Moebius HP-1300'
              },
              {
                color: 'bg-emerald-600 text-white',
                label: 'Vert — 0.35 mm (Large)',
                use: 'Lame de ressort de barillet, minuterie, pignon coulant',
                oil: 'Moebius 8200 / 9501'
              }
            ].map((tool, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full ${tool.color} flex-shrink-0 shadow-sm`} />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{tool.label}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{tool.use}</p>
                <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {tool.oil}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- VIDÉO TUTORIEL DE LUBRIFICATION --- */}
        <section className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Démonstration Pratique : Le Geste du Huileur</span>
            </h3>

            <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden shadow-xl border-2 border-slate-200 dark:border-slate-700">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/ARb8Vo4refs"
                title="Techniques de lubrification horlogère"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Contrôle Qualité sous Binoculaire</span>
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              En manufacture genevoise, chaque point de lubrification est contrôlé sous microscope binoculaire avec un éclairage rasant à 45°.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Ménisque régulier :</strong> L’huile ne doit jamais former de bavure ou de pont vers une platine.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Épilation préalable :</strong> Les pierres doivent être nettoyées sous solvant et traitées à l’épilame (Fixodrop) pour empêcher la migration.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span><strong>Durabilité :</strong> Une lubrification synthétique de qualité assure un fonctionnement parfait de 5 à 7 ans.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* --- MINI-QUIZ D'ÉVALUATION DU HUILAGE --- */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Mini-Quiz : Testez vos connaissances de lubrification
            </h3>
            <span className="text-xs font-bold text-amber-500">3 Questions d’Atelier</span>
          </div>

          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-700"
              >
                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
                  {qIndex + 1}. {q.question}
                </p>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {q.options.map((option, oIndex) => {
                    const isSelected = quizAnswers[qIndex] === oIndex;
                    const isCorrect = oIndex === q.correct;
                    const showResult = quizAnswers[qIndex] !== null;

                    let btnStyle =
                      'w-full text-left p-3 rounded-xl transition-all text-xs sm:text-sm font-semibold border ';

                    if (showResult) {
                      if (isCorrect) {
                        btnStyle +=
                          'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md';
                      } else if (isSelected && !isCorrect) {
                        btnStyle +=
                          'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500';
                      } else {
                        btnStyle +=
                          'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                      }
                    } else {
                      btnStyle +=
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400';
                    }

                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleAnswer(qIndex, oIndex)}
                        disabled={showResult}
                        className={btnStyle}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
