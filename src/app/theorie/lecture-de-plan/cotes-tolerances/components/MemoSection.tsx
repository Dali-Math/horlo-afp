"use client";
import { CheckCircle, XCircle } from "lucide-react";

export default function MemoSection() {
  const erreurs = [
    "Oublier d'indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d’usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <section className="bg-[#111624] border border-[#1f2637] rounded-2xl p-10 shadow-lg">
      <h2 className="text-2xl font-semibold text-[#E2B44F] mb-10 text-center">
        Mémo Technique : Erreurs & Bonnes Pratiques
      </h2>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="flex items-center gap-2 text-red-400 text-lg font-semibold mb-4">
            <XCircle className="w-5 h-5" /> Erreurs fréquentes
          </h3>
          <ul className="space-y-3 text-gray-300">
            {erreurs.map((e, i) => (
              <li key={i} className="flex items-start gap-3">
                <XCircle className="w-4 h-4 mt-1 text-red-400" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-green-400 text-lg font-semibold mb-4">
            <CheckCircle className="w-5 h-5" /> Bonnes pratiques
          </h3>
          <ul className="space-y-3 text-gray-300">
            {bonnes.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 mt-1 text-green-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

