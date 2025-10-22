"use client";
import Link from "next/link";

const actualites = [
  {
    title: "Watches & Wonders 2026 : Dates confirmées",
    time: "Il y a 2 jours",
    category: "Événement",
    link: "/evenements",
  },
  {
    title: "Nouveau Calibre Sellita SW330-2 annoncé",
    time: "Il y a 5 jours",
    category: "Innovation",
    link: "/innovations",
  },
  {
    title: "Programmes horlogers officiels 2026 : mise à jour nationale",
    time: "Il y a 1 semaine",
    category: "Patrimoine",
    link: "/patrimoine",
  },
];

export default function ActualitesHorlogeres() {
  return (
    <section className="min-h-screen bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-2">
          <span className="dark:text-yellow-400 text-slate-800">Actualités </span>
          Horlogères
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Restez informé des dernières nouveautés
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {actualites.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="block p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:dark:border-yellow-400 hover:border-gray-400 transition-all duration-200 bg-gray-50 dark:bg-[#121212]"
            >
              <span className="inline-block text-sm bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-medium px-3 py-1 rounded-full mb-3">
                {item.category}
              </span>
              <h3 className="text-lg font-semibold mb-2 leading-snug dark:text-yellow-400 text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.time}</p>
            </Link>
          ))}
        </div>

        <div className="text-right mt-6">
          <Link
            href="/actualites"
            className="text-yellow-600 dark:text-yellow-400 hover:underline transition-all duration-200"
          >
            Voir tout →
          </Link>
        </div>
      </div>
    </section>
  );
}
