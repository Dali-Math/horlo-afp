"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const documents = [
  {
    id: 1,
    title: "📘 Métiers de l'Horlogerie",
    description:
      "Guide complet des métiers horlogers suisses : formations, compétences et carrières dans l'industrie.",
    slug: "metiers-horlogerie",
  },
  {
    id: 2,
    title: "📘 Rapport FHH 2024",
    description:
      "Rapport annuel de la Fédération de l'Horlogerie Suisse : chiffres clés et tendances du secteur.",
    slug: "rapport-fhh",
  },
];

export default function DocumentsGuidesSuisse() {
  return (
    <section className="py-20 px-6 bg-[#111]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-4 text-center">
          📘 Documents & Guides Suisses
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Ressources officielles et guides pratiques pour découvrir
          l'excellence horlogère suisse
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-[#1A1A1A] p-8 rounded-lg border border-[#E2B44F]/20 hover:border-[#E2B44F] hover:shadow-xl hover:shadow-[#E2B44F]/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#FFD700] mb-4 group-hover:text-[#E2B44F] transition-colors">
                {doc.title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {doc.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/suisse/livre/${doc.slug}`}
                  className="flex-1 px-4 py-3 bg-[#E2B44F] text-black font-semibold rounded hover:bg-[#FFD700] transition-colors text-center"
                >
                  📄 Consulter le document
                </Link>
                <Link
                  href={`/pdfs/${doc.slug}.pdf`}
                  download
                  className="flex-1 px-4 py-3 bg-transparent border border-[#E2B44F] text-[#E2B44F] font-semibold rounded hover:bg-[#E2B44F] hover:text-black transition-colors text-center"
                >
                  ⬇️ Télécharger le PDF
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
