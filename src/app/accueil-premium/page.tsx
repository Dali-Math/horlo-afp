'use client';

import React, { useState, useEffect, FC, ReactNode } from 'react';
import { ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle, BookOpen, Calculator, Award, Layers, RotateCw, Gauge, Activity, Scale } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// --- TYPESCRIPT INTERFACES POUR LA ROBUSTESSE ---
interface HistoricalEvent { year: number; event: string; inventor: string; }
interface CalibreData { marque: string; barillets: number; reserve: string; architecture: 'Simple' | 'Série' | 'Parallèle' | 'Géant'; }
interface QuizQuestion { question: string; options: string[]; correctAnswer: number; explanation: string; difficulty: "Fondamental" | "Avancé" | "Expert"; }
interface VocabTerm { terme: string; def: string; }
interface SectionProps { id: string; title: string; subtitle: string; icon: ReactNode; children: ReactNode; }

// --- DONNÉES CENTRALISÉES POUR LA CLARTÉ ---
const historicalData: HistoricalEvent[] = [
  { year: 1525, event: "Invention du ressort moteur en acier", inventor: "Peter Henlein (Nuremberg)" },
  { year: 1785, event: "Perfectionnement de la bride-glissante", inventor: "Abraham-Louis Breguet" },
  { year: 1951, event: "Brevet de l'alliage Nivaflex®", inventor: "Dr. Straumann (Nivarox SA)" },
  { year: 2001, event: "Premiers ressorts en silicium (Silinvar®)", inventor: "Patek Philippe, Swatch Group, Rolex" },
  { year: 2017, event: "Concept de barillet à géométrie variable", inventor: "Zenith Defy Lab" }
];

const calibreData: CalibreData[] = [
  { marque: "ETA 2824-2", barillets: 1, reserve: "38h-42h", architecture: 'Simple' },
  { marque: "Panerai P.2002", barillets: 2, reserve: "192h (8 jours)", architecture: 'Série' },
  { marque: "A. Lange & Söhne L001.1", barillets: 2, reserve: "72h", architecture: 'Parallèle' },
  { marque: "Chopard 01.01-C", barillets: 1, reserve: "60h", architecture: 'Géant' }
];

const quizData: QuizQuestion[] = [
  { question: "Quelle est la fonction première du barillet ?", options: ["Régler la précision", "Stocker et délivrer l'énergie", "Protéger le mouvement", "Remonter la montre"], correctAnswer: 1, explanation: "Le barillet est l'accumulateur d'énergie. Il stocke l'énergie potentielle du ressort moteur et la distribue de manière contrôlée au rouage.", difficulty: "Fondamental" },
  { question: "Quel est l'impact principal d'un couple moteur non-constant sur la montre ?", options: ["Usure prématurée", "Baisse de la réserve de marche", "Perturbation de l'isochronisme", "Bruit accru du mouvement"], correctAnswer: 2, explanation: "L'isochronisme est la régularité des oscillations du balancier. Un couple variable modifie l'amplitude de ces oscillations, affectant directement la précision de la montre.", difficulty: "Avancé" },
  { question: "Dans une configuration à double barillet en parallèle, quel est l'objectif principal ?", options: ["Doubler la réserve de marche", "Augmenter le couple pour les complications", "Réduire l'épaisseur du mouvement", "Simplifier le remontage"], correctAnswer: 1, explanation: "Le montage en parallèle fournit la force combinée des deux ressorts au rouage, augmentant ainsi le couple. C'est idéal pour les chronographes ou les sonneries, qui sont très énergivores.", difficulty: "Expert" },
  { question: "De quel alliage le Nivaflex® est-il principalement composé ?", options: ["Acier, Carbone, Silicium", "Nickel, Chrome, Cobalt, Béryllium", "Titane, Niobium, Zirconium", "Platine et Iridium"], correctAnswer: 1, explanation: "Le Nivaflex® est un alliage complexe (Ni-Cr-Co-Be-Ti) conçu pour être antimagnétique, inoxydable et extrêmement résistant à la fatigue, garantissant un couple stable sur des millions de cycles.", difficulty: "Expert" }
];

const vocabulaireData: VocabTerm[] = [
    { terme: "Rochet", def: "Roue à denture asymétrique qui, avec le cliquet, permet l'armage du ressort dans un seul sens." },
    { terme: "Cliquet", def: "Levier qui s'engage dans le rochet pour l'empêcher de tourner en sens inverse sous la force du ressort." },
    { terme: "Bride-glissante", def: "Lame-ressort à l'extrémité du ressort moteur qui patine contre la paroi du tambour pour éviter la surtension en remontage automatique." },
    { terme: "Couple Moteur", def: "Force de rotation (moment) délivrée par le barillet. Exprimé en micronewton-mètres (µN·m)." },
    { terme: "Isochronisme", def: "Propriété de l'oscillateur (balancier-spiral) à maintenir la même fréquence quelle que soit son amplitude d'oscillation." },
    { terme: "Nivaflex®", def: "Alliage métallique breveté, devenu le standard de l'industrie pour les ressorts moteurs de haute performance." }
];

