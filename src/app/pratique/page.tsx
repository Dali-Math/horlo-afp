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
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ModuleItem {
  step: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  tools: string[];
  href: string;
  cta: string;
}

const ModuleCard: React.FC<ModuleItem> = ({
  step,
  badge,
  title,
  description,
  icon,
  iconBg,
  tools,
  href,
  cta,
}) => {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative h-full p-7 bg-white dark:bg-slate-900/80 dark:backdrop-blur-lg border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform duration-300 shadow-sm ${iconBg}`}
            >
              {icon}
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
              {badge}
            </span>
          </div>

          <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            {step}
          </span>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-6">
            {description}
          </p>
        </div>

        <div className="relative z-10 pt-2">
          <div className="flex flex-wrap gap-1.5 mb-5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {tools.map((t, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-800 dark:text-slate-200 hover:text-amber-800 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-500/40 text-xs font-bold transition-all">
            <span>{cta}</span>
            <span className="group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default function PratiquePage() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  const modules: ModuleItem[] = [
    {
      step: "Étape 01 • Fondations",
      badge: "ETA 6497-1",
      title: "Démontage & Assemblage",
      icon: <Wrench className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
      iconBg: "bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-500/20 text-orange-600 dark:text-orange-400",
      description: "Ordre chronologique strict : dépose balancier, pont d'ancre, rouage, barillet et classement des vis.",
      tools: ["Tournevis Bergeon", "Brucelles N°3"],
      href: "/pratique/demontage",
      cta: "Explorer le protocole",
    },
    {
      step: "Étape 02 • Précision",
      badge: "Moebius",
      title: "Huilage & Lubrification",
      icon: <Droplet className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />,
      iconBg: "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-200 dark:border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
      description: "Cartographie des 25 points : 9010 pour pivots rapides, HP-1300 pour barillet, 9415 pour levées d'ancre.",
      tools: ["Pique-huiles", "Huiliers 4 godets"],
      href: "/pratique/huilage",
      cta: "Explorer le protocole",
    },
    {
      step: "Étape 03 • Chronométrie",
      badge: "COSC",
      title: "Réglage & Précision",
      icon: <Clock className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />,
      iconBg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      description: "Contrôle au vibrographe : marche diurne, repère (beat error < 0.6 ms) et amplitude sur 5 positions d'épreuve.",
      tools: ["Vibrographe", "Clé de raquette"],
      href: "/pratique/reglage",
      cta: "Explorer le protocole",
    },
    {
      step: "Étape 04 • Habillage",
      badge: "NIHS 92-10",
      title: "Emboîtage & Étanchéité",
      icon: <ShieldCheck className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      iconBg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400",
      description: "Pose cadran et aiguilles au presse-aiguille, mise en boîte sans poussière et contrôle d'étanchéité à sec.",
      tools: ["Presse-aiguilles", "Cloche à vide"],
      href: "/pratique/outils",
      cta: "Explorer le protocole",
    },
    {
      step: "Établi • Arsenal",
      badge: "Équipement",
      title: "Outils & Équipement",
      icon: <Hammer className="w-6 h-6 text-rose-500 dark:text-rose-400" />,
      iconBg: "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400",
      description: "Entretien et affûtage des tournevis sur pierre d'Arkansas, rodico, machines de lavage et loupes d'établi.",
      tools: ["Pierre Arkansas", "Laveuse Elma"],
      href: "/pratique/outils",
      cta: "Explorer le matériel",
    },
    {
      step: "Documentation",
      badge: "Éclatés",
      title: "Fiches Techniques",
      icon: <FileText className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
      iconBg: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400",
      description: "Plans d'éclatés techniques complets ETA, nomenclatures officielles des composants et couples de serrage.",
      tools: ["Plans ETA 6497", "Plans ETA 2824"],
      href: "/pratique/fiches",
      cta: "Consulter les fiches",
    },
    {
      step: "Carrière • Diplômes",
      badge: "CFC / WOSTEP",
      title: "Certifications & Filières",
      icon: <Award className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
      description: "Standards suisses de la formation : AFP, CFC Horloger, Brevet Fédéral et programmes des écoles horlogères.",
      tools: ["Grilles d'examen", "Critères CP"],
      href: "/pratique/certifications",
      cta: "Voir les filières",
    },
    {
      step: "Spécialisation Atelier",
      badge: "Ergonomie",
      title: "Guide pour Gauchers",
      icon: <HandMetal className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
      iconBg: "bg-pink-50 dark:bg-pink-950/30 border-pink-200 dark:border-pink-500/20 text-pink-600 dark:text-pink-400",
      description: "Aménagement spatial de l'établi, tenue des brucelles et sens d'assemblage adapté aux horlogers gauchers.",
      tools: ["Disposition établi", "Tenue outils"],
      href: "/pratique/gauchers",
      cta: "Lire le guide",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-300">
      
      {/* Arrière-plan animé avec SVG adaptatif */}
      <div className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none text-slate-400 dark:text-white transition-colors duration-300">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        {/* En-tête Haute Horlogerie */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            ⚙️ Atelier Pratique & Gestes d'Établi
          </div>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-6">
            Maîtrise Technique & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
              Savoir-Faire Horloger
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Protocoles de démontage, lubrification certifiée Moebius et réglage de précision chronométrique selon les exigences des manufactures suisses.
          </p>

          {/* 3 Indicateurs de légitimité atelier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-xl">
                🛠️
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Programme Complet</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">8 Modules d'Atelier</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-xl">
                ⚙️
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Calibres de Référence</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">ETA 6497 & 2824-2</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-xl">
                🇨🇭
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Standards Suisses</div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Normes NIHS & COSC</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille Équilibrée 8 Modules (4x2 sur Desktop) */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {modules.map((module, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <ModuleCard {...module} />
            </motion.div>
          ))}
        </div>

        {/* Section Simulateur d'Établi Professionnel */}
        <div className="p-8 md:p-14 bg-white dark:bg-slate-900/80 dark:backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Entraînement & Évaluation Théorique
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
              Simulateur d'Atelier — Calibre ETA 6497
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
              Testez vos connaissances techniques avec les 26 questions fondamentales d'atelier : protocoles de dépose, points de lubrification et règles chronométriques.
            </p>
          </div>

          <Flashcards6497 />
        </div>
      </div>

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
