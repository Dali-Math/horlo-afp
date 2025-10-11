"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function Eta2824Page() {
  return (
    <div className="min-h-screen bg-[#0b1220] text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/pratique/fiches"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition mb-8"
        >
          <ArrowLeft className="w-5 h-5" /> Retour
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-yellow-400 w-7 h-7" />
          <h1 className="text-3xl font-bold text-yellow-400">ETA 2824-2</h1>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          Communication technique officielle ETA — Détails complets du calibre 2824-2,
          mouvement automatique à remontage unidirectionnel.
        </p>

        <div className="flex justify-center">
          <FlipBookViewer file="/pdfs/communication-technique/ETA 2824-2.pdf" />
        </div>
      </div>
    </div>
  );
}
