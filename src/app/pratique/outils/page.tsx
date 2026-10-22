// src/app/pratique/outils/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wrench,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Eye,
  Sliders,
  Layers
} from 'lucide-react';

interface PracticalTool {
  id: string;
  name: string;
  role: string;
  bestPractices: string[];
  maintenance: string;
  dangerToAvoid: string;
}

const PRACTICAL_TOOLS: PracticalTool[] = [
  {
    id: 'brucelles',
    name: '1. Les Brucelles de Précision (Dumont)',
    role: 'Prolongement direct des doigts de l’horloger pour saisir, positionner et manipuler 95% des composants sans les marquer.',
    bestPractices: [
      'Tenir la brucelle souple sans crisper la main : la force de serrage doit être minimale pour ne pas catapulter la pièce.',
      'Contrôler la planéité et le parallélisme parfait des becs sous la loupe avant toute séance de travail.',
      'Réserver impérativement une brucelle N° 5 ultra-fine exclusivement aux travaux délicats sur le spiral.'
    ],
    maintenance: 'Affûtage régulier des becs à la pierre d’Arkansas lubrifiée à l’huile minérale, puis polissage doux au papier d’émeri 4/0.',
    dangerToAvoid: 'Ne jamais utiliser une brucelle fine pour faire levier sur un pont ou débloquer une pièce coincée : pointes faussées instantanément.'
  },
  {
    id: 'tournevis',
    name: '2. Les Tournevis d’Horloger Calibrés',
    role: 'Transmission rigoureuse du couple de serrage sur les vis de ponts, rochets et organes fins sans blesser les arêtes.',
    bestPractices: [
      'Choisir une lame dont la largeur remplit au minimum 90% de la longueur de la fente de vis.',
      'L’épaisseur de la lame doit entrer librement jusqu’au fond de la fente sans jeu excessif.',
      'Poser l’index sur la tête pivotante et faire tourner le corps moleté uniquement avec le pouce et le majeur.'
    ],
    maintenance: 'Meuler les lames avec deux faces planes strictement parallèles (profil en T), jamais en biseau triangulaire aiguisé.',
    dangerToAvoid: 'Utiliser une lame trop petite crée un ripage qui refoule le métal de la vis et raye irrémédiablement le pont ou la platine.'
  },
  {
    id: 'loupe',
    name: '3. Les Loupes d’Atelier (N° 1 à 4)',
    role: 'Grossissement optique aplanétique permettant l’inspection minutieuse des ébats, des pivots et des empierrages.',
    bestPractices: [
      'Loupe N° 2 (grossissement standard 5x) : assemblage général, pose des rouages et contrôle des ponts.',
      'Loupe N° 1 (grossissement 10x) : contrôle critique du spiral, jeu des levées d’ancre et lubrification des pierres.',
      'Garder les deux yeux ouverts pendant le travail pour éviter la fatigue oculaire et les maux de tête.'
    ],
    maintenance: 'Nettoyage des verres optiques au chiffon microfibre propre sans solvant agressif.',
    dangerToAvoid: 'Ne pas toucher les lentilles optiques avec des doigts gras de lubrifiant ou de benzine.'
  },
  {
    id: 'porte_mouvement',
    name: '4. Le Porte-Mouvement d’Établi',
    role: 'Maintien stable et rigide du calibre pendant les opérations de vissage, dévissage et chassage.',
    bestPractices: [
      'Ajuster les mors mobiles de manière à soutenir le pourtour de la platine sans contraindre les mobiles en rotation.',
      'S’assurer que la tige de remontoir et les roues dépassantes ne frottent pas sur le corps du porte-pièce.',
      'Privilégier les matières nobles (laiton nickelé ou matériaux synthétiques antistatiques) pour éviter les micro-rayures.'
    ],
    maintenance: 'Dépoussiérage systématique à la soufflette pour éliminer toute limaille ou particule abrasive.',
    dangerToAvoid: 'Serrer excessivement la vis de blocage du porte-mouvement au risque de gauchir la platine principale.'
  },
  {
    id: 'huiliers',
    name: '5. Les Pique-Huiles & Godets d’Huilage',
    role: 'Application micrométrique de gouttes d’huile calibrées (de 0.06 mm à 0.35 mm) sur les rubis et surfaces de friction.',
    bestPractices: [
      'Plonger le pique-huile perpendiculairement dans la réserve d’huile sans toucher le fond du godet.',
      'Déposer la micro-goutte par simple capillarité au centre du contre-pivot sans frotter la pierre.',
      'Nettoyer la pointe du pique-huile dans de la moelle de sureau naturelle entre chaque application.'
    ],
    maintenance: 'Garder les couvercles des godets fermés en permanence pour protéger les huiles de la poussière en suspension.',
    dangerToAvoid: 'Appliquer un excès d’huile : une goutte trop volumineuse s’étale par capillarité sur la platine et assèche le pivot.'
  }
];

