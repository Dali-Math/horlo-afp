import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Sonnerie | Complications Horlogères Suisses",
  description:
    "Découvrez la sonnerie horlogère, une complication mécanique capable de faire retentir les heures, quarts et minutes à la demande grâce à des marteaux frappant des timbres.",
};

export default function SonneriePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Sonnerie (Minute Repeater)
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          La <strong>sonnerie</strong>, ou <em>minute repeater</em>, est une
          complication fascinante capable de sonner mécaniquement les heures,
          quarts et minutes à la demande. Véritable symphonie horlogère, elle
          fait appel à un système de marteaux frappant des timbres accordés pour
          produire un son pur et harmonieux.
        </p>

        <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            🔔 Fonctionnement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Lorsqu’on actionne le curseur ou le bouton de répétition, une
            séquence mécanique complexe libère l’énergie stockée dans un
            ressort. Cette énergie alimente les marteaux, qui frappent les
            timbres pour sonner les heures (sons graves), les quarts (sons
            doubles) et les minutes (sons aigus).
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            L’accord acoustique des timbres, souvent réalisé à la main, confère à
            chaque montre son caractère sonore unique, comparable à un
            instrument de musique miniature.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Invention</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              1750
            </p>
            <p className="text-gray-600 dark:text-gray-400">Breguet</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix estimé</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              300’000 – 3’000’000 CHF
            </p>
            <p className="text-gray-600 dark:text-gray-400">≈ 800 composants</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🏛️ Manufactures suisses associées
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Patek Philippe",
              "Vacheron Constantin",
              "Audemars Piguet",
              "Jaeger-LeCoultre",
            ].map((brand) => (
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
