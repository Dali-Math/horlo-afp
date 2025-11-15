"use client";
import Link from "next/link";
import { ArrowLeft, ChevronRight, AlertTriangle, Lightbulb, Tool, CheckCircle, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";

export default function HuilagePage() {
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number | null }>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [showResults, setShowResults] = useState(false);

  const sections = [
    { id: "introduction", title: "Introduction", icon: BookOpen },
    { id: "importance", title: "Pourquoi le huilage est-il crucial ?", icon: AlertTriangle },
    { id: "types-huiles", title: "Les types d'huiles et leurs applications", icon: Lightbulb },
    { id: "outils", title: "Outils du professionnel", icon: Tool },
    { id: "technique", title: "Technique pas à pas", icon: CheckCircle },
    { id: "erreurs", title: "Erreurs courantes à éviter", icon: AlertTriangle },
    { id: "maintenance", title: "Plan de maintenance", icon: BookOpen },
    { id: "glossaire", title: "Glossaire technique", icon: BookOpen },
    { id: "quiz", title: "Quiz interactif", icon: Lightbulb },
  ];

  const questions = [
    {
      question: "Quelle est la quantité idéale d'huile à appliquer sur un pivot ?",
      options: [
        "Une goutte épaisse",
        "Une quantité microscopique, juste visible (ménisque parfait)",
        "Plusieurs gouttes pour être sûr",
        "Aucune huile n'est nécessaire sur les pivots",
      ],
      correct: 1,
      explanation: "Un ménisque parfait mesure environ 0.5mm de diamètre. Trop d'huile provoque la migration vers le spiral, trop peu crée un film lubrifiant insuffisant."
    },
    {
      question: "Pourquoi faut-il utiliser différentes huiles selon les zones du mouvement ?",
      options: [
        "C'est une tradition horlogère ancestrale",
        "Pour différencier visuellement les zones",
        "Les vitesses de rotation et pressions variant drastiquement (de 1 à 1000 tours/min)",
        "Pour économiser sur les huiles les plus chères",
      ],
      correct: 2,
      explanation: "Le barillet tourne très lentement (1 tour/8h) avec forte pression, tandis que l'échappement bat 5 fois/seconde. Les viscosités doivent s'adapter : 800-1000 cSt pour le barillet, 10-15 cSt pour l'échappement."
    },
    {
      question: "Quelle est la conséquence d'un excès d'huile sur un pivot ?",
      options: [
        "Meilleure absorption des chocs",
        "Migration vers d'autres pièces, attirance de la poussière, risque de blocage du spiral",
        "Protection accrue contre la corrosion",
        "Aucune conséquence notable",
      ],
      correct: 1,
      explanation: "L'excès d'huile est le n°1 des problèmes de précision. Il peut causer un gain de plusieurs minutes par jour par migration sur le spiral, et attirer des particules abrasives."
    },
    {
      question: "Quelle est la fréquence de révision recommandée pour une montre mécanique moderne ?",
      options: [
        "Tous les 10 ans",
        "Tous les 5-7 ans maximum, 3-5 ans en conditions extrêmes",
        "Uniquement quand elle s'arrête",
        "Tous les 2 ans systématiquement",
      ],
      correct: 1,
      explanation: "Les huiles synthétiques modernes durent 5-7 ans en conditions normales, mais la dégradation s'accélère avec la température, l'humidité et la poussière. Une révision préventive coûte 3x moins qu'une réparation."
    },
    {
      question: "Quel outil est indispensable pour un huilage professionnel ?",
      options: [
        "Un simple coton-tige",
        "Un huilier automatique électronique",
        "Un huilier manuel avec pointe capillaire en roseau ou acier inoxydable",
        "Une seringue médicale",
      ],
      correct: 2,
      explanation: "Le huilier manuel offre un contrôle précis au micron près. Les pointes capillaires (0.15-0.25mm) permettent de déposer exactement la bonne quantité. Les outils automatiques manquent de finesse pour les calibres complexes."
    },
  ];

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answerIndex });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++;
    });
    return (correct / questions.length) * 100;
  };

  const resetQuiz = () => {
    const resetAnswers: { [key: number]: number | null } = {};
    questions.forEach((_, index) => {
      resetAnswers[index] = null;
    });
    setQuizAnswers(resetAnswers);
    setShowResults(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = 0; i < sectionElements.length; i++) {
        const element = sectionElements[i];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionElements[i]?.id || "");
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Bouton retour */}
        <Link
          href="/pratique"
          className="inline-flex items-center gap-2 text-[#E2B44F] hover:text-white transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à la pratique
        </Link>

        {/* Titre principal */}
        <h1 className="text-4xl md:text-6xl font-bold text-[#E2B44F] mb-12 text-center font-serif tracking-tight">
          Huilage & Lubrification Horlogère
        </h1>

        {/* Table des matières */}
        <nav className="mb-12 bg-[#1a1a1a] rounded-xl p-6 sticky top-4 z-10 border border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Plan du cours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-2 text-left p-3 rounded-lg transition-all duration-300 hover:bg-[#2a2a2a] ${
                    activeSection === section.id ? "bg-[#2a2a2a] text-[#E2B44F]" : "text-gray-300"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{section.title}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Vidéo - Section 1 */}
        <section id="introduction" className="mb-12 scroll-mt-24">
          <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#E2B44F]/30 hover:border-[#E2B44F] transition-all duration-300">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ARb8Vo4refs?si=nRyWBeHLpwyreJgg"
              title="Techniques de lubrification horlogère"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="text-sm text-gray-400 mt-3 italic text-center">
            Durée : 12 min | Niveau : Intermédiaire | Outils nécessaires : huilier, loupe binoculaire
          </p>
        </section>

        {/* Importance - Section 2 */}
        <section id="importance" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <AlertTriangle className="w-7 h-7" />
            Pourquoi le huilage est-il crucial ?
          </h2>
          <div className="text-gray-300 leading-relaxed space-y-6">
            <p className="text-lg">
              Le huilage représente <strong className="text-[#E2B44F] font-semibold">30% de la précision</strong> et 
              <strong className="text-[#E2B44F] font-semibold"> 50% de la longévité</strong> d'un mouvement mécanique. 
              Un mouvement non huilé voit son amortissement augmenter de <strong>40% en 6 mois</strong>.
            </p>
            
            <div className="bg-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F] my-6">
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#E2B44F]" />
                Saviez-vous ?
              </h3>
              <p className="text-gray-300">
                Une montre mécanique contient en moyenne <strong>15 à 30 points de lubrification</strong> distincts, 
                chacun nécessitant une huile de viscosité spécifique. Le calibre Rolex 3135 a exactement 31 points de huilage !
              </p>
            </div>

            <p>
              Les frottements dans un mouvement non lubrifié génèrent de la chaleur, usent les pivots et les rubis, 
              et provoquent une dérive de précision de <strong>+15 à +30 secondes par jour</strong>. Le huilage crée un 
              film de seulement <strong>0,001 à 0,01 mm</strong> entre les surfaces, suffisant pour transformer un frottement 
              sec (coefficient 0,3) en frottement fluide (coefficient 0,03).
            </p>
          </div>
        </section>

        {/* Types d'huiles - Section 3 */}
        <section id="types-huiles" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Les types d'huiles et leurs applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all">
              <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Huiles synthétiques (modernes)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong>9010 (Mobius) :</strong> Pivots rapides, viscosité 10 cSt - Roulements, rotor automatique</li>
                <li><strong>9020 :</strong> Pivots moyens, viscosité 20 cSt - Roue de centre, roue des secondes</li>
                <li><strong>9415 (spécial échappement) :</strong> Haute pression, 15 cSt - Dents d'échappement, palette</li>
                <li><strong>8200 :</strong> Haute viscosité, 800-1000 cSt - Barillet, ressort de remontoir</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all">
              <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Graisses (zones à forte pression)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong>8300 (Mobius) :</strong> Graisse lithium pour barillets - Résiste à 30 kg/cm²</li>
                <li><strong>KLUBER P125 :</strong> Paliers de rotor automatique - Très haute adhérence</li>
                <li><strong>HP1300 :</strong> Roue à canon, canon de roue de réglage - Pression modérée</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mt-6">
            <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Tableau de compatibilité</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-[#E2B44F] uppercase bg-[#0a0a0a]">
                  <tr>
                    <th className="px-4 py-3">Composant</th>
                    <th className="px-4 py-3">Vitesse</th>
                    <th className="px-4 py-3">Pression</th>
                    <th className="px-4 py-3">Huile recommandée</th>
                    <th className="px-4 py-3">Quantité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Barillet</td>
                    <td className="px-4 py-3">1 tour/8h</td>
                    <td className="px-4 py-3">Élevée</td>
                    <td className="px-4 py-3">Mobius 8200</td>
                    <td className="px-4 py-3">2-3 mg</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Roue de centre</td>
                    <td className="px-4 py-3">1 tour/heure</td>
                    <td className="px-4 py-3">Moyenne</td>
                    <td className="px-4 py-3">Mobius 9020</td>
                    <td className="px-4 py-3">0.5-1 mg</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Échappement</td>
                    <td className="px-4 py-3">5 Hz / 18 000 A/h</td>
                    <td className="px-4 py-3">Très élevée</td>
                    <td className="px-4 py-3">Mobius 9415</td>
                    <td className="px-4 py-3">0.1-0.2 mg</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Rotor auto</td>
                    <td className="px-4 py-3">500-1000 tours/min</td>
                    <td className="px-4 py-3">Faible</td>
                    <td className="px-4 py-3">Mobius 9010</td>
                    <td className="px-4 py-3">1-2 mg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Outils - Section 4 */}
        <section id="outils" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Outils du professionnel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tool className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Huilier manuel</h3>
              <p className="text-gray-400 text-sm">
                Corps en laiton, pointe capillaire 0.15-0.25mm. Permet de déposer des quantités précises au micron près. Nettoyage à l'alcool après chaque utilisation.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Loupe binoculaire</h3>
              <p className="text-gray-400 text-sm">
                Grossissement x10 à x20. Indispensable pour visualiser le ménisque d'huile. Éclairage LED intégré recommandé pour éviter les ombres.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Papier absorbant</h3>
              <p className="text-gray-400 text-sm">
                Pour retirer l'excès d'huile sans laisser de fibres. Papier de soie horlogère ou buvard qualité supérieure uniquement.
              </p>
            </div>
          </div>
        </section>

        {/* Technique - Section 5 */}
        <section id="technique" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Technique pas à pas
          </h2>
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F]">
              <h3 className="font-bold text-white mb-2">Étape 1 : Préparation</h3>
              <p className="text-gray-300">
                Nettoyer tous les pivots à la benzine, séchage à l'air chaud (max 50°C). Vérifier l'absence de poussière sous loupe x10. 
                <strong> Temps : 30-45 min</strong> pour un mouvement complet.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F]">
              <h3 className="font-bold text-white mb-2">Étape 2 : Chargement du huilier</h3>
              <p className="text-gray-300">
                Tremper la pointe capillaire à 1mm dans l'huile. Retirer et attendre 3 secondes que la goutte se stabilise. 
                <strong> Ne jamais </strong> remplir plus de 2mm la pointe pour éviter l'écoulement.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F]">
              <h3 className="font-bold text-white mb-2">Étape 3 : Application</h3>
              <p className="text-gray-300">
                Approcher la pointe à 0.5mm du pivot. Laisser la goutte toucher le pivot par capillarité - <strong>ne jamais frotter</strong>. 
                Le ménisque doit être visible en 3 secondes. Si besoin, retirer l'excès avec un pointe de buvard.
              </p>
            </div>
            <div className="bg-[#0a0a0a] p-5 rounded-lg border-l-4 border-[#E2B44F]">
              <h3 className="font-bold text-white mb-2">Étape 4 : Vérification</h3>
              <p className="text-gray-300">
                Sous loupe x10-x15, vérifier que l'huile forme un ménisque <strong>régulier, brillant, sans bulles</strong>. 
                Diamètre idéal : 0.4-0.6mm. Si le ménisque est trop grand (&gt;1mm), retirer immédiatement avec du buvard.
              </p>
            </div>
          </div>
        </section>

        {/* Erreurs - Section 6 */}
        <section id="erreurs" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Erreurs courantes et leurs conséquences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-700/50">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Excès d'huile
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Migration vers le spiral → gain de +10 à +30 s/j</li>
                <li>• Attirance des poussières → usure accélérée x3</li>
                <li>• Risque de blocage du balancier</li>
                <li>• <strong>Coût de réparation : 300-500€</strong></li>
              </ul>
            </div>
            <div className="bg-red-900/20 p-6 rounded-xl border border-red-700/50">
              <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Huile inadaptée
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Huile trop fluide → fuite rapide, séchement en 1-2 ans</li>
                <li>• Huile trop épaisse → surconsommation de remontoir (-30% d'autonomie)</li>
                <li>• Mélange d'huiles → polymérisation prématurée</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mt-6">
            <h3 className="text-lg font-bold text-[#E2B44F] mb-3">Témoignage d'un master horloger</h3>
            <blockquote className="text-gray-300 italic border-l-4 border-[#E2B44F] pl-4">
              "J'ai vu des montres de 20 000€ devenir imprécises à +5 min/jour juste à cause d'un excès d'huile sur le pivot du balancier. 
              La lubrification est le test ultime de la patience du horloger." 
              <footer className="text-sm text-gray-400 mt-2">- Jean-Marc, 35 ans d'expérience, Biel/Bienne</footer>
            </blockquote>
          </div>
        </section>

        {/* Maintenance - Section 7 */}
        <section id="maintenance" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Plan de maintenance recommandé
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E2B44F] mb-2">3-5 ans</div>
              <div className="text-gray-300">
                <p className="font-semibold text-white mb-1">Montres de tous les jours</p>
                <p className="text-sm">Révision complète avec changement de tous les lubrifiants. Inspection des usures.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E2B44F] mb-2">5-7 ans</div>
              <div className="text-gray-300">
                <p className="font-semibold text-white mb-1">Montres occasionnelles</p>
                <p className="text-sm">Révision complète. Les huiles synthétiques résistent mieux au temps.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">+7 ans</div>
              <div className="text-gray-300">
                <p className="font-semibold text-white mb-1">RISQUE</p>
                <p className="text-sm">Huiles séchées → usure mécanique irréversible. Coûts de réparation majeurs.</p>
              </div>
            </div>
          </div>
          <div className="bg-[#0a0a0a] p-5 rounded-lg mt-6 border border-[#E2B44F]/30">
            <h3 className="font-bold text-[#E2B44F] mb-2">Indicateurs d'un huilage à revoir</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-300">
              <li>• Perturbation de la marche (±15 s/j)</li>
              <li>• Réserve de marche diminuée (-20%)</li>
              <li>• Remontoir plus dur ou grincant</li>
              <li>• Bruits anormaux (cliquetis, frottements)</li>
              <li>• Condensation sous le verre</li>
              <li>• Montre non portée depuis &gt;3 ans</li>
            </ul>
          </div>
        </section>

        {/* Glossaire - Section 8 */}
        <section id="glossaire" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Glossaire technique
          </h2>
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <h3 className="font-bold text-[#E2B44F] mb-1">Ménisque</h3>
                <p className="text-gray-400 text-sm">Courbure de l'huile autour du pivot. Forme idéale : demi-sphère brillante de 0.4-0.6mm.</p>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <h3 className="font-bold text-[#E2B44F] mb-1">Viscosité (cSt)</h3>
                <p className="text-gray-400 text-sm">Centistokes - mesure de l'épaisseur. 1 cSt = eau, 1000 cSt = miel.</p>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <h3 className="font-bold text-[#E2B44F] mb-1">Polymérisation</h3>
                <p className="text-gray-400 text-sm">Durcissement de l'huile par oxydation. Forme des résins collantes qui bloquent le mouvement.</p>
              </div>
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <h3 className="font-bold text-[#E2B44F] mb-1">Point capillaire</h3>
                <p className="text-gray-400 text-sm">Fine pointe du huilier qui capte l'huile par tension superficielle. Diamètre critique : 0.15-0.25mm.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz - Section 9 */}
        <section id="quiz" className="bg-[#1a1a1a] p-6 md:p-8 rounded-xl mb-8 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Quiz interactif : Évaluez vos compétences
          </h2>
          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const isAnswered = quizAnswers[qIndex] !== null;
              return (
                <div key={qIndex} className="bg-[#0a0a0a] p-6 rounded-lg border border-gray-700 hover:border-[#E2B44F]/30 transition-all">
                  <p className="text-white font-semibold mb-4 text-lg">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, oIndex) => {
                      const isSelected = quizAnswers[qIndex] === oIndex;
                      const isCorrect = oIndex === q.correct;
                      const showResult = isAnswered;

                      let buttonClass =
                        "w-full text-left p-4 rounded-lg transition-all border ";

                      if (showResult) {
                        if (isCorrect) {
                          buttonClass += "bg-[#E2B44F]/20 border-[#E2B44F] text-black font-semibold";
                        } else if (isSelected && !isCorrect) {
                          buttonClass += "bg-red-900/30 border-red-500 text-gray-300";
                        } else {
                          buttonClass += "bg-[#0a0a0a] border-gray-700 text-gray-400";
                        }
                      } else {
                        buttonClass +=
                          "bg-[#0a0a0a] border-gray-700 text-gray-300 hover:border-[#E2B44F] hover:text-white hover:bg-[#2a2a2a]";
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswer(qIndex, oIndex)}
                          className={buttonClass}
                          disabled={showResult}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  {isAnswered && (
                    <div className={`mt-4 p-4 rounded-lg border ${
                      quizAnswers[qIndex] === q.correct 
                        ? "bg-[#E2B44F]/10 border-[#E2B44F] text-[#E2B44F]" 
                        : "bg-red-900/20 border-red-500 text-red-400"
                    }`}>
                      <p className="text-sm">
                        <strong>{quizAnswers[qIndex] === q.correct ? "✓ Correct" : "✗ Incorrect"}</strong> : {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Résultats du quiz */}
          {Object.values(quizAnswers).every(answer => answer !== null) && !showResults && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowResults(true)}
                className="bg-[#E2B44F] text-black font-bold py-3 px-8 rounded-lg hover:bg-[#d4a03a] transition-all duration-300 transform hover:scale-105"
              >
                Voir mes résultats
              </button>
            </div>
          )}

          {showResults && (
            <div className="mt-8 bg-[#0a0a0a] p-6 rounded-xl border border-[#E2B44F]">
              <h3 className="text-2xl font-bold text-[#E2B44F] mb-4 text-center">
                Votre score : {calculateScore().toFixed(0)}%
              </h3>
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-4xl font-bold text-white">
                  {questions.filter((q, i) => quizAnswers[i] === q.correct).length} / {questions.length}
                </div>
                <div className="text-gray-300">
                  {calculateScore() >= 80 ? "🎉 Excellent !" : calculateScore() >= 60 ? "👍 Bon travail" : "📚 Continuez à apprendre"}
                </div>
              </div>
              {calculateScore() < 80 && (
                <div className="text-center text-gray-400 text-sm mb-4">
                  <p>Recommandation : Révisez les sections "Types d'huiles" et "Technique pas à pas"</p>
                </div>
              )}
              <button
                onClick={resetQuiz}
                className="bg-gray-700 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Recommencer le quiz
              </button>
            </div>
          )}
        </section>

        {/* Ressources complémentaires */}
        <section className="mb-8 bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold text-[#E2B44F] mb-4 font-serif">
            Pour aller plus loin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h3 className="font-bold text-white mb-1">Livres de référence</h3>
              <ul className="space-y-1">
                <li>• "La pratique de la lubrification horlogère" - Michel Diederich</li>
                <li>• "Techniques du graissage en horlogerie" - FH (Fondation Haute Horlogerie)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Fournisseurs recommandés</h3>
              <ul className="space-y-1">
                <li>• Mobius Lubricants (Suisse) - Référence mondiale</li>
                <li>• Bergeon - Outils et huiles spécialisés</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
          <p>HorloLearn - Cours de horlogerie en ligne | Dernière mise à jour : 2024</p>
          <p className="mt-1">Temps de lecture estimé : 15 minutes | Niveau : Intermédiaire</p>
        </footer>
      </div>
    </div>
  );
}
