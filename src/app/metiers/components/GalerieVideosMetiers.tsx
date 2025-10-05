'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const galleryItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800&auto=format&fit=crop',
    alt: 'Atelier horloger suisse - Établi avec outils de précision',
    label: 'Atelier de précision'
  },
  {
    type: 'video',
    embedUrl: 'https://www.youtube.com/embed/yFBfKYHn0wM',
    alt: 'Formation AFP horlogerie - techniques de base',
    label: 'Formation AFP'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1587836374615-91d3a4c2c5d9?q=80&w=800&auto=format&fit=crop',
    alt: 'Outils horlogers de précision - pinces et tournevis',
    label: 'Outils de précision'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop',
    alt: 'Gestes techniques horlogerie - assemblage mouvement',
    label: 'Gestes techniques'
  },
  {
    type: 'video',
    embedUrl: 'https://www.youtube.com/embed/508-rmdY4jQ',
    alt: 'Gestes techniques horlogerie suisse - savoir-faire',
    label: 'Savoir-faire horloger'
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop',
    alt: 'Inspiration métier horloger - passion et excellence',
    label: 'Passion horlogère'
  }
];

export default function GalerieVideosMetiers() {
  return (
    <section className="py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Titre principal */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-[#E2B44F] text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Galerie & Vidéos des Métiers Horlogers
        </motion.h2>

        {/* Sous-titre */}
        <motion.p
          className="text-lg text-[#d1d1d1] text-center mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Découvrez la précision, le geste et la passion au cœur des ateliers suisses.
        </motion.p>

        {/* Grille 2x3 responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              className="group relative aspect-video bg-[#1A1A1A] rounded-lg overflow-hidden border-2 border-[#E2B44F]/20 hover:border-[#E2B44F] transition-all duration-500 hover:shadow-xl hover:shadow-[#E2B44F]/40 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {item.type === 'image' ? (
                <>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay avec label */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[#E2B44F] font-semibold text-lg">{item.label}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Iframe YouTube avec mode sombre */}
                  <iframe
                    src={`${item.embedUrl}?color=white&modestbranding=1&rel=0`}
                    title={item.alt}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  {/* Label vidéo */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#E2B44F] text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Vidéo
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Note finale */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-[#d1d1d1]/60 italic">
            Plongez dans l'univers de la haute horlogerie suisse à travers ces images et vidéos authentiques.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
