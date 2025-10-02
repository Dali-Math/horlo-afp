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
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/image.jpg)',
              filter: 'blur(8px)',
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 animate-fade-in">
            <Clock className="w-20 h-20 text-amber-500 mr-4" strokeWidth={1.5} />
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              Horlo-AFP
            </h1>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-delay">
            Maîtrisez l'Art Horloger Suisse
          </h2>

          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay-2">
            Excellence · Précision · Tradition
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-2">
            <Link
              href="/theorie"
              className="px-10 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-lg font-semibold rounded-lg hover:from-amber-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-amber-500/50"
            >
              Commencer
            </Link>
            <Link
              href="/communaute"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-white text-lg font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-2xl"
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
                <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-br ${section.color} rounded-lg shadow-md text-white transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                    <div className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
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
                
                <div className="h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
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
