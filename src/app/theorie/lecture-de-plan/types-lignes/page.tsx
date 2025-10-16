"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Pour router.back()
import { useState } from "react";
import Image from "next/image";

interface Question {
  question: string;
  options: string[];
  correct: number;
  correction: string;
}

interface Cote {
  id: number;
  type: string;
  tolerance: string;
  exemple: string;
  path: string;
  stroke: string;
  strokeWidth: number;
  label: string;
}

interface TooltipState {
  show: boolean;
  type: string;
  tolerance: string;
  exemple: string;
  x: number;
  y: number;
}

function QuizCotesTolerances() {
  const questions: Question[] = [
    {
      question: "Quelle tolérance pour un pivot de roue en horlogerie (diamètre précis) ?",
      options: [
        "±0,01 mm",
        "±0,05 mm",
        "±0,02 mm",
        "±0,1 mm"
      ],
      correct: 2,
      correction: "±0,02 mm typique pour pivots (ISO 129-1) : Assure rotation fluide sans jeu excessif dans mouvements ETA.",
    },
    {
      question: "ISO 1101 concerne les... ?",
      options: [
        "Lignes techniques",
        "Tolérances géométriques",
        "Côtes linéaires",
        "Cartouches"
      ],
      correct: 1,
      correction: "ISO 1101 : Tolérances de forme/orientation (ex: parallélisme platine). Crucial pour assemblages horlogers.",
    },
    {
      question: "Le 'jeu fonctionnel' en horlogerie est de... ?",
      options: [
        "0,05-0,1 mm",
        "0,01-0,03 mm",
        "0,2 mm",
        "Variable sans norme"
      ],
      correct: 1,
      correction: "0,01-0,03 mm pour jeux (ex: entre pivot et platine). Évite blocage/usure prématurée.",
    },
    {
      question: "Quelle côte pour un trou de vis M1,5 en horlogerie ?",
      options: [
        "Ø1,5 ±0,05",
        "Ø1,55 ±0,01",
        "Ø1,5 +0,02/-0",
        "Ø1,6 nominal"
      ],
      correct: 2,
      correction: "Ø1,55 ±0,01 (ISO 129-1) : Précision pour filetage sans forçage sur micro-vis.",
    },
    {
      question: "Les tolérances géométriques (ISO 1101) incluent... ?",
      options: [
        "Seule la dimension",
        "Perp., parall., rondeur",
        "Axes de rotation",
        "Hachures"
      ],
      correct: 1,
      correction: "Perpendic./parallélisme/rondeur (ex: balancier rond <0,01 mm). Évite vibrations en haute horlogerie.",
    },
    {
      question: "Pour un jeu fonctionnel sur pivot, la tolérance est... ?",
      options: [
        "Nulle (ajustement serré)",
        "Légèrement lâche (+0,01)",
        "Très lâche",
        "ISO 9001 seulement"
      ],
      correct: 1,
      correction: "+0,01 mm lâche : Permet lubrification sans frottement (ex: échappement).",
    },
    {
      question: "ISO 129-1 définit les... ?",
      options: [
        "Lignes ISO 128",
        "Principes de cotation",
        "Couleurs plans",
        "Fonts techniques"
      ],
      correct: 1,
      correction: "Principes de cotation/dimensionnement (ex: flèches, prolongations). Base pour plans suisses.",
    },
    {
      question: "En horlogerie, tolérance typique pour platine (épaisseur) ?",
      options: [
        "±0,005 mm",
        "±0,05 mm",
        "±0,1 mm",
        "Variable"
      ],
      correct: 1,
      correction: "±0,05 mm pour platines : Assure planéité pour composants alignés (ETA 6497).",
    },
    {
      question: "Le symbole Ø indique... ?",
      options: [
        "Diamètre",
        "Profondeur",
        "Longueur",
        "Angle"
      ],
      correct: 0,
      correction: "Diamètre (ex: Ø10 ±0,02) : Standard pour trous/pivots circulaires.",
    },
    {
      question: "Pourquoi des tolérances en horlogerie ?",
      options: [
        "Décoratif",
        "Interchangeabilité pièces",
        "Simplicité",
        "Coût bas"
      ],
      correct: 1,
      correction: "Interchangeabilité (ex: pièces ETA standardisées mondialement). Évite custom pour chaque montre.",
    },
    {
      question: "Jeu fonctionnel vs ajustement : quel pour roulements ?",
      options: [
        "Ajustement serré",
        "Jeu lâche 0,02 mm",
        "Sans tolérance",
        "ISO 5457"
      ],
      correct: 1,
      correction: "Jeu lâche (0,02 mm) pour roulements : Réduit usure, tolère expansions thermiques.",
    },
    {
      question: "ISO 1101 s'applique aux tolérances... ?",
      options: [
        "Linéaires seulement",
        "De forme et position",
        "Axes symétrie",
        "Hachures"
      ],
      correct: 1,
      correction: "Forme/position (ex: concentricité pivots <0,005 mm). Pour précision micrométrique.",
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
    <section className="bg-[#1c1e26] text-gray-300 rounded-2xl shadow-lg p-8 mt-10 text-center border border-[#E2B44F]/20">
      <h2 className="text-xl font-semibold text-[#E2B44F] mb-4">Quiz : Teste tes connaissances sur les côtes et tolérances ISO</h2>
      {showScore ? (
        <div className="space-y-4">
          <p className="text-lg text-gray-300">
            Résultat final : <span className="text-[#E2B44F] font-bold">{score}</span> / {questions.length}
          </p>
          <p className="text-sm text-gray-400">
            {score === questions.length ? "Parfait ! Tu maîtrises les tolérances horlogères." :
             score >= 10 ? "Excellent ! Précision suisse au top." :
             score >= 7 ? "Bon, revois les jeux fonctionnels." :
             "Pratique avec des plans pour affiner."}
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
                    ? "bg-[#2c3344] hover:bg-[#3c4454] text-gray-200 border border-[#3c4454]" 
                    : i === questions[current].correct 
                      ? "border-2 border-green-500 bg-green-900/30 text-green-300" 
                      : i === selected && i !== questions[current].correct 
                        ? "border-2 border-red-500 bg-red-900/30 text-red-300 line-through" 
                        : "bg-[#2c3344] text-gray-400"
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
            <div className="text-left bg-[#2c3344] rounded-lg p-4 border border-[#E2B44F]/30">
              <h4 className="font-bold text-[#E2B44F] mb-2">
                {selected === questions[current].correct ? "✅ Bonne réponse !" : "❌ Mauvaise réponse."}
              </h4>
              <p className="text-gray-200 text-sm">{questions[current].correction}</p>
            </div>
          )}
          {showCorrection && (
            <button
              onClick={handleNext}
              className="bg-[#E2B44F] hover:bg-[#d4ac3d] text-gray-900 font-semibold py-2 px-6 rounded-lg transition"
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
  const [tooltip, setTooltip] = useState<TooltipState>({ show: false, type: '', tolerance: '', exemple: '', x: 0, y: 0 });

  const cotes: Cote[] = [
    {
      id: 1,
      type: 'Côte linéaire Ø10',
      tolerance: '±0,02 mm',
      exemple: 'Diamètre pivot',
      path: 'M100 100 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0', // Cercle Ø10
      stroke: '#E2B44F',
      strokeWidth: 1,
      label: 'Ø10'
    },
    {
      id: 2,
      type: 'Tolérance jeu fonctionnel',
      tolerance: '0,01-0,03 mm',
      exemple: 'Entre pivot/platine',
      path: 'M150 100 L250 100', // Ligne côte
      stroke: '#E2B44F',
      strokeWidth: 0.5,
      label: 'Jeu 0,02'
    },
    {
      id: 3,
      type: 'Ajustement technique',
      tolerance: '+0,02/-0',
      exemple: 'Trou vis M1,5',
      path: 'M50 150 L150 150', // Ligne prolongée
      stroke: '#E2B44F',
      strokeWidth: 1,
      label: 'Ø1,55'
    },
    {
      id: 4,
      type: 'Tolérance géométrique (rondeur)',
      tolerance: '<0,01 mm',
      exemple: 'Balancier',
      path: 'M200 150 m -20, 0 a 20,20 0 1,1 40,0 a 20,20 0 1,1 -40,0',
      stroke: '#E2B44F',
      strokeWidth: 0.5,
      label: 'Rondeur'
    },
  ];

  const handleMouseEnter = (cote: Cote, event: React.MouseEvent<SVGPathElement>): void => {
    const svgRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - svgRect.left;
    const y = event.clientY - svgRect.top;
    setTooltip({
      show: true,
      type: cote.type,
      tolerance: cote.tolerance,
      exemple: cote.exemple,
      x,
      y
    });
  };

  const handleMouseLeave = (): void => {
    setTooltip({ show: false, type: '', tolerance: '', exemple: '', x: 0, y: 0 });
  };

  return (
    <div className="relative">
      <svg width="300" height="200" viewBox="0 0 300 200" className="border border-[#E2B44F]/30 rounded-lg mx-auto block shadow-sm bg-[#1c1e26]">
        <text x="10" y="20" fontSize="12" fill="#E2B44F">Schéma interactif côtes/tolérances (hover/clic)</text>
        {cotes.map((cote) => (
          <>
            <path
              key={cote.id.toString()}
              d={cote.path}
              stroke={cote.stroke}
              strokeWidth={cote.strokeWidth}
              fill="none"
              onMouseEnter={(e) => handleMouseEnter(cote, e)}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => handleMouseEnter(cote, e as any)}
              className="cursor-pointer hover:opacity-70 transition"
            />
            <text x="cote.path.includes('100') ? 110 : 160" y="cote.id === 1 ? 105 : 155" fontSize="10" fill="#E2B44F" textAnchor="middle">{cote.label}</text>
          </>
        ))}
      </svg>
      {tooltip.show && (
        <div 
          className="absolute bg-[#2c3344] border border-[#E2B44F]/50 shadow-lg rounded p-2 text-sm z-10 max-w-xs text-gray-300"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 60}px` }}
        >
          <strong>{tooltip.type}</strong>
          <br />
          Tolérance: {tooltip.tolerance}
          <br />
          Ex: {tooltip.exemple}
        </div>
      )}
      <p className="text-center text-xs text-gray-500 mt-2">Passe la souris ou touche sur les éléments pour voir les détails (ISO 129-1/1101).</p>
    </div>
  );
}

const cotesTolerances = [
  {
    type: "Côtes linéaires (ISO 129-1)",
    tolerance: "±0,01 à ±0,05 mm",
    usage: "Dimensions de base (longueur, Ø). En horlogerie : pivots, trous (ex: Ø10 ±0,02 pour précision).",
    exemple: "Côte d'un pivot ETA : Assure ajustement sans jeu excessif.",
  },
  {
    type: "Tolérances de jeu fonctionnel",
    tolerance: "0,01-0,03 mm lâche",
    usage: "Espace pour mouvement (lubrification). En horlogerie : Entre pivot et platine pour rotation fluide.",
    exemple: "Jeu 0,02 mm dans échappement : Évite blocage/usure.",
  },
  {
    type: "Ajustements techniques",
    tolerance: "+0,02/-0 mm",
    usage: "Assemblages serrés (transition/intermédiaire). En horlogerie : Vis/filetages pour fixation stable.",
    exemple: "Trou M1,5 Ø1,55 : Filetage précis sans forçage.",
  },
  {
    type: "Tolérances géométriques (ISO 1101)",
    tolerance: "<0,01 mm (rondeur/perp.)",
    usage: "Forme/orientation (parallélisme, concentricité). En horlogerie : Balanciers/platines pour alignement.",
    exemple: "Rondeur balancier <0,005 mm : Réduit vibrations haute fréquence.",
  },
  {
    type: "Côtes angulaires",
    tolerance: "±0,5° à ±1°",
    usage: "Angles (ex: cône pivots). En horlogerie : Alignement roues dentées.",
    exemple: "Angle 45° pour cône : ±0,5° pour usinage CNC.",
  },
  {
    type: "Tolérances de position",
    tolerance: "0,005-0,02 mm",
    usage: "Emplacements relatifs (ex: trous symétriques). En horlogerie : Positions vis pour remontage.",
    exemple: "Concentricité trous platine : ±0,01 mm pour stabilité.",
  },
];

export default function CotesTolerancesPage() {
  const router = useRouter();
  const handleBack = () => router.back(); // Retour à page précédente

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
    e.currentTarget.style.display = 'none';
    e.currentTarget.nextElementSibling?.classList.remove('hidden');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#1c1e26] px-6 py-16 font-sans text-gray-300">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Bouton Retour */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="text-[#E2B44F] hover:text-[#d4ac3d] flex items-center gap-2 px-4 py-2 bg-[#2c3344] text-gray-300 rounded-lg font-semibold hover:bg-[#3c4454] transition border border-[#E2B44F]/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la page précédente
          </button>
        </div>

        {/* Titre principal */}
        <header className="text-center space-y-4">
          <Image
            src="/images/cotes-logo.png" // Ajoute ton logo si besoin
            alt="Logo Côtes"
            width={80}
            height={80}
            className="mx-auto shadow-lg rounded-full border border-[#E2B44F]/30"
            onError={handleImageError}
          />
          <p className="hidden text-sm text-gray-500 mt-2">Logo Côtes (image non trouvée)</p>
          <h1 className="text-4xl font-bold text-[#E2B44F]">
            Côtes et Tolérances <span className="text-gray-400">(ISO 129-1 & 1101)</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            Les normes ISO 129-1 (cotation) et 1101 (tolérances géométriques) définissent les dimensions précises et tolérances pour les dessins techniques. En horlogerie, elles garantissent l'interchangeabilité des micro-pièces (ex: pivots ±0,02 mm) pour assemblages parfaits.
          </p>
        </header>

        {/* Section schéma illustrative */}
        <section className="bg-[#2c3344] border border-[#E2B44F]/20 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Schéma des Côtes et Tolérances Horlogères</h2>
          <div className="relative">
            <Image
              src="/images/cotes-tolerances-schema.jpg"
              alt="Schéma côtes tolérances ISO"
              width={800}
              height={600}
              className="mx-auto rounded-lg shadow max-w-full hover:scale-105 transition-transform"
              onError={handleImageError}
            />
            <p className="hidden text-sm text-gray-500 mt-2">Schéma (Ø10 ±0,02, jeu 0,02 mm – ajoute image en /public/images/)</p>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Exemple : Ø10 mm ±0,02 (tolérance), jeu fonctionnel 0,02 mm, ajustement technique pour pivot.
          </p>
        </section>

        {/* SVG interactif */}
        <section className="bg-[#2c3344] border border-[#E2B44F]/20 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">SVG Interactif : Exemples de Côtes</h2>
          <InteractiveSVG />
          <p className="text-gray-500 text-sm mt-4">Clique ou survole pour détails (ex: tolérances sur pivots/balanciers).</p>
        </section>

        {/* Tableau des côtes/tolérances */}
        <section className="bg-[#2c3344] border border-[#E2B44F]/20 shadow-sm rounded-2xl p-10">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">Détails des Côtes et Tolérances</h2>
          <p className="text-gray-400 mb-4">En horlogerie suisse, ces normes assurent précision micrométrique (ex: ±0,005 mm pour platines). ISO 129-1 pour cotation, 1101 pour géométrie.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse border border-[#E2B44F]/20">
              <thead className="bg-[#E2B44F]/10">
                <tr>
                  <th className="border px-4 py-3 font-semibold text-[#E2B44F]">Type</th>
                  <th className="border px-4 py-3 font-semibold text-[#E2B44F]">Tolérance Typique</th>
                  <th className="border px-4 py-3 font-semibold text-[#E2B44F]">Usage Technique</th>
                  <th className="border px-4 py-3 font-semibold text-[#E2B44F]">Exemple Horloger</th>
                </tr>
              </thead>
              <tbody>
                {cotesTolerances.map((cote, i) => (
                  <tr key={i.toString()} className={i % 2 === 0 ? "bg-[#1c1e26]" : "bg-[#2c3344]"}>
                    <td className="border px-4 py-3 font-semibold text-gray-300">{cote.type}</td>
                    <td className="border px-4 py-3 font-mono text-gray-400">{cote.tolerance}</td>
                    <td className="border px-4 py-3 text-gray-300">{cote.usage}</td>
                    <td className="border px-4 py-3 italic text-gray-400">{cote.exemple}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Tolérances adaptées à l'échelle 1:1 pour micro-pièces. Combinées à ISO 128-2 (lignes) pour plans complets.
          </p>
        </section>

        {/* Quiz interactif */}
        <section className="bg-[#2c3344] border border-[#E2B44F]/20 shadow-sm rounded-2xl p-10">
          <QuizCotesTolerances />
        </section>

        {/* Vidéo pédagogique */}
        <section className="bg-[#2c3344] border border-[#E2B44F]/20 shadow-sm rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#E2B44F] mb-6">
            Vidéo : Tolérances en Dessin Technique
          </h2>
          <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-[#E2B44F]/20 shadow-sm hover:scale-[1.02] transition-transform duration-300">
            <iframe
              className="w-full h-[480px] md:h-[540px] lg:h-[600px]"
              src="https://www.youtube-nocookie.com/embed/VIDEO_ID_TOLERANCES" // Remplace par ID YouTube pertinent (ex: sur ISO 1101)
              title="Tolérances Géométriques ISO 1101"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <p className="text-gray-500 text-sm mt-4">Vidéo sur côtes/tolérances appliquées (recherche "ISO 1101 dessin technique" pour ID).</p>
        </section>

        {/* Astuce horlogère */}
        <section className="bg-[#E2B44F]/10 border border-[#E2B44F]/20 shadow-sm rounded-2xl p-8 text-center">
          <blockquote className="text-xl italic text-[#E2B44F]">
            "Une tolérance mal appliquée peut déséquilibrer un mouvement entier."
          </blockquote>
          <p className="mt-4 text-[#E2B44F] font-medium">— Astuce pour apprentis en cotation technique</p>
        </section>

        {/* Lien ISO */}
        <section className="text-center py-10">
          <p className="text-gray-400 text-lg mb-4">📘 Pour aller plus loin :</p>
          <a
            href="https://www.iso.org/standard/45667.html" // ISO 129-1
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E2B44F] text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-[#d4ac3d] transition border border-[#E2B44F]"
          >
            ISO 129-1 : Principes de cotation
          </a>
          <br className="mt-2" />
          <a
            href="https://www.iso.org/standard/21235.html" // ISO 1101
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#E2B44F] text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-[#d4ac3d] transition border border-[#E2B44F] mt-2"
          >
            ISO 1101 : Tolérances géométriques
          </a>
        </section>

        <footer className="text-center text-sm text-gray-500 mt-6 border-t border-[#E2B44F]/20 pt-4">
          © HorloLearn 2025 — ISO 129-1/1101 / Pratiques de cotation horlogère suisse.
        </footer>
      </div>
    </main>
  );
}
