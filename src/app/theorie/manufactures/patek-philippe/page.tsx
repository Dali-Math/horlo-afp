"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";

export default function Home() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any = null;
    if (typeof window !== "undefined" && (window as any).VANTA && (window as any).VANTA.BIRDS) {
      effect = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        backgroundColor: 0xf8f6f0,
        color1: 0xd4af37,
        color2: 0x1a2332,
        birdSize: 1.3,
        wingSpan: 25,
        quantity: 5,
        speedLimit: 4,
        alignment: 47,
        cohesion: 20,
        separation: 32
      });
    }
    return () => { if (effect) effect.destroy(); };
  }, []);

  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <style>{`
          body { background: #f8f6f0; font-family:'Inter',sans-serif;}
          .font-playfair { font-family: 'Playfair Display', serif; }
          .gold { color: #D4AF37; }
          .hero-title { font-size: 5rem; line-height: 1; font-family: 'Playfair Display',serif; color: #D4AF37;}
          .metric { font-size: 2rem; font-weight: 700;}
          .metric-caption { font-size: 1rem; color: #555; }
        `}</style>
      </Head>
      {/* Menu */}
      <nav className="flex justify-between items-center px-10 py-5 bg-[#f8f6f0] border-b-[1px] border-[#F0E9D8]">
        <div className="font-playfair text-xl font-bold gold">Patek Philippe</div>
        <div className="flex space-x-8 text-sm">
          <a href="#home" className="hover:text-[#D4AF37]">Accueil</a>
          <a href="#heritage" className="hover:text-[#D4AF37]">Héritage</a>
          <a href="#collections" className="hover:text-[#D4AF37]">Collections</a>
          <a href="#innovation" className="hover:text-[#D4AF37]">Innovation</a>
          <a href="#craftsmanship" className="hover:text-[#D4AF37]">Savoir-faire</a>
        </div>
      </nav>
      {/* HERO -- Vanta Birds en fond */}
      <section ref={vantaRef} className="relative flex flex-col items-center justify-center min-h-[75vh] w-full overflow-hidden select-none bg-[#f8f6f0] pb-32 -mb-32">
        <div className="absolute inset-0 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center pt-28">
          {/* Grand titre logo */}
          <h1 className="hero-title font-playfair font-bold mb-2 select-none" style={{letterSpacing: '-1.5px'}}>Patek Philippe</h1>
          <div className="uppercase text-xl md:text-2xl tracking-wide mb-8 text-[#222]">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</div>
          <div className="italic text-lg text-[#444] mb-8 text-center max-w-2xl">
            "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
          </div>
          {/* Metrics */}
          <div className="flex gap-12 mt-4 mb-2">
            <div className="flex flex-col items-center">
              <span className="metric gold">1839</span>
              <div className="metric-caption">Fondation</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="metric gold">70+</span>
              <div className="metric-caption">Brevets</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="metric gold">100%</span>
              <div className="metric-caption">Indépendance</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
