
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Watch as WatchIcon, Droplets, Clock, Activity, ZoomIn, Layers, Check, Rotate3D, Image as ImageIcon, Gem, CircleDot, FileText } from 'lucide-react';
import { watches } from '../data/watches';
import { StrapOption } from '../types';

// Lazy load the 3D component to improve initial page load time.
const Watch3DViewer = React.lazy(() => import('./Watch3DViewer'));

// Helper Component for Scroll Animation
const FadeInBlock: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ 
  children, 
  delay = 0,
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const WatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const watch = watches.find(w => w.id === id);
  
  const [activeStrap, setActiveStrap] = useState<StrapOption | null>(null);
  const [viewMode, setViewMode] = useState<'image' | '360'>('image');
  
  // Magnifier State
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (watch && watch.strapOptions && watch.strapOptions.length > 0) {
      setActiveStrap(watch.strapOptions[0]);
    }
  }, [id, watch]);

  if (!watch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Garde-temps introuvable</h2>
          <button onClick={() => navigate('/')} className="text-gold-500 underline">Retour à la collection</button>
        </div>
      </div>
    );
  }

  // Helper for case color
  const getCaseColor = (materialStr: string = '') => {
    const lower = materialStr.toLowerCase();
    if (lower.includes('or rose') || lower.includes('pink gold') || lower.includes('rose gold')) return '#E6CB7D';
    if (lower.includes('or jaune') || lower.includes('yellow gold')) return '#D4A32B';
    if (lower.includes('noir') || lower.includes('black') || lower.includes('dlc') || lower.includes('carbon') || lower.includes('céramique')) return '#1A1A1A';
    return '#C0C0C0'; // Default Silver/Steel/Platinum
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || viewMode === '360') return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPos({ x, y });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 pt-20">
      
      {/* Navigation Back */}
      <div className="fixed top-24 left-4 md:left-8 z-50 animate-fade-in">
        <button 
          onClick={() => navigate('/')} 
          className="
            group flex items-center
            bg-white/80 dark:bg-neutral-900/60 backdrop-blur-md
            border border-neutral-200 dark:border-neutral-700
            rounded-full p-3 shadow-xl
            text-neutral-900 dark:text-white
            hover:bg-gold-500 hover:border-gold-500 hover:text-white
            transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            hover:pr-6 hover:pl-4
          "
          aria-label="Retour à la collection"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:ml-3">
            Retour
          </span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Column: Visuals & Interactive Loupe */}
        <div className="lg:w-1/2 relative bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center h-[60vh] lg:h-auto overflow-hidden">
           
           {/* View Mode Toggle */}
           <div className="absolute top-6 right-6 z-30 flex bg-white dark:bg-neutral-800 rounded-full p-1 shadow-lg border border-neutral-200 dark:border-neutral-700 animate-fade-in">
              <button 
                onClick={() => setViewMode('image')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-[10px] uppercase font-bold tracking-wider ${viewMode === 'image' ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photo</span>
              </button>
              <button 
                onClick={() => setViewMode('360')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-[10px] uppercase font-bold tracking-wider ${viewMode === '360' ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
              >
                <Rotate3D className="w-4 h-4" />
                <span>360°</span>
              </button>
           </div>

           <div 
             ref={imageContainerRef}
             className="relative w-full h-full max-w-2xl max-h-[80vh] cursor-crosshair group p-6 md:p-0 flex items-center justify-center"
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
             onMouseMove={handleMouseMove}
           >
             {viewMode === 'image' ? (
               <>
                 {/* Main Image */}
                 <img 
                   src={`${watch.image}&fm=webp&q=85`} // Optimized for WebP but kept high res for zoom
                   alt={watch.name} 
                   className="w-full h-full object-contain transition-transform duration-200 drop-shadow-2xl animate-fade-in"
                   fetchPriority="high" // Prioritize loading this key asset
                 />
                 
                 {/* Hint Overlay */}
                 {!isHovering && (
                   <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 pointer-events-none animate-pulse">
                      <ZoomIn className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Survoler pour agrandir</span>
                   </div>
                 )}

                 {/* Magnifying Glass Lens */}
                 {isHovering && (
                   <div 
                     className="pointer-events-none absolute w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-gold-500/50 shadow-2xl overflow-hidden z-20 hidden lg:block"
                     style={{
                       left: `calc(${cursorPos.x}% - 6rem)`,
                       top: `calc(${cursorPos.y}% - 6rem)`,
                       backgroundImage: `url(${watch.image}&fm=webp&q=85)`,
                       backgroundPosition: `${cursorPos.x}% ${cursorPos.y}%`,
                       backgroundSize: '250%',
                       backgroundRepeat: 'no-repeat',
                       backgroundColor: 'white'
                     }}
                   >
                     <div className="absolute inset-0 flex items-center justify-center opacity-20">
                       <div className="w-full h-[1px] bg-white"></div>
                       <div className="h-full w-[1px] bg-white absolute"></div>
                     </div>
                   </div>
                 )}
               </>
             ) : (
               <div className="w-full h-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900/50 relative">
                  {/* Subtle Background Pattern for 3D Container */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                  
                  <Suspense fallback={
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6 animate-fade-in bg-neutral-100 dark:bg-neutral-900">
                       {/* Contextual Blurred Background for seamless transition */}
                       <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-20">
                           <img src={`${watch.image}&w=400&blur=50`} alt="" className="w-full h-full object-contain blur-xl scale-110" />
                       </div>

                       <div className="relative z-10 flex flex-col items-center gap-6">
                           <div className="relative">
                              {/* Outer Ring */}
                              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 dark:border-neutral-800"></div>
                              {/* Spinning Active Ring */}
                              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-t-2 border-gold-500 animate-spin shadow-[0_0_15px_rgba(212,163,43,0.3)]"></div>
                              {/* Center Icon */}
                              <Rotate3D className="absolute inset-0 m-auto w-6 h-6 text-gold-500 animate-pulse" />
                           </div>
                           
                           <div className="text-center space-y-1">
                               <span className="block text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-400 font-bold">
                                 Atelier Numérique
                               </span>
                               <span className="block text-[10px] text-neutral-400 tracking-widest font-light">
                                 Chargement des modules 3D...
                               </span>
                           </div>
                       </div>
                    </div>
                  }>
                    <Watch3DViewer 
                      strapColor={activeStrap?.color || '#000000'} 
                      caseColor={getCaseColor(watch.technicalSpecs?.caseMaterial)} 
                      imageUrl={watch.image}
                    />
                  </Suspense>
               </div>
             )}
           </div>

           {/* Mobile Title Overlay */}
           <div className="absolute bottom-6 left-6 lg:hidden z-10 pointer-events-none animate-fade-in">
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-2 drop-shadow-lg leading-tight">{watch.name}</h1>
              <p className="text-gold-400 uppercase tracking-widest text-[10px] drop-shadow-md font-bold">{watch.collection}</p>
           </div>
        </div>

        {/* Right Column: Details & Configurator */}
        <div className="lg:w-1/2 px-6 py-12 lg:p-24 flex flex-col justify-center bg-white dark:bg-neutral-950 overflow-y-auto">
          
          <FadeInBlock>
            <div className="hidden lg:block mb-10">
               <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.25em] text-xs font-bold block mb-4">
                  {watch.collection}
               </span>
               <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 dark:text-white mb-6 leading-tight">
                  {watch.name}
               </h1>
               <p className="font-serif text-xl md:text-2xl italic text-neutral-500 dark:text-neutral-400 border-b border-gold-500/30 pb-4 inline-block">
                  Référence Manufacture
               </p>
            </div>
          </FadeInBlock>

          {/* Configurator Section */}
          {watch.strapOptions && (
            <FadeInBlock delay={100}>
              <div className="mb-12 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-sm border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4 text-neutral-900 dark:text-white">
                  <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-gold-500" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Finitions de Bracelet</span>
                  </div>
                  {viewMode === 'image' && (
                      <span className="text-[10px] text-gold-500 animate-pulse">Passez en vue 360° pour visualiser</span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {watch.strapOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveStrap(option)}
                      className={`flex items-center justify-between p-3 rounded-sm border transition-all duration-300 ${
                        activeStrap?.id === option.id 
                          ? 'border-gold-500 bg-white dark:bg-neutral-800 shadow-md' 
                          : 'border-transparent hover:bg-white dark:hover:bg-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Material Swatch */}
                        <div 
                          className="w-8 h-8 rounded-full border border-black/10 shadow-inner relative overflow-hidden"
                          style={{ backgroundColor: option.color }}
                        >
                           <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                        </div>
                        <div className="text-left">
                          <span className={`block text-sm font-medium ${activeStrap?.id === option.id ? 'text-gold-600 dark:text-gold-400' : 'text-neutral-600 dark:text-neutral-400'}`}>
                            {option.name}
                          </span>
                        </div>
                      </div>
                      
                      {activeStrap?.id === option.id && (
                        <Check className="w-4 h-4 text-gold-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </FadeInBlock>
          )}

          {/* Story */}
          <FadeInBlock delay={200}>
            <div className="mb-12">
              <h3 className="text-xs uppercase font-bold tracking-widest mb-6 border-l-2 border-gold-500 pl-4 text-neutral-900 dark:text-white">L'Esprit du Temps</h3>
              <p className="text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 font-light">
                {watch.longDescription || watch.description}
              </p>
            </div>
          </FadeInBlock>

          {/* Specs Grid */}
          {watch.technicalSpecs && (
            <FadeInBlock delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 mb-12 text-sm">
                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                       <Activity className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Mouvement</span>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.movement}</span>
                 </div>

                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                       <ShieldCheck className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Boîtier</span>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.caseMaterial}</span>
                 </div>

                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                       <WatchIcon className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Diamètre</span>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.diameter}</span>
                 </div>

                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                       <Clock className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Réserve de Marche</span>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.powerReserve}</span>
                 </div>

                 <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                       <Droplets className="w-4 h-4" />
                       <span className="text-[10px] uppercase tracking-widest font-bold">Étanchéité</span>
                    </div>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.waterResistance}</span>
                 </div>

                 {watch.technicalSpecs.jewels && (
                   <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-gold-600 dark:text-gold-500 mb-1">
                         <Gem className="w-4 h-4" />
                         <span className="text-[10px] uppercase tracking-widest font-bold">Empierrage</span>
                      </div>
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">{watch.technicalSpecs.jewels}</span>
                   </div>
                 )}
              </div>
            </FadeInBlock>
          )}

          {/* Case Back Section */}
          {watch.technicalSpecs?.caseBack && (
            <FadeInBlock delay={400}>
              <div className="mb-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-gold-600 dark:text-gold-500 shadow-sm">
                      <CircleDot className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-900 dark:text-white">Fond de Boîte</h4>
                 </div>
                 <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed font-light">
                    {watch.technicalSpecs.caseBack}
                 </p>
              </div>
            </FadeInBlock>
          )}
          
          {/* Provenance & Ref Section */}
          <FadeInBlock delay={500}>
            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-8 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2 text-gold-600 dark:text-gold-500">
                   <FileText className="w-4 h-4" />
                   <span className="text-[10px] uppercase tracking-widest font-bold">Archive Manufacture</span>
                </div>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                  REF: {watch.technicalSpecs?.reference}
                </p>
                <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                  Pièce de collection • Non disponible à la vente
                </p>
            </div>
          </FadeInBlock>

        </div>
      </div>
    </div>
  );
};

export default WatchDetail;
