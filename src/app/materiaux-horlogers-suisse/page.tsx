
'use client';

import React, { useEffect, useState } from 'react';
import './page.css';

export default function SwissWatchMaterialsPage() {
  const [activeTimeline, setActiveTimeline] = useState('16th');
  const [activeMaterial, setActiveMaterial] = useState('precious');
  const [activeDistrict, setActiveDistrict] = useState('geneve');
  const [activeTrend, setActiveTrend] = useState('environment');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Counter animation avec vérification des éléments
    const animateCounters = () => {
      const counters = document.querySelectorAll('[data-target]');
      
      // Vérifier qu'il y a des compteurs à animer
      if (counters.length === 0) {
        // Si les éléments ne sont pas encore chargés, attendre et réessayer
        setTimeout(() => {
          const retryCounters = document.querySelectorAll('[data-target]');
          if (retryCounters.length > 0) {
            animateCounters();
          }
        }, 100);
        return;
      }

      console.log(`Trouvé ${counters.length} compteurs à animer`);

      counters.forEach((counter, index) => {
        // Vérifier que l'élément est visible et dans le DOM
        if (!counter || !counter.parentElement) return;
        
        const target = parseInt(counter.getAttribute('data-target') || '0');
        if (target === 0) return;
        
        // Initialiser le compteur à 0 avec délai pour créer un effet cascade
        setTimeout(() => {
          counter.textContent = '0';
          counter.classList.add('counter-display');
          
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          let hasAnimated = false;

          // Observer pour détecter quand l'élément devient visible
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                console.log(`Animation du compteur ${index}: ${target}`);
                
                const timer = setInterval(() => {
                  current += step;
                  if (current >= target) {
                    counter.textContent = target.toString();
                    counter.classList.add('counter-animate');
                    clearInterval(timer);
                    observer.unobserve(counter);
                  } else {
                    counter.textContent = Math.floor(current).toString();
                  }
                }, 16);
              }
            });
          }, { threshold: 0.1 });

          observer.observe(counter);
        }, index * 200); // Délai cascade entre les compteurs
      });
    };

    // Scroll reveal
    const revealElements = () => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
          element.classList.add('revealed');
        }
      });
    };

    // Initialiser les animations avec délai pour s'assurer que le DOM est prêt
    const initializeAnimations = () => {
      setTimeout(() => {
        animateCounters();
        revealElements();
      }, 500); // Délai pour laisser le temps au DOM de se charger
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', revealElements);
    
    // Démarrer les animations quand tout est chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAnimations);
    } else {
      initializeAnimations();
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', revealElements);
    };
  }, []);

  // Helper functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 page-materiaux">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-900">HorloLearn</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#hero" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
                <a href="#materiaux" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">Matériaux</a>
                <a href="#innovation" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">Innovation</a>
                <a href="#formation" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">Formation</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-900 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Matériaux Horlogers
              <span className="block text-4xl md:text-5xl text-blue-300">de Suisse</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Découvrez l'excellence et l'innovation des matériaux qui font la réputation mondiale de l'horlogerie suisse
            </p>
            <button 
              onClick={() => scrollToSection('resume')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Découvrir
            </button>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section id="resume" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Résumé Exécutif</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'horlogerie suisse représente un écosystème exceptionnel où tradition et innovation se rencontrent 
              pour créer des matériaux d'une qualité inégalée.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-lg scroll-reveal">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                <span data-target="95" className="counter-display">0</span>+
              </div>
              <p className="text-gray-700">Années d'expertise</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg scroll-reveal">
              <div className="text-3xl font-bold text-green-600 mb-2">
                <span data-target="150" className="counter-display">0</span>
              </div>
              <p className="text-gray-700">Marques mondiales</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg scroll-reveal">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                <span data-target="4" className="counter-display">0</span>
              </div>
              <p className="text-gray-700">Districts horlogers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section id="histoire" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Chronologie Historique</h2>
            <p className="text-xl text-gray-600">Évolution des matériaux horlogers à travers les siècles</p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8">
            {['16th', '17th', '18th', '19th', '20th', '21st'].map((period) => (
              <button
                key={period}
                onClick={() => setActiveTimeline(period)}
                className={`m-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  activeTimeline === period 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-50'
                }`}
              >
                {period === '16th' && 'XVIe siècle'}
                {period === '17th' && 'XVIIe siècle'}
                {period === '18th' && 'XVIIIe siècle'}
                {period === '19th' && 'XIXe siècle'}
                {period === '20th' && 'XXe siècle'}
                {period === '21st' && 'XXIe siècle'}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeTimeline === '16th' && 'Naissance de l\'horlogerie suisse'}
                  {activeTimeline === '17th' && 'Perfectionnement mécanique'}
                  {activeTimeline === '18th' && 'Standardisation industrielle'}
                  {activeTimeline === '19th' && 'Révolution des matériaux'}
                  {activeTimeline === '20th' && 'Ère de l\'innovation'}
                  {activeTimeline === '21st' && 'Futur des matériaux intelligents'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTimeline === '16th' && 'Les premiers maîtres horlogers s\'installent dans les vallées helvétiques, développant les techniques de base de l\'horlogerie.'}
                  {activeTimeline === '17th' && 'Apparition des premiers mouvements complexes et des complications horlogères.'}
                  {activeTimeline === '18th' && 'Développement des méthodes de production industrielle et normalisation des pièces.'}
                  {activeTimeline === '19th' && 'Introduction de nouveaux matériaux comme l\'acier inoxydable et les alliages avancés.'}
                  {activeTimeline === '20th' && 'Révolution avec le quartz, les matériaux synthétiques et les technologies modernes.'}
                  {activeTimeline === '21st' && 'Ère des matériaux intelligents, durabilité et innovation matière.'}
                </p>
                <div className="text-sm text-blue-600">
                  {activeTimeline === '16th' && '1525 - Arrivée des artisans huguenots'}
                  {activeTimeline === '17th' && '1650 - Inventions de Huygens'}
                  {activeTimeline === '18th' && '1750 - Industrialisation horlogère'}
                  {activeTimeline === '19th' && '1850 - Production de masse'}
                  {activeTimeline === '20th' && '1950 - Ère du quartz'}
                  {activeTimeline === '21st' && '2000 - Matériaux du futur'}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="/chronologie_historique.png" 
                    alt="Chronologie historique" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="text-gray-500 text-center">Image chronologie</div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materiaux" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Matériaux Horlogers</h2>
            <p className="text-xl text-gray-600">Des matériaux traditionnels aux innovations high-tech</p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8">
            {['precious', 'metals', 'ceramics', 'carbon'].map((material) => (
              <button
                key={material}
                onClick={() => setActiveMaterial(material)}
                className={`m-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  activeMaterial === material 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {material === 'precious' && 'Métaux Précieux'}
                {material === 'metals' && 'Métaux Techniques'}
                {material === 'ceramics' && 'Céramiques'}
                {material === 'carbon' && 'Fibres de Carbone'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Propriétés</h3>
                <ul className="space-y-2 text-gray-700">
                  {activeMaterial === 'precious' && (
                    <>
                      <li>• Résistance à la corrosion exceptionnelle</li>
                      <li>• Propriétés hypoallergéniques</li>
                      <li>• Durabilité sur plusieurs générations</li>
                      <li>• Valeur et prestige</li>
                    </>
                  )}
                  {activeMaterial === 'metals' && (
                    <>
                      <li>• Résistance mécanique élevée</li>
                      <li>• Facilité d'usinage</li>
                      <li>• Stabilté dimensionnelle</li>
                      <li>• Coût оптимизирован</li>
                    </>
                  )}
                  {activeMaterial === 'ceramics' && (
                    <>
                      <li>• Résistance aux rayures</li>
                      <li>• Inertie chimique</li>
                      <li>• Légéreté exceptionnelle</li>
                      <li>• Couleurs durables</li>
                    </>
                  )}
                  {activeMaterial === 'carbon' && (
                    <>
                      <li>• Ultra-légéreté</li>
                      <li>• Résistance supérieure</li>
                      <li>• Design moderne</li>
                      <li>• Performance extrême</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Applications</h3>
                <p className="text-gray-700">
                  {activeMaterial === 'precious' && 'Boîtiers, bracelets de luxe, pièces décoratives'}
                  {activeMaterial === 'metals' && 'Mécanismes, ressorts, balanciers, vis'}
                  {activeMaterial === 'ceramics' && 'Boîtiers, lunette, éléments décoratifs'}
                  {activeMaterial === 'carbon' && 'Boîtiers sport, bracelets, composants techniques'}
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg flex items-center justify-center">
                <img 
                  src="/materiaux_hightech_horlogerie.png" 
                  alt="Matériaux horlogers" 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="text-gray-500 text-center">Image matériaux horlogers</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Innovation & Futur</h2>
            <p className="text-xl text-gray-300">Les tendances qui façonnent l'horlogerie de demain</p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8">
            {['environment', 'digital', 'smart'].map((trend) => (
              <button
                key={trend}
                onClick={() => setActiveTrend(trend)}
                className={`m-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  activeTrend === trend 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {trend === 'environment' && 'Durabilité'}
                {trend === 'digital' && 'Digitalisation'}
                {trend === 'smart' && 'Intelligence'}
              </button>
            ))}
          </div>

          <div className="bg-gray-800 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  {activeTrend === 'environment' && 'Matériaux Durables'}
                  {activeTrend === 'digital' && 'Révolution Numérique'}
                  {activeTrend === 'smart' && 'Horlogerie Intelligente'}
                </h3>
                <p className="text-gray-300 mb-4">
                  {activeTrend === 'environment' && 'Recherche de matériaux recyclables et processus de fabrication éco-responsables pour un impact environnemental minimal.'}
                  {activeTrend === 'digital' && 'Intégration de technologies numériques pour optimiser la production et la personnalisation des matériaux.'}
                  {activeTrend === 'smart' && 'Développement de matériaux intelligents capables de s\'adapter aux conditions d\'usage et aux préférences de l\'utilisateur.'}
                </p>
                <div className="space-y-2 text-blue-400">
                  {activeTrend === 'environment' && (
                    <>
                      <div>• Recyclage des métaux précieux</div>
                      <div>• Biomatériaux durables</div>
                      <div>• Énergies renouvelables</div>
                    </>
                  )}
                  {activeTrend === 'digital' && (
                    <>
                      <div>• Simulation numérique des matériaux</div>
                      <div>• Production additive 3D</div>
                      <div>• IoT dans la chaîne d’approvisionnement</div>
                    </>
                  )}
                  {activeTrend === 'smart' && (
                    <>
                      <div>• Matériaux auto-réparateurs</div>
                      <div>• Alliages adaptatifs</div>
                      <div>• Capteurs intégrés</div>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <img 
                    src="/innovation_horlogerie_futur.png" 
                    alt="Innovation horlogerie futur" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="text-gray-400 text-center">Image innovation futur</div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Districts Section */}
      <section id="districts" className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Districts Horlogers</h2>
            <p className="text-xl text-gray-600">Les quatre régions clés de l'horlogerie suisse</p>
          </div>
          
          <div className="flex flex-wrap justify-center mb-8">
            {[
              { key: 'geneve', label: 'Genève' },
              { key: 'neuchatel', label: 'Neuchâtel' },
              { key: 'vallee_de_joux', label: 'Vallée de Joux' },
              { key: 'jura_bienne', label: 'Jura & Bienne' }
            ].map((district) => (
              <button
                key={district.key}
                onClick={() => setActiveDistrict(district.key)}
                className={`m-2 px-6 py-3 rounded-full font-medium transition-colors duration-300 ${
                  activeDistrict === district.key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-300'
                }`}
              >
                {district.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeDistrict === 'geneve' && 'District de Genève'}
                  {activeDistrict === 'neuchatel' && 'District de Neuchâtel'}
                  {activeDistrict === 'vallee_de_joux' && 'Vallée de Joux'}
                  {activeDistrict === 'jura_bienne' && 'Jura & Bienne'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeDistrict === 'geneve' && 'Centre du luxe et de la haute horlogerie, Genève regroupe les maisons les plus prestigieuses et les matériels les plus nobles.'}
                  {activeDistrict === 'neuchatel' && 'Région spécialisée dans la fabrication de mouvements et de composants techniques de haute précision.'}
                  {activeDistrict === 'vallee_de_joux' && 'Berceau de l\'horlogerie mécanique, cette vallée concentre les savoir-faire traditionnels et l\'expertise des complications.'}
                  {activeDistrict === 'jura_bienne' && 'Hub industriel moderne spécialisé dans la production de masse et les innovations technologiques.'}
                </p>
                <div className="space-y-2 text-blue-600">
                  {activeDistrict === 'geneve' && (
                    <>
                      <div>• Maisons de luxe: Patek Philippe, Vacheron Constantin</div>
                      <div>• Spécialité: Complications majeures</div>
                      <div>• Matériaux: Or, platine, diamants</div>
                    </>
                  )}
                  {activeDistrict === 'neuchatel' && (
                    <>
                      <div>• Expertise: ETA, Valjoux</div>
                      <div>• Spécialité: Mouvements de série</div>
                      <div>• Innovation: Chronographes intégrés</div>
                    </>
                  )}
                  {activeDistrict === 'vallee_de_joux' && (
                    <>
                      <div>• Maîtres: Audemars Piguet, Jaeger-LeCoultre</div>
                      <div>• Spécialité: Réserves de marche</div>
                      <div>• Tradition: SAV et pièces de rechange</div>
                    </>
                  )}
                  {activeDistrict === 'jura_bienne' && (
                    <>
                      <div>• Leaders: Swatch Group</div>
                      <div>• Production: Industrielle moderne</div>
                      <div>• Innovation: Matériaux synthétique</div>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="/districts_horlogers_suisse.png" 
                    alt="Districts horlogers Suisse" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '<div class="text-gray-500 text-center">Image districts horlogers</div>';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation Section */}
      <section id="formation" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Formation & Savoir-faire</h2>
            <p className="text-xl text-gray-600">L'excellence au service de la transmission des compétences</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                <img 
                  src="/formation_horlogere_suisse.png" 
                  alt="Formation horlogère Suisse" 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = '<div class="text-gray-500 text-center">Image formation horlogère</div>';
                  }}
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Écoles Spécialisées</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• École d'Horlogerie de Genève</li>
                  <li>• Centre de Formation du Locle</li>
                  <li>• Institut de la Vallée de Joux</li>
                  <li>• École de Bienne</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Formations Disponibles</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Technicien en Horlogerie (3 ans)</li>
                  <li>• Cadranier (2 ans)</li>
                  <li>• Poinçonneur de kasus (2 ans)</li>
                  <li>• Ingénieur Horloger (Master)</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation Pédagogique</h3>
                <p className="text-gray-700">
                  Intégration des technologies numériques pour simuler l'usinage des matériaux 
                  et former aux nouveaux procédés de fabrication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section id="entreprises" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Entreprises Leaders</h2>
            <p className="text-xl text-gray-600">Les acteurs qui façonnent l'industrie horlogère</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Swatch Group</h3>
              <p className="text-gray-600 mb-4">
                Leader mondial de l'horlogerie avec 19 marques et une expertise complète 
                dans tous les segments de matériaux.
              </p>
              <div className="text-blue-600 text-sm">
                <div>• Omega, Longines, Tissot</div>
                <div>• Innovation matériaux</div>
                <div>• Production industrielle</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Richemont Group</h3>
              <p className="text-gray-600 mb-4">
                Groupe de luxe focalisé sur la haute horlogerie et les matériaux nobles 
                avec un portfolio de marques prestigieuses.
              </p>
              <div className="text-purple-600 text-sm">
                <div>• Cartier, Jaeger-LeCoultre</div>
                <div>• Haute horlogerie</div>
                <div>• Métaux précieux</div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">LVMH Watch Division</h3>
              <p className="text-gray-600 mb-4">
                Division horlogerie du groupe LVMH regroupant TAG Heuer, Hublot, Bulgari 
                et Zenith avec un focus sur l'innovation.
              </p>
              <div className="text-red-600 text-sm">
                <div>• Hublot, TAG Heuer</div>
                <div>• Matériaux innovantes</div>
                <div>• Design moderne</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section id="vision" className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Vision Future</h2>
            <p className="text-xl text-blue-200">L'horlogerie suisse à l'horizon 2030</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Durabilité</h3>
              <p className="text-blue-200 mb-4">
                Transition vers des matériaux 100% recyclables et des processus 
                de fabrication à empreinte carbone neutre.
              </p>
              <div className="text-green-400 text-sm">
                <div>• 80% de matériaux recyclés d'ici 2030</div>
                <div>• Énergie 100% renouvelable</div>
                <div>• Économie circulaire</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-blue-200 mb-4">
                Développement de matériaux intelligents et de technologies 
                de pointe pour les prochaines générations.
              </p>
              <div className="text-purple-400 text-sm">
                <div>• Matériaux auto-réparateurs</div>
                <div>• Intelligence artificielle</div>
                <div>• Nanotechnologie</div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Excellence</h3>
              <p className="text-blue-200 mb-4">
                Maintien du leadership mondial par l'innovation constante 
                et la maîtrise des matériaux d'exception.
              </p>
              <div className="text-yellow-400 text-sm">
                <div>• R&D: 10% du CA</div>
                <div>• Formation continue</div>
                <div>• Partenariats universitaires</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Positioning */}
      <section id="positionnement" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Positionnement Mondial</h2>
            <p className="text-xl text-gray-600">La Suisse, référence mondiale de l'excellence horlogère</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="bg-blue-50 p-8 rounded-lg mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Chiffres Clés</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">21M</div>
                    <p className="text-gray-700">Montres produites/an</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">52%</div>
                    <p className="text-gray-700">Part marché mondial</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">45B CHF</div>
                    <p className="text-gray-700">Exportations 2023</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">60K</div>
                    <p className="text-gray-700">Emplois directs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Avantages Concurrentiels</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Savoir-faire traditionnel préservé</li>
                  <li>• Innovation technologique continue</li>
                  <li>• Écosystème industriel intégré</li>
                  <li>• Formation d'excellence reconnue</li>
                  <li>• Image de marque premium mondiale</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Marchés Principaux</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Chine</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>États-Unis</span>
                    <span className="font-bold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hong Kong</span>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Japon</span>
                    <span className="font-bold">8%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Défis & Opportunités</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-red-600">Défis</h4>
                    <ul className="text-sm text-gray-700 mt-1">
                      <li>• Concurrence quartz asiatique</li>
                      <li>• Évolution des goûts consommateurs</li>
                      <li>• Durabilité environnementale</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600">Opportunités</h4>
                    <ul className="text-sm text-gray-700 mt-1">
                      <li>• Marché du luxe en croissance</li>
                      <li>• Innovation matériaux</li>
                      <li>• Horlogerie connectée</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-xl text-gray-300">En savoir plus sur l'excellence des matériaux horlogers suisses</p>
          </div>
          
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <form onSubmit={handleFormSubmit}>
                <h3 className="text-xl font-bold mb-4">Demande d'information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <select className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Information générale</option>
                      <option>Formation horlogère</option>
                      <option>Partenariats</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre message..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-blue-400">HorloLearn</h3>
              <p className="text-gray-400">Excellence des Matériaux Horlogers Suisses</p>
            </div>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="#hero" className="text-gray-400 hover:text-white transition-colors">Accueil</a>
              <a href="#materiaux" className="text-gray-400 hover:text-white transition-colors">Matériaux</a>
              <a href="#innovation" className="text-gray-400 hover:text-white transition-colors">Innovation</a>
              <a href="#formation" className="text-gray-400 hover:text-white transition-colors">Formation</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-gray-500 text-sm">
              © 2024 HorloLearn. Tous droits réservés. | Créé avec passion pour l'excellence horlogère suisse.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
