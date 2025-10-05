"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const resources = [
  {
    name: "Fondation de la Haute Horlogerie",
    description: "Institution internationale dédiée à la promotion de l'horlogerie fine",
    url: "https://www.hautehorlogerie.org",
    logo: "FHH"
  },
  {
    name: "Fédération de l'Horlogerie Suisse",
    description: "Association professionnelle représentant l'industrie horlogère suisse",
    url: "https://www.fhs.swiss",
    logo: "FH"
  },
  {
  name: "Attestation fédérale de formation professionnelle (AFP)",
  description: "Formation professionnelle suisse reconnue par la Confédération, centrée sur la pratique et la microtechnique.",
  url: "https://www.orientation.ch/dyn/show/2101",
  logo: "AFP",
  },
  {
    name: "Musée International d'Horlogerie",
    description: "Plus importante collection horlogère au monde à La Chaux-de-Fonds",
    url: "https://www.chaux-de-fonds.ch/musees/mih",
    logo: "MIH"
  },
  {
    name: "Patek Philippe Museum",
    description: "Musée dédié à l'histoire de l'horlogerie et aux montres Patek Philippe",
    url: "https://www.patekmuseum.com",
    logo: "PP"
  },
  {
    name: "CIFOM – École d'Horlogerie (CPNE)",
  description: "Centre d’horlogerie intégré au CPNE, formation professionnelle en horlogerie et microtechnique.",
  url: "https://www.cpne.ch/",
  logo: "CIFOM"
  },
  {
    name: "Écoles Techniques - Le Locle",
    description: "Formation horlogère de référence dans le berceau de l'horlogerie",
    url: "https://www.cpnv.ch",
    logo: "ETLL"
  },
  {
    name: "HES-SO Genève - Microtechniques",
    description: "Haute école spécialisée en microtechniques et horlogerie",
    url: "https://www.hesge.ch/hepia",
    logo: "HEPIA"
  }
];

export default function RessourcesSuisse() {
  return (
    <section className="py-20 px-6 bg-[#111]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4"
          >
            Ressources Officielles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-3xl mx-auto"
          >
            Institutions, musées et écoles de référence dans l'univers horloger suisse
          </motion.p>
        </div>

        {/* Grid of Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <motion.a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#1A1A1A] p-6 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-300 hover:shadow-[0_0_30px_rgba(226,180,79,0.3)] cursor-pointer"
            >
              {/* Logo */}
              <div className="mb-4 flex items-center justify-center h-16">
                <div className="text-white/90 group-hover:text-[#E2B44F] transition-colors duration-300 text-center font-bold text-2xl tracking-wider">
                  {resource.logo}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[#FFD700] group-hover:text-[#E2B44F] transition-colors duration-300 leading-tight">
                    {resource.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-[#E2B44F] transition-colors duration-300 flex-shrink-0 mt-1" />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {resource.description}
                </p>
              </div>

              {/* Bottom accent line */}
              <div className="mt-4 pt-4 border-t border-[#E2B44F]/10 group-hover:border-[#E2B44F]/40 transition-colors duration-300">
                <span className="text-xs text-gray-500 group-hover:text-[#E2B44F] transition-colors duration-300 flex items-center gap-1">
                  Visiter le site
                  <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
