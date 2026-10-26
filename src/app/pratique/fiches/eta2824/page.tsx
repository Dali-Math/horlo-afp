"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ZoomIn,
  Droplets,
  Wrench,
  Gauge,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

interface Zone2824 {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  lubricant: string;
  torque: string;
  endshake: string;
  description: string;
  alert: string;
}

const ZONES_2824: Zone2824[] = [
  {
    id: "inverseuses",
    code: "1488 / 1130",
    title: "Pont d'Automatique & 2 Roues Inverseuses",
    subtitle: "Redresseur mécanique bidirectionnel à cliquets rubis",
    lubricant: "Moebius 9010 (très léger par bain Lubeta V105 — jamais de graisse)",
    torque: "Pont d'automatique (1130) : 1.5 cNm (2 vis)",
    endshake: "Jeu axial inverseuses : 0.02 – 0.04 mm",
    description:
      "Quel que soit le sens de rotation de la masse oscillante (1143), l'une des deux roues inverseuses (1488) verrouille ses cliquets tandis que l'autre débraye librement, entraînant toujours le mobile de réduction (1482) et le rochet (415) dans le sens d'armage.",
    alert:
      "Si la masse oscillante tourne avec la couronne lors du remontage manuel ('effet hélicoptère'), les cliquets d'une roue inverseuse 1488 sont gommés par de l'huile séchée ou usés.",
  },
  {
    id: "barillet",
    code: "180 / 770",
    title: "Barillet Automatique à Bride Glissante",
    subtitle: "Protection contre la surtension en armage continu",
    lubricant: "Moebius 8217 (3 touches sur paroi tambour) / HP-1300 (pivots d'arbre)",
    torque: "Pont de barillet (105) : 1.8 cNm",
    endshake: "Couple de glissement contrôlé après 6 tours d'armage",
    description:
      "Contrairement à un calibre manuel, le ressort moteur est équipé d'une bride glissante (Moebius 8217) qui patine contre les encoches de la paroi interne du tambour lorsque le ressort atteint sa pleine charge.",
    alert:
      "L'emploi d'une huile fluide (9010) au lieu de la graisse freinante Moebius 8217 sur la paroi fait patiner le ressort trop tôt et chute l'amplitude sous 230°.",
  },
  {
    id: "rochet-sw200",
    code: "415 / 420 / 425",
    title: "Rochet, Roue de Couronne & Cliquet",
    subtitle: "Transmission d'armage manuel et retenue",
    lubricant: "Moebius 9504 (noyau roue de couronne & bec de cliquet)",
    torque: "Vis de rochet : 1.8 cNm / Vis roue de couronne : 1.6 cNm",
    endshake: "Engrènement franc sans point dur",
    description:
      "Assure la liaison entre le pignon de remontoir (410) et l'arbre de barillet lors du remontage manuel à la couronne (Position T1).",
    alert:
      "PIÈGE D'INTERCHANGEABILITÉ : Le rochet (415), la roue de couronne (420) et le cliquet (425) de l'ETA 2824-2 ne sont PAS interchangeables avec ceux du Sellita SW200-1 (profil de denture différent).",
  },
  {
    id: "etachron",
    code: "721 / 125",
    title: "Balancier-Spiral 4 Hz & Raquette Etachron",
    subtitle: "28'800 A/h — Angle de levée 50° — Stop-seconde (740)",
    lubricant: "Moebius 9010 (amortisseurs Incabloc/Etachoc) / 9415 (palettes d'ancre)",
    torque: "Vis de coq (125) : 1.6 cNm",
    endshake: "Ébat axial balancier : 0.015 – 0.03 mm",
    description:
      "Le système Etachron permet de régler le repère en tournant le porte-piton mobile et d'ajuster finement la marche diurne grâce à la vis excentrique micrométrique.",
    alert:
      "En tirant la tige en position T3, le levier stop-seconde (Code 740) vient frôler la serge du balancier pour permettre une synchronisation à la seconde près.",
  },
  {
    id: "quantieme",
    code: "2556 / 2535",
    title: "Mécanisme de Quantième à Saut Instantané",
    subtitle: "Came d'entraînement, ressort-sautoir et correcteur rapide (T2)",
    lubricant: "Moebius 9504 (came de quantième, bec du sautoir 2576 et dents du disque)",
    torque: "Plaque de maintien du disque : 1.0 cNm",
    endshake: "Saut franc à minuit ± 5 minutes",
    description:
      "La roue entraîneuse de quantième accumule l'énergie d'un ressort-levier sur 24 heures et libère un doigt à minuit pour faire sauter instantanément le disque des quantièmes (2557).",
    alert:
      "ZONE DE LA MORT (21h00 – 03h00) : Ne jamais actionner la correction rapide de date en T2 lorsque le doigt d'entraînement est engagé dans la denture du disque.",
  },
];

