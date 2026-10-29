'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { 
  Wrench, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface PartItem {
  node: THREE.Object3D;
  level: number;
  lift: number;
  push: THREE.Vector3;
  twist: number;
  start: number;
}

export default function ScrollytellingDemontage3D() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const benchRef = useRef<HTMLDivElement | null>(null);

  // States
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [benchVisibility, setBenchVisibility] = useState<'hidden' | 'visible' | 'away'>('hidden');

  // Animation & Three.js refs
  const targetProgressRef = useRef<number>(0);
  const currentShownRef = useRef<number>(0);
  const turnRef = useRef<number>(0.45);
  const isDraggingRef = useRef<boolean>(false);
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

    // Renderer (100% transparent background)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Hierarchy Groups
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

    // Parts array
    const parts: PartItem[] = [];

    // Resize Handler
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

    // 2. Load Authentic Calibre ETA 6497 GLB Model
    const loader = new GLTFLoader();
    let isDisposed = false;

    loader.load(
      '/models/calibre-6497-demontage.glb',
      (gltf) => {
        if (isDisposed) return;
        const root = gltf.scene;

        // Enhance metallic reflections and polish
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
          // 0 = platine de base (fond), 1 = vis et balancier (sommet)
          const level = (zmins[i] - lo) / ((hi - lo) || 1);

          parts.push({
            node: n,
            level,
            lift: 0.26 + level * 1.65, // Hauteur de lévitation verticale
            push: new THREE.Vector3(c[0] * 0.42, c[1] * 0.42, 0), // Écartement radial
            twist: (i % 2 === 0 ? 1 : -1) * (0.16 + level * 0.42), // Rotation douce
            start: (1 - level) * 0.65 // Les pièces du dessus partent en premier
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

    // 4. Scroll Engine
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;

      const zoneRect = section.getBoundingClientRect();
      const zoneTop = zoneRect.top + scrollY;
      const zoneHeight = zoneRect.height;
      const zoneBottom = zoneTop + zoneHeight;

      // Visibility thresholds :
      // - Si au-dessus de la section : TOTALEMENT CACHÉ (opacity: 0)
      // - Si dans la section : VISIBLE (opacity: 1)
      // - Si dépassé la section vers le bas : S'ESTOMPE (away)
      const isAbove = (scrollY + windowHeight * 0.35) < zoneTop;
      const isPast = (scrollY + windowHeight * 0.15) > zoneBottom;

      if (isAbove) {
        setBenchVisibility('hidden');
      } else if (isPast) {
        setBenchVisibility('away');
      } else {
        setBenchVisibility('visible');
      }

      // Progression 0.0 à 1.0 le long de la section
      const scrollStart = zoneTop - windowHeight * 0.2;
      const scrollEnd = zoneBottom - windowHeight * 0.7;
      const totalDistance = Math.max(1, scrollEnd - scrollStart);

      const progress = Math.max(0, Math.min(1, (scrollY - scrollStart) / totalDistance));
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

      // Smooth interpolation of target progress
      currentShownRef.current += (targetProgressRef.current - currentShownRef.current) * Math.min(1, dt * 7.5);
      const shown = currentShownRef.current;

      // Move parts
      parts.forEach((p) => {
        const t = Math.max(0, Math.min(1, (shown - p.start) / (1 - p.start || 0.001)));
        const own = easeInOutCubic(t);

        p.node.position.set(p.push.x * own, p.push.y * own, p.lift * own);
        p.node.rotation.z = p.twist * own;
      });

      // Cinematic camera pullback
      camera.position.set(0, 1.45 + shown * 1.05, 2.95 + shown * 1.95);
      camera.lookAt(0, 0.22 + shown * 0.68, 0);

      // Turntable rotation
      turntable.rotation.y = turnRef.current;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // Cleanup
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
    <section 
      ref={sectionRef} 
      id="demontage-interactif"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200 dark:border-slate-800"
    >
      
      {/* Colonne de contenu éditorial horloger (avec padding à droite sur grand écran pour libérer le mouvement 3D flottant) */}
      <div className="max-w-2xl lg:max-w-3xl mr-auto space-y-20">

        {/* En-tête de section */}
        <div className="space-y-4 border-l-2 border-amber-500 pl-4 sm:pl-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Atelier Mécanique Suisse · Dépose Scrollytelling</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-slate-900 dark:text-white leading-tight">
            La Dépose Pas-à-Pas du Calibre ETA 6497-1
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Observez le mouvement horloger flotter à vos côtés. Au fil de votre lecture et du défilement vers le bas, les composants se désolidarisent couche par couche en lévitation. En remontant la page, ils reprennent fidèlement leur place.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              ⚡ 18 000 A/h (2.5 Hz)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              💎 17 Rubis
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              🇨🇭 Unitas 16½&apos;&apos;&apos;
            </span>
          </div>
        </div>

        {/* =================================================================== */}
        {/* ÉTAPE 00 : Mouvement Assemblé                                       */}
        {/* =================================================================== */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
              ÉTAPE 00 · DÉPART
            </span>
            <span className="text-xs font-mono text-slate-400">Progression : 0 %</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Le Mouvement Complet & Contrôle Préalable
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Le calibre de référence repose sur son porte-pièce synthétique. Avant d&apos;engager le moindre tournevis, l&apos;artisan horloger effectue le diagnostic visuel de la marche, l&apos;amplitude du balancier et l&apos;intégrité des aciers polis.
          </p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Règle d&apos;or d&apos;atelier : Désarmement impératif</span>
            </div>
            <p>
              Ne jamais desserrer la moindre vis avant d&apos;avoir entièrement libéré l&apos;énergie du ressort de barillet à l&apos;aide de la cheville de bois maintenant le cliquet dégagé.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Outil requis</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Cheville de sureau taillée</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Contrôle</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Détente douce de couronne</span>
            </div>
          </div>
        </article>

        {/* =================================================================== */}
        {/* ÉTAPE 01 : Dépose Vis & Rochet                                      */}
        {/* =================================================================== */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
              ÉTAPE 01 · REMONTOIR
            </span>
            <span className="text-xs font-mono text-slate-400">Progression : 25 %</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Dépose de la Roue de Couronne & Rochet
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Les vis supérieures à tête polie miroir et fentes soignées se soulèvent. Observez à droite les vis s&apos;élever en premier, suivies par la roue de couronne et le grand rochet denté qui libère l&apos;arbre de barillet.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5">
            <div className="font-bold text-amber-600 dark:text-amber-400">Particularité technique suisse :</div>
            <p className="text-slate-600 dark:text-slate-300">
              La vis de roue de couronne possède un <strong>filetage inversé (pas à gauche)</strong>. Elle se dévisse dans le sens horaire et se reconnaît à ses 3 traits fins gravés en étoile sur la calotte de tête.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Tournevis</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Rouge Ø 1.20 mm</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Brucelles</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Dumont N° 3 Inox</span>
            </div>
          </div>
        </article>

        {/* =================================================================== */}
        {/* ÉTAPE 02 : Coq & Balancier-Spiral                                   */}
        {/* =================================================================== */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
              ÉTAPE 02 · CŒUR RÉGULATEUR
            </span>
            <span className="text-xs font-mono text-slate-400">Progression : 50 %</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Extraction du Coq & Balancier-Spiral
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            L&apos;organe réglant est le cœur battant de la montre. Après avoir retiré la vis de coq, on soulève délicatement le pont dans un axe strictement vertical. Le balancier et son spiral thermocompensé Nivarox suivent l&apos;ensemble sans subir la moindre torsion.
          </p>

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Tolérance micro-mécanique critique</span>
            </div>
            <p>
              Le pivot inférieur de l&apos;axe de balancier ne mesure que <strong>0.09 mm</strong> de diamètre. Un retrait oblique briserait immédiatement le pivot contre la creusure de l&apos;Incabloc.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Rangement atelier</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Sous cloche de protection</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Contrôle visuel</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Spire libre, centrage au piton</span>
            </div>
          </div>
        </article>

        {/* =================================================================== */}
        {/* ÉTAPE 03 : Dépose de l'Ancre & Pont de Rouage                       */}
        {/* =================================================================== */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold">
              ÉTAPE 03 · DISTRIBUTION
            </span>
            <span className="text-xs font-mono text-slate-400">Progression : 75 %</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            Dépose de l&apos;Ancre Suisse & Pont de Rouage
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Le pont d&apos;ancre est retiré, libérant l&apos;ancre suisse et ses levées en rubis synthétique. Ensuite, le grand pont de rouage à décor Côtes de Genève s&apos;élève pour mettre à nu le train d&apos;engrenages : roue d&apos;échappement, roue de seconde et roue moyenne.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1.5">
            <div className="font-bold text-amber-600 dark:text-amber-400">Précaution de levée des ponts :</div>
            <p className="text-slate-600 dark:text-slate-300">
              Glisser la lame d&apos;un levier aux encoches prévues sur la platine. Ne jamais faire levier avec un tournevis sous les dents d&apos;un mobile au risque de fausser les axes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Mobiles</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Pignons acier roulés</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase">Inspection</span>
              <span className="font-bold text-slate-700 dark:text-slate-200">Ébats sous loupe 10x</span>
            </div>
          </div>
        </article>

        {/* =================================================================== */}
        {/* ÉTAPE 04 : Platine Nue                                              */}
        {/* =================================================================== */}
        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
              ÉTAPE 04 · PLATINE NUE
            </span>
            <span className="text-xs font-mono text-slate-400">Progression : 100 %</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
            La Platine Principale Perlée & Vue Éclatée Totale
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Toutes les pièces du calibre flottent désormais dans leur hiérarchie mécanique parfaite. Sur l&apos;établi, il ne reste que la platine perlée en laiton nickelé, prête à rejoindre le panier de lavage aux ultrasons (bains Rubisol et rinçages sans résidu).
          </p>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-950 dark:text-emerald-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Démontage accompli selon les règles de l&apos;art</span>
            </div>
            <p>
              Toutes les fournitures sont prêtes pour le contrôle, le graissage certifié Moebius (9010, HP-1300, 9415, 8217) et le réglage chronométrique Witschi.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <Link 
              href="/pratique/demontage" 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-md"
            >
              <span>Accéder au Simulateur Interactif Complet</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </Link>

            <a 
              href="#demontage-interactif" 
              className="text-slate-500 dark:text-slate-400 hover:text-amber-500 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Remonter pour réassembler</span>
            </a>
          </div>
        </article>

      </div>

      {/* ===================================================================== */}
      {/* 4. LE WIDGET 3D FLOTTANT SANS CADRE (Copie fidèle de tl-watchmaking)   */}
      {/* ===================================================================== */}
      <aside 
        ref={benchRef}
        aria-label="Visualiseur 3D interactif du calibre"
        className={`fixed right-3 sm:right-6 lg:right-10 bottom-3 sm:bottom-6 z-40 w-[270px] sm:w-[320px] lg:w-[380px] pointer-events-none transition-all duration-500 ease-out ${
          benchVisibility === 'visible' 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Canvas 3D sans cadre avec ombre douce (Badge supprimé comme demandé) */}
        <div className="relative w-full aspect-square">
          
          {/* Loader */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
              <div className="w-8 h-8 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-2" />
              <span className="text-[10px] font-mono text-amber-500/80">Chargement Calibre 3D...</span>
            </div>
          )}

          {/* WebGL Canvas */}
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block touch-none cursor-grab active:cursor-grabbing drop-shadow-[0_24px_38px_rgba(0,0,0,0.40)] dark:drop-shadow-[0_24px_38px_rgba(0,0,0,0.70)]"
          />
        </div>

        {/* Message d'accueil chaleureux pour les visiteurs */}
        <div className="mt-2 text-right select-none">
          <p className="font-serif italic text-base sm:text-lg text-amber-600 dark:text-amber-400 leading-snug drop-shadow-sm font-semibold">
            Bienvenue dans mon atelier horloger.
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-0.5 leading-snug">
            Découvrez le cœur battant du temps, pièce par pièce.
          </p>
        </div>

        {/* Indication interactive 360° */}
        <div className="mt-1 text-right text-[10px] font-mono text-slate-400 dark:text-slate-500 select-none">
          ⟳ Faites glisser pour pivoter à 360°
        </div>
      </aside>

    </section>
  );
}
