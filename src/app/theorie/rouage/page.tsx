
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, Zap, Gauge, Settings, ChevronRight, PlayCircle, PauseCircle, RotateCw, Info, ChevronDown } from 'lucide-react';

export default function RouageUltimatePage() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedMobile, setSelectedMobile] = useState<string | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Animation des roues
  const [rotation, setRotation] = useState({
    barillet: 0,
    centre: 0,
    moyenne: 0,
    seconde: 0,
    echappement: 0
  });
  return (
  <>
      <Navbar /> {/* ✅ Barre de tâche du site */}
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* tout ton contenu actuel ici */}
      </div>
    </>
  );
}
  useEffect(() => {
    if (!isAnimating) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        barillet: (prev.barillet + 0.1 * animationSpeed) % 360,
        centre: (prev.centre + 0.6 * animationSpeed) % 360,
        moyenne: (prev.moyenne + 2 * animationSpeed) % 360,
        seconde: (prev.seconde + 6 * animationSpeed) % 360,
        echappement: (prev.echappement + 24 * animationSpeed) % 360
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isAnimating, animationSpeed]);

  const mobiles = [
    {
      id: 'barillet',
      name: 'Barillet',
      icon: '🔋',
      color: 'red',
      toursPar: '6-8 heures',
      dents: '—',
      couple: 'Maximum',
      vitesse: 'Minimum',
      description: 'Source d\'énergie du mouvement. Contient le ressort moteur qui se déroule progressivement.',
      details: {
        fonction: 'Stockage et libération progressive de l\'énergie',
        materiaux: 'Laiton ou acier, ressort en acier spécial',
        dimensionsCles: 'Diamètre: 8-12mm, hauteur: 2-4mm',
        caracteristiques: ['Couple constant recherché', 'Réserve de marche: 38-80h', 'Graissage spécifique requis']
      }
    },
    {
      id: 'centre',
      name: 'Roue de Centre',
      icon: '⚙️',
      color: 'blue',
      toursPar: '1 heure',
      dents: '80-90',
      couple: 'Élevé',
      vitesse: '1 tr/h',
      description: 'Premier mobile du rouage. Porte l\'aiguille des minutes via le renvoi.',
      details: {
        fonction: 'Transmission de l\'énergie et indication des minutes',
        materiaux: 'Laiton doré ou acier',
        dimensionsCles: 'Diamètre roue: 5-8mm, pignon: 6-8 ailes',
        caracteristiques: ['Axe traversant la platine', 'Entraîne le rouage des heures', 'Point critique pour la précision']
      }
    },
    {
      id: 'moyenne',
      name: 'Roue Moyenne',
      icon: '⚙️',
      color: 'green',
      toursPar: '8-10 minutes',
      dents: '70-80',
      couple: 'Moyen',
      vitesse: '6-7.5 tr/h',
      description: 'Mobile intermédiaire crucial pour la démultiplication optimale du train.',
      details: {
        fonction: 'Démultiplication intermédiaire de la vitesse',
        materiaux: 'Laiton doré',
        dimensionsCles: 'Diamètre roue: 4-6mm, pignon: 6-8 ailes',
        caracteristiques: ['Position centrale dans le mouvement', 'Optimise le rapport de transmission', 'Minimise les pertes d\'énergie']
      }
    },
    {
      id: 'seconde',
      name: 'Roue de Seconde',
      icon: '⏱️',
      color: 'purple',
      toursPar: '1 minute',
      dents: '75-80',
      couple: 'Faible',
      vitesse: '60 tr/h',
      description: 'Porte l\'aiguille des secondes (trotteuse). Marque visuellement la précision du mouvement.',
      details: {
        fonction: 'Indication des secondes et transmission à l\'échappement',
        materiaux: 'Laiton doré ou acier',
        dimensionsCles: 'Diamètre roue: 3-5mm, pignon: 6-8 ailes',
        caracteristiques: ['Position au centre ou à 6h', 'Visible par le cadran (small seconds)', 'Indicateur visuel de marche']
      }
    },
    {
      id: 'echappement',
      name: 'Roue d\'Échappement',
      icon: '⚡',
      color: 'orange',
      toursPar: '10-15 secondes',
      dents: '15-20',
      couple: 'Très faible',
      vitesse: '240-360 tr/h',
      description: 'Dernier mobile du train. Interface avec l\'échappement pour réguler l\'énergie.',
      details: {
        fonction: 'Distribution rythmée de l\'énergie à l\'ancre',
        materiaux: 'Acier trempé (dents), laiton (corps)',
        dimensionsCles: 'Diamètre: 2-4mm, 15-20 dents fines',
        caracteristiques: ['Haute fréquence de rotation', 'Dents en forme spéciale', 'Interaction précise avec l\'ancre']
      }
    }
  ];

  const concepts = [
    {
      title: 'Rapport de Transmission',
      formula: 'i = Z₂/Z₁',
      description: 'Le rapport entre le nombre de dents de la roue menée (Z₂) et le nombre d\'ailes du pignon menant (Z₁)',
      example: 'Si Z₂=80 et Z₁=8, alors i=10. La roue tourne 10× plus vite que le pignon.',
      color: 'blue'
    },
    {
      title: 'Rapport de Finissage',
      formula: 'F = i₁ × i₂ × i₃ × i₄',
      description: 'Le rapport total du train, multiplication de tous les rapports individuels',
      example: 'Exemple typique: F = 10 × 8.33 × 7.5 × 8 = 5000 (pour 28,800 alt/h)',
      color: 'green'
    },
    {
      title: 'Rendement du Train',
      formula: 'η = P_sortie / P_entrée',
      description: 'Efficacité de la transmission d\'énergie à travers le rouage',
      example: 'Un bon train de rouage atteint 95-98% de rendement avec un graissage optimal.',
      color: 'purple'
    },
    {
      title: 'Fréquence d\'Oscillation',
      formula: 'f = (n × F) / 3600',
      description: 'Détermine le nombre d\'alternances par heure du balancier',
      example: 'Pour F=5000 et n=3600: f = 4 Hz = 28,800 alt/h',
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation flottante */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-4">
            <a
              href="/theorie"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Retour</span>
            </a>
            <div className="h-6 w-px bg-slate-700"></div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Settings className="w-8 h-8 text-orange-400 animate-spin-slow" />
                <div className="absolute inset-0 bg-orange-400/20 blur-xl rounded-full" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Le Rouage Horloger</h1>
                <p className="text-xs text-slate-400">Guide de Référence Complet</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              {isAnimating ? <PauseCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors text-sm font-semibold"
            >
              Calculateur
            </button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16">
        {/* Hero Section avec Animation Interactive */}
        <section className="container mx-auto px-4 max-w-7xl mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-6 border border-orange-500/30">
              Théorie Fondamentale
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              La Transmission Cinématique
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Le cœur mécanique d'une montre : un système de roues dentées qui transforme l'énergie du barillet en un mouvement précis et régulé
            </p>
          </div>

          {/* Stats Clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <StatCard icon={<Clock />} value="4-5" label="Mobiles" color="blue" />
            <StatCard icon={<Gauge />} value="95-98%" label="Rendement" color="green" />
            <StatCard icon={<Zap />} value="28.8K" label="Alt/heure" color="purple" />
            <StatCard icon={<Settings />} value="1µm" label="Tolérance" color="orange" />
          </div>

          {/* Visualisation Interactive du Train */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Train de Rouage Interactif</h3>
              <div className="flex items-center gap-4">
                <label className="text-sm text-slate-400">Vitesse:</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm font-mono">{animationSpeed.toFixed(1)}x</span>
              </div>
            </div>

            <div className="relative h-64 bg-slate-900/50 rounded-2xl overflow-hidden mb-6">
              {/* Visualisation simplifiée du train */}
              <svg className="w-full h-full" viewBox="0 0 1000 300">
                {/* Barillet */}
                <g transform="translate(100, 150)">
                  <circle
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3"
                    opacity="0.3"
                  />
                  <GearWheel
                    radius={35}
                    teeth={12}
                    rotation={rotation.barillet}
                    color="#ef4444"
                  />
                  <text y="70" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">
                    Barillet
                  </text>
                </g>

                {/* Roue de Centre */}
                <g transform="translate(250, 150)">
                  <circle r="50" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.2" />
                  <GearWheel
                    radius={45}
                    teeth={16}
                    rotation={rotation.centre}
                    color="#3b82f6"
                  />
                  <text y="75" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
                    Centre (1 tr/h)
                  </text>
                </g>

                {/* Roue Moyenne */}
                <g transform="translate(450, 150)">
                  <circle r="45" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.2" />
                  <GearWheel
                    radius={40}
                    teeth={14}
                    rotation={rotation.moyenne}
                    color="#10b981"
                  />
                  <text y="70" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
                    Moyenne
                  </text>
                </g>

                {/* Roue de Seconde */}
                <g transform="translate(650, 150)">
                  <circle r="40" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.2" />
                  <GearWheel
                    radius={35}
                    teeth={12}
                    rotation={rotation.seconde}
                    color="#a855f7"
                  />
                  <text y="65" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">
                    Seconde (1 tr/min)
                  </text>
                </g>

                {/* Roue d'Échappement */}
                <g transform="translate(850, 150)">
                  <circle r="30" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.2" />
                  <GearWheel
                    radius={25}
                    teeth={8}
                    rotation={rotation.echappement}
                    color="#f97316"
                  />
                  <text y="55" textAnchor="middle" fill="#f97316" fontSize="12" fontWeight="bold">
                    Échappement
                  </text>
                </g>

                {/* Flèches de transmission */}
                <ArrowPath from={[140, 150]} to={[205, 150]} />
                <ArrowPath from={[295, 150]} to={[405, 150]} />
                <ArrowPath from={[495, 150]} to={[610, 150]} />
                <ArrowPath from={[690, 150]} to={[820, 150]} />
              </svg>
            </div>

            <p className="text-sm text-slate-400 text-center">
              Cliquez sur pause/play pour contrôler l'animation • Ajustez la vitesse avec le curseur
            </p>
          </div>
        </section>

        {/* Section Mobiles Détaillés */}
        <section className="container mx-auto px-4 max-w-7xl mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Les 5 Mobiles du Train</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobiles.map((mobile) => (
              <MobileCard
                key={mobile.id}
                mobile={mobile}
                isSelected={selectedMobile === mobile.id}
                onClick={() => setSelectedMobile(selectedMobile === mobile.id ? null : mobile.id)}
              />
            ))}
          </div>
        </section>

        {/* Concepts Mathématiques */}
        <section className="container mx-auto px-4 max-w-7xl mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Concepts Mathématiques Clés</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {concepts.map((concept, idx) => (
              <ConceptCard key={idx} concept={concept} />
            ))}
          </div>
        </section>

        {/* Calculateur */}
        {showCalculator && (
          <section className="container mx-auto px-4 max-w-4xl mb-16">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700">
              <TransmissionCalculator />
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold mb-4">📝 Testez vos connaissances</h2>
            <p className="text-xl text-orange-100 mb-8">
              Maîtrisez-vous les secrets de la transmission cinématique ?
            </p>
            <button className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
              Commencer le quiz
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

// Composants auxiliaires
function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: 'blue' | 'green' | 'purple' | 'orange' }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} backdrop-blur-xl rounded-2xl p-6 border`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-current">{icon}</div>
        <div className="text-3xl font-bold">{value}</div>
      </div>
      <div className="text-sm text-slate-300">{label}</div>
    </div>
  );
}

function MobileCard({ mobile, isSelected, onClick }: { 
  mobile: any; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const colors = {
    red: 'from-red-500/20 to-red-600/20 border-red-500/30',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30'
  };

  return (
    <div
      className={`bg-gradient-to-br ${colors[mobile.color as keyof typeof colors] || colors.blue} backdrop-blur-xl rounded-2xl p-6 border cursor-pointer transition-all hover:scale-105 ${
        isSelected ? 'ring-2 ring-white' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{mobile.icon}</div>
        <ChevronDown className={`w-5 h-5 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{mobile.name}</h3>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div>
          <span className="text-slate-400">Tours:</span>
          <div className="font-semibold">{mobile.toursPar}</div>
        </div>
        <div>
          <span className="text-slate-400">Dents:</span>
          <div className="font-semibold">{mobile.dents}</div>
        </div>
      </div>
      <p className="text-sm text-slate-300 leading-relaxed">{mobile.description}</p>
      
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
          <DetailItem label="Fonction" value={mobile.details.fonction} />
          <DetailItem label="Matériaux" value={mobile.details.materiaux} />
          <DetailItem label="Dimensions" value={mobile.details.dimensionsCles} />
          <div>
            <div className="text-xs text-slate-400 mb-1">Caractéristiques:</div>
            <ul className="text-sm space-y-1">
              {mobile.details.caracteristiques.map((car: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>{car}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function ConceptCard({ concept }: { concept: any }) {
  const colors: Record<string, string> = {
    blue: 'from-blue-500/10 to-blue-600/10 border-blue-500/20',
    green: 'from-green-500/10 to-green-600/10 border-green-500/20',
    purple: 'from-purple-500/10 to-purple-600/10 border-purple-500/20',
    orange: 'from-orange-500/10 to-orange-600/10 border-orange-500/20'
  };

  return (
    <div className={`bg-gradient-to-br ${colors[concept.color as keyof typeof colors] || colors.blue} backdrop-blur-xl rounded-2xl p-6 border`}>
      <h3 className="text-xl font-bold mb-3">{concept.title}</h3>
      <div className="bg-slate-900/50 rounded-lg p-4 mb-4 font-mono text-2xl text-center text-orange-400">
        {concept.formula}
      </div>
      <p className="text-sm text-slate-300 mb-3 leading-relaxed">{concept.description}</p>
      <div className="bg-slate-900/30 rounded-lg p-3">
        <div className="text-xs text-slate-400 mb-1">Exemple:</div>
        <div className="text-sm text-slate-200">{concept.example}</div>
      </div>
    </div>
  );
}

function TransmissionCalculator() {
  const [z1, setZ1] = useState(8);
  const [z2, setZ2] = useState(80);
  const ratio = (z2 / z1).toFixed(2);

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Settings className="w-6 h-6 text-orange-400" />
        Calculateur de Rapport de Transmission
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm text-slate-400 mb-2">Nombre d'ailes du pignon (Z₁)</label>
          <input
            type="number"
            value={z1}
            onChange={(e) => setZ1(parseInt(e.target.value) || 1)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
            min="4"
            max="16"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-2">Nombre de dents de la roue (Z₂)</label>
          <input
            type="number"
            value={z2}
            onChange={(e) => setZ2(parseInt(e.target.value) || 1)}
            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white"
            min="40"
            max="120"
          />
        </div>
      </div>
      <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-2xl p-6">
        <div className="text-center">
          <div className="text-sm text-slate-400 mb-2">Rapport de transmission (i)</div>
          <div className="text-5xl font-bold text-orange-400 mb-2">{ratio}</div>
          <div className="text-sm text-slate-300">
            La roue tourne <span className="font-semibold text-white">{ratio}× plus vite</span> que le pignon
          </div>
        </div>
      </div>
    </div>
  );
}

function GearWheel({ radius, teeth, rotation, color }: { 
  radius: number; 
  teeth: number; 
  rotation: number; 
  color: string;
}) {
  const points = [];
  for (let i = 0; i < teeth; i++) {
    const angle = (i / teeth) * Math.PI * 2 - Math.PI / 2;
    const nextAngle = ((i + 0.5) / teeth) * Math.PI * 2 - Math.PI / 2;
    
    const innerR = radius * 0.7;
    const outerR = radius;
    
    const x1 = Math.cos(angle) * innerR;
    const y1 = Math.sin(angle) * innerR;
    const x2 = Math.cos(angle) * outerR;
    const y2 = Math.sin(angle) * outerR;
    const x3 = Math.cos(nextAngle) * outerR;
    const y3 = Math.sin(nextAngle) * outerR;
    
    points.push(`${x1},${y1} ${x2},${y2} ${x3},${y3}`);
  }

  return (
    <g transform={`rotate(${rotation})`}>
      <circle r={radius * 0.7} fill="none" stroke={color} strokeWidth="2" opacity="0.3" />
      {points.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke={color} strokeWidth="2" />
      ))}
      <circle r={radius * 0.25} fill={color} opacity="0.5" />
    </g>
  );
}

function ArrowPath({ from, to }: { from: [number, number]; to: [number, number] }) {
  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke="white"
        strokeWidth="2"
        opacity="0.3"
        strokeDasharray="5,5"
      />
      <polygon
        points={`${to[0]},${to[1]} ${to[0]-8},${to[1]-4} ${to[0]-8},${to[1]+4}`}
        fill="white"
        opacity="0.3"
      />
    </g>
  );
}
