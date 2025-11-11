'use client';

import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    THREE?: any;
    VANTA?: any;
  }
}

export default function CraftsmanshipPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    // État pour éviter les exécutions multiples
    let isMounted = true;

    // Charger les scripts de manière sécurisée
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Vérifier si le script est déjà chargé
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    // Initialiser VANTA après le chargement des scripts
    const initVanta = () => {
      if (!isMounted || !window.VANTA || !document.getElementById('vanta-bg')) return;

      try {
        vantaRef.current = window.VANTA.TOPOLOGY({
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
        console.warn('Vanta initialization failed:', error);
      }
    };

    // Initialiser Three.js
    const initThreeJS = () => {
      if (!isMounted || !canvasRef.current || !window.THREE) return;

      try {
        const canvas = canvasRef.current;
        const THREE = window.THREE;
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1f2937);
        
        const camera = new THREE.PerspectiveCamera(
          45,
          canvas.clientWidth / canvas.clientHeight,
          0.1,
          1000
        );
        camera.position.set(0, 0, 10);
        
        const renderer = new THREE.WebGLRenderer({ 
          canvas,
          antialias: true,
          alpha: true 
        });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.shadowMap.enabled = true;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);
        
        const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
        mainLight.position.set(5, 10, 7);
        mainLight.castShadow = true;
        scene.add(mainLight);
        
        const rimLight = new THREE.PointLight(0xd4af37, 1, 100);
        rimLight.position.set(-5, 5, 5);
        scene.add(rimLight);
        
        // Create watch components
        const watchGroup = new THREE.Group();
        
        // Base/Case
        const caseGeometry = new THREE.CylinderGeometry(2, 2, 0.5, 32);
        const caseMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xc0c0c0,
          metalness: 0.9,
          roughness: 0.1
        });
        const watchCase = new THREE.Mesh(caseGeometry, caseMaterial);
        watchCase.castShadow = true;
        watchCase.userData = { explodeOffset: new THREE.Vector3(0, -2, 0) };
        watchGroup.add(watchCase);
        
        // Movement/Mechanism
        const movementGeometry = new THREE.CylinderGeometry(1.8, 1.8, 0.3, 32);
        const movementMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xd4af37,
          metalness: 0.8,
          roughness: 0.2
        });
        const movement = new THREE.Mesh(movementGeometry, movementMaterial);
        movement.position.y = 0.4;
        movement.castShadow = true;
        movement.userData = { explodeOffset: new THREE.Vector3(0, 2, 0) };
        watchGroup.add(movement);
        
        // Gears
        const gearGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 8);
        const gearMaterial = new THREE.MeshStandardMaterial({ 
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
          const gear = new THREE.Mesh(gearGeometry, gearMaterial);
          gear.position.set(pos.x, pos.y, pos.z);
          gear.rotation.x = Math.PI / 2;
          gear.castShadow = true;
          gear.userData = { 
            explodeOffset: new THREE.Vector3(pos.x * 2, 3, pos.z * 2),
            rotationSpeed: 0.02 * (index % 2 === 0 ? 1 : -1)
          };
          watchGroup.add(gear);
        });
        
        // Dial and other components...
        // (le reste du code Three.js reste similaire mais avec THREE au lieu de (window as any).THREE)
        
        scene.add(watchGroup);
        
        // Animation loop
        let isRotating = true;
        const animate = () => {
          if (!isMounted) return;
          requestAnimationFrame(animate);
          
          if (isRotating) {
            watchGroup.rotation.y += 0.005;
          }
          
          watchGroup.children.forEach((child: any) => {
            if (child.userData.rotationSpeed) {
              child.rotation.z += child.userData.rotationSpeed;
            }
          });
          
          renderer.render(scene, camera);
        };
        animate();
        
        // Handle resize
        const handleResize = () => {
          if (!isMounted || !canvasRef.current) return;
          camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup Three.js
        return () => {
          window.removeEventListener('resize', handleResize);
          renderer.dispose();
        };
      } catch (error) {
        console.warn('Three.js initialization failed:', error);
      }
    };

    // Lancer les initialisations
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
      .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js'))
      .then(() => {
        if (isMounted) {
          initVanta();
          setTimeout(initThreeJS, 500); // Délai pour s'assurer que Three est prêt
        }
      })
      .catch(error => {
        console.warn('Script loading failed:', error);
      });

    // Scroll reveal animations (simplifié et sécurisé)
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    // Observer uniquement si les éléments existent
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      if (el) observer.observe(el);
    });

    // Parallax (simplifié)
    const handleScroll = () => {
      if (!isMounted) return;
      const parallax = document.getElementById('vanta-bg');
      if (parallax) {
        const speed = window.pageYOffset * 0.2;
        parallax.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
      if (vantaRef.current) {
        vantaRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="font-sans bg-cream overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        /* ... (styles identiques) ... */
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        /* ... (reste des styles) ... */
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div id="vanta-bg" className="absolute inset-0 z-0"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Le Savoir-Faire<br />Suisse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Chaque montre Patek Philippe est le fruit de siècles de tradition horlogère et d'un artisanat d'exception
          </p>
        </div>
      </section>

      {/* ... (reste du JSX identique) ... */}
      
      {/* Master Craftsmen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Maîtres Horlogers</h2>
            <p className="text-xl text-gray-600">Des artisans dévoués dont l'expertise se transmet de génération en génération</p>
          </div>
          {/* ... contenu ... */}
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Processus de Fabrication</h2>
            <p className="text-xl text-gray-600">Chaque étape du processus est réalisée avec une précision millimétrée</p>
          </div>
          {/* ... contenu ... */}
        </div>
      </section>

      {/* Craftsmanship Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Domaines d'Expertise</h2>
            <p className="text-xl text-gray-600">Les spécialités qui définissent l'excellence Patek Philippe</p>
          </div>
          {/* ... contenu ... */}
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-title">Un Héritage Depuis 1839</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Plus de 180 ans d'innovations, de tradition et de passion pour l'horlogerie de haute précision
            </p>
          </div>
          {/* ... contenu ... */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Découvrez la Collection</h2>
          <p className="text-xl mb-8 text-yellow-100">
            Chaque montre raconte une histoire d'excellence et de passion horlogère
          </p>
          <button className="bg-white text-yellow-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Explorer nos Créations
          </button>
        </div>
      </section>

      {/* Canvas 3D caché */}
      <canvas ref={canvasRef} className="hidden w-full h-full"></canvas>
    </div>
  );
}
