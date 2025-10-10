"use client";
import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";

export default function DemontagePage() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Wrench className="text-yellow-400 w-7 h-7" />
          <h1 className="text-3xl font-bold text-yellow-400">
            Démontage & Remontage
          </h1>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Découvrez étape par étape le démontage complet du mouvement ETA 6497 :
          préparation, retrait des aiguilles, démontage du balancier, de
          l'échappement et du barillet.
        </p>

        <iframe
          className="w-full aspect-video rounded-xl border border-yellow-400/30 mb-6"
          src="https://www.youtube-nocookie.com/embed/SlB9FukapN4"
          title="Démontage mouvement ETA 6497"
          allowFullScreen
        />

        <p className="text-gray-400">
          Téléchargez aussi le guide complet du démontage au format PDF :
          <a
            href="/pdf/tutoriels/initiation-demontage.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:text-white ml-2 underline"
          >
            Voir le PDF
          </a>
        </p>
      </div>
    </div>
  );
}
