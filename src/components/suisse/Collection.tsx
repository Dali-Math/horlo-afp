import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { watches } from '../data/watches';
import Skeleton from './Skeleton';

// Utility to optimize Unsplash URLs for grid display
const getOptimizedImageUrl = (url: string) => {
  return url.replace('w=2574', 'w=800').replace('w=2594', 'w=800') + '&fm=webp&q=80';
};

const CollectionItem: React.FC<{ watch: typeof watches[0] }> = ({ watch }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/watch/${watch.id}`} className="group block">
      {/* Image Container - Ratio 3:4 */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-8 shadow-sm">
        
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20">
            <Skeleton className="w-full h-full" />
          </div>
        )}

        <img
          src={getOptimizedImageUrl(watch.image)}
          alt={watch.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-[1.5s] ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {watch.features.slice(0,2).map((feature, i) => (
            <span key={i} className="bg-white/90 dark:bg-black/80 backdrop-blur text-[10px] uppercase tracking-widest font-bold px-3 py-1 text-neutral-900 dark:text-white shadow-sm">
              {feature}
            </span>
          ))}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 z-30 bg-black/20 dark:bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button className="bg-white text-neutral-900 px-6 md:px-8 py-3 uppercase tracking-widest text-[10px] md:text-xs font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
            Découvrir
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="text-center px-2">
        <span className="text-gold-600 dark:text-gold-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-3 block">
          {watch.collection}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-neutral-900 dark:text-white mb-3 group-hover:text-gold-500 transition-colors">
          {watch.name}
        </h3>
        <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
          {watch.description}
        </p>
      </div>
    </Link>
  );
};

const Collection: React.FC = () => {
  return (
    <section id="collections" className="py-24 md:py-32 bg-white dark:bg-neutral-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 pb-8 border-b border-neutral-200 dark:border-neutral-800">
          <div className="text-center md:text-left w-full md:w-auto">
             <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs font-bold">La Galerie</span>
             <h2 className="text-3xl md:text-5xl font-serif mt-4 text-neutral-900 dark:text-white leading-tight">Collections Rares</h2>
          </div>
          <button className="hidden md:flex items-center gap-3 text-neutral-900 dark:text-white uppercase tracking-widest text-xs font-bold hover:text-gold-500 transition-colors group">
            Voir le catalogue complet 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {watches.map((watch) => (
            <CollectionItem key={watch.id} watch={watch} />
          ))}
        </div>

        <div className="mt-16 text-center md:hidden">
           <button className="inline-flex items-center gap-2 text-neutral-900 dark:text-white uppercase tracking-widest text-xs font-bold border-b border-neutral-900 dark:border-white pb-1">
            Voir tout le catalogue <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collection;