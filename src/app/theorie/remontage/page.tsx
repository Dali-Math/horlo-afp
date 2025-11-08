// page.tsx - Référence Mondiale du Mécanisme de Remontage
'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { 
  ArrowLeft, RotateCw, Crown, Lock, Unlock, Battery, CheckCircle2, 
  Sparkles, AlertCircle, Zap, Gauge, History, BookOpen, Trophy,
  ChevronRight, Clock, Wrench, Globe, Award, Star, Target,
  TrendingUp, Shield, PlayCircle, PauseCircle, Volume2
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'

// TYPESCRIPT STRICT
type QuizQuestion = {
  question: string
  options: string[]
  correct: number
  explanation: string
  detail: string
}

type TimelineEvent = {
  year: string
  title: string
  description: string
  location: string
  inventor?: string
}

type GlossaryTerm = {
  term: string
  definition: string
  category: string
  etymology?: string
}

export default function RemontageHorlogerieSuisse() {
  // ÉTATS DE NAVIGATION
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [windingMode, setWindingMode] = useState<'manual' | 'automatic'>('manual')
  const [windingProgress, setWindingProgress] = useState<number>(0)
  const [isWinding, setIsWinding] = useState<boolean>(false)
  const [pendulumAngle, setPendulumAngle] = useState<number>(0)
  
  // ÉTATS DU QUIZ
  const [showQuiz, setShowQuiz] = useState<boolean>(false)
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [quizFeedback, setQuizFeedback] = useState<string>('')
  
  // ÉTATS UI
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)

  // DONNÉES ENCYCLOPÉDIQUES
  const timelineData: TimelineEvent[] = useMemo(() => [
    {
      year: "1685",
      title: "Naissance du Remontoir",
      description: "Invention du système de remontage par clef. Révolution horlogère permettant précision accrue.",
      location: "Genève, Suisse",
      inventor: "Inconnu (Horlogers Genevois)"
    },
    {
      year: "1777",
      title: "Perpétuelle Abraham-Louis Perrelet",
      description: "Première montre automatique à remontage par mouvement. Fondation du remontage moderne.",
      location: "Le Locle, SUISSE",
      inventor: "Abraham-Louis Perrelet"
    },
    {
      year: "1780",
      title: "Montre à Secousses",
      description: "Abraham-Louis Breguet perfectionne le remontage automatique avec moindre amplitude.",
      location: "Paris/Genève",
      inventor: "Abraham-Louis Breguet"
    },
    {
      year: "1931",
      title: "Rolex Perpetual",
      description: "Masse rotative 360°. Devenu standard de l'horlogerie suisse automatique.",
      location: "Bienne, SUISSE",
      inventor: "Rolex"
    },
    {
      year: "1948",
      title: "Masse Universelle",
      description: "ETA développe le calibre 1256 avec masse centrale industrielle.",
      location: "Grenchen, SUISSE",
      inventor: "ETA SA Manufacture"
    },
    {
      year: "1977",
      title: "Remontage à Quartz",
      description: "Omega calibre 2400 : premier remontage automatique pour mouvement quartz hybride.",
      location: "Bienne, SUISSE",
      inventor: "Omega/ETA"
    },
    {
      year: "2002",
      title: "Poinçon de Genève Élargi",
      description: "Certification inclut le remontage comme élément de décoration et finition.",
      location: "Genève, SUISSE",
      inventor: "Olivier Piguet (Timelab)"
    },
    {
      year: "2025",
      title: "Standards Actuels",
      description: "Chronométrie moderne COSC : précision ±4s/jour avec optimisation du remontage.",
      location: "Le Locle, SUISSE",
      inventor: "COSC/Fondation HH"
    }
  ], [])

  const glossaryData: GlossaryTerm[] = useMemo(() => [
    {
      term: "Ressort de Barillet",
      definition: "Ressort en acier bleui ou Nivaflex® qui stocke l'énergie. Longueur 30-60cm, épaisseur 0,1mm.",
      category: "Composant Moteur",
      etymology: "Du français 'barillet' (petit tonneau) car son enroulement forme un cylindre."
    },
    {
      term: "Pignon Coulant",
      definition: "Pièce mobile à trou carré sur tige. Permet changement fonction : remontage ↔ mise à l'heure.",
      category: "Transmission"
    },
    {
      term: "Rochet",
      definition: "Roue à rochet fixée sur arbre de barillet. Transmet rotation unidirectionnelle.",
      category: "Frein"
    },
    {
      term: "Cliquet",
      definition: "Levier à ressort qui engage les dents du rochet. Empêche désarmement immédiat.",
      category: "Frein"
    },
    {
      term: "Masse Oscillante",
      definition: "Poids semi-circulaire (or/platine) qui pivote avec mouvement du poignet. Angle 180-360°.",
      category: "Automatique"
    },
    {
      term: "Bascule",
      definition: "Lame ressort qui maintient pression pignon coulant contre pignon de remontoir.",
      category: "Transmission"
    },
    {
      term: "Réserve de Marche",
      definition: "Durée de fonctionnement après remontage complet. Standard : 48-72h. Record : 31 jours.",
      category: "Performance"
    },
    {
      term: "Remontoir à Secousses",
      definition: "Ancêtre du remontage automatique. Utilise oscillations verticales, non rotation.",
      category: "Historique"
    },
    {
      term: "Pignon de Remontoir",
      definition: "Fixé sur tige. Entraîne roue de couronne lors rotation couronne.",
      category: "Transmission"
    },
    {
      term: "Roue de Couronne",
      definition: "Roue intermédiaire entre pignon remontoir et rochet. Démultiplie effort.",
      category: "Transmission"
    },
    {
      term: "ETA 2824-2",
      definition: "Calibre automatique suisse légendaire. 25 rubis, 38h réserve. Production 100M+ unités.",
      category: "Calibre"
    },
    {
      term: "Valjoux 7750",
      definition: "Chronographe automatique le plus produit au monde. 25 rubis, 48h réserve.",
      category: "Calibre"
    },
    {
      term: "Poinçon de Genève",
      definition: "Certification esthétique et technique. Exige décoration rochet et cliquet.",
      category: "Certification"
    },
    {
      term: "COSC",
      definition: "Contrôle Officiel Suisse des Chronomètres. Précision -4/+6 s/jour pour certification.",
      category: "Certification"
    },
    {
      term: "Swiss Made",
      definition: "Label légal : mouvement assemblé/contrôlé Suisse, 60% valeur suisse, développement Suisse.",
      category: "Label"
    },
    {
      term: "Incabloc®",
      definition: "Système anti-chocs pour remontoir. Brevet suisse 1934. Standard industrie.",
      category: "Protection"
    }
  ], [])

  const quizQuestions: QuizQuestion[] = useMemo(() => [
    {
      question: "Quel composant empêche le ressort de barillet de se désarmer immédiatement ?",
      options: ["Le rochet", "Le cliquet", "Le pignon coulant", "La bascule"],
      correct: 1,
      explanation: "Le cliquet est un levier à ressort qui s'engage dans les dents du rochet.",
      detail: "Le cliquet utilise un ressort pour maintenir une pression constante sur le rochet. Chaque dent du rochet (typiquement 15-20) est calculée pour un angle optimal (90°) assurant un blocage fiable sans usure prématurée."
    },
    {
      question: "Quel est le standard de réserve de marche pour un calibre automatique suisse moderne ?",
      options: ["24h", "38-48h", "72h", "168h"],
      correct: 1,
      explanation: "38-48h est le standard industriel pour permettre un week-end sans remontage.",
      detail: "Le ETA 2824-2 offre 38h, le Valjoux 7750 offre 48h. Les montres haut de gamme atteignent 72h (Lange 31) voire 31 jours (Patek Philippe Calibre 20). Le ratio poids ressort/puissance est crucial."
    },
    {
      question: "Où a été inventé le remontage automatique moderne ?",
      options: ["Paris", "Genève", "Le Locle (Suisse)", "Londres"],
      correct: 2,
      explanation: "Abraham-Louis Perrelet a inventé le remontage automatique à Le Locle en 1777.",
      detail: "Le Locle, dans le canton de Neuchâtel, est le berceau de l'horlogerie suisse. Perrelet a créé la première masse oscillante pour une montre de poche, inspirée par la trotteuse ('seconde sautante') des pendules."
    },
    {
      question: "Quelle pièce possède un trou carré sur la tige de remontoir ?",
      options: ["Roue de couronne", "Pignon de remontoir", "Pignon coulant", "Rochet"],
      correct: 2,
      explanation: "Le pignon coulant a un trou carré permettant de coulisser sur la tige.",
      detail: "Le carré est tolérance ±0,01mm. Quand on tire la couronne (position 2), le pignon coulant se déplace pour dégager le remontoir et engager le mécanisme de mise à l'heure. C'est le cœur du système à 2 positions."
    },
    {
      question: "Le Poinçon de Genève certifie aussi la décoration de quel composant ?",
      options: ["Ressort de barillet", "Pignon coulant", "Rochet et cliquet", "Masse oscillante"],
      correct: 2,
      explanation: "Le rochet et cliquet doivent être polis bords cassés et décorés perlage ou Côtes de Genève.",
      detail: "Le Poinçon de Genève (loi de 1886 exige 12 critères. Pour le remontage : rochet poli miroir, cliquet perlage, anglais bords cassés à 45°, vis polies tête bleuie. Moins de 0,01% des montres suisses l'obtiennent."
    }
  ], [])

  // EFFETS
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrolled / maxScroll) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (windingMode === 'automatic' && autoRotate) {
      const interval = setInterval(() => {
        setPendulumAngle(prev => (prev + 5) % 360)
        setWindingProgress(prev => Math.min(100, prev + 0.5))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [windingMode, autoRotate])

  // HANDLERS
  const handleManualWind = useCallback(() => {
    if (windingMode === 'manual') {
      setIsWinding(true)
      setWindingProgress(prev => Math.min(100, prev + 8))
      setTimeout(() => setIsWinding(false), 300)
    }
  }, [windingMode])

  const handleAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    const correct = answerIndex === quizQuestions[currentQuestion].correct
    
    if (correct) {
      setScore(score + 1)
      setQuizFeedback(`✓ Correct ! ${quizQuestions[currentQuestion].explanation}`)
    } else {
      setQuizFeedback(`✗ Incorrect. ${quizQuestions[currentQuestion].explanation}`)
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setQuizFeedback('')
      } else {
        setQuizCompleted(true)
      }
    }, 2500)
  }, [currentQuestion, quizQuestions, score])

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setQuizCompleted(false)
    setQuizFeedback('')
    setShowQuiz(false)
  }, [])

  const filteredGlossary = useMemo(() => 
    glossaryData.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ), [glossaryData, searchTerm])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(sectionId)
  }

  return (
    <>
      <Head>
        <title>Mécanisme de Remontage | Référence Horlogerie Suisse HorloLearn</title>
        <meta name="description" content="Référence complète du mécanisme de remontage en horlogerie suisse. Comprendre le remontage manuel et automatique, composants, histoire, certifications COSC et Poinçon de Genève." />
        <meta property="og:title" content="Le Mécanisme de Remontage - Référence Horlogerie Suisse" />
        <meta property="og:description" content="Guide expert du remontage mécanique suisse. Quiz, timeline historique, glossaire technique." />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="fr_CH" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Quelle est la différence entre remontage manuel et automatique ?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Le remontage manuel nécessite de tourner la couronne quotidiennement. Le remontage automatique utilise une masse oscillante qui se déplace avec le poignet pour remonter le ressort automatiquement."
              }
            }]
          }
        `}</script>
      </Head>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 font-sans">
        {/* Navigation Sticky */}
        <nav className="sticky top-1 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link 
              href="/theorie"
              className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Retour à la théorie</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <button onClick={() => scrollToSection('principe')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Principe</button>
              <button onClick={() => scrollToSection('composants')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Composants</button>
              <button onClick={() => scrollToSection('histoire')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Histoire</button>
              <button onClick={() => scrollToSection('comparaison')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Comparaison</button>
              <button onClick={() => scrollToSection('glossaire')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Glossaire</button>
              <button onClick={() => scrollToSection('certifications')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Certifications</button>
              <button onClick={() => setShowQuiz(true)} className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-700 transition-colors">Quiz Expert</button>
            </div>
          </div>
        </nav>

        {/* Hero Cinétique */}
        <section id="hero" className="relative py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-bold mb-8 border border-blue-200 dark:border-blue-800 animate-pulse">
                <RotateCw className="w-5 h-5 animate-spin-slow" />
                Mécanisme Essentiel de l'Horlogerie Suisse
              </div>
              <h1 className="text-6xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight animate-fade-in">
                Le Mécanisme de Remontage
              </h1>
              <p className="text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Armer le ressort moteur pour alimenter la montre en énergie mécanique
              </p>
              
              {/* Simulateur de Remontage */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-slate-200 dark:border-slate-700 shadow-xl mb-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  {/* Mode Sélection */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Mode de Remontage</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setWindingMode('manual')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          windingMode === 'manual' 
                            ? 'bg-blue-600 text-white shadow-lg scale-105' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                      >
                        <Crown className="w-5 h-5" />
                        Manuel
                      </button>
                      <button
                        onClick={() => setWindingMode('automatic')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          windingMode === 'automatic' 
                            ? 'bg-blue-600 text-white shadow-lg scale-105' 
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                        }`}
                      >
                        <RotateCw className="w-5 h-5" />
                        Automatique
                      </button>
                    </div>
                    
                    {windingMode === 'manual' ? (
                      <button
                        onClick={handleManualWind}
                        disabled={windingProgress >= 100}
                        className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 justify-center"
                      >
                        {isWinding ? (
                          <RotateCw className="w-6 h-6 animate-spin" />
                        ) : windingProgress >= 100 ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Zap className="w-6 h-6" />
                        )}
                        {windingProgress >= 100 ? 'Ressort Armé' : 'Tourner la Couronne'}
                      </button>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setAutoRotate(!autoRotate)}
                          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all flex items-center gap-2"
                        >
                          {autoRotate ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                          {autoRotate ? 'Pause Mouvement' : 'Démarrer Mouvement'}
                        </button>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Simule les mouvements du poignet</p>
                      </div>
                    )}
                  </div>

                  {/* Jauge de Réserve */}
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Réserve de Marche</h3>
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-slate-200 dark:text-slate-700"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - windingProgress / 100)}`}
                          className="transition-all duration-500"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1E40AF" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">{Math.round(windingProgress)}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{Math.round(windingProgress * 0.48)}h de réserve</span>
                    </div>
                  </div>

                  {/* Animation Mécanisme */}
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Couronne */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300" />
                      
                      {/* Pignons */}
                      {windingMode === 'manual' && isWinding && (
                        <g>
                          <circle cx="50" cy="20" r="8" fill="#3B82F6" className="animate-pulse" />
                          <circle cx="70" cy="50" r="10" fill="#10B981" className="animate-pulse" />
                          <circle cx="30" cy="50" r="6" fill="#F59E0B" className="animate-pulse" />
                        </g>
                      )}
                      
                      {/* Masse Oscillante (Automatique) */}
                      {windingMode === 'automatic' && (
                        <g transform={`rotate(${pendulumAngle} 50 50)`}>
                          <path d="M50 50 Q30 20 50 10 Q70 20 50 50" fill="#8B5CF6" opacity="0.9" />
                          <circle cx="50" cy="50" r="15" fill="#3B82F6" />
                        </g>
                      )}
                      
                      {/* Centre */}
                      <circle cx="50" cy="50" r="5" fill="#1F2937" className="dark:fill-white" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl px-8 py-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">2</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Types de Remontage</div>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl px-8 py-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">5+</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Composants Essentiels</div>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl px-8 py-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">48h</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Réserve Standard</div>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl px-8 py-4 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">±4s</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Précision COSC</div>
                </div>
              </div>
            </div>
          </div>

          {/* Décorations */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-blue-600/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-xl animate-float-delayed" />
        </section>

        {/* Principe Fondamental */}
        <section id="principe" className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">Principe Fondamental</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                La transformation d'énergie mécanique : de la rotation de la couronne à l'énergie potentielle stockée
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-blue-600" />
                  Transformation d'Énergie
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600 transition-all hover:translate-x-1">
                    <span className="text-blue-600 font-bold text-xl mt-1">01</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Énergie Cinétique</p>
                      <p className="text-slate-700 dark:text-slate-300">La rotation de la couronne (30-40 tours) est transmise à la tige de remontoir via engrenages.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600 transition-all hover:translate-x-1">
                    <span className="text-blue-600 font-bold text-xl mt-1">02</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Transmission</p>
                      <p className="text-slate-700 dark:text-slate-300">Système de démultiplication : 1 tour couronne = 10 tours roue de couronne = 100 tours rochet.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600 transition-all hover:translate-x-1">
                    <span className="text-blue-600 font-bold text-xl mt-1">03</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Stockage</p>
                      <p className="text-slate-700 dark:text-slate-300">Le ressort de barillet s'enroule, stockant l'énergie potentielle élastique (0,02 joules typique).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600 transition-all hover:translate-x-1">
                    <span className="text-blue-600 font-bold text-xl mt-1">04</span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">Régulation</p>
                      <p className="text-slate-700 dark:text-slate-300">Le cliquet anti-retour maintient le ressort armé pendant 48-72h de réserve typique.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">Formule Clé</h4>
                  <div className="font-mono text-lg bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4">
                    Énergie Stockée = ½ × k × x²
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Où k = constante de raideur du ressort, x = déformation angulaire
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">0.02J</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Énergie Moyenne</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">96%</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">Efficacité</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Composants Détaillés */}
        <section id="composants" className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">Composants du Mécanisme</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Chaque pièce est un chef-d'œuvre de micro-mécanique suisse, tolerances ±0,001mm
              </p>
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* Carte 1 : Tige de Remontoir */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                    <Crown className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Tige de Remontoir</h3>
                    <p className="text-slate-600 dark:text-slate-400">Axe central avec pignon coulant (baladeur)</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Matériau</span>
                    <span className="text-slate-900 dark:text-slate-100">Acier inox 316L</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Tolérance</span>
                    <span className="text-slate-900 dark:text-slate-100">±0,001mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Dureté</span>
                    <span className="text-slate-900 dark:text-slate-100">55-60 HRC</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Positions</span>
                    <span className="text-slate-900 dark:text-slate-100">2 (remontage/heure)</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border-l-4 border-green-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Rôle clé :</strong> Transmet le couple de la couronne au mécanisme. Le trou carré doit être parfait pour éviter le jeu.
                  </p>
                </div>
              </div>

              {/* Carte 2 : Pignon Coulant */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                    <Wrench className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Pignon Coulant</h3>
                    <p className="text-slate-600 dark:text-slate-400">Le « baladeur » à trou carré</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Denture</span>
                    <span className="text-slate-900 dark:text-slate-100">Breguet (angle 15°)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Module</span>
                    <span className="text-slate-900 dark:text-slate-100">0,2 - 0,4mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Matériau</span>
                    <span className="text-slate-900 dark:text-slate-100">Laiton nickelé</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Course</span>
                    <span className="text-slate-900 dark:text-slate-100">0,5mm axial</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Innovation :</strong> Le « baladeur » permet le changement de fonction sans débrayage complexe. Système breveté Breguet 1780.
                  </p>
                </div>
              </div>

              {/* Carte 3 : Rochet & Cliquet */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                    <Lock className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Rochet & Cliquet</h3>
                    <p className="text-slate-600 dark:text-slate-400">Système de freinage unidirectionnel</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Rochet</span>
                    <span className="text-slate-900 dark:text-slate-100">15-20 dents</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Angle cliquet</span>
                    <span className="text-slate-900 dark:text-slate-100">90°</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Ressort cliquet</span>
                    <span className="text-slate-900 dark:text-slate-100">Acier bleui</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Force</span>
                    <span className="text-slate-900 dark:text-slate-100">0,1-0,2N</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Sécurité :</strong> Le cliquet peut être écarté manuellement pour le désarmage. Force calculée pour résister à 200% du couple max du ressort.
                  </p>
                </div>
              </div>

              {/* Carte 4 : Roue de Couronne */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl">
                    <Crown className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Roue de Couronne</h3>
                    <p className="text-slate-600 dark:text-slate-400">L'intermédiaire de transmission</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Rapport</span>
                    <span className="text-slate-900 dark:text-slate-100">1:10 typique</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Dents</span>
                    <span className="text-slate-900 dark:text-slate-100">60-80</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Matériau</span>
                    <span className="text-slate-900 dark:text-slate-100">Cuivre-beryllium</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Finition</span>
                    <span className="text-slate-900 dark:text-slate-100">Cercle anglais</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg border-l-4 border-amber-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Optimisation :</strong> Le rapport de démultiplication réduit l'effort de 90% tout en augmentant la vitesse de remontage. Calculé pour couplage parfait.
                  </p>
                </div>
              </div>

              {/* Carte 5 : Ressort de Barillet */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-xl">
                    <Battery className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Ressort de Barillet</h3>
                    <p className="text-slate-600 dark:text-slate-400">Le cœur énergétique de la montre</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Longueur</span>
                    <span className="text-slate-900 dark:text-slate-100">30-60cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Épaisseur</span>
                    <span className="text-slate-900 dark:text-slate-100">0,08-0,15mm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Alliage</span>
                    <span className="text-slate-900 dark:text-slate-100">Nivaflex®/Silicium</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Cycles</span>
                    <span className="text-slate-900 dark:text-slate-100">10-20 ans</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border-l-4 border-purple-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Record :</strong> Le Patek Philippe Calibre 20 a un ressort de 2mètres ! Alliage cobalt-chrome pour 31 jours de réserve. Le Nivaflex® (Swatch Group) résiste à la magnétisation et fatigue.
                  </p>
                </div>
              </div>

              {/* Carte 6 : Masse Oscillante (Automatique) */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
                    <RotateCw className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Masse Oscillante</h3>
                    <p className="text-slate-600 dark:text-slate-400">Le cœur du remontage automatique</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Poids</span>
                    <span className="text-slate-900 dark:text-slate-100">2-5g</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Matériau</span>
                    <span className="text-slate-900 dark:text-slate-100">Or 21k/Platine</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Angle</span>
                    <span className="text-slate-900 dark:text-slate-100">360° (Rolex)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Roulements</span>
                    <span className="text-slate-900 dark:text-slate-100">Céramique</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border-l-4 border-indigo-600">
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-slate-100">Innovation :</strong> Le système Rolex Perpetual (1931) est breveté avec masse rotative complète. Le calibre ETA 2824 utilise une masse semi-circulaire plus économique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Historique Interactive */}
        <section id="histoire" className="py-20 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">Timeline Historique</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                De l'invention du remontoir à la haute précision contemporaine
              </p>
            </div>

            <div className="relative">
              {/* Ligne centrale */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />

              {/* Événements */}
              <div className="space-y-12">
                {timelineData.map((event, index) => (
                  <div 
                    key={event.year}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
                        <div className="flex items-center gap-2 mb-2">
                          <History className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{event.year}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{event.title}</h3>
                        <p className="text-slate-700 dark:text-slate-300 mb-3">{event.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                            <Globe className="w-4 h-4" />
                            {event.location}
                          </span>
                          {event.inventor && (
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {event.inventor}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 shadow-lg z-10 relative animate-pulse" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Comparaison Manuel vs Automatique */}
        <section id="comparaison" className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                Comparaison Manuel vs Automatique
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Deux philosophies pour un même objectif : la précision chronométrique
              </p>
            </div>

            <div className="grid xl:grid-cols-2 gap-12">
              {/* Tableau Comparatif */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-8 flex items-center gap-3">
                  <Target className="w-8 h-8 text-blue-600" />
                  Caractéristiques
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                        <th className="text-left py-4 font-bold text-slate-900 dark:text-slate-100">Critère</th>
                        <th className="text-left py-4 font-bold text-green-700 dark:text-green-400">Manuel</th>
                        <th className="text-left py-4 font-bold text-blue-700 dark:text-blue-400">Automatique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Poids</td>
                        <td className="py-4 text-green-700 dark:text-green-400">Léger (+20g)</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">Lourd (+40-60g)</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Épaisseur</td>
                        <td className="py-4 text-green-700 dark:text-green-400">Fine (8-10mm)</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">Épaisse (12-15mm)</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Maintenance</td>
                        <td className="py-4 text-green-700 dark:text-green-400">Simple (4-5ans)</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">Complexe (3-4ans)</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Prix moyen</td>
                        <td className="py-4 text-green-700 dark:text-green-400">8'000 CHF</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">12'000 CHF</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Précision</td>
                        <td className="py-4 text-green-700 dark:text-green-400">±2s/j</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">±4s/j</td>
                      </tr>
                      <tr>
                        <td className="py-4 font-medium text-slate-700 dark:text-slate-300">Rituel</td>
                        <td className="py-4 text-green-700 dark:text-green-400">Quotidien</td>
                        <td className="py-4 text-blue-700 dark:text-blue-400">Optional</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Avantages/Inconvénients */}
              <div className="space-y-8">
                {/* Manuel */}
                <div className="bg-green-50 dark:bg-green-950/30 rounded-2xl p-8 border border-green-200 dark:border-green-800">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                    <Crown className="w-8 h-8 text-green-600" />
                    Remontage Manuel
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Avantages
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Lien émotionnel fort avec la montre</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Boîtier plus fin et élégant</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Mouvement plus simple, robuste</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Précision théorique supérieure</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Inconvénients
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Obligation quotidienne</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Risque d'oubli (arrêt)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Pas de remontage nocturne</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Automatique */}
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-3">
                    <RotateCw className="w-8 h-8 text-blue-600" />
                    Remontage Automatique
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Avantages
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Autonomie permanente (port quotidien)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Pratique pour montre de sport</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Maintient la marche nocturne</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Complexité technique appréciée</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Inconvénients
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Poids et épaisseur accrus</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Complexité mécanique</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Surcoût (+50%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-600 mt-1">•</span>
                          <span className="text-slate-700 dark:text-slate-300">Nécessite remonteur de boîte si non portée</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Glossaire Technique */}
        <section id="glossaire" className="py-20 bg-slate-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">Glossaire Technique</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Le vocabulaire de l'horloger suisse, de A à Z
              </p>
            </div>

            {/* Barre de recherche */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un terme technique..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all"
                />
                <BookOpen className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
              </div>
            </div>

            {/* Grille du glossaire */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGlossary.map((item) => (
                <div 
                  key={item.term}
                  onClick={() => setSelectedTerm(selectedTerm === item.term ? null : item.term)}
                  className={`bg-white dark:bg-slate-900 rounded-xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                    selectedTerm === item.term 
                      ? 'border-blue-600 dark:border-blue-400 shadow-lg scale-105' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{item.term}</h3>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                    {item.definition}
                  </p>
                  {item.etymology && (
                    <p className="text-xs text-slate-500 dark:text-slate-500 italic mt-2">
                      Étymologie : {item.etymology}
                    </p>
                  )}
                  {selectedTerm === item.term && (
                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 animate-fade-in">
                      <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
                        <Volume2 className="w-4 h-4" />
                        Prononciation
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredGlossary.length === 0 && (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Aucun terme ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Suisses */}
        <section id="certifications" className="py-20 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">Certifications & Labels Suisses</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Les garanties de qualité et d'origine qui font la renommée de l'horlogerie suisse
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* COSC */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-yellow-100 dark:bg-yellow-900/40 p-3 rounded-xl">
                    <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">COSC</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Contrôle Officiel Suisse des Chronomètres</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Précision</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">-4/+6 s/jour</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Testé sur</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">15 jours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Conditions</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">3 températures</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Positions</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">5 positions</span>
                  </div>
                  <div className="pt-4 border-t border-yellow-200 dark:border-yellow-800">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Le COSC teste le remontage en conditions extrêmes. Seuls 3% des montres suisses passent ce test.
                    </p>
                  </div>
                </div>
              </div>

              {/* Poinçon de Genève */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/30 dark:to-gray-900/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-gray-100 dark:bg-gray-900/40 p-3 rounded-xl">
                    <Shield className="w-10 h-10 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Poinçon de Genève</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Qualité esthétique et technique</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Critères</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">12 règles</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Décor</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Obligatoire</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Matières</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Suisse 100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Assemblage</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Genève</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Le rochet et le cliquet doivent être polis miroir, perlés, avec bords cassés à 45°.
                    </p>
                  </div>
                </div>
              </div>

              {/* Swiss Made */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 rounded-2xl p-8 border border-red-200 dark:border-red-700 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-xl">
                    <Globe className="w-10 h-10 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Swiss Made</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Label d'origine et de qualité</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Valeur CH</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">60% min.</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Mouvement</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Suisse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Assemblage</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Suisse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Contrôle</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">Suisse</span>
                  </div>
                  <div className="pt-4 border-t border-red-200 dark:border-red-700">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Le remontage est un élément clé pour obtenir le label Swiss Made. Son développement doit être suisse.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Structurée (schema.org) */}
            <div className="mt-16 bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8 text-center">Questions Fréquentes</h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      Quelle différence entre remontage manuel et automatique ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Le remontage manuel nécessite de tourner la couronne quotidiennement. Le remontage automatique utilise une masse oscillante qui se déplace avec les mouvements du poignet pour remonter le ressaut automatiquement. Les deux systèmes coexistent dans l'horlogerie suisse de luxe.
                    </div>
                  </details>

                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      Combien de tours de couronne pour remonter une montre ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Entre 30 et 40 tours complets pour une réserve de 48h. Le ressort de barillet fait 50-60 tours complets. Le système de démultiplication (1:10) permet d'optimiser l'effort. Ne jamais forcer après résistance.
                    </div>
                  </details>

                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      Quelle est la durée de vie d'un ressort de barillet ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Un ressort de barillet de qualité suisse dure 10-20 ans. Les alliages modernes comme le Nivaflex® résistent à la fatigue et à la corrosion. Un entretien régulier (4-5 ans) par un horloger certifié prolonge la durée de vie.
                    </div>
                  </details>
                </div>

                <div className="space-y-4">
                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      Pourquoi le pignon coulant s'appelle-t-il "baladeur" ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Parce qu'il "balade" ou coulisse sur la tige de remontoir entre deux positions. Ce mouvement axial (0,5mm) permet de changer de fonction : position 1 pour remonter, position 2 pour régler l'heure. Innovation Breguet 1780.
                    </div>
                  </details>

                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      Qu'est-ce que le "perlage" sur le cliquet ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Le perlage est une décoration de petits points circulaires réalisés à la pointe de diamant. Obligatoire pour le Poinçon de Genève, il réduit aussi les frictions. Chaque point doit être parfaitement aligné et de même taille (0,1mm).
                    </div>
                  </details>

                  <details className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
                    <summary className="font-bold text-slate-900 dark:text-slate-100 cursor-pointer flex items-center justify-between">
                      La montre automatique se remonte-t-elle en dormant ?
                      <ChevronRight className="w-5 h-5 text-slate-400 transform transition-transform" />
                    </summary>
                    <div className="mt-4 text-slate-700 dark:text-slate-300">
                      Non, la masse oscillante nécessite des mouvements du poignet. En dormant, la montre utilise sa réserve. Une montre sans remontage manuel s'arrêtera en 2-3 jours. D'où l'invention du remonteur de boîte automatique.
                    </div>
                  </details>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Maîtrisez le Mécanisme de Remontage</h3>
              <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
                Testez vos connaissances avec le quiz expert et obtenez votre certification HorloLearn
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-white text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors shadow-lg flex items-center gap-2"
                >
                  <Trophy className="w-6 h-6" />
                  Quiz Expert
                </button>
                <Link
                  href="/theorie"
                  className="bg-blue-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-400 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-6 h-6" />
                  Autres Chapitres
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        {showQuiz && (
          <section className="fixed inset-0 z-50 bg-white dark:bg-slate-900 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 border-2 border-blue-600 dark:border-blue-400">
                {!quizCompleted ? (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                          Question {currentQuestion + 1} / {quizQuestions.length}
                        </span>
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          Score: {score}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                            selectedAnswer === null
                              ? 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30'
                              : selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                                : 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950/30'
                              : index === quizQuestions[currentQuestion].correct
                              ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950/30'
                              : 'border-slate-200 dark:border-slate-700 opacity-50'
                          }`}
                        >
                          <span className="text-slate-900 dark:text-slate-100 font-medium">{option}</span>
                        </button>
                      ))}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {selectedAnswer === quizQuestions[currentQuestion].correct ? '✓ Correct !' : '✗ Explication'}
                            </p>
                            <p className="text-slate-700 dark:text-slate-300 text-sm">
                              {quizQuestions[currentQuestion].explanation}
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-2">
                              {quizQuestions[currentQuestion].detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {quizFeedback && (
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-600 dark:border-blue-400">
                        <p className="text-slate-700 dark:text-slate-300">{quizFeedback}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mb-6">
                      <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        Quiz terminé !
                      </h3>
                      <p className="text-xl text-slate-600 dark:text-slate-400 mb-6">
                        Votre score: {score} / {quizQuestions.length}
                      </p>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 mb-6">
                        <div
                          className="bg-blue-600 dark:bg-blue-500 h-4 rounded-full transition-all duration-500"
                          style={{ width: `${(score / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 mb-6">
                        {score === quizQuestions.length
                          ? '🎉 Parfait ! Vous êtes expert en remontage suisse !'
                          : score >= quizQuestions.length * 0.6
                          ? '👍 Bien joué ! Vous avez une bonne compréhension du sujet.'
                          : '📚 Continuez à reviser pour devenir un expert.'}
                      </p>
                    </div>

                    <div className="flex gap-4 justify-center flex-wrap">
                      <button
                        onClick={resetQuiz}
                        className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                      >
                        Recommencer le quiz
                      </button>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                      >
                        Retour à la page
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 bg-slate-900 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-6">
                <Award className="w-8 h-8 text-yellow-500" />
                <Star className="w-8 h-8 text-blue-500" />
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-slate-400 mb-4">
                HorloLearn - Référence de l'Horlogerie Suisse
              </p>
              <p className="text-xs text-slate-600">
                © 2025 HorloLearn. Tous droits réservés. Conforme aux standards Fondation Haute Horlogerie.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Styles Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 3s;
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </>
  )
}
