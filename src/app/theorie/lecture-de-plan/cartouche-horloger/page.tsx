"use client";
import Link from "next/link";
import { useState } from "react";

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
      correction: "Le cartouche est l'élément administratif du plan : il identifie la pièce (numéro, titre), trace les modifications et certifie la validité (signatures). Sans lui, pas de traçabilité en production horlogère.",
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
      correction: "Échelle 1:1 = taille réelle de la pièce. En horlogerie, c'est courant pour les micro-pièces ; cela garantit une cotation précise sans conversion lors de l'usinage.",
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
      correction: "La zone 'Matière' (ex. : Acier Nivarox, Laiton) détermine les outils d'usinage, traitements et contrôles. Erreur ici = pièce inadaptée à son rôle (ex. : friction, corrosion).",
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
      correction: "Ra 0,8 µm mesure la rugosité moyenne de surface (norme ISO 4287). En horlogerie, c'est crucial pour les pivots : trop rugueux = usure, trop lisse = glissement.",
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
      correction: "La case 'Contrôlé' porte la signature et date du responsable qualité qui valide le plan. Cela assure la conformité aux normes ISO avant production.",
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
      correction: "Norme SI en Suisse : mm pour les cotes nominales. µm pour tolérances fines. Pas d'inch (américain) pour éviter erreurs d'interprétation internationale.",
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
      correction: "Tableau des révisions : date, description, responsable. Essentiel pour tracer les évolutions (ex. : correction tolérance) et versions (A, B, etc.).",
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
      correction: "Symbole (cône/tranché) au coin du plan : 1er angle (européen, Suisse) ou 3e (américain). Détermine l'ordre des vues (gauche/avant) pour lecture correcte.",
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
      correction: "±0,02 mm = variation autorisée autour de la cote nominale (ex. : 10 mm ±0,02 = 9,98 à 10,02 mm). Valeur standard en horlogerie pour axes et trous.",
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
      correction: "Le dessinateur (technicien CAO) signe et date : responsabilité de la géométrie, cotations et conformité initiale. Vérifié ensuite par 'Contrôlé'.",
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
      correction: "Indication explicite : 'Toutes les dimensions en mm sauf indication contraire'. Évite ambiguïtés (ex. : µm pour tolérances fines) et respecte la norme SI suisse.",
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
      correction: "Numéro unique (ex. : 12345-A) pour catalogage, recherche et versioning. Essentiel en production : référence pour commandes, archives et traçabilité.",
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
      correction: "Titre descriptif clair (ex. : 'Pont de balancier ETA 6497') pour identification rapide. Doit être précis, sans abréviations ambiguës.",
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
      correction: "ISO 5457 définit la taille, position et contenu du cartouche (185x45 mm en bas à droite). Obligatoire en Suisse pour uniformité internationale.",
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
      correction: "Lisibilité = lecture rapide par tous (dessinateur, usinage, contrôle). Traçabilité = suivi légal et qualité (ISO 9001). Évite erreurs coûteuses en production.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const handleAnswer = (i: number) => {
    setSelected(i);
    setShowCorrection(true);
    if (i === questions[current].correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    setSelected(null);
    setShowCorrection(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowCorrection(false);
    setShowScore(false);
  };

  return (
    <section className="bg-[#111827] text-gray-200 rounded-2xl shadow-lg p-8 mt-10 text-center">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Quiz : Teste tes connaissances</h2>
      {showScore ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Résultat final : <span className="text-[#E2B44F] font-bold">{score}</span> / {questions.length}
          </p>
          <p className="text-sm text-gray-400">
            {score === questions.length ? "Parfait ! Tu maîtrises le cartouche horloger." :
             score >= 12 ? "Excellent travail ! Quelques points à revoir." :
             score >= 8 ? "Bon niveau, continue à t'entraîner." :
             "Révise les normes ISO pour progresser."}
          </p>
          <button
            onClick={handleRestart}
            className="bg-[#E2B44F] hover:bg-[#d4ac3d] text-gray-900 px-6 py-2 rounded-lg font-semibold transition"
          >
            Recommencer le quiz
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="mb-4 text-gray-300 font-medium">{questions[current].question}</p>
          <div className="grid md:grid-cols-2 gap-3">
            {questions[current].options.map((option, i) => (
              <button
                key={i}
                onClick={() => !showCorrection && handleAnswer(i)}
                className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between
                  ${!showCorrection 
                    ? "bg-[#1c2333] hover:bg-[#2c3344] text-gray-200 border border-[#2c3344]" 
                    : i === questions[current].correct 
                      ? "border-2 border-green-500 bg-green-900/50 text-green-300" 
                      : i === selected && i !== questions[current].correct 
                        ? "border-2 border-red-500 bg-red-900/50 text-red-300 line-through" 
                        : "bg-[#1c2333] text-gray-400"
                  }`}
                disabled={showCorrection}
              >
                <span>{option}</span>
                {showCorrection && i === selected && (
                  i === questions[current].correct ? <span className="text-green-400">✅</span> : <span className="text-red-400">❌</span>
                )}
                {showCorrection && i === questions[current].correct && <span className="text-green-400">✅</span>}
              </button>
            ))}
          </div>
          {showCorrection && (
            <div className="text-left bg-[#1e293b] rounded-lg p-4 border border-[#E2B44F]/30">
              <h4 className="font-bold text-[#E2B44F] mb-2">
                {selected === questions[current].correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
              </h4>
              <p className="text-gray-200 text-sm">{questions[current].correction}</p>
            </div>
          )}
          {showCorrection && (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              {current + 1 < questions.length ? "Question suivante" : "Voir le score final"}
            </button>
          )}
          {!showCorrection && (
            <p className="text-xs text-gray-400">
              Question {current + 1} sur {questions.length} • Choisis une réponse
            </p>
          )}
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

        {/* Quiz interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
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
              src="https://www.youtube.com/watch?v=tatCrJPJGl4"
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
