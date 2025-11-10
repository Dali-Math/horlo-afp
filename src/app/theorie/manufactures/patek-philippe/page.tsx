"use client";
import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).VANTA?.BIRDS && vantaRef.current) {
        (window as any).VANTA.BIRDS({
          el: vantaRef.current,
          backgroundColor: 0xfaf8f5,
          color1: 0xd4af37,
          color2: 0xf4e4a6,
          birdSize: 1.2,
          wingSpan: 25,
          quantity: 3
        });
      }
      setTimeout(() => {
        if ((window as any).anime) {
          (window as any).anime({
            targets: '.hero-title', opacity: [0, 1], translateY: [50, 0],
            duration: 1000, delay: 500, easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.hero-subtitle', opacity: [0, 1], translateY: [30, 0],
            duration: 800, delay: 800, easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.hero-quote', opacity: [0, 1], translateY: [30, 0],
            duration: 800, delay: 1100, easing: 'easeOutQuart'
          });
          (window as any).anime({
            targets: '.stat-item', opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: (window as any).anime.stagger(200, {start: 1400}),
            easing: 'easeOutQuart'
          });
        }
      }, 1000);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <style jsx global>{`
          :root{
            --cream:#faf8f5;
            --gold:#d4af37;
            --gold-light:#f4e4a6; --charcoal:#2c2c2c; --charcoal-light:#404040; --white:#fff;
          }
          body{font-family:'Inter',sans-serif; background:var(--cream);}
          .font-display{font-family:'Playfair Display',serif;}
          .hero-section{height:100vh; position:relative; display:flex; align-items:center; justify-content:center;}
          .vanta-canvas{position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;}
          .hero-content{position:relative;z-index:10;text-align:center;max-width:1200px;padding:0 2rem;}
          .hero-title{
            font-size:clamp(3rem,8vw,8rem);font-weight:800;line-height:.9;margin-bottom:2rem;
            background:linear-gradient(135deg,var(--gold),var(--gold-light));-webkit-background-clip:text;
            -webkit-text-fill-color:transparent;background-clip:text;opacity:0;transform:translateY(50px);
          }
          .hero-subtitle{font-size:clamp(1.2rem,3vw,2rem);font-weight:300;margin-bottom:3rem;color:var(--charcoal-light);opacity:0;transform:translateY(30px);}
          .hero-quote{font-size:clamp(1rem,2vw,1.5rem);font-style:italic;margin-bottom:4rem;color:var(--charcoal-light);max-width:800px;margin-left:auto;margin-right:auto;opacity:0;transform:translateY(30px);}
          .hero-stats{margin-top:3rem;}
          .stat-item{opacity:0;transform:translateY(30px);}
          .stat-item>div:first-child{font-size:2.5rem;font-weight:700;color:var(--gold);}
          .stat-item>div:last-child{font-size:1rem;color:var(--charcoal-light);}
        `}</style>
      </Head>
      {/* Nav */}
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
      {/* Hero */}
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
    </>
  );
}
