"use client";
import Link from "next/link";
import { ArrowLeft, Wrench, BookOpen, ArrowRight, Layers } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function DemontageEta6497() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Partie gauche : vidéo + texte */}
        <div>
          <Link
            href="/pratique/demontage"
            className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <Wrench className="text-yellow-400 w-7 h-7" />
            <h1 className="text-3xl font-bold text-yellow-400">
              Démontage ETA 6497
            </h1>
          </div>

          <Link
            href="/pratique/calibre-3d"
            className="flex items-center justify-between p-4 mb-6 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 hover:border-amber-400 transition group shadow-lg shadow-amber-500/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg shrink-0">
                ⚙️
              </div>
              <div>
                <strong className="block text-white group-hover:text-amber-400 text-sm flex items-center gap-2">
                  <span>Examiner en 3D 360° (Simulateur d&apos;Établi)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold font-mono">NOUVEAU</span>
                </strong>
                <span className="text-xs text-gray-300">
                  Porte-mouvement 360°, écorché vertical Z des 7 couches &amp; cinématique
                </span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition shrink-0 ml-2" />
          </Link>

          <iframe
            className="rounded-xl mb-6 w-full aspect-video"
            src="https://www.youtube.com/embed/SbA4uJXlK9g"
            title="Démontage du mouvement ETA 6497"
            allowFullScreen
          ></iframe>

          <p className="text-gray-300 leading-relaxed">
            Le démontage du mouvement ETA 6497 est une excellente introduction
            aux mécanismes mécaniques manuels. Prenez soin d'utiliser un support
            stable, un tournevis adapté et de travailler dans un environnement
            propre. Ce calibre, très répandu dans les écoles d'horlogerie,
            permet d'acquérir les gestes essentiels.
          </p>
        </div>

        {/* Partie droite : flipbook PDF */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Guide de Démontage ETA 6497
            </h2>
          </div>
          <FlipBookViewer file="/pdfs/demontage/ETA-6497-Demontage.pdf" />
        </div>
      </div>
    </div>
  );
}
