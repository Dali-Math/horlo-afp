

"use client";

import React, { useState, useMemo } from "react";
import { Metadata } from "next";
import Link from "next/link";

// ============================================================================
// METADATA & SEO
// ============================================================================

export const metadata: Metadata = {
  title: "Complications Horlogères Suisses | Encyclopédie HorloLearn",
  description: "L'encyclopédie ultime des complications horlogères suisses.",
};

// Types
type Difficulty = 1 | 2 | 3 | 4 | 5;
type Category = "classique" | "haute" | "majeure" | "astronomique";
type Rarity = "courante" | "rare" | "très rare" | "unique";

interface Complication {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  difficulty: Difficulty;
  icon: string;
  description: string;
  invention: string;
  inventor: string;
  swissManufacturers: string[];
  priceRange: string;
  rarity: Rarity;
  components: number;
   technicalSpecs?: string[];
}

// Données complètes
const complicationsDatabase: Complication[] = [
  {
    id: "quantieme",
    name: "Quantième",
    nameEn: "Date",
    category: "classique",
    difficulty: 2,
    icon: "📅",
    description: "La complication la plus répandue. Du simple dateur sautant au quantième perpétuel avec gestion mécanique des années bissextiles jusqu'en 2100.",
    invention: "1915",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Rolex", "Omega", "Vacheron Constantin"],
    priceRange: "5'000 - 150'000 CHF",
    rarity: "courante",
    components: 300,
  },
  {
    id: "chronographe",
    name: "Chronographe",
    nameEn: "Chronograph",
    category: "classique",
    difficulty: 3,
    icon: "⏱️",
    description: "Complication sportive par excellence. Mesure des intervalles de temps avec activation/désactivation via poussoirs.",
    invention: "1862",
    inventor: "Adolphe Nicole",
    swissManufacturers: ["Zenith", "Rolex", "Omega", "TAG Heuer", "Breitling"],
    priceRange: "8'000 - 500'000 CHF",
    rarity: "courante",
    components: 400,
  },
  {
    id: "phases-lune",
    name: "Phases de Lune",
    nameEn: "Moon Phase",
    category: "classique",
    difficulty: 2,
    icon: "🌙",
    description: "Reproduit le cycle synodique lunaire de 29 jours avec une précision remarquable.",
    invention: "1925",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Jaeger-LeCoultre", "Omega"],
    priceRange: "10'000 - 100'000 CHF",
    rarity: "rare",
    components: 250,
  },
  {
    id: "tourbillon",
    name: "Tourbillon",
    nameEn: "Tourbillon",
    category: "haute",
    difficulty: 5,
    icon: "🌀",
    description: "Cage rotative contenant le balancier, l'échappement et le ressort spiral. Compense les effets de la gravité.",
    invention: "1801",
    inventor: "Abraham-Louis Breguet (Genève)",
    swissManufacturers: ["Audemars Piguet", "Patek Philippe", "Vacheron Constantin", "Omega", "TAG Heuer", "Breguet"],
    priceRange: "50'000 - 2'000'000 CHF",
    rarity: "rare",
    components: 500,
  },
  {
    id: "calendrier-perpetuel",
    name: "Calendrier Perpétuel",
    nameEn: "Perpetual Calendar",
    category: "haute",
    difficulty: 5,
    icon: "🗓️",
    description: "Gère automatiquement les mois de 28-31 jours et les années bissextiles jusqu'en 2100 sans correction.",
    invention: "1884",
    inventor: "Patek Philippe",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "IWC", "Jaeger-LeCoultre"],
    priceRange: "50'000 - 500'000 CHF",
    rarity: "très rare",
    components: 600,
  },
  {
    id: "equation-temps",
    name: "Équation du Temps",
    nameEn: "Equation of Time",
    category: "astronomique",
    difficulty: 5,
    icon: "☀️",
    description: "Affiche la différence entre le temps solaire vrai et le temps moyen (±16 minutes/an).",
    invention: "1660",
    inventor: "Christiaan Huygens",
    swissManufacturers: ["Vacheron Constantin", "Audemars Piguet", "Breguet", "Patek Philippe"],
    priceRange: "150'000 - 1'000'000 CHF",
    rarity: "très rare",
    components: 550,
  },
  {
    id: "sonnerie",
    name: "Sonnerie",
    nameEn: "Minute Repeater",
    category: "majeure",
    difficulty: 5,
    icon: "🔔",
    description: "Sonne les heures, quarts et minutes à la demande via des marteaux frappant des timbres. Musique mécanique pure.",
    invention: "1750",
    inventor: "Breguet",
    swissManufacturers: ["Patek Philippe", "Vacheron Constantin", "Audemars Piguet", "Jaeger-LeCoultre", "F.P. Journe"],
    priceRange: "300'000 - 3'000'000 CHF",
    rarity: "unique",
    components: 800,
  },
  {
    id: "reveil-mecanique",
    name: "Réveil Mécanique",
    nameEn: "Mechanical Alarm",
    category: "haute",
    difficulty: 3,
    icon: "⏰",
    description: "Émet un son vibrant à l'heure programmée. Ancêtre du réveil moderne.",
    invention: "1947",
    inventor: "Vulcain",
    swissManufacturers: ["Vulcain", "Jaeger-LeCoultre", "Breguet"],
    priceRange: "8'000 - 50'000 CHF",
    rarity: "rare",
    components: 350,
  },
  {
    id: "gmt-heure-multiple",
    name: "GMT / Heure Multiple",
    nameEn: "GMT / Dual Time",
    category: "classique",
    difficulty: 2,
    icon: "🌍",
    description: "Affiche 2 ou 3 fuseaux horaires simultanément. Indispensable pour les voyageurs et pilotes.",
    invention: "1955",
    inventor: "Rolex",
    swissManufacturers: ["Rolex", "Omega", "Breitling", "Patek Philippe", "Vacheron Constantin"],
    priceRange: "8'000 - 50'000 CHF",
    rarity: "courante",
    components: 200,
  },
  {
    id: "fusee-chainette",
    name: "Fusee & Chainette",
    nameEn: "Constant Force",
    category: "majeure",
    difficulty: 5,
    icon: "⚡",
    description: "Système antique garantissant une force constante au balancier. Retour en grâce moderne pour la précision absolue.",
    invention: "1525",
    inventor: "Horlogers allemands",
    swissManufacturers: ["Breguet", "Zenith", "Romain Gauthier", "F.P. Journe", "Ferdinand Berthoud"],
    priceRange: "150'000 - 1'500'000 CHF",
    rarity: "unique",
    components: 900,
  },
];

