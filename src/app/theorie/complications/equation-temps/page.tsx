import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Équation du Temps | Complications Horlogères Suisses",
  description:
    "Découvrez le principe de l'équation du temps, une complication horlogère rare qui affiche la différence entre le temps solaire vrai et le temps moyen, soit ±16 minutes par an.",
};

export default function EquationTempsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Équation du Temps
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
          L’<strong>équation du temps</strong> est une complication horlogère fascinante,
          conçue pour indiquer la différence entre le temps solaire vrai – mesuré par le
          mouvement réel du Soleil – et le temps moyen utilisé par nos horloges modernes.
          Cette différence peut atteindre jusqu’à ±16 minutes au cours de l’année.
        </p>

        <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-10 text-left">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            🌞 Fonctionnement
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            L’équation du temps repose sur un mécanisme différentiel complexe qui compare deux
            rotations : celle du Soleil apparent et celle d’un temps moyen fictif. La lecture se
            fait souvent par une aiguille spécifique ou un affichage en cadran secondaire.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Certaines montres combinent cette complication avec un calendrier annuel ou un
            indicateur zodiacal, créant ainsi un lien direct entre le temps civil et le temps
            astronomique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Invention</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">1660</p>
            <p className="text-gray-600 dark:text-gray-400">Christiaan Huygens</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">Prix estimé</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              150’000 – 1’000’000 CHF
            </p>
            <p className="text-gray-600 dark:text-gray-400">≈ 550 composants</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            🏛️ Manufactures suisses associées
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Vacheron Constantin", "Audemars Piguet", "Breguet", "Patek Philippe"].map(
              (brand) => (
                <span
                  key={brand}
                  className="px-3 py-1 bg-white/30 dark:bg-black/20 rounded-full text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {brand}
                </span>
              )
            )}
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
