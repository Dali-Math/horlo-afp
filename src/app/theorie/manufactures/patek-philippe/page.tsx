'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { legendaryCollections } from './data';

export default function Page() {
  const router = useRouter();
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [expandedCollection, setExpandedCollection] = useState<string | null>(null);

  // Vanta.js - Optimisé avec 10-12 oiseaux
  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth < 1024;
        
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).VANTA) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js');
        }
        
        if (vantaBgRef.current && (window as any).VANTA) {
          let birdCount = 12;
          if (isTablet) birdCount = 8;
          if (isMobile) birdCount = 5;
          
          vantaEffectRef.current = (window as any).VANTA.BIRDS({
            el: vantaBgRef.current,
            mouseControls: !isMobile,
            touchControls: !isMobile,
            gyroControls: false,
            minHeight: 300.00,
            minWidth: 300.00,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            birdSize: 1.0,
            wingSpan: 20,
            quantity: birdCount,
            separation: 40,
            alignment: 60,
            cohesion: 50,
            speedLimit: 3.0
          });
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    const timer = setTimeout(initVanta, 300);

    return () => {
      clearTimeout(timer);
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
    };
  }, []);

  // Anime.js - Optimisé
  useEffect(() => {
    const loadAnime = () => {
      if (!(window as any).anime) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        script.async = true;
        script.onload = () => {
          setTimeout(initAnimations, 100);
        };
        document.head.appendChild(script);
      } else {
        initAnimations();
      }
    };

    const initAnimations = () => {
      const anime = (window as any).anime;
      if (!anime) return;
      
      anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 400,
        easing: 'easeOutQuad'
      });

      anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 700,
        easing: 'easeOutQuad'
      });

      anime({
        targets: '.hero-quote',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 900,
        easing: 'easeOutQuad'
      });

      anime({
        targets: '.stat-item',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: anime.stagger(150, {start: 1100}),
        easing: 'easeOutQuad'
      });
    };

    setTimeout(loadAnime, 500);
  }, []);

  // Intersection Observer pour animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const anime = (window as any).anime;
            
            if (anime) {
              anime({
                targets: entry.target,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutQuad'
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Compteurs
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const targetValue = parseInt(entry.target.getAttribute('data-count') || '0');
            const anime = (window as any).anime;
            
            if (anime) {
              anime({
                targets: entry.target,
                innerHTML: [0, targetValue],
                duration: 1500,
                easing: 'easeOutQuad',
                round: 1
              });
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const counters = document.querySelectorAll('.innovation-number');
    counters.forEach(counter => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  const toggleCollection = (name: string) => {
    setExpandedCollection(expandedCollection === name ? null : name);
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --cream: #faf8f5;
          --gold: #d4af37;
          --gold-light: #f4e4a6;
          --gold-dark: #b8941f;
          --charcoal: #2c2c2c;
          --charcoal-light: #404040;
          --white: #ffffff;
          --shadow-gold: rgba(212, 175, 55, 0.3);
          --shadow-dark: rgba(44, 44, 44, 0.2);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          color: var(--charcoal);
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .font-display {
          font-family: 'Playfair Display', serif;
        }
        
        .back-btn {
          padding: 0.5rem 1rem;
          background: var(--gold);
          color: var(--white);
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .back-btn:hover {
          background: var(--gold-dark);
          transform: translateY(-1px);
        }

        .hero-section {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 1200px;
          padding: 0 2rem;
        }
        
        .hero-title {
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 800;
          line-height: 0.9;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0;
        }
        
        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 300;
          margin-bottom: 3rem;
          color: var(--charcoal-light);
          opacity: 0;
        }
        
        .hero-quote {
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-style: italic;
          margin-bottom: 4rem;
          color: var(--charcoal-light);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          opacity: 0;
        }
        
        .stat-item {
          opacity: 0;
        }
        
        .nav-container {
          position: sticky;
          top: 64px;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 248, 245, 0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
        
        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gold);
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          list-style: none;
          gap: 2rem;
        }
        
        .nav-links a {
          text-decoration: none;
          color: var(--charcoal);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
          color: var(--gold);
        }
        
        .section {
          padding: 8rem 0;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        
        .section-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          text-align: center;
          margin-bottom: 4rem;
          color: var(--charcoal);
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
        
        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, var(--gold), var(--gold-light));
          transform: translateX(-50%);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
        }
        
        .timeline-item:nth-child(odd) {
          text-align: right;
          padding-right: calc(50% + 3rem);
        }
        
        .timeline-item:nth-child(even) {
          text-align: left;
          padding-left: calc(50% + 3rem);
        }
        
        .timeline-date {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        
        .timeline-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--charcoal);
        }
        
        .timeline-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--charcoal-light);
        }
        
        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 1rem;
          width: 20px;
          height: 20px;
          background: var(--gold);
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
          box-shadow: 0 0 20px var(--shadow-gold);
        }
        
        .collections-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }
        
        .collection-card {
          background: var(--white);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px var(--shadow-dark);
          transition: all 0.4s ease;
          cursor: pointer;
        }
        
        .collection-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px var(--shadow-dark);
        }
        
        .collection-card.expanded {
          grid-column: 1 / -1;
        }
        
        .collection-header {
          cursor: pointer;
        }
        
        .collection-image {
          width: 100%;
          height: 250px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .collection-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 1.5rem;
        }
        
        .collection-content {
          padding: 2rem;
          position: relative;
        }
        
        .collection-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--charcoal);
        }
        
        .collection-description {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--charcoal-light);
          margin-bottom: 1.5rem;
        }
        
        .collection-since {
          font-size: 1rem;
          font-weight: 500;
          color: var(--gold-dark);
          margin-bottom: 1rem;
          font-style: italic;
        }
        
        .collection-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .spec-tag {
          background: var(--cream);
          color: var(--charcoal);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        
        .expand-indicator {
          position: absolute;
          top: 2rem;
          right: 2rem;
          width: 32px;
          height: 32px;
          background: var(--gold);
          color: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .expanded-timeline {
          padding: 0 2rem 2rem;
          border-top: 1px solid rgba(212, 175, 55, 0.2);
          margin-top: 1.5rem;
          animation: slideDown 0.4s ease;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }
        
        .timeline-event {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background: var(--cream);
          border-radius: 12px;
          border-left: 4px solid var(--gold);
        }
        
        .timeline-year {
          font-weight: 700;
          color: var(--gold);
          min-width: 80px;
        }
        
        .innovation-section {
          background: linear-gradient(135deg, var(--charcoal), var(--charcoal-light));
          color: var(--white);
          margin: 8rem 0;
          padding: 8rem 2rem;
          text-align: center;
        }
        
        .innovation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 4rem auto 0;
        }
        
        .innovation-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        
        .innovation-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .innovation-description {
          font-size: 1rem;
          line-height: 1.6;
          opacity: 0.9;
        }
        
        .cta-section {
          text-align: center;
          padding: 6rem 2rem;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          margin: 8rem 0;
        }
        
        .cta-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--charcoal);
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
        }
        
        .btn-primary {
          background: var(--charcoal);
          color: var(--white);
        }
        
        .btn-primary:hover {
          background: var(--charcoal-light);
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background: var(--white);
          color: var(--charcoal);
          border: 2px solid var(--charcoal);
        }
        
        .btn-secondary:hover {
          background: var(--charcoal);
          color: var(--white);
          transform: translateY(-2px);
        }
        
        .footer {
          background: var(--charcoal);
          color: var(--white);
          padding: 4rem 2rem 2rem;
          text-align: center;
        }
        
        .footer-logo {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 2rem;
        }
        
        .footer-text {
          opacity: 0.8;
          margin-bottom: 2rem;
        }
        
        .footer-bottom {
          border-top: 1px solid var(--charcoal-light);
          padding-top: 2rem;
          opacity: 0.6;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .timeline-item:nth-child(odd),
          .timeline-item:nth-child(even) {
            text-align: left;
            padding-left: 3rem;
            padding-right: 0;
          }
          
          .timeline-line {
            left: 1rem;
          }
          
          .timeline-marker {
            left: 1rem;
          }
          
          .collections-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="home" className="hero-section">
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title font-display">Patek Philippe</h1>
          <p className="hero-subtitle">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</p>
          <p className="hero-quote">
            "Vous ne possédez jamais complètement une Patek Philippe. 
            Vous en êtes le gardien pour les générations futures."
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem', flexWrap: 'wrap' }}>
            <div className="stat-item">
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>1839</div>
              <div style={{ fontSize: '1rem', color: 'var(--charcoal-light)' }}>Fondation</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>70+</div>
              <div style={{ fontSize: '1rem', color: 'var(--charcoal-light)' }}>Brevets</div>
            </div>
            <div className="stat-item">
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold)' }}>100%</div>
              <div style={{ fontSize: '1rem', color: 'var(--charcoal-light)' }}>Indépendance</div>
            </div>
          </div>
        </div>
      </section>

      <nav className="nav-container">
        <div className="nav-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => router.push('/theorie/manufactures')} className="back-btn">
              Retour
            </button>
            <a href="#home" className="nav-logo font-display">Patek Philippe</a>
          </div>
          <ul className="nav-links">
            <li><a href="#heritage">Héritage</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#innovation">Innovation</a></li>
            <li><a href="#craftsmanship">Savoir-faire</a></li>
          </ul>
        </div>
      </nav>

      <section id="heritage" className="section">
        <h2 className="section-title font-display animate-on-scroll">185 Ans d'Excellence</h2>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item animate-on-scroll">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1839</div>
            <h3 className="timeline-title">Fondation de la Manufacture</h3>
            <p className="timeline-description">
              Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek. 
              Début d'une aventure qui révolutionnera l'horlogerie mondiale.
            </p>
          </div>
          
          <div className="timeline-item animate-on-scroll">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1844</div>
            <h3 className="timeline-title">Rencontre Historique à Paris</h3>
            <p className="timeline-description">
              Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris. 
              Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.
            </p>
          </div>
          
          <div className="timeline-item animate-on-scroll">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1851</div>
            <h3 className="timeline-title">Consécration Royale</h3>
            <p className="timeline-description">
              La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la 
              Grande Exposition de Londres. Début de la reconnaissance internationale.
            </p>
          </div>
          
          <div className="timeline-item animate-on-scroll">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1868</div>
            <h3 className="timeline-title">Première Montre-bracelet</h3>
            <p className="timeline-description">
              Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe. 
              Innovation qui transformera l'industrie horlogère.
            </p>
          </div>
          
          <div className="timeline-item animate-on-scroll">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1889</div>
            <h3 className="timeline-title">Brevet du Calendrier Perpétuel</h3>
            <p className="timeline-description">
              Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel, 
              l'une des complications les plus complexes de l'horlogerie.
            </p>
          </div>
        </div>
      </section>

      <section id="collections" className="section">
        <h2 className="section-title font-display animate-on-scroll">Collections Légendaires</h2>
        <div className="collections-grid">
          {legendaryCollections.map((collection) => (
            <div 
              className={`collection-card animate-on-scroll ${expandedCollection === collection.name ? 'expanded' : ''}`}
              key={collection.name}
            >
              <div className="collection-header" onClick={() => toggleCollection(collection.name)}>
                <div className="collection-image">
                  <img 
                    src={collection.illustration} 
                    alt={collection.name}
                    loading="lazy"
                  />
                </div>
                <div className="collection-content">
                  <h3 className="collection-title">{collection.name}</h3>
                  <p className="collection-description">{collection.description}</p>
                  <div className="collection-since">Depuis {collection.since}</div>
                  <div className="collection-specs">
                    <span className="spec-tag">{collection.fact}</span>
                    <span className="spec-tag">{collection.context}</span>
                  </div>
                  <div className="expand-indicator">
                    {expandedCollection === collection.name ? '−' : '+'}
                  </div>
                </div>
              </div>

              {expandedCollection === collection.name && (
                <div className="expanded-timeline">
                  <h4 className="timeline-title">Événements Historiques</h4>
                  {collection.timeline.map((item, index) => (
                    <div className="timeline-event" key={index}>
                      <div className="timeline-year">{item.year}</div>
                      <div className="timeline-description">{item.event}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="innovation" className="innovation-section">
        <h2 className="section-title font-display animate-on-scroll" style={{ color: 'var(--white)', marginBottom: '2rem' }}>
          Innovations Révolutionnaires
        </h2>
        <p className="animate-on-scroll" style={{ fontSize: '1.2rem', marginBottom: '4rem', opacity: 0.9 }}>
          Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839
        </p>
        
        <div className="innovation-grid">
          <div className="animate-on-scroll">
            <div className="innovation-number" data-count="70">0</div>
            <h3 className="innovation-title">Brevets Déposés</h3>
            <p className="innovation-description">
              Innovations révolutionnaires qui ont façonné l'horlogerie moderne
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <div className="innovation-number" data-count="100">0</div>
            <h3 className="innovation-title">% Indépendance</h3>
            <p className="innovation-description">
              Fabrication intégrée contrôlant chaque étape de la production
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <div className="innovation-number" data-count="185">0</div>
            <h3 className="innovation-title">Ans d'Excellence</h3>
            <p className="innovation-description">
              D'expérience ininterrompue dans l'art horloger suisse
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <div className="innovation-number" data-count="60000">0</div>
            <h3 className="innovation-title">Montres/An</h3>
            <p className="innovation-description">
              Production artisanale limitée garantissant l'exclusivité
            </p>
          </div>
        </div>
      </section>

      <section id="craftsmanship" className="section">
        <h2 className="section-title font-display animate-on-scroll">Savoir-faire Exceptionnel</h2>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p className="animate-on-scroll" style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '4rem', color: 'var(--charcoal-light)' }}>
            Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal, 
            alliant tradition séculaire et innovation constante.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div className="animate-on-scroll">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Mécanique Fine</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Mouvements développés et assemblés à la main avec une précision extrême.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Joaillerie</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Sertissage artisanal selon les techniques traditionnelles suisses.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Arts Décoratifs</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Émaux, gravures et guillochages par des artistes spécialisés.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title font-display animate-on-scroll">Découvrez l'Univers Patek Philippe</h2>
        <p className="animate-on-scroll" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
          Plongez dans l'histoire, les collections et l'excellence horlogère suisse
        </p>
        <div className="cta-buttons">
          <button className="btn btn-primary">Explorer l'Héritage</button>
          <button className="btn btn-secondary">Voir les Collections</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo font-display">Patek Philippe</div>
        <p className="footer-text">
          Vous ne possédez jamais complètement une Patek Philippe. 
          Vous en êtes le gardien pour les générations futures.
        </p>
        <div className="footer-bottom">
          <p>© 2024 Patek Philippe SA. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}
