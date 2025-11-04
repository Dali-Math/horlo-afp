'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ================================
// STYLES CSS ULTRA-OPTIMISÉS VERSION FINALE
// ================================
const styles = `
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    scroll-behavior: smooth;
  }
  
  :root {
    --bg-primary: #fafbfc;
    --bg-secondary: #ffffff;
    --bg-tertiary: #f8f9fa;
    --bg-dark: #1a1a1a;
    --text-primary: #1a1a1a;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --border-color: #e2e8f0;
    --shadow-light: rgba(0,0,0,0.04);
    --shadow-medium: rgba(0,0,0,0.08);
    --shadow-strong: rgba(0,0,0,0.15);
    --accent-primary: #2563eb;
    --accent-secondary: #7c3aed;
    --accent-tertiary: #dc2626;
    --gold-primary: #d4af37;
    --gold-secondary: #ffd700;
    --gold-tertiary: #fff200;
    --platinum: #e5e4e2;
    --gradient-gold: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #fff200 100%);
    --gradient-premium: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #d4af37 100%);
    --gradient-luxury: linear-gradient(135deg, #1a1f2e 0%, #2d3748 50%, #4a5568 100%);
  }

  [data-theme="dark"] {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #a0aec0;
    --border-color: #374151;
    --shadow-light: rgba(255,255,255,0.05);
    --shadow-medium: rgba(255,255,255,0.1);
    --shadow-strong: rgba(255,255,255,0.15);
  }

  body {
    font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    transition: all 0.3s ease;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Hero Section */
  .hero {
    background: var(--gradient-luxury);
    color: white;
    padding: 4rem 0 6rem;
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
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    margin-bottom: 1.5rem;
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero p {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0.9;
  }

  /* Stats Section */
  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .stat-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--gold-secondary);
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.8;
  }

  /* Section Styles */
  .section {
    padding: 4rem 0;
  }

  .section:nth-child(even) {
    background: var(--bg-tertiary);
  }

  .section h2 {
    font-size: 2.5rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 3rem;
    background: var(--gradient-premium);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Cards Grid */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .card {
    background: var(--bg-secondary);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px var(--shadow-light);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px var(--shadow-medium);
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card:hover .card-image {
    transform: scale(1.05);
  }

  .card-content {
    padding: 1.5rem;
  }

  .card h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .card p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Timeline */
  .timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--gradient-gold);
    transform: translateX(-50%);
  }

  .timeline-item {
    position: relative;
    margin: 3rem 0;
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
    width: 45%;
    padding: 2rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    box-shadow: 0 4px 20px var(--shadow-light);
    position: relative;
  }

  .timeline-year {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient-gold);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    font-size: 0.9rem;
    z-index: 2;
  }

  .timeline-content h3 {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }

  .timeline-content p {
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Manufactures */
  .manufacture {
    display: flex;
    align-items: center;
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1rem 0;
    box-shadow: 0 2px 10px var(--shadow-light);
    transition: all 0.3s ease;
  }

  .manufacture:hover {
    transform: translateX(10px);
    box-shadow: 0 8px 25px var(--shadow-medium);
  }

  .manufacture img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1.5rem;
  }

  .manufacture-content h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }

  .manufacture-content p {
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  /* Premium Features */
  .premium-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .premium-feature {
    background: var(--gradient-premium);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .premium-feature::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.6s ease;
  }

  .premium-feature:hover::before {
    animation: shine 1.5s ease-in-out;
  }

  @keyframes shine {
    0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
  }

  .premium-feature h4 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .premium-feature p {
    opacity: 0.9;
    font-size: 0.9rem;
  }

  /* Footer */
  .footer {
    background: var(--bg-dark);
    color: white;
    padding: 3rem 0;
    margin-top: 4rem;
  }

  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .footer h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--gold-secondary);
  }

  .footer p,
  .footer li {
    opacity: 0.8;
    line-height: 1.6;
  }

  .footer ul {
    list-style: none;
  }

  .footer li {
    margin-bottom: 0.5rem;
  }

  .footer a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer a:hover {
    color: var(--gold-secondary);
  }

  /* Theme Toggle */
  .theme-toggle {
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 20px var(--shadow-light);
  }

  .theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px var(--shadow-medium);
  }

  .theme-toggle::before {
    content: '☀️';
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  [data-theme="dark"] .theme-toggle::before {
    content: '🌙';
  }

  /* Responsive */
  @media (max-width: 768px) {
    .container {
      padding: 0 0.5rem;
    }

    .hero {
      padding: 2rem 0 4rem;
    }

    .section {
      padding: 2rem 0;
    }

    .timeline::before {
      left: 20px;
    }

    .timeline-item {
      flex-direction: column !important;
      align-items: flex-start;
      padding-left: 60px;
    }

    .timeline-content {
      width: 100%;
      margin-left: 0;
    }

    .timeline-year {
      left: 20px;
      transform: none;
    }

    .manufacture {
      flex-direction: column;
      text-align: center;
    }

    .manufacture img {
      margin-right: 0;
      margin-bottom: 1rem;
    }

    .theme-toggle {
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
    }
  }

  /* Animations */
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-in-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.6s ease;
  }

  .slide-in-left.visible {
    opacity: 1;
    transform: translateX(0);
  }

  .slide-in-right {
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.6s ease;
  }

  .slide-in-right.visible {
    opacity: 1;
    transform: translateX(0);
  }

  /* Luxury Accents */
  .luxury-border {
    position: relative;
  }

  .luxury-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-gold);
  }

  .gold-text {
    color: var(--gold-primary);
    font-weight: 600;
  }

  .premium-shadow {
    box-shadow: 0 8px 32px rgba(212, 175, 55, 0.2);
  }
`;

