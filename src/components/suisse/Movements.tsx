import React, { useState } from 'react';
import { Cpu, Microscope, Scan, Activity, PenTool, Hammer, Sparkles } from 'lucide-react';
import Skeleton from './Skeleton';

interface ComponentZone {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  label: string;
  detail: string;
  tool?: string; // Specific tool used
  technique?: string; // Technical gesture description
  animationType?: 'rotate' | 'oscillate' | 'pulse'; // New animation property
}

interface Movement {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  specs: { label: string; value: string }[];
  technicalZones: ComponentZone[];
  finishingZones: ComponentZone[];
}

// Optimized image URLs with WebP and reasonable width
const movements: Movement[] = [
  {
    id: 'cal-hl-09',
    name: 'Calibre HL-09',
    type: 'Tourbillon Manuel',
    image: 'https://images.unsplash.com/photo-1587837366371-7d117b773088?q=80&w=1200&auto=format&fit=crop&fm=webp',
    description: "L'apogée de la complexité. Un tourbillon volant squeletté, sublimé par un anglage main minutieux et des Côtes de Genève traditionnelles.",
    specs: [
      { label: 'Fréquence', value: '21,600 vph (3Hz)' },
      { label: 'Composants', value: '238' },
      { label: 'Réserve', value: '72 Heures' },
      { label: 'Finitions', value: 'Anglage, Côtes de Genève' }
    ],
    technicalZones: [
      { 
        id: 't1', x: 35, y: 65, label: 'Cage Tourbillon', 
        detail: 'La cage tourne sur elle-même en 60 secondes, compensant les effets de la gravité sur l\'organe régulateur.',
        animationType: 'rotate' 
      },
      { 
        id: 't2', x: 75, y: 30, label: 'Barillet Squelette', 
        detail: 'Le ressort moteur est visible, permettant d\'estimer visuellement la réserve de marche de 72h.',
        animationType: 'pulse'
      },
    ],
    finishingZones: [
      { 
        id: 'f1', x: 55, y: 45, label: 'Anglage Main', 
        detail: 'Chaque arête est limée à 45° puis polie pour obtenir un éclat miroir parfait contrastant avec le sablage mat.',
        tool: 'Brunissoir, Tige de Gentiane & Pâte Diamantée',
        technique: 'Le "Berçage" : L\'artisan caresse l\'angle pour lui donner un profil bombé (convexe) parfait, sans facette, créant un reflet noir continu caractéristique de la haute horlogerie.'
      },
      { 
        id: 'f2', x: 20, y: 20, label: 'Étirage des Flancs', 
        detail: 'Les côtés verticaux des ponts reçoivent une finition satinée longitudinale ultra-fine.',
        tool: 'Lime à grain fin & Cabron émeri',
        technique: 'Un mouvement de va-et-vient parfaitement rectiligne et parallèle est nécessaire pour étirer la matière et capter la lumière latéralement.'
      },
      { 
        id: 'f3', x: 80, y: 80, label: 'Sablage Fin', 
        detail: 'Création d\'une texture mate grenée uniforme dans les renfoncements pour un contraste maximal.',
        tool: 'Buse à micro-billes de Corindon',
        technique: 'Projection basse pression précise pour matifier la surface sans altérer la géométrie des logements de rubis ni toucher les angles polis.'
      }
    ]
  },
  {
    id: 'cal-4302',
    name: 'Calibre 4302',
    type: 'Automatique Manufacture',
    image: 'https://images.unsplash.com/photo-1595643749195-8b5aa24e897a?q=80&w=1200&auto=format&fit=crop&fm=webp',
    description: "Notre cheval de bataille moderne. Un mouvement automatique robuste doté d'une masse oscillante en or 22 carats.",
    specs: [
      { label: 'Fréquence', value: '28,800 vph (4Hz)' },
      { label: 'Composants', value: '257' },
      { label: 'Réserve', value: '70 Heures' },
      { label: 'Rubis', value: '32' }
    ],
    technicalZones: [
      { 
        id: 't1', x: 50, y: 50, label: 'Masse Oscillante Or 22k', 
        detail: 'Montée sur roulement à billes céramique, elle remonte le ressort dans les deux sens de rotation.',
        animationType: 'oscillate'
      },
      { 
        id: 't2', x: 25, y: 70, label: 'Balancier Inertie Var.', 
        detail: 'Réglage de précision par masselottes périphériques, sans raquette, pour une stabilité chronométrique accrue.',
        animationType: 'pulse'
      },
    ],
    finishingZones: [
      { 
        id: 'f1', x: 70, y: 20, label: 'Côtes de Genève', 
        detail: 'Stries parallèles gravées sur les ponts. Elles ne sont pas seulement esthétiques, elles capturent les micro-poussières.',
        tool: 'Meule en Buis',
        technique: 'La pièce avance sous une meule abrasive en rotation. La régularité de l\'avance détermine la largeur parfaite de la "côte".'
      },
      { 
        id: 'f2', x: 40, y: 80, label: 'Perlage', 
        detail: 'Motif de cercles concentriques chevauchants sur la platine inférieure.',
        tool: 'Tampon Abrasif Rotatif',
        technique: 'L\'artisan positionne manuellement chaque cercle ("perle") pour qu\'il chevauche le précédent de 50% exactement.'
      },
      { 
        id: 'f3', x: 60, y: 50, label: 'Moulures Polies', 
        detail: 'Les pourtours des rubis sont creusés et polis miroir pour refléter la lumière autour des points de pivot.',
        tool: 'Fraise diamantée sphérique',
        technique: 'Un polissage "glacé" de la concavité accueillant le rubis, créant un anneau de lumière spectaculaire.'
      }
    ]
  },
  {
    id: 'cal-5134',
    name: 'Calibre 5134',
    type: 'Quantième Perpétuel',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop&fm=webp',
    description: "Une mémoire mécanique prodigieuse capable de calculer les années bissextiles jusqu'en 2100.",
    specs: [
      { label: 'Fréquence', value: '19,800 vph (2.75Hz)' },
      { label: 'Composants', value: '374' },
      { label: 'Réserve', value: '40 Heures' },
      { label: 'Épaisseur', value: '4.31 mm' }
    ],
    technicalZones: [
      { 
        id: 't1', x: 40, y: 40, label: 'Cames du Quantième', 
        detail: 'Le cerveau du calendrier. Une roue de 48 mois gère le cycle des années bissextiles.',
        animationType: 'rotate'
      },
      { 
        id: 't2', x: 60, y: 60, label: 'Lune Astronomique', 
        detail: 'Disque en aventurine nécessitant une correction d\'un jour tous les 122 ans et 317 jours.',
        animationType: 'rotate'
      },
    ],
    finishingZones: [
       { 
         id: 'f1', x: 80, y: 30, label: 'Polissage Noir', 
         detail: 'Aussi appelé poli miroir ou spéculaire. La surface est si plane qu\'elle paraît noire sous certains angles.',
         tool: 'Plaque de Zinc & Diamantine',
         technique: 'La pièce en acier est frottée en "huit" sur une plaque de zinc enduite de poudre de diamant jusqu\'à planéité optique parfaite.'
       },
       { 
         id: 'f2', x: 30, y: 70, label: 'Cerclage', 
         detail: 'Finition satinée circulaire appliquée sur les roues et les barillets.',
         tool: 'Touret & Gomme Abrasive',
         technique: 'Mise en rotation de la pièce contre une gomme abrasive pour créer des micro-sillons circulaires parfaits.'
       }
    ]
  }
];

