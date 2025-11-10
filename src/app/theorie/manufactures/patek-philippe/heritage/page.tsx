'use client';

import { useEffect, useRef } from 'react';

export default function HeritagePage() {
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    (window as any).THREE;
    (window as any).VANTA;
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).VANTA || !(window as any).VANTA.WAVES) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js');
        }
        if (vantaBgRef.current && (window as any).VANTA?.WAVES) {
          vantaEffectRef.current = (window as any).VANTA.WAVES({
            el: vantaBgRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 300,
            minWidth: 300,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x1a2332,
            shininess: 30.0,
            waveHeight: 15.0,
            waveSpeed: 0.75,
            zoom: 0.65,
          });
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    initVanta();

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (vantaBgRef.current) {
        const speed = scrolled * 0.3;
        vantaBgRef.current.style.transform = `translateY(${speed}px)`;
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
        body {
          font-family: 'Inter', sans-serif;
          background: #f8f6f0;
        }
        .nav-bar {
          position: fixed;
          top: 72px;
          left: 0; right: 0;
          z-index: 1000;
          background: rgba(250, 248, 245, 0.95);
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
          color: #D4AF37;
          font-weight: 700;
          text-decoration: none;
        }
        .nav-links {
          display: flex; gap: 2.2rem; font-weight: 500;
          font-size: 1.08rem;
        }
        .nav-links a {
          color: #2c2c2c;
          text-decoration: none;
          position: relative;
        }
        .nav-links a:hover {
          color: #D4AF37;
        }
        .hero-section {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .vanta-bg {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          z-index: 0;
          will-change: transform;
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
          font-weight: 800;
          font-size: 5rem;
          background: linear-gradient(135deg, #D4AF37, #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-subtitle {
          font-size: 2rem;
          color: #f4e4a6;
        }
      `}</style>
      {/* === BARRE DE NAVIGATION === */}
      <nav className="nav-bar">
        <div className="nav-content">
          <a href="#" className="nav-logo">Patek Philippe</a>
          <div className="nav-links">
            <a href="/theorie/manufactures/patek-philippe">Accueil</a>
            <a href="/theorie/manufactures/patek-philippe/heritage">Héritage</a>
            <a href="/theorie/manufactures/patek-philippe/collections">Collections</a>
            <a href="/theorie/manufactures/patek-philippe/innovation">Innovation</a>
            <a href="/theorie/manufactures/patek-philippe/savoir-faire">Savoir-faire</a>
          </div>
        </div>
      </nav>

      {/* === SECTION HERO + VANTA WAVES === */}
      <section id="heritage" className="hero-section" style={{paddingTop: 110}}>
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title mb-4">Notre Héritage</h1>
          <p className="hero-subtitle mb-10">Plus de 180 ans d'excellence horlogère, façonnés par la passion, l’innovation et le savoir-faire suisse</p>
        </div>
      </section>
    </>
  );
}
