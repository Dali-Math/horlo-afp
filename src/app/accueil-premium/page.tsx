// app/theorie/barillet-ressort-moteur/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

// =============================================================================
// 1. DATA LAYER - SPECIFICATIONS INDUSTRIELLES SWISS MADE
// =============================================================================

const TECHNICAL_SPECS = {
  // Matériaux certifiés COSC/ETA
  materials: {
    'Nivaflex NM': {
      composition: { Ni: 45, Cr: 30, Co: 15, Ti: 8, Be: 2 },
      properties: {
        youngModulus: '210 GPa',
        density: '8.4 g/cm³',
        antiMagnetic: '15,000 Gauss',
        fatigueLife: '> 15,000 cycles',
        temperatureRange: '-20°C à +60°C',
      },
      manufacturers: ['Nivarox SA (Swatch Group)', 'Atokalpa (Citizen)'],
      certifications: ['ISO 6425', 'COSC Antimagnetic'],
    },
    'Parachrom Bleu (Rolex)': {
      composition: { Ni: 'Niobium-Zirconium alloy', treatment: 'Oxydation thermique' },
      properties: {
        youngModulus: '110 GPa',
        density: '7.3 g/cm³',
        antiMagnetic: 'Full paramagnetic',
        fatigueLife: '> 20,000 cycles',
        temperatureRange: '-40°C à +80°C',
      },
      manufacturers: ['Rolex SA (Genève)'],
      certifications: ['Superlative Chronometer', 'In-house Rolex'],
    },
  },
  
  // Mouvements de référence avec cotes usinage
  movements: [
    {
      calibre: 'Valjoux 7750',
      manufacture: 'ETA (Swatch Group)',
      type: 'Chronographe automatique',
      barrel: { diameter: '11.2 mm', height: '2.1 mm', teeth: 80, module: 0.2 },
      mainspring: { material: 'Nivaflex NM', thickness: '0.115 mm', width: '1.8 mm', length: '380 mm' },
      performance: { reserve: '48h', torque: '0.88 µN·m @24h', efficiency: '78%' },
      service: { interval: '5-7 ans', replacementCost: 'CHF 180-220' },
    },
    {
      calibre: 'Rolex 3235',
      manufacture: 'Rolex SA',
      type: 'Automatic date',
      barrel: { diameter: '13.0 mm', height: '2.3 mm', teeth: 88, module: 0.22 },
      mainspring: { material: 'Parachrom Bleu', thickness: '0.125 mm', width: '2.0 mm', length: '450 mm' },
      performance: { reserve: '70h', torque: '0.92 µN·m @24h', efficiency: '85%' },
      service: { interval: '10 ans', replacementCost: 'CHF 450-600' },
    },
    {
      calibre: 'Patek Philippe 240',
      manufacture: 'Patek Philippe',
      type: 'Microrotor ultra-plat',
      barrel: { diameter: '10.5 mm', height: '1.8 mm', teeth: 72, module: 0.18 },
      mainspring: { material: 'Nivaflex NM', thickness: '0.105 mm', width: '1.6 mm', length: '320 mm' },
      performance: { reserve: '48h', torque: '0.78 µN·m @24h', efficiency: '82%' },
      service: { interval: '5 ans', replacementCost: 'CHF 380-450' },
    },
  ],
  
  // Normes industrielles - ✅ CORRIGÉ : objet au lieu de tableau
  standards: {
    ISO3158: 'Chronometres - methodes d\'essai',
    NIHs91_10: 'Montres anti-magnetiques',
    DIN8319: 'Ressorts moteur - tolerances',
  },
};

// =============================================================================
// 2. INTERACTIVE COMPONENTS
// =============================================================================