const MovementDisplay: React.FC<{ mov: Movement; index: number }> = ({ mov, index }) => {
  const [activeDiagram, setActiveDiagram] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'tech' | 'finish'>('tech');
  const [hoveredZone, setHoveredZone] = useState<ComponentZone | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getZones = (m: Movement) => viewMode === 'tech' ? m.technicalZones : m.finishingZones;

  return (
    <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
      
      {/* Interactive Block / Diagram */}
      <div className="w-full lg:w-1/2">
        <div 
          className="relative aspect-video overflow-hidden rounded-sm group select-none shadow-2xl shadow-black/50 bg-neutral-900 border border-neutral-800 cursor-crosshair transition-all duration-500"
          onMouseEnter={() => setActiveDiagram(true)}
          onMouseLeave={() => {
            setHoveredZone(null);
            setActiveDiagram(false);
            setViewMode('tech'); 
          }}
          onClick={() => setActiveDiagram(!activeDiagram)}
        >
          
          {!imageLoaded && (
             <Skeleton className="absolute inset-0 w-full h-full z-30" />
          )}

          {/* Main Image with Dynamic Filter */}
          <img 
            src={mov.image} 
            alt={mov.name} 
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 transform ${
              activeDiagram 
                ? (viewMode === 'tech' ? 'blueprint-filter scale-105' : 'finishing-filter scale-105') 
                : 'grayscale group-hover:grayscale-0 group-hover:scale-105'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          />

          {/* Technical Grid Overlay */}
          <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${activeDiagram ? 'opacity-30' : 'opacity-0'}`}>
             <div className="w-full h-full bg-[linear-gradient(rgba(212,163,43,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,163,43,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          {/* MODE TOGGLE (Visible when active) */}
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-40 transition-all duration-300 ${activeDiagram ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <button 
                onClick={(e) => { e.stopPropagation(); setViewMode('tech'); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest border transition-all ${viewMode === 'tech' ? 'bg-white text-neutral-900 border-white shadow-lg' : 'bg-black/50 text-neutral-400 border-neutral-700 hover:border-white hover:text-white backdrop-blur'}`}
              >
                <Cpu className="w-3 h-3" />
                Architecture
              </button>
              <button 
                 onClick={(e) => { e.stopPropagation(); setViewMode('finish'); }}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] uppercase font-bold tracking-widest border transition-all ${viewMode === 'finish' ? 'bg-gold-500 text-white border-gold-500 shadow-lg' : 'bg-black/50 text-neutral-400 border-neutral-700 hover:border-gold-500 hover:text-gold-500 backdrop-blur'}`}
              >
                <PenTool className="w-3 h-3" />
                Finitions
              </button>
          </div>

          {/* DIAGRAM SVG OVERLAY */}
          {activeDiagram && (
            <div className="absolute inset-0 z-20 pointer-events-none animate-[fade-in_0.5s_ease-out]">
                <svg className="w-full h-full">
                     {/* Layer 1: Motion Graphics (Architecture Mode Only) */}
                     {viewMode === 'tech' && getZones(mov).map((zone) => {
                       if (!zone.animationType) return null;
                       return (
                         <g key={`anim-${zone.id}`}>
                           {zone.animationType === 'rotate' && (
                             <circle 
                               cx={`${zone.x}%`} cy={`${zone.y}%`} r="25" 
                               fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="4,4" opacity="0.3"
                               className="animate-spin-slow"
                             />
                           )}
                           {zone.animationType === 'rotate' && (
                              <path 
                                d={`M ${zone.x - 2} ${zone.y} L ${zone.x + 2} ${zone.y} M ${zone.x} ${zone.y - 2} L ${zone.x} ${zone.y + 2}`}
                                stroke="#60A5FA" strokeWidth="1"
                                transform={`translate(${zone.x}, ${zone.y})`}
                              />
                           )}
                           {zone.animationType === 'oscillate' && (
                              <path 
                                d={`M ${zone.x}% ${zone.y}% m -30,0 a 30,30 0 0,0 60,0`}
                                fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.3"
                                className="animate-oscillate"
                              />
                           )}
                           {zone.animationType === 'pulse' && (
                              <circle 
                                cx={`${zone.x}%`} cy={`${zone.y}%`} r="8" 
                                fill="#60A5FA" opacity="0.3"
                                className="animate-pulse-fast"
                              />
                           )}
                         </g>
                       );
                     })}

                     {/* Layer 2: Connector Lines & Dots */}
                     {getZones(mov).map((zone) => {
                         const isLeft = zone.x < 50;
                         const textX = isLeft ? "5%" : "95%";
                         const textAnchor = isLeft ? "start" : "end";
                         const midX = isLeft ? zone.x - 10 : zone.x + 10;
                         const isActive = hoveredZone?.id === zone.id;
                         // Color logic: Tech = Blueish/White, Finish = Gold
                         const baseColor = viewMode === 'tech' ? '#60A5FA' : '#D4A32B';
                         const activeColor = '#FFFFFF';
                         const color = isActive ? activeColor : baseColor;
                         
                         return (
                             <g key={zone.id} className="transition-all duration-300">
                                 {/* Connecting Line */}
                                 <path 
                                    d={`M ${zone.x}% ${zone.y}% L ${midX}% ${zone.y}% L ${textX} ${zone.y}%`}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth={isActive ? 2 : 1}
                                    strokeDasharray={viewMode === 'tech' ? "4 2" : "0"}
                                    className="opacity-60 transition-all duration-300"
                                 />
                                 {/* Terminal Dot */}
                                 <circle 
                                    cx={`${zone.x}%`} cy={`${zone.y}%`} r="3" 
                                    fill={color}
                                    className={isActive ? "animate-ping" : ""}
                                 />
                                 <circle 
                                    cx={`${zone.x}%`} cy={`${zone.y}%`} r="2" 
                                    fill={color}
                                 />
                                 {/* Label Text */}
                                 <text 
                                    x={textX} y={`${zone.y}%`} 
                                    dy="-10"
                                    textAnchor={textAnchor}
                                    fill={color}
                                    className="text-[10px] uppercase font-bold tracking-widest font-mono drop-shadow-md transition-all duration-300"
                                    style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,1))' }}
                                 >
                                    {zone.label}
                                 </text>
                             </g>
                         );
                     })}
                </svg>
            </div>
          )}

          {/* Interactive Hotspots Layer (Buttons) */}
          <div className="absolute inset-0 z-30">
            {getZones(mov).map((zone) => (
              <div 
                key={zone.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center transition-opacity duration-300 ${activeDiagram ? 'opacity-100' : 'opacity-0'}`}
                style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                onMouseEnter={() => setHoveredZone(zone)}
              >
                <div className={`w-6 h-6 border rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                    hoveredZone?.id === zone.id 
                    ? (viewMode === 'tech' ? 'bg-blue-400 border-blue-400 scale-125' : 'bg-gold-500 border-gold-500 scale-125') 
                    : (viewMode === 'tech' ? 'bg-black/40 border-blue-400/50' : 'bg-black/40 border-gold-500/50')
                }`}>
                    <div className={`w-1.5 h-1.5 rounded-full transition-colors ${hoveredZone?.id === zone.id ? 'bg-white' : (viewMode === 'tech' ? 'bg-blue-400' : 'bg-gold-500')}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail / Zoom Panel */}
          <div className={`absolute top-4 right-4 w-80 bg-neutral-900/95 backdrop-blur-xl border-l-2 p-6 rounded-r-sm shadow-2xl transition-all duration-500 transform origin-top-right z-50 ${
              viewMode === 'tech' ? 'border-blue-400' : 'border-gold-500'
            } ${hoveredZone ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                {hoveredZone && (
                    <>
                    <div className={`flex items-center gap-2 mb-3 pb-2 border-b border-white/10 ${viewMode === 'tech' ? 'text-blue-400' : 'text-gold-500'}`}>
                        {viewMode === 'tech' ? <Cpu className="w-4 h-4" /> : <Microscope className="w-4 h-4" />}
                        <span className="text-[10px] uppercase font-bold tracking-widest">
                            {viewMode === 'tech' ? 'Composant Technique' : 'Haute Finition'}
                        </span>
                    </div>
                    
                    {/* Zoom Window */}
                    <div className="w-full h-32 bg-neutral-950 rounded-sm mb-4 relative overflow-hidden border border-white/10 group-hover:border-opacity-50 transition-colors shadow-inner">
                        <div 
                            className="absolute inset-0 w-full h-full"
                            style={{
                                backgroundImage: `url(${mov.image})`,
                                backgroundPosition: `${hoveredZone.x}% ${hoveredZone.y}%`,
                                backgroundSize: '400%', // Higher zoom for finishes
                                transition: 'background-position 0.3s ease-out'
                            }}
                        ></div>
                        {/* Crosshair Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-50">
                            <div className={`w-12 h-12 border rounded-full ${viewMode === 'tech' ? 'border-blue-400' : 'border-gold-500'}`}></div>
                            <div className={`absolute w-full h-[1px] ${viewMode === 'tech' ? 'bg-blue-400/30' : 'bg-gold-500/30'}`}></div>
                            <div className={`absolute h-full w-[1px] ${viewMode === 'tech' ? 'bg-blue-400/30' : 'bg-gold-500/30'}`}></div>
                        </div>
                    </div>

                    <h4 className="text-white font-serif text-xl mb-2">{hoveredZone.label}</h4>
                    <p className="text-neutral-300 text-sm leading-relaxed font-light mb-4">{hoveredZone.detail}</p>

                    {/* CONTEXTUAL FINISHING INFO */}
                    {viewMode === 'finish' && (hoveredZone.tool || hoveredZone.technique) && (
                      <div className="mt-4 pt-4 border-t border-gold-500/30 bg-gradient-to-b from-gold-500/10 to-transparent -mx-6 px-6 pb-2">
                         <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-4 bg-gold-500"></span>
                            <h5 className="text-[10px] uppercase text-gold-400 font-bold tracking-[0.2em]">Secrets d'Atelier</h5>
                         </div>
                         
                         {hoveredZone.tool && (
                           <div className="flex items-start gap-3 mb-4">
                              <div className="p-1.5 rounded-sm bg-neutral-800 border border-neutral-700 shrink-0 mt-0.5">
                                <Hammer className="w-3 h-3 text-gold-500" />
                              </div>
                              <div>
                                 <span className="text-[9px] uppercase text-neutral-500 font-bold tracking-widest block mb-0.5">L'Outil</span>
                                 <span className="text-xs text-white font-medium font-mono">{hoveredZone.tool}</span>
                              </div>
                           </div>
                         )}
                         
                         {hoveredZone.technique && (
                            <div className="flex items-start gap-3">
                              <div className="p-1.5 rounded-sm bg-neutral-800 border border-neutral-700 shrink-0 mt-0.5">
                                <Sparkles className="w-3 h-3 text-gold-500" />
                              </div>
                              <div>
                                 <span className="text-[9px] uppercase text-neutral-500 font-bold tracking-widest block mb-1">Le Geste</span>
                                 <p className="text-xs text-neutral-300 italic leading-relaxed border-l border-neutral-700 pl-2">
                                    "{hoveredZone.technique}"
                                 </p>
                              </div>
                           </div>
                         )}
                      </div>
                    )}
                    </>
                )}
          </div>
            
          {/* Schematic View Toggle Hint (Only when inactive) */}
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none transition-opacity duration-500 ${activeDiagram ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex flex-col items-center gap-2">
                 <div className="p-2 rounded-full border border-white/20 bg-black/30 backdrop-blur animate-bounce">
                     <Scan className="w-4 h-4 text-white" />
                 </div>
                 <span className="px-3 py-1 bg-black/50 backdrop-blur rounded-full text-white/80 text-[10px] uppercase tracking-widest border border-white/10">
                     Explorer le Calibre
                 </span>
              </div>
          </div>

          {/* Active Mode Indicator */}
          <div className={`absolute bottom-4 left-4 pointer-events-none transition-opacity duration-300 ${activeDiagram ? 'opacity-100' : 'opacity-0'}`}>
              <div className={`flex items-center gap-2 ${viewMode === 'tech' ? 'text-blue-400' : 'text-gold-500'}`}>
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest">
                      MODE {viewMode === 'tech' ? 'BLUEPRINT' : 'ATELIER'}
                  </span>
              </div>
          </div>

        </div>
      </div>

      {/* Info Block */}
      <div className="w-full lg:w-1/2">
        <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-2 block">{mov.type}</span>
        <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">{mov.name}</h3>
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-8 border-l border-gold-500/30 pl-6">
          {mov.description}
        </p>

        <div className="grid grid-cols-2 gap-6">
          {mov.specs.map((spec, i) => (
            <div key={i} className="border-b border-neutral-800 pb-3 hover:border-gold-500/50 transition-colors duration-300">
              <span className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-1">{spec.label}</span>
              <span className="block text-sm md:text-base font-mono text-white">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const Movements: React.FC = () => {
  return (
    <section id="movements" className="py-24 md:py-32 bg-neutral-950 text-white relative overflow-hidden">
      {/* CSS for filters and animations */}
      <style>{`
        .blueprint-filter {
          filter: grayscale(100%) contrast(110%) brightness(70%) sepia(100%) hue-rotate(180deg) saturate(250%);
        }
        .finishing-filter {
          filter: grayscale(100%) contrast(130%) brightness(60%) sepia(80%) hue-rotate(350deg) saturate(300%);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes oscillate {
          0% { transform: rotate(-45deg); }
          50% { transform: rotate(45deg); }
          100% { transform: rotate(-45deg); }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .animate-oscillate {
          animation: oscillate 4s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .animate-pulse-fast {
          animation: pulse-fast 0.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
      `}</style>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-900/50 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 border border-gold-500/10 rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <span className="text-gold-500 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">Cœur Mécanique</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 md:mt-6 mb-6 text-white leading-tight">
            Mouvements Manufacturés
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-500 mx-auto"></div>
          <p className="mt-8 max-w-2xl mx-auto text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            Conçus, développés et assemblés dans nos ateliers de la Vallée de Joux. Survolez les calibres pour révéler leur architecture et leurs finitions.
          </p>
        </div>

        <div className="space-y-24">
          {movements.map((mov, idx) => (
             <MovementDisplay key={mov.id} mov={mov} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Movements;