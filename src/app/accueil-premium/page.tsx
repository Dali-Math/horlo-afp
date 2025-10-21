"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// ==========================================
// CONFIGURATION DES COULEURS THÉMATIQUES
// ==========================================
const COLORS = {
  gold: "#d4af37",
  black: "#0a0a0a",
  darkGray: "#1a1a1a",
  steel: "#b0b0b0",
  offWhite: "#f5f5f5",
  white: "#ffffff",
};

// ==========================================
// COMPOSANTS RÉUTILISABLES
// ==========================================

// Bouton CTA principal
const PrimaryButton = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`inline-block px-8 py-4 rounded-lg font-medium transition-all duration-300 bg-[#d4af37] text-[#0a0a0a] hover:shadow-2xl hover:shadow-[#d4af37]/40 hover:-translate-y-1 ${className}`}
  >
    {children}
  </Link>
);

// Bouton CTA secondaire
const SecondaryButton = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
  <Link
    href={href}
    className={`inline-block px-8 py-4 border-2 border-[#d4af37] rounded-lg font-medium transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37] ${className}`}
  >
    {children}
  </Link>
);

// Carte de section avec effet hover
const SectionCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  delay = 0 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  link: string; 
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ delay, duration: 0.6 }}
  >
    <Link
      href={link}
      className="block h-full p-8 rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a1a1a]/30 to-transparent transition-all duration-400 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 hover:-translate-y-3 hover:shadow-xl hover:shadow-[#d4af37]/20"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-light mb-3 text-[#d4af37]">{title}</h3>
      <p className="opacity-80 text-sm leading-relaxed mb-6">{description}</p>
      <span className="inline-flex items-center gap-2 text-[#d4af37] font-medium text-sm">
        En savoir plus
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  </motion.div>
);

// ==========================================
// COMPOSANT PRINCIPAL DE LA PAGE
// ==========================================

