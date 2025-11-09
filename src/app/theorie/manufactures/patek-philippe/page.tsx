'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Vanta birds animated background (client only)
    let vantaEffect: any;
    (async () => {
      if (typeof window !== 'undefined') {
        await import('three');
        await import('vanta/dist/vanta.birds.min');
        if (window.VANTA && window.VANTA.BIRDS && document.getElementById('vanta-bg')) {
          vantaEffect = window.VANTA.BIRDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            birdSize: 1.2,
            wingSpan: 25,
            speedLimit: 3,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            quantity: 3,
          });
        }
      }
    })();

    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.classList.add('revealed');
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Parallax effet sur le background
    const parallax = () => {
      const scrolled = window.scrollY;
      const target = document.getElementById('vanta-bg');
      if (target) {
        target.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    };
    window.addEventListener('scroll', parallax);

    return () => {
      window.removeEventListener('scroll', parallax);
      if (vantaEffect) vantaEffect.destroy();
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta name="description" content="Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-yellow-600">Patek</span> Philippe
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="nav-link text-gray-700 hover:text-yellow-600">Accueil</a>
            <a href="#collections" className="nav-link text-gray-700 hover:text-yellow-600">Collections</a>
            <a href="#heritage" className="nav-link text-gray-700 hover:text-yellow-600">Patrimoine</a>
            <a href="#craftsmanship" className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</a>
            <a href="#innovation" className="nav-link text-gray-700 hover:text-yellow-600">Innovation</a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4 flex flex-col">
              <a href="/" className="block text-yellow-600 font-semibold">Accueil</a>
              <a href="#collections" className="block text-gray-700 hover:text-yellow-600">Collections</a>
              <a href="#heritage" className="block text-gray-700 hover:text-yellow-600">Patrimoine</a>
              <a href="#craftsmanship" className="block text-gray-700 hover:text-yellow-600">Savoir-faire</a>
              <a href="#innovation" className="block text-gray-700 hover:text-yellow-600">Innovation</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f6f0]">
        <div id="vanta-bg" className="vanta-bg absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 floating-element">
          <h1 className="hero-title text-7xl md:text-8xl font-bold mb-6 leading-tight font-playfair bg-gradient-to-r from-yellow-600 to-yellow-400 text-transparent bg-clip-text">
            Patek Philippe
          </h1>
          <h2 className="text-gray-700 text-2xl uppercase font-semibold tracking-widest mb-4 scroll-reveal">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</h2>
          <p className="italic text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed scroll-reveal">
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 scroll-reveal">
            <a href="#collections" className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 text-lg shadow-md transition-all duration-300">Découvrir les Collections</a>
            <a href="#heritage" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white text-lg shadow-md transition-all duration-300">Notre Héritage</a>
          </div>
          {/* Metrics */}
          <div className="flex justify-center items-center gap-10 mt-12 font-bold text-2xl text-yellow-700 scroll-reveal">
            <span>
              1839 <br/><span className="text-base text-gray-600 font-normal">Fondation</span>
            </span>
            <span>
              70+ <br/><span className="text-base text-gray-600 font-normal">Brevets</span>
            </span>
            <span>
              100% <br/><span className="text-base text-gray-600 font-normal">Indépendance</span>
            </span>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce scroll-reveal">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="heritage" className="py-20 bg-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Un Siècle d'Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque garde-temps Patek Philippe est le fruit de siècles de savoir-faire transmis de génération en génération
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div className="timeline-item border-l-4 border-yellow-600 pl-6 scroll-reveal">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1839 - Fondation</h3>
                  <p className="text-gray-600">Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève</p>
                </div>
                <div className="timeline-item border-l-4 border-yellow-600 pl-6 scroll-reveal">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1845 - Innovation</h3>
                  <p className="text-gray-600">Jean Adrien Philippe rejoint l'entreprise et apporte son invention du remontoir à couronne</p>
                </div>
                <div className="timeline-item border-l-4 border-yellow-600 pl-6 scroll-reveal">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">1851 - Renommée</h3>
                  <p className="text-gray-600">Patek Philippe & Cie est officiellement créée, marquant le début d'une légende</p>
                </div>
                <div className="timeline-item border-l-4 border-yellow-600 pl-6 scroll-reveal">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Aujourd'hui - Excellence</h3>
                  <p className="text-gray-600">Plus de 180 ans d'innovation continue dans l'art horloger suisse</p>
                </div>
            </div>
            <div>
              <div className="relative">
                <img src="" alt="Montre Patek Philippe classique" className="rounded-lg shadow-2xl w-full scroll-reveal" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20 bg-gray-50 scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Collections Iconiques</h2>
            <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
              <div className="watch-card rounded-xl p-6 scroll-reveal">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                  <img src="" alt="Nautilus" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Nautilus</h3>
                <p className="text-gray-600 mb-4">Le symbole du luxe sportif, alliant robustesse et élégance dans un design iconique</p>
                <a href="#collections" className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                  Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
              <div className="watch-card rounded-xl p-6 scroll-reveal">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                  <img src="" alt="Calatrava" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Calatrava</h3>
                <p className="text-gray-600 mb-4">L'essence de l'élégance classique, incarnant la pureté du design horloger</p>
                <a href="#collections" className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                  Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
              <div className="watch-card rounded-xl p-6 scroll-reveal">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                  <img src="" alt="Grandes Complications" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Grandes Complications</h3>
                <p className="text-gray-600 mb-4">Le sommet de l'ingénierie horlogère, où l'art rencontre la complexité technique</p>
                <a href="#collections" className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors">
                  Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-20 bg-gray-900 text-white scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
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
                <p className="text-gray-400">Des innovations qui façonneront l'horlogerie de demain</p>
              </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 scroll-reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
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
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Global/section styles */}
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
          font-weight: 700;
        }
        .vanta-bg { z-index: 0; }
        .floating-element { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
        .nav-link { position: relative; transition: all 0.3s ease; }
        .nav-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px; background: var(--gold); transition: width 0.3s ease; }
        .nav-link:hover::after { width: 100%; }
        .watch-card { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); transition: all 0.4s ease; }
        .watch-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.15);}
      `}</style>
    </>
  );
}
