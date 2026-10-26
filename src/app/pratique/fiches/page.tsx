"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, ArrowLeft, Sparkles, Compass, Wrench } from "lucide-react";

export default function FichesPage() {
  const fiches = [
    {
      title: "ETA 6497-1 (Unitas 16½''')",
      badge: "Manuel d'École • 18'000 A/h • Levée 44°/52°",
      description:
        "Communication technique officielle ETA — Éclaté des pièces, nomenclature Ebauches SA, plan d'huilage et séquence de montage du calibre de poche/école 16½ lignes.",
      link: "/pratique/fiches/eta6497",
      date: "Référence Manuel 16½ lignes",
    },
    {
      title: "ETA 2824-2 (et Sellita SW200-1)",
      badge: "Automatique • 28'800 A/h • Levée 50°",
      description:
        "Communication technique officielle ETA — Calibre automatique 11½ lignes à remontage bidirectionnel, quantième sautant et dispositif stop-seconde.",
      link: "/pratique/fiches/eta2824",
      date: "Référence Automatique 11½ lignes",
    },
    {
      title: "ETA / Valjoux 7750",
      badge: "Chronographe à Cames • 28'800 A/h • Levée 52°",
      description:
        "Plan d'atelier interactif (Loupe 10x) — Réglage de l'engrènement à 1/3 de dent du pignon oscillant (8080), came navette (8139), marteau (8200) et cartographie Moebius.",
      link: "/pratique/fiches/valjoux7750",
      date: "Référence Chronographe 13¼ lignes",
    },
    {
      title: "ETA 2892-A2 (et Sellita SW300-1)",
      badge: "Extra-Plat 3.60 mm • 28'800 A/h • Levée 51°/52°",
      description:
        "Plan d'atelier interactif (Loupe 10x) — Architecture extra-plate de Haute Horlogerie, masse oscillante sur roulement à 7 billes, inverseurs 1488 et réglage Etachron.",
      link: "/pratique/fiches/eta2892",
      date: "Référence Extra-Plat 11½ lignes",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220] text-slate-900 dark:text-white py-16 px-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-amber-600 dark:text-yellow-400 hover:underline transition mb-8 font-mono text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Retour à l&apos;Atelier Pratique
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="text-amber-500 dark:text-yellow-400 w-8 h-8" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Fiches Techniques &amp; Plans d&apos;Usine Suisses
          </h1>
        </div>

        <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-10 max-w-3xl">
          Consultez les communications techniques, schémas vectoriels avec loupe 10x, couples de serrage en cNm et plans de lubrification Moebius des 4 calibres suisses incontournables à l&apos;établi.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {fiches.map((fiche, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-yellow-500/30 p-7 rounded-2xl shadow-sm hover:border-amber-500 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-yellow-400 text-xs font-mono font-bold mb-3">
                  {fiche.badge}
                </span>
                <h3 className="text-slate-900 dark:text-yellow-400 text-2xl font-bold mb-2">
                  {fiche.title}
                </h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {fiche.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{fiche.date}</span>
                <Link
                  href={fiche.link}
                  className="bg-amber-500 dark:bg-yellow-400 text-slate-950 font-mono text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-amber-400 transition"
                >
                  📖 Ouvrir le Plan d&apos;Atelier
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
