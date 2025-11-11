// app/innovation/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });

// Scripts CDN
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

// Données de la chronologie (corrigées et complétées)
const timelineData = [
  {
    year: '1845',
    category: 'FONDATION',
    complexity: 85,
    title: 'Remontoir à Couronne',
    description: "Jean Adrien Philippe révolutionne l'horlogerie avec son invention du remontoir à couronne, permettant le remontage et le réglage des montres d'une manière jamais vue auparavant."
  },
  {
    year: '1889',
    category: 'ACOUSTIQUE',
    complexity: 90,
    title: 'Sonnerie à Répetition',
    description: "Développement d'un mécanisme de sonnerie breveté qui sonne les heures, les quarts et les minutes à la demande."
  },
  {
    year: '1925',
    category: 'CHRONOGRAPHE',
    complexity: 88,
    title: 'Calibre à Rattrapante',
    description: "Introduction du chronographe à rattrapante, permettant la mesure de temps intermédiaires sans arrêter le chronographe principal."
  },
  {
    year: '1962',
    category: 'MATÉRIAUX',
    complexity: 92,
    title: 'Spiral Silicium',
    description: "Patek Philippe pionnier dans l'utilisation du silicium pour les composants horlogers."
  },
  {
    year: '2011',
    category: 'PRÉCISION',
    complexity: 95,
    title: 'Oscillateur Gyromax®',
    description: "L'oscillateur Gyromax® révolutionnaire qui améliore la précision chronométrique."
  }
];

// Palette de couleurs Patek Philippe
const COLORS = {
  gold: '#D4AF37',
  deepBlue: '#1a2332',
  cream: '#f8f6f0',
  charcoal: '#2c2c2c',
  darkGold: '#B8941F',
  lightGold: '#F4D03F'
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'FONDATION': COLORS.gold,
    'ACOUSTIQUE': '#8B5CF6',
    'CHRONOGRAPHE': '#3B82F6',
    'MATÉRIAUX': '#10B981',
    'PRÉCISION': '#EF4444',
    'MASTERPIECE': '#9333EA'
  };
  return colors[category] || '#6B7280';
};

