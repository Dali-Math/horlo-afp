'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sun, Moon, ChevronDown, ArrowRight, BookOpen, PenTool, Search, Users, Zap, RefreshCw } from 'lucide-react';

// --- Types & Constants ---
type Theme = 'dark' | 'light';

const COLORS = {
  gold: '#d4af37',
  darkBg: '#0a0a0a',
  lightBg: '#ffffff',
  darkText: '#ffffff',
  lightText: '#0a0a0a',
  darkSecText: '#b0b0b0',
  lightSecText: '#505050',
};

const FEATURES = [
  { icon: <BookOpen size={32} />, title: "Bibliothèque Technique", desc: "Accédez à des documents techniques détaillés, schémas de montres historiques et manuels d'usinage authentiques." },
  { icon: <PenTool size={32} />, title: "Tutoriels Pratiques", desc: "Des guides pas à pas pour l'assemblage, la réparation et l'entretien de mouvements horlogers classiques." },
  { icon: <Search size={32} />, title: "Savoir-Faire Horloger", desc: "Plongez dans les techniques traditionnelles des maîtres horlogers suisses transmises de génération en génération." },
  { icon: <Users size={32} />, title: "Communauté Passionnée", desc: "Échangez avec d'autres passionnés, posez vos questions et partagez vos expériences horlogères." },
  { icon: <Zap size={32} />, title: "Accès Immédiat", desc: "Aucune attente, aucune inscription. Toutes les ressources sont immédiatement disponibles et gratuites." },
  { icon: <RefreshCw size={32} />, title: "Contenu Évolutif", desc: "Nouvelles ressources ajoutées régulièrement par notre communauté de passionnés horlogers." }
];

const STATS = [
  { value: "100%", label: "Gratuit" },
  { value: "∞", label: "Ressources" },
  { value: "0", label: "Inscription" },
  { value: "🇨🇭", label: "Qualité Suisse" }
];

