"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Calendar, Award, Search } from "lucide-react";

interface Personnalite {
  nom: string;
  epoque: string;
  specialite: string;
  description: string;
  image: string;
  contribution: string;
}

const personnalites: Personnalite[] = [
  {
    nom: "Abraham-Louis Breguet",
    epoque: "1747-1823",
    specialite: "Inventeur du tourbillon",
    description: "Horloger français considéré comme le plus grand horloger de tous les temps. Inventeur du tourbillon, du ressort spiral Breguet, et pionnier de nombreuses innovations horlogères.",
    image: "/img/personnalites/breguet.jpg",
    contribution: "Tourbillon, échappement naturel, spiral Breguet"
  },
  {
    nom: "Hans Wilsdorf",
    epoque: "1881-1960",
    specialite: "Fondateur de Rolex",
    description: "Entrepreneur visionnaire qui fonda Rolex en 1905. Pionnier du marketing horloger et de la certification chronométrique. Créateur de l'Oyster, première montre étanche.",
    image: "/img/personnalites/wilsdorf.jpg",
    contribution: "Rolex Oyster, marketing horloger, certification COSC"
  },
  {
    nom: "Antoni Patek",
    epoque: "1812-1877",
    specialite: "Co-fondateur Patek Philippe",
    description: "Horloger polonais qui fonda avec Adrien Philippe la manufacture Patek Philippe en 1851. Symbole de l'excellence horlogère suisse et de la haute horlogerie.",
    image: "/img/personnalites/patek.jpg",
    contribution: "Patek Philippe, complications, montres de prestige"
  },
  {
    nom: "George Daniels",
    epoque: "1926-2011",
    specialite: "Maître horloger indépendant",
    description: "Horloger britannique légendaire, créateur de l'échappement co-axial. Un des rares horlogers capables de fabriquer entièrement une montre à la main.",
    image: "/img/personnalites/daniels.jpg",
    contribution: "Échappement co-axial, horlogerie artisanale"
  },
  {
    nom: "John Harrison",
    epoque: "1693-1776",
    specialite: "Inventeur du chronomètre de marine",
    description: "Horloger britannique qui révolutionna la navigation maritime en créant le chronomètre H4, permettant de calculer la longitude en mer avec précision.",
    image: "/img/personnalites/harrison.jpg",
    contribution: "Chronomètre de marine, précision horlogère"
  },
  {
    nom: "Seiko Hattori",
    epoque: "1860-1934",
    specialite: "Fondateur de Seiko",
    description: "Entrepreneur japonais qui fonda Seiko en 1881. Révolutionna l'horlogerie mondiale avec l'invention de la montre à quartz en 1969.",
    image: "/img/personnalites/hattori.jpg",
    contribution: "Seiko, montre à quartz, révolution horlogère"
  }
];

export default function PersonnalitesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpoque, setSelectedEpoque] = useState("Toutes");

  const epoques = ["Toutes", "XVIIIe siècle", "XIXe siècle", "XXe siècle"];

  const filteredPersonnalites = personnalites.filter(p => {
    const matchSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.specialite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEpoque = selectedEpoque === "Toutes" || p.epoque.includes(selectedEpoque.match(/\d+/)?.[0] || "");
    return matchSearch && matchEpoque;
  });

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-neutral-900 via-amber-950/20 to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 ring-1 ring-amber-500/30 mb-6">
            <User className="w-8 h-8 text-amber-400" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent mb-4">
            Personnalités Horlogères Légendaires
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto">
            Découvrez les hommes qui ont révolutionné l'art de mesurer le temps et façonné l'histoire de l'horlogerie mondiale
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input
              type="text"
              placeholder="Rechercher une personnalité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>
          <select
            value={selectedEpoque}
            onChange={(e) => setSelectedEpoque(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer"
          >
            {epoques.map(epoque => (
              <option key={epoque} value={epoque} className="bg-neutral-900">
                {epoque}
              </option>
            ))}
          </select>
        </div>

        {/* Grille de personnalités - RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredPersonnalites.map((perso, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 bg-gradient-to-br from-amber-900/20 to-orange-900/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent z-10" />
                <Image
                  src={perso.image}
                  alt={perso.nom}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                />
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-xs font-semibold text-amber-300">
                  {perso.epoque}
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    {perso.specialite}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {perso.nom}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {perso.description}
                </p>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-xs text-neutral-500 mb-1">Contributions majeures :</p>
                  <p className="text-sm text-amber-400 font-medium">
                    {perso.contribution}
                  </p>
                </div>
              </div>

              {/* Effet hover subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredPersonnalites.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">Aucune personnalité trouvée avec ces critères.</p>
          </div>
        )}

        {/* Footer section */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-sm text-neutral-500 italic">
            Ces horlogers ont marqué l'histoire et inspirent encore aujourd'hui les artisans du temps.
          </p>
        </div>
      </div>
    </section>
  );
}
