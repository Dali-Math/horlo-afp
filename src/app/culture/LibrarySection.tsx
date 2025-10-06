"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Library } from "lucide-react";

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
        <div className="mb-4 text-gold-500 group-hover:text-gold-400 transition-colors">
          {icon}
        </div>

        <h3 className="font-['Bebas_Neue'] text-2xl text-gold-500 mb-3 tracking-wide">
          {title}
        </h3>

        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        <iframe
          src={link}
          allow="autoplay"
          className="w-full h-64 rounded-md border border-gold-500/20 shadow-inner"
        />
      </div>
    </motion.div>
  );
};

export default function LibrarySection() {
  const resources = [
    {
      icon: <Library className="w-12 h-12" />,
      title: "L’Horlogerie suisse",
      description:
        "Un aperçu historique et technique de l’excellence horlogère helvétique.",
      link: "https://drive.google.com/file/d/1a6CVAT_aQ55yom734HTry25hbUWkSJKm/preview",
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Swiss Horlogerie 2019",
      description:
        "Document moderne présentant le savoir-faire, la précision et les métiers de l’horlogerie suisse.",
      link: "https://drive.google.com/file/d/1pc7-I4fklvulSWPLOvHtLrPS-JxnA2sq/preview",
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Manuel de quatrième classe",
      description:
        "Ressource pédagogique utilisée dans la formation horlogère suisse (AFP/CFC).",
      link: "https://drive.google.com/file/d/1q3A-AlPaD5Ro0Hc1T6EhM1HaMQxsfc5q/preview",
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Manuel de l’horloger (1863)",
      description:
        "Chef-d’œuvre classique de Louis M. Le Normand, couvrant théorie, échappements et réglages.",
      link: "https://drive.google.com/file/d/1-VmMkeg7FvgpJqUq7tMnLvRO4yQYQbFq/preview",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-dark-950 to-dark-970 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
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

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-gray-300 text-lg max-w-3xl mx-auto mb-16"
        >
          Consulte les ressources techniques et historiques de l’horlogerie suisse — accessibles directement en ligne.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard key={index} {...resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