// ================================
// DONNÉES DE CONTENU ULTRA-RICHES
// ================================

const timelineData = [
  {
    year: "1541",
    title: "Les Origines : Jean Calvin et la Naissance à Genève",
    desc: "Jean Calvin bannit le port d'objets ornementaux à Genève, forçant orfèvres et joailliers à se reconvertir dans l'horlogerie. Cette décision fondatrice marque la naissance officielle de l'industrie horlogère suisse.",
    img: "imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    year: "1685",
    title: "Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien",
    desc: "La révocation de l'Édit de Nantes entraîne l'arrivée massive de réfugiés huguenots français apportant capitaux, savoir-faire technique et réseaux commerciaux, démocratisant l'horlogerie.",
    img: "imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
  },
  {
    year: "1740",
    title: "Vallée de Joux : Berceau de la Haute Horlogerie",
    desc: "Les agriculteurs combiers utilisent les longs hivers pour fabriquer des pièces horlogères. Naissance des 'fermes horlogères' avec fenêtres supplémentaires pour la lumière, origem des complications.",
    img: "imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
  },
  {
    year: "1801",
    title: "L'Innovation : Le Tourbillon de Breguet",
    desc: "Abraham-Louis Breguet révolutionne l'horlogerie avec le tourbillon, mécanisme compensant les effets gravitationnels. Cette invention aberration marquer à jamais la haute horlogerie.",
    img: "imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
  },
  {
    year: "1848",
    title: "Industrialisation : Omega et l'Ère Moderne",
    desc: "Louis Brandt crée Omega à La Chaux-de-Fonds. L'industrialisation transforme l'horlogerie de l'artisanat vers la production en série, démocratisant l'accès aux montres suisses.",
    img: "imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
  },
  {
    year: "1886",
    title: "Genève : Centre de Haute Horlogerie",
    desc: "Création du Poinçon de Genève, qualité officielle garanté. Genève devient le sanctuaire de la haute horlogerie, avec ses manufactures prestigieuses et ses écoles d'artisans.",
    img: "imgs/Biel-Bienne-Switzerland-Cite-du-Temps-Omega-Swatch-Headquarters.jpg"
  }
];

