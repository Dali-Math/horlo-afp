import React from 'react';
import Link from 'next/link';
import { Clock, Wrench, BookOpen, Hammer, Zap, Award } from 'lucide-react';

const categories = [
  {
    id: 'gestes',
    icon: Hammer,
    title: 'Gestes de base',
    description: 'Maîtrisez les techniques fondamentales',
    color: 'from-amber-500 to-yellow-600',
    items: ['Rodage', 'Huilage', 'Démontage', 'Remontage'],
    link: '/ressources/gestes'
  },
  {
    id: 'outils',
    icon: Wrench,
    title: 'Maniement d\'outils',
    description: 'Apprenez à utiliser l\'outillage horloger',
    color: 'from-blue-500 to-indigo-600',
    items: ['Tournevis', 'Brucelles', 'Loupe', 'Établi'],
    link: '/ressources/outils'
  },
  {
    id: 'regulation',
    icon: Clock,
    title: 'Réglage et précision',
    description: 'Techniques de réglage avancées',
    color: 'from-purple-500 to-pink-600',
    items: ['Mise à l\'heure', 'Réglage précision', 'Calibrage'],
    link: '/ressources/reglage'
  },
  {
    id: 'complications',
    icon: Zap,
    title: 'Complications',
    description: 'Mécanismes complexes expliqués',
    color: 'from-red-500 to-orange-600',
    items: ['Chronographe', 'Quantième', 'Phases de lune'],
    link: '/ressources/complications'
  },
  {
    id: 'tutorials',
    icon: BookOpen,
    title: 'Tutoriels guidés',
    description: 'Pas à pas détaillés avec photos',
    color: 'from-green-500 to-emerald-600',
    items: ['Débutant', 'Intermédiaire', 'Avancé'],
    link: '/ressources/tutoriels'
  },
  {
    id: 'certification',
    icon: Award,
    title: 'Certification',
    description: 'Validez vos compétences pratiques',
    color: 'from-teal-500 to-cyan-600',
    items: ['Examens', 'Diplômes', 'Badges'],
    link: '/ressources/certification'
  }
];

export default function PratiqueHorlogere() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                           radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent animate-fade-in">
            Pratique Horlogère
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Développez vos compétences techniques avec nos ressources pratiques, tutoriels vidéo et exercices guidés
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-amber-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 shadow-lg transition-transform duration-500 group-hover:rotate-12`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {category.description}
                </p>

                {/* Items List */}
                <ul className="space-y-2 mb-6">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={category.link}>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/50">
                    Explorer
                  </button>
                </Link>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Prêt à perfectionner vos compétences ?
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Rejoignez notre communauté et accédez à des centaines de tutoriels exclusifs
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-amber-500/50">
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
