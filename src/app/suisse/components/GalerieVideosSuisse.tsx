"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80",
    alt: "Atelier horloger suisse traditionnel",
    title: "Atelier Traditionnel",
  },
  {
    src: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    alt: "Montre suisse de luxe détail du mouvement",
    title: "Mouvement Mécanique",
  },
  {
    src: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    alt: "Outils d'horlogerie de précision",
    title: "Outils de Précision",
  },
  {
    src: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
    alt: "Gestes métiers horloger au travail",
    title: "Savoir-Faire Artisanal",
  },
  {
    src: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80",
    alt: "Détail rouages montre suisse",
    title: "Rouages & Complications",
  },
  {
    src: "https://images.unsplash.com/photo-1564594744081-8f2c8e6ae26f?w=800&q=80",
    alt: "Assemblage montre de luxe",
    title: "Assemblage Final",
  },
];

const videos = [
  { id: "jH_xsFruLro", title: "L'Art de l'Horlogerie Suisse" },
  { id: "8Y_XBmNOp7Y", title: "Fabrication d'une Montre Mécanique" },
];

export default function GalerieVideosSuisse() {
  return (
    <section className="py-20 px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] mb-12 text-center"
        >
          Galerie & Vidéos
        </motion.h2>

        {/* Galerie d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#E2B44F]/20 bg-[#1A1A1A] hover:border-[#E2B44F] transition-all duration-500"
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-[#E2B44F] group-hover:ring-inset transition-all duration-500 rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-[#E2B44F] font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vidéos YouTube */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden border border-[#E2B44F]/30 bg-black hover:border-[#E2B44F] transition-all duration-500 hover:shadow-[0_0_30px_rgba(226,180,79,0.3)]">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1&color=white`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#E2B44F]/80 group-hover:text-[#E2B44F] transition-colors duration-300 text-center">
                {video.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
