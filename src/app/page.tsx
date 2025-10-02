import Link from 'next/link';
import { Clock, BookOpen, Wrench, Brain, FileText, Headphones, Award, Calendar, Users, TrendingUp, Star, BarChart3 } from 'lucide-react';

// HeroSection Component
function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with elegant gradient simulating blurred watch imagery */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Title - Horlogerie Suisse */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in">
          <span className="text-white">Horlogerie </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500">Suisse</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in-delay-1">
          Excellence horlogère & formation professionnelle
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
          <Link
            href="/theorie"
            className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-lg font-bold rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50"
          >
            Commencer la formation
          </Link>
          <Link
            href="/communaute"
            className="px-10 py-5 bg-white/10 backdrop-blur-md text-white text-lg font-bold rounded-lg border-2 border-amber-500/50 hover:bg-white/20 hover:border-amber-400 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Rejoindre la communauté
          </Link>
        </div>
      </div>
    </section>
  );
}

// StatsSection Component
function StatsSection() {
  const stats = [
    { number: "5,230+", label: "Étudiants formés", icon: Users },
    { number: "98%", label: "Taux de réussite", icon: TrendingUp },
    { number: "150+", label: "Heures de contenu", icon: Clock },
    { number: "4.9/5", label: "Note moyenne", icon: Star }
  ];

  return (
    <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos résultats parlent d'eux-mêmes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une formation reconnue par les professionnels de l'horlogerie suisse
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// FeaturesSection Component
function FeaturesSection() {
  const sections = [
    { name: 'Théorie', href: '/theorie', icon: BookOpen, desc: 'Cours théoriques d\'horlogerie complète', color: 'from-amber-500 to-yellow-600' },
    { name: 'Pratique', href: '/pratique', icon: Wrench, desc: 'Exercices pratiques et techniques avancées', color: 'from-amber-600 to-orange-600' },
    { name: 'Quiz', href: '/quiz', icon: Brain, desc: 'Testez vos connaissances en temps réel', color: 'from-yellow-500 to-amber-600' },
    { name: 'Outils', href: '/outils', icon: Clock, desc: 'Calculateurs et outils professionnels', color: 'from-amber-500 to-yellow-500' },
    { name: 'Ressources', href: '/ressources', icon: FileText, desc: 'Documentation technique complète', color: 'from-orange-500 to-amber-600' },
    { name: 'Podcasts', href: '/podcasts', icon: Headphones, desc: 'Épisodes audio avec des experts', color: 'from-amber-600 to-yellow-600' },
    { name: 'Culture', href: '/culture', icon: Award, desc: 'Histoire et culture horlogère suisse', color: 'from-yellow-600 to-amber-600' },
    { name: 'Événements', href: '/evenements', icon: Calendar, desc: 'Salons et rencontres professionnelles', color: 'from-amber-500 to-orange-500' },
    { name: 'Communauté', href: '/communaute', icon: Users, desc: 'Forum et discussions entre passionnés', color: 'from-orange-600 to-amber-600' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Explorez nos sections
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Des ressources complètes pour votre formation en horlogerie suisse
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-amber-500 transform hover:-translate-y-3"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-br ${section.color} transform group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                  {section.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {section.desc}
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
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
      <StatsSection />
      <FeaturesSection />
      
      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à commencer votre formation ?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Rejoignez la communauté horlogère suisse et développez vos compétences avec nos experts
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/theorie"
              className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold text-lg rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Commencer la théorie
            </Link>
            <Link
              href="/communaute"
              className="px-10 py-5 bg-white text-gray-900 font-bold text-lg rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Rejoindre la communauté
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
