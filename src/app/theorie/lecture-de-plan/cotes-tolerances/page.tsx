"use client";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

// Définition du type pour chaque question du quiz
type QuizQuestion = {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

export default function CotesEtTolerancesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const erreurs = [
    "Oublier d'indiquer une tolérance sur une cote fonctionnelle.",
    "Définir une tolérance trop serrée (augmente le coût et les rejets).",
    "Choisir une tolérance trop large (crée un jeu excessif).",
    "Confondre la cote maximale et la cote minimale.",
    "Négliger les tolérances géométriques (parallélisme, etc.).",
    "Mélanger les unités de mesure (mm et µm) sans le préciser.",
  ];

  const bonnes = [
    "Analyser la fonction de la pièce pour définir une tolérance juste.",
    "Utiliser les symboles et la syntaxe de la norme ISO appropriée.",
    "Toujours relire la cotation en pensant à l'assemblage final.",
    "Valider la faisabilité des tolérances avec l'atelier d'usinage.",
    "Faire contrôler ses plans par un pair avant la production.",
    "Rester cohérent dans les unités et la précision sur tout le plan.",
  ];

  // Ce typage répond à l’erreur de TS
  const quizQuestions: QuizQuestion[] = [
    {
      question: 'Qu\'appelle-t-on "cote nominale" ?',
      options: [
        "La dimension idéale sans tolérance",
        "La tolérance maximale autorisée",
        "L'écart entre deux dimensions"
      ],
      correct: 0,
      explanation: "La cote nominale est la dimension idéale théorique d'une pièce, sans considération de tolérance."
    },
    {
      question: "En système ISO, quelle lettre utilise-t-on pour les alésages ?",
      options: [
        "Des lettres minuscules",
        "Des lettres majuscules",
        "Des chiffres uniquement"
      ],
      correct: 1,
      explanation: "Les alésages (contenants) utilisent des lettres majuscules, tandis que les arbres (contenus) utilisent des minuscules."
    },
    {
      question: "Qu'est-ce qu'un arbre dans le système ISO ?",
      options: [
        "Tout ce qui est contenant",
        "Tout ce qui est contenu",
        "Un élément cylindrique uniquement"
      ],
      correct: 1,
      explanation: "Dans le système ISO, un arbre désigne tout élément contenu, peu importe sa forme."
    },
    {
      question: "Qu'est-ce qu'un alésage ?",
      options: [
        "Un élément cylindrique creux",
        "Tout ce qui est contenant",
        "Une pièce rotative"
      ],
      correct: 1,
      explanation: "L'alésage désigne tout élément contenant dans un assemblage."
    },
    {
      question: "Comment calcule-t-on l'intervalle de tolérance (IT) ?",
      options: [
        "ES - EI (écart supérieur moins écart inférieur)",
        "Cote max + Cote min",
        "Cote nominale × 2"
      ],
      correct: 0,
      explanation: "L'intervalle de tolérance est la différence entre l'écart supérieur et l'écart inférieur."
    },
    {
      question: "Pour un arbre, quelles lettres utilise-t-on ?",
      options: [
        "Des lettres majuscules",
        "Des lettres minuscules",
        "Des symboles spéciaux"
      ],
      correct: 1,
      explanation: "Les arbres (éléments contenus) sont désignés par des lettres minuscules."
    },
    {
      question: "Dans la cotation Ø60 H8/f7, que représente H8 ?",
      options: [
        "La tolérance de l'arbre",
        "La tolérance de l'alésage",
        "La cote nominale"
      ],
      correct: 1,
      explanation: "H8 (majuscule) désigne la tolérance de l'alésage, f7 (minuscule) celle de l'arbre."
    },
    {
      question: "Que signifie ES pour un alésage ?",
      options: [
        "Écart Supérieur",
        "Écart Standard",
        "Élément Spécial"
      ],
      correct: 0,
      explanation: "ES signifie Écart Supérieur, utilisé en majuscule pour les alésages."
    },
    {
      question: "Que signifie ei pour un arbre ?",
      options: [
        "écart initial",
        "écart inférieur",
        "élément intérieur"
      ],
      correct: 1,
      explanation: "ei (minuscule) représente l'écart inférieur pour un arbre."
    },
    {
      question: "Quelle est la cote maximale ?",
      options: [
        "La plus petite dimension acceptable",
        "La plus grande dimension acceptable",
        "La dimension moyenne"
      ],
      correct: 1,
      explanation: "La cote maximale correspond à la plus grande dimension acceptable pour la pièce."
    },
    {
      question: "Pour Ø60 F7, avec tolérances -0.030/-0.060, quelle est la cote minimale ?",
      options: [
        "59.940 mm",
        "59.970 mm",
        "60.030 mm"
      ],
      correct: 0,
      explanation: "Cote minimale = 60 - 0.060 = 59.940 mm"
    },
    {
      question: "Pour Ø60 E8 avec tolérances +0.060/+0.106, quelle est la cote maximale ?",
      options: [
        "60.060 mm",
        "60.106 mm",
        "60.166 mm"
      ],
      correct: 1,
      explanation: "Cote maximale = 60 + 0.106 = 60.106 mm"
    },
    {
      question: "Pourquoi utilise-t-on des tolérances prédéfinies en système ISO ?",
      options: [
        "Pour réduire les coûts uniquement",
        "Pour standardiser et faciliter l'interchangeabilité",
        "Pour compliquer la fabrication"
      ],
      correct: 1,
      explanation: "Les tolérances ISO standardisées permettent l'interchangeabilité des pièces et une communication universelle."
    },
    {
      question: "Dans un assemblage, si l'arbre mesure 59.97 mm et l'alésage 60.08 mm, quel est le jeu ?",
      options: [
        "0.11 mm",
        "0.05 mm",
        "120.05 mm"
      ],
      correct: 0,
      explanation: "Jeu = Alésage - Arbre = 60.08 - 59.97 = 0.11 mm"
    },
    {
      question: "Quel organisme définit le système de tolérancement ISO ?",
      options: [
        "L'Organisation Internationale de Normalisation",
        "L'Institut Suisse d'Horlogerie",
        "L'Agence Européenne de Mécanique"
      ],
      correct: 0,
      explanation: "ISO signifie International Organization for Standardization (Organisation Internationale de Normalisation)."
    }
  ];

  const handleAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex.toString());
    setShowExplanation(true);
    if (optionIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-6 py-16 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* --- Bouton Retour façon Link Next --- */}
        <div className="mb-6">
          <Link
            href="/theorie/lecture-de-plan"
            className="text-[#2B44F] hover:underline flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </Link>
        </div>
        
        {/* --- Header --- */}
        {/* ... (Le reste de ta page est inchangé) ... */}
      </div>
    </main>
  );
}
