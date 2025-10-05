"use client";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";

// Animation variants
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Timeline data
const timelineData = [
  { year: "1755", event: "Fondation de Vacheron Constantin à Genève", icon: "🏛️" },
  { year: "1839", event: "Patek Philippe : naissance du mouvement suisse moderne", icon: "⚙️" },
  { year: "1905", event: "Création de Rolex à Bienne / Genève", icon: "👑" },
  { year: "1970", event: "Crise du quartz, résistance des maisons suisses", icon: "⚡" },
  { year: "2000+", event: "Renaissance mécanique et haute horlogerie contemporaine", icon: "✨" },
];

// Institutions data
const institutions = [
  {
    name: "FHH – Fondation de la Haute Horlogerie",
    url: "https://www.hautehorlogerie.org/",
    description: "Organisation de référence pour la promotion de l'excellence horlogère",
  },
  {
    name: "WOSTEP – École de formation internationale",
    url: "https://www.wostep.ch/",
    description: "Formation d'élite pour horlogers professionnels",
  },
  {
    name: "MIH – Musée International d'Horlogerie",
    url: "https://www.mih.ch/",
    description: "La Chaux-de-Fonds – patrimoine horloger mondial",
  },
  {
    name: "FH Suisse – Fédération Horlogère",
    url: "https://www.fhs.swiss/",
    description: "Organisation faîtière de l'industrie horlogère suisse",
  },
];

// Documents data
const documents = [
  {
    title: "Guide des métiers d'horlogerie",
    icon: "📄",
    url: "/pdfs/metiers-horlogerie.pdf",
  },
  {
    title: "Rapport FHH sur l'innovation suisse",
    icon: "📄",
    url: "/pdfs/rapport-fhh.pdf.pdf",
  },
];

export default function SuissePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] text-gray-100">
      {/* 1. HERO SECTION */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="relative pt-32 pb-20 px-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/textures/metal-brushed.jpg')] opacity-5"></div>
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <motion.h1
            className="font-bebas text-6xl md:text-8xl tracking-wider mb-6"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 40px rgba(251, 191, 36, 0.3)",
            }}
          >
            🇨🇭 L'Horlogerie Suisse
          </motion.h1>
          <motion.h2
            className="font-bebas text-3xl md:text-4xl text-amber-400 mb-8"
            variants={fadeUpVariant}
          >
            Excellence et Tradition
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            variants={fadeUpVariant}
          >
            Découvrez l'histoire, les grandes manufactures, les savoir-faire et les écoles
            qui ont fait de la Suisse le berceau mondial de l'horlogerie.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-50"></div>
      </motion.section>

      {/* 2. TIMELINE SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-bebas text-5xl text-center text-amber-400 mb-16"
            variants={cardVariant}
          >
            📜 Histoire & Évolution
          </motion.h2>
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                className="relative bg-[#0b0c10] border border-amber-600/30 rounded-lg p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
              >
                <div className="flex items-center gap-6">
                  <div className="text-5xl">{item.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bebas text-3xl text-amber-400 mb-2">{item.year}</h3>
                    <p className="text-gray-300 text-lg">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 3. INSTITUTIONS & MAISONS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#0f0f0f]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="font-bebas text-5xl text-center text-amber-400 mb-4"
            variants={cardVariant}
          >
            🏛️ Institutions & Maisons emblématiques
          </motion.h2>
          <motion.p
            className="text-center text-gray-400 text-lg mb-16"
            variants={cardVariant}
          >
            Les piliers de l'excellence horlogère suisse
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {institutions.map((inst, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 40px rgba(251, 191, 36, 0.3)",
                }}
                className="bg-[#0b0c10] border border-amber-600/30 rounded-lg p-8 hover:border-amber-500 transition-all duration-300"
              >
                <h3 className="font-bebas text-2xl text-amber-400 mb-3">{inst.name}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{inst.description}</p>
                <a
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:scale-105"
                >
                  Visiter le site
                  <ExternalLink size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. DOCUMENTS & PDF */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-20 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-bebas text-5xl text-center text-amber-400 mb-16"
            variants={cardVariant}
          >
            📘 Documents & Guides suisses
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                variants={cardVariant}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col gap-4 bg-[#0b0c10] border border-amber-600/30 rounded-lg p-6 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,191,36,0.2)]"
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{doc.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-400 text-lg mb-1">{doc.title}</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300"
                  >
                    <ExternalLink size={18} />
                    Consulter le document
                  </a>
                  <a
                    href={doc.url}
                    download
                    className="text-sm text-gray-400 hover:text-amber-400 transition-colors duration-200 text-center"
                  >
                    <Download className="inline-block mr-1" size={14} />
                    Télécharger le PDF
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. CTA / COMMUNAUTÉ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        className="py-20 px-6 bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-bebas text-4xl md:text-5xl text-amber-400 mb-6"
            variants={fadeUpVariant}
          >
            🤝 Participez à la transmission
          </motion.h2>
          <motion.p
            className="text-gray-300 text-lg mb-10 leading-relaxed"
            variants={fadeUpVariant}
          >
            Participez à la transmission du savoir horloger suisse. Partagez vos sources,
            articles ou documents !
          </motion.p>
          <motion.a
            href="mailto:mathlouthi_mohamed82@yahoo.com?subject=Proposition de ressource horlogère suisse"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-lg rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
          >
            📤 Proposer une nouvelle ressource
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}
