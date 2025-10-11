"use client";
import Link from "next/link";
import { ArrowLeft, Wrench, BookOpen } from "lucide-react";
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
