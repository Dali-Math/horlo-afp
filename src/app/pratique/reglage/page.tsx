"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Settings, Clock, Wrench, Target, Zap, Award, ChevronRight, PlayCircle, Activity, Gauge, RotateCw, Eye } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReglagePage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [isLoading, setIsLoading] = useState(true);
  const [simulatedOffset, setSimulatedOffset] = useState(0);
  const [hoveredTool, setHoveredTool] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const adjustRegulation = (direction: 'advance' | 'retard') => {
    setSimulatedOffset(prev => direction === 'advance' ? prev + 5 : prev - 5);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-x-hidden">
      {/* Loader animé */}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-black z-50 flex items-center justify-center transition-opacity duration-500">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-amber-400/20 border-t-amber-400 animate-spin"></div>
            <Clock className="w-12 h-12 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>
      )}

      {/* Navigation sticky */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-amber-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/pratique"
              className="inline-flex items-center gap-3 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-400/10 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-400/20 transition-colors">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              </div>
              <span className="font-semibold">Retour à la pratique</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 text-amber-600 dark:text-amber-400/60 text-sm">
              <div className="flex items-center gap-1">
                {['introduction', 'principes', 'outils', 'techniques', 'conseils', 'glossaire'].map((section) => (
                  <div key={section} className={`w-1.5 h-1.5 rounded-full ${activeSection === section ? 'bg-amber-600 dark:bg-amber-400' : 'bg-amber-300 dark:bg-amber-400/30'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        {/* Hero Section */}
        <header className="text-center mb-24 md:mb-32 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 dark:from-amber-400 dark:via-amber-500 dark:to-amber-600 bg-clip-text text-transparent mb-6">
            Réglage & Précision
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Maîtrisez l'art subtil de la régulation horlogère et comprenez les secrets de la précision mécanique
          </p>
          <div className="flex justify-center gap-6 text-amber-600 dark:text-amber-400/70">
            <Gauge className="w-12 h-12 animate-pulse" />
            <Activity className="w-12 h-12 animate-pulse" />
            <RotateCw className="w-12 h-12 animate-pulse" />
          </div>
        </header>

        {/* Table des matières interactive */}
        <aside className="mb-20 bg-white/60 dark:bg-neutral-800/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 dark:border-amber-500/30 shadow-2xl">
          <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-8 flex items-center gap-4 justify-center">
            <BookOpen className="w-8 h-8" />
            Table des matières interactive
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "introduction", label: "Introduction vidéo", icon: "📺", color: "from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-600" },
              { id: "principes", label: "Principes fondamentaux", icon: "⚙️", color: "from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-600" },
              { id: "outils", label: "Outils du réglage", icon: "🛠️", color: "from-yellow-600 to-yellow-400 dark:from-yellow-400 dark:to-yellow-600" },
              { id: "techniques", label: "Techniques avancées", icon: "🎯", color: "from-red-600 to-red-400 dark:from-red-400 dark:to-red-600" },
              { id: "conseils", label: "Conseils pratiques", icon: "💡", color: "from-green-600 to-green-400 dark:from-green-400 dark:to-green-600" },
              { id: "glossaire", label: "Glossaire technique", icon: "📚", color: "from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-600" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`group relative overflow-hidden bg-gradient-to-br ${activeSection === item.id ? item.color : 'from-white to-slate-100 dark:from-neutral-800 dark:to-neutral-900'} 
                  rounded-2xl p-6 border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 
                  ${activeSection === item.id ? 'scale-105 shadow-2xl' : 'hover:-translate-y-2 hover:shadow-xl'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all duration-300 
                    ${activeSection === item.id ? 'bg-white/20' : 'bg-white/80 dark:bg-white/5 group-hover:bg-white/10'}`}>
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`text-lg font-bold transition-all ${activeSection === item.id ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300'}`}>
                      {item.label}
                    </h3>
                    {activeSection === item.id && (
                      <p className="text-sm text-white/70 mt-1">En cours de lecture</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Simulateur de réglage interactif */}
        <section className="mb-24 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 dark:from-amber-500/5 dark:via-orange-500/5 dark:to-red-500/5 rounded-3xl p-8 border border-amber-500/30">
          <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-6 text-center">Simulateur de réglage</h2>
          <div className="bg-white dark:bg-black rounded-2xl p-8 border border-amber-500/40">
            <div className="flex items-center justify-between mb-8">
              <div className="text-center">
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">Déviation actuelle</p>
                <p className={`text-4xl font-bold ${simulatedOffset > 0 ? 'text-red-600 dark:text-red-400' : simulatedOffset < 0 ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {simulatedOffset > 0 ? '+' : ''}{simulatedOffset} s/j
                </p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 text-amber-600 dark:text-amber-400 animate-pulse mx-auto" />
                <p className="text-slate-600 dark:text-gray-400 text-sm mt-2">Objectif : ±0 s/j</p>
              </div>
              <div className="text-center">
                <p className="text-slate-600 dark:text-gray-400 text-sm mb-1">Précision</p>
                <p className="text-4xl font-bold text-amber-600 dark:text-amber-400">
                  {simulatedOffset === 0 ? '100%' : Math.max(0, 100 - Math.abs(simulatedOffset) * 5) + '%'}
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => adjustRegulation('advance')}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                ➕ Avance (+5s/j)
              </button>
              <button
                onClick={() => adjustRegulation('retard')}
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                ➖ Retard (-5s/j)
              </button>
              <button
                onClick={() => setSimulatedOffset(0)}
                className="bg-amber-600 hover:bg-amber-500 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-110"
              >
                🔄 Réinitialiser
              </button>
            </div>
          </div>
        </section>

        {/* Section Vidéo */}
        <section id="introduction" className="mb-24 scroll-mt-24">
          <div className="relative bg-white dark:bg-black rounded-3xl overflow-hidden shadow-2xl border border-amber-500/40">
            <div className="relative" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/HVxT1kQ99kg"
                title="Tutoriel Horlogerie : Comment régler la marche d'un mouvement"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="bg-gradient-to-r from-white to-slate-100 dark:from-neutral-900 dark:to-neutral-800 p-8">
              <div className="flex items-center gap-4 mb-3">
                <PlayCircle className="w-8 h-8 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">Guide vidéo complet</span>
              </div>
              <p className="text-slate-700 dark:text-gray-300 text-lg">
                Plongez dans les mécanismes subtiles du réglage de précision avec un maître horloger
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-6 text-amber-600 dark:text-amber-400/70">
                <span className="flex items-center gap-2"><Clock className="w-5 h-5" /> 15 minutes</span>
                <span className="flex items-center gap-2"><Eye className="w-5 h-5" /> 12k vues</span>
                <span className="flex items-center gap-2">🎧 Français</span>
                <span className="flex items-center gap-2">📺 Sous-titres disponibles</span>
              </div>
            </div>
          </div>
        </section>

        {/* Principes Fondamentaux */}
        <section id="principes" className="mb-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-12 flex items-center gap-6 justify-center">
            <Settings className="w-10 h-10" />
            Principes fondamentaux du réglage
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-black" />,
                title: "Le Balancier-Spiral",
                content: "Cœur du régulateur, ce système oscille à une fréquence précise (2,5 à 5 Hz). Sa période détermine la marche de la montre.",
                specs: "Fréquence : 28 800 alt/h (4 Hz)",
                details: "Le spiral, en alliage Nivarox, résiste aux variations thermiques et magnétiques. Sa longueur active est la clé de la précision.",
                color: "from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-600"
              },
              {
                icon: <Target className="w-10 h-10 text-black" />,
                title: "La Raquette d'Ajustement",
                content: "Petit levier qui modifie la longueur active du spiral. Déplacement micrométrique pour ajustements fins.",
                specs: "Précision : 1/4 tour ≈ 10s/j",
                details: "Vers A (Avance) = raccourcit le spiral. Vers R (Retard) = allonge le spiral. Chaque clic est crucial.",
                color: "from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-600"
              },
              {
                icon: <Activity className="w-10 h-10 text-black" />,
                title: "L'Amplitude & l'Isochronisme",
                content: "Angle de rotation du balancier (270-320° idéal). Indique la santé du mouvement et la qualité du lubrifiant.",
                specs: "Optimal : 280-300° horizontale",
                details: "Amplitude faible = usure ou séchage. Variations de position doivent être < 30° pour un chronomètre.",
                color: "from-red-600 to-red-400 dark:from-red-400 dark:to-red-600"
              }
            ].map((card, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-white to-slate-100 dark:from-neutral-800/60 dark:to-neutral-900/60 rounded-2xl p-8 border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl"
                onMouseEnter={() => setHoveredTool(index)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color} opacity-0 hover:opacity-100 transition-opacity`}></div>
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 transition-transform ${hoveredTool === index ? 'rotate-12 scale-110' : ''}`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{card.title}</h3>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-4">{card.content}</p>
                <div className="text-sm text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/10 rounded-lg p-3 mb-3 font-semibold">
                  {card.specs}
                </div>
                <div className={`transition-all duration-500 ${expandedCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{card.details}</p>
                </div>
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className="mt-4 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 text-sm font-semibold"
                >
                  {expandedCard === index ? '▲ Moins de détails' : '▼ Plus de détails'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Outils du réglage */}
        <section id="outils" className="mb-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-12 flex items-center gap-6 justify-center">
            <Wrench className="w-10 h-10" />
            Outils essentiels du réglage
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "Chronocomparateur professionnel",
                description: "Appareil de mesure électronique ultra-précis. Analyse la fréquence, l'amplitude et l'erreur de marche en temps réel.",
                features: ["Microphone à contact", "Affichage graphique", "6 positions testables", "Précision 0.1s/j"],
                price: "1 500€ - 5 000€"
              },
              {
                name: "Loupe binoculaire stéréoscopique",
                description: "Vision 3D sans fatigue pour observer le spiral et la raquette. Indispensable pour les ajustements fins.",
                features: ["Grossissement 10x-20x", "Éclairage LED intégré", "Réglage dioptrique", "Confort prolongé"],
                price: "300€ - 1 200€"
              },
              {
                name: "Tourne-raquette micro-métrique",
                description: "Outil de précision pour déplacer la raquette sans endommager le spiral. Fabrication suisse.",
                features: ["Pointe diamantée", "Poignée ergonomique", "Gravure des positions", "Acier inoxydable"],
                price: "150€ - 300€"
              },
              {
                name: "Dé-magnétiseur professionnel",
                description: "Élimine l'aimantation du spiral, cause n°1 des variations de marche. Procédure automatisée.",
                features: ["Champ pulsé", "5 cycles automatiques", "Compatible tout mouvement", "Certification COSC"],
                price: "200€ - 600€"
              }
            ].map((tool, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-100 dark:from-neutral-800/60 dark:to-neutral-900/60 rounded-2xl p-8 border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/50 transition-all duration-500 hover:translate-x-4 hover:shadow-2xl">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">{tool.name}</h3>
                  <span className="text-sm text-amber-700 dark:text-amber-300 font-semibold bg-amber-100 dark:bg-amber-500/10 px-3 py-1 rounded-full">
                    {tool.price}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed mb-6">{tool.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline des techniques */}
        <section id="techniques" className="mb-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-12 text-center">
            Processus de réglage chronométrique
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400"></div>
            {[
              { step: "Diagnostic initial", desc: "Mesure sur 24h en 3 positions", time: "Jour 1" },
              { step: "Analyse des résultats", desc: "Identification des positions problématiques", time: "Jour 1" },
              { step: "Ajustement préliminaire", desc: "Déplacement de la raquette par 1/4 tours", time: "Jour 2" },
              { step: "Validation", desc: "Re-mesure et comparaison", time: "Jour 2-3" },
              { step: "Micro-ajustements", desc: "Finitions au 1/8 de tour", time: "Jour 3-4" },
              { step: "Certification", desc: "Tests COSC (optionnel)", time: "Jour 5" }
            ].map((item, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-gradient-to-br from-white to-slate-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl p-6 border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-2">{item.step}</h3>
                    <p className="text-slate-700 dark:text-gray-300">{item.desc}</p>
                    <span className="text-sm text-amber-700 dark:text-amber-300 mt-2 block">{item.time}</span>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-amber-600 dark:bg-amber-400 rounded-full border-4 border-white dark:border-neutral-900 shadow-lg"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Conseils pratiques avec accordéons */}
        <section id="conseils" className="mb-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-12 text-center">
            Conseils pratiques d'horloger
          </h2>
          
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5 rounded-3xl p-8 border border-amber-500/30">
            {[
              { icon: "🎯", title: "Gentillesse avant tout", content: "La raquette est un organe délicat. Utilisez toujours un tourne-raquette adapté et n'appliquez jamais de force. Un mouvement doux et précis vaut mieux qu'une correction brutale qui endommagerait le spiral." },
              { icon: "🌡️", title: "Environnement contrôlé", content: "Effectuez vos réglages à température constante (20°C ±2°C). Les variations thermiques modifient l'élasticité du spiral et faussent vos mesures. Évitez les courants d'air et la lumière directe du soleil." },
              { icon: "🧲", title: "Dé-magnétisation systématique", content: "Avant chaque réglage, vérifiez l'aimantation. 70% des montres qui arrivent en atelier sont magnétisées. Un spiral aimanté ne peut pas être réglé correctement." },
              { icon: "💧", title: "Lubrification parcimonieuse", content: "Trop de lubrifiant = amortissement du balancier. Trop peu = usure accélérée. Une goutte de 0.5mm est suffisante sur chaque pivot. Utilisez des huiles synthétiques modernes." },
              { icon: "📊", title: "Documentation rigoureuse", content: "Notez toutes vos mesures initiales, chaque ajustement, les variations de position. C'est la seule façon de progresser et de comprendre le comportement de chaque mouvement." }
            ].map((tip, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <button
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                  className="w-full flex items-center gap-6 text-left p-6 bg-white dark:bg-neutral-900/50 hover:bg-amber-100 dark:hover:bg-amber-500/10 rounded-2xl transition-all duration-300 hover:translate-x-4 border border-transparent hover:border-amber-500/30"
                >
                  <div className="text-4xl">{tip.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tip.title}</h3>
                    <div className={`text-slate-600 dark:text-gray-400 mt-2 transition-all duration-500 ${expandedCard === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <p className="leading-relaxed">{tip.content}</p>
                    </div>
                  </div>
                  <ChevronRight className={`w-7 h-7 text-amber-600 dark:text-amber-400 transition-transform duration-300 ${expandedCard === index ? 'rotate-90' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Glossaire */}
        <section id="glossaire" className="mb-24 scroll-mt-24">
          <h2 className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-12 flex items-center gap-6 justify-center">
            <Award className="w-10 h-10" />
            Glossaire technique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { term: "Isochronisme", def: "Capacité du spiral à osciller à la même fréquence quel que soit l'amplitude. Critère de qualité d'un régulateur." },
              { term: "Béat", def: "Chaque oscillation du balancier (aller-retour). 28 800 alternances = 14 400 béats par heure." },
              { term: "Position", def: "Orientation de la montre lors du test. 6 positions pour la certification chronomètre." },
              { term: "Chronomètre", def: "Montre certifiée par le COSC après 15 jours de tests. Précision : -4/+6 s/j." },
              { term: "Échappement", def: "Mécanisme qui transmet l'énergie par impulsions discretes au balancier." },
              { term: "Inertie", def: "Propriété du balancier à résister aux changements de vitesse. Influence la période d'oscillation." },
              { term: "Nivarox", def: "Alliage anti-magnétique utilisé pour les spiraux. Compose 85% des spiraux modernes." },
              { term: "COSC", def: "Contrôle Officiel Suisse des Chronomètres. Organisme de certification des chronomètres." },
              { term: "Amplitude", def: "Angle de rotation du balancier entre deux points extrêmes. Se mesure en degrés." },
              { term: "Raquette", def: "Levier d'ajustement de la longueur du spiral. Le plus petit déplacement change la marche." }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-100 dark:from-neutral-800/60 dark:to-neutral-900/60 rounded-2xl p-6 border border-slate-200 dark:border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-3">{item.term}</h3>
                <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed">{item.def}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative text-center bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 rounded-3xl p-16 border border-amber-500/50 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à devenir régleur ?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              La précision horlogère est un art qui s'acquiert avec la pratique, la patience et la compréhension des principes fondamentaux.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/pratique"
                className="inline-flex items-center gap-3 bg-white text-black font-bold px-8 py-4 rounded-full hover:shadow-2xl transition-all duration-300 group"
              >
                <span>Passer à la pratique</span>
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Link>
              <Link
                href="/theorie/mouvements"
                className="inline-flex items-center gap-3 border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                <BookOpen className="w-6 h-6" />
                <span>Approfondir la théorie</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
