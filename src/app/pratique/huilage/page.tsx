"use client";
import Link from "next/link";
import { ArrowLeft, ChevronRight, AlertTriangle, Lightbulb, Wrench, CheckCircle, BookOpen, Target, Award, Practice, HelpCircle, Info } from "lucide-react";
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
    { id: "introduction", title: "Introduction & Objectifs", icon: BookOpen },
    { id: "objectifs", title: "Ce que vous allez apprendre", icon: Target },
    { id: "importance", title: "Pourquoi le huilage est-il crucial ?", icon: AlertTriangle },
    { id: "types-huiles", title: "Les types d'huiles et leurs applications", icon: Lightbulb },
    { id: "memorisation", title: "Mémo élève : Astuces de mémorisation", icon: Award },
    { id: "outils", title: "Outils du professionnel", icon: Wrench },
    { id: "exercices-manipulation", title: "Exercices de manipulation", icon: Practice },
    { id: "technique", title: "Technique pas à pas", icon: CheckCircle },
    { id: "erreurs", title: "Erreurs courantes à éviter", icon: AlertTriangle },
    { id: "maintenance", title: "Plan de maintenance", icon: BookOpen },
    { id: "entrainement", title: "Plan d'entraînement élève", icon: Target },
    { id: "glossaire", title: "Glossaire technique", icon: BookOpen },
    { id: "quiz", title: "Quiz interactif", icon: Lightbulb },
    { id: "mise-en-pratique", title: "Mise en pratique", icon: Practice },
    { id: "checklist", title: "Checklist de l'élève", icon: CheckCircle },
    { id: "ressources", title: "Ressources complémentaires", icon: Info },
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
        <h1 className="text-4xl md:text-6xl font-bold text-[#E2B44F] mb-4 text-center font-serif tracking-tight">
          Huilage & Lubrification Horlogère
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
          Maîtrisez l'un des gestes les plus délicats et les plus importants de l'horlogerie - Techniques pas à pas pour élèves
        </p>

        {/* Table des matières */}
        <nav className="mb-12 bg-[#1a1a1a] rounded-xl p-6 sticky top-4 z-10 border border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold text-[#E2B44F] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Plan du cours - Cliquez pour naviguer
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

        {/* Objectifs d'apprentissage */}
        <section id="objectifs" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Target className="w-7 h-7" />
            Ce que vous allez apprendre aujourd'hui
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Compétences techniques</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Identifier les 15-30 points de lubrification d'un mouvement</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Choisir la bonne huile selon la vitesse et la pression</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Déposer un ménisque parfait de 0.5mm de diamètre</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Utiliser correctement l'huilier et la loupe binoculaire</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Savoir-faire professionnel</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Détecter un excès ou un manque d'huile visuellement</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Établir un plan de maintenance préventive</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Éviter les erreurs qui coûtent 3x plus à réparer</li>
                <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" /> Comprendre l'impact du huilage sur la précision</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border-l-4 border-blue-500">
            <p className="text-sm"><strong className="text-blue-400">💡 Conseil de maître horloger :</strong> Prenez des notes pendant la vidéo. Les gestes se décryptent par l'observation répétée et la pratique sur mouvements d'entraînement.</p>
          </div>
        </section>

        {/* Vidéo */}
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
          <div className="mt-4 p-4 bg-[#1a1a1a] rounded-lg border border-gray-800">
            <h4 className="font-semibold text-[#E2B44F] mb-2">🎯 Exercice pendant la vidéo :</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Notez les 3 gestes clés de la main qui tient l'huilier</li>
              <li>• Comptez le nombre de fois où l'horloger vérifie le ménisque</li>
              <li>• Repérez l'ordre de lubrification des composants (du plus lent au plus rapide)</li>
            </ul>
          </div>
        </section>

        {/* Importance */}
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

            {/* Analogie pour élèves */}
            <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/50">
              <h4 className="font-semibold text-blue-400 mb-2">🎓 Analogie pour les élèves :</h4>
              <p className="text-sm">
                Imaginez que chaque pivot est comme une roue de vélo. Sans graisse, la roue tourne mal, grippette, et finit par s'user. 
                Avec trop de graisse, elle attire la boue et se bloque. Le huilage horlogère, c'est trouver le dosage parfait pour que 
                chaque roue tourne librement sans s'user, dans un espace microscopique !
              </p>
            </div>

            <p>
              Les frottements dans un mouvement non lubrifié génèrent de la chaleur, usent les pivots et les rubis, 
              et provoquent une dérive de précision de <strong>+15 à +30 secondes par jour</strong>. Le huilage crée un 
              film de seulement <strong>0,001 à 0,01 mm</strong> entre les surfaces, suffisant pour transformer un frottement 
              sec (coefficient 0,3) en frottement fluide (coefficient 0,03).
            </p>

            <div className="mt-6 p-4 bg-red-900/20 rounded-lg border border-red-800/50">
              <p className="text-sm"><strong className="text-red-400">⚠️ Erreur fréquente des débutants :</strong> 
                Sur-huiler par sécurité. C'est l'inverse qui se produit : l'excès d'huile provoque plus de problèmes qu'un léger manque !</p>
            </div>
          </div>
        </section>

        {/* Types d'huiles */}
        <section id="types-huiles" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Les types d'huiles et leurs applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all">
              <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Huiles synthétiques (modernes)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong className="text-white">9010 (Mobius) :</strong> Pivots rapides, viscosité 10 cSt - Roulements, rotor automatique</li>
                <li><strong className="text-white">9020 :</strong> Pivots moyens, viscosité 20 cSt - Roue de centre, roue des secondes</li>
                <li><strong className="text-white">9415 (spécial échappement) :</strong> Haute pression, 15 cSt - Dents d'échappement, palette</li>
                <li><strong className="text-white">8200 :</strong> Haute viscosité, 800-1000 cSt - Barillet, ressort de remontoir</li>
              </ul>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all">
              <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Graisses (zones à forte pression)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><strong className="text-white">8300 (Mobius) :</strong> Graisse lithium pour barillets - Résiste à 30 kg/cm²</li>
                <li><strong className="text-white">KLUBER P125 :</strong> Paliers de rotor automatique - Très haute adhérence</li>
                <li><strong className="text-white">HP1300 :</strong> Roue à canon, canon de roue de réglage - Pression modérée</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 mt-6">
            <h3 className="text-xl font-bold text-[#E2B44F] mb-3">Tableau de compatibilité détaillé</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-[#E2B44F] uppercase bg-[#0a0a0a]">
                  <tr>
                    <th className="px-4 py-3">Composant</th>
                    <th className="px-4 py-3">Vitesse</th>
                    <th className="px-4 py-3">Pression</th>
                    <th className="px-4 py-3">Huile recommandée</th>
                    <th className="px-4 py-3">Quantité</th>
                    <th className="px-4 py-3">⚠️ Risque erreur</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Barillet</td>
                    <td className="px-4 py-3">1 tour/8h</td>
                    <td className="px-4 py-3">Élevée</td>
                    <td className="px-4 py-3">Mobius 8200</td>
                    <td className="px-4 py-3">2-3 mg</td>
                    <td className="px-4 py-3 text-red-400">Trop = fuite sur le spiral</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Roue de centre</td>
                    <td className="px-4 py-3">1 tour/heure</td>
                    <td className="px-4 py-3">Moyenne</td>
                    <td className="px-4 py-3">Mobius 9020</td>
                    <td className="px-4 py-3">0.5-1 mg</td>
                    <td className="px-4 py-3 text-red-400">Trop = migration visuelle</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Échappement</td>
                    <td className="px-4 py-3">5 Hz / 18 000 A/h</td>
                    <td className="px-4 py-3">Très élevée</td>
                    <td className="px-4 py-3">Mobius 9415</td>
                    <td className="px-4 py-3">0.1-0.2 mg</td>
                    <td className="px-4 py-3 text-red-400">Tout excès = arrêt brutal</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium text-white">Rotor auto</td>
                    <td className="px-4 py-3">500-1000 tours/min</td>
                    <td className="px-4 py-3">Faible</td>
                    <td className="px-4 py-3">Mobius 9010</td>
                    <td className="px-4 py-3">1-2 mg</td>
                    <td className="px-4 py-3 text-red-400">Trop = bruit et usure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mémo élève */}
        <section id="memorisation" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Award className="w-7 h-7" />
            Mémo élève : Astuces de mémorisation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">🧠 Technique du « chiffre clé »</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>9010 = 10 cSt →</strong> Pensez « 10 = vitesse de course à pied », pour les parties RAPIDES (rotor)</p>
                <p><strong>9020 = 20 cSt →</strong> « 20 = vitesse modérée », pour les parties MOYENNES (roue de centre)</p>
                <p><strong>9415 = 15 cSt →</strong> « 9415 = échappement spécial », seule huile avec un 4 au milieu</p>
                <p><strong>8200 = 800 cSt →</strong> « 8h00 = barillet », le barillet fait 1 tour toutes les 8 heures</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">👋 Technique mnémotechnique</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>« RRR » pour les vitesses :</strong></p>
                <p>Rapide (Rotor) → 9010</p>
                <p>Régulier (Roues) → 9020</p>
                <p>Ralenti (Barillet) → 8200</p>
                <p className="mt-3 p-2 bg-[#0a0a0a] rounded"><strong>9415 :</strong> Seule huile qui commence par 9 et a un 4 → Échappement = seul endroit avec forte pression batteuse</p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg border border-gray-700">
            <p className="text-sm text-gray-400"><strong className="text-[#E2B44F]">📌 Exercice de mémorisation :</strong> 
              Répétez ces associations à voix haute 3 fois, puis testez-vous sans regarder. Refaites-le demain pour ancrer la mémoire.</p>
          </div>
        </section>

        {/* Outils */}
        <section id="outils" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Outils du professionnel
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Huilier manuel</h3>
              <p className="text-gray-400 text-sm">
                Corps en laiton, pointe capillaire 0.15-0.25mm. Permet de déposer des quantités précises au micron près. Nettoyage à l'alcool après chaque utilisation.
              </p>
              <div className="mt-3 p-2 bg-[#0a0a0a] rounded text-xs text-gray-500">
                💡 Entraînez-vous sur papier blanc à déposer des points microscopiques
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Loupe binoculaire</h3>
              <p className="text-gray-400 text-sm">
                Grossissement x10 à x20. Indispensable pour visualiser le ménisque d'huile. Éclairage LED intégré recommandé pour éviter les ombres.
              </p>
              <div className="mt-3 p-2 bg-[#0a0a0a] rounded text-xs text-gray-500">
                👁️ Commencez par x10, x20 est pour le contrôle final
              </div>
            </div>
            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800 hover:border-[#E2B44F]/30 transition-all text-center">
              <div className="w-20 h-20 bg-[#E2B44F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-[#E2B44F]" />
              </div>
              <h3 className="text-lg font-bold text-[#E2B44F] mb-2">Papier absorbant</h3>
              <p className="text-gray-400 text-sm">
                Pour retirer l'excès d'huile sans laisser de fibres. Papier de soie horlogère ou buvard qualité supérieure uniquement.
              </p>
              <div className="mt-3 p-2 bg-[#0a0a0a] rounded text-xs text-gray-500">
                ⚠️ Jamais de coton qui laisse des pellicules !
              </div>
            </div>
          </div>
        </section>

        {/* Exercices de manipulation */}
        <section id="exercices-manipulation" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Practice className="w-7 h-7" />
            Exercices de manipulation pour élèves
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Niveau 1 : Maîtrise de l'huilier</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-3"><strong>Objectif :</strong> Déposer des gouttes de 0.5mm de diamètre</p>
                <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Remplissez l'huilier à moitié avec de l'huile 9010</li>
                  <li>Sur une feuille blante, déposez 10 gouttes</li>
                  <li>Vérifiez à la loupe : diamètre = 0.5mm (taille d'une tête d'épingle)</li>
                  <li>Repeindre jusqu'à obtenir 8/10 gouttes parfaites</li>
                </ol>
                <p className="text-xs text-gray-500 mt-3">⏱️ Temps estimé : 30 minutes | 📊 Succès : 80% de précision</p>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Niveau 2 : Nettoyage et contrôle</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-3"><strong>Objectif :</strong> Retirer l'excès sans toucher le pivot</p>
                <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                  <li>Appliquez une goutte trop grosse sur un faux pivot (fil de 0.1mm)</li>
                  <li>Avec le papier, retirez doucement l'excès en tangent le rubis</li>
                  <li>Le ménisque doit rester visible mais pas déborder</li>
                  <li>Répétez 5 fois sans déplacer le pivot</li>
                </ol>
                <p className="text-xs text-gray-500 mt-3">⏱️ Temps estimé : 45 minutes | 📊 Succès : 100% sans déplacement</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technique pas à pas enrichie */}
        <section id="technique" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <CheckCircle className="w-7 h-7" />
            Technique pas à pas - Débutant à confirmé
          </h2>
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Phase 1 : Préparation (5 minutes)</h3>
              <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                <li>Nettoyage complet : tous les pivots doivent être dégraissés à l'alcool à brûler</li>
                <li>Séchage : soufflette anti-poussière uniquement (pas de souffle buccal)</li>
                <li>Inspection : vérifier l'absence de fibres ou de poussière sous loupe x10</li>
                <li>Mise en place : positionner le mouvement sous loupe binoculaire à 45°</li>
              </ol>
            </div>
            
            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Phase 2 : Ordre de lubrification (10 minutes)</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong className="text-[#E2B44F]">Règle d'or :</strong> Toujours commencer par les composants les plus lents et les plus profonds</p>
                <ol className="list-decimal list-inside ml-4 space-y-1">
                  <li>Barillet et ressort (8200) - 2 points</li>
                  <li>Roue de grande (9020) - 2 pivots</li>
                  <li>Roue de petite (9020) - 2 pivots</li>
                  <li>Roue de troisième (9020) - 2 pivots</li>
                  <li>Roue des secondes (9020) - 2 pivots</li>
                  <li>Roue d'échappement (9415) - 1 pivot + dents</li>
                  <li>Balancier (9415) - 2 pivots</li>
                  <li>Rotor automatique (9010) - 2 pivots</li>
                </ol>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Phase 3 : Déposition (15 minutes)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-white mb-2">Mouvement de l'huilier :</h4>
                  <ul className="text-gray-400 space-y-1 list-disc list-inside">
                    <li>Tenez l'huilier comme un stylo à 30°</li>
                    <li>Approchez lentement le capillaire du rubis</li>
                    <li>Déposez sans toucher les parois</li>
                    <li>Retirez le capillaire verticalement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Vérification du ménisque :</h4>
                  <ul className="text-gray-400 space-y-1 list-disc list-inside">
                    <li>Doit briller sous la loupe sans être aux bords</li>
                    <li>Taille = 0.5mm (point d'une aiguille)</li>
                    <li>Ne doit pas couler ou s'étaler</li>
                    <li>Couleur doit être uniforme</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
              <p className="text-sm"><strong className="text-green-400">✅ Astuce de pro :</strong> 
                Si vous hésitez, <strong className="text-white">mieux vaut un peu moins que trop</strong>. 
                Un léger manque se corrige facilement, un excès nécessite le démontage complet du calibre.</p>
            </div>
          </div>
        </section>

        {/* Erreurs courantes */}
        <section id="erreurs" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <AlertTriangle className="w-7 h-7" />
            Erreurs courantes à éviter - Guide du débutant
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h3 className="font-semibold text-red-400 mb-2">❌ Erreur #1 : L'excès d'huile</h3>
                <p className="text-sm text-gray-300 mb-2"><strong>Symptôme :</strong> La montre prend +5 min/jour, le spiral est collé</p>
                <p className="text-sm text-gray-400"><strong>Solution :</strong> Démontage complet, nettoyage au benzine, re-huilage</p>
              </div>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h3 className="font-semibold text-red-400 mb-2">❌ Erreur #2 : Mélange d'huiles</h3>
                <p className="text-sm text-gray-300 mb-2"><strong>Symptôme :</strong> Viscosité incorrecte, précision aléatoire</p>
                <p className="text-sm text-gray-400"><strong>Solution :</strong> Un huilier par type d'huile, nettoyage systématique</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h3 className="font-semibold text-red-400 mb-2">❌ Erreur #3 : Huilage sur pièces sales</h3>
                <p className="text-sm text-gray-300 mb-2"><strong>Symptôme :</strong> L'huile noircit, crée de l'abrasif</p>
                <p className="text-sm text-gray-400"><strong>Solution :</strong> Nettoyage à l'alcool impératif avant toute lubrification</p>
              </div>
              <div className="bg-red-900/20 p-4 rounded-lg border border-red-800/50">
                <h3 className="font-semibold text-red-400 mb-2">❌ Erreur #4 : Mauvais ordre d'huilage</h3>
                <p className="text-sm text-gray-300 mb-2"><strong>Symptôme :</strong> Contamination des pièces déjà huilées</p>
                <p className="text-sm text-gray-400"><strong>Solution :</strong> Toujours du plus lent au plus rapide</p>
              </div>
            </div>
            <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <h4 className="font-semibold text-blue-400 mb-2">📊 Coût des erreurs en atelier :</h4>
              <p className="text-sm text-gray-300">Une révision préventive coûte 150-300€. Une réparation après excès d'huile : 450-900€. L'apprentissage patient vous économise de l'argent et du temps !</p>
            </div>
          </div>
        </section>

        {/* Maintenance */}
        <section id="maintenance" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <BookOpen className="w-7 h-7" />
            Plan de maintenance - Références professionnelles
          </h2>
          <div className="text-gray-300 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#E2B44F] uppercase bg-[#0a0a0a]">
                  <tr>
                    <th className="px-4 py-3">Type de montre</th>
                    <th className="px-4 py-3">Usage</th>
                    <th className="px-4 py-3">Fréquence révision</th>
                    <th className="px-4 py-3">Points de vigilance</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium">Montre automatique moderne</td>
                    <td className="px-4 py-3">Quotidien</td>
                    <td className="px-4 py-3">Tous les 5-7 ans</td>
                    <td className="px-4 py-3 text-xs">Rotor, roulements à billes</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium">Montre manuelle vintage</td>
                    <td className="px-4 py-3">Occasionnel</td>
                    <td className="px-4 py-3">Tous les 3-5 ans</td>
                    <td className="px-4 py-3 text-xs">Huiles naturelles dégradées</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="px-4 py-3 font-medium">Montre de sport</td>
                    <td className="px-4 py-3">Intensif</td>
                    <td className="px-4 py-3">Tous les 3 ans</td>
                    <td className="px-4 py-3 text-xs">Chocs, température, poussière</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Montre de plongée</td>
                    <td className="px-4 py-3">Professionnel</td>
                    <td className="px-4 py-3">Tous les 2 ans</td>
                    <td className="px-4 py-3 text-xs">Selle d'étanchéité, corrosion</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
              <p className="text-sm"><strong className="text-yellow-400">⚠️ Signes d'alerte :</strong> 
                Si la montre perd/gagne plus de 15s/jour, si vous entendez un bruit différent, ou si elle s'arrête la nuit → 
                <strong className="text-white"> Huilage dégradé à 90% de certitude</strong></p>
            </div>
          </div>
        </section>

        {/* Plan d'entraînement élève */}
        <section id="entrainement" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Target className="w-7 h-7" />
            Plan d'entraînement élève - 4 semaines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Semaine 1 : Bases</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg text-sm text-gray-300 space-y-2">
                <p className="font-medium">Objectif : Maîtriser le ménisque parfait</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>30 min/jour : Exercices sur papier avec huilier vide d'abord</li>
                  <li>Repérer la différence entre 0.3mm, 0.5mm, 0.8mm à la loupe</li>
                  <li>Test final : 10 gouttes parfaites sur 10</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Semaine 2 : Application</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg text-sm text-gray-300 space-y-2">
                <p className="font-medium">Objectif : Lubrifier 5 pivots sans erreur</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Utiliser un mouvement d'entraînement (ETA 6497)</li>
                  <li>Commencer par la roue de grande (facile d'accès)</li>
                  <li>Contrôlez chaque ménisque sous loupe x10</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Semaine 3 : Vitesse</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg text-sm text-gray-300 space-y-2">
                <p className="font-medium">Objectif : Huiler un mouvement complet en 30 min</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Respecter l'ordre : barillet → roues → échappement</li>
                  <li>Chrono en main : 15 min max pour les roues</li>
                  <li>Vérification finale sous loupe x20</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#E2B44F]">Semaine 4 : Perfectionnement</h3>
              <div className="bg-[#0a0a0a] p-4 rounded-lg text-sm text-gray-300 space-y-2">
                <p className="font-medium">Objectif : Détection des erreurs</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  <li>Identifier les sur-huilages sur montres d'entraînement</li>
                  <li>Corriger avec papier sans démonter</li>
                  <li>Test final : huiler un mouvement sans supervision</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
            <p className="text-sm"><strong className="text-purple-400">🏆 Objectif final :</strong> 
              Être capable de lubrifier un ETA 2824 complet en 25 minutes avec moins de 2% d'erreurs. 
              C'est le standard minimum pour un stage en atelier.</p>
          </div>
        </section>

        {/* Glossaire enrichi */}
        <section id="glossaire" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Glossaire technique - Avec exemples concrets
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">Ménisque</h3>
              <p className="text-sm text-gray-300">Courbe formée par l'huile à la surface du rubis. Doit être convexe et brillante.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : 0.5mm de diamètre sur un pivot de balancier</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">cSt (centistokes)</h3>
              <p className="text-sm text-gray-300">Unité de viscosité. Plus le chiffre est haut, plus l'huile est épaisse.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : 10 cSt = eau légère, 800 cSt = sirop épais</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">Migration</h3>
              <p className="text-sm text-gray-300">Déplacement involontaire de l'huile vers d'autres composants.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : Huile du barillet qui coule sur le spiral</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">Capillarité</h3>
              <p className="text-sm text-gray-300">Phénomène qui fait monter l'huile dans la pointe de l'huilier.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : L'huile monte seule dans la pointe fine</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">Pointe capillaire</h3>
              <p className="text-sm text-gray-300">Extrémité fine de l'huilier (0.15-0.25mm) qui dépose l'huile.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : Pointe en roseau pour dépôt précis</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-xl border border-gray-800">
              <h3 className="font-bold text-[#E2B44F]">Film lubrifiant</h3>
              <p className="text-sm text-gray-300">Couche microscopique d'huile entre deux surfaces frottantes.</p>
              <p className="text-xs text-gray-500 mt-1">Exemple : 0.01mm entre le pivot et le rubis</p>
            </div>
          </div>
        </section>

        {/* Quiz interactif */}
        <section id="quiz" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Lightbulb className="w-7 h-7" />
            Quiz interactif - Testez vos connaissances
          </h2>
          <div className="space-y-6">
            {questions.map((q, questionIndex) => (
              <div key={questionIndex} className="bg-[#0a0a0a] p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {questionIndex + 1}. {q.question}
                </h3>
                <div className="space-y-2">
                  {q.options.map((option, answerIndex) => (
                    <label
                      key={answerIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        quizAnswers[questionIndex] === answerIndex
                          ? answerIndex === q.correct
                            ? "bg-green-900/30 border border-green-700/50"
                            : "bg-red-900/30 border border-red-700/50"
                          : "bg-[#1a1a1a] hover:bg-[#2a2a2a]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={quizAnswers[questionIndex] === answerIndex}
                        onChange={() => handleAnswer(questionIndex, answerIndex)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {quizAnswers[questionIndex] !== null && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-sm ${
                      quizAnswers[questionIndex] === q.correct
                        ? "bg-green-900/20 text-green-400"
                        : "bg-red-900/20 text-red-400"
                    }`}
                  >
                    {quizAnswers[questionIndex] === q.correct ? "✅ " : "❌ "}
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => setShowResults(true)}
              className="px-6 py-2 bg-[#E2B44F] text-[#0a0a0a] font-bold rounded-lg hover:bg-white transition-colors"
            >
              Voir mes résultats
            </button>
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
            >
              Recommencer le quiz
            </button>
          </div>

          {showResults && (
            <div className="mt-6 p-6 bg-[#0a0a0a] rounded-lg border-2 border-[#E2B44F]/50">
              <h3 className="text-2xl font-bold text-[#E2B44F] mb-4">📊 Résultats détaillés</h3>
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-white mb-2">{calculateScore()}%</div>
                <p className="text-gray-400">
                  {calculateScore() >= 80 ? "Excellent ! Vous êtes prêt pour la pratique" : 
                   calculateScore() >= 60 ? "Bonnes bases, quelques révisions nécessaires" : 
                   "Revoir le cours et recommencer le quiz"}
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-[#1a1a1a] rounded-lg">
                <h4 className="font-semibold text-[#E2B44F] mb-3">🎯 Analyse personnalisée :</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <p><strong>Question 1 (quantité) :</strong> {quizAnswers[0] === 1 ? "✅ Parfait !" : "❌ Revoyez le ménisque parfait = 0.5mm"}</p>
                  <p><strong>Question 2 (viscosité) :</strong> {quizAnswers[1] === 2 ? "✅ Excellent !" : "❌ Les vitesses varient de 1 à 1000 tours/min"}</p>
                  <p><strong>Question 3 (excès) :</strong> {quizAnswers[2] === 1 ? "✅ Compris !" : "❌ Excès = problème n°1 de précision"}</p>
                  <p><strong>Question 4 (fréquence) :</strong> {quizAnswers[3] === 1 ? "✅ Bien !" : "❌ 5-7 ans est le standard moderne"}</p>
                  <p><strong>Question 5 (outils) :</strong> {quizAnswers[4] === 2 ? "✅ Exact !" : "❌ L'huilier manuel offre le meilleur contrôle"}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
                  <h5 className="font-semibold text-blue-400 mb-2">📚 Prochaines étapes si ≥ 80% :</h5>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Passer aux exercices pratiques sur mouvement</li>
                    <li>• Visionner la vidéo en repérant les gestes</li>
                    <li>• Commencer le plan d'entraînement 4 semaines</li>
                  </ul>
                </div>
                <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
                  <h5 className="font-semibold text-yellow-400 mb-2">🔄 Si < 80% :</h5>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Relire les sections "Mémo élève" et "Technique pas à pas"</li>
                    <li>• Refaire le quiz après 24h (effet mémoire)</li>
                    <li>• Noter les points faibles sur un carnet</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Mise en pratique */}
        <section id="mise-en-pratique" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Practice className="w-7 h-7" />
            Mise en pratique - Défis pour élèves
          </h2>
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Défi 1 : Le test du « ménisque invisible »</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>Matériel :</strong> Huilier, loupe x10, mouvement d'entraînement démonté</p>
                <p><strong>Objectif :</strong> Déposer une goutte si petite qu'elle est invisible à l'œil nu, visible à la loupe</p>
                <p><strong>Critère de réussite :</strong> Ménisque brillant de 0.5mm, ne coule pas quand on incline le mouvement</p>
                <p className="text-blue-400">⏱️ Temps : 15 minutes | 🎯 Succès : 8/10 pivots parfaits</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Défi 2 : L'ordre parfait</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>Matériel :</strong> Mouvement ETA 6497, 5 flacons d'huiles différentes</p>
                <p><strong>Objectif :</strong> Huiler dans le bon ordre sans regarder les notes</p>
                <p><strong>Critère de réussite :</strong> Chaque composant a la bonne huile, pas de contamination croisée</p>
                <p className="text-blue-400">⏱️ Temps : 30 minutes | 🎯 Succès : 0 erreur de type d'huile</p>
              </div>
            </div>

            <div className="bg-[#0a0a0a] p-5 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E2B44F] mb-3">Défi 3 : Le contrôle qualité</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p><strong>Matériel :</strong> Montre sur-huilée par votre formateur</p>
                <p><strong>Objectif :</strong> Identifier les points de sur-huilage en moins de 5 minutes</p>
                <p><strong>Critère de réussite :</strong> Trouver au moins 3 excès visibles à la loupe</p>
                <p className="text-blue-400">⏱️ Temps : 5 minutes | 🎯 Succès : Identifier 80% des erreurs</p>
              </div>
            </div>

            <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-800/50">
              <p className="text-sm"><strong className="text-purple-400">🏆 Une fois les 3 défis réussis :</strong> 
                Demandez à votre formateur un « test blanc » sur un vrai mouvement en état de marche. 
                C'est la validation finale avant de travailler sur des calibres clients.</p>
            </div>
          </div>
        </section>

        {/* Checklist de l'élève */}
        <section id="checklist" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 font-serif">
            Checklist de l'élève horloger - Compétences à valider
          </h2>
          <div className="bg-[#1a1a1a] p-6 rounded-xl border border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-[#E2B44F] mb-3">📋 Théorie (Cochez quand maîtrisé)</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Je connais les 4 huiles principales par cœur
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Je comprends pourquoi la viscosité varie
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Je peux expliquer la migration d'huile
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Je connais les 4 erreurs à éviter
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Je sais quand réviser une montre
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#E2B44F] mb-3">🔧 Pratique (Cochez quand réussi 3x)</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Ménisque parfait sur papier (10/10)
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Huilage du barillet sans fuite
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Huilage des roues dans l'ordre
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Échappement sans excès critique
                  </label>
                  <label className="flex items-center gap-2 text-gray-300">
                    <input type="checkbox" className="w-4 h-4" /> Contrôle qualité sous loupe x20
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#0a0a0a] rounded-lg text-center">
              <p className="text-sm text-gray-400">Compétence validée : <strong className="text-[#E2B44F]">10/10 cases cochées</strong></p>
              <div className="mt-3 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[#E2B44F] h-2 rounded-full" style={{width: "0%"}} id="progressBar"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Complétez 10 cases pour voir la barre se remplir</p>
            </div>
          </div>
        </section>

        {/* Ressources */}
        <section id="ressources" className="mb-12 bg-[#1a1a1a] p-6 md:p-8 rounded-xl border border-gray-800 scroll-mt-24">
          <h2 className="text-3xl font-bold text-[#E2B44F] mb-6 flex items-center gap-3 font-serif">
            <Info className="w-7 h-7" />
            Ressources complémentaires pour élèves
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-[#E2B44F] mb-3">📚 Livres recommandés</h3>
              <ul className="text-gray-300 space-y-2">
                <li><strong>« La pratique de la réparation horlogère »</strong> - R. Montandon (p. 125-156 sur le huilage)</li>
                <li><strong>« Théorie et pratique du garde-temps »</strong> - G. Daniels (chapitre 8)</li>
                <li><strong>« Manuel de l'horloger »</strong> - F. C. De Weck (édition 2020)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#E2B44F] mb-3">🎥 Vidéos supplémentaires</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• « Mobius Oil Application » - WatchrepairTalk (YouTube)</li>
                <li>• « Lubrification ETA 2824 » - Horlogerie Suisse (formation)</li>
                <li>• « Microscopic oiling » - Witschi Academy</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#E2B44F] mb-3">🔗 Sites et forums</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Watchuseek Forum - Section « Watchmaking »</li>
                <li>• NAWCC (National Association of Watch & Clock Collectors)</li>
                <li>• Horlogerie.fr - Rubrique pratique</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-[#E2B44F] mb-3">🛒 Fournisseurs essentiels</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Mobius Lubrificants (Suisse) - Huiles de référence</li>
                <li>• Jules Borel (USA) - Outils et huiles</li>
                <li>• Ofrei.com - Pointes capillaires de rechange</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-800">
          <p>Mémo créé pour les élèves horlogers - Version enrichie pédagogique | Dernière mise à jour : 2025</p>
          <p className="mt-2">N'hésitez pas à revenir sur cette page pendant vos apprentissages pratiques</p>
        </div>

      </div>
    </div>
  );
}
