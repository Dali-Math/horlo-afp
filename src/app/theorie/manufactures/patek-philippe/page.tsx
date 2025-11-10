'use client';

import { useEffect, useRef } from 'react';

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
        const speed = scrolled * 0.3; // 0.3 for subtle parallax, adjust as needed
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
        body {
          font-family: 'Inter', sans-serif;
          background: #f8f6f0;
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
      `}</style>
      <section id="home" className="hero-section">
        {/* VANTA Birds Background */}
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title mb-4">Patek Philippe</h1>
          <p className="text-2xl text-gray-700 mb-10">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</p>
          <p className="italic text-gray-600 max-w-xl mx-auto mb-6">
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </p>
        </div>
      </section>
    </>
  );
}
