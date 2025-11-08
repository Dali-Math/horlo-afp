'use client'

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Wrench,
  ChevronLeft,
  Battery,
  Zap,
  Wind,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Info,
  Share2,
  BookOpen,
  Award,
  TrendingUp,
  Layers,
  Target,
  Eye,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Timer,
  Brain,
} from 'lucide-react'

// =================================================
// COMPOSANT PRINCIPAL - VOYAGE NARRATIF
// =================================================

export default function BarilletRessortPage() {
  const [expertMode, setExpertMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(100);
  const [isAnimating, setIsAnimating] = useState(false);

  // Simulation de décharge énergétique
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setInterval(() => {
      setEnergyLevel(prev => {
        if (prev <= 0) {
          setIsAnimating(false);
          return 0;
        }
        return prev - 0.5;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [isAnimating]);

  const chapters = [
    { id: 'story', title: "L'Histoire", icon: Sparkles },
    { id: 'anatomy', title: "L'Anatomie", icon: Layers },
    { id: 'energy', title: "L'Énergie", icon: Zap },
    { id: 'types', title: "Les Variations", icon: Target },
    { id: 'master', title: "Maîtrise", icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-950 to-slate-950">
      
      {/* Header fixe avec indicateur d'énergie */}
      <header className="fixed top-[72px] left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a href="/theorie" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Retour</span>
            </a>
            
            {/* Indicateur d'énergie vivant */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Battery className="w-5 h-5 text-amber-400" />
                <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-amber-500 to-red-500 transition-all duration-300"
                    style={{ width: `${energyLevel}%` }}
                  />
                </div>
                <span className="text-sm font-mono text-amber-400">{Math.round(energyLevel)}%</span>
              </div>
              
              <button
                onClick={() => setExpertMode(!expertMode)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  expertMode 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50' 
                    : 'bg-slate-800 text-amber-400 border border-amber-500/30'
                }`}
              >
                {expertMode ? '👨‍🔬 Expert' : '🎓 Apprenant'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Immersif */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-500/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm mb-8">
            <Battery className="w-4 h-4" />
            <span>Chapitre 1 : Organe Moteur</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
            Le Barillet
          </h1>
          
          <p className="text-2xl md:text-3xl text-amber-100/80 font-light mb-8 leading-relaxed">
            La <span className="text-amber-400 font-semibold">batterie mécanique</span> qui transforme
            <br />
            votre geste en 40 heures de précision
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-300/60">
            <span className="flex items-center gap-1">⏱️ 8 min de lecture</span>
            <span>•</span>
            <span className="flex items-center gap-1">🎯 Niveau : Tous publics</span>
            <span>•</span>
            <span className="flex items-center gap-1">⚡ Interactif</span>
          </div>
        </div>
      </section>

      {/* Navigation par chapitres */}
      <section className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-xl border-y border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3 scrollbar-hide">
            {chapters.map((chapter, idx) => {
              const Icon = chapter.icon;
              return (
                <button
                  key={chapter.id}
                  onClick={() => setCurrentChapter(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    currentChapter === idx
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                      : 'bg-slate-800/50 text-amber-400/60 hover:text-amber-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{chapter.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Chapitre 1 : L'Histoire */}
        {currentChapter === 0 && (
          <div className="space-y-8 animate-fadeIn">
            <StorySection expertMode={expertMode} />
          </div>
        )}

        {/* Chapitre 2 : L'Anatomie */}
        {currentChapter === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <AnatomySection expertMode={expertMode} />
          </div>
        )}

        {/* Chapitre 3 : L'Énergie */}
        {currentChapter === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <EnergySection 
              expertMode={expertMode} 
              energyLevel={energyLevel}
              setEnergyLevel={setEnergyLevel}
              isAnimating={isAnimating}
              setIsAnimating={setIsAnimating}
            />
          </div>
        )}

        {/* Chapitre 4 : Les Variations */}
        {currentChapter === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <TypesSection expertMode={expertMode} />
          </div>
        )}

        {/* Chapitre 5 : Maîtrise (Quiz) */}
        {currentChapter === 4 && (
          <div className="space-y-8 animate-fadeIn">
            <MasterySection expertMode={expertMode} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 bg-slate-950/50 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-amber-400 font-semibold">HorloLearn - Formation Horlogère</p>
              <p className="text-amber-300/60 text-sm">Partage de connaissance sous licence CC BY-NC-SA 4.0</p>
            </div>
            <div className="flex gap-3">
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 transition-colors">
                <BookOpen className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// =================================================
// SECTION 1 : L'HISTOIRE
// =================================================

function StorySection({ expertMode }: { expertMode: boolean }) {
  return (
    <div className="space-y-8">
      
      {/* Analogie visuelle */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-amber-500/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Lightbulb className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-100 mb-2">Imaginez...</h2>
              <p className="text-amber-300/60">Une analogie pour comprendre</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-500/20">
              <div className="text-4xl mb-3">🔋</div>
              <h3 className="text-xl font-bold text-amber-400 mb-2">Votre smartphone</h3>
              <p className="text-amber-100/80 leading-relaxed">
                Vous le chargez le soir, il vous donne de l'énergie toute la journée. 
                Quand la batterie est faible, vous le rechargez.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-6 border border-amber-500/40">
              <div className="text-4xl mb-3">⚙️</div>
              <h3 className="text-xl font-bold text-amber-400 mb-2">Votre montre mécanique</h3>
              <p className="text-amber-100/80 leading-relaxed">
                Vous la remontez, le ressort stocke l'énergie et la libère pendant 40h. 
                Pas de câble, pas d'électricité, juste de la physique pure !
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Principe fondamental */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
        <h2 className="text-3xl font-bold text-amber-100 mb-6 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-400" />
          Le principe magique
        </h2>
        
        <div className="prose prose-invert prose-amber max-w-none">
          <p className="text-lg text-amber-100/80 leading-relaxed mb-6">
            {expertMode ? (
              <>
                Le barillet exploite le principe de <strong className="text-amber-400">l'énergie potentielle élastique</strong>. 
                Lors du remontage, un couple C est appliqué pour enrouler le ressort moteur, créant une contrainte σ dans 
                le matériau. Cette énergie E = ½kx² (où k est la constante de rappel et x le déplacement) est ensuite 
                restituée progressivement avec un rendement η de 85-92%.
              </>
            ) : (
              <>
                Quand vous tournez la couronne de votre montre, vous <strong className="text-amber-400">enroulez un long ruban d'acier</strong> appelé 
                ressort moteur. C'est comme tordre un élastique : plus vous le tordez, plus il veut revenir à sa position 
                initiale. Cette "envie de se détordre" est l'énergie qui va faire tourner tous les rouages de votre montre !
              </>
            )}
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5 border border-green-500/30">
              <div className="text-3xl mb-2">🔄</div>
              <h4 className="font-bold text-green-400 mb-2">1. Remontage</h4>
              <p className="text-sm text-amber-100/70">Le ressort s'enroule et accumule l'énergie</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-5 border border-blue-500/30">
              <div className="text-3xl mb-2">💎</div>
              <h4 className="font-bold text-blue-400 mb-2">2. Stockage</h4>
              <p className="text-sm text-amber-100/70">L'énergie reste piégée dans le barillet</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl p-5 border border-amber-500/30">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-amber-400 mb-2">3. Distribution</h4>
              <p className="text-sm text-amber-100/70">Le ressort se détend lentement, faisant tourner les rouages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun facts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">🎯</div>
            <h3 className="text-xl font-bold text-purple-400">Le saviez-vous ?</h3>
          </div>
          <p className="text-amber-100/80">
            Un ressort de barillet standard mesure environ <strong className="text-purple-400">30 à 45 cm</strong> de long 
            mais seulement <strong className="text-purple-400">0,1 mm</strong> d'épaisseur. C'est plus fin qu'un cheveu !
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">💪</div>
            <h3 className="text-xl font-bold text-orange-400">Force impressionnante</h3>
          </div>
          <p className="text-amber-100/80">
            Un barillet de 40h stocke assez d'énergie pour soulever un poids de <strong className="text-orange-400">500g à 60cm</strong> de hauteur. 
            Toute cette puissance dans un cylindre de 12mm !
          </p>
        </div>
      </div>
    </div>
  );
}

// =================================================
// SECTION 2 : L'ANATOMIE
// =================================================

function AnatomySection({ expertMode }: { expertMode: boolean }) {
  const [selectedPart, setSelectedPart] = useState(0);
  
  const parts = [
    {
      name: "Le Tambour",
      icon: "🥁",
      color: "from-blue-500 to-cyan-500",
      simple: "C'est le cylindre qui contient le ressort. Il tourne et entraîne le premier rouage de la montre grâce à ses dents sur le pourtour.",
      expert: "Tambour en laiton CuZn37, Ø12-16mm, denture module 0.2-0.3mm. Couple nominal 8-12 μN·m. La denture est taillée avec précision selon DIN 8306.",
      specs: ["Ø 12-16mm", "60-100 dents", "Laiton CuZn37", "Module 0.2mm"]
    },
    {
      name: "Le Ressort Moteur",
      icon: "🌀",
      color: "from-green-500 to-emerald-500",
      simple: "Un long ruban d'acier enroulé en spirale. Plus il est long et fin, plus il peut stocker d'énergie pour une longue réserve de marche.",
      expert: "Acier au carbone 1.1274 ou Nivaflex NiCoCr. Dimensions : L=250-450mm, e=0.10-0.13mm, l=1.2-1.8mm. Limite élastique σₑ=1600 MPa après traitement thermique.",
      specs: ["250-450mm", "0.10-0.13mm", "Nivaflex", "1600 MPa"]
    },
    {
      name: "L'Arbre Central",
      icon: "📍",
      color: "from-purple-500 to-violet-500",
      simple: "L'axe fixe au centre du barillet. Le ressort est accroché à cet arbre à son extrémité intérieure. Quand on remonte, l'arbre tourne et enroule le ressort.",
      expert: "Arbre en acier 16MnCr5 cémenté HRC 58-62. Carré de remontage standardisé selon DIN 8360. Couple de remontage maximal admissible : 15-20 μN·m.",
      specs: ["16MnCr5", "HRC 60", "DIN 8360", "20 μN·m max"]
    },
    {
      name: "Couvercle & Bride",
      icon: "🎩",
      color: "from-amber-500 to-orange-500",
      simple: "Le couvercle ferme le barillet et la bride maintient le ressort en place. Tout doit glisser parfaitement avec un minimum de frottement.",
      expert: "Couvercle ajusté H7 avec jeu axial 0.05-0.08mm. Bride avec crochet de fixation du ressort. Lubrification Moebius 8200 (viscosité 8-12 mm²/s à 40°C).",
      specs: ["Ajustage H7", "±0.05mm", "Moebius 8200", "Crochet bride"]
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Vue éclatée interactive */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-amber-500/30">
        <h2 className="text-3xl font-bold text-amber-100 mb-6 flex items-center gap-3">
          <Layers className="w-8 h-8 text-amber-400" />
          Anatomie détaillée
        </h2>
        
        <p className="text-amber-100/80 mb-8 text-lg">
          Explorez les 4 composants essentiels du barillet
        </p>
        
        {/* Sélecteur de pièces */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {parts.map((part, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPart(idx)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedPart === idx
                  ? 'border-amber-500 bg-amber-500/10 scale-105'
                  : 'border-slate-700 bg-slate-800/50 hover:border-amber-500/50'
              }`}
            >
              <div className="text-4xl mb-2">{part.icon}</div>
              <div className="font-semibold text-amber-100 text-sm">{part.name}</div>
            </button>
          ))}
        </div>
        
        {/* Détails de la pièce sélectionnée */}
        <div className={`bg-gradient-to-br ${parts[selectedPart].color}/10 rounded-2xl p-8 border-2 border-current`}
             style={{ borderColor: `${parts[selectedPart].color.split(' ')[1].replace('to-', '')}33` }}>
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl">{parts[selectedPart].icon}</div>
            <div>
              <h3 className="text-2xl font-bold text-amber-100 mb-2">{parts[selectedPart].name}</h3>
              <p className="text-amber-100/80 text-lg leading-relaxed">
                {expertMode ? parts[selectedPart].expert : parts[selectedPart].simple}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {parts[selectedPart].specs.map((spec, i) => (
              <div key={i} className="bg-slate-900/50 rounded-lg p-3 text-center border border-amber-500/20">
                <div className="font-mono font-bold text-amber-400">{spec.split(' ')[0]}</div>
                <div className="text-xs text-amber-300/60 mt-1">{spec.split(' ').slice(1).join(' ')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparaison de tailles */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
        <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3">
          <Target className="w-7 h-7 text-amber-400" />
          Échelle et proportions
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 mb-3">
              <div className="text-5xl mb-2">📏</div>
              <div className="text-3xl font-bold text-blue-400">12-16mm</div>
            </div>
            <p className="text-amber-100/80">Diamètre du tambour</p>
            <p className="text-sm text-amber-300/60">Plus petit qu'une pièce de 1€</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 mb-3">
              <div className="text-5xl mb-2">📐</div>
              <div className="text-3xl font-bold text-green-400">30-45cm</div>
            </div>
            <p className="text-amber-100/80">Longueur du ressort</p>
            <p className="text-sm text-amber-300/60">Déroulé = longueur d'une règle</p>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-xl p-6 mb-3">
              <div className="text-5xl mb-2">🔬</div>
              <div className="text-3xl font-bold text-purple-400">0.1mm</div>
            </div>
            <p className="text-amber-100/80">Épaisseur du ressort</p>
            <p className="text-sm text-amber-300/60">Plus fin qu'un cheveu humain</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================================
// SECTION 3 : L'ÉNERGIE (Interactive)
// =================================================

function EnergySection({ expertMode, energyLevel, setEnergyLevel, isAnimating, setIsAnimating }: any) {
  
  const getPhase = (level: number) => {
    if (level > 90) return { name: 'Pleine charge', color: 'text-red-400', desc: 'Couple maximal - Zone dangereuse' };
    if (level > 60) return { name: 'Phase utile', color: 'text-green-400', desc: 'Couple stable - Précision optimale' };
    if (level > 20) return { name: 'Phase normale', color: 'text-blue-400', desc: 'Couple décroissant - Fonctionnement OK' };
    return { name: 'Fin de réserve', color: 'text-orange-400', desc: 'Couple faible - Arrêt imminent' };
  };
  
  const currentPhase = getPhase(energyLevel);
  const torquePercent = energyLevel > 90 ? 100 : energyLevel > 20 ? 75 : 30;

  return (
    <div className="space-y-8">
      
      {/* Simulateur interactif de décharge */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-amber-500/30 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative">
          <h2 className="text-3xl font-bold text-amber-100 mb-2 flex items-center gap-3">
            <Zap className="w-8 h-8 text-amber-400" />
            Simulateur de réserve de marche
          </h2>
          <p className="text-amber-300/60 mb-8">Observez la décharge énergétique en temps réel</p>
          
          {/* Jauge principale */}
          <div className="bg-slate-950/50 rounded-2xl p-8 mb-6 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-amber-100">Réserve de marche</span>
              <span className={`text-2xl font-bold ${currentPhase.color}`}>
                {Math.round(energyLevel * 0.4)}h / 40h
              </span>
            </div>
            
            <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden mb-2">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-blue-500 via-amber-500 to-red-500 transition-all duration-300 rounded-full"
                style={{ width: `${energyLevel}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-white drop-shadow-lg">
                  {Math.round(energyLevel)}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between text-xs text-amber-300/40">
              <span>0h</span>
              <span>10h</span>
              <span>20h</span>
              <span>30h</span>
              <span>40h</span>
            </div>
          </div>
          
          {/* Phase actuelle */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-950/50 rounded-xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-amber-400" />
                <span className="font-semibold text-amber-100">Phase actuelle</span>
              </div>
              <div className={`text-2xl font-bold ${currentPhase.color} mb-2`}>
                {currentPhase.name}
              </div>
              <p className="text-amber-100/60">{currentPhase.desc}</p>
            </div>
            
            <div className="bg-slate-950/50 rounded-xl p-6 border border-amber-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-6 h-6 text-amber-400" />
                <span className="font-semibold text-amber-100">Couple disponible</span>
              </div>
              <div className="text-2xl font-bold text-amber-400 mb-2">
                {torquePercent}%
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${torquePercent}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Contrôles */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isAnimating 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
              }`}
            >
              {isAnimating ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
              {isAnimating ? 'Arrêter la simulation' : 'Démarrer la simulation'}
            </button>
            
            <button
              onClick={() => setEnergyLevel(100)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-all shadow-lg shadow-amber-500/30"
            >
              <RotateCcw className="w-5 h-5" />
              Remonter complètement
            </button>
            
            <button
              onClick={() => setEnergyLevel(50)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium bg-slate-700 hover:bg-slate-600 text-amber-100 transition-all"
            >
              50%
            </button>
          </div>
        </div>
      </div>

      {/* Les 4 phases expliquées */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
        <h3 className="text-2xl font-bold text-amber-100 mb-6">Le cycle énergétique complet</h3>
        
        <div className="space-y-4">
          {[
            {
              phase: '🔴 Phase 1 : Pleine charge',
              range: '90-100%',
              torque: 'Couple maximal (12 μN·m)',
              desc: 'Juste après le remontage. Attention : le couple trop élevé peut affecter la précision.',
              expert: 'Contrainte maximale dans le ressort : σ = 1400 MPa (85% de σₑ). Zone non-optimale pour l\'isochronisme.'
            },
            {
              phase: '🟢 Phase 2 : Zone utile haute',
              range: '60-90%',
              torque: 'Couple stable (10 μN·m)',
              desc: 'Zone de précision optimale. Le couple reste constant, garantissant une marche régulière.',
              expert: 'Variation de couple < 5%. Amplitude du balancier 280-310°. Meilleur isochronisme. Durée : ~24h.'
            },
            {
              phase: '🔵 Phase 3 : Zone utile basse',
              range: '20-60%',
              torque: 'Couple décroissant (8 μN·m)',
              desc: 'Fonctionnement normal mais couple qui diminue progressivement. La montre reste précise.',
              expert: 'Décroissance linéaire du couple. Amplitude balancier 250-280°. Précision acceptable. Durée : ~14h.'
            },
            {
              phase: '🟠 Phase 4 : Fin de réserve',
              range: '0-20%',
              torque: 'Couple insuffisant (< 6 μN·m)',
              desc: 'Réserve critique. Le mouvement ralentit puis s\'arrête. Il faut remonter !',
              expert: 'Couple < seuil critique. Amplitude < 220°. Arrêt de l\'échappement imminent. Durée restante : ~2h.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`bg-slate-800/50 rounded-xl p-6 border-l-4 transition-all hover:translate-x-2 ${
                idx === 0 ? 'border-red-500' : idx === 1 ? 'border-green-500' : idx === 2 ? 'border-blue-500' : 'border-orange-500'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-amber-100 mb-2">{item.phase}</h4>
                  <div className="flex gap-4 text-sm text-amber-300/60 mb-3">
                    <span>📊 {item.range}</span>
                    <span>⚡ {item.torque}</span>
                  </div>
                  <p className="text-amber-100/80 mb-2">{item.desc}</p>
                  {expertMode && (
                    <p className="text-sm text-amber-300/60 italic">{item.expert}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Données techniques */}
      {expertMode && (
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3">
            <Brain className="w-7 h-7 text-purple-400" />
            Formules et calculs
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="font-bold text-purple-400 mb-3">Énergie stockée</h4>
              <div className="font-mono text-amber-100 text-lg mb-2">E = ½ k x²</div>
              <p className="text-sm text-amber-300/60">
                k = constante de rappel du ressort<br/>
                x = déplacement angulaire<br/>
                E ≈ 0.3 - 0.8 J pour 40-80h
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="font-bold text-purple-400 mb-3">Puissance moyenne</h4>
              <div className="font-mono text-amber-100 text-lg mb-2">P = E / t</div>
              <p className="text-sm text-amber-300/60">
                Pour E = 0.5 J et t = 40h :<br/>
                P = 0.5 / (40 × 3600)<br/>
                P ≈ 3.5 μW (micro-watts)
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="font-bold text-purple-400 mb-3">Contrainte maximale</h4>
              <div className="font-mono text-amber-100 text-lg mb-2">σ = E × e / 2I</div>
              <p className="text-sm text-amber-300/60">
                E = module d'Young (200 GPa)<br/>
                e = épaisseur (0.11 mm)<br/>
                σ ≈ 1400 MPa à pleine charge
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="font-bold text-purple-400 mb-3">Rendement énergétique</h4>
              <div className="font-mono text-amber-100 text-lg mb-2">η = E_utile / E_stockée</div>
              <p className="text-sm text-amber-300/60">
                Pertes par frottement : 8-12%<br/>
                Pertes dans le rouage : 3-5%<br/>
                η ≈ 85-90%
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// =================================================
// SECTION 4 : LES TYPES
// =================================================

function TypesSection({ expertMode }: { expertMode: boolean }) {
  const [selectedType, setSelectedType] = useState(0);
  
  const types = [
    {
      name: 'Barillet Simple',
      emoji: '⚙️',
      description: 'La configuration classique et la plus répandue',
      reserve: '38-42h',
      energy: '0.3-0.4 J',
      diameter: '12-14mm',
      complexity: 3,
      cost: '€',
      pros: ['Simple et fiable', 'Coût réduit', 'Facile à entretenir', 'Éprouvé depuis 200 ans'],
      cons: ['Réserve limitée', 'Couple variable'],
      usage: 'Montres classiques 3 aiguilles, automatiques standards'
    },
    {
      name: 'Double Barillet en Série',
      emoji: '⚙️⚙️',
      description: 'Deux barillets enchaînés pour doubler la réserve',
      reserve: '70-80h',
      energy: '0.6-0.8 J',
      diameter: '2 × 12mm',
      complexity: 6,
      cost: '€€',
      pros: ['Réserve doublée', 'Couple stable plus longtemps', 'Confort d\'utilisation'],
      cons: ['Plus complexe', 'Plus encombrant', 'Coût supérieur'],
      usage: 'Montres haut de gamme, complications'
    },
    {
      name: 'Double Barillet Parallèle',
      emoji: '⚙️|⚙️',
      description: 'Deux barillets côte à côte pour un couple supérieur',
      reserve: '38-42h',
      energy: '0.6-0.8 J',
      diameter: '2 × 12mm',
      complexity: 7,
      cost: '€€€',
      pros: ['Couple doublé', 'Idéal pour chronographes', 'Régularité accrue'],
      cons: ['Encombrement latéral', 'Complexité élevée', 'Coût important'],
      usage: 'Chronographes, complications gourmandes'
    },
    {
      name: 'Barillet Longue Durée',
      emoji: '🔋',
      description: 'Ressort extra-long dans un grand tambour',
      reserve: '5-8 jours',
      energy: '1.2-1.6 J',
      diameter: '16-20mm',
      complexity: 8,
      cost: '€€€€',
      pros: ['Réserve exceptionnelle', 'Prestige technique', 'Moins de remontages'],
      cons: ['Très encombrant', 'Coût prohibitif', 'Complexité maximale'],
      usage: 'Montres de prestige, pièces uniques'
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Sélecteur de types */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-amber-500/30">
        <h2 className="text-3xl font-bold text-amber-100 mb-2 flex items-center gap-3">
          <Target className="w-8 h-8 text-amber-400" />
          Les différentes configurations
        </h2>
        <p className="text-amber-300/60 mb-8">Chaque type répond à des besoins spécifiques</p>
        
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {types.map((type, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedType(idx)}
              className={`p-6 rounded-xl border-2 transition-all ${
                selectedType === idx
                  ? 'border-amber-500 bg-amber-500/10 scale-105 shadow-xl shadow-amber-500/20'
                  : 'border-slate-700 bg-slate-800/50 hover:border-amber-500/50'
              }`}
            >
              <div className="text-5xl mb-3">{type.emoji}</div>
              <div className="font-bold text-amber-100 text-sm">{type.name}</div>
              <div className="text-xs text-amber-300/60 mt-1">{type.reserve}</div>
            </button>
          ))}
        </div>
        
        {/* Détails du type sélectionné */}
        <div className="bg-slate-950/50 rounded-2xl p-8 border border-amber-500/20">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl">{types[selectedType].emoji}</div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-amber-100 mb-2">{types[selectedType].name}</h3>
              <p className="text-lg text-amber-100/80 mb-4">{types[selectedType].description}</p>
              <div className="flex gap-2">
                {[...Array(types[selectedType].complexity)].map((_, i) => (
                  <div key={i} className="w-2 h-6 bg-amber-500 rounded-full" />
                ))}
                {[...Array(10 - types[selectedType].complexity)].map((_, i) => (
                  <div key={i} className="w-2 h-6 bg-slate-700 rounded-full" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/30">
              <div className="text-sm text-green-400 mb-1">Réserve de marche</div>
              <div className="text-2xl font-bold text-amber-100">{types[selectedType].reserve}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/30">
              <div className="text-sm text-blue-400 mb-1">Énergie stockée</div>
              <div className="text-2xl font-bold text-amber-100">{types[selectedType].energy}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl p-4 border border-purple-500/30">
              <div className="text-sm text-purple-400 mb-1">Diamètre</div>
              <div className="text-2xl font-bold text-amber-100">{types[selectedType].diameter}</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Avantages
              </h4>
              <ul className="space-y-2">
                {types[selectedType].pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-100/80">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Inconvénients
              </h4>
              <ul className="space-y-2">
                {types[selectedType].cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-amber-100/80">
                    <span className="text-orange-400 mt-1">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
            <div className="font-bold text-amber-400 mb-2">💡 Utilisation typique</div>
            <p className="text-amber-100/80">{types[selectedType].usage}</p>
          </div>
        </div>
      </div>

      {/* Timeline historique */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
        <h3 className="text-2xl font-bold text-amber-100 mb-6">Évolution historique</h3>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-500/50 to-transparent" />
          
          {[
            { year: '1760', event: 'Invention du remontage par le pendant', icon: '🔑' },
            { year: '1820', event: 'Barillet à bride par Abraham-Louis Breguet', icon: '⚙️' },
            { year: '1931', event: 'Premier remontage automatique moderne (Rolex)', icon: '🔄' },
            { year: '1952', event: 'Ressort Nivaflex antimagnétique', icon: '🧲' },
            { year: '2000', event: 'Généralisation des doubles barillets', icon: '⚙️⚙️' },
            { year: '2015', event: 'Recherches sur ressorts en silicium', icon: '🔬' }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-16 pb-8 group">
              <div className="absolute left-4 w-5 h-5 bg-amber-500 rounded-full border-4 border-slate-900 group-hover:scale-125 transition-transform" />
              <div className="bg-slate-800/50 rounded-xl p-5 border border-amber-500/20 hover:border-amber-500/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="font-bold text-amber-400 text-lg mb-1">{item.year}</div>
                    <p className="text-amber-100/80">{item.event}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =================================================
// SECTION 5 : MAÎTRISE (QUIZ)
// =================================================

function MasterySection({ expertMode }: { expertMode: boolean }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState(0);

  const questions = [
    {
      q: "Quelle est la fonction principale du barillet ?",
      options: [
        "Afficher l'heure",
        "Stocker et distribuer l'énergie mécanique",
        "Réguler la vitesse du balancier",
        "Protéger le mouvement de la poussière"
      ],
      correct: 1,
      explain: {
        simple: "Le barillet est la 'batterie' de la montre. Il stocke l'énergie du remontage et la libère progressivement.",
        expert: "Le barillet convertit l'énergie potentielle élastique (E=½kx²) en énergie cinétique distribuée au rouage avec un rendement de 85-90%."
      }
    },
    {
      q: "Quelle est la réserve de marche typique d'un barillet simple ?",
      options: ["24 heures", "40 heures", "80 heures", "7 jours"],
      correct: 1,
      explain: {
        simple: "Un barillet simple standard offre environ 40 heures, soit presque 2 jours complets sans remontage.",
        expert: "Pour RM=40h avec E=0.4J : P=E/t = 0.4/(40×3600) ≈ 2.8μW de puissance moyenne fournie au rouage."
      }
    },
    {
      q: "Quel matériau moderne est utilisé pour le ressort moteur ?",
      options: ["Acier inoxydable", "Nivaflex (alliage CoCrNi)", "Titane", "Bronze au béryllium"],
      correct: 1,
      explain: {
        simple: "Le Nivaflex est un alliage spécial offrant haute élasticité, résistance à la corrosion et propriétés antimagnétiques.",
        expert: "Nivaflex NiCoCr : σₑ=1600 MPa, E=200 GPa, amagnétique <0.1T, coefficient de dilatation thermique α=12×10⁻⁶/K."
      }
    },
    {
      q: "Quelle est la 'phase utile' du barillet ?",
      options: [
        "Les 10 premières heures après remontage",
        "La zone de couple constant (60-80% de la réserve)",
        "Les dernières heures avant l'arrêt",
        "Tout le cycle de décharge"
      ],
      correct: 1,
      explain: {
        simple: "La phase utile représente 60-80% de la réserve où le couple reste stable, garantissant la meilleure précision.",
        expert: "Zone isochronique : variation de couple <5%, amplitude balancier 280-310°, durée ~24-32h pour un barillet de 40h."
      }
    },
    {
      q: "Comment augmente-t-on la réserve de marche ?",
      options: [
        "En augmentant le diamètre du tambour",
        "En utilisant un ressort plus long et plus fin",
        "En augmentant la fréquence du balancier",
        "En ajoutant plus de rubis"
      ],
      correct: 1,
      explain: {
        simple: "Un ressort plus long stocke plus d'énergie. Plus fin, il permet plus de spires dans le même espace.",
        expert: "E ∝ L×e². Compromis : ressort long (↑E) et fin (↓σ). Limite pratique : e>0.10mm pour éviter adhésion des spires."
      }
    }
  ];

  const handleAnswer = (idx: number) => {
    if (answers[currentQ] !== undefined) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResults(true);
        setEndTime(Date.now());
      }
    }, 2000);
  };

  const score = answers.filter((a, i) => a === questions[i].correct).length;
  const percentage = Math.round((score / questions.length) * 100);
  const timeSpent = Math.round((endTime - startTime) / 1000);

  if (showResults) {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 border border-amber-500/30 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : '📚'}
          </div>
          
          <h2 className="text-4xl font-bold text-amber-100 mb-4">Quiz terminé !</h2>
          
          <div className="inline-block relative mb-8">
            <svg className="w-40 h-40">
              <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-slate-700" />
              <circle 
                cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-amber-500"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-amber-100">{percentage}%</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-amber-400 text-sm mb-1">Score</div>
              <div className="text-2xl font-bold text-amber-100">{score}/{questions.length}</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-amber-400 text-sm mb-1">Temps</div>
              <div className="text-2xl font-bold text-amber-100">{timeSpent}s</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="text-amber-400 text-sm mb-1">Niveau</div>
              <div className="text-2xl font-bold text-amber-100">
                {percentage >= 80 ? 'Expert' : percentage >= 60 ? 'Avancé' : 'Débutant'}
              </div>
            </div>
          </div>
          
          <p className="text-lg text-amber-100/80 mb-8">
            {percentage >= 80 && "🎉 Excellent ! Vous maîtrisez parfaitement le barillet et le ressort moteur."}
            {percentage >= 60 && percentage < 80 && "👍 Très bien ! Quelques révisions et vous serez au top."}
            {percentage < 60 && "📖 Continuez à apprendre ! Relisez les chapitres et réessayez."}
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setAnswers([]);
                setCurrentQ(0);
                setShowResults(false);
              }}
              className="flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold transition-all shadow-lg shadow-amber-500/30"
            >
              <RotateCcw className="w-5 h-5" />
              Recommencer
            </button>
            <button className="flex items-center gap-2 px-8 py-4 bg-slate-700 hover:bg-slate-600 text-amber-100 rounded-xl font-bold transition-all">
              <Share2 className="w-5 h-5" />
              Partager
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentQ];
  const isAnswered = answers[currentQ] !== undefined;

  return (
    <div className="space-y-8">
      
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-amber-500/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-amber-100 flex items-center gap-3">
            <Brain className="w-8 h-8 text-amber-400" />
            Testez votre maîtrise
          </h2>
          <div className="flex items-center gap-2 text-amber-400">
            <Timer className="w-5 h-5" />
            <span className="font-mono">{Math.round((Date.now() - startTime) / 1000)}s</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-amber-300/60 mb-2">
            <span>Question {currentQ + 1}/{questions.length}</span>
            <span>Score : {score}/{currentQ}</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-slate-950/50 rounded-2xl p-8 mb-6 border border-amber-500/20">
          <h3 className="text-2xl font-bold text-amber-100 mb-6">{q.q}</h3>
          
          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = answers[currentQ] === idx;
              const isCorrect = idx === q.correct;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
                    !isAnswered
                      ? 'border-slate-700 hover:border-amber-500 hover:bg-amber-500/5'
                      : isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : isSelected
                      ? 'border-red-500 bg-red-500/10'
                      : 'border-slate-700 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      !isAnswered
                        ? 'bg-slate-700 text-amber-400'
                        : isCorrect
                        ? 'bg-green-500 text-white'
                        : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-700 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-amber-100 flex-1">{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explication */}
        {isAnswered && (
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl p-6 border border-blue-500/30 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-400 mb-2">Explication</h4>
                <p className="text-amber-100/80">
                  {expertMode ? q.explain.expert : q.explain.simple}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ressources complémentaires */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-3xl p-8 border border-amber-500/20">
        <h3 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3">
          <BookOpen className="w-7 h-7 text-amber-400" />
          Pour aller plus loin
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-500/20">
            <h4 className="font-bold text-amber-400 mb-4">📚 Ouvrages recommandés</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">"Théorie d'Horlogerie"</div>
                  <div className="text-sm text-amber-300/60">Reymondin et al.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">"Watchmaking"</div>
                  <div className="text-sm text-amber-300/60">George Daniels</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">"The Art of Breguet"</div>
                  <div className="text-sm text-amber-300/60">George Daniels</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-amber-500/20">
            <h4 className="font-bold text-amber-400 mb-4">🎓 Normes techniques</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">DIN 8306</div>
                  <div className="text-sm text-amber-300/60">Barillets de montres mécaniques</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">NIHS 20-10</div>
                  <div className="text-sm text-amber-300/60">Ressorts moteurs - Spécifications</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-500">•</span>
                <div>
                  <div className="font-semibold text-amber-100">ISO 3159</div>
                  <div className="text-sm text-amber-300/60">Montres à échappement libre</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-semibold transition-all">
            <Wrench className="w-5 h-5" />
            Exercices pratiques
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-amber-100 rounded-lg font-semibold transition-all">
            <Eye className="w-5 h-5" />
            Vidéos techniques
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-amber-100 rounded-lg font-semibold transition-all">
            <BookOpen className="w-5 h-5" />
            Documentation PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// Styles pour les animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
