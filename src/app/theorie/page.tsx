"use client";
import HeroSection from "@/components/HeroSection";

export default function Theorie() {
  return (
    <section className="relative overflow-visible min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Montre de luxe statique */}
      <div className="absolute top-24 right-20 hidden md:block">
        <img
          src="/images/luxury_watch.png"
          alt="Montre de luxe Vacheron Constantin - HorloLearn"
          className="w-[320px] drop-shadow-[0_0_25px_rgba(226,180,79,0.6)] transition-transform duration-700 hover:scale-105 hover:drop-shadow-[0_0_40px_rgba(226,180,79,0.9)]"
        />
      </div>

      {/* Hero section */}
      <HeroSection />

      {/* Grille principale */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Cours Académiques */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#E2B44F]/40 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Cours Académiques</h3>
            </div>
            <ul className="space-y-3">
              <li>
                <a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="https://www.hautehorlogerie.org/fr/encyclopedie/" target="_blank">
                  Encyclopédie FHH
                </a>
              </li>
              <li>
                <a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="https://www.federation-horlogerie.ch/fr/formation" target="_blank">
                  Manuels FH
                </a>
              </li>
              <li>
                <a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/theorie/lecture-de-plan">
                  Lecture de plan
                </a>
              </li>
            </ul>
          </div>

          {/* Mouvements */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#E2B44F]/40 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Mouvements</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/theorie/mouvements">Mécaniques horlogers</a></li>
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/theorie/complications">Complications</a></li>
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/theorie/galerie-3d">Galerie 3D interactive</a></li>
            </ul>
          </div>

          {/* Restauration */}
          <div className="bg-white rounded-2xl shadow-lg border border-[#E2B44F]/40 hover:shadow-xl transition-all duration-300 p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#E2B44F] to-[#C4973F] rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Restauration</h3>
            </div>
            <ul className="space-y-3">
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/theorie/restauration">Techniques de restauration</a></li>
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/outils">Outils horlogers</a></li>
              <li><a className="text-blue-600 hover:text-[#E2B44F] transition-colors" href="/pratique">Fiches pratiques</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
