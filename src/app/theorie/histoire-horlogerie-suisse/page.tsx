// page.tsx (ou histoire-horlogerie.tsx)
'use client';
import React, { useState, useEffect } from 'react';

// Styles CSS complets intégrés
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f7f7f7;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header */
  .header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #667eea;
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
  }

  .nav-links a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.3s;
  }

  .nav-links a:hover {
    color: #667eea;
  }

  .header-icons {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .header-icon {
    width: 20px;
    height: 20px;
    color: #999;
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 4rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('imgs/patek-philippe-swiss-luxury-watch-movement-gears-close-up.jpeg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
  }

  .hero h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  .made-in-club {
    background: white;
    color: #667eea;
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .made-in-club:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  /* Key Stats */
  .key-stats {
    padding: 4rem 0;
    background: white;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 3rem;
    text-align: center;
    color: #333;
    position: relative;
  }

  .section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 40px;
    background: #667eea;
    margin-left: -20px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    font-size: 1rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Timeline */
  .timeline-section {
    padding: 4rem 0;
    background: #f7f7f7;
  }

  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background: #667eea;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
  }

  .timeline-item:nth-child(odd) {
    flex-direction: row;
  }

  .timeline-item:nth-child(even) {
    flex-direction: row-reverse;
  }

  .timeline-content {
    flex: 1;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    margin: 0 2rem;
    position: relative;
  }

  .timeline-year {
    font-size: 1.8rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 1rem;
  }

  .timeline-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
  }

  .timeline-description {
    color: #666;
    line-height: 1.6;
  }

  .timeline-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 1rem;
  }

  .timeline-marker {
    width: 16px;
    height: 16px;
    background: #667eea;
    border: 4px solid white;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    box-shadow: 0 0 0 4px #667eea;
  }

  /* Regions */
  .regions-section {
    padding: 4rem 0;
    background: white;
  }

  .regions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .region-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .region-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .region-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .region-content {
    padding: 1.5rem;
  }

  .region-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .region-subtitle {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .region-since {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .region-description {
    color: #666;
    line-height: 1.6;
  }

  /* Manufactures */
  .manufactures-section {
    padding: 4rem 0;
    background: #f7f7f7;
  }

  .manufactures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .manufacture-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .manufacture-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .manufacture-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .manufacture-content {
    padding: 1.5rem;
  }

  .manufacture-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .manufacture-year {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .manufacture-location {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }

  .manufacture-description {
    color: #666;
    line-height: 1.6;
  }

  /* Footer */
  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 2rem 0;
  }

  .footer-content {
    margin-bottom: 1rem;
  }

  .footer-link {
    color: #667eea;
    text-decoration: none;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .nav-links {
      display: none;
    }

    .timeline::before {
      left: 20px;
    }

    .timeline-item {
      flex-direction: column !important;
      align-items: flex-start;
    }

    .timeline-content {
      margin: 0 0 0 40px;
    }

    .timeline-marker {
      left: 20px;
    }

    .regions-grid,
    .manufactures-grid {
      grid-template-columns: 1fr;
    }
  }
`;

// Données complètes
const timelineData = [
  {
    year: "1541",
    title: "Les Origines : Jean Calvin et la Naissance à Genève",
    description: "Jean Calvin bannit le port d'objets ornementaux à Genève, forçant orfèvres et joailliers à se reconvertir dans l'horlogerie, marquant la naissance de l'industrie horlogère suisse.",
    image: "/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    year: "1685",
    title: "Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien",
    description: "La révocation de l'Édit de Nantes entraîne l'arrivée de réfugiés huguenots français apportant capitaux, savoir-faire et réseaux commerciaux. L'horlogerie se développe de Genève à Schaffhouse.",
    image: null
  },
  {
    year: "1740",
    title: "Vallée de Joux : Berceau de la Haute Horlogerie",
    description: "Les agriculteurs combiers fabriquent des pièces horlogères pendant les longs hivers. Naissance des \"fermes horlogères\" avec fenêtres supplémentaires pour maximiser la lumière naturelle.",
    image: "/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
  },
  {
    year: "XIXe Siècle",
    title: "L'Âge d'Or : Innovations et Production en Série",
    description: "Développement de nouvelles techniques de fabrication, production en série, exportations massives vers les États-Unis. Apparition des montres bracelet. Invention du tourbillon par Abraham-Louis Breguet (1801).",
    image: "/imgs/vintage_swiss_heritage_pocket_watch_gold_chain.jpg"
  },
  {
    year: "1929",
    title: "Grande Dépression : Naissance des Grands Groupes",
    description: "La crise économique force les petites maisons à se regrouper. Création de la SSIH (Omega + Tissot, 1930) et de l'ASUAG (Longines, Mido, Hamilton, 1931).",
    image: null
  },
  {
    year: "1970-1983",
    title: "Crise du Quartz : La Swatch Sauve l'Industrie",
    description: "Les montres à quartz japonaises réduisent les parts de marché suisses de 50% à 15%. Fusion SSIH + ASUAG = Swatch Group (1983). La montre Swatch relance l'industrie.",
    image: null
  }
];

const regionsData = [
  {
    name: "Genève",
    subtitle: "Berceau de l'horlogerie",
    since: "1541",
    description: "Capitale mondiale de l'horlogerie de luxe, siège de Patek Philippe, Rolex, Vacheron Constantin.",
    image: "/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    name: "Vallée de Joux",
    subtitle: "Haute horlogerie",
    since: "1740",
    description: "Berceau des grandes complications horlogères. 26 fermes horlogères historiques.",
    image: "/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg"
  },
  {
    name: "Neuchâtel",
    subtitle: "Innovation technique",
    since: "XVIIe siècle",
    description: "Centre d'innovation et de recherche horlogère.",
    image: "/imgs/neuchatel-switzerland-city-lake-view-historic-watchmaking-region.jpg"
  },
  {
    name: "Bienne/Biel",
    subtitle: "Production industrielle",
    since: "XXe siècle",
    description: "Siège d'Omega, Swatch Group. Centre industriel majeur.",
    image: "/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg"
  },
  {
    name: "La Chaux-de-Fonds",
    subtitle: "Patrimoine UNESCO",
    since: "XVIIIe siècle",
    description: "Ville horlogère inscrite au patrimoine mondial UNESCO.",
    image: "/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
  },
  {
    name: "Schaffhouse",
    subtitle: "Horlogerie allemande-suisse",
    since: "XIXe siècle",
    description: "Siège d'IWC Schaffhausen, manufacture prestigieuse.",
    image: "/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg"
  }
];

const manufacturesData = [
  {
    name: "Vacheron Constantin",
    year: "1755",
    location: "Genève",
    description: "La plus ancienne manufacture horlogère active au monde, 270 ans d'excellence continue.",
    image: "/imgs/vacheron_constantin_tourbillon_watch_green_dial_professional.jpg"
  },
  {
    name: "Jaeger-LeCoultre",
    year: "1833",
    location: "Le Sentier",
    description: "Maître des complications, créateur du plus petit mouvement mécanique au monde.",
    image: "/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg"
  },
  {
    name: "Patek Philippe",
    year: "1839",
    location: "Genève",
    description: "Synonyme de perfection horlogère, créateur des complications les plus complexes.",
    image: "/imgs/Patek-Philippe-Nautilus-Luxury-Swiss-Watch-Blue-Dial.jpg"
  },
  {
    name: "Omega",
    year: "1848",
    location: "Bienne",
    description: "Marque officielle des Jeux Olympiques, symbole de précision et d'innovation.",
    image: "/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
  },
  {
    name: "Audemars Piguet",
    year: "1875",
    location: "Le Brassus",
    description: "Créateur de la première montre-bracelet à répétition minutes en 1892.",
    image: "/imgs/audemars_piguet_royal_oak_perpetual_calendar_blue_luxury_watch.jpg"
  },
  {
    name: "Rolex",
    year: "1905",
    location: "Genève",
    description: "Pionnier de la montre-bracelet robuste et élégante, symbole de réussite.",
    image: "/imgs/rolex-submariner-date-luxury-watch-professional-studio.jpg"
  },
  {
    name: "Blancpain",
    year: "1735",
    location: "Villeret",
    description: "Plus ancienne marque horlogère au monde, gardienne des traditions ancestrales.",
    image: "/imgs/blancpain_fifty_fathoms_bathyscaphe_luxury_watch.jpg"
  },
  {
    name: "IWC Schaffhausen",
    year: "1868",
    location: "Schaffhouse",
    description: "Ingénierie de précision, spécialisée dans les montres d'aviation et de dive.",
    image: "/imgs/rolex-submariner-date-luxury-watch-professional-studio.jpg"
  }
];

const statsData = [
  {
    number: "500+",
    label: "Années d'Histoire"
  },
  {
    number: "21,7 MdsCHF",
    label: "CA (2019)"
  },
  {
    number: "N°1",
    label: "Mondial Luxe"
  },
  {
    number: "+2,4%",
    label: "Croissance 2018-19"
  }
];

export default function HorlogeriePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('horlogerie-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('horlogerie-theme', newTheme ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`horlogerie-page ${isDarkMode ? 'dark' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <a href="#hero" className="logo">HorloLearn</a>
            
            <nav>
              <ul className="nav-links">
                <li><a href="#chronologie" onClick={(e) => { e.preventDefault(); scrollToSection('chronologie'); }}>Chronologie</a></li>
                <li><a href="#regions" onClick={(e) => { e.preventDefault(); scrollToSection('regions'); }}>Régions</a></li>
                <li><a href="#manufactures" onClick={(e) => { e.preventDefault(); scrollToSection('manufactures'); }}>Manufactures</a></li>
              </ul>
            </nav>

            <div className="header-icons">
              <button 
                onClick={toggleTheme}
                style={{
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>L'Excellence Horlogère Suisse</h1>
            <p className="hero-subtitle">500+ Années d'Histoire</p>
            <button className="made-in-club">Made in Club</button>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="key-stats">
        <div className="container">
          <h2 className="section-title">Chiffres Clés</h2>
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="chronologie" className="timeline-section">
        <div className="container">
          <h2 className="section-title">500 Ans d'Excellence</h2>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-description">{item.description}</p>
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="timeline-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>
                <div className="timeline-marker"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section id="regions" className="regions-section">
        <div className="container">
          <h2 className="section-title">Géographie Horlogère</h2>
          <div className="regions-grid">
            {regionsData.map((region, index) => (
              <div key={index} className="region-card">
                <img 
                  src={region.image} 
                  alt={region.name}
                  className="region-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200"><rect width="400" height="200" fill="%23f0f0f0"/><text x="200" y="100" text-anchor="middle" fill="%23999" font-family="Arial" font-size="14">Image non disponible</text></svg>';
                  }}
                />
                <div className="region-content">
                  <h3 className="region-name">{region.name}</h3>
                  <div className="region-subtitle">{region.subtitle}</div>
                  <div className="region-since">Depuis {region.since}</div>
                  <p className="region-description">{region.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufactures */}
      <section id="manufactures" className="manufactures-section">
        <div className="container">
          <h2 className="section-title">Maisons Légendaires</h2>
          <div className="manufactures-grid">
            {manufacturesData.map((manufacture, index) => (
              <div key={index} className="manufacture-card">
                <img 
                  src={manufacture.image} 
                  alt={manufacture.name}
                  className="manufacture-image"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23f0f0f0"/><text x="200" y="125" text-anchor="middle" fill="%23999" font-family="Arial" font-size="14">Image non disponible</text></svg>';
                  }}
                />
                <div className="manufacture-content">
                  <h3 className="manufacture-name">{manufacture.name}</h3>
                  <div className="manufacture-year">Fondée en {manufacture.year}</div>
                  <div className="manufacture-location">{manufacture.location}</div>
                  <p className="manufacture-description">{manufacture.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>© 2025 HorloLearn - Éducation Horlogère de Prestige</p>
            <p>
              Une célébration de 500 ans d'excellence horlogère suisse | 
              <a href="https://www.horlolearn.ch" className="footer-link"> HorloLearn.ch</a>
            </p>
          </div>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>
            Created by MiniMax Agent
          </p>
        </div>
      </footer>
    </div>
  );
}
