'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Compass,
  BookOpen,
  Wrench,
  Award,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
  Globe,
  Layers,
  Brain,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

// Horloge interactive Haute Horlogerie Suisse (rendue côté client uniquement pour éviter les écarts d'hydratation)
const LuxuryHeroClock = dynamic(() => import('@/components/LuxuryHeroClock'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[620px] h-[480px] rounded-3xl bg-slate-900/60 border border-amber-500/20 animate-pulse flex items-center justify-center">
      <span className="text-amber-400 font-mono text-xs tracking-widest">
        CHRONOMÈTRE SUISSE HAUTE HORLOGERIE...
      </span>
    </div>
  ),
});

const SwissWatchAtlas = dynamic(() => import('@/components/SwissWatchAtlas'), {
  ssr: false,
});

const ScrollytellingDemontage3D = dynamic(() => import('@/components/ScrollytellingDemontage3D'), {
  ssr: false,
  loading: () => null,
});

/* 👑 Section Héros avec la Montre Haute Horlogerie Suisse */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-14 md:py-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-slate-100 to-amber-50/20 dark:from-[#07090E] dark:via-[#0D1322] dark:to-slate-950" />
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 650px 300px at 15% 20%, rgba(212,175,55,0.15), transparent 60%), radial-gradient(ellipse 600px 300px at 85% 15%, rgba(6,182,212,0.12), transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Colonne Gauche (5 colonnes) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <span className="w-3.5 h-3.5 rounded bg-red-600 text-white flex items-center justify-center text-[10px] font-black leading-none">🇨🇭</span>
            Référentiel Pédagogique Suisse • 70 Modules
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight text-slate-900 dark:text-white leading-tight">
            L&apos;Art du Temps & <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
              Haute Horlogerie Suisse
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Du premier battement de balancier aux grandes complications et au silicium. Une encyclopédie vivante, structurée et interactive conçue pour transmettre l&apos;excellence micromécanique suisse au monde entier.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#parcours"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <span>Choisir Mon Parcours Guidé</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/theorie"
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-mono font-semibold text-xs hover:border-amber-500 transition-all shadow-sm"
            >
              Explorer les 17 Traités
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Accès 100% Libre
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Standards NIHS & ISO
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Référentiel CP Suisse
            </span>
          </div>
        </div>

        {/* Colonne Droite (7 colonnes) : Montre interactive & complications astronomiques réelles */}
        <div className="lg:col-span-7 flex justify-center items-center">
          <LuxuryHeroClock />
        </div>

      </div>
    </section>
  );
}

