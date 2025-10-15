"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const PlanInteractif = dynamic(() => import("@/components/PlanInteractif"), { ssr: false });

// ✅ FICHE DIRECTEMENT DANS LA PAGE
function FicheErreursBonnesPratiques() {
  const erreurs = [
    "Oublier d’indiquer la tolérance",
    "Tolérance trop serrée (blocage/usinage coûteux)",
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
    "Faire relire/valider son plan avant la fabrication",
    "Conserver la cohérence d’échelle et d’unités",
    "Se référer aux normes ISO 129-1 et ISO 1101 à chaque plan",
  ];

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg px-6 py-8 my-12 max-w-3xl mx-auto border border-[#E2B44F]">
      <h2 className="text-2xl font-bold text-[#E2B44F] mb-5 text-center underline">
        Fiche — Erreurs fréquentes & Bonnes pratiques
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="md:w-1/2">
          <h3 className="font-semibold text-red-400 text-lg flex items-center gap-1 mb-3">
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
        <div className="md:w-1/2">
          <h3 className="font-semibold text-green-400 text-lg flex items-center gap-1 mb-3">
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

// ✅ QUIZ INTÉGRÉ
function QuizTolerance() {
  const questions = [
    { q: "Qu'appelle-t-on 'cote nominale' ?", options: ["La dimension idéale sans tolérance", "La tolérance maximale autorisée", "L'écart entre deux dimensions"], answer: 0 },
    { q: "Une tolérance trop faible peut provoquer :", options: ["Un assemblage qui coince", "Du jeu excessif", "Les deux"], answer: 2 },
    { q: "Quelle unité est la plus utilisée en horlogerie pour les dimensions ?", options: ["Le centimètre", "Le millimètre", "Le micron"], answer: 1 },
    { q: "Une tolérance bilatérale se définit par :", options: ["Un écart supérieur et inférieur", "Uniquement un écart inférieur", "Uniquement un écart supérieur"], answer: 0 },
    { q: "Si une cote de 100 mm a une tolérance de +2 / -1, la cote minimale est :", options: ["98 mm", "99 mm", "102 mm"], answer: 1 },
    { q: "Pour que deux pièces s'assemblent sans jeu excessif, il faut une tolérance :", options: ["Très large", "Adaptée à la fonction", "Nulle"], answer: 1 },
    { q: "Les tolérances sont-elles toujours indiquées par une plage de valeurs ?", options: ["Oui", "Non, parfois seulement une limite", "Jamais"], answer: 1 },
    { q: "ISO 129-1 concerne :", options: ["Les tolérances géométriques", "La cotation dimensionnelle", "La dureté des matériaux"], answer: 1 },
    { q: "Une tolérance trop large peut induire :", options: ["Du jeu excessif", "Un assemblage parfait", "Un défaut d'usinage"], answer: 0 },
    { q: "ISO 1101 concerne :", options: ["L'usinage des boîtiers", "Les tolérances géométriques", "Le polissage"], answer: 1 },
    { q: "En horlogerie, un ajustement trop serré cause principalement :", options: ["Du jeu fonctionnel", "Un blocage ou usure prématurée", "Une précision accrue"], answer: 1 },
    { q: "Comment calcule-t-on l'intervalle de tolérance ?", options: ["Cote maxi - cote mini", "Cote nominale / 2", "Cote nominale x tolérance"], answer: 0 },
    { q: "Une cote sans tolérance est appelée :", options: ["Cote brute", "Cote fictive", "Cote nominale"], answer: 2 },
    { q: "Le symbole Ø devant une cote indique :", options: ["Une dimension linéaire", "Un diamètre", "Une épaisseur"], answer: 1 },
    { q: "Pourquoi utilise-t-on des tolérances en horlogerie ?", options: ["Pour simplifier les plans", "Pour garantir la fonctionnalité et l'assemblage", "Pour décorer les montres"], answer: 1 },
  ];

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleSelect = (i: number) => {
    setSelected(i);
    if (i === questions[idx].answer) setScore((s) => s + 1);
    setTimeout(() => {
      setSelected(null);
      setIdx((prev) => prev + 1);
    }, 800);
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg">
      {idx < questions.length ? (
        <>
          <div className="font-bold mb-3">{questions[idx].q}</div>
          {questions[idx].options.map((opt, i) => (
            <button
              key={i}
              className={`block w-full mb-2 p-3 rounded border text-center my-1 transition-colors
                ${selected !== null
                  ? i === questions[idx].answer
                    ? "border-green-500 bg-green-100 text-black"
                    : "border-red-500 bg-red-100 text-black"
                  : "border-gray-600 hover:bg-gray-700"}`}
              disabled={selected !== null}
              onClick={() => handleSelect(i)}
            >
              {opt}
            </button>
          ))}
        </>
      ) : (
        <div>
          <div className="font-bold text-lg mb-3">Score : {score} / {questions.length}</div>
          <div>Bravo ! Tu as terminé le quiz.</div>
        </div>
      )}
    </div>
  );
}

// ✅ PAGE PRINCIPALE
export default function CotesTolerances() {
  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/theorie/lecture-de-plan" className="text-[#E2B44F] hover:text-white transition-colors flex items-center gap-2">
            ← Retour
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-[#E2B44F] underline mb-6 text-center">
          Cotes et Tolérances (ISO 129-1 & ISO 1101)
        </h1>

        <p className="text-gray-300 mb-6 leading-relaxed">
          Ces normes précisent les règles de cotation et les tolérances <b>indispensables</b> à la qualité en horlogerie.
          Maîtrise-les pour comprendre l'assemblage, l'usinage et le contrôle dimensionnel des montres.
        </p>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Schéma interactif</h2>
          <PlanInteractif />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Quiz : Teste tes connaissances</h2>
          <QuizTolerance />
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-2">Vidéo : Tolérance & Ajustement</h2>
          <div className="w-full aspect-video max-w-2xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/_9zJ3vClwZw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
              title="Vidéo: Tolérances et Ajustements"
            ></iframe>
          </div>
        </div>

        {/* ✅ Fiche intégrée */}
        <FicheErreursBonnesPratiques />

        <ul className="list-disc pl-6 text-gray-400 space-y-2 mb-8">
          <li><strong>ISO 129-1</strong> : indication des dimensions sur plans techniques.</li>
          <li><strong>ISO 1101</strong> : tolérances géométriques des pièces.</li>
          <li>Respect des limites d'usinage et d'ajustement pour la fiabilité.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6 text-center">
          © HorloLearn 2025 — Résumé pédagogique basé sur les normes ISO 129-1:2018 & ISO 1101:2017.
        </p>
      </div>
    </section>
  );
}
