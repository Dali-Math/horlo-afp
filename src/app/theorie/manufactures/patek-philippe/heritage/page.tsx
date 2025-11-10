// pages/heritage.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';

// Déclaration TypeScript pour Vanta
declare global {
  interface Window {
    VANTA: {
      WAVES: (options: any) => {
        destroy: () => void;
      };
    };
  }
}

export default function Heritage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<ReturnType<typeof window.VANTA.WAVES> | null>(null);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Initialisation de Vanta.js
    const initializeVanta = () => {
      if (vantaBgRef.current && window.VANTA && window.VANTA.WAVES) {
        vantaEffectRef.current = window.VANTA.WAVES({
          el: vantaBgRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x1a2332,
          shininess: 30.00,
          waveHeight: 15.00,
          waveSpeed: 0.75,
          zoom: 0.65
        });
      }
    };

    // Animation de la timeline
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
      timelineObserver.observe(item);
    });

    // Scroll reveal animation
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      scrollObserver.observe(el);
    });

    // Effet parallaxe optimisé avec requestAnimationFrame
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestRef.current = requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallax = vantaBgRef.current;
          if (parallax) {
            const speed = scrolled * 0.3;
            parallax.style.transform = `translateY(${speed}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initialisation après le chargement des scripts
    if (typeof window !== 'undefined') {
      if (window.VANTA) {
        initializeVanta();
      } else {
        // Attendre que Vanta soit chargé
        window.addEventListener('load', initializeVanta);
      }
    }

    return () => {
      // Nettoyage
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', initializeVanta);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
      timelineObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Scripts externes */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"
        strategy="lazyOnload"
      />

      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
          --silver: #e8e8e8;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: var(--cream);
          overflow-x: hidden;
        }
        
        .hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          will-change: transform;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
          font-weight: 500;
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
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline {
          position: relative;
          padding: 2rem 0;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--gold), rgba(212, 175, 55, 0.3));
          transform: translateX(-50%);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 5rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }
        
        .timeline-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd) .timeline-content {
          margin-right: 55%;
          text-align: right;
        }
        
        .timeline-item:nth-child(even) .timeline-content {
          margin-left: 55%;
          text-align: left;
        }
        
        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 2rem;
          width: 20px;
          height: 20px;
          background: var(--gold);
          border: 4px solid white;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
          transition: all 0.3s ease;
        }
        
        .timeline-item:hover .timeline-marker {
          box-shadow: 0 0 0 8px rgba(212, 175, 55, 0.15);
          transform: translateX(-50%) scale(1.1);
        }
        
        .timeline-year {
          position: absolute;
          left: 50%;
          top: 0;
          background: var(--gold);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.9rem;
          transform: translateX(-50%);
          z-index: 5;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }
        
        .heritage-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-radius: 16px;
        }
        
        .heritage-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .quote-section {
          background: linear-gradient(135deg, var(--deep-blue), var(--charcoal));
          position: relative;
          overflow: hidden;
        }
        
        .quote-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .quote-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.25rem;
          line-height: 1.4;
          letter-spacing: -0.02em;
          position: relative;
          z-index: 2;
        }
        
        /* Media queries pour le responsive */
        @media (max-width: 768px) {
          .timeline::before {
            left: 2rem;
          }
          
          .timeline-item:nth-child(odd) .timeline-content,
          .timeline-item:nth-child(even) .timeline-content {
            margin-left: 4rem;
            margin-right: 0;
            text-align: left;
          }
          
          .timeline-marker {
            left: 2rem;
          }
          
          .timeline-year {
            left: 2rem;
            font-size: 0.8rem;
            padding: 0.4rem 1rem;
          }
          
          .quote-text {
            font-size: 1.75rem;
          }
          
          .hero-title {
            font-size: 3.5rem;
          }
        }
        
        /* Accessibilité : réduction des animations */
        @media (prefers-reduced-motion: reduce) {
          .vanta-bg {
            transform: none !important;
          }
          
          .scroll-reveal {
            transition: none;
          }
          
          .timeline-item {
            transition: none;
          }
          
          .quote-section::before {
            animation: none;
          }
        }
        
        /* Optimisation pour mobile */
        @media (max-width: 480px) {
          .vanta-bg {
            min-height: 100vh;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <Link href="/"><span className="text-yellow-600">Patek</span> Philippe</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="nav-link text-gray-700 hover:text-yellow-600">Accueil</Link>
              <Link href="/collections" className="nav-link text-gray-700 hover:text-yellow-600">Collections</Link>
              <Link href="/heritage" className="nav-link text-yellow-600 font-semibold">Patrimoine</Link>
              <Link href="/craftsmanship" className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</Link>
              <Link href="/innovation" className="nav-link text-gray-700 hover:text-yellow-600">Innovation</Link>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                className="text-gray-700 hover:text-yellow-600 transition-colors"
                aria-label="Menu mobile"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
          <div className="px-6 py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-yellow-600">Accueil</Link>
            <Link href="/collections" className="block text-gray-700 hover:text-yellow-600">Collections</Link>
            <Link href="/heritage" className="block text-yellow-600 font-semibold">Patrimoine</Link>
            <Link href="/craftsmanship" className="block text-gray-700 hover:text-yellow-600">Savoir-faire</Link>
            <Link href="/innovation" className="block text-gray-700 hover:text-yellow-600">Innovation</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-gray-100 to-gray-200">
        <div ref={vantaBgRef} className="vanta-bg" aria-hidden="true"></div>
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Notre<br/>Héritage
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Plus de 180 ans d'excellence horlogère, façonnés par la passion, l'innovation et le savoir-faire suisse
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chronologie d'Excellence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Les moments qui ont défini l'histoire de Patek Philippe</p>
          </div>
          
          <div className="timeline">
            {[
              {
                year: "1839",
                title: "Fondation de la Manufacture",
                desc: "Antoine Norbert de Patek, officier polonais en exil, et François Czapek, horloger tchèque, fondent Patek, Czapek & Cie à Genève. Leur vision : créer des montres d'exception pour une clientèle d'élite.",
                icon: "fa-map-marker-alt"
              },
              {
                year: "1845",
                title: "L'Invention Révolutionnaire",
                desc: "Jean Adrien Philippe rejoint l'entreprise et apporte son invention révolutionnaire : le remontoir à couronne. Cette innovation transforme l'industrie horlogère et établit les bases de la montre moderne.",
                icon: "fa-cog"
              },
              {
                year: "1851",
                title: "Naissance de Patek Philippe",
                desc: "Patek Philippe & Cie est officiellement créée. La même année, la manufacture expose à la Grande Exposition de Londres et reçoit la reconnaissance internationale pour son excellence horlogère.",
                icon: "fa-crown"
              },
              {
                year: "1868",
                title: "La Première Montre-bracelet",
                desc: "Patek Philippe crée la première montre-bracelet avec remontoir à couronne pour la Comtesse Koscowicz de Hongrie. Cette pièce historique marque le début de l'ère des montres-bracelets de luxe.",
                icon: "fa-gem"
              },
              {
                year: "1932",
                title: "La Calatrava est Née",
                desc: "Introduction de la célèbre collection Calatrava, nommée d'après l'ordre de Calatrava. Son design pur et intemporel devient l'emblème de l'élégance horlogère classique et influence l'industrie entière.",
                icon: "fa-star"
              },
              {
                year: "1976",
                title: "L'Ère du Sport de Luxe",
                desc: "Lancement du Nautilus, conçu par le légendaire Gérald Genta. Cette montre sportive en acier révolutionne le concept du luxe sportif et devient l'une des pièces les plus convoitées au monde.",
                icon: "fa-anchor"
              },
              {
                year: "1989",
                title: "150 Ans d'Excellence",
                desc: "Pour célébrer ses 150 ans, Patek Philippe crée la montre la plus compliquée du monde à l'époque : le Calibre 89 avec 33 complications. Un chef-d'œuvre technique qui défie l'imagination.",
                icon: "fa-trophy"
              },
              {
                year: "1999",
                title: "La Twenty~4 pour Elle",
                desc: "Lancement de la collection Twenty~4, spécialement conçue pour la femme moderne. Cette ligne combine élégance quotidienne et mécanique de haute précision, ouvrant une nouvelle ère pour l'horlogerie féminine.",
                icon: "fa-female"
              },
              {
                year: "2014",
                title: "Innovation Perpétuelle",
                desc: "Présentation du Calibre 1755, l'un des mouvements les plus minces jamais créés pour une montre à répétition minutes. Cette prouesse technique démontre l'engagement continu de Patek Philippe vers l'innovation.",
                icon: "fa-microchip"
              }
            ].map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center text-yellow-600 font-medium">
                      <i className={`fas ${item.icon} mr-2`}></i>
                      <span className="text-sm">
                        {item.year === "1839" && "Genève, Suisse"}
                        {item.year === "1845" && "Brevet du remontoir à couronne"}
                        {item.year === "1851" && "Reconnaissance royale"}
                        {item.year === "1868" && "Première montre-bracelet de luxe"}
                        {item.year === "1932" && "Design iconique"}
                        {item.year === "1976" && "Révolution du luxe sportif"}
                        {item.year === "1989" && "Record mondial"}
                        {item.year === "1999" && "Horlogerie féminine"}
                        {item.year === "2014" && "Technologie d'avant-garde"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section py-24 text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <i className="fas fa-quote-left text-6xl text-yellow-600 opacity-50"></i>
          </div>
          <blockquote className="quote-text mb-8 font-medium">
            "Vous ne possédez jamais réellement une montre Patek Philippe. 
            Vous en assurez simplement la garde pour les générations suivantes."
          </blockquote>
          <div className="text-lg text-yellow-600 font-semibold uppercase tracking-wide">
            — Slogan Patek Philippe
          </div>
        </div>
      </section>

      {/* Heritage Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Les Valeurs du Patrimoine</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Les principes fondamentaux qui ont guidé Patek Philippe depuis 1839</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-gradient-to-br from-white to-gray-50">
              <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-600/20">
                <i className="fas fa-crown text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                L'engagement inébranlable envers la qualité supérieure dans chaque aspect 
                de la fabrication horlogère, depuis les matériaux jusqu'à la finition.
              </p>
            </div>
            
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-gradient-to-br from-white to-gray-50">
              <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-600/20">
                <i className="fas fa-dna text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Héritage</h3>
              <p className="text-gray-600 leading-relaxed">
                La transmission du savoir-faire de génération en génération, 
                perpétuant les traditions horlogères suisses les plus authentiques.
              </p>
            </div>
            
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-gradient-to-br from-white to-gray-50">
              <div className="w-20 h-20 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-600/20">
                <i className="fas fa-lightbulb text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600 leading-relaxed">
                La recherche constante de nouvelles solutions techniques et esthétiques 
                pour repousser les limites de l'art horloger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Legacy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Une Affaire de Famille</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Depuis ses débuts, Patek Philippe est restée une entreprise familiale indépendante. 
                Cette indépendance permet à la manufacture de préserver ses valeurs fondamentales 
                et de maintenir une qualité exceptionnelle sans compromis.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Indépendance Totale", desc: "Contrôle complet sur chaque étape de la production", icon: "check" },
                  { title: "Tradition Vivante", desc: "Savoir-faire transmis de maître en apprenti", icon: "check" },
                  { title: "Vision à Long Terme", desc: "Développement durable et pérennité garantie", icon: "check" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                      <i className={`fas fa-${item.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a62d?w=800&h=600&fit=crop" 
                  alt="Atelier Patek Philippe" 
                  className="rounded-xl shadow-2xl w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-3xl font-bold text-yellow-600 -mb-1">5</div>
                  <div className="text-sm text-gray-600 font-medium">Générations de maîtres horlogers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Devenez Gardien du Temps</h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la longue lignée de collectionneurs qui perpétuent l'héritage Patek Philippe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections" 
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105 inline-block shadow-lg shadow-yellow-600/30"
            >
              Explorer les collections
            </Link>
            <Link 
              href="/craftsmanship" 
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300 inline-block"
            >
              Découvrir le savoir-faire
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6 text-lg">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: "instagram", label: "Instagram" },
                { icon: "facebook", label: "Facebook" },
                { icon: "twitter", label: "Twitter" },
                { icon: "youtube", label: "YouTube" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-400 hover:text-yellow-600 transition-all duration-300 hover:-translate-y-1 inline-block"
                  aria-label={social.label}
                >
                  <i className={`fab fa-${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
