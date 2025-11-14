"use client";

import { BookOpen } from "lucide-react";

export default function MetauxCommunsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* TITRE */}
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="text-yellow-400 w-6 h-6" />
          <h2 className="text-xl font-semibold text-yellow-400">
            Métaux Commun — Livre Horizontal
          </h2>
        </div>

        {/* LIVRE OUVERT */}
        <div className="relative mx-auto w-full max-w-6xl h-[550px] bg-white rounded-xl shadow-2xl overflow-hidden">

          {/* Ombre centrale (pliure) */}
          <div className="absolute top-0 left-1/2 w-2 h-full bg-black/20 blur-md"></div>

          {/* PAGE GAUCHE = PDF page 1 */}
          <div className="absolute top-0 left-0 w-1/2 h-full p-6 bg-white">
            <iframe
              src="/pdfs/metaux-communs.pdf#page=1&toolbar=0&navpanes=0"
              className="w-full h-full rounded"
            />
          </div>

          {/* PAGE DROITE = PDF page 2 */}
          <div className="absolute top-0 right-0 w-1/2 h-full p-6 bg-white">
            <iframe
              src="/pdfs/metaux-communs.pdf#page=2&toolbar=0&navpanes=0"
              className="w-full h-full rounded"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
