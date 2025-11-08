'use client';

import React, { useState, useEffect, FC, ReactNode } from 'react'; // <--- CORRECTION APPLIQUÉE ICI
import {
  ChevronLeft, Activity, Zap, Clock, Settings2, Share2, Printer, Download,
  Microscope, Gauge, BookOpen, Award, Info, Play, Pause, RotateCw, SlidersHorizontal,
  CheckCircle, XCircle, Battery, Layers, Scale
} from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// =================================================
// TYPES ET CONFIGURATION
// =================================================

const TRANSLATIONS = {
  fr: {
    back: 'Retour à la théorie',
    expertModeOn: 'Mode Expert ON',
    expertModeOff: 'Mode Expert OFF',
    title: "Le Barillet et Ressort Moteur",
    subtitle: "La centrale énergétique de la montre : explorez comment l'énergie est stockée et délivrée avec une précision micromécanique.",
    toc: 'Table des matières',
    share: 'Partager',
    print: 'Imprimer',
    download: 'Télécharger',
    metadata: {
      category: 'Organe Moteur',
      readingTime: '10 min',
      difficulty: 'Fondamental',
      lastUpdated: '2025-11',
      standard: 'NIHS 02-02'
    },
    principe: {
      title: 'Principe et Fonction',
      beginner: "Le barillet est la 'batterie' de la montre. Il stocke l'énergie dans un ressort enroulé et la libère lentement pour faire fonctionner tout le mécanisme.",
      expert: "Le barillet est un accumulateur d'énergie potentielle élastique (E = ½kx²). Il convertit une énergie de remontage manuelle ou cinétique en un couple moteur quasi-constant, avec un rendement de 85-92%.",
      function1: { title: 'Stockage', desc: 'Accumule l\'énergie potentielle dans un ressort moteur.' },
      function2: { title: 'Distribution', desc: 'Délivre un couple moteur au rouage de finissage.' },
      funFact: {
        title: 'L\'Énergie d\'une Montre',
        desc: 'Un remontage complet stocke environ 1 milliardième de kWh. Assez pour faire fonctionner la montre pendant 40h, mais pas assez pour allumer une LED une seule seconde !',
        metrics: ['≈ 10⁻⁹ kWh', '40-80h Réserve', '≈ 0.2 µW', '85% Rendement']
      }
    },
    anatomie: {
      title: 'Anatomie du Barillet',
      beginner: 'Quatre composants essentiels travaillent de concert pour stocker et délivrer l\'énergie.',
      expert: 'Ensemble de 4 pièces maîtresses. Le couple est transmis par la denture du tambour (module 0.12-0.16) au pignon de centre. Les matériaux sont cruciaux pour la performance (laiton, acier 20AP, Nivaflex®).',
      tambour: {
        title: 'Le Tambour',
        beginner: 'Un cylindre creux qui contient le ressort et possède une denture extérieure.',
        expert: 'Laiton CuZn39Pb3 pour son usinabilité et ses propriétés de frottement. La denture (z=80-120) est taillée avec une tolérance de ±5μm.',
        specs: ['z=80-120', 'Laiton', 'Ø 8-12mm']
      },
      arbre: {
        title: 'L\'Arbre de Barillet',
        beginner: 'L\'axe central sur lequel le ressort s\'enroule lors du remontage.',
        expert: 'Acier 20AP trempé (60-64 HRC). Le crochet doit résister à un couple de rupture de >20 µN·m. Poli pour réduire les frottements.',
        specs: ['Acier 20AP', '62 HRC', '>20µN·m Rup.']
      },
      ressort: {
        title: 'Le Ressort Moteur',
        beginner: 'La longue lame enroulée qui est le véritable réservoir d\'énergie.',
        expert: 'Alliage Nivaflex® (Ni-Cr-Co-Be-Ti) pour ses propriétés amagnétiques, sa résistance à la fatigue et son couple stable. La forme en "S" de l\'extrémité optimise la courbe de couple.',
        specs: ['Nivaflex®', '300-600mm L.', 'Forme en S']
      }
    },
    couple: {
      title: 'Le Couple Moteur',
      beginner: 'Le défi est de fournir une force constante du début à la fin de la réserve de marche pour garantir la précision.',
      expert: 'La courbe de décharge du couple est non-linéaire. L\'objectif est d\'utiliser la partie la plus plate de la courbe (généralement entre 25% et 90% de l\'armage) pour minimiser l\'impact sur l\'isochronisme du balancier.',
      phases: [
        { name: 'Armage Max', desc: 'Couple élevé, risque de "sur-bancage" (amplitude > 330°).', expert: 'Couple initial de 12-15 µN·m. La bride-glissante entre en jeu.' },
        { name: 'Plateau de travail', desc: 'Zone de couple stable où la montre est la plus précise.', expert: 'Couple nominal de 8-12 µN·m avec une variation < 15% sur 24h.' },
        { name: 'Fin de Réserve', desc: 'Le couple chute, l\'amplitude baisse, la montre a tendance à retarder.', expert: 'Couple final < 6 µN·m. L\'amplitude chute sous 200°, affectant la précision.' },
      ],
      data: {
        title: '⚡ Données chiffrées',
        items: ['Couple: 8-12 µN·m', 'Amplitude: 270-320°', 'Perte / 24h: <20%', 'Rendement: 85-92%']
      }
    },
    architectures: {
      title: 'Architectures et Innovations',
      beginner: 'Pour augmenter l\'autonomie ou la puissance, les horlogers utilisent différentes configurations de barillets.',
      expert: 'L\'architecture des barillets est un choix stratégique : en série pour augmenter la durée (L_total = L1+L2), en parallèle pour augmenter le couple (C_total = C1+C2).',
      types: [
        { name: 'Barillet Simple', reserve: 40, couple: 60, cost: 20, description: "Le standard de l'industrie, excellent compromis." },
        { name: 'Double Barillet (Série)', reserve: 95, couple: 65, cost: 60, description: "Maximise la réserve de marche pour les montres à grande autonomie." },
        { name: 'Double Barillet (Parallèle)', reserve: 45, couple: 90, cost: 70, description: "Fournit un couple élevé pour les complications énergivores." },
        { name: 'Barillet Géant', reserve: 70, couple: 70, cost: 50, description: "Un seul grand barillet pour une réserve accrue et un couple stable." }
      ]
    },
    quiz: {
      title: 'Quiz : Testez vos connaissances',
      questions: [
        {
          question: "Quelle est la fonction de la bride-glissante ?",
          options: ["Lubrifier le ressort", "Empêcher la surtension lors du remontage automatique", "Augmenter le couple", "Guider le ressort"],
          correct: 1,
          explanation: {
            beginner: "Elle permet au ressort de 'patiner' lorsque la montre est complètement remontée, évitant ainsi de le casser.",
            expert: "C'est un frein à friction calibré qui glisse contre la paroi du tambour lorsque le couple dépasse un seuil de sécurité (typiquement 15 µN·m)."
          }
        },
        {
          question: "Un montage de deux barillets en SÉRIE a pour principal effet :",
          options: ["D'augmenter le couple", "De réduire la taille", "D'augmenter la réserve de marche", "De simplifier le mécanisme"],
          correct: 2,
          explanation: {
            beginner: "En série, les durées s'additionnent. C'est la technique utilisée pour obtenir des réserves de marche de 8 jours ou plus.",
            expert: "L'énergie potentielle totale est la somme des énergies de chaque barillet (E_tot = E1+E2), doublant de facto la réserve de marche pour un même couple de sortie."
          }
        },
      ]
    }
  }
};

