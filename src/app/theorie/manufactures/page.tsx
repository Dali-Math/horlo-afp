"use client";

import React from "react";
import Link from "next/link";

// ICONES (optionnelles, ou emoji)
import { Gem, Rocket, Crown, Star, Calendar } from "lucide-react";

const NAV_LINKS = [
  { href: "#hero", label: "Accueil" },
  { href: "#timeline", label: "Histoire" },
  { href: "#manufactures", label: "Manufactures" },
  { href: "#innovations", label: "Innovations" }
];

const HERO_STATS = [
  { number: "175+", label: "Ans d'excellence" },
  { number: "5", label: "Manufactures légendaires" },
  { number: "269", label: "Années d'histoire" },
  { number: "🇨🇭", label: "Excellence suisse" }
];

const TIMELINE = [
  { date: "1755", title: "Naissance de Vacheron Constantin", text: "Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse." },
  { date: "1839", title: "Fondation de Patek Philippe", text: "Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu." },
  { date: "1848", title: "Naissance d'Omega", text: "Louis Brandt fonde Omega, référence de précision et d'aventure." },
  { date: "1875", title: "Création d'Audemars Piguet", text: "Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d'avant-garde." },
  { date: "1905", title: "Naissance de Rolex", text: "Hans Wilsdorf fonde celle qui révolutionne l'horlogerie de sport et de luxe." }
];

const MANUFACTURES = [
  {
    icon: "👑",
    name: "Patek Philippe",
    since: "Depuis 1839",
    specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"],
    slug: "patek-philippe"
  },
  {
    icon: "⚡",
    name: "Rolex",
    since: "Depuis 1905",
    specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"],
    slug: "rolex"
  },
  {
    icon: "🔷",
    name: "Audemars Piguet",
    since: "Depuis 1875",
    specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"],
    slug: "audemars-piguet"
  },
  {
    icon: "⭐",
    name: "Vacheron Constantin",
    since: "Depuis 1755",
    specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"],
    slug: "vacheron-constantin"
  },
  {
    icon: "🌙",
    name: "Omega",
    since: "Depuis 1848",
    specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"],
    slug: "omega"
  }
];

const INNOVATIONS = [
  {
    icon: "⚙️",
    title: "Quantième Perpétuel",
    text: "Patek Philippe révolutionne l'horlogerie avec le premier quantième perpétuel automatique en 1962.",
    year: "1962"
  },
  {
    icon: "🌊",
    title: "Étanchéité Oyster",
    text: "Rolex introduit la première montre étanche au monde en 1926, révolutionnant l'horlogerie sportive.",
    year: "1926"
  },
  {
    icon: "🚀",
    title: "Moonwatch",
    text: "Omega Speedmaster devient la première montre sur la Lune en 1969, choisie par la NASA.",
    year: "1969"
  },
  {
    icon: "💎",
    title: "Royal Oak",
    text: "Audemars Piguet crée le premier luxury sport watch en acier inoxydable en 1972.",
    year: "1972"
  },
  {
    icon: "🎨",
    title: "Métiers d'Art",
    text: "Vacheron Constantin perpétue les techniques traditionnelles de décoration horlogère.",
    year: "Tradition"
  },
  {
    icon: "⚡",
    title: "Master Chronometer",
    text: "Omega développe la certification Master Chronometer, dépassant les normes industrielles.",
    year: "2015"
  }
];

