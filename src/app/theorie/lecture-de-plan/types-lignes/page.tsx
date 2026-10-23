"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function TypesLignesPage() {
  const [isDark, setIsDark] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [lineFilter, setLineFilter] = useState<"all" | "continu" | "interrompu" | "mixte">("all");
  const [selectedLineRow, setSelectedLineRow] = useState<string>("04.2");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasDark = document.documentElement.classList.contains("dark");
      setIsDark(hasDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof window !== "undefined") {
      if (nextDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="bg-[#FDFCFB] text-neutral-900 dark:bg-[#121316] dark:text-neutral-100 antialiased selection:bg-[#B08D57]/20 selection:text-[#8A6A3B] dark:selection:text-[#D4B483] min-h-screen pb-24 transition-colors duration-200">
        
        {/* TOP APP BAR */}
        <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#15161A]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Link href="/" className="font-bold text-neutral-900 dark:text-neutral-100 tracking-wider hover:opacity-80 transition-opacity">
                HORLOLEARN
              </Link>
              <span className="opacity-40">/</span>
              <Link href="/theorie" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                Théorie
              </Link>
              <span className="opacity-40">/</span>
              <Link href="/theorie/lecture-de-plan" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
                Lecture de Plan
              </Link>
              <span className="opacity-40">/</span>
              <span className="font-medium text-neutral-800 dark:text-neutral-200">Normes Suisses ISO &amp; NIHS</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle Button */}
              <button
                id="themeToggle"
                onClick={toggleTheme}
                type="button"
                className="px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>{isDark ? "☀️" : "🌙"}</span>
                <span>{isDark ? "Mode Clair" : "Mode Sombre"}</span>
              </button>

              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
                RÉFÉRENTIEL SUISSE CPIH / SEFRI
              </span>
            </div>
          </div>

          {/* Sub-Nav Modules Selector */}
          <div className="border-t border-neutral-100 dark:border-neutral-800/60 overflow-x-auto no-scrollbar">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-2 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab(0)}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 0
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                01. Types de Lignes (ISO 128-2)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(1)}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 1
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                02. Éléments d&apos;Horlogerie (NIHS)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(2)}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 2
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                03. Symboles &amp; Finitions (ISO 21920)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab(3)}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 3
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                04. Vues &amp; Projections (ISO 128-3)
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          {/* =================================================================== */}
          {/* MODULE 1 : TYPES DE LIGNES (ISO 128-2)                              */}
          {/* =================================================================== */}
          {activeTab === 0 && (
            <div id="module0" className="space-y-12">
              {/* Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
                  <span>📏 Norme Internationale ISO 128-2:2020</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  Types de Lignes &amp; Épaisseurs Normalisées en Dessin Horloger
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                  En microtechnique et horlogerie, chaque trait obéit à une hiérarchie visuelle stricte. Deux largeurs de trait sont obligatoirement associées dans un rapport géométrique de <span className="font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">1 : 2</span> pour garantir une lisibilité sans équivoque des micro-composants.
                </p>
              </div>

              {/* Interactive CAD SVG Drawing */}
              <div className="p-6 rounded-2xl border border-neutral-700/60 bg-[#181A1E] text-[#E0E2E6] space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B08D57]"></span>
                    PLAN TECHNIQUE D&apos;EXEMPLE : COUPE PARTIELLE D&apos;UN PONT &amp; NOYURE DE RUBIS
                  </span>
                  <span className="text-neutral-400">SURVOLEZ LES LIGNES OU CONSULTEZ LA LÉGENDE</span>
                </div>

                <div className="w-full overflow-x-auto flex justify-center py-4">
                  <svg viewBox="0 0 800 240" className="w-full max-w-[760px] h-auto select-none font-mono">
                    {/* Background Grid */}
                    <defs>
                      <pattern id="grid-lignes" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#252830" strokeWidth="0.5" />
                      </pattern>
                      {/* Hatch pattern for cross section (Trait continu fin 45°) */}
                      <pattern id="hatch-fine" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="8" stroke="#94A3B8" strokeWidth="0.75" />
                      </pattern>
                    </defs>
                    <rect width="800" height="240" fill="url(#grid-lignes)" rx="6"/>

                    {/* 1. Axis of revolution (Trait mixte fin Type 04.1) */}
                    <line x1="60" y1="120" x2="740" y2="120" stroke="#60A5FA" strokeWidth="1.2" strokeDasharray="16 3 3 3" />
                    <text x="750" y="124" fill="#60A5FA" fontSize="10" fontWeight="bold">AXE</text>

                    {/* 2. Revolved body with hatched cut */}
                    {/* Solid bridge body upper half */}
                    <polygon points="120,40 480,40 480,80 620,80 620,120 120,120" fill="url(#hatch-fine)" stroke="#E2E8F0" strokeWidth="2.5" />
                    {/* Lower half symmetrical */}
                    <polygon points="120,200 480,200 480,160 620,160 620,120 120,120" fill="url(#hatch-fine)" stroke="#E2E8F0" strokeWidth="2.5" />

                    {/* 3. Hidden edges (Trait interrompu fin Type 02.1 - noyure de lubrification cachée) */}
                    <line x1="240" y1="40" x2="240" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />
                    <line x1="360" y1="40" x2="360" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />
                    <line x1="240" y1="70" x2="360" y2="70" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />

                    <line x1="240" y1="200" x2="240" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />
                    <line x1="360" y1="200" x2="360" y2="120" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />
                    <line x1="240" y1="170" x2="360" y2="170" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />

                    {/* 4. Dimension lines (Trait continu fin Type 01.1 avec flèches) */}
                    <line x1="120" y1="20" x2="120" y2="35" stroke="#B08D57" strokeWidth="0.8" />
                    <line x1="620" y1="20" x2="620" y2="75" stroke="#B08D57" strokeWidth="0.8" />
                    <line x1="120" y1="25" x2="620" y2="25" stroke="#B08D57" strokeWidth="1.2" />
                    <polygon points="120,25 128,22 128,28" fill="#B08D57"/>
                    <polygon points="620,25 612,22 612,28" fill="#B08D57"/>
                    <rect x="340" y="15" width="60" height="18" fill="#181A1E" rx="2"/>
                    <text x="370" y="28" fill="#D4B483" fontSize="11" fontWeight="bold" textAnchor="middle">50 ± 0.02</text>

                    {/* 5. Break line / Arrachement partiel (Trait fin continu ondulé) */}
                    <path d="M 120 40 Q 110 80 120 120 T 120 200" fill="none" stroke="#E2E8F0" strokeWidth="1.2"/>

                    {/* Interactive callouts labels */}
                    <g transform="translate(180, 220)">
                      <circle cx="0" cy="0" r="4" fill="#E2E8F0" />
                      <text x="10" y="4" fill="#E2E8F0" fontSize="11">Trait continu fort (0.5 mm) · Contour visible</text>
                    </g>
                    <g transform="translate(480, 220)">
                      <circle cx="0" cy="0" r="4" fill="#F59E0B" />
                      <text x="10" y="4" fill="#F59E0B" fontSize="11">Trait interrompu (0.25 mm) · Noyure cachée</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Tableau Normalisé des Lignes Techniques (ISO 128-2) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#8A6A3B] dark:text-[#D4B483]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                      <span>Tableau Normalisé des Lignes Techniques (ISO 128-2)</span>
                    </h2>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      Synthèse officielle pour les examens théoriques de l&apos;apprentissage AFP / CFC horloger en Suisse.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 bg-neutral-100 dark:bg-[#15171D] p-1 rounded-xl border border-neutral-300 dark:border-neutral-800 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setLineFilter("all")}
                      className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        lineFilter === "all"
                          ? "bg-[#B08D57] text-neutral-950 shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                      }`}
                    >
                      Tous
                    </button>
                    <button
                      type="button"
                      onClick={() => setLineFilter("continu")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        lineFilter === "continu"
                          ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                      }`}
                    >
                      Continus
                    </button>
                    <button
                      type="button"
                      onClick={() => setLineFilter("interrompu")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        lineFilter === "interrompu"
                          ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                      }`}
                    >
                      Interrompus
                    </button>
                    <button
                      type="button"
                      onClick={() => setLineFilter("mixte")}
                      className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        lineFilter === "mixte"
                          ? "bg-[#B08D57] text-neutral-950 font-bold shadow-sm"
                          : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                      }`}
                    >
                      Mixtes
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#15171D] shadow-sm">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#191C23] font-mono text-neutral-500 dark:text-neutral-400">
                        <th className="p-4">Code ISO</th>
                        <th className="p-4">Type de Trait</th>
                        <th className="p-4">Rendu Graphique</th>
                        <th className="p-4 text-center">Épaisseur Standard</th>
                        <th className="p-4 text-center">Haute Précision</th>
                        <th className="p-4">Exemples d&apos;Application Horlogère</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {/* 01.2 */}
                      {(lineFilter === "all" || lineFilter === "continu") && (
                        <tr
                          onClick={() => setSelectedLineRow("01.2")}
                          className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer ${
                            selectedLineRow === "01.2" ? "bg-[#B08D57]/10" : ""
                          }`}
                        >
                          <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">01.2</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Trait continu fort</div>
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">2d (Épais)</div>
                          </td>
                          <td className="p-4">
                            <div className="w-32 py-1">
                              <div className="w-full h-1 bg-neutral-900 dark:bg-neutral-100 rounded-sm"></div>
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">0.50 mm</td>
                          <td className="p-4 text-center font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">0.35 mm</td>
                          <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                            Arêtes et contours visibles des platines, ponts, coqs et masses oscillantes
                          </td>
                        </tr>
                      )}

                      {/* 01.1 */}
                      {(lineFilter === "all" || lineFilter === "continu") && (
                        <tr
                          onClick={() => setSelectedLineRow("01.1")}
                          className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer ${
                            selectedLineRow === "01.1" ? "bg-[#B08D57]/10" : ""
                          }`}
                        >
                          <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">01.1</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Trait continu fin</div>
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">1d (Fin)</div>
                          </td>
                          <td className="p-4">
                            <div className="w-32 py-1">
                              <div className="w-full h-0.5 bg-neutral-500 dark:bg-neutral-400 rounded-sm"></div>
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">0.25 mm</td>
                          <td className="p-4 text-center font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">0.18 mm</td>
                          <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                            Lignes de cote, lignes d&apos;attache et lignes de rappel
                          </td>
                        </tr>
                      )}

                      {/* 02.1 */}
                      {(lineFilter === "all" || lineFilter === "interrompu") && (
                        <tr
                          onClick={() => setSelectedLineRow("02.1")}
                          className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer ${
                            selectedLineRow === "02.1" ? "bg-[#B08D57]/10" : ""
                          }`}
                        >
                          <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">02.1</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Trait interrompu fin</div>
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">1d (Fin)</div>
                          </td>
                          <td className="p-4">
                            <div className="w-32 py-1">
                              <div className="w-full border-b-2 border-dashed border-amber-500 dark:border-amber-400"></div>
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">0.25 mm</td>
                          <td className="p-4 text-center font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">0.18 mm</td>
                          <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                            Contours et arêtes cachés (noyures de rubis sous un pont)
                          </td>
                        </tr>
                      )}

                      {/* 04.1 */}
                      {(lineFilter === "all" || lineFilter === "mixte") && (
                        <tr
                          onClick={() => setSelectedLineRow("04.1")}
                          className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer ${
                            selectedLineRow === "04.1" ? "bg-[#B08D57]/10" : ""
                          }`}
                        >
                          <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">04.1</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Trait mixte fin (trait-point)</div>
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">1d (Fin)</div>
                          </td>
                          <td className="p-4">
                            <div className="w-32 py-1 text-sky-600 dark:text-sky-400 font-mono text-[11px] tracking-tight">
                              ── · ── · ── · ──
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">0.25 mm</td>
                          <td className="p-4 text-center font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">0.18 mm</td>
                          <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                            Axes de révolution des mobiles (balancier, roue d&apos;échappement, barillet)
                          </td>
                        </tr>
                      )}

                      {/* 04.2 */}
                      {(lineFilter === "all" || lineFilter === "mixte") && (
                        <tr
                          onClick={() => setSelectedLineRow("04.2")}
                          className={`transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/40 cursor-pointer ${
                            selectedLineRow === "04.2" ? "bg-[#B08D57]/10" : ""
                          }`}
                        >
                          <td className="p-4 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">04.2</td>
                          <td className="p-4">
                            <div className="font-semibold text-neutral-900 dark:text-neutral-100">Trait mixte avec extrémités fortes</div>
                            <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">2d aux bouts / 1d au centre</div>
                          </td>
                          <td className="p-4">
                            <div className="w-32 py-1 flex items-center">
                              <span className="w-4 h-1 bg-rose-500 rounded-xs"></span>
                              <span className="flex-1 text-center font-mono text-[11px] text-rose-500 dark:text-rose-400">· ── ·</span>
                              <span className="w-4 h-1 bg-rose-500 rounded-xs"></span>
                            </div>
                          </td>
                          <td className="p-4 text-center font-mono font-bold text-neutral-900 dark:text-neutral-100">0.50 / 0.25 mm</td>
                          <td className="p-4 text-center font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">0.35 / 0.18 mm</td>
                          <td className="p-4 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
                            Indication des plans de coupe A-A traversant le rouage ou l&apos;échappement
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Workshop Rule Box */}
              <div className="p-4 rounded-xl border border-sky-300 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-200 text-xs space-y-2">
                <span className="font-bold flex items-center gap-1.5 text-sm">💡 Règle d&apos;or de l&apos;école horlogère :</span>
                <p className="leading-relaxed">
                  Pour les pièces d&apos;extrême précision dessinées à grande échelle (5:1 ou 10:1), le groupe <strong>0.35 mm / 0.18 mm</strong> est préconisé pour éviter l&apos;écrasement visuel des fentes de vis et des micro-gorges d&apos;huilage. Les hachures ne doivent jamais couper un axe ni s&apos;arrêter sur un contour caché.
                </p>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* MODULE 2 : ÉLÉMENTS D'HORLOGERIE (NORMES NIHS)                      */}
          {/* =================================================================== */}
          {activeTab === 1 && (
            <div id="module1" className="space-y-12">
              {/* Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
                  <span>⚙ Fédération Horlogère Suisse · Normes NIHS</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  Composants Standardisés &amp; Visserie Horlogère (Normes NIHS)
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                  Les Normes de l&apos;Industrie Horlogère Suisse (NIHS) régissent avec une précision micrométrique l&apos;ensemble des organes d&apos;assemblage, vis miniature à profil &quot;S&quot;, rubis d&apos;empierrement et profils de dentures d&apos;engrenage.
                </p>
              </div>

              {/* 4 Standard Components Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Visserie Miniature S (NIHS 06-10) */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">1. Visserie Miniature Horlogère (NIHS 06-10 / 06-25)</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-bold">Profil S</span>
                  </div>
                  <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                    <rect width="360" height="160" fill="#181A1E" rx="8"/>
                    <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                    {/* Screw head cylindrical with flat slot */}
                    <rect x="50" y="35" width="70" height="90" fill="#334155" stroke="#CBD5E1" strokeWidth="2" rx="2"/>
                    {/* Slot (fente de tournevis) */}
                    <rect x="50" y="65" width="25" height="30" fill="#0F172A" stroke="#B08D57" strokeWidth="1.5"/>
                    {/* Cylindrical body with threads */}
                    <rect x="120" y="55" width="160" height="50" fill="#475569" stroke="#CBD5E1" strokeWidth="2"/>
                    {/* Thread lines (fond de filet fin ISO) */}
                    <line x1="120" y1="60" x2="270" y2="60" stroke="#B08D57" strokeWidth="1" strokeDasharray="2 2"/>
                    <line x1="120" y1="100" x2="270" y2="100" stroke="#B08D57" strokeWidth="1" strokeDasharray="2 2"/>
                    {/* Labels */}
                    <text x="85" y="25" fill="#E2E8F0" fontSize="10" textAnchor="middle">Tête (D)</text>
                    <text x="62" y="112" fill="#B08D57" fontSize="9">Fente (n)</text>
                    <text x="195" y="48" fill="#D4B483" fontSize="10" textAnchor="middle">Filetage S 0.80 à S 1.40</text>
                    <text x="200" y="130" fill="#94A3B8" fontSize="9" textAnchor="middle">Pas fin horloger P = 0.20 mm</text>
                  </svg>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Les vis horlogères ont un angle de filet de <strong>60°</strong> avec profil miniature arrondi. La profondeur de fente garantit le guidage parfait de la lame de tournevis rectifiée sans rayer les ponts polis.
                  </p>
                </div>

                {/* 2. Pierres Synthétiques / Rubis (NIHS 30-01) */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">2. Coussinets en Rubis Synthétique (NIHS 30-01)</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-600 dark:text-rose-300 font-bold">Corindon Al₂O₃</span>
                  </div>
                  <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                    <rect width="360" height="160" fill="#181A1E" rx="8"/>
                    <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                    {/* Ruby cross section */}
                    <path d="M 100 40 L 260 40 L 260 65 L 240 65 L 240 120 L 100 120 Z" fill="#BE123C" fillOpacity="0.8" stroke="#FB7185" strokeWidth="2"/>
                    {/* Olivage reservoir for oil */}
                    <ellipse cx="170" cy="80" rx="30" ry="12" fill="#181A1E" stroke="#FDE047" strokeWidth="1.5"/>
                    <circle cx="170" cy="80" r="4" fill="#38BDF8"/>
                    <text x="170" y="32" fill="#FB7185" fontSize="10" fontWeight="bold" textAnchor="middle">RUBIS CHASSÉ D&apos;UN PONT</text>
                    <text x="170" y="110" fill="#FDE047" fontSize="9" textAnchor="middle">Cuvette d&apos;huile Moebius (Olivage)</text>
                    <text x="170" y="145" fill="#38BDF8" fontSize="9" textAnchor="middle">Trou cylindrique Ø 0.12 mm H6</text>
                  </svg>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Le profil intérieur olivé évite le coincement du pivot lors de flexions de l&apos;axe et retient la goutte d&apos;huile par capillarité. Tolérance de chassage serrée de l&apos;ordre de <strong>± 0,004 mm</strong>.
                  </p>
                </div>

                {/* 3. Pivots et Tigerons (NIHS 20-02) */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">3. Pivots de Mobiles &amp; Arbres (NIHS 20-02)</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-bold">Acier Trempé 20AP</span>
                  </div>
                  <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                    <rect width="360" height="160" fill="#181A1E" rx="8"/>
                    <line x1="20" y1="80" x2="340" y2="80" stroke="#4B5563" strokeWidth="1" strokeDasharray="8 3 2 3"/>
                    {/* Shaft body */}
                    <rect x="40" y="45" width="160" height="70" fill="#334155" stroke="#CBD5E1" strokeWidth="2"/>
                    {/* Shoulder (assiette) */}
                    <path d="M 200 45 L 230 65 L 230 95 L 200 115 Z" fill="#475569" stroke="#CBD5E1" strokeWidth="1.5"/>
                    {/* Polished cylindrical pivot */}
                    <rect x="230" y="70" width="75" height="20" fill="#94A3B8" stroke="#38BDF8" strokeWidth="2"/>
                    {/* Rounded tip */}
                    <path d="M 305 70 A 10 10 0 0 1 305 90 Z" fill="#38BDF8"/>
                    <text x="120" y="35" fill="#E2E8F0" fontSize="10" textAnchor="middle">Tige Ø 0.80 mm</text>
                    <text x="215" y="135" fill="#F59E0B" fontSize="9" textAnchor="middle">Assiette de portée</text>
                    <text x="270" y="60" fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="middle">Pivot Ø 0.10 h5 (Poli roulé)</text>
                  </svg>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Les pivots subissent le <strong>roulage</strong> au disque de métal dur ou brunissage pour obtenir un état de surface miroir (Ra &lt; 0,05 µm) assurant un rendement mécanique maximal.
                  </p>
                </div>

                {/* 4. Dentures Cycloïdales Horlogères (NIHS 20-25) */}
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
                    <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">4. Profil d&apos;Engrenage Cycloïdal (NIHS 20-25)</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">Roulement Pur</span>
                  </div>
                  <svg viewBox="0 0 360 160" className="w-full h-auto select-none font-mono">
                    <rect width="360" height="160" fill="#181A1E" rx="8"/>
                    {/* Pitch circle (trait mixte fin) */}
                    <line x1="20" y1="90" x2="340" y2="90" stroke="#B08D57" strokeWidth="1.2" strokeDasharray="10 3 2 3"/>
                    {/* Tooth profile */}
                    <path d="M 60 130 L 100 130 L 100 90 Q 115 50 130 50 Q 145 50 160 90 L 160 130 L 200 130 L 200 90 Q 215 50 230 50 Q 245 50 260 90 L 260 130 L 300 130" fill="none" stroke="#10B981" strokeWidth="2.5"/>
                    <text x="180" y="40" fill="#10B981" fontSize="10" fontWeight="bold" textAnchor="middle">Courbe ogivale épicycloïdale</text>
                    <text x="300" y="82" fill="#D4B483" fontSize="9" textAnchor="end">Cercle primitif (d)</text>
                    <text x="130" y="115" fill="#94A3B8" fontSize="9" textAnchor="middle">Flanc radial</text>
                  </svg>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Contrairement à l&apos;industrie générale (profil développante de cercle), l&apos;horlogerie utilise la <strong>denture cycloïdale suisse</strong> : elle réduit drastiquement les frottements sur les petits nombres d&apos;ailes de pignon (6 à 12 ailes).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* MODULE 3 : SYMBOLES & ÉTATS DE SURFACE (ISO 21920 & ISO 13715)      */}
          {/* =================================================================== */}
          {activeTab === 2 && (
            <div id="module2" className="space-y-12">
              {/* Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
                  <span>✨ Normes ISO 21920 (Remplace ISO 1302) &amp; ISO 13715</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  États de Surface, Rugosité Ra &amp; Cotation des Arêtes
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                  En haute horlogerie suisse, la rugosité (Ra) et l&apos;état des arêtes (chanfreins, biseaux d&apos;anglage) conditionnent à la fois la fluidité cinématique, la tenue des lubrifiants et les critères d&apos;attribution des labels de prestige (Poinçon de Genève, COSC).
                </p>
              </div>

              {/* Symbols Anatomy CAD Box */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">Anatomie du Symbole de Rugosité (ISO 21920)</h3>
                  <svg viewBox="0 0 380 180" className="w-full h-auto select-none font-mono">
                    <rect width="380" height="180" fill="#181A1E" rx="8"/>
                    {/* Triangle base */}
                    <polyline points="60,130 110,40 180,40" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                    <polyline points="60,130 85,85" fill="none" stroke="#B08D57" strokeWidth="2.5" />
                    {/* Bar closing triangle = Material removal mandatory */}
                    <line x1="60" y1="85" x2="110" y2="85" stroke="#B08D57" strokeWidth="2" />

                    {/* Labels around the symbol */}
                    <text x="195" y="38" fill="#38BDF8" fontSize="12" fontWeight="bold">Ra 0.4</text>
                    <text x="195" y="55" fill="#94A3B8" fontSize="10">Procédé : Rectification / Lapidage</text>
                    <text x="195" y="72" fill="#CBD5E1" fontSize="10">Longueur de base : 0.8 mm</text>
                    
                    <circle cx="85" cy="85" r="3" fill="#E2E8F0" />
                    <line x1="85" y1="85" x2="30" y2="40" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2 2"/>
                    <text x="25" y="30" fill="#E2E8F0" fontSize="10">Enlèvement de matière obligatoire</text>

                    <rect x="30" y="145" width="320" height="24" fill="#252830" rx="4"/>
                    <text x="190" y="161" fill="#D4B483" fontSize="10" textAnchor="middle">Surface usinée (Tournage, Fraisage, Roulage)</text>
                  </svg>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 leading-relaxed">
                    <div><strong className="text-neutral-900 dark:text-neutral-100">Symbole fermé avec barre :</strong> Usinage mécanique obligatoire pour éliminer le brut.</div>
                    <div><strong className="text-neutral-900 dark:text-neutral-100">Symbole avec cercle inscrit :</strong> Enlèvement de matière interdit (tôle brute, pièce finie par étirage).</div>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-4">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">Cotation des Arêtes &amp; Bavures (ISO 13715)</h3>
                  <svg viewBox="0 0 380 180" className="w-full h-auto select-none font-mono">
                    <rect width="380" height="180" fill="#181A1E" rx="8"/>
                    {/* Part edge corner */}
                    <polyline points="80,140 80,60 180,60" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                    
                    {/* ISO 13715 symbol */}
                    <line x1="80" y1="60" x2="40" y2="20" stroke="#B08D57" strokeWidth="1.5" />
                    <polyline points="40,20 20,40" fill="none" stroke="#B08D57" strokeWidth="1.5" />
                    <polyline points="40,20 80,20" fill="none" stroke="#B08D57" strokeWidth="1.5" />
                    
                    <text x="90" y="24" fill="#F43F5E" fontSize="12" fontWeight="bold">- 0.05</text>
                    <text x="180" y="24" fill="#94A3B8" fontSize="10">Arête cassée (Biseau/Chanfrein)</text>

                    <rect x="30" y="100" width="320" height="65" fill="#252830" rx="4"/>
                    <text x="45" y="118" fill="#10B981" fontSize="10">Signe - (moins) : Arête abattue / chanfreinée</text>
                    <text x="45" y="135" fill="#F43F5E" fontSize="10">Signe + (plus) : Bavure résiduelle permise</text>
                    <text x="45" y="152" fill="#38BDF8" fontSize="10">Signe ± 0 : Arête vive rigoureusement sans bavure</text>
                  </svg>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    En horlogerie, les ponts et platines portent systématiquement l&apos;indication <span className="font-mono text-rose-500 font-bold">-0.02 à -0.05 mm</span> pour proscrire toute bavure tranchante risquant de contaminer le rouage.
                  </p>
                </div>
              </div>

              {/* Swiss Finishes Table (Décoration d'Atelier) */}
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 overflow-hidden shadow-sm">
                <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/80 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-neutral-900 dark:text-neutral-100">Finition &amp; États de Surface Horlogers de Référence</span>
                  <span className="text-xs font-mono text-[#8A6A3B] dark:text-[#D4B483]">Critères Poinçon de Genève</span>
                </div>
                <table className="w-full text-xs text-left">
                  <thead className="bg-neutral-50 dark:bg-neutral-800/60 text-neutral-500 font-mono border-b border-neutral-200 dark:border-neutral-800">
                    <tr>
                      <th className="p-3.5">Finition / Décoration</th>
                      <th className="p-3.5">Rugosité Ra visée</th>
                      <th className="p-3.5">Outil / Matière d&apos;Atelier</th>
                      <th className="p-3.5">Objectif Fonctionnel &amp; Esthétique</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-sans">
                    <tr>
                      <td className="p-3.5 font-bold text-neutral-900 dark:text-neutral-100">Poli bloqué (Poli noir)</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">Ra &lt; 0.02 µm</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Plaque de zinc + pâte diamantée 0.5 µm</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Réflexion optique spéculaire totale : noir profond ou éclat blanc pur selon l&apos;angle.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-neutral-900 dark:text-neutral-100">Anglage au berceau (45°)</td>
                      <td className="p-3.5 font-mono font-bold text-emerald-600 dark:text-emerald-400">Ra &lt; 0.05 µm</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Lime berceau puis bois de gentiane + diamant</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Suppression des arêtes vives, accroche de la lumière et mise en valeur des ponts.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-neutral-900 dark:text-neutral-100">Côtes de Genève</td>
                      <td className="p-3.5 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">Ra 0.1 – 0.2 µm</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Meule buis imprégnée d&apos;émeri sur tournette</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Ondulations parallèles régulières piégeant les micro-poussières résiduelles.</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-neutral-900 dark:text-neutral-100">Perlage (Bouchonnage)</td>
                      <td className="p-3.5 font-mono font-bold text-[#8A6A3B] dark:text-[#D4B483]">Ra 0.2 – 0.4 µm</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Tampon caoutchouc chargé ou bois rotatif</td>
                      <td className="p-3.5 text-neutral-600 dark:text-neutral-400">Cercles imbriqués décorant la platine côté cadran et dessous des ponts.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* MODULE 4 : VUES TECHNIQUES & PROJECTIONS (ISO 128-3)                 */}
          {/* =================================================================== */}
          {activeTab === 3 && (
            <div id="module3" className="space-y-12">
              {/* Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] border border-[#B08D57]/30">
                  <span>📐 Norme Internationale ISO 128-3:2020</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  Vues Techniques, Méthode E &amp; Coupes Brutes Horlogères
                </h1>
                <p className="text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                  En Suisse et en Europe, les dessins horlogers appliquent rigoureusement la <span className="font-semibold text-neutral-900 dark:text-neutral-100">Méthode de projection du premier dièdre (Méthode E)</span>. Ce module détaille la disposition des 6 vues et le tracé des coupes brisées traversant le rouage.
                </p>
              </div>

              {/* Projection Cube Unfolded Diagram */}
              <div className="p-6 rounded-2xl border border-neutral-700/60 bg-[#181A1E] text-[#E0E2E6] space-y-4">
                <div className="flex flex-wrap items-center justify-between text-xs font-mono border-b border-neutral-800 pb-3">
                  <span className="text-neutral-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#B08D57]"></span>
                    DISPOSITION NORMALISÉE DU PREMIER DIÈDRE (MÉTHODE E EUROPÉENNE)
                  </span>
                  <div className="flex items-center gap-2 text-[#D4B483]">
                    <span>SYMBOLE NORMALISÉ :</span>
                    {/* Official Cone symbol */}
                    <svg width="45" height="18" viewBox="0 0 50 20" className="inline">
                      <polygon points="5,5 25,2 25,18 5,15" fill="none" stroke="#D4B483" strokeWidth="1.2"/>
                      <circle cx="38" cy="10" r="7" fill="none" stroke="#D4B483" strokeWidth="1.2"/>
                      <circle cx="38" cy="10" r="3" fill="none" stroke="#D4B483" strokeWidth="0.8"/>
                    </svg>
                  </div>
                </div>

                <div className="w-full overflow-x-auto flex justify-center py-6">
                  <svg viewBox="0 0 760 360" className="w-full max-w-[700px] h-auto select-none font-mono">
                    {/* Grid lines between views */}
                    <line x1="280" y1="20" x2="280" y2="340" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>
                    <line x1="480" y1="20" x2="480" y2="340" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>
                    <line x1="40" y1="130" x2="720" y2="130" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>
                    <line x1="40" y1="250" x2="720" y2="250" stroke="#334155" strokeWidth="1" strokeDasharray="4 4"/>

                    {/* 1. VUE DE DESSOUS (Placée AU-DESSUS de la vue de face) */}
                    <g transform="translate(300, 30)">
                      <rect width="160" height="80" fill="#242832" stroke="#64748B" strokeWidth="1.5" rx="4"/>
                      <circle cx="80" cy="40" r="20" fill="#1E222A" stroke="#94A3B8" strokeWidth="1"/>
                      <text x="80" y="44" fill="#94A3B8" fontSize="10" textAnchor="middle">VUE DE DESSOUS</text>
                    </g>

                    {/* 2. VUE DE DROITE (Placée À GAUCHE de la vue de face) */}
                    <g transform="translate(100, 140)">
                      <rect width="160" height="90" fill="#242832" stroke="#64748B" strokeWidth="1.5" rx="4"/>
                      <text x="80" y="49" fill="#94A3B8" fontSize="10" textAnchor="middle">VUE DE DROITE</text>
                    </g>

                    {/* 3. VUE DE FACE (Vue principale au centre) */}
                    <g transform="translate(300, 140)">
                      <rect width="160" height="90" fill="#2E3442" stroke="#B08D57" strokeWidth="2.5" rx="4"/>
                      <circle cx="80" cy="45" r="25" fill="#181A1E" stroke="#38BDF8" strokeWidth="1.5"/>
                      <line x1="20" y1="45" x2="140" y2="45" stroke="#38BDF8" strokeDasharray="4 2" strokeWidth="1"/>
                      <text x="80" y="49" fill="#D4B483" fontSize="11" fontWeight="bold" textAnchor="middle">VUE DE FACE</text>
                      <text x="80" y="75" fill="#E2E8F0" fontSize="9" textAnchor="middle">(Vue Principale)</text>
                    </g>

                    {/* 4. VUE DE GAUCHE (Placée À DROITE de la vue de face) */}
                    <g transform="translate(500, 140)">
                      <rect width="160" height="90" fill="#242832" stroke="#64748B" strokeWidth="1.5" rx="4"/>
                      <text x="80" y="49" fill="#94A3B8" fontSize="10" textAnchor="middle">VUE DE GAUCHE</text>
                    </g>

                    {/* 5. VUE DE DESSUS (Placée EN DESSOUS de la vue de face) */}
                    <g transform="translate(300, 260)">
                      <rect width="160" height="80" fill="#242832" stroke="#64748B" strokeWidth="1.5" rx="4"/>
                      <text x="80" y="44" fill="#94A3B8" fontSize="10" textAnchor="middle">VUE DE DESSUS</text>
                    </g>
                  </svg>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-lg border border-neutral-800 text-xs text-neutral-400">
                  <strong className="text-[#D4B483]">Règle mnémotechnique suisse :</strong> L&apos;observateur regarde la pièce depuis la gauche et <em>projette son dessin sur la feuille située à droite</em>. D&apos;où l&apos;inversion caractéristique : ce qu&apos;on voit de gauche se dessine à droite !
                </div>
              </div>

              {/* Coupes et Sections Horlogères */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-3">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">Coupe Brisée à Plans Parallèles</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Dans un mouvement de montre, les axes d&apos;engrenage ne sont jamais alignés sur une seule ligne droite. On utilise obligatoirement une coupe brisée : le plan de coupe fait des décrochements à 90° pour traverser successivement le barillet, la roue de centre, la roue moyenne, la roue des secondes et l&apos;échappement.
                  </p>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                    Tracé de coupe : Trait mixte fin avec renforts épais aux extrémités et aux angles de changement de direction.
                  </div>
                </div>

                <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 space-y-3">
                  <h3 className="font-serif font-bold text-base text-neutral-900 dark:text-neutral-100">Demi-Coupe (Vue combinée extérieure / intérieure)</h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Très employée pour les pièces de révolution symétriques (balanciers, tambours de barillet, lunettes de boîtier) : une moitié de la pièce est représentée en vue extérieure, tandis que l&apos;autre moitié est hachurée en coupe intérieure pour révéler la bonde ou les crans de cliquet.
                  </p>
                  <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                    Séparation : L&apos;axe de symétrie (trait mixte fin) forme la frontière stricte entre vue et coupe.
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
