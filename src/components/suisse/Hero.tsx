
import React from 'react';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white">
      {/* Background with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Overlay léger pour le contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2574&auto=format&fit=crop&fm=webp" 
          alt="Mouvement Mécanique Suisse Macro"
          className="w-full h-full object-cover animate-[subtle-zoom_30s_linear_infinite] origin-center opacity-80" 
          style={{ transform: 'scale(1.1)' }}
          fetchPriority="high"
          decoding="sync"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 md:px-6">
        
        <div className="mb-6 md:mb-8 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
          <span className="inline-block py-1.5 px-4 border border-gold-500/40 rounded-sm text-gold-300 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase bg-black/20 backdrop-blur-md shadow-lg">
            Manufacture Suisse • Depuis 1904
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight md:leading-none mb-6 opacity-0 animate-[slide-up_1s_ease-out_0.7s_forwards]">
          <span className="block text-white mix-blend-overlay font-medium">L'ART ABSOLU</span>
          <span className="block text-gold-500 font-light italic mt-0 md:mt-2">du Temps</span>
        </h1>

        <p className="max-w-xs md:max-w-xl text-base md:text-xl text-neutral-300 font-light leading-relaxed mb-10 md:mb-12 opacity-0 animate-[slide-up_1s_ease-out_0.9s_forwards]">
          Au-delà de la précision, l'émotion. <br className="hidden md:block"/>
          Découvrez la référence mondiale de la Haute Horlogerie.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto opacity-0 animate-[slide-up_1s_ease-out_1.1s_forwards]">
          <a href="#collections" className="group relative px-8 md:px-10 py-4 overflow-hidden bg-white text-neutral-950 transition-all duration-300 hover:bg-gold-500 hover:text-white text-center">
            <span className="relative z-10 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Explorer la Collection</span>
          </a>
          <a href="#history" className="group px-8 md:px-10 py-4 border border-white/30 text-white hover:border-gold-500 hover:text-gold-400 transition-all duration-300 text-center">
             <span className="font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Notre Héritage</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 md:gap-4 opacity-60 animate-pulse">
        <span className="text-[10px] uppercase tracking-widest text-gold-400 font-medium">Découvrir</span>
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gold-400" />
      </div>
      
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1.0); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
