'use client';

import React, { useState, FC, ReactNode } from 'react';
import { 
  ChevronLeft, Battery, Zap, Clock, TrendingUp, AlertCircle, 
  BookOpen, Wrench, Atom, BarChart2, ShieldCheck, Scale 
} from 'lucide-react';
import Link from 'next/link';

// --- TYPESCRIPT INTERFACES ---
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface InfoCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  borderColor: string;
}

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

// --- DATA (séparées du JSX pour la clarté) ---
const barrelParts = [
  { title: "1. Le Tambour", description: "Cylindre métallique creux (laiton) qui contient le ressort. Sa denture extérieure engrène avec le rouage.", details: "Diamètre: 8-12 mm\nHauteur: 1.5-2.5 mm", borderColor: "border-blue-500" },
  { title: "2. L'Arbre de barillet", description: "Axe central (acier trempé) autour duquel s'enroule le ressort. Il transmet le couple de remontage.", details: "Fonction: Point d'ancrage et de remontage", borderColor: "border-green-500" },
  { title: "3. Le Ressort moteur", description: "Lame d'acier ou alliage spécial (Nivaflex) enroulée. C'est le réservoir d'énergie.", details: "Longueur: 300-600 mm\nÉpaisseur: 0.05-0.15 mm", borderColor: "border-orange-500" },
  { title: "4. Le Couvercle", description: "Ferme le tambour pour maintenir le ressort. Il peut être chassé ou vissé.", details: "Fonction: Protection et étanchéité", borderColor: "border-purple-500" },
];

const mainspringMaterials = [
  { name: "Acier au carbone", composition: "Fe + C (0.9-1.0%)", advantages: "Traditionnel, éprouvé, bon couple initial" },
  { name: "Nivaflex®", composition: "Ni-Cr-Co-Ti-Be", advantages: "Antimagnétique, inoxydable, excellente résistance à la fatigue, couple stable" },
  { name: "Spirel® (Parachrom)", composition: "Zr-Nb alloy", advantages: "Développé par Rolex, amagnétique, très haute élasticité" },
  { name: "Silicium (Si)", composition: "Silicium monocristallin", advantages: "Amagnétique, léger, insensible à la corrosion et aux T°, fabrication précise (DRIE)" },
];

const quizData: QuizQuestion[] = [
    { question: "Quelle est la fonction principale du barillet dans une montre mécanique ?", options: ["Afficher l'heure", "Stocker l'énergie du ressort moteur", "Régler la précision", "Protéger le mouvement"], correctAnswer: 1, explanation: "Le barillet est l'organe moteur de la montre. Il contient le ressort moteur qui stocke l'énergie mécanique et la libère progressivement." },
    { question: "Qu'est-ce que l'isochronisme, et comment le barillet l'influence-t-il ?", options: ["La résistance à l'eau", "La régularité des oscillations du balancier, peu importe l'énergie restante", "La capacité à résister aux champs magnétiques", "La durée totale de la réserve de marche"], correctAnswer: 1, explanation: "L'isochronisme est la capacité du balancier à osciller à la même fréquence quelle que soit son amplitude. Le barillet l'influence car il doit fournir un couple (force) aussi constant que possible pour ne pas perturber cette régularité." },
    { question: "De quel matériau moderne est fait le Nivaflex, un alliage pour ressorts moteurs ?", options: ["Acier et Carbone", "Titane et Or", "Nickel, Chrome, Cobalt, et Béryllium", "Silicium pur"], correctAnswer: 2, explanation: "Le Nivaflex est un alliage complexe (Ni-Cr-Co-Ti-Be) réputé pour sa grande résistance à la fatigue, son caractère amagnétique et sa capacité à fournir un couple stable." },
    { question: "Dans un système à double barillet monté en série, quel est le principal avantage obtenu ?", options: ["Plus de précision", "Une montre plus fine", "Une réserve de marche plus longue", "Un remontage plus rapide"], correctAnswer: 2, explanation: "Monter deux barillets en série permet d'additionner leur réserve de marche. Le premier barillet déroule son énergie dans le second, qui à son tour alimente le rouage, doublant ainsi l'autonomie de la montre (ex: 3 jours -> 7-8 jours)." },
    { question: "Quelle est la fonction de la bride glissante (slipping bridle) ?", options: ["Accélérer le désarmage", "Lubrifier le ressort", "Éviter la surtension et la casse du ressort lors du remontage automatique", "Indiquer la réserve de marche"], correctAnswer: 2, explanation: "Essentielle dans les montres automatiques, la bride glissante permet à l'extrémité externe du ressort de patiner contre la paroi du tambour lorsque celui-ci est complètement armé, évitant ainsi la surtension et la casse." },
];