export default function ManufacturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white dark:from-neutral-950 dark:via-blue-950/30 dark:to-slate-900">

      {/* NAVIGATION */}
      <nav className="sticky top-0 w-full bg-white/80 dark:bg-neutral-950/80 border-b border-blue-100 dark:border-blue-900/40 shadow-sm backdrop-blur-lg z-30">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 max-w-6xl">
          <span className="font-extrabold text-xl tracking-tight text-blue-700 dark:text-blue-300">SwissWatch Excellence</span>
          <div className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="pt-12 pb-20 bg-gradient-to-br from-white via-blue-50 to-white dark:from-neutral-950 dark:via-blue-950/10 dark:to-slate-900 text-center">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-semibold px-6 py-2 rounded-full mb-6 shadow">
          Culture Horlogère Suisse
        </span>
        <h1 className="mb-4 text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
          Les Grandes Manufactures<br /> Horlogères Suisses
        </h1>
        <p className="text-xl md:text-2xl text-blue-500 dark:text-blue-200 font-light mb-6 max-w-2xl mx-auto">
          Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires : Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {HERO_STATS.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-blue-950/50 rounded-2xl px-8 py-6 shadow border border-blue-100 dark:border-blue-900 flex flex-col items-center w-56">
                <span className="text-4xl font-extrabold text-blue-700 dark:text-blue-200">{stat.number}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300 mt-2 uppercase font-medium tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
        <a href="#manufactures" className="mt-10 inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl">Explorer l'Excellence</a>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="bg-white dark:bg-neutral-900 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800 dark:text-blue-200 mb-12">L'Évolution de l'Excellence</h2>
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            {TIMELINE.map((step, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center relative">
                <div className="mb-3 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-neutral-900 text-2xl font-bold text-blue-800 dark:text-blue-200">{step.date}</div>
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
      <section id="manufactures" className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">Les Cinq Légendes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MANUFACTURES.map((m, idx) => (
              <div key={m.slug} className="rounded-2xl border-2 border-blue-100 dark:border-blue-900 bg-white dark:bg-neutral-900/90 p-8 h-full shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-5xl">{m.icon}</div>
                  <span className="font-bold px-3 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200">{m.since}</span>
                </div>
                <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {m.name}
                </div>
                <div className="text-sm italic text-blue-700 dark:text-blue-300 mb-3">Spécialités</div>
                <ul className="mb-4">
                  {m.specialties.map((sp, i) => (
                    <li key={i} className="flex items-center text-gray-700 dark:text-gray-200 text-sm">
                      <span className="text-blue-500 dark:text-blue-300 mr-2">•</span> {sp}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-blue-100 dark:border-blue-900 mt-4">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:underline cursor-pointer">Découvrir l'histoire →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATIONS */}
      <section id="innovations" className="py-16 px-4 bg-white dark:bg-neutral-900/80">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-blue-200 mb-12">Innovations Révolutionnaires</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {INNOVATIONS.map((inv, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-l-4 border-blue-500 rounded-xl p-8 flex items-start gap-6 shadow">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-2xl">{inv.icon}</div>
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

      {/* EXCELLENCE EN CHIFFRES */}
      <section className="py-16 px-4 bg-white dark:bg-neutral-950/80">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-200 mb-8">L'Excellence en Chiffres</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-8 shadow border border-blue-100 dark:border-blue-800">
              <Calendar className="mx-auto mb-2 text-blue-700 dark:text-blue-300" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Âge des Manufactures</h3>
              <p className="text-md text-gray-700 dark:text-gray-300">Vacheron Constantin : 269 ans, Patek Philippe : 186 ans, Omega : 176 ans, Audemars Piguet : 149 ans, Rolex : 119 ans.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-8 shadow border border-blue-100 dark:border-blue-800">
              <Gem className="mx-auto mb-2 text-indigo-600" size={32} />
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">Innovations par Décennie</h3>
              <p className="text-md text-gray-700 dark:text-gray-300">Depuis 1755, les manufactures suisses ont introduit plus de 60 innovations majeures chaque décennie.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-9 text-center text-gray-400 text-sm border-t border-blue-100 dark:border-blue-900 bg-white/50 dark:bg-neutral-950/50">
        L'excellence horlogère suisse depuis 1755<br />
        © 2024 SwissWatch Excellence. Tous droits réservés.
      </footer>
    </main>
  );
}
