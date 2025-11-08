'use client';

import React, { useState, useEffect, useRef, FC, ReactNode } from 'react';
import { ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle, Scale, Layers, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';

// --- HOOK PERSONNALISÉ POUR LES ANIMATIONS AU SCROLL (sans dépendances) ---
const useIntersectionObserver = (options: IntersectionObserverInit) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, entry] as const;
};

// --- COMPOSANT POUR LES COMPTEURS ANIMÉS ---
const AnimatedCounter: FC<{ value: number; duration?: number; className?: string }> = ({ value, duration = 2000, className }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const end = value;
        const stepTime = Math.abs(Math.floor(duration / end));
        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) {
            clearInterval(timer);
          }
        }, stepTime);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current) };
  }, [value, duration]);

  return <span ref={ref} className={className}>{count}</span>;
};


// --- COMPOSANT POUR LE SCHÉMA INTERACTIF ---
const InteractiveBarrelDiagram: FC = () => {
  const [highlightedPart, setHighlightedPart] = useState<string | null>(null);
  const parts = {
    tambour: { name: "Tambour", desc: "Conteneur en laiton avec denture extérieure." },
    ressort: { name: "Ressort Moteur", desc: "Lame en alliage (Nivaflex®) qui stocke l'énergie." },
    arbre: { name: "Arbre de barillet", desc: "Axe central qui reçoit le couple de remontage." },
    couvercle: { name: "Couvercle", desc: "Ferme le système et protège le ressort." },
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <svg viewBox="0 0 200 200" className="w-full max-w-sm flex-shrink-0">
        <g className="transition-all duration-300" transform={highlightedPart === 'couvercle' ? 'translate(0, -10)' : 'translate(0, 0)'}>
          <circle cx="100" cy="100" r="80" fill="#E2E8F0" className="dark:fill-slate-700" opacity={highlightedPart === 'couvercle' || !highlightedPart ? 1 : 0.3} />
          <text x="100" y="20" className="text-xs font-bold fill-current" textAnchor="middle">Couvercle</text>
        </g>
        <g className="transition-all duration-300" transform={highlightedPart === 'tambour' ? 'translate(0, 10)' : 'translate(0, 0)'}>
          <circle cx="100" cy="100" r="75" fill="none" stroke="#94A3B8" strokeWidth="10" opacity={highlightedPart === 'tambour' || !highlightedPart ? 1 : 0.3} />
          <text x="10" y="105" className="text-xs font-bold fill-current">Tambour</text>
        </g>
         <path d="M 100 100 C 120 120, 80 140, 100 160 S 140 80, 120 60 C 100 40, 60 80, 80 110" fill="none" stroke="#10B981" strokeWidth="3" 
              className={`transition-all duration-300 ${highlightedPart === 'ressort' || !highlightedPart ? 'opacity-100' : 'opacity-20'}`} />
        <circle cx="100" cy="100" r="10" fill="#475569" className={`transition-all duration-300 ${highlightedPart === 'arbre' || !highlightedPart ? 'opacity-100' : 'opacity-20'}`} />
      </svg>
      <div className="w-full">
        <h4 className="font-bold text-2xl mb-4 text-slate-900 dark:text-white">Anatomie d'une centrale énergétique</h4>
        <div className="space-y-3">
          {Object.entries(parts).map(([key, { name, desc }]) => (
            <div key={key} onMouseEnter={() => setHighlightedPart(key)} onMouseLeave={() => setHighlightedPart(null)}
                 className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${highlightedPart === key ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-transparent'}`}>
              <p className="font-bold text-blue-600 dark:text-blue-400">{name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// --- COMPOSANT PRINCIPAL DE LA PAGE ---
export default function BarilletRessortMoteur() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const AnimatedSection: FC<{children: ReactNode}> = ({children}) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.2 });
    return (
      <div ref={ref} className={`transition-all duration-700 ease-out ${entry?.isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {children}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Le Barillet & Ressort Moteur - La Référence Absolue de l'Horlogerie Suisse</title>
        <meta name="description" content="Une exploration immersive et technique du barillet, le cœur énergétique de la montre mécanique suisse. Découvrez son histoire, sa physique et ses innovations." />
        <style>{`
          .text-gradient {
            background: -webkit-linear-gradient(45deg, #0284c7, #10b981);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </Head>

      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-800 z-50">
        <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-800 dark:text-slate-200">
        <header className="bg-white/50 dark:bg-black/50 backdrop-blur-lg shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/theorie" className="font-bold text-lg text-gradient">HorloLearn</Link>
            <Link href="/theorie" className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors">Retour à la Théorie</Link>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-24 md:py-32 space-y-32">
          
          {/* --- HERO SECTION --- */}
          <AnimatedSection>
            <section className="text-center">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 dark:text-white">
                La Batterie <br className="hidden md:block" />
                <span className="text-gradient">Mécanique</span>.
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Plongez au cœur du barillet, le composant ingénieux qui capture le mouvement humain pour donner vie au temps. Une merveille de physique et de métallurgie.
              </p>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <p className="text-5xl font-bold text-gradient"><AnimatedCounter value={500} /></p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">Ans d'évolution</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <p className="text-5xl font-bold text-gradient">≈<AnimatedCounter value={40} />h</p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">d'autonomie standard</p>
                </div>
                 <div className="p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
                  <p className="text-5xl font-bold text-gradient"><AnimatedCounter value={99} />%</p>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-2">des montres mécaniques</p>
                </div>
              </div>
            </section>
          </AnimatedSection>
          
          {/* --- SECTION ANATOMIE --- */}
          <AnimatedSection>
            <section>
                <InteractiveBarrelDiagram />
            </section>
          </AnimatedSection>

          {/* --- SECTION ISOCHRONISME (Style Asymétrique) --- */}
          <AnimatedSection>
            <section className="grid md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-2">
                    <Scale className="w-24 h-24 text-emerald-500 mx-auto md:mx-0" />
                </div>
                <div className="md:col-span-3">
                    <h2 className="text-4xl font-bold mb-4 dark:text-white">La Quête de la Force Constante</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Le défi suprême d'un ressort est sa tendance naturelle à faiblir. Cette variation de force, ou 'couple', perturbe la régularité du balancier (l'isochronisme) et donc la précision. Les plus grandes innovations – double barillet, alliages spéciaux – n'ont qu'un seul but : délivrer une énergie aussi stable que le cours d'une rivière.
                    </p>
                </div>
            </section>
          </AnimatedSection>
          
          {/* --- SECTION ARCHITECTURES (Pull-quote style) --- */}
          <AnimatedSection>
            <section className="text-center border-t border-b border-slate-200 dark:border-slate-800 py-20">
              <Layers className="w-16 h-16 text-sky-500 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-4xl font-serif italic max-w-4xl mx-auto dark:text-white">
                "En série pour l'endurance, en parallèle pour la puissance. L'architecture des barillets est la signature stratégique d'un grand calibre."
              </blockquote>
              <p className="mt-6 text-slate-500 font-medium">— Citation d'un Maître Horloger</p>
            </section>
          </AnimatedSection>
          
          {/* --- SECTION QUIZ --- */}
          <AnimatedSection>
            <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-2xl">
              <div className="text-center">
                <Award className="w-12 h-12 text-gradient mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2 dark:text-white">Testez votre expertise</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Prouvez votre maîtrise de la théorie.</p>
              </div>
              
              {/* Le code du Quiz peut être inséré ici, réutilisant la logique déjà écrite */}
            </section>
          </AnimatedSection>
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 mt-32">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
            <p className="font-bold text-lg mb-2 text-slate-800 dark:text-slate-200">HorloLearn</p>
            <p>© 2025. Une ressource conçue avec la précision d'un mouvement suisse.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
