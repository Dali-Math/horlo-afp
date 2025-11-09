// app/page.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    VANTA?: any;
    THREE?: any;
  }
}

export default function Home(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaInstance = useRef<any>(null);

  useEffect(() => {
    // Chargement dynamique des scripts CDN
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.body.appendChild(script);
      });
    };

    // Initialisation Vanta.js
    const initVanta = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js');

        if (vantaRef.current && window.VANTA && window.VANTA.BIRDS) {
          vantaInstance.current = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            birdSize: 1.20,
            wingSpan: 25.00,
            speedLimit: 3.00,
            separation: 20.00,
            alignment: 20.00,
            cohesion: 20.00,
            quantity: 3.00
          });
        }
      } catch (error) {
        console.error('Erreur chargement Vanta.js:', error);
      }
    };

    initVanta();

    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Effet parallax
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = vantaRef.current;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileMenuOpen(false);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="text-gray-800" style={{ background: '#f8f6f0', overflowX: 'hidden' }}>
      {/* Styles globaux */}
      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
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
        .watch-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
        }
        .watch-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        .timeline-item {
          position: relative;
          padding-left: 2rem;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.5rem;
          width: 12px;
          height: 12px;
          background: var(--gold);
          border-radius: 50%;
        }
        .timeline-item::after {
          content: '';
          position: absolute;
          left: 5px;
          top: 1.5rem;
          width: 2px;
          height: calc(100% - 1rem);
          background: linear-gradient(to bottom, var(--gold), transparent);
        }
        .timeline-item:last-child::after {
          display: none;
        }
      `}</style>

      {/* Polices et icons */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="nav-link text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, '#home')}>Accueil</a>
              <a href="collections.html" className="nav-link text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'collections.html')}>Collections</a>
              <a href="heritage.html" className="nav-link text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'heritage.html')}>Patrimoine</a>
              <a href="craftsmanship.html" className="nav-link text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'craftsmanship.html')}>Savoir-faire</a>
              <a href="innovation.html" className="nav-link text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'innovation.html')}>Innovation</a>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, '#home')}>Accueil</a>
              <a href="collections.html" className="block text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'collections.html')}>Collections</a>
              <a href="heritage.html" className="block text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'heritage.html')}>Patrimoine</a>
              <a href="craftsmanship.html" className="block text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'craftsmanship.html')}>Savoir-faire</a>
              <a href="innovation.html" className="block text-gray-700 hover:text-yellow-600" onClick={(e) => handleNavClick(e, 'innovation.html')}>Innovation</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div ref={vantaRef} className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="floating-element">
            <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
              L'Excellence<br/>Horlogère
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => window.location.href = 'collections.html'} className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
                Découvrir les Collections
              </button>
              <button onClick={() => window.location.href = 'heritage.html'} className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
                Notre Héritage
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Un Siècle d'Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque garde-temps Patek Philippe est le fruit de siècles de savoir-faire transmis de génération en génération
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="space-y-8">
                <div className="timeline-item">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1839 - Fondation</h3>
                  <p className="text-gray-600">Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1845 - Innovation</h3>
                  <p className="text-gray-600">Jean Adrien Philippe rejoint l'entreprise et apporte son invention du remontoir à couronne</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1851 - Renommée</h3>
                  <p className="text-gray-600">Patek Philippe & Cie est officiellement créée, marquant le début d'une légende</p>
                </div>
                <div className="timeline-item">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Aujourd'hui - Excellence</h3>
                  <p className="text-gray-600">Plus de 180 ans d'innovation continue dans l'art horloger suisse</p>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1587836374828-4dbafa94cfbe?w=800&h=600&fit=crop" alt="Montre Patek Philippe classique" className="rounded-lg shadow-2xl w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Collections Iconiques</h2>
            <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="watch-card bg-white rounded-xl p-6 scroll-reveal">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop" alt="Nautilus" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Nautilus</h3>
              <p className="text-gray-600 mb-4">Le symbole du luxe sportif, alliant robustesse et élégance dans un design iconique</p>
              <button onClick={() => window.location.href = 'collections.html#nautilus'} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
            <div className="watch-card bg-white rounded-xl p-6 scroll-reveal">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop" alt="Calatrava" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Calatrava</h3>
              <p className="text-gray-600 mb-4">L'essence de l'élégance classique, incarnant la pureté du design horloger</p>
              <button onClick={() => window.location.href = 'collections.html#calatrava'} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
            <div className="watch-card bg-white rounded-xl p-6 scroll-reveal">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg">
                <img src="https://images.unsplash.com/photo-1612817159949-195b619eb547?w=400&h=400&fit=crop" alt="Grandes Complications" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Grandes Complications</h3>
              <p className="text-gray-600 mb-4">Le sommet de l'ingénierie horlogère, où l'art rencontre la complexité technique</p>
              <button onClick={() => window.location.href = 'collections.html#complications'} className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Savoir-Faire<br/>Suisse</h2>
              <p className="text-xl text-gray-600 mb-8">
                Chaque composant est fabriqué et assemblé à la main par des maîtres horlogers, 
                garantissant une qualité exceptionnelle qui dure des générations.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Assemblage manuel par des maîtres horlogers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Contrôle qualité rigoureux à chaque étape</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Matériaux nobles sélectionnés avec soin</span>
                </div>
              </div>
              <button onClick={() => window.location.href = 'craftsmanship.html'} className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300">
                Découvrir le savoir-faire
              </button>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1495856452204-15f959c2b5b1?w=800&h=600&fit=crop" alt="Horloger au travail" className="rounded-lg shadow-2xl w-full" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-yellow-600">180+</div>
                  <div className="text-sm text-gray-600">Ans d'excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Innovation Constante</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Patek Philippe continue de repousser les limites de l'horlogerie avec des innovations révolutionnaires
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cog text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mécanismes complexes</h3>
              <p className="text-gray-400">Des complications horlogères parmi les plus sophistiquées au monde</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-award text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Brevets d'invention</h3>
              <p className="text-gray-400">Plus de 100 brevets déposés au fil des décennies</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reconnaissance mondiale</h3>
              <p className="text-gray-400">Les montres les plus convoitées par les collectionneurs</p>
            </div>
            <div className="text-center scroll-reveal">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Technologie d'avenir</h3>
              <p className="text-gray-400">Des innovations qui façonnent l'horlogerie de demain</p>
            </div>
          </div>
          <div className="text-center mt-12 scroll-reveal">
            <button onClick={() => window.location.href = 'innovation.html'} className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300">
              Explorer l'innovation
            </button>
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
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-youtube text-xl"></i></a>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
