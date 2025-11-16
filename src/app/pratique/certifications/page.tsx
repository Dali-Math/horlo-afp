// app/pratique/certifications/page.tsx
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Trophy, Clock, Award, Users, Target, Play } from "lucide-react";
import Link from "next/link";

// Types
type Theme = "light" | "dark";

// Contexte Thème
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | undefined>(undefined);

// Données
const certificationsData = [
  {
    id: "afp",
    title: "Attestation Fédérale de Formation (AFP)",
    duration: "2 ans",
    level: "Niveau initial",
    description: "Première marche du parcours horloger, l'AFP fournit les fondamentaux techniques et théoriques du métier.",
    skills: ["Base du démontage/remontage", "Connaissance des pièces", "Techniques d'assemblage basique", "Respect des normes de qualité"],
    stats: { completion: 85, employability: 90 },
    color: "blue",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400"
  },
  {
    id: "cfc",
    title: "Certificat Fédéral de Capacité (CFC)",
    duration: "3-4 ans",
    level: "Niveau professionnel",
    description: "Le diplôme de référence pour devenir horloger qualifié, combinant théorie et pratique en entreprise.",
    skills: ["Réparation complète de mouvements", "Régulation chronométrique", "Enrichissement de boîtes", "Garantie et contrôle qualité"],
    stats: { completion: 78, employability: 95 },
    color: "gold",
    image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400"
  },
  {
    id: "wostep",
    title: "WOSTEP Programme",
    duration: "1-2 ans (post-CFC)",
    level: "Spécialisation",
    description: "Formation intensive reconnue par les grandes manufactures horlogères suisses et internationales.",
    skills: ["Complications horlogères", "Microtechniques avancées", "Restauration de pièces anciennes", "Innovation technologique"],
    stats: { completion: 92, employability: 98 },
    color: "purple",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400"
  },
  {
    id: "master",
    title: "Brevet Fédéral & Maître Horloger",
    duration: "2-3 ans (post-CFC)",
    level: "Expertise",
    description: "Diplôme de maîtrise pour accéder aux postes de responsable d'atelier ou de recherche.",
    skills: ["Gestion d'équipe", "Recherche et développement", "Conception de mouvements", "Stratégie d'entreprise"],
    stats: { completion: 70, employability: 100 },
    color: "green",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400"
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

function CertificationCard({ cert }: { cert: typeof certificationsData[0] }) {
  const { theme } = useContext(ThemeContext)!;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl overflow-hidden border transition-all hover:shadow-2xl ${
        theme === "dark"
          ? "bg-black/40 border-amber-400/20 hover:border-amber-400/40"
          : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={cert.image}
          alt={cert.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
          theme === "dark" ? "bg-amber-400 text-black" : "bg-blue-600 text-white"
        }`}>
          {cert.level}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-amber-400" : "text-blue-700"}`}>
          {cert.title}
        </h3>
        <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          {cert.description}
        </p>
        
        <div className="mb-4">
          <div className={`text-sm font-semibold mb-2 flex items-center gap-2 ${
            theme === "dark" ? "text-amber-400" : "text-blue-600"
          }`}>
            <Clock className="w-4 h-4" />
            Durée : {cert.duration}
          </div>
        </div>

        <div>
          <h4 className={`text-sm font-semibold mb-2 ${theme === "dark" ? "text-amber-400" : "text-blue-600"}`}>
            Compétences acquises :
          </h4>
          <ul className="space-y-1">
            {cert.skills.map((skill, i) => (
              <li key={i} className={`flex items-start gap-2 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                <Trophy className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{cert.stats.completion}%</div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Réussite</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{cert.stats.employability}%</div>
            <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Employabilité</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Timeline({ steps }: { steps: { year: string; title: string; description: string }[] }) {
  const { theme } = useContext(ThemeContext)!;
  
  return (
    <div className="relative">
      <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${
        theme === "dark" ? "bg-amber-400/30" : "bg-blue-600/30"
      }`} />
      
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className={`flex items-center mb-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"}`}>
            <motion.div
              className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-2 ${
                theme === "dark" ? "bg-amber-400 text-black" : "bg-blue-600 text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {step.year}
            </motion.div>
            <h3 className={`text-xl font-bold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {step.title}
            </h3>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {step.description}
            </p>
          </div>
          
          <div className={`w-4 h-4 rounded-full z-10 ${
            theme === "dark" ? "bg-amber-400" : "bg-blue-600"
          }`} />
          
          <div className="flex-1" />
        </motion.div>
      ))}
    </div>
  );
}

// Composant Principal
export default function CertificationsPage() {
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
                  ? "text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 border border-amber-400/20"
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
                ? "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500"
                : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"
            }`}>
              Certifications Horlogères
            </h1>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto ${
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}>
              Maîtrisez les étapes de la formation professionnelle horlogère suisse et forgez votre excellence technique.
            </p>
          </motion.section>

          {/* REMPLACEMENT VIDÉO - Image Hero Interactive */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border relative group ${
              theme === "dark" ? "border-amber-400/20" : "border-blue-600/20"
            }`}>
              <img
                src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&h=675&fit=crop"
                alt="Atelier horlogerie suisse"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className={`text-lg md:text-xl font-light ${
                  theme === "dark" ? "text-white" : "text-white"
                }`}>
                  Découvrez l'excellence de la formation horlogère suisse
                </p>
                <p className={`text-sm mt-2 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-200"
                }`}>
                  Une tradition d'innovation et de précision depuis des siècles
                </p>
              </div>
              <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                theme === "dark" ? "bg-amber-400/90" : "bg-blue-600/90"
              }`}>
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-amber-400" : "text-blue-700"
            }`}>
              Votre Parcours de Formation
            </h2>
            <Timeline steps={[
              { year: "Année 1-2", title: "AFP", description: "Bases fondamentales du métier" },
              { year: "Année 3-6", title: "CFC", description: "Qualification professionnelle complète" },
              { year: "Année 7-8", title: "Spécialisation", description: "WOSTEP ou Brevet Fédéral" },
              { year: "Année 9+", title: "Expertise", description: "Maîtrise et leadership" }
            ]} />
          </motion.section>

          {/* Certifications Grid */}
          <motion.section className="mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
              theme === "dark" ? "text-amber-400" : "text-blue-700"
            }`}>
              Les Certifications Détaillées
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certificationsData.map((cert, index) => (
                <CertificationCard key={cert.id} cert={cert} />
              ))}
            </div>
          </motion.section>

          {/* Statistics */}
          <motion.section 
            className={`rounded-2xl p-8 md:p-12 border backdrop-blur-sm ${
              theme === "dark" ? "bg-gray-900/50 border-amber-400/20" : "bg-white/70 border-blue-600/20"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-bold text-center mb-8 ${
              theme === "dark" ? "text-amber-400" : "text-blue-700"
            }`}>
              Pourquoi Choisir cette Formation ?
            </h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Trophy, value: "95%", label: "Taux d'emploi" },
                { icon: Clock, value: "3-4", label: "Années moyennes" },
                { icon: Award, value: "4", label: "Niveaux de certification" },
                { icon: Users, value: "500+", label: "Élèves formés/an" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className={`p-6 rounded-xl border transition-all ${
                    theme === "dark"
                      ? "bg-black/40 border-amber-400/20 hover:border-amber-400/40"
                      : "bg-white/60 border-blue-600/20 hover:border-blue-600/40"
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  <stat.icon className={`w-10 h-10 mx-auto mb-3 ${
                    theme === "dark" ? "text-amber-400" : "text-blue-600"
                  }`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
