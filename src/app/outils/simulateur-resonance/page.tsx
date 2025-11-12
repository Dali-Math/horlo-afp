'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import jsPDF from 'jspdf';
import { TECHNICAL_SPECS } from '@/lib/simulateur/database';
import { MagnetismResult, ImpactResult, AcousticAnalysis, Diagnostic } from '@/lib/simulateur/types';
import type { TechnicalSpecs, SimulationResults, Diagnostic } from './types';
import { calculateMagnetism } from '@/lib/simulateur/modules/magnetism';
import { simulateDrop } from '@/lib/simulateur/modules/impact';
import { calculateAmplitudeLoss, calculateTimingDeviation, calculatePowerReserve } from '@/lib/simulateur/physics-engine';
import DiagnosticsPanel from '@/components/simulateur/DiagnosticsPanel';
import ImpactSimulator from '@/components/simulateur/ImpactSimulator';
import MicrophoneAnalyzer from '@/components/simulateur/MicrophoneAnalyzer';

export default function SimulateurResonance3D() {
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
  const [impactResult, setImpactResult] = useState<ImpactResult | null>(null);
  const [magnetismResult, setMagnetismResult] = useState<MagnetismResult | null>(null);
  const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);
  // ⬇️ AJOUT DE CES DEUX ÉTATS ⬇️
  const [effectiveReserve, setEffectiveReserve] = useState<number>(0);
  const [totalDeviation, setTotalDeviation] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const balanceRef = useRef<THREE.Mesh | null>(null);
  const hairspringRef = useRef<THREE.Line | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialisation Three.js
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

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const specs = TECHNICAL_SPECS[calibre];
      if (balanceRef.current && hairspringRef.current) {
        const wearFactor = 1 - (pivotWear / 100) * 0.3;
        const time = Date.now() * 0.001;
        const angle = (amplitude * Math.PI / 180) * Math.sin(time * specs.frequency * 2 * Math.PI) * wearFactor;
        balanceRef.current.rotation.z = angle;
        hairspringRef.current.rotation.z = angle * 0.3;
      }
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

  // Simulation complète
  const runSimulation = () => {
    const specs = TECHNICAL_SPECS[calibre];
    
    // Calculs avancés
    const magResult = calculateMagnetism(specs.beatRate, amplitude, age * 8760, magneticField);
    setMagnetismResult(magResult);
    
    // Isochronisme & autres métriques
    const amplitudeLoss = specs.ampNorm - amplitude;
    const isochronismError = Math.max(0, amplitudeLoss * 0.03);
    const positionDeviation = specs.positions[position];
    const huygensScore = 100 - Math.abs(positionDeviation) * 5;
    const beatImpact = beatError * 2;
    const tempImpact = (temperature - 23) * specs.tempCoef;
    const totalDeviation = positionDeviation + gain + tempImpact - isochronismError;
    const effectiveReserve = calculatePowerReserve(specs.powerReserve, mainspringWear, age);

    // ⬇️ METTRE À JOUR L'ÉTAT ⬇️
    setEffectiveReserve(effectiveReserve);
    setTotalDeviation(totalDeviation);

    // Diagnostics
    const newDiagnostics: Diagnostic[] = [];
    if (amplitude < 220) newDiagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage.` });
    else if (amplitude < 260) newDiagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification.` });
    if (pivotWear > 70) newDiagnostics.push({ level: 'critical', text: `Usure pivots >70% : remplacement nécessaire.` });
    if (beatError > 0.5) newDiagnostics.push({ level: 'warning', text: `Battement élevé : collerette désaxée.` });
    if (magResult.level > 60) newDiagnostics.push({ level: 'critical', text: `Magnétisme ${magResult.level.toFixed(0)}% : démagnétisation requise.` });
    if (Math.abs(totalDeviation) > 15) newDiagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe requise.` });
    if (newDiagnostics.length === 0) newDiagnostics.push({ level: 'ok', text: `✅ Mouvement dans les tolérances.` });
    
    setDiagnostics(newDiagnostics);
  };

  // Export PDF
  const exportReport = () => {
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
      `Magnétisme: ${magneticField} Gauss`,
      ``, `RÉSULTATS:`
    ];
    doc.text(config, 12, 45);
    
    const metrics = [
      `Isochronisme: ${magnetismResult ? magnetismResult.beatRateDeviation.toFixed(2) + ' Hz' : '-'}`,
      `Magnétisme: ${magnetismResult ? magnetismResult.level.toFixed(0) + '%' : '-'}`,
      `Réserve: ${effectiveReserve.toFixed(0)}h`,
      `Déviation totale: ${totalDeviation.toFixed(1)} s/j`
    ];
    doc.text(metrics, 12, 85);
    
    doc.text('DIAGNOSTIC:', 12, 110);
    diagnostics.slice(0, 5).forEach((d, i) => {
      doc.text(`→ ${d.text}`, 12, 118 + i * 6);
    });
    
    doc.save(`Rapport-${specs.name.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-mono">
      <div id="container">
        {/* CONTROLS */}
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
            <label>⚠️ Magnétisation</label>
            <div className="param-row">
              <span>Champ:</span>
              <input type="range" min="0" max="500" value={magneticField} 
                onChange={(e) => setMagneticField(Number(e.target.value))} />
              <span className="param-value">{magneticField} Gauss</span>
            </div>
          </div>

          <ImpactSimulator 
            pivotWear={pivotWear} 
            amplitude={amplitude}
            onImpact={(r: any) => {
              setImpactResult(r);
              // Animation caméra
              const canvas = document.getElementById('canvas-container');
              canvas?.animate([
                { transform: 'translateY(0px)' },
                { transform: 'translateY(20px)', offset: 0.3 },
                { transform: 'translateY(0px)', offset: 1 }
              ], { duration: 500, iterations: 1 });
            }} 
          />

          <MicrophoneAnalyzer />

          <div className="param-group">
            <label>Paramètres Mesurés</label>
            <div className="param-row">
              <span>Amplitude:</span>
              <input type="range" min="180" max="360" value={amplitude} 
                onChange={(e) => setAmplitude(Number(e.target.value))} />
              <span className="param-value">{amplitude}°</span>
            </div>
            {/* Ajouter beatError, gain... */}
          </div>

          <button className="btn" onClick={runSimulation}>▶️ LANCER SIMULATION</button>
        </aside>

        {/* 3D VIEW */}
        <main id="canvas-container" ref={containerRef}>
          <canvas id="canvas" ref={canvasRef}></canvas>
        </main>

        {/* RESULTS */}
        <aside id="results">
          <h3>📊 RAPPORT TECHNIQUE</h3>
          
          {magnetismResult && (
            <div className="metric">
              <div className="metric-title">Magnétisme Simulé</div>
              <div className="metric-value">{magnetismResult.level.toFixed(0)}%</div>
              <div className={`metric-status status-${magnetismResult.recommendedAction}`}>
                {magnetismResult.diagnostic}
              </div>
            </div>
          )}

          <DiagnosticsPanel diagnostics={diagnostics} />
          
          <div className="export-section">
            <button className="btn" onClick={exportReport}>📄 Exporter PDF</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
