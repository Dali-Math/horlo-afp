"use client";
import { useState } from "react";

type Material = {
  icon: string;
  title: string;
  colorClass: string;
  illustration?: string; // Pour images si tu veux
  description: string;
  useCases: string[];
  category: "Classiques" | "Innovation" | "Décoratif";
};

const MATERIALS: Material[] = [
  {
    icon: "🟨",
    title: "Or",
    colorClass: "bg-yellow-400",
    category: "Classiques",
    description: "Métal précieux emblématique pour boîtiers, aiguilles et mouvements de prestige. Alliages spécifiques (rose, jaune, blanc) pour varier style et résistance.",
    useCases: [
      "Boîtiers & bracelets de luxe",
      "Aiguilles et index",
      "Ponts décoratifs",
    ],
  },
  {
    icon: "⬜",
    title: "Acier inoxydable",
    colorClass: "bg-sky-400",
    category: "Classiques",
    description: "Le standard 316L : robuste, inaltérable, parfait pour montres du quotidien et sport. Donne une finition brillante ou satinée.",
    useCases: [
      "Boîtiers & bracelets",
      "Masses oscillantes",
      "Couronnes vissées",
    ],
  },
  {
    icon: "🥇",
    title: "Laiton",
    colorClass: "bg-yellow-700",
    category: "Classiques",
    description: "Alliage majoritaire des platines et roues, très usiné pour la base des calibres. Jaune, facile à usiner et décorer.",
    useCases: [
      "Platines, ponts, roues",
      "Ébauches et modules décoratifs",
    ],
  },
  {
    icon: "⚙️",
    title: "Titane",
    colorClass: "bg-indigo-500",
    category: "Innovation",
    description: "Très léger mais ultra résistant. Non magnétique, hypoallergénique, son aspect mat plaît aux amateurs de technologies.",
    useCases: [
      "Boîtiers technique/professionnel",
      "Vis et éléments de mouvement",
    ],
  },
  {
    icon: "⬛",
    title: "Céramique",
    colorClass: "bg-neutral-700",
    category: "Innovation",
    description: "Dureté extrême, inrayable, look hyper contemporain. Souvent utilisée pour lunettes/bagues de montres sportives.",
    useCases: [
      "Lunettes inrayables",
      "Boîtiers design premium",
    ],
  },
  {
    icon: "🔬",
    title: "Silicium",
    colorClass: "bg-pink-500",
    category: "Innovation",
    description: "Issu de la microtechnique, permet des pièces d'ultra-haute précision (spiral, ancre…) sans lubrifiant, totalement amagnétique.",
    useCases: [
      "Spiral balancier anti-magnétisme",
      "Ancre & roue d’échappement",
    ],
  },
  {
    icon: "💎",
    title: "Rubis synthétique",
    colorClass: "bg-rose-600",
    category: "Classiques",
    description: "Pierre choisie pour ses qualités anti-usure, placée sur tous les axes critiques du mouvement mécanique.",
    useCases: [
      "Palier d’axes (rouages, balancier)",
      "Roulette d’ancre",
    ],
  },
  {
    icon: "🌲",
    title: "Bois",
    colorClass: "bg-green-700",
    category: "Décoratif",
    description: "Rare ! Utilisé pour des cadrans d’artisan, démonstrateurs, ou décors vintage.",
    useCases: [
      "Cadrans artistiques",
      "Maquettes pédagogiques",
    ],
  },
];

const CATEGORIES = ["Tous", "Classiques", "Innovation", "Décoratif"] as const;
type Category = typeof CATEGORIES[number];

function MaterialCard({
  icon,
  title,
  colorClass,
  description,
  useCases,
  illustration,
}: Material) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-gray-800 shadow-xl relative overflow-hidden transition-transform hover:shadow-2xl hover:scale-105">
      <div className="absolute top-0 right-0 opacity-10 text-[9rem] pointer-events-none select-none group-hover:opacity-25 transition">
        {icon}
      </div>
      <div className="relative z-10 p-6">
        <div className="flex items-center mb-4">
          <div className={`${colorClass} text-white rounded-full p-3 text-2xl shadow-lg drop-shadow mr-4`}>
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        <p className="text-slate-700 dark:text-slate-300 mb-3 text-md leading-relaxed">{description}</p>
        <div>
          <span className="block uppercase text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-1">Applications</span>
          <ul className="list-disc pl-6 text-slate-700 dark:text-slate-200 text-sm space-y-1">
            {useCases.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </div>
        {/* Option illustration */}
        {illustration && (
          <img src={illustration} alt={title} className="w-full mt-4 rounded-xl shadow" />
        )}
      </div>
    </div>
  );
}

export default function MateriauxPage() {
  const [filter, setFilter] = useState<Category>("Tous");

  const filtered = filter === "Tous"
    ? MATERIALS
    : MATERIALS.filter(m => m.category === filter);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <header className="max-w-3xl mx-auto text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gold dark:text-yellow-400 mb-4 tracking-tight">
            Matériaux en Horlogerie Suisse
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-200 font-medium">
            Du savoir-faire traditionnel aux technologies de pointe, découvrez les matériaux qui façonnent les chefs-d’œuvre suisses.
          </p>
        </header>

        <nav className="flex justify-center gap-3 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all border border-transparent shadow ${filter === cat ? "bg-yellow-400 text-white" : "dark:bg-slate-800 bg-white hover:bg-yellow-200 hover:text-yellow-900 dark:hover:bg-yellow-600 dark:hover:text-white text-gray-800 dark:text-white"}`}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Cartes matériaux */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((material, i) => (
            <MaterialCard key={i} {...material} />
          ))}
        </section>

        {/* Résumé & pédagogie */}
        <section className="max-w-2xl mx-auto mt-16 bg-white/90 dark:bg-slate-900/80 rounded-xl px-7 py-8 shadow text-slate-900 dark:text-slate-100">
          <h2 className="text-2xl font-bold text-[#E2B44F] mb-2">À retenir</h2>
          <ul className="text-lg leading-relaxed list-disc pl-6 space-y-2 font-medium">
            <li>Tradition (or, acier, laiton) + Innovation (titane, céramique, silicium) = histoire vivante de l’horlogerie suisse.</li>
            <li>Choix du matériau = identité de la montre (luxueuse, sportive, technique, artistique...).</li>
            <li>Les finitions, traitements de surface et associations offrent des possibilités infinies !</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
