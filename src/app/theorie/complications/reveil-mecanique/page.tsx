import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Réveil Mécanique | Complications Horlogères Suisses",
  description:
    "Découvrez le réveil mécanique, une complication horlogère qui émet un son vibrant à l’heure programmée. L’ancêtre du réveil moderne, symbole de précision et d’ingéniosité suisse.",
};

export default function ReveilMecaniquePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Réveil Mécanique
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Le <strong>réveil mécanique</strong> est une complication fonctionnelle qui émet
          un son ou une vibration à l’heure programmée. Véritable ancêtre du réveil
          moderne, il incarne la rencontre entre l’utilité quotidienne et la beauté de la
          mécanique horlogère.
        </p>

        <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ⏰ Fonctionnement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Ce système repose sur un barillet séparé dédié à la fonction de sonnerie. Une
            fois remonté, il libère son énergie à l’heure programmée, actionnant un marteau
            qui frappe une cloche, une membrane ou la carrure de la montre pour produire
            un son vibrant.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Cette complication fut très populaire dans les années 1950, notamment grâce à
            des marques comme <strong>Vulcain</strong>, célèbre pour sa “Cricket”,
            utilisée par de nombreux présidents américains.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Invention</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">1947</p>
            <p className="text-gray-600 dark:text-gray-400">Vulcain</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix estimé</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              8’000 – 50’000 CHF
            </p>
            <p className="text-gray-600 dark:text-gray-400">≈ 350 composants</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🏛️ Manufactures suisses associées
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Vulcain", "Jaeger-LeCoultre", "Breguet"].map((brand) => (
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
