'use client';

import React, { useState, useEffect } from 'react';

export default function InnovationPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('materials');
  const [currentInnovation, setCurrentInnovation] = useState(0);

  const innovations = [
    {
      year: "2014",
      title: "Spiromax®",
      description: "Le ressort spiral en Silinvar® améliore l'isochronisme et la résistance aux chocs",
      type: "materials"
    },
    {
      year: "2011",
      title: "Pulsomètre",
      description: "Première montre avec un mécanisme de remontage entièrement intégré",
      type: "mechanisms"
    },
    {
      year: "2005",
      title: "Gyromax®",
      description: "Balance avec masses d'équilibrage réglables dans tous les sens",
      type: "mechanisms"
    },
    {
      year: "2006",
      title: "Silinvar®",
      description: "Alliage breveté de silicium, oxyde de silicium et oxyde de fer",
      type: "materials"
    }
  ];

  const materials = [
    {
      name: "Silinvar®",
      description: "Alliage révolutionnaire de silicium offrant une résistance magnétique totale",
      benefits: ["Anti-magnétique", "Léger", "Résistant à la corrosion"]
    },
    {
      name: "Or gris",
      description: "Alliage exclusif Patek Philippe pour une durabilité exceptionnelle",
      benefits: ["Haute résistance", "Couleur unique", "Hypoallergénique"]
    },
    {
      name: "Acier inoxydable",
      description: "Qualité 316L pour une résistance optimale à la corrosion",
      benefits: ["Rugosité maximale", "Facile d'entretien", "Brillance durable"]
    }
  ];

  const futureInnovations = [
    {
      title: "Intelligence Artificielle",
      description: "Optimisation des performances mécaniques par l'IA",
      timeline: "2025-2027"
    },
    {
      title: "Matériaux Quantiques",
      description: "Exploration des propriétés quantiques pour l'horlogerie",
      timeline: "2028-2030"
    },
    {
      title: "Énergie Solaire Avancée",
      description: "Systèmes de recharge photovoltaïque intégrés",
      timeline: "2026-2028"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInnovation((prev) => (prev + 1) % innovations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <a href="/"><span className="text-yellow-600">Patek</span> Philippe</a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="nav-link text-gray-700 hover:text-yellow-600">Accueil</a>
              <a href="/collections" className="nav-link text-gray-700 hover:text-yellow-600">Collections</a>
              <a href="/heritage" className="nav-link text-gray-700 hover:text-yellow-600">Patrimoine</a>
              <a href="/craftsmanship" className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</a>
              <a href="/innovation" className="nav-link text-yellow-600 font-semibold">Innovation</a>
            </div>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
          <div className="px-6 py-4 space-y-4">
            <a href="/" className="block text-gray-700 hover:text-yellow-600">Accueil</a>
            <a href="/collections" className="block text-gray-700 hover:text-yellow-600">Collections</a>
            <a href="/heritage" className="block text-gray-700 hover:text-yellow-600">Patrimoine</a>
            <a href="/craftsmanship" className="block text-gray-700 hover:text-yellow-600">Savoir-faire</a>
            <a href="/innovation" className="block text-yellow-600 font-semibold">Innovation</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-yellow-600">Innovation</span><br />Révolutionnaire
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Repousser les limites de l'impossible depuis 1839 avec des avancées technologiques révolutionnaires
          </p>
        </div>
      </section>

      {/* Innovation Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chronologie d'Innovations</h2>
            <p className="text-xl text-gray-600">Des percées technologiques qui ont révolutionné l'horlogerie</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-yellow-600"></div>
            
            {innovations.map((innovation, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="text-2xl font-bold text-yellow-600 mb-2">{innovation.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{innovation.title}</h3>
                    <p className="text-gray-600">{innovation.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Technology */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Matériaux & Technologies</h2>
            <p className="text-xl text-gray-600">Des matériaux révolutionnaires pour des performances exceptionnelles</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('materials')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'materials'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                Matériaux
              </button>
              <button
                onClick={() => setActiveTab('mechanisms')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === 'mechanisms'
                    ? 'bg-yellow-600 text-white'
                    : 'text-gray-600 hover:text-yellow-600'
                }`}
              >
                Mécanismes
              </button>
            </div>
          </div>

          {/* Materials Tab */}
          {activeTab === 'materials' && (
            <div className="grid md:grid-cols-3 gap-8">
              {materials.map((material, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="fas fa-atom text-2xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{material.name}</h3>
                  <p className="text-gray-600 mb-6 text-center">{material.description}</p>
                  <div className="space-y-2">
                    {material.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mechanisms Tab */}
          {activeTab === 'mechanisms' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mouvement Calibre 324 S C</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fréquence</span>
                    <span className="font-semibold">28,800 alternances/heure</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Réserve de marche</span>
                    <span className="font-semibold">45 heures</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rubis</span>
                    <span className="font-semibold">29</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Diamètre</span>
                    <span className="font-semibold">27 mm</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Technologie Chronometrique</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">Certification Patek Philippe Seal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">Tolérance de -3/+2 secondes par jour</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">Tests rigoureux sur 24 jours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">Résistance magnétique maximale</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Future Innovation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">L'Avenir de l'Innovation</h2>
            <p className="text-xl text-gray-600">Les prochaines révolutions horlogères</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {futureInnovations.map((innovation, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-rocket text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{innovation.title}</h3>
                <p className="text-gray-600 mb-6">{innovation.description}</p>
                <div className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 py-2 rounded-full inline-block">
                  {innovation.timeline}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research & Development */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Recherche & Développement</h2>
              <p className="text-xl text-gray-300 mb-8">
                Un département dédié repoussant les limites de l'horlogerie avec des technologies de pointe
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-flask text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Laboratoires d'Innovation</h4>
                    <p className="text-gray-400">Équipements de pointe pour tester de nouveaux matériaux</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-users text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Équipe d'Experts</h4>
                    <p className="text-gray-400">Ingénieurs et chercheurs spécialisés en horlogerie</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-chart-line text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Innovation Continue</h4>
                    <p className="text-gray-400">Plus de 100 brevets déposés au cours des 20 dernières années</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581093458791-9d15482442f5?w=800&h=600&fit=crop" 
                  alt="Laboratoire de recherche" 
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-semibold">R&D</div>
                  <div className="text-xs">Avancée</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">L'Innovation Continue</h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez-nous dans notre quête de l'excellence horlogère et découvrez l'avenir du temps
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Explorer les collections
            </button>
            <button 
              onClick={() => window.location.href = '/craftsmanship'}
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >
              Découvrir le savoir-faire
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
    </div>
  );
}
