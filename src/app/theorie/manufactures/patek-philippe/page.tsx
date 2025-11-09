'use client';

import React, { useEffect } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function Page() {

  useEffect(() => {
    // Dynamically import Three.js and VANTA (on client only!)
    let vantaEffect: any;

    (async () => {
      if (typeof window !== 'undefined') {
        await Promise.all([
          import('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'),
          import('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js')
        ]);
        if (window.VANTA && document.getElementById('vanta-bg')) {
          vantaEffect = window.VANTA.BIRDS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            birdSize: 1.2,
            wingSpan: 25,
            speedLimit: 3,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            quantity: 3
          });
        }
      }
    })();

    // Parallax effet pour le hero !!
    const parallax = () => {
      const scrolled = window.pageYOffset;
      const target = document.getElementById('vanta-bg');
      if (target) {
        const speed = scrolled * 0.5;
        target.style.transform = `translateY(${speed}px)`;
      }
    };
    window.addEventListener('scroll', parallax);

    // Scroll reveal animation
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting)
          entry.target.classList.add('revealed');
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

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
        </div>
      </nav>

      {/* Hero section avec vanta-bg */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f8f6f0]">
        <div id="vanta-bg" className="vanta-bg absolute top-0 left-0 w-full h-full z-0" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 floating-element">
          <h1 className="hero-title text-7xl md:text-8xl font-bold mb-6 leading-tight font-playfair bg-gradient-to-r from-yellow-600 to-yellow-400 text-transparent bg-clip-text">
            Patek Philippe
          </h1>
          <h2 className="text-gray-700 text-2xl uppercase font-semibold tracking-widest mb-4">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</h2>
          <p className="italic text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#collections" className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 text-lg shadow-md transition-all duration-300">Découvrir les Collections</a>
            <a href="#heritage" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white text-lg shadow-md transition-all duration-300">Notre Héritage</a>
          </div>
          <div className="flex justify-center items-center gap-10 mt-12 font-bold text-2xl text-yellow-700">
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
      `}</style>
    </>
  );
}
