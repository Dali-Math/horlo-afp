'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Landmark, PlayCircle, Sun, Moon, ChevronRight, Calendar, MapPin, Play } from 'lucide-react';

// Données pour la timeline
const timelineData = [
  { year: '1510', title: 'Première montre portable', icon: '⌚', description: 'Peter Henlein de Nuremberg crée les premières montres portables, appelées "Nuremberg Eggs".' },
  { year: '1675', title: 'Spiral réglant', icon: '🔁', description: 'Christiaan Huygens invente le spiral réglant, améliorant considérablement la précision des montres.' },
  { year: '1755', title: 'Échappement à ancre', icon: '⚙️', description: 'Thomas Mudge invente l\'échappement à ancre, qui devient le standard pour les montres mécaniques.' },
  { year: '1839', title: 'Fondation de Patek Philippe', icon: '👑', description: 'Antoni Patek et Adrien Philippe fondent Patek Philippe & Co., qui deviendra l\'une des manufactures les plus prestigieuses.' },
  { year: '1868', title: 'Première montre-bracelet', icon: '💎', description: 'Patek Philippe crée la première montre-bracelet pour la comtesse hongroise Koscowicz.' },
  { year: '1905', title: 'Naissance de Rolex', icon: '🏆', description: 'Hans Wilsdorf fonde Rolex à Londres, qui deviendra synonyme de précision et de robustesse.' },
  { year: '1969', title: 'Révolution du quartz', icon: '⚡', description: 'Seiko introduit la première montre à quartz de production, marquant un tournant dans l\'industrie horlogère.' }
];

// Données pour les musées
const museesData = [
  { 
    name: 'Musée International d\'Horlogerie', 
    location: 'La Chaux-de-Fonds',
    description: 'Le plus grand musée d\'horlogerie au monde, classé au patrimoine mondial de l\'UNESCO.',
    image: 'https://picsum.photos/seed/mih-museum/400/300.jpg'
  },
  { 
    name: 'Musée Patek Philippe', 
    location: 'Genève',
    description: 'Une collection exceptionnelle de montres de luxe, d\'automates et d\'objets d\'art.',
    image: 'https://picsum.photos/seed/patek-museum/400/300.jpg'
  },
  { 
    name: 'Musée d\'Horlogerie du Locle', 
    location: 'Le Locle',
    description: 'Présente l\'évolution de l\'horlogerie depuis ses origines jusqu\'à nos jours.',
    image: 'https://picsum.photos/seed/locle-museum/400/300.jpg'
  },
  { 
    name: 'Audemars Piguet Museum', 
    location: 'Le Brassus',
    description: 'Situé dans la manufacture historique, ce musée retrace 140 ans d\'innovation.',
    image: 'https://picsum.photos/seed/ap-museum/400/300.jpg'
  }
];

// Données pour les vidéos
const videosData = [
  { 
    title: 'Les Maîtres du Temps — RTS', 
    thumbnail: 'https://picsum.photos/seed/maitres-temps/400/225.jpg',
    duration: '52:30',
    description: 'Un documentaire captivant sur les artisans qui perpétuent les traditions horlogères suisses.'
  },
  { 
    title: 'L\'Art du Réglage — Fondation de la Haute Horlogerie', 
    thumbnail: 'https://picsum.photos/seed/art-reglage/400/225.jpg',
    duration: '18:45',
    description: 'Découvrez les secrets du réglage de précision des mouvements mécaniques complexes.'
  },
  { 
    title: 'Secrets de fabrication — Vacheron Constantin', 
    thumbnail: 'https://picsum.photos/seed/vc-secrets/400/225.jpg',
    duration: '35:12',
    description: 'Plongez au cœur de la plus ancienne manufacture horlogère en activité continue.'
  }
];

