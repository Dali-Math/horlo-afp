// app/savoir-faire/page.tsx
'use client';

import { useEffect, useRef } from 'react';

// Typings globaux pour les scripts CDN
declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export default function SavoirFairePage() {
  // Références pour le cleanup
  const script1Ref = useRef<HTMLScriptElement | null>(null);
  const script2Ref = useRef<HTMLScriptElement | null>(null);
  const vantaInstanceRef = useRef<any>(null);
  const threeReadyRef = useRef(false);

  useEffect(() => {
    // 1. Chargement sécurisé de Three.js
    const loadScripts = async () => {
      return new Promise<void>((resolve) => {
        if (window.THREE) {
          threeReadyRef.current = true;
          resolve();
          return;
        }

        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script1.async = true;
        
        script1.onload = () => {
          threeReadyRef.current = true;
          resolve();
        };

        script1.onerror = () => {
          console.error('Erreur: Impossible de charger THREE.js');
          resolve();
        };

        document.body.appendChild(script1);
        script1Ref.current = script1;
      });
    };

    // 2. Initialisation de Vanta.js
    const initVanta = () => {
      if (!window.VANTA || !threeReadyRef.current) return;

      const vantaElement = document.getElementById('vanta-bg');
      if (!vantaElement) return;

      try {
        vantaInstanceRef.current = window.VANTA.TOPOLOGY({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0xd4af37,
          backgroundColor: 0xf8f6f0
        });
      } catch (error) {
        console.error('Erreur initialisation VANTA:', error);
      }
    };

    // 3. Chargement du script Vanta
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js';
    script2.async = true;
    
    script2.onload = () => setTimeout(initVanta, 150);
    script2.onerror = () => console.error('Erreur: Impossible de charger VANTA');

    document.body.appendChild(script2);
    script2Ref.current = script2;

    // 4. Initialisation de la scène 3D
    const initThreeJS = () => {
      const canvas = document.getElementById('watchCanvas') as HTMLCanvasElement;
      if (!canvas || !window.THREE) return;

      try {
        const scene = new window.THREE.Scene();
        scene.background = new window.THREE.Color(0x1f2937);
        
        const camera = new window.THREE.PerspectiveCamera(
          45,
          canvas.clientWidth / canvas.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 10);
        
        const renderer = new window.THREE.WebGLRenderer({ 
          canvas,
          antialias: true,
          alpha: true 
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true;
        
        // Lighting
        const ambientLight = new window.THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const mainLight = new window.THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        scene.add(mainLight);
        
        const rimLight = new window.THREE.PointLight(0xd4af37, 1, 100);
        rimLight.position.set(-5, 5, 5);
        scene.add(rimLight);
        
        // Montre 3D complète
        const watchGroup = new window.THREE.Group();
        
        // Boîtier
        const caseGeometry = new window.THREE.CylinderGeometry(2, 2, 0.5, 32);
        const caseMaterial = new window.THREE.MeshStandardMaterial({ 
          color: 0xc0c0c0,
          metalness: 0.9,
          roughness: 0.1
        });
        const watchCase = new window.THREE.Mesh(caseGeometry, caseMaterial);
        watchCase.castShadow = true;
        watchCase.userData = { explodeOffset: new window.THREE.Vector3(0, -2, 0) };
        watchGroup.add(watchCase);
        
        // Mouvement
        const movementGeometry = new window.THREE.CylinderGeometry(1.8, 1.8, 0.3, 32);
        const movementMaterial = new window.THREE.MeshStandardMaterial({ 
          color: 0xd4af37,
          metalness: 0.8,
          roughness: 0.2
        });
        const movement = new window.THREE.Mesh(movementGeometry, movementMaterial);
        movement.position.y = 0.4;
        movement.castShadow = true;
        movement.userData = { explodeOffset: new window.THREE.Vector3(0, 2, 0) };
        watchGroup.add(movement);
        
        // Engrenages
        const gearGeometry = new window.THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
        const gearMaterial = new window.THREE.MeshStandardMaterial({ 
          color: 0xffd700,
          metalness: 0.9,
          roughness: 0.1
        });
        
        const gearPositions = [
          { x: -0.8, y: 0.5, z: 0.5 },
          { x: 0.8, y: 0.5, z: 0.5 },
          { x: 0, y: 0.5, z: -0.8 },
          { x: -0.5, y: 0.5, z: -0.3 },
          { x: 0.5, y: 0.5, z: 0.3 }
        ];
        
        gearPositions.forEach((pos, index) => {
          const gear = new window.THREE.Mesh(gearGeometry, gearMaterial);
          gear.position.set(pos.x, pos.y, pos.z);
          gear.rotation.x = Math.PI / 2;
          gear.castShadow = true;
          gear.userData = { 
            explodeOffset: new window.THREE.Vector3(pos.x * 2, 3, pos.z * 2),
            rotationSpeed: 0.02 * (index % 2 === 0 ? 1 : -1)
          };
          watchGroup.add(gear);
        });
        
        // Cadran
        const dialGeometry = new window.THREE.CylinderGeometry(1.9, 1.9, 0.05, 32);
        const dialMaterial = new window.THREE.MeshStandardMaterial({ 
          color: 0xf8f6f0,
          metalness: 0.1,
          roughness: 0.8
        });
        const dial = new window.THREE.Mesh(dialGeometry, dialMaterial);
        dial.position.y = 0.75;
        dial.castShadow = true;
        dial.userData = { explodeOffset: new window.THREE.Vector3(0, 4, 0) };
        watchGroup.add(dial);
        
        // Index heures
        for (let i = 0; i < 12; i++) {
          const markerGeometry = new window.THREE.BoxGeometry(0.1, 0.2, 0.02);
          const markerMaterial = new window.THREE.MeshStandardMaterial({ 
            color: 0xd4af37,
            metalness: 0.8
          });
          const marker = new window.THREE.Mesh(markerGeometry, markerMaterial);
          const angle = (i / 12) * Math.PI * 2;
          marker.position.set(
            Math.sin(angle) * 1.5,
            0.8,
            Math.cos(angle) * 1.5
          );
          marker.rotation.y = -angle;
          marker.userData = { explodeOffset: new window.THREE.Vector3(0, 4, 0) };
          watchGroup.add(marker);
        }
        
        // Aiguilles
        const hourHandGeometry = new window.THREE.BoxGeometry(0.08, 0.8, 0.03);
        const minuteHandGeometry = new window.THREE.BoxGeometry(0.06, 1.2, 0.03);
        const handMaterial = new window.THREE.MeshStandardMaterial({ 
          color: 0x2c2c2c,
          metalness: 0.5
        });
        
        const hourHand = new window.THREE.Mesh(hourHandGeometry, handMaterial);
        hourHand.position.set(0, 0.85, 0.4);
        hourHand.rotation.z = Math.PI / 6;
        hourHand.userData = { explodeOffset: new window.THREE.Vector3(0, 5, 0) };
        watchGroup.add(hourHand);
        
        const minuteHand = new window.THREE.Mesh(minuteHandGeometry, handMaterial);
        minuteHand.position.set(0, 0.85, 0.6);
        minuteHand.rotation.z = Math.PI / 3;
        minuteHand.userData = { explodeOffset: new window.THREE.Vector3(0, 5.5, 0) };
        watchGroup.add(minuteHand);
        
        // Verre saphir
        const crystalGeometry = new window.THREE.CylinderGeometry(2.05, 2.05, 0.1, 32);
        const crystalMaterial = new window.THREE.MeshPhysicalMaterial({ 
          color: 0xffffff,
          metalness: 0,
          roughness: 0,
          transmission: 0.9,
          thickness: 0.5,
          transparent: true,
          opacity: 0.3
        });
        const crystal = new window.THREE.Mesh(crystalGeometry, crystalMaterial);
        crystal.position.y = 1;
        crystal.userData = { explodeOffset: new window.THREE.Vector3(0, 6, 0) };
        watchGroup.add(crystal);
        
        scene.add(watchGroup);
        
        // Contrôles et animation
        let isRotating = true;
        let isExploded = false;
        
        // Boutons
        const rotateBtn = document.getElementById('rotateBtn');
        const explodeBtn = document.getElementById('explodeBtn');
        const resetBtn = document.getElementById('resetBtn');
        
        rotateBtn?.addEventListener('click', () => {
          isRotating = !isRotating;
          rotateBtn.classList.toggle('bg-gray-700');
          rotateBtn?.classList.toggle('bg-yellow-600');
        });
        
        explodeBtn?.addEventListener('click', () => {
          isExploded = !isExploded;
        });
        
        resetBtn?.addEventListener('click', () => {
          watchGroup.rotation.set(0, 0, 0);
          isExploded = false;
          isRotating = true;
          rotateBtn?.classList.remove('bg-gray-700');
          rotateBtn?.classList.add('bg-yellow-600');
        });
        
        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);
          
          if (isRotating) {
            watchGroup.rotation.y += 0.005;
          }
          
          watchGroup.children.forEach((child: any) => {
            if (child.userData.rotationSpeed) {
              child.rotation.z += child.userData.rotationSpeed;
            }
            
            if (child.userData.explodeOffset) {
              const targetPos = isExploded ? child.userData.explodeOffset : new window.THREE.Vector3(0, child.position.y > 0.9 ? child.position.y : 0, 0);
              if (child.position.y < 0.9 || isExploded) {
                child.position.x += (targetPos.x - child.position.x) * 0.05;
                child.position.z += (targetPos.z - child.position.z) * 0.05;
              }
              if (isExploded) {
                child.position.y += (targetPos.y - child.position.y) * 0.05;
              }
            }
          });
          
          renderer.render(scene, camera);
        };
        
        animate();
        
        // Redimensionnement
        const handleResize = () => {
          if (!canvas) return;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
      } catch (error) {
        console.error('Erreur dans initThreeJS:', error);
      }
    };

    // 5. Animations au scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      scrollObserver.observe(el);
    });

    // 6. Lancement
    loadScripts().then(() => {
      setTimeout(() => {
        initThreeJS();
      }, 300);
    });

    // 7. Cleanup
    return () => {
      if (vantaInstanceRef.current) {
        vantaInstanceRef.current.destroy();
      }
      script1Ref.current?.remove();
      script2Ref.current?.remove();
      window.removeEventListener('resize', () => {});
    };
  }, []);

  return (
    <div className="font-sans bg-cream overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
          --silver: #e8e8e8;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          overflow-x: hidden;
        }
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
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
        
        .craft-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .craft-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .craft-card:hover::before {
          left: 100%;
        }
        
        .craft-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .process-step {
          position: relative;
          padding: 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }
        
        .process-step:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .process-step::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid white;
        }
        
        .process-line {
          position: absolute;
          top: 50%;
          right: -2rem;
          width: 4rem;
          height: 2px;
          background: var(--gold);
          transform: translateY(-50%);
        }
        
        .process-line::after {
          content: '';
          position: absolute;
          right: -5px;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 8px solid var(--gold);
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        
        .process-step:last-child .process-line {
          display: none;
        }
        
        .mastery-indicator {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .mastery-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--gold), #f4d03f);
          border-radius: 4px;
          transition: width 2s ease;
          position: relative;
        }
        
        .mastery-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @media (max-width: 768px) {
          .process-line {
            display: none;
          }
          
          .process-step {
            margin-bottom: 2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Le Savoir-Faire<br />Suisse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Chaque montre Patek Philippe est le fruit de siècles de tradition horlogère et d'un artisanat d'exception
          </p>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Maîtres Horlogers</h2>
            <p className="text-xl text-gray-600">Des artisans dévoués dont l'expertise se transmet de génération en génération</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&h=600&fit=crop" 
                     alt="Maître horloger au travail" 
                     className="rounded-lg shadow-2xl w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">10+</div>
                  <div className="text-sm text-gray-600">Années de formation</div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">L'Art de la Perfection</h3>
              <p className="text-xl text-gray-600 mb-8">
                Chaque maître horloger Patek Philippe passe par une formation rigoureuse de plus de dix ans. 
                Cette expertise approfondie garantit que chaque composant, chaque ajustement, 
                chaque finition atteigne la perfection absolue.
              </p>
              <div className="space-y-4">
                {[
                  'Formation de 10 à 15 ans minimum',
                  'Apprentissage auprès de maîtres confirmés',
                  'Certification interne Patek Philippe',
                  'Formation continue tout au long de la carrière'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-zinc-950 min-h-[900px]">
  {/* Éclats dorés subtils */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute top-20 left-32 w-72 h-72 rounded-full bg-yellow-500/10 blur-[90px] animate-pulse"></div>
    <div className="absolute bottom-8 right-56 w-80 h-80 rounded-full bg-amber-400/10 blur-[120px] animate-pulse" style={{animationDelay:'2s'}}></div>
  </div>

  {/* Overlay glassmorphism */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/0 to-yellow-600/5 pointer-events-none"></div>

  <div className="relative max-w-7xl mx-auto z-10 px-6">
    {/* En-tête */}
    <div className="text-center mb-20 select-none">
      <div className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-gradient-to-r from-yellow-600/20 to-yellow-100/5 border border-yellow-600/30 backdrop-blur-md shadow-lg">
        <i className="fas fa-gem text-yellow-400 text-xl"></i>
        <span className="text-xs font-semibold text-yellow-600 uppercase tracking-widest">Atelier Horloger</span>
        <i className="fas fa-gem text-yellow-400 text-xl"></i>
      </div>
      <h2 className="text-6xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 font-extrabold italic mt-8 mb-6 tracking-tight drop-shadow-xl">La Naissance d’une Légende</h2>
      <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
        Une expérience immersive inspirée des ateliers suisses, <span className="text-yellow-400 font-semibold">où l’exception rencontre la précision</span>.
      </p>
    </div>

    {/* Zone 3D & UI */}
    <div className="relative rounded-[2.2rem] overflow-visible shadow-2xl border border-yellow-700/15 bg-gradient-to-b from-gray-950 via-gray-900 to-black" style={{height:'700px'}}>
      {/* Canvas 3D */}
      <canvas id="watchCanvas" className="w-full h-full rounded-[2rem] bg-gradient-to-br from-gray-900 via-zinc-900 to-black"></canvas>
      {/* Badge composant */}
      <div className="absolute top-9 left-8 bg-black/40 border border-yellow-600/25 backdrop-blur-xl rounded-2xl px-8 py-5 shadow-lg flex flex-col items-baseline gap-0">
        <span className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-yellow-500 uppercase mb-1">
          <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2 animate-pulse"></span>
          Assemblage
        </span>
        <span className="text-3xl font-bold text-white">
          <span id="componentCount">250</span>
          <span className="text-xl text-gray-400">/250</span>
        </span>
        <span className="text-xs text-yellow-100 mt-1">Composants</span>
      </div>
      {/* Signature manufacture */}
      <div className="absolute top-9 right-8 bg-black/60 border border-yellow-600/15 backdrop-blur-2xl rounded-2xl px-7 py-5 shadow-md text-right">
        <span className="text-[10px] text-gray-400 uppercase">Manufacture</span>
        <div className="text-2xl font-serif italic text-white leading-none mt-1">Genève</div>
        <span className="block mt-1 text-xs text-red-400 font-semibold tracking-widest">• SWISS MADE</span>
      </div>
      {/* Contrôles */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/50 border border-yellow-100/10 backdrop-blur-2xl rounded-full px-10 py-5 shadow-2xl flex items-center gap-10">
        {[
          {icon:"fa-sync-alt", label:"Faire tourner", id:"rotateBtn"},
          {icon:"fa-expand-arrows-alt", label:"Décomposer", id:"explodeBtn"},
          {icon:"fa-redo", label:"Réinitialiser", id:"resetBtn"}
        ].map(btn => (
          <button key={btn.id} id={btn.id} className="flex flex-col items-center group">
            <span className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-2 shadow-lg transition-transform duration-300 group-hover:scale-110 border-2 border-yellow-200/5">
              <i className={`fas ${btn.icon} text-white text-xl group-hover:rotate-12 transition-all`}></i>
            </span>
            <span className="text-xs text-yellow-100 font-light tracking-wider drop-shadow">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>

    {/* Statistiques */}
    <div className="grid md:grid-cols-3 gap-12 mt-20">
      {[
        {icon:'fa-cogs',value:'250+',label:'Composants',desc:'Tous ajustés au micron'},
        {icon:'fa-crown',value:'50',label:'Maîtres artisans',desc:'Fiers héritiers du savoir-faire'},
        {icon:'fa-hourglass',value:'9',label:'Mois',desc:'Pour chaque chef d’œuvre'}
      ].map(stat=>(
        <div key={stat.label} className="text-center p-10 rounded-2xl bg-gradient-to-b from-yellow-100/5 via-black/60 to-yellow-200/0 border border-yellow-600/10 hover:border-yellow-400/30 shadow-lg group transition-all duration-500">
          <i className={`fas ${stat.icon} text-yellow-400 text-5xl mb-6 shadow-inner`}></i>
          <div className="text-4xl font-extrabold text-yellow-300 mb-2 tracking-tight group-hover:text-yellow-400 transition-colors">{stat.value}</div>
          <div className="text-base font-semibold text-gray-100 uppercase tracking-widest mb-2">{stat.label}</div>
          <div className="text-xs font-light text-gray-400">{stat.desc}</div>
        </div>
      ))}
    </div>
    {/* Bandeau citation */}
    <div className="mt-20 text-center">
      <p className="italic text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto drop-shadow">
        « La véritable excellence se révèle dans l’attention portée à chaque détail. »
      </p>
    </div>
  </div>
</section>


      {/* Manufacturing Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Processus de Fabrication</h2>
            <p className="text-xl text-gray-600">Chaque étape du processus est réalisée avec une précision millimétrée</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Conception', desc: 'Les ingénieurs et designers créent des plans détaillés pour chaque composant, optimisant à la fois la fonctionnalité et l\'esthétique.' },
              { num: 2, title: 'Fabrication', desc: 'Chaque composant est fabriqué à la main ou avec des machines spécialisées selon des tolérances extrêmement strictes.' },
              { num: 3, title: 'Assemblage', desc: 'Les maîtres horlogers assemblent chaque mouvement avec une précision chirurgicale, ajustant chaque pièce à la perfection.' },
              { num: 4, title: 'Contrôle Qualité', desc: 'Des tests rigoureux garantissent que chaque montre répond aux standards d\'excellence Patek Philippe avant d\'être certifiée.' }
            ].map((step, idx) => (
              <div key={idx} className="process-step scroll-reveal">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-center">{step.desc}</p>
                <div className="process-line"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Domaines d'Expertise</h2>
            <p className="text-xl text-gray-600">Les spécialités qui définissent l'excellence Patek Philippe</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'cogs', title: 'Mécanique Fine', desc: 'La création de mouvements mécaniques complexes avec des complications sophistiquées qui repoussent les limites de l\'ingénierie horlogère.', level: 'Précision', value: '99.99%', progress: '100%' },
              { icon: 'gem', title: 'Joaillerie', desc: 'Le sertissage de diamants et pierres précieuses avec une précision exceptionnelle, transformant chaque montre en une œuvre d\'art précieuse.', level: 'Qualité', value: 'IF/VVS', progress: '95%' },
              { icon: 'palette', title: 'Arts Décoratifs', desc: 'Les techniques traditionnelles de décoration comme le guillochage, l\'émail et la gravure qui donnent à chaque montre son caractère unique.', level: 'Complexité', value: 'Master', progress: '90%' }
            ].map((area, idx) => (
              <div key={idx} className="craft-card rounded-xl p-8 scroll-reveal">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas fa-${area.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
                <p className="text-gray-600 text-center mb-6">{area.desc}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{area.level}</span>
                    <span className="text-sm font-semibold text-gray-900">{area.value}</span>
                  </div>
                  <div className="mastery-indicator">
                    <div className="mastery-progress" style={{ width: area.progress }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Standards de Qualité</h2>
              <p className="text-xl text-gray-600 mb-8">
                Chaque montre Patek Philippe doit répondre à des critères de qualité exceptionnels 
                avant d'être certifiée et livrée à nos clients.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Tests de Précision', desc: '24 jours de tests chronométriques rigoureux' },
                  { title: 'Contrôle Esthétique', desc: 'Inspection minutieuse de chaque détail visuel' },
                  { title: 'Tests d\'Étanchéité', desc: 'Vérification de la résistance à l\'eau et à l\'humidité' },
                  { title: 'Certification Finale', desc: 'Poinçon Patek Philippe et certificat d\'authenticité' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop" 
                     alt="Contrôle qualité" 
                     className="rounded-lg shadow-2xl w-full" />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Certifié</div>
                  <div className="text-xs">Patek Philippe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Vivez l'Expérience du Savoir-Faire</h2>
          <p className="text-xl text-gray-300 mb-8">
            Visitez notre manufacture à Genève et découvrez l'artisanat exceptionnel qui donne vie à chaque montre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Réserver une visite
            </button>
            <button onClick={() => window.location.href = '/innovation'} className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Découvrir l'innovation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              {['instagram', 'facebook', 'twitter', 'youtube'].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
