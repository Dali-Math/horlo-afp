"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, LineChart, Ruler, Grid, FileText, Cog } from "lucide-react";

export default function LectureDePlan() {
  const sections = [
    {
      icon: <Layers className="w-7 h-7 text-[#E2B44F]" />,
      title: "Vues Techniques",
      desc: "Comprendre les projections et coupes selon la norme ISO 128-3. Base de toute lecture de plan horloger.",
      href: "/theorie/lecture-de-plan/vues-techniques",
    },
    {
      icon: <LineChart className="w-7 h-7 text-[#E2B44F]" />,
      title: "Types de Lignes",
      desc: "Identifier les lignes de contour, d’axe, de coupe ou de cote selon la norme ISO 128-2.",
      href: "/theorie/lecture-de-plan/types-lignes",
    },
    {
      icon: <Ruler className="w-7 h-7 text-[#E2B44F]" />,
      title: "Cotes et Tolérances",
      desc: "Lecture et interprétation des cotes selon ISO 129-1 et des tolérances géométriques ISO 1101.",
      href: "/theorie/lecture-de-plan/cotes-tolerances",
    },
    {
      icon: <Grid className="w-7 h-7 text-[#E2B44F]" />,
      title: "Symboles Normalisés",
      desc: "Découvrir les symboles ISO 1302 et ISO 13715 utilisés pour indiquer la rugosité, les chanfreins et filetages.",
      href: "/theorie/lecture-de-plan/symboles-normalises",
    },
    {
      icon: <FileText className="w-7 h-7 text-[#E2B44F]" />,
      title: "Cartouche Horloger",
      desc: "Analyse du cartouche technique selon NIHS 7200/7201 : titre, échelle, matière et révision du dessin.",
      href: "/theorie/lecture-de-plan/cartouche-horloger",
    },
    {
      icon: <Cog className="w-7 h-7 text-[#E2B44F]" />,
      title: "Éléments d’Horlogerie",
      desc: "Étude des composants horlogers (roues, vis, axes) conformes aux standards NIHS.",
      href: "/theorie/lecture-de-plan/elements-horlogerie",
    },
  ];

  return (
    <section className="min-h-screen bg-[#0b1220] text-white py-16 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* --- Titre principal --- */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-[#E2B44F] mb-4 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Lecture de Plan Horloger
        </motion.h1>

        <motion.p
          className="text-center text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Découvrez les principes fondamentaux de la lecture de plans techniques selon les normes ISO et NIHS. 
          Chaque fiche est interactive et adaptée à la formation horlogère suisse.
        </motion.p>

        {/* --- Grille animée --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {sections.map((item) => (
            <motion.div
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
            >
              <Link
                href={item.href}
                className="group relative block bg-[#111827] border border-[#E2B44F33] 
                rounded-2xl p-6 hover:border-[#FFD96A] hover:bg-[#1a1f2e] 
                transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E2B44F33] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                <div className="relative flex flex-col gap-3">
                  <div>{item.icon}</div>
                  <h2 className="text-lg sm:text-xl font-semibold text-[#E2B44F] group-hover:text-[#FFD96A]">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 text-[15px] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Pied de page --- */}
        <motion.p
          className="text-sm text-gray-500 mt-16 border-t border-gray-700 pt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          © HorloLearn 2025 — Liens vers les normes ISO & NIHS.<br />
          Ces fiches sont des résumés pédagogiques destinés à la formation et à la culture horlogère suisse.
        </motion.p>
      </div>
    </section>
  );
}
