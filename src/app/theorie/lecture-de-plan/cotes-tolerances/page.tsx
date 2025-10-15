"use client";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

export default function CotesEtTolerancesPage() {
  const erreurs = [
    "Oublier d’indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l’assemblage final.",
    "Valider la faisabilité des tolérances avec l’atelier d’usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* --- Header --- */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cotes et Tolérances <span className="text-blue-600">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Maîtrise les règles de cotation et les tolérances indispensables à la qualité
            en horlogerie : assemblage, usinage et contrôle dimensionnel.
          </p>
        </header>

        {/* --- Schéma Interactif --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma Interactif</h2>

          <div className="flex justify-center mb-4">
            <Image
              src="/images/theorie/schema-tolerances-horlogeres.png"
              alt="Schéma des tolérances horlogères"
              width={700}
              height={400}
              className="rounded-lg shadow-md border border-gray-200 hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          <p className="text-gray-500 text-sm">
            Cliquez sur l’image pour afficher l’explication pédagogique.
          </p>
        </section>

        {/* --- Bonnes pratiques & erreurs --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-10 text-center">
            Mémo Technique : Erreurs & Bonnes Pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-red-600 text-lg font-semibold mb-4">
                <XCircle className="w-5 h-5" /> Erreurs fréquentes
              </h3>
              <ul className="space-y-3 text-gray-700">
                {erreurs.map((e, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 mt-1 text-red-400" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-green-700 text-lg font-semibold mb-4">
                <CheckCircle className="w-5 h-5" /> Bonnes pratiques
              </h3>
              <ul className="space-y-3 text-gray-700">
                {bonnes.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
