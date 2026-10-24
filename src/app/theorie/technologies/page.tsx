"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Zap,
  Smartphone,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Layers,
  Award,
  Clock,
  Battery,
  Atom,
  Activity,
  Cpu,
  Radio,
  RotateCw,
  Scale,
  CheckCircle2,
  Sliders,
  HelpCircle,
  Flame,
  Gauge
} from "lucide-react";

// --- TYPES & DATA ---
interface TechModule {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  tagColor: string;
  icon: string;
  norm: string;
  desc: string;
  href: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  cardGradient: string;
}

const TECH_MODULES: TechModule[] = [
  {
    id: "quartz",
    title: "Mouvements à Quartz & HAQ",
    subtitle: "Régulation Piézoélectrique de Haute Précision",
    badge: "Haute Précision · 32'768 Hz",
    tagColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    icon: "⚡",
    norm: "Norme NIHS 95-10",
    desc: "Du monocristal taillé en diapason au diviseur binaire 15 étages (2¹⁵) et au moteur pas-à-pas Lavet. Découvrez comment la physique piézoélectrique a redéfini le standard mondial de la mesure du temps et donné naissance aux calibres suisses thermocompensés de prestige.",
    href: "/theorie/technologies/mouvements-quartz",
    stats: [
      { label: "Fréquence", value: "32'768 Hz" },
      { label: "Tolérance Standard", value: "±15 s/mois" },
      { label: "Calibre HAQ (Seiko 9F)", value: "±10 s/an" }
    ],
    highlights: [
      "Effet piézoélectrique direct et inverse",
      "Moteur pas-à-pas bipolaire Lavet à rotor aimanté",
      "Thermocompensation numérique double quartz (TCXO)",
      "Histoire de la crise horlogère suisse et renouveau"
    ],
    cardGradient: "from-amber-500/10 via-slate-900 to-slate-950 border-amber-500/30 hover:border-amber-500"
  },
  {
    id: "materiaux",
    title: "Matériaux Révolutionnaires & Silicium",
    subtitle: "Métallurgie de Pointe & Micro-Gravure Plasma DRIE",
    badge: "Physico-Chimie · 15'000+ Gauss",
    tagColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    icon: "💎",
    norm: "DRIE & ISO 764",
    desc: "L'avènement du Silicium monocristallin (Si14), des céramiques d'oxyde de zirconium (ZrO₂), du Titane Grade 5 et des composites carbone TPT®. Une rupture technologique majeure qui élimine les frottements, repousse le magnétisme et rend les composants inaltérables.",
    href: "/theorie/technologies/materiaux-innovants",
    stats: [
      { label: "Dureté Céramique", value: "1'500 HV" },
      { label: "Résistance Magnétique", value: "15'000+ Gauss" },
      { label: "Densité Silicium", value: "2.33 g/cm³" }
    ],
    highlights: [
      "Gravure plasma DRIE (Deep Reactive-Ion Etching)",
      "Spiraux amagnétiques : Nivachron, Parachrom & Silinvar",
      "Élimination totale de la lubrification des levées",
      "Magic Gold : or 18 carats inrayable infiltré B₄C"
    ],
    cardGradient: "from-emerald-500/10 via-slate-900 to-slate-950 border-emerald-500/30 hover:border-emerald-500"
  },
  {
    id: "connectees",
    title: "Montres Connectées & Hybridation",
    subtitle: "Microélectronique Embarquée & Finitions Suisses",
    badge: "Systèmes Électroniques · BLE & MEMS",
    tagColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    icon: "📡",
    norm: "CSEM & SwALPS",
    desc: "La convergence entre la Haute Horlogerie suisse et l'Internet des Objets (IoT). Capteurs photopléthysmographiques (PPG), électrocardiogrammes (ECG), puces sécurisées et systèmes d'exploitation autonomes ultra-low power développés au cœur de la Suisse.",
    href: "/theorie/technologies/montres-connectees",
    stats: [
      { label: "Autonomie SwALPS", value: "Solaire Infinie" },
      { label: "Capteurs Biomédicaux", value: "6 Canaux" },
      { label: "Fréquence Échantillonnage", value: "200 Hz" }
    ],
    highlights: [
      "Capteurs optiques PPG et électrodes ECG médicales",
      "Centrale inertielle MEMS 6 axes pour analyse du geste",
      "TAG Heuer Connected E4 & Hublot Big Bang e",
      "Système d'exploitation suisse souverain SwALPS (Tissot)"
    ],
    cardGradient: "from-cyan-500/10 via-slate-900 to-slate-950 border-cyan-500/30 hover:border-cyan-500"
  }
];

