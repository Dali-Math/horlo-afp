'use client'

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: any;
  }
}

const PatekPhilippePage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  const collections = [
    {
      id: 'nautilus',
      name: 'Nautilus',
      price: '€35,000',
      description: 'Le symbole du luxe sportif, alliant robustesse et élégance dans un design iconique',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop',
      category: 'sport',
      specs: {
        'Boîtier': 'Acier inoxydable 5711/1A',
        'Mouvement': 'Calibre 26-330 S C',
        'Étanchéité': '120m',
        'Diamètre': '40mm'
      }
    },
    {
      id: 'calatrava',
      name: 'Calatrava',
      price: '€28,500',
      description: "L'essence de l'élégance classique, incarnant la pureté du design horloger",
      image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop',
      category: 'classic',
      specs: {
        'Boîtier': 'Or blanc 18k 5227G-010',
        'Mouvement': 'Calibre 324 S C',
        'Réserve de marche': '45 heures',
        'Diamètre': '39mm'
      }
    },
    {
      id: 'complications',
      name: 'Grandes Complications',
      price: '€1,200,000',
      description: "Le sommet de l'ingénierie horlogère, où l'art rencontre la complexité technique",
      image: 'https://images.unsplash.com/photo-1612817159949-195b619eb547?w=400&h=400&fit=crop',
      category: 'complication',
      specs: {
        'Modèle': 'Sky Moon Tourbillon 6002G-001',
        'Complications': '13 fonctions',
        'Boîtier': 'Or blanc 18k',
        'Diamètre': '44mm'
      }
    }
  ];

  const timelineItems = [
    {
      year: '1839',
      title: 'Fondation',
      description: 'Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève'
    },
    {
      year: '1845',
      title: 'Innovation',
      description: 'Jean Adrien Philippe rejoint l\'entreprise et apporte son invention du remontoir à couronne'
    },
    {
      year: '1851',
      title: 'Renommée',
      description: 'Patek Philippe & Cie est officiellement créée, marquant le début d\'une légende'
    },
    {
      year: 'Aujourd\'hui',
      title: 'Excellence',
      description: 'Plus de 180 ans d\'innovation continue dans l\'art horloger suisse'
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA) {
      const effect = window.VANTA.BIRDS({
        el: "#vanta-bg",
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
      setVantaEffect(effect);
    }

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

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta name="description" content="Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js" strategy="beforeInteractive" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => router.push('/')}
                className="nav-link text-yellow-600 font-semibold"
              >
                Accueil
              </button>
              <button
                onClick={() => router.push('/collections')}
                className="nav-link text-gray-700 hover:text-yellow-600"
              >
                Collections
              </button>
              <button
                onClick={() => router.push('/heritage')}
                className="nav-link text-gray-700 hover:text-yellow-600"
              >
                Patrimoine
              </button>
              <button
                onClick={() => router.push('/craftsmanship')}
                className="nav-link text-gray-700 hover:text-yellow-600"
              >
                Savoir-faire
              </button>
              <button
                onClick={() => router.push('/innovation')}
                className="nav-link text-gray-700 hover:text-yellow-600"
              >
                Innovation
              </button>
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
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => router.push('/')} className="block text-yellow-600 font-semibold">Accueil</button>
              <button onClick={() => router.push('/collections')} className="block text-gray-700 hover:text-yellow-600">Collections</button>
              <button onClick={() => router.push('/heritage')} className="block text-gray-700 hover:text-yellow-600">Patrimoine</button>
              <button onClick={() => router.push('/craftsmanship')} className="block text-gray-700 hover:text-yellow-600">Savoir-faire</button>
              <button onClick={() => router.push('/innovation')} className="block text-gray-700 hover:text-yellow-600">Innovation</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            L&apos;Excellence<br/>Horlogère
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/collections')}
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Découvrir les Collections
            </button>
            <button
              onClick={() => router.push('/heritage')}
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >
              Notre Héritage
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Un Siècle d&apos;Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque garde-temps Patek Philippe est le fruit de siècles de savoir-faire transmis de génération en génération
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={index} className="border-l-4 border-yellow-600 pl-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.year} - {item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1587836374828-4dbafa94cfbe?w=800&h=600&fit=crop"
                  alt="Montre Patek Philippe classique"
                  className="rounded-lg shadow-2xl w-full"
                />
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
            <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l&apos;histoire de l&apos;horlogerie</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {collections.slice(0, 3).map((collection) => (
              <div key={collection.id} className="watch-card rounded-xl p-6 scroll-reveal">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{collection.name}</h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <button
                  onClick={() => router.push('/collections')}
                  className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                >
                  Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Innovation Constante</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Patek Philippe continue de repousser les limites de l&apos;horlogerie avec des innovations révolutionnaires
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
              <h3 className="text-xl font-semibold mb-2">Brevets d&apos;invention</h3>
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
              <h3 className="text-xl font-semibold mb-2">Technologie d&apos;avenir</h3>
              <p className="text-gray-400">Des innovations qui façonneront l&apos;horlogerie de demain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Devenez Gardien du Temps</h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la longue lignée de collectionneurs qui perpétuent l&apos;héritage Patek Philippe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/collections')}
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Explorer les collections
            </button>
            <button
              onClick={() => router.push('/heritage')}
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >
              Découvrir l&apos;héritage
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
        
        .watch-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
        }
        
        .watch-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};

export default PatekPhilippePage;