const regions = [
  {
    name: "Genève",
    desc: "Palais de la Haute Horlogerie, siège de Patek Philippe, Vacheron Constantin, Rolex. Symbol de luxe et de perfection technique.",
    img: "imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    name: "Vallée de Joux",
    desc: "Berceau de la haute horlogerie, Audemars Piguet, Jaeger-LeCoultre. Terroir d'excellence et d'innovation technique.",
    img: "imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg"
  },
  {
    name: "Neuchâtel",
    desc: "Région des complications et de la recherche technique. IWC, Blancpain, Chopard. Expertise en chronographes et mécanismes complexes.",
    img: "imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg"
  },
  {
    name: "Bienne",
    desc: "Capitale de l'horlogerie moderne, Omega, Swatch. Alliance parfait entre tradition et innovation contemporaine.",
    img: "imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg"
  },
  {
    name: "La Chaux-de-Fonds",
    desc: "Première ville horlogère au monde, classé UNESCO. Omega, Tissot, Longines. Pionniers de l'industrialisation horlogère.",
    img: "imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
  },
  {
    name: "Schaffhausen",
    desc: "Manufactures d'excellence, IWC, Breitling. Spialisés dans l'horlogerie technique et l'aviation. Innovations révolutionnaires.",
    img: "imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg"
  }
];

const manufactures = [
  {
    name: "Patek Philippe",
    year: "1839",
    desc: "Une seule passion : l'excellence absolue. Considérée comme la Manufacture la plus prestigieuse au monde.",
    img: "imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg"
  },
  {
    name: "Audemars Piguet",
    year: "1875",
    desc: "Inventer le temps, innover sans cesse. Créateurs du Royal Oak, révolution du design horloger.",
    img: "imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg"
  },
  {
    name: "Vacheron Constantin",
    year: "1755",
    desc: "La plus ancienne manufacture horlogère au monde. 'Toujours faire mieux que nécessaire'.",
    img: "imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg"
  },
  {
    name: "Jaeger-LeCoultre",
    year: "1833",
    desc: "Des complications dans l'âme. Reine des complications, inventrice de la Memovox.",
    img: "imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg"
  },
  {
    name: "Omega",
    year: "1848",
    desc: "La quête de la précision absolue. Chronométreur officiel des Jeux Olympiques, première lune.",
    img: "imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
  },
  {
    name: "Rolex",
    year: "1905",
    desc: "LGMT - La Grande Montre. Symbole d'excellence, Chronomètre认证 et perfection technique.",
    img: "imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg"
  },
  {
    name: "IWC Schaffhausen",
    year: "1868",
    desc: "L'horlogerie technique par excellence. Parfaite alliance entre tradition et innovation.",
    img: "imgs/IWC_Schaffhausen_Headquarters_Historic_Building_Switzerland.jpg"
  },
  {
    name: "Blancpain",
    year: "1735",
    desc: "La plus ancienne manufacture horlogère au monde. Inventrice de la première plongeuse moderne.",
    img: "imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg"
  }
];

const premiumBrands = [
  {
    name: "Bulgari",
    specialty: "Horlogerie Romaine",
    desc: "Symbole du luxe méditerranéen, Bulgari allie la richesse de l'artisanat italien à l'excellence horlogère suisse.",
    img: "imgs/Biel-Bienne-Switzerland-Cite-du-Temps-Omega-Swatch-Headquarters.jpg"
  },
  {
    name: "Richard Mille",
    specialty: "Innovation Technique",
    desc: "Pionnier de l'horlogerie technique moderne, Richard Mille révolutionne l'usage des matériaux high-tech.",
    img: "imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
  },
  {
    name: "Ulysse Nardin",
    specialty: "Marine & Astronomie",
    desc: "Spécialiste de l'horlogerie marine et de l'astronomie, Ulysse Nardin excelle dans les complications astronomiques.",
    img: "imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
  }
];