// --- SOUS-COMPOSANTS INTERNES POUR LA LISIBILITÉ ---
const Section: FC<SectionProps> = ({ id, title, subtitle, icon, children }) => (
  <section id={id} className="mb-16">
    <div className="flex items-center mb-8">
      <div className="w-16 h-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
        {icon}
      </div>
      <div>
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">{subtitle}</p>
      </div>
    </div>
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
      {children}
    </div>
  </section>
);

// --- COMPOSANT PRINCIPAL DE LA PAGE ---
export default function BarilletRessortMoteur() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quizData[currentQuestion].correctAnswer) setScore(s => s + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(q => q + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };
  
  return (
    <>
      <Head>
        <title>Le Barillet & Ressort Moteur - La Référence Absolue de l'Horlogerie Suisse</title>
        <meta name="description" content="L'encyclopédie technique et historique définitive sur le barillet et le ressort moteur. Explorez la physique, les matériaux, les architectures et les innovations qui animent les montres mécaniques suisses." />
        <meta name="keywords" content="barillet, ressort moteur, horlogerie suisse, isochronisme, Nivaflex, réserve de marche, couple moteur, calibre, montre mécanique" />
        <meta property="og:title" content="Le Barillet & Ressort Moteur - La Référence Absolue" />
        <meta property="og:description" content="Plongez au cœur de la 'batterie mécanique' des montres suisses." />
        <meta property="og:type" content="article" />
      </Head>

      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-700 z-50">
        <div className="h-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group font-semibold">
              <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
              Retour à la Théorie
            </Link>
            <span className="font-mono text-xs text-slate-500">Version 2.0 | Nov. 2025</span>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-20">
            <p className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">Organe Moteur</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
              Le Barillet & Ressort Moteur
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              L'encyclopédie définitive sur le cœur énergétique de la montre mécanique suisse : le supercondensateur de la micromécanique.
            </p>
          </div>

          <Section id="principe" title="Principe et Fonction" subtitle="La batterie mécanique de la montre" icon={<Battery className="w-8 h-8 text-blue-600" />}>
            <p className="text-lg mb-6">
              Le <strong>barillet</strong> est un conteneur cylindrique, généralement en laiton, qui abrite le <strong>ressort moteur</strong>. Son rôle est double et fondamental :
            </p>
            <ul className="list-disc list-inside space-y-4 text-lg mb-8">
              <li><strong>Stocker l'énergie :</strong> Lors du remontage, le ressort moteur, une longue lame d'un alliage spécial, s'enroule autour de l'arbre de barillet, accumulant de l'énergie potentielle élastique (E = ½kx²).</li>
              <li><strong>Délivrer l'énergie :</strong> Le ressort se détend ensuite de manière lente et contrôlée, faisant tourner le tambour du barillet. La denture extérieure de ce tambour engrène avec le premier mobile du rouage, transmettant ainsi sa force pour animer l'ensemble du mouvement.</li>
            </ul>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 border-l-4 border-blue-500">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Moments Clés de son Évolution</h4>
              <div className="space-y-3">
                {historicalData.map(item => (
                  <div key={item.year} className="flex items-center text-sm">
                    <span className="font-bold text-blue-600 dark:text-blue-400 w-16">{item.year}</span>
                    <span className="text-slate-700 dark:text-slate-300">{item.event} <em className="text-slate-500">({item.inventor})</em></span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section id="isochronisme" title="Le Défi du Couple et de l'Isochronisme" subtitle="La quête de la force constante" icon={<Scale className="w-8 h-8 text-green-600" />}>
            <p className="text-lg mb-4">
              Le défi majeur d'un ressort est qu'il ne délivre pas une force constante : le <strong>couple moteur</strong> est élevé quand il est armé, et faible quand il est désarmé. Cette variation a un impact direct sur la précision.
            </p>
            <p className="text-lg mb-6">
              Elle perturbe l'<strong>isochronisme</strong>, c'est-à-dire la capacité du balancier à osciller à la même fréquence quelle que soit son amplitude. Un couple élevé augmente l'amplitude (avance), un couple faible la diminue (retard). Toute l'ingénierie moderne du barillet vise à "aplatir" cette courbe de couple.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 text-center">
               <h4 className="font-bold text-slate-900 dark:text-white mb-4">Courbe de décharge du couple</h4>
               <div className="h-48 w-full bg-slate-200 dark:bg-slate-700 rounded-lg flex items-end p-2">
                  {/* Visualisation simplifiée de la courbe */}
                  <div className="w-full h-full flex items-end" style={{background: 'linear-gradient(to right, rgba(34,197,94,0.2), rgba(239,68,68,0.2))'}}>
                    <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path d="M 0 5 C 20 5, 80 25, 100 45" stroke="#10B981" fill="none" strokeWidth="1" />
                    </svg>
                  </div>
               </div>
               <div className="flex justify-between text-xs mt-2 text-slate-500">
                  <span>Armage complet (couple max)</span>
                  <span>Fin de réserve (couple min)</span>
               </div>
            </div>
          </Section>

          <Section id="architectures" title="Architectures et Innovations" subtitle="Solutions pour la performance et l'autonomie" icon={<Layers className="w-8 h-8 text-purple-600" />}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold mb-2">1. Double Barillet en Série</h4>
                  <p className="text-sm">Le premier barillet alimente le second, qui alimente le rouage. <br/><b>Objectif :</b> Additionner les réserves de marche pour une autonomie extrême (7, 8, voire 10 jours).</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold mb-2">2. Double Barillet en Parallèle</h4>
                  <p className="text-sm">Les deux barillets délivrent leur force simultanément au rouage. <br/><b>Objectif :</b> Augmenter le couple disponible pour alimenter des complications énergivores (chronographe, sonnerie).</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold mb-2">3. Barillet "Géant" ou Superposé</h4>
                  <p className="text-sm">Utiliser un seul barillet de grand diamètre ou empiler deux ressorts plus fins dans un même tambour (technologie Chopard Twin®). <br/><b>Objectif :</b> Grande réserve de marche avec un couple plus stable.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/70 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold mb-2">4. Matériaux Avancés</h4>
                  <p className="text-sm">Utilisation d'alliages comme le Nivaflex® (antimagnétique, résistant à la fatigue) ou le silicium (léger, insensible à la température) pour des ressorts plus performants et durables.</p>
                </div>
              </div>
          </Section>

          <Section id="vocabulaire" title="Vocabulaire Technique Essentiel" subtitle="Le glossaire de l'horloger" icon={<BookOpen className="w-8 h-8 text-amber-600" />}>
             <div className="grid md:grid-cols-2 gap-6">
                {vocabulaireData.map(item => (
                  <div key={item.terme} className="bg-slate-50 dark:bg-slate-800/70 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-600 dark:text-blue-400">{item.terme}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{item.def}</p>
                  </div>
                ))}
             </div>
          </Section>
          
          <Section id="quiz" title="Quiz d'Expert" subtitle="Testez vos connaissances de la théorie" icon={<Award className="w-8 h-8 text-indigo-600" />}>
            {!quizCompleted ? (
              <>
                <div className="mb-6 text-center">
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200">{quizData[currentQuestion].difficulty}</span>
                </div>
                <h3 className="text-2xl font-bold text-center mb-8">{quizData[currentQuestion].question}</h3>
                <div className="space-y-4 max-w-lg mx-auto">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <button
                      key={index} onClick={() => handleAnswerClick(index)} disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all text-lg ${
                        selectedAnswer === null ? 'border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        : index === quizData[currentQuestion].correctAnswer ? 'border-green-500 bg-green-50 dark:bg-green-900/30 font-semibold'
                        : selectedAnswer === index ? 'border-red-500 bg-red-50 dark:bg-red-900/30'
                        : 'border-slate-300 dark:border-slate-700 opacity-50'
                      }`}
                    >
                      <span>{option}</span>
                    </button>
                  ))}
                </div>
                {selectedAnswer !== null && (
                  <div className="mt-8 max-w-lg mx-auto text-center">
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg mb-4">
                      <p>{quizData[currentQuestion].explanation}</p>
                    </div>
                    <button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full">
                      {currentQuestion < quizData.length - 1 ? 'Question Suivante' : 'Voir les Résultats'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Quiz Terminé !</h3>
                <p className="text-xl mb-6">Votre score : {score} / {quizData.length} ({Math.round((score / quizData.length) * 100)}%)</p>
                <button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">Recommencer</button>
              </div>
            )}
          </Section>
        </main>

        <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-slate-500">
                <p className="font-bold text-slate-700 dark:text-slate-300 mb-2">HorloLearn - La Référence Horlogère Suisse</p>
                <p>© 2025. Contenu vérifié par des horlogers certifiés. Tous droits réservés.</p>
            </div>
        </footer>
      </div>
    </>
  );
}
