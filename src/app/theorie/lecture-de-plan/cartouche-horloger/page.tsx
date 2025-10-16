"use client";
import Link from "next/link";
import { useState } from "react";

type Question = {
  q: string;
  a: string;
  choices: string[];
};

const quiz: Question[] = [
  {
    q: "À quoi sert le cartouche horloger ?",
    a: "Identifier, tracer et certifier le plan technique",
    choices: [
      "Identifier, tracer et certifier le plan technique",
      "Mettre en page un logo d'entreprise",
      "Dessiner le mouvement"
    ]
  },
  {
    q: "Que signifie 'Échelle 1:1' ?",
    a: "Le dessin est à taille réelle",
    choices: [
      "Le dessin est à taille réelle",
      "Le plan est réduit de moitié",
      "Le dessin est en deux dimensions"
    ]
  },
  {
    q: "Quel élément indique la matière utilisée ?",
    a: "La zone 'Matière'",
    choices: [
      "La zone 'Matière'",
      "La case 'Contrôlé'",
      "Le cartouche signature"
    ]
  },
  {
    q: "Que représente Ra 0,8 ?",
    a: "L’état de surface moyen (rugosité)",
    choices: [
      "L’état de surface moyen (rugosité)",
      "Le diamètre de la pièce",
      "La dureté du matériau"
    ]
  },
  {
    q: "À quoi sert la case 'Contrôlé' ?",
    a: "À indiquer le vérificateur du plan",
    choices: [
      "À indiquer le vérificateur du plan",
      "À noter l'échelle du dessin",
      "À donner la masse du composant"
    ]
  },
  {
    q: "Quelle unité est obligatoire en horlogerie suisse ?",
    a: "Le millimètre (mm)",
    choices: [
      "Le millimètre (mm)",
      "Le pouce (inch)",
      "Le centimètre (cm)"
    ]
  },
  {
    q: "Que contient la zone 'Modification' ?",
    a: "L’historique des révisions du plan",
    choices: [
      "L’historique des révisions du plan",
      "La valeur du jeu fonctionnel",
      "Les initiales du designer"
    ]
  },
  {
    q: "Quelle est la fonction du symbole de projection ?",
    a: "Indiquer la méthode de vue (1er ou 3e angle)",
    choices: [
      "Indiquer la méthode de vue (1er ou 3e angle)",
      "Donner la matière principale",
      "Vérifier l'état de surface"
    ]
  },
  {
    q: "Que signifie ±0,02 mm ?",
    a: "Tolérance générale de fabrication",
    choices: [
      "Tolérance générale de fabrication",
      "La largeur totale du plan",
      "L'épaisseur de la feuille"
    ]
  },
  {
    q: "Qui signe la case 'Dessiné' ?",
    a: "Le dessinateur technique responsable",
    choices: [
      "Le dessinateur technique responsable",
      "Le contrôleur qualité",
      "Le responsable production"
    ]
  },
  {
    q: "Que trouve-t-on dans la zone 'Dimensions en mm' ?",
    a: "Les unités utilisées pour les cotes",
    choices: [
      "Les unités utilisées pour les cotes",
      "Le diamètre minimal du rubis",
      "L'année de fabrication"
    ]
  },
  {
    q: "À quoi sert le numéro de plan ?",
    a: "Identifier et classer le dessin",
    choices: [
      "Identifier et classer le dessin",
      "Afficher la marque de l'atelier",
      "Déterminer la surface polie"
    ]
  },
  {
    q: "Qu’indique la zone 'Titre du dessin' ?",
    a: "Le nom de la pièce (ex: Pont, Roue...)",
    choices: [
      "Le nom de la pièce (ex: Pont, Roue...)",
      "La tolérance maximale",
      "La référence de l'acier"
    ]
  },
  {
    q: "Quel document normalise le cartouche ?",
    a: "La norme ISO 5457",
    choices: [
      "La norme ISO 5457",
      "La norme ISO 14001",
      "La norme ISO 9001"
    ]
  },
  {
    q: "Pourquoi le cartouche doit-il être clair et uniforme ?",
    a: "Pour garantir la lisibilité et la traçabilité",
    choices: [
      "Pour garantir la lisibilité et la traçabilité",
      "Pour impressionner le client",
      "Pour faciliter le scan"
    ]
  }
];

export default function CartoucheHorlogerPage() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState<number | null>(null);

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

  const handleRestart = () => {
    setAnswers({});
    setScore(null);
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

        {/* Quiz interactif corrigé */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>
          <div className="space-y-6 text-left">
            {quiz.map((q, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <p className="font-semibold mb-2">{i + 1}. {q.q}</p>
                <div className="space-y-1">
                  {q.choices.map((a) => (
                    <label key={a} className="block">
                      <input
                        type="radio"
                        name={`q${i}`}
                        value={a}
                        checked={answers[i] === a}
                        onChange={() => handleAnswer(i, a)}
                        className="mr-2 accent-blue-600"
                        disabled={score !== null}
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {score === null ? (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition"
              disabled={Object.keys(answers).length !== quiz.length}
            >
              Valider mes réponses
            </button>
          ) : (
            <>
              <p className="mt-6 text-lg font-semibold text-blue-900">
                Score : {score} / {quiz.length}
              </p>
              <p className="mt-2 text-base text-gray-800">
                {score === quiz.length
                  ? "Bravo ! Toutes les réponses sont correctes."
                  : score >= Math.floor(quiz.length * 0.7)
                  ? "Bien joué ! Quelques petites erreurs à corriger."
                  : "Révise le cartouche et réessaie pour un score parfait."}
              </p>
              <button
                onClick={handleRestart}
                className="mt-4 bg-gray-200 text-blue-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-300 transition"
              >
                Recommencer le quiz
              </button>
            </>
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
