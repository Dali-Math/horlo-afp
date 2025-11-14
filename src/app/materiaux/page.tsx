'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gem, BookOpen, Sparkles, Award, Layers, ChevronRight, Moon, Sun } from 'lucide-react';

export default function MateriauxHomePage() {
  const [isDark, setIsDark] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const materials = [
    {
      href: '/materiaux/metaux-communs',
      icon: Gem,
      title: 'Métaux en Horlogerie Suisse',
      description: 'Métaux, alliages, céramiques et matériaux modernes utilisés dans les montres suisses.',
      badge: 'Essentiel',
      color: 'yellow',
      emoji: '⚡'
    },
    {
      href: '/materiaux/guide-complet',
      icon: BookOpen,
      title: 'Guide Complet des Matériaux Horlogers',
      description: 'Un guide approfondi sur tous les matériaux utilisés dans l\'horlogerie moderne.',
      badge: 'Complet',
      color: 'blue',
      emoji: '🎯'
    }
  ];

  const features = [
    { icon: Sparkles, text: 'Informations détaillées', color: 'from-purple-400 to-pink-400' },
    { icon: Award, text: 'Standards suisses', color: 'from-blue-400 to-cyan-400' },
    { icon: Layers, text: 'Tous les matériaux', color: 'from-orange-400 to-yellow-400' }
  ];

  const themeClasses = isDark
    ? 'bg-slate-950 text-white'
    : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900';

  return (
    <main className={`min-h-screen relative overflow-hidden transition-all duration-500 ${themeClasses}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: isDark 
              ? 'radial-gradient(circle, rgba(234,179,8,0.3) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
          }}
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.03),transparent_50%)]'}`}></div>
      </div>

      {/* Theme Toggle */}
      <div className="fixed top-8 right-8 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`group relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 ${
            isDark 
              ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700/80' 
              : 'bg-white/80 border-slate-200 hover:bg-slate-50 shadow-lg'
          }`}
        >
          <div className="relative w-6 h-6">
            <Sun className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 text-orange-500'}`} />
            <Moon className={`absolute inset-0 transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100 text-yellow-400' : 'opacity-0 -rotate-90 scale-0'}`} />
          </div>
        </button>
      </div>

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="text-center space-y-8">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 hover:scale-105 animate-pulse"
               style={{
                 background: isDark 
                   ? 'linear-gradient(135deg, rgba(234,179,8,0.1), rgba(59,130,246,0.1))'
                   : 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1))',
                 borderColor: isDark ? 'rgba(234,179,8,0.3)' : 'rgba(59,130,246,0.3)'
               }}>
            <span className="text-5xl animate-bounce">📚</span>
            <span className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
              Bibliothèque Premium
            </span>
          </div>

          {/* Main Title with Gradient */}
          <h1 className="relative">
            <span className={`block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-clip-text text-transparent transition-all duration-500 ${
              isDark 
                ? 'bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400' 
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600'
            }`}
            style={{
              backgroundSize: '200% 200%',
              animation: 'gradient 3s ease infinite'
            }}>
              Matériaux
            </span>
            <span className={`block text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Horlogers
            </span>
          </h1>

          <p className={`max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            L'excellence des matériaux qui définissent l'horlogerie de luxe
          </p>

          {/* Floating Features */}
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden px-6 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                  isDark 
                    ? 'bg-slate-800/50 border-slate-700' 
                    : 'bg-white/80 border-slate-200 shadow-lg'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <feature.icon className={`h-5 w-5 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {feature.text}
                  </span>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {materials.map((material, index) => (
            <Link
              key={index}
              href={material.href}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ${
                material.color === 'yellow'
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                  : 'bg-gradient-to-r from-blue-400 to-cyan-400'
              }`}></div>

              {/* Card */}
              <div className={`relative h-full rounded-3xl backdrop-blur-2xl border transition-all duration-500 group-hover:scale-[1.02] overflow-hidden ${
                isDark 
                  ? 'bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-slate-700' 
                  : 'bg-white/90 border-slate-200 shadow-xl'
              }`}>
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDark ? 'ffffff' : '000000'}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative p-8 md:p-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`relative p-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      isDark 
                        ? 'bg-slate-900/50 border-slate-700' 
                        : 'bg-slate-50 border-slate-200'
                    }`}>
                      <material.icon className={`h-8 w-8 ${
                        material.color === 'yellow' 
                          ? isDark ? 'text-yellow-400' : 'text-orange-500'
                          : isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      <div className="absolute -top-2 -right-2 text-3xl animate-bounce">
                        {material.emoji}
                      </div>
                    </div>

                    <span className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-xl border ${
                      material.color === 'yellow'
                        ? isDark 
                          ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                          : 'bg-orange-100 text-orange-600 border-orange-200'
                        : isDark
                          ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          : 'bg-blue-100 text-blue-600 border-blue-200'
                    }`}>
                      {material.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h2 className={`text-2xl md:text-3xl font-bold leading-tight transition-all duration-300 ${
                      isDark 
                        ? 'text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r' + 
                          (material.color === 'yellow' ? ' group-hover:from-yellow-400 group-hover:to-orange-400' : ' group-hover:from-blue-400 group-hover:to-cyan-400')
                        : 'text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r' +
                          (material.color === 'yellow' ? ' group-hover:from-orange-600 group-hover:to-yellow-600' : ' group-hover:from-blue-600 group-hover:to-purple-600')
                    }`}>
                      {material.title}
                    </h2>

                    <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {material.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className={`flex items-center gap-3 pt-4 font-semibold transition-all duration-300 ${
                    material.color === 'yellow'
                      ? isDark ? 'text-yellow-400' : 'text-orange-600'
                      : isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    <span className="text-lg">Découvrir</span>
                    <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-1000"
                       style={{
                         background: `linear-gradient(90deg, transparent, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}, transparent)`
                       }}>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Info Card */}
        <div className={`mt-12 p-8 rounded-3xl backdrop-blur-2xl border transition-all duration-500 hover:scale-[1.01] ${
          isDark 
            ? 'bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30' 
            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl'
        }`}>
          <div className="flex items-center gap-4">
            <div className="text-4xl animate-pulse">💡</div>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Chaque matériau possède des <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-purple-600'}`}>propriétés uniques</span> qui influencent la durabilité, l'esthétique et la performance des montres de luxe
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </main>
  );
}
