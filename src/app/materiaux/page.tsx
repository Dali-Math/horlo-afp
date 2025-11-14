'use client';

import Link from 'next/link';
import { Gem, BookOpen } from 'lucide-react';

export default function MateriauxHomePage() {
  return (
    <main className="min-h-screen bg-[#050A18] text-white py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-yellow-400">
        📚 Matériaux Horlogers
      </h1>

      <div className="space-y-6 max-w-3xl">

        {/* Carte 1: Métaux Communs */}
        <Link
          href="/materiaux/metaux-communs"
          className="block bg-[#1C2437] p-6 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <div className="flex items-start gap-4">
            <Gem className="text-yellow-300 h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">Métaux en Horlogerie Suisse</h2>
              <p className="text-gray-300 text-sm mt-1">
                Métaux, alliages, céramiques et matériaux modernes utilisés dans les montres suisses.
              </p>
            </div>
          </div>
        </Link>

        {/* Carte 2: Guide Complet */}
        <Link
          href="/materiaux/guide-complet"
          className="block bg-[#1C2437] p-6 rounded-xl shadow hover:scale-[1.02] transition"
        >
          <div className="flex items-start gap-4">
            <BookOpen className="text-yellow-300 h-8 w-8" />
            <div>
              <h2 className="text-xl font-bold">Guide Complet des Matériaux Horlogers</h2>
              <p className="text-gray-300 text-sm mt-1">
                Un guide approfondi sur tous les matériaux utilisés dans l’horlogerie moderne.
              </p>
            </div>
          </div>
        </Link>
        
      </div>
    </main>
  );
}