/* ✅ Carrousel défilant de rubriques */
function Carousel() {
  const items = [
    { name: "Théorie Fondamentale", href: "/theorie" },
    { name: "Pratique & Démontage", href: "/pratique" },
    { name: "Technologies & Quartz", href: "/theorie/technologies" },
    { name: "Fuseaux Horaires Cottier", href: "/fuseaux-horaires" },
    { name: "Manufactures Suisses", href: "/theorie/manufactures" },
    { name: "Écorchés Calibres 3D", href: "/theorie/galerie-3d" },
    { name: "Quiz & Certifications", href: "/quiz" },
    { name: "Outils & Calculateurs", href: "/outils" },
    { name: "Histoire de l'Horlogerie", href: "/theorie/histoire-horlogerie-suisse" }
  ];

  return (
    <section className="py-4 bg-white/80 dark:bg-slate-900/80 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 animate-[scroll_35s_linear_infinite]"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {items.concat(items).map((it, i) => (
            <Link
              key={i}
              href={it.href}
              className="shrink-0 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition text-xs font-mono font-medium shadow-sm"
            >
              {it.name}
            </Link>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from {transform: translateX(0);} to {transform: translateX(-50%);} }`}</style>
    </section>
  );
}

/* 🧭 ACTION 1 : SECTION DU PARCOURS GUIDÉ MONDIAL */
function GuidedPathwaysSection() {
  return (
    <section id="parcours" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 space-y-12 scroll-mt-20">
      
      {/* Header de section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Guide Universel d&apos;Apprentissage • Choisissez votre Niveau
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold font-serif text-slate-900 dark:text-white leading-tight">
          Par où commencer ? <br />
          <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
            Votre Parcours Horloger Méthodique
          </span>
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
          Pour rendre l&apos;horlogerie suisse accessible au monde entier sans se perdre dans le jargon, nous avons structuré nos 70 modules en 3 parcours progressifs clairs.
        </p>
      </div>

      {/* ⭐ CARTE VITRINE REPOSITIONNÉE : 70 MODULES & SIMULATEURS D'ATELIER */}
      <div className="relative group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 text-white max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-amber-400 font-bold ml-2">
              HorloLearn • Calibre Virtuel & Laboratoire
            </span>
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Corpus Pédagogique Mondial
          </span>
        </div>

        <div className="grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-3">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              70 Modules de Formation & Simulateurs d&apos;Atelier
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Découvrez la cinématique des calibres ETA 6497-1 et 2824-2, la dépose de balancier-spiral, le protocole de huilage Moebius et les 15 plus prestigieuses manufactures suisses.
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-3 font-mono text-xs">
            <Link
              href="/theorie/galerie-3d"
              className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 transition flex items-center justify-between group/link"
            >
              <span className="font-semibold text-slate-100">Écorché 3D des Calibres</span>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover/link:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/theorie/complications"
              className="p-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 hover:border-amber-500/50 transition flex items-center justify-between group/link"
            >
              <span className="font-semibold text-slate-100">Grandes Complications</span>
              <ChevronRight className="w-4 h-4 text-amber-400 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Les 3 Cartes de Parcours Progressifs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* PARCOURS 1 : DÉCOUVERTE */}
        <div className="group rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-emerald-500/30 hover:border-emerald-500 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                Niveau 1 • Découverte (15-30 min)
              </span>
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-xs">
                01
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                L&apos;Éveil du Temps & les Fondations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Idéal si vous découvrez l&apos;horlogerie. Comprenez enfin comment une montre fonctionne sans aucune pile et pourquoi la Suisse est devenue la capitale mondiale du temps.
              </p>
            </div>

            {/* Étapes reliées à vos vraies pages existantes */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Modules clés à explorer :
              </div>
              
              <Link
                href="/theorie/introduction-montre-mecanique"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">1. Comment Fonctionne une Montre ?</div>
                  <div className="text-[11px] text-slate-500">Les 5 grands organes cinématiques</div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </Link>

              <Link
                href="/theorie/histoire-horlogerie-suisse"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-emerald-500/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">2. Pourquoi la Suisse ?</div>
                  <div className="text-[11px] text-slate-500">Calvin, le Jura & l&apos;UNESCO</div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/theorie/introduction-montre-mecanique"
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition shadow-md"
            >
              <span>Commencer par l&apos;Introduction</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* PARCOURS 2 : PASSIONNÉ & CULTURE */}
        <div className="group rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-amber-500/30 hover:border-amber-500 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                Niveau 2 • Passionné & Culture (1-2h)
              </span>
              <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-xs">
                02
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Manufactures & Complications
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Pour les amateurs avertis et collectionneurs. Plongez dans l&apos;histoire des maisons légendaires, le tourbillon régulateur, les fuseaux horaires et les nouveaux calibres en silicium.
              </p>
            </div>

            {/* Étapes reliées à vos vraies pages existantes */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Modules clés à explorer :
              </div>
              
              <Link
                href="/theorie/manufactures"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">1. Les 15 Grandes Manufactures</div>
                  <div className="text-[11px] text-slate-500">Patek, Rolex, AP, Vacheron, JLC...</div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500" />
              </Link>

              <Link
                href="/theorie/complications"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">2. Musée des Grandes Complications</div>
                  <div className="text-[11px] text-slate-500">Tourbillon, Quantième & Sonnerie</div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500" />
              </Link>

              <Link
                href="/fuseaux-horaires"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-amber-500/10 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">3. Heures du Monde Cottier</div>
                  <div className="text-[11px] text-slate-500">Cartographie solaire des 24 méridiens</div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-500" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/theorie/manufactures"
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition shadow-md"
            >
              <span>Découvrir les Manufactures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* PARCOURS 3 : ÉTABLI & RHABILLAGE */}
        <div className="group rounded-3xl bg-white dark:bg-[#0D121F] border-2 border-cyan-500/30 hover:border-cyan-500 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                Niveau 3 • Apprenti d&apos;Atelier (CFC / AFP)
              </span>
              <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-xs">
                03
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Établi, Démontage & Tolérances
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Pour les élèves horlogers et restaurateurs. Maîtrisez la cinématique de l&apos;échappement à ancre en 5 phases, les tolérances NIHS H7/g6, le démontage virtuel et le huilage Moebius.
              </p>
            </div>

            {/* Étapes reliées à vos vraies pages existantes */}
            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                Modules clés à explorer :
              </div>
              
              <Link
                href="/theorie/echappement-ancre"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">1. L&apos;Échappement à Ancre Suisse</div>
                  <div className="text-[11px] text-slate-500">Repos, tirage, chute & levées</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-500" />
              </Link>

              <Link
                href="/theorie/lecture-de-plan"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">2. Lecture de Plans Horlogers</div>
                  <div className="text-[11px] text-slate-500">Normes NIHS & Tolérances H7/g6</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-500" />
              </Link>

              <Link
                href="/pratique/demontage"
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 hover:bg-cyan-500/10 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">3. Simulateur de Démontage</div>
                  <div className="text-[11px] text-slate-500">Calibre ETA 6497 pas à pas</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-500" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/pratique"
              className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition shadow-md"
            >
              <span>Accéder à l&apos;Atelier Pratique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ✅ Atlas suisse — remplace l’ancienne grille de 9 cases */
function ExploreGrid() {
  return <SwissWatchAtlas />;
}

/* ✅ Section Partenaires */
function PartnersSection() {
  const partners = [
    { alt: "Rolex" },
    { alt: "Patek Philippe" },
    { alt: "Audemars Piguet" },
    { alt: "Vacheron Constantin" },
    { alt: "Chopard" },
    { alt: "Jaeger-LeCoultre" },
    { alt: "Breguet" },
  ];

  return (
    <section className="relative bg-[#0A0A0A] py-16 md:py-20 overflow-hidden border-t border-slate-800">
      <div className="text-center mb-10 relative z-10 space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
          Excellence & Patrimoine
        </span>
        <h2
          className="text-2xl md:text-4xl font-serif font-bold text-[#E2B44F]"
          style={{ textShadow: "0 0 15px rgba(226,180,79,0.5)" }}
        >
          Inspiré par les Maîtres Cabinotiers Suisses
        </h2>
      </div>
      <motion.div
        className="flex items-center justify-around gap-20 px-8 relative z-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...partners, ...partners].map((p, i) => (
          <div
            key={i}
            className="grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 shrink-0"
          >
            <span className="text-lg font-serif font-bold text-slate-300 tracking-wider">
              {p.alt}
            </span>
          </div>
        ))}
      </motion.div>
      <p className="text-center text-slate-500 mt-8 text-xs font-mono relative z-10">
        Ressources académiques ouvertes pour la formation horlogère internationale.
      </p>
    </section>
  );
}

/* ✅ Page principale */
export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-amber-500/30 selection:text-amber-600 dark:selection:text-amber-200">
      <Hero />
      <Carousel />
      <ScrollytellingDemontage3D />
      <GuidedPathwaysSection />
      <ExploreGrid />
      <PartnersSection />
    </div>
  );
}