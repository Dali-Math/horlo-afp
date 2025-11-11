'use client';

import React, { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
  }
}

const collections = [
  {
    id: 'nautilus',
    name: 'Nautilus',
    description: "Conçu par Gérald Genta en 1976, le Nautilus est devenu l'icône du luxe sportif. Sa forme distinctive en forme de hublot de porthole et son intégration parfaite du bracelet en font un symbole intemporel de l'élégance sportive.",
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=600&fit=crop',
    category: 'sport',
    badge: 'Sport',
    badgeColor: 'bg-yellow-600',
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
    description: "La Calatrava incarne l'essence de l'élégance classique depuis 1932. Avec ses lignes pures et son design intemporel, elle représente la quintessence de l'horlogerie de dressage selon Patek Philippe.",
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=600&fit=crop',
    category: 'classic',
    badge: 'Classique',
    badgeColor: 'bg-gray-600',
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
    description: "Le sommet de l'ingénierie horlogère Patek Philippe. Ces garde-temps exceptionnels combinent plusieurs complications dans un seul mouvement, représentant l'apogée de l'art horloger suisse.",
    image: 'https://images.unsplash.com/photo-1612817159949-195b619eb547?w=800&h=600&fit=crop',
    category: 'complication',
    badge: 'Complications',
    badgeColor: 'bg-red-600',
    specs: {
      'Modèle': 'Sky Moon Tourbillon 6002G-001',
      'Complications': '13 fonctions',
      'Boîtier': 'Or blanc 18k',
      'Diamètre': '44mm'
    }
  },
  {
    id: 'aquanaut',
    name: 'Aquanaut',
    description: "Lancée en 1997, l'Aquanaut apporte une touche moderne et dynamique à l'univers sportif Patek Philippe. Son bracelet en caoutchouc tropical et sa lunette octogonale en font un compagnon parfait pour l'aventure.",
    image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&h=600&fit=crop',
    category: 'sport',
    badge: 'Sport',
    badgeColor: 'bg-yellow-600',
    specs: {
      'Modèle': 'Travel Time 5164A-001',
      'Fonction': 'Heure double fuseau',
      'Étanchéité': '120m',
      'Diamètre': '40.8mm'
    }
  },
  {
    id: 'gondolo',
    name: 'Gondolo',
    description: "La collection Gondolo rend hommage à l'héritage Art Déco de Patek Philippe. Avec ses formes géométriques audacieuses et son esthétique rétro-futuriste, elle capture l'esprit des années 1920.",
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&h=600&fit=crop',
    category: 'classic',
    badge: 'Classique',
    badgeColor: 'bg-gray-600',
    specs: {
      'Modèle': 'Gondolo 8 Days 5200G-010',
      'Réserve de marche': '8 jours',
      'Boîtier': 'Or blanc 18k',
      'Forme': 'Rectangulaire tonneau'
    }
  },
  {
    id: 'twenty4',
    name: 'Twenty~4',
    description: "Créée en 1999 pour la femme moderne, la Twenty~4 combine élégance quotidienne et sophistication horlogère. Sa forme rectangulaire distinctive et ses détails raffinés en font le choix parfait pour toutes les occasions.",
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop',
    category: 'classic',
    badge: 'Classique',
    badgeColor: 'bg-gray-600',
    specs: {
      'Modèle': 'Twenty~4 Automatic 7300/1200A-001',
      'Mouvement': 'Calibre 324 S C',
      'Boîtier': 'Acier inoxydable',
      'Diamètre': '36mm'
    }
  }
];

export default function CollectionsPage() {
  const [filter, setFilter] = useState('all');
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(col => col.category === filter);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js'),
    ]).then(() => {
      if (window.VANTA && vantaRef.current) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xd4af37,
          backgroundColor: 0xf8f6f0,
          points: 8.00,
          maxDistance: 25.00,
          spacing: 18.00,
        });
      }
    });

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
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ minHeight: '100vh' }}>
        <div ref={vantaRef} className="absolute top-0 left-0 w-full h-full vanta-bg" style={{ zIndex: 0 }}></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Collections<br />Iconiques
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez les garde-temps qui ont marqué l&apos;histoire de l&apos;horlogerie suisse
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`filter-btn px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
                filter === 'all' ? 'border-yellow-600 bg-yellow-600 text-white scale-105 shadow-lg' : 'border-gray-300 text-gray-600 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              Toutes les collections
            </button>
            <button
              onClick={() => setFilter('sport')}
              className={`filter-btn px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
                filter === 'sport' ? 'border-yellow-600 bg-yellow-600 text-white scale-105 shadow-lg' : 'border-gray-300 text-gray-600 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              Sport
            </button>
            <button
              onClick={() => setFilter('classic')}
              className={`filter-btn px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
                filter === 'classic' ? 'border-yellow-600 bg-yellow-600 text-white scale-105 shadow-lg' : 'border-gray-300 text-gray-600 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              Classique
            </button>
            <button
              onClick={() => setFilter('complication')}
              className={`filter-btn px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold ${
                filter === 'complication' ? 'border-yellow-600 bg-yellow-600 text-white scale-105 shadow-lg' : 'border-gray-300 text-gray-600 hover:border-yellow-600 hover:text-yellow-600'
              }`}
            >
              Complications
            </button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
              <div
                key={collection.id}
                id={collection.id}
                className="collection-card rounded-xl overflow-hidden scroll-reveal bg-white shadow-lg"
                data-category={collection.category}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={collection.image}
                    alt={`${collection.name} Collection`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute top-4 left-4 ${collection.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {collection.badge}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{collection.name}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {collection.description}
                  </p>
                  
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">Caractéristiques techniques</h4>
                    <div className="space-y-2">
                      {Object.entries(collection.specs).map(([key, value]) => (
                        <div key={key} className="spec-item flex justify-between">
                          <span className="text-gray-300">{key}</span>
                          <span className="text-yellow-400 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Prêt à trouver votre Patek Philippe ?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Visitez notre boutique officielle pour découvrir l&apos;ensemble de nos collections
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Trouver une boutique
            </button>
            <button className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Demander un catalogue
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
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                <span className="text-xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors duration-300">
                <span className="text-xl">▶️</span>
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
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: var(--cream);
          overflow-x: hidden;
        }
        
        .hero-title {
          font-family: 'Georgia', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
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
        
        .collection-card {
          backdrop-filter: blur(10px);
          background: white;
          border: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .collection-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transition: left 0.6s ease;
          z-index: 1;
          pointer-events: none;
        }
        
        .collection-card:hover::before {
          left: 100%;
        }
        
        .collection-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
          border-color: rgba(212, 175, 55, 0.3);
        }
        
        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .spec-item:hover {
          padding-left: 0.5rem;
          border-bottom-color: rgba(212, 175, 55, 0.3);
        }
        
        .spec-item:last-child {
          border-bottom: none;
        }
        
        .filter-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .filter-btn:hover {
          transform: translateY(-2px);
        }
        
        button {
          cursor: pointer;
        }
        
        img {
          display: block;
          max-width: 100%;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </>
  );
}
