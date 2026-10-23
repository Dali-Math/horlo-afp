"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function TypesLignesPage() {
  const [lineFilter, setLineFilter] = useState("all");
  const [selectedLineRow, setSelectedLineRow] = useState("04.2");

  return (
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
            <span className="font-medium text-neutral-800 dark:text-neutral-200">Types de Lignes</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#B08D57]/10 text-[#8A6A3B] dark:text-[#D4B483] font-semibold border border-[#B08D57]/20">
              ISO 128-2 · CPIH / SEFRI
            </span>
          </div>
        </div>

        {/* Sub-Nav Modules Selector */}
        <div className="border-t border-neutral-100 dark:border-neutral-800/60 overflow-x-auto no-scrollbar">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-2 py-2">
            <Link
              href="/theorie/lecture-de-plan/types-lignes"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-sm"
            >
              1. Types de Lignes
            </Link>
            <Link
              href="/theorie/lecture-de-plan/elements-horlogerie"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              2. Éléments d&apos;Horlogerie
            </Link>
            <Link
              href="/theorie/lecture-de-plan/symboles-normalises"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              3. Symboles Normalisés
            </Link>
            <Link
              href="/theorie/lecture-de-plan/vues-techniques"
              className="px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            >
              4. Vues Techniques
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12">
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

          {/* =================================================================== */}

        {/* BOTTOM NAVIGATION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <Link
            href="/theorie/lecture-de-plan"
            className="text-xs font-mono text-neutral-400 hover:text-[#B08D57] transition-colors"
          >
            ← Vue d&apos;ensemble du Hub
          </Link>

          <Link
            href="/theorie/lecture-de-plan/elements-horlogerie"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#8A6A3B] dark:text-[#D4B483] hover:underline transition-all"
          >
            <span>Module 2 : Éléments d&apos;Horlogerie (NIHS)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </main>
    </div>
  );
}