export default function Eta2824Page() {
  const [activeZone, setActiveZone] = useState<Zone2824>(ZONES_2824[0]);
  const [loupe, setLoupe] = useState(false);

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
            NIHS / Ebauches SA · Automatique 11½&apos;&apos;&apos; (4 Hz)
          </span>
        </div>

        <header className="mb-10 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" /> Communication Technique &amp; Schéma d&apos;Établi Interactif
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-3">
            ETA <span className="text-amber-600 dark:text-amber-400">2824-2</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-3xl text-base leading-relaxed mb-6">
            Pilier historique de l&apos;horlogerie automatique suisse (Ø 25.60 mm / 11½ lignes, hauteur 4.60 mm, 28&apos;800 A/h). Étudiez ci-dessous son <strong>module automatique bidirectionnel à deux roues inverseuses (1488)</strong>, son système de réglage <strong>Etachron</strong>, ses couples de serrage en cNm et la communication technique officielle ETA.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Diamètre", value: "25.60 mm (11½''')" },
              { label: "Hauteur", value: "4.60 mm" },
              { label: "Fréquence", value: "28'800 A/h (4 Hz)" },
              { label: "Angle de levée", value: "50°" },
              { label: "Empierrage", value: "25 Rubis" },
              { label: "Réserve de marche", value: "~38 à 40 heures" },
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

        <section className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Plan Technique Vectoriel — Module Automatique &amp; Réglage 2824-2
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cliquez sur un organe du plan ou activez la Loupe 10x pour inspecter les roues inverseuses (1488).
                </p>
              </div>
              <button
                onClick={() => setLoupe(!loupe)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  loupe
                    ? "bg-amber-500 text-slate-950 border-amber-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
                }`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {loupe ? "Loupe 10x Active" : "Loupe 10x"}
              </button>
            </div>

            <div className="rounded-2xl bg-[#070B14] border border-slate-800 p-3 overflow-hidden">
              <svg
                viewBox={loupe ? "160 60 360 240" : "0 0 680 380"}
                className="w-full h-auto transition-all duration-500"
              >
                <defs>
                  <pattern id="grid2824" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1e293b" strokeWidth="0.6" />
                  </pattern>
                </defs>
                <rect width="680" height="380" fill="url(#grid2824)" />

                {/* Platine 25.60mm */}
                <circle cx="340" cy="190" r="165" fill="#0f172a" stroke="#334155" strokeWidth="3" />
                <circle cx="340" cy="190" r="155" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                {/* 1. Barillet à bride glissante (180) */}
                <g
                  onClick={() => setActiveZone(ZONES_2824[1])}
                  className="cursor-pointer"
                  transform="translate(235, 195)"
                >
                  <circle
                    r="58"
                    fill="#1e293b"
                    stroke={activeZone.id === "barillet" ? "#f59e0b" : "#64748b"}
                    strokeWidth={activeZone.id === "barillet" ? "3.5" : "2"}
                  />
                  <path
                    d="M -42 -28 A 50 50 0 1 1 -42 28"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray="8 4"
                  />
                  <circle r="18" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                  <text y="4" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    180 · 8217
                  </text>
                </g>

                {/* 2. Rochet (415) & Roue de Couronne (420) */}
                <g
                  onClick={() => setActiveZone(ZONES_2824[2])}
                  className="cursor-pointer"
                  transform="translate(235, 105)"
                >
                  <circle
                    r="28"
                    fill="#31102F"
                    fillOpacity="0.7"
                    stroke={activeZone.id === "rochet-sw200" ? "#f43f5e" : "#a855f7"}
                    strokeWidth="2.5"
                  />
                  <circle r="7" fill="#f43f5e" />
                  <text y="-34" textAnchor="middle" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    415/420 (≠ SW200)
                  </text>
                </g>

                {/* 3. Les 2 Roues Inverseuses (1488) */}
                <g
                  onClick={() => setActiveZone(ZONES_2824[0])}
                  className="cursor-pointer"
                >
                  <circle
                    cx="335"
                    cy="135"
                    r="30"
                    fill="#451a03"
                    fillOpacity="0.75"
                    stroke={activeZone.id === "inverseuses" ? "#fbbf24" : "#d97706"}
                    strokeWidth="2.5"
                  />
                  <circle cx="335" cy="135" r="8" fill="#f43f5e" />
                  <circle
                    cx="390"
                    cy="155"
                    r="30"
                    fill="#451a03"
                    fillOpacity="0.75"
                    stroke={activeZone.id === "inverseuses" ? "#fbbf24" : "#d97706"}
                    strokeWidth="2.5"
                  />
                  <circle cx="390" cy="155" r="8" fill="#f43f5e" />
                  <text x="365" y="95" textAnchor="middle" fill="#fbbf24" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                    1488 · 2 ROUES INVERSEUSES
                  </text>
                </g>

                {/* 4. Balancier 4Hz & Raquette Etachron (721) */}
                <g
                  onClick={() => setActiveZone(ZONES_2824[3])}
                  className="cursor-pointer"
                  transform="translate(435, 245)"
                >
                  <circle
                    r="48"
                    fill="#064e3b"
                    fillOpacity="0.45"
                    stroke={activeZone.id === "etachron" ? "#34d399" : "#10b981"}
                    strokeWidth="3"
                  />
                  <circle r="26" fill="none" stroke="#6ee7b7" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle r="6" fill="#f59e0b" />
                  <text y="62" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    721 · ETACHRON 4 Hz
                  </text>
                </g>

                {/* 5. Disque Quantième & Sautoir (2556) */}
                <g
                  onClick={() => setActiveZone(ZONES_2824[4])}
                  className="cursor-pointer"
                  transform="translate(480, 145)"
                >
                  <rect
                    x="-24"
                    y="-18"
                    width="48"
                    height="36"
                    rx="6"
                    fill="#083344"
                    stroke={activeZone.id === "quantieme" ? "#22d3ee" : "#06b6d4"}
                    strokeWidth="2.5"
                  />
                  <text y="5" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    28
                  </text>
                  <text y="-25" textAnchor="middle" fill="#67e8f9" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    2556 · DATE 3H
                  </text>
                </g>
              </svg>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {ZONES_2824.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    activeZone.id === z.id
                      ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                      : "bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-500/40"
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-80">Code {z.code}</div>
                  <div className="text-xs font-bold leading-tight mt-0.5 line-clamp-2">{z.title}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-500 text-slate-950">
              Code Ebauches SA : {activeZone.code}
            </span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
              {activeZone.title}
            </h3>
            <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mb-4">
              {activeZone.subtitle}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
              {activeZone.description}
            </p>

            <div className="space-y-3 text-xs mb-5">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5">
                <Droplets className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono uppercase text-[10px] text-amber-800 dark:text-amber-300 font-bold">
                    Lubrification Moebius Officielle
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeZone.lubricant}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                    <Wrench className="w-3 h-3 text-cyan-500" /> Couple de Serrage
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeZone.torque}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                  <div className="font-mono uppercase text-[10px] text-slate-500 flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-emerald-500" /> Ébat / Contrôle
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                    {activeZone.endshake}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-950 dark:text-rose-200">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="w-4 h-4" /> Vigilance d&apos;Atelier :
              </div>
              {activeZone.alert}
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-amber-500" />
                Communication Technique Officielle ETA 2824-2 (PDF)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Consultez les planches éclatées constructeur, l&apos;ordre d&apos;assemblage et les points d&apos;huilage officiels.
              </p>
            </div>
            <Link
              href="/outils"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
            >
              Comparateur ETA 2824-2 vs SW200-1 (Poste 11) →
            </Link>
          </div>

          <div className="flex justify-center">
            <FlipBookViewer file="/pdfs/communication-technique/ETA 2824-2.pdf" />
          </div>
        </section>
      </div>
    </div>
  );
}
