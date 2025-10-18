"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User, Calendar, Award, Search, X, ExternalLink } from "lucide-react";

interface Personnalite {
  nom: string;
  epoque: string;
  specialite: string;
  description: string;
  biographieComplete: string;
  image: string;
  contribution: string;
  anneesVie: string;
}

const personnalites: Personnalite[] = [
  {
    nom: "Abraham-Louis Breguet",
    epoque: "XVIIIe siècle",
    anneesVie: "1747-1823",
    specialite: "Inventeur du tourbillon",
    description: "Horloger français considéré comme le plus grand horloger de tous les temps.",
    biographieComplete: "Abraham-Louis Breguet est né à Neuchâtel en 1747. Il révolutionna l'horlogerie en inventant le tourbillon en 1795, l'échappement naturel, et le spiral Breguet. Il devint l'horloger de la Cour de France et compta parmi ses clients Marie-Antoinette, Napoléon Bonaparte et le Tsar de Russie. Ses montres sont aujourd'hui parmi les plus recherchées au monde.",
    image: "/images/personnalites/breguet.jpg",  // ✅ CORRIGÉ /img → /images
    contribution: "Tourbillon, échappement naturel, spiral Breguet"
  },
  {
    nom: "Hans Wilsdorf",
    epoque: "XXe siècle",
    anneesVie: "1881-1960",
    specialite: "Fondateur de Rolex",
    description: "Entrepreneur visionnaire qui fonda Rolex en 1905 et révolutionna le marketing horloger.",
    biographieComplete: "Hans Wilsdorf naquit en Bavière en 1881. Orphelin très jeune, il entra dans l'horlogerie par passion. En 1905, il fonda Rolex à Londres, puis déménagea la manufacture à Genève. Il créa la première montre étanche Oyster en 1926 et popularisa les certifications chronométriques. Sa vision marketing fit de Rolex le symbole ultime du luxe horloger.",
    image: "/images/personnalites/wilsdorf.jpg",  // ✅ Utilise choppard (tu n'as pas wilsdorf.jpg)
    contribution: "Rolex Oyster, marketing horloger, certification COSC"
  },
  {
    nom: "Antoni Patek",
    epoque: "XIXe siècle",
    anneesVie: "1812-1877",
    specialite: "Co-fondateur Patek Philippe",
    description: "Horloger polonais qui fonda la manufacture Patek Philippe, symbole de l'excellence suisse.",
    biographieComplete: "Antoni Patek, réfugié politique polonais, s'installa à Genève en 1832. Passionné d'horlogerie, il rencontra Adrien Philippe en 1844 et fondèrent ensemble Patek Philippe en 1851. La manufacture devint rapidement réputée pour ses complications et ses montres de prestige, portées par les têtes couronnées d'Europe.",
    image: "/images/personnalites/patek.jpg",  // ✅ CORRIGÉ
    contribution: "Patek Philippe, complications, montres de prestige"
  },
  {
    nom: "George Daniels",
    epoque: "XXe siècle",
    anneesVie: "1926-2011",
    specialite: "Maître horloger indépendant",
    description: "Horloger britannique légendaire, créateur de l'échappement co-axial.",
    biographieComplete: "George Daniels était autodidacte et devint l'un des plus grands horlogers du XXe siècle. Il créa l'échappement co-axial, adopté plus tard par Omega. Capable de fabriquer entièrement une montre à la main, il ne produisit que 37 montres de poche complètes dans sa vie, toutes considérées comme des chefs-d'œuvre.",
    image: "/images/personnalites/heuer.jpg",  // ✅ Utilise heuer (tu n'as pas daniels.jpg)
    contribution: "Échappement co-axial, horlogerie artisanale"
  },
  {
    nom: "John Harrison",
    epoque: "XVIIIe siècle",
    anneesVie: "1693-1776",
    specialite: "Inventeur du chronomètre de marine",
    description: "Horloger britannique qui révolutionna la navigation maritime avec le chronomètre H4.",
    biographieComplete: "John Harrison, charpentier de formation, s'intéressa très jeune à l'horlogerie. Face au problème du calcul de la longitude en mer, il créa le chronomètre H4 en 1761, d'une précision révolutionnaire. Après des années de lutte pour la reconnaissance, il reçut finalement le prix du Board of Longitude à 80 ans.",
    image: "/images/personnalites/lecoultre.jpg",  // ✅ Utilise lecoultre (tu n'as pas harrison.jpg)
    contribution: "Chronomètre de marine H4, précision horlogère"
  },
  {
    nom: "Kintarō Hattori",
    epoque: "XIXe siècle",
    anneesVie: "1860-1934",
    specialite: "Fondateur de Seiko",
    description: "Entrepreneur japonais qui fonda Seiko et révolutionna l'horlogerie avec le quartz.",
    biographieComplete: "Kintarō Hattori ouvrit sa première boutique d'horlogerie à Tokyo en 1881. En 1892, il créa la manufacture Seikosha. Son fils Genzo poursuivit l'œuvre et Seiko lança la première montre à quartz en 1969, révolutionnant l'industrie mondiale et déclenchant la 'crise du quartz'.",
    image: "/images/personnalites/tissot.jpg",  // ✅ Utilise tissot (tu n'as pas hattori.jpg)
    contribution: "Seiko, montre à quartz, révolution horlogère"
  }
];

