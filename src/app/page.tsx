'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Wrench, 
  GraduationCap, 
  Users, 
  Award,
  TrendingUp,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import AstuceDuJour from '@/components/AstuceDuJour';
import ActualitesHorlogeres from '@/components/ActualitesHorlogeres';
import MouvementDuMois from '@/components/MouvementDuMois';
import GalerieVideos from '@/components/GalerieVideos';
import ComparaisonMouvements from '@/components/ComparaisonMouvements';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* HEADER / NAVIGATION */}
      <header className="bg-white/90 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HorloLearn
                </h1>
                <p className="text-xs text-slate-600">Passion & Découverte Horlogère</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/theorie" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Théorie
              </Link>
              <Link href="/pratique" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Pratique
              </Link>
              <Link href="/quiz" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Quiz
              </Link>
              <Link href="/outils" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Star className="w-4 h-4" />
                Outils
              </Link>
              <Link href="/communaute" className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Communauté
              </Link>
            </nav>

            {/* CTA Button */}
            <Link 
              href="/quiz" 
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Play className="w-4 h-4" />
              Commencer
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        {/* Overlay animé */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6 border border-white/20">
              🇨🇭 Plateforme #1 en horlogerie suisse
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Maîtrisez l'art de l'
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                horlogerie suisse
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Cours interactifs, simulateurs 3D, quiz certifiants et communauté d'experts pour apprendre et exceller en horlogerie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/pratique" 
                className="flex items-center gap-2 bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5" />
                Commencer gratuitement
              </Link>
              <Link 
                href="/outils" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
              >
                <Wrench className="w-5 h-5" />
                Explorer les outils
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Élèves actifs", value: "1,247", icon: Users },
              { label: "Cours vidéo", value: "156+", icon: Play },
              { label: "Quiz disponibles", value: "45", icon: CheckCircle },
              { label: "Taux de réussite", value: "94%", icon: TrendingUp }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <stat.icon className="w-8 h-8 text-yellow-400 mb-3" />
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Astuce du Jour */}
        <AstuceDuJour />

        {/* Parcours d'Apprentissage */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Parcours d'Apprentissage</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un cursus complet de la théorie à la pratique pour devenir horloger
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Théorie",
                icon: BookOpen,
                color: "from-blue-600 to-cyan-600",
                description: "Principes fondamentaux, histoire et terminologie horlogère",
                link: "/theorie",
                features: ["Cours structurés", "Schémas animés", "Glossaire illustré"]
              },
              {
                title: "Pratique",
                icon: Wrench,
                color: "from-purple-600 to-pink-600",
                description: "Démontage, remontage et réglage de mouvements réels",
                link: "/pratique",
                features: ["Tutoriels vidéo", "Plans techniques", "Exercices guidés"]
              },
              {
                title: "Certification",
                icon: Award,
                color: "from-orange-600 to-red-600",
                description: "Validez vos compétences avec nos quiz certifiants",
                link: "/quiz",
                features: ["45 quiz", "Badge de réussite", "Suivi progrès"]
              }
            ].map((parcours, idx) => (
              <Link 
                key={idx}
                href={parcours.link}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-slate-200 hover:scale-105"
              >
                <div className={`inline-block p-4 rounded-xl bg-gradient-to-br ${parcours.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <parcours.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{parcours.title}</h3>
                <p className="text-slate-600 mb-6">{parcours.description}</p>
                <ul className="space-y-2 mb-6">
                  {parcours.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Découvrir <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mouvement du Mois */}
        <MouvementDuMois />

        {/* Actualités Horlogères */}
        <ActualitesHorlogeres />

        {/* Galerie Vidéos */}
        <GalerieVideos />

        {/* Comparaison */}
        <ComparaisonMouvements />

        {/* CTA Final */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">Rejoignez la communauté HorloLearn</h2>
            <p className="text-xl text-blue-100 mb-8">
              Plus de 1,200 passionnés et professionnels vous attendent pour échanger, apprendre et progresser ensemble
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/communaute" 
                className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                <Users className="w-5 h-5" />
                Rejoindre maintenant
              </Link>
              <Link 
                href="/outils" 
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30"
              >
                <Lightbulb className="w-5 h-5" />
                Essayer les outils
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo + Description */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">HorloLearn</span>
              </div>
              <p className="text-slate-400 mb-4">
                La première plateforme interactive francophone dédiée à l'apprentissage de l'horlogerie suisse.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'YouTube'].map(social => (
                  <a key={social} href="#" className="bg-slate-800 hover:bg-slate-700 p-2 rounded-lg transition-colors">
                    <span className="text-sm">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Liens */}
            <div>
              <h3 className="font-bold text-lg mb-4">Apprendre</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/theorie" className="hover:text-white transition-colors">Théorie</Link></li>
                <li><Link href="/pratique" className="hover:text-white transition-colors">Pratique</Link></li>
                <li><Link href="/quiz" className="hover:text-white transition-colors">Quiz</Link></li>
                <li><Link href="/ressources" className="hover:text-white transition-colors">Ressources</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Communauté</h3>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/communaute" className="hover:text-white transition-colors">Forum</Link></li>
                <li><Link href="/outils" className="hover:text-white transition-colors">Outils</Link></li>
                <li><Link href="/culture" className="hover:text-white transition-colors">Culture</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              © 2025 HorloLearn – Passion & Découverte Horlogère Suisse
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link href="/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
              <Link href="/cgu" className="hover:text-white transition-colors">CGU</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
