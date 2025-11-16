"use client";

import Flashcards6497 from "@/components/Flashcards6497";
import Link from "next/link";
import { 
  Wrench, 
  Clock, 
  Droplet, 
  FileText, 
  Award, 
  Hammer,
  HandMetal,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Composant réutilisable pour les cartes de pratique
interface PratiqueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const PratiqueCard: React.FC<PratiqueCardProps> = ({ title, description, icon, href }) => {
  return (
    <Link href={href} className="block group">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative h-full p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Décorations subtile */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent dark:from-blue-500/20 rounded-bl-full"></div>
        
        <div className="relative z-10">
          <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-700 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {description}
          </p>
          <span className="inline-flex items-center gap-1 mt-4 text-blue-600 dark:text-blue-400 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Découvrir <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

// Section Hero
const Hero = () => {
  return (
    <section className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
          Pratique Horlogère
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          De la théorie à la maîtrise. Plongez dans l'art pratique de l'horlogerie et affûtez votre expertise sur les mouvements les plus emblématiques.
        </p>
      </motion.div>
    </section>
  );
};

// Section Parcours d'Apprentissage
const LearningPathSection = ({ title, items, delay }: { title: string; items: any[]; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={ref} className="mb-16">
      <motion.h2 
        className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8 flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: delay }}
      >
        <Sparkles className="w-8 h-8 text-yellow-500" />
        {title}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((s, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.1, // Stagger effect
              ease: "easeOut",
            }}
          >
            <PratiqueCard title={s.title} description={s.description} icon={s.icon} href={s.slug} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Page Principale
export default function PratiquePage() {
  // Regroupons les sections pour créer un parcours
  const fondamentaux = [
    {
      title: "Démontage & Remontage",
      icon: <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      description: "Apprenez les gestes essentiels pour démonter et remonter un mouvement mécanique avec précaution et méthode.",
      slug: "/pratique/demontage",
    },
    {
      title: "Huilage & Lubrification",
      icon: <Droplet className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      description: "Maîtrisez les protocoles d'huilage pour garantir la longévité et la précision des mécanismes.",
      slug: "/pratique/huilage",
    },
    {
      title: "Outils & Équipement",
      icon: <Hammer className="w-6 h-6 text-red-600 dark:text-red-400" />,
      description: "Découvrez le guide complet des outils indispensables et les meilleures pratiques pour les utiliser.",
      slug: "/pratique/outils",
    },
  ];

  const maitrise = [
    {
      title: "Réglage & Précision",
      icon: <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />,
      description: "Affinez vos compétences en réglage du balancier et de l'échappement pour une performance optimale.",
      slug: "/pratique/reglage",
    },
    {
      title: "Fiches Techniques",
      icon: <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
      description: "Accédez à une bibliothèque de documents techniques détaillés pour une multitude de mouvements.",
      slug: "/pratique/fiches",
    },
    {
      title: "Certifications",
      icon: <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      description: "Explorez les standards et les parcours professionnels pour une reconnaissance dans l'horlogerie suisse.",
      slug: "/pratique/certifications",
    },
    {
      title: "Guide pour Gauchers",
      icon: <HandMetal className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      description: "Découvrez des solutions concrètes et des adaptations spécifiquement conçues pour les horlogers gauchers.",
      slug: "/pratique/gauchers",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 text-slate-900 dark:text-white transition-colors duration-500 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Hero />

        <div className="space-y-24">
          <LearningPathSection title="Les Fondamentaux" items={fondamentaux} delay={0.2} />
          <LearningPathSection title="Maîtrise & Spécialisation" items={maitrise} delay={0.5} />
        </div>
        
        {/* Section Flashcards mise en avant */}
        <motion.div 
          className="mt-32 p-12 bg-slate-900 dark:bg-slate-950 rounded-3xl shadow-2xl text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Entraînez-vous : Flashcards <span className="text-cyan-400">ETA 6497</span>
          </h2>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
            Testez et consolidez vos connaissances sur les pièces et fonctions du mouvement ETA 6497 avec nos cartes mémoire interactives.
          </p>
          <Flashcards6497 />
        </motion.div>
      </div>
    </section>
  );
}