// --- Main Component ---
export default function HorloLearnHome() {
  const [theme, setTheme] = useState<Theme>('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Three.js Setup ---
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pLight1 = new THREE.PointLight(0xd4af37, 1, 100);
    pLight1.position.set(5, 5, 5);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0xffffff, 0.5, 100);
    pLight2.position.set(-5, -5, 5);
    scene.add(pLight2);

    // Materials
    const gearMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Gear Factory
    const gears: { mesh: THREE.Group, speed: number }[] = [];
    const createGear = (radius: number, thickness: number, x: number, y: number, z: number, speed: number) => {
      const group = new THREE.Group();
      
      // Body
      const torus = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 16, 100), gearMaterial);
      group.add(torus);

      // Teeth
      const teethCount = 24;
      const toothGeom = new THREE.BoxGeometry(0.2, thickness * 2.2, 0.3);
      for (let i = 0; i < teethCount; i++) {
        const tooth = new THREE.Mesh(toothGeom, gearMaterial);
        const angle = (i / teethCount) * Math.PI * 2;
        tooth.position.set(Math.cos(angle) * (radius + thickness), Math.sin(angle) * (radius + thickness), 0);
        tooth.rotation.z = angle;
        group.add(tooth);
      }

      group.position.set(x, y, z);
      scene.add(group);
      gears.push({ mesh: group, speed });
    };

    // Init Gears
    createGear(3, 0.5, -6, 3, -5, 0.002);
    createGear(2.2, 0.4, 5, -3, -8, -0.003);
    createGear(4, 0.6, 8, 6, -12, 0.0015);
    createGear(1.5, 0.3, -4, -5, -2, -0.005);

    // Mouse Parallax
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Rotations
      gears.forEach(g => g.mesh.rotation.z += g.speed);

      // Parallax
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    
    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      gearMaterial.dispose();
    };
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className={`page-container ${theme}`}>
      {/* Canvas 3D Background */}
      <canvas 
        ref={canvasRef} 
        className="webgl-canvas"
        style={{ opacity: isLoaded ? (theme === 'dark' ? 0.15 : 0.1) : 0 }}
      />
      
      {/* Animated Grid Overlay */}
      <div className="grid-overlay" />

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="theme-toggle" aria-label="Changer de thème">
        {theme === 'dark' ? <Sun color={COLORS.gold} size={20} /> : <Moon color={COLORS.gold} size={20} />}
      </button>

      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge animate-fade-down" style={{ animationDelay: '0.2s' }}>
            🇨🇭 Horlogerie Suisse
          </div>
          
          <h1 className="hero-title animate-fade-down" style={{ animationDelay: '0.4s' }}>
            L'Excellence Horlogère<br />à Portée de Main
          </h1>
          
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.6s' }}>
            Une bibliothèque vivante de savoirs horlogers partagés par des passionnés. 
            Tutoriels, ressources techniques et connaissances pratiques — entièrement gratuit.
          </p>
          
          <div className="cta-group animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <a href="/theorie" className="btn btn-primary">
              Explorer les Ressources <ArrowRight size={18} />
            </a>
            <a href="/theorie" className="btn btn-secondary">
              Découvrir HorloLearn
            </a>
          </div>
        </div>

        <div className="scroll-indicator">
          <ChevronDown size={32} color={COLORS.gold} style={{ opacity: 0.6 }} />
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="stats-section">
        <div className="container stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Une Plateforme Dédiée aux <span className="gold-text">Passionnés</span>
          </h2>
          
          <div className="features-grid">
            {FEATURES.map((feat, i) => (
              <div key={i} className="feature-card">
                <div className="card-top-line" />
                <div className="feature-icon gold-text">{feat.icon}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA SECTION --- */}
      <section className="cta-section">
        <div className="cta-container glass-panel">
          <h2 className="section-title">Prêt à Plonger dans l'Univers Horloger ?</h2>
          <p className="cta-desc">
            Rejoignez une communauté grandissante. Apprenez à votre rythme, 
            sans contraintes, guidé par la pure passion de la mécanique.
          </p>
          <a href="/theorie" className="btn btn-primary btn-large">
            Commencer l'Exploration
          </a>
        </div>
      </section>

      {/* CSS-in-JS Styles */}
      <style jsx global>{`
        :root {
          --gold: ${COLORS.gold};
          --bg-dark: ${COLORS.darkBg};
          --text-dark: ${COLORS.darkText};
          --text-sec-dark: ${COLORS.darkSecText};
          --bg-light: ${COLORS.lightBg};
          --text-light: ${COLORS.lightText};
          --text-sec-light: ${COLORS.lightSecText};
        }

        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }

        .page-container {
          min-height: 100vh;
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        .page-container.dark { background-color: var(--bg-dark); color: var(--text-dark); }
        .page-container.light { background-color: var(--bg-light); color: var(--text-light); }

        .webgl-canvas {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 0;
          pointer-events: none;
          transition: opacity 1s ease;
        }

        .grid-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 200%; height: 200%;
          background-image: linear-gradient(to right, rgba(212,175,55,0.05) 1px, transparent 1px),
                          linear-gradient(to bottom, rgba(212,175,55,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 60s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        .theme-toggle {
          position: fixed;
          top: 2rem; right: 2rem;
          z-index: 100;
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--gold);
          padding: 0.75rem;
          border-radius: 50%;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .theme-toggle:hover { transform: scale(1.1); box-shadow: 0 0 15px rgba(212,175,55,0.3); }

        /* --- SECTIONS --- */
        .container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 1.5rem;
          position: relative;
          z-index: 10;
        }

        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          font-weight: 200;
          line-height: 1.1;
          margin: 0 0 1.5rem 0;
          background: linear-gradient(135deg, currentColor 30%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          opacity: 0.8;
          line-height: 1.6;
        }

        .badge {
          display: inline-block;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--gold);
          border-radius: 50px;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }

        .btn {
          padding: 1rem 2.5rem;
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        .btn-primary {
          background-color: var(--gold);
          color: #000;
          box-shadow: 0 10px 30px rgba(212,175,55,0.2);
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(212,175,55,0.4);
        }
        .btn-secondary {
          border: 1px solid currentColor;
          background: transparent;
          opacity: 0.8;
        }
        .btn-secondary:hover { opacity: 1; background: rgba(212,175,55,0.1); border-color: var(--gold); }
        .btn-large { padding: 1.25rem 3.5rem; font-size: 1.1rem; }

        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          animation: bounce 2s infinite;
        }

        /* --- STATS --- */
        .stats-section {
          padding: 6rem 2rem;
          position: relative;
          z-index: 10;
          border-top: 1px solid rgba(212,175,55,0.2);
          border-bottom: 1px solid rgba(212,175,55,0.2);
          background: rgba(0,0,0,0.02);
          backdrop-filter: blur(10px);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          text-align: center;
        }
        .stat-value {
          font-size: 3.5rem;
          color: var(--gold);
          font-weight: 200;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        .stat-label {
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.875rem;
          opacity: 0.7;
        }

        /* --- FEATURES --- */
        .features-section { padding: 8rem 0; position: relative; z-index: 10; }
        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 200;
          text-align: center;
          margin-bottom: 5rem;
        }
        .gold-text { color: var(--gold); }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
        .feature-card {
          padding: 3rem 2rem;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .dark .feature-card { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.1); }
        .light .feature-card { background: rgba(0,0,0,0.02); border-color: rgba(0,0,0,0.1); }

        .feature-card:hover { transform: translateY(-5px); border-color: var(--gold); }
        .card-top-line {
          position: absolute; top: 0; left: 0;
          width: 100%; height: 3px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .feature-card:hover .card-top-line { transform: scaleX(1); }

        .feature-icon { margin-bottom: 1.5rem; opacity: 0.9; }
        .feature-title { font-size: 1.5rem; font-weight: 400; margin-bottom: 1rem; }
        .feature-desc { line-height: 1.6; opacity: 0.7; font-weight: 300; }

        /* --- CTA FINAL --- */
        .cta-section { padding: 8rem 2rem; position: relative; z-index: 10; }
        .glass-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 5rem 2rem;
          text-align: center;
          border-radius: 30px;
          background: rgba(212,175,55,0.03);
          border: 1px solid rgba(212,175,55,0.2);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.1);
        }
        .cta-desc {
          font-size: 1.25rem;
          font-weight: 300;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
        }

        /* --- ANIMATIONS --- */
        @keyframes gridMove { from { transform: translate(0,0); } to { transform: translate(-50px,-50px); } }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-10px);} 60% {transform: translateY(-5px);} }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        .animate-fade-down { animation: fadeInDown 1s ease forwards; opacity: 0; }
        .animate-fade-up { animation: fadeInUp 1s ease forwards; opacity: 0; }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
          .hero-title { font-size: 3rem; }
          .cta-group { flex-direction: column; width: 100%; }
          .btn { width: 100%; justify-content: center; }
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 2rem 1rem; }
          .features-section, .cta-section { padding: 4rem 0; }
          .glass-panel { padding: 3rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
