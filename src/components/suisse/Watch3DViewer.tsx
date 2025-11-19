
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Rotate3D } from 'lucide-react';

interface Watch3DViewerProps {
  strapColor: string;
  caseColor?: string;
  imageUrl?: string;
}

// Fonction utilitaire pour générer la texture du cadran avec typographie fine
const createDialTexture = (width = 1024, height = 1024, isDark = false) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const cx = width / 2;
    const cy = height / 2;
    const radius = width / 2 - 20;

    ctx.clearRect(0, 0, width, height);

    // Configuration des couleurs
    const primaryColor = isDark ? '#FFFFFF' : '#111111';
    const secondaryColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

    // 1. Minuterie (Chemin de fer fin)
    ctx.strokeStyle = secondaryColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6) * (Math.PI / 180);
      const isHour = i % 5 === 0;
      const rStart = radius - (isHour ? 25 : 10);
      const rEnd = radius;
      
      const x1 = cx + Math.cos(angle) * rStart;
      const y1 = cy + Math.sin(angle) * rStart;
      const x2 = cx + Math.cos(angle) * rEnd;
      const y2 = cy + Math.sin(angle) * rEnd;

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();

    // 2. Typographie (Chiffres Arabes Modernes)
    ctx.fillStyle = primaryColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Utilisation de 'Inter' pour le côté moderne et fin, fallback system
    ctx.font = '300 80px "Inter", sans-serif'; 

    const numbers = [
        { num: '12', angle: -90 },
        { num: '3', angle: 0 },
        { num: '6', angle: 90 },
        { num: '9', angle: 180 }
    ];

    numbers.forEach(n => {
        const angleRad = n.angle * (Math.PI / 180);
        // Positionnement précis à l'intérieur des index
        const dist = radius * 0.75; 
        const x = cx + Math.cos(angleRad) * dist;
        const y = cy + Math.sin(angleRad) * dist;
        ctx.fillText(n.num, x, y);
    });

    // 3. Branding
    ctx.font = '700 24px "Inter", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('HORLOLEARN', cx, cy - radius * 0.4);
    
    ctx.font = '400 16px "Inter", sans-serif';
    ctx.fillText('GENÈVE', cx, cy - radius * 0.35);

    // 4. Swiss Made
    ctx.font = '600 14px "Inter", sans-serif';
    ctx.fillText('SWISS MADE', cx, cy + radius * 0.85);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16; // Améliore la netteté sous les angles rasants
  return texture;
};

// Fonction pour générer une texture de métal brossé procédurale
const createBrushedMetalTexture = (width = 1024, height = 1024) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080'; // Gris moyen neutre
    ctx.fillRect(0, 0, width, height);
    
    // Création des stries de brossage
    for (let i = 0; i < 30000; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const length = 20 + Math.random() * 80; // Longueur des stries
      const opacity = 0.03 + Math.random() * 0.05; // Opacité variable pour la profondeur
      
      // Strie claire
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fillRect(x, y, length, 1);
      
      // Strie sombre adjacente (effet de relief)
      ctx.fillStyle = `rgba(0,0,0,${opacity})`;
      ctx.fillRect(x, y + 1, length, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;
  return texture;
};

// Fonction pour générer une Environment Map de studio (Softbox Reflections)
const createStudioEnvironmentMap = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512; // 2:1 pour Equirectangular
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // 1. Fond sombre (ambiance studio)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 1024, 512);

    // 2. Softbox Principale (Lumière zénithale diffuse)
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.2, '#ffffff'); // Bande lumineuse haute
    gradient.addColorStop(0.5, '#444444');
    gradient.addColorStop(0.8, '#111111');
    gradient.addColorStop(1, '#000000');
    
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);

    // 3. Softbox Latérale (Reflet tranchant sur le verre)
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = '#ffffff';
    // Dessine un rectangle blanc intense déformé pour simuler une lightbank
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(300, 400);
    ctx.lineTo(100, 400);
    ctx.fill();
    // Blur le bord
    ctx.shadowColor = "white";
    ctx.shadowBlur = 50;
    ctx.fill();
    ctx.shadowBlur = 0;

    // 4. Reflet d'horizon (Sol)
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 400, 1024, 112);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
};

