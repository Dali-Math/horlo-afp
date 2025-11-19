
import React, { useEffect, useRef, useState } from 'react';
import { Clock, Star, Award, Anchor } from 'lucide-react';

const historyEvents = [
  {
    year: "1904",
    title: "La Genèse",
    description: "Au cœur de la Vallée de Joux, Alfred P. transforme la ferme familiale en atelier. Son obsession : la finesse absolue. Il dépose son premier brevet pour un échappement ultra-plat dès sa première année d'activité.",
    image: "https://images.unsplash.com/photo-1568031813264-d394c5d474b9?q=80&w=1200&auto=format&fit=crop&fm=webp",
    icon: <Clock className="w-5 h-5" />
  },
  {
    year: "1925",
    title: "L'Heure Universelle",
    description: "Création d'une montre de poche capable d'afficher l'heure de 24 villes simultanément. Une prouesse mécanique conçue pour les premiers explorateurs de l'aviation civile internationale.",
    image: "https://images.unsplash.com/photo-1509941943102-10c232535736?q=80&w=1200&auto=format&fit=crop&fm=webp",
    icon: <Star className="w-5 h-5" />
  },
  {
    year: "1969",
    title: "La Révolution Automatique",
    description: "En pleine course à la précision, la manufacture dévoile le Calibre 2120. Avec son rotor en or 21 carats et ses 2.45mm d'épaisseur, il reste à ce jour le mouvement automatique le plus fin du monde.",
    image: "https://images.unsplash.com/photo-1612333974013-335043c82c7e?q=80&w=1200&auto=format&fit=crop&fm=webp",
    icon: <Anchor className="w-5 h-5" />
  },
  {
    year: "2024",
    title: "L'Ère du Tourbillon Céleste",
    description: "Fusion de la haute technologie et des métiers d'art. Le nouveau tourbillon volant intègre du silicium et de l'aventurine, repoussant les limites de la résonance magnétique et de la précision.",
    image: "https://images.unsplash.com/photo-1639043722204-02252c774138?q=80&w=1200&auto=format&fit=crop&fm=webp",
    icon: <Award className="w-5 h-5" />
  }
];

const History: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.add(index);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    const items = document.querySelectorAll('.history-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="history" ref={sectionRef} className="py-32 bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
            <span className="text-gold-600 dark:text-gold-400 uppercase tracking-[0.3em] text-xs font-bold block mb-4 animate-[fade-in_1s_ease-out]">Depuis 1904</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-neutral-900 dark:text-white animate-[slide-up_1s_ease-out_0.2s_both]">L'Épopée du Temps</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-8 animate-[width-grow_1s_ease-out_0.4s_both]"></div>
            <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-400 text-lg font-light leading-relaxed animate-[fade-in_1s_ease-out_0.6s_both]">
                Plus d'un siècle d'innovations ininterrompues, où chaque décennie a marqué une nouvelle conquête sur l'infiniment petit.
            </p>
        </div>

        <div className="relative">
            {/* Central Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/50 to-transparent"></div>

            <div className="space-y-32">
                {historyEvents.map((event, index) => (
                    <div 
                      key={index} 
                      data-index={index}
                      className={`history-item flex flex-col md:flex-row items-center gap-12 md:gap-0 transition-all duration-1000 ease-out ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} ${visibleItems.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}
                    >
                        
                        {/* Text Side */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'} text-center md:text-left group`}>
                            <div className={`inline-flex items-center gap-3 mb-4 text-gold-600 dark:text-gold-500 justify-center ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                                {index % 2 === 0 && <span className="text-5xl font-serif font-bold opacity-80 bg-clip-text text-transparent bg-gradient-to-b from-gold-400 to-gold-600">{event.year}</span>}
                                
                                <div className="p-3 border border-gold-500/30 rounded-full md:hidden shadow-[0_0_15px_rgba(212,163,43,0.2)]">
                                    {event.icon}
                                </div>
                                {index % 2 !== 0 && <div className="hidden md:block p-3 border border-gold-500/30 rounded-full shadow-[0_0_15px_rgba(212,163,43,0.2)] bg-neutral-50 dark:bg-neutral-950">{event.icon}</div>}

                                {index % 2 !== 0 && <span className="text-5xl font-serif font-bold opacity-80 md:hidden bg-clip-text text-transparent bg-gradient-to-b from-gold-400 to-gold-600">{event.year}</span>}
                            </div>
                            
                            <h3 className="text-2xl md:text-3xl font-serif text-neutral-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors duration-300">{event.title}</h3>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg font-light">{event.description}</p>

                            <div className={`hidden md:flex items-center gap-3 mt-6 text-gold-600 dark:text-gold-500 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                {index % 2 === 0 && <div className="p-3 border border-gold-500/30 rounded-full shadow-[0_0_15px_rgba(212,163,43,0.2)] bg-neutral-50 dark:bg-neutral-950">{event.icon}</div>}
                                {index % 2 !== 0 && <span className="text-5xl font-serif font-bold opacity-20 bg-clip-text text-transparent bg-gradient-to-b from-gold-400 to-gold-600">{event.year}</span>}
                            </div>
                        </div>

                        {/* Center Node */}
                        <div className="relative z-10 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-gold-500/50 shadow-[0_0_20px_rgba(212,163,43,0.2)] shrink-0 group-hover:scale-110 transition-transform duration-500">
                             <div className={`w-4 h-4 bg-gold-500 rounded-full shadow-[0_0_10px_#D4A32B] transition-all duration-500 ${visibleItems.has(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                        </div>

                        {/* Image Side */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16'} w-full`}>
                            <div className="relative group aspect-[3/2] overflow-hidden rounded-sm border border-neutral-200 dark:border-neutral-800 shadow-2xl">
                                <div className="absolute inset-0 bg-gold-500/10 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-overlay"></div>
                                <img 
                                    src={event.image} 
                                    alt={event.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                
                                {/* Decorative Border Corner */}
                                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default History;
