// app/pratique/gauchers/page.tsx
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Moon, Sun, Wrench, Eye, Brain, Heart, Trophy, Clock, Award, Users,
  Target, CheckCircle, Zap, ShoppingCart, BookOpen, HelpCircle, UserCheck,
  Video, TrendingUp, Shield, Info
} from "lucide-react";
import Link from "next/link";

// Types
type Theme = "light" | "dark";

type Exercise = {
  title: string;
  description: string;
  steps: string[];
  duration: string;
  difficulty: "Facile" | "Moyen" | "Difficile";
};

type Tool = {
  name: string;
  description: string;
  price: string;
  supplier: string;
  link: string;
};

type Testimony = {
  name: string;
  role: string;
  text: string;
  image: string;
};

// Contexte Thème
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

// Données enrichies
const adaptationsData = [
  {
    id: "outils",
    title: "Outils Inversés & Spécialisés",
    description: "Investir dans des outils gauchers est le premier pas vers une formation sereine. La plupart des fournisseurs proposent désormais des versions adaptées.",
    solutions: [
      "🔧 **Pinces inversées** : Les mâchoires s'ouvrent à gauche",
      "🔄 **Tours à gauche** : Rotation inverse pour plus de confort",
      "✂️ **Ciseaux à ressort inversés** : La force se fait naturellement",
      "🔍 **Loupes latérales** : Fixation à gauche pour meilleure visée",
      "⚙️ **Clefs de montage miroir** : Sens de serrage inversé"
    ],
    stats: { priceReduction: "20-30%", availability: "85%" },
    image: "https://images.unsplash.com/photo-1504148455328-c376907d0815?w=400"
  },
  {
    id: "posture",
    title: "Optimisation du Poste de Travail",
    description: "Un espace adapté réduit la fatigue de 40% et améliore la précision. L'ergonomie est cruciale pour les longues sessions.",
    solutions: [
      "📐 **Table inclinée 15° à gauche** : Pour un meilleur angle de vue",
      "💡 **Lampe positionnable à droite** : Évite les ombres de la main",
      "📦 **Rangement gauche-dominant** : Outils à portée de main gauche",
      "🪞 **Miroir de travail réglable** : Double vue sur la pièce",
      "🪑 **Siège avec repose-coude gauche** : Stabilité du bras"
    ],
    stats: { fatigueReduction: "40%", precisionImprovement: "25%" },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
  },
  {
    id: "techniques",
    title: "Techniques & Méthodes Inversées",
    description: "Apprendre les gestes miroir demande du temps mais garantit une maîtrise totale. Ces techniques sont validées par des pros.",
    solutions: [
      "⌚ **Position 9h au lieu de 3h** : La montre est tenue à l'envers",
      "🔄 **Gestion du sens horaire** : Visualisez toujours le mouvement inverse",
      "👍 **Pouce droit comme pivot** : Base stable pour la précision",
      "🎮 **Entraînement miroir quotidien** : 15 min de détournement visuel",
      "📏 **Repères inversés sur les outils** : Marquages personnalisés"
    ],
    stats: { adaptationTime: "2-3 mois", successRate: "92%" },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400"
  },
  {
    id: "formation",
    title: "Accompagnement Personnalisé",
    description: "Les écoles horlogères suisses offrent désormais des modules spécifiques. N'hésitez pas à demander de l'aide.",
    solutions: [
      "👨‍🏫 **Formateur référent gaucher** : Un spécialiste dédié",
      "📹 **Vidéos tutorielles miroir** : Apprentissage visual adapté",
      "👥 **Parrainage par un pro gaucher** : Mentorat personnalisé",
      "📅 **Suivi hebdomadaire** : Corrections rapides des gestes",
      "🎯 **Exercices renforcés** : 10% de temps supplémentaire accepté"
    ],
    stats: { satisfaction: "94%", dropOutRate: "3% vs 8%" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
  }
];

const exercises: Exercise[] = [
  {
    title: "Exercice 1 : Coordination Main-Oeil (Semaine 1-2)",
    description: "Entraînez votre cerveau à inverser les mouvements. C'est la base de tout.",
    steps: [
      "Prenez un tournevis droitier standard",
      "Placez un miroir devant vous et regardez-y",
      "Essayez de visser/dévisser en regardant uniquement le miroir",
      "Répétez 15 minutes matin et soir",
      "Notez votre progression dans un carnet"
    ],
    duration: "15 min x2/jour",
    difficulty: "Facile"
  },
  {
    title: "Exercice 2 : Assemblage Inversé Progressif (Semaine 3-6)",
    description: "Montez un mécanisme simple à l'envers, étape par étape.",
    steps: [
      "Commencez avec une roue de petite taille",
      "Tenez-la avec la main droite (dominante nouvelle)",
      "Manipulez les pinceaux uniquement de la main gauche",
      "Montez un rouage simple (3-4 pièces)",
      "Documentez chaque geste difficile"
    ],
    duration: "30 min/jour",
    difficulty: "Moyen"
  },
  {
    title: "Exercice 3 : Cercles et Spirales Précis (Semaine 7-10)",
    description: "Améliorez votre précision avec des mouvements circulaires complexes.",
    steps: [
      "Dessinez des cercles parfaits sur papier avec la main gauche",
      "Passez à des spirales de plus en plus serrées",
      "Sur une surface horizontale, simulez le vissage",
      "Utilisez un chronomètre pour la régularité",
      "Transférez sur des vis réelles (grosses d'abord)"
    ],
    duration: "20 min/jour",
    difficulty: "Moyen"
  },
  {
    title: "Exercice 4 : Micro-techniques Miroir (Semaine 11-16)",
    description: "Passer aux gestes finaux de l'horlogerie avec précision.",
    steps: [
      "Utilisez une loupe avec marquage miroir",
      "Placez les rubis sur un plateau avec pinceaux gauchers",
      "Pratiquez le graissage à l'envers",
      "Montez un échappement simple (Zenith)",
      "Vérifiez avec un formateur chaque semaine"
    ],
    duration: "45 min/jour",
    difficulty: "Difficile"
  },
  {
    title: "Exercice 5 : Simulation Complète (Semaine 17-20)",
    description: "Remontez un mouvement entier sans aide, en mode miroir.",
    steps: [
      "Choisissez un mouvement simple (ETA 6497)",
      "Filmez votre travail pour auto-analyse",
      "Notez les points de blocage",
      "Revoyez les gestes difficiles avec votre formateur",
      "Répétez jusqu'à fluidité totale"
    ],
    duration: "2h/session",
    difficulty: "Difficile"
  }
];

const tools: Tool[] = [
  {
    name: "Pince Horlogère Gaucher Pro",
    description: "Pinces Bergeon inversées, modèle 3000-G",
    price: "CHF 89.-",
    supplier: "Bergeon SA",
    link: "https://www.bergeon.ch/gaucher"
  },
  {
    name: "Loupe Binoculaire Latérale",
    description: "Loupe 10x avec fixation gauche, légère",
    price: "CHF 145.-",
    supplier: "Horotec",
    link: "https://www.horotec.com/loupes"
  },
  {
    name: "Kit Outils Gaucher Complet",
    description: "45 outils essentiels tous inversés",
    price: "CHF 890.-",
    supplier: "Ecoles WOSTEP",
    link: "mailto:wostep@ecole.ch"
  },
  {
    name: "Table de Travail Inclinée Gauche",
    description: "Plan inclinable 15° avec repères miroir",
    price: "CHF 450.-",
    supplier: "ESCON Switzerland",
    link: "https://www.escon.ch/horlogerie"
  }
];

const testimonies: Testimony[] = [
  {
    name: "Marc Dubois",
    role: "CFC obtenu en 2023, maintenant chez Rolex",
    text: "\"J'ai failli abandonner au bout de 2 mois. Les outils inversés m'ont sauvé. Maintenant je suis aussi rapide que mes collègues.\"",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
  },
  {
    name: "Sophie Martin",
    role: "Élève en 2ème année CFC, mention excellence",
    text: "\"Mon formateur m'a appris à voir ma différence comme un avantage. Je suis plus précise car je suis obligée de me concentrer davantage.\"",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100"
  },
  {
    name: "Ahmed Zouari",
    role: "Maître Horloger, 15 ans d'expérience",
    text: "\"Aujourd'hui, je forme les nouveaux gauchers. Je leur dis : votre cerveau va créer des connexions uniques que les droitiers n'auront jamais.\"",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"
  }
];

// Sous-composants
function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`p-3 rounded-xl border backdrop-blur-sm transition-all ${
        theme === "dark"
          ? "bg-black/40 border-blue-400/20 text-blue-400 hover:border-blue-400/40"
          : "bg-white/60 border-blue-600/20 text-blue-600 hover:border-blue-600/40"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Basculer le thème"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <Sun key="sun" className="w-6 h-6" />
        ) : (
          <Moon key="moon" className="w-6 h-6" />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function AdaptationCard({ adaptation }: { adaptation: typeof adaptationsData[0] }) {
  const { theme } = useContext(ThemeContext)!;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl overflow-hidden border transition-all hover:shadow-2xl ${
        theme === "dark"
          ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
          : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={adaptation.image}
          alt={adaptation.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>
          {adaptation.title}
        </h3>
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {adaptation.description}
        </p>
        
        <div>
          <h4 className={`text-sm font-semibold mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
            Solutions concrètes :
          </h4>
          <ul className="space-y-2">
            {adaptation.solutions.map((solution, i) => (
              <li key={i} className={`flex items-start gap-3 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <CheckCircle className="w-5 h-5 flex-shrink-0 text-green-500 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: solution }} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-xs">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{adaptation.stats.priceReduction || `${adaptation.stats.fatigueReduction}`}</div>
            <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {adaptation.stats.priceReduction ? "Économie moyenne" : "Réduction fatigue"}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{adaptation.stats.availability || `${adaptation.stats.precisionImprovement}`}</div>
            <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {adaptation.stats.availability ? "Disponibilité" : "Gain précision"}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ExerciseTimeline({ exercises }: { exercises: Exercise[] }) {
  const { theme } = useContext(ThemeContext)!;
  
  const difficultyColors = {
    Facile: "text-green-500 border-green-500",
    Moyen: "text-yellow-500 border-yellow-500",
    Difficile: "text-red-500 border-red-500"
  };
  
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <motion.div
          key={index}
          className={`rounded-xl p-6 border-l-4 ${
            theme === "dark" 
              ? "bg-black/30 border-blue-400/20 border-l-blue-400" 
              : "bg-white/60 border-blue-600/20 border-l-blue-600"
          }`}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-3 mb-3">
            <Target className={`w-6 h-6 flex-shrink-0 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
            <div className="flex-1">
              <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {exercise.title}
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {exercise.description}
              </p>
              <div className="flex gap-4 mt-2 text-xs">
                <span className={`px-2 py-1 rounded-full border ${difficultyColors[exercise.difficulty]}`}>
                  {exercise.difficulty}
                </span>
                <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  <Clock className="inline w-3 h-3 mr-1" />
                  {exercise.duration}
                </span>
              </div>
            </div>
          </div>
          
          <div className="ml-9">
            <h4 className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Étapes détaillées :
            </h4>
            <ol className="list-decimal list-inside space-y-1">
              {exercise.steps.map((step, i) => (
                <li key={i} className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ToolsCatalog({ tools }: { tools: Tool[] }) {
  const { theme } = useContext(ThemeContext)!;
  
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {tools.map((tool, i) => (
        <motion.div
          key={i}
          className={`p-4 rounded-lg border transition-all ${
            theme === "dark"
              ? "bg-black/30 border-blue-400/20 hover:border-blue-400/40"
              : "bg-white/70 border-blue-600/20 hover:border-blue-600/40"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>
                {tool.name}
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {tool.description}
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs">
                <span className={`font-semibold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                  {tool.price}
                </span>
                <span className={`${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  {tool.supplier}
                </span>
              </div>
            </div>
            <Link href={tool.link} className={`p-2 rounded-lg transition-colors ${
              theme === "dark" ? "text-blue-400 hover:bg-blue-400/10" : "text-blue-600 hover:bg-blue-600/10"
            }`}>
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function TestimonyCarousel({ testimonies }: { testimonies: Testimony[] }) {
  const [current, setCurrent] = useState(0);
  const { theme } = useContext(ThemeContext)!;
  
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className={`p-6 rounded-xl border ${
            theme === "dark" ? "bg-black/30 border-blue-400/20" : "bg-white/70 border-blue-600/20"
          }`}
        >
          <div className="flex items-start gap-4 mb-4">
            <img
              src={testimonies[current].image}
              alt={testimonies[current].name}
              className="w-12 h-12 rounded-full object-cover"
              loading="lazy"
            />
            <div>
              <p className={`font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-700"}`}>
                {testimonies[current].name}
              </p>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {testimonies[current].role}
              </p>
            </div>
          </div>
          <p className={`italic ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            "{testimonies[current].text}"
          </p>
        </motion.div>
      </AnimatePresence>
      
      <button
        onClick={() => setCurrent((current - 1 + testimonies.length) % testimonies.length)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
          theme === "dark" ? "bg-blue-400/20 text-blue-400" : "bg-blue-600/20 text-blue-600"
        }`}
      >
        ‹
      </button>
      <button
        onClick={() => setCurrent((current + 1) % testimonies.length)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
          theme === "dark" ? "bg-blue-400/20 text-blue-400" : "bg-blue-600/20 text-blue-600"
        }`}
      >
        ›
      </button>
    </div>
  );
}

// Composant Principal
export default function GauchersPage() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${
        theme === "dark" 
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white" 
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      } py-8 px-4 transition-colors duration-300`}>
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/pratique"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all backdrop-blur-sm ${
                theme === "dark"
                  ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 border border-blue-400/20"
                  : "text-blue-600 hover:text-blue-700 hover:bg-blue-600/10 border border-blue-600/20"
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Link>
            <ThemeToggle />
          </motion.div>

          {/* Hero */}
          <motion.section 
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"
            }`}>
              Guide Complet pour Élèves Gauchers
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              L'horlogerie est un art de précision. Être gaucher n'est pas un handicap, c'est une particularité à maîtriser avec les bonnes techniques.
            </p>
          </motion.section>

          {/* Statistiques clés */}
          <motion.section className="mb-16">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Users, value: "15%", label: "Élèves gauchers" },
                { icon: Trophy, value: "92%", label: "Taux de réussite CFC" },
                { icon: Brain, value: "3-4", label: "Mois d'adaptation" },
                { icon: Shield, value: "100%", label: "Réussite possible" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`text-center p-6 rounded-xl border transition-all ${
                    theme === "dark"
                      ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
                      : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-3 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Image Hero */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border relative group ${
              theme === "dark" ? "border-blue-400/20" : "border-blue-600/20"
            }`}>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=675&fit=crop"
                alt="Atelier horlogerie adapté pour gaucher"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-lg md:text-xl font-light text-white">
                  "La précision ne dépend pas de la main, mais de la technique."
                </p>
                <p className="text-sm mt-2 text-gray-200">
                  Des solutions existent pour chaque difficulté. Vous n'êtes pas seul dans ce parcours.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Section Défis */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Les défis spécifiques aux gauchers
            </h2>
            <div className={`rounded-2xl p-8 md:p-10 border backdrop-blur-sm ${
              theme === "dark" ? "bg-black/30 border-blue-400/20" : "bg-white/70 border-blue-600/20"
            }`}>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Wrench, title: "Outils Droitiers", desc: "90% des outils horlogers sont conçus pour la main droite, nécessitant une adaptation mentale constante" },
                  { icon: Eye, title: "Visibilité", desc: "Le corps bloque la lumière et la vue sur la pièce, ralentissant les opérations délicates" },
                  { icon: Brain, title: "Coordination", desc: "Le cerveau doit créer de nouvelles connexions pour inverser les gestes appris" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className={`text-center p-6 rounded-xl border transition-all ${
                      theme === "dark"
                        ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
                        : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <item.icon className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                    <h3 className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className={`text-center italic ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Mais chaque difficulté a sa solution. Les plus grands horlogers gauchers ont prouvé que la différence peut devenir un atout.
              </p>
            </div>
          </motion.section>

          {/* Adaptations */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Solutions concrètes et adaptations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {adaptationsData.map((adaptation) => (
                <AdaptationCard key={adaptation.id} adaptation={adaptation} />
              ))}
            </div>
          </motion.section>

          {/* Outils à commander */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Outils Essentiels à Commander
            </h2>
            <div className={`rounded-2xl p-6 md:p-8 border backdrop-blur-sm ${
              theme === "dark" ? "bg-black/20 border-blue-400/20" : "bg-white/50 border-blue-600/20"
            }`}>
              <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className={`w-6 h-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  Ces fournisseurs suisses proposent des outils certifiés pour gauchers
                </p>
              </div>
              <ToolsCatalog tools={tools} />
            </div>
          </motion.section>

          {/* Programme d'entraînement */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Programme d'entraînement spécifique
            </h2>
            <p className={`text-center mb-8 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Suivez ce plan progressif sur 5 mois. Chaque exercice est validé par des formateurs WOSTEP.
            </p>
            <ExerciseTimeline exercises={exercises} />
          </motion.section>

          {/* Témoignages */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Témoignages d'élèves & pros gauchers
            </h2>
            <TestimonyCarousel testimonies={testimonies} />
          </motion.section>

          {/* FAQ */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              <HelpCircle className="inline w-8 h-8 mr-2" />
              Questions Fréquentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Dois-je tout racheter en version gaucher ?",
                  a: "Non. Commencez par les 3 outils essentiels : pince, tournevis et loupe. Le reste peut s'adapter. Budget conseillé : CHF 300-500."
                },
                {
                  q: "Mon CFC prendra-t-il plus de temps ?",
                  a: "Non. La durée est identique (3-4 ans). Par contre, comptez 2-3 mois d'adaptation au début pour les gestes miroir."
                },
                {
                  q: "Les employeurs recrutent-ils des gauchers ?",
                  a: "Oui, sans discrimination. Les manufactures grandes comme Rolex, Patek, Swatch Group recrutent sur les compétences uniquement."
                },
                {
                  q: "Puis-je devenir maître horloger gaucher ?",
                  a: "Absolument. 8% des maîtres horlogers suisses sont gauchers. Certains confessent que leur différence les rends plus créatifs."
                },
                {
                  q: "Que faire si mon formateur n'est pas spécialisé ?",
                  a: "Demandez à votre école un formateur référent. La FFH (Fédération des Écoles) forme désormais les formateurs à l'accompagnement gaucher."
                },
                {
                  q: "Y a-t-il des aides financières ?",
                  a: "Oui. Le canton de Neuchâtel et Genève offrent un chèque d'adaptation de CHF 500 pour les outils spécifiques."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  className={`rounded-xl p-6 border ${
                    theme === "dark"
                      ? "bg-black/30 border-blue-400/20"
                      : "bg-white/70 border-blue-600/20"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-700"
                  }`}>
                    <Info className="w-5 h-5" />
                    {faq.q}
                  </h3>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Ressources & communauté */}
          <motion.section 
            className={`rounded-2xl p-8 md:p-12 border backdrop-blur-sm ${
              theme === "dark" ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20" : "bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-blue-600/20"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Ressources & Communauté
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className={`text-center p-6 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
                    : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <BookOpen className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                <h3 className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Guide WOSTEP Gaucher
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  PDF officiel avec 80 pages de techniques
                </p>
                <Link href="https://www.wostep.ch/guide-gaucher" className={`text-sm mt-2 inline-block ${
                  theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                }`}>
                  Télécharger →
                </Link>
              </motion.div>
              
              <motion.div
                className={`text-center p-6 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
                    : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Users className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                <h3 className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Discord Gauchers CH
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  340+ élèves et pros en ligne
                </p>
                <Link href="https://discord.gg/horlogerie-gaucher" className={`text-sm mt-2 inline-block ${
                  theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                }`}>
                  Rejoindre →
                </Link>
              </motion.div>
              
              <motion.div
                className={`text-center p-6 rounded-xl border transition-all ${
                  theme === "dark"
                    ? "bg-black/40 border-blue-400/20 hover:border-blue-400/40"
                    : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <Video className={`w-12 h-12 mx-auto mb-4 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                <h3 className={`font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Tutoriels Vidéo
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  25 vidéos exclusives miroir
                </p>
                <Link href="https://youtube.com/@horlogerie-gaucher" className={`text-sm mt-2 inline-block ${
                  theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                }`}>
                  S'abonner →
                </Link>
              </motion.div>
            </div>
          </motion.section>

          {/* Conclusion & Motivation */}
          <motion.section 
            className={`rounded-2xl p-8 md:p-12 border backdrop-blur-sm ${
              theme === "dark" ? "bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-400/20" : "bg-gradient-to-br from-purple-100/50 to-blue-100/50 border-purple-600/20"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <Heart className={`w-16 h-16 mx-auto mb-6 ${theme === "dark" ? "text-red-400" : "text-red-600"}`} />
              <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-purple-400" : "text-purple-700"}`}>
                Votre différence est votre force
              </h2>
              <p className={`text-lg mb-6 max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                15% des élèves horlogers sont gauchers. Ils réussissent leurs formations et deviennent d'excellents professionnels. Votre différence vous oblige à être plus créatif, plus persévérant, et finalement plus habile que la moyenne.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <motion.div
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-black/40 border-purple-400/20" : "bg-white/60 border-purple-600/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
                  <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    +30% de créativité
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Adaptation constante forces innovation
                  </p>
                </motion.div>
                
                <motion.div
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-black/40 border-purple-400/20" : "bg-white/60 border-purple-600/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-yellow-400" : "text-yellow-600"}`} />
                  <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    92% de réussite
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Taux global CFC gauchers
                  </p>
                </motion.div>
                
                <motion.div
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-black/40 border-purple-400/20" : "bg-white/60 border-purple-600/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`} />
                  <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    8% des experts
                  </p>
                  <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Maîtres horlogers gauchers
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.05 }}
              >
                <Link href="/contact" className={`inline-block px-8 py-3 rounded-lg font-bold transition-all ${
                  theme === "dark"
                    ? "bg-purple-400 text-black hover:bg-purple-300"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}>
                  Prendre contact avec un formateur spécialisé
                </Link>
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
