'use client';

import React, { useState, useEffect } from 'react';
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

  // --- 3. 5 IFAGE Projects State ---
  const [activeProject, setActiveProject] = useState<number>(1);

  const projects = [
    {
      num: 1,
      code: "IFAG-98110-001-F1-A",
      title: "Pointeau d'Horloger (Centreur)",
      material: "Acier au Carbone Böhler K720 Ø 4.5 mm x 80 mm",
      treatment: "Trempe à l'huile + Revenu Bleu à 290°C (~56 HRC)",
      desc: "Outil fondamental servant à marquer le centre des futurs perçages sur platines sans déraper. Comprend le moletage croisé, le méplat de frappe des initiales (4x5 mm) et la pointe conique à 60° (tolérance pointe Ø 2.3 ± 100 μm).",
      renderSvg: () => (
        <svg viewBox="0 0 750 200" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-800 font-mono">
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
      code: "IFAG-98100-001-F1-A",
      title: "Pointe à Tracer d'Atelier",
      material: "Acier au Carbone Böhler K720 Ø 3.0 mm x 130 mm",
      treatment: "Trempe pointe + Revenu Bleu à 290°C",
      desc: "Outil de traçage de haute précision comportant un cône effilé long de 25 mm à angle aigu de 28°, un moletage de préhension de 76 mm, et deux gorges de dégagement de 1.0 mm.",
      renderSvg: () => (
        <svg viewBox="0 0 750 160" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-800 font-mono">
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
      code: "IFAG-98200-001 & 003",
      title: "Pousse-Aiguille Horloger (Alésé)",
      material: "Polycarbonate technique Ø 5.0 mm x 100 mm",
      treatment: "Polymère auto-lubrifiant (aucun traitement thermique)",
      desc: "Outil d'emboîtage doux permettant de chasser les aiguilles de montre sans rayer le vernis ni la luminescence.",
      renderSvg: () => (
        <svg viewBox="0 0 750 160" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-800 font-mono">
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
      code: "IFAG-98210-001",
      title: "Cheville Plastique d'Établi à Fente",
      material: "Polycarbonate transparent Ø 5.0 mm x 100 mm",
      treatment: "Polissage d'établi soigné",
      desc: "Outil multifonction servant à vérifier les ébats de rouage et nettoyer les pignons sans marquer les ponts anglés.",
      renderSvg: () => (
        <svg viewBox="0 0 750 150" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-800 font-mono">
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
      code: "IFAG-98050-001-F1-A",
      title: "Enclume - Bloc 6497 (ETA / Unitas)",
      material: "Laiton de décolletage CuZn39Pb3 (MS 58) Ø 7.9 mm x 11.5 mm",
      treatment: "Finition Poli Glacé N5 sur faces d'appui",
      desc: "S'insère dans le bloc d'emboîtage pour soutenir la platine lors du chassage des fournitures sans déformer les ponts.",
      renderSvg: () => (
        <svg viewBox="0 0 750 180" className="w-full h-auto blueprint-bg rounded-xl p-3 border border-slate-800 font-mono">
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
      q: "Quel est l'angle de pointe d'extrémité du pointeau d'horloger (Plan IFAG-98110-001) ?",
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
    <div className="min-h-screen bg-[#080C15] text-slate-200 antialiased selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* Blueprint Grid Styles */}
      <style jsx global>{`
        .blueprint-bg {
          background-color: #0c1220;
          background-image: 
            linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        @keyframes spinClockwise { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spinCounterClockwise { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        .lathe-spin-cw { animation: spinClockwise 1.2s linear infinite; }
        .lathe-spin-ccw { animation: spinCounterClockwise 1.2s linear infinite; }
      `}</style>

      {/* Top Banner */}
      <div className="bg-[#0c1322] border-b border-slate-800 py-3 px-4 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link href="/pratique" className="text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Modules Pratiques</span>
          </Link>
          <span className="text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            IFAGE Genève · Module 2 · Micromécanique Horlogère (Schaublin 70)
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#10192e] to-[#080C15] p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono uppercase tracking-widest inline-flex items-center gap-2 mb-4">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Atelier d'Usinage Horloger de Précision
              </span>
              <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-white leading-tight">
                La Pratique Rigoureuse du Tournage <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                  Micromécanique Horlogère
                </span>
              </h1>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Programme officiel inspiré du curriculum <strong>IFAGE Genève</strong>. Maîtrisez le <strong>Tour d'outilleur Schaublin 70</strong>, les <strong>gestes d'établi réels</strong> au centième de millimètre, le traitement thermique de l'acier <strong>Böhler K720</strong>, et l'usinage des 5 pièces maîtresses.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase block">Hauteur de centre</span>
                  <span className="text-amber-300 font-bold text-sm">70.00 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase block">Pinces Schaublin</span>
                  <span className="text-cyan-300 font-bold text-sm">Type W-12</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase block">Précision tambour</span>
                  <span className="text-emerald-300 font-bold text-sm">0.01 mm</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase block">Acier d'outillage</span>
                  <span className="text-rose-300 font-bold text-sm">Böhler K720</span>
                </div>
              </div>
            </div>

            {/* Quick Lathe Console Simulator */}
            <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  Pupitre Schaublin 70 Mi-CF
                </span>
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono border ${latheRunning ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {latheRunning ? 'BROCHE EN ROTATION' : 'BROCHE ARRÊTÉE'}
                </span>
              </div>

              {/* Digital Tachometer & Chuck Visual */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
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
                <div className="flex justify-between text-xs font-mono text-slate-400">
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
                  className="py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs font-bold border border-slate-700 transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {direction === 'ccw' ? 'SENS CCW' : 'SENS CW'}
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-500 text-center">
                Sens standard d'usinage horloger : <strong>Anti-horaire (CCW)</strong> vers l'opérateur.
              </div>
            </div>
          </div>
        </div>

        {/* Section 01 : Le Tour Schaublin 70 & Photo Réelle d'Atelier */}
        <section id="machine" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">01</span>
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-white">Le Tour d'Outilleur Schaublin 70 en Atelier</h2>
              <p className="text-xs text-slate-400 font-mono">Banc prismatique rectifié, poupée porte-broche W-12 et éventail d'horloger</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Real Workshop Photo 1 */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl group">
              <img
                src="/images/micromecanique/schaublin_tournage_main.jpg"
                alt="Tour Schaublin 70 en action dans l'atelier d'horlogerie"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className="text-amber-300 font-bold">Atelier d'Horlogerie · Tour Schaublin 70</span>
                <span className="text-slate-300 text-[11px]">Pinces W-12 · Éventail en laiton</span>
              </div>
            </div>

            {/* Explanatory Cards */}
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold block text-sm mb-2">1. Poupée Porte-Broche W-12</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Broche trempée et rectifiée. Alésage utile 12 mm avec passage de barre continu utile maximal de <strong>Ø 8.2 mm</strong>. Vitesse de démarrage conseillée : 800 tr/min en sens anti-horaire.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold block text-sm mb-2">2. Chariot Croisé & Tambours 0.01 mm</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Coulisse longitudinale (60 mm) et transversale (65 mm). Tambours micrométriques avec lecture directe au <strong>0.01 mm</strong> (un centième de millimètre) par division. Chariot supérieur orientable à 360°.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm mb-2">3. Contre-Poupée Mobile</span>
                <p className="text-slate-300 font-sans text-xs leading-relaxed">
                  Course de fourreau de 45 mm, alésage intérieur cône Schaublin 2°. Reçoit la pointe fixe trempée à 60° pour le centrage absolu et le mandrin de perçage miniature Albrecht.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 : Schémas & Gestes Normalisés IFAGE */}
        <section id="gestes-techniques" className="space-y-8">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">02</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-cinzel font-bold text-white">Schémas Techniques & Gestes Normalisés IFAGE</h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold uppercase">
                  Dessins Techniques Précis
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Figures officielles de l'École d'Horlogerie de Genève (Source Mr Guillermet / IFAGE)</p>
            </div>
          </div>

          {/* Blueprint 1 : Burin à main sur éventail (Page 24 IFAGE) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  FIGURE 1 (D'après Page 24 IFAGE)
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white">Positionnement du Burin à Main sur l'Éventail</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Tournage manuel de pivots et axes de balancier
              </div>
            </div>

            {/* Exact SVG Blueprint 1 */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 blueprint-bg p-4">
              <svg viewBox="0 0 900 360" className="w-full min-w-[700px] h-auto select-none font-mono">
                <defs>
                  <linearGradient id="cylinderGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#475569"/>
                    <stop offset="35%" stopColor="#94A3B8"/>
                    <stop offset="70%" stopColor="#334155"/>
                    <stop offset="100%" stopColor="#1E293B"/>
                  </linearGradient>
                  <linearGradient id="tRestGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#B45309"/>
                    <stop offset="50%" stopColor="#D97706"/>
                    <stop offset="100%" stopColor="#78350F"/>
                  </linearGradient>
                  <linearGradient id="graverGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#64748B"/>
                    <stop offset="50%" stopColor="#CBD5E1"/>
                    <stop offset="100%" stopColor="#334155"/>
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8"/>
                  </marker>
                  <marker id="arrowAmber" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B"/>
                  </marker>
                </defs>

                {/* Grid is supplied by CSS blueprint-bg */}

                {/* Turned Cylinder */}
                <g id="workpiece">
                  <path d="M 80 180 C 80 130, 200 130, 200 180 C 200 230, 80 230, 80 180 Z" fill="url(#cylinderGrad)" stroke="#CBD5E1" strokeWidth="2"/>
                  <path d="M 80 130 L 320 130 L 320 230 L 80 230 Z" fill="url(#cylinderGrad)" opacity="0.95"/>
                  <path d="M 320 180 C 320 130, 440 130, 440 180 C 440 230, 320 230, 320 180 Z" fill="#64748B" stroke="#F1F5F9" strokeWidth="2"/>
                  
                  {/* Center Line Axis */}
                  <line x1="40" y1="180" x2="480" y2="180" stroke="#F59E0B" strokeDasharray="12,4,2,4" strokeWidth="1.5"/>
                  <text x="50" y="172" fill="#F59E0B" fontSize="11" fontWeight="bold">AXE DE CENTRE (H = 70.00 mm)</text>
                  
                  {/* Rotation Indicator */}
                  <path d="M 430 145 A 40 40 0 0 0 430 215" fill="none" stroke="#F59E0B" strokeWidth="2.5" markerEnd="url(#arrowAmber)"/>
                  <text x="445" y="210" fill="#F59E0B" fontSize="11" fontWeight="bold">SENS COUPE (CCW)</text>
                </g>

                {/* T-Rest (Éventail d'appui) */}
                <g id="t-rest">
                  <path d="M 280 220 L 410 220 L 410 235 L 360 250 L 360 330 L 330 330 L 330 250 L 280 235 Z" fill="url(#tRestGrad)" stroke="#FEF08A" strokeWidth="1.5"/>
                  <circle cx="345" cy="227" r="2.5" fill="#FEF08A"/>
                  <text x="345" y="348" fill="#FCD34D" fontSize="11" textAnchor="middle" fontWeight="bold">ÉVENTAIL (T-REST) LAITON</text>
                  {/* Clearance dimension between rest and workpiece */}
                  <line x1="320" y1="210" x2="280" y2="210" stroke="#38BDF8" strokeWidth="1.2" markerStart="url(#arrow)" markerEnd="url(#arrow)"/>
                  <text x="300" y="202" fill="#38BDF8" fontSize="10" textAnchor="middle">d &lt; 1 mm</text>
                </g>

                {/* Watchmaker Square Graver (Burin Carré 80°) */}
                <g id="graver" transform="rotate(-6, 320, 180)">
                  {/* Graver Shank */}
                  <polygon points="320,180 560,250 545,280 305,210" fill="url(#graverGrad)" stroke="#E2E8F0" strokeWidth="2"/>
                  {/* Lozenge Face (Face de coupe en losange) */}
                  <polygon points="320,180 338,162 356,192 338,210" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.5"/>
                  
                  {/* Contact point highlight */}
                  <circle cx="320" cy="180" r="4" fill="#EF4444" stroke="#FFF" strokeWidth="1.5"/>
                  <text x="315" y="160" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="end">POINT D'ATTAQUE EXACT</text>

                  {/* Curled Silk Chip (Copeau de soie d'horloger) */}
                  <path d="M 322 178 Q 315 155 330 145 T 350 150 T 345 130 T 365 125" fill="none" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round"/>
                  <text x="375" y="130" fill="#FCD34D" fontSize="11" fontWeight="bold">COPEAU DE SOIE (CONTINU)</text>
                </g>

                {/* ISO Dimension Lines & Technical Annotations */}
                <g id="dimensions">
                  {/* Tangent Line */}
                  <line x1="320" y1="110" x2="320" y2="250" stroke="#38BDF8" strokeDasharray="6,4" strokeWidth="1.2"/>
                  <text x="325" y="120" fill="#38BDF8" fontSize="10">TANGENTE VERTICALE</text>
                  
                  {/* 90°-95° Graver Inclination Angle Arc */}
                  <path d="M 320 230 A 50 50 0 0 0 355 220" fill="none" stroke="#38BDF8" strokeWidth="1.5" markerEnd="url(#arrow)"/>
                  <text x="365" y="240" fill="#38BDF8" fontSize="11" fontWeight="bold">ANGLE D'ATTAQUE 90° - 95°</text>

                  {/* Callout Box */}
                  <rect x="580" y="40" width="290" height="150" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="1.5"/>
                  <text x="600" y="65" fill="#FCD34D" fontSize="12" fontWeight="bold">RÈGLES D'OR DU TOURNAGE À MAIN :</text>
                  <text x="600" y="90" fill="#CBD5E1" fontSize="11">• Burin fermement appuyé sur l'éventail</text>
                  <text x="600" y="112" fill="#CBD5E1" fontSize="11">• Arête coupante rigoureusement à l'axe</text>
                  <text x="600" y="134" fill="#CBD5E1" fontSize="11">• Éventail réglé au plus près (&lt; 1 mm)</text>
                  <text x="600" y="156" fill="#38BDF8" fontSize="11">• Formation d'un ruban continu sans choc</text>
                  <text x="600" y="178" fill="#94A3B8" fontSize="10">Source : IFAGE Genève (Prog. Officiel Horlogerie)</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Blueprint 2 : Burin couteau sur chariot croisé (Page 21 IFAGE) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                  FIGURE 2 (D'après Page 21 IFAGE · Mr Guillermet)
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white">Utilisation du Burin Couteau sur Chariot Croisé</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Chariotage longitudinal & Dressage de face au centième (0.01 mm)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Real Workshop Photo 2 */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
                <img
                  src="/images/micromecanique/schaublin_chariot_croise.jpg"
                  alt="Chariot croisé Schaublin 70 avec burin et tambour micrométrique au centième"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 font-bold">Chariot Croisé Schaublin 70</span>
                  <span className="text-slate-300 text-[11px]">Tambour 0.01 mm · Outil couteau</span>
                </div>
              </div>

              {/* Exact SVG Blueprint 2 */}
              <div className="lg:col-span-7 overflow-x-auto rounded-2xl border border-slate-800 blueprint-bg p-4">
                <svg viewBox="0 0 650 360" className="w-full min-w-[550px] h-auto select-none font-mono">
                  {/* Lathe Bed Profile (Profil du Banc Schaublin 70) */}
                  <path d="M 60 300 L 590 300 L 550 340 L 100 340 Z" fill="#334155" stroke="#94A3B8" strokeWidth="2"/>
                  <line x1="60" y1="300" x2="590" y2="300" stroke="#CBD5E1" strokeWidth="3"/>
                  <text x="325" y="325" fill="#E2E8F0" fontSize="11" textAnchor="middle" fontWeight="bold">BANC DU TOUR SCHAUBLIN 70</text>

                  {/* 70.00 mm Centerline Height Dimension */}
                  <line x1="50" y1="300" x2="50" y2="100" stroke="#F59E0B" strokeWidth="2" markerStart="url(#arrowAmber)" markerEnd="url(#arrowAmber)"/>
                  <line x1="40" y1="300" x2="60" y2="300" stroke="#F59E0B" strokeWidth="1.5"/>
                  <line x1="40" y1="100" x2="350" y2="100" stroke="#F59E0B" strokeDasharray="8,4" strokeWidth="1.5"/>
                  <rect x="42" y="185" width="95" height="30" rx="6" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5"/>
                  <text x="90" y="205" fill="#FCD34D" fontSize="12" fontWeight="bold" textAnchor="middle">H = 70.00 mm</text>

                  {/* Turned Cylindrical Bar held in Collet */}
                  <rect x="150" y="60" width="220" height="80" rx="3" fill="#475569" stroke="#E2E8F0" strokeWidth="2"/>
                  <circle cx="150" cy="100" r="40" fill="#334155" stroke="#E2E8F0" strokeWidth="2"/>
                  <circle cx="150" cy="100" r="15" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5"/>
                  <text x="260" y="90" fill="#F8FAFC" fontSize="12" fontWeight="bold">PIÈCE BRUTE</text>
                  <text x="260" y="115" fill="#94A3B8" fontSize="10">Ø 4.5 mm (Böhler K720)</text>

                  {/* Cross-slide Top Table & Toolpost */}
                  <rect x="340" y="220" width="180" height="80" fill="#1E293B" stroke="#64748B" strokeWidth="2"/>
                  <rect x="360" y="150" width="100" height="70" fill="#334155" stroke="#94A3B8" strokeWidth="2"/>
                  <circle cx="410" cy="185" r="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5"/>
                  <text x="410" y="189" fill="#FCD34D" fontSize="9" textAnchor="middle">PORTE-OUTIL</text>

                  {/* Knife Tool (Burin Couteau 5x5 mm) Mounted at H=70mm */}
                  <polygon points="370,100 480,115 480,145 370,130" fill="#2563EB" stroke="#60A5FA" strokeWidth="2"/>
                  {/* Active Cutting Tip (Sharp at 70.00 mm) */}
                  <polygon points="350,100 370,100 370,125 355,120" fill="#38BDF8" stroke="#F8FAFC" strokeWidth="1.5"/>
                  <circle cx="350" cy="100" r="3.5" fill="#EF4444"/>

                  {/* Feed Directions Vectors */}
                  {/* Longitudinal Feed Z (Chariotage) */}
                  <line x1="330" y1="45" x2="220" y2="45" stroke="#34D399" strokeWidth="2.5" markerEnd="url(#arrow)"/>
                  <text x="275" y="38" fill="#34D399" fontSize="11" fontWeight="bold" textAnchor="middle">AVANCE AXIALE Z (Chariotage)</text>

                  {/* Transverse Facing Feed X (Dressage) */}
                  <line x1="380" y1="80" x2="350" y2="100" stroke="#F43F5E" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <text x="440" y="85" fill="#F43F5E" fontSize="10" fontWeight="bold">DRESSAGE (Face)</text>

                  {/* Clearance Angle Note (Dépouille 6°) */}
                  <rect x="350" y="10" width="250" height="50" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
                  <text x="360" y="28" fill="#FCD34D" fontSize="10" fontWeight="bold">DÉPOUILLE LATÉRALE & FRONTALE :</text>
                  <text x="360" y="44" fill="#38BDF8" fontSize="11">α₁ = 6° · α₂ = 6° (Pierre d'Arkansas)</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Blueprint 3 : Centrage JUSTE vs TROP HAUT vs TROP BAS (Page 18 IFAGE) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  FIGURE 3 (D'après Page 18 IFAGE)
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white">Centrage du Burin : JUSTE vs TROP HAUT vs TROP BAS</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Loi cinématique fondamentale du taillant en micromécanique
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Condition 1: JUSTE (70.00 mm) */}
              <div className="p-4 rounded-2xl bg-slate-950 border-2 border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    1. HAUTEUR JUSTE (70.00 mm)
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <svg viewBox="0 0 240 160" className="w-full h-auto my-2 select-none font-mono">
                  <circle cx="80" cy="80" r="45" fill="#334155" stroke="#94A3B8" strokeWidth="1.5"/>
                  <line x1="20" y1="80" x2="220" y2="80" stroke="#F59E0B" strokeDasharray="6,3" strokeWidth="1"/>
                  <polygon points="125,80 200,95 200,115 125,100" fill="#10B981" stroke="#34D399" strokeWidth="1.5"/>
                  <circle cx="125" cy="80" r="3" fill="#FFF"/>
                  <path d="M 125 100 A 30 30 0 0 0 125 80" fill="none" stroke="#38BDF8" strokeWidth="1.5"/>
                  <text x="145" y="95" fill="#38BDF8" fontSize="10">α = 6°</text>
                  <text x="120" y="45" fill="#34D399" fontSize="11" fontWeight="bold">ARÊTE EXACTE</text>
                </svg>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  L'arête se situe exactement sur l'axe horizontal. L'angle de dépouille réel est conservé. Coupe douce, état de surface N5 et absence de téton au centre.
                </p>
              </div>

              {/* Condition 2: TROP HAUT */}
              <div className="p-4 rounded-2xl bg-slate-950 border-2 border-rose-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    2. BURIN TROP HAUT
                  </span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <svg viewBox="0 0 240 160" className="w-full h-auto my-2 select-none font-mono">
                  <circle cx="80" cy="80" r="45" fill="#334155" stroke="#94A3B8" strokeWidth="1.5"/>
                  <line x1="20" y1="80" x2="220" y2="80" stroke="#F59E0B" strokeDasharray="6,3" strokeWidth="1"/>
                  <polygon points="115,55 190,70 190,90 115,75" fill="#EF4444" stroke="#F87171" strokeWidth="1.5"/>
                  <circle cx="115" cy="55" r="3" fill="#FFF"/>
                  <line x1="115" y1="55" x2="115" y2="75" stroke="#EF4444" strokeWidth="2"/>
                  <text x="120" y="40" fill="#EF4444" fontSize="10" fontWeight="bold">TALONNAGE</text>
                  <text x="140" y="70" fill="#F87171" fontSize="9">α effectif ≤ 0°</text>
                </svg>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  L'angle de dépouille s'annule : le dos du burin talonne violemment contre la pièce. Refoulement de métal sans coupe et création d'un gros téton central lors du dressage.
                </p>
              </div>

              {/* Condition 3: TROP BAS */}
              <div className="p-4 rounded-2xl bg-slate-950 border-2 border-amber-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    3. BURIN TROP BAS
                  </span>
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                </div>
                <svg viewBox="0 0 240 160" className="w-full h-auto my-2 select-none font-mono">
                  <circle cx="80" cy="80" r="45" fill="#334155" stroke="#94A3B8" strokeWidth="1.5"/>
                  <line x1="20" y1="80" x2="220" y2="80" stroke="#F59E0B" strokeDasharray="6,3" strokeWidth="1"/>
                  <polygon points="115,105 190,120 190,140 115,125" fill="#F59E0B" stroke="#FCD34D" strokeWidth="1.5"/>
                  <circle cx="115" cy="105" r="3" fill="#FFF"/>
                  <text x="120" y="145" fill="#F59E0B" fontSize="10" fontWeight="bold">PLONGÉE &amp; BROUTEMENT</text>
                  <text x="140" y="100" fill="#FCD34D" fontSize="9">Coupe agressive</text>
                </svg>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  L'angle de coupe effectif devient trop aigu : le burin a tendance à plonger sous la pièce, provoquant flexion, vibrations destructrices (broutement) et casse du taillant.
                </p>
              </div>
            </div>
          </div>

          {/* Section Traitement Thermique & Photo Réelle 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
                  MÉTALLURGIE D'ATELIER (Acier Böhler K720)
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white">Chauffe au Chalumeau & Trempe Martensitique</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Protocole pour Pointeau (IFAG-98110) et Pointe à Tracer (IFAG-98100)
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Real Macro Photograph of Heat Treatment 3 */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-slate-700 shadow-xl group">
                <img
                  src="/images/micromecanique/watchmaker_heat_treatment.jpg"
                  alt="Chauffe au chalumeau d'un pointeau d'horloger au rouge cerise avec bain d'huile et plateau à bleuir"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-rose-300 font-bold">Chauffe au Chalumeau (800°C)</span>
                  <span className="text-slate-300 text-[11px]">Huile & Plaque à bleuir</span>
                </div>
              </div>

              {/* Heat Tint Color Palette and Technical Steps */}
              <div className="lg:col-span-7 space-y-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-amber-400 font-bold block text-xs">
                    NUANCIER DES COULEURS DE REVENU DE L'ACIER AU CARBONE (K720)
                  </span>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-yellow-950/40 border border-yellow-600/30">
                      <span className="text-yellow-400 font-bold block">220°C · Jaune Paille</span>
                      <span className="text-slate-400 text-[10px]">Burins, lames de rasoir</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-950/40 border border-amber-600/30">
                      <span className="text-amber-400 font-bold block">250°C · Brun-Ocre</span>
                      <span className="text-slate-400 text-[10px]">Ciseaux, poinçons</span>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-600/30">
                      <span className="text-purple-400 font-bold block">270°C · Pourpre-Violet</span>
                      <span className="text-slate-400 text-[10px]">Tarauds, forets fins</span>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-950/60 border-2 border-cyan-400">
                      <span className="text-cyan-300 font-bold block">290°C · Bleu Horloger</span>
                      <span className="text-slate-300 text-[10px] font-bold">Pointeaux (56 HRC)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-sky-950/40 border border-sky-600/30">
                      <span className="text-sky-400 font-bold block">310°C · Bleu Clair</span>
                      <span className="text-slate-400 text-[10px]">Ressorts d'horlogerie</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700">
                      <span className="text-slate-300 font-bold block">330°C · Gris Cendre</span>
                      <span className="text-slate-400 text-[10px]">Perte de trempe</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <span className="text-rose-400 font-bold block text-xs">
                    LES 3 PHASES DE TREMPE D'ATELIER IFAGE :
                  </span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-300 font-sans text-xs">
                    <li><strong>Austénitisation :</strong> Chauffer la pointe à 790°C-820°C (couleur rouge cerise) au chalumeau sans surchauffer le corps.</li>
                    <li><strong>Trempe à l'huile :</strong> Immersion 100% verticale dans l'huile minérale pour éviter le voile de l'axe.</li>
                    <li><strong>Revenu bleu :</strong> Blanchir à la pierre d'Arkansas puis chauffer sur la plaque à bleuir en laiton jusqu'au bleu franc (290°C).</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 03 : Calculateur Cinématique Vc */}
        <section id="cinematique" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">03</span>
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-white">Calculateur Cinématique d'Atelier</h2>
              <p className="text-xs text-slate-400 font-mono">Formule fondamentale : n = (1000 · Vc) / (π · d)</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div>
                <label className="text-xs font-mono uppercase text-slate-400 block mb-1">Matière usinée</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs font-mono text-slate-200"
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
                    className={`p-2.5 rounded-lg text-xs font-mono font-bold border transition-all ${toolMaterial === 'hss' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                  >
                    Acier Rapide (HSS)
                  </button>
                  <button
                    onClick={() => setToolMaterial('carbide')}
                    className={`p-2.5 rounded-lg text-xs font-mono font-bold border transition-all ${toolMaterial === 'carbide' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
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

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                <span className="text-amber-400 font-bold block mb-1">Lubrification recommandée :</span>
                {currentMat.lub}
              </div>
            </div>

            {/* Calculated Result Display */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4">
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

              <div className="text-xs font-mono text-slate-400 border-t border-slate-800 pt-3">
                Réglage Schaublin 70 conseillé :
                <span className="text-amber-300 font-bold ml-2">
                  {calculatedRpm > 2500 ? "Broche max (2'400 tr/min)" : calculatedRpm < 400 ? "400 tr/min (Poulie lente)" : `~${Math.round(calculatedRpm / 100) * 100} tr/min`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 : Les 5 Projets d'Usinage IFAGE */}
        <section id="projets" className="space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">04</span>
            <div>
              <h2 className="text-2xl font-cinzel font-bold text-white">Les 5 Pièces de Fabrication d'Atelier (Plans IFAGE)</h2>
              <p className="text-xs text-slate-400 font-mono">Curriculum complet d'apprentissage du tournage horloger de précision</p>
            </div>
          </div>

          {/* Project Tabs */}
          <div className="flex flex-wrap gap-2">
            {projects.map((p) => (
              <button
                key={p.num}
                onClick={() => setActiveProject(p.num)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${activeProject === p.num ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
              >
                P{p.num} · {p.title}
              </button>
            ))}
          </div>

          {/* Project Detail Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {curProject.code}
                </span>
                <h3 className="text-xl font-cinzel font-bold text-white">{curProject.title}</h3>
              </div>
              <div className="text-xs font-mono text-right">
                <span className="text-slate-400 block">Matière : <strong className="text-slate-200">{curProject.material}</strong></span>
                <span className="text-slate-400 block">Traitement : <strong className="text-rose-400">{curProject.treatment}</strong></span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed">
              {curProject.desc}
            </p>

            {/* Render Technical Drawing SVG */}
            <div>
              {curProject.renderSvg()}
            </div>

            {/* Machining Steps */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                Protocole d'Usinage Étape par Étape :
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                {curProject.steps.map((st, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-2">
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
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold flex items-center justify-center border border-amber-500/30">05</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-cinzel font-bold text-white">Quiz d'Évaluation Pratique · Type IFAGE</h2>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                  10 Questions
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Validation des connaissances théoriques et gestes d'atelier</p>
            </div>
          </div>

          {/* Compact Stepper Container */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
            
            {/* Top Stepper Header with Progress Dots */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
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
                    dotClass += "bg-slate-950 text-slate-500 border border-slate-800 hover:border-slate-700";
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
              <h3 className="text-base sm:text-lg font-cinzel font-bold text-white leading-relaxed">
                {curQ.q}
              </h3>

              {/* 4 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {curQ.options.map((opt, oIdx) => {
                  let btnStyle = "p-3.5 rounded-xl border text-xs font-mono text-left transition-all ";
                  
                  if (!isCurAnswered) {
                    btnStyle += "bg-slate-950 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 text-slate-300";
                  } else {
                    if (oIdx === curQ.answer) {
                      btnStyle += "bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold";
                    } else if (userAnswers[currentQuestionIdx] === oIdx) {
                      btnStyle += "bg-rose-950/40 border-rose-500 text-rose-300";
                    } else {
                      btnStyle += "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60";
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
                        <span className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center text-[10px] text-slate-400 border border-slate-800">
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
                <div className={`p-4 rounded-xl text-xs font-mono border ${userAnswers[currentQuestionIdx] === curQ.answer ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border-rose-500/30 text-rose-300'}`}>
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
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {curQ.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Buttons (Précédente / Suivante) */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                disabled={currentQuestionIdx === 0}
                onClick={() => setCurrentQuestionIdx(i => Math.max(0, i - 1))}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs flex items-center gap-1.5 transition-all"
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
                <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
                    <Award className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-cinzel font-bold text-white">Bilan du Quiz IFAGE</h3>
                  
                  <div className="text-4xl font-mono font-bold text-amber-400">
                    {score} <span className="text-lg text-slate-500">/ 10</span>
                  </div>

                  <p className="text-xs font-sans text-slate-300 leading-relaxed">
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
                      className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-all"
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
      <footer className="mt-20 border-t border-slate-800 py-8 px-4 text-center text-xs font-mono text-slate-500">
        HorloLearn · Haute Horlogerie Suisse · Programme de Micromécanique inspiré du curriculum officiel IFAGE Genève
      </footer>

    </div>
  );
}
