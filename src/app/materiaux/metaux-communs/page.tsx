"use client";

import { BookOpen } from "lucide-react";
import FlipBookViewer from "@/components/FlipBookViewer";

export default function MetauxCommunsPage() {
  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Partie droite : flipbook PDF */}
        <div className="bg-[#111827] p-6 rounded-2xl border border-yellow-500/30 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="text-yellow-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Métaux Commun — Flipbook
            </h2>
          </div>

          <FlipBookViewer file="/pdfs/metaux-communs.pdf" />
        </div>

      </div>
    </div>
  );
}
