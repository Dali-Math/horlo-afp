import { useState, useEffect } from 'react';

export default function GuideCompletPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('sommaire');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Charger le mode sombre sauvegardé
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) document.body.classList.add('dark-mode');

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Nettoyer les résidus IDR Solutions
  useEffect(() => {
    document.querySelectorAll('*').forEach(el => {
      if (el.textContent?.includes('IDR SOLUTION')) el.remove();
    });
  }, []);

  return (
    <div className={`page-container ${isDarkMode ? 'dark-mode' : ''}`} style={{
      display: 'flex',
      minHeight: '100vh',
      background: isDarkMode ? '#1a1a1a' : '#f9f7f4',
      color: isDarkMode ? '#f9f7f4' : '#1a1a1a'
    }}>
      
      {/* SIDEBAR - DESIGN HORLOLEARN */}
      <aside className="sidebar" style={{
        position: 'fixed',
        width: '300px',
        height: '100vh',
        background: 'linear-gradient(180deg, #8B1538 0%, #6a0f2a 100%)',
        color: 'white',
        padding: '2rem 1.5rem',
        overflowY: 'auto',
        zIndex: 100,
        boxShadow: '4px 0 25px rgba(0,0,0,0.15)'
      }}>
        <div className="sidebar-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.4rem' }}>📚 Guide Matériaux</h2>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Formation Professionnelle</p>
        </div>

        {/* CERCLE DE PROGRESSION */}
        <div className="progress-circle" style={{
          position: 'relative',
          width: '80px',
          height: '80px',
          margin: '2rem auto'
        }}>
          <svg style={{ transform: 'rotate(-90deg)' }} width="80" height="80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="8"/>
            <circle 
              cx="40" cy="40" r="36" 
              fill="none" 
              stroke="#C9A86E" 
              strokeWidth="8"
              strokeDasharray="226"
              strokeDashoffset={226 - (progress / 100) * 226}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.2rem',
            fontWeight: 'bold'
          }}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* MENU */}
        <nav className="nav-menu">
          <div className="chapter-title" style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            padding: '0 1rem',
            marginBottom: '0.8rem'
          }}>Chapitres</div>
          
          {[
            {id: 'sommaire', title: '📖 Sommaire', desc: 'Vue d\'ensemble'},
            {id: 'generalites', title: '⚛️ Généralités', desc: 'Bases des métaux'},
            {id: 'fer', title: '🔩 Le fer', desc: 'Métal de base'},
            {id: 'acier', title: '⚙️ Aciers', desc: 'Alliages fer-carbone'},
            {id: 'fonte', title: '🏭 La fonte', desc: 'Fonte industrielle'},
            {id: 'siderurgie', title: '🔥 Sidérurgie', desc: 'Processus complet'},
            {id: 'aluminium', title: '✈️ Aluminium', desc: 'Métal léger'},
            {id: 'titane', title: '🚀 Titane', desc: 'Haute performance'},
            {id: 'cuivre', title: '🟤 Cuivre & Laiton', desc: 'Alliages traditionnels'},
            {id: 'comparatif', title: '📊 Comparatif Final', desc: 'Tableau récapitulatif'}
          ].map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.id)}
              style={{
                display: 'block',
                padding: '1rem',
                margin: '0.5rem 0',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '12px',
                background: activeSection === link.id ? 'rgba(201, 168, 110, 0.3)' : 'rgba(255,255,255,0.05)',
                borderLeft: `4px solid ${activeSection === link.id ? '#C9A86E' : 'transparent'}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div style={{ fontWeight: '600' }}>{link.title}</div>
              <small style={{ opacity: 0.7 }}>{link.desc}</small>
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTENU PRINCIPAL */}
      <main className="content-area" style={{
        marginLeft: '300px',
        flex: 1,
        padding: '3rem',
        maxWidth: '1000px'
      }}>
        
        {/* HEADER */}
        <div className="content-header" style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          marginBottom: '3rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          position: 'relative'
        }}>
          <h1 style={{ 
            color: '#8B1538', 
            margin: '0 0 1rem',
            fontSize: '2.5rem',
            fontWeight: 700
          }}>
            Guide Complet des Matériaux en Horlogerie
          </h1>
          <p style={{ 
            color: '#666', 
            fontSize: '1.1rem',
            marginBottom: '2rem'
          }}>
            📄 42 pages détaillées | ⏱️ 30 min de lecture | 🎓 Formation Professionnelle
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/docs/guide-materiaux.md" download style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#8B1538',
              color: 'white',
              padding: '0.9rem 1.8rem',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}>
              📥 Télécharger le Guide (MD)
            </a>
            <button onClick={() => window.print()} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#C9A86E',
              color: 'white',
              padding: '0.9rem 1.8rem',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              🖨️ Imprimer
            </button>
          </div>
        </div>

        {/* SOMMAIRE */}
        <section id="sommaire" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538', marginTop: 0 }}>📖 Sommaire Interactif</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Cliquez sur un chapitre pour naviguer directement :
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {id: 'generalites', title: '⚛️ Généralités', desc: 'Classification des métaux, définition des alliages'},
              {id: 'fer', title: '🔩 Le fer & ses alliages', desc: 'Propriétés, fonte, aciérurgie'},
              {id: 'acier', title: '⚙️ Aciers en détails', desc: 'Classification, aciers inoxydables'},
              {id: 'siderurgie', title: '🔥 Sidérurgie complète', desc: 'Du minerai au produit fini'},
              {id: 'aluminium', title: '✈️ Aluminium', desc: 'Alliages légers, applications'},
              {id: 'titane', title: '🚀 Titane & métaux nobles', desc: 'Haute performance, horlogerie de luxe'},
              {id: 'cuivre', title: '🟤 Cuivre & Laiton', desc: 'Alliages traditionnels horlogers'},
              {id: 'comparatif', title: '📊 Tableau comparatif', desc: 'Récapitulatif complet & décision'}
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(139,21,56,0.03), rgba(201,168,110,0.03))',
                  borderRadius: '12px',
                  border: '1px solid rgba(139,21,56,0.1)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s'
                }}
              >
                <h3 style={{ color: '#8B1538', margin: '0 0 0.5rem' }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#666' }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* GÉNÉRALITÉS */}
        <section id="generalites" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>⚛️ Généralités sur les métaux</h2>
          
          <div className="info-card" style={{
            background: 'linear-gradient(135deg, rgba(139,21,56,0.05), rgba(201,168,110,0.05))',
            borderLeft: '5px solid #8B1538',
            padding: '2rem',
            margin: '2rem 0',
            borderRadius: '0 16px 16px 0'
          }}>
            <h4 style={{ color: '#8B1538', marginTop: 0 }}>💡 Définition : Alliage métallique</h4>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
              Un <strong>alliage métallique</strong> est un matériau composé de <strong>deux ou plusieurs éléments</strong>, dont au moins un métal. 
              Les alliages sont utilisés pour <strong>améliorer les propriétés chimiques et mécaniques</strong> des métaux de base.
            </p>
          </div>

          <h3>➕ Exemples d'alliages courants en horlogerie :</h3>
          <ul className="alloys-list" style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px dashed #ddd', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#8B1538', marginRight: '1rem' }}>Fer + Carbone</span>
              <span>→ Acier et Fonte</span>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px dashed #ddd', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#8B1538', marginRight: '1rem' }}>Cuivre + Zinc + Plomb</span>
              <span>→ Laiton horloger (58% Cu, 39% Zn, 3% Pb)</span>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px dashed #ddd', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#8B1538', marginRight: '1rem' }}>Cuivre + Étain</span>
              <span>→ Bronze (2-10% Sn)</span>
            </li>
            <li style={{ padding: '0.8rem 0', borderBottom: '1px dashed #ddd', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', color: '#8B1538', marginRight: '1rem' }}>Aluminium + Magnésium</span>
              <span>→ Alliage léger (aéronautique)</span>
            </li>
          </ul>
        </section>

        {/* LE FER */}
        <section id="fer" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>🔩 Le fer (Fe) - La base industrielle</h2>
          
          <div className="properties-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
          }}>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>7.86 kg/dm³</div>
              <div style={{ color: '#666' }}>Masse volumique</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>1535°C</div>
              <div style={{ color: '#666' }}>Point de fusion</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>Fe</div>
              <div style={{ color: '#666' }}>Symbole chimique</div>
            </div>
          </div>

          <h3>⚙️ Propriétés physiques et chimiques :</h3>
          <ul style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            padding: 0,
            listStyle: 'none'
          }}>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>✅ Mou, ductile et malléable à l'état pur</li>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>⚠️ S'oxyde facilement (corrosion)</li>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>♻️ Entièrement recyclable sans perte de qualité</li>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>🔥 Bon conducteur thermique et électrique</li>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>🧲 Magnétisable (ferromagnétique)</li>
            <li style={{ padding: '1rem', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>⚠️ Pur : non utilisé en horlogerie</li>
          </ul>

          <div className="warning-card" style={{
            background: 'rgba(255,193,7,0.1)',
            borderLeft: '5px solid #ffc107',
            padding: '1.5rem',
            margin: '2rem 0',
            borderRadius: '0 12px 12px 0'
          }}>
            <h4 style={{ color: '#856404', marginTop: 0 }}>⚠️ Important pour les élèves</h4>
            <p style={{ margin: 0, color: '#856404' }}>
              <strong>Le fer pur n'est pas utilisé en horlogerie moderne.</strong> Seuls ses <strong>alliages</strong> (acier, fonte) sont employés pour leurs propriétés mécaniques supérieures.
            </p>
          </div>
        </section>

        {/* L'ACIER */}
        <section id="acier" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>⚙️ L'acier - Alliage maître de l'horlogerie</h2>
          
          <div className="formula-box" style={{
            background: 'rgba(139,21,56,0.1)',
            border: '2px solid #8B1538',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            margin: '2rem 0'
          }}>
            <strong style={{ fontSize: '1.2rem' }}>Fer + Carbone (0,02% à 2%) = ACIER</strong>
            <p style={{ margin: '0.5rem 0 0', color: '#666' }}>
              La teneur en carbone contrôle la dureté et les propriétés mécaniques
            </p>
          </div>

          <h3>📚 Les deux grandes familles d'aciers</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="materials-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: '2rem 0'
            }}>
              <thead>
                <tr style={{ background: '#8B1538', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Catégorie</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Caractéristiques</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Teneur en carbone</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Usage en horlogerie</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}><strong>Aciers non-alliés</strong></td>
                  <td style={{ padding: '1rem' }}>Seulement du carbone</td>
                  <td style={{ padding: '1rem' }}>≤ 2%</td>
                  <td style={{ padding: '1rem' }}>Composants standard, ressorts</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}><strong>Aciers alliés</strong></td>
                  <td style={{ padding: '1rem' }}>+ Chrome, nickel, molybdène...</td>
                  <td style={{ padding: '1rem' }}>Variable</td>
                  <td style={{ padding: '1rem' }}>Boîtiers, mouvements, vis</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}><strong>Aciers inoxydables</strong></td>
                  <td style={{ padding: '1rem' }}>≥ 12% chrome, parfois nickel</td>
                  <td style={{ padding: '1rem' }}>Faible</td>
                  <td style={{ padding: '1rem' }}>Boîtiers, bracelets de luxe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>🏆 Aciers courants en horlogerie suisse</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>316L (1.4404) :</strong> Standard industriel, excellente résistance à la corrosion
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>904L :</strong> Rolex, plus résistant aux acides, polissage supérieur
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>316L sans nickel :</strong> Anti-allergie (nouvelles normes européennes)
            </li>
          </ul>
        </section>

        {/* SIDÉRURGIE */}
        <section id="siderurgie" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>🔥 Sidérurgie - De la mine au mouvement</h2>
          
          <div className="process-steps" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
          }}>
            {[
              {num: '1', title: 'Extraction', desc: 'Minerais de fer (hématite, magnétite)'},
              {num: '2', title: 'Préparation', desc: 'Concassage, criblage, enrichissement'},
              {num: '3', title: 'Réduction', desc: 'Haut-fourneau (fusion à 1500°C)'},
              {num: '4', title: 'Affinage', desc: 'Convertisseur LD / four électrique'},
              {num: '5', title: 'Mise en forme', desc: 'Laminage, forgeage, tréfilage'}
            ].map(step => (
              <div key={step.num} style={{
                background: 'linear-gradient(135deg, rgba(139,21,56,0.05), rgba(201,168,110,0.05))',
                padding: '1.5rem',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#8B1538',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  margin: '0 auto 1rem'
                }}>{step.num}</div>
                <h4 style={{ color: '#8B1538', margin: '0 0 0.5rem' }}>{step.title}</h4>
                <p style={{ margin: 0, color: '#666' }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <h3>📊 Production mondiale d'acier (2024)</h3>
          <div style={{ background: 'rgba(139,21,56,0.05)', padding: '1.5rem', borderRadius: '12px', margin: '1.5rem 0' }}>
            <p style={{ margin: 0 }}><strong>Chine :</strong> 55% | <strong>Inde :</strong> 8% | <strong>UE :</strong> 7%</p>
            <p style={{ margin: '0.5rem 0 0', color: '#666' }}>La Suisse importe principalement de l'acier allemand et français pour l'horlogerie</p>
          </div>
        </section>

        {/* ALUMINIUM */}
        <section id="aluminium" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>✈️ Aluminium - Légereté & modernité</h2>
          
          <div className="properties-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
          }}>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>2.70 kg/dm³</div>
              <div style={{ color: '#666' }}>3x moins lourd que le fer</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>660°C</div>
              <div style={{ color: '#666' }}>Point de fusion</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>Al</div>
              <div style={{ color: '#666' }}>Symbole chimique</div>
            </div>
          </div>

          <h3>🎯 Applications horlogères spécifiques :</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>
              <strong>Montres de sport :</strong> Boîtiers légers et résistants (ex: TAG Heuer)
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>
              <strong>Mouvements quartz :</strong> Composants légers pour réduire la consommation
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderRadius: '8px' }}>
              <strong>Bridges décoratifs :</strong> Anodisés en couleur pour le design
            </li>
          </ul>
        </section>

        {/* TITANE */}
        <section id="titane" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>🚀 Titane - Haute performance</h2>
          
          <div className="properties-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            margin: '2rem 0'
          }}>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>4.54 kg/dm³</div>
              <div style={{ color: '#666' }}>45% moins lourd que l'acier</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>1660°C</div>
              <div style={{ color: '#666' }}>Point de fusion</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(139,21,56,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>Ti</div>
              <div style={{ color: '#666' }}>Symbole chimique</div>
            </div>
          </div>

          <h3>🏆 Avantages incomparables :</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>Ultra-léger :</strong> Confort de port exceptionnel
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>Anti-allergique :</strong> Parfait pour peaux sensibles
            </li>
            <li style={{ padding: '1rem', margin: '0.5rem 0', background: 'rgba(201,168,110,0.05)', borderLeft: '4px solid #C9A86E', borderRadius: '0 8px 8px 0' }}>
              <strong>Résistant à la corrosion :</strong> Convient à l'eau de mer
            </li>
          </ul>

          <h3>💎 Montres emblématiques en titane :</h3>
          <div style={{ background: 'rgba(139,21,56,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
            <p><strong>Omega Seamaster Planet Ocean :</strong> 600m étanche, ultra-légère</p>
            <p style={{ marginTop: '0.5rem' }}><strong>TAG Heuer Monaco Titan :</strong> Édition limitée, poids réduit de 40%</p>
          </div>
        </section>

        {/* CUIVRE & LAITON */}
        <section id="cuivre" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>🟤 Cuivre et alliages traditionnels</h2>
          
          <h3>➤ Cuivre (Cu) - Le conducteur par excellence</h3>
          <div className="properties-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            margin: '1.5rem 0'
          }}>
            <div className="property-card" style={{
              background: 'rgba(201,168,110,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>8.92 kg/dm³</div>
              <div style={{ color: '#666' }}>Masse volumique</div>
            </div>
            <div className="property-card" style={{
              background: 'rgba(201,168,110,0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8B1538' }}>1083°C</div>
              <div style={{ color: '#666' }}>Point de fusion</div>
            </div>
          </div>

          <h3>➤ Laiton horloger - La formule exacte</h3>
          <div className="formula-box" style={{
            background: 'linear-gradient(135deg, rgba(139,21,56,0.1), rgba(201,168,110,0.1))',
            border: '3px solid #8B1538',
            padding: '2rem',
            borderRadius: '16px',
            textAlign: 'center',
            margin: '2rem 0'
          }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Cuivre (58%) + Zinc (39%) + Plomb (3%) = <span style={{ color: '#8B1538' }}>Laiton Horloger</span>
            </div>
            <p style={{ margin: 0, color: '#666' }}>Cette composition précise permet un usinage optimal des rouages</p>
          </div>

          <h3>🎯 Applications horlogères du laiton :</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="materials-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: '1.5rem 0'
            }}>
              <thead>
                <tr style={{ background: '#8B1538', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Composant</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Pourquoi le laiton ?</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Alternative</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>Platines & ponts</td>
                  <td style={{ padding: '1rem' }}>Usinage facile, bon marché</td>
                  <td style={{ padding: '1rem' }}>Maillechort (haut de gamme)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>Rouages & roues</td>
                  <td style={{ padding: '1rem' }}>Faible frottement, précision</td>
                  <td style={{ padding: '1rem' }}>Acier (montres de précision)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}>Couronnes & poussoirs</td>
                  <td style={{ padding: '1rem' }}>Moulage facile, finition possible</td>
                  <td style={{ padding: '1rem' }}>Acier inoxydable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COMPARATIF FINAL */}
        <section id="comparatif" className="chapter" style={{
          background: 'white',
          padding: '3rem',
          marginBottom: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 6px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#8B1538' }}>📊 Tableau comparatif complet</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Récapitulatif des principaux matériaux pour les élèves :
          </p>
          
          <div style={{ overflowX: 'auto', margin: '2rem 0' }}>
            <table className="materials-table" style={{
              width: '100%',
              borderCollapse: 'collapse',
              margin: '2rem 0',
              fontSize: '0.95rem'
            }}>
              <thead>
                <tr style={{ background: '#8B1538', color: 'white' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Matériau</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Densité</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Dureté</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Corrosion</th>
                  <th style={{ padding: '1rem', textAlign: 'center' }}>Coût</th>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>Usage principal horloger</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee', background: 'rgba(139,21,56,0.03)' }}>
                  <td style={{ padding: '1rem' }}><strong>Acier 316L</strong></td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>7.9</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>Élevée</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>€€</td>
                  <td style={{ padding: '1rem' }}>Boîtiers, bracelets, mouvements</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}><strong>Titane Grade 5</strong></td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>4.5</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>Très élevée</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>€€€€</td>
                  <td style={{ padding: '1rem' }}>Boîtiers sport haut de gamme</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee', background: 'rgba(139,21,56,0.03)' }}>
                  <td style={{ padding: '1rem' }}><strong>Laiton CuZn39Pb3</strong></td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>8.5</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>Moyenne</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>€</td>
                  <td style={{ padding: '1rem' }}>Mouvements internes (platines, rouages)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem' }}><strong>Aluminium 7075</strong></td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>2.7</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>Moyenne</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>€€</td>
                  <td style={{ padding: '1rem' }}>Montres sport, mouvements quartz</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee', background: 'rgba(139,21,56,0.03)' }}>
                  <td style={{ padding: '1rem' }}><strong>Or 18K (750/1000)</strong></td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>15.5</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>Basse</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>⭐⭐⭐⭐⭐</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>€€€€€</td>
                  <td style={{ padding: '1rem' }}>Haute horlogerie, boîtiers de prestige</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>🎯 Guide de décision pour les élèves</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            <div className="decision-card" style={{
              background: 'rgba(40,167,69,0.05)',
              border: '2px solid #28a745',
              padding: '2rem',
              borderRadius: '16px'
            }}>
              <h4 style={{ color: '#28a745', marginTop: 0 }}>💰 Budget limité</h4>
              <p><strong>Solution :</strong> Laiton galvanisé</p>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>Bon compromis performance/cout, finition possible</p>
            </div>
            <div className="decision-card" style={{
              background: 'rgba(0,123,255,0.05)',
              border: '2px solid #007bff',
              padding: '2rem',
              borderRadius: '16px'
            }}>
              <h4 style={{ color: '#007bff', marginTop: 0 }}>🏃 Montre sport</h4>
              <p><strong>Solution :</strong> Titane ou aluminium</p>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>Léger, confortable, résistant à la transpiration</p>
            </div>
            <div className="decision-card" style={{
              background: 'rgba(255,193,7,0.05)',
              border: '2px solid #ffc107',
              padding: '2rem',
              borderRadius: '16px'
            }}>
              <h4 style={{ color: '#856404', marginTop: 0 }}>💎 Haute horlogerie</h4>
              <p><strong>Solution :</strong> Acier 904L, or 18k</p>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>Prestige, valeur patrimoniale, finition parfaite</p>
            </div>
          </div>
        </section>

        {/* BOUTON MODE SOMBRE */}
        <button onClick={() => {
          const newMode = !isDarkMode;
          setIsDarkMode(newMode);
          document.body.classList.toggle('dark-mode');
          localStorage.setItem('darkMode', String(newMode));
        }} style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: '#8B1538',
          color: 'white',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 6px 25px rgba(0,0,0,0.2)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* BARRE DE PROGRESSION FIXÉE */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: isDarkMode ? '#333' : '#eee',
        zIndex: 1000
      }}>
        <div style={{
          width: `${progress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, #8B1538, #C9A86E)',
          transition: 'width 0.3s ease'
        }}></div>
      </div>

      {/* STYLES GLOBAUX */}
      <style jsx global>{`
        .dark-mode {
          background: #1a1a1a !important;
          color: #f9f7f4 !important;
        }
        .dark-mode .chapter {
          background: #2a2a2a !important;
          color: #f9f7f4 !important;
        }
        .dark-mode .content-header {
          background: #2a2a2a !important;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #8B1538;
        }
      `}</style>
    </>
  );
}
