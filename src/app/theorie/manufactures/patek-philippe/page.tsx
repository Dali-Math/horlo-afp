'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ArrowLeft, Menu, X } from 'lucide-react';

// Types
interface Collection {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  specs: Record<string, string>;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  category: string;
}

// Données
const collections: Collection[] = [
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

const timelineItems: TimelineItem[] = [
  {
    year: '1839',
    title: 'Fondation de la Manufacture',
    description: 'Antoine Norbert de Patek et François Czapek fondent Patek, Czapek & Cie à Genève',
    category: 'FONDATION'
  },
  {
    year: '1845',
    title: "L'Invention Révolutionnaire",
    description: "Jean Adrien Philippe rejoint l'entreprise et apporte son invention du remontoir à couronne",
    category: 'INNOVATION'
  },
  {
    year: '1851',
    title: 'Naissance de Patek Philippe',
    description: "Patek Philippe & Cie est officiellement créée, marquant le début d'une légende",
    category: 'RECONNAISSANCE'
  },
  {
    year: '1868',
    title: 'La Première Montre-bracelet',
    description: "Création de la première montre-bracelet avec remontoir à couronne pour la Comtesse Koscowicz",
    category: 'INNOVATION'
  }
];

// Composants
const Navigation: React.FC<{ currentSection: string; setCurrentSection: (section: string) => void }> = ({ 
  currentSection, 
  setCurrentSection 
}) => {
  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'collections', label: 'Collections' },
    { id: 'heritage', label: 'Patrimoine' },
    { id: 'craftsmanship', label: 'Savoir-faire' },
    { id: 'innovation', label: 'Innovation' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-yellow-600">Patek</span> Philippe
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`nav-link ${currentSection === item.id ? 'text-yellow-600 font-semibold' : 'text-gray-700 hover:text-yellow-600'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button className="text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
          L'Excellence<br>Horlogère
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Depuis 1839, Patek Philippe perpétue la tradition horlogère suisse avec une passion inébranlable pour la perfection
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
            Découvrir les Collections
          </button>
          <button className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
            Notre Héritage
          </button>
        </div>
      </div>
    </section>
  );
};

const CollectionsSection: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(col => col.category === filter);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Collections Iconiques</h2>
          <p className="text-xl text-gray-600">Découvrez les garde-temps qui ont marqué l'histoire de l'horlogerie</p>
        </div>
        
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
        
        <div className="grid md:grid-cols-3 gap-8">
          {filteredCollections.map((collection) => (
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
              
              <div className="bg-gray-900 text-white p-4 rounded-lg mb-6">
                <h4 className="text-lg font-semibold mb-3">Caractéristiques techniques</h4>
                <div className="space-y-2">
                  {Object.entries(collection.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
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
          ))}
        </div>
      </div>
    </section>
  );
};

const HeritageSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chronologie d'Excellence</h2>
          <p className="text-xl text-gray-600">Les moments qui ont défini l'histoire de Patek Philippe</p>
        </div>
        
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-yellow-600"></div>
          {timelineItems.map((item, index) => (
            <div key={index} className="relative mb-12 pl-16">
              <div className="absolute left-6 top-2 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white"></div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{item.year} - {item.title}</h3>
                  <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Savoir-Faire<br>Suisse</h2>
            <p className="text-xl text-gray-600 mb-8">
              Chaque composant est fabriqué et assemblé à la main par des maîtres horlogers, 
              garantissant une qualité exceptionnelle qui dure des générations.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Assemblage Manuel</h4>
                  <p className="text-gray-600">Par des maîtres horlogers certifiés</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Contrôle Qualité</h4>
                  <p className="text-gray-600">Rigoureux à chaque étape de fabrication</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Matériaux Nobles</h4>
                  <p className="text-gray-600">Sélectionnés avec soin et traçabilité</p>
                </div>
              </div>
            </div>
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
  );
};

const InnovationSection: React.FC = () => {
  return (
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
  );
};

const Footer: React.FC = () => {
  return (
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
  );
};

// Hook personnalisé pour le scroll reveal
const useScrollReveal = () => {
  useEffect(() => {
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
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

// Composant principal App
const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useScrollReveal();

  useEffect(() => {
    // Simulation du chargement initial
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <HeroSection />;
      case 'collections':
        return <CollectionsSection />;
      case 'heritage':
        return <HeritageSection />;
      case 'craftsmanship':
        return <CraftsmanshipSection />;
      case 'innovation':
        return <InnovationSection />;
      default:
        return <HeroSection />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-600"></div>
          <p className="mt-4 text-xl text-gray-600">Chargement de la référence mondiale...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />
      
      <main>
        {renderCurrentSection()}
      </main>
      
      <Footer />
      
      {/* Bouton de retour pour l'intégration */}
      <a 
        href="/theorie/manufactures/patek-philippe" 
        className="fixed bottom-8 left-8 bg-yellow-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50"
        title="Retour à HorloLearn"
      >
        <ArrowLeft className="w-6 h-6" />
      </a>
    </div>
  );
};

export default App;
