'use client';

import React, { useState, useEffect } from 'react';

// ================================
// STYLES CSS INTÉGRÉS COMPLETS
// ================================
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f7f7f7;
  }

  .horlogerie-page {
    min-height: 100vh;
    transition: all 0.3s ease;
  }

  .horlogerie-page.dark {
    background-color: #1a1a1a;
    color: #ffffff;
  }

  .horlogerie-page.dark .header {
    background-color: #2d2d2d;
    color: #ffffff;
  }

  .horlogerie-page.dark .hero {
    background: linear-gradient(135deg, #4c63d2 0%, #553c9a 100%);
  }

  .horlogerie-page.dark .key-stats,
  .horlogerie-page.dark .regions-section {
    background-color: #2d2d2d;
  }

  .horlogerie-page.dark .section-title {
    color: #ffffff;
  }

  .horlogerie-page.dark .timeline-section,
  .horlogerie-page.dark .manufactures-section {
    background-color: #1a1a1a;
  }

  .horlogerie-page.dark .stat-card,
  .horlogerie-page.dark .region-card,
  .horlogerie-page.dark .manufacture-card {
    background-color: #2d2d2d;
    color: #ffffff;
    border-color: #404040;
  }

  .horlogerie-page.dark .stat-card .stat-label,
  .horlogerie-page.dark .region-card .region-description,
  .horlogerie-page.dark .manufacture-card .manufacture-description {
    color: #cccccc;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header Styles */
  .header {
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all 0.3s ease;
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
    transition: color 0.3s ease;
    cursor: pointer;
  }

  .logo:hover {
    color: #553c9a;
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
    transition: color 0.3s ease;
    padding: 0.5rem 0;
    position: relative;
    cursor: pointer;
  }

  .nav-links a:hover {
    color: #667eea;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #667eea;
    transition: width 0.3s ease;
  }

  .nav-links a:hover::after {
    width: 100%;
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
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .header-icon:hover {
    color: #667eea;
  }

  .theme-toggle {
    padding: 8px 12px;
    background: none;
    border: 2px solid #667eea;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    color: #667eea;
  }

  .theme-toggle:hover {
    background: #667eea;
    color: white;
    transform: translateY(-1px);
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.05"><path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"/></svg>');
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
    animation: fadeInUp 1s ease-out;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    animation: fadeInUp 1s ease-out 0.2s both;
  }

  .made-in-club {
    background: white;
    color: #667eea;
    padding: 12px 30px;
    border: none;
    border-radius: 25px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: fadeInUp 1s ease-out 0.4s both;
  }

  .made-in-club:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    background: #f8f9ff;
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
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    width: 60px;
    height: 4px;
    background: #667eea;
    border-radius: 2px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .stat-card {
    background: white;
    padding: 2.5rem 1.5rem;
    border-radius: 15px;
    text-align: center;
    border: 1px solid #e0e0e0;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
    transition: left 0.5s ease;
  }

  .stat-card:hover::before {
    left: 100%;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    border-color: #667eea;
  }

  .stat-number {
    font-size: 2.8rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 0.5rem;
    display: block;
  }

  .stat-label {
    font-size: 0.95rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  /* Timeline */
  .timeline-section {
    padding: 4rem 0;
    background: #f7f7f7;
  }

  .timeline {
    position: relative;
    max-width: 900px;
    margin: 0 auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(to bottom, #667eea, #764ba2);
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 4rem;
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
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    margin: 0 2rem;
    position: relative;
    transition: all 0.3s ease;
  }

  .timeline-content:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.15);
  }

  .timeline-year {
    font-size: 2rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 1rem;
  }

  .timeline-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #333;
    line-height: 1.3;
  }

  .timeline-description {
    color: #666;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  .timeline-marker {
    width: 20px;
    height: 20px;
    background: #667eea;
    border: 4px solid white;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    box-shadow: 0 0 0 6px rgba(102, 126, 234, 0.2);
    transition: all 0.3s ease;
  }

  .timeline-marker:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 0 0 8px rgba(102, 126, 234, 0.3);
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
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .region-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }

  .region-image {
    width: 100%;
    height: 220px;
    object-fit: cover;
    transition: transform 0.3s ease;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
  }

  .region-card:hover .region-image {
    transform: scale(1.05);
  }

  .region-content {
    padding: 2rem;
  }

  .region-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .region-subtitle {
    color: #667eea;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .region-since {
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .region-description {
    color: #666;
    line-height: 1.7;
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
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .manufacture-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.15);
  }

  .manufacture-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.3s ease;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 14px;
  }

  .manufacture-card:hover .manufacture-image {
    transform: scale(1.05);
  }

  .manufacture-content {
    padding: 2rem;
  }

  .manufacture-name {
    font-size: 1.4rem;
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
    font-weight: 500;
  }

  .manufacture-description {
    color: #666;
    line-height: 1.7;
  }

  /* Footer */
  .footer {
    background: #333;
    color: white;
    text-align: center;
    padding: 3rem 0;
  }

  .footer-content {
    margin-bottom: 1.5rem;
  }

  .footer-link {
    color: #667eea;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #8b9de8;
    text-decoration: underline;
  }

  .footer-attribution {
    color: #999;
    font-size: 0.85rem;
    margin-top: 1rem;
    opacity: 0.8;
  }

  /* Animations */
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

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .container {
      padding: 0 15px;
    }
  }

  @media (max-width: 768px) {
    .hero h1 {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.1rem;
    }

    .nav-links {
      display: none;
    }

    .section-title {
      font-size: 2rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .timeline::before {
      left: 30px;
    }

    .timeline-item {
      flex-direction: column !important;
      align-items: flex-start;
    }

    .timeline-content {
      margin: 0 0 0 60px;
      padding: 1.5rem;
    }

    .timeline-marker {
      left: 30px;
    }

    .regions-grid,
    .manufactures-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .stat-number {
      font-size: 2.2rem;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 3rem 0;
    }

    .hero h1 {
      font-size: 2rem;
    }

    .key-stats,
    .timeline-section,
    .regions-section,
    .manufactures-section {
      padding: 3rem 0;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .stat-card {
      padding: 2rem 1rem;
    }

    .timeline-content {
      margin: 0 0 0 50px;
      padding: 1.2rem;
    }

    .section-title {
      font-size: 1.8rem;
    }
  }
`;

// ================================
// DONNÉES COMPLÈTES
// ================================
const timelineData = [
  {
    year: "1541",
    title: "Les Origines : Jean Calvin et la Naissance à Genève",
    description: "Jean Calvin bannit le port d'objets ornementaux à Genève, forçant orfèvres et joailliers à se reconvertir dans l'horlogerie, marquant la naissance de l'industrie horlogère suisse."
  },
  {
    year: "1685",
    title: "Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien",
    description: "La révocation de l'Édit de Nantes entraîne l'arrivée de réfugiés huguenots français apportant capitaux, savoir-faire et réseaux commerciaux. L'horlogerie se développe de Genève à Schaffhouse."
  },
  {
    year: "1740",
    title: "Vallée de Joux : Berceau de la Haute Horlogerie",
    description: "Les agriculteurs combiers fabriquent des pièces horlogères pendant les longs hivers. Naissance des \"fermes horlogères\" avec fenêtres supplémentaires pour maximiser la lumière naturelle."
  },
  {
    year: "XIXe Siècle",
    title: "L'Âge d'Or : Innovations et Production en Série",
    description: "Développement de nouvelles techniques de fabrication, production en série, exportations massives vers les États-Unis. Apparition des montres bracelet. Invention du tourbillon par Abraham-Louis Breguet (1801)."
  },
  {
    year: "1929",
    title: "Grande Dépression : Naissance des Grands Groupes",
    description: "La crise économique force les petites maisons à se regrouper. Création de la SSIH (Omega + Tissot, 1930) et de l'ASUAG (Longines, Mido, Hamilton, 1931)."
  },
  {
    year: "1970-1983",
    title: "Crise du Quartz : La Swatch Sauve l'Industrie",
    description: "Les montres à quartz japonaises réduisent les parts de marché suisses de 50% à 15%. Fusion SSIH + ASUAG = Swatch Group (1983). La montre Swatch relance l'industrie."
  }
];

const regionsData = [
  {
    name: "Genève",
    subtitle: "Berceau de l'horlogerie",
    since: "1541",
    description: "Capitale mondiale de l'horlogerie de luxe, siège de Patek Philippe, Rolex, Vacheron Constantin."
  },
  {
    name: "Vallée de Joux",
    subtitle: "Haute horlogerie",
    since: "1740",
    description: "Berceau des grandes complications horlogères. 26 fermes horlogères historiques."
  },
  {
    name: "Neuchâtel",
    subtitle: "Innovation technique",
    since: "XVIIe siècle",
    description: "Centre d'innovation et de recherche horlogère."
  },
  {
    name: "Bienne/Biel",
    subtitle: "Production industrielle",
    since: "XXe siècle",
    description: "Siège d'Omega, Swatch Group. Centre industriel majeur."
  },
  {
    name: "La Chaux-de-Fonds",
    subtitle: "Patrimoine UNESCO",
    since: "XVIIIe siècle",
    description: "Ville horlogère inscrite au patrimoine mondial UNESCO."
  },
  {
    name: "Schaffhouse",
    subtitle: "Horlogerie allemande-suisse",
    since: "XIXe siècle",
    description: "Siège d'IWC Schaffhausen, manufacture prestigieuse."
  }
];

const manufacturesData = [
  {
    name: "Vacheron Constantin",
    year: "1755",
    location: "Genève",
    description: "La plus ancienne manufacture horlogère active au monde, 270 ans d'excellence continue."
  },
  {
    name: "Jaeger-LeCoultre",
    year: "1833",
    location: "Le Sentier",
    description: "Maître des complications, créateur du plus petit mouvement mécanique au monde."
  },
  {
    name: "Patek Philippe",
    year: "1839",
    location: "Genève",
    description: "Synonyme de perfection horlogère, créateur des complications les plus complexes."
  },
  {
    name: "Omega",
    year: "1848",
    location: "Bienne",
    description: "Marque officielle des Jeux Olympiques, symbole de précision et d'innovation."
  },
  {
    name: "Audemars Piguet",
    year: "1875",
    location: "Le Brassus",
    description: "Créateur de la première montre-bracelet à répétition minutes en 1892."
  },
  {
    name: "Rolex",
    year: "1905",
    location: "Genève",
    description: "Pionnier de la montre-bracelet robuste et élégante, symbole de réussite."
  },
  {
    name: "Blancpain",
    year: "1735",
    location: "Villeret",
    description: "Plus ancienne marque horlogère au monde, gardienne des traditions ancestrales."
  },
  {
    name: "IWC Schaffhausen",
    year: "1868",
    location: "Schaffhouse",
    description: "Ingénierie de précision, spécialisée dans les montres d'aviation et de dive."
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

// ================================
// COMPOSANT PRINCIPAL
// ================================
export default function HorlogeriePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('horlogerie-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(prefersDark);
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

  const handleMadeInClub = () => {
    alert('Made in Club! 🎉');
  };

  return (
    <div className={`horlogerie-page ${isDarkMode ? 'dark' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div 
              className="logo" 
              onClick={() => scrollToSection('hero')}
            >
              HorloLearn
            </div>
            
            <nav>
              <ul className="nav-links">
                <li><a onClick={() => scrollToSection('chronologie')}>Chronologie</a></li>
                <li><a onClick={() => scrollToSection('regions')}>Régions</a></li>
                <li><a onClick={() => scrollToSection('manufactures')}>Manufactures</a></li>
              </ul>
            </nav>

            <div className="header-icons">
              <button 
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Basculer le thème"
                title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Recherche">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="21 21l-4.35-4.35"></path>
              </svg>
              
              <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Profil">
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
            <button className="made-in-club" onClick={handleMadeInClub}>Made in Club</button>
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
                <div className="region-image">
                  {region.name}
                </div>
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
                <div className="manufacture-image">
                  {manufacture.name}
                </div>
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
          <p className="footer-attribution">
            Created by MiniMax Agent
          </p>
        </div>
      </footer>
    </div>
  );
}
