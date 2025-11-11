'use client';

import { useEffect, useRef } from 'react';
import { legendaryCollections } from './data';
export default function Page() {
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    // Load Three.js and Vanta.js scripts
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js ');
        }
        if (!(window as any).VANTA) {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js ');
        }
        if (vantaBgRef.current && (window as any).VANTA) {
          vantaEffectRef.current = (window as any).VANTA.BIRDS({
            el: vantaBgRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 300.00,
            minWidth: 300.00,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xf8f6f0,
            color1: 0xd4af37,
            color2: 0x1a2332,
            birdSize: 1.2,
            wingSpan: 25,
            quantity: 3,
          });
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    initVanta();

    // Parallax effect on VANTA bg
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = vantaBgRef.current;
      if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Hero animations and scroll effects
  useEffect(() => {
    const loadAnime = async () => {
      if (!(window as any).anime) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          initAnimations();
        };
      } else {
        initAnimations();
      }
    };

    const initAnimations = () => {
      const anime = (window as any).anime;
      
      // Hero animations
      anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: 500,
        easing: 'easeOutQuart'
      });

      anime({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 800,
        easing: 'easeOutQuart'
      });

      anime({
        targets: '.hero-quote',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 1100,
        easing: 'easeOutQuart'
      });

      anime({
        targets: '.stat-item',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: anime?.stagger?.(200, {start: 1400}) || 1400,
        easing: 'easeOutQuart'
      });

      // Timeline animations
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item: Element, index: number) => {
        anime({
          targets: item,
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 600,
          delay: index * 200,
          easing: 'easeOutQuart'
        });
      });

      // Collection cards animations
      const collectionCards = document.querySelectorAll('.collection-card');
      collectionCards.forEach((card: Element, index: number) => {
        anime({
          targets: card,
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 600,
          delay: index * 100,
          easing: 'easeOutQuart'
        });
      });

      // Innovation counters
      const innovationNumbers = document.querySelectorAll('.innovation-number');
      innovationNumbers.forEach((number: Element) => {
        const target = parseInt(number.getAttribute('data-count') || '0');
        anime({
          targets: number,
          innerHTML: [0, target],
          duration: 2000,
          delay: 500,
          easing: 'easeOutQuart',
          round: 1
        });
      });

      // Craft items animations
      const craftItems = document.querySelectorAll('.craft-item');
      craftItems.forEach((item: Element, index: number) => {
        anime({
          targets: item,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          delay: index * 200,
          easing: 'easeOutQuart'
        });
      });
    };

    loadAnime();
  }, []);

  // Scroll animations for sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe section titles and other elements
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => observer.observe(title));

    return () => observer.disconnect();
  }, []);

  // Navigation scroll effect
  useEffect(() => {
    const handleNavScroll = () => {
      const nav = document.querySelector('.nav-container') as HTMLElement;
      if (nav) {
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(250, 248, 245, 0.98)';
        } else {
          nav.style.background = 'rgba(250, 248, 245, 0.95)';
        }
      }
    };

    window.addEventListener('scroll', handleNavScroll);
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, []);

  // Smooth scrolling for navigation links
  useEffect(() => {
    const handleAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  // Collection card hover effects
  useEffect(() => {
    const anime = (window as any).anime;
    if (!anime) return;

    const handleMouseEnter = function(this: HTMLElement) {
      anime({
        targets: this,
        scale: 1.02,
        duration: 300,
        easing: 'easeOutQuart'
      });
    };

    const handleMouseLeave = function(this: HTMLElement) {
      anime({
        targets: this,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuart'
      });
    };

    const cards = document.querySelectorAll('.collection-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

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
          will-change: transform;
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
          transform: translateY(50px);
        }
        
        .hero-subtitle {
          font-size: clamp(1.2rem, 3vw, 2rem);
          font-weight: 300;
          margin-bottom: 3rem;
          color: var(--charcoal-light);
          opacity: 0;
          transform: translateY(30px);
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
          transform: translateY(30px);
        }
        
        .nav-container {
          position: sticky;
          top: 64px;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 248, 245, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          transition: all 0.3s ease;
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
          position: relative;
        }
        
        .nav-links a:hover {
          color: var(--gold);
        }
        
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after {
          width: 100%;
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
          opacity: 0;
          transform: translateY(30px);
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
          opacity: 0;
          transform: translateY(50px);
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
          opacity: 0;
          transform: translateY(50px);
          cursor: pointer;
        }
        
        .collection-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px var(--shadow-dark);
        }
        
        .collection-image {
          width: 100%;
          height: 250px;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: var(--white);
        }
        
        .collection-content {
          padding: 2rem;
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
        
        .collection-price {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 1rem;
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
        
        .innovation-item {
          opacity: 0;
          transform: translateY(30px);
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
          display: inline-block;
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
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
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
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-logo {
          font-size: 2rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 2rem;
        }
        
        .footer-text {
          font-size: 1rem;
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
          
          .innovation-grid {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title font-display">Patek Philippe</h1>
          <p className="hero-subtitle">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</p>
          <p className="hero-quote">
            "Vous ne possédez jamais complètement une Patek Philippe. 
            Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="hero-stats">
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '3rem' }}>
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
        </div>
      </section>

      {/* Heritage Section */}
      <section id="heritage" className="section">
        <h2 className="section-title font-display">185 Ans d'Excellence</h2>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1839</div>
            <h3 className="timeline-title">Fondation de la Manufacture</h3>
            <p className="timeline-description">
              Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek &amp; Cie à Genève avec François Czapek. 
              Début d'une aventure qui révolutionnera l'horlogerie mondiale.
            </p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1844</div>
            <h3 className="timeline-title">Rencontre Historique à Paris</h3>
            <p className="timeline-description">
              Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris. 
              Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.
            </p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1851</div>
            <h3 className="timeline-title">Consécration Royale</h3>
            <p className="timeline-description">
              La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la 
              Grande Exposition de Londres. Début de la reconnaissance internationale.
            </p>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-marker"></div>
            <div className="timeline-date">1868</div>
            <h3 className="timeline-title">Première Montre-bracelet</h3>
            <p className="timeline-description">
              Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe. 
              Innovation qui transformera l'industrie horlogère.
            </p>
          </div>
          
          <div className="timeline-item">
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

      {/* Collections Section */}
      <section id="collections" className="section">
        <h2 className="section-title font-display">Collections Légendaires</h2>
        <div className="collections-grid">
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">⌚</div>
            <div className="collection-content">
              <h3 className="collection-title">Calatrava</h3>
              <p className="collection-description">
                L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe 
                avec son design pur et ses lignes classiques.
              </p>
              <div className="collection-price">À partir de €25,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Mouvement automatique</span>
                <span className="spec-tag">Cadran émail</span>
                <span className="spec-tag">Boîtier or</span>
              </div>
            </div>
          </div>
          
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">🏆</div>
            <div className="collection-content">
              <h3 className="collection-title">Nautilus</h3>
              <p className="collection-description">
                L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse 
                et élégance dans un design emblématique.
              </p>
              <div className="collection-price">À partir de €35,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Étanche 120m</span>
                <span className="spec-tag">Boîtier acier</span>
                <span className="spec-tag">Bracelet intégré</span>
              </div>
            </div>
          </div>
          
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">💎</div>
            <div className="collection-content">
              <h3 className="collection-title">Aquanaut</h3>
              <p className="collection-description">
                L'aventure moderne. Design contemporain avec bracelet Tropical innovant, 
                parfait pour l'homme actif et élégant.
              </p>
              <div className="collection-price">À partir de €28,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Bracelet caoutchouc</span>
                <span className="spec-tag">Étanche 120m</span>
                <span className="spec-tag">Design sportif</span>
              </div>
            </div>
          </div>
          
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">⚙️</div>
            <div className="collection-content">
              <h3 className="collection-title">Complications</h3>
              <p className="collection-description">
                L'art de la complexité. Montres avec fonctions avancées alliant 
                innovation technique et beauté esthétique.
              </p>
              <div className="collection-price">À partir de €45,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Chronographe</span>
                <span className="spec-tag">Calendrier</span>
                <span className="spec-tag">Phase lune</span>
              </div>
            </div>
          </div>
          
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">👑</div>
            <div className="collection-content">
              <h3 className="collection-title">Grandes Complications</h3>
              <p className="collection-description">
                Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs 
                complications, représentant l'excellence absolue.
              </p>
              <div className="collection-price">À partir de €150,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Sonnerie</span>
                <span className="spec-tag">Répétition minutes</span>
                <span className="spec-tag">Tourbillon</span>
              </div>
            </div>
          </div>
          
          <div className="collection-card" onClick={() => window.location.href = 'collections.html'}>
            <div className="collection-image">🎨</div>
            <div className="collection-content">
              <h3 className="collection-title">Gondolo</h3>
              <p className="collection-description">
                L'art déco revisité. Collection inspirée des années 1920 avec des 
                formes géométriques audacieuses et un style raffiné.
              </p>
              <div className="collection-price">À partir de €30,000</div>
              <div className="collection-specs">
                <span className="spec-tag">Forme tonneau</span>
                <span className="spec-tag">Design rétro</span>
                <span className="spec-tag">Cadran guilloché</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section id="innovation" className="innovation-section">
        <h2 className="section-title font-display" style={{ color: 'var(--white)', marginBottom: '2rem' }}>Innovations Révolutionnaires</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '4rem', opacity: 0.9 }}>
          Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839
        </p>
        
        <div className="innovation-grid">
          <div className="innovation-item">
            <div className="innovation-number" data-count="70">0</div>
            <h3 className="innovation-title">Brevets Déposés</h3>
            <p className="innovation-description">
              Innovations révolutionnaires qui ont façonné l'horlogerie moderne
            </p>
          </div>
          
          <div className="innovation-item">
            <div className="innovation-number" data-count="100">0</div>
            <h3 className="innovation-title">% Indépendance</h3>
            <p className="innovation-description">
              Fabrication intégrée contrôlant chaque étape de la production
            </p>
          </div>
          
          <div className="innovation-item">
            <div className="innovation-number" data-count="185">0</div>
            <h3 className="innovation-title">Ans d'Excellence</h3>
            <p className="innovation-description">
              D'expérience ininterrompue dans l'art horloger suisse
            </p>
          </div>
          
          <div className="innovation-item">
            <div className="innovation-number" data-count="60000">0</div>
            <h3 className="innovation-title">Montres/An</h3>
            <p className="innovation-description">
              Production artisanale limitée garantissant l'exclusivité
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section id="craftsmanship" className="section">
        <h2 className="section-title font-display">Savoir-faire Exceptionnel</h2>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.3rem', lineHeight: 1.8, marginBottom: '4rem', color: 'var(--charcoal-light)' }}>
            Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal, 
            alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent 
            leur savoir-faire de génération en génération.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '4rem' }}>
            <div className="craft-item">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Mécanique Fine</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Mouvements développés et assemblés à la main avec une précision extrême, 
                chaque composant est poli et décoré selon les plus hauts standards.
              </p>
            </div>
            
            <div className="craft-item">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Joaillerie</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Sertissage artisanal de diamants et pierres précieuses selon les techniques 
                traditionnelles suisses les plus exigeantes.
              </p>
            </div>
            
            <div className="craft-item">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Arts Décoratifs</h3>
              <p style={{ color: 'var(--charcoal-light)', lineHeight: 1.6 }}>
                Émaux, gravures et guillochages réalisés par des artistes spécialisés 
                utilisant des techniques ancestrales préservées.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="cta-title font-display">Découvrez l'Univers Patek Philippe</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '3rem', color: 'var(--charcoal)' }}>
          Plongez dans l'histoire, les collections et l'excellence horlogère suisse
        </p>
        <div className="cta-buttons">
          <a href="heritage.html" className="btn btn-primary">Explorer l'Héritage</a>
          <a href="collections.html" className="btn btn-secondary">Voir les Collections</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo font-display">Patek Philippe</div>
          <p className="footer-text">
            Vous ne possédez jamais complètement une Patek Philippe. 
            Vous en êtes le gardien pour les générations futures.
          </p>
          <div className="footer-bottom">
            <p>© 2024 Patek Philippe SA. Tous droits réservés. Référence mondiale en horlogerie suisse.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
