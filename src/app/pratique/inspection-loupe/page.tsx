"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Sliders,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Crosshair,
  Sparkles,
  HelpCircle,
  Wrench,
  Droplet
} from "lucide-react";

interface DefectCase {
  id: string;
  title: string;
  subTitle: string;
  category: "pierre" | "pivot" | "huilage" | "echappement" | "vis" | "chrono";
  magnificationDefault: 20;
  defectCoords: { x: number; y: number }; // Percentage in SVG / view
  severity: "CRITIQUE" | "MAJEUR" | "RÉGLAGE";
  description: string;
  microscopicSigns: string[];
  witschiSymptom: string;
  repairProtocol: string;
  toolsNeeded: string[];
  swissStandard: string;
}

const DEFECT_CASES: DefectCase[] = [
  {
    id: "pierre-felee",
    title: "1. Pierre de Contre-Pivot Incabloc Fêlée",
    subTitle: "Rubis synthétique (Corindon Al₂O₃) fêlé sous l'antichoc de balancier",
    category: "pierre",
    magnificationDefault: 20,
    defectCoords: { x: 52, y: 48 },
    severity: "CRITIQUE",
    description: "À la suite d'un choc frontal violent, le contre-pivot de balancier a subi une fracture traversante en étoile. La face plane polie spéculaire est rompue.",
    microscopicSigns: [
      "Fissure sombre radiale traversant le centre de la pierre.",
      "Fuite capillaire immédiate : l'huile Moebius 9010 s'est vidée dans la chatonnière.",
      "Arêtes tranchantes de corindon menaçant le pivot d'acier."
    ],
    witschiSymptom: "Perte de 60° à 80° d'amplitude en position Cadran Haut (CH). Tracé Witschi instable avec bruits parasites de frottement sec.",
    repairProtocol: "Dégager le ressort Lyre Incabloc aux brucelles Dumont #3. Extraire le contre-pivot brisé, nettoyer la chatonnière à l'essence C / One-Dip. Chasser un contre-pivot neuf de hauteur calibrée. Huiler au micro-huilier 1A (Moebius 9010, couverture 60%).",
    toolsNeeded: ["Brucelles Dumont #3", "Micro-huilier Bergeon 1A", "Essence C (One-Dip)", "Moebius 9010"],
    swissStandard: "Norme NIHS 95-10 • Épaisseur de goutte 1/2 à 2/3 du contre-pivot"
  },
  {
    id: "pivot-marque",
    title: "2. Pivot de Balancier Marqué & Bleui",
    subTitle: "Arbre d'acier trempé (Ø 0.08 mm) rayé par frottement à sec",
    category: "pivot",
    magnificationDefault: 20,
    defectCoords: { x: 49, y: 53 },
    severity: "CRITIQUE",
    description: "Le garde-temps a fonctionné pendant des années sans huile. Les micro-poussières ont agi comme un abrasif, creusant une gorge annulaire sur la portée de pivotage.",
    microscopicSigns: [
      "Sillons circulaires mats et rayures longitudinales sur le pivot.",
      "Micro-bleuissement thermique par échauffement ponctuel.",
      "Rayon de raccordement (congé) abîmé, amorce de rupture."
    ],
    witschiSymptom: "Écart de marche supérieur à 35 s/jour entre positions plates et verticales. Amplitude effondrée sous 210° en 6H et 9H.",
    repairProtocol: "Deux solutions : 1. Reprise au tour à pivoter Jacot avec meule de carbure et huile rouge de brunissage (si la perte de diamètre reste < 0.01 mm). 2. Remplacement complet de l'axe de balancier sur potence à river Seitz.",
    toolsNeeded: ["Tour à pivoter Jacot", "Brunissoir carbure", "Potence à river", "Jauge de pivot"],
    swissStandard: "Tolérance cylindrique NIHS : Ø nominal ± 0.002 mm, rugosité Ra < 0.05 µm"
  },
  {
    id: "spiral-huile",
    title: "3. Huilage Excessif & Spires du Spiral Collées",
    subTitle: "Migration d'huile synthétique sur le spiral thermocompensé Nivarox",
    category: "huilage",
    magnificationDefault: 20,
    defectCoords: { x: 55, y: 44 },
    severity: "MAJEUR",
    description: "Une goutte d'huile trop volumineuse déposée sur le pont de balancier a débordé de la creusure et a touché les 2ème et 3ème spires extérieures du spiral.",
    microscopicSigns: [
      "Ménisque d'huile visqueuse reliant deux spires consécutives.",
      "Spires 2 et 3 restant soudées pendant l'oscillation.",
      "Déformation visuelle du centrage et du jeu entre goupilles de raquette."
    ],
    witschiSymptom: "Avance phénoménale : +2000 à +4500 secondes par jour ! (La montre prend près de 40 minutes d'avance par heure car la longueur active du spiral est raccourcie).",
    repairProtocol: "NE SURTOUT PAS frotter mécaniquement le spiral (risque de pli irrémédiable). Immerger le coq complet avec son balancier dans un godet d'essence One-Dip pendant 3 minutes. Sécher délicatement sous cloche à la poire soufflante. Contrôler la propreté sous binoculaire.",
    toolsNeeded: ["Godet de dégraissage One-Dip", "Poire soufflante horlogère", "Brucelles Dumont #5", "Papier buvard"],
    swissStandard: "Règle absolue d'établi : Spiral STRICTEMENT sec et dégraissé"
  },
  {
    id: "dent-echappement",
    title: "4. Dent de Roue d'Échappement Ébréchée",
    subTitle: "Bec d'impulsion acier poli ébréché de 12 µm suite à un ripage",
    category: "echappement",
    magnificationDefault: 20,
    defectCoords: { x: 51, y: 47 },
    severity: "CRITIQUE",
    description: "La pointe de la palette ou une brucelle a heurté une des 15 dents de la roue d'échappement lors d'un démontage imprudent. L'angle de repos est tronqué.",
    microscopicSigns: [
      "Arête vive rompue avec micro-bavure métallique.",
      "Perte du miroir poli bloqué sur le plan d'impulsion.",
      "Chute excessive de la palette d'entrée au passage de cette dent."
    ],
    witschiSymptom: "Toutes les 15 alternances (soit chaque tour complet de roue d'échappement), un point décroche sur le tracé du vibrographe avec saut de repère de 0.8 ms.",
    repairProtocol: "Aucune retouche à la meule n'est tolérée en horlogerie suisse sur une roue d'échappement (risque de déséquilibre dynamique). Remplacement immédiat par une fourniture neuve ETA.",
    toolsNeeded: ["Brucelles Dumont #3", "Porte-pièce", "Microscope x20", "Pique-huile"],
    swissStandard: "Norme NIHS 92-05 • Précision angulaire des dents d'échappement ± 15'"
  },
  {
    id: "fente-vis-machee",
    title: "5. Fente de Vis Mâchée & Bavure Saillante",
    subTitle: "Tête de vis de pont déformée par une lame de tournevis non affûtée",
    category: "vis",
    magnificationDefault: 20,
    defectCoords: { x: 48, y: 52 },
    severity: "MAJEUR",
    description: "L'horloger a employé un tournevis trop fin et pointu en « V ». Au couple de serrage, la lame a chassé le métal vers le haut, créant une bavure en saillie.",
    microscopicSigns: [
      "Bourrelet métallique saillant dépassant du plan de tête.",
      "Micro-copeau d'acier prêt à se détacher et à tomber dans le rouage.",
      "Poli noir de la tête de vis rayé et labouré."
    ],
    witschiSymptom: "Risque de blocage soudain du rouage si le copeau migre dans les dentures d'échappement. Dépréciation visuelle immédiate du mouvement.",
    repairProtocol: "1. Déposer la vis déformée. 2. Arraser la bavure à la pierre d'Arkansas avec le gabarit Bergeon à roulettes. 3. Reprendre le poli plat au lapidaire zinc avec pâte blanche Dialux (poli bloqué haute horlogerie). 4. Ré-affûter la lame du tournevis à flancs parallèles (fente 0.16 mm, lame 0.15 mm).",
    toolsNeeded: ["Pierre d'Arkansas", "Gabarit à roulettes Bergeon", "Disque de zinc", "Pâte à polir blanche"],
    swissStandard: "Norme NIHS 06-02 • Tête de vis exempte de toute bavure"
  },
  {
    id: "pignon-oscillant",
    title: "6. Engrènement Faux du Pignon Oscillant 7750",
    subTitle: "Pénétration de denture de chronographe hors tolérance (≠ 1/3 de dent)",
    category: "chrono",
    magnificationDefault: 20,
    defectCoords: { x: 50, y: 50 },
    severity: "RÉGLAGE",
    description: "Sur le chronographe ETA 7750, la vis excentrique d'embrayage est déréglée : le pignon oscillant engrène à fond de dent au lieu du tiers de hauteur requis.",
    microscopicSigns: [
      "Portée de dent en contact au fond du creux de la roue de chronographe.",
      "Frottement excessif et absence d'ébat de denture.",
      "Marquage d'usure anormale sur les flancs dorés."
    ],
    witschiSymptom: "Chute brutale de plus de 45° d'amplitude dès l'enclenchement du chronographe par le poussoir A (Start). Le mouvement s'arrête parfois spontanément.",
    repairProtocol: "Tourner la vis excentrique d'embrayage à l'aide d'un tournevis 1.20 mm pour reculer le pignon jusqu'à observer sous binoculaire exactement 1/3 de hauteur de pénétration des dents, tout en conservant un ébat de sécurité de 0.03 mm.",
    toolsNeeded: ["Tournevis 1.20 mm", "Microscope binoculaire 20x", "Brucelles Dumont #2", "Benjoin"],
    swissStandard: "Manuel officiel ETA Valjoux 7750 • Pénétration 1/3 de dent impérative"
  }
];

