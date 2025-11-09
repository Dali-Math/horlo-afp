import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: any;
  }
}

const HomePage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

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

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#vanta-bg');
      if (parallax) {
        const speed = scrolled * 0.5;
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
  }, []);

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

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta name="description" content="Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            L'Excellence<br>Horlogère
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
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Un Siècle d'Excellence</h2>
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
            <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
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

      {/* Craftsmanship Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Savoir-Faire<br>Suisse</h2>
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
              <button
                onClick={() => router.push('/craftsmanship')}
                className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300"
              >
                Découvrir le savoir-faire
              </button>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1495856452204-15f959c2b5b1?w=800&h=600&fit=crop"
                  alt="Horloger au travail"
                  className="rounded-lg shadow-2xl w-full"
                />
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
              <p className="text-gray-400">Des innovations qui façonneront l'horlogerie de demain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Devenez Gardien du Temps</h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la longue lignée de collectionneurs qui perpétuent l'héritage Patek Philippe
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
              Découvrir l'héritage
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
    </>
  );
};

export default HomePage;
