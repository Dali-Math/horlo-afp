"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface HistoryLink {
  title: string;
  description: string;
  url: string;
}

const historyLinks: HistoryLink[] = [
  {
    title: "Fondation de la Haute Horlogerie",
    description: "Encyclopédie complète de l'horlogerie: techniques, histoire, et biographies.",
    url: "https://www.hautehorlogerie.org/en/encyclopaedia/",
  },
  {
    title: "British Museum - Horology",
    description: "Collections historiques d'horloges et de montres du monde entier.",
    url: "https://www.britishmuseum.org/collection/galleries/horology",
  },
  {
    title: "Watch-Wiki",
    description: "Base de données collaborative sur les marques, calibres et artisans horlogers.",
    url: "https://watch-wiki.org/",
  },
];

const timelineEvents = [
  { year: "3500 BC", label: "Cadrans solaires" },
  { year: "1400", label: "Horloges mécaniques" },
  { year: "1510", label: "Montre portable" },
  { year: "1675", label: "Spiral réglant" },
  { year: "1755", label: "Échappement à ancre" },
  { year: "1839", label: "Patek Philippe" },
  { year: "1969", label: "Quartz" },
];

export default function HistorySection() {
  return (
    <section
      id="histoire"
      className="relative w-full bg-gradient-to-b from-dark-900 to-dark-950 py-16 px-4 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-light rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Left Column: Title, Intro, and Links */}
          <div className="lg:col-span-2 space-y-8">
            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-bebas text-5xl md:text-6xl text-gold animate-fade-in-up mb-4">
                🕰️ Histoire de l'horlogerie
              </h2>
              <p className="font-inter text-light-200 text-lg leading-relaxed max-w-2xl">
                Des cadrans solaires aux montres connectées, explorez les grandes
                étapes qui ont façonné l'art de mesurer le temps.
              </p>
            </motion.div>

            {/* Link Blocks with Vertical Separators */}
            <div className="grid md:grid-cols-3 gap-0 divide-x divide-gold/30">
              {historyLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
                  }}
                  className="group px-6 py-8 bg-dark-800/40 backdrop-blur-sm hover:bg-dark-800/60 transition-all duration-300 rounded-lg md:rounded-none first:rounded-l-lg last:rounded-r-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-oswald text-xl font-semibold text-gold-light group-hover:text-gold transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors flex-shrink-0 ml-2" />
                  </div>
                  <p className="font-inter text-sm text-light-200 leading-relaxed">
                    {link.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Decorative Timeline */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="sticky top-6 rounded-xl border border-gold/20 bg-dark-800/40 backdrop-blur-sm p-6 shadow-lg shadow-gold/10"
            >
              <h3 className="font-oswald text-lg font-semibold text-gold-light mb-6 text-center">
                Ligne du temps
              </h3>

              {/* Vertical Timeline */}
              <div className="relative">
                {/* Central golden line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/40 via-gold/60 to-gold/40"></div>

                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative flex items-center gap-4"
                    >
                      {/* Golden dot */}
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className="w-3 h-3 rounded-full bg-gold border-2 border-dark-800 shadow-lg shadow-gold/50 animate-glow z-10"
                      />
                      <div className="flex-1">
                        <div className="text-gold-light font-bebas text-sm">
                          {event.year}
                        </div>
                        <div className="text-light-200 font-inter text-xs">
                          {event.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="font-inter text-light-200/60 text-xs text-center mt-6">
                Jalons clés de l'horlogerie
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Golden Divider */}
      <div className="mt-16 h-0.5 w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
    </section>
  );
}
