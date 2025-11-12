'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import MOUVEMENTS_DB from '@/lib/simulateur/database';
import type { MouvementSpecs } from '@/lib/simulateur/types';

type Diagnostic = { level: 'ok' | 'warning' | 'critical'; text: string };

export default function SimulateurResonance3D() {
// Base de données technique (comme dans le HTML)
const TECHNICAL_SPECS: Record<string, any> = {
  eta2824: {
    name: "ETA 2824-2", diameter: 25.6, height: 4.6, jewels: 25,
    frequency: 4, amplitudeNorm: 310, beatNorm: 0.1, powerReserve: 38,
    positions: [0, 4, 6, 8, 12, 14],
    tempCoef: 0.6, hairspring: "Nivarox II", regulator: "ETAChron"
  },
  eta2892: {
    name: "ETA 2892-A2", diameter: 25.6, height: 3.6, jewels: 21,
    frequency: 4, amplitudeNorm: 310, beatNorm: 0.1, powerReserve: 50,
    positions: [0, 3, 5, 7, 10, 12],
    tempCoef: 0.5, hairspring: "Nivarox", regulator: "ETAChron"
  },
  valjoux7750: {
    name: "Valjoux 7750", diameter: 30, height: 7.9, jewels: 25,
    frequency: 3, amplitudeNorm: 300, beatNorm: 0.2, powerReserve: 42,
    positions: [0, 5, 7, 9, 13, 16],
    tempCoef: 0.8, hairspring: "Nivarox", regulator: "Cam-switching"
  },
  rolex3135: {
    name: "Rolex 3135", diameter: 28.5, height: 6, jewels: 31,
    frequency: 4, amplitudeNorm: 320, beatNorm: 0.1, powerReserve: 48,
    positions: [0, 2, 3, 4, 6, 8],
    tempCoef: 0.4, hairspring: "Parachrom Bleu", regulator: "Microstella"
  },
  patek240: {
    name: "Patek Philippe 240", diameter: 27.5, height: 2.53, jewels: 27,
    frequency: 3, amplitudeNorm: 315, beatNorm: 0.05, powerReserve: 48,
    positions: [0, 1, 2, 3, 4, 5],
    tempCoef: 0.3, hairspring: "Spiromax", regulator: "Gyromax"
  },
  coaxial8900: {
    name: "Omega Co-Axial 8900", diameter: 33, height: 5.5, jewels: 39,
    frequency: 3.5, amplitudeNorm: 315, beatNorm: 0.1, powerReserve: 60,
    positions: [0, 2, 3, 4, 5, 6],
    tempCoef: 0.35, hairspring: "Silicium", regulator: "Co-Axial"
  },
  seiko4r36: {
    name: "Seiko 4R36", diameter: 27.4, height: 5.3, jewels: 24,
    frequency: 3, amplitudeNorm: 300, beatNorm: 0.3, powerReserve: 41,
    positions: [0, 4, 6, 8, 10, 12],
    tempCoef: 0.7, hairspring: "Spron 510", regulator: "Diashock"
  }
};

export default function SimulateurResonance3D() {
  const [calibre, setCalibre] = useState('eta2824');
  const [amplitude, setAmplitude] = useState(310);
  const [beatError, setBeatError] = useState(0.2);
  const [gain, setGain] = useState(0);
  const [position, setPosition] = useState(3);
  const [temperature, setTemperature] = useState(23);
  const [age, setAge] = useState(5);
  const [pivotWear, setPivotWear] = useState(20);
  const [mainspringWear, setMainspringWear] = useState(10);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const balanceRef = useRef<THREE.Mesh | null>(null);
  const hairspringRef = useRef<THREE.Line | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    const container = containerRef.current;
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
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

    const ambientLight = new THREE.AmbientLight(0x404080, 0.3);
    scene.add(ambientLight);

    // Création modèles 3D
    const balanceGeo = new THREE.TorusGeometry(1.5, 0.08, 12, 48);
    const balanceMat = new THREE.MeshStandardMaterial({
      color: 0xc9a961, metalness: 0.95, roughness: 0.05
    });
    const balance = new THREE.Mesh(balanceGeo, balanceMat);
    balance.castShadow = true;
    balance.receiveShadow = true;
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
    const coils = 12; const startRadius = 0.3; const spacing = 0.08;
    for (let i = 0; i < 200; i++) {
      const t = i / 200; const angle = t * coils * Math.PI * 2;
      const radius = startRadius + t * coils * spacing;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        t * 0.5 - 0.25,
        Math.sin(angle) * radius
      ));
    }
    const springGeo = new THREE.BufferGeometry().setFromPoints(points);
    const springMat = new THREE.LineBasicMaterial({ color: 0x888888, linewidth: 2 });
    const hairspring = new THREE.Line(springGeo, springMat);
    scene.add(hairspring);
    hairspringRef.current = hairspring;

    const pivotGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8);
    const pivotMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.8 });
    const pivotTop = new THREE.Mesh(pivotGeo, pivotMat);
    pivotTop.position.y = 1.5;
    const pivotBottom = new THREE.Mesh(pivotGeo, pivotMat);
    pivotBottom.position.y = -1.5;
    scene.add(pivotTop, pivotBottom);

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const specs = TECHNICAL_SPECS[calibre];
      const currentAmplitude = amplitude;
      const wear = pivotWear / 100;

      if (balanceRef.current) {
        const time = Date.now() * 0.001;
        const angle = (currentAmplitude * Math.PI / 180) * Math.sin(time * specs.frequency * 2 * Math.PI);
        balanceRef.current.rotation.z = angle;
        if (hairspringRef.current) {
          hairspringRef.current.rotation.z = angle * 0.3;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const container = containerRef.current;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [calibre, amplitude, pivotWear]);

  const runSimulation = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const amplitudeLoss = specs.amplitudeNorm - amplitude;
    const isochronismError = Math.max(0, amplitudeLoss * 0.03);
    const isochronismStatus = isochronismError < 3 ? 'status-ok' : isochronismError < 8 ? 'status-warning' : 'status-critical';

    const positionDeviation = specs.positions[position];
    const huygensScore = 100 - Math.abs(positionDeviation) * 5;
    const huygensStatus = huygensScore > 80 ? 'status-ok' : huygensScore > 60 ? 'status-warning' : 'status-critical';

    const beatImpact = beatError * 2;
    const tempImpact = (temperature - 23) * specs.tempCoef;
    const dynamicError = beatImpact + tempImpact;

    const totalDeviation = positionDeviation + gain + tempImpact - isochronismError;
    const totalDeviationStatus = Math.abs(totalDeviation) > 10 ? 'status-critical' : 'status-ok';

    const powerLoss = (mainspringWear * 0.5) + (age * 1.2);
    const effectiveReserve = specs.powerReserve - powerLoss;

    document.getElementById('isochronism-status')!.textContent = `${isochronismError.toFixed(2)} s/j`;
    document.getElementById('isochronism-detail')!.textContent = `Perte amplitude: ${amplitudeLoss}°`;
    document.getElementById('huygens-status')!.textContent = `${huygensScore.toFixed(0)}%`;
    document.getElementById('huygens-detail')!.textContent = `Déviation position: ${positionDeviation} s/j`;
    document.getElementById('spiral-status')!.textContent = `${dynamicError.toFixed(2)} s/j`;
    document.getElementById('spiral-detail')!.textContent = `Battement: ${beatImpact.toFixed(1)}s/j, Temp: ${tempImpact.toFixed(1)}s/j`;
    document.getElementById('deviation-status')!.textContent = `${totalDeviation > 0 ? '+' : ''}${totalDeviation.toFixed(1)} s/j`;
    document.getElementById('deviation-detail')!.textContent = `Total cumulée`;
    document.getElementById('power-reserve-status')!.textContent = `${effectiveReserve.toFixed(0)}h`;
    document.getElementById('power-reserve-detail')!.textContent = `Usure ressort: ${powerLoss.toFixed(1)}%`;

    // Diagnostics
    const diagnostics: Array<{ level: string; text: string }> = [];
    if (amplitude < 220) {
      diagnostics.push({ level: 'critical', text: `Amplitude critique (${amplitude}°) : risque de décrochage. Pivots usés ou ressort moteur faible.` });
    } else if (amplitude < 260) {
      diagnostics.push({ level: 'warning', text: `Amplitude basse : vérifier lubrification et jeu du balancier.` });
    }
    if (pivotWear > 70) {
      diagnostics.push({ level: 'critical', text: `Usure pivots >70% : pivotement dégradé. Remplacer pivots et pierres. Réf. OEM requise.` });
    }
    if (beatError > 0.5) {
      diagnostics.push({ level: 'warning', text: `Battement élevé (${beatError}ms) : collerette d'ancre désaxée ou jeu de l'axe.` });
    }
    if (Math.abs(totalDeviation) > 15) {
      diagnostics.push({ level: 'critical', text: `Déviation importante : régulation complexe nécessaire. Analyse échappement recommandée.` });
    }
    if (isochronismError > 5) {
      diagnostics.push({ level: 'warning', text: `Isochronisme dégradé : spiral fatigué ou défaut de fixation.` });
    }
    if (diagnostics.length === 0) {
      diagnostics.push({ level: 'ok', text: `✅ Mouvement dans les tolérances. Continuer surveillance.` });
    }

    const diagList = document.getElementById('diagnostic-list');
    if (diagList) {
      diagList.innerHTML = '';
      diagnostics.forEach(d => {
        const li = document.createElement('li');
        li.textContent = d.text;
        li.style.color = d.level === 'critical' ? '#ff4757' : d.level === 'warning' ? '#f39c12' : '#2ecc71';
        diagList.appendChild(li);
      });
    }
    document.getElementById('diagnostic')!.style.display = 'block';
  };

  const exportReport = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const report = {
      titre: `Rapport Technique - ${specs.name}`,
      date: new Date().toLocaleString('fr-CH'),
      configuration: {
        calibre: specs.name,
        amplitude: `${amplitude}°`,
        battement: `${beatError}ms`,
        position: document.getElementById('position')?.textContent || '',
        temperature: `${temperature}°C`,
        usure: `${pivotWear}%`
      },
      mesures: {
        isochronisme: document.getElementById('isochronism-status')?.textContent || '',
        stabilitePosition: document.getElementById('huygens-status')?.textContent || '',
        deviationTotale: document.getElementById('deviation-status')?.textContent || '',
        reserveMarche: document.getElementById('power-reserve-status')?.textContent || ''
      },
      diagnostics: []
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapport-Tech-${specs.name.replace(/ /g, '-')}-${Date.now()}.json`;
    a.click();
    alert("✅ Rapport technique exporté (format JSON - PDF en dev)");
  };

  const exportJSON = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const data = {
      metadata: {
        generatedAt: new Date().toISOString(),
        softwareVersion: "2.0.0",
        calibre: specs
      },
      inputs: { amplitude, beatError, gain, position, temperature, age, pivotWear, mainspringWear },
      calculations: {
        isochronisme: document.getElementById('isochronism-status')?.textContent,
        huygensScore: document.getElementById('huygens-status')?.textContent,
        totalDeviation: document.getElementById('deviation-status')?.textContent,
        effectiveReserve: document.getElementById('power-reserve-status')?.textContent
      }
    };
    
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("✅ Données techniques copiées dans le presse-papier (JSON)");
  };

  const handleInputChange = (setter: (v: number) => void, displayId: string, suffix: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setter(value);
      const displayEl = document.getElementById(displayId);
      if (displayEl) displayEl.textContent = `${value}${suffix}`;
    };
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white font-mono">
      <style jsx global>{`
        :root { --primary: #0a0e27; --accent: #00d4ff; --danger: #ff4757; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'JetBrains Mono', 'Courier New', monospace; background: var(--primary); color: #fff; overflow: hidden; }
        #container { display: grid; grid-template-columns: 320px 1fr 400px; height: 100vh; }
        
        #controls {
          background: #1c2237; padding: 20px; overflow-y: auto;
          border-right: 2px solid var(--accent);
        }
        #controls h3 { color: var(--accent); margin-bottom: 20px; font-size: 1.1rem; }
        .param-group { margin-bottom: 25px; border-bottom: 1px solid #333; padding-bottom: 15px; }
        .param-group label { display: block; font-size: 0.85rem; margin-bottom: 8px; color: #aaa; }
        .param-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .param-row input[type="range"] { flex: 1; }
        .param-value { min-width: 60px; text-align: right; color: var(--accent); font-weight: 600; font-size: 0.9rem; }
        select { width: 100%; padding: 8px; background: #2a2f45; color: #fff; border: 1px solid #444; border-radius: 4px; }
        .btn {
          background: var(--accent); color: var(--primary); border: none;
          padding: 12px; width: 100%; border-radius: 6px; font-weight: 800;
          cursor: pointer; margin-top: 10px; text-transform: uppercase;
        }

        #canvas-container { position: relative; background: var(--primary); }
        #canvas { width: 100%; height: 100%; display: block; }

        #results {
          background: #1c2237; padding: 20px; overflow-y: auto;
          border-left: 2px solid var(--accent);
        }
        #results h3 { color: var(--accent); margin-bottom: 20px; }
        .metric {
          background: #2a2f45; padding: 12px; margin-bottom: 12px;
          border-radius: 6px; border-left: 3px solid var(--accent);
        }
        .metric-title { font-size: 0.8rem; color: #888; margin-bottom: 4px; }
        .metric-value { font-size: 1.1rem; font-weight: 700; }
        .metric-status { font-size: 0.75rem; margin-top: 4px; }
        .status-ok { color: #2ecc71; }
        .status-warning { color: #f39c12; }
        .status-critical { color: var(--danger); }
        
        .diagnostic {
          background: #2a0a0a; border: 1px solid var(--danger);
          padding: 15px; margin-top: 20px; border-radius: 6px;
        }
        .diagnostic h4 { color: var(--danger); margin-bottom: 10px; }
        .diagnostic-list { list-style: none; padding: 0; }
        .diagnostic-list li { margin-bottom: 8px; padding-left: 20px; position: relative; }
        .diagnostic-list li::before { content: "→"; position: absolute; left: 0; color: var(--danger); }

        .export-section {
          margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;
        }
        
        #chart-container { height: 200px; margin-top: 20px; }
      `}</style>

      <div id="container">
        {/* CONTROLES */}
        <div id="controls">
          <h3>🎛️ CONFIGURATION MOTEUR</h3>
          
          <div className="param-group">
            <label>Calibre</label>
            <select id="calibre" value={calibre} onChange={(e) => setCalibre(e.target.value)}>
              <option value="eta2824">ETA 2824-2 (11.5''')</option>
              <option value="eta2892">ETA 2892-A2 (11.5''')</option>
              <option value="valjoux7750">Valjoux 7750 (13.25''')</option>
              <option value="rolex3135">Rolex 3135 (11.5''')</option>
              <option value="patek240">PP 240 (10.5''')</option>
              <option value="coaxial8900">Omega Co-Axial 8900 (13''')</option>
              <option value="seiko4r36">Seiko 4R36 (11.5''')</option>
            </select>
          </div>

          <div className="param-group">
            <label>Paramètres Mesurés</label>
            <div className="param-row">
              <span>Amplitude:</span>
              <input type="range" id="amplitude" min={180} max={360} value={amplitude}
                onChange={handleInputChange(setAmplitude, 'amp-display', '°')} />
              <span className="param-value" id="amp-display">{amplitude}°</span>
            </div>
            <div className="param-row">
              <span>Battement:</span>
              <input type="range" id="beat-error" min={0} max={3} step={0.1} value={beatError}
                onChange={handleInputChange(setBeatError, 'beat-display', 'ms')} />
              <span className="param-value" id="beat-display">{beatError}ms</span>
            </div>
            <div className="param-row">
              <span>Gain:</span>
              <input type="range" id="gain" min={-30} max={30} value={gain}
                onChange={handleInputChange(setGain, 'gain-display', ' s/j')} />
              <span className="param-value" id="gain-display">{gain} s/j</span>
            </div>
          </div>

          <div className="param-group">
            <label>Conditions de Test</label>
            <div className="param-row">
              <span>Position:</span>
              <select id="position" value={position} onChange={(e) => setPosition(parseInt(e.target.value))}>
                <option value={0}>CH (Cadran Haut)</option>
                <option value={1}>6H (Couronne Gauche)</option>
                <option value={2}>9H (Couronne Bas)</option>
                <option value={3}>3H (Couronne Haut)</option>
                <option value={4}>12H (Cadran Bas)</option>
                <option value={5}>CU (Couronne Dessus)</option>
              </select>
            </div>
            <div className="param-row">
              <span>Température:</span>
              <input type="range" id="temperature" min={-10} max={50} value={temperature}
                onChange={handleInputChange(setTemperature, 'temp-display', '°C')} />
              <span className="param-value" id="temp-display">{temperature}°C</span>
            </div>
            <div className="param-row">
              <span>Âge mouvement:</span>
              <input type="range" id="age" min={0} max={30} value={age}
                onChange={handleInputChange(setAge, 'age-display', ' ans')} />
              <span className="param-value" id="age-display">{age} ans</span>
            </div>
          </div>

          <div className="param-group">
            <label>Usure Simulée</label>
            <div className="param-row">
              <span>Pivots:</span>
              <input type="range" id="pivot-wear" min={0} max={100} value={pivotWear}
                onChange={handleInputChange(setPivotWear, 'pivot-display', '%')} />
              <span className="param-value" id="pivot-display">{pivotWear}%</span>
            </div>
            <div className="param-row">
              <span>Ressort moteur:</span>
              <input type="range" id="mainspring-wear" min={0} max={100} value={mainspringWear}
                onChange={handleInputChange(setMainspringWear, 'ms-display', '%')} />
              <span className="param-value" id="ms-display">{mainspringWear}%</span>
            </div>
          </div>

          <button className="btn" onClick={runSimulation}>▶️ LANCER SIMULATION COMPLETE</button>
        </div>

        {/* CANVAS 3D */}
        <div id="canvas-container" ref={containerRef}>
          <canvas id="canvas" ref={canvasRef}></canvas>
        </div>

        {/* RESULTATS */}
        <div id="results">
          <h3>📊 RAPPORT TECHNIQUE</h3>
          
          <div className="metric">
            <div className="metric-title">État Isochronisme</div>
            <div className="metric-value" id="isochronism-status">En attente...</div>
            <div className="metric-status" id="isochronism-detail">-</div>
          </div>

          <div className="metric">
            <div className="metric-title">Position de Huygens</div>
            <div className="metric-value" id="huygens-status">En attente...</div>
            <div className="metric-status" id="huygens-detail">-</div>
          </div>

          <div className="metric">
            <div className="metric-title">Effet Dynamique Spiral</div>
            <div className="metric-value" id="spiral-status">En attente...</div>
            <div className="metric-status" id="spiral-detail">-</div>
          </div>

          <div className="metric">
            <div className="metric-title">Déviation Totale Estimée</div>
            <div className="metric-value" id="deviation-status">En attente...</div>
            <div className="metric-status" id="deviation-detail">-</div>
          </div>

          <div className="metric">
            <div className="metric-title">Réserve de Marche Simulée</div>
            <div className="metric-value" id="power-reserve-status">En attente...</div>
            <div className="metric-status" id="power-reserve-detail">-</div>
          </div>

          <div className="diagnostic" id="diagnostic" style={{ display: 'none' }}>
            <h4>🔍 DIAGNOSTIC AUTOMATIQUE</h4>
            <ul className="diagnostic-list" id="diagnostic-list"></ul>
          </div>

          <div className="export-section">
            <button className="btn" onClick={exportReport}>📄 Exporter Rapport PDF</button>
            <button className="btn" onClick={exportJSON}>🔄 Exporter JSON Technique</button>
          </div>
        </div>
      </div>
    </div>
  );
}
  
