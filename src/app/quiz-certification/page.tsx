// src/app/quiz-certification/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Award,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Share2,
  BookOpen,
  Wrench,
  ShieldCheck,
  ChevronRight,
  Calculator,
  Compass,
  FileText
} from 'lucide-react';

interface Question {
  id: number;
  domain: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const EXAM_QUESTIONS: Question[] = [
  // Domaine 1 : Cinématique & Rouages
  {
    id: 1,
    domain: 'Cinématique & Rouages',
    question: 'Un balancier oscille à une fréquence de 4 Hz. Quel est son nombre d’alternances par heure (A/h) ?',
    options: ['18’000 A/h', '21’600 A/h', '28’800 A/h', '36’000 A/h'],
    correct: 2,
    explanation: '1 Hz = 2 alternances par seconde. À 4 Hz, on a 8 alternances/s × 3’600 secondes = 28’800 A/h.'
  },
  {
    id: 2,
    domain: 'Cinématique & Rouages',
    question: 'Sur un train de rouage classique, quelle est la vitesse de rotation de la roue de seconde ?',
    options: ['1 tour par minute (60 secondes)', '1 tour par heure', '1 tour toutes les 12 heures', '5 tours par seconde'],
    correct: 0,
    explanation: 'La roue de seconde porte l’aiguille des secondes et effectue exactement un tour complet en 60 secondes.'
  },
  {
    id: 3,
    domain: 'Cinématique & Rouages',
    question: 'Si une roue menante de 64 dents engrène avec un pignon mené de 8 ailes, quel est le rapport d’engrenage ?',
    options: ['Rapport 1:4', 'Rapport 1:8 (multiplication par 8)', 'Rapport 8:1 (réduction)', 'Rapport 1:64'],
    correct: 1,
    explanation: 'Le rapport de multiplication est Z_menante / Z_menée = 64 / 8 = 8.'
  },
  {
    id: 4,
    domain: 'Cinématique & Rouages',
    question: 'Pourquoi les pignons d’engrenages horlogers possèdent-ils des dents appelées « ailes » au profil ogival épicycloïdal ?',
    options: [
      'Pour être plus légers',
      'Pour assurer un engrenage à vitesse constante avec un frottement de roulement pur',
      'Pour retenir l’huile par gravitation',
      'Par simple tradition esthétique de Genève'
    ],
    correct: 1,
    explanation: 'Le profil ogival minimise les frottements et garantit une transmission continue du couple moteur.'
  },

  // Domaine 2 : Échappement à Ancre Suisse & Régulation
  {
    id: 5,
    domain: 'Échappement Suisse',
    question: 'Combien de dents possède la roue d’échappement d’un calibre standard à ancre suisse ?',
    options: ['12 dents', '15 dents', '20 dents', '30 dents'],
    correct: 1,
    explanation: 'La roue d’échappement à ancre suisse comporte quasi-universellement 15 dents en forme de massue.'
  },
  {
    id: 6,
    domain: 'Échappement Suisse',
    question: 'Quelle est la fonction essentielle du dard fixé sous la fourchette de l’ancre ?',
    options: [
      'Transmettre l’impulsion au spiral',
      'Empêcher le renversement de l’ancre en venant buter contre le petit plateau',
      'Freiner le balancier en cas de choc',
      'Régler la tension du barillet'
    ],
    correct: 1,
    explanation: 'Le dard est un organe de sécurité qui empêche l’ancre de passer de l’autre côté sans la cheville de plateau.'
  },
  {
    id: 7,
    domain: 'Échappement Suisse',
    question: 'Sur un chronocomparateur, qu’indique un défaut de repère (Beat Error) de 2.0 ms ?',
    options: [
      'Le balancier tourne trop vite de 2 secondes par jour',
      'La cheville de plateau n’est pas au point mort au repos : les alternances tic et tac sont asymétriques',
      'L’huile a séché sur le contre-pivot',
      'La montre est étanche à 20 mètres'
    ],
    correct: 1,
    explanation: 'Le Beat Error mesure la dissymétrie temporelle entre l’oscillation gauche et droite du balancier.'
  },
  {
    id: 8,
    domain: 'Échappement Suisse',
    question: 'Quelle est l’amplitude idéale d’une montre de Haute Horlogerie à plat (CH/CB) à plein armage ?',
    options: ['120° à 150°', '180° à 200°', '270° à 310°', '360° à 400°'],
    correct: 2,
    explanation: 'Une montre moderne bien réglée et lubrifiée oscille entre 270° et 310°. Au-dessus de 320°, il y a rebattement.'
  },

  // Domaine 3 : Métrologie & Tolérances NIHS / ISO
  {
    id: 9,
    domain: 'Métrologie & Cotes',
    question: 'À combien de millimètres équivaut une dimension de 250 micromètres (µm) ?',
    options: ['2.5 mm', '0.25 mm', '0.025 mm', '0.0025 mm'],
    correct: 1,
    explanation: '1 mm = 1’000 µm, donc 250 µm = 0.25 mm (soit un quart de millimètre).'
  },
  {
    id: 10,
    domain: 'Métrologie & Cotes',
    question: 'Une ligne horlogère (symbole ’’’) mesure historiquement combien de millimètres ?',
    options: ['1.000 mm', '2.256 mm', '3.141 mm', '4.500 mm'],
    correct: 1,
    explanation: 'La ligne parisienne horlogère suisse équivaut à 2.255829 mm (généralement arrondie à 2.256 mm).'
  },
  {
    id: 11,
    domain: 'Métrologie & Cotes',
    question: 'Sur un plan technique horloger, que signifie la tolérance Ø 0.80 h6 pour un pivot ?',
    options: [
      'Un diamètre de 0.80 mm avec tolérance exclusivement en dessous de la cote nominale (ajustement serré)',
      'Une hauteur de 80 mm',
      'Une vis à filetage métrique 6',
      'Une pièce trempée à 600°C'
    ],
    correct: 0,
    explanation: 'La lettre minuscule h désigne un écart fondamental supérieur nul (0 / -tolérance), typique des pivots de précision.'
  },
  {
    id: 12,
    domain: 'Métrologie & Cotes',
    question: 'Quel instrument de mesure d’atelier est indispensable pour vérifier l’épaisseur d’un pivot au centième de millimètre ?',
    options: ['Un mètre ruban', 'Un micromètre à touches plates ou palmer horloger', 'Un réglet d’atelier', 'Un compte-fils'],
    correct: 1,
    explanation: 'Le palmer ou micromètre au 1/1000e (ou comparateur millimésique) permet de contrôler les diamètres de pivots.'
  },

  // Domaine 4 : Outillage & Lubrification
  {
    id: 13,
    domain: 'Outillage & Lubrification',
    question: 'Quelle huile Moebius est prescrite pour la lubrification des levées d’ancre ?',
    options: ['Moebius 9010', 'Moebius 9415 (ou 941)', 'Moebius HP-1300', 'Graisse 8200'],
    correct: 1,
    explanation: 'La Moebius 9415 est une huile thixotrope conçue expressément pour amortir et lubrifier le choc des levées d’ancre.'
  },
  {
    id: 14,
    domain: 'Outillage & Lubrification',
    question: 'Quel pique-huile identifié par son code couleur utilise-t-on pour les contre-pivots de balancier ?',
    options: ['Noir (0.06 mm - Extra Fin)', 'Bleu (0.25 mm - Moyen)', 'Vert (0.35 mm - Large)', 'Jaune (1.0 mm)'],
    correct: 0,
    explanation: 'Le pique-huile noir est le plus fin de l’assortiment, parfait pour doser la micro-goutte des antichocs Incabloc.'
  },
  {
    id: 15,
    domain: 'Outillage & Lubrification',
    question: 'Quel traitement chimique de surface applique-t-on sur les pierres d’échappement pour empêcher l’huile de s’étaler ?',
    options: ['Le zingage', 'L’épilamage (Fixodrop)', 'L’anodisation', 'Le polissage diamanté'],
    correct: 1,
    explanation: 'L’épilame réduit la tension superficielle du rubis et oblige la goutte d’huile à former un ménisque compact sans fuir.'
  },
  {
    id: 16,
    domain: 'Outillage & Lubrification',
    question: 'Pourquoi est-il crucial d’utiliser des brucelles antimagnétiques (en acier spécial ou laiton) sur l’établi ?',
    options: [
      'Pour qu’elles soient plus lourdes',
      'Pour éviter de magnétiser le spiral en acier, ce qui provoquerait une avance catastrophique de la montre',
      'Pour éviter de rayer la table en bois',
      'Pour conduire l’électricité'
    ],
    correct: 1,
    explanation: 'Un spiral magnétisé voit ses spires se coller entre elles, ce qui réduit sa longueur active et fait avancer la montre de plusieurs heures par jour.'
  },

  // Domaine 5 : Diagnostic de Pannes & Rhabillage
  {
    id: 17,
    domain: 'Diagnostic & Rhabillage',
    question: 'Une montre s’arrête subitement après un choc. L’aiguille des secondes tremble mais n’avance plus. Quel est le diagnostic le plus probable ?',
    options: [
      'Pivot de balancier brisé ou délogé de l’amortisseur de chocs',
      'La pile est vide',
      'Le cadran est trop lourd',
      'Le bracelet est trop serré'
    ],
    correct: 0,
    explanation: 'Les pivots de balancier ont un diamètre de seulement 0.07 mm : sous un choc violent, un pivot brisé bloque instantanément l’échappement.'
  },
  {
    id: 18,
    domain: 'Diagnostic & Rhabillage',
    question: 'Qu’est-ce que l’ébat de hauteur d’un mobile horloger ?',
    options: [
      'La distance entre deux dents consécutives',
      'Le jeu axial microscopique permettant au mobile de tourner librement entre la platine et le pont sans coincer',
      'La hauteur totale du boîtier',
      'La course de la tige de remontoir'
    ],
    correct: 1,
    explanation: 'L’ébat axial (généralement entre 0.01 et 0.03 mm) garantit que les pivots ne soient pas serrés entre les pierres.'
  },
  {
    id: 19,
    domain: 'Diagnostic & Rhabillage',
    question: 'Quelle est la norme suisse de précision exigée par le COSC pour les calibres mécaniques de taille courante ?',
    options: ['-10 / +15 s/jour', '-4 / +6 s/jour', '0 / +1 s/jour', '-1 / +1 s/semaine'],
    correct: 1,
    explanation: 'Le Contrôle Officiel Suisse des Chronomètres (COSC) exige une marche diurne moyenne comprise entre -4 et +6 secondes par 24h.'
  },
  {
    id: 20,
    domain: 'Diagnostic & Rhabillage',
    question: 'Pourquoi ne doit-on jamais remonter une montre mécanique en tournant la couronne comme une brute jusqu’au blocage ?',
    options: [
      'Pour ne pas casser la bride glissante ou la bonde du ressort moteur',
      'Pour ne pas abîmer le bracelet',
      'Pour ne pas réchauffer le boîtier',
      'Parce que le verre saphir pourrait se fendre'
    ],
    correct: 0,
    explanation: 'Sur une montre manuelle, forcer sur le cran de fin de remontage peut cisailler l’œillet du ressort ou casser la bonde du barillet.'
  }
];

export default function QuizCertificationPage() {
  const [candidateName, setCandidateName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [answers, setAnswers] = useState<{ [qId: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Chronomètre de l'examen
  useEffect(() => {
    let timer: any = null;
    if (isTimerRunning && timeLeft > 0 && !isExamSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsExamSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, isExamSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim()) return;
    setHasStarted(true);
    setIsTimerRunning(true);
  };

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    if (isExamSubmitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  // Calcul des résultats selon le barème officiel suisse (sur 6.0)
  const results = useMemo(() => {
    let correctCount = 0;
    const domainScores: { [domain: string]: { total: number; correct: number } } = {};

    EXAM_QUESTIONS.forEach((q) => {
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { total: 0, correct: 0 };
      }
      domainScores[q.domain].total += 1;

      if (answers[q.id] === q.correct) {
        correctCount += 1;
        domainScores[q.domain].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
    // Barème suisse : Note = 1 + (Points / Total) * 5
    const swissGrade = Number((1 + (correctCount / EXAM_QUESTIONS.length) * 5).toFixed(1));

    let mention = 'Échec (Non validé)';
    let mentionColor = 'text-rose-500';

    if (swissGrade >= 5.5) {
      mention = 'Mention Très Bien — Excellence Horlogère Suisse';
      mentionColor = 'text-amber-500';
    } else if (swissGrade >= 5.0) {
      mention = 'Mention Bien — Très Bon Niveau d’Atelier';
      mentionColor = 'text-emerald-500';
    } else if (swissGrade >= 4.0) {
      mention = 'Examen Réussi — Compétences Validées';
      mentionColor = 'text-blue-500';
    }

    return {
      correctCount,
      total: EXAM_QUESTIONS.length,
      percentage,
      swissGrade,
      mention,
      mentionColor,
      isPassed: swissGrade >= 4.0,
      domainScores
    };
  }, [answers]);

  const currentQ = EXAM_QUESTIONS[currentQuestionIndex];

  const handlePrintCertificate = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setIsExamSubmitted(false);
    setTimeLeft(25 * 60);
    setIsTimerRunning(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* --- HERO HEADER --- */}
      <section className="relative pt-12 pb-10 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l’Espace Quiz</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>🇨🇭 Certification Officielle d’Apprentissage</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Grand Examen Blanc CFC / AFP Horlogerie
              </h1>

              <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Testez vos connaissances réelles selon le barème officiel suisse (noté sur 6.0). 20 questions techniques de haut niveau couvrant la cinématique, l’échappement à ancre, la métrologie et le rhabillage d’atelier.
              </p>
            </div>

            {hasStarted && !isExamSubmitted && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white border-2 border-amber-500 shadow-xl flex items-center gap-4 flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-400 animate-pulse" />
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                    Temps Restant
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-amber-400">
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- CORPS PRINCIPAL --- */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!hasStarted ? (
          /* --- ÉCRAN D'ACCUEIL : SAISIE DU CANDIDAT --- */
          <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Prêt pour l’Épreuve Certifiante ?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Entrez votre nom et prénom. En cas de réussite (note ≥ 4.0 / 6.0), votre Attestation Officielle HorloLearn sera générée avec votre score et prête pour votre CV.
              </p>
            </div>

            <form onSubmit={handleStartExam} className="space-y-4 max-w-md mx-auto text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Nom & Prénom du Candidat :
                </label>
                <input
                  type="text"
                  required
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Ex: Mohamed Ali Mathlouthi"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-[#141a2b] border border-slate-200 dark:border-slate-600 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="font-bold text-slate-800 dark:text-slate-200">Conditions d’examen :</div>
                <div>⏱️ Durée : 25 minutes chrono</div>
                <div>📊 Évaluation : 20 questions réparties sur 5 domaines techniques</div>
                <div>🇨🇭 Seuil de réussite suisse : Note 4.0 / 6.0 (50% de bonnes réponses)</div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Démarrer l’Examen Horloger</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : !isExamSubmitted ? (
          /* --- DÉROULEMENT DE L'EXAMEN --- */
          <div className="space-y-6">
            {/* Barre de progression */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 flex items-center justify-between gap-4 text-xs">
              <span className="font-bold text-amber-500">
                Question {currentQuestionIndex + 1} sur {EXAM_QUESTIONS.length}
              </span>

              <div className="w-1/2 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / EXAM_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>

              <span className="font-semibold text-slate-400">
                {Object.keys(answers).length} répondues
              </span>
            </div>

            {/* Carte Question Active */}
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
                  {currentQ.domain}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Candidat : {candidateName}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                      className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between text-sm sm:text-base ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500/15 text-slate-950 dark:text-white font-bold shadow-md'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#141a2b] text-slate-700 dark:text-slate-300 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-400'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation questions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700/80">
                <button
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40"
                >
                  ← Précédente
                </button>

                {currentQuestionIndex < EXAM_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow transition-all"
                  >
                    Suivante →
                  </button>
                ) : (
                  <button
                    onClick={() => setIsExamSubmitted(true)}
                    className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
                  >
                    Valider et Terminer l’Examen ✓
                  </button>
                )}
              </div>
            </div>

            {/* Sélecteur direct de toutes les questions */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 flex flex-wrap gap-2 items-center justify-center">
              {EXAM_QUESTIONS.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                      isCurrent
                        ? 'ring-2 ring-amber-500 bg-amber-500 text-slate-950 shadow'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* --- RÉSULTATS & ATTESTATION OFFICIELLE HORLOLEARN --- */
          <div className="space-y-10">
            {/* Bannière de Résultat */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-xl text-center space-y-4">
              <span className={`text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full ${
                results.isPassed ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-600 border border-rose-500/30'
              }`}>
                {results.isPassed ? 'Examen Réussi avec Succès' : 'Seuil de Réussite Non Atteint'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Note Officielle : <span className={results.mentionColor}>{results.swissGrade} / 6.0</span>
              </h2>

              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {results.mention} • {results.correctCount} réponses exactes sur {results.total} ({results.percentage}%)
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={handlePrintCertificate}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimer / Télécharger l’Attestation PDF</span>
                </button>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-slate-700 hover:border-amber-500"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Repasser l’Épreuve</span>
                </button>
              </div>
            </div>

            {/* --- LE DIPLÔME OFFICIEL HORLOLEARN (IMPRIMABLE) --- */}
            <div
              id="certificate"
              className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50 text-slate-950 border-4 border-amber-500 shadow-2xl relative overflow-hidden"
            >
              {/* Filigrane armoiries horlogères */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Award className="w-[500px] h-[500px]" />
              </div>

              <div className="text-center space-y-6 relative z-10">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700">
                  <span>🇨🇭</span>
                  <span>Haute Horlogerie Suisse • Convention Patronale</span>
                  <span>🇨🇭</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 font-serif">
                    Attestation d’Excellence Horlogère
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 uppercase tracking-widest">
                    Certificat de Maîtrise Théorique & Pratique d’Atelier
                  </p>
                </div>

                <p className="text-sm italic text-slate-600">
                  Il est certifié par la présente que l’apprenant(e) :
                </p>

                <div className="text-3xl sm:text-4xl font-extrabold text-amber-900 font-serif border-b-2 border-amber-300 pb-2 inline-block px-8">
                  {candidateName}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed">
                  a satisfait avec succès aux exigences de l’examen blanc officiel portant sur les 5 piliers de la profession horlogère (cinématique des rouages, échappement suisse, métrologie, lubrification Moebius et diagnostic de pannes).
                </p>

                {/* Score & Mention */}
                <div className="p-4 rounded-2xl bg-amber-100/60 border border-amber-300 inline-block px-8 space-y-1">
                  <div className="text-xs uppercase font-bold text-amber-800">
                    Note Fédérale Obtenue
                  </div>
                  <div className="text-3xl font-extrabold text-slate-950 font-mono">
                    {results.swissGrade} / 6.0
                  </div>
                  <div className="text-xs font-bold text-amber-900">{results.mention}</div>
                </div>

                {/* Signatures */}
                <div className="pt-8 grid grid-cols-2 gap-8 text-left text-xs border-t border-amber-200">
                  <div>
                    <div className="font-bold text-slate-900">Délivré à Genève, Suisse</div>
                    <div className="text-slate-500">Date : {new Date().toLocaleDateString('fr-CH')}</div>
                    <div className="font-mono text-[10px] text-slate-400 mt-1">ID Validation : HL-CFC-{Date.now().toString().slice(-8)}</div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-bold text-slate-900">HorloLearn Genève</div>
                    <div className="text-xs italic text-amber-800 font-serif">Direction Pédagogique</div>
                    <div className="text-[10px] text-slate-400">Plateforme de Référence AFP / CFC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bilan par Domaine de Compétence */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Détail de vos Compétences par Branche :
              </h3>

              <div className="space-y-3">
                {Object.entries(results.domainScores).map(([dom, sc]) => {
                  const pct = Math.round((sc.correct / sc.total) * 100);
                  return (
                    <div key={dom} className="space-y-1">
                      <div className="flex justify-between text-xs font-bold">
                        <span>{dom}</span>
                        <span>{sc.correct} / {sc.total} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full ${pct >= 75 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corrigé Détaillé */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f1422] border-2 border-slate-200 dark:border-slate-600 shadow-md space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Corrigé Analytique Complet (20 Questions) :
              </h3>

              <div className="space-y-4">
                {EXAM_QUESTIONS.map((q) => {
                  const userAnswer = answers[q.id];
                  const isCorrect = userAnswer === q.correct;

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm space-y-2 ${
                        isCorrect
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-rose-500/40 bg-rose-500/5'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Q{q.id}. {q.question}
                        </span>
                        <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                        }`}>
                          {isCorrect ? '✓ Exact' : '✗ Erreur'}
                        </span>
                      </div>

                      <div className="text-slate-600 dark:text-slate-300">
                        <strong>Votre réponse : </strong>
                        <span className={isCorrect ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'}>
                          {userAnswer !== undefined ? q.options[userAnswer] : 'Non répondu'}
                        </span>
                      </div>

                      {!isCorrect && (
                        <div className="text-emerald-600 dark:text-emerald-400">
                          <strong>Bonne réponse : </strong> {q.options[q.correct]}
                        </div>
                      )}

                      <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-200 dark:border-slate-700/60">
                        💡 Explication : {q.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