const manufacturersDatabase = [
  { name: "Patek Philippe", foundation: 1839, specialties: ["Sonnerie", "Quantième Perpétuel", "Chronographe"], headquarters: "Genève" },
  { name: "Vacheron Constantin", foundation: 1755, specialties: ["Tourbillon", "Calendrier", "Métiers d'Art"], headquarters: "Plan-les-Ouates" },
  { name: "Audemars Piguet", foundation: 1875, specialties: ["Tourbillon", "Royal Oak", "Haute Joaillerie"], headquarters: "Le Brassus" },
  { name: "Rolex", foundation: 1905, specialties: ["Chronographe", "GMT", "Datejust"], headquarters: "Genève" },
  { name: "Omega", foundation: 1848, specialties: ["Chronographe", "Tourbillon", "Spacemaster"], headquarters: "Bienne" },
  { name: "Jaeger-LeCoultre", foundation: 1833, specialties: ["Reverso", "Sonnerie", "Complications multiples"], headquarters: "Le Sentier" },
  { name: "Breguet", foundation: 1775, specialties: ["Tourbillon", "Sonnerie", "Tradition"], headquarters: "L'Abbaye" },
  { name: "Zenith", foundation: 1865, specialties: ["El Primero", "Chronographe", "Haute Fréquence"], headquarters: "Le Locle" },
];

