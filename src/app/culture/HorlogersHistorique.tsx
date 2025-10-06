'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Horloger {
  nom: string;
  anneeFondation?: string;
  ville?: string;
  bio: string;
  imageUrl: string;
}

export default function HorlogersHistorique() {
  const [horlogers, setHorlogers] = useState<Horloger[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load horlogers data from JSON file
    fetch('/data/horlogers.json')
      .then((res) => res.json())
      .then((data) => {
        setHorlogers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading horlogers data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="relative py-20 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-lg">Chargement des horlogers...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Animated Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2
            className="text-5xl md:text-6xl font-bebas text-[#E2B44F] mb-4"
            style={{
              textShadow: '0 0 30px rgba(226, 180, 79, 0.4), 0 0 60px rgba(226, 180, 79, 0.2)'
            }}
          >
            ⌚ Horlogers suisses du XIXᵉ au XXᵉ siècle
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto font-inter">
            Découvrez les maîtres horlogers qui ont façonné l'excellence suisse et marqué l'histoire de l'horlogerie mondiale.
          </p>
        </motion.div>

        {/* Horlogers Grid - 3 columns desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {horlogers.map((horloger, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-[#E2B44F]/20 hover:border-[#E2B44F]/50 transition-all duration-300"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Hover Glow Effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(226, 180, 79, 0.15) 0%, transparent 70%)'
                }}
              />

              {/* Image Container */}
              <div className="relative w-full h-48 bg-neutral-900 overflow-hidden">
                <Image
                  src={horloger.imageUrl}
                  alt={horloger.nom}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Name */}
                <h3
                  className="text-2xl font-bebas text-[#E2B44F] mb-2 group-hover:text-[#f0c97d] transition-colors duration-300"
                  style={{
                    textShadow: '0 0 20px rgba(226, 180, 79, 0.0)'
                  }}
                >
                  <span className="group-hover:drop-shadow-[0_0_20px_rgba(226,180,79,0.6)] transition-all duration-300">
                    {horloger.nom}
                  </span>
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-400">
                  {horloger.anneeFondation && (
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {horloger.anneeFondation}
                    </span>
                  )}
                  {horloger.ville && (
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {horloger.ville}
                    </span>
                  )}
                </div>

                {/* Bio */}
                <p className="text-gray-300 leading-relaxed text-sm font-inter line-clamp-3">
                  {horloger.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {horlogers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg font-inter">
              Aucun horloger disponible pour le moment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
