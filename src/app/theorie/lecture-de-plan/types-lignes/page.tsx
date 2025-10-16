"use client";
import Link from "next/link";
import { useState } from "react";

interface Question {
  question: string;
  options: string[];
  correct: number;
  correction: string;
}

interface Line {
  id: number;
  type: string;
  epaisseur: string;
  exemple: string;
  path: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
}

interface TooltipState {
  show: boolean;
  type: string;
  epaisseur: string;
  exemple: string;
}

function QuizTypesLignes() {
  const questions: Question[] = [
    {
      question: "Quelle ligne represente les contours visibles et de coupe ?",
      options: [
        "Ligne en tiretes",
        "Ligne continue fine",
        "Ligne continue epaisse",
        "Ligne en chaine"
      ],
      correct: 2,
      correction: "La ligne continue epaisse (0,5-1 mm) definit les bords exterieurs (ex: contours d'un pont de balancier). Essentiel pour l'usinage precis en horlogerie.",
    },
    {
      question: "Quelle ligne est utilisee pour les dimensions et cotes ?",
      options: [
        "Ligne en tiretes fins",
        "Ligne continue epaisse",
        "Ligne continue fine",
        "Ligne libre"
      ],
      correct: 2,
      correction: "La ligne continue fine (0,2-0,5 mm) trace les prolongations, fleches et hachures pour cotes en mm/um (ex: diametre d'un pivot). Evite les ambiguïtes sur les plans.",
    },
    {
      question: "Quelle ligne pour un axe cache (non visible) ?",
      options: [
        "Ligne continue epaisse",
        "Ligne en tiretes (pointillés)",
        "Ligne en chaine",
        "Ligne continue fine"
      ],
      correct: 1,
      correction: "La ligne en tiretes (0,3-0,5 mm) montre les aretes cachees (ex: trou interne sous une platine). Crucial pour le demontage sans surprise en atelier horloger.",
    },
    {
      question: "Quelle ligne indique les axes de rotation et symmetries ?",
      options: [
        "Ligne en tiretes fins",
        "Ligne en chaine (tirets espaces)",
        "Ligne continue epaisse",
        "Ligne libre"
      ],
      correct: 1,
      correction: "La ligne en chaine (0,2-0,4 mm) marque les centres et trajectoires (ex: axe d'une roue d'echappement). Aide a l'alignement lors du remontage.",
    },
    {
      question: "Quelle ligne pour les annotations et repères ?",
      options: [
        "Ligne continue fine",
        "Ligne en tiretes",
        "Ligne en tiretes fins",
        "Ligne en chaine"
      ],
      correct: 2,
      correction: "La ligne en tiretes fins (0,1-0,3 mm) sert aux indications (ex: repères pour vis ou assemblages). Subtile pour ne pas surcharger le plan horloger.",
    },
    {
      question: "Quelle ligne est variable et utilisee pour les esquisses ?",
      options: [
        "Ligne continue epaisse",
        "Ligne libre ou de croquis",
        "Ligne en tiretes",
        "Ligne en chaine"
      ],
      correct: 1,
      correction: "La ligne libre (fine/variable) permet les notes manuelles (ex: croquis rapide d'un ajustement prototype). Utile en phase de conception avant CAO.",
    },
    {
      question: "Quelle epaisseur typique pour une ligne de contour en horlogerie ?",
      options: [
        "0,1 mm",
        "0,2-0,5 mm",
        "0,5-1 mm",
        "Variable"
      ],
      correct: 2,
      correction: "0,5-1 mm pour les contours epais : assure visibilite sur micro-pieces (ex: outline d'une roue dentee a 1:1). Norme ISO 128-2 pour uniformite suisse.",
    },
    {
      question: "Les lignes en tiretes servent a... ?",
      options: [
        "Montrer les cotes",
        "Representer les parties cachees",
        "Tracer les axes",
        "Annoter librement"
      ],
      correct: 1,
      correction: "Elles indiquent les aretes non visibles (ex: engrenages internes d'un barillet). Permet de 'voir a travers' sans demonter le mouvement.",
    },
    {
      question: "Dans ISO 128-2, quelle ligne pour les hachures de section ?",
      options: [
        "Ligne en chaine",
        "Ligne continue fine",
        "Ligne continue epaisse",
        "Ligne en tiretes fins"
      ],
      correct: 1,
      correction: "Ligne continue fine pour hachures et sections (ex: coupe d'un pivot). Distingue les materiaux dans les vues eclatees horlogeres.",
    },
    {
      question: "Pourquoi utiliser des lignes fines pour les cotes en horlogerie ?",
      options: [
        "Pour plus de visibilite",
        "Pour eviter la surcharge du plan",
        "Pour indiquer les axes caches",
        "Pour les esquisses"
      ],
      correct: 1,
      correction: "Elles (0,2-0,5 mm) gardent le plan clair sur des pieces minuscules (ex: tolerances ±0,02 mm). Sur un plan surcharge, c'est illisible en production.",
    },
    {
      question: "Quelle ligne pour les trajectoires de mouvement (ex: balancier) ?",
      options: [
        "Ligne continue epaisse",
        "Ligne en tiretes",
        "Ligne en chaine",
        "Ligne libre"
      ],
      correct: 2,
      correction: "Ligne en chaine pour dynamiques (ex: oscillation du balancier). Aide a visualiser les jeux fonctionnels sans simulation 3D.",
    },
    {
      question: "En horlogerie suisse, ISO 128-2 est combinee avec quelle norme pour les cartouches ?",
      options: [
        "ISO 9001",
        "ISO 1101",
        "ISO 5457",
        "ISO 4287"
      ],
      correct: 2,
      correction: "ISO 5457 pour cartouches : lignes + infos admin (ex: echelle 1:1). Ensemble, elles standardisent les plans ETA pour traceabilite internationale.",
    },
  ];

  const [current, setCurrent] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrection, setShowCorrection] = useState<boolean>(false);

  const handleAnswer = (i: number): void => {
    setSelected(i);
    setShowCorrection(true);
    if (i === questions[current].correct) setScore((s) => s + 1);
  };

  const handleNext = (): void => {
    setSelected(null);
    setShowCorrection(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = (): void => {
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
            Resultat final : <span className="text-[#E2B44F] font-bold">{score}</span> / {questions.length}
          </p>
          <p className="text-sm text-gray-400">
            {score === questions.length ? "Parfait ! Tu maitrises les lignes techniques." :
             score >= 10 ? "Excellent ! Quelques nuances a peaufiner." :
             score >= 7 ? "Bon niveau, re vises les usages caches." :
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
                key={i.toString()}
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
                type="button"
              >
                <span>{option}</span>
                {showCorrection && i === selected && (
                  i === questions[current].correct ? <span className="text-green-400">{"✅"}</span> : <span className="text-red-400">{"❌"}</span>
                )}
                {showCorrection && i === questions[current].correct && <span className="text-green-400">{"✅"}</span>}
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
              type="button"
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
  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, type: '', epaisseur: '', exemple: '' });

  const lines: Line[] = [
    {
      id: 1,
      type: 'Ligne continue epaisse',
      epaisseur: '0,5-1 mm',
      exemple: 'Contours de pont',
      path: 'M10 50 L200 50',
      stroke: 'black',
      strokeWidth: 3,
      strokeDasharray: 'none'
    },
    {
      id: 2,
      type: 'Ligne continue fine',
      epaisseur: '0,2-0,5 mm',
      exemple: 'Cote pivot',
      path: 'M10 80 L200 80',
      stroke: 'black',
      strokeWidth: 1,
      strokeDasharray: 'none'
    },
    {
      id: 3,
      type: 'Ligne en tiretes',
      epaisseur: '0,3-0,5 mm',
      exemple: 'Arete cachee',
      path: 'M10 110 L200 110',
      stroke: 'black',
      strokeWidth: 2,
      strokeDasharray: '5,5'
    },
    {
      id: 4,
      type: 'Ligne en chaine',
      epaisseur: '0,2-0,4 mm',
      exemple: 'Axe rotation',
      path: 'M10 140 L200 140',
      stroke: 'black',
      strokeWidth: 1.5,
      strokeDasharray: '10,5'
    },
    {
      id: 5,
      type: 'Ligne en tiretes fins',
      epaisseur: '0,1-0,3 mm',
      exemple: 'Repere vis',
      path: 'M10 170 L200 170',
      stroke: 'black',
      strokeWidth: 1,
      strokeDasharray: '3,3'
    },
    {
      id: 6,
      type: 'Ligne libre',
      epaisseur: 'Variable',
      exemple: 'Esquisse note',
      path: 'M10 200 Q100 180 200 200',
      stroke: 'gray',
      strokeWidth: 2,
      strokeDasharray: 'none'
    },
  ];

  const handleMouseEnter = (line: Line): void => {
    setTooltip({
      show: true,
      type: line.type,
      epaisseur: line.epaisseur,
      exemple: line.exemple
    });
  };

  const handleMouseLeave = (): void => {
    setTooltip({ show: false, type: '', epaisseur: '', exemple: '' });
  };

  return (
    <div className="relative">
      <svg width="300" height="250" viewBox="0 0 300 250" className="border border-gray-300 rounded-lg mx-auto block shadow-sm">
        <text x="10" y="35" fontSize="12" fill="black">Exemples interactifs (hover/clic)</text>
        {lines.map((line) => (
          <path
            key={line.id.toString()}
            d={line.path}
            stroke={line.stroke}
            strokeWidth={line.strokeWidth}
            strokeDasharray={line.strokeDasharray}
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
          <strong>{tooltip.type}</strong>
          <br />
          Epaisseur: {tooltip.epaisseur}
          <br />
          Ex: {tooltip.exemple}
        </div>
      )}
      <p className="text-center text-xs text-gray-500 mt-2">Passe la souris sur les lignes pour voir les details (ISO 128-2).</p>
    </div>
  );
}

const typesLignes = [
  {
    type: "Ligne continue epaisse",
    epaisseur: "0,5 a 1 mm",
    usage: "Contours visibles et contours de coupe. En horlogerie : represente les bords exterieurs des pieces (ex: ponts, platines).",
    exemple: "Utilisee pour les outlines principales d'un mouvement ETA.",
  },
  {
    type: "Ligne continue fine",
    epaisseur: "0,2 a 0,5 mm",
    usage: "Dimensions, hachures, lignes de prolongation et fleches. En horlogerie : cotes precises pour tolerances (ex: diametres de pivots).",
    exemple: "Indique les mesures en mm/um sur un plan de roue dentee.",
  },
  {
    type: "Ligne en tiretes (pointillés)",
    epaisseur: "0,3 a 0,5 mm",
    usage: "Aretes cachees. En horlogerie : montre les parties internes non visibles (ex: trous sous une platine).",
    exemple: "Represente un axe interne d'un balancier sans demonter la piece.",
  },
  {
    type: "Ligne en chaine (tirets espaces)",
    epaisseur: "0,2 a 0,4 mm",
    usage: "Lignes de centre, trajectoires de mouvement et symmetries. En horlogerie : axes de rotation (ex: pivots de roues).",
    exemple: "Trace le centre d'une roue d'echappement pour alignement.",
  },
  {
    type: "Ligne en tiretes fins (pointillés fins)",
    epaisseur: "0,1 a 0,3 mm",
    usage: "Lignes d'indication et de reference. En horlogerie : repères pour assemblages (ex: positions de vis).",
    exemple: "Indique l'orientation d'un composant lors du remontage.",
  },
  {
    type: "Ligne libre ou de croquis",
    epaisseur: "Variable (fine)",
    usage: "Annotations et esquisses preliminaires. En horlogerie : notes manuelles sur un prototype de plan.",
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
            La norme ISO 128-2 definit les types de lignes standard pour les dessins techniques. En horlogerie suisse, elles assurent une representation claire et precise des plans (contours, axes, cotes) pour eviter les ambiguïtés en production.
          </p>
        </header>

        {/* Section image illustrative */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Schema des Types de Lignes (ISO 128-2)</h2>
          <img
            src="/images/types-lignes-iso128-2.jpg"
            alt="Schema des types de lignes ISO 128-2"
            className="mx-auto rounded-lg shadow max-w-2xl w-full hover:scale-105 transition-transform"
          />
          <p className="text-gray-500 text-sm mt-4">
            Exemple d'application des lignes sur un plan technique horloger (epaisseurs et usages conformes a ISO 128-2).
          </p>
        </section>

        {/* SVG interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">SVG Interactif : Exemples de Lignes</h2>
          <InteractiveSVG />
          <p className="text-gray-500 text-sm mt-4">Clique ou survole les lignes pour voir les details. Ideal pour visualiser les applications en horlogerie.</p>
        </section>

        {/* Tableau des types de lignes */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">Details des Types de Lignes</h2>
          <p className="text-gray-600 mb-4">Chaque type a une epaisseur et un usage specifique, adapte aux micro-pieces horlogeres. Respecter ISO 128-2 evite les erreurs d'interpretation lors du demontage/remontage ou de l'usinage.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-collapse border-blue-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-4 py-2 font-semibold">Type de Ligne</th>
                  <th className="border px-4 py-2 font-semibold">Epaisseur (mm)</th>
                  <th className="border px-4 py-2 font-semibold">Usage Technique</th>
                  <th className="border px-4 py-2 font-semibold">Exemple en Horlogerie</th>
                </tr>
              </thead>
              <tbody>
                {typesLignes.map((ligne, i) => (
                  <tr key={i.toString()} className={i % 2 === 0 ? "bg-gray-50" : ""}>
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
            En Suisse, ces lignes sont combinees avec ISO 5457 (cartouches) pour des plans complets. L'epaisseur varie selon l'echelle (ex: 1:1 pour micro-pieces).
          </p>
        </section>

        {/* Quiz interactif */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10">
          <QuizTypesLignes />
        </section>

        {/* Video pedagogique */}
        <section className="bg-white border border-gray-200 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">
            Video : Lignes Techniques en Dessin Industriel
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
          <p className="text-gray-500 text-sm mt-4">Video explicative sur les types de lignes (ISO 128-2) appliquees au dessin technique.</p>
        </section>

        {/* Astuce horlogere */}
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
