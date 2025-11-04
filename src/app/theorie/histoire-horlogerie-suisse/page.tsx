// page.tsx (ou histoire-horlogerie.tsx)
'use client';
import React, { useState, useEffect } from 'react';

// Styles intégrés - pas de dépendance externe
const styles = `
  .horlogerie-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .horlogerie-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 60px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 15px;
  }

  .horlogerie-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .horlogerie-subtitle {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin: 40px 0;
  }

  .stat-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    border: 1px solid #e1e5e9;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #667eea;
    display: block;
  }

  .stat-label {
    font-size: 1rem;
    color: #666;
    margin-top: 8px;
  }

  .section {
    margin: 60px 0;
  }

  .section-title {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 30px;
    color: #2c3e50;
    border-left: 4px solid #667eea;
    padding-left: 20px;
  }

  .timeline {
    position: relative;
    padding-left: 40px;
  }

  .timeline::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #667eea;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 40px;
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -28px;
    top: 30px;
    width: 12px;
    height: 12px;
    background: #667eea;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 2px #667eea;
  }

  .timeline-year {
    font-size: 1.8rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 10px;
  }

  .timeline-event {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.5;
  }

  .regions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
    margin-top: 30px;
  }

  .region-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
  }

  .region-card:hover {
    transform: translateY(-5px);
  }

  .region-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
  }

  .region-name {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .region-specialty {
    font-size: 1rem;
    opacity: 0.9;
  }

  .region-description {
    padding: 20px;
    color: #555;
    line-height: 1.6;
  }

  .manufactures-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .manufacture-card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-left: 4px solid #667eea;
  }

  .manufacture-name {
    font-size: 1.3rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 10px;
  }

  .manufacture-year {
    color: #667eea;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .manufacture-description {
    color: #666;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .horlogerie-container {
      padding: 15px;
    }

    .horlogerie-title {
      font-size: 2.2rem;
    }

    .stats-grid,
    .regions-grid,
    .manufactures-grid {
      grid-template-columns: 1fr;
    }

    .timeline {
      padding-left: 25px;
    }

    .timeline::before {
      left: 12px;
    }

    .timeline-item::before {
      left: -17px;
    }
  }
`;

// Données de contenu
const timelineData = [
  {
    year: "1541",
    event: "L'Interdiction de Calvin à Genève promeut l'artisanat horloger"
  },
  {
    year: "1601", 
    event: "Naissance de la Compagnie des Horlogers de Genève"
  },
  {
    year: "1750",
    event: "Développement de l'horlogerie dans la Vallée de Joux"
  },
  {
    year: "1839",
    event: "Fondation de Patek Philippe, début de l'ère moderne"
  },
  {
    year: "1905",
    event: "Hans Wilsdorf fonde Rolex et popularise la montre-bracelet"
  },
  {
    year: "1983",
    event: "La renaissance de l'horlogerie mécanique face au quartz"
  }
];

const regionsData = [
  {
    name: "Genève",
    specialty: "Haute horlogerie",
    description: "Berceau historique de l'horlogerie suisse, Genève accueille les plus grandes manufactures et le prestigieux Poinçon de Genève."
  },
  {
    name: "Vallée de Joux", 
    specialty: "Complications",
    description: "Région montagneuse réputée pour ses complications horlogères complexes, siège d'Audemars Piguet et Jaeger-LeCoultre."
  },
  {
    name: "Le Locle",
    specialty: "Innovation",
    description: "Ville UNESCO de l'horlogerie, berceau de Tissot, Ulysse Nardin et Zenith, centre d'innovation technologique."
  },
  {
    name: "Neuchâtel",
    specialty: "Précision",
    description: "Centre académique et industriel avec son observatoire astronomique, garant de la précision horlogère suisse."
  },
  {
    name: "Bienne",
    specialty: "Production",
    description: "Capitale moderne de l'horlogerie, siège de Rolex, Omega et du Swatch Group, leader de la production industrielle."
  },
  {
    name: "Schaffhausen",
    specialty: "Ingénierie", 
    description: "Siège d'IWC Schaffhausen, symbole de l'excellence germano-suisse dans l'horlogerie de précision."
  }
];

const manufacturesData = [
  {
    name: "Patek Philippe",
    year: "1839",
    description: "Synonyme de perfection horlogère, créateur des complications les plus complexes."
  },
  {
    name: "Rolex",
    year: "1905", 
    description: "Pionnier de la montre-bracelet robuste et élégante, symbole de réussite."
  },
  {
    name: "Audemars Piguet",
    year: "1875",
    description: "Créateur de la première montre-bracelet à répétition minutes en 1892."
  },
  {
    name: "Vacheron Constantin",
    year: "1755",
    description: "La plus ancienne manufacture horlogère active au monde, 270 ans d'excellence."
  },
  {
    name: "Omega",
    year: "1848",
    description: "Marque officielle des Jeux Olympiques, symbole de précision et d'innovation."
  },
  {
    name: "Jaeger-LeCoultre",
    year: "1833",
    description: "Maître des complications, créateur du plus petit mouvement mécanique au monde."
  },
  {
    name: "Blancpain",
    year: "1735",
    description: "Plus ancienne marque horlogère au monde, gardienne des traditions ancestrales."
  },
  {
    name: "IWC Schaffhausen",
    year: "1868",
    description: "Ingénierie de précision, spécialisée dans les montres d'aviation et de dive."
  }
];

const statsData = [
  { number: "500 Ans", label: "d'excellence horlogère" },
  { number: "30 Millions", label: "de montres par an" },
  { number: "50%", label: "du marché du luxe mondial" },
  { number: "CHF 20 Mds", label: "d'exportations annuelles" }
];

export default function Page() {
  // Utilisation simple du localStorage pour le thème
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

  return (
    <div className={`horlogerie-container ${isDarkMode ? 'dark' : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Header */}
      <header className="horlogerie-header">
        <h1 className="horlogerie-title">Histoire de l'Horlogerie Suisse</h1>
        <p className="horlogerie-subtitle">
          Cinq siècles d'excellence, d'innovation et de tradition horlogère
        </p>
        <button 
          onClick={toggleTheme}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? '☀️ Mode Clair' : '🌙 Mode Sombre'}
        </button>
      </header>

      {/* Statistiques */}
      <section className="section">
        <h2 className="section-title">Chiffres Clés</h2>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chronologie */}
      <section className="section">
        <h2 className="section-title">Chronologie Historique</h2>
        <div className="timeline">
          {timelineData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-event">{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Régions */}
      <section className="section">
        <h2 className="section-title">Régions Horlogères</h2>
        <div className="regions-grid">
          {regionsData.map((region, index) => (
            <div key={index} className="region-card">
              <div className="region-header">
                <div className="region-name">{region.name}</div>
                <div className="region-specialty">{region.specialty}</div>
              </div>
              <div className="region-description">
                {region.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manufactures */}
      <section className="section">
        <h2 className="section-title">Manufactures Légendaires</h2>
        <div className="manufactures-grid">
          {manufacturesData.map((manufacture, index) => (
            <div key={index} className="manufacture-card">
              <div className="manufacture-name">{manufacture.name}</div>
              <div className="manufacture-year">Fondée en {manufacture.year}</div>
              <div className="manufacture-description">{manufacture.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        marginTop: '60px',
        padding: '30px 0',
        borderTop: '1px solid #e1e5e9',
        color: '#666'
      }}>
        <p>© 2025 HorloLearn - Histoire de l'Horlogerie Suisse</p>
      </footer>
    </div>
  );
}
