import Link from 'next/link';
import { BookOpen, Wrench, Brain, Clock, FileText, Headphones, Award, Calendar, Users } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(212,175,55,0.30) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(212,175,55,0.20) 0%, transparent 50%)',
            filter: 'blur(60px)'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in">
          <span className="text-white">Horlogerie </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500">Suisse</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-10 animate-fade-in-delay-1">
          Excellence horlogère & formation professionnelle
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-fade-in-delay-2">
          <Link
            href="/theorie"
            className="px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-base md:text-lg font-bold rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50"
          >
            Commencer la formation
          </Link>
          <Link
            href="/communaute"
            className="px-6 md:px-10 py-3 md:py-5 bg-white/10 backdrop-blur-md text-white text-base md:text-lg font-bold rounded-lg border-2 border-amber-500/50 hover:bg-white/20 hover:border-amber-400 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Rejoindre la communauté
          </Link>
        </div>
      </div>
    </section>
  );
}

// Nouvelle section: Notre mission (remplace l'ancienne section résultats)
function MissionSection() {
  const items = [
    { emoji: '📘', title: 'Documentation claire', desc: 'Basée sur les standards suisses' },
    { emoji: '🕰️', title: 'Méthodes horlogères', desc: 'Gestes, outils, réglages et complications' },
    { emoji: '📊', title: 'Organisation', desc: 'Contenu structuré par thématiques' },
    { emoji: '🌍', title: 'Accès libre', desc: 'Pour étudiants, passionnés et professionnels' },
  ];

  return (
    <section className="bg-yellow-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Notre mission</h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            Partager le savoir-faire horloger suisse à travers des ressources pédagogiques fiables, structurées et accessibles librement.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it) => (
            <div key={it.title} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 md:p-6">
              <span className="text-3xl" aria-hidden>{it.emoji}</span>
              <h3 className="font-semibold mt-2 text-gray-900">{it.title}</h3>
              <p className="text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const sections = [
    { name: 'Théorie', href: '/theorie', icon: BookOpen, desc: "Cours théoriques d'horlogerie complète" },
    { name: 'Pratique', href: '/pratique', icon: Wrench, desc: 'Exercices pratiques et techniques avancées' },
    { name: 'Quiz', href: '/quiz', icon: Brain, desc: 'Testez vos connaissances en temps réel' },
    { name: 'Outils', href: '/outils', icon: Clock, desc: 'Calculateurs et outils professionnels' },
    { name: 'Ressources', href: '/ressources', icon: FileText, desc: 'Documentation technique complète' },
    { name: 'Podcasts', href: '/podcasts', icon: Headphones, desc: 'Épisodes audio avec des experts' },
    { name: 'Culture', href: '/culture', icon: Award, desc: 'Histoire et culture horlogère suisse' },
    { name: 'Événements', href: '/evenements', icon: Calendar, desc: 'Salons et rencontres professionnelles' },
    { name: 'Communauté', href: '/communaute', icon: Users, desc: 'Forum et discussions entre passionnés' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explorez nos sections</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">Des ressources complètes pour votre formation en horlogerie suisse</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-amber-500 transform hover:-translate-y-2"
              style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both` }}
            >
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="p-3 md:p-4 rounded-xl shadow-lg text-white transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-amber-500 to-yellow-600">
                    <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} />
                  </div>
                  <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {section.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">{section.desc}</p>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <FeaturesSection />

      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Prêt à commencer votre formation ?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10">Rejoignez la communauté horlogère suisse et développez vos compétences avec nos experts</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link
              href="/theorie"
              className="px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-base md:text-lg rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Commencer la théorie
            </Link>
            <Link
              href="/communaute"
              className="px-6 md:px-10 py-3 md:py-5 bg-white text-gray-900 font-bold text-base md:text-lg rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Rejoindre la communauté
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
