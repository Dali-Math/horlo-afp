"use client";

import React from "react";
import Link from "next/link";

// Tu peux ajouter les icônes Lucide selon ton design (en bonus pour + d'élégance)
import { Crown, Rocket, Gem, Star } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/histoire", label: "Histoire" },
  { href: "/theorie/manufactures", label: "Manufactures" },
  { href: "/innovations", label: "Innovations" }
];

const HERO_STATS = [
  { number: "175+", label: "ans d’histoire" },
  { number: "5", label: "manufactures de légende" },
  { number: "269", label: "innovations majeures" },
  { number: "🇨🇭", label: "Excellence suisse" }
];

const MANUFACTURES = [
  {
    name: "Patek Philippe",
    icon: "👑",
    founded: "1839",
    tagline: "Manufacture de prestige absolu",
    specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Complications"],
    color: "blue",
    slug: "patek-philippe"
  },
  {
    name: "Rolex",
    icon: "⚡",
    founded: "1905",
    tagline: "L’icône intemporelle",
    specialties: ["Oyster", "Submariner", "Daytona", "GMT-Master"],
    color: "green",
    slug: "rolex"
  },
  {
    name: "Audemars Piguet",
    icon: "🔷",
    founded: "1875",
    tagline: "L’avant-garde de l’horlogerie",
    specialties: ["Royal Oak", "Tourbillons", "Grandes complications"],
    color: "purple",
    slug: "audemars-piguet"
  },
  {
    name: "Vacheron Constantin",
    icon: "⭐",
    founded: "1755",
    tagline: "La plus ancienne manufacture",
    specialties: ["Patrimony", "Overseas", "Métiers d’Art"],
    color: "orange",
    slug: "vacheron-constantin"
  },
  {
    name: "Omega",
    icon: "🌙",
    founded: "1848",
    tagline: "Précision & conquête spatiale",
    specialties: ["Speedmaster", "Seamaster", "Constellation"],
    color: "red",
    slug: "omega"
  }
];

const TIMELINE = [
  { date: "16ᵉ siècle", title: "Naissance de l’horlogerie suisse", text: "Genève devient un centre majeur de l’horlogerie européenne." },
  { date: "1839", title: "Patek Philippe", text: "Fondation et début de l’innovation continue – première montre-bracelet suisse." },
  { date: "1905", title: "Rolex", text: "Lancement de la première Oyster, montre-bracelet étanche." },
  { date: "1972", title: "Royal Oak", text: "Audemars Piguet révolutionne le marché avec un design d’avant-garde." },
  { date: "2020+", title: "Nouvelles Technologies", text: "L’horlogerie suisse innove avec la haute-technologie et le respect de l’héritage." }
];

const INNOVATIONS = [
  {
    year: "1868",
    title: "Première montre-bracelet (Patek Philippe)",
    icon: <Crown className="text-blue-600" size={28} />,
    text: "Patek Philippe invente la première véritable montre-bracelet pour la comtesse Koscowicz."
  },
  {
    year: "1926",
    title: "Oyster – première montre étanche (Rolex)",
    icon: <Rocket className="text-green-600" size={28} />,
    text: "Rolex lance l’Oyster, rendant la montre-bracelet ultra robuste et résistante à l’eau."
  },
  {
    year: "1948",
    title: "Omega Seamaster",
    icon: <Star className="text-indigo-600" size={28} />,
    text: "Omega crée la Seamaster, référence absolue des montres de plongée."
  },
  {
    year: "1972",
    title: "Audemars Piguet Royal Oak",
    icon: <Gem className="text-purple-600" size={28} />,
    text: "Première montre sportive de luxe en acier dessinée par Gérald Genta."
  }
];

export default function ManufacturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-neutral-950 dark:via-blue-950/30 dark:to-slate-900">

      {/* NAVIGATION */}
      <nav className="sticky top-0 w-full z-40 bg-white/80 dark:bg-neutral-950/80 border-b border-blue-100 dark:border-blue-900/40 shadow-sm backdrop-blur-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 max-w-6xl">
          <Link href="/" className="font-extrabold text-xl tracking-tight text-blue-700 dark:text-blue-300">HorloLearn</Link>
          <div className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-12 pb-20 bg-gradient-to-br from-white via-blue-50 to-white dark:from-neutral-950 dark:via-blue-950/10 dark:to-slate-900">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold px-6 py-2 rounded-full mb-6 shadow">
            Culture Horlogère
          </div>
          <h1 className="mb-4 text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            Les Grandes Manufactures Horlogères Suisses
          </h1>
          <p className="text-xl md:text-2xl text-blue-500 dark:text-blue-200 font-light mb-6 max-w-2xl mx-auto">
            La référence mondiale de l’excellence, de l’innovation et du savoir-faire horloger.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="bg-white dark:bg-blue-950/50 rounded-2xl px-8 py-6 shadow border border-blue-100 dark:border-blue-900 flex flex-col items-center w-56">
                <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-200">{stat.number}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300 mt-2 uppercase font-medium tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-white dark:bg-neutral-900 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">Évolution de l’Excellence</h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            {TIMELINE.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center relative">
                <div className={`mb-3 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-neutral-900 text-2xl font-bold
                  ${idx === 0 ? "text-blue-400" : idx === TIMELINE.length-1 ? "text-indigo-400" : "text-blue-700"}`}>
                  {step.date}
                </div>
                <div className="font-bold mb-1 text-lg text-blue-900 dark:text-blue-100">{step.title}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm opacity-80 px-2">{step.text}</div>
                {idx < TIMELINE.length-1 && (
                  <div className="hidden md:block absolute top-7 right-[-52px] w-16 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURES */}
      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
            Les Cinq Légendes de l’Horlogerie Suisse
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANUFACTURES.map((m) => (
              <Link key={m.slug} href={`/theorie/manufactures/${m.slug}`}>
                <div className={`rounded-2xl border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-neutral-900/90 p-8 h-full shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer group`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-5xl">{m.icon}</div>
                    <span className={`font-bold px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200`}>
                      {m.founded}
                    </span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {m.name}
                  </div>
                  <div className="text-sm italic text-blue-700 dark:text-blue-300 mb-3">{m.tagline}</div>
                  <ul className="mb-4">
                    {m.specialties.map((sp, idx) => (
                      <li key={idx} className="flex items-center text-gray-700 dark:text-gray-200 text-sm">
                        <span className="text-blue-500 dark:text-blue-300 mr-2">•</span> {sp}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-blue-100 dark:border-blue-900 mt-4">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                      Découvrir l’histoire →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATIONS */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-900/80">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-blue-200 mb-12">Innovations Révolutionnaires</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {INNOVATIONS.map((inv, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-8 flex items-start gap-6 shadow">
                <div className="flex flex-col items-center gap-2">
                  <div>{inv.icon}</div>
                  <span className="font-bold text-blue-600 dark:text-blue-200">{inv.year}</span>
                </div>
                <div>
                  <div className="font-semibold text-lg text-blue-900 dark:text-blue-200">{inv.title}</div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm mt-2">{inv.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400 text-sm border-t border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-neutral-950/50">
        © 2025 HorloLearn – Référence suisse en excellence horlogère
      </footer>
    </main>
  );
}
