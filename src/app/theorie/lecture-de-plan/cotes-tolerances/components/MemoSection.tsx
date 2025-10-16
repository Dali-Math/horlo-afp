"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function MemoSection() {
  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques.",
    "Mélanger les unités de mesure (mm et µm).",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce avant de définir la tolérance.",
    "Utiliser la syntaxe ISO appropriée.",
    "Toujours valider la faisabilité des tolérances.",
    "Vérifier la cohérence sur l’ensemble du plan.",
  ];

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 mt-10">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-6 text-center">
        Mémo Technique : Erreurs & Bonnes Pratiques
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="flex items-center gap-2 text-red-400 mb-3 font-semibold">
            <XCircleIcon className="w-5 h-5" /> Erreurs fréquentes
          </h3>
          <ul className="space-y-2 text-gray-400">
            {erreurs.map((e, i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircleIcon className="w-4 h-4 mt-1 text-red-500" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-green-400 mb-3 font-semibold">
            <CheckCircleIcon className="w-5 h-5" /> Bonnes pratiques
          </h3>
          <ul className="space-y-2 text-gray-400">
            {bonnes.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 mt-1 text-green-500" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