const mechanisms = [
  {
    name: "Tourbillon",
    desc: "Mécanisme compensant les effets gravitationnels, offrir une précision absolue en position verticale.",
    img: "imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    complexity: "Extrême"
  },
  {
    name: "Tourbillon Carrousel",
    desc: "Évolution du tourbillon traditionnel, variation cyclique de la cage pour une précision optimisée.",
    img: "imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg",
    complexity: "Extrême"
  },
  {
    name: "Grand Complication",
    desc: "Horlogerie la plus complexe au monde, combinant tourbillon, quantième perpétuel, chronographe et répétition minutes.",
    img: "imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg",
    complexity: "Légendaire"
  },
  {
    name: "Mouvement Rotor",
    desc: "Mécanisme de remontage automatique utilisant l'énergie du mouvement du porteur pour remonter la montre.",
    img: "imgs/patek-philippe-swiss-luxury-watch-movement-gears-close-up.jpeg",
    complexity: "Avancé"
  },
  {
    name: "Complication Chronographe",
    desc: "Mécanisme de mesure du temps écoulé, particulièrement précis pour la chronométrage sportif et professionnel.",
    img: "imgs/luxury_swiss_watch_tourbillon_complication_macro_mechanism.jpg",
    complexity: "Avancé"
  },
  {
    name: "Calendrier Perpétuel",
    desc: "Mécanisme complexe se réglage automatiquement en tenant compte des années bissextiles et des mois de longueur variable.",
    img: "imgs/luxury_swiss_watch_tourbillon_mechanism_render_macro_photograph.jpg",
    complexity: "Extrême"
  }
];

const heritageWatches = [
  {
    name: "Patek Philippe Henry Graves Supercomplication",
    year: "1933",
    desc: "La montre la plus compliquée jamais fabriqué à la main, demeurant inégalée pendant 56 ans.",
    img: "imgs/vintage_gold_pocket_watch_historical_timepiece_wooden_table.jpg",
    value: "Patrimoine Mondial"
  },
  {
    name: "Rolex 6062 'Yellow houses'",
    year: "1950",
    desc: "Les Rolex les plus rares au monde, avec seulement 3 exemplaires connus, véritable mythe horloger.",
    img: "imgs/vintage_swiss_heritage_pocket_watch_gold_chain.jpg",
    value: "Légende Vivante"
  },
  {
    name: "Patek Philippe Ref. 130",
    year: "1930s",
    desc: "La première montre-bracelet chronographe à paire de poussoirs, icône de l'horlogerie vintage.",
    img: "imgs/vintage_swiss_hirt_chronometer_gold_pocket_watch_historical.jpg",
    value: "Monument Historique"
  },
  {
    name: "A. Lange & Söhne La Lange 1 Tourbillon",
    year: "1994",
    desc: "Renaissance de l'horlogerie allemande de luxe, premier modèle de la nouvelle era Lange.",
    img: "imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg",
    value: "Renaissance Moderne"
  },
  {
    name: "Breguet Marie-Antoinette",
    year: "1783",
    desc: "La montre la plus légende, 40 ans de construction pour la Reine de France, jamais terminée.",
    img: "imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    value: "Mythe Absolu"
  },
  {
    name: "Patek Philippe Henry Graves",
    year: "1928",
    desc: "Simple mais élégant, cette référence a définit les standards de l'horlogerie de luxe moderne.",
    img: "imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg",
    value: "Standard d'Excellence"
  }
];