export default function InnovationPage() {
  const router = useRouter();
  const vantaInstanceRef = useRef<any>(null);
  const observersRef = useRef<IntersectionObserver[]>([]);

  useEffect(() => {
    // Chargement des scripts
    const loadScripts = async () => {
      if (window.THREE) return true;
      
      return new Promise<void>((resolve) => {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        script1.async = true;
        script1.onload = () => resolve();
        script1.onerror = () => resolve();
        document.body.appendChild(script1);
      });
    };

    // Initialisation Vanta.js
    const initVanta = async () => {
      await loadScripts();
      
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js';
      script2.async = true;
      
      script2.onload = () => {
        if (window.VANTA) {
          vantaInstanceRef.current = window.VANTA.HALO({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            amplitudeFactor: 0.5,
            xOffset: 0.25,
            yOffset: 0.1,
            size: 1.5,
            backgroundColor: 0xf8f6f0,
            baseColor: 0xd4af37
          });
        }
      };
      
      document.body.appendChild(script2);
    };

    initVanta();

    // Animations scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      revealObserver.observe(el);
    });
    
    observersRef.current.push(revealObserver);

    // Parallax
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.getElementById('vanta-bg');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      vantaInstanceRef.current?.destroy();
      observersRef.current.forEach(obs => obs.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const FutureTechCard = ({ tech }: any) => {
    const colorClasses: Record<string, string> = {
      'blue': 'from-blue-600 to-blue-700',
      'purple': 'from-purple-600 to-purple-700',
      'green': 'from-green-600 to-green-700',
      'red': 'from-red-600 to-red-700'
    };
    
    return (
      <div className="future-tech-card rounded-xl p-8 scroll-reveal">
        <div className="flex items-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[tech.color]} rounded-full flex items-center justify-center mr-4`}>
            <i className={`fas fa-${tech.icon} text-2xl text-white`}></i>
          </div>
          <div>
            <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>{tech.title}</h3>
            <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mt-1">
              {tech.status}
            </span>
          </div>
        </div>
        <p className="text-gray-300 mb-6">{tech.description}</p>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">{tech.specLabel}</span>
            <span className="text-sm font-semibold text-yellow-400">{tech.specValue}</span>
          </div>
          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full" 
                 style={{width: `${tech.progress}%`}}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${inter.className}`} style={{ backgroundColor: COLORS.cream }}>
      <style jsx global>{`
        :root {
          --pp-gold: ${COLORS.gold};
          --pp-dark-gold: ${COLORS.darkGold};
          --pp-light-gold: ${COLORS.lightGold};
          --pp-blue: ${COLORS.deepBlue};
          --pp-cream: ${COLORS.cream};
          --pp-charcoal: ${COLORS.charcoal};
        }
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--pp-gold), var(--pp-light-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .vanta-bg {
          position: absolute !important;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .innovation-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7));
          backdrop-filter: blur(12px);
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .innovation-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          border-color: var(--pp-gold);
        }
        
        .patent-badge {
          background: linear-gradient(135deg, var(--pp-gold), var(--pp-dark-gold));
          color: white;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .timeline-item {
          position: relative;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 2rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--pp-gold), rgba(212, 175, 55, 0.3));
        }
        
        .timeline-marker {
          background: var(--pp-gold);
          border: 4px solid white;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
          width: 1.5rem;
          height: 1.5rem;
        }
        
        .future-tech-card {
          background: linear-gradient(135deg, #1f2937, #374151);
          border: 1px solid rgba(212, 175, 55, 0.15);
          transition: all 0.4s ease;
        }
        
        .future-tech-card:hover {
          border-color: var(--pp-gold);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.1);
        }
        
        .research-lab {
          background: linear-gradient(135deg, var(--pp-blue), var(--pp-charcoal));
          position: relative;
          overflow: hidden;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className={`hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight ${playfair.className}`}>
            Innovation<br />Horlogère
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Repousser les limites de l'impossible depuis 1839 avec des avancées technologiques révolutionnaires
          </p>
          <button
            onClick={() => router.push('/collections')}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Découvrir les innovations
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
              Chronologie d'Innovation
            </h2>
            <p className="text-xl text-gray-600">
              Les jalons technologiques qui ont façonné l'avenir horloger
            </p>
          </div>
          
          <div className="space-y-12">
            {timelineData.map((item, idx) => (
              <div key={idx} className="timeline-item scroll-reveal">
                <div className="timeline-marker"></div>
                <div className="bg-white rounded-xl shadow-lg p-8 ml-12 border border-gray-100 hover:border-yellow-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className={`text-3xl font-bold text-yellow-600 ${playfair.className}`}>{item.year}</span>
                      <h3 className={`text-2xl font-semibold text-gray-900 ${playfair.className}`}>{item.title}</h3>
                    </div>
                    <span className="text-sm font-semibold px-4 py-2 rounded-full" 
                          style={{
                            backgroundColor: `${getCategoryColor(item.category)}20`,
                            color: getCategoryColor(item.category)
                          }}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                      <span>Complexité technique</span>
                      <span>{item.complexity}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-1000" 
                           style={{width: `${item.complexity}%`}}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Section */}
      <section className="research-lab py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 ${playfair.className}`}>Recherche & Développement</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre centre de R&D repousse constamment les frontières de l'horlogerie avec des technologies de pointe
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: 'flask', title: 'Laboratoires d\'Excellence', count: '15', label: 'Laboratoires spécialisés', desc: 'Équipés des technologies les plus avancées pour tester et développer de nouveaux matériaux et mécanismes.' },
              { icon: 'users', title: 'Équipe de Recherche', count: '200+', label: 'Chercheurs et ingénieurs', desc: 'Une équipe d\'experts dédiée à l\'innovation et au développement de technologies révolutionnaires.' },
              { icon: 'award', title: 'Brevets d\'Invention', count: '100+', label: 'Brevets déposés', desc: 'Plus de 100 brevets déposés, témoignant de notre engagement constant envers l\'innovation.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-10 scroll-reveal">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <i className={`fas fa-${item.icon} text-3xl text-white`}></i>
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-center ${playfair.className}`}>{item.title}</h3>
                <p className="text-gray-300 text-center mb-8 leading-relaxed">{item.desc}</p>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-400 mb-2" data-count={item.count.replace('+', '')}>{item.count.replace('+', '')}</div>
                  <div className="text-sm text-gray-400 tracking-wide">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Tech Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
              Technologies d'Avenir
            </h2>
            <p className="text-xl text-gray-600">
              Les innovations qui façonneront l'horlogerie de demain
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                icon: 'brain', 
                title: 'IA Horlogère', 
                status: 'BÊTA', 
                color: 'blue',
                description: 'L\'intelligence artificielle révolutionne l\'ajustage des mouvements avec une précision inégalée.',
                specLabel: 'Précision améliorée',
                specValue: '+47%',
                progress: 94
              },
              { 
                icon: 'atom', 
                title: 'Horlogerie Quantique', 
                status: 'R&D', 
                color: 'purple',
                description: 'L\'exploration des oscillateurs quantiques pour atteindre une stabilité temporelle jusque-là inégalée.',
                specLabel: 'Stabilité temporelle',
                specValue: '10^-12s',
                progress: 89
              },
              { 
                icon: 'leaf', 
                title: 'Matériaux Durables', 
                status: 'ECO', 
                color: 'green',
                description: 'Développement de matériaux composites 100% recyclables et biodégradables.',
                specLabel: 'Réduction CO₂',
                specValue: '-78%',
                progress: 92
              },
              { 
                icon: 'microchip', 
                title: 'Nano-Mécatronique', 
                status: 'PROTOTYPE', 
                color: 'red',
                description: 'Intégration de systèmes nano-mécatroniques pour des complications intelligentes.',
                specLabel: 'Taille des composants',
                specValue: 'Nanométrique',
                progress: 96
              }
            ].map((tech, idx) => (
              <FutureTechCard key={idx} tech={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>
            L'Avenir de l'Horlogerie
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez-nous dans notre quête constante d'innovation et de perfection horlogère
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/collections')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Découvrir les innovations
            </button>
            <button
              onClick={() => router.push('/heritage')}
              className="border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-10 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Explorer l'héritage
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-6 ${playfair.className}`}>
              <span className="bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">Patek</span> <span className="text-white">Philippe</span>
            </div>
            <p className="text-gray-400 mb-8 tracking-wide">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-8 mb-12">
              {['instagram', 'facebook', 'twitter', 'youtube'].map(social => (
                <a key={social} href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-yellow-600 transition-all duration-300">
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm tracking-wide">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