// Données du simulateur d'oscillateurs
const OSCILLATORS = [
  {
    id: "mecanique",
    name: "Balancier-Spiral Classique",
    frequency: 2.5,
    unit: "Hz (18'000 A/h)",
    period: "400 ms",
    precision: "± 6 à 15 s / jour",
    energy: "Ressort moteur mécanique (Nivaflex)",
    description: "L'organe régulateur classique inventé par Huygens en 1675. Mouvement harmonique oscillatoire entretenu par l'ancre suisse. Forte sensibilité aux chocs, aux positions et au magnétisme.",
    color: "#D4AF37",
    colorClass: "text-amber-500",
    advantages: ["Pérennité séculaire (100+ ans)", "Réparable à la main", "Noblesse mécanique pure"],
    limits: ["Sensible aux chocs et champs magnétiques", "Nécessite lubrification régulière"]
  },
  {
    id: "haute_frequence",
    name: "Balancier Haute Fréquence (El Primero / Silicium)",
    frequency: 5.0,
    unit: "Hz (36'000 A/h)",
    period: "200 ms",
    precision: "± 2 à 4 s / jour",
    energy: "Ressort mécanique haute réserve",
    description: "Oscillateur battant à 10 alternances par seconde. La fréquence élevée réduit considérablement les perturbations gravitationnelles et permet la mesure directe du 1/10e de seconde.",
    color: "#10B981",
    colorClass: "text-emerald-500",
    advantages: ["Mesure directe au 1/10e de seconde", "Excellente reprise après choc", "Stabilité de marche"],
    limits: ["Usure accrue des huiles d'échappement", "Consommation importante de couple"]
  },
  {
    id: "diapason_accutron",
    name: "Diapason Électronique (Bulova Accutron)",
    frequency: 360,
    unit: "Hz (Bourdonnement acoustique)",
    period: "2.77 ms",
    precision: "± 2 s / jour (1 min/mois)",
    energy: "Pile au mercure / oxyde d'argent 1.35V",
    description: "Créé par l'ingénieur suisse Max Hetzel en 1960. Un diapason métallique vibré par électroaimants entraîne une roue à rochet miniature de 300 dents par deux cliquets en rubis.",
    color: "#6366F1",
    colorClass: "text-indigo-500",
    advantages: ["Glissement fluide de l'aiguille des secondes", "Pas d'échappement traditionnel", "Précision révolutionnaire en 1960"],
    limits: ["Consommation électrique élevée", "Roue d'indexation micrométrique très fragile"]
  },
  {
    id: "quartz_32k",
    name: "Cristal de Quartz Monocristallin",
    frequency: 32768,
    unit: "Hz (32.768 kHz)",
    period: "30.5 µs",
    precision: "± 0.5 s / jour (±15 s/mois)",
    energy: "Pile oxyde d'argent 1.55V",
    description: "Le diapason de quartz monocristallin taillé selon l'axe optique. Excité électriquement par résonance piézoélectrique, sa fréquence 2¹⁵ est divisée par 15 bascules binaires pour générer 1 impulsion / seconde.",
    color: "#06B6D4",
    colorClass: "text-cyan-500",
    advantages: ["Précision redoutable au quotidien", "Absence totale de réglage d'isochronisme", "Coût industriel maîtrisé"],
    limits: ["Obsolescence des circuits intégrés", "Dépendance énergétique à la pile"]
  }
];

