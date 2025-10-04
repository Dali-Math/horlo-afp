"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Library, Download, ExternalLink } from "lucide-react";

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  isExternal?: boolean;
}

const ResourceCard = ({ icon, title, description, link, isExternal = true }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="relative bg-dark-800/60 backdrop-blur-sm border border-gold-500/20 rounded-lg p-6 h-full transition-all duration-300 hover:border-gold-500/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
        {/* Icon */}
        <div className="mb-4 text-gold-500 group-hover:text-gold-400 transition-colors">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-['Bebas_Neue'] text-2xl text-gold-500 mb-3 tracking-wide">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        {/* Button */}
        <a
          href={link}
          target={isExternal ? "_blank" : "_self"}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-md text-gold-500 text-sm font-medium hover:bg-gold-500/20 hover:border-gold-500/50 transition-all duration-300 group/btn"
        >
          <span>{isExternal ? "Accéder" : "Télécharger"}</span>
          {isExternal ? (
            <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          ) : (
            <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
          )}
        </a>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-500/0 via-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:via-gold-500/10 group-hover:to-gold-500/5 transition-all duration-300 pointer-events-none" />
      </div>
    </motion.div>
  );
};

export default function LibrarySection() {
  const resources = [
    {
      icon: <Library className="w-12 h-12" />,
      title: "Bibliothèque FHH",
      description: "Accédez à la collection complète de la Fondation de la Haute Horlogerie avec des ouvrages de référence et publications spécialisées.",
      link: "https://www.hautehorlogerie.org/fr/encyclopedie/",
      isExternal: true,
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Glossaire Technique",
      description: "Dictionnaire complet des termes horlogers, complications et techniques de fabrication pour maîtriser le vocabulaire professionnel.",
      link: "#",
      isExternal: false,
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "WOSTEP Docs",
      description: "Documentation officielle et ressources pédagogiques de la Watchmakers of Switzerland Training and Educational Program.",
      link: "https://wostep.ch/",
      isExternal: true,
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Livres Anciens",
      description: "Collection de traités historiques et manuscrits d'horlogerie numérisés, témoins de l'évolution de l'art horloger.",
      link: "#",
      isExternal: false,
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-dark-950 to-dark-970 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-['Bebas_Neue'] text-5xl md:text-6xl text-center mb-6 tracking-wider"
        >
          <span className="bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
            📚 Ressources & Livres
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16"
        >
          Explore les ressources techniques, dictionnaires et ouvrages de référence en horlogerie.
        </motion.p>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