const innovations = [
  {
    title: "Première Plongeuse",
    brand: "Blancpain",
    year: "1953",
    desc: "La Fifty Fathoms, première plongeuse moderne, établit tous les standards de l'horlogerie submarine.",
    img: "imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg",
    impact: "Révolutionnaire"
  },
  {
    title: "Premier Quartz Suisse",
    brand: "Beta 21",
    year: "1969",
    desc: "Premier mouvement quartz helvétique, révolutionnant la précision et l'efficacité énergétique.",
    img: "imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg",
    impact: "Disruptif"
  },
  {
    title: "Tourbillon Portable",
    brand: "Breguet",
    year: "1801",
    desc: "Invention du tourbillon, compensation des effets gravitationnels sur la précision horlogère.",
    img: "imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg",
    impact: "Fondateur"
  },
  {
    title: "Silicium dans l'horlogerie",
    brand: "Patek Philippe",
    year: "2005",
    desc: "Introduction du silicium dans les mouvements, amélioration drastique de la précision et de la durabilité.",
    img: "imgs/Patek_Philippe_luxury_Swiss_watch_elegant_design_product_photography.jpg",
    impact: "Innovant"
  },
  {
    title: "Première Montre-Bracelet",
    brand: "Patek Philippe",
    year: "1868",
    desc: "Premier prototype de montre-bracelet féminin, révolution de la porter du temps sur le poignet.",
    img: "imgs/vintage_gold_pocket_watch_historical_timepiece_wooden_table.jpg",
    impact: "Transformant"
  },
  {
    title: "Mécanisme Diaphane",
    brand: "Audemars Piguet",
    year: "2000",
    desc: "Innovation dans l'affichage des complications, transparence et esthétique révolutionnaire.",
    img: "imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg",
    impact: "Artistique"
  }
];

const territories = [
  {
    region: "Vallée de Joux",
    coords: "46.6° N, 6.2° E",
    altitude: "1000m",
    desc: "Écrin de l'horlogerie d'exception, la Vallée de Joux allie l'excellence technique à la beauté naturelle des montagnes jurassiennes.",
    image: "imgs/vallee_de_joux_swiss_jura_lakes_landscape.jpg",
    expertise: "Tourbillons, Complications"
  },
  {
    region: "Neuchâtel",
    coords: "47.0° N, 6.9° E",
    altitude: "487m",
    desc: "Région des complicationes et de l'innovation technique, berceau de l'horlogerie submarine et de l'aviation.",
    image: "imgs/neuchatel-switzerland-city-lake-view-historic-watchmaking-region.jpg",
    expertise: "Chronographes, Plongée"
  },
  {
    region: "Genève",
    coords: "46.2° N, 6.1° E",
    altitude: "375m",
    desc: "Palais de la haute horlogerie, siège des plus grandes manufactures et de l'art de vivre helvétique.",
    image: "imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg",
    expertise: "Haute Horlogerie"
  },
  {
    region: "La Chaux-de-Fonds",
    coords: "47.1° N, 6.8° E",
    altitude: "991m",
    desc: "Première ville horlogère du monde, classée UNESCO, symbole de l'industrialisation horlogère.",
    image: "imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg",
    expertise: "Production de masse"
  }
];

const collections = [
  {
    name: "Patek Philippe Grand Complication",
    price: "À partir de 250 000 CHF",
    desc: "Collection prestige représentant l'apogée de l'horlogerie helvétique, mécanismes les plus complexes jamais conçus.",
    img: "imgs/patek_philippe_grand_complications_rose_gold.jpg",
    uniqueness: "Uniques au monde"
  },
  {
    name: "Patek Philippe Diamond Jewelry",
    price: "À partir de 500 000 CHF",
    desc: "Horlogerie-bijouterie d'exception, alliance parfaite entre haute horlogerie et joaillerie helvétique.",
    img: "imgs/patek_philippe_diamond_jewelry_luxury.jpg",
    uniqueness: "Art Джоаиллерier"
  },
  {
    name: "Vacheron Constantin Tourbillon",
    price: "À partir de 200 000 CHF",
    desc: "Mécanismes d'exception créés par les meilleurs artisans, tourbillons à ouvrant automatique.",
    img: "imgs/vacheron_constantin_tourbillon_extraordinary.jpg",
    uniqueness: "Art horloger pur"
  },
  {
    name: "Audemars Piguet Royal Oak Skeleton",
    price: "À partir de 150 000 CHF",
    desc: "Design iconique limité, art technique et esthétique fusionnés dans l'excellence absolue.",
    img: "imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg",
    uniqueness: "Design iconique"
  },
  {
    name: "Richard Mille Carbon Ultra Light",
    price: "À partir de 800 000 CHF",
    desc: "Innovation matériaux extreme, carbone et titane dans l'horlogerie la plus technique au monde.",
    img: "imgs/richard_mille_carbon_ultra_light.jpg",
    uniqueness: "Innovation extrême"
  },
  {
    name: "Patek Philippe Enamel Art",
    price: "À partir de 180 000 CHF",
    desc: "Céramique émaillée d'exception, artworks miniature créés par les derniers maîtres émailleurs au monde.",
    img: "imgs/patek_philippe_enamel_art_dial.jpg",
    uniqueness: "Art majeur"
  }
];

