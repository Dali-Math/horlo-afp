"use client";
import Link from "next/link";
import { useState } from "react";

// Composant QuizCartouche (séquentiel comme cotes-tolerances, avec indicateur "Question X sur Y")
function QuizCartouche() {
  const questions = [
    {
      question: "À quoi sert le cartouche horloger ?",
      options: [
        "Mettre en page un logo d'entreprise",
        "Dessiner le mouvement",
        "Identifier, tracer et certifier le plan technique",
        "Calculer les coûts de production"
      ],
      correct: 2,
    },
    {
      question: "Que signifie 'Échelle 1:1' ?",
      options: [
        "Le plan est réduit de moitié",
        "Le dessin est en deux dimensions",
        "Le dessin est à taille réelle",
        "L'échelle est multipliée par 2"
      ],
      correct: 2,
    },
    {
      question: "Quel élément indique la matière utilisée ?",
      options: [
        "La case 'Contrôlé'",
        "Le cartouche signature",
        "La zone 'Matière'",
        "La zone 'Modification'"
      ],
      correct: 2,
    },
    {
      question: "Que représente Ra 0,8 ?",
      options: [
        "Le diamètre de la pièce",
        "La dureté du matériau",
        "L’état de surface moyen (rugosité)",
        "La tolérance générale"
      ],
      correct: 2,
    },
    {
      question: "À quoi sert la case 'Contrôlé' ?",
      options: [
        "À noter l'échelle du dessin",
        "À donner la masse du composant",
        "À indiquer le vérificateur du plan",
        "À signer le dessinateur"
      ],
      correct: 2,
    },
    {
      question: "Quelle unité est obligatoire en horlogerie suisse ?",
      options: [
        "Le pouce (inch)",
        "Le centimètre (cm)",
        "Le millimètre (mm)",
        "Le micromètre (µm)"
      ],
      correct: 2,
    },
    {
      question: "Que contient la zone 'Modification' ?",
      options: [
        "La valeur du jeu fonctionnel",
        "Les initiales du designer",
        "L’historique des révisions du plan",
        "Le numéro de série"
      ],
      correct: 2,
    },
    {
      question: "Quelle est la fonction du symbole de projection ?",
      options: [
        "Donner la matière principale",
        "Vérifier l'état de surface",
        "Indiquer la méthode de vue (1er ou 3e angle)",
        "Afficher l'échelle"
      ],
      correct: 2,
    },
    {
      question: "Que signifie ±0,02 mm ?",
      options: [
        "La largeur totale du plan",
        "L'épaisseur de la feuille",
        "Tolérance générale de fabrication",
        "Le rayon maximal"
      ],
      correct: 2,
    },
    {
      question: "Qui signe la case 'Dessiné' ?",
      options: [
        "Le contrôleur qualité",
        "Le responsable production",
        "Le dessinateur technique responsable",
        "Le chef d'équipe"
      ],
      correct: 2,
    },
    {
      question: "Que trouve-t-on dans la zone 'Dimensions en mm' ?",
      options: [
        "Le diamètre minimal du rubis",
        "L'année de fabrication",
        "Les unités utilisées pour les cotes",
        "La masse de la pièce"
      ],
      correct: 2,
    },
    {
      question: "À quoi sert le numéro de plan ?",
      options: [
        "Afficher la marque de l'atelier",
        "Déterminer la surface polie",
        "Identifier et classer le dessin",
        "Calculer les tolérances"
      ],
      correct: 2,
    },
    {
      question: "Qu’indique la zone 'Titre du dessin' ?",
      options: [
        "La tolérance maximale",
        "La référence de l'acier",
        "Le nom de la pièce (ex: Pont, Roue...)",
        "L'échelle de vue"
      ],
      correct: 2,
    },
    {
      question: "Quel document normalise le cartouche ?",
      options: [
        "La norme ISO 14001",
        "La norme ISO 9001",
        "La norme ISO 5457",
        "La norme ISO 1101"
      ],
      correct: 2,
    },
    {
      question: "Pourquoi le cartouche doit-il être clair et uniforme ?",
      options: [
        "Pour impressionner le client",
        "Pour faciliter le scan",
        "Pour garantir la lisibilité et la traçabilité",
        "Pour accélérer l'impression"
      ],
      correct: 2,
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].correct) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else setShowScore(true);
  };

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Quiz : Teste tes connaissances</h2>

      {showScore ? (
        <p className="text-lg text-gray-300">
          Résultat : <span className="text-[#E2B44F]">{score}</span> /{" "}
          {questions.length}
        </p>
      ) : (
        <div>
          <p className="mb-4 text-gray-300">{questions[current].question}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="bg-[#1c2333] hover:bg-[#2c3344] text-gray-200 px-4 py-2 rounded-lg transition"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Question {current + 1} sur {questions.length}
          </p>
        </div>
      )}
    </section>
  );
}

export default function CartoucheHorlogerPage() {
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

        {/* Quiz interactif (comme dans cotes-tolerances) */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Quiz : Teste tes connaissances</h2>
          <QuizCartouche />
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
