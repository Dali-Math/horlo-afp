'use client';

import { useState, useEffect } from 'react';
import './styles.css'; // Vous devrez créer ce fichier avec tout le CSS

export default function SwissWatchMaterials() {
  const [activeTab, setActiveTab] = useState({
    materials: 'precious',
    timeline: '16th',
    district: 'geneve',
    trend: 'environment'
  });
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Scroll detection for navbar
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animate counters
    animateCounters();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-target]');
    counters.forEach((counter: any) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setNavOpen(false);
    }
  };

  const handleTabChange = (category: string, value: string) => {
    setActiveTab(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="swiss-watch-materials">
      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <span className="swiss-cross">✦</span>
            <span className="nav-title">Swiss Watch Materials</span>
          </div>
          <div className={`nav-menu ${navOpen ? 'active' : ''}`}>
            <a href="#hero" className="nav-link" onClick={() => scrollToSection('hero')}>Accueil</a>
            <a href="#history" className="nav-link" onClick={() => scrollToSection('history')}>Histoire</a>
            <a href="#materials" className="nav-link" onClick={() => scrollToSection('materials')}>Matériaux</a>
            <a href="#ecosystem" className="nav-link" onClick={() => scrollToSection('ecosystem')}>Écosystème</a>
            <a href="#innovation" className="nav-link" onClick={() => scrollToSection('innovation')}>Innovation</a>
            <a href="#future" className="nav-link" onClick={() => scrollToSection('future')}>Avenir</a>
            <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="nav-toggle" onClick={() => setNavOpen(!navOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">Rapport de Référence Mondial</span>
          </div>
          <h1 className="hero-title">
            <span className="title-main">Excellence et Innovation</span>
            <span className="title-sub">dans les Matériaux Horlogers Suisses</span>
          </h1>
          <p className="hero-description">
            Une analyse complète de l'écosystème des matériaux horlogers suisses, 
            démontrant pourquoi la Suisse demeure le leader mondial incontesté 
            en matière d'innovation, de qualité et de savoir-faire.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number" data-target="50">0</span>
              <span className="stat-label">% du marché mondial en valeur</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="65">0</span>
              <span className="stat-label">000 emplois en Suisse</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" data-target="500">0</span>
              <span className="stat-label">ans d'innovation continue</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollToSection('materials')}>
              <span>Découvrir les Matériaux</span>
              <svg className="btn-icon" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('history')}>
              Voir la Timeline
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="executive-summary">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Executive Summary</h2>
            <div className="section-divider"></div>
          </div>
          <div className="summary-content">
            <div className="summary-text">
              <p className="lead">
                Ce rapport offre une analyse complète et approfondie de l'écosystème des matériaux horlogers suisses, 
                démontrant pourquoi la Suisse demeure le leader mondial incontesté en matière d'innovation, 
                de qualité et de savoir-faire.
              </p>
              <p>
                De l'or 18 carats et des aciers spéciaux comme le 316L, qui ont défini les standards de l'industrie, 
                aux super-alliages modernes tels que le Ceratanium, le silicium et les composites en carbone, 
                la Suisse a continuellement repoussé les limites de la science des matériaux.
              </p>
              <div className="highlight-box">
                <h3>Points Clés</h3>
                <ul className="highlight-list">
                  <li>Maîtrise inégalée des matériaux de l'or au silicium</li>
                  <li>Écosystème industriel unique au monde</li>
                  <li>Formation de renommée mondiale (ETVJ, WOSTEP)</li>
                  <li>Innovation continue et R&D de pointe</li>
                  <li>Leadership face à la concurrence internationale</li>
                </ul>
              </div>
            </div>
            <div className="summary-visual">
              <img src="/assets/images/materials_dashboard.png" alt="Dashboard des Matériaux" className="summary-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="history" className="timeline-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Chronologie Historique</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              L'évolution des matériaux horlogers du XVIe siècle à aujourd'hui
            </p>
          </div>
          
          <div className="timeline-container">
            <div className="timeline-visual">
              <img src="/assets/images/chronologie_historique.png" alt="Chronologie des Matériaux" className="timeline-image" />
            </div>
            
            <div className="timeline-details">
              <div className="timeline-tabs">
                <button 
                  className={`tab-btn ${activeTab.timeline === '16th' ? 'active' : ''}`}
                  onClick={() => handleTabChange('timeline', '16th')}
                >
                  XVIe-XVIIe
                </button>
                <button 
                  className={`tab-btn ${activeTab.timeline === '18th' ? 'active' : ''}`}
                  onClick={() => handleTabChange('timeline', '18th')}
                >
                  XVIIIe-XIXe
                </button>
                <button 
                  className={`tab-btn ${activeTab.timeline === '20th' ? 'active' : ''}`}
                  onClick={() => handleTabChange('timeline', '20th')}
                >
                  XXe siècle
                </button>
                <button 
                  className={`tab-btn ${activeTab.timeline === '21st' ? 'active' : ''}`}
                  onClick={() => handleTabChange('timeline', '21st')}
                >
                  XXIe siècle
                </button>
              </div>
              
              <div className="timeline-content">
                {activeTab.timeline === '16th' && (
                  <div className="timeline-item active">
                    <h3>Les Origines : Orfèvrerie et Métaux Précieux</h3>
                    <p>L'horlogerie suisse naît à Genève au XVIe siècle. L'interdiction du port d'objets ornementaux par Jean Calvin contraint les orfèvres à se reconvertir. Les premiers garde-temps sont naturellement fabriqués en or et argent.</p>
                    <div className="timeline-materials">
                      <span className="material-tag">Or 18 carats</span>
                      <span className="material-tag">Argent sterling</span>
                      <span className="material-tag">Platine</span>
                    </div>
                  </div>
                )}
                
                {activeTab.timeline === '18th' && (
                  <div className="timeline-item active">
                    <h3>L'Âge de la Précision : Laiton, Acier et Alliages</h3>
                    <p>Le XVIIIe siècle marque l'avènement de l'horlogerie de précision. Invention révolutionnaire des alliages par Charles-Édouard Guillaume (prix Nobel 1920) :</p>
                    <ul>
                      <li><strong>Invar (1896)</strong> : Coefficient de dilatation thermique faible</li>
                      <li><strong>Elinvar (1912)</strong> : Module d'élasticité constant</li>
                    </ul>
                    <div className="timeline-materials">
                      <span className="material-tag">Invar</span>
                      <span className="material-tag">Elinvar</span>
                      <span className="material-tag">Laiton</span>
                    </div>
                  </div>
                )}
                
                {activeTab.timeline === '20th' && (
                  <div className="timeline-item active">
                    <h3>Industrialisation : L'Ère de l'Acier Inoxydable</h3>
                    <p>Le XXe siècle voit l'adoption généralisée de l'<strong>acier inoxydable 316L</strong> et l'émergence d'alliages de précision pour l'organe réglant :</p>
                    <ul>
                      <li><strong>Glucydur (années 1930)</strong> : Alliage cuivre-béryllium pour balanciers</li>
                      <li><strong>Nivarox (années 1930)</strong> : Standard pour spiraux</li>
                    </ul>
                    <div className="timeline-materials">
                      <span className="material-tag">Acier 316L</span>
                      <span className="material-tag">Glucydur</span>
                      <span className="material-tag">Nivarox</span>
                    </div>
                  </div>
                )}
                
                {activeTab.timeline === '21st' && (
                  <div className="timeline-item active">
                    <h3>Révolution High-Tech : Super-Alliages et Silicium</h3>
                    <p>L'horlogerie suisse embrasse les matériaux high-tech :</p>
                    <ul>
                      <li><strong>Titane</strong> : Légèreté et résistance</li>
                      <li><strong>Céramique</strong> : Dureté et couleurs durables</li>
                      <li><strong>Silicium</strong> : Revolution des composants mécaniques</li>
                      <li><strong>Carbone forgé</strong> : Performance extreme</li>
                    </ul>
                    <div className="timeline-materials">
                      <span className="material-tag">Silicium</span>
                      <span className="material-tag">Ceratanium</span>
                      <span className="material-tag">Carbone TPT</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials" className="materials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Matériaux Traditionnels</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Les piliers historiques de l'horlogerie suisse : métaux précieux, aciers spéciaux et savoir-faire artisanal
            </p>
          </div>

          <div className="materials-tabs">
            <button 
              className={`tab-btn ${activeTab.materials === 'precious' ? 'active' : ''}`}
              onClick={() => handleTabChange('materials', 'precious')}
            >
              Métaux Précieux
            </button>
            <button 
              className={`tab-btn ${activeTab.materials === 'steel' ? 'active' : ''}`}
              onClick={() => handleTabChange('materials', 'steel')}
            >
              Aciers Spéciaux
            </button>
            <button 
              className={`tab-btn ${activeTab.materials === 'precision' ? 'active' : ''}`}
              onClick={() => handleTabChange('materials', 'precision')}
            >
              Alliages de Précision
            </button>
            <button 
              className={`tab-btn ${activeTab.materials === 'craft' ? 'active' : ''}`}
              onClick={() => handleTabChange('materials', 'craft')}
            >
              Savoir-Faire Artisanal
            </button>
          </div>

          <div className="materials-content">
            {activeTab.materials === 'precious' && (
              <div className="tab-content active">
                <div className="materials-grid">
                  <div className="material-card gold">
                    <div className="material-header">
                      <div className="material-icon">🏆</div>
                      <h3>Or 18 Carats</h3>
                    </div>
                    <div className="material-properties">
                      <div className="property">
                        <span className="property-label">Composition</span>
                        <span className="property-value">75% Or + 25% alliages</span>
                      </div>
                      <div className="property">
                        <span className="property-label">Densité</span>
                        <span className="property-value">15-16 g/cm³</span>
                      </div>
                      <div className="property">
                        <span className="property-label">Propriétés</span>
                        <span className="property-value">Inoxydable, amagnétique</span>
                      </div>
                    </div>
                    <div className="material-applications">
                      <h4>Applications</h4>
                      <ul>
                        <li>Boîtiers de luxe</li>
                        <li>Bracelets premium</li>
                        <li>Masses oscillantes</li>
                        <li>Aiguilles haut de gamme</li>
                      </ul>
                    </div>
                  </div>

                  <div className="material-card platinum">
                    <div className="material-header">
                      <div className="material-icon">💎</div>
                      <h3>Platine 950</h3>
                    </div>
                    <div className="material-properties">
                      <div className="property">
                        <span className="property-label">Composition</span>
                        <span className="property-value">95% Platine + 5% autres</span>
                      </div>
                      <div className="property">
                        <span className="property-label">Densité</span>
                        <span className="property-value">20-21 g/cm³</span>
                      </div>
                    </div>
                    <div className="material-applications">
                      <h4>Applications</h4>
                      <ul>
                        <li>Haute horlogerie exclusive</li>
                        <li>Grandes complications</li>
                        <li>Séries limitées</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab.materials === 'steel' && (
              <div className="tab-content active">
                <div className="materials-grid">
                  <div className="material-card steel-316l">
                    <div className="material-header">
                      <div className="material-icon">⚙️</div>
                      <h3>Acier Inox 316L</h3>
                    </div>
                    <div className="material-properties">
                      <div className="property">
                        <span className="property-label">Composition</span>
                        <span className="property-value">Fe-Cr-Ni-Mo + faible C</span>
                      </div>
                    </div>
                    <div className="material-applications">
                      <h4>Applications</h4>
                      <ul>
                        <li>Boîtiers standard horloger</li>
                        <li>Bracelets et maille</li>
                        <li>Production de masse</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Districts Section */}
      <section id="ecosystem" className="ecosystem-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Écosystème Industriel</h2>
            <div className="section-divider"></div>
            <p className="section-description">
              Districts horlogers, formation et chaîne d'approvisionnement
            </p>
          </div>

          <div className="districts-showcase">
            <div className="district-map">
              <img src="/assets/images/districts_horlogers_suisse.png" alt="Districts Horlogers" className="map-image" />
              <div className="map-overlay">
                <h3>Arc Jurassien</h3>
                <p>Concentration géographique du savoir-faire horloger</p>
              </div>
            </div>
            
            <div className="districts-details">
              <div className="district-tabs">
                <button 
                  className={`tab-btn ${activeTab.district === 'geneve' ? 'active' : ''}`}
                  onClick={() => handleTabChange('district', 'geneve')}
                >
                  Genève
                </button>
                <button 
                  className={`tab-btn ${activeTab.district === 'vallee-joux' ? 'active' : ''}`}
                  onClick={() => handleTabChange('district', 'vallee-joux')}
                >
                  Vallée de Joux
                </button>
                <button 
                  className={`tab-btn ${activeTab.district === 'neuchatel' ? 'active' : ''}`}
                  onClick={() => handleTabChange('district', 'neuchatel')}
                >
                  Neuchâtel
                </button>
                <button 
                  className={`tab-btn ${activeTab.district === 'bienne' ? 'active' : ''}`}
                  onClick={() => handleTabChange('district', 'bienne')}
                >
                  Bienne
                </button>
              </div>
              
              <div className="district-content">
                {activeTab.district === 'geneve' && (
                  <div className="district-info active">
                    <h3>Genève - Capitale de la Haute Horlogerie</h3>
                    <p>Berceau historique de l'horlogerie de luxe</p>
                    <div className="district-companies">
                      <h4>Entreprises</h4>
                      <span className="company-tag">Patek Philippe</span>
                      <span className="company-tag">Rolex</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-bottom">
              <div className="footer-copyright">
                <p>&copy; 2025 Swiss Watch Materials. Tous droits réservés.</p>
              </div>
              <div className="footer-swiss">
                <span className="swiss-badge">🇨🇭 Swiss Made Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
