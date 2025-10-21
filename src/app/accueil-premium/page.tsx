"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Couleurs thématiques HorloLearn
const COLORS = {
  gold: "#d4af37",
  black: "#0a0a0a",
  steel: "#b0b0b0",
  offWhite: "#f5f5f5",
};

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Horloge en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("fr-CH", {
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

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Statistiques authentiques
  const stats = [
    { value: "100%", label: "Gratuit" },
    { value: "∞", label: "Ressources" },
    { value: "0", label: "Inscription" },
    { value: "🇨🇭", label: "Qualité Suisse" },
  ];

  // Sections principales
  const features = [
    {
      icon: "📚",
      title: "Bibliothèque Technique",
      description: "Accédez à des manuels, schémas, plans et guides détaillés sur les calibres mécaniques suisses.",
    },
    {
      icon: "⚙️",
      title: "Tutoriels Pratiques",
      description: "Apprenez les gestes fondamentaux : démontage, remontage, réglage et entretien des mouvements.",
    },
    {
      icon: "🔍",
      title: "Savoir-Faire Horloger",
      description: "Découvrez les techniques ancestrales transmises par les maîtres horlogers depuis des générations.",
    },
    {
      icon: "🤝",
      title: "Communauté Passionnée",
      description: "Rejoignez des milliers d’amateurs et de professionnels pour échanger, poser des questions et partager.",
    },
    {
      icon: "🎯",
      title: "Accès Immédiat",
      description: "Pas d’inscription, pas de paywall. Toutes les ressources sont disponibles dès maintenant, gratuitement.",
    },
    {
      icon: "🔄",
      title: "Contenu Évolutif",
      description: "Notre bibliothèque s’enrichit chaque mois grâce aux contributions de la communauté horlogère.",
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0a0a0a] text-[#f5f5f5]" : "bg-[#f5f5f5] text-[#0a0a0a]"}`}>
      {/* ========== HEADER ========== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 backdrop-blur-lg ${darkMode ? "bg-[#0a0a0a]/90 border-b border-[#d4af37]/20" : "bg-white/90 border-b border-[#b0b0b0]/20"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center"
              >
                <span className="text-[#d4af37] text-xl">⚙</span>
              </motion.div>
              <span className="text-xl font-light tracking-wide">HorloLearn</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-light">
              {["Formation", "Histoire", "Techniques", "Musée", "Communauté"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative hover:text-[#d4af37] transition-colors duration-300 group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all"></span>
                </Link>
              ))}
            </nav>

            {/* Toggle & CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Changer de thème"
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${
                  darkMode ? "bg-gray-700 justify-end" : "bg-gray-300 justify-start"
                }`}
              >
                <motion.div
                  layout
                  className={`w-5 h-5 rounded-full ${darkMode ? "bg-[#d4af37]" : "bg-[#0a0a0a]"}`}
                />
              </button>
              <Link
                href="/catalogue"
                className="hidden sm:inline-block px-5 py-2 bg-[#d4af37] text-[#0a0a0a] rounded-md text-sm font-medium hover:shadow-lg transition-all"
              >
                Catalogue
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ========== HERO ========== */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative h-screen flex items-center justify-center pt-16 overflow-hidden"
      >
        {/* Fond animé : engrenages SVG */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gearPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <circle cx="60" cy="60" r="45" fill="none" stroke="#d4af37" strokeWidth="1" />
                {[...Array(12)].map((_, i) => (
                  <rect
                    key={i}
                    x="55"
                    y="15"
                    width="10"
                    height="30"
                    fill="#d4af37"
                    transform={`rotate(${i * 30} 60 60)`}
                  />
                ))}
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gearPattern)" />
          </svg>
        </div>

        {/* Horloge animée (desktop) */}
        <div className="absolute top-1/4 right-10 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-64 h-64"
          >
            {/* Cadran */}
            <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full" />
            {/* Heures */}
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
            {/* Centre */}
            <div className="absolute w-4 h-4 bg-[#d4af37] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6 px-4 py-2 border border-[#d4af37] rounded-full text-sm tracking-wider"
          >
            🇨🇭 Horlogerie Suisse
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight"
          >
            L'Art du Temps,<br />
            <span className="bg-gradient-to-r from-white via-[#d4af37] to-white bg-clip-text text-transparent">
              La Science de la Précision
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-10 opacity-80 max-w-2xl mx-auto font-light"
          >
            Une bibliothèque vivante de savoirs horlogers partagés par des passionnés. Tutoriels, ressources techniques et connaissances pratiques — entièrement gratuit.
          </motion.p>

          {/* Horloge réelle en temps réel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10 text-3xl md:text-4xl font-mono text-[#d4af37] tracking-wider"
          >
            {currentTime}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/catalogue"
              className="px-8 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Explorer les Ressources
            </Link>
            <Link
              href="/histoire"
              className="px-8 py-4 border border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300"
            >
              Découvrir l’Histoire
            </Link>
          </motion.div>
        </div>

        {/* Indicateur de scroll (aiguille qui bouge) */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#d4af37] rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-[#d4af37] rounded-full"></div>
          </div>
        </motion.div>
      </motion.section>

      {/* ========== STATISTIQUES ========== */}
      <section className="py-20 px-6 border-y border-[#d4af37]/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Notre Engagement</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Une plateforme libre, gratuite et ouverte à tous les passionnés d’horlogerie.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-6"
              >
                <div className="text-4xl md:text-5xl font-light text-[#d4af37] mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CARTE DES DOMAINES ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Nos Domaines d’Excellence</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Explorez l’univers de l’horlogerie suisse, de la théorie à la pratique, avec passion et précision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a1a1a]/10 to-transparent hover:border-[#d4af37]/50 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="opacity-80 text-sm">{feature.description}</p>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light mb-6"
          >
            Prêt à plonger dans l’univers horloger ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-80 mb-10"
          >
            Que vous soyez débutant curieux ou horloger expérimenté, HorloLearn vous offre un accès immédiat à des ressources horlogères de qualité suisse, entièrement gratuites et sans restriction.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/catalogue"
              className="px-10 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Commencer l’exploration
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-6 border-t border-[#d4af37]/20 text-center opacity-70 text-sm">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} HorloLearn — Une initiative communautaire pour la préservation du savoir horloger suisse.</p>
          <p className="mt-4">
            <Link href="/mentions-legales" className="hover:text-[#d4af37] mr-4">Mentions Légales</Link>
            <Link href="/accessibilite" className="hover:text-[#d4af37]">Accessibilité</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
