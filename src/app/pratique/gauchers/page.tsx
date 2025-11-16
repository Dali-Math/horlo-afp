// app/pratique/gauchers/page.tsx
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Wrench, Eye, Brain, Heart, Zap, CheckCircle, Users, Target } from "lucide-react";
import Link from "next/link";

// Types
type Theme = "light" | "dark";

// Contexte Thème
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

// Données
const adaptationsData = [
  {
    id: "outils",
    title: "Outils Inversés",
    description: "La plupart des outils horlogers peuvent être adaptés ou commandés en version gaucher.",
    solutions: ["Pinces inversées", "Tours à gauche", "Ciseaux à ressort inversés", "Loupes avec fixation latérale"],
    image: "https://images.unsplash.com/photo-1504148455328-c376907d0815?w=400"
  },
  {
    id: "posture",
    title: "Optimisation du Poste",
    description: "L'aménagement de votre espace de travail est crucial pour votre efficacité et votre santé.",
    solutions: ["Table inclinée à gauche", "Éclairage orienté à droite", "Rangement des outils à gauche", "Miroir de travail pour visibilité"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400"
  },
  {
    id: "techniques",
    title: "Techniques Adaptées",
    description: "Certaines manipulations nécessitent des approches différentes pour les gauchers.",
    solutions: ["Position de la montre inversée", "Prise en main miroir", "Utilisation du pouce droit comme pivot", "Exercices de coordination"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400"
  },
  {
    id: "formation",
    title: "Aide Pédagogique",
    description: "Les formateurs spécialisés peuvent vous accompagner avec des méthodes adaptées.",
    solutions: ["Suivi personnalisé", "Exercices renforcés", "Vidéos tutorielles miroir", "Groupes de parrainage"],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
  }
];

const exercises = [
  {
    title: "Exercice 1 : Coordination Main-Oeil",
    description: "Entraînez votre cerveau à inverser les mouvements",
    steps: ["Prenez un tournevis droitier", "Essayez de le manipuler en miroir", "Répétez 10 fois/jour", "Progressivement, le geste deviendra naturel"]
  },
  {
    title: "Exercice 2 : Assemblage Inversé",
    description: "Montez un mécanisme simple à l'envers",
    steps: ["Commencez avec une petite roue", "Tenez-la avec la main droite", "Manipulez les pinceaux de la main gauche", "Inversez petit à petit"]
  },
  {
    title: "Exercice 3 : Cercles et Spirales",
    description: "Améliorez votre précision avec des mouvements circulaires",
    steps: ["Dessinez des cercles sur papier avec la main gauche", "Passez à des spirales serrées", "Transférez sur une surface horizontale", "Simulez le vissage"]
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
          ? "bg-black/40 border-amber-400/20 text-amber-400 hover:border-amber-400/40"
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
                <span>{solution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

function ExerciseTimeline({ exercises }: { exercises: typeof exercises }) {
  const { theme } = useContext(ThemeContext)!;
  
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
            <div>
              <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                {exercise.title}
              </h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {exercise.description}
              </p>
            </div>
          </div>
          
          <div className="ml-9">
            <h4 className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
              Étapes :
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
        
        <div className="max-w-6xl mx-auto">
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
              Guide pour Élèves Gauchers
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              L'horlogerie est un art de précision. Être gaucher n'est pas un handicap, c'est une particularité à prendre en compte.
            </p>
          </motion.section>

          {/* Image Hero - Atelier adapté */}
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
                  Des solutions existent pour chaque difficulté. Vous n'êtes pas seul.
                </p>
              </div>
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                theme === "dark" ? "bg-blue-400/20 text-blue-300 border border-blue-400/30" : "bg-blue-600/20 text-blue-700 border border-blue-600/30"
              }`}>
                Spécial Gaucher
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
                  { icon: Wrench, title: "Outils Droitiers", desc: "90% des outils horlogers sont conçus pour la main droite" },
                  { icon: Eye, title: "Visibilité", desc: "Le corps bloque la lumière et la vue sur la pièce" },
                  { icon: Brain, title: "Coordination", desc: "Le cerveau doit s'adapter à des gestes miroir" }
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
                    <item.icon className={`w-12 h-12 mx-auto mb-4 ${
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }`} />
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

          {/* Exercices */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-blue-400" : "text-blue-700"
            }`}>
              Programme d'entraînement spécifique
            </h2>
            <ExerciseTimeline exercises={exercises} />
          </motion.section>

          {/* Motivation */}
          <motion.section 
            className={`rounded-2xl p-8 md:p-12 border backdrop-blur-sm ${
              theme === "dark" ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-400/20" : "bg-gradient-to-br from-blue-100/50 to-purple-100/50 border-blue-600/20"
            }`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <Heart className={`w-16 h-16 mx-auto mb-6 ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`} />
              <h2 className={`text-3xl font-bold mb-4 ${
                theme === "dark" ? "text-blue-400" : "text-blue-700"
              }`}>
                Vous n'êtes pas seul
              </h2>
              <p className={`text-lg mb-6 max-w-3xl mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}>
                15% des élèves horlogers sont gauchers. Ils réussissent leurs formations et deviennent d'excellents professionnels. Votre différence vous oblige à être plus créatif, plus persévérant, et finalement plus habile.
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <motion.div
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-black/40 border-blue-400/20" : "bg-white/60 border-blue-600/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${
                    theme === "dark" ? "text-yellow-400" : "text-yellow-600"
                  }`} />
                  <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    +30% de créativité
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Adaptation constante
                  </p>
                </motion.div>
                <motion.div
                  className={`p-4 rounded-lg border ${
                    theme === "dark" ? "bg-black/40 border-blue-400/20" : "bg-white/60 border-blue-600/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trophy className={`w-8 h-8 mx-auto mb-2 ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`} />
                  <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    92% de réussite
                  </p>
                  <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Taux global CFC gauchers
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
