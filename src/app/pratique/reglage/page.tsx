"use client";
import Link from "next/link";
import { ArrowLeft, Info, BookOpen, Clock, Award, ChevronDown, ChevronRight, RefreshCw, Target, Zap, Wrench } from "lucide-react";
import { useState } from "react";

export default function ReglagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
  });
  const [glossaryOpen, setGlossaryOpen] = useState<{ [key: string]: boolean }>({});

  const questions = [
    {
      question: "Quelle est la fonction principale du spiral dans le réglage d'une montre ?",
      options: [
        "Maintenir le barillet en place",
        "Réguler la fréquence d'oscillation du balancier",
        "Lubrifier le mouvement",
        "Protéger contre les chocs",
      ],
      correct: 1,
      explanation: "Le spiral est le cœur battant de la montre. Comme un petit ressort, il se déroule et se referme 28 800 fois par heure dans les mouvements modernes. C'est cette fréquence très précise qui permet à la montre de « compter » le temps."
    },
    {
      question: "Qu'est-ce que l'amplitude dans le réglage horloger ?",
      options: [
        "L'angle de rotation du balancier",
        "La vitesse du mouvement",
        "La force du ressort",
        "Le poids de la montre",
      ],
      correct: 0,
      explanation: "L'amplitude mesure la « force de vie » du mouvement. Une amplitude idéale se situe entre 270° et 310°. Trop basse = usure ou frottements ; trop haute = risque de « rebonds » sur les bancs. C'est un indicateur de santé essentiel."
    },
    {
      question: "Pour ajuster la marche d'une montre qui avance, il faut :",
      options: [
        "Rallonger le spiral",
        "Raccourcir le spiral",
        "Augmenter la tension du ressort",
        "Retirer du lubrifiant",
      ],
      correct: 0,
      explanation: "En rallongeant le spiral, vous augmentez sa période d'oscillation, ce qui ralentit le balancier. C'est comme allonger un pendule de grande horloge : plus il est long, plus il oscille lentement."
    },
  ];

  const glossaryTerms = [
    {
      term: "Balancier-spiral",
      definition: "Système oscillant qui sert de résonateur, le « cœur » du chronomètre. Son isochronisme (rythme régulier) détermine la précision."
    },
    {
      term: "Raquette",
      definition: "Petit levier avec échelle A-R qui permet d'ajuster la longueur active du spiral. Un déplacement de 0,1 mm change la marche d'environ 30 secondes/jour."
    },
    {
      term: "Chronocomparateur",
      definition: "Appareil électronique qui mesure la fréquence du balancier avec précision microscopique. Il affiche le delta en secondes/jour et l'amplitude."
    },
    {
      term: "Isochronisme",
      definition: "Capacité du balancier à osciller avec la même période, que le ressort moteur soit tendu ou détendu. Objectif ultime du réglage."
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    if (quizAnswers[questionIndex] !== null) return;
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const toggleGlossary = (index: number) => {
    setGlossaryOpen({ ...glossaryOpen, [index]: !glossaryOpen[index] });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à la pratique
        </Link>

        {/* En-tête avec métaphore */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-[#E2B44F] mb-4 font-serif">
            Réglage & Précision
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            « Comme un chef d'orchestre ajuste chaque instrument pour l'harmonie parfaite, 
            l'horloger règle chaque composant pour que le temps chante juste. »
          </p>
        </header>

        {/* Vidéo - Section conservée */}
        <section className="mb-12">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl border border-[#E2B44F]/30 hover:border-[#E2B44F]/60 transition-all duration-300">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/HVxT1kQ99kg"
              title="Tutoriel Horlogerie : Comment régler la marche d’un mouvement"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="mt-4 bg-[#1a1a1a] rounded-lg p-3 flex items-center justify-between">
            <p className="text-gray-400 text-sm italic flex items-center gap-2">
              <Info className="w-4 h-4" />
              🎧 Langue audio : français | Sous-titres disponibles
            </p>
            <span className="text-[#E2B44F] text-xs font-mono">25 min</span>
          </div>
        </section>

        {/* Schéma interactif du balancier-spiral */}
        <section className="mb-12 bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-[#E2B44F]/20">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3">
            <Target className="w-8 h-8" />
            Le Système Régulateur en Action
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-gray-300">
                Imaginez le balancier comme un enfant sur une balançoire. Le spiral est la force 
                qui le ramène toujours au centre. Plus la balançoire est lourde (masse du balancier) 
                et plus la force est faible (spiral doux), plus les oscillations sont lentes.
              </p>
              <div className="bg-[#0a0a0a] p-4 rounded-lg border-l-4 border-[#E2B44F]">
                <p className="text-sm text-gray-400">
                  <strong className="text-[#E2B44F]">Formule clé :</strong> Période = 2π × √(Masse / Rigidité du spiral)
                </p>
              </div>
            </div>
            <div className="relative">
              <svg viewBox="0 0 300 200" className="w-full h-48">
                {/* Représentation simplifiée */}
                <circle cx="150" cy="100" r="60" fill="none" stroke="#E2B44F" strokeWidth="2" opacity="0.3"/>
                <line x1="150" y1="100" x2="210" y2="100" stroke="#E2B44F" strokeWidth="3">
                  <animateTransform attributeName="transform" type="rotate" from="0 150 100" to="360 150 100" dur="2s" repeatCount="indefinite"/>
                </line>
                <text x="150" y="180" textAnchor="middle" fill="#E2B44F" fontSize="12">Balancier en oscillation</text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-[#E2B44F] font-mono text-2xl">28'800</p>
                  <p className="text-gray-400 text-xs">alternances/heure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Les 5 principes clés */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-8 text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8" />
            Les 5 Principes du Maître Horloger
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "📐", title: "Centrage", desc: "Le balancier doit être parfaitement centré pour éviter tout batement" },
              { icon: "🎯", title: "Échappement", desc: "La denture doit libérer exactement 1 dent par oscillation" },
              { icon: "🌡️", title: "Compensation", desc: "Les modernes spiraux silicium résistent aux variations de température" },
              { icon: "📊", title: "Positional", desc: "6 positions de test : CH, CB, 3H, 9H, 6H, 12H" },
              { icon: "⚖️", title: "Isochronisme", desc: "Même période quelle que soit la tension du ressort moteur" },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F]/60 transition-all duration-300 group">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-[#E2B44F] font-bold mb-1">{item.title}</h3>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contenu pédagogique enrichi */}
        <section className="mb-12 bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-[#E2B44F]/20">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            La Science du Réglage
          </h2>
          <div className="prose prose-invert max-w-none">
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Le réglage d'une montre mécanique est l'art d'optimiser sa précision en ajustant
                les différents éléments du régulateur. Le cœur de ce système est le
                <strong className="text-[#E2B44F]"> balancier-spiral</strong>, dont la fréquence d'oscillation
                détermine la marche de la montre.
              </p>

              {/* Exemple concret */}
              <div className="bg-[#0a0a0a] p-5 rounded-lg border border-[#E2B44F]/30">
                <h3 className="text-[#E2B44F] font-bold mb-2">🎓 Exemple concret</h3>
                <p className="text-sm">
                  Une montre qui avance de 30 secondes par jour : l'horloger déplace la raquette 
                  d'environ 0,1 mm vers le "R". Il vérifie ensuite au chronocomparateur : le delta 
                  passe de +30 s/j à 0 s/j. L'amplitude doit rester entre 270° et 310°.
                </p>
              </div>

              <p>
                Pour régler une montre, l'horloger agit principalement sur la <strong className="text-[#E2B44F]">raquette</strong>,
                un petit dispositif qui permet de modifier la longueur active du spiral. En déplaçant
                la raquette vers le signe "A" (Avance), on raccourcit le spiral et la montre accélère.
                Vers le "R" (Retard), on l'allonge et elle ralentit. Un réglage fin peut atteindre
                une précision de <em className="text-[#E2B44F]">±2 secondes par jour</em>.
              </p>

              {/* Tableau des positions */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-[#E2B44F]/20">
                  <thead>
                    <tr className="bg-[#0a0a0a]">
                      <th className="text-left p-3 text-[#E2B44F]">Position</th>
                      <th className="text-left p-3 text-[#E2B44F]">Description</th>
                      <th className="text-left p-3 text-[#E2B44F]">Variation typique</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#E2B44F]/10">
                      <td className="p-3 font-mono">CH</td>
                      <td className="p-3">Cadran en Haut</td>
                      <td className="p-3">Référence</td>
                    </tr>
                    <tr className="border-b border-[#E2B44F]/10">
                      <td className="p-3 font-mono">CB</td>
                      <td className="p-3">Cadran en Bas</td>
                      <td className="p-3">+10 à +30 s/j</td>
                    </tr>
                    <tr className="border-b border-[#E2B44F]/10">
                      <td className="p-3 font-mono">3H</td>
                      <td className="p-3">Couronne à 3h</td>
                      <td className="p-3">-5 à +15 s/j</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono">9H</td>
                      <td className="p-3">Couronne à 9h</td>
                      <td className="p-3">Variable</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Le réglage moderne s'effectue à l'aide d'un <strong className="text-[#E2B44F]">chronocomparateur</strong>,
                appareil qui mesure la fréquence et l'amplitude des oscillations. L'horloger
                doit également ajuster la montre dans différentes positions pour compenser les
                variations dues à la gravité. Les montres de haute horlogerie peuvent être réglées
                dans 6 positions pour une précision maximale.
              </p>

              {/* Anecdote historique */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F]">
                <h3 className="text-[#E2B44F] font-bold mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Saviez-vous ?
                </h3>
                <p className="text-sm">
                  En 1775, Abraham-Louis Breguet inventa le spiral en hélicoïde plat, révolutionnant 
                  la précision horlogère. Son principe est toujours utilisé aujourd'hui, même dans 
                  les mouvements les plus modernes en silicium.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Outils du réglage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-8 text-center flex items-center justify-center gap-3">
            <Tool className="w-8 h-8" />
            Les Outils du Maître
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-colors">
              <h3 className="text-[#E2B44F] font-bold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E2B44F]/10 rounded flex items-center justify-center">📟</div>
                Chronocomparateur
              </h3>
              <p className="text-gray-400 text-sm">
                Appareil qui « écoute » le tic-tac et affiche instantanément la précision en 
                secondes/jour, l'amplitude et l'erreur de battement.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-colors">
              <h3 className="text-[#E2B44F] font-bold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E2B44F]/10 rounded flex items-center justify-center">🔧</div>
                Tourne-vis de raquette
              </h3>
              <p className="text-gray-400 text-sm">
                Outil ultrapréci avec embout spécial pour déplacer la raquette de quelques microns 
                sans endommager le spiral.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-colors">
              <h3 className="text-[#E2B44F] font-bold mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E2B44F]/10 rounded flex items-center justify-center">🔬</div>
                Microscope binoculaire
              </h3>
              <p className="text-gray-400 text-sm">
                Grossissement 10x à 40x pour observer le battement du balancier et vérifier le 
                positionnement de la raquette.
              </p>
            </div>
          </div>
        </section>

        {/* Glossaire interactif */}
        <section className="mb-12 bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-[#E2B44F]/20">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            Glossaire Interactive
          </h2>
          <div className="space-y-3">
            {glossaryTerms.map((item, index) => (
              <div key={index} className="border-b border-[#E2B44F]/10 last:border-0">
                <button
                  onClick={() => toggleGlossary(index)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#0a0a0a] rounded transition-colors"
                >
                  <span className="text-white font-semibold">{item.term}</span>
                  {glossaryOpen[index] ? <ChevronDown className="w-5 h-5 text-[#E2B44F]" /> : <ChevronRight className="w-5 h-5 text-gray-500" />}
                </button>
                {glossaryOpen[index] && (
                  <div className="px-3 pb-3 text-gray-400 text-sm pl-6">
                    {item.definition}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Mini-quiz amélioré */}
        <section className="bg-[#1a1a1a] rounded-xl p-6 md:p-8 border border-[#E2B44F]/20">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3">
            <Award className="w-8 h-8" />
            Mini-Quiz : Devenez Régleur
          </h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const answered = quizAnswers[qIndex] !== null;
              const isCorrect = answered && quizAnswers[qIndex] === q.correct;
              const show = answered && isCorrect;
              
              return (
                <div key={qIndex} className="bg-[#0a0a0a] rounded-lg overflow-hidden transition-all duration-300">
                  <div className="p-4 md:p-6">
                    <p className="text-white font-semibold mb-4 flex items-start gap-2">
                      <span className="bg-[#E2B44F] text-black px-2 py-1 rounded text-sm font-bold mt-0.5">
                        {qIndex + 1}
                      </span>
                      {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => {
                        const selected = quizAnswers[qIndex] === oIndex;
                        const correct = oIndex === q.correct;
                        
                        let buttonClass = "w-full text-left p-4 rounded-lg transition-all border flex items-center gap-3 ";
                        
                        if (answered) {
                          if (correct) {
                            buttonClass += "bg-[#E2B44F] border-[#E2B44F] text-black font-semibold";
                          } else if (selected && !correct) {
                            buttonClass += "bg-red-900/30 border-red-500 text-gray-300";
                          } else {
                            buttonClass += "bg-[#0a0a0a] border-gray-700 text-gray-500";
                          }
                        } else {
                          buttonClass += "bg-[#0a0a0a] border-gray-700 text-gray-300 hover:border-[#E2B44F] hover:text-white hover:bg-[#1a1a1a]";
                        }

                        return (
                          <button
                            key={oIndex}
                            onClick={() => handleAnswer(qIndex, oIndex)}
                            className={buttonClass}
                            disabled={answered}
                          >
                            <span className="w-6 h-6 border-2 rounded-full flex items-center justify-center flex-shrink-0">
                              {answered && correct && "✓"}
                              {answered && selected && !correct && "✗"}
                            </span>
                            <span className="flex-1">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Feedback explicatif */}
                  {answered && (
                    <div className={`p-4 md:p-6 border-t ${isCorrect ? 'border-[#E2B44F]/30 bg-[#E2B44F]/5' : 'border-red-500/30 bg-red-900/10'}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? 
                          <Award className="w-6 h-6 text-[#E2B44F] flex-shrink-0 mt-1" /> : 
                          <RefreshCw className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                        }
                        <div>
                          <p className={`font-semibold mb-1 ${isCorrect ? 'text-[#E2B44F]' : 'text-red-400'}`}>
                            {isCorrect ? 'Excellent !' : 'Presque...'})
                          </p>
                          <p className="text-gray-400 text-sm">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Score */}
          <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border border-[#E2B44F]/20">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Score</span>
              <span className="text-2xl font-bold text-[#E2B44F]">
                {Object.values(quizAnswers).filter(a => a !== null).length} / 3
              </span>
            </div>
            <div className="mt-2 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#E2B44F] to-yellow-400 transition-all duration-500"
                style={{ width: `${(Object.values(quizAnswers).filter(a => a !== null).length / 3) * 100}%` }}
              />
            </div>
          </div>
        </section>

        {/* Section Pratique - Mains dans le cambouis */}
        <section className="mt-12 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl p-6 md:p-8 border border-[#E2B44F]/20">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3">
            <Tool className="w-8 h-8" />
            Mains dans le Cambouis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-bold mb-3">Exercice mental 🧠</h3>
              <p className="text-gray-400 text-sm mb-3">
                Vous mesurez une amplitude de 230° au chronocomparateur. Que cela signifie-t-il et 
                quelle est la première cause à vérifier ?
              </p>
              <details className="text-xs text-[#E2B44F] cursor-pointer">
                <summary className="select-none">Voir la réponse</summary>
                <p className="text-gray-400 mt-2">
                  Amplitude trop basse : probable usure du roulement ou manque de lubrification. 
                  Vérifier d'abord la tension du ressort moteur, puis l'état des pivots.
                </p>
              </details>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3">Prochaine étape 🎯</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E2B44F] rounded-full"></span>
                  Module 5 : Lubrification et entretien
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E2B44F] rounded-full"></span>
                  Atelier pratique : Réglage sur ETA 2824
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#E2B44F] rounded-full"></span>
                  Certification COSC : Comprendre les normes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Ressources supplémentaires */}
        <section className="mt-8 p-4 bg-[#1a1a1a] rounded-lg border border-[#E2B44F]/10">
          <p className="text-xs text-gray-500 text-center">
            📚 Ressources : <Link href="#" className="text-[#E2B44F] hover:underline">Documentation technique ETA</Link> | 
            <Link href="#" className="text-[#E2B44F] hover:underline ml-1">Normes ISO 3159</Link> | 
            <Link href="#" className="text-[#E2B44F] hover:underline ml-1">Forum des régleurs</Link>
          </p>
        </section>
      </div>
    </div>
  );
}