const Watch3DViewer: React.FC<Watch3DViewerProps> = ({ strapColor, caseColor = '#C0C0C0', imageUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const strapMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const requestRef = useRef<number | null>(null);
  
  const [isReady, setIsReady] = useState(false);

  // Détection simple du mode sombre basé sur la couleur du boîtier (noir = sombre)
  const isDarkMode = caseColor.toLowerCase().includes('#1a');

  useEffect(() => {
    if (!containerRef.current) return;

    const initScene = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));

      // Scene Setup
      const scene = new THREE.Scene();
      
      // Setup Environment Map for Reflections
      const envMap = createStudioEnvironmentMap();
      scene.environment = envMap;
      scene.background = null; // Keep transparency

      const camera = new THREE.PerspectiveCamera(45, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      
      if (containerRef.current!.firstChild) {
        containerRef.current!.removeChild(containerRef.current!.firstChild);
      }
      
      containerRef.current!.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enablePan = false;
      controls.minDistance = 5;
      controls.maxDistance = 15;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      const mainLight = new THREE.SpotLight(0xffffff, 100);
      mainLight.position.set(5, 5, 10);
      mainLight.angle = Math.PI / 6;
      mainLight.penumbra = 0.5;
      mainLight.castShadow = true;
      mainLight.shadow.bias = -0.0001;
      mainLight.shadow.radius = 5;
      mainLight.shadow.mapSize.width = 2048;
      mainLight.shadow.mapSize.height = 2048;
      scene.add(mainLight);

      const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.ShadowMaterial({ opacity: 0.2, color: 0x000000 })
      );
      shadowPlane.position.z = -2.5;
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);

      // Textures generation
      const dialTexture = createDialTexture(1024, 1024, isDarkMode);
      const brushedTexture = createBrushedMetalTexture(1024, 1024);

      // --- MATERIALS ---

      const metalMat = new THREE.MeshStandardMaterial({
        color: caseColor,
        metalness: 1.0,
        roughness: 0.25,
        roughnessMap: brushedTexture,
        bumpMap: brushedTexture,
        bumpScale: 0.002,
        envMapIntensity: 1.0,
      });

      // SAPPHIRE GLASS MATERIAL (Physically Correct)
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.1, // Un peu de métallicité aide pour les reflets tranchants
        roughness: 0.0, // Parfaitement lisse
        transmission: 0.99, // Transparence quasi totale
        thickness: 2.0, // Volume physique pour la réfraction
        ior: 1.77, // Indice de réfraction du Saphir (Sapphire Crystal)
        reflectivity: 0.5,
        clearcoat: 1.0, // Vernis de surface
        clearcoatRoughness: 0.0,
        specularIntensity: 1.0,
        envMapIntensity: 1.8, // Increased for better Softbox reflection
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
      });

      const dialMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        map: dialTexture,
        transparent: true,
        opacity: 1,
        metalness: 0.1,
        roughness: 0.4,
        side: THREE.DoubleSide,
      });

      const dialBaseMat = new THREE.MeshStandardMaterial({
          color: 0x111111,
          metalness: 0.7,
          roughness: 0.5,
          roughnessMap: brushedTexture,
          bumpMap: brushedTexture,
          bumpScale: 0.001
      });

      strapMaterialRef.current = new THREE.MeshStandardMaterial({
        color: strapColor,
        roughness: 0.8,
        metalness: 0.1,
      });

      // --- Geometry Construction ---
      const watchGroup = new THREE.Group();
      scene.add(watchGroup);

      // 1. Main Case Body
      const caseCylinder = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.5, 64), metalMat);
      caseCylinder.rotation.x = Math.PI / 2;
      caseCylinder.castShadow = true;
      caseCylinder.receiveShadow = true;
      watchGroup.add(caseCylinder);

      // 2. Bezel
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.15, 32, 100), metalMat);
      bezel.position.z = 0.25;
      bezel.castShadow = true;
      bezel.receiveShadow = true;
      watchGroup.add(bezel);

      // 3. Lugs
      const createLugs = (yPos: number) => {
          const lugsGroup = new THREE.Group();
          lugsGroup.position.y = yPos;
          
          const leftLug = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.4), metalMat);
          leftLug.position.x = -1.2;
          leftLug.rotation.x = yPos > 0 ? -0.2 : 0.2;
          leftLug.castShadow = true;
          leftLug.receiveShadow = true;
          
          const rightLug = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.4), metalMat);
          rightLug.position.x = 1.2;
          rightLug.rotation.x = yPos > 0 ? -0.2 : 0.2;
          rightLug.castShadow = true;
          rightLug.receiveShadow = true;

          const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.4, 16), metalMat);
          bar.rotation.z = Math.PI / 2;
          bar.position.y = yPos > 0 ? 0.5 : -0.5;
          bar.castShadow = true;

          lugsGroup.add(leftLug, rightLug, bar);
          return lugsGroup;
      };

      watchGroup.add(createLugs(2.2));
      watchGroup.add(createLugs(-2.2));

      // 4. Strap
      const createStrap = (yDir: number) => {
          const strapGeo = new THREE.BoxGeometry(2.2, 3.0, 0.15);
          const strap = new THREE.Mesh(strapGeo, strapMaterialRef.current!);
          strap.position.y = yDir * 4.0;
          strap.position.z = -0.1;
          strap.receiveShadow = true;
          strap.castShadow = true;
          
          if (yDir < 0) {
              const keeper = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.4, 0.25), strapMaterialRef.current!);
              keeper.position.y = -3.5;
              keeper.position.z = 0.1;
              keeper.receiveShadow = true;
              keeper.castShadow = true;
              watchGroup.add(keeper);
          }

          return strap;
      };
      watchGroup.add(createStrap(1));
      watchGroup.add(createStrap(-1));

      // 5. Dial & Typography Layer
      const dialBase = new THREE.Mesh(new THREE.CircleGeometry(2.0, 64), dialBaseMat);
      dialBase.position.z = 0.20;
      dialBase.receiveShadow = true;
      watchGroup.add(dialBase);

      const dialGraphics = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 4.0), dialMat);
      dialGraphics.position.z = 0.26;
      dialGraphics.receiveShadow = true;
      watchGroup.add(dialGraphics);

      // 6. Indices 3D
      for(let i=0; i<12; i++) {
          if (i % 3 === 0) continue; 
          const angle = (i / 12) * Math.PI * 2;
          const marker = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.35, 0.02), metalMat);
          marker.position.set(Math.cos(angle)*1.7, Math.sin(angle)*1.7, 0.28);
          marker.rotation.z = angle - Math.PI/2;
          marker.castShadow = true;
          marker.receiveShadow = true;
          watchGroup.add(marker);
      }

      // 7. Hands (Animated)
      const createHand = (width: number, length: number, color: THREE.ColorRepresentation, zPos: number, tailLen: number = 0) => {
          const shape = new THREE.Shape();
          shape.moveTo(0, tailLen);
          shape.lineTo(width/2, 0);
          shape.lineTo(0, length); 
          shape.lineTo(-width/2, 0);
          shape.lineTo(0, tailLen);

          const extrudeSettings = { depth: 0.02, bevelEnabled: false };
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          geometry.translate(0, -tailLen, 0);
          
          const material = new THREE.MeshStandardMaterial({
            color: color,
            metalness: 0.9,
            roughness: 0.1
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.z = zPos;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          return mesh;
      };

      const hourHand = createHand(0.15, 1.2, caseColor, 0.32, -0.3);
      watchGroup.add(hourHand);

      const minuteHand = createHand(0.12, 1.8, caseColor, 0.34, -0.3);
      watchGroup.add(minuteHand);

      const secondHandGeo = new THREE.BoxGeometry(0.02, 2.2, 0.02);
      secondHandGeo.translate(0, 0.6, 0);
      const secondHand = new THREE.Mesh(secondHandGeo, new THREE.MeshStandardMaterial({color: 0xcc0000, metalness: 0.5}));
      secondHand.position.z = 0.36;
      secondHand.castShadow = true;
      watchGroup.add(secondHand);

      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.12, 16), new THREE.MeshStandardMaterial({color: caseColor, metalness: 1, roughness: 0.1}));
      cap.rotation.x = Math.PI / 2;
      cap.position.z = 0.38;
      cap.castShadow = true;
      watchGroup.add(cap);

      // 8. Crown
      const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16), metalMat);
      crown.rotation.z = Math.PI / 2;
      crown.position.x = 2.3;
      crown.castShadow = true;
      watchGroup.add(crown);

      // 9. GLASS DOME (Refined for Realistic Reflection)
      const glassRadius = 8.0;
      const glassAngle = Math.asin(2.1 / glassRadius); // Match the bezel radius of 2.1
      const glassGeo = new THREE.SphereGeometry(glassRadius, 64, 32, 0, Math.PI * 2, 0, glassAngle);
      const glass = new THREE.Mesh(glassGeo, glassMat);
      
      glass.rotation.x = Math.PI / 2;
      const rimY = glassRadius * Math.cos(glassAngle);
      glass.position.z = 0.35 - rimY; 
      
      watchGroup.add(glass);

      // --- ANIMATION LOOP ---
      const clock = new THREE.Clock();
      
      // Setup for Intro Animation
      const introDuration = 2.0; // 2 seconds of high-speed sweep
      const startHour = 10;
      const startMinute = 10;
      const startSecond = 30;
      // Convert 10:10:30 to total seconds in a 12h cycle
      const startTotalSeconds = (startHour * 3600) + (startMinute * 60) + startSecond;

      const getRealTimeSeconds = () => {
        const d = new Date();
        return (d.getHours() % 12) * 3600 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() / 1000;
      };

      const animate = () => {
        requestRef.current = requestAnimationFrame(animate);
        controls.update();
        
        const elapsedTime = clock.getElapsedTime();
        
        // Determine Current Display Time
        let currentTotalSeconds = 0;
        let isIntro = false;

        if (elapsedTime < introDuration) {
            isIntro = true;
            const t = elapsedTime / introDuration;
            // EaseOutExpo for a mechanical "brake" effect at the end
            const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            
            const realSeconds = getRealTimeSeconds();
            // Calculate difference. If real time is "behind" start time in the cycle, add 12h to unwind forward
            let diff = realSeconds - startTotalSeconds;
            if (diff < 0) diff += 12 * 3600;
            
            currentTotalSeconds = startTotalSeconds + (diff * ease);
        } else {
            currentTotalSeconds = getRealTimeSeconds();
        }

        // Subtle Floating Animation (breathing)
        watchGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.05;
        watchGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.03; // Slight tilt

        // Hands Animation
        
        // 1. Hours (Smooth)
        const hours = (currentTotalSeconds / 3600) % 12;
        hourHand.rotation.z = -hours * (Math.PI * 2 / 12);

        // 2. Minutes (Smooth)
        const minutes = (currentTotalSeconds / 60) % 60;
        minuteHand.rotation.z = -minutes * (Math.PI * 2 / 60);

        // 3. Seconds (Mechanical Behavior)
        const rawSeconds = currentTotalSeconds % 60;
        
        if (isIntro) {
            // During intro, super smooth sweep
            secondHand.rotation.z = -rawSeconds * (Math.PI * 2 / 60);
        } else {
            // Real Mechanical Beat (28,800 vph = 8 Hz)
            const beatFreq = 8;
            // Quantize time to discrete steps
            const step = Math.floor(rawSeconds * beatFreq) / beatFreq;
            
            // Micro-physics for the "tick" (Recoil/Vibration)
            const beatPhase = (rawSeconds * beatFreq) % 1;
            // A sharp impulse that decays quickly
            const kick = Math.sin(beatPhase * Math.PI) * Math.exp(-beatPhase * 10);
            const kickAmplitude = 0.0015; // Subtle vibration angle
            
            secondHand.rotation.z = -(step * (Math.PI * 2 / 60)) + (kick * kickAmplitude);
        }

        // Crown Winding Effect (Intermittent & Extremely Subtle - Reference Grade)
        // Rotation de 15° toutes les 10 secondes, plus lent et plus raffiné
        const windInterval = 10.0;
        const windDuration = 2.0;
        const windAngle = Math.PI / 12; // 15 degrés (très discret)
        
        const cycleTime = elapsedTime % windInterval;
        const cycleIndex = Math.floor(elapsedTime / windInterval);
        
        let windProgress = 0;
        if (cycleTime < windDuration) {
            const t = cycleTime / windDuration;
            // EaseInOutCubic pour une douceur maximale
            windProgress = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        } else {
            windProgress = 1;
        }
        
        // Accumulation par paliers avec interpolation douce
        crown.rotation.y = cycleIndex * windAngle + windProgress * windAngle;

        renderer.render(scene, camera);
      };
      
      animate();
      setIsReady(true);

      const handleResize = () => {
        if (!containerRef.current) return;
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        if (rendererRef.current) rendererRef.current.dispose();
        
        scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach(m => m.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        dialTexture.dispose();
        brushedTexture.dispose();
        envMap.dispose(); // Clean up procedural texture
      };
    };

    const cleanupPromise = initScene();

    return () => {
      cleanupPromise.then(cleanup => cleanup && cleanup());
    };
  }, [caseColor]);

  useEffect(() => {
    if (strapMaterialRef.current) {
      strapMaterialRef.current.color.set(strapColor);
    }
  }, [strapColor]);

  return (
    <div className="w-full h-full relative bg-neutral-100 dark:bg-neutral-900">
      
      <div 
        className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 transition-opacity duration-1000 ease-in-out pointer-events-none ${isReady ? 'opacity-0' : 'opacity-100'}`}
      >
          {imageUrl && (
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <img src={imageUrl} alt="" className="w-full h-full object-contain blur-xl scale-110" />
            </div>
          )}

          <div className="relative z-10 mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 dark:border-neutral-800"></div>
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-t-2 border-gold-500 animate-spin shadow-[0_0_15px_rgba(212,163,43,0.3)]"></div>
              <Rotate3D className="absolute inset-0 m-auto w-6 h-6 text-gold-500 animate-pulse" />
          </div>
          
          <div className="relative z-10 text-center space-y-1">
              <span className="block text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-bold animate-pulse">
                Atelier Numérique
              </span>
              <span className="block text-[10px] text-neutral-400 tracking-widest font-light">
                Polissage du Saphir...
              </span>
          </div>
      </div>

      <div 
        ref={containerRef} 
        className={`w-full h-full cursor-move transition-opacity duration-1000 ease-in-out ${isReady ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      <div className={`absolute bottom-4 left-0 w-full text-center pointer-events-none transition-all duration-1000 delay-500 ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] uppercase tracking-widest text-neutral-800 dark:text-neutral-200 font-bold">
                Calibre Actif • 28'800 A/h
            </p>
        </div>
      </div>
    </div>
  );
};

export default Watch3DViewer;
