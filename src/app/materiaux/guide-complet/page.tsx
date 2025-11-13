// src/app/materiaux/guide-complet/page.tsx
'use client';

import { useState, useEffect } from 'react';

// DONNÉES SIMPLIFIÉES (impossible à planter)
const CHAPTERS = [
  { id: 'sommaire', title: '📚 Sommaire', content: '<p>Bienvenue dans le guide complet.</p>' },
  { id: 'generalites', title: '⚛️ Généralités', content: '<p>Les métaux se classent en 3 catégories.</p>' },
  { id: 'acier', title: '⚙️ Acier', content: '<p>Alliage fer-carbone entre 0,02% et 2%.</p>' },
  { id: 'comparatif', title: '📊 Comparatif', content: '<p>Tableau comparatif des matériaux.</p>' }
];

export default function GuideCompletPage() {
  const [activeChapter, setActiveChapter] = useState('sommaire');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* SIDEBAR SIMPLE */}
      <aside style={{
        position: 'fixed',
        width: '280px',
        height: '100vh',
        background: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        overflowY: 'auto',
        padding: '1rem'
      }}>
        <h3>📚 Navigation</h3>
        <div style={{ margin: '1rem 0' }}>
          <small>Progression : {Math.round(progress)}%</small>
          <div style={{
            width: '100%',
            height: '4px',
            background: '#eee',
            borderRadius: '2px'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '4px',
              background: '#8B1538',
              borderRadius: '2px'
            }}></div>
          </div>
        </div>
        
        <nav>
          {CHAPTERS.map(ch => (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveChapter(ch.id);
                document.getElementById(ch.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'block',
                padding: '0.8rem',
                margin: '0.5rem 0',
                background: activeChapter === ch.id ? '#8B1538' : 'transparent',
                color: activeChapter === ch.id ? 'white' : 'black',
                textDecoration: 'none',
                borderRadius: '6px'
              }}
            >
              {ch.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* CONTENU */}
      <main style={{
        marginLeft: '280px',
        flex: 1,
        padding: '2rem',
        maxWidth: '900px'
      }}>
        <h1>Guide des Matériaux en Horlogerie</h1>
        <p>42 pages | 25 min | Formation Pro</p>
        
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Rechercher..."
            style={{
              width: '100%',
              padding: '1rem',
              border: '2px solid #ddd',
              borderRadius: '8px'
            }}
          />
        </div>

        {CHAPTERS.map(ch => (
          <article
            key={ch.id}
            id={ch.id}
            style={{
              background: 'white',
              padding: '2rem',
              marginBottom: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}
          >
            <h2>{ch.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: ch.content }} />
          </article>
        ))}
      </main>
    </div>
  );
}
