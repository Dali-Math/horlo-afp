
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: any;
  }
}

const CollectionsPage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filter, setFilter] = useState('all');
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

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(col => col.category === filter);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA) {
      const effect = window.VANTA.NET({
        el: "#vanta-bg",
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
        spacing: 18.00
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
        <title>Collections - Patek Philippe Référence Mondiale</title>
        <meta name="description" content="Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
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
              <button onClick={() => router.push('/collections')} className="nav-link text-yellow-600 font-semibold">Collections</button>
              <button onClick={() => router.push('/heritage')} className="nav-link text-gray-700 hover:text-yellow-600">Patrimoine</button>
              <button onClick={() => router.push('/craftsmanship')} className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</button>
              <button onClick={() => router.push('/innovation')} className="nav-link text-gray-700 hover:text-yellow-600">Innovation</button>
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
              <button onClick={() => router.push('/collections')} className="block text-yellow-600 font-semibold">Collections</button>
              <button onClick={() => router.push('/heritage')} className="block text-gray-700 hover:text-yellow-600">Patrimoine</button>
              <button onClick={() => router.push('/craftsmanship')} className="block text-gray-700 hover:text-yellow-600">Savoir-faire</button>
              <button onClick={() => router.push('/innovation')} className="block text-gray-700 hover:text-yellow-600">Innovation</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Collections<br>Iconiques
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie suisse
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`filter-btn ${filter === 'all' ? 'active' : ''} px-6 py-3 rounded-full border-2 border-yellow-600 text-yellow-600 font-semibold`}
            >
              Toutes les collections
            </button>
            <button
              onClick={() => setFilter('sport')}
              className={`filter-btn ${filter === 'sport' ? 'active' : ''} px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:border-yellow-600 hover:text-yellow-600`}
            >
              Sport
            </button>
            <button
              onClick={() => setFilter('classic')}
              className={`filter-btn ${filter === 'classic' ? 'active' : ''} px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:border-yellow-600 hover:text-yellow-600`}
            >
              Classique
            </button>
            <button
              onClick={() => setFilter('complication')}
              className={`filter-btn ${filter === 'complication' ? 'active' : ''} px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:border-yellow-600 hover:text-yellow-600`}
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
            {filteredCollections.map((collection) => (
              <div
                key={collection.id}
                id={collection.id}
                className="collection-card rounded-xl overflow-hidden scroll-reveal"
                data-category={collection.category}
              >
                <div className="relative">
                  <img
                    src={collection.image}
                    alt={`${collection.name} Collection`}
                    className="w-full h-64 object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    collection.category === 'sport' ? 'bg-yellow-600 text-white' :
                    collection.category === 'classic' ? 'bg-gray-600 text-white' :
                    'bg-red-600 text-white'
                  }`}>
                    {collection.category === 'sport' ? 'Sport' : collection.category === 'classic' ? 'Classique' : 'Complications'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{collection.name}</h3>
                  <p className="text-gray-600 mb-6">{collection.description}</p>
                  
                  <div className="bg-gray-900 text-white p-4 rounded-lg mb-6">
                    <h4 className="text-lg font-semibold mb-3">Caractéristiques techniques</h4>
                    <div className="space-y-2">
                      {Object.entries(collection.specs).map(([key, value]) => (
                        <div key={key} className="spec-item">
                          <span className="text-gray-300">{key}</span>
                          <span className="text-yellow-400">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">{collection.price}</div>
                    <button className="bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300">
                      Découvrir
                    </button>
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
            Visitez notre boutique officielle pour découvrir l'ensemble de nos collections
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
        
        .collection-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
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
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .collection-card:hover::before {
          left: 100%;
        }
        
        .collection-card:hover {
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
        
        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .spec-item:last-child {
          border-bottom: none;
        }
        
        .filter-btn {
          transition: all 0.3s ease;
        }
        
        .filter-btn.active {
          background: var(--gold);
          color: white;
          transform: scale(1.05);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
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
        }
        
        .timeline-year {
          position: absolute;
          left: 50%;
          top: 0;
          background: var(--gold);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          transform: translateX(-50%);
          z-index: 5;
        }
        
        .heritage-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
        }
        
        .heritage-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          line-height: 1.4;
          position: relative;
          z-index: 2;
        }
        
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
          }
          
          .quote-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default CollectionsPage;
