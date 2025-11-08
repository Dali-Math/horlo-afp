import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Fusée & Chaînette | Complications Horlogères Suisses",
  description:
    "Découvrez la fusée et chaînette, un système antique garantissant une force constante au balancier. Remis au goût du jour pour une précision absolue en horlogerie moderne.",
};

export default function FuseeChainettePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Fusée & Chaînette
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          Le système de <strong>Fusée et Chaînette</strong> est un mécanisme antique conçu
          pour garantir une force constante transmise au balancier. Utilisé dès le XVIe
          siècle dans les montres de marine et les chronomètres de précision, il revient
          aujourd’hui dans certaines réalisations de haute horlogerie pour son raffinement
          mécanique et sa stabilité chronométrique.
        </p>

        <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ⚙️ Fonctionnement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            La fusée est un cône spiralé relié au barillet par une chaînette. Au fur et à
            mesure que le ressort du barillet se détend, la chaînette s’enroule sur la
            fusée, modifiant le rapport de transmission et compensant la baisse du couple.
            Ce système assure ainsi une tension constante, améliorant la précision du
            balancier.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Jadis abandonnée pour sa complexité, la fusée et chaînette a été réintroduite
            par certaines manufactures modernes, qui l’utilisent comme gage d’excellence
            et de savoir-faire artisanal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Invention</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">1525</p>
            <p className="text-gray-600 dark:text-gray-400">Horlogers allemands</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix estimé</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              150’000 – 1’500’000 CHF
            </p>
            <p className="text-gray-600 dark:text-gray-400">≈ 900 composants</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🏛️ Manufactures suisses associées
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Breguet", "Zenith", "Romain Gauthier", "F.P. Journe"].map((brand) => (
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