// =================================================
// COMPOSANTS RÉUTILISABLES
// =================================================
const SectionCard: FC<{ title: string; icon: React.ElementType; children: ReactNode }> = ({ title, icon: Icon, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8 mb-6 transition-transform hover:scale-[1.01]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          {Icon && <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
          {title}
        </h2>
        <Info className="w-5 h-5 text-slate-500" />
      </div>
      {children}
    </div>
);

const MetricCard: FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-white/60 dark:bg-slate-900/50 p-3 rounded-lg text-center transition-transform hover:scale-105">
      <div className="font-mono font-bold text-purple-600 dark:text-purple-400 text-lg">{value}</div>
      <div className="text-slate-600 dark:text-slate-400 text-xs mt-1">{label}</div>
    </div>
);

// =================================================
// COMPOSANTS SPÉCIFIQUES ET INTERACTIFS
// =================================================

function BarrelSimulator2D() {
  const [isRunning, setIsRunning] = useState(true);
  const [windLevel, setWindLevel] = useState(100);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setWindLevel(level => (level <= 0 ? 100 : level - 1));
    }, 50);
    return () => clearInterval(timer);
  }, [isRunning]);

  const rotation = windLevel * 3.6; // 100% = 360 deg
  const springScale = 0.5 + (windLevel / 200);

  return (
    <div className="relative h-64 bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden p-4">
      <div className="w-full h-full flex items-center justify-center">
        {/* Tambour */}
        <div className="w-48 h-48 border-4 border-slate-600 rounded-full flex items-center justify-center relative transition-transform duration-1000 ease-linear" style={{ transform: `rotate(${rotation}deg)` }}>
          {/* Ressort */}
          <div className="w-32 h-32 border-4 border-blue-500 rounded-full transition-transform" style={{ transform: `scale(${springScale})` }} />
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="w-full bg-black/50 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${windLevel}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Réserve de Marche</span>
          <span>{windLevel.toFixed(0)}%</span>
        </div>
      </div>
      <button onClick={() => setIsRunning(!isRunning)} className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm p-2 rounded-full text-white">
        {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </button>
    </div>
  );
}

