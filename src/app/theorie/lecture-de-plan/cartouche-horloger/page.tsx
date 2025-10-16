"use client";
import Link from "next/link";
import { useState } from "react";

export default function CartoucheHorlogerPage() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState<number | null>(null);

  const quiz = [
    { q: "À quoi sert le cartouche horloger ?", a: "Identifier, tracer et certifier le plan technique" },
    { q: "Que signifie 'Échelle 1:1' ?", a: "Le dessin est à taille réelle" },
    { q: "Quel élément indique la matière utilisée ?", a: "La zone 'Matière'" },
    { q: "Que représente Ra 0,8 ?", a: "L’état de surface moyen (rugosité)" },
    { q: "À quoi sert la case 'Contrôlé' ?", a: "À indiquer le vérificateur du plan" },
    { q: "Quelle unité est obligatoire en horlogerie suisse ?", a: "Le millimètre (mm)" },
    { q: "Que contient la zone 'Modification' ?", a: "L’historique des révisions du plan" },
    { q: "Quelle est la fonction du symbole de projection ?", a: "Indiquer la méthode de vue (1er ou 3e angle)" },
    { q: "Que signifie ±0,02 mm ?", a: "Tolérance générale de fabrication" },
    { q: "Qui signe la case 'Dessiné' ?", a: "Le dessinateur technique responsable" },
    { q: "Que trouve-t-on dans la zone 'Dimensions en mm' ?", a: "Les unités utilisées pour les cotes" },
    { q: "À quoi sert le numéro de plan ?", a: "Identifier et classer le dessin" },
    { q: "Qu’indique la zone 'Titre du dessin' ?", a: "Le nom de la pièce (ex: Pont, Roue...)" },
    { q: "Quel document normalise le cartouche ?", a: "La norme ISO 5457" },
    { q: "Pourquoi le cartouche doit-il être clair et uniforme ?", a: "Pour garantir la lisibilité et la traçabilité" },
  ];

  const handleAnswer = (i: number, ans: string) => {
    setAnswers({ ...answers, [i]: ans });
  };

  const handleSubmit = () => {
    let sc = 0;
    quiz.forEach((q, i) => {
      if (answers[i] && answers[i] === q.a) sc++;
    });
    setScore(sc);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Bouton Retour */}
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
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
          <h1 className="text-4xl font-bold text-blue-900">
            Cartouche Horloger <span className="text-blue-600">(Normes techniques)</span>
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
            Le <strong>cartouche horloger</strong> est un élément essentiel d’un plan technique.
            Il regroupe les informations d’identification, de fabrication et de contrôle qui garantissent la traçabilité et la qualité du dessin.
          </p>
        </header>

        {/* Section schéma */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schéma d’un Cartouche Horloger</h2>
          <img
            src="/images/cartouche-horloger.jpg"
            alt="Schéma du cartouche horloger"
            className="mx-auto rounded-lg shadow max-w-2xl w-full hover:scale-105 transition-transform"
          />
          <p className="text-gray-500 text-sm mt-4">
            Exemple type d’un cartouche utilisé en horlogerie suisse.
          </p>
        </section>

        {/* Détails du cartouche */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 leading-relaxed">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Composition du Cartouche</h2>
          <ul className="list-disc pl-6 space-y-3 text-gray-700">
            <li><b>Titre du dessin</b> : désignation claire de la pièce (ex : Pont de balancier, Roue moyenne).</li>
            <li><b>Numéro de plan</b> : référence unique pour le suivi et la version du plan.</li>
            <li><b>Échelle</b> : rapport entre la taille réelle et la taille du dessin (ex : 5:1, 1:1, 2:1).</li>
            <li><b>Nom du dessinateur</b> : personne ayant réalisé le plan.</li>
            <li><b>Date</b> : date de création ou de révision du plan.</li>
            <li><b>Matériau</b> : indication de la matière utilisée (ex : Laiton, Acier trempé, Rubis synthétique).</li>
            <li><b>Traitement thermique / de surface</b> : spécifie les opérations (ex : trempe, polissage, rhodiage).</li>
            <li><b>Tolérances générales</b> : valeurs par défaut si non précisées sur le dessin (ex : ±0.02 mm).</li>
            <li><b>Validation</b> : signature du responsable technique ou du chef d’atelier.</li>
          </ul>
        </section>

        {/* Quiz interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>
          <div className="space-y-6 text-left">
            {quiz.map((q, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <p className="font-semibold mb-2">{i + 1}. {q.q}</p>
                <div className="space-y-1">
                  {["Identifier, tracer et certifier le plan technique", "Le dessin est à taille réelle", "La zone 'Matière'", "L’état de surface moyen (rugosité)", "À indiquer le vérificateur du plan", "Le millimètre (mm)", "L’historique des révisions du plan", "Indiquer la méthode de vue (1er ou 3e angle)", "Tolérance générale de fabrication", "Le dessinateur technique responsable", "Les unités utilisées pour les cotes", "Identifier et classer le dessin", "Le nom de la pièce (ex: Pont, Roue...)", "La norme ISO 5457", "Pour garantir la lisibilité et la traçabilité"].map((a) => (
                    <label key={a} className="block">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={a}
                        checked={answers[i] === a}
                        onChange={() => handleAnswer(i, a)}
                        className="mr-2 accent-blue-600"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Valider mes réponses
          </button>

          {score !== null && (
            <p className="mt-6 text-lg font-semibold text-blue-900">
              Score : {score} / {quiz.length}
            </p>
          )}
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Vidéo : Cartouche & Lecture de plan
          </h2>
          <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/tatCrJPJGl4?rel=0&modestbranding=1"
              title="Cartouche & Lecture de plan"
              allowFullScreen
            />
          </div>
          <a
            href="https://www.youtube.com/watch?v=tatCrJPJGl4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            🔗 Ouvrir sur YouTube
          </a>
        </section>

        {/* Astuce horlogère */}
        <section className="bg-blue-50 border border-blue-100 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-blue-900">
            “Un bon cartouche, c’est la carte d’identité du plan horloger.”
          </blockquote>
          <p className="mt-4 text-blue-700 font-medium">— Règle de base en dessin horloger</p>
        </section>

        {/* Lien ISO */}
        <section className="text-center py-10">
          <p className="text-gray-600 text-lg mb-4">📘 Pour aller plus loin :</p>
          <a
            href="https://www.iso.org/fr/standard/3362.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
          >
            Consulter la norme ISO 5457 (Cartouches techniques)
          </a>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-6">
          © HorloLearn 2025 — Norme ISO 5457 / Pratiques horlogères suisses.
        </footer>
      </div>
    </main>
  );
}
