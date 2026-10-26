"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Search,
  ZoomIn,
  Droplets,
  Wrench,
  Gauge,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

interface Part6497 {
  id: string;
  code: string;
  name: string;
  group: "bati" | "energie" | "rouage" | "echappement";
  img: string;
  lubricant: string;
  torque: string;
  endshake: string;
  role: string;
  workshopTip: string;
}

const PARTS_6497: Part6497[] = [
  {
    id: "platine",
    code: "100",
    name: "Platine empierrée",
    group: "bati",
    img: "/images/quiz/6497/platine.png",
    lubricant: "Moebius 9010 (Incabloc côté cadran) / 9504 (pilier tirette)",
    torque: "Référence bâti",
    endshake: "Planéité ± 0.005 mm",
    role: "Châssis principal en laiton rhodié (Ø 36.60 mm / 16½''') supportant les ponts côté mouvement et la minuterie côté cadran.",
    workshopTip: "Toujours inspecter la propreté des pieds de positionnement et le chaton Incabloc côté cadran avant d'installer le rouage.",
  },
  {
    id: "pont-barillet",
    code: "105",
    name: "Pont de barillet",
    group: "bati",
    img: "/images/quiz/6497/pont-barillet.png",
    lubricant: "Moebius 9504 (portée du rochet et roue de couronne)",
    torque: "2.2 cNm (3 vis)",
    endshake: "Ébat barillet : 0.03 – 0.05 mm",
    role: "Maintient l'arbre de barillet supérieur et porte le système de retenue (rochet, roue de couronne, cliquet et ressort de cliquet).",
    workshopTip: "Vérifier que le ressort de cliquet (Code 430) est parfaitement logé dans sa rainure avant de retourner le pont.",
  },
  {
    id: "pont-rouages",
    code: "110",
    name: "Pont de rouage",
    group: "bati",
    img: "/images/quiz/6497/pont-rouages.png",
    lubricant: "Moebius HP-1300 (Grande moyenne) / 9010 (Seconde & Échappement)",
    torque: "1.8 cNm (2 vis)",
    endshake: "Ébat mobiles : 0.02 – 0.04 mm",
    role: "Guide les pivots supérieurs de la roue de grande moyenne (206), de la roue de seconde à 9h (227) et de la roue d'échappement (705).",
    workshopTip: "Présenter le pont sans serrer et guider délicatement les 3 pivots avec une brucelle laiton N°2 jusqu'à ce que le pont plaque naturellement.",
  },
  {
    id: "pont-ancre",
    code: "122",
    name: "Pont d'ancre",
    group: "bati",
    img: "/images/quiz/6497/pont-d-ancre.png",
    lubricant: "STRICTEMENT À SEC (aucune huile sur les pivots d'ancre)",
    torque: "1.4 cNm (2 vis)",
    endshake: "Ébat ancre : 0.02 – 0.03 mm",
    role: "Maintient le pivot supérieur de l'ancre suisse (Code 710). Ses deux pieds de centrage garantissent la pénétration exacte des palettes.",
    workshopTip: "Serrer progressivement en alternance et contrôler que l'ancre saute vivement d'une goupille de limitation à l'autre.",
  },
  {
    id: "pont-balancier",
    code: "125",
    name: "Coq (Pont de balancier)",
    group: "bati",
    img: "/images/quiz/6497/pont-balancier.png",
    lubricant: "Moebius 9010 (sur contre-pivot Incabloc supérieur)",
    torque: "2.0 cNm (1 vis de coq)",
    endshake: "Ébat balancier : 0.02 – 0.03 mm",
    role: "Soutient l'organe réglant (balancier-spiral), la raquette de réglage et le porte-piton mobile.",
    workshopTip: "Ne jamais faire pivoter le coq lors de la dépose : soulever verticalement pour ne pas fausser la spire extérieure du spiral.",
  },
  {
    id: "barillet",
    code: "180/1",
    name: "Barillet complet avec arbre",
    group: "energie",
    img: "/images/quiz/6497/barillet.png",
    lubricant: "Moebius HP-1300 (portées d'arbre) / 8217 (paroi si ressort neuf)",
    torque: "Couple moteur nominal",
    endshake: "Jeu d'arbre dans tambour : 0.02 mm",
    role: "Accumule l'énergie mécanique fournie par le remontage manuel et la restitue au pignon de centre sur ~46 heures.",
    workshopTip: "Toujours contrôler le crochet intérieur de la bonde et l'accrochage de l'œillet avant de refermer le couvercle.",
  },
  {
    id: "rochet",
    code: "415",
    name: "Rochet",
    group: "energie",
    img: "/images/quiz/6497/rochet.png",
    lubricant: "Moebius HP-1300 (très léger sous l'épaulement de vis)",
    torque: "2.0 cNm (vis pas à droite)",
    endshake: "Rotation libre sans frottement",
    role: "Solidaire du carré supérieur de l'arbre de barillet, il permet d'armer le ressort moteur tout en étant retenu par le cliquet.",
    workshopTip: "Désarmer le mouvement en retenant le rochet au tournevis tout en écartant le cliquet avec une cheville de bois.",
  },
  {
    id: "roue-couronne",
    code: "420",
    name: "Roue de couronne & Bague (421)",
    group: "energie",
    img: "/images/quiz/6497/roue-couronne.png",
    lubricant: "Moebius 9504 (entre bague 421 et alésage de roue 420)",
    torque: "1.8 cNm (ATTENTION : PAS À GAUCHE — 2 ou 3 fentes)",
    endshake: "Jeu axial minimal",
    role: "Transmet la rotation du pignon de remontoir (410) au rochet (415).",
    workshopTip: "PIÈGE CLASSIQUE : La vis de roue de couronne a un filetage inversé (pas à gauche). On dévisse dans le sens horaire !",
  },
  {
    id: "cliquet",
    code: "425",
    name: "Cliquet & Ressort (430)",
    group: "energie",
    img: "/images/quiz/6497/cliquet.png",
    lubricant: "Moebius 9504 (bec de contact ressort/cliquet)",
    torque: "1.5 cNm (vis de cliquet)",
    endshake: "Recul franc sur le rochet",
    role: "Empêche le dévidement brutal du barillet tout en autorisant un léger recul de sécurité en fin d'armage.",
    workshopTip: "Maintenir un rodico ou un doigtier au-dessus du pont lors de la dépose du cliquet pour éviter que le ressort 430 ne saute.",
  },
  {
    id: "tige-remontoir",
    code: "401",
    name: "Tige de remontoir",
    group: "energie",
    img: "/images/quiz/6497/tige-remontoir.png",
    lubricant: "Moebius 9504 (carré, portée pilote et gorge de tirette)",
    torque: "Filetage couronne Ø 1.20 mm (Tap 10)",
    endshake: "Course T1 ↔ T2 nette",
    role: "Axe de commande reliant la couronne extérieure au pignon coulant (407) et à la tirette (443).",
    workshopTip: "Lubrifier au Moebius 9504 le carré et le pilote avant introduction pour éviter tout grippage dans la platine.",
  },
  {
    id: "pignon-coulant",
    code: "407",
    name: "Pignon coulant & Pignon de remontoir (410)",
    group: "energie",
    img: "/images/quiz/6497/pignon-coulant.png",
    lubricant: "Moebius 9504 (denture Breguet, gorge et carré intérieur)",
    torque: "Embrayage par ressort de bascule",
    endshake: "Coulissement doux sur le carré",
    role: "En position T1, engrène par sa denture Breguet (dents de loup) avec le pignon de remontoir. En T2, bascule vers les renvois de mise à l'heure.",
    workshopTip: "Les dents de loup (Breguet) vont toujours face au pignon de remontoir, et la denture droite vers l'intérieur du mouvement.",
  },
  {
    id: "tirette",
    code: "443",
    name: "Tirette, Bascule (435) & Sautoir (445)",
    group: "energie",
    img: "/images/quiz/6497/Tirette.png",
    lubricant: "Moebius 9504 (plot de tirette, bec de sautoir, tête de bascule)",
    torque: "Vis de tirette (5443) : 1.5 cNm (max 1.5 tour au démontage)",
    endshake: "Verrouillage franc T1 / T2",
    role: "Indexe les deux positions de la tige (T1 remontage / T2 mise à l'heure) et commande la bascule du pignon coulant.",
    workshopTip: "Ne jamais dévisser la vis de tirette de plus de 1.5 tour pour extraire la tige, sinon la tirette se désengage côté cadran.",
  },
  {
    id: "mobile-centre",
    code: "200",
    name: "Mobile de centre & Chaussée (240)",
    group: "rouage",
    img: "/images/quiz/6497/mobile-de-centre.png",
    lubricant: "Moebius HP-1300 (pivots) / 9504 (lanterne de chaussée)",
    torque: "Friction chaussée : couple glissant contrôlé",
    endshake: "Ébat axial : 0.02 – 0.04 mm",
    role: "Effectue exactement 1 tour par heure. Porte la chaussée (aiguille des minutes) et entraîne la roue de grande moyenne.",
    workshopTip: "Toujours chasser la chaussée verticalement avec l'outil Presto avant de déposer le pont de centre.",
  },
  {
    id: "roue-moyenne",
    code: "206",
    name: "Roue de grande moyenne",
    group: "rouage",
    img: "/images/quiz/6497/roue-moyenne.png",
    lubricant: "Moebius HP-1300 (pivots supérieur et inférieur)",
    torque: "Transmission intermédiaire",
    endshake: "Ébat axial : 0.02 – 0.04 mm",
    role: "Roue intermédiaire démultipliant le couple entre le mobile de centre (200) et le mobile de seconde (227).",
    workshopTip: "Inspecter la propreté des ailes du pignon au Rodico : une poussière bloque immédiatement le rouage sous faible armage.",
  },
  {
    id: "mobile-seconde",
    code: "227",
    name: "Mobile de petite seconde (à 9h)",
    group: "rouage",
    img: "/images/quiz/6497/mobile-de-seconde.png",
    lubricant: "Moebius 9010 (pivots rapides)",
    torque: "1 tour / 60 secondes",
    endshake: "Ébat axial : 0.02 – 0.03 mm",
    role: "Tourne en 1 minute. Son pivot inférieur allongé traverse la platine à 9h pour recevoir l'aiguille de petite seconde.",
    workshopTip: "Manier avec une extrême prudence : le tenon porte-aiguille est très long et fin, il plie au moindre choc latéral.",
  },
  {
    id: "roue-echappement",
    code: "705",
    name: "Roue d'échappement (15 dents)",
    group: "echappement",
    img: "/images/quiz/6497/roue-echappement.png",
    lubricant: "Moebius 9010 (pivots) / Moebius 9415 (sur plans d'impulsion)",
    torque: "18'000 A/h (6497-1) / 21'600 A/h (6497-2)",
    endshake: "Ébat axial : 0.015 – 0.03 mm",
    role: "Délivre les impulsions d'énergie aux palettes en rubis de l'ancre suisse.",
    workshopTip: "Ne jamais toucher la denture en acier poli avec des brucelles acier : saisir uniquement par le tigron ou avec brucelles laiton.",
  },
  {
    id: "ancre",
    code: "710",
    name: "Ancre suisse empierrée",
    group: "echappement",
    img: "/images/quiz/6497/ancre.png",
    lubricant: "Moebius 9415 (uniquement sur les levées en rubis — pivots À SEC)",
    torque: "Tirage 12° à 15°",
    endshake: "Ébat axial : 0.02 – 0.03 mm",
    role: "Organe distributeur qui verrouille et libère alternativement la roue d'échappement tout en donnant l'impulsion à l'ellipse du balancier.",
    workshopTip: "RÈGLE ABSOLUE : Les pivots d'ancre, la fourchette et le dard restent 100 % secs. Seules les palettes reçoivent de la Moebius 9415.",
  },
  {
    id: "balancier-spiral",
    code: "721",
    name: "Balancier-spiral réglé",
    group: "echappement",
    img: "/images/quiz/6497/balancier-spiral.png",
    lubricant: "Moebius 9010 (uniquement dans les amortisseurs Incabloc)",
    torque: "Fréquence 2.5 Hz (18'000 A/h) — Angle de levée 50°",
    endshake: "Ébat axial : 0.02 – 0.03 mm",
    role: "Base de temps isochrone du mouvement. Le spiral plat Nivarox respire concentriquement entre les goupilles de raquette.",
    workshopTip: "Contrôler le plat et le centrage du spiral, ainsi que le repère (ellipse alignée sur la ligne des centres au repos) : beat error ≤ 0.4 ms.",
  },
  {
    id: "amortisseur-incabloc",
    code: "730",
    name: "Amortisseur antichoc Incabloc",
    group: "echappement",
    img: "/images/quiz/6497/amortisseur-balancier.png",
    lubricant: "Moebius 9010 (goutte centrée occupant 60 % du contre-pivot)",
    torque: "Ressort-lyre 2 branches",
    endshake: "Recentrage conique automatique",
    role: "Protège les pivots de balancier (Ø 0.08 mm) lors des chocs axiaux et radiaux en déplaçant le chaton mobile.",
    workshopTip: "Huiler le contre-pivot hors mouvement, poser le chaton percé dessus (capillarité), retourner l'ensemble et verrouiller la lyre.",
  },
];

