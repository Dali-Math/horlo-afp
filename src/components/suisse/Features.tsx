
import React, { useState } from 'react';
import { Settings, Watch, ShieldCheck, PenTool, Box, Globe, Timer, Cpu } from 'lucide-react';
import Tourbillon3D from './Tourbillon3D';

const complications = [
  {
    id: 'calibre',
    Icon: Cpu,
    title: "Calibre Manufacture",
    subtitle: "Architecture Squelette",
    description: "Le cœur battant de la maison. Un mouvement entièrement conçu, développé et assemblé dans nos ateliers, dévoilant sa complexité par un squelettage d'art.",
    has3D: true
  },
  {
    id: 'tourbillon',
    Icon: Settings,
    title: "Tourbillon Volant",
    subtitle: "Maîtrise de la Gravité",
    description: "Notre calibre signature suspend le balancier dans une cage rotative, annulant les effets de la gravité terrestre pour une précision chronométrique absolue.",
    has3D: true
  },
  {
    id: 'repetition',
    Icon: Watch,
    title: "Répétition Minutes",
    subtitle: "L'Orchestre Mécanique",
    description: "La complication reine. Deux marteaux frappant sur des timbres cathédrale pour sonner les heures, les quarts et les minutes à la demande.",
    has3D: false
  },
  {
    id: 'chronograph',
    Icon: Timer,
    title: "Chrono Automatique",
    subtitle: "Maître du Temps Court",
    description: "La mesure de l'exploit. Un mécanisme complexe à roue à colonnes et embrayage vertical assurant un départ instantané.",
    has3D: false
  },
  {
    id: 'geneve',
    Icon: ShieldCheck,
    title: "Poinçon de Genève",
    subtitle: "Excellence Certifiée",
    description: "Chaque composant est décoré à la main. Anglage, perlage, étirage des flancs : nous suivons les 12 critères les plus stricts.",
    has3D: false
  },
  {
    id: 'email',
    Icon: PenTool,
    title: "Émail Grand Feu",
    subtitle: "Arts & Métiers",
    description: "Des cadrans cuits à 800°C, couche après couche, pour offrir une profondeur et une inaltérabilité qui traverseront les siècles.",
    has3D: false
  }
];

const Features: React.FC = () => {
  const [active3DFeature, setActive3DFeature] = useState<string | null>(null);

  return (
    <section id="features" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-950 transition-colors relative overflow-hidden">
      {active3DFeature && (
        <Tourbillon3D 
          featureId={active3DFeature} 
          onClose={() => setActive3DFeature(null)} 
        />
      )}
      
      {/* Background Pattern - Guilloché Style */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, transparent 48%, #D4A32B 49%, #D4A32B 51%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, #D4A32B 49%, #D4A32B 51%, transparent 52%)
          `,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">Savoir-Faire d'Exception</span>
          <h2 className="text-3xl md:text-5xl font-serif mt-4 md:mt-6 mb-6 md:mb-8 text-neutral-900 dark:text-white leading-tight">
            Les Grandes Complications
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-500 mx-auto"></div>
          <p className="mt-6 md:mt-8 max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 text-base md:text-lg leading-relaxed font-light">
            L'horlogerie ne se résume pas à donner l'heure. C'est l'art de capturer l'éternité dans un mécanisme fini à la main.
          </p>
        </div>

        {/* Optimized Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {complications.map((item, idx) => (
            <div 
              key={idx} 
              className={`
                group relative flex flex-col p-8 lg:p-10 rounded-sm 
                bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md 
                border border-neutral-200 dark:border-neutral-800 
                hover:border-gold-500/50 dark:hover:border-gold-500/50 
                hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-black/50 
                hover:-translate-y-2 transition-all duration-500 ease-out
                ${item.has3D ? 'ring-1 ring-gold-500/10' : ''}
              `}
            >
              {/* Header Area */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 mb-6 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-gold-600 dark:text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-inner border border-neutral-200 dark:border-neutral-700">
                   <item.Icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-serif text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 group-hover:text-neutral-500 dark:group-hover:text-neutral-300 transition-colors">
                  {item.subtitle}
                </span>
              </div>

              {/* Content Area */}
              <div className="text-center flex-grow">
                 <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light">
                    {item.description}
                 </p>
              </div>

              {/* Action Area (3D Button) */}
              {item.has3D && (
                <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800 w-full flex justify-center">
                   <button 
                     onClick={() => setActive3DFeature(item.id)}
                     className="
                        relative overflow-hidden group/btn
                        flex items-center gap-3 px-8 py-4 
                        bg-neutral-900 dark:bg-white 
                        text-white dark:text-neutral-900 
                        text-[10px] uppercase tracking-[0.2em] font-bold 
                        rounded-sm shadow-xl 
                        hover:bg-gold-500 dark:hover:bg-gold-500 
                        hover:text-white dark:hover:text-white 
                        transition-all duration-300
                        w-full justify-center md:w-auto
                     "
                   >
                     <Box className="w-4 h-4 group-hover/btn:animate-pulse" />
                     <span>Architecture 3D</span>
                     <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                   </button>
                </div>
              )}

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-transparent group-hover:border-gold-500/30 transition-all duration-500 rounded-tr-sm"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-transparent group-hover:border-gold-500/30 transition-all duration-500 rounded-bl-sm"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
