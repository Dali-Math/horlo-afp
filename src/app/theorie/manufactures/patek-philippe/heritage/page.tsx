'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export default function HeritagePage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });

    const initVanta = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).VANTA) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js');
        }
        if (vantaRef.current && (window as any).VANTA) {
          vantaEffect.current = (window as any).VANTA.WAVES({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x1a2332,
            shininess: 30,
            waveHeight: 15,
            waveSpeed: 0.75,
            zoom: 0.65,
          });
        }
      } catch (err) {
        console.error('Erreur VANTA :', err);
      }
    };

    initVanta();

    // Scroll reveal animations
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.scroll-reveal, .timeline-item').forEach((el) => {
      revealObserver.observe(el);
    });

    // Parallax background
    const onScroll = () => {
      const scrolled = window.scrollY * 0.3;
      if (vantaRef.current) vantaRef.current.style.transform = `translateY(${scrolled}px)`;
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
      window.removeEventListener('scroll', onScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" />

      <style jsx global>{`
        :root {
          --gold: #d4af37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
        }

        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
        }

        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          will-change: transform;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline {
          position: relative;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--gold), rgba(212, 175, 55, 0.3));
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .timeline-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 2rem;
          width: 20px;
          height: 20px;
          background: var(--gold);
          border: 4px solid white;
          border-radius: 50%;
          transform: translateX(-50%);
        }

        .timeline-year {
          position: absolute;
          left: 50%;
          top: 0;
          background: var(--gold);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          transform: translateX(-50%);
        }
      `}</style>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div ref={vantaRef} className="vanta-bg" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent font-serif">
            Notre<br />Héritage
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto">
            Plus de 180 ans d'excellence horlogère, façonnés par la passion, l'innovation et le savoir-faire suisse.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 scroll-reveal">
            Chronologie d’Excellence
          </h2>
          <div className="timeline">
            {[1839, 1845, 1851, 1868, 1932, 1976, 1989, 1999, 2014].map((year) => (
              <div key={year} className="timeline-item scroll-reveal">
                <div className="timeline-year">{year}</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Événement {year}</h3>
                  <p className="text-gray-600 mb-4">
                    Description de l’événement {year}. Contenu simplifié pour test.
                  </p>
                  <div className="text-yellow-600">
                    <i className="fas fa-crown mr-2" />
                    Détail historique
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-center text-white">
        <blockquote className="max-w-3xl mx-auto text-2xl md:text-3xl italic scroll-reveal">
          "Vous ne possédez jamais réellement une montre Patek Philippe. Vous en assurez simplement la garde pour les
          générations suivantes."
        </blockquote>
        <div className="text-yellow-500 mt-6 font-semibold">— Slogan Patek Philippe</div>
      </section>
    </>
  );
}