// --- SOUS-COMPOSANTS (pour un code plus propre) ---

const Section: FC<SectionProps> = ({ title, subtitle, children }) => (
  <section className="mb-12">
    <div className="mb-8">
      {subtitle && <p className="text-blue-600 dark:text-blue-400 font-semibold">{subtitle}</p>}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">{title}</h2>
    </div>
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8">
      {children}
    </div>
  </section>
);

const InfoCard: FC<InfoCardProps> = ({ title, children, icon, borderColor }) => (
  <div className={`bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border-l-4 ${borderColor}`}>
    <div className="flex items-start">
      {icon && <div className="mr-4 flex-shrink-0">{icon}</div>}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <div className="text-slate-700 dark:text-slate-300 space-y-2">{children}</div>
      </div>
    </div>
  </div>
);


// --- COMPOSANT PRINCIPAL DE LA PAGE ---

export default function BarilletRessortMoteurPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === quizData[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 dark:from-slate-950 dark:to-slate-900 text-slate-800 dark:text-slate-200">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/theorie" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-semibold">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la Théorie de l'Horlogerie
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-16">
          <p className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
            Organe Moteur
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Le Barillet et le Ressort Moteur
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Au cœur de chaque montre mécanique se trouve sa batterie : une merveille de la physique qui capture et délivre le temps.
          </p>
        </div>

        {/* --- Section 1: Principe et fonction --- */}
        <Section title="Principe et Fonction : La Batterie Mécanique">
          <p className="mb-4 text-lg">
            Le <strong>barillet</strong> est l'accumulateur d'énergie d'une montre mécanique. C'est un tambour cylindrique qui abrite le <strong>ressort moteur</strong>, une longue lame enroulée en spirale.
          </p>
          <p className="mb-6">
            L'action de remonter la montre, manuellement via la couronne ou automatiquement par les mouvements du poignet, comprime ce ressort. Celui-ci emmagasine de l'énergie potentielle élastique. Il la restituera ensuite de manière lente, contrôlée et aussi constante que possible pour animer le cœur de la montre : l'organe régulateur.
          </p>
          <InfoCard title="💡 Analogie Fondamentale" borderColor="border-amber-500" icon={<Battery className="w-8 h-8 text-amber-500" />}>
            <p>
              Pensez au barillet comme au <strong>réservoir d'eau d'un moulin</strong>. Le remontage remplit le réservoir. L'eau (l'énergie) s'écoule ensuite à un débit contrôlé pour faire tourner la roue du moulin (le rouage et l'échappement), qui à son tour moud le grain (mesure le temps). La constance du débit est la clé de la régularité.
            </p>
          </InfoCard>
        </Section>

        {/* --- Section 2: Constitution Détaillée --- */}
        <Section title="Anatomie d'un Barillet">
          <p className="mb-6">Le barillet est une pièce d'apparence simple mais dont chaque composant est optimisé. Il se compose de quatre éléments principaux :</p>
          <div className="grid md:grid-cols-2 gap-6">
            {barrelParts.map(part => (
              <div key={part.title} className={`bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/50 rounded-xl p-6 border ${part.borderColor.replace('border-l-4', 'border')} dark:border-slate-700`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{part.title}</h3>
                <p className="text-slate-700 dark:text-slate-300 mb-3">{part.description}</p>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-4 bg-white dark:bg-slate-900/50 p-3 rounded font-mono whitespace-pre-line">
                  {part.details}
                </div>
              </div>
            ))}
          </div>
           <div className="mt-8 bg-slate-100 dark:bg-slate-900 p-6 rounded-xl border-2 border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">Schéma en coupe</h4>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              [Ici, une image ou un schéma interactif de haute qualité montrant une vue éclatée du barillet serait idéal. Il mettrait en évidence le tambour, l'arbre, le ressort en spirale avec sa bride glissante, et le couvercle.]
            </p>
          </div>
        </Section>
        
        {/* --- Section 3: Couple Moteur et Isochronisme --- */}
        <Section title="Couple Moteur et Isochronisme" subtitle="Le Défi de la Stabilité">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <p className="mb-4">
                        Le principal défi du ressort moteur est qu'il ne délivre pas une force constante. Le <strong>couple</strong> (la force de rotation) est très élevé lorsque le ressort est complètement armé, et il diminue à mesure qu'il se désarme.
                    </p>
                    <p className="mb-4">
                        Cette variation de couple affecte l'<strong>isochronisme</strong> : la capacité de l'organe réglant (le balancier-spiral) à maintenir la même fréquence d'oscillation quelle que soit son amplitude. Un couple trop fort augmente l'amplitude, un couple trop faible la réduit, ce qui peut faire varier la marche de la montre de plusieurs secondes par jour.
                    </p>
                    <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-600 p-4 rounded-r-lg mt-6">
                        <h4 className="font-bold text-green-900 dark:text-green-200 mb-1">L'objectif de l'horloger</h4>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                        Toute l'ingénierie du barillet (alliages modernes, géométrie du ressort, systèmes à plusieurs barillets) vise à aplatir la courbe de couple pour fournir une énergie aussi stable que possible durant la majeure partie de la réserve de marche.
                        </p>
                    </div>
                </div>
                <div className="md:w-1/3 bg-slate-100 dark:bg-slate-900 p-6 rounded-xl flex flex-col items-center justify-center">
                    <BarChart2 className="w-16 h-16 text-blue-500 mb-4" />
                    <h4 className="font-bold text-center mb-2">Courbe de Couple Typique</h4>
                    <p className="text-sm text-center text-slate-600 dark:text-slate-400">[Graphique illustrant la courbe de couple : forte au début, suivie d'un long plateau relativement stable, puis d'une chute rapide à la fin de la réserve de marche.]</p>
                </div>
            </div>
        </Section>

        {/* --- Section 4: Matériaux et Innovations --- */}
        <Section title="Matériaux : de l'Acier au Silicium" subtitle="La Quête du Ressort Parfait">
            <p className="mb-6">Le ressort moteur est l'une des pièces subissant le plus de contraintes mécaniques. Son évolution matérielle est une saga d'innovation.</p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Matériau</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Composition Clé</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-white">Avantages Majeurs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {mainspringMaterials.map(mat => (
                    <tr key={mat.name} className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{mat.name}</td>
                      <td className="px-6 py-4">{mat.composition}</td>
                      <td className="px-6 py-4">{mat.advantages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </Section>
        
        {/* --- Section 5: Architectures de Barillets --- */}
        <Section title="Architectures et Évolutions" subtitle="Plus de Puissance, Plus de Stabilité">
            <div className="grid md:grid-cols-2 gap-6">
                <InfoCard title="1. Double Barillet en Série" borderColor="border-sky-500" icon={<TrendingUp className="w-8 h-8 text-sky-500"/>}>
                    <p>Deux barillets sont connectés l'un après l'autre. Le premier alimente le second, qui alimente le rouage. <br/><strong>Avantage :</strong> Double la réserve de marche (ex: 7-10 jours). Stabilise le couple en moyennant la force des deux ressorts.<br/><strong>Exemples:</strong> Panerai Luminor 8 Days, IWC Portugieser.</p>
                </InfoCard>
                <InfoCard title="2. Double Barillet en Parallèle" borderColor="border-teal-500" icon={<Scale className="w-8 h-8 text-teal-500"/>}>
                    <p>Deux barillets alimentent simultanément le rouage via un pignon central.<br/><strong>Avantage :</strong> Augmente le couple disponible, nécessaire pour les complications énergivores (chronographe, sonnerie). La réserve de marche est inchangée mais plus stable.<br/><strong>Exemples:</strong> Certains chronographes A. Lange & Söhne.</p>
                </InfoCard>
                 <InfoCard title="3. Barillet Superposé" borderColor="border-indigo-500" icon={<Zap className="w-8 h-8 text-indigo-500"/>}>
                    <p>Deux ressorts plus fins sont empilés dans un seul barillet surdimensionné.<br/><strong>Avantage :</strong> Fournit une grande réserve de marche (ex: 5 jours) avec un couple plus régulier qu'un seul ressort épais, dans un encombrement maîtrisé.<br/><strong>Exemples:</strong> Chopard L.U.C (technologie Twin).</p>
                </InfoCard>
                <InfoCard title="4. Barillet à Bride Glissante" borderColor="border-rose-500" icon={<ShieldCheck className="w-8 h-8 text-rose-500"/>}>
                    <p>Indispensable pour le remontage automatique. L'extrémité du ressort n'est pas fixée mais tenue par une bride à friction. Une fois armé, le ressort "glisse" pour éviter la surtension.<br/><strong>Avantage :</strong> Sécurité absolue contre la casse du ressort due à un remontage excessif.</p>
                </InfoCard>
            </div>
        </Section>

        {/* --- Section 6: Maintenance et Pannes Courantes --- */}
        <Section title="Maintenance et Pannes Courantes" subtitle="Quand le Cœur Fatigue">
             <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-10 h-10 text-amber-600 dark:text-amber-400 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-2">Signes d'un ressort moteur fatigué</h4>
                  <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1">
                    <li><strong>Réserve de marche diminuée :</strong> La montre s'arrête bien avant son autonomie théorique.</li>
                    <li><strong>Perte de précision :</strong> Souvent une avance notable en début de charge, et un retard important en fin de charge.</li>
                    <li><strong>Arrêts inopinés :</strong> Le couple fourni n'est plus suffisant pour animer le mouvement.</li>
                  </ul>
                  <p className="mt-4 text-sm">Le remplacement du ressort moteur (ou du barillet complet) est une opération standard lors d'une révision complète (tous les 5 à 7 ans), car il s'agit d'une pièce d'usure soumise à une fatigue métallique intense.</p>
                </div>
              </div>
            </div>
        </Section>

        {/* --- Section 7: Quiz --- */}
        <Section title="Testez vos Connaissances" subtitle="Quiz d'Expert">
           {!quizCompleted ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Question {currentQuestion + 1} sur {quizData.length}</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Score : {score}/{quizData.length}</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-8">
                  <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}/>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-6">{quizData[currentQuestion].question}</h3>
              <div className="space-y-3 mb-6">
                {quizData[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswerClick(index)} disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all disabled:cursor-not-allowed ${
                      selectedAnswer === null
                        ? 'border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                        : index === quizData[currentQuestion].correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-slate-900 dark:text-white'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/30 text-slate-900 dark:text-white'
                        : 'border-slate-300 dark:border-slate-700 opacity-60'
                    }`}
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <div className="animate-fade-in">
                  <div className="bg-slate-100 dark:bg-slate-900 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                    <p className="font-semibold mb-1">Explication :</p>
                    <p>{quizData[currentQuestion].explanation}</p>
                  </div>
                  <button onClick={handleNextQuestion} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    {currentQuestion < quizData.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4">Quiz terminé !</h3>
              <p className="text-xl mb-6">
                Votre score : {score} sur {quizData.length} ({Math.round((score / quizData.length) * 100)}%)
              </p>
              <div className="flex gap-4 justify-center">
                <button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Recommencer
                </button>
                <Link href="/theorie" className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Retour
                </Link>
              </div>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}
