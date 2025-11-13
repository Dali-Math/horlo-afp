import { useState, useEffect } from 'react';

export default function GuideCompletPage() {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('sommaire');

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9f7f4' }}>
      
      {/* SIDEBAR */}
      <aside style={{
        position: 'fixed',
        width: '280px',
        height: '100vh',
        background: '#8B1538',
        color: 'white',
        padding: '2rem 1rem',
        overflowY: 'auto',
        zIndex: 100
      }}>
        <h3 style={{ marginTop: 0 }}>📚 Guide Matériaux</h3>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
            <div style={{ width: `${progress}%`, height: '6px', background: '#C9A86E', transition: 'width 0.3s' }}></div>
          </div>
          <small>{Math.round(progress)}%</small>
        </div>
        <nav>
          {[
            {id: 'sommaire', title: '📖 Sommaire'},
            {id: 'generalites', title: '⚛️ Généralités'},
            {id: 'fer', title: '🔩 Le fer'},
            {id: 'acier', title: '⚙️ Aciers'},
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
                background: activeSection === link.id ? '#C9A86E' : 'rgba(255,255,255,0.1)',
                borderRadius: '8px'
              }}
            >
              {link.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTENU */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '3rem', maxWidth: '900px' }}>
        
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', marginBottom: '3rem' }}>
          <h1 style={{ color: '#8B1538' }}>Guide Complet des Matériaux en Horlogerie</h1>
          <p>📄 42 pages | ⏱️ 30 min | 🎓 Formation Pro</p>
          <a href="/docs/guide-materiaux.md" download style={{
            display: 'inline-block',
            background: '#8B1538',
            color: 'white',
            padding: '0.8rem 1.8rem',
            borderRadius: '8px',
            textDecoration: 'none',
            marginTop: '1rem'
          }}>
            📥 Télécharger
          </a>
        </div>

        {/* CHAPITRES */}
        <article id="sommaire" style={{ background: 'white', padding: '2.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#8B1538' }}>📖 Sommaire</h2>
          <p>Naviguez dans le guide :</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '0.8rem 0' }}><a href="#generalites" onClick={(e) => handleNavClick(e, 'generalites')} style={{ color: '#8B1538' }}>⚛️ Généralités</a></li>
            <li style={{ margin: '0.8rem 0' }}><a href="#fer" onClick={(e) => handleNavClick(e, 'fer')} style={{ color: '#8B1538' }}>🔩 Métaux Ferreux</a></li>
            <li style={{ margin: '0.8rem 0' }}><a href="#acier" onClick={(e) => handleNavClick(e, 'acier')} style={{ color: '#8B1538' }}>⚙️ Classification Aciers</a></li>
          </ul>
        </article>

        <article id="generalites" style={{ background: 'white', padding: '2.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#8B1538' }}>⚛️ Généralités sur les métaux</h2>
          <p>Les métaux se classent en <strong>trois catégories principales</strong>.</p>
        </article>

        <article id="fer" style={{ background: 'white', padding: '2.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#8B1538' }}>🔩 Le fer (Fe)</h2>
          <p><strong>Masse volumique :</strong> 7.86 kg/dm³</p>
        </article>

        <article id="acier" style={{ background: 'white', padding: '2.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#8B1538' }}>⚙️ Classification des aciers</h2>
          <p>L'acier contient entre <strong>0,02% et 2% de carbone</strong>.</p>
        </article>

        <article id="comparatif" style={{ background: 'white', padding: '2.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
          <h2 style={{ color: '#8B1538' }}>📊 Comparatif final</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#8B1538', color: 'white' }}>
                <th style={{ padding: '1rem' }}>Matériau</th>
                <th style={{ padding: '1rem' }}>Poids</th>
                <th style={{ padding: '1rem' }}>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Acier 316L</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>7.9</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>Boîtiers</td>
              </tr>
            </tbody>
          </table>
        </article>
      </main>

      {/* BARRE DE PROGRESSION */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '4px', background: '#eee', zIndex: 1000 }}>
        <div style={{ width: `${progress}%`, height: '4px', background: '#8B1538' }}></div>
      </div>
    </div>
  );
}
