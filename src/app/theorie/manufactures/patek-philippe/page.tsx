'use client';

import { useEffect, useRef } from 'react';

export default function Page() {
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    // Load Three.js and Vanta.js
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
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).VANTA) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js');
        }
        if (vantaBgRef.current && (window as any).VANTA) {
          vantaEffectRef.current = (window as any).VANTA.BIRDS({
            el: vantaBgRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 300,
            minWidth: 300,
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

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
        :root {
          --cream: #f8f6f0;
          --gold: #D4AF37;
          --blue: #1a2332;
          --charcoal: #2c2c2c;
        }
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
        }
        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          background: rgba(248,246,240,0.97);
          border-bottom: 1px solid #efe8d6;
        }
        .nav-content {
          max-width: 1400px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          padding: 24px 32px;
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: var(--gold);
          font-weight: 700;
          text-decoration: none;
        }
        .nav-links {
          display: flex; gap: 2.2rem; font-weight: 500;
          font-size: 1.08rem;
        }
        .nav-links a {
          color: var(--charcoal);
          text-decoration: none;
          position: relative;
        }
        .nav-links a:hover {
          color: var(--gold);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 110px;
          overflow: hidden;
        }
        .vanta-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%; z-index: 1; will-change: transform;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(3.5rem,9vw,7rem);
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 2rem;
        }
        .hero-subtitle {
          font-size: 2rem;
          font-weight: 400;
          color: var(--charcoal);
        }
        .hero-quote {
          font-style: italic;
          font-size: 1.25rem;
          margin: 0 auto 2.5rem auto;
          max-width: 600px;
          color: #5a5a5a;
        }
        .hero-stats {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 66px;
          margin-top: 2.5rem;
        }
        .stat-block {
          text-align: center;
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gold);
        }
        .stat-label {
          font-size: 1.05rem;
          color: #222;
          margin-top: 0.25rem;
        }
        @media(max-width: 900px) {
          .nav-content {padding:16px 10px;}
          .hero-title {font-size: 3rem;}
          .hero-content {max-width:98vw;}
          .hero-section {padding-top:62px;}
        }
        @media(max-width: 600px) {
          .hero-title {font-size:2.2rem;}
        }
      `}</style>
      {/* NAV */}
      <nav className="nav-bar">
        <div className="nav-content">
          <a href="#" className="nav-logo">Patek Philippe</a>
          <div className="nav-links">
            <a href="#home">Accueil</a>
            <a href="#heritage">Héritage</a>
            <a href="#collections">Collections</a>
            <a href="#innovation">Innovation</a>
            <a href="#craftsmanship">Savoir-faire</a>
          </div>
        </div>
      </nav>
      {/* HERO */}
      <section id="home" className="hero-section">
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">Patek Philippe</h1>
          <div className="hero-subtitle mb-6">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</div>
          <p className="hero-quote">
            "Vous ne possédez jamais complètement une Patek Philippe.<br/>
            Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="hero-stats">
            <div className="stat-block">
              <div className="stat-number">1839</div>
              <div className="stat-label">Fondation</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">70+</div>
              <div className="stat-label">Brevets</div>
            </div>
            <div className="stat-block">
              <div className="stat-number">100%</div>
              <div className="stat-label">Indépendance</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
