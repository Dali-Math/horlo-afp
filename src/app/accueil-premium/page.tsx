'use client';

import { useState, useEffect } from 'react';

// Données pour la timeline
const timelineData = [
  { year: '1510', title: 'Première montre portable', icon: '⌚', description: 'Peter Henlein de Nuremberg crée les premières montres portables.' },
  { year: '1675', title: 'Spiral réglant', icon: '🔁', description: 'Christiaan Huygens invente le spiral réglant.' },
  { year: '1755', title: 'Échappement à ancre', icon: '⚙️', description: 'Thomas Mudge invente l\'échappement à ancre.' },
  { year: '1839', title: 'Fondation de Patek Philippe', icon: '👑', description: 'Antoni Patek et Adrien Philippe fondent Patek Philippe & Co.' },
  { year: '1868', title: 'Première montre-bracelet', icon: '💎', description: 'Patek Philippe crée la première montre-bracelet.' },
  { year: '1905', title: 'Naissance de Rolex', icon: '🏆', description: 'Hans Wilsdorf fonde Rolex à Londres.' },
  { year: '1969', title: 'Révolution du quartz', icon: '⚡', description: 'Seiko introduit la première montre à quartz.' }
];

// Données pour les musées
const museesData = [
  { 
    name: 'Musée International d\'Horlogerie', 
    location: 'La Chaux-de-Fonds',
    description: 'Le plus grand musée d\'horlogerie au monde.'
  },
  { 
    name: 'Musée Patek Philippe', 
    location: 'Genève',
    description: 'Collection exceptionnelle de montres de luxe.'
  },
  { 
    name: 'Musée d\'Horlogerie du Locle', 
    location: 'Le Locle',
    description: 'Présente l\'évolution de l\'horlogerie.'
  },
  { 
    name: 'Audemars Piguet Museum', 
    location: 'Le Brassus',
    description: 'Retrace 140 ans d\'innovation horlogère.'
  }
];

// Données pour les vidéos
const videosData = [
  { 
    title: 'Les Maîtres du Temps — RTS', 
    duration: '52:30',
    description: 'Documentaire sur les artisans horlogers suisses.'
  },
  { 
    title: 'L\'Art du Réglage — FHH', 
    duration: '18:45',
    description: 'Secrets du réglage des mouvements mécaniques.'
  },
  { 
    title: 'Secrets de fabrication — Vacheron Constantin', 
    duration: '35:12',
    description: 'Au cœur de la plus ancienne manufacture.'
  }
];

