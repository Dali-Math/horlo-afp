'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import MOUVEMENTS_DB, { MouvementSpecs } from '@/lib/simulateur/database';

type Diagnostic = { level: 'ok' | 'warning' | 'critical'; text: string };

export default function SimulateurResonance3D() {
  // États React (identiques)
  const [calibre, setCalibre] = useState<keyof typeof MOUVEMENTS_DB>('eta2824');
  const [amplitude, setAmplitude] = useState(310);
  const [beatError, setBeatError] = useState(0.2);
  const [gain, setGain] = useState(0);
  const [position, setPosition] = useState(3);
  const [temperature, setTemperature] = useState(23);
  const [age, setAge] = useState(5);
  const [pivotWear, setPivotWear] = useState(20);
  const [mainspringWear, setMainspringWear] = useState(10);

  // Résultats
  const [isoValue, setIsoValue] = useState('En attente...');
  const [posValue, setPosValue] = useState('En attente...');
  const [tempValueRes, setTempValueRes] = useState('En attente...');
  const [powerValue, setPowerValue] = useState('En attente...');
  const [isoStatus, setIsoStatus] = useState('');
  const [posStatus, setPosStatus] = useState('');
  const [tempStatus, setTempStatus] = useState('');
  const [powerStatus, setPowerStatus] = useState('');

  // Diagnostics
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  const [diagnosticVisible, setDiagnosticVisible] = useState(false);

  // Three.js Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const balanceRef = useRef<THREE.Mesh | null>(null);
  const springRef = useRef<THREE.Line | null>(null);
  const animationRef = useRef<number | null>(null);
  const [animationRunning, setAnimationRunning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Ref pour éviter les problèmes de closure dans la boucle d'animation
  const animationParamsRef = useRef({
    amplitude,
    calibre,
    pivotWear,
    animationRunning,
    isLoaded
  });

  // Mettre à jour la ref quand les valeurs changent
  useEffect(() => {
    animationParamsRef.current = { amplitude, calibre, pivotWear, animationRunning, isLoaded };
  }, [amplitude, calibre, pivotWear, animationRunning, isLoaded]);

  // ✅ **Initialisation Three.js - CORRIGÉE**
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 10);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    rendererRef.current = renderer;

    scene.add(new THREE.AmbientLight(0x404080, 0.4));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    create3DModels(scene);
    setIsLoaded(true); // ✅ Masquer le chargement

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
    };
  }, []);

  const create3DModels = (scene: THREE.Scene) => {
    const balanceGeo = new THREE.TorusGeometry(1.5, 0.08, 12, 48);
    const balanceMat = new THREE.MeshStandardMaterial({ color: 0xc9a961, metalness: 0.95, roughness: 0.05 });
    const balance = new THREE.Mesh(balanceGeo, balanceMat);
    balance.castShadow = true;
    scene.add(balance);
    balanceRef.current = balance;

    for (let i = 0; i < 4; i++) {
      const weightGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.3);
      const weightMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1 });
      const weight = new THREE.Mesh(weightGeo, weightMat);
      const angle = (i / 4) * Math.PI * 2;
      weight.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      weight.rotation.z = angle;
      balance.add(weight);
    }

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      const t = i / 200;
      const angle = t * 12 * Math.PI * 2;
      const radius = 0.3 + t * 12 * 0.08;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, t * 0.5 - 0.25, Math.sin(angle) * radius));
    }
    const springGeo = new THREE.BufferGeometry().setFromPoints(points);
    const springMat = new THREE.LineBasicMaterial({ color: 0x888888 });
    const spring = new THREE.Line(springGeo, springMat);
    scene.add(spring);
    springRef.current = spring;

    const pivotGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8);
    const pivotMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const pivotTop = new THREE.Mesh(pivotGeo, pivotMat);
    pivotTop.position.y = 1.5;
    const pivotBottom = new THREE.Mesh(pivotGeo, pivotMat);
    pivotBottom.position.y = -1.5;
    scene.add(pivotTop, pivotBottom);
  };

  // ✅ **Animation Loop CORRIGÉE - Tourne en continu**
  useEffect(() => {
    if (!isLoaded) return;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Toujours rendre la scène
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      // Mettre à jour les positions si l'animation est active
      const params = animationParamsRef.current;
      if (balanceRef.current && springRef.current && params.animationRunning) {
        const wearFactor = 1 - (params.pivotWear / 100) * 0.3;
        const time = Date.now() * 0.001;
        const angle = (params.amplitude * Math.PI / 180) * 
                     Math.sin(time * MOUVEMENTS_DB[params.calibre].frequency * 2 * Math.PI) * 
                     wearFactor;
        balanceRef.current.rotation.z = angle;
        springRef.current.rotation.z = angle * 0.5;
      }
    };

    // Démarrer la boucle d'animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded]); // Ne dépend que de isLoaded

  // Simulation
  const runSimulation = useCallback(() => {
    setAnimationRunning(true);
    const specs = MOUVEMENTS_DB[calibre];
    
    const isoError = Math.max(0, (specs.ampNorm - amplitude) * 0.03);
    const posDev = specs.positions[position];
    const tempDev = (temperature - 23) * specs.tempCoef;
    const totalDev = posDev + gain + tempDev - isoError;
    const powerLoss = age * 1.2 + pivotWear * 0.5 + mainspringWear * 0.8;
    const powerReserve = specs.powerReserve - powerLoss;

    setIsoValue(`${isoError.toFixed(2)} s/j`);
    setPosValue(`${posDev} s/j`);
    setTempValueRes(`${tempDev.toFixed(1)} s/j`);
    setPowerValue(`${powerReserve.toFixed(0)}h`);

    setIsoStatus(isoError < 3 ? 'status-ok' : isoError < 8 ? 'status-warning' : 'status-critical');
    setPosStatus(Math.abs(posDev) < 6 ? 'status-ok' : 'status-warning');
    setTempStatus(Math.abs(tempDev) < 3 ? 'status-ok' : 'status-warning');
    setPowerStatus(powerReserve > 30 ? 'status-ok' : powerReserve > 20 ? 'status-warning' : 'status-critical');

    const newDiagnostics: Diagnostic[] = [];
    if (amplitude < 220) {
      newDiagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage` });
    } else if (amplitude < 260) {
      newDiagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification` });
    }
    if (pivotWear > 70) {
      newDiagnostics.push({ level: 'critical', text: `Usure pivots >70% : remplacement nécessaire` });
    }
    if (mainspringWear > 80) {
      newDiagnostics.push({ level: 'warning', text: `Ressort moteur fatigué : perte de réserve significative` });
    }
    if (beatError > 0.5) {
      newDiagnostics.push({ level: 'warning', text: `Battement élevé : collerette d'ancre désaxée` });
    }
    if (Math.abs(totalDev) > 10) {
      newDiagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe requise` });
    }
    
    setDiagnostics(newDiagnostics);
    setDiagnosticVisible(true);
  }, [calibre, amplitude, beatError, gain, position, temperature, age, pivotWear, mainspringWear]);

  const resetAll = () => {
    setAnimationRunning(false);
    setAmplitude(310);
    setBeatError(0.2);
    setGain(0);
    setPosition(3);
    setTemperature(23);
    setAge(5);
    setPivotWear(20);
    setMainspringWear(10);
    setDiagnosticVisible(false);
  };

  const exportReport = () => {
    const data = {
      timestamp: new Date().toISOString(),
      horloger: 'HorloLearn Pro',
      configuration: { calibre, amplitude, beatError, gain, position, temperature, age, pivotWear, mainspringWear },
      diagnostics,
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('✅ Rapport copié dans le presse-papier');
  };

  const shareResults = () => {
    const params = btoa(JSON.stringify({ amplitude, beatError, calibre }));
    const url = `https://www.horlolearn.ch/outils/simulateur-resonance?cfg=${params}`;
    navigator.clipboard.writeText(url);
    alert('✅ Lien de partage copié !');
  };

  // ✅ Responsive avec redimensionnement - CORRIGÉ
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const container = containerRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize); // CORRIGÉ
  }, []);

  return (
    // ... le reste de votre JSX reste identique ...
  );
}