export default function MacroLoupePage() {
  const [selectedDefect, setSelectedDefect] = useState<DefectCase>(DEFECT_CASES[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(20);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isReticleOn, setIsReticleOn] = useState<boolean>(true);
  const [lightAngle, setLightAngle] = useState<number>(45); // Lumière rasante
  const [isInspecting, setIsInspecting] = useState<boolean>(false);
  const [spotFound, setSpotFound] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse / Touch movement on the preview
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });

    // Check proximity to real defect coordinates
    const dx = Math.abs(x - selectedDefect.defectCoords.x);
    const dy = Math.abs(y - selectedDefect.defectCoords.y);
    if (dx < 7 && dy < 7) {
      setSpotFound(true);
    }
  };

  const jumpToDefect = () => {
    setLoupePos({ ...selectedDefect.defectCoords });
    setSpotFound(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-800 dark:text-slate-200 antialiased selection:bg-amber-500/30 selection:text-amber-800 dark:selection:text-amber-200 transition-colors duration-300">
      {/* Top Banner */}
      <div className="bg-white/95 dark:bg-[#0c1322]/90 border-b border-slate-200 dark:border-slate-800 py-3 px-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-mono">
          <Link
            href="/pratique"
            className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Ateliers Pratiques</span>
          </Link>
          <span className="text-amber-700 dark:text-amber-400 uppercase tracking-wider font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Métrologie Visuelle · Loupe Horlogère Macro ×20 &amp; Binoculaire
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero */}
        <div className="relative rounded-3xl bg-white dark:bg-[#0d1320] p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>Inspection Microscopique d&apos;Établi • Détection des Micro-Défauts Réels</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
                La Loupe Macro d&apos;Établi ×20 <br />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent">
                  Repérage de Défauts Réels sur Métal, Pierres &amp; Spiraux
                </span>
              </h1>
              <p className="mt-3 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                À l&apos;établi sous le binoculaire, la réalité microscopique ne ressemble pas à un dessin vectoriel parfait. Promenez la <strong>loupe optique ×20</strong> sur les composants réels pour déceler une <strong>pierre fêlée</strong>, un <strong>pivot marqué</strong>, une <strong>fuite d&apos;huile sur le spiral</strong> ou une <strong>bavure de fente de vis</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 font-mono text-xs text-amber-800 dark:text-amber-300 space-y-2">
              <div className="font-bold uppercase flex items-center gap-1.5">
                <Crosshair className="w-4 h-4" />
                <span>Commandes d&apos;Optique</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Déplacez la souris ou glissez le doigt sur l&apos;oculaire pour inspecter la zone. Ajustez l&apos;angle de lumière rasante pour révéler les micro-fissures.
              </p>
            </div>
          </div>

          {/* Defect Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {DEFECT_CASES.map((d) => (
              <button
                key={d.id}
                onClick={() => {
                  setSelectedDefect(d);
                  setSpotFound(false);
                }}
                className={`p-3 rounded-2xl border text-left font-mono text-xs transition-all ${
                  selectedDefect.id === d.id
                    ? "bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20"
                    : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-500/50"
                }`}
              >
                <div className="text-[10px] uppercase opacity-75">{d.category}</div>
                <div className="truncate font-semibold mt-0.5">{d.title.split(". ")[1]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Workbench Microscope Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Inspection Viewport (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900 dark:bg-black rounded-3xl border border-slate-800 p-5 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-slate-800 pb-3 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
                <span className="font-bold text-white">OCULAIRE BINOCULAIRE LEICA / ZEISS</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsReticleOn(!isReticleOn)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] transition ${
                    isReticleOn
                      ? "bg-amber-500/20 border-amber-500 text-amber-300"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  Réticule micrométrique : {isReticleOn ? "ON" : "OFF"}
                </button>
                <button
                  onClick={jumpToDefect}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500 text-cyan-300 text-[11px] hover:bg-cyan-500/30 transition"
                >
                  Centrer sur le défaut
                </button>
              </div>
            </div>

            {/* Interactive Macro Canvas View */}
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              className="relative w-full aspect-[4/3] rounded-2xl bg-[#070A0F] border border-slate-800 overflow-hidden cursor-crosshair select-none touch-none shadow-inner"
            >
              {/* Microscopic Surface Simulation (SVG Realistic Render) */}
              <svg viewBox="0 0 600 450" className="w-full h-full">
                <defs>
                  {/* Metal Radial Texture */}
                  <radialGradient id="brassTexture" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#B48222" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#785514" stopOpacity="0.9" />
                  </radialGradient>
                  {/* Steel Bridge Brushed */}
                  <linearGradient id="rhodiumBrush" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#CBD5E1" />
                    <stop offset="50%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#64748B" />
                  </linearGradient>
                  {/* Synthetic Ruby Red */}
                  <radialGradient id="rubyGem" cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#FDA4AF" />
                    <stop offset="40%" stopColor="#E11D48" />
                    <stop offset="85%" stopColor="#881337" />
                    <stop offset="100%" stopColor="#4C0519" />
                  </radialGradient>
                </defs>

                {/* Background Workbench Surface */}
                <rect width="600" height="450" fill="#0C101A" />
                <circle cx="300" cy="225" r="190" fill="url(#rhodiumBrush)" stroke="#475569" strokeWidth="3" />

                {/* Specific Component Graphics based on selectedDefect */}
                {selectedDefect.id === "pierre-felee" && (
                  <g transform="translate(300, 225)">
                    {/* Incabloc Brass Chaton */}
                    <circle cx="0" cy="0" r="140" fill="url(#brassTexture)" stroke="#5B4010" strokeWidth="4" />
                    <circle cx="0" cy="0" r="95" fill="#1E293B" stroke="#D4AF37" strokeWidth="2" />
                    {/* Synthetic Ruby Endstone (Contre-pivot) */}
                    <circle cx="0" cy="0" r="80" fill="url(#rubyGem)" stroke="#FECDD3" strokeWidth="2" />
                    {/* Oil Droplet (Defect: Leaked) */}
                    <ellipse cx="-15" cy="5" rx="30" ry="25" fill="#FEF08A" fillOpacity="0.3" stroke="#FBBF24" strokeWidth="1.5" />
                    {/* Star Fracture Crack (Le défaut réel) */}
                    <path
                      d="M 10 -10 L -45 -35 M 10 -10 L 40 45 M 10 -10 L -30 40 M 10 -10 L 55 -25 M -15 -2 L -5 18"
                      stroke="#FFFFFF"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 10 -10 L -45 -35 M 10 -10 L 40 45 M 10 -10 L -30 40"
                      stroke="#1E293B"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    {/* Lyre Spring Arms */}
                    <path d="M -115 -45 Q -140 0, -115 45 L -85 30" fill="none" stroke="#D4AF37" strokeWidth="4" />
                    <path d="M 115 -45 Q 140 0, 115 45 L 85 30" fill="none" stroke="#D4AF37" strokeWidth="4" />
                  </g>
                )}

                {selectedDefect.id === "pivot-marque" && (
                  <g transform="translate(300, 225)">
                    {/* Balance Staff (Axe de balancier en acier trempé) */}
                    <rect x="-40" y="-140" width="80" height="280" rx="10" fill="#64748B" stroke="#E2E8F0" strokeWidth="3" />
                    {/* Cone & Pivot Section */}
                    <polygon points="-40,60 40,60 16,140 -16,140" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
                    <rect x="-14" y="140" width="28" height="65" rx="3" fill="#94A3B8" stroke="#F1F5F9" strokeWidth="1.5" />
                    {/* Circular Wear Grooves on Pivot Tip (Le défaut réel) */}
                    <ellipse cx="0" cy="165" rx="13" ry="4" fill="none" stroke="#38BDF8" strokeWidth="2.5" />
                    <ellipse cx="0" cy="178" rx="13" ry="4" fill="none" stroke="#EF4444" strokeWidth="2.5" />
                    <ellipse cx="0" cy="190" rx="11" ry="3.5" fill="none" stroke="#38BDF8" strokeWidth="2" />
                    {/* Thermal Blue Coloration */}
                    <rect x="-12" y="155" width="24" height="35" fill="#3B82F6" fillOpacity="0.25" />
                  </g>
                )}

                {selectedDefect.id === "spiral-huile" && (
                  <g transform="translate(300, 225)">
                    {/* Balance Wheel Rim (partial) */}
                    <circle cx="0" cy="0" r="170" fill="none" stroke="#D4AF37" strokeWidth="18" />
                    {/* Hairspring Coils (Spiral Nivarox) */}
                    {[25, 45, 65, 85, 105, 125].map((r, i) => (
                      <circle key={i} cx="0" cy="0" r={r} fill="none" stroke="#94A3B8" strokeWidth="3" />
                    ))}
                    {/* Collet (Virole) */}
                    <circle cx="0" cy="0" r="18" fill="#475569" stroke="#CBD5E1" strokeWidth="2" />
                    {/* Sticky Oil Pool connecting Coils 4 and 5 (Le défaut réel) */}
                    <path
                      d="M 55 -35 Q 75 -15 95 -35 Q 90 -65 60 -55 Z"
                      fill="#F59E0B"
                      fillOpacity="0.75"
                      stroke="#FEF08A"
                      strokeWidth="2.5"
                    />
                    <ellipse cx="75" cy="-35" rx="20" ry="12" fill="#FEF08A" fillOpacity="0.4" />
                  </g>
                )}

                {selectedDefect.id === "dent-echappement" && (
                  <g transform="translate(300, 225)">
                    {/* Escape Wheel Body */}
                    <circle cx="0" cy="0" r="90" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                    {/* Escape Wheel Teeth */}
                    {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, idx) => (
                      <g key={deg} transform={`rotate(${deg})`}>
                        <path
                          d={
                            idx === 0
                              ? "M 90 0 L 140 18 L 128 28 L 88 12 Z" // Chipped Tooth!
                              : "M 90 0 L 155 22 L 145 32 L 88 12 Z"
                          }
                          fill="#CBD5E1"
                          stroke={idx === 0 ? "#EF4444" : "#F8FAFC"}
                          strokeWidth={idx === 0 ? "3" : "1.8"}
                        />
                        {idx === 0 && (
                          <circle cx="140" cy="18" r="9" fill="#EF4444" fillOpacity="0.4" stroke="#EF4444" strokeWidth="2" />
                        )}
                      </g>
                    ))}
                  </g>
                )}

                {selectedDefect.id === "fente-vis-machee" && (
                  <g transform="translate(300, 225)">
                    {/* Screw Head Outline */}
                    <circle cx="0" cy="0" r="130" fill="url(#rhodiumBrush)" stroke="#F8FAFC" strokeWidth="4" />
                    {/* Screw Slot (Fente) */}
                    <rect x="-105" y="-18" width="210" height="36" rx="3" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
                    {/* Metal Burrs Raised on Slot Edges (Le défaut réel) */}
                    <polygon points="-80,-18 -40,-35 0,-18" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
                    <polygon points="20,18 60,38 90,18" fill="#EF4444" stroke="#FCA5A5" strokeWidth="2" />
                    <ellipse cx="-40" cy="-28" rx="8" ry="4" fill="#FEF08A" />
                  </g>
                )}

                {selectedDefect.id === "pignon-oscillant" && (
                  <g transform="translate(300, 225)">
                    {/* Chrono Wheel Teeth (Gold) */}
                    <circle cx="-60" cy="0" r="140" fill="none" stroke="#D4AF37" strokeWidth="18" strokeDasharray="10 6" />
                    {/* Oscillating Pinion Shaft & Leaves */}
                    <rect x="75" y="-120" width="26" height="240" fill="#94A3B8" stroke="#CBD5E1" strokeWidth="2" />
                    <circle cx="88" cy="0" r="45" fill="#475569" stroke="#E2E8F0" strokeWidth="3" />
                    {/* Tooth Engagement Zone */}
                    <circle cx="68" cy="0" r="24" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" strokeWidth="2" />
                  </g>
                )}

                {/* Simulated Raking Light Beam (Lumière rasante) */}
                <g style={{ transform: `rotate(${lightAngle}deg)`, transformOrigin: "300px 225px" }}>
                  <line x1="0" y1="225" x2="600" y2="225" stroke="#FDE047" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="8 8" />
                </g>
              </svg>

              {/* The Moving Optical Loupe Lens Overlay */}
              <div
                className="absolute pointer-events-none rounded-full border-4 border-amber-500 shadow-2xl transition-transform duration-75 ease-out flex items-center justify-center overflow-hidden"
                style={{
                  width: `${zoomLevel * 8}px`,
                  height: `${zoomLevel * 8}px`,
                  left: `${loupePos.x}%`,
                  top: `${loupePos.y}%`,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.55), inset 0 0 25px rgba(212, 175, 55, 0.4)"
                }}
              >
                {/* Loupe Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-white/20 rounded-full"></div>

                {/* Reticle with Crosshairs & Micrometer Scale */}
                {isReticleOn && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-red-500/70"></div>
                    <div className="h-full w-[1px] bg-red-500/70 absolute"></div>
                    <div className="w-16 h-16 rounded-full border border-red-500/50 absolute"></div>
                    <div className="w-32 h-32 rounded-full border border-red-500/30 absolute"></div>
                    <span className="absolute bottom-2 text-[9px] font-mono text-red-400 font-bold bg-black/60 px-1 rounded">
                      Div. 0.01 mm
                    </span>
                  </div>
                )}

                {/* Spot Found Indicator inside Loupe */}
                {spotFound && (
                  <div className="absolute top-3 px-2 py-0.5 rounded-full bg-rose-500 text-white font-mono text-[9px] font-bold animate-pulse">
                    DÉFAUT DÉTECTÉ
                  </div>
                )}
              </div>
            </div>

            {/* Loupe Controls Toolbar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-slate-300 pt-2">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span>Grossissement Loupe :</span>
                  <strong className="text-amber-400 font-bold">×{zoomLevel}</strong>
                </div>
                <div className="flex gap-2">
                  {[10, 20, 30].map((z) => (
                    <button
                      key={z}
                      onClick={() => setZoomLevel(z)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition ${
                        zoomLevel === z
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      ×{z}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span>Angle Lumière Rasante :</span>
                  <strong className="text-cyan-400">{lightAngle}°</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="15"
                  value={lightAngle}
                  onChange={(e) => setLightAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Microscope Diagnostic Sheet */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-[#0c1322] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold block">
                    Fiche d&apos;Expertise d&apos;Établi
                  </span>
                  <h3 className="text-lg font-bold font-serif text-slate-900 dark:text-white">
                    {selectedDefect.title}
                  </h3>
                </div>
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border ${
                    selectedDefect.severity === "CRITIQUE"
                      ? "bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-400"
                      : selectedDefect.severity === "MAJEUR"
                      ? "bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-400"
                      : "bg-cyan-500/15 border-cyan-500/40 text-cyan-700 dark:text-cyan-400"
                  }`}
                >
                  {selectedDefect.severity}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedDefect.description}
              </p>

              {/* Signs */}
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-slate-900 dark:text-white block">
                  Signes Révélés à la Loupe ×20 :
                </span>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono">
                  {selectedDefect.microscopicSigns.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Witschi Symptom */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
                <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Symptôme au Chrono-Comparateur Witschi :
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedDefect.witschiSymptom}
                </p>
              </div>

              {/* Repair Protocol */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/40 text-xs leading-relaxed space-y-1.5">
                <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4" />
                  <span>Protocole Horloger de Réparation d&apos;Établi :</span>
                </div>
                <p className="text-emerald-900 dark:text-emerald-100">
                  {selectedDefect.repairProtocol}
                </p>
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 pt-1 border-t border-emerald-500/20">
                  {selectedDefect.swissStandard}
                </div>
              </div>

              {/* Tools List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Outillage Requis pour l&apos;Intervention :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDefect.toolsNeeded.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] font-mono text-slate-800 dark:text-slate-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