export default function CultureHorlogerie() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('timeline');
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Vérifier la préférence du système
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      const initialTheme = (savedTheme as 'dark' | 'light') || systemTheme;
      
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  // Éviter les erreurs d'hydratation
  if (!mounted) return null;

  return (
    <div className={`culture-horlogerie ${theme}`}>
      {/* En-tête avec navigation */}
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Culture horlogère</h1>
            <p>Un voyage à travers l'histoire et l'art du temps.</p>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <nav className="nav-categories">
          <button 
            className={`nav-btn ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSection('timeline')}
          >
            ⏳ Lignes du temps
          </button>
          <button 
            className={`nav-btn ${activeSection === 'histoire' ? 'active' : ''}`}
            onClick={() => setActiveSection('histoire')}
          >
            🕰️ Histoire
          </button>
          <button 
            className={`nav-btn ${activeSection === 'musees' ? 'active' : ''}`}
            onClick={() => setActiveSection('musees')}
          >
            🏛️ Musées
          </button>
          <button 
            className={`nav-btn ${activeSection === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveSection('videos')}
          >
            🎥 Vidéos
          </button>
        </nav>
      </header>

      {/* Section Timeline */}
      {activeSection === 'timeline' && (
        <section className="timeline-section">
          <h2>Lignes du temps de l'horlogerie</h2>
          <div className="timeline-container">
            <div className="timeline-track">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item ${index === selectedTimelineItem ? 'active' : ''}`}
                  onClick={() => setSelectedTimelineItem(index)}
                >
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="timeline-detail">
            <div className="timeline-detail-header">
              <div className="timeline-detail-icon">{timelineData[selectedTimelineItem].icon}</div>
              <div>
                <h3>{timelineData[selectedTimelineItem].year}</h3>
                <h4>{timelineData[selectedTimelineItem].title}</h4>
              </div>
            </div>
            <p>{timelineData[selectedTimelineItem].description}</p>
          </div>
        </section>
      )}

      {/* Section Histoire */}
      {activeSection === 'histoire' && (
        <section className="histoire-section">
          <h2>Histoire de l'horlogerie</h2>
          <div className="histoire-content">
            <div className="histoire-text">
              <p>L'horlogerie suisse est née au XVIe siècle avec l'arrivée des huguenots français fuyant les persécutions religieuses. Ils apportèrent avec eux leur savoir-faire en horlogerie.</p>
              <p>Au XVIIIe siècle, l'horlogerie suisse s'est spécialisée dans la production de montres de haute qualité, établissant des normes d'excellence.</p>
              <p>Le XIXe siècle a vu l'émergence de grandes manufactures comme Patek Philippe (1839), Vacheron Constantin (1755) et Audemars Piguet (1875).</p>
              <p>Au XXe siècle, l'industrie horlogère suisse a fait face à la "crise du quartz" mais a su se réinventer en se concentrant sur l'excellence mécanique.</p>
            </div>
            <div className="histoire-highlights">
              <h3>Repères historiques</h3>
              {timelineData.slice(0, 4).map((item, index) => (
                <div key={index} className="highlight-item">
                  <div className="highlight-year">{item.year}</div>
                  <div className="highlight-title">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section Musées */}
      {activeSection === 'musees' && (
        <section className="musees-section">
          <h2>Musées de l'horlogerie</h2>
          <div className="musees-grid">
            {museesData.map((musee, index) => (
              <div key={index} className="musee-card">
                <div className="musee-image">
                  <div className="placeholder-image" style={{backgroundImage: `url(https://picsum.photos/seed/musee-${index}/400/300.jpg)`}}></div>
                </div>
                <div className="musee-content">
                  <div className="musee-icon">🏛️</div>
                  <h3>{musee.name}</h3>
                  <div className="musee-location">
                    📍 {musee.location}
                  </div>
                  <p>{musee.description}</p>
                  <a href="#" className="musee-link">
                    Découvrir →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section Vidéos */}
      {activeSection === 'videos' && (
        <section className="videos-section">
          <h2>Documentaires et vidéos</h2>
          <div className="videos-grid">
            {videosData.map((video, index) => (
              <div key={index} className="video-card">
                <div className="video-thumbnail">
                  <div className="placeholder-image" style={{backgroundImage: `url(https://picsum.photos/seed/video-${index}/400/225.jpg)`}}></div>
                  <div className="video-overlay">
                    <div className="play-icon">▶️</div>
                    <span className="video-duration">{video.duration}</span>
                  </div>
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a href="#" className="video-link">
                    Regarder →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pied de page */}
      <footer className="footer">
        <p>"L'horlogerie est l'art de comprendre le temps avant de le mesurer."</p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Bebas+Neue&display=swap');
        
        :root {
          --bg-color: #0a0a0a;
          --text-color: #f3f4f6;
          --secondary-text-color: #9ca3af;
          --card-bg-color: #121212;
          --accent-color: #facc15;
          --border-color: rgba(255, 255, 255, 0.1);
        }
        
        [data-theme="light"] {
          --bg-color: #ffffff;
          --text-color: #1f2937;
          --secondary-text-color: #6b7280;
          --card-bg-color: #f9fafb;
          --accent-color: #38bdf8;
          --border-color: rgba(0, 0, 0, 0.05);
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: var(--bg-color);
          color: var(--text-color);
          transition: background-color 0.3s ease, color 0.3s ease;
        }
      `}</style>
      
      <style jsx>{`
        .culture-horlogerie {
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .header {
          padding: 60px 70px 30px;
          position: relative;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 40px;
        }

        .header h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 60px;
          margin: 0;
          color: var(--text-color);
        }

        .header p {
          font-size: 20px;
          margin-top: 10px;
          color: var(--secondary-text-color);
        }

        .theme-toggle {
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          background-color: var(--border-color);
          border: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .theme-toggle:hover {
          background-color: var(--accent-color);
        }

        .nav-categories {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .nav-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          background-color: var(--border-color);
          color: var(--text-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background-color: var(--accent-color);
          color: var(--bg-color);
        }

        .nav-btn.active {
          background-color: var(--accent-color);
          color: var(--bg-color);
        }

        section {
          padding: 40px 70px;
        }

        section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          margin-bottom: 30px;
          color: var(--text-color);
        }

        .timeline-container {
          margin-bottom: 40px;
        }

        .timeline-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 20px;
        }

        .timeline-item {
          min-width: 200px;
          padding: 20px;
          border-radius: 12px;
          background-color: var(--card-bg-color);
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .timeline-item:hover {
          transform: translateY(-5px);
        }

        .timeline-item.active {
          background-color: var(--accent-color);
          color: var(--bg-color);
        }

        .timeline-icon {
          font-size: 30px;
          margin-bottom: 10px;
        }

        .timeline-year {
          font-weight: bold;
          margin-bottom: 5px;
        }

        .timeline-detail {
          padding: 30px;
          border-radius: 12px;
          background-color: var(--card-bg-color);
        }

        .timeline-detail-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }

        .timeline-detail-icon {
          font-size: 40px;
        }

        .timeline-detail h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          margin: 0;
        }

        .timeline-detail h4 {
          font-size: 20px;
          margin: 5px 0 0;
        }

        .timeline-detail p {
          font-size: 18px;
          line-height: 1.6;
        }

        .histoire-content {
          display: flex;
          gap: 40px;
        }

        .histoire-text {
          flex: 2;
        }

        .histoire-text p {
          margin-bottom: 20px;
          line-height: 1.6;
          font-size: 18px;
        }

        .histoire-highlights {
          flex: 1;
        }

        .histoire-highlights h3 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .highlight-item {
          padding: 15px;
          margin-bottom: 15px;
          border-left: 3px solid var(--accent-color);
          background-color: var(--border-color);
        }

        .highlight-year {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 18px;
        }

        .highlight-title {
          font-size: 16px;
        }

        .musees-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 30px;
        }

        .musee-card {
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--card-bg-color);
          transition: all 0.3s ease;
        }

        .musee-image {
          height: 200px;
          overflow: hidden;
        }

        .placeholder-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.3s ease;
        }

        .musee-card:hover .placeholder-image {
          transform: scale(1.05);
        }

        .musee-content {
          padding: 25px;
        }

        .musee-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .musee-card h3 {
          margin-bottom: 10px;
          font-size: 22px;
        }

        .musee-location {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 15px;
          color: var(--secondary-text-color);
        }

        .musee-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 15px;
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
        }

        .videos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .video-card {
          border-radius: 12px;
          overflow: hidden;
          background-color: var(--card-bg-color);
          transition: all 0.3s ease;
        }

        .video-thumbnail {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .play-icon {
          font-size: 40px;
          color: white;
        }

        .video-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 14px;
        }

        .video-content {
          padding: 20px;
        }

        .video-card h3 {
          margin-bottom: 10px;
          font-size: 18px;
        }

        .video-content p {
          margin-bottom: 15px;
          font-size: 14px;
          color: var(--secondary-text-color);
        }

        .video-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: var(--accent-color);
          text-decoration: none;
          font-weight: 500;
        }

        .footer {
          padding: 40px 70px;
          text-align: center;
          font-style: italic;
          background: linear-gradient(var(--bg-color), var(--card-bg-color));
          font-size: 18px;
        }

        @media (max-width: 1024px) {
          .musees-grid {
            grid-template-columns: 1fr;
          }

          .videos-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 40px 20px 20px;
          }

          section {
            padding: 30px 20px;
          }

          .header h1 {
            font-size: 40px;
          }

          .musees-grid {
            grid-template-columns: 1fr;
          }

          .videos-grid {
            grid-template-columns: 1fr;
          }

          .histoire-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
