"use client";
import Link from "next/link";
import { ArrowLeft, Wrench, BookOpen, ArrowRight, Layers } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function DemontageEta6497() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1220] text-slate-900 dark:text-white py-12 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/pratique/demontage"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-yellow-400 hover:underline font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" /> Retour au Protocole de Démontage (12 étapes)
          </Link>

          <Link
            href="/pratique/calibre-3d"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/25 transition"
          >
            <Layers className="w-4 h-4" />
            <span>Ouvrir le Porte-Mouvement 360° Libre</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-3xl bg-white dark:bg-[#111827] border-2 border-slate-200 dark:border-yellow-500/30 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Wrench className="text-amber-500 dark:text-yellow-400 w-6 h-6" />
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-yellow-400">
                Calibre Suisse ETA 6497-1 • Écorché Cinématique 3D (97 Fournitures CAO)
              </h1>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              16½ Lignes (36,6 mm) • 18 000 A/h (2,5 Hz) • 17 Rubis
            </span>
          </div>

          <div className="w-full aspect-[16/9] bg-[#eef5f0]">
            <iframe
              src="/cutaway-eta6497.html"
              title="Écorché Cinématique 3D Calibre ETA 6497-1 (97 Fournitures)"
              className="w-full h-full border-0"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-yellow-500/30 shadow-lg space-y-5">
            <h2 className="text-xl font-bold text-slate-900 dark:text-yellow-400">
              Démonstration Vidéo d&apos;Établi
            </h2>

            <iframe
              className="rounded-xl w-full aspect-video"
              src="https://www.youtube.com/embed/SbA4uJXlK9g"
              title="Démontage du mouvement ETA 6497"
              allowFullScreen
            />

            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm">
              Le démontage du mouvement ETA 6497-1 constitue la base de l&apos;apprentissage à l&apos;établi. Travaillez sur un porte-mouvement stable avec des tournevis affûtés sans jeu dans la fente de vis, désarmez systématiquement le ressort moteur avant toute dépose des ponts et mettez immédiatement le balancier-spiral à l&apos;abri.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200 dark:border-yellow-500/30 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-amber-500 dark:text-yellow-400 w-6 h-6" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-yellow-400">
                Fiche Technique de Démontage ETA 6497-1
              </h2>
            </div>
            <FlipBookViewer file="/pdfs/demontage/ETA-6497-Demontage.pdf" />
          </div>
        </div>
      </div>
    </div>
  );
}