// Composants UI
const DifficultyStars: React.FC<{ level: Difficulty }> = ({ level }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg key={star} className={`w-4 h-4 ${star <= level ? "text-yellow-500 fill-current" : "text-gray-300 dark:text-gray-600"}`} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const FilterBadge: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
      active
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
  >
    {children}
  </button>
);

const ComplicationCard: React.FC<{ complication: Complication; index: number }> = ({ complication, index }) => {
  const colorClasses = {
    classique: "border-blue-200 dark:border-blue-800 hover:border-blue-500 bg-blue-50 dark:bg-blue-900/20",
    haute: "border-purple-200 dark:border-purple-800 hover:border-purple-500 bg-purple-50 dark:bg-purple-900/20",
    majeure: "border-orange-200 dark:border-orange-800 hover:border-orange-500 bg-orange-50 dark:bg-orange-900/20",
    astronomique: "border-green-200 dark:border-green-800 hover:border-green-500 bg-green-50 dark:bg-green-900/20",
  };

  return (
    <Link href={`/theorie/complications/${complication.id}`}>
      <div className={`group border rounded-2xl p-6 flex flex-col transition-all hover:shadow-xl cursor-pointer ${colorClasses[complication.category]} h-full backdrop-blur-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl group-hover:scale-110 transition-transform">{complication.icon}</div>
          <div className="flex flex-col items-end gap-2">
            <DifficultyStars level={complication.difficulty} />
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              complication.rarity === "unique" 
                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                : complication.rarity === "très rare"
                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300"
                : complication.rarity === "rare"
                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300"
                : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
            }`}>
              {complication.rarity}
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {complication.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic">{complication.nameEn}</p>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
          {complication.description}
        </p>

        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-2">
            <p className="text-gray-500 dark:text-gray-400">Invention</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{complication.invention}</p>
            <p className="text-gray-600 dark:text-gray-300">{complication.inventor}</p>
          </div>
          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-2">
            <p className="text-gray-500 dark:text-gray-400">Prix</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{complication.priceRange}</p>
            <p className="text-gray-600 dark:text-gray-300">{complication.components} composants</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-auto">
          {complication.technicalSpecs?.slice(0, 3).map((spec) => (
            <span key={spec} className="text-xs px-2 py-1 bg-white/30 dark:bg-black/20 rounded-md text-gray-700 dark:text-gray-300">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Manufactures suisses</p>
          <div className="flex flex-wrap gap-1">
            {complication.swissManufacturers.slice(0, 4).map((m) => (
              <span key={m} className="text-xs bg-white/30 dark:bg-black/20 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function ComplicationsPage(): JSX.Element {
  const [filters, setFilters] = useState<{
  category: string;
  difficulty: number | "all";
  rarity: string;
  manufacturer: string;
  search: string;
}>({
  category: "all",
  difficulty: "all",
  rarity: "all",
  manufacturer: "all",
  search: "",
});

  const filteredComplications = useMemo(() => {
    return complicationsDatabase.filter((c) => {
      const matchCategory = filters.category === "all" || c.category === filters.category;
      const matchDifficulty =   filters.difficulty === "all" ||   c.difficulty === Number(filters.difficulty);
      const matchRarity = filters.rarity === "all" || c.rarity === filters.rarity;
      const matchManufacturer = filters.manufacturer === "all" || c.swissManufacturers.includes(filters.manufacturer);
      const matchSearch = filters.search === "" || 
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.nameEn.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.swissManufacturers.some(m => m.toLowerCase().includes(filters.search.toLowerCase()));
      
      return matchCategory && matchDifficulty && matchRarity && matchManufacturer && matchSearch;
    });
  }, [filters]);

  // Calcul simplifié sans erreur de regex
  const stats = {
    total: complicationsDatabase.length,
    unique: complicationsDatabase.filter(c => c.rarity === "unique").length,
    manufacturers: manufacturersDatabase.length,
    components: complicationsDatabase.reduce((acc, c) => acc + c.components, 0),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* EN-TÊTE */}
      <header className="text-center mb-16 max-w-6xl mx-auto">
        <div className="mb-6 flex justify-center gap-6 flex-wrap opacity-40">
          {["rolex", "omega", "patek", "audemars", "tag-heuer", "breguet"].map((brand) => (
            <div key={brand} className="w-16 h-16 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-600">{brand[0].toUpperCase()}</span>
            </div>
          ))}
        </div>

        <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
          Complications Horlogères Suisses
          <span className="block h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded mx-auto mt-4"></span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
          Explorez l'univers fascinant des complications horlogères suisses. 25+ complications détaillées, 500+ modèles référencés.
        </p>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 hover:shadow-lg transition-all">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Complications</p>
          </div>
          <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 hover:shadow-lg transition-all">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.unique}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Uniques</p>
          </div>
          <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 hover:shadow-lg transition-all">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.manufacturers}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manufactures</p>
          </div>
          <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 hover:shadow-lg transition-all">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{Math.round(stats.components / 1000)}k</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Composants</p>
          </div>
          <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 hover:shadow-lg transition-all">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">500+</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Modèles</p>
          </div>
        </div>
      </header>

      {/* FILTRES */}
      <section className="max-w-6xl mx-auto mb-12">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
          <input
            type="text"
            placeholder="Rechercher..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/20 text-gray-900 dark:text-gray-100 mb-6"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-semibold mb-3">Catégorie</p>
              <div className="flex flex-wrap gap-2">
                {["all", "classique", "haute", "majeure", "astronomique"].map((cat) => (
                  <FilterBadge key={cat} active={filters.category === cat} onClick={() => setFilters({ ...filters, category: cat as any })}>
                    {cat === "all" ? "Toutes" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </FilterBadge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Difficulté</p>
              <div className="flex flex-wrap gap-2">
                <FilterBadge active={filters.difficulty === "all"} onClick={() => setFilters({ ...filters, difficulty: "all" })}>Toutes</FilterBadge>
                {[1, 2, 3, 4, 5].map((level) => (
                  <FilterBadge
  key={level}
  active={filters.difficulty !== "all" && Number(filters.difficulty) === level}
  onClick={() => setFilters({ ...filters, difficulty: level })}
>
  {level} ★
</FilterBadge>

                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Rareté</p>
              <div className="flex flex-wrap gap-2">
                {["all", "courante", "rare", "très rare", "unique"].map((rarity) => (
                  <FilterBadge key={rarity} active={filters.rarity === rarity} onClick={() => setFilters({ ...filters, rarity: rarity as any })}>
                    {rarity === "all" ? "Toutes" : rarity}
                  </FilterBadge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold mb-3">Manufacture</p>
              <select
                value={filters.manufacturer}
                onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-black/20"
              >
                <option value="all">Toutes les manufactures</option>
                {manufacturersDatabase.map((m) => (
                  <option key={m.name} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">{filteredComplications.length} résultat(s)</p>
            <button onClick={() => setFilters({ category: "all", difficulty: "all", rarity: "all", manufacturer: "all", search: "" })} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              Réinitialiser
            </button>
          </div>
        </div>
      </section>

      {/* GRILLE DES COMPLICATIONS */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComplications.map((complication, index) => (
            <div key={complication.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` as any }}>
              <ComplicationCard complication={complication} index={index} />
            </div>
          ))}
        </div>

        {filteredComplications.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Aucun résultat</h3>
            <p className="text-gray-600 dark:text-gray-400">Ajustez vos filtres ou recherche</p>
          </div>
        )}
      </section>
      {/* Mention légale globale */}
<section className="max-w-4xl mx-auto mt-12 mb-16 text-center text-sm text-gray-500 dark:text-gray-400 italic">
  Les informations techniques, historiques et les fourchettes de prix présentées sur cette page sont fournies 
  à titre indicatif et peuvent varier selon les manufactures, les modèles et les périodes de production.
</section>

      {/* FOOTER CTA */}
      <footer className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-800/70 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Approfondissez votre passion</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/academy">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
              HorloLearn Academy
            </button>
          </Link>
          <Link href="/manufactures">
            <button className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
              Voir les manufactures
            </button>
          </Link>
        </div>
      </footer>

      {/* ANIMATIONS */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
