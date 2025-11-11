// Corrige le build App Router Next.js 14
"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] });

declare global {
  interface Window {
    VANTA: any;
  }
}

const InnovationPage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA) {
      const effect = window.VANTA.HALO({
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
      setVantaEffect(effect);
    }

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    // Animated counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach((counter: any) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = Math.floor(current);
              }
            }, 20);
          });
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      counterObserver.observe(el);
    });

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#vanta-bg');
      if (parallax) {
        const speed = scrolled * 0.3;
        (parallax as HTMLElement).style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      window.removeEventListener('scroll', handleScroll);
      elements.forEach(el => observer.unobserve(el));
    };
  }, [vantaEffect]);

  return (
    <>
      <Head>
        <title>Innovation - Patek Philippe Référence Mondiale</title>
        <meta name="description" content="Repousser les limites de l'impossible depuis 1839 avec des avancées technologiques révolutionnaires" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          rel="stylesheet" 
        />
      </Head>

      {/* Scripts Vanta.js */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js" 
        strategy="afterInteractive" 
      />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 ${inter.className}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <button
                onClick={() => router.push('/')}
                className="nav-link"
              >
                <span className="text-yellow-600">Patek</span> Philippe
              </button>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => router.push('/')} className="nav-link text-gray-700 hover:text-yellow-600">Accueil</button>
              <button onClick={() => router.push('/collections')} className="nav-link text-gray-700 hover:text-yellow-600">Héritage</button>
              <button onClick={() => router.push('/heritage')} className="nav-link text-gray-700 hover:text-yellow-600">Collections</button>
              <button onClick={() => router.push('/craftsmanship')} className="nav-link text-gray-700 hover:text-yellow-600">Innovation</button>
              <button onClick={() => router.push('/innovation')} className="nav-link text-yellow-600 font-semibold">Savoir-faire</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => router.push('/')} className="block text-gray-700 hover:text-yellow-600">Accueil</button>
              <button onClick={() => router.push('/collections')} className="block text-gray-700 hover:text-yellow-600">Héritage</button>
              <button onClick={() => router.push('/heritage')} className="block text-gray-700 hover:text-yellow-600">Collections</button>
              <button onClick={() => router.push('/craftsmanship')} className="block text-gray-700 hover:text-yellow-600">Innovation</button>
              <button onClick={() => router.push('/innovation')} className="block text-yellow-600 font-semibold">Savoir-faire</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className={`hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight ${playfair.className}`}>
            Innovation<br />Horlogère
          </h1>
          <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed ${inter.className}`}>
            Repousser les limites de l'impossible depuis 1839 avec des avancées technologiques révolutionnaires
          </p>
        </div>
      </section>

      {/* Revolutionary Inventions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Inventions Révolutionnaires</h2>
            <p className={`text-xl text-gray-600 ${inter.className}`}>Les innovations qui ont transformé l'industrie horlogère</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="innovation-card rounded-xl overflow-hidden scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop" alt="Remontoir à couronne" className="w-full h-48 object-cover" />
                <div className="patent-badge">BREVET 1845</div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${playfair.className}`}>Remontoir à Couronne</h3>
                <p className={`text-gray-600 mb-4 ${inter.className}`}>
                  L'invention de Jean Adrien Philippe qui a révolutionné l'industrie horlogère 
                  en permettant le remontage et le réglage par la couronne.
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <div className="tech-spec">
                    <span className="text-gray-300">Impact</span>
                    <span className="text-yellow-400">Révolutionnaire</span>
                  </div>
                  <div className="tech-spec">
                    <span className="text-gray-300">Adoption</span>
                    <span className="text-yellow-400">Mondiale</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="innovation-card rounded-xl overflow-hidden scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=600&fit=crop" alt="Montre-bracelet" className="w-full h-48 object-cover" />
                <div className="patent-badge">INNOVATION 1868</div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${playfair.className}`}>Montre-Bracelet</h3>
                <p className={`text-gray-600 mb-4 ${inter.className}`}>
                  La première montre-bracelet avec remontoir à couronne, créée pour la Comtesse 
                  Koscowicz, marquant le début d'une nouvelle ère horlogère.
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <div className="tech-spec">
                    <span className="text-gray-300">Précédent</span>
                    <span className="text-yellow-400">Montres de poche</span>
                  </div>
                  <div className="tech-spec">
                    <span className="text-gray-300">Innovation</span>
                    <span className="text-yellow-400">Portable</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="innovation-card rounded-xl overflow-hidden scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1612817159949-195b619eb547?w=800&h=600&fit=crop" alt="Complications multiples" className="w-full h-48 object-cover" />
                <div className="patent-badge">MASTERPIECE 1989</div>
              </div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${playfair.className}`}>Calibre 89</h3>
                <p className={`text-gray-600 mb-4 ${inter.className}`}>
                  La montre la plus compliquée du monde en 1989 avec 33 complications, 
                  célébrant 150 ans d'excellence horlogère.
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg">
                  <div className="tech-spec">
                    <span className="text-gray-300">Complications</span>
                    <span className="text-yellow-400">33 fonctions</span>
                  </div>
                  <div className="tech-spec">
                    <span className="text-gray-300">Développement</span>
                    <span className="text-yellow-400">9 ans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Chronologie d'Innovation</h2>
            <p className={`text-xl text-gray-600 ${inter.className}`}>Les jalons technologiques qui ont façonné l'avenir horloger</p>
          </div>
          
          <div className="innovation-timeline">
            {[
              {
                year: '1845',
                title: 'Remontoir à Couronne',
                description: 'Jean Adrien Philippe révolutionne l\'horlogerie avec son invention du remontoir à couronne, permettant le remontage et le réglage des montres d\'une manière jamais vue auparavant.',
                category: 'FONDATION',
                complexity: 85
              },
              {
                year: '1889',
                title: 'Sonnerie à Répétition',
                description: 'Développement d\'un mécanisme de sonnerie breveté qui permet aux montres de sonner les heures, les quarts et les minutes à la demande.',
                category: 'ACOUSTIQUE',
                complexity: 90
              },
              {
                year: '1925',
                title: 'Calibre à Rattrapante',
                description: 'Introduction du chronographe à rattrapante, permettant la mesure de temps intermédiaires sans arrêter le chronographe principal.',
                category: 'CHRONOGRAPHE',
                complexity: 88
              },
              {
                year: '1962',
                title: 'Spiral Silicium',
                description: 'Patek Philippe pionnier dans l\'utilisation du silicium pour les composants horlogers, offrant une résistance magnétique et une stabilité thermique exceptionnelles.',
                category: 'MATÉRIAUX',
                complexity: 92
              },
              {
                year: '2011',
                title: 'Oscillateur Gyromax®',
                description: 'L\'oscillateur Gyromax® révolutionnaire qui améliore la précision chronométrique tout en réduisant l\'usure des composants.',
                category: 'PRÉCISION',
                complexity: 95
              }
            ].map((item, index) => (
              <div key={index} className="timeline-item scroll-reveal">
                <div className="timeline-marker"></div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-2xl font-bold text-gray-900 ${playfair.className}`}>{item.year} - {item.title}</h3>
                    <span className={`bg-${
                      item.category === 'FONDATION' ? 'yellow' : 
                      item.category === 'ACOUSTIQUE' ? 'blue' : 
                      item.category === 'CHRONOGRAPHE' ? 'green' : 
                      item.category === 'MATÉRIAUX' ? 'purple' : 
                      item.category === 'PRÉCISION' ? 'red' : 'gray'
                    }-600 text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                      {item.category}
                    </span>
                  </div>
                  <p className={`text-gray-600 mb-4 ${inter.className}`}>{item.description}</p>
                  <div className="complexity-meter">
                    <div className="complexity-fill" style={{width: `${item.complexity}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Development */}
      <section className="research-lab py-20 text-white relative">
        <div className="floating-icon">
          <i className="fas fa-atom text-6xl"></i>
        </div>
        <div className="floating-icon">
          <i className="fas fa-dna text-5xl"></i>
        </div>
        <div className="floating-icon">
          <i className="fas fa-microscope text-4xl"></i>
        </div>
        <div className="floating-icon">
          <i className="fas fa-rocket text-5xl"></i>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>Recherche & Développement</h2>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${inter.className}`}>
              Notre centre de R&D repousse constamment les frontières de l'horlogerie avec des technologies 
              de pointe et des partenariats avec les institutions scientifiques les plus prestigieuses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-flask text-2xl text-white"></i>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${playfair.className}`}>Laboratoires d'Excellence</h3>
              <p className={`text-gray-300 text-center mb-6 ${inter.className}`}>
                Des laboratoires équipés des technologies les plus avancées pour tester 
                et développer de nouveaux matériaux et mécanismes.
              </p>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">15</div>
                <div className={`text-sm text-gray-400 ${inter.className}`}>Laboratoires spécialisés</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-users text-2xl text-white"></i>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${playfair.className}`}>Équipe de Recherche</h3>
              <p className={`text-gray-300 text-center mb-6 ${inter.className}`}>
                Une équipe d'ingénieurs, physiciens et horlogers dédiée à l'innovation 
                et au développement de technologies révolutionnaires.
              </p>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">200+</div>
                <div className={`text-sm text-gray-400 ${inter.className}`}>Chercheurs et ingénieurs</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-award text-2xl text-white"></i>
              </div>
              <h3 className={`text-2xl font-bold mb-4 text-center ${playfair.className}`}>Brevets d'Invention</h3>
              <p className={`text-gray-300 text-center mb-6 ${inter.className}`}>
                Plus de 100 brevets déposés au fil des décennies, 
                témoignant de notre engagement constant envers l'innovation.
              </p>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">100+</div>
                <div className={`text-sm text-gray-400 ${inter.className}`}>Brevets déposés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Technologies d'Avenir</h2>
            <p className={`text-xl text-gray-600 ${inter.className}`}>Les innovations qui façonneront l'horlogerie de demain</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="future-tech rounded-xl p-8 scroll-reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-brain text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>IA Horlogère</h3>
                  <div className="ai-indicator">BÊTA</div>
                </div>
              </div>
              <p className={`text-gray-300 mb-6 ${inter.className}`}>
                L'intelligence artificielle révolutionne l'ajustage des mouvements avec une précision 
                inégalée, analysant des milliers de paramètres pour optimiser la performance chronométrique.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Précision améliorée</span>
                  <span className="text-sm font-semibold text-white">+47%</span>
                </div>
                <div className="complexity-meter">
                  <div className="complexity-fill" style={{width: '94%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="future-tech rounded-xl p-8 scroll-reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-atom text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>Horlogerie Quantique</h3>
                  <div className="quantum-indicator">R&D</div>
                </div>
              </div>
              <p className={`text-gray-300 mb-6 ${inter.className}`}>
                L'exploration des oscillateurs quantiques pour atteindre une stabilité 
                temporelle jusque-là inégalée, ouvrant la voie à une nouvelle ère de précision absolue.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Stabilité temporelle</span>
                  <span className="text-sm font-semibold text-white">10^-12s</span>
                </div>
                <div className="complexity-meter">
                  <div className="complexity-fill" style={{width: '89%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="future-tech rounded-xl p-8 scroll-reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-leaf text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>Matériaux Durables</h3>
                  <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold ml-2">ECO</span>
                </div>
              </div>
              <p className={`text-gray-300 mb-6 ${inter.className}`}>
                Développement de matériaux composites 100% recyclables et biodégradables 
                pour une horlogerie respectueuse de l'environnement sans compromis sur la qualité.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Réduction CO₂</span>
                  <span className="text-sm font-semibold text-white">-78%</span>
                </div>
                <div className="complexity-meter">
                  <div className="complexity-fill" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="future-tech rounded-xl p-8 scroll-reveal">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-microchip text-2xl text-white"></i>
                </div>
                <div>
                  <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>Nano-Mécatronique</h3>
                  <span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold ml-2">PROTOTYPE</span>
                </div>
              </div>
              <p className={`text-gray-300 mb-6 ${inter.className}`}>
                Intégration de systèmes nano-mécatroniques pour des complications 
                intelligentes qui s'adaptent au comportement et aux préférences du porteur.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Taille des composants</span>
                  <span className="text-sm font-semibold text-white">Nanométrique</span>
                </div>
                <div className="complexity-meter">
                  <div className="complexity-fill" style={{width: '96%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Metrics */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>Impact de l'Innovation</h2>
            <p className={`text-xl text-gray-300 ${inter.className}`}>Les chiffres qui témoignent de notre engagement envers l'excellence</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4" data-count="100">0</div>
              <h3 className={`text-xl font-semibold mb-2 ${playfair.className}`}>Brevets Déposés</h3>
              <p className={`text-gray-400 ${inter.className}`}>Inventions protégées</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4" data-count="33">0</div>
              <h3 className={`text-xl font-semibold mb-2 ${playfair.className}`}>Complications Record</h3>
              <p className={`text-gray-400 ${inter.className}`}>Sur le Calibre 89</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4" data-count="200">0</div>
              <h3 className={`text-xl font-semibold mb-2 ${playfair.className}`}>Chercheurs</h3>
              <p className={`text-gray-400 ${inter.className}`}>Dédiés à l'innovation</p>
            </div>
            
            <div className="text-center scroll-reveal">
              <div className="text-5xl font-bold text-yellow-600 mb-4" data-count="99">0</div>
              <h3 className={`text-xl font-semibold mb-2 ${playfair.className}`}>% Précision</h3>
              <p className={`text-gray-400 ${inter.className}`}>Standards qualité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>L'Avenir de l'Horlogerie</h2>
          <p className={`text-xl text-gray-600 mb-8 ${inter.className}`}>
            Rejoignez-nous dans notre quête constante d'innovation et de perfection horlogère
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/collections')}
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Découvrir les innovations
            </button>
            <button
              onClick={() => router.push('/heritage')}
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >
              Explorer l'héritage
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-4 ${playfair.className}`}>
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className={`text-gray-400 mb-6 ${inter.className}`}>La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className={`text-gray-500 text-sm ${inter.className}`}>
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
          --silver: #e8e8e8;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          overflow-x: hidden;
        }
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .innovation-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .innovation-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .innovation-card:hover::before {
          left: 100%;
        }
        
        .innovation-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .patent-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--gold);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: bold;
          z-index: 10;
        }
        
        .tech-spec {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .tech-spec:last-child {
          border-bottom: none;
        }
        
        .innovation-timeline {
          position: relative;
        }
        
        .innovation-timeline::before {
          content: '';
          position: absolute;
          left: 2rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--gold), rgba(212, 175, 55, 0.3));
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          padding-left: 5rem;
        }
        
        .timeline-marker {
          position: absolute;
          left: 1.25rem;
          top: 1rem;
          width: 1.5rem;
          height: 1.5rem;
          background: var(--gold);
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.2);
        }
        
        .complexity-meter {
          width: 100%;
          height: 12px;
          background: #e5e7eb;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        
        .complexity-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold), #f4d03f, #ffd700);
          border-radius: 6px;
          transition: width 2s ease;
          position: relative;
        }
        
        .complexity-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .research-lab {
          background: linear-gradient(135deg, var(--deep-blue), var(--charcoal));
          position: relative;
          overflow: hidden;
        }
        
        .research-lab::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1), transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.05), transparent 50%);
        }
        
        .floating-icon {
          position: absolute;
          color: rgba(212, 175, 55, 0.1);
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-icon:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
        .floating-icon:nth-child(2) { top: 20%; right: 15%; animation-delay: 2s; }
        .floating-icon:nth-child(3) { bottom: 30%; left: 20%; animation-delay: 4s; }
        .floating-icon:nth-child(4) { bottom: 10%; right: 10%; animation-delay: 1s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(10px) rotate(-5deg); }
        }
        
        .future-tech {
          background: linear-gradient(135deg, #1f2937, #374151);
          border: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.4s ease;
        }
        
        .future-tech:hover {
          border-color: var(--gold);
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.1);
        }
        
        .ai-indicator {
          display: inline-block;
          background: linear-gradient(45deg, #3b82f6, #1d4ed8);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-left: 0.5rem;
        }
        
        .quantum-indicator {
          display: inline-block;
          background: linear-gradient(45deg, #8b5cf6, #7c3aed);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: bold;
          margin-left: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default InnovationPage;