export default function TechnologiesPage() {
  const [selectedOscillator, setSelectedOscillator] = useState(OSCILLATORS[0]);
  const [quizAnswer, setQuizAnswer] = useState<{ [key: number]: number | null }>({});
  const [showFeedback, setShowFeedback] = useState<{ [key: number]: boolean }>({});
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation de l'onde sinusoïdale sur le Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Grille de fond type oscilloscope
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Ligne centrale
      ctx.strokeStyle = "rgba(100, 116, 139, 0.35)";
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Dessin de l'onde
      ctx.strokeStyle = selectedOscillator.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      // Paramètres visuels adaptés à la fréquence sélectionnée
      let visualFreq = 0.02;
      let amplitude = 40;
      let speed = 0.05;

      if (selectedOscillator.id === "mecanique") {
        visualFreq = 0.015;
        amplitude = 42;
        speed = 0.03;
      } else if (selectedOscillator.id === "haute_frequence") {
        visualFreq = 0.035;
        amplitude = 36;
        speed = 0.06;
      } else if (selectedOscillator.id === "diapason_accutron") {
        visualFreq = 0.08;
        amplitude = 28;
        speed = 0.12;
      } else if (selectedOscillator.id === "quartz_32k") {
        visualFreq = 0.18;
        amplitude = 22;
        speed = 0.22;
      }

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * visualFreq + offset) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Halo lumineux sous l'onde
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, centerY, 0, height);
      gradient.addColorStop(0, `${selectedOscillator.color}25`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fill();

      offset += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedOscillator]);

  const handleQuizChoice = (qIndex: number, optionIndex: number) => {
    setQuizAnswer((prev) => ({ ...prev, [qIndex]: optionIndex }));
    setShowFeedback((prev) => ({ ...prev, [qIndex]: true }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* ESPACE DE DÉGAGEMENT HAUT RIGOREUX (ANTI-RECOUVREMENT NAVBAR) */}
      <div className="pt-8 sm:pt-10 md:pt-12" />

      {/* Halo d'ambiance en arrière-plan */}
      <div
        className="fixed inset-0 pointer-events-none z-0 hidden dark:block opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 650px 380px at 50% -10%, rgba(6, 182, 212, 0.12), transparent 70%),
            radial-gradient(ellipse 450px 450px at 10% 40%, rgba(212, 175, 55, 0.08), transparent 70%),
            radial-gradient(ellipse 500px 500px at 90% 75%, rgba(16, 185, 129, 0.08), transparent 70%)
          `
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16 sm:space-y-20">

        {/* --- NAVIGATION BREADCRUMB --- */}
        <nav className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              HorloLearn
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/theorie" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              Théorie & Académie
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              Technologies Horlogères Modernes
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Référentiel CFC & Micro-Ingénierie
            </span>
          </div>
        </nav>

        {/* --- HERO SECTION MAJESTUEUSE --- */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B1528] to-slate-950 p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-cyan-500/30">
          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm">
              <Zap className="w-4 h-4 text-cyan-400 animate-bounce" />
              L&apos;Avant-Garde de la Haute Précision Horlogère
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-serif tracking-tight leading-tight text-white">
              Technologies Modernes & <br />
              <span className="bg-gradient-to-r from-cyan-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent">
                Micro-Ingénierie de Pointe
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
              De la résonance piézoélectrique du quartz aux procédés plasma DRIE au silicium monocristallin et aux montres connectées suisses de prestige. Découvrez comment la science moderne magnifie l&apos;art séculaire de la mesure du temps.
            </p>

            {/* Badges de Clés Techniques */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Fréquence 32&apos;768 Hz
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Amagnétisme Total 15&apos;000 Gauss
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Dureté Céramique 1&apos;500 HV
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Architecture MEMS & BLE
              </span>
            </div>
          </div>

          {/* Décoration Géométrique Arrière-plan */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        </header>

        {/* --- LES 3 GRANDS PORTAILS TECHNOLOGIQUES IMMERSIFS --- */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                🚀 Piliers Académiques de Spécialisation
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Les 3 Traités Technologiques d&apos;Établi
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Cours approfondis, schémas de principe & quiz d&apos;évaluation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TECH_MODULES.map((tech) => (
              <div
                key={tech.id}
                className="group relative rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-400/60 shadow-sm dark:shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden p-6 sm:p-8"
              >
                <div className="space-y-6">
                  {/* Header Carte */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-2xl shadow-inner">
                      {tech.icon}
                    </div>
                    <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${tech.tagColor}`}>
                      {tech.badge}
                    </span>
                  </div>

                  {/* Titre & Sous-titre */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {tech.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold">
                      {tech.subtitle}
                    </div>
                  </div>

                  {/* Description Technique */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                    {tech.desc}
                  </p>

                  {/* Chiffres Clés */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 font-mono text-center">
                    {tech.stats.map((st, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-tighter truncate">
                          {st.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                          {st.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Points du Programme */}
                  <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {tech.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-500 font-bold shrink-0 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bouton d'Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={tech.href}
                    className="w-full inline-flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900 dark:bg-cyan-500/10 hover:bg-cyan-600 dark:hover:bg-cyan-500/20 text-white dark:text-cyan-300 font-mono text-xs font-bold border border-slate-800 dark:border-cyan-500/30 transition-all group-hover:shadow-lg"
                  >
                    <span>Explorer le traité complet</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- LABORATOIRE INTERACTIF : BANC D'ESSAI DES OSCILLATEURS --- */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Laboratoire Cinématique & Fréquentiel
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">
                Banc d&apos;Essai Interactif des Régulateurs Horlogers
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl font-light">
                Commutez en temps réel entre les 4 grands régulateurs de l&apos;histoire horlogère : visualisez leur onde harmonique, leur cadence d&apos;oscillation et leurs équations physiques.
              </p>
            </div>

            {/* Sélecteur de type d'oscillateur */}
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {OSCILLATORS.map((osc) => (
                <button
                  key={osc.id}
                  onClick={() => setSelectedOscillator(osc)}
                  className={`px-4 py-2.5 rounded-xl border transition-all text-xs font-bold ${
                    selectedOscillator.id === osc.id
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20"
                      : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
                  }`}
                >
                  {osc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Écran Oscilloscope & Panneau d'Analyse */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Oscilloscope Canvas */}
            <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  Signal Sinusoïdal d&apos;Oscillation en Temps Réel
                </span>
                <span>Base de temps : AUTO</span>
              </div>

              <div className="relative w-full h-56 sm:h-64 flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  width={680}
                  height={256}
                  className="w-full h-full block rounded-xl bg-slate-950"
                />
              </div>

              <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Fréquence : <strong className="text-white">{selectedOscillator.frequency} {selectedOscillator.unit}</strong></span>
                <span>Période (T) : <strong className="text-white">{selectedOscillator.period}</strong></span>
              </div>
            </div>

            {/* Panneau d'Analyse Technique */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  Organe Sélectionné
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                  {selectedOscillator.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                  {selectedOscillator.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400">Tolérance de Marche</div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedOscillator.precision}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400">Source d&apos;Énergie</div>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5 truncate">
                    {selectedOscillator.energy}
                  </div>
                </div>
              </div>

              {/* Atouts & Limites */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  <div className="font-bold font-mono mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Avantages Déterminants
                  </div>
                  <ul className="space-y-0.5 pl-4 list-disc text-[11px]">
                    {selectedOscillator.advantages.map((adv, i) => (
                      <li key={i}>{adv}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
                  <div className="font-bold font-mono mb-1 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" /> Contraintes & Limites
                  </div>
                  <ul className="space-y-0.5 pl-4 list-disc text-[11px]">
                    {selectedOscillator.limits.map((lim, i) => (
                      <li key={i}>{lim}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FRISE HISTORIQUE DE L'INNOVATION HORLOGÈRE --- */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              ⏳ Épopée Scientifique
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white mt-1">
              Les 6 Grands Tournants Technologiques (1960 - 2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400">1960</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600">Bulova Accutron</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Le Diapason Électronique 360 Hz</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Première montre électronique à résonateur acoustique sans balancier-spiral. Précision garantie d&apos;une minute par mois, adoptée par la NASA pour les missions spatiales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">1967</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">CEH Neuchâtel</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Le Prototype Suisse Beta 21</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Le Centre Électronique Horloger suisse crée le premier calibre à quartz miniature de poignet. Présenté à la Foire de Bâle en 1970 par Rolex, Omega et Patek Philippe.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">1969</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">Seiko Astron</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Commercialisation de Masse du Quartz</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Lancement de l&apos;Astron 35SQ à Tokyo le jour de Noël 1969. Début du séisme économique connu sous le nom de « Crise du Quartz » pour les manufactures traditionnelles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-purple-600 dark:text-purple-400">1983</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600">Swatch Group</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">La Révolution Swatch & Nicolas Hayek</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Réduction drastique à seulement 51 composants soudés par ultrasons dans un boîtier plastique. La Suisse reprend la première place mondiale des volumes d&apos;exportation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-blue-600 dark:text-blue-400">2001</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600">Silicium DRIE</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">L&apos;Échappement en Silicium Monocristallin</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Ulysse Nardin (Freak) puis Patek Philippe introduisent les premières roues d&apos;ancre et spiraux gravés par plasma gazeux DRIE : amagnétisme total et zéro frottement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400">2020+</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600">Swiss Connected</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Hybridation de Luxe & Systèmes SwALPS</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-light leading-relaxed">
                Le CSEM et Swatch Group développent l&apos;OS suisse basse consommation SwALPS. TAG Heuer et Hublot créent des smartwatches aux boîtiers titane et finitions de Haute Horlogerie.
              </p>
            </div>
          </div>
        </section>

        {/* --- COMPARATIF TECHNIQUE DES TECHNOLOGIES --- */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                ⚖️ Métrologie & Évaluation
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Matrice Comparative des Architectures Horlogères
              </h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 font-mono text-[11px] uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-950/50">
                  <th className="p-3">Critère Métrologique</th>
                  <th className="p-3 text-amber-600 dark:text-amber-400">Mécanique Classique</th>
                  <th className="p-3 text-cyan-600 dark:text-cyan-400">Quartz Traditionnel</th>
                  <th className="p-3 text-emerald-600 dark:text-emerald-400">Silicium DRIE (Si)</th>
                  <th className="p-3 text-purple-600 dark:text-purple-400">Montre Connectée</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Précision Moyenne</td>
                  <td className="p-3">-4/+6 s/jour (COSC)</td>
                  <td className="p-3 text-cyan-600 dark:text-cyan-400 font-bold">±15 s/mois</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">0/+2 s/jour (Spirate)</td>
                  <td className="p-3 text-purple-600 dark:text-purple-400 font-bold">Synchro Atomique (NTP)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Sensibilité Magnétique</td>
                  <td className="p-3 text-rose-500">Sensible dès 60 Gauss</td>
                  <td className="p-3">Perturbation moteur Lavet</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Totalement Nulle (&gt;15&apos;000 G)</td>
                  <td className="p-3">Blindage intégré</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Durabilité / Pérennité</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">100+ ans (Restaurable)</td>
                  <td className="p-3">20 à 40 ans (selon circuit)</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Inaltérable à la fatigue</td>
                  <td className="p-3 text-rose-500">3 à 6 ans (Batterie & OS)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Autonomie Énergétique</td>
                  <td className="p-3">40 à 120h (Remontage auto)</td>
                  <td className="p-3">2 à 5 ans (Pile bouton)</td>
                  <td className="p-3">Liée au barillet mécanique</td>
                  <td className="p-3 text-rose-500">1 à 14 jours (Recharge)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">Besoin en Lubrification</td>
                  <td className="p-3">Indispensable (Moebius)</td>
                  <td className="p-3">Faible (Rouage moteur)</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">Nul sur les levées de l&apos;ancre</td>
                  <td className="p-3">Aucun</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- DÉFI / QUIZ INTERACTIF EXPRESS --- */}
        <section className="rounded-3xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                🎯 Auto-Évaluation Express
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                Quiz Technologies & Innovation
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              3 Questions
            </span>
          </div>

          <div className="space-y-6">
            {/* Question 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400">Question 01</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Pourquoi la fréquence de 32&apos;768 Hz est-elle la norme absolue des mouvements à quartz ?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                {[
                  "Parce que c'est la température d'ébullition du silicium.",
                  "Parce que c'est une puissance exacte de deux (2¹⁵), permettant d'obtenir exactement 1 Hz avec 15 bascules binaires.",
                  "Parce que c'est la vitesse de rotation maximale du moteur Lavet.",
                  "Parce que la législation suisse interdit les fréquences inférieures."
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizChoice(1, idx)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      quizAnswer[1] === idx
                        ? idx === 1
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                          : "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback[1] && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  quizAnswer[1] === 1
                    ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30"
                }`}>
                  {quizAnswer[1] === 1
                    ? "✓ Exactement ! 2¹⁵ = 32'768. Chaque étage de bascule divise la fréquence par deux, aboutissant à une impulsion précise par seconde pour le moteur Lavet."
                    : "✗ Incorrect. 32'768 correspond à 2¹⁵, ce qui permet à 15 diviseurs binaires de ramener la fréquence à 1 Hz avec une consommation électrique minime."}
                </div>
              )}
            </div>

            {/* Question 2 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400">Question 02</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Quel procédé de micro-fabrication permet de sculpter des composants en silicium avec une précision nanométrique ?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                {[
                  "Le tournage traditionnel sur tour Schaublin 70.",
                  "La coulée en moule de sable réfractaire.",
                  "Le procédé DRIE (Deep Reactive-Ion Etching) par plasma gazeux.",
                  "L'emboutissage à la presse mécanique 10 tonnes."
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizChoice(2, idx)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      quizAnswer[2] === idx
                        ? idx === 2
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                          : "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback[2] && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  quizAnswer[2] === 2
                    ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30"
                }`}>
                  {quizAnswer[2] === 2
                    ? "✓ Bravo ! La gravure ionique réactive profonde (DRIE) alterne phases de gravure au fluor et passivation au polymère pour découper des parois parfaitement verticales."
                    : "✗ Faux. Le silicium est un matériau monocristallin fragile qui ne peut être ni usiné ni coulé : il est obligatoirement gravé au plasma DRIE."}
                </div>
              )}
            </div>

            {/* Question 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400">Question 03</div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Comment s&apos;appelle le système d&apos;exploitation ultra-basse consommation suisse conçu par le CSEM pour Tissot ?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                {[
                  "Google Wear OS",
                  "SwALPS (Swiss Autonomous Low Power System)",
                  "Apple watchOS",
                  "Linux Ubuntu Horlogerie"
                ].map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizChoice(3, idx)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      quizAnswer[3] === idx
                        ? idx === 1
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                          : "bg-rose-500/20 border-rose-500 text-rose-800 dark:text-rose-300 font-bold"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-500"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback[3] && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  quizAnswer[3] === 1
                    ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30"
                    : "bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/30"
                }`}>
                  {quizAnswer[3] === 1
                    ? "✓ Précisément ! SwALPS a été développé à Neuchâtel par le CSEM et le Swatch Group pour assurer une autonomie solaire quasi-illimitée à la Tissot T-Touch."
                    : "✗ Non. Il s'agit de SwALPS (Swiss Autonomous Low Power System), un OS ultra-sécurisé et économe développé à Neuchâtel."}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- FOOTER DE NAVIGATION HAUTE HORLOGERIE --- */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/theorie"
            className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l&apos;Académie Théorique Générale</span>
          </Link>

          <Link
            href="/pratique"
            className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors group"
          >
            <span>Passer à l&apos;Atelier Pratique d&apos;Établi</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

      </main>
    </div>
  );
}
