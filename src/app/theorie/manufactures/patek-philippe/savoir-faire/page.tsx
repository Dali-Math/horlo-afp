'use client';

import { useEffect } from 'react';

export default function CraftsmanshipPage() {
  useEffect(() => {
    // Load external scripts
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js';
    script2.async = true;
    
    let vantaInstance: any;

    script2.onload = () => {
      if (typeof window !== 'undefined' && (window as any).VANTA) {
        vantaInstance = (window as any).VANTA.TOPOLOGY({
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
      }
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    const handleMobileMenu = () => {
      mobileMenu?.classList.toggle('hidden');
    };
    
    mobileMenuBtn?.addEventListener('click', handleMobileMenu);

    // 3D Watch Assembly Animation
    const canvas = document.getElementById('watchCanvas') as HTMLCanvasElement;
    if (canvas) {
      const scene = new (window as any).THREE.Scene();
      scene.background = new (window as any).THREE.Color(0x1f2937);
      
      const camera = new (window as any).THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 10);
      
      const renderer = new (window as any).THREE.WebGLRenderer({ 
        canvas,
        antialias: true,
        alpha: true 
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.shadowMap.enabled = true;
      
      // Lighting
      const ambientLight = new (window as any).THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const mainLight = new (window as any).THREE.DirectionalLight(0xffffff, 0.8);
      mainLight.position.set(5, 10, 7);
      mainLight.castShadow = true;
      scene.add(mainLight);
      
      const rimLight = new (window as any).THREE.PointLight(0xd4af37, 1, 100);
      rimLight.position.set(-5, 5, 5);
      scene.add(rimLight);
      
      // Create watch components
      const watchGroup = new (window as any).THREE.Group();
      
      // Base/Case
      const caseGeometry = new (window as any).THREE.CylinderGeometry(2, 2, 0.5, 32);
      const caseMaterial = new (window as any).THREE.MeshStandardMaterial({ 
        color: 0xc0c0c0,
        metalness: 0.9,
        roughness: 0.1
      });
      const watchCase = new (window as any).THREE.Mesh(caseGeometry, caseMaterial);
      watchCase.castShadow = true;
      watchCase.userData = { explodeOffset: new (window as any).THREE.Vector3(0, -2, 0) };
      watchGroup.add(watchCase);
      
      // Movement/Mechanism
      const movementGeometry = new (window as any).THREE.CylinderGeometry(1.8, 1.8, 0.3, 32);
      const movementMaterial = new (window as any).THREE.MeshStandardMaterial({ 
        color: 0xd4af37,
        metalness: 0.8,
        roughness: 0.2
      });
      const movement = new (window as any).THREE.Mesh(movementGeometry, movementMaterial);
      movement.position.y = 0.4;
      movement.castShadow = true;
      movement.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 2, 0) };
      watchGroup.add(movement);
      
      // Gears (multiple small gears)
      const gearGeometry = new (window as any).THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
      const gearMaterial = new (window as any).THREE.MeshStandardMaterial({ 
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
        const gear = new (window as any).THREE.Mesh(gearGeometry, gearMaterial);
        gear.position.set(pos.x, pos.y, pos.z);
        gear.rotation.x = Math.PI / 2;
        gear.castShadow = true;
        gear.userData = { 
          explodeOffset: new (window as any).THREE.Vector3(pos.x * 2, 3, pos.z * 2),
          rotationSpeed: 0.02 * (index % 2 === 0 ? 1 : -1)
        };
        watchGroup.add(gear);
      });
      
      // Dial
      const dialGeometry = new (window as any).THREE.CylinderGeometry(1.9, 1.9, 0.05, 32);
      const dialMaterial = new (window as any).THREE.MeshStandardMaterial({ 
        color: 0xf8f6f0,
        metalness: 0.1,
        roughness: 0.8
      });
      const dial = new (window as any).THREE.Mesh(dialGeometry, dialMaterial);
      dial.position.y = 0.75;
      dial.castShadow = true;
      dial.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 4, 0) };
      watchGroup.add(dial);
      
      // Hour markers
      for (let i = 0; i < 12; i++) {
        const markerGeometry = new (window as any).THREE.BoxGeometry(0.1, 0.2, 0.02);
        const markerMaterial = new (window as any).THREE.MeshStandardMaterial({ 
          color: 0xd4af37,
          metalness: 0.8
        });
        const marker = new (window as any).THREE.Mesh(markerGeometry, markerMaterial);
        const angle = (i / 12) * Math.PI * 2;
        marker.position.set(
          Math.sin(angle) * 1.5,
          0.8,
          Math.cos(angle) * 1.5
        );
        marker.rotation.y = -angle;
        marker.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 4, 0) };
        watchGroup.add(marker);
      }
      
      // Watch hands
      const hourHandGeometry = new (window as any).THREE.BoxGeometry(0.08, 0.8, 0.03);
      const minuteHandGeometry = new (window as any).THREE.BoxGeometry(0.06, 1.2, 0.03);
      const handMaterial = new (window as any).THREE.MeshStandardMaterial({ 
        color: 0x2c2c2c,
        metalness: 0.5
      });
      
      const hourHand = new (window as any).THREE.Mesh(hourHandGeometry, handMaterial);
      hourHand.position.set(0, 0.85, 0.4);
      hourHand.rotation.z = Math.PI / 6;
      hourHand.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 5, 0) };
      watchGroup.add(hourHand);
      
      const minuteHand = new (window as any).THREE.Mesh(minuteHandGeometry, handMaterial);
      minuteHand.position.set(0, 0.85, 0.6);
      minuteHand.rotation.z = Math.PI / 3;
      minuteHand.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 5.5, 0) };
      watchGroup.add(minuteHand);
      
      // Crystal/Glass
      const crystalGeometry = new (window as any).THREE.CylinderGeometry(2.05, 2.05, 0.1, 32);
      const crystalMaterial = new (window as any).THREE.MeshPhysicalMaterial({ 
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        thickness: 0.5,
        transparent: true,
        opacity: 0.3
      });
      const crystal = new (window as any).THREE.Mesh(crystalGeometry, crystalMaterial);
      crystal.position.y = 1;
      crystal.userData = { explodeOffset: new (window as any).THREE.Vector3(0, 6, 0) };
      watchGroup.add(crystal);
      
      scene.add(watchGroup);
      
      // Animation state
      let isRotating = true;
      let isExploded = false;
      let componentCount = 0;
      let targetCount = 250;
      
      // Mouse controls
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      
      canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      });
      
      canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
          const deltaX = e.clientX - previousMousePosition.x;
          const deltaY = e.clientY - previousMousePosition.y;
          
          watchGroup.rotation.y += deltaX * 0.01;
          watchGroup.rotation.x += deltaY * 0.01;
          
          previousMousePosition = { x: e.clientX, y: e.clientY };
        }
      });
      
      canvas.addEventListener('mouseup', () => {
        isDragging = false;
      });
      
      canvas.addEventListener('mouseleave', () => {
        isDragging = false;
      });
      
      // Button controls
      const rotateBtn = document.getElementById('rotateBtn');
      const explodeBtn = document.getElementById('explodeBtn');
      const resetBtn = document.getElementById('resetBtn');
      
      rotateBtn?.addEventListener('click', () => {
        isRotating = !isRotating;
        if (rotateBtn) {
          rotateBtn.classList.toggle('bg-yellow-600');
          rotateBtn.classList.toggle('bg-gray-700');
        }
      });
      
      explodeBtn?.addEventListener('click', () => {
        isExploded = !isExploded;
      });
      
      resetBtn?.addEventListener('click', () => {
        watchGroup.rotation.set(0, 0, 0);
        isExploded = false;
        isRotating = true;
        if (rotateBtn) {
          rotateBtn.classList.add('bg-yellow-600');
          rotateBtn.classList.remove('bg-gray-700');
        }
      });
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        if (isRotating && !isDragging) {
          watchGroup.rotation.y += 0.005;
        }
        
        // Animate gears
        watchGroup.children.forEach((child: any) => {
          if (child.userData.rotationSpeed) {
            child.rotation.z += child.userData.rotationSpeed;
          }
          
          // Explode/implode animation
          if (child.userData.explodeOffset) {
            const targetPos = isExploded ? child.userData.explodeOffset : new (window as any).THREE.Vector3(0, child.position.y > 0.9 ? child.position.y : 0, 0);
            if (child.position.y < 0.9 || isExploded) {
              child.position.x += (targetPos.x - child.position.x) * 0.05;
              child.position.z += (targetPos.z - child.position.z) * 0.05;
            }
            if (isExploded) {
              child.position.y += (targetPos.y - child.position.y) * 0.05;
            }
          }
        });
        
        // Update component count
        if (componentCount < targetCount) {
          componentCount += 2;
          const countEl = document.getElementById('componentCount');
          if (countEl) {
            countEl.textContent = `${Math.min(componentCount, targetCount)}/250`;
          }
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Handle window resize
      const handleResize = () => {
        if (canvas) {
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        }
      };
      
      window.addEventListener('resize', handleResize);
    }

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    // Animate mastery indicators when they come into view
    const masteryObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = (entry.target as HTMLElement).querySelector('.mastery-progress');
          if (progress) {
            setTimeout(() => {
              (progress as HTMLElement).style.width = (progress as HTMLElement).style.width || '100%';
            }, 500);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.mastery-indicator').forEach(el => {
      masteryObserver.observe(el);
    });

    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#vanta-bg');
      if (parallax) {
        const speed = scrolled * 0.2;
        (parallax as HTMLElement).style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mobileMenuBtn?.removeEventListener('click', handleMobileMenu);
      if (vantaInstance) {
        vantaInstance.destroy();
      }
      document.body.removeChild(script1);
      document.body.removeChild(script2);
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
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
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
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Formation de 10 à 15 ans minimum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Apprentissage auprès de maîtres confirmés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Certification interne Patek Philippe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Formation continue tout au long de la carrière</span>
                </div>
              </div>
            </div>
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
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Conception</h3>
              </div>
              <p className="text-gray-600 text-center">
                Les ingénieurs et designers créent des plans détaillés pour chaque composant, 
                optimisant à la fois la fonctionnalité et l'esthétique.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fabrication</h3>
              </div>
              <p className="text-gray-600 text-center">
                Chaque composant est fabriqué à la main ou avec des machines spécialisées 
                selon des tolérances extrêmement strictes.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Assemblage</h3>
              </div>
              <p className="text-gray-600 text-center">
                Les maîtres horlogers assemblent chaque mouvement avec une précision chirurgicale, 
                ajustant chaque pièce à la perfection.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contrôle Qualité</h3>
              </div>
              <p className="text-gray-600 text-center">
                Des tests rigoureux garantissent que chaque montre répond aux standards 
                d'excellence Patek Philippe avant d'être certifiée.
              </p>
            </div>
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
            <div className="craft-card rounded-xl p-8 scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600