// ================================
// COMPOSANT PRINCIPAL
// ================================

export default function HistoireHorlogerieSuisse() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{styles}</style>
      
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>L'Histoire de l'Horlogerie Suisse</h1>
            <p>Un voyage à travers 500 ans d'excellence, d'innovation et de passion pour la perfection absolue. Découvrez les secrets des manufactures légendaires qui ont façonné l'art du temps.</p>
            
            <div className="stats">
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Années d'expertise</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Manufactures prestigieuses</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Régions horlogères</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Passion inaltérable</div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section" id="timeline">
          <h2>Chronologie de l'Excellence</h2>
          <div className="timeline">
            {timelineData.map((item, index) => (
              <div key={index} className={`timeline-item fade-in ${visibleElements.has(`timeline-${index}`) ? 'visible' : ''}`} id={`timeline-${index}`}>
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Regions Section */}
        <section className="section" id="regions">
          <h2>Les Territoires de l'Horlogerie</h2>
          <div className="cards-grid">
            {regions.map((region, index) => (
              <div key={index} className={`card fade-in ${visibleElements.has(`region-${index}`) ? 'visible' : ''}`} id={`region-${index}`}>
                <img src={region.img} alt={region.name} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{region.name}</h3>
                  <p>{region.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manufactures Section */}
        <section className="section" id="manufactures">
          <h2>Les Manufactures Légendaires</h2>
          {manufactures.map((manufacture, index) => (
            <div key={index} className={`manufacture fade-in ${visibleElements.has(`manufacture-${index}`) ? 'visible' : ''}`} id={`manufacture-${index}`}>
              <img src={manufacture.img} alt={manufacture.name} loading="lazy" />
              <div className="manufacture-content">
                <h3>{manufacture.name} <span className="gold-text">({manufacture.year})</span></h3>
                <p>{manufacture.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Premium Brands Section */}
        <section className="section" id="premium">
          <h2>Marques Premium d'Exception</h2>
          <div className="cards-grid">
            {premiumBrands.map((brand, index) => (
              <div key={index} className={`card premium-shadow fade-in ${visibleElements.has(`premium-${index}`) ? 'visible' : ''}`} id={`premium-${index}`}>
                <img src={brand.img} alt={brand.name} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{brand.name}</h3>
                  <h4 className="gold-text">{brand.specialty}</h4>
                  <p>{brand.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mechanisms Section */}
        <section className="section" id="mechanisms">
          <h2>Mécanismes d'Exception</h2>
          <div className="cards-grid">
            {mechanisms.map((mechanism, index) => (
              <div key={index} className={`card fade-in ${visibleElements.has(`mechanism-${index}`) ? 'visible' : ''}`} id={`mechanism-${index}`}>
                <img src={mechanism.img} alt={mechanism.name} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{mechanism.name}</h3>
                  <h4 className="gold-text">Complexité: {mechanism.complexity}</h4>
                  <p>{mechanism.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Heritage Watches Section */}
        <section className="section" id="heritage">
          <h2>Montres Héritage</h2>
          <div className="cards-grid">
            {heritageWatches.map((watch, index) => (
              <div key={index} className={`card luxury-border fade-in ${visibleElements.has(`heritage-${index}`) ? 'visible' : ''}`} id={`heritage-${index}`}>
                <img src={watch.img} alt={watch.name} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{watch.name}</h3>
                  <h4 className="gold-text">{watch.year} - {watch.value}</h4>
                  <p>{watch.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Innovations Section */}
        <section className="section" id="innovations">
          <h2>Innovations Révolutionnaires</h2>
          <div className="cards-grid">
            {innovations.map((innovation, index) => (
              <div key={index} className={`card fade-in ${visibleElements.has(`innovation-${index}`) ? 'visible' : ''}`} id={`innovation-${index}`}>
                <img src={innovation.img} alt={innovation.title} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{innovation.title}</h3>
                  <h4 className="gold-text">{innovation.brand} - {innovation.year}</h4>
                  <p>{innovation.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Territories Section */}
        <section className="section" id="territories">
          <h2>Territoires & Ateliers</h2>
          {territories.map((territory, index) => (
            <div key={index} className={`manufacture fade-in ${visibleElements.has(`territory-${index}`) ? 'visible' : ''}`} id={`territory-${index}`}>
              <img src={territory.image} alt={territory.region} loading="lazy" />
              <div className="manufacture-content">
                <h3>{territory.region}</h3>
                <h4 className="gold-text">{territory.coords} - {territory.altitude}</h4>
                <p>{territory.desc}</p>
                <p><strong>Spécialité:</strong> {territory.expertise}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Collections Section */}
        <section className="section" id="collections">
          <h2>Collections d'Exception</h2>
          <div className="cards-grid">
            {collections.map((collection, index) => (
              <div key={index} className={`card premium-shadow fade-in ${visibleElements.has(`collection-${index}`) ? 'visible' : ''}`} id={`collection-${index}`}>
                <img src={collection.img} alt={collection.name} className="card-image" loading="lazy" />
                <div className="card-content">
                  <h3>{collection.name}</h3>
                  <h4 className="gold-text">{collection.price}</h4>
                  <h4 className="gold-text">{collection.uniqueness}</h4>
                  <p>{collection.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Features */}
        <section className="section" id="premium-features">
          <h2>Caractéristiques Premium</h2>
          <div className="premium-features">
            <div className="premium-feature">
              <h4>🏆 Précision Absolue</h4>
              <p>Chronomètres certifiés COSC, précision au 6e de seconde par jour</p>
            </div>
            <div className="premium-feature">
              <h4>💎 Matériaux Nobles</h4>
              <p>Or 18 carats, platine, titane grade 5, céramique haute technologie</p>
            </div>
            <div className="premium-feature">
              <h4>⚙️ Mécanismes Manuels</h4>
              <p>Assemblés à la main par des maîtres horlogers, héritage artisanal</p>
            </div>
            <div className="premium-feature">
              <h4>🎨 Personnalisation</h4>
              <p>Gravures personnalisées, cadrans sur mesure, bracelets exclusifs</p>
            </div>
          </div>
        </section>

        {/* Ultra-Premium Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div>
                <h3>🏛️ Horlogerie Suisse</h3>
                <p>500 ans d'excellence, d'innovation et de passion pour la perfection absolue. Chaque montre suisse raconte une histoire unique, façonnée par l'artisanat d'exception.</p>
              </div>
              <div>
                <h3>🎯 Valeurs Fondamentales</h3>
                <ul>
                  <li>🔬 Précision technique</li>
                  <li>💎 Excellence des matériaux</li>
                  <li>🎨 Innovation créative</li>
                  <li>🏆 Héritage artisanal</li>
                </ul>
              </div>
              <div>
                <h3>🏢 Manufactures d'Exception</h3>
                <ul>
                  <li><a href="#">Patek Philippe</a></li>
                  <li><a href="#">Audemars Piguet</a></li>
                  <li><a href="#">Vacheron Constantin</a></li>
                  <li><a href="#">Jaeger-LeCoultre</a></li>
                  <li><a href="#">IWC Schaffhausen</a></li>
                  <li><a href="#">Blancpain</a></li>
                </ul>
              </div>
              <div>
                <h3>🌍 Expertise Mondiale</h3>
                <p>Réputée dans le monde entier pour son savoir-faire unique, l'horlogerie suisse symbolise l'excellence helvétique et l'art de vivre à la française.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Changer de thème" />

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'var(--gradient-premium)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '1.2rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 20px var(--shadow-medium)',
          zIndex: 1000
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        aria-label="Retour en haut"
      >
       
    </>
  );
}
