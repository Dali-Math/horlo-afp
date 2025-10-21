// app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mise à jour de l'heure en temps réel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Données pour les sections
  const stats = [
    { value: "250+", label: "Années d'Histoire" },
    { value: "50+", label: "Cours Disponibles" },
    { value: "10 000+", label: "Étudiants Formés" },
    { value: "100%", label: "Accès Gratuit" }
  ];

  const domains = [
    {
      icon: "📜",
      title: "Histoire Horlogère",
      description: "Plongez dans 250 ans d'innovation suisse, des premières montres de poche aux complications modernes.",
      color: "from-amber-500/20 to-amber-700/20"
    },
    {
      icon: "⚙️",
      title: "Techniques Pratiques",
      description: "Maîtrisez les gestes fondamentaux : assemblage, réglage, démontage et entretien des calibres mécaniques.",
      color: "from-blue-500/20 to-blue-700/20"
    },
    {
      icon: "🔬",
      title: "Science du Temps",
      description: "Comprenez la physique du balancier, l'échappement et les principes de régulation qui font la précision horlogère.",
      color: "from-emerald-500/20 to-emerald-700/20"
    },
    {
      icon: "🎓",
      title: "Métiers & Formation",
      description: "Découvrez les parcours professionnels, certifications et opportunités dans l'univers horloger suisse.",
      color: "from-purple-500/20 to-purple-700/20"
    },
    {
      icon: "🖼️",
      title: "Musée Virtuel",
      description: "Explorez des collections numérisées de pièces rares, calibres historiques et innovations légendaires.",
      color: "from-rose-500/20 to-rose-700/20"
    },
    {
      icon: "🤝",
      title: "Communauté",
      description: "Rejoignez un réseau de passionnés, échangez avec des professionnels et participez à des ateliers virtuels.",
      color: "from-cyan-500/20 to-cyan-700/20"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#fafafa] text-[#0a0a0a]'}`}>
      {/* ========== HEADER ========== */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-[#0a0a0a]/90' : 'bg-white/90'} backdrop-blur-md border-b ${darkMode ? 'border-[#d4af37]/20' : 'border-gray-200'}`}>
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
            <span className="text-xl font-light tracking-wide">HorloCulture</span>
          </Link>

          {/* Navigation */}
          <ul className="hidden md:flex gap-8 text-sm font-light">
            {['Accueil', 'Formations', 'Histoire', 'Techniques', 'Musée', 'Communauté'].map((item) => (
              <li key={item}>
                <Link 
                  href={`/${item.toLowerCase()}`} 
                  className="hover:text-[#d4af37] transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] group-hover:w-full transition-all"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full flex items-center px-1 transition-all ${darkMode ? 'bg-[#333] justify-end' : 'bg-[#ddd] justify-start'}`}
              aria-label="Changer de thème"
            >
              <div className={`w-5 h-5 rounded-full ${darkMode ? 'bg-[#d4af37]' : 'bg-[#0a0a0a]'} transition-transform`} />
            </button>
            <Link 
              href="/catalogue" 
              className="hidden sm:block px-5 py-2 bg-[#d4af37] text-[#0a0a0a] rounded-md text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Catalogue de Cours
            </Link>
          </div>
        </nav>
      </header>

      {/* ========== HERO SECTION ========== */}
      <motion.section 
        style={{ opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="gears" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="1"/>
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
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Clock face */}
            <div className="absolute inset-0 border-2 border-[#d4af37] rounded-full" />
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
              transition={{ duration: 0.1 }}
            />
            {/* Minute hand */}
            <motion.div
              className="absolute w-1.5 h-28 bg-[#d4af37] rounded-full top-1/2 left-1/2 origin-bottom"
              style={{ transform: 'translateX(-50%) translateY(-100%)' }}
              animate={{ rotate: new Date().getMinutes() * 6 }}
              transition={{ duration: 0.1 }}
            />
            {/* Second hand */}
            <motion.div
              className="absolute w-0.5 h-32 bg-red-500 rounded-full top-1/2 left-1/2 origin-bottom"
              style={{ transform: 'translateX(-50%) translateY(-100%)' }}
              animate={{ rotate: new Date().getSeconds() * 6 }}
              transition={{ duration: 0.1 }}
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
            Découvrez l'univers fascinant de l'horlogerie suisse : formations complètes,
            histoire millénaire et techniques ancestrales transmises avec passion.
          </motion.p>

          {/* Live Time Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10 text-3xl md:text-4xl font-mono text-[#d4af37] tracking-wider"
          >
            {currentTime}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/formations" 
              className="px-8 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Explorer les Formations
            </Link>
            <Link 
              href="/histoire" 
              className="px-8 py-4 border border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300"
            >
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Notre Engagement Éducatif</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Une plateforme libre, gratuite et ouverte à tous les passionnés d'horlogerie
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light text-[#d4af37] mb-2">{stat.value}</div>
                <div className="text-sm uppercase tracking-wider opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== DOMAINS SECTION ========== */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-4">Domaines d'Excellence</h2>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Une approche complète de l'horlogerie, de la théorie à la pratique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domains.map((domain, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-8 rounded-2xl bg-gradient-to-br ${domain.color} border border-[#d4af37]/30 transition-all duration-300 cursor-pointer`}
              >
                <div className="text-5xl mb-4">{domain.icon}</div>
                <h3 className="text-xl font-medium mb-3">{domain.title}</h3>
                <p className="opacity-80 text-sm">{domain.description}</p>
                <div className="mt-4 w-8 h-0.5 bg-[#d4af37]"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION SECTION ========== */}
      <section className="py-24 px-6 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#d4af37]/20 text-[#d4af37] rounded-full text-sm">
              Notre Mission
            </div>
            <h2 className="text-3xl md:text-4xl font-light">
              Transmettre le Savoir Horloger<br />
              <span className="text-[#d4af37]">avec Passion et Précision</span>
            </h2>
            <p className="opacity-80">
              HorloCulture est né d'une conviction simple : le savoir horloger suisse, 
              patrimoine mondial de l'humanité, doit être accessible à tous. 
              Nous créons des ressources pédagogiques de qualité, libres de droits, 
              pour préserver et transmettre cet art millénaire.
            </p>
            <blockquote className="italic opacity-90 border-l-4 border-[#d4af37] pl-4 py-2">
              "Le temps est la substance dont je suis fait. Le temps est un fleuve qui m'emporte, 
              mais je suis ce fleuve." — Jorge Luis Borges
            </blockquote>
            <Link 
              href="/mission" 
              className="inline-block px-6 py-3 border border-[#d4af37] rounded-lg hover:bg-[#d4af37] hover:text-[#0a0a0a] transition-all"
            >
              En savoir plus
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#d4af37]/30">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-amber-700/20"></div>
              <div className="absolute inset-4 border-2 border-[#d4af37]/50 rounded-xl"></div>
              <div className="absolute inset-8 flex items-center justify-center text-6xl">
                ⌚
              </div>
            </div>
            
            {/* Animated gears around the image */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 border-2 border-[#d4af37] rounded-full"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-12 h-12 border border-[#d4af37] rounded-full"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light mb-6"
          >
            Prêt à découvrir l'univers horloger ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-80 mb-10 max-w-2xl mx-auto"
          >
            Que vous soyez débutant curieux ou passionné confirmé, notre plateforme vous offre 
            un accès immédiat à des ressources horlogères de qualité suisse.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/catalogue" 
              className="px-8 py-4 bg-[#d4af37] text-[#0a0a0a] rounded-lg font-medium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Accéder aux Cours
            </Link>
            <Link 
              href="/atelier" 
              className="px-8 py-4 border border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/10 transition-all duration-300"
            >
              Visiter l'Atelier Virtuel
            </Link>
            <Link 
              href="/communaute" 
              className="px-8 py-4 border border-[#d4af37] rounded-lg font-medium hover:bg-[#d4af37]/5 transition-all duration-300"
            >
              Rejoindre la Communauté
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-12 px-6 border-t border-[#d4af37]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border-2 border-[#d4af37] rounded-full flex items-center justify-center">
                  ⌚
                </div>
                <span className="text-xl font-light">HorloCulture</span>
              </div>
              <p className="opacity-80 mb-4 max-w-md">
                Une initiative éducative et culturelle dédiée à la préservation 
                et à la transmission du savoir horloger suisse.
              </p>
              <div className="flex gap-4">
                {['linkedin', 'youtube', 'instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center hover:bg-[#d4af37]/10 transition-colors"
                    aria-label={social}
                  >
                    <span className="text-sm">{social[0].toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Navigation</h3>
              <ul className="space-y-2 opacity-80">
                {['Accueil', 'Formations', 'Histoire', 'Techniques', 'Musée'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Ressources</h3>
              <ul className="space-y-2 opacity-80">
                {['Catalogue', 'Glossaire', 'Bibliothèque', 'Webinaires', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#d4af37]/20 mt-12 pt-8 text-center opacity-70 text-sm">
            <p>© {new Date().getFullYear()} HorloCulture. Conçu avec passion en Suisse.</p>
            <p className="mt-2">
              <Link href="/mentions" className="hover:text-[#d4af37] mr-4">Mentions Légales</Link>
              <Link href="/accessibilite" className="hover:text-[#d4af37]">Accessibilité</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
