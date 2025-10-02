import Link from 'next/link';
import { Clock, BookOpen, Wrench, Brain, FileText, Headphones, Award, Calendar, Users } from 'lucide-react';

export default function Home() {
  const sections = [
    { name: 'Théorie', href: '/theorie', icon: BookOpen, desc: 'Cours théoriques d\'horlogerie', color: 'from-amber-500 to-yellow-600' },
    { name: 'Pratique', href: '/pratique', icon: Wrench, desc: 'Exercices pratiques et techniques', color: 'from-amber-600 to-orange-600' },
    { name: 'Quiz', href: '/quiz', icon: Brain, desc: 'Testez vos connaissances', color: 'from-yellow-500 to-amber-600' },
    { name: 'Outils', href: '/outils', icon: Clock, desc: 'Calculateurs et outils pratiques', color: 'from-amber-500 to-yellow-500' },
    { name: 'Ressources', href: '/ressources', icon: FileText, desc: 'Documentation et guides', color: 'from-orange-500 to-amber-600' },
    { name: 'Podcasts', href: '/podcasts', icon: Headphones, desc: 'Épisodes audio sur l\'horlogerie', color: 'from-amber-600 to-yellow-600' },
    { name: 'Culture', href: '/culture', icon: Award, desc: 'Histoire et culture horlogère', color: 'from-yellow-600 to-amber-600' },
    { name: 'Événements', href: '/evenements', icon: Calendar, desc: 'Salons et rencontres', color: 'from-amber-500 to-orange-500' },
    { name: 'Communauté', href: '/communaute', icon: Users, desc: 'Forum et discussions', color: 'from-orange-600 to-amber-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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
          {/* Main Title with White and Gold */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
            <span className="text-white">Horlo</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500">-AFP</span>
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in-delay">
            <span className="text-white">Maîtrisez l'</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Art Horloger</span>
            <span className="text-white"> Suisse</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2">
            <span className="text-amber-400 font-semibold">Excellence</span> · 
            <span className="text-amber-400 font-semibold"> Précision</span> · 
            <span className="text-amber-400 font-semibold"> Tradition</span>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
            <Link
              href="/theorie"
              className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-lg font-bold rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50"
            >
              Commencer
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

      {/* Sections Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Explorez nos sections</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">Des ressources complètes pour votre formation en horlogerie</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.href}
                href={section.href}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-amber-500 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg shadow-md bg-gradient-to-br ${section.color} text-white transform transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                    {section.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {section.desc}
                  </p>
                </div>
                
                <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à commencer votre formation ?</h2>
          <p className="text-xl text-gray-300 mb-8">Rejoignez la communauté horlogère suisse et développez vos compétences</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/theorie"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Commencer la théorie
            </Link>
            <Link
              href="/communaute"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Rejoindre la communauté
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
