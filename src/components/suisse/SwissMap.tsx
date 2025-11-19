
import React, { useState } from 'react';
import { MapPin, Mountain, Building2, Watch, Wind, Info, Compass } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  coords: { top: string; left: string };
  description: string;
  specialty: string;
  icon: React.ReactNode;
  image: string;
}

const regions: Region[] = [
  {
    id: 'geneve',
    name: 'Genève',
    // Coordonnées recalibrées sur le nouveau ratio d'aspect fixe (800/550)
    coords: { top: '71%', left: '7.5%' }, 
    description: "Capitale diplomatique et horlogère. C'est ici qu'est né le 'Poinçon de Genève' en 1886, le sceau de qualité le plus prestigieux garantissant finition manuelle et provenance.",
    specialty: "Finitions d'Art, Poinçon de Genève",
    icon: <Building2 className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1583875683771-92402dc6d579?q=80&w=1200&auto=format&fit=crop&fm=webp"
  },
  {
    id: 'vallee-de-joux',
    name: 'Vallée de Joux',
    coords: { top: '58%', left: '10%' }, 
    description: "Surnommée le 'Berceau des Complications'. Isolée par des hivers rudes, cette haute vallée a vu naître les mécanismes les plus complexes au monde. Le silence des forêts du Risoud a forgé une culture de patience infinie.",
    specialty: "Grandes Complications, Répétitions Minutes",
    icon: <Mountain className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1465311440653-ba9b1d9b0f5b?q=80&w=1200&auto=format&fit=crop&fm=webp"
  },
  {
    id: 'neuchatel',
    name: 'Neuchâtel',
    coords: { top: '50%', left: '22%' },
    description: "Centre historique de la recherche scientifique au bord du lac. Son observatoire fut longtemps l'arbitre mondial de la précision chronométrique lors des concours annuels.",
    specialty: "Recherche, Observatoire",
    icon: <Info className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1572519591689-142c84f86b13?q=80&w=1200&auto=format&fit=crop&fm=webp"
  },
  {
    id: 'chaux-de-fonds',
    name: 'La Chaux-de-Fonds',
    coords: { top: '44%', left: '18%' },
    description: "Ville classée à l'UNESCO pour son urbanisme horloger unique. Conçue en damier pour maximiser la lumière naturelle dans les ateliers orientés nord, elle est le cœur industriel de la précision.",
    specialty: "Industrialisation, Chronométrie",
    icon: <Watch className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1200&auto=format&fit=crop&fm=webp"
  },
  {
    id: 'biel',
    name: 'Biel / Bienne',
    coords: { top: '42%', left: '28%' },
    description: "La métropole bilingue. Point de jonction entre le savoir-faire francophone et l'ingénierie germanophone, abritant les géants de la production moderne.",
    specialty: "Ingénierie, Production de masse de luxe",
    icon: <Wind className="w-5 h-5" />,
    image: "https://images.unsplash.com/photo-1523631921376-2b439375b43f?q=80&w=1200&auto=format&fit=crop&fm=webp"
  }
];

