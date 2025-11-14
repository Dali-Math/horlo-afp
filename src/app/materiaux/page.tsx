'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Gem, BookOpen, Sparkles, Award, Layers, ChevronRight, Moon, Sun,
  Shield, Zap, Atom, Microscope, Crown, Star, TrendingUp, Clock,
  CheckCircle2, ArrowRight, Info, Lightbulb, Target, Eye
} from 'lucide-react';

export default function MateriauxHomePage() {
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const materials = [
    {
      href: '/materiaux/metaux-communs',
      icon: Gem,
      title: 'Métaux en Horlogerie Suisse',
      description: 'Guide exhaustif des métaux nobles, alliages précieux, céramiques haute performance et matériaux de pointe qui définissent l\'excellence horlogère suisse.',
      badge: 'Référence Suisse',
      color: 'yellow',
      emoji: '⚡',
      highlights: ['Or 18K & Platine 950', 'Acier 904L & Titane Grade 5', 'Céramiques & Saphir']
    },
    {
      href: '/materiaux/guide-complet',
      icon: BookOpen,
      title: 'Guide Complet des Matériaux Horlogers',
      description: 'L\'encyclopédie définitive : propriétés physiques, techniques de fabrication, normes suisses, innovations et tendances futures de tous les matériaux horlogers.',
      badge: 'Encyclopédie Premium',
      color: 'blue',
      emoji: '🎯',
      highlights: ['Base de données complète', 'Analyses scientifiques', 'Comparatifs détaillés']
    }
  ];

  const expertiseAreas = [
    { icon: Shield, label: 'Résistance & Durabilité', value: '100%', color: 'from-emerald-400 to-teal-400' },
    { icon: Sparkles, label: 'Finitions Luxe', value: 'Excellence', color: 'from-amber-400 to-yellow-400' },
    { icon: Atom, label: 'Innovation Matériaux', value: 'Pointe', color: 'from-purple-400 to-pink-400' },
    { icon: Microscope, label: 'Précision Suisse', value: '±0.001mm', color: 'from-blue-400 to-cyan-400' }
  ];

  const swissStandards = [
    { icon: Crown, title: 'Standards Suisses', desc: 'Certification Hallmark & Poinçons officiels' },
    { icon: Award, title: 'Qualité Premium', desc: 'Matériaux conformes FH & NIHS' },
    { icon: Star, title: 'Excellence Reconnue', desc: 'Partenaires manufactures prestigieuses' },
    { icon: TrendingUp, title: 'Innovation Continue', desc: 'R&D matériaux nouvelle génération' }
  ];

  const metalCategories = [
    { 
      name: 'Métaux Nobles',
      count: '8+',
      emoji: '👑',
      examples: 'Or, Platine, Palladium',
      color: 'from-yellow-400 to-amber-500'
    },
    { 
      name: 'Alliages Techniques',
      count: '15+',
      emoji: '⚙️',
      examples: 'Acier 904L, Titane Grade 5',
      color: 'from-slate-400 to-gray-500'
    },
    { 
      name: 'Céramiques',
      count: '6+',
      emoji: '💎',
      examples: 'Zircone, Carbure de tungstène',
      color: 'from-blue-400 to-indigo-500'
    },
    { 
      name: 'Matériaux Modernes',
      count: '10+',
      emoji: '🚀',
      examples: 'Carbone, Saphir, Composites',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const keyFeatures = [
    { 
      icon: CheckCircle2, 
      title: 'Documentation Complète',
      desc: 'Propriétés physiques, chimiques et mécaniques détaillées',
      stat: '100+ matériaux'
    },
    { 
      icon: Lightbulb, 
      title: 'Analyses Techniques',
      desc: 'Comparatifs, applications et recommandations d\'experts',
      stat: '50+ analyses'
    },
    { 
      icon: Target, 
      title: 'Cas Pratiques',
      desc: 'Exemples réels de grandes manufactures suisses',
      stat: '30+ études'
    },
    { 
      icon: Eye, 
      title: 'Tendances 2025',
      desc: 'Innovations et matériaux d\'avenir en développement',
      stat: 'Actualité'
    }
  ];

  const themeClasses = isDark
    ? 'bg-slate-950 text-white'
    : 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900';

  return (
    <main className={`min-h-screen relative overflow-hidden transition-all duration-500 ${themeClasses}`}>
      {/* Advanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Dynamic Gradient Following Mouse */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, rgba(59,130,246,0.3) 50%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.2) 50%, transparent 70%)',
            left: `${mousePosition.x - 300}px`,
            top: `${mousePosition.y - 300}px`,
          }}
        />
        
        {/* Parallax Background Layers */}
        <div 
          className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.05),transparent_50%)]'}`}
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-yellow-400/30' : 'bg-blue-400/30'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Theme Toggle - Enhanced */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`group relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 hover:rotate-12 ${
            isDark 
              ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80' 
              : 'bg-white/80 border-slate-200 hover:bg-slate-50 shadow-xl'
          }`}
        >
          <div className="relative w-6 h-6">
            <Sun className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-orange-500'}`} />
            <Moon className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100 text-yellow-400' : 'opacity-0 -rotate-90 scale-0'}`} />
          </div>
        </button>
      </div>

      {/* Hero Section - Monumentale */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="text-center space-y-8">
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-105"
               style={{
                 background: isDark 
                   ? 'linear-gradient(135deg, rgba(234,179,8,0.15), rgba(59,130,246,0.15))'
                   : 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(147,51,234,0.15))',
                 borderColor: isDark ? 'rgba(234,179,8,0.4)' : 'rgba(59,130,246,0.4)',
                 animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
               }}>
            <Crown className={`h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
            <span className={`text-sm font-black uppercase tracking-[0.2em] ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
              Référence Absolue Horlogerie Suisse
            </span>
            <Shield className={`h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
          </div>

          {/* Main Title - Spectacular */}
          <div className="relative">
            <h1 className="relative space-y-2">
              <span className={`block text-7xl md:text-8xl lg:text-9xl font-black tracking-tight bg-clip-text text-transparent transition-all duration-500 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400' 
                  : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
              }`}
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 4s ease infinite',
                textShadow: isDark ? '0 0 80px rgba(234,179,8,0.3)' : '0 0 60px rgba(59,130,246,0.2)'
              }}>
                Matériaux
              </span>
              <span className={`block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Horlogerie Suisse
              </span>
            </h1>
            
            {/* Decorative Elements */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl animate-bounce">⚜️</div>
            <div className="absolute -bottom-8 left-1/4 text-4xl animate-pulse">💎</div>
            <div className="absolute -bottom-8 right-1/4 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>⚡</div>
          </div>

          {/* Subtitle - Impactful */}
          <p className={`max-w-4xl mx-auto text-xl md:text-3xl leading-relaxed font-light ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            L'encyclopédie technique définitive des <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>métaux nobles</span>, 
            <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-purple-600'}`}> alliages de précision</span> et 
            <span className={`font-bold ${isDark ? 'text-purple-400' : 'text-indigo-600'}`}> matériaux innovants</span> qui forgent l'excellence horlogère suisse
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-5xl mx-auto">
            {expertiseAreas.map((area, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                  isDark 
                    ? 'bg-slate-800/60 border-slate-700' 
                    : 'bg-white/90 border-slate-200 shadow-lg'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                <div className="relative space-y-3">
                  <area.icon className={`h-8 w-8 mx-auto bg-gradient-to-r ${area.color} bg-clip-text text-transparent`} />
                  <div className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{area.value}</div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{area.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Swiss Standards Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className={`rounded-3xl backdrop-blur-2xl border p-12 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900/80 to-slate-800/80 border-yellow-500/30' 
            : 'bg-gradient-to-br from-white/80 to-blue-50/80 border-blue-200 shadow-2xl'
        }`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <Shield className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Standards Suisses d'Excellence
              </h2>
              <Shield className={`h-8 w-8 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
            </div>
            <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Conformité totale aux normes de la Fédération Horlogère Suisse
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {swissStandards.map((standard, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-yellow-500/50' 
                    : 'bg-white/70 border-slate-200 hover:border-blue-300 shadow-lg'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  isDark ? 'bg-yellow-500/20' : 'bg-blue-100'
                }`}>
                  <standard.icon className={`h-6 w-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {standard.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {standard.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Categories Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Catégories de Matériaux Couverts
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Une taxonomie complète de tous les matériaux horlogers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metalCategories.map((category, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-rotate-1 ${
                isDark 
                  ? 'bg-slate-800/60 border-slate-700' 
                  : 'bg-white/90 border-slate-200 shadow-xl'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <div className="relative p-8 space-y-4">
                <div className="text-5xl mb-2">{category.emoji}</div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {category.name}
                </h3>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                  isDark 
                    ? 'bg-yellow-500/20 text-yellow-400' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {category.count} matériaux
                </div>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {category.examples}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Cards Section - Enhanced */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Nos Ressources Premium
          </h2>
          <p className={`text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Deux piliers de connaissance horlogère
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          {materials.map((material, index) => (
            <Link
              key={index}
              href={material.href}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Enhanced Glow Effect */}
              <div className={`absolute -inset-2 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 ${
                material.color === 'yellow'
                  ? 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400'
                  : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400'
              }`}></div>

              {/* Premium Card */}
              <div className={`relative h-full rounded-3xl backdrop-blur-2xl border-2 transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-2 overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700 group-hover:border-' + (material.color === 'yellow' ? 'yellow' : 'blue') + '-500/50' 
                  : 'bg-white/95 border-slate-200 group-hover:border-' + (material.color === 'yellow' ? 'orange' : 'blue') + '-300 shadow-2xl'
              }`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDark ? 'ffffff' : '000000'}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative p-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`relative p-5 rounded-2xl backdrop-blur-xl border-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 ${
                      isDark 
                        ? 'bg-slate-900/70 border-slate-700' 
                        : 'bg-slate-50 border-slate-200'
                    }`}>
                      <material.icon className={`h-10 w-10 ${
                        material.color === 'yellow' 
                          ? isDark ? 'text-yellow-400' : 'text-orange-500'
                          : isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <div className="absolute -top-3 -right-3 text-4xl animate-bounce">
                        {material.emoji}
                      </div>
                    </div>

                    <span className={`px-5 py-2 text-xs font-black uppercase tracking-widest rounded-full backdrop-blur-xl border-2 shadow-lg ${
                      material.color === 'yellow'
                        ? isDark 
                          ? 'bg-yellow-500/30 text-yellow-300 border-yellow-400/50'
                          : 'bg-orange-100 text-orange-700 border-orange-300'
                        : isDark
                          ? 'bg-blue-500/30 text-blue-300 border-blue-400/50'
                          : 'bg-blue-100 text-blue-700 border-blue-300'
                    }`}>
                      {material.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-5">
                    <h2 className={`text-3xl md:text-4xl font-black leading-tight transition-all duration-300 ${
                      isDark 
                        ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r' + 
                          (material.color === 'yellow' ? ' group-hover:from-yellow-300 group-hover:to-amber-400' : ' group-hover:from-blue-400 group-hover:to-cyan-400')
                        : 'text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r' +
                          (material.color === 'yellow' ? ' group-hover:from-orange-600 group-hover:to-yellow-600' : ' group-hover:from-blue-600 group-hover:to-purple-600')
                    }`}>
                      {material.title}
                    </h2>

                    <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {material.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2">
                      {material.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className={`h-5 w-5 flex-shrink-0 ${
                            material.color === 'yellow'
                              ? isDark ? 'text-yellow-400' : 'text-orange-500'
                              : isDark ? 'text-blue-400' : 'text-blue-600'
                          }`} />
                          <span className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced CTA */}
                  <div className={`flex items-center justify-between pt-6 border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                    <div className={`flex items-center gap-3 font-black text-lg transition-all duration-300 ${
                      material.color === 'yellow'
                        ? isDark ? 'text-yellow-400' : 'text-orange-600'
                        : isDark ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      <span>Explorer maintenant</span>
                      <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-3" />
                    </div>
                    <Clock className={`h-5 w-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
                  </div>
                </div>

                {/* Enhanced Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-1500"
                       style={{
                         background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.6)'}, transparent)`
                       }}>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className={`rounded-3xl backdrop-blur-2xl border p-12 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30' 
            : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-2xl'
        }`}>
          <div className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pourquoi Cette Référence Est Unique
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => (
              <div
                key={index}
                className={`group relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/80 border-slate-200 shadow-lg'
                }`}
              >
                <feature.icon className={`h-8 w-8 mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {feature.title}
                </h3>
                <p className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {feature.desc}
                </p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  isDark 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className={`relative rounded-3xl backdrop-blur-2xl border-2 p-12 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/50' 
            : 'bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-300 shadow-2xl'
        }`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23${isDark ? 'ffffff' : '000000'}' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative text-center space-y-6">
            <div className="flex justify-center gap-4 text-5xl mb-4">
              <span className="animate-bounce">💎</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⚡</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>👑</span>
            </div>
            
            <h3 className={`text-3xl md:text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Devenez Expert en Matériaux Horlogers
            </h3>
            
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Accédez à la base de connaissances la plus complète sur les matériaux utilisés dans l'horlogerie de luxe suisse. 
              Chaque propriété, chaque norme, chaque innovation documentée avec précision.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <div className={`px-6 py-3 rounded-xl font-bold ${
                isDark 
                  ? 'bg-yellow-500/20 text-yellow-300 border-2 border-yellow-400/50' 
                  : 'bg-orange-100 text-orange-700 border-2 border-orange-300'
              }`}>
                ✓ Documentation scientifique
              </div>
              <div className={`px-6 py-3 rounded-xl font-bold ${
                isDark 
                  ? 'bg-blue-500/20 text-blue-300 border-2 border-blue-400/50' 
                  : 'bg-blue-100 text-blue-700 border-2 border-blue-300'
              }`}>
                ✓ Normes suisses officielles
              </div>
              <div className={`px-6 py-3 rounded-xl font-bold ${
                isDark 
                  ? 'bg-purple-500/20 text-purple-300 border-2 border-purple-400/50' 
                  : 'bg-purple-100 text-purple-700 border-2 border-purple-300'
              }`}>
                ✓ Analyses comparatives
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-15px) translateX(5px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </main>
  );
}