export default function Eta6497Page() {
  const [selectedGroup, setSelectedGroup] = useState<"all" | "bati" | "energie" | "rouage" | "echappement">("all");
  const [activePart, setActivePart] = useState<Part6497>(PARTS_6497[0]);
  const [loupeZoom, setLoupeZoom] = useState(false);

  const filteredParts = selectedGroup === "all"
    ? PARTS_6497
    : PARTS_6497.filter((p) => p.group === selectedGroup);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link
            href="/pratique/fiches"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux Fiches Techniques
          </Link>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
            NIHS / Ebauches SA · Calibre École &amp; Atelier 16½&apos;&apos;&apos;
          </span>
        </div>

        <header className="mb-10 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Communication Technique &amp; Plateau de Fournitures Réelles
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            ETA / Unitas <span className="text-amber-600 dark:text-amber-400">6497-1</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-base leading-relaxed mb-6">
            Calibre mécanique à remontage manuel de gousset/poignet (16½ lignes — 36.60 mm), architecture de référence des établis suisses. Inspectez ci-dessous les <strong>vraies fournitures détourées</strong> à la loupe 10x avec leurs codes Ebauches SA, couples de serrage en cNm et lubrifiants certifiés Moebius, ainsi que la communication technique officielle ETA.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Diamètre", value: "36.60 mm (16½''')" },
              { label: "Hauteur", value: "4.50 mm" },
              { label: "Fréquence", value: "18'000 A/h (2.5 Hz)" },
              { label: "Angle de levée", value: "50° (6497-1) / 44° (-2)" },
              { label: "Empierrage", value: "17 Rubis (Incabloc)" },
              { label: "Réserve de marche", value: "~46 à 50 heures" },
            ].map((s, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400">{s.label}</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </header>

        <section className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-6 h-6 text-amber-500" />
                Plateau d&apos;Inspection des Fournitures Réelles ETA 6497 (Codes Ebauches SA)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Cliquez sur une pièce pour l&apos;examiner sous la loupe d&apos;atelier 10x et afficher son protocole de montage et d&apos;huilage.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "Toutes (19)" },
                { id: "bati", label: "Platine & Ponts" },
                { id: "energie", label: "Barillet & Remontoir" },
                { id: "rouage", label: "Rouage" },
                { id: "echappement", label: "Échappement & Balancier" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGroup(g.id as typeof selectedGroup)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedGroup === g.id
                      ? "bg-amber-500 text-slate-950 border-amber-500 shadow-sm"
                      : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-500/40"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredParts.map((part) => {
                const isSelected = activePart.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => setActivePart(part)}
                    className={`text-left p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                        : "bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-amber-500/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-slate-900 text-amber-400 dark:bg-amber-500/20 dark:text-amber-300">
                          Code {part.code}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-slate-400">
                          {part.group}
                        </span>
                      </div>
                      <div className="h-28 w-full rounded-xl bg-slate-100 dark:bg-slate-950/90 border border-slate-200/70 dark:border-slate-800 flex items-center justify-center p-2 mb-2 overflow-hidden">
                        <img
                          src={part.img}
                          alt={part.name}
                          className="max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-110"
                        />
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {part.name}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 mt-1.5 truncate">
                      {part.lubricant.split("(")[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-black bg-amber-500 text-slate-950">
                    Code Officiel Ebauches SA : {activePart.code}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                    {activePart.name}
                  </h3>
                </div>
                <button
                  onClick={() => setLoupeZoom(!loupeZoom)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    loupeZoom
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  {loupeZoom ? "Loupe 10x Active" : "Loupe 10x"}
                </button>
              </div>

              <div className="relative h-60 w-full rounded-2xl bg-slate-100 dark:bg-[#070B14] border border-slate-200 dark:border-slate-800 flex items-center justify-center p-4 mb-5 overflow-hidden">
                <img
                  src={activePart.img}
                  alt={activePart.name}
                  className={`max-h-52 w-auto object-contain transition-transform duration-500 ${
                    loupeZoom ? "scale-[1.75]" : "scale-100"
                  }`}
                />
                <span className="absolute bottom-2.5 right-3 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                  Fourniture réelle ETA 6497-1
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {activePart.role}
              </p>

              <div className="space-y-2.5 text-xs mb-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5">
                  <Droplets className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase text-[10px] text-amber-800 dark:text-amber-300 font-bold">
                      Lubrification Certifiée Moebius
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {activePart.lubricant}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-cyan-500" /> Couple / Montage
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {activePart.torque}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                    <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-emerald-500" /> Ébat / Tolérance
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                      {activePart.endshake}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-950 dark:text-emerald-200">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" /> Secret d&apos;Établi :
                </div>
                {activePart.workshopTip}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Schéma Cinématique Vectoriel &amp; Points d&apos;Huile ETA 6497-1
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Transmission complète du couple : Barillet (180) → Centre (200) → Grande Moyenne (206) → Seconde à 9h (227) → Échappement (705) → Ancre (710) → Balancier (721).
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#070B14] border border-slate-800 p-4 overflow-hidden">
            <svg viewBox="0 0 800 320" className="w-full h-auto">
              <defs>
                <pattern id="grid6497" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e293b" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="800" height="320" fill="url(#grid6497)" />

              {/* Ligne cinématique */}
              <path
                d="M 110 165 L 250 165 L 380 120 L 500 175 L 615 135 L 705 175"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* 1. Barillet 180 */}
              <g transform="translate(110, 165)">
                <circle r="68" fill="#1e293b" stroke="#64748b" strokeWidth="3" />
                <circle r="22" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
                <circle r="6" fill="#3b82f6" />
                <text y="-78" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  180 · BARILLET
                </text>
                <text y="86" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace">
                  HP-1300 / 8217
                </text>
              </g>

              {/* 2. Centre 200 */}
              <g transform="translate(250, 165)">
                <circle r="46" fill="#451a03" fillOpacity="0.55" stroke="#f59e0b" strokeWidth="2.5" />
                <circle r="12" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                <circle r="5" fill="#3b82f6" />
                <text y="-56" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  200 · CENTRE (1t/h)
                </text>
                <text y="64" textAnchor="middle" fill="#60a5fa" fontSize="9.5" fontFamily="monospace">
                  Moebius HP-1300
                </text>
              </g>

              {/* 3. Grande Moyenne 206 */}
              <g transform="translate(380, 120)">
                <circle r="38" fill="#451a03" fillOpacity="0.45" stroke="#d97706" strokeWidth="2" />
                <circle r="10" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                <circle r="4.5" fill="#3b82f6" />
                <text y="-48" textAnchor="middle" fill="#fcd34d" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                  206 · MOYENNE
                </text>
                <text y="54" textAnchor="middle" fill="#60a5fa" fontSize="9" fontFamily="monospace">
                  HP-1300
                </text>
              </g>

              {/* 4. Seconde 227 */}
              <g transform="translate(500, 175)">
                <circle r="34" fill="#083344" fillOpacity="0.55" stroke="#22d3ee" strokeWidth="2" />
                <circle r="9" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                <circle r="4.5" fill="#f59e0b" />
                <text y="-44" textAnchor="middle" fill="#67e8f9" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                  227 · SECONDE (9h)
                </text>
                <text y="50" textAnchor="middle" fill="#fbbf24" fontSize="9" fontFamily="monospace">
                  Moebius 9010
                </text>
              </g>

              {/* 5. Roue d'échappement 705 & Ancre 710 */}
              <g transform="translate(615, 135)">
                <circle r="26" fill="#4c0519" fillOpacity="0.6" stroke="#f43f5e" strokeWidth="2" />
                <circle r="4" fill="#f43f5e" />
                <text y="-36" textAnchor="middle" fill="#fda4af" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                  705/710 · ÉCHAP.
                </text>
                <text y="42" textAnchor="middle" fill="#fb7185" fontSize="9" fontFamily="monospace">
                  9415 (Palettes) / Pivots 710 SECS
                </text>
              </g>

              {/* 6. Balancier-Spiral 721 */}
              <g transform="translate(705, 175)">
                <circle r="48" fill="none" stroke="#10b981" strokeWidth="3" />
                <circle r="28" fill="none" stroke="#34d399" strokeWidth="1.2" strokeDasharray="4 2" />
                <circle r="5" fill="#f59e0b" />
                <text y="-58" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  721 · BALANCIER
                </text>
                <text y="66" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontFamily="monospace">
                  Incabloc : Moebius 9010
                </text>
              </g>
            </svg>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Communication Technique Officielle ETA 6497-1 (PDF)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Feuilletez la fiche constructeur complète avec nomenclature trilingue et planches d&apos;assemblage.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/pratique/demontage"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-500 hover:text-slate-950 transition"
              >
                Protocole de Démontage →
              </Link>
              <Link
                href="/pratique/remontage"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
              >
                Protocole de Remontage →
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <FlipBookViewer file="/pdfs/communication-technique/ETA%206497.pdf" />
          </div>
        </section>
      </div>
    </div>
  );
}
