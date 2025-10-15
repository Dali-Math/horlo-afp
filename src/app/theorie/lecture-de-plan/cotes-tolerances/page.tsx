"use client";
import { useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react"; // npm install lucide-react
import SchemaCotesTolerances from "@/components/SchemaCotesTolerances";
import QuizTolerance from "@/components/QuizTolerance";

export default function CotesTolerancesProPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* --- Header --- */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-900">
            Cotes et Tolérances <span className="text-blue-600">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Maîtrise les techniques de cotation et tolérance pour l’horlogerie suisse : assemblage, usinage, contrôle dimensionnel.
          </p>
        </header>

        {/* --- Schéma SVG interactif --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma interactif</h2>
          <SchemaCotesTolerances />
        </section>

        {/* --- Quiz interactif --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">Quiz QCM interactif</h2>
          <QuizTolerance />
        </section>

        {/* --- Fiche PDF à télécharger --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">Fiche de synthèse à télécharger</h2>
          <a 
            href="/fiches/cotes-tolerances.pdf" 
            download
            className="inline-block px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900 shadow"
          >
            Télécharger la fiche PDF
          </a>
          <p className="mt-2 text-gray-500 text-sm">Dépose la fiche dans <span className="font-mono">/public/fiches/cotes-tolerances.pdf</span></p>
        </section>

        {/* --- Ressources vidéo pédagogiques --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">Vidéo : Tolérance & Ajustement</h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200 mx-auto max-w-3xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/0ddnQpKz_gU"
              title="Tolérances et ajustement"
              allowFullScreen
            />
          </div>
        </section>

        {/* --- Tableau des tolérances --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">Exemples de tolérances</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left text-gray-700 mx-auto">
              <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-xs">
                <tr>
                  <th className="px-4 py-3 border">Type de pièce</th>
                  <th className="px-4 py-3 border">Cote nominale</th>
                  <th className="px-4 py-3 border">Tolérance</th>
                  <th className="px-4 py-3 border">Fonction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-3 border">Axe de balancier</td>
                  <td className="px-4 py-3 border">Ø 0.80 mm</td>
                  <td className="px-4 py-3 border">±0.005 mm</td>
                  <td className="px-4 py-3 border">Pivotement fluide</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border">Trou de rubis</td>
                  <td className="px-4 py-3 border">Ø 0.20 mm</td>
                  <td className="px-4 py-3 border">+0.002 / -0 mm</td>
                  <td className="px-4 py-3 border">Guidage précis</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 border">Barillet</td>
                  <td className="px-4 py-3 border">Ø 10.00 mm</td>
                  <td className="px-4 py-3 border">±0.02 mm</td>
                  <td className="px-4 py-3 border">Stockage énergie</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* --- Mémo bon/mauvais --- */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-xl font-semibold text-blue-800 mb-6">Mémo technique</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="flex items-center gap-2 text-red-600 text-lg font-bold mb-4">
                <XCircle className="w-5 h-5" /> Erreurs fréquentes
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Oublier d’indiquer une tolérance sur une cote fonctionnelle.</li>
                <li>Définir une tolérance trop serrée (coût, rejet).</li>
                <li>Choisir une tolérance trop large (jeu excessif).</li>
                <li>Confondre la cote maxi/min.</li>
                <li>Mélanger les unités sans préciser.</li>
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-2 text-green-700 text-lg font-bold mb-4">
                <CheckCircle className="w-5 h-5" /> Bonnes pratiques
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>Analyser la fonction réelle.</li>
                <li>Utiliser la norme ISO appropriée.</li>
                <li>Relire + valider avec l’atelier.</li>
                <li>Contrôle binôme.</li>
                <li>Cohérence des unités et précision.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- Appel à l'action --- */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 En savoir plus ?</p>
          <a
            href="https://www.iso.org/fr/standard/70382.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme complète ISO 129-1
          </a>
        </section>

        {/* --- Footer --- */}
        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Normes ISO 129-1 & ISO 1101.
        </footer>
      </div>
    </main>
  );
}
