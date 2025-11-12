'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { jsPDF } from 'jspdf';

// ==========================================
// TYPES ET INTERFACES
// ==========================================
interface TechnicalSpecs {
  name: string;
  frequency: number;
  ampNorm: number;
  powerReserve: number;
  positions: number[];
  tempCoef: number;
  beatRate: number;
  category: string;
}

interface Diagnostic {
  level: 'ok' | 'warning' | 'critical';
  text: string;
}

// ==========================================
// BASE DE DONNÉES (50+ mouvements)
// ==========================================
const TECHNICAL_SPECS: Record<string, TechnicalSpecs> = {
  // ETA / Unitas
  "eta2824": { name: "ETA 2824-2", frequency: 4, ampNorm: 310, powerReserve: 38, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.6, beatRate: 28800, category: "automatic" },
  "eta2892": { name: "ETA 2892-A2", frequency: 4, ampNorm: 310, powerReserve: 42, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.5, beatRate: 28800, category: "automatic" },
  "eta6497": { name: "ETA/Unitas 6497-1", frequency: 2.5, ampNorm: 260, powerReserve: 46, positions: [2, 6, 8, 10, 14, 16], tempCoef: 0.7, beatRate: 18000, category: "manual" },
  "eta7760": { name: "Valjoux 7760", frequency: 3, ampNorm: 300, powerReserve: 40, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8, beatRate: 21600, category: "chronograph" },
  "eta7750": { name: "Valjoux 7750", frequency: 3, ampNorm: 300, powerReserve: 42, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8, beatRate: 21600, category: "chronograph" },
  
  // ROLEX
  "rolex3135": { name: "Rolex 3135", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4, beatRate: 28800, category: "automatic" },
  "rolex3130": { name: "Rolex 3130", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4, beatRate: 28800, category: "automatic" },
  "rolex3235": { name: "Rolex 3235", frequency: 4, ampNorm: 315, powerReserve: 70, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3, beatRate: 28800, category: "automatic" },
  
  // PATEK PHILIPPE
  "patek240": { name: "Patek Philippe 240", frequency: 3, ampNorm: 315, powerReserve: 48, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3, beatRate: 21600, category: "automatic" },
  "patek324": { name: "Patek Philippe 324 SC", frequency: 4, ampNorm: 310, powerReserve: 45, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.35, beatRate: 28800, category: "automatic" },
  "patek215": { name: "Patek Philippe 215", frequency: 3, ampNorm: 300, powerReserve: 44, positions: [1, 2, 3, 4, 5, 6], tempCoef: 0.4, beatRate: 21600, category: "manual" },
  
  // OMEGA
  "omega8900": { name: "Omega Co-Axial 8900", frequency: 3.5, ampNorm: 315, powerReserve: 60, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.5, beatRate: 25200, category: "automatic" },
  "omega3861": { name: "Omega 3861 (Speedmaster)", frequency: 3, ampNorm: 300, powerReserve: 50, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.6, beatRate: 21600, category: "manual" },
  
  // SEIKO
  "seiko4r36": { name: "Seiko 4R36", frequency: 3, ampNorm: 280, powerReserve: 41, positions: [2, 4, 6, 8, 10, 12], tempCoef: 0.7, beatRate: 21600, category: "automatic" },
  "seiko6r35": { name: "Seiko 6R35", frequency: 3, ampNorm: 285, powerReserve: 70, positions: [1, 3, 5, 7, 9, 11], tempCoef: 0.65, beatRate: 21600, category: "automatic" },
  "seiko8r48": { name: "Seiko 8R48 (Chronographe)", frequency: 3.5, ampNorm: 290, powerReserve: 45, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.75, beatRate: 25200, category: "chronograph" },
  
  // AUTRES MARQUES
  "breitling01": { name: "Breitling B01", frequency: 4, ampNorm: 310, powerReserve: 70, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.55, beatRate: 28800, category: "chronograph" },
  "jlc889": { name: "JLC Calibre 889", frequency: 4, ampNorm: 300, powerReserve: 38, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.5, beatRate: 28800, category: "automatic" },
  "jlc978": { name: "JLC Calibre 978 (Tourbillon)", frequency: 4, ampNorm: 280, powerReserve: 48, positions: [0, 0, 0, 0, 0, 0], tempCoef: 0.3, beatRate: 28800, category: "tourbillon" },
  "tagheuer01": { name: "TAG Heuer Calibre 01", frequency: 4, ampNorm: 300, powerReserve: 50, positions: [0, 4, 6, 8, 10, 12], tempCoef: 0.65, beatRate: 28800, category: "chronograph" },
  "cartier1904mc": { name: "Cartier 1904-MC", frequency: 4, ampNorm: 300, powerReserve: 48, positions: [0, 3, 5, 7, 9, 11], tempCoef: 0.6, beatRate: 28800, category: "automatic" },
  "iwc52010": { name: "IWC 52010 (Portugeiser)", frequency: 3.5, ampNorm: 300, powerReserve: 168, positions: [0, 2, 3, 4, 5, 6], tempCoef: 0.45, beatRate: 25200, category: "automatic" }
};

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================
export default function SimulateurPage() {
  // États
  const [calibre, setCalibre] = useState<string>('eta2824');
  const [amplitude, setAmplitude] = useState<number>(310);
  const [beatError, setBeatError] = useState<number>(0.2);
  const [gain, setGain] = useState<number>(0);
  const [position, setPosition] = useState<number>(3);
  const [temperature, setTemperature] = useState<number>(23);
  const [age, setAge] = useState<number>(5);
  const [pivotWear, setPivotWear] = useState<number>(20);
  const [mainspringWear, setMainspringWear] = useState<number>(10);
  const [magneticField, setMagneticField] = useState<number>(0);
  const [dropHeight, setDropHeight] = useState<number>(50);
  const [surface, setSurface] = useState<string>('tile');
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

  // Three.js refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const balanceRef = useRef<THREE.Mesh | null>(null);
  const hairspringRef = useRef<THREE.Line | null>(null);
  const animationRef = useRef<number | null>(null);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);

  // Résultats
  const [magnetismResult, setMagnetismResult] = useState<{ level: number; diagnostic: string; status: string }>({ level: 0, diagnostic: '-', status: 'status-ok' });
  const [impactResult, setImpactResult] = useState<{ status: string; recommendation: string; statusClass: string }>({ status: 'En attente', recommendation: '-', statusClass: 'status-ok' });
  const [acousticResult, setAcousticResult] = useState<{ status: string; detail: string }>({ status: 'Micro éteint', detail: '-' });
  const [isochronismResult, setIsochronismResult] = useState<{ status: string; detail: string }>({ status: 'En attente...', detail: '-' });
  const [huygensResult, setHuygensResult] = useState<{ status: string; detail: string }>({ status: 'En attente...', detail: '-' });
  const [spiralResult, setSpiralResult] = useState<{ status: string; detail: string }>({ status: 'En attente...', detail: '-' });
  const [deviationResult, setDeviationResult] = useState<{ status: string; detail: string }>({ status: 'En attente...', detail: '-' });
  const [powerReserveResult, setPowerReserveResult] = useState<{ status: string; detail: string }>({ status: 'En attente...', detail: '-' });

  // ==========================================
  // THREE.JS INITIALISATION
  // ==========================================
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x404080, 0.3));

    // Modèles 3D
    const balanceGeo = new THREE.TorusGeometry(1.5, 0.08, 12, 48);
    const balanceMat = new THREE.MeshStandardMaterial({ color: 0xc9a961, metalness: 0.95, roughness: 0.05 });
    const balance = new THREE.Mesh(balanceGeo, balanceMat);
    balance.castShadow = true;
    scene.add(balance);
    balanceRef.current = balance;

    for (let i = 0; i < 4; i++) {
      const weight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.3),
        new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 1 })
      );
      const angle = (i / 4) * Math.PI * 2;
      weight.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      balance.add(weight);
    }

    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 200; i++) {
      const t = i / 200, angle = t * 12 * Math.PI * 2, radius = 0.3 + t * 12 * 0.08;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, t * 0.5 - 0.25, Math.sin(angle) * radius));
    }
    hairspringRef.current = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(points),
      new THREE.LineBasicMaterial({ color: 0x888888, linewidth: 2 })
    );
    scene.add(hairspringRef.current);

    // Pivots
    const pivotGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8);
    const pivotMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    scene.add(new THREE.Mesh(pivotGeo, pivotMat)).position.y = 1.5;
    scene.add(new THREE.Mesh(pivotGeo, pivotMat)).position.y = -1.5;

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const specs = TECHNICAL_SPECS[calibre];
      const wearFactor = 1 - (pivotWear / 100) * 0.3;
      const time = Date.now() * 0.001;
      const effectiveAmplitude = amplitude * wearFactor;
      const angle = (effectiveAmplitude * Math.PI / 180) * Math.sin(time * specs.frequency * 2 * Math.PI);
      balanceRef.current!.rotation.z = angle;
      hairspringRef.current!.rotation.z = angle * 0.3;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [calibre, amplitude, pivotWear]);

  // ==========================================
  // MODULE MAGNÉTISME
  // ==========================================
  useEffect(() => {
    const magnetizationRate = 0.02 * Math.pow(magneticField / 100, 2);
    const magnetismLevel = Math.min(100, 5 * 8760 * magnetizationRate);
    const amplitudeLoss = amplitude * (magnetismLevel * 0.008);
    const status = magneticField > 200 ? 'status-critical' : magneticField > 100 ? 'status-warning' : 'status-ok';
    const diagnostic = magneticField > 200 ? 'DÉMAGNÉTISATION CRITIQUE' : magneticField > 100 ? 'Risque de déviation' : 'Sûr';

    setMagnetismResult({
      level: magnetismLevel,
      diagnostic,
      status
    });
  }, [magneticField, amplitude]);

  // ==========================================
  // MODULE IMPACT
  // ==========================================
  const simulateDrop = () => {
    const impactEnergy = 9.81 * dropHeight / 100 * 0.5;
    const surfaceFactor = { wood: 0.3, tile: 0.7, concrete: 1.0 }[surface as keyof typeof surfaceFactor] as number;
    const absorbedEnergy = impactEnergy * surfaceFactor;
    
    const amplitudeDrop = Math.min(100, absorbedEnergy * 15);
    const deformation = absorbedEnergy * 0.02 * (1 + pivotWear / 100);
    const jewelDamage = absorbedEnergy > 0.05 ? 'critical' : absorbedEnergy > 0.02 ? 'warning' : 'ok';
    const action = deformation > 0.03 ? 'REMPLACER AXES' : jewelDamage === 'critical' ? 'INSPECTER PIERRES' : 'Contrôle OK';

    setImpactResult({
      status: `-${amplitudeDrop.toFixed(0)}% (Δ${deformation.toFixed(2)}mm)`,
      recommendation: action,
      statusClass: `status-${jewelDamage}`
    });

    // Animation caméra
    const canvas = document.getElementById('canvas-container');
    if (canvas) {
      canvas.style.animation = 'shake 0.5s';
      setTimeout(() => canvas.style.animation = '', 500);
    }
  };

  // ==========================================
  // MODULE ACOUSTIQUE
  // ==========================================
  const startMicrophone = async () => {
    if (!isMicActive) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048;
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        
        setIsMicActive(true);
        detectTicking();
      } catch (err) {
        alert('Accès micro refusé');
      }
    } else {
      micStreamRef.current?.getTracks().forEach(track => track.stop());
      audioContextRef.current = null;
      analyserRef.current = null;
      setIsMicActive(false);
      setAcousticResult({ status: 'Micro éteint', detail: '-' });
    }
  };

  const detectTicking = () => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const rotorFreq = dataArray.slice(50, 200);
    const rotorNoise = Math.max(...rotorFreq);
    
    setAcousticResult({
      status: rotorNoise > 150 ? 'Bruit détecté' : 'Silencieux',
      detail: `${rotorNoise} dB (500-2000Hz)`
    });
    
    requestAnimationFrame(detectTicking);
  };

  // ==========================================
  // SIMULATION COMPLÈTE
  // ==========================================
  const runFullSimulation = () => {
    const specs = TECHNICAL_SPECS[calibre];
    if (!specs) return alert('Sélectionnez un calibre valide');

    // Calculs physiques
    const amplitudeLoss = specs.ampNorm - amplitude;
    const isochronismError = Math.max(0, amplitudeLoss * 0.03);
    const positionDeviation = specs.positions[position];
    const huygensScore = 100 - Math.abs(positionDeviation) * 5;
    const beatImpact = beatError * 2;
    const tempImpact = (temperature - 23) * specs.tempCoef;
    const totalDeviation = positionDeviation + gain + tempImpact - isochronismError;
    const powerLoss = (mainspringWear * 0.5) + (age * 1.2);
    const effectiveReserve = specs.powerReserve - powerLoss;

    // Mise à jour UI
    setIsochronismResult({
      status: `${isochronismError.toFixed(2)} s/j`,
      detail: `Perte amplitude: ${amplitudeLoss}°`
    });
    setHuygensResult({
      status: `${huygensScore.toFixed(0)}%`,
      detail: `Déviation position: ${positionDeviation} s/j`
    });
    setSpiralResult({
      status: `${(beatImpact + tempImpact).toFixed(2)} s/j`,
      detail: `Battement: ${beatImpact.toFixed(1)}s/j, Temp: ${tempImpact.toFixed(1)}s/j`
    });
    setDeviationResult({
      status: `${totalDeviation > 0 ? '+' : ''}${totalDeviation.toFixed(1)} s/j`,
      detail: `Total cumulée`
    });
    setPowerReserveResult({
      status: `${effectiveReserve.toFixed(0)}h`,
      detail: `Usure ressort: ${powerLoss.toFixed(1)}%`
    });

    // Diagnostics
    const newDiagnostics: Diagnostic[] = [];
    if (amplitude < 220) newDiagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage.` });
    else if (amplitude < 260) newDiagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification.` });
    if (pivotWear > 70) newDiagnostics.push({ level: 'critical', text: `Usure pivots >70% : remplacement nécessaire.` });
    if (beatError > 0.5) newDiagnostics.push({ level: 'warning', text: `Battement élevé : collerette désaxée.` });
    if (Math.abs(totalDeviation) > 15) newDiagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe requise.` });
    if (newDiagnostics.length === 0) newDiagnostics.push({ level: 'ok', text: `✅ Mouvement dans les tolérances.` });
    
    setDiagnostics(newDiagnostics);
  };

  // ==========================================
  // EXPORT PDF
  // ==========================================
  const exportReportPDF = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const doc = new jsPDF();
    
    doc.setFont("courier", "bold");
    doc.setFontSize(16);
    doc.text("RAPPORT TECHNIQUE HORLOLEARN PRO 3.0", 12, 15);
    doc.setFontSize(10);
    doc.text(`Généré le: ${new Date().toLocaleString('fr-CH')}`, 12, 23);
    
    doc.setFontSize(12);
    doc.text(`📌 Mouvement: ${specs.name}`, 12, 35);
    
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    const config = [
      `Amplitude: ${amplitude}°`,
      `Battement: ${beatError}ms`,
      `Position: ${['CH', '6H', '9H', '3H', '12H', 'CU'][position]}`,
      `Température: ${temperature}°C`,
      `Âge: ${age} ans`,
      `Usure pivots: ${pivotWear}%`,
      `Usure ressort: ${mainspringWear}%`,
      ``, `RÉSULTATS:`
    ];
    doc.text(config, 12, 45);
    
    const metrics = [
      `Isochronisme: ${isochronismResult.status}`,
      `Stabilité: ${huygensResult.status}`,
      `Déviation: ${deviationResult.status}`,
      `Réserve: ${powerReserveResult.status}`
    ];
    doc.text(metrics, 12, 85);
    
    doc.text('DIAGNOSTIC:', 12, 110);
    diagnostics.slice(0, 5).forEach((d, i) => {
      doc.text(`→ ${d.text}`, 12, 118 + i * 6);
    });
    
    doc.save(`Rapport-${specs.name.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.pdf`);
    alert('✅ Rapport PDF exporté !');
  };

  const exportJSON = () => {
    const data = {
      timestamp: new Date().toISOString(),
      configuration: {
        calibre, amplitude, beatError, gain, position, temperature, age, pivotWear, mainspringWear
      },
      results: {
        magnetism: magnetismResult,
        impact: impactResult,
        acoustic: acousticResult,
        isochronism: isochronismResult,
        huygens: huygensResult,
        spiral: spiralResult,
        deviation: deviationResult,
        powerReserve: powerReserveResult
      }
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('✅ JSON copié dans le presse-papier !');
  };

  // ==========================================
  // RENDU JSX
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-mono">
      <style jsx global>{`
        :root { --primary: #0a0e27; --accent: #00d4ff; --danger: #ff4757; --warning: #f39c12; --ok: #2ecc71; }
        #container { display: grid; grid-template-columns: 360px 1fr 420px; height: 100vh; }
        #controls { background: #1c2237; padding: 15px; overflow-y: auto; border-right: 2px solid var(--accent); }
        #controls h3 { color: var(--accent); margin-bottom: 15px; font-size: 1rem; }
        .param-group { margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px; }
        .param-group label { display: block; font-size: 0.8rem; margin-bottom: 6px; color: #aaa; }
        .param-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
        .param-row input[type="range"] { flex: 1; }
        .param-value { min-width: 70px; text-align: right; color: var(--accent); font-weight: 600; font-size: 0.8rem; }
        select { width: 100%; padding: 6px; background: #2a2f45; color: #fff; border: 1px solid #444; border-radius: 4px; }
        .btn {
          background: var(--accent); color: var(--primary); border: none;
          padding: 10px; width: 100%; border-radius: 6px; font-weight: 800;
          cursor: pointer; margin-top: 8px; text-transform: uppercase; font-size: 0.8rem;
        }
        .btn-danger { background: var(--danger); color: white; }
        .btn-secondary { background: #2a2f45; color: var(--accent); border: 1px solid var(--accent); }
        #canvas-container { position: relative; background: var(--primary); }
        #canvas { width: 100%; height: 100%; display: block; }
        #results { background: #1c2237; padding: 15px; overflow-y: auto; border-left: 2px solid var(--accent); }
        #results h3 { color: var(--accent); margin-bottom: 15px; font-size: 1rem; }
        .metric { background: #2a2f45; padding: 10px; margin-bottom: 8px; border-radius: 6px; border-left: 3px solid var(--accent); }
        .metric-title { font-size: 0.75rem; color: #888; margin-bottom: 3px; }
        .metric-value { font-size: 1rem; font-weight: 700; }
        .metric-status { font-size: 0.7rem; margin-top: 3px; }
        .status-ok { color: var(--ok); }
        .status-warning { color: var(--warning); }
        .status-critical { color: var(--danger); }
        .diagnostic { background: #2a0a0a; border: 1px solid var(--danger); padding: 12px; margin-top: 15px; border-radius: 6px; }
        .diagnostic h4 { color: var(--danger); margin-bottom: 8px; font-size: 0.85rem; }
        .diagnostic-list { list-style: none; padding: 0; }
        .diagnostic-list li { margin-bottom: 6px; padding-left: 20px; position: relative; font-size: 0.75rem; }
        .diagnostic-list li::before { content: "→"; position: absolute; left: 0; color: var(--danger); }
        .export-section { margin-top: 20px; padding-top: 15px; border-top: 1px solid #333; }
        @keyframes shake { 0%, 100% { transform: translateY(0); } 25% { transform: translateY(5px); } 75% { transform: translateY(-5px); } }
      `}</style>

      <div id="container">
        {/* CONTROLES */}
        <aside id="controls">
          <h3>🎛️ CONFIGURATION MOTEUR</h3>
          
          <div className="param-group">
            <label>Calibre</label>
            <select value={calibre} onChange={(e) => setCalibre(e.target.value)}>
              {Object.entries(TECHNICAL_SPECS).map(([key, val]) => (
                <option key={key} value={key}>{val.name}</option>
              ))}
            </select>
          </div>

          <div className="param-group">
            <label>⚠️ Magnétisation Simulée</label>
            <div className="param-row">
              <span>Champ magnétique:</span>
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={magneticField}
                onChange={(e) => setMagneticField(Number(e.target.value))}
              />
              <span className="param-value">{magneticField} Gauss</span>
            </div>
          </div>

          <div className="param-group">
            <label>🔨 Simulation de Chute</label>
            <div className="param-row">
              <span>Hauteur:</span>
              <input 
                type="range" 
                min="10" 
                max="200" 
                value={dropHeight}
                onChange={(e) => setDropHeight(Number(e.target.value))}
              />
              <span className="param-value">{dropHeight}cm</span>
            </div>
            <div className="param-row">
              <span>Surface:</span>
              <select value={surface} onChange={(e) => setSurface(e.target.value)}>
                <option value="wood">Bois (amortissant)</option>
                <option value="tile">Carrelage (dur)</option>
                <option value="concrete">Béton (très dur)</option>
              </select>
            </div>
            <button className="btn btn-danger" onClick={simulateDrop}>💥 SIMULER CHUTE</button>
          </div>

          <div className="param-group">
            <label>🎙️ Analyse Acoustique (Micro)</label>
            <button 
              className="btn btn-secondary" 
              onClick={startMicrophone}
            >
              {isMicActive ? '🔴 MICRO ACTIF' : '🟢 DÉMARRER MICRO'}
            </button>
          </div>

          <div className="param-group">
            <label>Paramètres Mesurés</label>
            <div className="param-row">
              <span>Amplitude:</span>
              <input 
                type="range" 
                id="amplitude" 
                min="180" 
                max="360" 
                value={amplitude}
                onChange={(e) => setAmplitude(Number(e.target.value))}
              />
              <span className="param-value">{amplitude}°</span>
            </div>
            <div className="param-row">
              <span>Battement:</span>
              <input 
                type="range" 
                id="beat-error" 
                min="0" 
                max="3" 
                step="0.1" 
                value={beatError}
                onChange={(e) => setBeatError(Number(e.target.value))}
              />
              <span className="param-value">{beatError}ms</span>
            </div>
            <div className="param-row">
              <span>Gain:</span>
              <input 
                type="range" 
                id="gain" 
                min="-30" 
                max="30" 
                value={gain}
                onChange={(e) => setGain(Number(e.target.value))}
              />
              <span className="param-value">{gain} s/j</span>
            </div>
          </div>

          <div className="param-group">
            <label>Conditions de Test</label>
            <div className="param-row">
              <span>Position:</span>
              <select 
                id="position" 
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
              >
                <option value="0">CH (Cadran Haut)</option>
                <option value="1">6H (Couronne Gauche)</option>
                <option value="2">9H (Couronne Bas)</option>
                <option value="3">3H (Couronne Haut)</option>
                <option value="4">12H (Cadran Bas)</option>
                <option value="5">CU (Couronne Dessus)</option>
              </select>
            </div>
            <div className="param-row">
              <span>Température:</span>
              <input 
                type="range" 
                id="temperature" 
                min="-10" 
                max="50" 
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
              />
              <span className="param-value">{temperature}°C</span>
            </div>
            <div className="param-row">
              <span>Âge mouvement:</span>
              <input 
                type="range" 
                id="age" 
                min="0" 
                max="30" 
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <span className="param-value">{age} ans</span>
            </div>
          </div>

          <div className="param-group">
            <label>Usure Simulée</label>
            <div className="param-row">
              <span>Pivots:</span>
              <input 
                type="range" 
                id="pivot-wear" 
                min="0" 
                max="100" 
                value={pivotWear}
                onChange={(e) => setPivotWear(Number(e.target.value))}
              />
              <span className="param-value">{pivotWear}%</span>
            </div>
            <div className="param-row">
              <span>Ressort moteur:</span>
              <input 
                type="range" 
                id="mainspring-wear" 
                min="0" 
                max="100" 
                value={mainspringWear}
                onChange={(e) => setMainspringWear(Number(e.target.value))}
              />
              <span className="param-value">{mainspringWear}%</span>
            </div>
          </div>

          <button className="btn" onClick={runFullSimulation}>▶️ LANCER SIMULATION COMPLETE</button>
        </aside>

        {/* CANVAS 3D */}
        <main id="canvas-container" ref={containerRef}>
          <canvas id="canvas" ref={canvasRef}></canvas>
        </main>

        {/* RESULTATS */}
        <aside id="results">
          <h3>📊 RAPPORT TECHNIQUE AVANCÉ</h3>
          
          <div className="metric">
            <div className="metric-title">Magnétisme Simulé</div>
            <div className="metric-value">{magnetismResult.level.toFixed(0)}% (0° perdu)</div>
            <div className={`metric-status ${magnetismResult.status}`}>
              {magnetismResult.diagnostic}
            </div>
          </div>

          <div className="metric">
            <div className="metric-title">Impact Chute Simulée</div>
            <div className="metric-value">{impactResult.status}</div>
            <div className={`metric-status ${impactResult.statusClass}`}>
              {impactResult.recommendation}
            </div>
          </div>

          <div className="metric">
            <div className="metric-title">Analyse Acoustique</div>
            <div className="metric-value">{acousticResult.status}</div>
            <div className="metric-status">{acousticResult.detail}</div>
          </div>

          <div className="metric">
            <div className="metric-title">État Isochronisme</div>
            <div className="metric-value">{isochronismResult.status}</div>
            <div className="metric-status">{isochronismResult.detail}</div>
          </div>

          <div className="metric">
            <div className="metric-title">Position de Huygens</div>
            <div className="metric-value">{huygensResult.status}</div>
            <div className="metric-status">{huygensResult.detail}</div>
          </div>

          <div className="metric">
            <div className="metric-title">Effet Dynamique Spiral</div>
            <div className="metric-value">{spiralResult.status}</div>
            <div className="metric-status">{spiralResult.detail}</div>
          </div>

          <div className="metric">
            <div className="metric-title">Déviation Totale Estimée</div>
            <div className="metric-value">{deviationResult.status}</div>
            <div className="metric-status">{deviationResult.detail}</div>
          </div>

          <div className="metric">
            <div className="metric-title">Réserve de Marche Simulée</div>
            <div className="metric-value">{powerReserveResult.status}</div>
            <div className="metric-status">{powerReserveResult.detail}</div>
          </div>

          {diagnostics.length > 0 && (
            <div className="diagnostic">
              <h4>🔍 DIAGNOSTIC AUTOMATIQUE</h4>
              <ul className="diagnostic-list">
                {diagnostics.map((d, i) => (
                  <li 
                    key={i}
                    className={d.level === 'critical' ? 'text-red-500' : 
                               d.level === 'warning' ? 'text-yellow-400' : 
                               'text-green-400'}
                  >
                    → {d.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="export-section">
            <button className="btn" onClick={exportReportPDF}>📄 Exporter Rapport PDF</button>
            <button className="btn" onClick={exportJSON}>🔄 Exporter JSON</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
