"use client";
import Link from "next/link";

export default function TypesLignesIso1282Page() {
  const typesLignes = [
    {
      type: "Ligne continue épaisse",
      epaisseur: "0,5 à 1 mm",
      usage: "Contours visibles et contours de coupe. En horlogerie : représente les bords extérieurs des pièces (ex: ponts, platines).",
      exemple: "Utilisée pour les outlines principales d'un mouvement ETA.",
    },
    {
      type: "Ligne continue fine",
      epaisseur: "0,2 à 0,5 mm",
      usage: "Dimensions, hachures, lignes de prolongation et flèches. En horlogerie : cotes précises pour tolérances (ex: diamètres de pivots).",
      exemple: "Indique les mesures en mm/µm sur un plan de roue dentée.",
    },
    {
      type: "Ligne en tiretés (pointillés)",
      epaisseur: "0,3 à 0,5 mm",
      usage: "Arêtes cachées. En horlogerie : montre les parties internes non visibles (ex: trous sous une platine).",
      exemple: "Représente un axe interne d'un balancier sans démonter la pièce.",
    },
    {
      type: "Ligne en chaîne (tirets espacés)",
      epaisseur: "0,2 à 0,4 mm",
      usage: "Lignes de centre, trajectoires de mouvement et symétries. En horlogerie : axes de rotation (ex: pivots de roues).",
      exemple: "Trace le centre d'une roue d'échappement pour alignement.",
    },
    {
      type: "Ligne en tiretés fins (pointillés fins)",
      epaisseur: "0,1 à 0,3 mm",
      usage: "Lignes d'indication et de référence. En horlogerie : repères pour assemblages (ex: positions de vis).",
      exemple: "Indique l'orientation d'un composant lors du remontage.",
    },
    {
      type: "Ligne libre ou de croquis",
      epaisseur: "Variable (fine)",
      usage: "Annotations et esquisses préliminaires. En horlogerie : notes manuelles sur un prototype de plan.",
      exemple: "Croquis rapide d'un ajustement pour atelier.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Bouton Retour */}
        <div className="mb-6">
          <Link
            href="/theorie/cartouche-horloger" // Ajuste vers la page précédente (ex: cartouche ou normes ISO)
            className="text-blue-700 hover:underline flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>

        {/* Titre principal */}
        <header className="text-center space-y-4">
          <img
            src="/images/typ-logo.png" // Ton logo TyP (jaune/noir)
            alt="Logo TyP"
            className="mx-auto h-16 w-auto shadow-lg rounded-full"
          />
          <h1 className="text-4xl font-bold text-blue-900">
            Types de Lignes <span className="text-blue-600">(ISO 128-2)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            La norme ISO 128-2 définit les types de lignes standard pour les dessins techniques. En horlogerie suisse, elles assurent une représentation claire et précise des plans (contours, axes, cotes) pour éviter les ambiguïtés en production.
          </p>
        </header>

        {/* Section image illustrative */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma des Types de Lignes (ISO 128-2)</h2>
          <img
            src="/images/types-lignes-iso128-2.jpg" // Placeholder – remplace par ton schéma des lignes (ex: exemples visuels)
            alt="Schéma des types de lignes ISO 128-2"
            className="mx-auto rounded-lg shadow max-w-2xl w-full hover:scale-105 transition-transform"
          />
          <p className="text-gray-500 text-sm mt-4">
            Exemple d'application des lignes sur un plan technique horloger (épaisseurs et usages conformes à ISO 128-2).
          </p>
        </section>

        {/* Tableau des types de lignes */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Détails des Types de Lignes</h2>
          <p className="text-gray-600 mb-4">Chaque type a une épaisseur et un usage spécifique, adapté aux micro-pièces horlogères. Respecter ISO 128-2 évite les erreurs d'interprétation lors du démontage/remontage ou de l'usinage.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-collapse border-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-4 py-2 font-semibold">Type de Ligne</th>
                  <th className="border px-4 py-2 font-semibold">Épaisseur (mm)</th>
                  <th className="border px-4 py-2 font-semibold">Usage Technique</th>
                  <th className="border px-4 py-2 font-semibold">Exemple en Horlogerie</th>
                </tr>
              </thead>
              <tbody>
                {typesLignes.map((ligne, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="border px-4 py-3 font-semibold text-blue-900">{ligne.type}</td>
                    <td className="border px-4 py-3 font-mono">{ligne.epaisseur}</td>
                    <td className="border px-4 py-3 text-gray-700">{ligne.usage}</td>
                    <td className="border px-4 py-3 italic">{ligne.exemple}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            En Suisse, ces lignes sont combinées avec ISO 5457 (cartouches) pour des plans complets. L'épaisseur varie selon l'échelle (ex: 1:1 pour micro-pièces).
          </p>
        </section>

        {/* Astuce horlogère */}
        <section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-blue-900">
            "Une ligne mal choisie peut transformer un plan clair en puzzle horloger."
          </blockquote>
          <p className="mt-4 text-blue-700 font-medium">— Astuce pour les apprentis en dessin technique</p>
        </section>

        {/* Lien ISO */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 Pour aller plus loin :</p>
          <a
            href="https://www.iso.org/standard/75666.html" // Lien officiel ISO 128-2 (ajuste si version spécifique)
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme ISO 128-2 (Dessins techniques - Lignes)
          </a>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-6 border-t border-gray-200 pt-4">
          © HorloLearn 2025 — Norme ISO 128-2 / Pratiques de dessin horloger suisse.
        </footer>
      </div>
    </main>
  );
}
