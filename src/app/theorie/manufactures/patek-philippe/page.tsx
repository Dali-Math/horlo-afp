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
    // Animation VANTA.js birds (uniquement client)
    let vantaEffect: any;
    if (typeof window !== 'undefined') {
      const loadScripts = async () => {
        if (!window.THREE) {
          await import('three');
        }
        if (!window.VANTA) {
          await import('vanta/dist/vanta.birds.min');
        }
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
            backgroundColor: 0xfffaec,
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
      };
      loadScripts();
    }

    // Scroll reveal
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.classList.add('revealed');
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

    // Parallax effet fond
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
        <title>Patek Philippe - Référence mondiale en horlogerie suisse</title>
        <meta name="description" content="Patek Philippe, référence mondiale en horlogerie suisse. Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures." />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>

      {/* Navigation bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#fffaf1] border-b border-[#f6ebd1]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold" style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif" }}>
            Patek Philippe
          </div>
          <div className="hidden md:flex space-x-8 text-gray-700 font-semibold">
            <a href="/" className="nav-link">Accueil</a>
            <a href="#heritage" className="nav-link">Héritage</a>
            <a href="#collections" className="nav-link">Collections</a>
            <a href="#innovation" className="nav-link">Innovation</a>
            <a href="#craftsmanship" className="nav-link">Savoir-faire</a>
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
          <div className="md:hidden bg-[#fffaf1] border-t border-[#f6ebd1]">
            <div className="px-6 py-4 space-y-4 flex flex-col text-gray-700">
              <a href="/" className="block font-semibold">Accueil</a>
              <a href="#heritage" className="block">Héritage</a>
              <a href="#collections" className="block">Collections</a>
              <a href="#innovation" className="block">Innovation</a>
              <a href="#craftsmanship" className="block">Savoir-faire</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fffaec]">
        <div id="vanta-bg" className="absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37", letterSpacing: "1px" }}>
            Patek Philippe
          </h1>
          <h2 className="uppercase text-gray-800 text-2xl font-semibold tracking-widest mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
            Référence Mondiale en Horlogerie Suisse
          </h2>
          <p className="italic text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="flex justify-center items-center gap-16 mt-8 text-yellow-700 font-bold text-2xl">
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
      </section>

      {/* Timeline / Heritage */}
      <section id="heritage" className="py-20 bg-[#fffaf1]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Un Siècle d'Excellence</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
              Chaque garde-temps Patek Philippe est le fruit de siècles de savoir-faire transmis de génération en génération
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
            <div className="space-y-8">
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">1839 - Fondation</h3>
                <p className="text-gray-700">Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève</p>
              </div>
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">1845 - Innovation</h3>
                <p className="text-gray-700">Jean Adrien Philippe rejoint l'entreprise et apporte son invention du remontoir à couronne</p>
              </div>
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">1851 - Renommée</h3>
                <p className="text-gray-700">Patek Philippe & Cie est officiellement créée, marquant le début d'une légende</p>
              </div>
              <div className="border-l-4 border-yellow-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Aujourd'hui - Excellence</h3>
                <p className="text-gray-700">Plus de 180 ans d'innovation continue dans l'art horloger suisse</p>
              </div>
            </div>
            <div>
              <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                <img src="" alt="Montre Patek Philippe classique" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-20 bg-[#f7f7f4]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Collections Iconiques</h2>
            <p className="text-xl text-gray-700">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-xl p-6">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                <img src="" alt="Nautilus" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Nautilus</h3>
              <p className="text-gray-700 mb-4">Le symbole du luxe sportif, alliant robustesse et élégance dans un design iconique</p>
            </div>
            <div className="rounded-xl p-6">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                <img src="" alt="Calatrava" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Calatrava</h3>
              <p className="text-gray-700 mb-4">L'essence de l'élégance classique, incarnant la pureté du design horloger</p>
            </div>
            <div className="rounded-xl p-6">
              <div className="aspect-square mb-6 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
                <img src="" alt="Grandes Complications" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Grandes Complications</h3>
              <p className="text-gray-700 mb-4">Le sommet de l'ingénierie horlogère, où l'art rencontre la complexité technique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-20 bg-[#1a2332] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Innovation Constante</h2>
            <p className="text-xl text-gray-50 max-w-3xl mx-auto">
              Patek Philippe continue de repousser les limites de l'horlogerie avec des innovations révolutionnaires
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-cog text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Mécanismes complexes</h3>
              <p className="text-gray-200">Des complications horlogères parmi les plus sophistiquées au monde</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-award text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Brevets d'invention</h3>
              <p className="text-gray-200">Plus de 100 brevets déposés au fil des décennies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reconnaissance mondiale</h3>
              <p className="text-gray-200">Les montres les plus convoitées par les collectionneurs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-rocket text-2xl text-white"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">Technologie d'avenir</h3>
              <p className="text-gray-200">Des innovations qui façonneront l'horlogerie de demain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a2332] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4" style={{ color: "#D4AF37", fontFamily: "'Playfair Display', serif" }}>
              Patek Philippe
            </div>
            <p className="text-gray-300 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-600 transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence mondiale en horlogerie suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background: #fffaec;
          overflow-x: hidden;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #D4AF37;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
      `}</style>
    </>
  );
}
