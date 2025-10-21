'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { 
  Clock, 
  History, 
  Wrench, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Menu, 
  X, 
  Play, 
  Users, 
  Award,
  ChevronDown 
} from 'lucide-react';

// Composant : Horloge en temps réel
const LiveClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md rounded-full p-4 shadow-xl border border-gold/30"
    >
      <div className="text-center text-sm font-mono">
        {time.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>
    </motion.div>
  );
};

// Composant : Carte d'information
const InfoCard = ({ 
  icon, title, description, link, delay 
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gold/30 group"
  >
    <div className="mb-6 text-gold group-hover:rotate-12 transition-transform duration-500">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-dark mb-4">{title}</h3>
    <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
    <a href={link} className="inline-flex items-center text-gold font-semibold">
      En savoir plus <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
    </a>
  </motion.div>
);

// Composant : Élément de timeline
const TimelineItem = ({ year, title, description, isLeft }: {
  year: string;
  title: string;
  description: string;
  isLeft: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} items-center gap-8 mb-16`}
  >
    <div className="bg-white p-6 rounded-xl shadow-lg w-2/5 border border-gold/20">
      <span className="text-sm font-bold text-gold">{year}</span>
      <h4 className="text-xl font-bold text-dark mt-2">{title}</h4>
      <p className="text-gray-600 mt-3">{description}</p>
    </div>
    <div className="hidden lg:block w-1/5 flex justify-center">
      <motion.div
        whileHover={{ scale: 1.2 }}
        className="w-6 h-6 bg-gold rounded-full shadow-lg relative z-10"
      >
        <Clock className="w-3 h-3 text-white absolute inset-0 m-auto" />
      </motion.div>
    </div>
    <div className="hidden lg:block w-2/5 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
  </motion.div>
);

// Page principale
export default function HorlogerieHomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-light text-dark font-sans">
      {/* Barre de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Horloge */}
      <LiveClock />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-gold" />
            <h1 className="text-2xl font-serif font-bold">Horlogerie<br />Patrimoine</h1>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden lg:flex gap-8">
            {['Accueil', 'Histoire', 'Techniques', 'Ressources', 'Contact'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="font-medium relative group"
              >
                {item}
                <span className="absolute inset-0 -bottom-1 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gold/20"
            >
              <nav className="container mx-auto px-6 py-4 space-y-4">
                {['Accueil', 'Histoire', 'Techniques', 'Ressources', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-lg hover:text-gold transition"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center text-center px-6">
        {/* Rouages animés */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23C9A86A' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23C9A86A'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='35' fill='none' stroke='%23B0BEC5' stroke-width='3'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%23B0BEC5'/%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            L'Art du <span className="text-gold block">Temps</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Explorez l'univers fascinant de l'horlogerie : histoire, techniques, maîtres horlogers et patrimoine culturel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#ressources"
              whileHover={{ scale: 1.05 }}
              className="bg-gold text-dark px-8 py-4 rounded-full font-semibold shadow-lg"
            >
              Commencer l'apprentissage
            </motion.a>
            <motion.a
              href="#histoire"
              whileHover={{ scale: 1.05 }}
              className="border-2 border-gold text-gold px-8 py-4 rounded-full font-semibold"
            >
              Découvrir l'histoire
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* Section Approches */}
      <section id="approches" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16"
          >
            Notre Approche Éducative
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <InfoCard
              icon={<History size={48} />}
              title="Histoire & Patrimoine"
              description="Découvrez les époques qui ont façonné l'horlogerie, des horloges astronomiques aux montres-bracelets."
              link="#histoire"
              delay={0}
            />
            <InfoCard
              icon={<Wrench size={48} />}
              title="Techniques & Mécanismes"
              description="Maîtrisez les secrets des mouvements, échappements et complications horlogères."
              link="#techniques"
              delay={1}
            />
            <InfoCard
              icon={<BookOpen size={48} />}
              title="Ressources Pédagogiques"
              description="Cours interactifs, vidéos, quiz et certifications pour tous niveaux."
              link="#ressources"
              delay={2}
            />
          </div>
        </div>
      </section>

      {/* Section Timeline */}
      <section id="histoire" className="py-24 bg-light">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-center mb-16"
          >
            Chronologie de l'Horlogerie
          </motion.h2>
          <div className="max-w-6xl mx-auto">
            <TimelineItem
              year="1300"
              title="Premières Horloges Mécaniques"
              description="Naissance de l'horlogerie européenne avec les horloges à poids."
              isLeft
            />
            <TimelineItem
              year="1656"
              title="Pendule de Huygens"
              description="Révolution de la précision grâce au pendule régulateur."
              isLeft={false}
            />
            <TimelineItem
              year="1759"
              title="Chronomètre de Marine"
              description="Harrison résout le problème de la longitude."
              isLeft
            />
            <TimelineItem
              year="1904"
              title="Première Montre-Bracelet"
              description="Cartier crée la Santos pour Santos-Dumont."
              isLeft={false}
            />
            <TimelineItem
              year="1969"
              title="Révolution du Quartz"
              description="Seiko lance la première montre à quartz."
              isLeft
            />
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-16"
          >
            Nos Chiffres Clés
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatCard number="500+" label="Cours disponibles" icon={<BookOpen size={48} />} />
            <StatCard number="10k+" label="Apprentis formés" icon={<Users size={48} />} />
            <StatCard number="150+" label="Maîtres horlogers" icon={<Award size={48} />} />
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section id="ressources" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold mb-6"
          >
            Restez à l'heure des nouveautés
          </motion.h2>
          <p className="text-xl text-gray-600 mb-8">
            Recevez nos actualités, cours exclusifs et événements culturels.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto flex"
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-6 py-4 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button className="bg-gold text-dark px-8 py-4 rounded-r-full font-semibold hover:bg-gold/90 transition">
              S'abonner
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-4">Horlogerie Patrimoine</h3>
              <p className="text-sm">La référence en éducation horlogère et patrimoine culturel.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#accueil" className="hover:text-gold">Accueil</a></li>
                <li><a href="#histoire" className="hover:text-gold">Histoire</a></li>
                <li><a href="#approches" className="hover:text-gold">Techniques</a></li>
                <li><a href="#ressources" className="hover:text-gold">Ressources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-gold" />
                  <span>+33 1 23 45 67 89</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} className="text-gold" />
                  <span>contact@horlogerie.fr</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin size={16} className="text-gold" />
                  <span>Paris, France</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Suivez-nous</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gold hover:text-gold/80">Instagram</a>
                <a href="#" className="text-gold hover:text-gold/80">YouTube</a>
                <a href="#" className="text-gold hover:text-gold/80">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
            © 2024 Horlogerie Patrimoine. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
