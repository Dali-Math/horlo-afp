import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Calendrier Perpétuel | Complications Horlogères Suisses",
  description:
    "Découvrez le fonctionnement et l’histoire du calendrier perpétuel, une complication horlogère suisse capable de gérer automatiquement les années bissextiles jusqu’en 2100.",
};

export default function CalendrierPerpetuelPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Calendrier Perpétuel
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Le <strong>calendrier perpétuel</strong> est l'une des complications les plus sophistiquées
          de l’horlogerie suisse. Il ajuste automatiquement la date selon la longueur des mois
          et tient compte des années bissextiles, sans intervention humaine jusqu’en 2100.
        </p>

        <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            🧭 Fonctionnement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Ce mécanisme complexe repose sur un train d'engrenages lié à la roue des heures et à un
            programme mécanique de 48 mois, qui détermine la durée exacte de chaque mois
            (28, 30 ou 31 jours) et ajoute un jour supplémentaire tous les quatre ans pour
            les années bissextiles.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            En général, les montres à calendrier perpétuel comportent également les indications
            du jour, du mois et parfois de la phase de lune.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Invention</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">1884</p>
            <p className="text-gray-600 dark:text-gray-400">Patek Philippe</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix estimé</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              50’000 – 500’000 CHF
            </p>
            <p className="text-gray-600 dark:text-gray-400">≈ 600 composants</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🏛️ Manufactures suisses associées
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "IWC"].map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 bg-white/30 dark:bg-black/20 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/theorie/complications">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
              ← Retour aux complications
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
