'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import MOUVEMENTS_DB, { MouvementSpecs } from '@/lib/simulateur/database';

type Diagnostic = { level: 'ok' | 'warning' | 'critical'; text: string };

export default function SimulateurResonance3D() {
  // États React
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
  const [isLoaded, setIsLoaded] = useState(false); // ✅ État pour masquer le chargement

  // Initialisation Three.js
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
    animate();
    setIsLoaded(true); // ✅ Masquer le message après initialisation

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

  const animate = () => {
    animationRef.current = requestAnimationFrame(animate);
    if (balanceRef.current && springRef.current && animationRunning) {
      const wearFactor = 1 - (pivotWear / 100) * 0.3;
      const time = Date.now() * 0.001;
      const angle = (amplitude * Math.PI / 180) * Math.sin(time * MOUVEMENTS_DB[calibre].frequency * 2 * Math.PI) * wearFactor;
      balanceRef.current.rotation.z = angle;
      springRef.current.rotation.z = angle * 0.5;
    }
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  // Simulation
  const runSimulation = useCallback(() => {
    setAnimationRunning(true);
    const specs = MOUVEMENTS_DB[calibre];
    
    const isoError = Math.max(0, (specs.ampNorm - amplitude) * 0.03);
    const posDev = specs.positions[position];
    const tempDev = (temperature - 23) * specs.tempCoef;
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
    if (amplitude < 220) newDiagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage` });
    else if (amplitude < 260) newDiagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification` });
    if (pivotWear > 70) newDiagnostics.push({ level: 'critical', text: `Usure pivots >70% : remplacement nécessaire` });
    if (mainspringWear > 80) newDiagnostics.push({ level: 'warning', text: `Ressort moteur fatigué : perte de réserve significative` });
    if (beatError > 0.5) newDiagnostics.push({ level: 'warning', text: `Battement élevé : collerette d'ancre désaxée` });
    if (Math.abs(totalDev) > 10) newDiagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe requise` });
    
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

  return (
    <div className="min-h-screen bg-[#0a0e27] font-mono">
      <style jsx global>{`.font-mono { font-family: 'JetBrains Mono', 'Courier New', monospace; }`}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#1c2237] flex items-center px-8 border-b-2 border-[#00d4ff] z-50">
        <div className="text-xl font-extrabold text-[#00d4ff] tracking-tight">HORLOLEARN</div>
        <div className="ml-5 text-sm text-gray-400">Simulateur de Résonance 3D – Outil Pro #23</div>
      </header>

      {/* Main Container */}
      <div className="grid grid-cols-[340px_1fr_420px] h-screen pt-16">
        
        {/* Controls Panel */}
        <aside className="bg-[#1c2237] p-5 overflow-y-auto border-r border-[#00d4ff]">
          <div className="space-y-6">
            <ControlSection title="Configuration Mouvement">
              <ParamRow 
                label="Calibre" 
                type="select" 
                options={Object.entries(MOUVEMENTS_DB).map(([k, v]) => ({ value: k, label: v.name }))} 
                value={calibre} 
                onChange={setCalibre} 
              />
            </ControlSection>

            <ControlSection title="Paramètres Mesurés">
              <ParamRow label="Amplitude" type="range" min={180} max={360} value={amplitude} suffix="°" onChange={setAmplitude} />
              <ParamRow label="Battement" type="range" min={0} max={3} step={0.1} value={beatError} suffix="ms" onChange={setBeatError} />
              <ParamRow label="Gain/Perte" type="range" min={-30} max={30} value={gain} suffix=" s/j" onChange={setGain} />
            </ControlSection>

            <ControlSection title="Conditions Test">
              <ParamRow 
                label="Position" 
                type="select" 
                options={[
                  { value: 3, label: '3H (Couronne Haut)' },
                  { value: 0, label: 'CH' }, { value: 1, label: '6H' },
                  { value: 2, label: '9H' }, { value: 4, label: '12H' }, { value: 5, label: 'CU' },
                ]} 
                value={position} 
                onChange={setPosition} 
              />
              <ParamRow label="Température" type="range" min={-10} max={50} value={temperature} suffix="°C" onChange={setTemperature} />
            </ControlSection>

            <ControlSection title="Usure Simulée">
              <ParamRow label="Pivots" type="range" min={0} max={100} value={pivotWear} suffix="%" onChange={setPivotWear} />
              <ParamRow label="Ressort Moteur" type="range" min={0} max={100} value={mainspringWear} suffix="%" onChange={setMainspringWear} />
            </ControlSection>

            <div className="space-y-3 pt-4">
              <button onClick={runSimulation} className="w-full py-3 bg-[#00d4ff] text-[#0a0e27] font-extrabold rounded uppercase hover:scale-105 transition">
                ▶️ Lancer Simulation
              </button>
              <button onClick={resetAll} className="w-full py-3 border-2 border-[#00d4ff] text-[#00d4ff] font-extrabold rounded uppercase">
                ⏹️ Reset
              </button>
            </div>
          </div>
        </aside>

        {/* 3D View - Centré ✨ */}
        <main className="relative bg-[#0a0e27] flex items-center justify-center" ref={containerRef}>
          <canvas ref={canvasRef} className="w-full h-full block" />
          {/* Message de chargement - masqué après initialisation */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-[#00d4ff] z-10">
              ⏳ Chargement moteur physique...
            </div>
          )}
        </main>

        {/* Results Panel */}
        <aside className="bg-[#1c2237] p-5 overflow-y-auto border-l border-[#00d4ff]">
          <div className="space-y-4">
            <MetricCard title="Isochronisme" value={isoValue} status={isoStatus} />
            <MetricCard title="Stabilité Position" value={posValue} status={posStatus} />
            <MetricCard title="Déviation Thermique" value={tempValueRes} status={tempStatus} />
            <MetricCard title="Réserve de Marche" value={powerValue} status={powerStatus} />
            
            {diagnosticVisible && (
              <div className="bg-red-950/30 border border-red-500 rounded p-4">
                <h4 className="text-red-500 font-extrabold mb-3">🔍 Diagnostic Technique</h4>
                <div className="space-y-2">
                  {diagnostics.length > 0 ? (
                    diagnostics.map((d, i) => (
                      <div key={i} className={`text-sm py-1 border-b border-red-500/20 ${d.level === 'critical' ? 'text-red-500' : 'text-yellow-400'}`}>
                        → {d.text}
                      </div>
                    ))
                  ) : (
                    <div className="text-green-400">✅ Mouvement dans les tolérances</div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <button onClick={exportReport} className="w-full py-3 bg-[#00d4ff] text-[#0a0e27] font-extrabold rounded uppercase">📄 Exporter PDF</button>
              <button onClick={shareResults} className="w-full py-3 border-2 border-[#00d4ff] text-[#00d4ff] font-extrabold rounded uppercase">🔗 Partager</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Composants réutilisables
function ControlSection({ title, children }: any) {
  return (
    <div>
      <h3 className="text-[#00d4ff] text-xs font-extrabold uppercase tracking-wider mb-4">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function ParamRow({ label, type = 'select', options, value, onChange, min, max, step, suffix }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-400">{label}</span>
      {type === 'select' ? (
        <select
          className="flex-1 px-2 py-1 bg-[#2a2f45] border border-gray-600 rounded text-white text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt: any) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type="range"
          className="flex-1"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      )}
      <span className="min-w-[70px] text-right font-extrabold text-[#00d4ff] text-sm">
        {value}{suffix}
      </span>
    </div>
  );
}

function MetricCard({ title, value, status }: any) {
  const statusColors = {
    'status-ok': 'bg-green-500/20 text-green-400',
    'status-warning': 'bg-yellow-500/20 text-yellow-400',
    'status-critical': 'bg-red-500/20 text-red-500',
  };

  return (
    <div className="bg-[#2a2f45] p-4 rounded border-l-4 border-[#00d4ff]">
      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{title}</div>
      <div className="text-lg font-extrabold mb-1">{value}</div>
      <div className={`text-xs px-2 py-1 rounded inline-block ${statusColors[status as keyof typeof statusColors] || ''}`}>
        {status ? status.replace('status-', '') : '-'}
      </div>
    </div>
  );
}
