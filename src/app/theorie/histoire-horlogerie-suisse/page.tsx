'use client';

import React, { useState, useEffect } from 'react';

// CSS complet intégré avec le style doré élégant
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;500&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-500: #B8860B;
    --primary-600: #9A7209;
    --neutral-50: #FAFAF8;
    --neutral-100: #F5F4F0;
    --neutral-200: #E8E6E0;
    --neutral-500: #9B9A94;
    --neutral-700: #4A4A45;
    --neutral-900: #1C1C19;
    --bg-page: #FAFAF8;
    --bg-surface: #F5F4F0;
  }

  [data-theme="dark"] {
    --primary-500: #D4AF37;
    --neutral-50: #0F0F0F;
    --neutral-100: #1A1A1A;
    --neutral-200: #262626;
    --neutral-700: #A3A3A3;
    --neutral-900: #F8F5F0;
    --bg-page: #0F0F0F;
    --bg-surface: #1A1A1A;
  }

  body {
    font-family: 'Lato', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-page);
    color: var(--neutral-900);
    line-height: 1.6;
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  .horlogerie-page {
    min-height: 100vh;
  }

  /* Navigation */
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 96px;
    background: var(--bg-page);
    backdrop-filter: blur(10px);
    z-index: 1000;
    border-bottom: 1px solid var(--neutral-200);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.4s ease;
  }

  .nav-container {
    width: 100%;
    max-width: 1400px;
    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-logo {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-weight: 700;
    color: var(--neutral-900);
    text-decoration: none;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
    align-items: center;
  }

  .nav-link {
    font-size: 14px;
    font-weight: 300;
    color: var(--neutral-700);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    transition: color 0.3s;
  }

  .nav-link:hover {
    color: var(--neutral-900);
  }

  .theme-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    font-size: 20px;
    border-radius: 50%;
    transition: background 0.3s;
  }

  .theme-toggle:hover {
    background: var(--neutral-200);
  }

  /* Hero */
  .hero-section {
    position: relative;
    height: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-top: 96px;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1C1C19 0%, #4A4A45 100%);
    background-size: cover;
    background-position: center;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(28, 28, 25, 0.4), rgba(28, 28, 25, 0.7));
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    padding: 0 32px;
    text-align: center;
    color: var(--neutral-50);
  }

  .display-1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 96px;
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 16px;
  }

  .subhead {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 64px;
    opacity: 0.9;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    margin-top: 64px;
  }

  .stat-item {
    text-align: center;
  }

  .stat-value {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 48px;
    font-weight: 700;
    color: var(--primary-500);
    display: block;
    margin-bottom: 12px;
  }

  .stat-label {
    color: var(--neutral-200);
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Sections */
  .section-timeline,
  .section-geography,
  .section-manufactures {
    padding: 128px 0;
  }

  .section-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 32px;
  }

  .headline-1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 56px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 64px;
    color: var(--neutral-900);
  }

  /* Timeline */
  .timeline-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .timeline-card {
    display: flex;
    gap: 32px;
    background: var(--bg-surface);
    border: 1px solid var(--neutral-200);
    border-radius: 12px;
    padding: 48px;
    margin-bottom: 64px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.4s;
    position: relative;
  }

  .timeline-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
    border-color: var(--primary-500);
  }

  .timeline-card.reverse {
    flex-direction: row-reverse;
  }

  .timeline-date-badge {
    position: absolute;
    top: 24px;
    left: 24px;
    background: var(--primary-500);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
  }

  .timeline-image {
    flex: 0 0 40%;
    border-radius: 16px;
    overflow: hidden;
    height: 300px;
  }

  .timeline-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }

  .timeline-card:hover .timeline-image img {
    transform: scale(1.05);
  }

  .timeline-content {
    flex: 1;
    padding-top: 48px;
  }

  .headline-2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 40px;
    font-weight: 600;
    color: var(--neutral-900);
    margin-bottom: 16px;
  }

  .body {
    font-size: 18px;
    color: var(--neutral-700);
    line-height: 1.6;
  }

  /* Region Grid */
  .region-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-top: 64px;
  }

  .region-card {
    background: var(--bg-surface);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: all 0.4s;
  }

  .region-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  .region-card-image {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .region-card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }

  .region-card:hover .region-card-image img {
    transform: scale(1.05);
  }

  .region-card-content {
    padding: 48px;
  }

  .region-card-content h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    color: var(--neutral-900);
    margin-bottom: 12px;
  }

  .region-specialty {
    color: var(--primary-600);
    display: block;
    margin-bottom: 16px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Manufacture Grid */
  .manufacture-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-top: 64px;
  }

  .manufacture-card {
    background: var(--bg-surface);
    border: 1px solid var(--neutral-200);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.4s;
  }

  .manufacture-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(184, 134, 11, 0.15);
    border-color: var(--primary-500);
  }

  .manufacture-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .manufacture-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s;
  }

  .manufacture-card:hover .manufacture-image img {
    transform: scale(1.05);
  }

  .manufacture-content {
    padding: 48px;
  }

  .manufacture-content h3 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 28px;
    color: var(--neutral-900);
    margin-bottom: 12px;
  }

  .caption {
    font-size: 14px;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .manufacture-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  .manufacture-meta .caption:first-child {
    color: var(--primary-600);
    font-weight: 500;
  }

  .manufacture-specialty {
    color: var(--neutral-500);
  }

  .manufacture-famous {
    color: var(--primary-500);
    font-style: italic;
    margin-top: 16px;
  }

  /* Footer */
  .footer {
    background: var(--neutral-900);
    color: var(--neutral-100);
    padding: 64px 0;
    text-align: center;
  }

  .footer-badge {
    margin-top: 16px;
    padding: 8px 16px;
    background: var(--primary-500);
    color: white;
    display: inline-block;
    border-radius: 8px;
    font-size: 12px;
    text-transform: uppercase;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .manufacture-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .region-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .display-1 {
      font-size: 48px;
    }
    .headline-1 {
      font-size: 36px;
    }
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .timeline-card {
      flex-direction: column !important;
    }
    .timeline-image {
      height: 200px;
    }
    .region-grid,
    .manufacture-grid {
      grid-template-columns: 1fr;
    }
    .nav-links {
      display: none;
    }
  }
`;

// Données
const stats = [
  { value: '500 Ans', label: "D'Excellence" },
  { value: '30 Millions', label: 'Montres/An' },
  { value: '50%', label: 'Marché Luxe' },
  { value: 'CHF 20Mds', label: 'Exportations' },
];

const periods = [
  {
    year: '1541',
    title: "L'Interdiction de Calvin",
    description: "Jean Calvin interdit le port de bijoux à Genève, poussant les orfèvres vers l'horlogerie.",
    image: '/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg',
  },
  {
    year: '1750',
    title: 'Vallée de Joux',
    description: "Développement de l'horlogerie dans les montagnes du Jura pendant les longs hivers.",
    image: '/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg',
  },
  {
    year: '1839',
    title: "L'Ère Patek Philippe",
    description: 'Fondation de la manufacture la plus prestigieuse au monde.',
    image: '/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg',
  },
];

const regions = [
  {
    name: 'Genève',
    specialty: 'Haute horlogerie',
    description: 'Berceau historique de la haute horlogerie suisse depuis le 16ème siècle.',
    image: '/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg',
  },
  {
    name: 'Vallée de Joux',
    specialty: 'Complications',
    description: 'Cœur des grandes complications horlogères.',
    image: '/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg',
  },
  {
    name: 'Neuchâtel',
    specialty: 'Précision',
    description: "Centre académique et industriel de l'horlogerie.",
    image: '/imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg',
  },
  {
    name: 'Bienne',
    specialty: 'Production',
    description: 'Capitale moderne avec Rolex, Omega et Swatch Group.',
    image: '/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg',
  },
  {
    name: 'La Chaux-de-Fonds',
    specialty: 'UNESCO',
    description: 'Ville horlogère inscrite au patrimoine mondial.',
    image: '/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg',
  },
  {
    name: 'Schaffhausen',
    specialty: 'Ingénierie',
    description: "Siège d'IWC depuis 1868.",
    image: '/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg',
  },
];

const manufactures = [
  {
    name: 'Patek Philippe',
    founded: '1839',
    specialty: 'Grandes Complications',
    description: 'La manufacture la plus prestigieuse au monde.',
    image: '/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg',
    famous: 'Nautilus, Calatrava',
  },
  {
    name: 'Rolex',
    founded: '1905',
    specialty: 'Montres Sportives de Luxe',
    description: 'Icône mondiale du succès et de la performance.',
    image: '/imgs/Patek_Philippe_Nautilus_Luxury_Swiss_Watch_Blue_Dial.jpg',
    famous: 'Submariner, Daytona',
  },
  {
    name: 'Audemars Piguet',
    founded: '1875',
    specialty: 'Haute Horlogerie Sportive',
    description: 'Pionnière du luxe sportif avec la Royal Oak.',
    image: '/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg',
    famous: 'Royal Oak',
  },
  {
    name: 'Vacheron Constantin',
    founded: '1755',
    specialty: 'Plus Ancienne Manufacture',
    description: 'Production ininterrompue depuis 1755.',
    image: '/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg',
    famous: 'Patrimony, Overseas',
  },
];

export default function HistoireHorlogeriePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as 'light' | 'dark';
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  if (!mounted) return null;

  return (
    <div className="horlogerie-page" data-theme={theme}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Navigation */}
      <header className="nav-header">
        <div className="nav-container">
          <a href="#hero" className="nav-logo">HorloLearn</a>
          <nav>
            <ul className="nav-links">
              <li><a href="#chronologie" className="nav-link">Chronologie</a></li>
              <li><a href="#geographie" className="nav-link">Géographie</a></li>
              <li><a href="#manufactures" className="nav-link">Manufactures</a></li>
              <li>
                <button onClick={toggleTheme} className="theme-toggle">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="hero-section">
        <div className="hero-background" style={{
          backgroundImage: 'url(/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg)'
        }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="display-1">L'Excellence Horlogère Suisse</h1>
          <p className="subhead">500 Ans de Savoir-Faire</p>
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="chronologie" className="section-timeline">
        <div className="section-container">
          <h2 className="headline-1">Chronologie Historique</h2>
          <div className="timeline-container">
            {periods.map((period, i) => (
              <article key={i} className={`timeline-card ${i % 2 === 1 ? 'reverse' : ''}`}>
                <span className="timeline-date-badge">{period.year}</span>
                <div className="timeline-image">
                  <img src={period.image} alt={period.title} />
                </div>
                <div className="timeline-content">
                  <h3 className="headline-2">{period.title}</h3>
                  <p className="body">{period.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Regions */}
      <section id="geographie" className="section-geography">
        <div className="section-container">
          <h2 className="headline-1">Géographie Horlogère</h2>
          <div className="region-grid">
            {regions.map((region, i) => (
              <article key={i} className="region-card">
                <div className="region-card-image">
                  <img src={region.image} alt={region.name} />
                </div>
                <div className="region-card-content">
                  <h3>{region.name}</h3>
                  <span className="region-specialty caption">{region.specialty}</span>
                  <p className="body">{region.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Manufactures */}
      <section id="manufactures" className="section-manufactures">
        <div className="section-container">
          <h2 className="headline-1">Maisons Légendaires</h2>
          <div className="manufacture-grid">
            {manufactures.map((mfr, i) => (
              <article key={i} className="manufacture-card">
                <div className="manufacture-image">
                  <img src={mfr.image} alt={mfr.name} />
                </div>
                <div className="manufacture-content">
                  <h3>{mfr.name}</h3>
                  <div className="manufacture-meta">
                    <span className="caption">Fondée en {mfr.founded}</span>
                    <span className="manufacture-specialty caption">{mfr.specialty}</span>
                  </div>
                  <p className="body">{mfr.description}</p>
                  {mfr.famous && (
                    <p className="manufacture-famous caption">Modèles : {mfr.famous}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <p>© 2025 HorloLearn - L'Excellence Horlogère Suisse</p>
          <div className="footer-badge">Created by MiniMax Agent</div>
        </div>
      </footer>
    </div>
  );
}