function BarrelArchitectureComparison({ expertMode }: { expertMode: boolean }) {
    const [selected, setSelected] = useState(0);
    const types = TRANSLATIONS.fr.architectures.types;
  
    return (
      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          {types.map((type, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                selected === i ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
              }`}
            >{type.name}</button>
          ))}
        </div>
        <div className="bg-white/60 dark:bg-slate-800/60 rounded-xl p-6">
          <h4 className="font-bold text-slate-900 dark:text-white mb-2">{types[selected].name}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{types[selected].description}</p>
          <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm"><span className="text-slate-600 dark:text-slate-400">Réserve de Marche</span><span className="font-mono font-bold">{types[selected].reserve}h</span></div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2"><div className="bg-green-600 h-2 rounded-full" style={{ width: `${types[selected].reserve}%` }} /></div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm"><span className="text-slate-600 dark:text-slate-400">Couple Relatif</span><span className="font-mono font-bold">{types[selected].couple}%</span></div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full" style={{ width: `${types[selected].couple}%` }} /></div>
              </div>
          </div>
        </div>
      </div>
    );
}

function QuizComponent({ questions, expertMode }: { questions: any[], expertMode: boolean }) {
    const [current, setCurrent] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const question = questions[current];
    
    const handleNext = () => {
        setSelectedAnswer(null);
        setCurrent(c => (c + 1) % questions.length);
    }

    return (
        <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{question.question}</h3>
            <div className="space-y-3">
                {question.options.map((option: string, index: number) => (
                    <button 
                        key={index} 
                        onClick={() => setSelectedAnswer(index)} 
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedAnswer === null 
                                ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400' 
                                : index === question.correct 
                                ? 'border-green-500 bg-green-50 dark:bg-green-950/30' 
                                : index === selectedAnswer 
                                ? 'border-red-500 bg-red-50 dark:bg-red-950/30' 
                                : 'border-slate-200 dark:border-slate-700 opacity-50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {selectedAnswer !== null && (
                <div className="mt-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 p-4 rounded">
                    <p className="font-semibold mb-1">Explication :</p>
                    <p>{expertMode ? question.explanation.expert : question.explanation.beginner}</p>
                    <button onClick={handleNext} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Question suivante</button>
                </div>
            )}
        </div>
    )
}

// =================================================
// COMPOSANT PRINCIPAL DE LA PAGE
// =================================================

export default function BarilletReferencePage() {
  const [expertMode, setExpertMode] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(Math.min(100, Math.max(0, (scrolled / maxScroll) * 100)));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = TRANSLATIONS.fr;

  return (
    <>
      <Head>
        <title>{t.title} | Référence Horlogère</title>
        <meta name="description" content={t.subtitle} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-700 z-50">
          <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium"><ChevronLeft className="w-5 h-5 mr-1" />{t.back}</Link>
                <button onClick={() => setExpertMode(!expertMode)} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${ expertMode ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>
                    <Microscope className="w-4 h-4" />{expertMode ? t.expertModeOn : t.expertModeOff}
                </button>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
            <div className="text-center mb-12 lg:mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4"><Battery className="w-4 h-4" />{t.metadata.category}</div>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4">{t.title}</h1>
                <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">{t.subtitle}</p>
            </div>

            <div className="space-y-6 lg:space-y-8">
                <SectionCard title={t.principe.title} icon={Activity}>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">{expertMode ? t.principe.expert : t.principe.beginner}</p>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 border-l-4 border-purple-600">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{t.principe.funFact.title}</h4>
                      <p className="text-slate-700 dark:text-slate-300 mb-4">{t.principe.funFact.desc}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {t.principe.funFact.metrics.map((metric: string, i: number) => <MetricCard key={i} value={metric.split(' ')[0]} label={metric.split(' ')[1]} />)}
                      </div>
                    </div>
                </SectionCard>
                
                <SectionCard title={t.anatomie.title} icon={Settings2}>
                  <p className="text-slate-700 dark:text-slate-300 mb-6">{expertMode ? t.anatomie.expert : t.anatomie.beginner}</p>
                  <BarrelSimulator2D />
                </SectionCard>

                <SectionCard title={t.couple.title} icon={Scale}>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">{expertMode ? t.couple.expert : t.couple.beginner}</p>
                    {/* ... Ici on pourrait mettre un graphique de la courbe de couple ... */}
                </SectionCard>

                <SectionCard title={t.architectures.title} icon={Layers}>
                    <p className="text-slate-700 dark:text-slate-300 mb-6">{expertMode ? t.architectures.expert : t.architectures.beginner}</p>
                    <BarrelArchitectureComparison expertMode={expertMode} />
                </SectionCard>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 lg:p-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3"><Award className="w-7 h-7 text-blue-600"/>{t.quiz.title}</h2>
                    <QuizComponent questions={t.quiz.questions} expertMode={expertMode} />
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
