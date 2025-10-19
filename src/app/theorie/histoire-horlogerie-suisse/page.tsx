import React, { useState, useEffect, useRef } from 'react';
import { Clock, MapPin, Factory, Award, Users, BookOpen, Sparkles, Mountain, Globe, TrendingUp, ChevronLeft, Star, CheckCircle, Zap, Target, Trophy, Rocket, Gem, Crown, Play, Pause, Volume2, Eye, Heart, Share2, Download, Filter, Search, ArrowRight, Compass, Layers, Box, Radio } from 'lucide-react';

export default function HistoireHorlogerieSuisse() {
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredManufacture, setHoveredManufacture] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState('immersive');
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentYear, setCurrentYear] = useState(1541);
  const [showComparison, setShowComparison] = useState(false);
  const [quiz, setQuiz] = useState({ active: false, score: 0, question: 0 });
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / docHeight) * 100);
    };
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation automatique de la timeline
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentYear(prev => {
          if (prev >= 1983) return 1541;
          if (prev < 1685) return 1685;
          if (prev < 1740) return 1740;
          if (prev < 1800) return 1800;
          if (prev < 1929) return 1929;
          return 1970;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${0.5 + Math.random() * 0.5})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  const timelineData = [
    {
      id: 1541, year: '1541', era: 'Renaissance', color: 'blue',
      icon: Users, emoji: '⛪',
      title: 'GENÈSE CALVINISTE',
      subtitle: 'La révolution religieuse crée l\'horlogerie',
      description: 'Calvin bannit les ornements → Orfèvres deviennent horlogers',
      impact: 'FONDATEUR',
      stats: { artisans: 100, ateliers: 20, production: '500/an' },
      keyFigures: ['Jean Calvin', 'Orfèvres genevois'],
      innovations: ['Boîtes de montres ornées', 'Premier établissage'],
      funFact: '💎 Les premières montres étaient des bijoux avant d\'être précises',
      image: '🏛️',
      quiz: 'Pourquoi les orfèvres se sont reconvertis ?',
      details: [
        '📜 Règlement 1566: Fin des objets religieux catholiques',
        '💍 Boîtes de montres = nouveaux bijoux luxueux',
        '🎨 Naissance horlogerie d\'art genevoise',
        '⚖️ Contournement astucieux des lois calvinistes'
      ]
    },
    {
      id: 1685, year: '1685', era: 'Expansion', color: 'indigo',
      icon: Mountain, emoji: '🏔️',
      title: 'DIASPORA HUGUENOTE',
      subtitle: 'L\'exode français enrichit la Suisse',
      description: 'Révocation Édit de Nantes → 5000 réfugiés qualifiés',
      impact: 'EXPLOSION',
      stats: { refugies: 5000, villes: 12, croissance: '+400%' },
      keyFigures: ['Réfugiés huguenots', 'Abraham-Louis Perrelet'],
      innovations: ['Expansion Arc jurassien', 'Réseaux commerciaux'],
      funFact: '🇫🇷 La France perd son élite, la Suisse gagne un empire',
      image: '⛰️',
      quiz: 'Combien de huguenots ont fui vers la Suisse ?',
      details: [
        '👨‍👩‍👧‍👦 5000+ artisans qualifiés arrivent',
        '💰 Apport capital + savoir-faire + réseaux',
        '🗺️ De Genève à Schaffhouse: route horlogère',
        '⚡ Éthique protestante: précision & persévérance'
      ]
    },
    {
      id: 1740, year: '1740', era: 'Ruralisation', color: 'green',
      icon: Factory, emoji: '🏡',
      title: 'VALLÉE DE JOUX',
      subtitle: 'Les fermes deviennent manufactures',
      description: 'Paysans-horlogers: été agriculture, hiver horlogerie',
      impact: 'INDUSTRIEL',
      stats: { fermes: 26, familles: 200, pieces: '10K/an' },
      keyFigures: ['Combiers', 'Famille LeCoultre'],
      innovations: ['Fermes horlogères', 'Établissage familial'],
      funFact: '❄️ Les longs hivers ont créé la haute horlogerie',
      image: '🏔️',
      quiz: 'Combien de fermes horlogères historiques existent encore ?',
      details: [
        '🏠 26 fermes historiques avec grandes fenêtres',
        '⚒️ Tradition du fer → précision mécanique',
        '🌾 Agriculture été / Horlogerie hiver',
        '👨‍👩‍👧 Transmission familiale du savoir-faire'
      ]
    },
    {
      id: 1800, year: '1800-1900', era: 'Âge d\'Or', color: 'amber',
      icon: Award, emoji: '👑',
      title: 'SIÈCLE DES GÉNIES',
      subtitle: 'Breguet, complications & domination mondiale',
      description: 'Tourbillon, chronographe, répétition minutes',
      impact: 'LÉGENDE',
      stats: { inventions: 50, brevets: 200, exports: '1M/an' },
      keyFigures: ['A-L. Breguet', 'Patek', 'Philippe'],
      innovations: ['Tourbillon (1801)', 'Chronographe', 'Quantième perpétuel'],
      funFact: '🌙 Napoléon, Marie-Antoinette, Victoria: clients Breguet',
      image: '⚙️',
      quiz: 'Quelle complication compense la gravité ?',
      details: [
        '🌪️ Tourbillon: Chef-d\'œuvre anti-gravité',
        '⏱️ Chronographe: Précision au 1/5 seconde',
        '📅 Quantième perpétuel automatique',
        '🔔 Répétition minutes: Sonnerie mécanique'
      ]
    },
    {
      id: 1929, year: '1929-1945', era: 'Crise', color: 'red',
      icon: TrendingUp, emoji: '📉',
      title: 'GRANDE DÉPRESSION',
      subtitle: 'Union ou disparition',
      description: 'SSIH + ASUAG: La survie par la fusion',
      impact: 'SURVIVAL',
      stats: { faillites: 1000, fusions: 15, emplois: '-50%' },
      keyFigures: ['Fondateurs SSIH', 'Direction ASUAG'],
      innovations: ['Consolidation industrielle', 'Groupes horlogers'],
      funFact: '💪 La crise a forgé les géants d\'aujourd\'hui',
      image: '🤝',
      quiz: 'Quels groupes ont fusionné pour survivre ?',
      details: [
        '🏢 SSIH (1930): Omega + Tissot + Lemania',
        '🏭 ASUAG (1931): 15 marques + ETA',
        '📊 Mutualisation ressources & expertises',
        '🛡️ Protection contre concurrence étrangère'
      ]
    },
    {
      id: 1970, year: '1970-1983', era: 'Renaissance', color: 'purple',
      icon: Rocket, emoji: '🚀',
      title: 'RÉVOLUTION SWATCH',
      subtitle: 'Du désastre au triomphe',
      description: 'Crise quartz → Swatch sauve tout',
      impact: 'PHOENIX',
      stats: { perte: '-70%', comeback: '+300%', montres: '100M' },
      keyFigures: ['Nicolas Hayek', 'Ernst Thomke'],
      innovations: ['Swatch', 'Quartz suisse', 'Marketing moderne'],
      funFact: '⌚ Une montre plastique à 50 CHF a sauvé le luxe',
      image: '🎨',
      quiz: 'Qui est le visionnaire derrière Swatch ?',
      details: [
        '📉 50%→15% parts marché (1970-1983)',
        '💡 Nicolas Hayek: Vision révolutionnaire',
        '🎨 Swatch: Mode + technologie + prix',
        '🏆 Retour #1 mondial en 10 ans'
      ]
    }
  ];

  const worldMap = {
    suisse: { x: 50, y: 45, size: 40, color: 'blue', label: 'SUISSE 🇨🇭', value: '50%' },
    japon: { x: 85, y: 50, size: 25, color: 'red', label: 'Japon 🇯🇵', value: '15%' },
    allemagne: { x: 48, y: 42, size: 20, color: 'yellow', label: 'Allemagne 🇩🇪', value: '8%' },
    usa: { x: 20, y: 48, size: 18, color: 'purple', label: 'USA 🇺🇸', value: '5%' },
    france: { x: 46, y: 46, size: 15, color: 'pink', label: 'France 🇫🇷', value: '3%' }
  };

  const innovations3D = [
    { year: 1801, name: 'Tourbillon', icon: '🌪️', genius: 'Breguet', wow: 'Défie la gravité', color: 'blue' },
    { year: 1820, name: 'Chronographe', icon: '⏱️', genius: 'Rieussec', wow: '1/100 seconde', color: 'green' },
    { year: 1867, name: 'Répétition', icon: '🔔', genius: 'Diverses', wow: 'Sonnerie magique', color: 'purple' },
    { year: 1889, name: 'Quantième', icon: '📅', genius: 'Collectif', wow: 'Calendrier éternel', color: 'amber' },
    { year: 1969, name: 'Quartz', icon: '💎', genius: 'CEH/Seiko', wow: 'Précision atomique', color: 'red' },
    { year: 1983, name: 'Swatch', icon: '🎨', genius: 'Hayek', wow: 'Art portable', color: 'pink' },
  ];

  const legendaryWatches = [
    { brand: 'Patek Philippe', model: 'Calatrava', year: 1932, value: '∞', icon: '👑', fact: 'La plus désirable' },
    { brand: 'Rolex', model: 'Submariner', year: 1953, value: '300m', icon: '🌊', fact: 'Plongée légendaire' },
    { brand: 'Omega', model: 'Speedmaster', year: 1969, value: '🌕', icon: '🚀', fact: 'Sur la Lune' },
    { brand: 'Audemars Piguet', model: 'Royal Oak', year: 1972, value: 'Icône', icon: '⚡', fact: 'Révolution acier' },
  ];

  const quizQuestions = [
    { q: 'Qui a inventé le tourbillon ?', a: ['Breguet', 'Patek', 'Rolex', 'Omega'], correct: 0 },
    { q: 'En quelle année Calvin a-t-il banni les ornements ?', a: ['1541', '1685', '1740', '1800'], correct: 0 },
    { q: 'Combien de fermes horlogères à Vallée de Joux ?', a: ['10', '26', '50', '100'], correct: 1 },
    { q: 'Qui a sauvé l\'horlogerie suisse dans les années 80 ?', a: ['Rolex', 'Swatch', 'Omega', 'Patek'], correct: 1 }
  ];

  const currentPeriod = timelineData.find(p => p.id === currentYear) || timelineData[0];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />

      {/* Cursor personnalisé */}
      <div 
        className="fixed w-8 h-8 border-2 border-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
        style={{ 
          left: mousePos.x - 16, 
          top: mousePos.y - 16,
          transform: hoveredManufacture ? 'scale(2)' : 'scale(1)'
        }}
      />

      {/* Progress bar ultra-design */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 shadow-lg shadow-blue-500/50"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header flottant avec glassmorphism */}
      <header className="fixed top-2 left-4 right-4 z-40 bg-black/40 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/theorie" className="flex items-center gap-2 text-gray-400 hover:text-white transition-all group px-4 py-2 rounded-xl hover:bg-white/5">
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Retour</span>
              </a>
              <div className="h-8 w-px bg-gray-700" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center animate-pulse">
                    <Clock className="w-7 h-7" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight">HorloLearn</h1>
                  <p className="text-xs text-gray-500">Excellence Suisse</p>
                </div>
              </div>
            </div>

            {/* Navigation moderne */}
            <div className="hidden md:flex items-center gap-2 bg-gray-900/50 p-1 rounded-2xl">
              {[
                { id: 'immersive', icon: Box, label: 'Immersif' },
                { id: 'timeline', icon: Radio, label: 'Timeline' },
                { id: 'map', icon: Compass, label: 'Carte' },
                { id: 'quiz', icon: Target, label: 'Quiz' }
              ].map(view => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    activeView === view.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <view.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{view.label}</span>
                </button>
              ))}
            </div>

            {/* Actions rapides */}
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all relative">
                <Heart className="w-5 h-5" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all font-medium flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO IMMERSIF ULTRA */}
      {activeView === 'immersive' && (
        <>
          <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12">
            {/* Background 3D grid */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 2px, transparent 2px)',
                  backgroundSize: '100px 100px',
                  transform: `perspective(1000px) rotateX(60deg) translateZ(-200px) translateY(${scrollY * 0.3}px)`
                }}
              />
            </div>

            {/* Particules 3D flottantes */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
              {/* Badge animé */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 px-6 py-3 rounded-full backdrop-blur-sm animate-pulse">
                  <Sparkles className="w-6 h-6 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    500+ Ans d'Excellence Absolue
                  </span>
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
              </div>

              {/* Titre MEGA */}
              <h1 className="text-center mb-12">
                <div className="text-8xl md:text-[12rem] font-black leading-none mb-4 tracking-tighter">
                  <span 
                    className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse"
                    style={{ 
                      textShadow: '0 0 80px rgba(59, 130, 246, 0.5)',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  >
                    SWISS
                  </span>
                </div>
                <div className="text-6xl md:text-8xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent">
                    WATCHMAKING
                  </span>
                </div>
              </h1>

              {/* Description épique */}
              <p className="text-center text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto mb-16 leading-relaxed">
                De l'<span className="text-blue-400 font-bold">artisanat genevois</span> du XVIe siècle 
                à la <span className="text-purple-400 font-bold">domination mondiale</span> absolue.
                <br />
                <span className="text-sm text-gray-600">Une saga de 500 ans de génie, passion & excellence</span>
              </p>

              {/* Mega Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
                {[
                  { value: '21.7', unit: 'Milliards CHF', label: 'Exports 2019', icon: TrendingUp, color: 'from-green-500 to-emerald-600', gradient: 'green' },
                  { value: '500', unit: 'Ans', label: 'd\'Histoire', icon: Clock, color: 'from-blue-500 to-cyan-600', gradient: 'blue' },
                  { value: '#1', unit: 'Mondial', label: 'Haute Horlogerie', icon: Crown, color: 'from-yellow-500 to-orange-600', gradient: 'yellow' },
                  { value: '95%', unit: 'Luxe', label: 'Parts de marché', icon: Gem, color: 'from-purple-500 to-pink-600', gradient: 'purple' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="group relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:scale-110 cursor-pointer overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <stat.icon className={`w-12 h-12 mb-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-125 transition-transform`} />
                    <div className={`text-5xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{stat.unit}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                    
                    {/* Barre de progression animée */}
                    <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${stat.color} animate-pulse`}
                        style={{ width: '100%', animation: `slideIn 1.5s ease-out ${i * 0.2}s both` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveView('timeline')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl font-bold text-lg transition-all hover:scale-105 flex items-center gap-3 shadow-2xl shadow-blue-500/50"
                >
                  <Play className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  <span>Explorer la Timeline</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button
                  onClick={() => setActiveView('quiz')}
                  className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-2xl font-bold text-lg transition-all hover:scale-105 flex items-center gap-3"
                >
                  <Target className="w-6 h-6" />
                  <span>Testez vos connaissances</span>
                </button>

                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-2xl font-bold text-lg transition-all hover:scale-105 flex items-center gap-3"
                >
                  <Compass className="w-6 h-6" />
                  <span>Carte Mondiale</span>
                </button>
              </div>
            </div>

            <style>{`
              @keyframes slideIn {
                from { width: 0; }
                to { width: 100%; }
              }
            `}</style>
          </section>

          {/* Section innovations scrollable */}
          <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-6xl font-black text-center mb-16">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  INNOVATIONS LÉGENDAIRES
                </span>
              </h2>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
                {innovations3D.map((innov, i) => (
                  <div
                    key={i}
                    className="group relative bg-gradient-to-br from-gray-900 to-black p-6 rounded-3xl border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:scale-110 cursor-pointer"
                  >
                    <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{innov.icon}</div>
                    <div className="text-sm text-gray-500 mb-2">{innov.year}</div>
                    <div className="font-bold text-lg mb-1">{innov.name}</div>
                    <div className="text-xs text-gray-600 mb-2">{innov.genius}</div>
                    <div className="text-xs text-blue-400">{innov.wow}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Montres légendaires */}
          <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-6xl font-black text-center mb-16">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MONTRES ICONIQUES
                </span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {legendaryWatches.map((watch, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredManufacture(watch.brand)}
                    onMouseLeave={() => setHoveredManufacture(null)}
                    className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border-2 border-gray-800 hover:border-blue-500 transition-all duration-500 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-6xl mb-4">{watch.icon}</div>
                    <div className="text-2xl font-black mb-2">{watch.brand}</div>
                    <div className="text-blue-400 font-bold mb-2">{watch.model}</div>
                    <div className="text-sm text-gray-500 mb-4">Année {watch.year}</div>
                    <div className="text-3xl font-black text-yellow-400 mb-2">{watch.value}</div>
                    <div className="text-xs text-gray-600">{watch.fact}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* TIMELINE INTERACTIVE */}
      {activeView === 'timeline' && (
        <section className="pt-32 pb-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  VOYAGE DANS LE TEMPS
                </span>
              </h2>
              <p className="text-gray-400 text-xl">Explorez 500 ans d'histoire</p>
            </div>

            {/* Contrôles de lecture */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                <span>{isPlaying ? 'Pause' : 'Lecture Auto'}</span>
              </button>
            </div>

            {/* Timeline horizontale */}
            <div className="mb-16 overflow-x-auto pb-6">
              <div className="flex gap-4 min-w-max justify-center">
                {timelineData.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setCurrentYear(period.id)}
                    className={`flex-shrink-0 transition-all duration-500 ${
                      currentYear === period.id ? 'scale-125' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <div className={`w-32 h-2 bg-gradient-to-r from-${period.color}-500 to-${period.color}-600 rounded-full mb-3`} />
                    <div className="text-center">
                      <div className="text-3xl font-black">{period.year}</div>
                      <div className="text-sm text-gray-500">{period.emoji}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Carte de période actuelle */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border-2 border-blue-500 p-12 shadow-2xl shadow-blue-500/20">
              <div className="flex items-start gap-8">
                <div className="text-9xl">{currentPeriod.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full text-sm font-bold text-blue-400">
                      {currentPeriod.era}
                    </span>
                    <span className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full text-sm font-bold text-red-400">
                      {currentPeriod.impact}
                    </span>
                  </div>
                  
                  <h3 className="text-5xl font-black mb-4">{currentPeriod.title}</h3>
                  <p className="text-2xl text-gray-400 mb-6">{currentPeriod.subtitle}</p>
                  <p className="text-xl text-gray-300 mb-8">{currentPeriod.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {Object.entries(currentPeriod.stats).map(([key, value]) => (
                      <div key={key} className="bg-black/50 p-4 rounded-2xl">
                        <div className="text-3xl font-black text-blue-400">{value}</div>
                        <div className="text-xs text-gray-500 uppercase">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Détails */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {currentPeriod.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-black/30 rounded-xl">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {/* Fun Fact */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl">
                    <div className="text-sm font-bold text-yellow-400 mb-2">💡 LE SAVIEZ-VOUS ?</div>
                    <div className="text-lg">{currentPeriod.funFact}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CARTE MONDIALE */}
      {activeView === 'map' && (
        <section className="pt-32 pb-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-6xl font-black text-center mb-16">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                DOMINATION MONDIALE
              </span>
            </h2>

            <div className="relative bg-gray-900 rounded-3xl p-12 border border-gray-800" style={{ height: '600px' }}>
              {Object.entries(worldMap).map(([key, loc]) => (
                <div
                  key={key}
                  className="absolute transition-all duration-500 hover:scale-150 cursor-pointer"
                  style={{
                    left: `${loc.x}%`,
                    top: `${loc.y}%`,
                    width: `${loc.size}px`,
                    height: `${loc.size}px`
                  }}
                >
                  <div className={`w-full h-full bg-${loc.color}-500 rounded-full animate-pulse flex items-center justify-center text-2xl font-black shadow-2xl`}>
                    {loc.value}
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm font-bold whitespace-nowrap">
                    {loc.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUIZ */}
      {activeView === 'quiz' && (
        <section className="pt-32 pb-24 relative">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-6xl font-black text-center mb-16">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TESTEZ VOS CONNAISSANCES
              </span>
            </h2>

            {quiz.active ? (
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-12 border-2 border-purple-500">
                <div className="text-center mb-8">
                  <div className="text-sm text-gray-500 mb-2">Question {quiz.question + 1} / {quizQuestions.length}</div>
                  <h3 className="text-3xl font-bold mb-8">{quizQuestions[quiz.question].q}</h3>
                </div>

                <div className="grid gap-4">
                  {quizQuestions[quiz.question].a.map((answer, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (i === quizQuestions[quiz.question].correct) {
                          setQuiz({ ...quiz, score: quiz.score + 1, question: quiz.question + 1 });
                        } else {
                          setQuiz({ ...quiz, question: quiz.question + 1 });
                        }
                      }}
                      className="p-6 bg-gray-800 hover:bg-gray-700 rounded-2xl text-left font-bold text-xl transition-all hover:scale-105"
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={() => setQuiz({ active: true, score: 0, question: 0 })}
                  className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-black text-2xl hover:scale-105 transition-all"
                >
                  Commencer le Quiz
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2025 HorloLearn • Excellence Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