export default function PratiqueOutilsPage() {
  const [selectedToolId, setSelectedToolId] = useState<string>('brucelles');
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null
  });

  const activeTool = PRACTICAL_TOOLS.find((t) => t.id === selectedToolId) || PRACTICAL_TOOLS[0];

  const quizQuestions = [
    {
      question: "Quel est l’instrument le plus essentiel pour manipuler les petits composants d’un calibre sans les rayer ?",
      options: [
        "Une pince universelle d’atelier",
        "Des brucelles horlogères de précision adaptées",
        "Une pointe à tracer métallique",
        "Les doigts nus"
      ],
      correct: 1,
      explanation: "Les brucelles horlogères (Dumont) permettent une préhension douce et micrométrique des pièces fines."
    },
    {
      question: "Pourquoi les lames de tournevis d’horloger doivent-elles avoir un profil à faces parallèles (en T) ?",
      options: [
        "Pour s’asseoir à plat dans le fond de la fente et transmettre le couple sans déraper",
        "Par simple tradition esthétique de Genève",
        "Pour couper le métal des vis usées",
        "Pour pouvoir visser plus rapidement"
      ],
      correct: 0,
      explanation: "Un profil à faces parallèles épouse la fente sur 90% de sa surface et prévient tout refoulement de matière."
    },
    {
      question: "Quelle précaution fondamentale doit-on respecter lors du nettoyage des pique-huiles d’établi ?",
      options: [
        "Les essuyer sur un tablier en coton",
        "Les piquer dans un bloc de moelle de sureau déshydratée",
        "Les frotter avec du papier de verre",
        "Les laver à l’eau savonneuse"
      ],
      correct: 1,
      explanation: "La moelle de sureau naturelle absorbe les résidus d’huile sans laisser aucune micro-fibre abrasive sur la pointe."
    }
  ];

  const handleAnswer = (qIdx: number, optIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

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

          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>🇨🇭 Maîtrise Technique & Gestuelle d’Atelier</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Outils & Équipement Fondamentaux
            </h1>

            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Le guide technique des instruments indispensables de l'horloger : règles d’usage ergonomique, maintenance à la moelle de sureau et pierre d’Arkansas, et gestes de sécurité pour protéger les pièces.
            </p>
          </div>
        </div>
      </section>

      {/* --- CORPS PRINCIPAL --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Navigation des 5 Outils Fondamentaux */}
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

        {/* Fiche Technique de l'Outil Sélectionné */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0c101b] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                Fiche Pratique d’Atelier
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {activeTool.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {activeTool.role}
              </p>
            </div>

            {/* Bonnes pratiques d'usage */}
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

            {/* Maintenance & Danger */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Entretien & Pérennité de l’Outil :</span>
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

          {/* Panneau Latéral : Vidéo Pédagogique Suisse */}
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
                Observation du geste d’établi et de la posture des mains.
              </p>
            </div>
          </div>
        </div>

        {/* Mini-Quiz Pédagogique d'Atelier (100% Technique, Zéro Prix) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
              Auto-Évaluation Pratique
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Quiz : Bonnes Pratiques d’Établi
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

                      let btnStyle = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-500';

                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
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
