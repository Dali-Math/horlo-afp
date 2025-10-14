"use client";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";

export default function Theorie() {
  return (
    <section className="min-h-screen bg-[#0B0B0C] text-white overflow-hidden">
      {/* Hero principal */}
      <HeroSection />

      {/* Contenu principal */}
      <motion.div
        className="max-w-7xl mx-auto px-6 py-20 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Cours Académiques */}
          <div className="bg-[#111] rounded-2xl border border-[#E2B44F]/30 hover:border-[#E2B44F] shadow-lg hover:shadow-[#E2B44F]/20 transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E2B44F]">Cours Académiques</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a className="hover:text-[#E2B44F]" href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank">
                  Encyclopédie FHH
                </a>
              </li>
              <li>
                <a className="hover:text-[#E2B44F]" href="https://www.federation-horlogerie.ch/fr/formation" target="_blank">
                  Manuels FH
                </a>
              </li>
              <li>
                <a className="hover:text-[#E2B44F]" href="/theorie/lecture-de-plan">
                  Lecture de plan
                </a>
              </li>
            </ul>
          </div>

          {/* Mouvements */}
          <div className="bg-[#111] rounded-2xl border border-[#E2B44F]/30 hover:border-[#E2B44F] shadow-lg hover:shadow-[#E2B44F]/20 transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E2B44F]">Mouvements</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li><a className="hover:text-[#E2B44F]" href="/theorie/mouvements">Mécaniques horlogers</a></li>
              <li><a className="hover:text-[#E2B44F]" href="/theorie/complications">Complications</a></li>
              <li><a className="hover:text-[#E2B44F]" href="/theorie/galerie-3d">Galerie 3D interactive</a></li>
            </ul>
          </div>

          {/* Restauration */}
          <div className="bg-[#111] rounded-2xl border border-[#E2B44F]/30 hover:border-[#E2B44F] shadow-lg hover:shadow-[#E2B44F]/20 transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#E2B44F]">Restauration</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li><a className="hover:text-[#E2B44F]" href="/theorie/restauration">Techniques de restauration</a></li>
              <li><a className="hover:text-[#E2B44F]" href="/outils">Outils horlogers</a></li>
              <li><a className="hover:text-[#E2B44F]" href="/pratique">Fiches pratiques</a></li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
