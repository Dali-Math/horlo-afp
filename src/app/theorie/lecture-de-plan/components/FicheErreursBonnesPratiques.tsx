"use client";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

// ✅ Fiche Erreurs & Bonnes pratiques (HorloLearn)
export default function FicheErreursBonnesPratiques() {
  const erreurs = [
    "Oublier d’indiquer la tolérance",
    "Tolérance trop serrée (blocage ou usinage coûteux)",
    "Tolérance trop large (jeu excessif, perte de précision)",
    "Mauvaise lecture de cote maxi/mini",
    "Confondre diamètre et dimension linéaire",
    "Négliger les tolérances géométriques (ISO 1101)",
    "Mélanger unités (mm, µm)",
  ];

  const bonnes = [
    "Préciser une tolérance adaptée à la fonction réelle",
    "Utiliser la cotation ISO appropriée (symboles, orientations)",
    "Relire sa cotation avec le plan d’ensemble ou coupe",
    "Consulter les opérateurs d’usinage pour valider la faisabilité",
    "Faire relire et valider son plan avant la fabrication",
    "Conserver la cohérence d’échelle et d’unités",
    "Se référer aux normes ISO 129-1 et ISO 1101 à chaque plan",
  ];

  return (
    <div className="bg-[#0b1220] rounded-xl shadow-lg px-6 py-8 my-12 max-w-3xl mx-auto border border-[#E2B44F80]">
      <h2 className="text-2xl font-bold text-[#E2B44F] mb-6 text-center underline">
        Erreurs fréquentes & Bonnes pratiques
      </h2>

      <div className="flex flex-col md:flex-row gap-8 justify-between">
        {/* Colonne Erreurs */}
        <div className="md:w-1/2">
          <h3 className="font-semibold text-red-400 text-lg flex items-center gap-2 mb-3">
            <XCircleIcon className="h-6 w-6 text-red-400" />
            Erreurs fréquentes
          </h3>
          <ul className="space-y-2">
            {erreurs.map((e, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-red-200">
                <XCircleIcon className="h-4 w-4 text-red-400" />
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne Bonnes pratiques */}
        <div className="md:w-1/2">
          <h3 className="font-semibold text-green-400 text-lg flex items-center gap-2 mb-3">
            <CheckCircleIcon className="h-6 w-6 text-green-400" />
            Bonnes pratiques
          </h3>
          <ul className="space-y-2">
            {bonnes.map((b, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-green-200">
                <CheckCircleIcon className="h-4 w-4 text-green-400" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