const SwissMap: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);

  return (
    <section id="terroir" className="py-32 bg-neutral-950 text-white relative overflow-hidden">
       {/* Ambient Background with refined texture */}
       <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"></div>
       </div>

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-gold-500 uppercase tracking-[0.3em] text-xs font-bold">Géographie du Temps</span>
            <h2 className="text-3xl md:text-5xl font-serif mt-6 mb-6">La Suisse Horlogère</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-8"></div>
            <p className="max-w-2xl mx-auto text-neutral-400 text-lg font-light leading-relaxed">
              L'horlogerie n'est pas une industrie, c'est un territoire. Découvrez l'Arc Jurassien, cette vallée unique où le temps a trouvé sa maison.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            
            {/* Interactive Map Container */}
            {/* CRUCIAL FIX: Force aspect ratio to match SVG viewBox (800/550) to prevent coordinate drift */}
            <div 
                className="w-full lg:w-1/2 relative select-none group perspective-1000"
                style={{ aspectRatio: '800/550' }}
            >
              
              {/* Map Wrapper with pseudo-3D effect */}
              <div className="relative w-full h-full transition-transform duration-700 transform group-hover:rotate-x-2">
                
                {/* Stylized Switzerland Map SVG */}
                <svg viewBox="0 0 800 550" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                   <defs>
                     <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                       <stop offset="0%" stopColor="#2a2a2a" />
                       <stop offset="100%" stopColor="#111111" />
                     </linearGradient>
                     
                     {/* Texture Métal Usiné / Ardoise */}
                     <filter id="machined-metal">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                        <feColorMatrix type="matrix" values="0.2 0 0 0 0  0 0.2 0 0 0  0 0 0.2 0 0  0 0 0 0.5 0" in="noise" result="coloredNoise" />
                        <feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="composite" />
                        <feBlend mode="overlay" in="composite" in2="SourceGraphic" />
                        <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="black" floodOpacity="0.7"/>
                     </filter>

                     {/* Glow effect for the Watch Valley */}
                     <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                     </filter>
                   </defs>
                   
                   {/* Swiss Shape - Accurate Low Poly Silhouette */}
                   <path 
                     d="M 45,410 
                        L 110,395 
                        L 160,410 
                        L 240,450 
                        L 320,480 
                        L 360,470 
                        L 420,490 
                        L 480,450 
                        L 520,480 
                        L 560,430 
                        L 740,350 
                        L 780,280 
                        L 760,200 
                        L 780,150 
                        L 680,100 
                        L 580,80 
                        L 480,90 
                        L 350,110 
                        L 250,120 
                        L 180,200 
                        L 110,270 
                        L 70,330 
                        L 45,410 
                        Z" 
                     fill="url(#mapGradient)" 
                     stroke="#444" 
                     strokeWidth="1"
                     filter="url(#machined-metal)"
                     className="transition-all duration-500 hover:stroke-gold-500/30"
                   />
                   
                   {/* Topography Highlights (Abstract Mountains) */}
                   <path d="M 250,450 L 320,480 L 360,470" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" /> 
                   <path d="M 560,430 L 650,380" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

                   {/* "Watch Valley" Arc Highlight (Geneva -> Jura -> Basel) */}
                   <path 
                     d="M 50,410 Q 100,300 250,130" 
                     fill="none" 
                     stroke="#D4A32B" 
                     strokeWidth="3" 
                     strokeLinecap="round"
                     strokeDasharray="2,6"
                     className="opacity-40"
                     filter="url(#glow)"
                   />
                   
                   {/* Lac Leman (Simplified) */}
                   <path d="M 50,410 Q 100,390 140,400" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.2" />
                   {/* Lac Neuchatel (Simplified) */}
                   <path d="M 150,300 L 200,270" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.2" />

                </svg>

                {/* Markers placed with percentages relative to container */}
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className="absolute outline-none focus:outline-none group/marker transition-all duration-500 z-20"
                    style={{ top: region.coords.top, left: region.coords.left }}
                  >
                    <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                      {/* Ripple Effect */}
                      <div className={`absolute w-12 h-12 rounded-full border border-gold-500 opacity-0 transition-all duration-1000 ${activeRegion.id === region.id ? 'animate-ping opacity-60' : 'group-hover/marker:opacity-30 group-hover/marker:scale-110'}`}></div>
                      
                      {/* Main Dot */}
                      <div className={`relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-neutral-900 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.8)] ${activeRegion.id === region.id ? 'bg-gold-500 scale-125' : 'bg-neutral-600 group-hover/marker:bg-white'}`}></div>
                      
                      {/* Connecting Line to Label (Visual only) */}
                      <div className={`absolute left-full top-1/2 h-[1px] bg-gold-500 transition-all duration-500 origin-left ${activeRegion.id === region.id ? 'w-8 opacity-100' : 'w-0 opacity-0'}`}></div>

                      {/* Floating Label */}
                      <div className={`absolute left-full ml-8 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 backdrop-blur border-l-2 border-gold-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-500 ${activeRegion.id === region.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                        {region.name}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Legend / Compass */}
              <div className="absolute bottom-8 right-8 flex flex-col gap-2 opacity-30 pointer-events-none">
                 <div className="flex items-center gap-2 text-neutral-500">
                    <Compass className="w-16 h-16 text-gold-500" />
                 </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="w-full lg:w-1/2">
               <div className="relative overflow-hidden bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-sm shadow-2xl transition-all duration-500" key={activeRegion.id}>
                  
                  {/* Header Image with Gradient Fade */}
                  <div className="h-56 w-full relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent z-10"></div>
                     <div className="absolute inset-0 bg-gold-500/10 mix-blend-overlay z-10"></div>
                     
                     <img 
                       src={activeRegion.image} 
                       alt={activeRegion.name}
                       className="w-full h-full object-cover opacity-80 transition-transform duration-[30s] ease-linear transform scale-100 animate-[subtle-zoom_30s_infinite] group-hover:scale-110" 
                     />
                     
                     {/* Floating Icon */}
                     <div className="absolute top-6 right-6 z-20 p-3 bg-neutral-950/80 backdrop-blur border border-white/10 rounded-full text-gold-500 shadow-xl animate-[fade-in_1s_ease-out_0.5s_both]">
                        {activeRegion.icon}
                     </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 relative z-20 -mt-12">
                     <div className="flex items-center gap-3 mb-4 animate-[slide-up_0.5s_ease-out]">
                        <MapPin className="w-4 h-4 text-gold-500" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-gold-500 font-bold">Terroir d'Exception</span>
                     </div>
                     
                     <h3 className="text-3xl md:text-4xl font-serif text-white mb-6 animate-[slide-up_0.5s_ease-out_0.1s_both]">{activeRegion.name}</h3>
                     
                     <div className="space-y-8">
                        <div className="animate-[slide-up_0.5s_ease-out_0.2s_both]">
                           <h4 className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-3 flex items-center gap-2">
                             <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                             Spécialité Régionale
                           </h4>
                           <p className="text-white font-serif text-lg italic border-l border-neutral-700 pl-4 leading-relaxed">
                              "{activeRegion.specialty}"
                           </p>
                        </div>
                        
                        <div className="animate-[slide-up_0.5s_ease-out_0.3s_both]">
                           <h4 className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-3">Héritage</h4>
                           <p className="text-neutral-400 leading-relaxed font-light text-sm md:text-base">
                              {activeRegion.description}
                           </p>
                        </div>
                     </div>

                     {/* Decorative Footer */}
                     <div className="mt-10 pt-6 border-t border-neutral-800 flex justify-between items-center text-neutral-600 animate-[fade-in_1s_ease-out_0.6s_both]">
                        <span className="text-[9px] uppercase tracking-[0.2em]">Altitude & Climat</span>
                        <div className="flex gap-2">
                           <div className="w-1 h-1 rounded-full bg-neutral-700"></div>
                           <div className="w-1 h-1 rounded-full bg-neutral-700"></div>
                           <div className="w-1 h-1 rounded-full bg-gold-500"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

          </div>
       </div>
    </section>
  );
};

export default SwissMap;
