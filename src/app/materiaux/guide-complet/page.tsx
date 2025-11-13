// pages/materiaux/guide-complet.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function GuideCompletPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('sommaire');

  // Navigation - clique sur un lien
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Progression de lecture
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Guide Matériaux | HorloLearn</title>
        <meta name="description" content="Guide complet des métaux et alliages en horlogerie" />
      </Head>

      <div style={{ 
        display: 'flex', 
        minHeight: '100vh',
        background: '#f9f7f4', 
        color: '#1a1a1a' 
      }}>
        
        {/* SIDEBAR - FOND BORDEAUX, TEXTES BLANCS */}
        <aside style={{
          position: 'fixed',
          width: '280px',
          height: '100vh',
          background: '#8B1538',
          color: 'white',
          padding: '2rem 1rem',
          overflowY: 'auto',
          zIndex: 100,
          boxShadow: '2px 0 15px rgba(0,0,0,0.2)'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '1.5rem' }}>📚 Guide Matériaux</h3>
          
          {/* BARRE DE PROGRESSION */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ 
              width: '100%', 
              height: '6px', 
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '6px',
                background: '#C9A86E',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <small style={{ display: 'block', marginTop: '0.5rem' }}>
              {Math.round(progress)}% lu
            </small>
          </div>

          {/* MENU DE NAVIGATION */}
          <nav>
            {[
              {id: 'sommaire', title: '📖 Sommaire'},
              {id: 'generalites', title: '⚛️ Généralités'},
              {id: 'fer', title: '🔩 Le fer'},
              {id: 'acier', title: '⚙️ Aciers'},
              {id: 'fonte', title: '🏭 La fonte'},
              {id: 'siderurgie', title: '🔥 Sidérurgie'},
              {id: 'aluminium', title: '✈️ Aluminium'},
              {id: 'titane', title: '🚀 Titane'},
              {id: 'cuivre', title: '🟤 Cuivre & Laiton'},
              {id: 'comparatif', title: '📊 Comparatif'}
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                style={{
                  display: 'block',
                  padding: '0.9rem',
                  margin: '0.5rem 0',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  background: activeSection === link.id ? '#C9A86E' : 'rgba(255,255,255,0.1)',
                  transition: 'background 0.3s'
                }}
              >
                {link.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* ZONE DE CONTENU - FOND GRIS CLAIR, TEXTES NOIRS */}
        <main style={{
          marginLeft: '280px',
          flex: 1,
          padding: '3rem',
          maxWidth: '1000px',
          color: '#1a1a1a'
        }}>
          {/* HEADER */}
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '3rem',
            boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ 
              color: '#8B1538', 
              marginTop: 0,
              fontSize: '2.5rem'
            }}>
              Guide Complet des Matériaux en Horlogerie
            </h1>
            <p style={{ 
              color: '#666', 
              fontSize: '1.1rem',
              marginBottom: '1.5rem'
            }}>
              📄 42 pages | ⏱️ 30 min de lecture | 🎓 Formation Professionnelle
            </p>
            <a 
              href="/docs/guide-materiaux.md" 
              download
              style={{
                display: 'inline-block',
                background: '#8B1538',
                color: 'white',
                padding: '0.8rem 1.8rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              📥 Télécharger le guide (MD)
            </a>
          </div>

          {/* SOMMAIRE */}
          <article id="sommaire" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>📖 Sommaire Interactif</h2>
            <p>Cliquez sur un chapitre pour naviguer :</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '0.8rem 0' }}><a href="#generalites" onClick={(e) => handleNavClick(e, 'generalites')} style={{ color: '#8B1538', textDecoration: 'none', fontSize: '1.1rem' }}>⚛️ Généralités sur les métaux</a></li>
              <li style={{ margin: '0.8rem 0' }}><a href="#fer" onClick={(e) => handleNavClick(e, 'fer')} style={{ color: '#8B1538', textDecoration: 'none', fontSize: '1.1rem' }}>🔩 Métaux Ferreux</a></li>
              <li style={{ margin: '0.8rem 0' }}><a href="#acier" onClick={(e) => handleNavClick(e, 'acier')} style={{ color: '#8B1538', textDecoration: 'none', fontSize: '1.1rem' }}>⚙️ Classification des aciers</a></li>
              <li style={{ margin: '0.8rem 0' }}><a href="#comparatif" onClick={(e) => handleNavClick(e, 'comparatif')} style={{ color: '#8B1538', textDecoration: 'none', fontSize: '1.1rem' }}>📊 Comparatif final</a></li>
            </ul>
          </article>

          {/* GÉNÉRALITÉS */}
          <article id="generalites" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>⚛️ Généralités sur les métaux</h2>
            
            <div className="info-card" style={{
              background: 'linear-gradient(135deg, rgba(139,21,56,0.05), rgba(201,168,110,0.05))',
              borderLeft: '5px solid #8B1538',
              padding: '1.5rem',
              margin: '1.5rem 0',
              borderRadius: '0 12px 12px 0'
            }}>
              <h4 style={{ color: '#8B1538', marginTop: 0 }}>💡 Définition : Alliage métallique</h4>
              <p>Un alliage est un matériau composé de <strong>deux ou plusieurs éléments</strong>, dont au moins un métal.</p>
            </div>

            <h3>➕ Exemples d'alliages courants :</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '0.6rem 0', borderBottom: '1px dashed #ddd' }}><strong>Fer + Carbone</strong> → Acier et Fonte</li>
              <li style={{ padding: '0.6rem 0', borderBottom: '1px dashed #ddd' }}><strong>Cuivre + Zinc + Plomb</strong> → Laiton horloger</li>
              <li style={{ padding: '0.6rem 0', borderBottom: '1px dashed #ddd' }}><strong>Cuivre + Étain</strong> → Bronze</li>
            </ul>
          </article>

          {/* LE FER */}
          <article id="fer" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>🔩 Le fer (Fe)</h2>
            <p><strong>Masse volumique :</strong> 7.86 kg/dm³</p>
            <p><strong>Point de fusion :</strong> 1535°C</p>
            
            <h3>⚙️ Propriétés :</h3>
            <ul>
              <li>Mou, ductile et malléable à l'état pur</li>
              <li>S'oxyde facilement → nécessite protection</li>
              <li>Entièrement recyclable sans perte de qualité</li>
            </ul>
          </article>

          {/* L'ACIER */}
          <article id="acier" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>⚙️ Classification des aciers</h2>
            <p>L'acier est un alliage de fer contenant entre <strong>0,02% et 2% de carbone</strong>.</p>
            <p>Plus la teneur en carbone est élevée, plus l'acier est dur.</p>
          </article>

          {/* LA FONTE */}
          <article id="fonte" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>🏭 La fonte</h2>
            <p>Alliage de fer contenant <strong>plus de 2% de carbone</strong>.</p>
            <p>Obtenue directement du haut-fourneau.</p>
          </article>

          {/* SIDÉRURGIE */}
          <article id="siderurgie" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>🔥 Sidérurgie - Du minerai à l'acier</h2>
            <p>Processus en 4 phases : Extraction → Préparation → Réduction → Mise en forme</p>
          </article>

          {/* ALUMINIUM */}
          <article id="aluminium" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>✈️ Aluminium - Le métal léger</h2>
            <p><strong>Masse volumique :</strong> 2.70 kg/dm³ (3x moins lourd que le fer)</p>
            <p><strong>Point de fusion :</strong> 660°C</p>
            <p><strong>Propriétés :</strong> Résistant à la corrosion (couche d'oxyde), 100% recyclable</p>
          </article>

          {/* TITANE */}
          <article id="titane" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>🚀 Titane - Le métal d'exception</h2>
            <p><strong>Masse volumique :</strong> 4.54 kg/dm³</p>
            <p><strong>Point de fusion :</strong> 1660°C</p>
            <p><strong>Applications :</strong> Boîtiers sport haut de gamme, bracelets ultra-légers</p>
          </article>

          {/* CUIVRE & LAITON */}
          <article id="cuivre" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>🟤 Cuivre & Laiton</h2>
            <p><strong>Laiton horloger :</strong> Cuivre (58%) + Zinc (39%) + Plomb (3%)</p>
            <p><strong>Usage :</strong> Platines, ponts, rouages (facile à usiner)</p>
          </article>

          {/* COMPARATIF */}
          <article id="comparatif" style={{
            background: 'white',
            padding: '2.5rem',
            marginBottom: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#8B1538' }}>📊 Comparatif final</h2>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '2rem 0',
                fontSize: '0.95rem'
              }}>
                <thead>
                  <tr style={{ background: '#8B1538', color: 'white' }}>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Matériau</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Poids</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Dureté</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Coût</th>
                    <th style={{ padding: '1rem', textAlign: 'left' }}>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.8rem' }}><strong>Acier 316L</strong></td>
                    <td style={{ padding: '0.8rem' }}>Lourd (7.9)</td>
                    <td style={{ padding: '0.8rem' }}>Élevée</td>
                    <td style={{ padding: '0.8rem' }}>€€</td>
                    <td style={{ padding: '0.8rem' }}>Boîtiers</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.8rem' }}><strong>Titane</strong></td>
                    <td style={{ padding: '0.8rem' }}>Léger (4.5)</td>
                    <td style={{ padding: '0.8rem' }}>Très élevée</td>
                    <td style={{ padding: '0.8rem' }}>€€€€</td>
                    <td style={{ padding: '0.8rem' }}>Sport haut de gamme</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.8rem' }}><strong>Laiton</strong></td>
                    <td style={{ padding: '0.8rem' }}>Lourd (8.5)</td>
                    <td style={{ padding: '0.8rem' }}>Moyenne</td>
                    <td style={{ padding: '0.8rem' }}>€</td>
                    <td style={{ padding: '0.8rem' }}>Mouvements internes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
        </main>
      </div>

      {/* BARRE DE PROGRESSION FIXÉE EN HAUT DE LA PAGE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: '#eee',
        zIndex: 1000
      }}>
        <div style={{
          width: `${progress}%`,
          height: '4px',
          background: '#8B1538',
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </>
  );
}