export default function CultureHorlogerie() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeSection, setActiveSection] = useState('timeline');
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(0);

  useEffect(() => {
    // Vérifier la préférence du système
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className={`culture-horlogerie ${theme}`}>
      {/* En-tête avec navigation */}
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Culture horlogère</h1>
            <p>Un voyage à travers l'histoire et l'art du temps.</p>
          </div>
          
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </div>
        
        <nav className="nav-categories">
          <button 
            className={`nav-btn ${activeSection === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveSection('timeline')}
          >
            <Timeline size={18} /> Lignes du temps
          </button>
          <button 
            className={`nav-btn ${activeSection === 'histoire' ? 'active' : ''}`}
            onClick={() => setActiveSection('histoire')}
          >
            <Clock size={18} /> Histoire
          </button>
          <button 
            className={`nav-btn ${activeSection === 'musees' ? 'active' : ''}`}
            onClick={() => setActiveSection('musees')}
          >
            <Museum size={18} /> Musées
          </button>
          <button 
            className={`nav-btn ${activeSection === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveSection('videos')}
          >
            <PlayCircle size={18} /> Vidéos
          </button>
        </nav>
      </header>

      {/* Section Timeline */}
      {activeSection === 'timeline' && (
        <motion.section 
          className="timeline-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Lignes du temps de l'horlogerie</h2>
          <div className="timeline-container">
            <div className="timeline-track">
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`timeline-item ${index === selectedTimelineItem ? 'active' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedTimelineItem(index)}
                >
                  <div className="timeline-icon">{item.icon}</div>
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-title">{item.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="timeline-detail"
            key={selectedTimelineItem}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="timeline-detail-header">
              <div className="timeline-detail-icon">{timelineData[selectedTimelineItem].icon}</div>
              <div>
                <h3>{timelineData[selectedTimelineItem].year}</h3>
                <h4>{timelineData[selectedTimelineItem].title}</h4>
              </div>
            </div>
            <p>{timelineData[selectedTimelineItem].description}</p>
          </motion.div>
        </motion.section>
      )}

      {/* Section Histoire */}
      {activeSection === 'histoire' && (
        <motion.section 
          className="histoire-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Histoire de l'horlogerie</h2>
          <div className="histoire-content">
            <div className="histoire-text">
              <p>L'horlogerie suisse est née au XVIe siècle avec l'arrivée des huguenots français fuyant les persécutions religieuses. Ils apportèrent avec eux leur savoir-faire en horlogerie, qui s'est développé dans les vallées isolées du Jura.</p>
              <p>Au XVIIIe siècle, l'horlogerie suisse s'est spécialisée dans la production de montres de haute qualité, établissant des normes d'excellence qui perdurent aujourd'hui.</p>
              <p>Le XIXe siècle a vu l'émergence de grandes manufactures comme Patek Philippe (1839), Vacheron Constantin (1755) et Audemars Piguet (1875), qui ont défini les standards de l'horlogerie de luxe.</p>
              <p>Au XXe siècle, l'industrie horlogère suisse a fait face à la "crise du quartz" dans les années 1970, mais a su se réinventer en se concentrant sur l'excellence mécanique et le luxe, créant des montres complexes et des complications horlogères.</p>
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
        </motion.section>
      )}

      {/* Section Musées */}
      {activeSection === 'musees' && (
        <motion.section 
          className="musees-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Musées de l'horlogerie</h2>
          <div className="musees-grid">
            {museesData.map((musee, index) => (
              <motion.div
                key={index}
                className="musee-card"
                whileHover={{ y: -5 }}
              >
                <div className="musee-image">
                  <img src={musee.image} alt={musee.name} />
                </div>
                <div className="musee-content">
                  <Museum className="musee-icon" />
                  <h3>{musee.name}</h3>
                  <div className="musee-location">
                    <MapPin size={14} />
                    <span>{musee.location}</span>
                  </div>
                  <p>{musee.description}</p>
                  <a href="#" className="musee-link">
                    Découvrir <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Section Vidéos */}
      {activeSection === 'videos' && (
        <motion.section 
          className="videos-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Documentaires et vidéos</h2>
          <div className="videos-grid">
            {videosData.map((video, index) => (
              <motion.div
                key={index}
                className="video-card"
                whileHover={{ y: -5 }}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <Play className="play-icon" />
                    <span className="video-duration">{video.duration}</span>
                  </div>
                </div>
                <div className="video-content">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a href="#" className="video-link">
                    Regarder <ChevronRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Pied de page */}
      <footer className="footer">
        <p>"L'horlogerie est l'art de comprendre le temps avant de le mesurer."</p>
      </footer>

      <style jsx>{`
        .culture-horlogerie {
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
        }

        .culture-horlogerie.dark {
          background-color: #0a0a0a;
          color: #f3f4f6;
        }

        .culture-horlogerie.light {
          background-color: #ffffff;
          color: #1f2937;
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
          color: inherit;
        }

        .header p {
          font-size: 20px;
          margin-top: 10px;
          color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }

        .theme-toggle {
          cursor: pointer;
          padding: 10px;
          border-radius: 50%;
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
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
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
          color: inherit;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .nav-btn.active {
          background-color: ${theme === 'dark' ? '#facc15' : '#38bdf8'};
          color: ${theme === 'dark' ? '#0a0a0a' : '#ffffff'};
        }

        section {
          padding: 40px 70px;
        }

        section h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40px;
          margin-bottom: 30px;
          color: inherit;
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
          background-color: ${theme === 'dark' ? '#121212' : '#f9fafb'};
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .timeline-item:hover {
          background-color: ${theme === 'dark' ? '#1a1a1a' : '#f3f4f6'};
        }

        .timeline-item.active {
          background-color: ${theme === 'dark' ? '#facc15' : '#38bdf8'};
          color: ${theme === 'dark' ? '#0a0a0a' : '#ffffff'};
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
          background-color: ${theme === 'dark' ? '#121212' : '#f9fafb'};
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
          border-left: 3px solid ${theme === 'dark' ? '#facc15' : '#38bdf8'};
          background-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
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
          background-color: ${theme === 'dark' ? '#121212' : '#f9fafb'};
          transition: all 0.3s ease;
        }

        .musee-image {
          height: 200px;
          overflow: hidden;
        }

        .musee-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .musee-card:hover .musee-image img {
          transform: scale(1.05);
        }

        .musee-content {
          padding: 25px;
        }

        .musee-icon {
          font-size: 30px;
          margin-bottom: 15px;
          color: ${theme === 'dark' ? '#facc15' : '#38bdf8'};
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
          color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }

        .musee-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 15px;
          color: ${theme === 'dark' ? '#facc15' : '#38bdf8'};
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
          background-color: ${theme === 'dark' ? '#121212' : '#f9fafb'};
          transition: all 0.3s ease;
        }

        .video-thumbnail {
          position: relative;
          height: 180px;
          overflow: hidden;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .video-card:hover .video-thumbnail img {
          transform: scale(1.05);
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
          color: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
        }

        .video-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: ${theme === 'dark' ? '#facc15' : '#38bdf8'};
          text-decoration: none;
          font-weight: 500;
        }

        .footer {
          padding: 40px 70px;
          text-align: center;
          font-style: italic;
          background: linear-gradient(${theme === 'dark' ? 'from-[#0a0a0a] to-[#1a1a1a]' : 'from-[#f9fafb] to-[#e5e7eb]'});
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