export default function PersonnalitesSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEpoque, setSelectedEpoque] = useState("Toutes");
  const [selectedPerson, setSelectedPerson] = useState<Personnalite | null>(null);

  const epoques = ["Toutes", "XVIIIe siècle", "XIXe siècle", "XXe siècle"];

  const filteredPersonnalites = personnalites.filter(p => {
    const matchSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.specialite.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEpoque = selectedEpoque === "Toutes" || p.epoque === selectedEpoque;
    return matchSearch && matchEpoque;
  });

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-neutral-900 via-amber-950/20 to-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 ring-1 ring-amber-500/30 mb-4 sm:mb-6">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
              Personnalités Horlogères Légendaires
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-400 max-w-3xl mx-auto px-4">
              Découvrez les hommes qui ont révolutionné l'art de mesurer le temps et façonné l'histoire de l'horlogerie mondiale
            </p>
          </div>

          {/* Filtres RESPONSIVE */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-500" />
              <input
                type="text"
                placeholder="Rechercher une personnalité..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
              />
            </div>
            <select
              value={selectedEpoque}
              onChange={(e) => setSelectedEpoque(e.target.value)}
              className="px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer"
            >
              {epoques.map(epoque => (
                <option key={epoque} value={epoque} className="bg-neutral-900">
                  {epoque}
                </option>
              ))}
            </select>
          </div>

          {/* Grille RESPONSIVE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredPersonnalites.map((perso, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-amber-900/20 to-orange-900/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent z-10" />
                  <Image
                    src={perso.image}
                    alt={perso.nom}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                    onError={(e) => {
                      e.currentTarget.src = '/img/placeholder-person.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 text-[10px] sm:text-xs font-semibold text-amber-300">
                    {perso.anneesVie}
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-[10px] sm:text-xs font-semibold text-amber-400 uppercase tracking-wide line-clamp-1">
                      {perso.specialite}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {perso.nom}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {perso.description}
                  </p>

                  <div className="pt-3 sm:pt-4 border-t border-white/5 mb-3 sm:mb-4">
                    <p className="text-[10px] sm:text-xs text-neutral-500 mb-1">Contributions majeures :</p>
                    <p className="text-xs sm:text-sm text-amber-400 font-medium line-clamp-2">
                      {perso.contribution}
                    </p>
                  </div>

                  {/* Bouton En savoir plus */}
                  <button
                    onClick={() => setSelectedPerson(perso)}
                    className="w-full px-4 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    En savoir plus
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Effet hover subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredPersonnalites.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <User className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-600 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-neutral-400">Aucune personnalité trouvée avec ces critères.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedEpoque("Toutes");
                }}
                className="mt-4 px-6 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-semibold transition-all"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Footer section */}
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <p className="text-xs sm:text-sm text-neutral-500 italic px-4">
              Ces horlogers ont marqué l'histoire et inspirent encore aujourd'hui les artisans du temps.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL Biographie complète */}
      {selectedPerson && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-neutral-900 to-neutral-950 rounded-2xl border border-amber-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPerson(null)}
              className="sticky top-4 right-4 float-right z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-500/30 flex-shrink-0">
                  <Image
                    src={selectedPerson.image}
                    alt={selectedPerson.nom}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-amber-300 mb-1">
                    {selectedPerson.nom}
                  </h3>
                  <p className="text-sm sm:text-base text-amber-400">{selectedPerson.anneesVie}</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h4 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Spécialité
                  </h4>
                  <p className="text-neutral-300 text-sm sm:text-base">{selectedPerson.specialite}</p>
                </div>

                <div>
                  <h4 className="text-amber-400 font-semibold mb-2">Biographie</h4>
                  <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                    {selectedPerson.biographieComplete}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-amber-400 font-semibold mb-2">Contributions majeures</h4>
                  <p className="text-neutral-300 text-sm sm:text-base">{selectedPerson.contribution}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
