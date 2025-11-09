'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';

const timeline = [
  {
    year: "1839",
    title: "Fondation",
    desc: "Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève"
  },
  {
    year: "1845",
    title: "Innovation",
    desc: "Jean Adrien Philippe rejoint l'entreprise et apporte son invention du remontoir à couronne"
  },
  {
    year: "1851",
    title: "Renommée",
    desc: "Patek Philippe & Cie est officiellement créée, marquant le début d'une légende"
  },
  {
    year: "Aujourd'hui",
    title: "Excellence",
    desc: "Plus de 180 ans d'innovation continue dans l'art horloger suisse"
  }
];

const collections = [
  {
    id: "nautilus",
    name: "Nautilus",
    desc: "Le symbole du luxe sportif, alliant robustesse et élégance dans un design iconique",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400&h=400&fit=crop"
  },
  {
    id: "calatrava",
    name: "Calatrava",
    desc: "L'essence de l'élégance classique, incarnant la pureté du design horloger",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop"
  },
  {
    id: "complications",
    name: "Grandes Complications",
    desc: "Le sommet de l'ingénierie horlogère, où l'art rencontre la complexité technique",
    image: "https://images.unsplash.com/photo-1612817159949-195b619eb547?w=400&h=400&fit=crop"
  }
];

const innovations = [
  {
    icon: "fas fa-cog",
    title: "Mécanismes complexes",
    desc: "Des complications horlogères parmi les plus sophistiquées au monde"
  },
  {
    icon: "fas fa-award",
    title: "Brevets d'invention",
    desc: "Plus de 100 brevets déposés au fil des décennies"
  },
  {
    icon: "fas fa-globe",
    title: "Reconnaissance mondiale",
    desc: "Les montres les plus convoitées par les collectionneurs"
  },
  {
    icon: "fas fa-rocket",
    title: "Technologie d'avenir",
    desc: "Des innovations qui façonneront l'horlogerie de demain"
  }
];

export default function Page() {

  useEffect(() => {
    // Vanta.js setup (assuming scripts loaded in _document or public/index)
    if (typeof window !== 'undefined' && window.VANTA) {
      window.VANTA.BIRDS && window.VANTA.BIRDS({
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
    }
  }, []);

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta name="description" content="Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-yellow-600">Patek</span> Philippe
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="/" className="nav-link text-gray-700 hover:text-yellow-600">Accueil</a>
            <a href="/collections" className="nav-link text-gray-700 hover:text-yellow-600">Collections</a>
            <a href="/heritage" className="nav-link text-gray-700 hover:text-yellow-600">Patrimoine</a>
            <a href="/craftsmanship" className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</a>
            <a href="/innovation" className="nav-link text-gray-700 hover:text-yellow-600">Innovation</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            L'Excellence<br />Horlogère
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/collections" className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Découvrir les Collections
            </a>
            <a href="/heritage" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Notre Héritage
            </a>
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
            <div className="space-y-8 scroll-reveal">
              {timeline.map((item, idx) => (
                <div key={idx} className="timeline-item border-l-4 border-yellow-600 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.year} - {item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1587836374828-4dbafa94cfbe?w=800&h=600&fit=crop"
                  alt="Montre Patek Philippe classique"
                  className="rounded-lg shadow-2xl w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Iconiques */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Collections Iconiques</h2>
            <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collections.map(collection => (
              <div key={collection.id} className="watch-card rounded-xl p-6 scroll-reveal">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{collection.name}</h3>
                <p className="text-gray-600 mb-4">{collection.desc}</p>
                <a
                  href="/collections"
                  className="text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                >
                  Explorer la collection <i className="fas fa-arrow-right ml-1"></i>
                </a>
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
              Patek Philippe continue de repousser les limites de l'horlogerie avec des innovations révolutionnaires
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {innovations.map((innovation, idx) => (
              <div key={idx} className="text-center scroll-reveal">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${innovation.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{innovation.title}</h3>
                <p className="text-gray-400">{innovation.desc}</p>
              </div>
            ))}
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
            <a
              href="/collections"
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >
              Explorer les collections
            </a>
            <a
              href="/heritage"
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >
              Découvrir l'héritage
            </a>
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
}