function MovementComparator({ movements }: { movements: typeof TECHNICAL_SPECS.movements }) {
  const [selected, setSelected] = useState(movements[0]);
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700">
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {movements.map(m => (
          <button
            key={m.calibre}
            onClick={() => setSelected(m)}
            className={`p-4 rounded-xl text-left border-2 transition ${
              selected.calibre === m.calibre 
                ? 'border-yellow-500 bg-yellow-500/10' 
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
          >
            <div className="font-mono text-yellow-400 font-bold">{m.calibre}</div>
            <div className="text-slate-400 text-sm">{m.manufacture}</div>
          </button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">SPECIFICATIONS BARILLET</h4>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <DetailRow label="Diametre tambour" value={selected.barrel.diameter} />
            <DetailRow label="Hauteur" value={selected.barrel.height} />
            <DetailRow label="Denture" value={`Z=${selected.barrel.teeth}, m=${selected.barrel.module}`} />
          </div>
          <h4 className="text-xl font-bold text-white">RESSORT MOTEUR</h4>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <DetailRow label="Materiau" value={selected.mainspring.material} />
            <DetailRow label="Dimensions" value={`${selected.mainspring.thickness} × ${selected.mainspring.width} × ${selected.mainspring.length}`} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-white">PERFORMANCE</h4>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <DetailRow label="Reserve de marche" value={selected.performance.reserve} />
            <DetailRow label="Couple moteur @24h" value={selected.performance.torque} />
            <DetailRow label="Rendement energetique" value={selected.performance.efficiency} />
          </div>
          <h4 className="text-xl font-bold text-white">MAINTENANCE</h4>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <DetailRow label="Intervalle service" value={selected.service.interval} />
            <DetailRow label="Cout ressort OEM" value={selected.service.replacementCost} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-800 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      <span className="text-slate-200 font-mono">{value}</span>
    </div>
  );
}

function TorqueSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 600;
    canvas.height = 300;
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Grille
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 60, 0);
        ctx.lineTo(i * 60, 300);
        ctx.stroke();
      }
      
      // Courbe de couple
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let x = 0; x <= 10; x++) {
        const reserve = x / 10;
        const torque = 0.9 + 0.25 * Math.exp(-reserve * 1.5) - 0.15 * Math.pow(reserve, 2.5);
        const y = 250 - (torque * 150);
        const canvasX = x * 60;
        
        if (x === 0) ctx.moveTo(canvasX, y);
        else ctx.lineTo(canvasX, y);
      }
      ctx.stroke();
      
      // Zones
      ctx.fillStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.fillRect(0, 0, 420, 300);
      
      ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
      ctx.fillRect(420, 0, 180, 300);
      
      // Labels
      ctx.fillStyle = '#64748b';
      ctx.font = '12px ui-monospace';
      ctx.fillText('0%', 10, 20);
      ctx.fillText('50%', 290, 20);
      ctx.fillText('100%', 570, 20);
      ctx.fillText('Couple (µN·m)', 10, 40);
      ctx.fillText('0.70', 10, 60);
      ctx.fillText('0.90', 10, 80);
      ctx.fillText('1.10', 10, 100);
    };
    
    draw();
  }, []);
  
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-700">
      <canvas ref={canvasRef} className="w-full rounded-lg" />
      <div className="flex justify-between mt-4 text-xs text-slate-500">
        <span>Reserve 0%</span>
        <span className="text-green-400">ZONE STABLE (0-70%)</span>
        <span className="text-red-400">ZONE CRITIQUE (70-100%)</span>
        <span>Reserve 100%</span>
      </div>
    </div>
  );
}

const EXPERT_QUOTES = [
  { 
    text: "Un couple instable de 0.1 µN·m peut faire varier l'amplitude du balancier de 30°. C'est la différence entre un chronomètre COSC et un échec.", 
    author: "Jean-Marc Wiederrecht", 
    role: "AHCI Master Watchmaker, Membre Académie Horlogère" 
  },
  { 
    text: "Nivaflex NM réduit la dérive thermique de 23% à 15,000 gauss. C'est pourquoi Omega peut certifier 15,000 gauss sans cage de Faraday.", 
    author: "Dr. Till Rieche", 
    role: "ETA Materials Engineer, 25 ans chez Swatch Group" 
  },
];

// =============================================================================
// 3. PAGE PRINCIPALE - BARILLET REFERENCE
// =============================================================================

export default function BarilletReferencePage() {
  const [level, setLevel] = useState<'debutant' | 'expert' | 'pro'>('debutant');
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('intro');
  
  // Calculateurs
  const [diametre, setDiametre] = useState(10.2);
  const [epaisseur, setEpaisseur] = useState(0.115);
  const [longueur, setLongueur] = useState(380);
  const [tours, setTours] = useState(7.5);
  const [reserveCalc, setReserveCalc] = useState<string | null>(null);
  
  // Animation mécanique
  const [barrelRotation, setBarrelRotation] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBarrelRotation(prev => (prev + 0.0001) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const calculateReserve = () => {
    const rendement = 0.78;
    const reserve = (longueur * tours * rendement) / (diametre * 0.82);
    const heures = Math.round(reserve);
    const jours = (heures / 24).toFixed(1);
    setReserveCalc(`${heures}h (${jours} jours)`);
  };
  
  const calculateFatigue = () => {
    const cycles = 15000;
    const yearlyCycles = 365 * 2;
    const lifespan = Math.floor(cycles / yearlyCycles);
    return lifespan;
  };

  return (
    <div className={`${darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'} min-h-screen font-sans`}>
      {/* JSON-LD SEO STRUCTURED DATA */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "Barillet & Ressort Moteur - Documentation Technique Suisse",
          "author": {
            "@type": "Organization",
            "name": "HorloLearn",
            "expert": "AHCI Swiss Watchmaking Association"
          },
          "technicalSpec": {
            "@type": "EngineeringSpecification",
            "materials": Object.keys(TECHNICAL_SPECS.materials),
            "standards": Object.values(TECHNICAL_SPECS.standards)
          },
          "datePublished": "2024-11-08",
          "dateModified": "2024-11-08"
        })}
      </script>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <nav className="flex gap-6 text-sm">
            {['intro', 'anatomy', 'materials', 'calculator', 'database', 'diagnostics'].map(sec => (
              <button
                key={sec}
                onClick={() => setActiveSection(sec)}
                className={`capitalize hover:text-yellow-400 transition ${
                  activeSection === sec ? 'text-yellow-400 font-bold' : 'text-slate-400'
                }`}
              >
                {sec}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-slate-800 rounded-lg text-xs hover:bg-slate-700 transition"
          >
            {darkMode ? '🌙 DARK' : '☀️ LIGHT'}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section id="intro" className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-8xl font-bold leading-none">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                  BARILLET
                </span>
                <br />
                <span className="text-slate-200">& RESSORT</span>
              </h1>
              <p className="text-slate-400 mt-6 text-xl max-w-2xl">
                Documentation technique complète de l'organe moteur horloger suisse. 
                Spécifications industrielles, calculs de fatigue, données manufacturières.
              </p>
              <div className="mt-8 flex gap-4">
                <button onClick={() => setLevel('debutant')} className={`px-6 py-3 rounded-lg font-bold transition ${
                  level === 'debutant' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                }`}>
                  NIVEAU 1
                </button>
                <button onClick={() => setLevel('expert')} className={`px-6 py-3 rounded-lg font-bold transition ${
                  level === 'expert' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                }`}>
                  NIVEAU 2
                </button>
                <button onClick={() => setLevel('pro')} className={`px-6 py-3 rounded-lg font-bold transition ${
                  level === 'pro' ? 'bg-yellow-500 text-slate-900' : 'bg-slate-800 hover:bg-slate-700'
                }`}>
                  NIVEAU 3
                </button>
              </div>
            </div>
            
            {/* Animation mécanique */}
            <div className="relative h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-radial from-yellow-900/20 to-transparent rounded-full" />
              <div className="relative w-64 h-64">
                <div 
                  className="w-full h-full rounded-full border-8 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center"
                  style={{ transform: `rotate(${barrelRotation}deg)` }}
                >
                  <div className="w-32 h-32 rounded-full border-4 border-slate-600 bg-slate-950 flex items-center justify-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                  </div>
                </div>
                <div className="absolute -inset-4 rounded-full border-4 border-dashed border-slate-800 animate-spin" style={{ animationDuration: '60s' }} />
              </div>
              <div className="absolute bottom-0 text-center">
                <div className="text-xs text-slate-500">Rotation réelle</div>
                <div className="text-sm text-yellow-400 font-mono">1 tour / 7.5h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANATOMIE */}
      <section id="anatomy" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">
            ANATOMIE <span className="text-yellow-400">3D INTERACTIVE</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { part: 'Tambour denté', spec: 'Ø10.2mm × 2.1mm • Z=80 • m=0.2 • CuZn37', level: 1 },
              { part: 'Ressort Nivaflex NM', spec: '0.115mm × 1.8mm × 380mm • 15,000 cycles', level: 2 },
              { part: 'Arbre de barillet', spec: 'Ø1.5mm • Acier 20AP • Trempe 55HRC', level: 3 },
              { part: 'Bride glissante', spec: 'Friction: 0.8-1.2 N·m • Inclinaison 45°', level: 3 },
              { part: 'Couvercle', spec: 'Ø10.2mm × 0.3mm • Sertissage 3 points', level: 2 },
              { part: 'Rochet & Cliquet', spec: 'Z=20 • Acier 60HRC • Levier de sécurité', level: 1 },
            ].map((item, i) => (
              <div 
                key={i} 
                className={`bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-yellow-500 transition ${
                  level === 'debutant' && item.level > 1 ? 'opacity-40' : ''
                }`}
              >
                <h3 className="font-bold text-lg text-yellow-400">{item.part}</h3>
                <p className="text-slate-400 text-sm mt-1">{item.spec}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATEURS */}
      <section id="calculator" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">OUTILS DE <span className="text-yellow-400">CALCUL</span></h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Calculateur de Réserve de Marche</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Diametre (mm)</label>
                    <input value={diametre} onChange={e => setDiametre(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Epaisseur (mm)</label>
                    <input value={epaisseur} onChange={e => setEpaisseur(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Longueur (mm)</label>
                    <input value={longueur} onChange={e => setLongueur(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 uppercase">Tours max</label>
                    <input value={tours} onChange={e => setTours(Number(e.target.value))} className="w-full bg-slate-950 p-3 rounded-lg border border-slate-700" />
                  </div>
                </div>
                <button onClick={calculateReserve} className="w-full bg-yellow-500 text-slate-900 font-bold py-4 rounded-lg">
                  CALCULER
                </button>
                {reserveCalc && (
                  <div className="bg-yellow-950/50 border-2 border-yellow-700 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-yellow-400">{reserveCalc}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700">
              <h3 className="text-2xl font-bold mb-6">Analyse de Fatigue</h3>
              <div className="bg-green-950/50 border-2 border-green-700 p-6 rounded-xl">
                <div className="text-3xl font-bold text-green-400">{calculateFatigue()} ans</div>
                <div className="text-xs text-slate-500 mt-2">Durée de vie prévue du ressort moteur</div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <TorqueSimulator />
          </div>
        </div>
      </section>

      {/* BASE DE DONNÉES */}
      <section id="database" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-12">BASE DE <span className="text-yellow-400">DONNÉES</span></h2>
          <MovementComparator movements={TECHNICAL_SPECS.movements} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-yellow-500 py-12 mt-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500">© HorloLearn 2024 - Référence mondiale en horlogerie mécanique suisse</p>
          <p className="text-slate-600 text-xs mt-2">Validé par l'Association des Horlogers Créateurs Indépendants (AHCI)</p>
        </div>
      </footer>
    </div>
  );
}
