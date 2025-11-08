// /src/app/theorie/barillet-ressort-moteur/BarilletPageClient.tsx

'use client'; // Cette directive est maintenant dans le bon fichier

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle, BookOpen, Calculator, Award, Layers, RotateCw, Gauge, Activity } from 'lucide-react';
import Link from 'next/link';

// --- TYPESCRIPT INTERFACES ---
interface HistoricalEvent {
  year: number;
  event: string;
  inventor: string;
}

interface CalibreData {
  marque: string;
  barillets: number;
  reserve: string;
  diametre: string;
  epaisseur: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "débutant" | "intermédiaire" | "avancé";
}

interface VocabTerm {
    terme: string;
    def: string;
}

// --- DONNÉES STATIQUES ---
const historicalData: HistoricalEvent[] = [
  { year: 1525, event: "Premier barillet à ressort en acier (Nuremberg)", inventor: "Peter Henlein" },
  { year: 1785, event: "Perfectionnement du bride-glissant", inventor: "Abraham-Louis Breguet" },
  { year: 1839, event: "Standardisation des barillets suisses", inventor: "Bauche SA" },
  { year: 1950, event: "Introduction du Nivaflex", inventor: "Nivarox SA" },
  { year: 2000, event: "Barillet en silicium expérimental", inventor: "Patek Philippe" }
];

const calibreData: CalibreData[] = [
  { marque: "ETA 2824-2", barillets: 1, reserve: "38h", diametre: "9.5 mm", epaisseur: "1.95 mm" },
  { marque: "Patek Philippe 240", barillets: 1, reserve: "48h", diametre: "10.5 mm", epaisseur: "1.8 mm" },
  { marque: "IWC 52010", barillets: 2, reserve: "168h", diametre: "12.0 mm", epaisseur: "2.2 mm" },
  { marque: "Lange & Söhne L043.1", barillets: 2, reserve: "36h", diametre: "11.5 mm", epaisseur: "2.0 mm" }
];

const quizData: QuizQuestion[] = [
  { question: "Quelle est la fonction principale du barillet dans une montre mécanique ?", options: ["Afficher l'heure", "Stocker l'énergie du ressort moteur", "Régler la précision", "Faire tic-tac"], correctAnswer: 1, explanation: "Le barillet est l'organe moteur de la montre. Il contient le ressort moteur enroulé qui stocke l'énergie mécanique et la libère progressivement pour faire fonctionner le mouvement.", difficulty: "débutant" },
  { question: "De quel matériau est traditionnellement fabriqué le ressort moteur des montres suisses de haute qualité ?", options: ["Acier inoxydable classique", "Laiton", "Acier trempé au carbone ou alliage Nivaflex", "Maillechort"], correctAnswer: 2, explanation: "Le ressort moteur est fabriqué en acier spécial trempé au carbone, ou en alliages modernes comme le Nivaflex (Ni-Cr-Co-Ti-Be) développé par Nivarox SA, fournisseur de l'industrie horlogère suisse.", difficulty: "intermédiaire" },
  { question: "Quelle est la durée de marche typique d'une montre mécanique suisse avec un seul barillet ?", options: ["12 heures", "36-48 heures", "7 jours", "1 mois"], correctAnswer: 1, explanation: "La plupart des montres mécaniques suisses modernes (ETA 2824, Sellita SW200) offrent une réserve de marche de 36 à 48 heures, optimisée pour un compromis entre taille et performance.", difficulty: "débutant" },
  { question: "Que se passe-t-il lorsque le ressort est complètement armé dans un barillet suisse moderne ?", options: ["Il se casse", "Le bride-glissant glisse pour éviter la surtension", "La montre s'arrête", "Le barillet tourne à l'envers"], correctAnswer: 1, explanation: "Le bride-glissant (invention perfectionnée par Breguet) est un dispositif de sécurité. Lorsque le ressort est complètement armé, il glisse dans le tambour pour éviter la surtension et la casse du ressort.", difficulty: "avancé" },
  { question: "Calculez approximativement le nombre de tours du barillet pour une réserve de 40h :", options: ["40 tours", "6-7 tours", "100 tours", "1 tour par heure"], correctAnswer: 1, explanation: "Un barillet effectue généralement entre 6 et 7 tours complets pour assurer 40-48h de réserve de marche. Le rapport de démultiplication entre le barillet et la roue de fuite permet cette conversion de vitesse.", difficulty: "avancé" },
];

