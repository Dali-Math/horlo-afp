
import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "La main de l'homme transmet une émotion qu'aucune machine ne pourra jamais reproduire.",
    author: "Philippe Dufour",
    role: "Maître Horloger Indépendant"
  },
  {
    text: "Je ne dessine pas des montres, je dessine le temps qui passe.",
    author: "Gérald Genta",
    role: "Designer de Légende"
  },
  {
    text: "Pour faire une montre parfaite, il faut être un architecte de l'infiniment petit.",
    author: "Abraham-Louis Breguet",
    role: "Inventeur du Tourbillon (1801)"
  },
  {
    text: "L'horlogerie est l'art de décorer le temps.",
    author: "Jean-Claude Biver",
    role: "Visionnaire de l'Horlogerie"
  },
  {
    text: "Nous ne sommes pas propriétaires de nos montres, nous n'en sommes que les gardiens pour les générations futures.",
    author: "Campagne Patek Philippe",
    role: "Philosophie de Marque"
  }
];

const MasterQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % quotes.length);
        setIsAnimating(false);
      }, 800); // Durée de la transition "out"
    }, 8000); // Temps d'affichage de chaque citation

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background Ambient Texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-neutral-950"></div>
         <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#D4A32B 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.1 }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        <div className="mb-12 flex justify-center">
           <div className="relative">
              <Quote className="w-12 h-12 text-gold-500 opacity-30" />
              <div className="absolute top-0 left-0 w-full h-full bg-gold-500 blur-xl opacity-10"></div>
           </div>
        </div>

        <div className="min-h-[200px] flex flex-col justify-center items-center">
            <blockquote 
              className={`transition-all duration-1000 transform ease-in-out ${
                isAnimating ? 'opacity-0 translate-y-4 blur-sm' : 'opacity-100 translate-y-0 blur-0'
              }`}
            >
              <p className="font-serif text-2xl md:text-4xl italic leading-relaxed text-neutral-200 mb-8">
                "{quotes[currentIndex].text}"
              </p>
              
              <footer className="flex flex-col items-center gap-2">
                <div className="w-12 h-[1px] bg-gold-500 mb-2"></div>
                <cite className="not-italic font-serif text-xl text-white font-bold tracking-wide">
                  {quotes[currentIndex].author}
                </cite>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-500 font-medium">
                  {quotes[currentIndex].role}
                </span>
              </footer>
            </blockquote>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsAnimating(false);
                }, 500);
              }}
              className={`h-1 rounded-full transition-all duration-500 ${
                idx === currentIndex 
                  ? 'w-8 bg-gold-500' 
                  : 'w-2 bg-neutral-800 hover:bg-neutral-600'
              }`}
              aria-label={`Aller à la citation ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default MasterQuotes;
