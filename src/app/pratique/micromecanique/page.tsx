'use client';

import React, { useState, useEffect } from 'react';
import TappingBenchSimulator from './TappingBenchSimulator';
import PolishingBenchSimulator from './PolishingBenchSimulator';
import { PrepMachineVisual, BarStickoutVisual, OriginVisual, FacingPassesVisual, LatheAnatomyVisual } from './MicromecaniqueVisuals';
import Link from 'next/link';
import {
  Compass,
  Wrench,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Award,
  RotateCcw,
  Sliders,
  Layers,
  Sparkles,
  Zap,
  Activity,
  Check,
  Play,
  Pause
} from 'lucide-react';

export default function MicromecaniqueModulePage() {
  // --- 1. Quick Lathe Simulator State ---
  const [latheRunning, setLatheRunning] = useState(false);
  const [latheRpm, setLatheRpm] = useState(0);
  const [targetRpm, setTargetRpm] = useState(800);
  const [direction, setDirection] = useState<'ccw' | 'cw'>('ccw');

  useEffect(() => {
    const timer = setInterval(() => {
      if (latheRunning) {
        setLatheRpm((prev) => {
          if (prev < targetRpm) return Math.min(targetRpm, prev + 60);
          if (prev > targetRpm) return Math.max(targetRpm, prev - 60);
          return prev;
        });
      } else {
        setLatheRpm((prev) => Math.max(0, prev - 80));
      }
    }, 40);
    return () => clearInterval(timer);
  }, [latheRunning, targetRpm]);

  // --- 2. Cutting Speed Calculator State ---
  const [selectedMaterial, setSelectedMaterial] = useState<'k720' | 'laiton' | 'inox' | 'polycarbonate' | 'aluminium'>('laiton');
  const [toolMaterial, setToolMaterial] = useState<'hss' | 'carbide'>('hss');
  const [diameter, setDiameter] = useState<number>(4.5);

  const materialsData = {
    k720: { name: "Böhler K720 (90MnCrV8)", vc_hss: 25, vc_carbide: 70, lub: "Huile minérale de coupe" },
    laiton: { name: "Laiton MS58 (CuZn39Pb3)", vc_hss: 90, vc_carbide: 220, lub: "À sec ou goutte d'huile fine d'horloger" },
    inox: { name: "Inox 316L (1.4435 horloger)", vc_hss: 18, vc_carbide: 55, lub: "Huile de taraudage/usinage inox" },
    polycarbonate: { name: "Polycarbonate / POM", vc_hss: 100, vc_carbide: 250, lub: "À sec ou eau savonneuse (Pas d'alcool)" },
    aluminium: { name: "Aluminium Dural", vc_hss: 130, vc_carbide: 350, lub: "Pétrole ou alcool à brûler" }
  };

  const currentMat = materialsData[selectedMaterial];
  const activeVc = toolMaterial === 'hss' ? currentMat.vc_hss : currentMat.vc_carbide;
  const calculatedRpm = Math.round((1000 * activeVc) / (Math.PI * diameter));

  // --- 3. 5 Workshop Projects State ---
  const [activeProject, setActiveProject] = useState<number>(1);

  const projects = [
    {
      num: 1,
      code: "HL-OUT-98110-A",
      title: "Pointeau d'Horloger (Centreur)",
      material: "Acier au Carbone Böhler K720 Ø 4.5 mm x 80 mm",
      treatment: "Trempe à l'huile + Revenu Bleu à 290°C (~56 HRC)",
      desc: "Outil fondamental servant à marquer le centre des futurs perçages sur platines sans déraper. Comprend le moletage croisé, le méplat de frappe des initiales (4x5 mm) et la pointe conique à 60° (tolérance pointe Ø 2.3 ± 100 μm).",
      renderSvg: () => (
        <svg viewBox="0 0 750 200" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-300 dark:border-slate-800 font-mono">
          <line x1="20" y1="100" x2="730" y2="100" stroke="#F59E0B" strokeDasharray="10,3,2,3" strokeWidth="1.5"/>
          <rect x="180" y="70" width="260" height="60" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>
          <pattern id="p-knurl-1" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 8 L8 0 M0 0 L8 8" stroke="#64748B" strokeWidth="1.2"/>
          </pattern>
          <rect x="180" y="70" width="260" height="60" fill="url(#p-knurl-1)"/>
          
          <rect x="165" y="76" width="15" height="48" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5"/>
          <rect x="440" y="76" width="15" height="48" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5"/>

          <rect x="65" y="70" width="100" height="60" fill="#334155" stroke="#CBD5E1" strokeWidth="1.5"/>
          <rect x="100" y="70" width="35" height="25" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5"/>
          <text x="117" y="87" fontSize="9" fontWeight="bold" fill="#FCD34D" textAnchor="middle">N°</text>

          <path d="M 65 70 A 30 30 0 0 0 65 130 Z" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>

          <rect x="455" y="70" width="45" height="60" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>
          <polygon points="500,70 630,90 630,110 500,130" fill="#2563EB" stroke="#60A5FA" strokeWidth="2"/>
          <polygon points="630,90 655,100 630,110" fill="#38BDF8" stroke="#60A5FA" strokeWidth="1.5"/>

          <text x="310" y="55" fontSize="11" fontWeight="bold" fill="#FCD34D" textAnchor="middle">MOLETAGE CROISÉ (L = 40 mm)</text>
          <text x="590" y="55" fontSize="11" fontWeight="bold" fill="#60A5FA" textAnchor="middle">POINTE 60° (TREMPÉ REVENU 290°C)</text>
          <text x="350" y="165" fontSize="11" fill="#94A3B8" textAnchor="middle">LONGUEUR TOTALE = 80 ± 300 μm · CORPS Ø 4.5 mm</text>
        </svg>
      ),
      steps: [
        "1. Montage barre K720 Ø 4.5 mm dans pince W-12 de 4.5.",
        "2. Dressage de face et exécution de la calotte sphérique arrière R4.5.",
        "3. Sortie de barre à 45 mm, moletage croisé à 300 tr/min sous huile abondante.",
        "4. Exécution des deux gorges de dégagement de 1.0 mm.",
        "5. Chariotage du cône de pointe à 60° (orientation chariot supérieur à 30°).",
        "6. Trempe à 800°C dans l'huile et revenu bleu à 290°C."
      ]
    },
    {
      num: 2,
      code: "HL-OUT-98100-A",
      title: "Pointe à Tracer d'Atelier",
      material: "Acier au Carbone Böhler K720 Ø 3.0 mm x 130 mm",
      treatment: "Trempe pointe + Revenu Bleu à 290°C",
      desc: "Outil de traçage de haute précision comportant un cône effilé long de 25 mm à angle aigu de 28°, un moletage de préhension de 76 mm, et deux gorges de dégagement de 1.0 mm.",
      renderSvg: () => (
        <svg viewBox="0 0 750 160" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-300 dark:border-slate-800 font-mono">
          <line x1="20" y1="80" x2="730" y2="80" stroke="#F59E0B" strokeDasharray="10,3,2,3" strokeWidth="1.5"/>
          <rect x="70" y="65" width="460" height="30" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>
          <pattern id="p-knurl-2" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 8 L8 0 M0 0 L8 8" stroke="#64748B" strokeWidth="1.2"/>
          </pattern>
          <rect x="180" y="65" width="280" height="30" fill="url(#p-knurl-2)"/>
          
          <polygon points="530,65 670,77 670,83 530,95" fill="#2563EB" stroke="#60A5FA" strokeWidth="2"/>
          <polygon points="670,77 685,80 670,83" fill="#38BDF8" stroke="#60A5FA" strokeWidth="1.5"/>
          <path d="M 70 65 A 15 15 0 0 0 70 95 Z" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>

          <text x="320" y="48" fontSize="11" fontWeight="bold" fill="#FCD34D" textAnchor="middle">MOLETAGE (L = 76 mm)</text>
          <text x="610" y="48" fontSize="11" fontWeight="bold" fill="#60A5FA" textAnchor="middle">CÔNE EFFILÉ 28° (L = 25 mm)</text>
          <text x="350" y="130" fontSize="11" fill="#94A3B8" textAnchor="middle">LONGUEUR TOTALE = 130 ± 300 μm · BARRE Ø 3.0 mm</text>
        </svg>
      ),
      steps: [
        "1. Serrage barre Ø 3.0 mm dans pince W-12 de 3.0.",
        "2. Chariotage du cône effilé long (inclinaison chariot supérieur à 14°).",
        "3. Moletage fin et réalisation des deux gorges de dégagement.",
        "4. Trempe à l'huile et revenu bleu à 290°C."
      ]
    },
    {
      num: 3,
      code: "HL-OUT-98200",
      title: "Pousse-Aiguille Horloger (Alésé)",
      material: "Polycarbonate technique Ø 5.0 mm x 100 mm",
      treatment: "Polymère auto-lubrifiant (aucun traitement thermique)",
      desc: "Outil d'emboîtage doux permettant de chasser les aiguilles de montre sans rayer le vernis ni la luminescence.",
      renderSvg: () => (
        <svg viewBox="0 0 750 160" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-300 dark:border-slate-800 font-mono">
          <line x1="20" y1="80" x2="730" y2="80" stroke="#F59E0B" strokeDasharray="10,3,2,3" strokeWidth="1.5"/>
          <rect x="80" y="50" width="460" height="60" rx="3" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="2"/>
          <polygon points="540,50 635,62 635,98 540,110" fill="#0284C7" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="2"/>
          <rect x="635,62" width="25" height="36" fill="#0284C7" fillOpacity="0.45" stroke="#38BDF8" strokeWidth="2"/>
          <rect x="605" y="70" width="55" height="20" fill="#080C15" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4,2"/>
          
          <text x="320" y="38" fontSize="11" fontWeight="bold" fill="#38BDF8" textAnchor="middle">POLYCARBONATE TECHNIQUE Ø 5.0 mm</text>
          <text x="635" y="130" fontSize="11" fontWeight="bold" fill="#F59E0B" textAnchor="middle">ALÉSAGE Ø 2.0 mm (PROF. 4.0 mm)</text>
        </svg>
      ),
      steps: [
        "1. Montage barre polycarbonate dans pince W-12 de 5.0.",
        "2. Dressage de face et centrage au foret à centrer.",
        "3. Perçage axial borgne Ø 2.0 mm (ou Ø 1.2 mm) prof. 4.0 mm au vernier de contre-poupée.",
        "4. Chariotage du col conique extérieur au burin couteau vivement affûté."
      ]
    },
    {
      num: 4,
      code: "HL-OUT-98210",
      title: "Cheville Plastique d'Établi à Fente",
      material: "Polycarbonate transparent Ø 5.0 mm x 100 mm",
      treatment: "Polissage d'établi soigné",
      desc: "Outil multifonction servant à vérifier les ébats de rouage et nettoyer les pignons sans marquer les ponts anglés.",
      renderSvg: () => (
        <svg viewBox="0 0 750 150" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-300 dark:border-slate-800 font-mono">
          <line x1="20" y1="75" x2="730" y2="75" stroke="#F59E0B" strokeDasharray="10,3,2,3" strokeWidth="1.5"/>
          <rect x="80" y="50" width="470" height="50" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="2"/>
          <polygon points="550,50 655,70 655,80 550,100" fill="#0284C7" fillOpacity="0.35" stroke="#38BDF8" strokeWidth="2"/>
          <line x1="620" y1="75" x2="655" y2="75" stroke="#EF4444" strokeWidth="3"/>
          <text x="310" y="38" fontSize="11" fontWeight="bold" fill="#38BDF8" textAnchor="middle">CORPS Ø 5.0 mm</text>
          <text x="635" y="115" fontSize="11" fontWeight="bold" fill="#EF4444" textAnchor="middle">FENTE SCIÉE 0.5 mm</text>
        </svg>
      ),
      steps: [
        "1. Tournage du cône d'extrémité à angle vif.",
        "2. Dressage de face et réalisation du méplat.",
        "3. Fente de 0.5 mm sur 3 mm de profondeur à la scie d'horloger.",
        "4. Ébavurage complet."
      ]
    },
    {
      num: 5,
      code: "HL-OUT-98050-A",
      title: "Enclume - Bloc 6497 (ETA / Unitas)",
      material: "Laiton de décolletage CuZn39Pb3 (MS 58) Ø 7.9 mm x 11.5 mm",
      treatment: "Finition Poli Glacé N5 sur faces d'appui",
      desc: "S'insère dans le bloc d'emboîtage pour soutenir la platine lors du chassage des fournitures sans déformer les ponts.",
      renderSvg: () => (
        <svg viewBox="0 0 750 180" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-300 dark:border-slate-800 font-mono">
          <line x1="20" y1="90" x2="730" y2="90" stroke="#F59E0B" strokeDasharray="10,3,2,3" strokeWidth="1.5"/>
          <rect x="200" y="65" width="120" height="50" fill="#CA8A04" stroke="#713F12" strokeWidth="2"/>
          <rect x="320" y="35" width="160" height="110" fill="#EAB308" stroke="#713F12" strokeWidth="2.5"/>
          <polygon points="480,65 420,65 390,90 420,115 480,115" fill="#080C15" stroke="#EF4444" strokeWidth="2"/>
          
          <text x="260" y="52" fontSize="11" fontWeight="bold" fill="#FEF08A" textAnchor="middle">PIED Ø 4.0 mm (0 / -0.02)</text>
          <text x="400" y="24" fontSize="11" fontWeight="bold" fill="#FEF08A" textAnchor="middle">CORPS Ø 7.9 mm (L = 3.0 mm)</text>
          <text x="560" y="94" fontSize="11" fontWeight="bold" fill="#EF4444" textAnchor="start">CUVETTE MÈCHE Ø 4.2 mm (120°)</text>
          <text x="350" y="165" fontSize="11" fill="#94A3B8" textAnchor="middle">LONGUEUR TOTALE = 11.5 mm · LAITON MS58 · FINITION N5</text>
        </svg>
      ),
      steps: [
        "1. Serrage barre laiton Ø 8.0 mm dans pince W-12 de 8.0.",
        "2. Dressage et chariotage extérieur au diamètre précis de 7.90 mm (±0.01 mm).",
        "3. Perçage cuvette intérieure Ø 4.2 mm profondeur 3.5 mm (fond mèche 120°).",
        "4. Reprise en pince de 7.9 mm pour charioter le pied Ø 4.0 mm sur L=5.0 mm d'équerre.",
        "5. Finition miroir N5 des faces de référence."
      ]
    }
  ];

  // --- 4. Compact Stepper Quiz State ---
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showResultModal, setShowResultModal] = useState(false);

  const quizQuestions = [
    {
      q: "Quelle est la hauteur de pointes rigoureuse du tour Schaublin 70 au-dessus de la glissière du banc ?",
      options: ["50.00 mm", "70.00 mm", "102.00 mm", "125.00 mm"],
      answer: 1,
      explanation: "La hauteur de pointes est exactement de 70.00 mm (d'où l'appellation Schaublin 70). C'est la référence de tous les accessoires."
    },
    {
      q: "Quel est le passage de barre maximal à travers la broche pour pinces de type W-12 ?",
      options: ["Ø 5.0 mm", "Ø 8.2 mm", "Ø 12.0 mm", "Ø 15.0 mm"],
      answer: 1,
      explanation: "Le corps de pince fait 12 mm de diamètre, mais le passage de barre continu utile est limité à Ø 8.2 mm."
    },
    {
      q: "Quelle relation trigonométrique lie les angles de dépouille (α), taillant (β) et coupe (γ) ?",
      options: ["α + β + γ = 180°", "α + β + γ = 90°", "α · β = γ", "α + β = γ"],
      answer: 1,
      explanation: "Les faces du burin s'inscrivent dans le quart de cercle du plan de référence : la somme vaut rigoureusement 90°."
    },
    {
      q: "Que se passe-t-il si le burin est réglé au-dessus de la hauteur de centre (trop haut) ?",
      options: [
        "Le burin plonge sous la barre et broute",
        "L'angle de dépouille s'annule, le dos du burin talonne contre la pièce sans couper",
        "La vitesse de coupe double automatiquement",
        "La pièce est expulsée"
      ],
      answer: 1,
      explanation: "En position trop haute, l'angle de dépouille effectif devient nul ou négatif : le dos frotte violemment sans pénétration de matière."
    },
    {
      q: "Quel angle de coupe (γ) convient le mieux pour usiner le laiton horloger (CuZn39Pb3) ?",
      options: ["Grand angle positif (+20°)", "Angle neutre ou nul (0° à 2°)", "Angle négatif extrême (-30°)", "Angle variable"],
      answer: 1,
      explanation: "Le laiton a tendance à 'happer' l'outil. Un angle neutre (0° à 2°) assure une coupe stable par grattage sans à-coups."
    },
    {
      q: "Quelle est la valeur de déplacement correspondant à 1 division sur les tambours micrométriques du Schaublin 70 ?",
      options: ["0.1 mm (un dixième)", "0.05 mm (cinq centièmes)", "0.01 mm (un centième)", "0.001 mm (un micron)"],
      answer: 2,
      explanation: "Les tambours micrométriques Schaublin 70 offrent une lecture directe au 0.01 mm (un centième de millimètre) par division."
    },
    {
      q: "Quelle formule donne la fréquence de rotation n (tr/min) en fonction de Vc (m/min) et du diamètre d (mm) ?",
      options: ["n = Vc · d / 1000", "n = (1000 · Vc) / (π · d)", "n = π · d · Vc", "n = 1000 / (Vc · d)"],
      answer: 1,
      explanation: "Formule cinématique fondamentale : n = (1000 · Vc) / (π · d), approximable par n ~ 318 · Vc / d."
    },
    {
      q: "Quelle est la couleur et la température du revenu de détente de la pointe du pointeau en acier Böhler K720 ?",
      options: ["Jaune paille à 220°C", "Brun à 250°C", "Bleu horloger à 290°C", "Gris cendre à 400°C"],
      answer: 2,
      explanation: "Le revenu bleu horloger à 290°C confère le compromis idéal de dureté (~56 HRC) et de ténacité élastique pour résister aux chocs."
    },
    {
      q: "Quel est l'angle de pointe d'extrémité du pointeau d'horloger (Plan HL-OUT-98110) ?",
      options: ["30°", "60° (orientation chariot à 30°)", "90°", "120°"],
      answer: 1,
      explanation: "L'angle au sommet normalisé du pointeau est de 60°. Le chariot supérieur est incliné à 30° par rapport à l'axe de broche."
    },
    {
      q: "Pourquoi utilise-t-on du polycarbonate pour la fabrication du pousse-aiguille horloger ?",
      options: [
        "Parce qu'il résiste à 1'000°C",
        "Pour sa souplesse et pour ne pas rayer les aiguilles polies ni les cadrans précieux",
        "Parce qu'il conduit l'électricité statique",
        "Pour pouvoir le tremper dans l'huile"
      ],
      answer: 1,
      explanation: "Le polycarbonate est un polymère doux mais rigide, garantissant un chassage franc sans aucune rayure sur les aiguilles vernies."
    }
  ];

  const handleAnswer = (oIdx: number) => {
    if (userAnswers[currentQuestionIdx] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [currentQuestionIdx]: oIdx }));
  };

  const score = Object.keys(userAnswers).reduce((acc, qIdxStr) => {
    const qIdx = parseInt(qIdxStr);
    return acc + (userAnswers[qIdx] === quizQuestions[qIdx].answer ? 1 : 0);
  }, 0);

  const curProject = projects.find(p => p.num === activeProject) || projects[0];
  const curQ = quizQuestions[currentQuestionIdx];
  const isCurAnswered = userAnswers[currentQuestionIdx] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080C15] text-slate-800 dark:text-slate-200 antialiased selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200 transition-colors duration-300">
      
      {/* Blueprint Grid Styles */}
      <style jsx global>{`
        .blueprint-bg {
          background-color: #0c1220;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        :global(html:not(.dark)) .blueprint-bg {
          background-color: #f8fafc;
          background-image: 
            linear-gradient(rgba(14, 165, 233, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.12) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @keyframes spinClockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCounterClockwise { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .lathe-spin-cw { animation: spinClockwise 1.2s linear infinite; }
        .lathe-spin-ccw { animation: spinCounterClockwise 1.2s linear infinite; }
      `}</style>

      {/* Top Banner */}
      <div className="bg-white/95 dark:bg-[#0c1322]/90 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link href="/pratique" className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Modules Pratiques</span>
          </Link>
          <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Haute Horlogerie Suisse · Module 2 · Micromécanique & Tournage Schaublin 70
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-white to-slate-50 dark:from-[#10192e] dark:to-[#080C15] p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 mb-4">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Atelier d'Usinage Horloger de Précision
              </span>
              <h1 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                La Pratique Rigoureuse du Tournage <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                  Micromécanique Horlogère
                </span>
              </h1>
              <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Standards d'excellence des écoles d'horlogerie suisses. Maîtrisez le <strong>Tour d'outilleur Schaublin 70</strong>, les <strong>gestes d'établi réels</strong> au centième de millimètre, le traitement thermique de l'acier <strong>Böhler K720</strong>, et l'usinage des 5 pièces maîtresses.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">Hauteur de centre</span>
                  <span className="text-amber-300 font-bold text-sm">70.00 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">Pinces Schaublin</span>
                  <span className="text-cyan-300 font-bold text-sm">Type W-12</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">Précision tambour</span>
                  <span className="text-emerald-300 font-bold text-sm">0.01 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-100/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] uppercase block">Acier d'outillage</span>
                  <span className="text-rose-300 font-bold text-sm">Böhler K720</span>
                </div>
              </div>
            </div>

            {/* Quick Lathe Console Simulator */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Pupitre Schaublin 70 Mi-CF
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${latheRunning ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {latheRunning ? 'BROCHE EN ROTATION' : 'BROCHE ARRÊTÉE'}
                </span>
              </div>

              {/* Digital Tachometer & Chuck Visual */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Fréquence de Broche</span>
                  <span className="text-3xl font-mono font-bold text-emerald-400 tracking-wider">
                    {latheRpm} <span className="text-xs text-slate-500">tr/min</span>
                  </span>
                </div>
                <div className="relative">
                  <svg
                    className={`w-16 h-16 transition-transform duration-300 ${latheRunning ? (direction === 'ccw' ? 'lathe-spin-ccw' : 'lathe-spin-cw') : ''}`}
                    viewBox="0 0 100 100"
                  >
                    <circle cx="50" cy="50" r="44" fill="#1E293B" stroke="#D4AF37" strokeWidth="3" />
                    <circle cx="50" cy="50" r="24" fill="#0F172A" stroke="#94A3B8" strokeWidth="2" />
                    <line x1="50" y1="6" x2="50" y2="26" stroke="#F59E0B" strokeWidth="4" />
                    <line x1="94" y1="50" x2="74" y2="50" stroke="#F59E0B" strokeWidth="4" />
                    <line x1="50" y1="94" x2="50" y2="74" stroke="#F59E0B" strokeWidth="4" />
                    <line x1="6" y1="50" x2="26" y2="50" stroke="#F59E0B" strokeWidth="4" />
                    <circle cx="50" cy="50" r="8" fill="#F59E0B" />
                  </svg>
                </div>
              </div>

              {/* Slider for Target Speed */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400">
                  <span>Consigne Vitesse :</span>
                  <span className="text-amber-400 font-bold">{targetRpm} tr/min</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="50"
                  value={targetRpm}
                  onChange={(e) => setTargetRpm(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Controls Start/Stop & Direction */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLatheRunning(true)}
                  className="py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/30"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  START
                </button>
                <button
                  onClick={() => setLatheRunning(false)}
                  className="py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-rose-900/30"
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  STOP
                </button>
                <button
                  onClick={() => setDirection(d => d === 'ccw' ? 'cw' : 'ccw')}
                  className="py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-amber-300 font-mono text-xs font-bold border border-slate-300 dark:border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {direction === 'ccw' ? 'SENS CCW' : 'SENS CW'}
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 text-center">
                Sens standard d'usinage horloger : <strong>Anti-horaire (CCW)</strong> vers l'opérateur.
              </div>
            </div>
          </div>
        </div>

        {/* Section 01 : Le Tour Schaublin 70 & Photo Réelle d'Atelier */}
        <section id="machine" className="scroll-mt-28 pt-6">
{/* 01. LE TOUR SCHAUBLIN 70 EN ATELIER */}
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-400 font-extrabold text-sm border border-amber-500/30">01</span>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">ÉQUIPEMENT D'ATELIER HAUTE PRÉCISION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Le Tour d'Outilleur Schaublin 70 en Atelier</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Poupée porte-broche W-12, chariot croisé aux centièmes et configuration réelle d'établi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Standard Suisse</span>
        </div>
      </div>

      <LatheAnatomyVisual />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Photo réelle en Base64 */}
        <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-2xl group bg-slate-100 dark:bg-slate-900 aspect-[16/11]">
          <img 
            src="/images/micromecanique/schaublin_tournage_main.jpg" 
            alt="Tour Schaublin 70 en action dans l'atelier d'horlogerie" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <div className="px-3.5 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-sm font-bold text-amber-300 shadow-lg">
              Atelier d'Horlogerie · Tour Schaublin 70
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-100 shadow">
              Pinces W-12 · Éventail en laiton
            </div>
          </div>
        </div>

        {/* 3 Cartes explicatives */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              1. Poupée Porte-Broche pour Pinces W-12
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              La broche du Schaublin 70 est cémentée, trempée et rectifiée. Elle reçoit les pinces W-12 à tirant arrière. Alésage intérieur de 12 mm autorisant un passage de barre utile jusqu'à <strong className="text-slate-900 dark:text-white">Ø 8.2 mm</strong>. Vitesse de démarrage : <strong className="text-slate-900 dark:text-white">800 tr/min</strong> en rotation anti-horaire.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              2. Chariot Croisé &amp; Tambours Micrométriques
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Coulisse longitudinale (course 60 mm) et latérale (course 65 mm). Les tambours divisés offrent une <strong className="text-cyan-300">lecture directe au 0.01 mm</strong> (un centième de millimètre). Le chariot orientable à 360° permet de charioter les cônes de précision (ex: cône 60° du pointeau).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-2">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              3. Contre-Poupée (Hauteur de pointe H = 70.00 mm)
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              Course 45 mm, alésage intérieur cône Schaublin 2°. Reçoit la pointe fixe trempée 60° indispensable pour centrer le burin sous la loupe d'horloger ou le mandrin Albrecht pour les perçages axiaux.
            </p>
          </div>
        </div>
      </div>
    </div>
    </section>

                {/* Section 02 : Schémas & Gestes Normalisés d'Atelier */}
        
    {/* SECTION PROTOCOLE D'USINAGE AU CENTIÈME */}
    <section id="procedure-reglage" className="scroll-mt-28 pt-4">
      {/* ==========================================
         PROCÉDURE D'USINAGE : GUIDE DE RÉGLAGE ET TOURNAGE DE PRÉCISION
         (Conforme au protocole d'établi Schaublin 70 · Étapes 1 à 11)
         ========================================== */}
    <div id="procedure-usinage" className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-slate-900/95 dark:to-slate-950/95 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl space-y-8">
      
      {/* En-tête du protocole */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg shadow-inner">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/30">PROTOCOLE D'ATELIER · SCHAUBLIN 70</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700">Précision au 0.01 mm</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Procédure d'Usinage au Centième</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Guide méthodologique pas-à-pas : réglage machine, prise d'origine et dressage de face</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> 11 Étapes Clés
          </span>
        </div>
      </div>

      {/* Grille des étapes 1 à 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* ÉTAPE 1 : PRÉPARATION */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 transition-all space-y-4 shadow-sm dark:shadow-lg flex flex-col justify-between">
          <PrepMachineVisual />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs border border-amber-500/20 uppercase tracking-wider">Étape 1</span>
              <span className="text-xs text-slate-400 font-mono">Banc &amp; Porte-outil</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Préparation Machine</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                <span><strong>Chariot croisé :</strong> Plaqué fermement contre le banc du tour.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                <span><strong>Orientation :</strong> Burin et porte-burin parallèles au chariot.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                <span><strong>Hauteur :</strong> Calée rigoureusement à <strong>70.00 mm</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></span>
                <span><strong>Coulisse latérale :</strong> Positionnée au <strong>repère 10</strong>.</span>
              </li>
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-amber-700 dark:text-amber-300 flex items-center justify-between">
            <span>Repère : Coulisse à 10</span>
            <span>H = 70.00 mm</span>
          </div>
        </div>

        {/* ÉTAPE 2 & 3 : POSITIONNEMENT */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 shadow-sm dark:shadow-lg flex flex-col justify-between">
          <BarStickoutVisual />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/20 uppercase tracking-wider">Étapes 2 &amp; 3</span>
              <span className="text-xs text-slate-400 font-mono">Pince W-12</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Positionnement Pièce</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                <span><strong>Sortie de barre :</strong> Sortir la pièce brute de <strong>10 mm</strong> de la pince W-12.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                <span><strong>Approche sécurisée :</strong> Avancer le chariot vers la pince.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span className="text-rose-200"><strong>Sécurité :</strong> Le burin ne doit en aucun cas toucher la pièce pendant l'approche.</span>
              </li>
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-cyan-700 dark:text-cyan-300 flex items-center justify-between">
            <span>Sortie : 10.0 mm</span>
            <span>Garde active</span>
          </div>
        </div>

        {/* ÉTAPE 4 À 6 : ORIGINE */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all space-y-4 shadow-sm dark:shadow-lg flex flex-col justify-between">
          <OriginVisual />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 font-bold text-xs border border-emerald-500/20 uppercase tracking-wider">Étapes 4 à 6</span>
              <span className="text-xs text-slate-400 font-mono">Mise à Zéro</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Prise d'Origine</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Centrage vertical :</strong> Avancer le burin au milieu avec la coulisse verticale.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Tangentage :</strong> Venir effleurer la face avec la coulisse latérale.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span><strong>Blocage &amp; Zéro :</strong> Bloquer la manivelle et étalonner le tambour à <strong>0</strong>.</span>
              </li>
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
            <span>Tangentage latéral</span>
            <span>Vernier à 0.00</span>
          </div>
        </div>

        {/* ÉTAPE 7 : DRESSAGE DE FACE */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 hover:border-yellow-500/40 transition-all space-y-4 shadow-sm dark:shadow-lg flex flex-col justify-between">
          <FacingPassesVisual />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-400 font-bold text-xs border border-yellow-500/20 uppercase tracking-wider">Étape 7</span>
              <span className="text-xs text-slate-400 font-mono">Passe 0.10 mm</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dressage de Face</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0"></span>
                <span><strong>Avance axiale :</strong> Avancer de <strong>10 centièmes</strong> (0.10 mm) avec la coulisse latérale.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0"></span>
                <span><strong>Dégagement :</strong> Sortir radialement le burin hors de la matière.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 shrink-0"></span>
                <span><strong>Cycle répété :</strong> Revenir au centre, ré-avancer de 10... jusqu'à obtenir une <strong>face parfaitement nette</strong>.</span>
              </li>
            </ul>
          </div>
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-[11px] font-mono text-yellow-700 dark:text-yellow-300 flex items-center justify-between">
            <span>Passe : +10 centièmes</span>
            <span>Finition N5</span>
          </div>
        </div>

      </div>

      {/* ==============================================
           ENCADRÉ D'ALERTE : DIAGNOSTIC DE LA FACE USINÉE
           (Reproduit exactement les 2 schémas diagnostiques du document)
           ============================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/5 dark:bg-slate-950 border-2 border-amber-400 dark:border-amber-500/40 space-y-6 shadow-sm dark:shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-base border border-amber-500/30">
              ⚠
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Diagnostic de la Face Usinée</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Contrôle visuel du centre de la pièce après la passe de dressage</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Réglage Micrométrique de la Hauteur
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CAS 1 : SURPLUS AU CENTRE (Téton) */}
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-[#140D04] border border-amber-300 dark:border-amber-500/40 space-y-5 flex flex-col justify-between shadow-sm dark:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ANOMALIE A
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> SURPLUS AU CENTRE
                </span>
              </div>

              {/* Schéma vectoriel fidèle au croquis du document */}
              <div className="flex items-center justify-center py-4">
                <div className="w-40 h-40 rounded-2xl bg-amber-100 dark:bg-[#1E1408] border-2 border-amber-400 dark:border-amber-500/40 flex items-center justify-center relative shadow-inner">
                  {/* Face carrée avec téton central en relief */}
                  <div className="w-24 h-24 rounded-xl border border-amber-400/50 bg-amber-200 dark:bg-[#2A1C0B] flex items-center justify-center relative">
                    {/* Téton central visible */}
                    <circle cx="0" cy="0" r="8" fill="#F59E0B" />
                    <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white shadow-lg animate-pulse"></div>
                  </div>
                  {/* Badge Surplus */}
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300 bg-white/90 dark:bg-black/60 py-0.5 rounded">
                    Téton résiduel
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <span className="text-base font-extrabold text-amber-800 dark:text-amber-300 block">Burin Trop Bas</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  L'arête passe sous l'axe géométrique horizontal de la broche, laissant un cylindre central non coupé.
                </p>
              </div>
            </div>

            {/* Action corrective avec flèche horaire */}
            <div className="p-3.5 rounded-xl bg-amber-100/90 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-500/40 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-sm sm:text-base">
                <span className="text-lg">↻</span> Tourner sens horaire
              </div>
              <span className="text-[11px] text-amber-900/80 dark:text-amber-200/80 block">Visser la vis de réglage pour remonter le burin vers l'axe 70.00 mm</span>
            </div>
          </div>

          {/* CAS 2 : TROU AU CENTRE (Dépression) */}
          <div className="p-6 rounded-2xl bg-rose-50 dark:bg-[#14060A] border border-rose-300 dark:border-rose-500/40 space-y-5 flex flex-col justify-between shadow-sm dark:shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  ANOMALIE B
                </span>
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400"></span> TROU AU CENTRE
                </span>
              </div>

              {/* Schéma vectoriel fidèle au croquis du document */}
              <div className="flex items-center justify-center py-4">
                <div className="w-40 h-40 rounded-2xl bg-rose-100 dark:bg-[#1E090F] border-2 border-rose-400 dark:border-rose-500/40 flex items-center justify-center relative shadow-inner">
                  {/* Face carrée avec creux conique au centre */}
                  <div className="w-24 h-24 rounded-xl border border-rose-400/50 bg-rose-200 dark:bg-[#2A0D15] flex items-center justify-center relative">
                    {/* Dépression centrale */}
                    <div className="w-7 h-7 rounded-full bg-rose-300 dark:bg-[#0D0407] border-2 border-rose-500 shadow-inner flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    </div>
                  </div>
                  {/* Badge Trou */}
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-mono font-bold text-rose-800 dark:text-rose-300 bg-white/90 dark:bg-black/60 py-0.5 rounded">
                    Cuvette conique
                  </div>
                </div>
              </div>

              <div className="text-center space-y-1">
                <span className="text-base font-extrabold text-rose-800 dark:text-rose-300 block">Burin Trop Haut</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  L'arête dépasse l'axe horizontal et le bec de l'outil creuse une dépression en fin de passe de dressage.
                </p>
              </div>
            </div>

            {/* Action corrective avec flèche anti-horaire */}
            <div className="p-3.5 rounded-xl bg-rose-100/90 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-500/40 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-rose-800 dark:text-rose-300 font-extrabold text-sm sm:text-base">
                <span className="text-lg">↺</span> Tourner sens anti-horaire
              </div>
              <span className="text-[11px] text-rose-900/80 dark:text-rose-200/80 block">Dévisser la vis de réglage pour abaisser le burin vers l'axe 70.00 mm</span>
            </div>
          </div>

        </div>
      </div>

      {/* ==============================================
           ÉTAPE 8 À 11 : FINITION & RETRAIT
           ============================================== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block">ÉTAPE 8 À 11</span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">Finition, Tangentage Longitudinal &amp; Retrait Sécurisé</h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Calibration Finale au 0.01 mm
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">8</span>
              <span>Blocage Origine</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Mettre le vernier latéral rigoureusement à <strong>0</strong>, puis bloquer fermement la manivelle de coulisse.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-cyan-300 font-bold">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono">9</span>
              <span>Avance de 50 Centièmes</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Vérifier que le burin n'est pas en contact avec la matière, puis <strong>avancer de 50 centièmes</strong> (0.50 mm) avec la coulisse latérale.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-300 font-bold">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">10</span>
              <span>Tangentage Vertical</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Venir tangenter avec la coulisse verticale jusqu'à observer un <strong>léger trait</strong> sur la matière, bloquer la manivelle et calibrer à <strong>0</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-purple-300 font-bold">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono">11</span>
              <span>Recul de Sécurité</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Reculer de 50 centièmes</strong> (-0.50 mm) avec la coulisse latérale. La machine est prête pour le chariotage longitudinal.
            </p>
          </div>

        </div>
      </div>

    </div>

    </section>
  

    <section id="gestes-techniques" className="scroll-mt-28 pt-6 space-y-10">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-extrabold text-sm border border-cyan-500/30">02</span>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Planches Techniques &amp; Métrologie de Précision</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Contrôle au Projecteur de Profil 20:1 &amp; Règles Cinématiques d'Atelier Horloger (Normes ISO 128)</p>
        </div>
      </div>

      <div className="space-y-10 mt-8">
    {/* PLANCHE 1 : DESSIN CAD D'INGÉNIERIE HORLOGÈRE 20:1 */}
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-extrabold text-sm border border-cyan-500/30">02</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider border border-cyan-500/30">PLANCHE 01 · PROJECTION OPTIQUE 20:1</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700">Norme ISO 128</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Géométrie d'Attaque du Burin Carré 80° sur Éventail</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Projecteur Marcel Aubert</span>
          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">Tournage Manuel</span>
        </div>
      </div>

      {/* Grand écran CAD avec lignes de repère fines et cotations techniques */}
      <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-[#040813] p-4 sm:p-6 shadow-md dark:shadow-2xl cad-grid overflow-hidden">
        <svg viewBox="0 0 920 480" className="w-full h-auto select-none" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
          <defs>
            <linearGradient id="p1SteelPiece" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B"/>
              <stop offset="30%" stopColor="#475569"/>
              <stop offset="50%" stopColor="#94A3B8"/>
              <stop offset="70%" stopColor="#E2E8F0"/>
              <stop offset="100%" stopColor="#334155"/>
            </linearGradient>

            <linearGradient id="p1BrassRest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24"/>
              <stop offset="50%" stopColor="#D97706"/>
              <stop offset="100%" stopColor="#78350F"/>
            </linearGradient>

            <linearGradient id="p1GraverSteel" x1="0" y1="0" x2="1" y2="0.3">
              <stop offset="0%" stopColor="#334155"/>
              <stop offset="40%" stopColor="#475569"/>
              <stop offset="80%" stopColor="#64748B"/>
              <stop offset="100%" stopColor="#1E293B"/>
            </linearGradient>

            <marker id="cadArrowGold" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B"/>
            </marker>
            <marker id="cadArrowCyan" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38BDF8"/>
            </marker>
            <marker id="cadDotCyan" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5">
              <circle cx="4" cy="4" r="3" fill="#38BDF8"/>
            </marker>
            <marker id="cadDotGold" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5">
              <circle cx="4" cy="4" r="3" fill="#F59E0B"/>
            </marker>
            <marker id="cadDotWhite" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5">
              <circle cx="4" cy="4" r="3" fill="#FFFFFF"/>
            </marker>
          </defs>

          {/* RÉTICULE OPTIQUE CENTRAL (Projecteur de profil) */}
          <g transform="translate(240, 240)">
            <circle cx="0" cy="0" r="210" fill="none" stroke="#1E293B" strokeWidth="1.8"/>
            <circle cx="0" cy="0" r="160" fill="none" stroke="#1E293B" strokeDasharray="6,6" strokeWidth="1.2"/>
            <circle cx="0" cy="0" r="110" fill="none" stroke="#334155" strokeWidth="1.2"/>
            <circle cx="0" cy="0" r="60" fill="none" stroke="#1E293B" strokeDasharray="4,4" strokeWidth="1.2"/>
          </g>

          {/* AXES TRAIT-POINT NORMALISÉS ISO */}
          <line x1="20" y1="240" x2="900" y2="240" stroke="#F59E0B" strokeDasharray="16, 4, 3, 4" strokeWidth="1.5"/>
          <line x1="240" y1="15" x2="240" y2="465" stroke="#38BDF8" strokeDasharray="6,4" strokeWidth="1.2"/>

          {/* PIÈCE EN ACIER TOURNÉE (Barre Ø 4.50 mm grossie à 20x) */}
          <circle cx="170" cy="240" r="140" fill="url(#p1SteelPiece)" stroke="#F8FAFC" strokeWidth="2.5"/>
          <circle cx="170" cy="240" r="105" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5"/>
          <circle cx="170" cy="240" r="65" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5"/>

          {/* SENS DE ROTATION CCW (Flèche courbée en haut à gauche) */}
          <path d="M 170 85 A 155 155 0 0 1 270 155" fill="none" stroke="#F59E0B" strokeWidth="3" markerEnd="url(#cadArrowGold)"/>
          <text x="175" y="70" fill="#FDE047" fontSize="12" fontWeight="800">Sens de rotation CCW (Anti-horaire)</text>

          {/* ÉVENTAIL D'APPUI EN LAITON (BRASS T-REST) */}
          <path d="M 285 280 L 360 280 L 360 420 L 305 420 L 295 330 Z" fill="url(#p1BrassRest)" stroke="#FEF08A" strokeWidth="1.8"/>
          <rect x="285" y="277" width="75" height="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8"/>

          {/* BURIN CARRÉ 80° (CORPS EN ACIER & TAILLANT AFFÛTÉ) */}
          <polygon points="310,240 540,295 535,350 295,295" fill="url(#p1GraverSteel)" stroke="#CBD5E1" strokeWidth="2"/>
          <polygon points="310,240 350,200 395,255 352,295" fill="#0284C7" stroke="#38BDF8" strokeWidth="2.5"/>
          <polygon points="310,240 350,200 365,225 325,265" fill="#38BDF8" fill-opacity="0.5"/>
          <polygon points="310,240 316,234 322,246 316,252" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5"/>

          {/* POINT DE CONTACT & TANGENTE (Arête rigoureusement à l'axe) */}
          <circle cx="310" cy="240" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2.5"/>
          <line x1="310" y1="130" x2="310" y2="350" stroke="#38BDF8" strokeDasharray="6,4" strokeWidth="1.8"/>

          {/* ARC DE COTATION D'ANGLE 90° à 95° */}
          <path d="M 310 305 A 65 65 0 0 0 368 290" fill="none" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#cadArrowGold)"/>

          {/* COPEAU DE SOIE CONTINU */}
          <path d="M 312 237 Q 295 190, 335 165 T 375 170 T 365 135 T 405 130" fill="none" stroke="#FDE047" strokeWidth="3.5" strokeLinecap="round"/>

          {/* LIGNES DE RAPPEL TECHNIQUES ISO (ZERO COLLISION) */}
          <g transform="translate(20, 228)">
            <rect x="0" y="-14" width="165" height="26" rx="5" fill="#060C18" fill-opacity="0.95" stroke="#F59E0B" strokeWidth="1.2"/>
            <text x="82" y="3" fill="#FBBF24" fontSize="11" fontWeight="700" textAnchor="middle">Axe de broche (70.00 mm)</text>
          </g>

          <polyline points="380,140 440,75 780,75" fill="none" stroke="#FDE047" strokeWidth="1.5" markerStart="url(#cadDotGold)"/>
          <text x="450" y="67" fill="#FDE047" fontSize="13" fontWeight="800">COPEAU DE SOIE CONTINU</text>
          <text x="450" y="90" fill="#E2E8F0" fontSize="11" fontWeight="500">Signe d'une coupe fluide sans frottement ni arrachement</text>

          <polyline points="310,240 410,145 820,145" fill="none" stroke="#38BDF8" strokeWidth="1.5" markerStart="url(#cadDotCyan)"/>
          <text x="420" y="137" fill="#38BDF8" fontSize="13" fontWeight="800">ARÊTE AU CENTRE (H = 70.00 mm)</text>
          <text x="420" y="160" fill="#E2E8F0" fontSize="11" fontWeight="500">Tangente verticale rigoureuse · Dépouille active α = 6°</text>

          <polyline points="430,275 500,215 860,215" fill="none" stroke="#FFFFFF" strokeWidth="1.5" markerStart="url(#cadDotWhite)"/>
          <text x="510" y="207" fill="#FFFFFF" fontSize="13" fontWeight="800">BURIN CARRÉ 80° (Acier Böhler K720)</text>
          <text x="510" y="230" fill="#38BDF8" fontSize="11" fontWeight="600">Méplat d'abattage de 0.30 mm poli à la pierre d'Arkansas</text>

          <polyline points="340,300 440,335 800,335" fill="none" stroke="#F59E0B" strokeWidth="1.5" markerStart="url(#cadDotGold)"/>
          <text x="450" y="327" fill="#FBBF24" fontSize="13" fontWeight="800">ANGLE D'ATTAQUE 90° à 95°</text>
          <text x="450" y="350" fill="#E2E8F0" fontSize="11" fontWeight="500">Face losange inclinée pour guider l'évacuation du copeau</text>

          <polyline points="305,270 230,425 20,425" fill="none" stroke="#38BDF8" strokeWidth="1.5" markerStart="url(#cadDotCyan)"/>
          <text x="25" y="417" fill="#38BDF8" fontSize="13" fontWeight="800">ÉVENTAIL LAITON · JEU d &lt; 1.0 mm</text>
          <text x="25" y="440" fill="#E2E8F0" fontSize="11" fontWeight="500">Appui rigide au plus près de la pièce pour interdire tout basculement</text>
        </svg>
      </div>

      {/* 4 Règles d'Or d'Atelier ultra claires et lisibles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="font-bold text-amber-400 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            1. Appui rigide
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Burin plaqué fermement contre l'éventail à <strong>moins de 1.0 mm</strong> de la pièce pour interdire tout basculement.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="font-bold text-amber-400 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            2. Hauteur au centre
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Arête tranchante calée au centième à l'axe horizontal (<strong>H = 70.00 mm</strong>) pour garantir une dépouille positive.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="font-bold text-cyan-400 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            3. Angle 90° à 95°
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Face losange inclinée pour obtenir un copeau régulier sous forme d'un <strong>ruban soyeux continu</strong>.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm">
          <div className="font-bold text-emerald-400 flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            4. Pierre d'Arkansas
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            Finition au grain ultra-fin à l'huile pour supprimer tout morfil et obtenir un <strong>état poli glacé N5</strong>.
          </p>
        </div>
      </div>
    </div>
{/* ==========================================
         PLANCHE 2 : CINÉMATIQUE CHARIOT CROISÉ
         ========================================== */}
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-extrabold text-sm border border-cyan-500/30">03</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-xs uppercase tracking-wider border border-cyan-500/30">PLANCHE 02 · CINÉMATIQUE SUR CHARIOT CROISÉ</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700">Schaublin 70</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Chariotage Longitudinal Z &amp; Dressage Radial X au Centième</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Tambours au 0.01 mm</span>
          <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30">Précision Outilleur</span>
        </div>
      </div>

      <div className="cad-grid rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Technical Vector Drawing of Cross-Slide Assembly */}
        <div className="lg:col-span-8 overflow-x-auto">
          <svg viewBox="0 0 760 360" className="w-full min-w-[620px] h-auto select-none" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
            <defs>
              <linearGradient id="p2SteelBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#334155"/>
                <stop offset="25%" stopColor="#64748B"/>
                <stop offset="50%" stopColor="#CBD5E1"/>
                <stop offset="75%" stopColor="#64748B"/>
                <stop offset="100%" stopColor="#1E293B"/>
              </linearGradient>

              <linearGradient id="p2ToolSteel" x1="0" y1="0" x2="1" y2="0.3">
                <stop offset="0%" stopColor="#475569"/>
                <stop offset="50%" stopColor="#94A3B8"/>
                <stop offset="100%" stopColor="#334155"/>
              </linearGradient>

              <marker id="mArrowGoldP2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#FBBF24"/>
              </marker>
              <marker id="mArrowEmerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#34D399"/>
              </marker>
              <marker id="mArrowRose" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#FB7185"/>
              </marker>
            </defs>

            {/* BANC DU TOUR SCHAUBLIN 70 */}
            <polygon points="40,290 720,290 690,335 70,335" fill="#1E293B" stroke="#475569" strokeWidth="2"/>
            <rect x="40" y="286" width="680" height="5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1"/>
            <text x="380" y="320" fill="#E2E8F0" fontSize="12" fontWeight="700" textAnchor="middle">BANC DU TOUR SCHAUBLIN 70 (GLISSIÈRE PRISMATIQUE RECTIFIÉE)</text>

            {/* Poupée & Pièce brute */}
            <rect x="40" y="70" width="60" height="150" rx="4" fill="#0F172A" stroke="#475569" strokeWidth="2"/>
            <rect x="100" y="95" width="35" height="100" fill="#334155" stroke="#64748B" strokeWidth="1.8"/>
            {/* Barre cylindrique */}
            <rect x="135" y="110" width="225" height="70" fill="url(#p2SteelBar)" stroke="#CBD5E1" strokeWidth="1.8"/>
            <polygon points="360,110 370,115 370,175 360,180" fill="#94A3B8" stroke="#FFFFFF" strokeWidth="1"/>
            
            {/* Badge Pièce Brute */}
            <g transform="translate(160, 125)">
              <rect x="0" y="0" width="180" height="42" rx="6" fill="#070D18" stroke="#38BDF8" strokeWidth="1.5"/>
              <text x="90" y="18" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle">PIÈCE BRUTE À CHARIOTER</text>
              <text x="90" y="34" fill="#38BDF8" fontSize="11" fontWeight="700" textAnchor="middle">Ø 4.50 mm (Acier Böhler K720)</text>
            </g>

            {/* HAUTEUR DE POINTE H = 70.00 mm */}
            <line x1="30" y1="145" x2="380" y2="145" stroke="#F59E0B" strokeDasharray="16, 4, 3, 4" strokeWidth="1.5"/>
            <line x1="25" y1="286" x2="60" y2="286" stroke="#F59E0B" strokeWidth="1.5"/>
            <line x1="30" y1="286" x2="30" y2="145" stroke="#F59E0B" strokeWidth="2" markerStart="url(#mArrowGoldP2)" markerEnd="url(#mArrowGoldP2)"/>
            <g transform="translate(5, 205)">
              <rect x="0" y="0" width="105" height="30" rx="6" fill="#070D18" stroke="#F59E0B" strokeWidth="1.5"/>
              <text x="52" y="20" fill="#FBBF24" fontSize="12" fontWeight="800" textAnchor="middle">H = 70.00 mm</text>
            </g>

            {/* Chariot inférieur & coulisse supérieure */}
            <rect x="370" y="230" width="240" height="56" rx="4" fill="#1A2436" stroke="#475569" strokeWidth="2"/>
            <polygon points="370,230 385,216 595,216 610,230" fill="#2E3B52" stroke="#64748B" strokeWidth="1.5"/>

            <rect x="400" y="175" width="160" height="42" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="1.8"/>
            <rect x="390" y="125" width="90" height="50" rx="4" fill="#334155" stroke="#94A3B8" strokeWidth="2"/>
            <rect x="425" y="112" width="16" height="14" rx="2" fill="#475569" stroke="#CBD5E1" strokeWidth="1"/>
            <circle cx="433" cy="119" r="3.5" fill="#0A0F1A" stroke="#FBBF24" strokeWidth="1.2"/>

            {/* Tambour micrométrique */}
            <g transform="translate(610, 235)">
              <rect x="0" y="5" width="40" height="30" rx="3" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5"/>
              <line x1="8" y1="5" x2="8" y2="35" stroke="#0F172A" strokeWidth="1.8"/>
              <line x1="16" y1="5" x2="16" y2="25" stroke="#0F172A" strokeWidth="1.2"/>
              <line x1="24" y1="5" x2="24" y2="35" stroke="#0F172A" strokeWidth="1.8"/>
              <line x1="32" y1="5" x2="32" y2="25" stroke="#0F172A" strokeWidth="1.2"/>
              <circle cx="55" cy="20" r="8" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1.5"/>
              <g transform="translate(-15, 42)">
                <rect x="0" y="0" width="115" height="24" rx="5" fill="#07192A" stroke="#38BDF8" strokeWidth="1.2"/>
                <text x="57" y="16" fill="#38BDF8" fontSize="11" fontWeight="800" textAnchor="middle">TAMBOUR 0.01 mm</text>
              </g>
            </g>

            {/* Burin couteau en action */}
            <polygon points="360,145 470,158 470,175 375,170" fill="url(#p2ToolSteel)" stroke="#E2E8F0" strokeWidth="1.8"/>
            <polygon points="345,145 365,143 375,170 353,167" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.8"/>
            <circle cx="345" cy="145" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2"/>

            <path d="M 346 143 Q 338 122, 358 110 T 376 115 T 372 92" fill="none" stroke="#FDE047" strokeWidth="3" strokeLinecap="round"/>

            {/* VECTEURS CINÉMATIQUES CLAIRS ET VISIBLES */}
            {/* Avance Axiale Z */}
            <g transform="translate(265, 40)">
              <rect x="0" y="0" width="205" height="38" rx="6" fill="#071924" stroke="#34D399" strokeWidth="1.5"/>
              <line x1="180" y1="19" x2="25" y2="19" stroke="#34D399" strokeWidth="2.5" markerEnd="url(#mArrowEmerald)"/>
              <text x="102" y="15" fill="#34D399" fontSize="12" fontWeight="800" textAnchor="middle">AVANCE AXIALE Z</text>
              <text x="102" y="30" fill="#A7F3D0" fontSize="11" fontWeight="600" textAnchor="middle">Chariotage longitudinal</text>
            </g>

            {/* Avance Radiale X */}
            <g transform="translate(495, 40)">
              <rect x="0" y="0" width="205" height="38" rx="6" fill="#200A13" stroke="#FB7185" strokeWidth="1.5"/>
              <line x1="180" y1="19" x2="25" y2="19" stroke="#FB7185" strokeWidth="2.5" markerEnd="url(#mArrowRose)"/>
              <text x="102" y="15" fill="#FB7185" fontSize="12" fontWeight="800" textAnchor="middle">AVANCE RADIALE X</text>
              <text x="102" y="30" fill="#FECDD3" fontSize="11" fontWeight="600" textAnchor="middle">Dressage transversal de face</text>
            </g>
          </svg>
        </div>

        {/* Fiche Angles ISO */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm dark:shadow-xl">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-cyan-600 dark:text-cyan-400">Angles du Burin Couteau (5x5)</h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Normes ISO d'affûtage d'outilleur</span>
          </div>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-700 dark:text-slate-300">Dépouille latérale (α₁) :</span>
              <span className="text-cyan-300 font-extrabold text-base">6.0°</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-700 dark:text-slate-300">Dépouille frontale (α₂) :</span>
              <span className="text-cyan-300 font-extrabold text-base">6.0°</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-700 dark:text-slate-300">Angle de taillant (β) :</span>
              <span className="text-amber-300 font-extrabold text-base">76° à 80°</span>
            </div>
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-slate-700 dark:text-slate-300">Angle de coupe (γ) :</span>
              <span className="text-emerald-300 font-extrabold text-base">4° à 8°</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3">
            L'angle de taillant <strong className="text-slate-900 dark:text-white">β ≈ 78°</strong> assure la robustesse indispensable pour usiner l'acier Böhler K720 sans risquer l'ébrèchement au centième.
          </p>
        </div>
      </div>
    </div>

    {/* ==========================================
         PLANCHE 3 : LOI FONDAMENTALE DU CENTRAGE
         ========================================== */}
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-gradient-to-b dark:from-slate-900/90 dark:to-slate-950/90 p-6 sm:p-8 backdrop-blur-xl shadow-sm dark:shadow-2xl space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-sm border border-emerald-500/30">04</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">PLANCHE 03 · PROJECTION OPTIQUE DE CONTRÔLE</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700">Grossissement 20:1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Loi Fondamentale du Centrage : Les 3 Conditions Comparées</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Contrôle au Réticule</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CONDITION 1 : JUSTE (H = 70.00 mm) */}
        <div className="rounded-2xl border-2 border-emerald-400 dark:border-emerald-500/40 bg-emerald-50/80 dark:bg-[#071322] p-5 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              1. HAUTEUR JUSTE (70.00 mm)
            </span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> CONFORME
            </span>
          </div>

          {/* Oculaire optique 1 */}
          <div className="w-full aspect-square rounded-2xl p-2 border border-emerald-500/30 bg-[#030914] flex items-center justify-center">
            <svg viewBox="0 0 260 220" className="w-full h-auto select-none" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
              <line x1="15" y1="110" x2="245" y2="110" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              <line x1="100" y1="15" x2="100" y2="205" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              <circle cx="100" cy="110" r="85" fill="none" stroke="#1E293B" strokeWidth="1.5"/>
              <circle cx="100" cy="110" r="55" fill="none" stroke="#1E293B" strokeDasharray="3,3" strokeWidth="1"/>

              <circle cx="100" cy="110" r="65" fill="url(#mSteelGrad)" stroke="#CBD5E1" strokeWidth="2"/>
              <line x1="20" y1="110" x2="240" y2="110" stroke="#F59E0B" strokeDasharray="10, 3, 2, 3" strokeWidth="1.5"/>

              {/* Burin parfaitement centré */}
              <polygon points="165,110 240,125 240,150 165,128" fill="#10B981" fill-opacity="0.35" stroke="#10B981" strokeWidth="2"/>
              <path d="M 165 128 A 18 18 0 0 0 165 110" fill="none" stroke="#38BDF8" strokeWidth="2"/>
              <text x="175" y="125" fill="#38BDF8" fontSize="11" fontWeight="800">α = 6°</text>

              <circle cx="165" cy="110" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="2"/>

              <path d="M 166 108 Q 158 85, 178 75 T 196 80 T 192 60" fill="none" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round"/>

              {/* Badges */}
              <g transform="translate(30, 25)">
                <rect x="0" y="0" width="130" height="24" rx="5" fill="#071424" stroke="#F59E0B" strokeWidth="1.2"/>
                <text x="65" y="16" fill="#FBBF24" fontSize="11" fontWeight="800" textAnchor="middle">RÉTICULE OPTIQUE</text>
              </g>

              <g transform="translate(135, 55)">
                <rect x="0" y="0" width="115" height="24" rx="5" fill="#072018" stroke="#34D399" strokeWidth="1.2"/>
                <text x="57" y="16" fill="#34D399" fontSize="11" fontWeight="800" textAnchor="middle">ARÊTE TANGENTE</text>
              </g>
            </svg>
          </div>

          {/* Données métriques */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Hauteur de pointe :</span>
              <span className="text-emerald-400 font-extrabold">70.00 mm (Exacte)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Dépouille effective :</span>
              <span className="text-slate-900 dark:text-white font-extrabold">α = 6° (Nominale)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Téton de centre :</span>
              <span className="text-emerald-400 font-extrabold">0.00 mm (Nul)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Finition d'état :</span>
              <span className="text-amber-300 font-extrabold">Poli Glacé N5</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
              L'arête tranche rigoureusement sur le plan horizontal. Coupe douce, ruban continu sans à-coups, face parfaitement plane.
            </p>
          </div>
        </div>

        {/* CONDITION 2 : TROP HAUT (H > 70.00 mm) */}
        <div className="rounded-2xl border-2 border-rose-400 dark:border-rose-500/40 bg-rose-50/80 dark:bg-[#160A11] p-5 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between border-b border-rose-500/30 pb-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
              2. TROP HAUT (H &gt; 70 mm)
            </span>
            <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span> REJET
            </span>
          </div>

          {/* Oculaire optique 2 */}
          <div className="w-full aspect-square rounded-2xl p-2 border border-rose-500/30 bg-[#0F0409] flex items-center justify-center">
            <svg viewBox="0 0 260 220" className="w-full h-auto select-none" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
              <line x1="15" y1="110" x2="245" y2="110" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              <line x1="100" y1="15" x2="100" y2="205" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              
              <circle cx="100" cy="110" r="65" fill="url(#mSteelGrad)" stroke="#CBD5E1" strokeWidth="2"/>
              <line x1="20" y1="110" x2="240" y2="110" stroke="#F59E0B" strokeDasharray="10, 3, 2, 3" strokeWidth="1.5"/>

              {/* Téton restant */}
              <circle cx="100" cy="110" r="8" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2"/>
              <g transform="translate(35, 85)">
                <rect x="0" y="0" width="120" height="24" rx="5" fill="#20060C" stroke="#EF4444" strokeWidth="1.2"/>
                <text x="60" y="16" fill="#FCA5A5" fontSize="11" fontWeight="800" textAnchor="middle">TÉTON Ø 1.0 mm</text>
              </g>

              {/* Burin trop haut */}
              <polygon points="158,80 235,95 235,122 158,102" fill="#EF4444" fill-opacity="0.35" stroke="#EF4444" strokeWidth="2"/>
              <circle cx="158" cy="80" r="4.5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2"/>

              {/* Talonnage */}
              <path d="M 158 80 Q 162 95, 150 104" fill="none" stroke="#F43F5E" strokeWidth="3.5"/>
              <line x1="162" y1="90" x2="174" y2="86" stroke="#F59E0B" strokeWidth="2"/>
              <line x1="161" y1="97" x2="172" y2="96" stroke="#F59E0B" strokeWidth="2"/>

              {/* Badges */}
              <g transform="translate(130, 52)">
                <rect x="0" y="0" width="125" height="24" rx="5" fill="#2A0812" stroke="#F87171" strokeWidth="1.2"/>
                <text x="62" y="16" fill="#F87171" fontSize="11" fontWeight="800" textAnchor="middle">TALONNAGE MASSIF</text>
              </g>

              <g transform="translate(150, 130)">
                <rect x="0" y="0" width="100" height="24" rx="5" fill="#20060C" stroke="#F87171" strokeWidth="1.2"/>
                <text x="50" y="16" fill="#F87171" fontSize="11" fontWeight="800" textAnchor="middle">α effectif ≤ 0°</text>
              </g>
            </svg>
          </div>

          {/* Données métriques */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Hauteur de pointe :</span>
              <span className="text-rose-400 font-extrabold">&gt; 70.00 mm (+0.35 mm)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Dépouille effective :</span>
              <span className="text-rose-400 font-extrabold">α ≤ 0° (Annulée !)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Téton de centre :</span>
              <span className="text-rose-400 font-extrabold">Volumineux (&gt; 1 mm)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Conséquence :</span>
              <span className="text-amber-400 font-extrabold">Écrouissage sans coupe</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
              L'angle de dépouille s'annule : le dos du burin talonne contre la pièce. Le métal est refoulé, s'échauffe violemment et laisse un gros téton central au dressage.
            </p>
          </div>
        </div>

        {/* CONDITION 3 : TROP BAS (H < 70.00 mm) */}
        <div className="rounded-2xl border-2 border-amber-400 dark:border-amber-500/40 bg-amber-50/80 dark:bg-[#160E06] p-5 flex flex-col justify-between space-y-4 shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between border-b border-amber-500/30 pb-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              3. TROP BAS (H &lt; 70 mm)
            </span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> DANGEREUX
            </span>
          </div>

          {/* Oculaire optique 3 */}
          <div className="w-full aspect-square rounded-2xl p-2 border border-amber-500/30 bg-[#0F0803] flex items-center justify-center">
            <svg viewBox="0 0 260 220" className="w-full h-auto select-none" style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
              <line x1="15" y1="110" x2="245" y2="110" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              <line x1="100" y1="15" x2="100" y2="205" stroke="#334155" strokeDasharray="3,2" strokeWidth="1.2"/>
              
              <circle cx="100" cy="110" r="65" fill="url(#mSteelGrad)" stroke="#CBD5E1" strokeWidth="2"/>
              <line x1="20" y1="110" x2="240" y2="110" stroke="#F59E0B" strokeDasharray="10, 3, 2, 3" strokeWidth="1.5"/>

              {/* Burin trop bas */}
              <polygon points="158,140 235,155 235,182 158,162" fill="#F59E0B" fill-opacity="0.35" stroke="#F59E0B" strokeWidth="2"/>
              <circle cx="158" cy="140" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2"/>

              {/* Ondes de broutement */}
              <path d="M 152 125 Q 158 132, 154 139 T 159 146" fill="none" stroke="#F59E0B" strokeWidth="2.5"/>
              <line x1="140" y1="118" x2="153" y2="132" stroke="#F59E0B" strokeDasharray="2,2" strokeWidth="1.2"/>
              <line x1="135" y1="126" x2="150" y2="142" stroke="#F59E0B" strokeDasharray="2,2" strokeWidth="1.2"/>

              {/* Force de plongée */}
              <line x1="158" y1="140" x2="142" y2="128" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#mArrowGoldP2)"/>

              {/* Badges */}
              <g transform="translate(115, 186)">
                <rect x="0" y="0" width="140" height="24" rx="5" fill="#201205" stroke="#FCD34D" strokeWidth="1.2"/>
                <text x="70" y="16" fill="#FCD34D" fontSize="11" fontWeight="800" textAnchor="middle">BROUTEMENT CYCLIQUE</text>
              </g>

              <g transform="translate(35, 150)">
                <rect x="0" y="0" width="115" height="24" rx="5" fill="#20060C" stroke="#EF4444" strokeWidth="1.2"/>
                <text x="57" y="16" fill="#FCA5A5" fontSize="11" fontWeight="800" textAnchor="middle">FORCE DE PLONGÉE</text>
              </g>
            </svg>
          </div>

          {/* Données métriques */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Hauteur de pointe :</span>
              <span className="text-amber-400 font-extrabold">&lt; 70.00 mm (-0.40 mm)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Dépouille effective :</span>
              <span className="text-amber-400 font-extrabold">Excessive (&gt; 14°)</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Risque pièce :</span>
              <span className="text-rose-400 font-extrabold">Happing &amp; Flexion</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1.5">
              <span>Risque taillant :</span>
              <span className="text-rose-400 font-extrabold">Ébrèchement pointe</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
              L'angle de coupe devient trop aigu : la rotation happe le burin vers le bas. Vibrations destructrices (broutement), flexion de la pièce et ébrèchement du taillant.
            </p>
          </div>
        </div>

      </div>
    </div>

  
      </div>

      {/* Section Traitement Thermique & Photo Réelle Base64 */}
      <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">
              MÉTALLURGIE D'ATELIER (Acier Böhler K720)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">Chauffe au Chalumeau &amp; Trempe Martensitique</h3>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            Protocole HL-OUT-98110 &amp; HL-OUT-98100
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-xl group bg-slate-100 dark:bg-slate-900 aspect-[16/11]">
            <img 
              src="/images/micromecanique/schaublin_tournage_main.jpg" 
              alt="Chauffe au chalumeau d'un pointeau d'horloger au rouge cerise avec bain d'huile et plateau à bleuir" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
              <span className="text-rose-300 font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md">Chauffe au Chalumeau (800°C)</span>
              <span className="text-slate-200 text-xs bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-md">Huile &amp; Plaque à bleuir</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-sm">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <span className="text-amber-400 font-bold block text-sm tracking-wide">
                NUANCIER DES COULEURS DE REVENU DE L'ACIER AU CARBONE (K720)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-yellow-950/40 border border-amber-200 dark:border-yellow-600/30">
                  <span className="text-yellow-400 font-bold block text-sm">220°C · Jaune Paille</span>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Burins, lames de coupe</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/30">
                  <span className="text-amber-400 font-bold block text-sm">250°C · Brun-Ocre</span>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Ciseaux, poinçons</span>
                </div>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-600/30">
                  <span className="text-purple-400 font-bold block text-sm">270°C · Pourpre</span>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Tarauds, forets</span>
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-blue-950/70 border-2 border-cyan-500 dark:border-cyan-400 shadow-sm">
                  <span className="text-cyan-300 font-bold block text-sm">290°C · Bleu Horloger</span>
                  <span className="text-cyan-900 dark:text-white text-xs font-bold">Pointeaux (56 HRC)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-600/30">
                  <span className="text-sky-400 font-bold block text-sm">310°C · Bleu Clair</span>
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Ressorts hélicoïdaux</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-700 dark:text-slate-300 font-bold block text-sm">330°C · Gris Cendre</span>
                  <span className="text-slate-400 text-xs">Perte de trempe</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm">
              <span className="text-rose-400 font-bold block text-sm">
                LES 3 PHASES DE LA TREMPE MARTENSITIQUE D'ATELIER :
              </span>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                <li><strong className="text-slate-900 dark:text-white">Austénitisation :</strong> Chauffer la pointe à 790°C-820°C (rouge cerise franc) au chalumeau.</li>
                <li><strong className="text-slate-900 dark:text-white">Trempe à l'huile :</strong> Immersion 100% verticale dans l'huile minérale pour proscrire tout voile.</li>
                <li><strong className="text-slate-900 dark:text-white">Revenu bleu :</strong> Blanchir à l'Arkansas puis chauffer sur plaque en laiton au bleu horloger (290°C).</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="cinematique" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">03</span>
            <div>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">Calculateur Cinématique d'Atelier</h2>
              <p className="text-xs text-slate-400 font-mono">Formule fondamentale : n = (1000 · Vc) / (π · d)</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm dark:shadow-xl">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Matière usinée</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-xs font-mono text-slate-800 dark:text-slate-200"
                >
                  <option value="k720">Acier Böhler K720 (90MnCrV8)</option>
                  <option value="laiton">Laiton horloger MS 58 (CuZn39Pb3)</option>
                  <option value="inox">Inox horloger 316L (1.4435)</option>
                  <option value="polycarbonate">Polycarbonate / POM</option>
                  <option value="aluminium">Aluminium Dural</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Nuance de l'Outil</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setToolMaterial('hss')}
                    className={`p-2.5 rounded-lg text-xs font-mono font-bold border transition-all ${toolMaterial === 'hss' ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40 shadow-sm' : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
                  >
                    Acier Rapide (HSS)
                  </button>
                  <button
                    onClick={() => setToolMaterial('carbide')}
                    className={`p-2.5 rounded-lg text-xs font-mono font-bold border transition-all ${toolMaterial === 'carbide' ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40 shadow-sm' : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}
                  >
                    Carbure de Tungstène
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400 uppercase">Diamètre usiné (d) :</span>
                  <span className="text-amber-400 font-bold">{diameter.toFixed(1)} mm</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="12.0"
                  step="0.1"
                  value={diameter}
                  onChange={(e) => setDiameter(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                <span className="text-amber-400 font-bold block mb-1">Lubrification recommandée :</span>
                {currentMat.lub}
              </div>
            </div>

            {/* Calculated Result Display */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-inner">
              <div>
                <span className="text-xs font-mono uppercase text-slate-500 block">Vitesse de coupe admise (Vc)</span>
                <span className="text-2xl font-mono font-bold text-amber-400">{activeVc} m/min</span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-slate-500 block">Fréquence de rotation théorique</span>
                <div className="text-4xl font-mono font-bold text-emerald-400 tracking-wider">
                  {calculatedRpm.toLocaleString()} <span className="text-sm font-sans text-slate-400">tr/min</span>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-3">
                Réglage Schaublin 70 conseillé :
                <span className="text-amber-300 font-bold ml-2">
                  {calculatedRpm > 2500 ? "Broche max (2'400 tr/min)" : calculatedRpm < 400 ? "400 tr/min (Poulie lente)" : `~${Math.round(calculatedRpm / 100) * 100} tr/min`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03B : Taraudage NIHS & Affûtage Tournevis */}
        <section id="taraudage-nihs" className="scroll-mt-28 space-y-6">
          <TappingBenchSimulator />
        </section>

        {/* Section 03C : Polissage Boîtier & Contrôle Optique à la Mire */}
        <section id="polissage-mire" className="scroll-mt-28 space-y-6">
          <PolishingBenchSimulator />
        </section>

        {/* Section 04 : Les 5 Projets d'Usinage d'Atelier */}
        <section id="projets" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">04</span>
            <div>
              <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">Les 5 Pièces de Fabrication d'Atelier Horloger</h2>
              <p className="text-xs text-slate-400 font-mono">Curriculum complet d'apprentissage du tournage horloger de précision</p>
            </div>
          </div>

          {/* Project Tabs */}
          <div className="flex flex-wrap gap-2">
            {projects.map((p) => (
              <button
                key={p.num}
                onClick={() => setActiveProject(p.num)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${activeProject === p.num ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40 shadow-sm' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              >
                P{p.num} · {p.title}
              </button>
            ))}
          </div>

          {/* Project Detail Card */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {curProject.code}
                </span>
                <h3 className="text-xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">{curProject.title}</h3>
              </div>
              <div className="text-xs font-mono text-right">
                <span className="text-slate-400 block">Matière : <strong className="text-slate-800 dark:text-slate-200">{curProject.material}</strong></span>
                <span className="text-slate-400 block">Traitement : <strong className="text-rose-400">{curProject.treatment}</strong></span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              {curProject.desc}
            </p>

            {/* Render Technical Drawing SVG */}
            <div>
              {curProject.renderSvg()}
            </div>

            {/* Machining Steps */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Protocole d'Usinage Étape par Étape :
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-700 dark:text-slate-300">
                {curProject.steps.map((st, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 flex items-start gap-2 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 05 : Quiz d'Évaluation Pratique Stepper Compact */}
        <section id="quiz-compact" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">05</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">Quiz d'Évaluation Pratique · Micromécanique & Tournage</h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                  10 Questions
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Validation des connaissances théoriques et gestes d'atelier</p>
            </div>
          </div>

          {/* Compact Stepper Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl space-y-6">
            
            {/* Top Stepper Header with Progress Dots */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Question <strong className="text-amber-400 text-sm">{currentQuestionIdx + 1}</strong> / 10
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-mono text-slate-400">
                  Score actuel : <strong className="text-emerald-400">{score}</strong> / {Object.keys(userAnswers).length}
                </span>
              </div>

              {/* 10 Interactive Progress Dots */}
              <div className="flex items-center gap-1.5">
                {quizQuestions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCorrect = userAnswers[idx] === quizQuestions[idx].answer;
                  const isCurrent = idx === currentQuestionIdx;

                  let dotClass = "w-6 h-6 rounded-lg text-[10px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ";
                  if (isCurrent) {
                    dotClass += "ring-2 ring-amber-400 ";
                  }
                  if (isAnswered) {
                    dotClass += isCorrect ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-rose-500/20 text-rose-400 border border-rose-500/40";
                  } else {
                    dotClass += "bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={dotClass}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Body Area */}
            <div className="space-y-4 min-h-[180px]">
              <h3 className="text-base sm:text-lg font-sans font-bold tracking-tight text-slate-900 dark:text-white leading-relaxed">
                {curQ.q}
              </h3>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curQ.options.map((opt, oIdx) => {
                  let btnStyle = "p-3.5 rounded-xl border text-xs font-mono text-left transition-all ";
                  
                  if (!isCurAnswered) {
                    btnStyle += "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-amber-500/40 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300";
                  } else {
                    if (oIdx === curQ.answer) {
                      btnStyle += "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold";
                    } else if (userAnswers[currentQuestionIdx] === oIdx) {
                      btnStyle += "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300";
                    } else {
                      btnStyle += "bg-slate-100/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-900 text-slate-400 dark:text-slate-600 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isCurAnswered}
                      onClick={() => handleAnswer(oIdx)}
                      className={btnStyle}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-[10px] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Feedback Box */}
              {isCurAnswered && (
                <div className={`p-4 rounded-xl text-xs font-mono border ${userAnswers[currentQuestionIdx] === curQ.answer ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-300' : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-500/30 text-rose-900 dark:text-rose-300'}`}>
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {userAnswers[currentQuestionIdx] === curQ.answer ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>JUSTE ! Explication technique :</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>INCORRECT. Explication technique :</span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-sans text-xs leading-relaxed">
                    {curQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons (Précédente / Suivante) */}
            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(i => Math.max(0, i - 1))}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs flex items-center gap-1.5 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédente
              </button>

              {currentQuestionIdx < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx(i => Math.min(quizQuestions.length - 1, i + 1))}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
                >
                  Suivante
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowResultModal(true)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Voir le Bilan Final
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Score Summary Modal */}
            {showResultModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="max-w-md w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-center shadow-2xl">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-sans font-bold tracking-tight text-slate-900 dark:text-white">Bilan de l'Évaluation Pratique</h3>
                  
                  <div className="text-4xl font-mono font-bold text-amber-400">
                    {score} <span className="text-lg text-slate-500">/ 10</span>
                  </div>

                  <p className="text-xs font-sans text-slate-600 dark:text-slate-300 leading-relaxed">
                    {score >= 8 
                      ? "Excellente maîtrise des fondamentaux du tournage Schaublin 70 et de la métallurgie horlogère." 
                      : score >= 5 
                      ? "Bonnes notions d'ensemble. Révisez les schémas de centrage et les angles de dépouille." 
                      : "Reprenez attentivement les 5 modules théoriques et schémas d'atelier."}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setUserAnswers({});
                        setCurrentQuestionIdx(0);
                        setShowResultModal(false);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-mono text-xs font-bold border border-slate-300 dark:border-transparent transition-all"
                    >
                      Recommencer
                    </button>
                    <button
                      onClick={() => setShowResultModal(false)}
                      className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all"
                    >
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-8 px-4 text-center text-xs font-mono text-slate-500">
        HorloLearn · Haute Horlogerie Suisse · Référentiel Technique & Pratique de Micromécanique Horlogère
      </footer>

    </div>
  );
}