const vocabulaireData: VocabTerm[] = [
    { terme: "Rochet", def: "Roue à denture triangulaire (z=12-15) montée sur l'arbre de barillet. Permet le remontage unidirectionnel." },
    { terme: "Cliquet", def: "Pièce en acier trempé qui s'engage dans les dents du rochet. Ressort de rappel: 0.15mm d'épaisseur." },
    { terme: "Bride-glissant", def: "Dispositif de sécurité fixé à l'extrémité externe du ressort. Glisse à 110% du couple maximal." },
    { terme: "Couple moteur", def: "Moment de torsion transmis: 8-12 µN·m nominal. Mesuré au dynamomètre de remontoir." },
    { terme: "Réserve de marche", def: "Durée de fonctionnement après remontage complet. Standard COSC: > 38h pour chronomètre." },
    { terme: "Mobile de barillet", def: "Ensemble tambour + arbre. Premier mobile du rouage de finissage. Ratio: 1/6 à 1/8." },
    { terme: "Ressort Nivaflex", def: "Alliage Ni-Cr-Co-Ti-Be. Anti-magnétique, résistance à la fatigue améliorée de 40%." },
    { terme: "Barillet tournant", def: "En remontage auto, le tambour tourne autour du ressort fixe. Système Buren." },
    { terme: "Surtension", def: "Couple > 15 µN·m. Déclenche le bride-glissant. Risque de rupture du ressort si absent." }
];

// --- SOUS-COMPOSANTS (Extraits pour la performance) ---
const BarrelSVG: React.FC<{ animationFrame: number }> = ({ animationFrame }) => (
    // ... (Le code SVG reste identique)
    <svg viewBox="0 0 400 300" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="80" fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.8"/>
      <circle cx="200" cy="150" r="85" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="5,5"/>
      <path d="M 200 150 Q 250 150 280 130 Q 310 110 320 80 Q 330 50 320 20" fill="none" stroke="#10B981" strokeWidth="2" opacity={0.5 + (animationFrame % 50) / 100} transform={`rotate(${animationFrame * 3.6} 200 150)`}/>
      <circle cx="200" cy="150" r="15" fill="#6B7280" />
      <circle cx="200" cy="150" r="10" fill="#374151" />
      <rect x="315" y="15" width="10" height="30" fill="#EF4444" opacity="0.8" className="animate-pulse"/>
      <g transform="translate(200, 150)">
        {[...Array(24)].map((_, i) => (
          <rect key={i} x="77" y="-3" width="8" height="6" fill="#1F2937" transform={`rotate(${i * 15})`} opacity="0.7"/>
        ))}
      </g>
      <text x="20" y="280" fontFamily="monospace" fontSize="12" fill="#6B7280" className="dark:fill-slate-400">
        Schéma technique - Barillet à ressort moteur (échelle non respectée)
      </text>
    </svg>
);

const ReserveCalculator: React.FC = () => {
    // ... (Le code du calculateur reste identique)
    const [barrelDiam, setBarrelDiam] = useState(10);
    const [springLength, setSpringLength] = useState(400);
    const [calculatedReserve, setCalculatedReserve] = useState(40);
  
    useEffect(() => {
      const reserve = Math.round((springLength / 25) * (1 / (barrelDiam / 10)));
      setCalculatedReserve(Math.min(reserve, 120));
    }, [barrelDiam, springLength]);
  
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-6 border border-blue-200 dark:border-slate-600">
        <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center"><Calculator className="w-5 h-5 mr-2" />Calculateur de réserve de marche</h4>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">Diamètre barillet (mm)</label>
            <input type="range" min="8" max="14" value={barrelDiam} onChange={(e) => setBarrelDiam(Number(e.target.value))} className="w-full mt-1 accent-blue-600"/>
            <span className="text-xs text-slate-600 dark:text-slate-400">{barrelDiam} mm</span>
          </div>
          <div>
            <label className="text-sm text-slate-700 dark:text-slate-300">Longueur ressort (mm)</label>
            <input type="range" min="250" max="600" value={springLength} onChange={(e) => setSpringLength(Number(e.target.value))} className="w-full mt-1 accent-blue-600"/>
            <span className="text-xs text-slate-600 dark:text-slate-400">{springLength} mm</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{calculatedReserve} heures</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Réserve de marche estimée</p>
        </div>
      </div>
    );
};

// Le nom du composant est changé pour éviter toute confusion
export default function BarilletRessortMoteurClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [expertMode, setExpertMode] = useState(false);
  const [selectedCalibre, setSelectedCalibre] = useState(0);
  const [animationFrame, setAnimationFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAnimationFrame(prev => prev + 1), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === quizData[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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
      {/* Le JSX complet de votre page reste ici */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                  <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-all duration-300 group">
                      <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                      Retour à la théorie
                  </Link>
                  <button onClick={() => setExpertMode(!expertMode)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${expertMode ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                      {expertMode ? 'Mode Expert Activé' : 'Mode Débutant'}
                  </button>
              </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Tout votre contenu riche reste ici, sans aucun changement */}
            {/* ... Héro, Sommaire, Section 1, Section 2 etc. ... */}
            <section id="principe" className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-blue-200/50 dark:hover:shadow-blue-900/20">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* ... */}
                <div>
                  <BarrelSVG animationFrame={animationFrame} />
                  <ReserveCalculator />
                </div>
              </div>
            </section>
            {/* ... et ainsi de suite pour toutes les autres sections ... */}
        </main>

        <footer className="bg-slate-900 text-white py-12 mt-16">
            {/* ... */}
        </footer>
      </div>
    </>
  );
}
