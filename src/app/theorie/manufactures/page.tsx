import React from "react";
import Link from "next/link";

export default function ManufacturesPage() {
  const manufactures = [
    {
      icon: "👑",
      name: "Patek Philippe",
      since: "Depuis 1839",
      slug: "patek-philippe",
      img: "/images/manufactures/patek-philippe-hero.jpg",
      tagline: "Manufacture de prestige absolu",
      specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"]
    },
    {
      icon: "⚡",
      name: "Rolex",
      since: "Depuis 1905",
      slug: "rolex",
      img: "/images/manufactures/rolex-hero.jpg",
      tagline: "L’icône intemporelle",
      specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"]
    },
    {
      icon: "🔷",
      name: "Audemars Piguet",
      since: "Depuis 1875",
      slug: "audemars-piguet",
      img: "/images/manufactures/audemars-piguet-hero.jpg",
      tagline: "L’avant-garde de l’horlogerie",
      specialties: ["Royal Oak", "Tourbillons", "Grandes complications", "Royal Oak Offshore"]
    },
    {
      icon: "⭐",
      name: "Vacheron Constantin",
      since: "Depuis 1755",
      slug: "vacheron-constantin",
      img: "/images/manufactures/vacheron-constantin-hero.jpg",
      tagline: "La plus ancienne manufacture",
      specialties: ["Patrimony", "Overseas", "Métiers d’Art", "Grandes complications"]
    },
    {
      icon: "🌙",
      name: "Omega",
      since: "Depuis 1848",
      slug: "omega",
      img: "/images/manufactures/omega-hero.jpg",
      tagline: "Précision et conquête spatiale",
      specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"]
    }
  ];

  const timeline = [
    { date: "1755", title: "Naissance de Vacheron Constantin", text: "Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse." },
    { date: "1839", title: "Fondation de Patek Philippe", text: "Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu." },
    { date: "1848", title: "Naissance d’Omega", text: "Louis Brandt fonde Omega, référence de précision et d’aventure." },
    { date: "1875", title: "Création d’Audemars Piguet", text: "Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d’avant-garde." },
    { date: "1905", title: "Naissance de Rolex", text: "Hans Wilsdorf fonde celle qui révolutionne l’horlogerie de sport et de luxe." },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#0d1423]">
      {/* HERO */}
      <section 
        className="bg-gradient-to-br from-[#101e38] to-[#18152a] text-center py-16 px-2"
      >
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-blue-700 text-white font-semibold px-6 py-2 rounded-full mb-8 tracking-tight shadow-md">
            Culture Horlogère Suisse
          </span>
          <h1 className="mb-7 text-5xl md:text-6xl font-extrabold text-white leading-tight">
            Les Grandes Manufactures<br/>Horlogères Suisses
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light mb-12">
            Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires : Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 mt-6 mb-10">
            <div className="bg-[#16244e] rounded-2xl px-10 py-7 shadow-lg border border-blue-800 flex-1 mx-auto min-w-[160px]">
              <span className="text-4xl font-extrabold text-white">175+</span>
              <div className="text-xs text-blue-200 mt-2 tracking-wide">ANS D’EXCELLENCE</div>
            </div>
            <div className="bg-[#16244e] rounded-2xl px-10 py-7 shadow-lg border border-blue-800 flex-1 mx-auto min-w-[160px]">
              <span className="text-4xl font-extrabold text-white">5</span>
              <div className="text-xs text-blue-200 mt-2 tracking-wide">MANUFACTURES LÉGENDAIRES</div>
            </div>
            <div className="bg-[#16244e] rounded-2xl px-10 py-7 shadow-lg border border-blue-800 flex-1 mx-auto min-w-[160px]">
              <span className="text-4xl font-extrabold text-white">269</span>
              <div className="text-xs text-blue-200 mt-2 tracking-wide">ANNÉES D’HISTOIRE</div>
            </div>
            <div className="bg-[#16244e] rounded-2xl px-10 py-7 shadow-lg border border-blue-800 flex-1 mx-auto min-w-[160px]">
              <span className="text-4xl font-extrabold text-white">CH</span>
              <div className="text-xs text-blue-200 mt-2 tracking-wide">EXCELLENCE SUISSE</div>
            </div>
          </div>
          <button className="mt-2 px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-800 transition">Explorer l’Excellence</button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-[#181d29] py-16 px-2">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-14">L’Évolution de l’Excellence</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-6">
            {timeline.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center relative px-2 md:px-0 max-w-[230px]">
                <div className="bg-blue-900 text-white text-lg font-bold rounded-full w-14 h-14 flex items-center justify-center z-10 mb-3 shadow-lg border-2 border-blue-700">
                  {item.date}
                </div>
                <div className="text-center mb-1 text-lg text-white font-bold">{item.title}</div>
                <div className="text-center text-blue-100 text-sm pb-8">{item.text}</div>
                {idx < timeline.length-1 && (
                  <div className="hidden md:block absolute top-6 right-[-35px] h-1 w-14 bg-gradient-to-r from-blue-800 via-blue-400 to-blue-800" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* MANUFACTURES GRID */}
      <section className="bg-[#10182b] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-14">Les Cinq Légendes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {manufactures.map((m) => (
              <div key={m.slug} className="bg-[#16244e] rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-900 hover:-translate-y-1 transition-transform h-full flex flex-col">
                <img src={m.img} alt={`Photo manufacture ${m.name}`} className="w-full h-48 object-cover" />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center mb-3">
                    <div className="text-3xl mr-3">{m.icon}</div>
                    <span className="ml-auto bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full">{m.since}</span>
                  </div>
                  <h3 className="text-2xl text-white font-extrabold mb-1">{m.name}</h3>
                  <div className="text-blue-200 text-sm italic mb-4">{m.tagline}</div>
                  <ul className="mb-4">
                    {m.specialties.map((sp, i) => (
                      <li key={i} className="flex items-center text-blue-100 text-sm mb-1">
                        <span className="text-blue-400 mr-2">•</span> {sp}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/theorie/manufactures/${m.slug}`}>
                    <span className="inline-block mt-auto pt-3 text-blue-400 hover:text-blue-200 font-semibold underline transition">Découvrir l’histoire →</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
