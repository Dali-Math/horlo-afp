// src/app/pratique/page.tsx

"use client";

import Flashcards6497 from "@/components/Flashcards6497";
import Link from "next/link";
import {
  Wrench,
  Clock,
  Droplet,
  FileText,
  Award,
  Hammer,
  HandMetal,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// --- Composant pour un module d'étude ---
interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  iconBg?: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, href, iconBg }) => {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full p-8 bg-white dark:bg-slate-900/60 dark:backdrop-blur-lg border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 dark:hover:border-cyan-400/40 rounded-3xl shadow-sm hover:shadow-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
      >
        {/* Effet de brillance au survol */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative z-10">
          <div className={`mb-5 p-3.5 ${iconBg || "bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10"} rounded-2xl w-fit border group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <div className="relative z-10 pt-2">
          <span className="inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300">
            Explorer le module <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

// --- Section pour les flashcards (Simulateur) ---
const SimulatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7 }}
      className="mt-32 p-8 md:p-12 bg-white dark:bg-black/40 dark:backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl shadow-lg dark:shadow-2xl transition-colors duration-300"
    >
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Simulateur d'Apprentissage
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
          Testez vos connaissances sur le mouvement <span className="text-cyan-600 dark:text-cyan-400 font-bold">ETA 6497</span> avec notre système de flashcards interactif.
        </p>
        <Flashcards6497 />
      </div>
    </motion.div>
  );
};

// --- Page Principale ---
export default function PratiquePage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const modules = [
    {
      title: "Démontage & Remontage",
      icon: <Wrench className="w-7 h-7 text-orange-500 dark:text-orange-400" />,
      description: "Maîtrisez les gestes fondamentaux pour assembler et désassembler les mécanismes complexes.",
      href: "/pratique/demontage",
      iconBg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400",
    },
    {
      title: "Huilage & Lubrification",
      icon: <Droplet className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />,
      description: "Apprenez les protocoles essentiels pour assurer la longévité et la fluidité du mouvement.",
      href: "/pratique/huilage",
      iconBg: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Réglage & Précision",
      icon: <Clock className="w-7 h-7 text-emerald-600 dark:text-green-400" />,
      description: "Affinez la précision chronométrique par le réglage expert du balancier et de l'échappement.",
      href: "/pratique/reglage",
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-green-400",
    },
    {
      title: "Outils & Équipement",
      icon: <Hammer className="w-7 h-7 text-rose-500 dark:text-red-400" />,
      description: "Découvrez l'arsenal complet de l'horloger et les meilleures pratiques d'utilisation.",
      href: "/pratique/outils",
      iconBg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-red-400",
    },
    {
      title: "Fiches Techniques",
      icon: <FileText className="w-7 h-7 text-amber-500 dark:text-yellow-400" />,
      description: "Accédez à une bibliothèque exhaustive de documents techniques pour tous les niveaux.",
      href: "/pratique/fiches",
      iconBg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-yellow-400",
    },
    {
      title: "Certifications",
      icon: <Award className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />,
      description: "Parcourez les standards de l'industrie et les chemins vers la reconnaissance professionnelle.",
      href: "/pratique/certifications",
      iconBg: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Guide pour Gauchers",
      icon: <HandMetal className="w-7 h-7 text-pink-500 dark:text-pink-400" />,
      description: "Des solutions et adaptations pensées pour une pratique d'horlogerie accessible à tous.",
      href: "/pratique/gauchers",
      iconBg: "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-500/20 text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    // Fond réactif : Blanc Manufacture en Mode Jour, Bleu Ardoise Profond en Mode Nuit
    <div className="relative min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-blue-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Arrière-plan animé avec SVG adaptatif */}
      <div className="absolute inset-0 opacity-20 dark:opacity-20 pointer-events-none text-slate-400 dark:text-white transition-colors duration-300">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Rouages animés */}
          <g className="animate-spin-slow" style={{ transformOrigin: '150px 150px', animationDuration: '20s' }}>
            <circle cx="150" cy="150" r="50" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="150" cy="150" r="5" fill="currentColor"/>
            <path d="M 150 100 L 150 110 M 200 150 L 190 150 M 150 200 L 150 190 M 100 150 L 110 150" stroke="currentColor" strokeWidth="2"/>
          </g>
          <g className="animate-spin-slow" style={{ transformOrigin: '80% 60%', transform: 'scale(0.7)', animationDuration: '30s', animationDirection: 'reverse' }}>
            <circle cx="0" cy="0" r="50" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="0" cy="0" r="5" fill="currentColor"/>
            <path d="M 0 -50 L 0 -40 M 50 0 L 40 0 M 0 50 L 0 40 M -50 0 L -40 0" stroke="currentColor" strokeWidth="2"/>
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        {/* En-tête */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 dark:from-cyan-300 dark:via-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Pratique
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Plongez au cœur du mécanisme. Explorez les modules interactifs pour maîtriser l'art de l'horlogerie de manière intuitive et immersive.
          </p>
        </motion.div>

        {/* Grille des modules */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ModuleCard {...module} />
            </motion.div>
          ))}
        </div>

        {/* Section Simulateur */}
        <SimulatorSection />
      </div>

      {/* Style pour l'animation des rouages */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  );
}
