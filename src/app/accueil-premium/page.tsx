// app/page.tsx
'use client';

import React, { useEffect } from 'react';

type GearProps = {
  size?: number;
  teeth?: number;
  speed?: number; // secondes / tour
  x?: string;
  y?: string;
  opacity?: number;
  reverse?: boolean;
};

function Gear({
  size = 240,
  teeth = 24,
  speed = 40,
  x = '50%',
  y = '50%',
  opacity = 0.12,
  reverse = false,
}: GearProps) {
  const rects = Array.from({ length: teeth }, (_, i) => {
    const angle = (i / teeth) * 360;
    return (
      <rect
        key={i}
        x={96}
        y={10}
        width={8}
        height={22}
        rx={2}
        fill="#d4af37"
        transform={`rotate(${angle} 100 100)`}
        opacity={0.9}
      />
    );
  });

  return (
    <svg
      viewBox="0 0 200 200"
      className={`gear ${reverse ? 'rev' : ''}`}
      style={{
        width: size,
        height: size,
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <g className="spinner" style={{ animationDuration: `${speed}s` as any }}>
        {/* Couronnes */}
        <circle cx="100" cy="100" r="64" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.35" />
        <circle cx="100" cy="100" r="38" fill="none" stroke="#d4af37" strokeWidth="1.5" opacity="0.25" />
        {/* Dents */}
        {rects}
        {/* Noyau */}
        <circle cx="100" cy="100" r="8" fill="#d4af37" opacity="0.8" />
      </g>
    </svg>
  );
}

export default function Home() {
  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallaxe légère sur la toile d’engrenages
  useEffect(() => {
    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 1; // -0.5..0.5
      const my = (e.clientY / window.innerHeight - 0.5) * 1;
      root.style.setProperty('--mx', mx.toString());
      root.style.setProperty('--my', my.toString());
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="page">
      {/* Grille animée */}
      <div className="grid" aria-hidden />

      {/* Toile d’engrenages en arrière-plan */}
      <div className="gears-canvas" aria-hidden>
        <div className="parallax">
          <Gear size={380} teeth={24} speed={55} x="20%" y="28%" opacity={0.10} />
          <Gear size={260} teeth={24} speed={35} x="78%" y="30%" opacity={0.12} reverse />
          <Gear size={460} teeth={24} speed={80} x="85%" y="78%" opacity={0.08} />
          <Gear size={300} teeth={24} speed={45} x="25%" y="75%" opacity={0.09} reverse />
        </div>
      </div>

      {/* HERO */}
      <header className="hero">
        <div className="badge reveal">🇨🇭 Horlogerie — Éducation & Culture</div>
        <h1 className="title reveal">
          L’Excellence Horlogère, 
          <br />à Portée de Main
        </h1>
        <p className="subtitle reveal">
          Cours, dossiers culturels, gestes d’atelier et ressources de référence pour comprendre et vivre la tradition horlogère. Gratuit, ouvert à tous.
        </p>
        <div className="ctas reveal">
          <a href="/theorie" className="btn primary">Explorer les Ressources</a>
          <a href="/theorie" className="btn ghost">Découvrir la Plateforme</a>
        </div>
        <div className="scroll" aria-hidden>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </header>

      {/* STATS */}
      <section className="stats reveal">
        <div className="stat">
          <div className="val">100%</div>
          <div className="lab">Gratuit</div>
        </div>
        <div className="stat">
          <div className="val">∞</div>
          <div className="lab">Ressources</div>
        </div>
        <div className="stat">
          <div className="val">0</div>
          <div className="lab">Inscription</div>
        </div>
        <div className="stat">
          <div className="val">🇨🇭</div>
          <div className="lab">Qualité Suisse</div>
        </div>
      </section>

      {/* BLOCS ÉDUCATIFS & CULTURE */}
      <section className="blocks container">
        <h2 className="h2 reveal">Une plateforme dédiée aux passionnés</h2>
        <div className="grid-cards">
          <article className="card reveal">
            <div className="topline" />
            <h3>Cours & Théorie</h3>
            <p>Mouvements, échappements, réglage, matériaux… Des contenus structurés pour acquérir des bases solides.</p>
          </article>
          <article className="card reveal">
            <div className="topline" />
            <h3>Dossiers Culturels</h3>
            <p>Maîtres horlogers, manufactures, innovations et styles. Un regard transversal sur l’histoire et la culture horlogère.</p>
          </article>
          <article className="card reveal">
            <div className="topline" />
            <h3>Gestes & Atelier</h3>
            <p>Bonnes pratiques, outils, démontage/remontage, entretien. Les gestes expliqués avec rigueur et simplicité.</p>
          </article>
          <article className="card reveal">
            <div className="topline" />
            <h3>Ligne du Temps</h3>
            <p>Repères chronologiques: inventions clés, courants esthétiques, maisons emblématiques.</p>
          </article>
          <article className="card reveal">
            <div className="topline" />
            <h3>Glossaire & Repères</h3>
            <p>Termes techniques, repères mécaniques, nomenclatures visuelles pour décrypter un mouvement.</p>
          </article>
          <article className="card reveal">
            <div className="topline" />
            <h3>Vidéos & Archives</h3>
            <p>Sélections de vidéos, brochures d’époque et liens vers musées & collections publiques.</p>
          </article>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta container reveal">
        <h2 className="h2">Prêt à plonger dans l’univers horloger ?</h2>
        <p className="cta-p">
          Rejoignez une communauté de passionnés. Apprenez, explorez et partagez — à votre rythme, sans contrainte.
        </p>
        <a href="/theorie" className="btn primary big">Commencer l’Exploration</a>
      </section>

      <footer className="foot">
        © {new Date().getFullYear()} — Plateforme éducative et culturelle d’horlogerie. Fait avec précision & passion.
      </footer>

      {/* Styles */}
      <style jsx global>{`
        :root {
          --bg: #0a0a0a;
          --text: #ffffff;
          --text-2: #b0b0b0;
          --gold: #d4af37;
          --mx: 0; --my: 0; /* souris */
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
        .page { position: relative; min-height: 100vh; overflow-x: hidden; }
        .container { max-width: 1140px; margin: 0 auto; padding: 0 1.25rem; }

        /* Grille animée subtile */
        .grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(212,175,55,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(212,175,55,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 60s linear infinite;
          opacity: .06;
        }
        @keyframes gridMove { from { transform: translate(0,0) } to { transform: translate(-50px, -50px) } }

        /* Parallaxe engrenages */
        .gears-canvas { position: fixed; inset: 0; z-index: 0; }
        .parallax { width: 100%; height: 100%; position: relative; transform: translate(calc(var(--mx)*10px), calc(var(--my)*10px)); transition: transform .15s linear; }
        .gear .spinner { animation: turn 60s linear infinite; transform-origin: 100px 100px; }
        .gear.rev .spinner { animation-direction: reverse; }
        @keyframes turn { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }

        /* HERO */
        .hero { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 6rem 1.25rem 4rem; }
        .badge { padding: .5rem 1rem; border: 2px solid var(--gold); border-radius: 999px; font-size: .8rem; letter-spacing: 1.5px; text-transform: uppercase; backdrop-filter: blur(10px); display: inline-block; }
        .title { font-weight: 300; font-size: clamp(2.5rem, 7vw, 4rem); line-height: 1.1; margin: 1rem 0 1rem; background: linear-gradient(135deg, #fff 30%, var(--gold) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .subtitle { max-width: 680px; color: var(--text-2); font-size: 1.1rem; line-height: 1.7; margin-bottom: 1.8rem; }
        .ctas { display: flex; gap: .8rem; flex-wrap: wrap; justify-content: center; }
        .btn { padding: .9rem 1.4rem; border-radius: 12px; font-weight: 600; text-decoration: none; display: inline-flex; align-items: center; gap: .5rem; transition: transform .25s ease, box-shadow .25s ease, background .25s ease; }
        .btn.primary { background: var(--gold); color: #0a0a0a; box-shadow: 0 10px 30px rgba(212,175,55,.3); }
        .btn.primary:hover { transform: translateY(-3px); box-shadow: 0 18px 50px rgba(212,175,55,.4); }
        .btn.ghost { border: 1.5px solid rgba(255,255,255,.2); color: #fff; }
        .btn.ghost:hover { background: rgba(255,255,255,.06); transform: translateY(-2px); }
        .scroll { position: absolute; bottom: 28px; opacity: .6; animation: bounce 2s infinite; }
        @keyframes bounce { 0%,100%{ transform: translateY(0)} 50%{ transform: translateY(-10px)} }

        /* STATS */
        .stats { position: relative; z-index: 2; display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem; padding: 3.5rem 1.25rem; border-top: 1px solid rgba(255,255,255,.06); border-bottom: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02); }
        @media (min-width: 900px){ .stats { grid-template-columns: repeat(4,1fr); } }
        .stat { text-align: center; }
        .val { font-size: 3rem; color: var(--gold); font-weight: 300; line-height: 1; }
        .lab { text-transform: uppercase; letter-spacing: 2px; color: var(--text-2); font-size: .85rem; font-weight: 700; margin-top: .3rem; }

        /* BLOCS */
        .blocks { position: relative; z-index: 2; padding: 5rem 0; }
        .h2 { text-align: center; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 300; margin-bottom: 2.2rem; }
        .grid-cards { display: grid; grid-template-columns: 1fr; gap: 1.2rem; }
        @media (min-width: 700px){ .grid-cards { grid-template-columns: repeat(2,1fr); } }
        @media (min-width: 1000px){ .grid-cards { grid-template-columns: repeat(3,1fr); } }
        .card { position: relative; padding: 1.6rem; border-radius: 16px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02); transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .card:hover { transform: translateY(-5px); border-color: var(--gold); box-shadow: 0 14px 36px rgba(212,175,55,.12); }
        .card h3 { margin: 0 0 .6rem; font-weight: 600; font-size: 1.15rem; }
        .card p { margin: 0; color: var(--text-2); line-height: 1.6; }
        .topline { position: absolute; top: 0; left: 0; height: 4px; width: 100%; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform .35s ease; }
        .card:hover .topline { transform: scaleX(1); }

        /* CTA FINAL */
        .cta { position: relative; z-index: 2; text-align: center; padding: 5rem 0 6rem; }
        .cta-p { color: var(--text-2); max-width: 620px; margin: .8rem auto 1.6rem; }
        .btn.big { padding: 1.1rem 1.8rem; font-size: 1.05rem; }

        /* Reveal on scroll */
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        /* FOOTER */
        .foot { position: relative; z-index: 2; padding: 2rem; text-align: center; color: var(--text-2); font-size: .9rem; border-top: 1px solid rgba(255,255,255,.05); }
      `}</style>
    </div>
  );
}
