'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface PartItem {
  node: THREE.Object3D;
  level: number;
  lift: number;
  push: THREE.Vector3;
  twist: number;
  start: number;
}

export default function FloatingCalibre3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const benchRef = useRef<HTMLDivElement | null>(null);

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [benchVisibility, setBenchVisibility] = useState<'hidden' | 'visible' | 'away'>('hidden');

  const targetProgressRef = useRef<number>(0);
  const currentShownRef = useRef<number>(0);
  const turnRef = useRef<number>(0.45);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.35;

    const turntable = new THREE.Group();
    const tilt = new THREE.Group();
    tilt.rotation.x = -Math.PI / 2.3; // Vue d'établi plongeante
    tilt.rotation.z = Math.PI / 12;
    turntable.add(tilt);
    scene.add(turntable);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 3.4);
    mainLight.position.set(3.5, 6, 4.5);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xa5c4f2, 2.2);
    rimLight.position.set(-3.5, -3, -3);
    scene.add(rimLight);

    const goldBounce = new THREE.DirectionalLight(0xf59e0b, 1.3);
    goldBounce.position.set(0, -4, 2);
    scene.add(goldBounce);

    const parts: PartItem[] = [];

    const handleResize = () => {
      if (!canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // 2. Load Calibre Model
    const loader = new GLTFLoader();
    let isDisposed = false;

    loader.load(
      '/models/calibre-6497-demontage.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;

        root.traverse((m) => {
          if ((m as THREE.Mesh).isMesh) {
            const mesh = m as THREE.Mesh;
            if (mesh.material && 'roughness' in mesh.material) {
              const stdMat = mesh.material as THREE.MeshStandardMaterial;
              stdMat.roughness = Math.max(0.18, stdMat.roughness || 0.25);
              stdMat.metalness = Math.min(0.95, stdMat.metalness || 0.85);
              stdMat.needsUpdate = true;
            }
          }
        });

        const zmins = root.children.map((n) => (n.userData?.zmin as number) ?? 0);
        const lo = Math.min(...zmins);
        const hi = Math.max(...zmins) || 1;

        tilt.add(root);

        root.children.forEach((n, i) => {
          const c = (n.userData?.centre as [number, number, number]) || [0, 0, 0];
          const level = (zmins[i] - lo) / ((hi - lo) || 1);

          parts.push({
            node: n,
            level,
            lift: 0.26 + level * 1.65,
            push: new THREE.Vector3(c[0] * 0.42, c[1] * 0.42, 0),
            twist: (i % 2 === 0 ? 1 : -1) * (0.16 + level * 0.42),
            start: (1 - level) * 0.65
          });
        });

        setIsLoaded(true);
        handleResize();
      },
      undefined,
      (err) => {
        console.error('Erreur de chargement du calibre 6497:', err);
      }
    );

    // 3. Pointer drag for 360° interactive rotation
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        const dx = e.clientX - prevMouseRef.current.x;
        const dy = e.clientY - prevMouseRef.current.y;
        turnRef.current += dx * 0.009;
        tilt.rotation.x = Math.max(-Math.PI / 1.45, Math.min(-Math.PI / 4.2, tilt.rotation.x - dy * 0.006));
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // 4. Scroll Engine across the homepage
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(1, documentHeight - windowHeight);

      // - En haut de la page principale (Hero) : TOTALEMENT CACHÉ (opacity: 0)
      // - Quand on descend dans les sections : APPARAÎT FLOTTANT (opacity: 1)
      // - Tout en bas de page (footer) : S'ESTOMPE pour ne pas gêner
      if (scrollY < 250) {
        setBenchVisibility('hidden');
      } else if (scrollY > maxScroll - 250) {
        setBenchVisibility('away');
      } else {
        setBenchVisibility('visible');
      }

      // Progression du démontage le long du défilement de la page principale
      const start = 250;
      const end = maxScroll * 0.85;
      const distance = Math.max(1, end - start);
      const progress = Math.max(0, Math.min(1, (scrollY - start) / distance));

      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 5. Animation Render Loop
    let animId: number;
    let lastTime = performance.now();

    function easeInOutCubic(t: number): number {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    const animate = (time: number) => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      currentShownRef.current += (targetProgressRef.current - currentShownRef.current) * Math.min(1, dt * 7.5);
      const shown = currentShownRef.current;

      parts.forEach((p) => {
        const t = Math.max(0, Math.min(1, (shown - p.start) / (1 - p.start || 0.001)));
        const own = easeInOutCubic(t);

        p.node.position.set(p.push.x * own, p.push.y * own, p.lift * own);
        p.node.rotation.z = p.twist * own;
      });

      camera.position.set(0, 1.45 + shown * 1.05, 2.95 + shown * 1.95);
      camera.lookAt(0, 0.22 + shown * 0.68, 0);

      turntable.rotation.y = turnRef.current;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
    };
  }, []);

  return (
    <aside 
      ref={benchRef}
      aria-label="Visualiseur 3D interactif du calibre"
      className={`fixed right-3 sm:right-6 lg:right-10 bottom-3 sm:bottom-6 z-40 w-[270px] sm:w-[320px] lg:w-[380px] pointer-events-none transition-all duration-500 ease-out ${
        benchVisibility === 'visible' 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* 3D Canvas sans boîte ni cadre */}
      <div className="relative w-full aspect-square">
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
            <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-2" />
            <span className="text-[10px] font-mono text-amber-500/80">Chargement Calibre 3D...</span>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="w-full h-full block touch-none cursor-grab active:cursor-grabbing drop-shadow-[0_24px_38px_rgba(0,0,0,0.40)] dark:drop-shadow-[0_24px_38px_rgba(0,0,0,0.70)]"
        />
      </div>

      {/* Message d'accueil chaleureux */}
      <div className="mt-2 text-right select-none bg-stone-100/85 dark:bg-slate-900/85 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-amber-500/25 shadow-lg">
        <p className="font-serif italic text-sm sm:text-base text-amber-600 dark:text-amber-400 leading-snug drop-shadow-sm font-bold">
          Bienvenue dans mon atelier horloger.
        </p>
        <p className="font-serif italic text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
          Découvrez le cœur battant du temps, pièce par pièce.
        </p>
        <div className="mt-1.5 flex items-center justify-end gap-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
          <span>Glisser pour pivoter à 360°</span>
        </div>
      </div>
    </aside>
  );
}
