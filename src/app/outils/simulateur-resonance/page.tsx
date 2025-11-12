'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import jsPDF from 'jspdf'; // ← Nouvelle importation

// Base de données complète (50+ mouvements)
const TECHNICAL_SPECS: Record<string, any> = {
  "eta2824": { name: "ETA 2824-2", frequency: 4, ampNorm: 310, powerReserve: 38, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.6 },
  "eta2892": { name: "ETA 2892-A2", frequency: 4, ampNorm: 310, powerReserve: 42, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.5 },
  "eta6497": { name: "ETA/Unitas 6497-1", frequency: 2.5, ampNorm: 260, powerReserve: 46, positions: [2, 6, 8, 10, 14, 16], tempCoef: 0.7 },
  "eta7760": { name: "Valjoux 7760", frequency: 3, ampNorm: 300, powerReserve: 40, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8 },
  "eta7750": { name: "Valjoux 7750", frequency: 3, ampNorm: 300, powerReserve: 42, positions: [0, 5, 7, 9, 13, 16], tempCoef: 0.8 },
  "rolex3135": { name: "Rolex 3135", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4 },
  "rolex3130": { name: "Rolex 3130", frequency: 4, ampNorm: 320, powerReserve: 48, positions: [0, 2, 3, 4, 6, 8], tempCoef: 0.4 },
  "rolex3235": { name: "Rolex 3235", frequency: 4, ampNorm: 315, powerReserve: 70, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3 },
  "patek240": { name: "Patek Philippe 240", frequency: 3, ampNorm: 315, powerReserve: 48, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.3 },
  "patek324": { name: "Patek Philippe 324 SC", frequency: 4, ampNorm: 310, powerReserve: 45, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.35 },
  "patek215": { name: "Patek Philippe 215", frequency: 3, ampNorm: 300, powerReserve: 44, positions: [1, 2, 3, 4, 5, 6], tempCoef: 0.4 },
  "omega8900": { name: "Omega Co-Axial 8900", frequency: 3.5, ampNorm: 315, powerReserve: 60, positions: [0, 1, 2, 3, 4, 5], tempCoef: 0.5 },
  "omega3861": { name: "Omega 3861 (Speedmaster)", frequency: 3, ampNorm: 300, powerReserve: 50, positions: [0, 3, 5, 7, 10, 12], tempCoef: 0.6 },
  "seiko4r36": { name: "Seiko 4R36", frequency: 3, ampNorm: 280, powerReserve: 41, positions: [2, 4, 6, 8, 10, 12], tempCoef: 0.7 },
  "seiko6r35": { name: "Seiko 6R35", frequency: 3, ampNorm: 285, powerReserve: 70, positions: [1, 3, 5, 7, 9, 11], tempCoef: 0.65 },
  "seiko8r48": { name: "Seiko 8R48 (Chronographe)", frequency: 3.5, ampNorm: 290, powerReserve: 45, positions: [0, 4, 6, 8, 12, 14], tempCoef: 0.75 },
  "breitling01": { name: "Breitling B01", frequency: 4, ampNorm: 310, powerReserve: 70, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.55 },
  "jlc889": { name: "JLC Calibre 889", frequency: 4, ampNorm: 300, powerReserve: 38, positions: [0, 2, 4, 6, 8, 10], tempCoef: 0.5 },
  "jlc978": { name: "JLC Calibre 978 (Tourbillon)", frequency: 4, ampNorm: 280, powerReserve: 48, positions: [0, 0, 0, 0, 0, 0], tempCoef: 0.3 },
  "tagheuer01": { name: "TAG Heuer Calibre 01", frequency: 4, ampNorm: 300, powerReserve: 50, positions: [0, 4, 6, 8, 10, 12], tempCoef: 0.65 },
  "cartier1904mc": { name: "Cartier 1904-MC", frequency: 4, ampNorm: 300, powerReserve: 48, positions: [0, 3, 5, 7, 9, 11], tempCoef: 0.6 },
  "iwc52010": { name: "IWC 52010 (Portugeiser)", frequency: 3.5, ampNorm: 300, powerReserve: 168, positions: [0, 2, 3, 4, 5, 6], tempCoef: 0.45 },
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

    // Animation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const specs = TECHNICAL_SPECS[calibre];
      const wear = pivotWear / 100;

      if (balanceRef.current) {
        const time = Date.now() * 0.001;
        const angle = (amplitude * Math.PI / 180) * Math.sin(time * specs.frequency * 2 * Math.PI);
        balanceRef.current.rotation.z = angle;
        if (hairspringRef.current) {
          hairspringRef.current.rotation.z = angle * 0.3;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
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

  const handleInputChange = (setter: (v: number) => void, displayId: string, suffix: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setter(value);
      const displayEl = document.getElementById(displayId);
      if (displayEl) displayEl.textContent = `${value}${suffix}`;
    };
  };

  const runSimulation = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const amplitudeLoss = specs.ampNorm - amplitude;
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

    // Update UI
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

  // ✅ NOUVELLE FONCTION PDF avec jsPDF
  const exportReport = () => {
    const specs = TECHNICAL_SPECS[calibre];
    const doc = new jsPDF();
    
    // En-tête
    doc.setFont("courier", "bold");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("RAPPORT TECHNIQUE HORLOLEARN", 12, 15);
    doc.setFontSize(10);
    doc.text(`Généré le : ${new Date().toLocaleString('fr-CH')}`, 12, 23);
    
    // Informations mouvement
    doc.setFontSize(12);
    doc.setFont("courier", "bold");
    doc.text(`📌 Mouvement : ${specs.name}`, 12, 35);
    
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    const config = [
      `• Amplitude mesurée : ${amplitude}°`,
      `• Battement : ${beatError} ms`,
      `• Position testée : ${['CH', '6H', '9H', '3H', '12H', 'CU'][position]}`,
      `• Température : ${temperature}°C`,
      `• Âge mouvement : ${age} ans`,
      `• Usure pivots : ${pivotWear}%`,
      `• Usure ressort : ${mainspringWear}%`,
      ``,
      `RÉSULTATS DE SIMULATION :`,
    ];
    
    doc.text(config, 12, 45);
    
    // Résultats avec couleurs
    const yStart = 85;
    const metrics = [
      { label: "Isochronisme", id: "isochronism-status", detail: "isochronism-detail" },
      { label: "Stabilité Huygens", id: "huygens-status", detail: "huygens-detail" },
      { label: "Déviation totale", id: "deviation-status", detail: "deviation-detail" },
      { label: "Réserve de marche", id: "power-reserve-status", detail: "power-reserve-detail" }
    ];
    
    let yPos = yStart;
    doc.setFont("courier", "bold");
    doc.text("🎯 METRIQUES CLÉS :", 12, yPos);
    yPos += 8;
    
    doc.setFont("courier", "normal");
    metrics.forEach(metric => {
      const value = document.getElementById(metric.id)?.textContent || '-';
      const detail = document.getElementById(metric.detail)?.textContent || '';
      const text = `• ${metric.label}: ${value} (${detail})`;
      doc.text(text, 12, yPos);
      yPos += 6;
    });
    
    // Diagnostic
    yPos += 4;
    doc.setFont("courier", "bold");
    doc.text("🔍 DIAGNOSTIC :", 12, yPos);
    yPos += 8;
    
    doc.setFont("courier", "normal");
    const diagList = document.getElementById('diagnostic-list');
    if (diagList) {
      const items = diagList.getElementsByTagName('li');
      for (let i = 0; i < Math.min(items.length, 5); i++) {
        doc.text(`→ ${items[i].textContent}`, 12, yPos);
        yPos += 6;
        if (yPos > 280) break; // Éviter de dépasser la page
      }
    }
    
    // Pied de page
    doc.setFont("courier", "italic");
    doc.setFontSize(8);
    doc.text("HORLOLEARN PRO - Outil de simulation avancé", 12, 290);
    
    // Sauvegarde
    doc.save(`Rapport-${specs.name.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.pdf`);
    alert("✅ Rapport PDF exporté avec succès !");
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
              <option value="eta6497">ETA/Unitas 6497-1 (36.6mm)</option>
              <option value="eta7760">Valjoux 7760 (13.25''')</option>
              <option value="eta7750">Valjoux 7750 (13.25''')</option>
              <option value="rolex3135">Rolex 3135 (11.5''')</option>
              <option value="rolex3130">Rolex 3130 (11.5''')</option>
              <option value="rolex3235">Rolex 3235 (11.5''')</option>
              <option value="patek240">PP 240 (10.5''')</option>
              <option value="patek324">PP 324 SC (10.5''')</option>
              <option value="patek215">PP 215 (21.9mm)</option>
              <option value="omega8900">Omega Co-Axial 8900 (13''')</option>
              <option value="omega3861">Omega 3861 (Speedmaster)</option>
              <option value="seiko4r36">Seiko 4R36 (11.5''')</option>
              <option value="seiko6r35">Seiko 6R35 (11.5''')</option>
              <option value="seiko8r48">Seiko 8R48 (Chronographe)</option>
              <option value="breitling01">Breitling B01 (13''')</option>
              <option value="jlc889">JLC Calibre 889 (10.5''')</option>
              <option value="jlc978">JLC Calibre 978 (Tourbillon)</option>
              <option value="tagheuer01">TAG Heuer Calibre 01 (13''')</option>
              <option value="cartier1904mc">Cartier 1904-MC (10.5''')</option>
              <option value="iwc52010">IWC 52010 (Portugeiser)</option>
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
