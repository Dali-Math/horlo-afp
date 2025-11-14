'use client';

import Link from 'next/link';
import { Gem, BookOpen, Sparkles, Award, Layers, ChevronRight } from 'lucide-react';

export default function MateriauxHomePage() {
  const materials = [
    {
      href: '/materiaux/metaux-communs',
      icon: Gem,
      title: 'Métaux en Horlogerie Suisse',
      description: 'Métaux, alliages, céramiques et matériaux modernes utilisés dans les montres suisses.',
      badge: 'Essentiel',
      gradient: 'from-yellow-500/20 to-amber-500/20',
      iconColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30'
    },
    {
      href: '/materiaux/guide-complet',
      icon: BookOpen,
      title: 'Guide Complet des Matériaux Horlogers',
      description: 'Un guide approfondi sur tous les matériaux utilisés dans l\'horlogerie moderne.',
      badge: 'Complet',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    }
  ];

  const features = [
    { icon: Sparkles, text: 'Informations détaillées' },
    { icon: Award, text: 'Standards suisses' },
    { icon: Layers, text: 'Tous les matériaux' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTR2Mkgydi0yaDM0em0wLTR2Mkgydi0yaDM0em0wLTR2Mkgydi0yaDM0em0wLTR2Mkgydi0yaDM0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 backdrop-blur-sm">
              <span className="text-4xl">📚</span>
              <span className="text-sm font-medium text-yellow-400 uppercase tracking-wider">
                Bibliothèque des Matériaux
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
              Matériaux Horlogers
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 leading-relaxed">
              Découvrez l'univers des matériaux utilisés dans l'horlogerie de luxe suisse et internationale
            </p>
          </div>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-5 py-2.5 backdrop-blur-sm"
              >
                <feature.icon className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-slate-200">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {materials.map((material, index) => (
            <Link
              key={index}
              href={material.href}
              className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-600 hover:shadow-2xl hover:shadow-yellow-500/10"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${material.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              {/* Border Gradient on Hover */}
              <div className={`absolute inset-0 border-2 ${material.borderColor} opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative p-8 space-y-4">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-slate-900/50 border border-slate-700/50 group-hover:scale-110 transition-transform duration-300`}>
                    <material.icon className={`h-7 w-7 ${material.iconColor}`} />
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {material.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 flex items-center gap-2">
                    {material.title}
                    <ChevronRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                    {material.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="pt-4 flex items-center gap-2 text-sm font-medium text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Explorer maintenant</span>
                  <ChevronRight className="h-4 w-4 animate-pulse" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Footer */}
        <div className="mt-12 p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
          <p className="text-center text-slate-400 text-sm leading-relaxed">
            💡 Chaque matériau possède des propriétés uniques qui influencent la durabilité, l'esthétique et la performance des montres de luxe
          </p>
        </div>
      </div>
    </main>
  );
}