export default function HorloLearnHomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Horloge en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Données structurées
  const stats = [
    { value: "250+", label: "Années de Patrimoine", icon: "🕰️" },
    { value: "50+", label: "Cours Disponibles", icon: "📚" },
    { value: "200+", label: "Ressources Techniques", icon: "⚙️" },
    { value: "100%", label: "Accès Gratuit", icon: "🎁" },
  ];

  const mainSections = [
    {
      icon: "🎓",
      title: "Formation Complète",
      description: "Parcours structurés du débutant à l'expert : démontage, assemblage, réglage et complications horlogères.",
      link: "/formation",
    },
    {
      icon: "🏛️",
      title: "Histoire & Culture",
      description: "Explorez 250 ans d'innovation suisse, des premières montres de poche aux chefs-d'œuvre contemporains.",
      link: "/histoire",
    },
    {
      icon: "🔧",
      title: "Techniques Pratiques",
      description: "Tutoriels vidéo et guides illustrés pour maîtriser les outils et gestes des maîtres horlogers.",
      link: "/techniques",
    },
    {
      icon: "🖼️",
      title: "Musée Virtuel",
      description: "Collections 3D interactives de calibres légendaires, complications rares et pièces d'exception.",
      link: "/musee",
    },
    {
      icon: "🤝",
      title: "Communauté",
      description: "Rejoignez des milliers de passionnés, partagez vos projets et participez à des ateliers en ligne.",
      link: "/communaute",
    },
    {
      icon: "📖",
      title: "Bibliothèque",
      description: "Accès à des ouvrages de référence, schémas techniques et documentation historique numérisée.",
      link: "/bibliotheque",
    },
  ];

  const featuredCourse = {
    title: "Démontage du Calibre ETA 6497",
    subtitle: "Tutoriel pas-à-pas avec modèle 3D interactif",
    description: "Apprenez à démonter et remonter l'un des mouvements mécaniques les plus emblématiques de l'horlogerie suisse.",
    image: "https://images.unsplash.com/photo-1612543734639-6515569c4516?w=1200&q=80",
    link: "/tutoriels/eta-6497",
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-[#f5f5f5] text-[#0a0a0a]"}`}>
      
      {/* ========================================== */}
      {/* HEADER FIXE                                */}
      {/* ========================================== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-lg ${darkMode ? "bg-[#0a0a0a]/90 border-b border-[#d4af37]/20" : "bg-white/90 border-b border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            
            {/* Logo avec engrenage animé */}
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center"
              >
                <span className="text-[#d4af37] text-xl">⚙</span>
              </motion.div>
              <span className="text-xl font-light tracking-wide group-hover:text-[#d4af37] transition-colors">
                HorloLearn
              </span>
            </Link>

            {/* Navigation principale */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-light">
              {["Formation", "Histoire", "Techniques", "Musée", "Communauté"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative hover:text-[#d4af37] transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Toggle Dark/Light + CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Changer de thème"
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ${
                  darkMode ? "bg-gray-700 justify-end" : "bg-gray-300 justify-start"
                }`}
              >
                <motion.div
                  layout
                  className={`w-5 h-5 rounded-full ${darkMode ? "bg-[#d4af37]" : "bg-[#0a0a0a]"}`}
                />
              </button>
              <Link
                href="/commencer"
                className="hidden sm:inline-block px-5 py-2 bg-[#d4af37] text-[#0a0a0a] rounded-md text-sm font-medium hover:shadow-lg transition-all"
              >
                Commencer
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ========================================== */}
        {/* SECTION HÉROS (100vh)                      */}
        {/* ========================================== */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-screen flex items-center justify-center pt-16 overflow-hidden"
        >
          {/* Animation de fond : engrenages SVG */}
          <div className="absolute inset-0 z-0 opacity-5">
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="200" cy="200" r="150" fill="none" stroke={COLORS.gold} strokeWidth="2" />
              <circle cx="200" cy="200" r="20" fill={COLORS.gold} />
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="195"
                  y="50"
                  width="10"
                  height="40"
                  fill={COLORS.gold}
                  transform={`rotate(${i * 30} 200 200)`}
                />
              ))}
            </motion.svg>
          </div>

          {/* Horloge animée (visible sur desktop) */}
          <div className="absolute top-1/4 right-10 hidden xl:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="relative w-64 h-64"
            >
              <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full" />
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-4 bg-[#d4af37] top-2 left-1/2 -translate-x-1/2"
                  style={{
                    transformOrigin: "50% 126px",
                    transform: `translateX(-50%) rotate(${i * 30}deg)`,
                  }}
                />
              ))}
              {/* Aiguille des heures */}
              <motion.div
                className="absolute w-2 h-20 bg-[#d4af37] rounded-full top-1/2 left-1/2 origin-bottom"
                style={{ transform: "translateX(-50%) translateY(-100%)" }}
                animate={{
                  rotate: (new Date().getHours() % 12) * 30 + new Date().getMinutes() * 0.5,
                }}
                transition={{ duration: 0 }}
              />
              {/* Aiguille des minutes */}
              <motion.div
                className="absolute w-1.5 h-28 bg-[#d4af37] rounded-full top-1/2 left-1/2 origin-bottom"
                style={{ transform: "translateX(-50%) translateY(-100%)" }}
                animate={{ rotate: new Date().getMinutes() * 6 }}
                transition={{ duration: 0 }}
              />
              {/* Aiguille des secondes */}
              <motion.div
                className="absolute w-0.5 h-32 bg-red-500 rounded-full top-1/2 left-1/2 origin-bottom"
                style={{ transform: "translateX(-50%) translateY(-100%)" }}
                animate={{ rotate: new Date().getSeconds() * 6 }}
                transition={{ duration: 0 }}
              />
              <div className="absolute w-4 h-4 bg-[#d4af37] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>

          {/* Contenu principal du héros */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6 px-4 py-2 border border-[#d4af37] rounded-full text-sm tracking-wider backdrop-blur-sm"
            >
              🇨🇭 Savoir-faire Horloger Suisse
            
