"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";

export default function PatekPhilippePage() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Vanta, Anime.js after window is available
    if (typeof window !== "undefined") {
      // Vanta birds
      if ((window as any).VANTA?.BIRDS && vantaRef.current) {
        (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          backgroundColor: 0xfaf8f5,
          color1: 0xd4af37,
          color2: 0xf4e4a6,
          colorMode: "lerp",
          birdSize: 1.2,
          wingSpan: 25,
          speedLimit: 3,
          separation: 20,
          alignment: 20,
          cohesion: 20,
          quantity: 3
        });
      }

      // Animate in on scroll
      setTimeout(() => {
        if ((window as any).anime) {
          // Hero
          (window as any).anime({
            targets: '.hero-title',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 1000,
            delay: 500,
            easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 800,
            easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.hero-quote',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800,
            delay: 1100,
            easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.stat-item',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: (window as any).anime.stagger(200, {start: 1400}),
            easing: 'easeOutQuart'
          });
          // Timeline
          (window as any).anime({
            targets: '.timeline-item',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 600,
            delay: (el: any, i: number) => i * 200,
            easing: 'easeOutQuart'
          });
          // Collections
          (window as any).anime({
            targets: '.collection-card',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 600,
            delay: (el: any, i: number) => i * 100,
            easing: 'easeOutQuart'
          });
          // Innovation numbers
          document.querySelectorAll('.innovation-number').forEach((number: any) => {
            const target = parseInt(number.dataset.count);
            (window as any).anime({
              targets: number,
              innerHTML: [0, target],
              duration: 2000,
              delay: 500,
              easing: 'easeOutQuart',
              round: 1
            });
          });
          // Savoir-faire/craft
          (window as any).anime({
            targets: '.craft-item',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: (el: any, i: number) => i * 200,
            easing: 'easeOutQuart'
          });
        }
      }, 1000);
    }
  }, []);

  // Smooth scroll for navigation (Next.js native anchor links work by default)
  // No need to reimplement unless you want custom behavior

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="Découvrez l'excellence absolue de Patek Philippe depuis 1839. Guide encyclopédique complet, collections historiques, innovations révolutionnaires et savoir-faire horloger suisse."/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <style jsx global>{`
          :root {
            --cream: #faf8f5;
            --gold: #d4af37;
            --gold-light: #f4e4a6;
            --charcoal: #2c2c2c;
            --charcoal-light: #404040;
            --white: #ffffff;
          }
          body {
            font-family: 'Inter', sans-serif;
            background: var(--cream);
            color: var(--charcoal);
            line-height: 1.6;
            overflow-x: hidden;
          }
          .font-display {
            font-family: 'Playfair Display', serif !important;
          }
          .hero-section {
            height: 100vh;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }
          .vanta-canvas {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%; z-index: 1;
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
            opacity: 0; transform: translateY(50px);
          }
          .hero-subtitle {
            font-size: clamp(1.2rem, 3vw, 2rem);
            font-weight: 300;
            margin-bottom: 3rem;
            color: var(--charcoal-light);
            opacity: 0; transform: translateY(30px);
          }
          .hero-quote {
            font-size: clamp(1rem, 2vw, 1.5rem);
            font-style: italic;
            margin-bottom: 4rem;
            color: var(--charcoal-light);
            max-width: 800px; margin-left: auto; margin-right: auto;
            opacity: 0; transform: translateY(30px);
          }
          .hero-stats { margin-top: 3rem; }
          .stat-item { opacity: 0; transform: translateY(30px); }
          .stat-item > div:first-child {
            font-size: 2.5rem; font-weight: 700; color: var(--gold);
          }
          .stat-item > div:last-child {
            font-size: 1rem; color: var(--charcoal-light);
          }
          .nav-container {
            position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
            background: rgba(250, 248, 245, 0.95); backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            transition: all 0.3s ease;
          }
          .nav-content { max-width: 1400px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;}
          .nav-logo { font-size: 1.5rem; font-weight: 700; color: var(--gold); text-decoration: none; }
          .nav-links { display: flex; list-style: none; gap: 2rem; }
          .nav-links a { text-decoration: none; color: var(--charcoal); font-weight: 500; transition: color 0.3s; position: relative;}
          .nav-links a:hover { color: var(--gold);}
          .nav-links a::after { content:''; position: absolute; bottom:-5px; left:0; width:0; height:2px; background:var(--gold); transition:width 0.3s;}
          .nav-links a:hover::after { width:100%;}
          @media (max-width:768px) { .nav-links { display: none; } }

          /* Plus styles grid, block, etc... (copie le reste selon besoin, tout est possible en Next CSS global) */
        `}</style>
      </Head>

      {/* === Navbar === */}
      <nav className="nav-container">
        <div className="nav-content">
          <a href="#" className="nav-logo font-display">Patek Philippe</a>
          <ul className="nav-links">
            <li><a href="#home">Accueil</a></li>
            <li><a href="#heritage">Héritage</a></li>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#innovation">Innovation</a></li>
            <li><a href="#craftsmanship">Savoir-faire</a></li>
          </ul>
        </div>
      </nav>

      {/* === Hero Section + Vanta Canvas === */}
      <section id="home" className="hero-section">
        <div ref={vantaRef} id="vanta-bg" className="vanta-canvas" />
        <div className="hero-content">
          <h1 className="hero-title font-display">Patek Philippe</h1>
          <p className="hero-subtitle">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</p>
          <p className="hero-quote">
            "Vous ne possédez jamais complètement une Patek Philippe. 
            Vous en êtes le gardien pour les générations futures."
          </p>
          <div className="hero-stats">
            <div style={{display: "flex", justifyContent: "center", gap: "3rem", marginTop: "3rem"}}>
              <div style={{textAlign:"center"}} className="stat-item">
                <div>1839</div>
                <div>Fondation</div>
              </div>
              <div style={{textAlign:"center"}} className="stat-item">
                <div>70+</div>
                <div>Brevets</div>
              </div>
              <div style={{textAlign:"center"}} className="stat-item">
                <div>100%</div>
                <div>Indépendance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Le reste des sections (timeline, collections, innovation, savoir-faire, CTA, footer) */}
      {/* ... Ajoute chaque bloc strictement selon la structure du HTML donné ... */}
      {/* ... Place chaque grid/class/styling dans les balises appropriées, reprend le même HTML exact ... */}
    </>
  );
}
