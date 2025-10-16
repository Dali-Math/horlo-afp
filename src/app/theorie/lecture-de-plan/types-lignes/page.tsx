"use client";
import Link from "next/link";
import { useState } from "react";

function QuizTypesLignes() {
  const questions = [
    {
      question: "Quelle ligne représente les contours visibles et de coupe ?",
      options: [
        "Ligne en tiretés",
        "Ligne continue fine",
        "Ligne continue épaisse",
        "Ligne en chaîne"
      ],
      correct: 2,
      correction: "La ligne continue épaisse (0,5-1 mm) définit les bords extérieurs (ex: contours d'un pont de balancier). Essentiel pour l'usinage précis en horlogerie.",
    },
    {
      question: "Quelle ligne est utilisée pour les dimensions et cotes ?",
      options: [
        "Ligne en tiretés fins",
        "Ligne continue épaisse",
        "Ligne continue fine",
        "Ligne libre"
      ],
      correct: 2,
      correction: "La ligne continue fine (0,2-0,5 mm) trace les prolongations, flèches et hachures pour cotes en mm/µm (ex: diamètre d'un pivot). Évite les ambiguïtés sur les plans.",
    },
    {
      question: "Quelle ligne pour un axe caché (non visible) ?",
      options: [
        "Ligne continue épaisse",
        "Ligne en tiretés (pointillés)",
        "Ligne en chaîne",
        "Ligne continue fine"
      ],
      correct: 1,
      correction: "La ligne en tiretés (0,3-0,5 mm) montre les arêtes cachées (ex: trou interne sous une platine). Crucial pour le démontage sans surprise en atelier horloger.",
    },
    {
      question: "Quelle ligne indique les axes de rotation et symétries ?",
      options: [
        "Ligne en tiretés fins",
        "Ligne en chaîne (tirets espacés)",
        "Ligne continue épaisse",
        "Ligne libre"
      ],
      correct: 1,
      correction: "La ligne en chaîne (0,2-0,4 mm) marque les centres et trajectoires (ex: axe d'une roue d'échappement). Aide à l'alignement lors du remontage.",
    },
    {
      question: "Quelle ligne pour les annotations et repères ?",
      options: [
        "Ligne continue fine",
        "Ligne en tiretés",
        "Ligne en tiretés fins",
        "Ligne en chaîne"
      ],
      correct: 2,
      correction: "La ligne en tiretés fins (0,1-0,3 mm) sert aux indications (ex: repères pour vis ou assemblages). Subtile pour ne pas surcharger le plan horloger.",
    },
    {
      question: "Quelle ligne est variable et utilisée pour les esquisses ?",
      options: [
        "Ligne continue épaisse",
        "Ligne libre ou de croquis",
        "Ligne en tiretés",
        "Ligne en chaîne"
      ],
      correct: 1,
      correction: "La ligne libre (fine/variable) permet les notes manuelles (ex: croquis rapide d'un ajustement prototype). Utile en phase de conception avant CAO.",
    },
    {
      question: "Quelle épaisseur typique pour une ligne de contour en horlogerie ?",
      options: [
        "0,1 mm",
        "0,2-0,5 mm",
        "0,5-1 mm",
        "Variable"
      ],
      correct: 2,
      correction: "0,5-1 mm pour les contours épais : assure visibilité sur micro-pièces (ex: outline d'une roue dentée à 1:1). Norme ISO 128-2 pour uniformité suisse.",
    },
    {
      question: "Les lignes en tiretés servent à... ?",
      options: [
        "Montrer les cotes",
        "Représenter les parties cachées",
        "Tracer les axes",
        "Annoter librement"
      ],
      correct: 1,
      correction: "Elles indiquent les arêtes non visibles (ex: engrenages internes d'un barillet). Permet de 'voir à travers' sans démonter le mouvement.",
    },
    {
      question: "Dans ISO 128-2, quelle ligne pour les hachures de section ?",
      options: [
        "Ligne en chaîne",
        "Ligne continue fine",
        "Ligne continue épaisse",
        "Ligne en tiretés fins"
      ],
      correct: 1,
      correction: "Ligne continue fine pour hachures et sections (ex: coupe d'un pivot). Distingue les matériaux dans les vues éclatées horlogères.",
    },
    {
      question: "Pourquoi utiliser des lignes fines pour les cotes en horlogerie ?",
      options: [
        "Pour plus de visibilité",
        "Pour éviter la surcharge du plan",
        "Pour indiquer les axes cachés",
        "Pour les esquisses"
      ],
      correct: 1,
      correction: "Elles (0,2-0,5 mm) gardent le plan clair sur des pièces minuscules (ex: tolérances ±0,02 mm). Sur un plan surchargé, c'est illisible en production.",
    },
    {
      question: "Quelle ligne pour les trajectoires de mouvement (ex: balancier) ?",
      options: [
        "Ligne continue épaisse",
        "Ligne en tiretés",
        "Ligne en chaîne",
        "Ligne libre"
      ],
      correct: 2,
      correction: "Ligne en chaîne pour dynamiques (ex: oscillation du balancier). Aide à visualiser les jeux fonctionnels sans simulation 3D.",
    },
    {
      question: "En horlogerie suisse, ISO 128-2 est combinée avec quelle norme pour les cartouches ?",
      options: [
        "ISO 9001",
        "ISO 1101",
        "ISO 5457",
        "ISO 4287"
      ],
      correct: 2,
      correction: "ISO 5457 pour cartouches : lignes + infos admin (ex: échelle 1:1). Ensemble, elles standardisent les plans ETA pour traçabilité internationale.",
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
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Quiz : Teste tes connaissances sur les lignes ISO 128-2</h2>
      {showScore ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Résultat final : <span className="text-[#E2B44F] font-bold">{score}</span> / {questions.length}
          </p>
          <p className="text-sm text-gray-400">
            {score === questions.length ? "Parfait ! Tu maîtrises les lignes techniques." :
             score >= 10 ? "Excellent ! Quelques nuances à peaufiner." :
             score >= 7 ? "Bon niveau, révises les usages cachés." :
             "Pratique avec des plans pour progresser."}
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

function InteractiveSVG() {
  const [tooltip, setTooltip] = useState({ show: false, type: '', epaisseur: '', exemple: '' });

  const lines = [
    { id: 1, type: 'Ligne continue épaisse', epaisseur: '0,5-1 mm', exemple: 'Contours de pont', path: 'M10 50 L200 50', stroke: 'black', strokeWidth: 3, onHover: () => setTooltip({ show: true, type: 'Ligne continue épaisse', epaisseur: '0,5-1 mm', exemple: 'Contours de pont horloger' }) },
    { id: 2, type: 'Ligne continue fine', epaisseur: '0,2-0,5 mm', exemple: 'Cote pivot', path: 'M10 80 L200 80', stroke: 'black', strokeWidth: 1, onHover: () => setTooltip({ show: true, type: 'Ligne continue fine', epaisseur: '0,2-0,5 mm', exemple: 'Cote d\'un pivot' }) },
    { id: 3, type: 'Ligne en tiretés', epaisseur: '0,3-0,5 mm', exemple: 'Arête cachée', path: 'M10 110 L200 110', stroke: 'black', strokeWidth: 2, strokeDasharray: '5,5', onHover: () => setTooltip({ show: true, type: 'Ligne en tiretés', epaisseur: '0,3-0,5 mm', exemple: 'Arête cachée d\'un trou' }) },
    { id: 4, type: 'Ligne en chaîne', epaisseur: '0,2-0,4 mm', exemple: 'Axe rotation', path: 'M10 140 L200 140', stroke: 'black', strokeWidth: 1.5, strokeDasharray: '10,5', onHover: () => setTooltip({ show: true, type: 'Ligne en chaîne', epaisseur: '0,2-0,4 mm', exemple: 'Axe de rotation roue' }) },
    { id: 5, type: 'Ligne en tiretés fins', epaisseur: '0,1-0,3 mm', exemple: 'Repère vis', path: 'M10 170 L200 170', stroke: 'black', strokeWidth: 1, strokeDasharray: '3,3', onHover: () => setTooltip({ show: true, type: 'Ligne en tiretés fins', epaisseur: '0,1-0,3 mm', exemple: 'Repère pour vis' }) },
    { id: 6, type: 'Ligne libre', epaisseur: 'Variable', exemple: 'Esquisse note', path: 'M10 200 Q100 180 200 200', stroke: 'gray', strokeWidth: 2, onHover: () => setTooltip({ show: true, type: 'Ligne libre', epaisseur: 'Variable', exemple: 'Esquisse d\'ajustement' }) },
  ];

  const handleMouseEnter = (line) => line.onHover();
  const handleMouseLeave = () => setTooltip({ show: false, type: '', epaisseur: '', exemple: '' });

  return (
    <div className="relative">
      <svg width="300" height="250" viewBox="0 0 300 250" className="border border-gray-300 rounded-lg mx-auto block shadow-sm">
        <text x="10" y="35" fontSize="12" fill="black">Exemples interactifs (hover/clic)</text>
        {lines.map((line) => (
          <path
            key={line.id}
            d={line.path}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth}
            strokeDasharray={line.strokeDasharray || 'none'}
            fill="none"
            onMouseEnter={() => handleMouseEnter(line)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleMouseEnter(line)}
            className="cursor-pointer hover:opacity-70 transition"
          />
        ))}
      </svg>
      {tooltip.show && (
        <div className="absolute top-0 left-full ml-2 bg-white border border-blue-200 shadow-lg rounded p-2 text-sm z-10 max-w-xs">
          <strong>{tooltip.type}</strong><br />
          Épaisseur: {tooltip.epaisseur}<br />
          Ex: {tooltip.exemple}
        </div>
      )}
      <p className="text-center text-xs text-gray-500 mt-2">Passe la souris sur les lignes pour voir les détails (ISO 128-2).</p>
    </div>
  );
}

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

export default function TypesLignesIso1282Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Bouton Retour */}
        <div className="mb-6">
          <Link
            href="/theorie/cartouche-horloger"
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
            src="/images/typ-logo.png"
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
            src="/images/types-lignes-iso128-2.jpg"
            alt="Schéma des types de lignes ISO 128-2"
            className="mx-auto rounded-lg shadow max-w-2xl w-full hover:scale-105 transition-transform"
          />
          <p className="text-gray-500 text-sm mt-4">
            Exemple d'application des lignes sur un plan technique horloger (épaisseurs et usages conformes à ISO 128-2).
          </p>
        </section>

        {/* SVG interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">SVG Interactif : Exemples de Lignes</h2>
          <InteractiveSVG />
          <p className="text-gray-500 text-sm mt-4">Clique ou survole les lignes pour voir les détails. Idéal pour visualiser les applications en horlogerie.</p>
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

        {/* Quiz interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <QuizTypesLignes />
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Vidéo : Lignes Techniques en Dessin Industriel
          </h2>
          <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:scale-[1.02] transition-transform duration-300">
            <iframe
              className="w-full h-[480px] md:h-[540px] lg:h-[600px]"
              src="https://www.youtube-nocookie.com/embed/93zHWlfYrwc"
              title="Lignes Techniques en Dessin Industriel"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-gray-500 text-sm mt-4">Vidéo explicative sur les types de lignes (ISO 128-2) appliqués au dessin technique.</p>
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
            href="https://www.iso.org/standard/75666.html"
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
