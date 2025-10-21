// pages/index.tsx
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Horloge en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-CH', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Académie Horlogère Suisse | Formation & Culture Horlogère</title>
        <meta name="description" content="Plateforme éducative dédiée à l'horlogerie suisse : cours, histoire, techniques et savoir-faire horloger." />
      </Head>

      <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-[#0a0a0a]'}`}>
        
        {/* ========== HEADER / NAVIGATION ========== */}
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-[#0a0a0a]/90' : 'bg-white/90'} backdrop-blur-md border-b ${darkMode ? 'border-[#d4af37]/20' : 'border-[#0a0a0a]/10'}`}>
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-[#d4af37] rounded-full"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[#d4af37] font-serif text-xl">⚙</div>
              </div>
              <span className="text-xl font-light tracking-wide">Académie Horlogère</span>
            </Link>

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-8 text-sm font-light">
              {['Formation', 'Histoire', 'Techniques', 'Galerie', 'À Propos'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Theme Toggle + CTA */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${darkMode ? 'bg-[#333] justify-end' : 'bg-[#ddd] justify-start'}`}
                aria-label="Changer de thème"
              >
                <div className={`w-5 h-5 rounded-full ${darkMode ? 'bg-[#d4af37]' : 'bg-[#0a0a0a]'} transition-transform`} />
              </button>
              <Link href="/inscription" className="hidden sm:block px-5 py-2 bg-[#d4af37] text-[#0a0a0a] rounded-md text-sm font-medium hover:shadow-lg transition-all">
                Commencer
              </Link>
            </div>
          </nav>
        </header>

        {/* ========== HERO SECTION ========== */}
        <motion.section 
          ref={heroRef}
          style={{ opacity }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gears" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="2"/>
                  {[...Array(12)].map((_, i) => (
                    <rect key={i} x="95" y="20" width="10" height="30" fill="#d4af37" 
                      transform={`rotate(${i * 30} 100 100)`}/>
                  ))}
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gears)"/>
            </svg>
          </div>

          {/* Animated Clock */}
          <div className="absolute top-1/4 right-10 hidden lg:block">
            <motion.div 
              className="relative w-64 h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.15, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Clock face */}
              <div className="absolute inset-0 border-4 border-[#d4af37] rounded-full" />
              {/* Hour markers */}
              {[...Array(12)].map((_, i) => (
                <div key={i} 
                  className="absolute w-1 h-4 bg-[#d4af37] top-2 left-1/2 -translate-x-1/2"
                  style={{ 
                    transformOrigin: '50% 126px',
                    transform: `translateX(-50%) rotate(${i * 30}deg)`
                  }}
                />
              ))}
              {/* Hour hand */}
              <motion.div
                className="absolute w-2 h-20 bg-[#d4af37] rounded-full top-1/2 left-1/2 origin-bottom"
                style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                animate={{ rotate: (new Date().getHours() % 12) * 30 + new Date().getMinutes() * 0.5 }}
                transition={{ duration: 0 }}
              />
              {/* Minute hand */}
              <motion.div
                className="absolute w-1.5 h-28 bg-[#d4af37] rounded-full top-1/2 left-1/2 origin-bottom"
                style={{ transform: 'translateX(-50%) translateY(-100%)' }}
                animate={{ rotate: new Date().getMinutes() * 6 }}
                transition={{ duration: 0 }}
              />
              {/* Center dot */}
              <div className="absolute w-4 h-4 bg-[#d4af37] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </motion.div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block mb-6 px-4 py-2 border border-[#d4af37] rounded-full text-sm tracking-wider"
            >
              🇨🇭 Excellence Horlogère Suisse
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-light mb-6 leading-tight"
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
              Découvrez l'univers fascinant de l'horlogerie suisse : formations complètes,
              histoire millénaire et techniques ancestrales transmises avec passion.
            </motion.p>

            {/* Live Time Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-10 text-4xl font-mono text-[#d4af37] tracking-wider"
            >
              {currentTime}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/formation" className="px-8 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                Explorer les Formations
              </Link>
              <Link href="/histoire" className="px-8 py-4 border border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300">
                Découvrir l'Histoire
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-[#d4af37] rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-[#d4af37] rounded-full" />
            </div>
          </motion.div>
        </motion.section>

        {/* ========== STATS SECTION ========== */}
        <section className="py-20 px-6 border-y border-[#d4af37]/20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "250+", label: "Années d'Histoire" },
              { number: "50+", label: "Cours Disponibles" },
              { number: "5000+", label: "Étudiants Formés" },
              { number: "100%", label: "Excellence Suisse" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#d4af37] mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wider opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== FEATURES / DOMAINES ========== */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-light mb-4">Nos Domaines d'Excellence</h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Une approche complète de l'horlogerie, de la théorie à la pratique
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎓",
                  title: "Formation Complète",
                  description: "Programmes structurés du niveau débutant à expert, avec certification reconnue.",
                  link: "/formation"
                },
                {
                  icon: "📜",
                  title: "Histoire & Patrimoine",
                  description: "Plongez dans 250 ans d'innovation horlogère suisse et découvrez les pièces légendaires.",
                  link: "/histoire"
                },
                {
                  icon: "⚙️",
                  title: "Techniques Avancées",
                  description: "Maîtrisez les gestes précis : assemblage, réglage, complications mécaniques.",
                  link: "/techniques"
                },
                {
                  icon: "🔬",
                  title: "Science & Précision",
                  description: "Comprenez la physique du mouvement, l'échappement et la régulation.",
                  link: "/science"
                },
                {
                  icon: "🏛️",
                  title: "Galerie Interactive",
                  description: "Explorez des modèles 3D de calibres mythiques et visualisez leur fonctionnement.",
                  link: "/galerie"
                },
                {
                  icon: "👥",
                  title: "Communauté",
                  description: "Rejoignez un réseau de passionnés et de professionnels de l'horlogerie.",
                  link: "/communaute"
                }
              ].map((feature,
