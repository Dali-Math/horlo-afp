
"use client";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
// Installe echarts-for-react si tu veux des vrais graphiques !
// import ReactECharts from 'echarts-for-react'

const heroTitle = "Les Grandes Manufactures";
const heroSubtitle = "Horlogères Suisses";
const timeline = [
  {
    date: 1755,
    title: "Naissance de Vacheron Constantin",
    details: "Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse."
  },
  {
    date: 1839,
    title: "Fondation de Patek Philippe",
    details: "Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu."
  },
  {
    date: 1848,
    title: "Naissance d’Omega",
    details: "Louis Brandt fonde Omega, qui deviendra la référence de précision et d’aventure."
  },
  {
    date: 1875,
    title: "Création d’Audemars Piguet",
    details: "Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d’avant-garde."
  },
  {
    date: 1905,
    title: "Naissance de Rolex",
    details: "Hans Wilsdorf fonde la marque qui révolutionnera l’horlogerie de sport et de luxe."
  }
];
const manufactures = [
  {
    name: "Patek Philippe",
    since: 1839,
    img: "/resources/patek-philippe-hero.jpg",
    specialties: [
      "Quantièmes perpétuels",
      "Calatrava",
      "Nautilus",
      "Grandes complications"
    ]
  },
  {
    name: "Rolex",
    since: 1905,
    img: "/resources/rolex-hero.jpg",
    specialties: [
      "Oyster Perpetual",
      "Submariner",
      "Daytona",
      "GMT-Master"
    ]
  },
  {
    name: "Audemars Piguet",
    since: 1875,
    img: "/resources/audemars-piguet-hero.jpg",
    specialties: [
      "Royal Oak",
      "Royal Oak Offshore",
      "Tourbillons",
      "Grandes complications"
    ]
  },
  {
    name: "Vacheron Constantin",
    since: 1755,
    img: "/resources/vacheron-constantin-hero.jpg",
    specialties: [
      "Patrimony",
      "Overseas",
      "Métiers d’Art",
      "Grandes complications"
    ]
  },
  {
    name: "Omega",
    since: 1848,
    img: "/resources/omega-hero.jpg",
    specialties: [
      "Speedmaster",
      "Seamaster",
      "Constellation",
      "Master Chronometer"
    ]
  }
];
const innovations = [
  {
    icon: "",
    title: "Quantième Perpétuel",
    details: "Patek Philippe révolutionne l’horlogerie avec le premier quantième perpétuel automatique en 1962.",
    sub: "Innovation majeure"
  },
  {
    icon: "",
    title: "Étanchéité Oyster",
    details: "Rolex introduit la première montre étanche au monde en 1926, révolutionnant l’horlogerie sportive.",
    sub: "1926"
  },
  {
    icon: "",
    title: "Moonwatch",
    details: "Omega Speedmaster devient la première montre sur la Lune en 1969, choisie par la NASA.",
    sub: "1969"
  },
  {
    icon: "",
    title: "Royal Oak",
    details: "Audemars Piguet crée le premier ‘luxury sport watch’ en acier inoxydable en 1972.",
    sub: "1972"
  },
  {
    icon: "",
    title: "Métiers d’Art",
    details: "Vacheron Constantin perpétue les techniques traditionnelles de décoration horlogère.",
    sub: "Tradition"
  },
  {
    icon: "",
    title: "Master Chronometer",
    details: "Omega développe la certification Master Chronometer, dépassant les normes industrielles.",
    sub: "2015"
  }
];

const useTypewriter = (text: string, speed = 50) => {
  const [displayed, setDisplayed] = React.useState("");
  useEffect(() => {
    let i = 0;
    let id = setInterval(() => {
      setDisplayed(text.slice(0, i++));
      if (i > text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
};

export default function Page() {
  const typewriter = useTypewriter(heroTitle, 60);

  // Animation scroll (timeline, manufacture cards, etc.)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate");
        });
      },
      { threshold: 0.2 }
    );
    document
      .querySelectorAll(".timeline-item, .manufacture-card")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const heroImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = heroImgRef.current;
    if (!el) return;
    el.animate(
      [
        { transform: "scale(1) translateY(0)" },
        { transform: "scale(1.08) translateY(-12px)" }
      ],
      {
        duration: 10000,
        easing: "ease-in-out",
        fill: "forwards"
      }
    );
  }, []);

  return (
    <>
      <Head>
        <title>
          Les Grandes Manufactures Horlogères Suisses - SwissWatch Excellence
        </title>
        <meta
          name="description"
          content="Découvrez les manufactures horlogères suisses de légende. Histoire, innovations et savoir-faire d’exception depuis 1755."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="bg-swiss-black text-swiss-white font-inter">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-swiss-black/90 backdrop-blur-md border-b border-swiss-silver/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-swiss-silver to-swiss-white rounded-full flex items-center justify-center">
                <span className="text-swiss-black font-bold text-sm">SW</span>
              </div>
              <span className="font-playfair text-xl font-bold">
                SwissWatch Excellence
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#hero"
                className="text-swiss-silver hover:text-swiss-white transition-colors"
              >
                Accueil
              </a>
              <a
                href="#timeline"
                className="text-swiss-silver hover:text-swiss-white transition-colors"
              >
                Histoire
              </a>
              <a
                href="#manufactures"
                className="text-swiss-silver hover:text-swiss-white transition-colors"
              >
                Manufactures
              </a>
              <a
                href="#innovations"
                className="text-swiss-silver hover:text-swiss-white transition-colors"
              >
                Innovations
              </a>
              <button className="luxury-button px-6 py-2 rounded-full text-swiss-charcoal font-semibold shadow">
                Explorer
              </button>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section
          id="hero"
          className="hero-bg min-h-screen flex items-center justify-center pt-20 relative"
        >
          <div className="hero-content container mx-auto px-6 text-center">
            <div className="mb-8 flex flex-col gap-6">
              <div className="inline-flex items-center space-x-2 bg-swiss-silver/10 border border-swiss-silver/30 rounded-full px-6 py-3">
                <span className="text-swiss-silver text-sm font-medium">
                  Culture Horlogère Suisse
                </span>
                <span className="w-2 h-2 bg-swiss-silver rounded-full" />
              </div>
              <div
                ref={heroImgRef}
                className="hero-bgbefore absolute top-0 left-0 right-0 bottom-0 w-full h-full"
                style={{
                  background:
                    "url('/resources/swiss-horology-hero.jpg') center/cover",
                  opacity: 0.3,
                  zIndex: 1
                }}
              />
              <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight gold-gradient typewriter">
                {typewriter}
                <br />
                <span className="text-swiss-white">{heroSubtitle}</span>
              </h1>
              <p className="text-xl md:text-2xl text-swiss-silver/80 max-w-4xl mx-auto mb-8 leading-relaxed">
                Découvrez l’excellence horlogère suisse à travers ses cinq
                manufactures légendaires : Patek Philippe, Rolex, Audemars
                Piguet, Vacheron Constantin et Omega.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="excellence-badge rounded-xl p-6 text-center floating-element animate">
                  <div className="text-3xl font-bold text-swiss-silver mb-2">
                    175
                  </div>
                  <div className="text-sm text-swiss-silver/70">
                    Ans d’excellence
                  </div>
                </div>
                <div className="excellence-badge rounded-xl p-6 text-center floating-element animate">
                  <div className="text-3xl font-bold text-swiss-silver mb-2">
                    5
                  </div>
                  <div className="text-sm text-swiss-silver/70">
                    Manufactures légendaires
                  </div>
                </div>
                <div className="excellence-badge rounded-xl p-6 text-center floating-element animate">
                  <div className="text-3xl font-bold text-swiss-silver mb-2">
                    269
                  </div>
                  <div className="text-sm text-swiss-silver/70">
                    Années d’histoire
                  </div>
                </div>
                <div className="excellence-badge rounded-xl p-6 text-center floating-element animate">
                  <div className="text-3xl font-bold text-swiss-silver mb-2">
                    🇨🇭
                  </div>
                  <div className="text-sm text-swiss-silver/70">
                    Excellence suisse
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  document
                    .getElementById("manufactures")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="luxury-button px-12 py-4 rounded-full text-swiss-charcoal font-bold text-lg transition hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-200"
              >
                Explorer l’Excellence
              </button>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-20 precision-grid">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                L’évolution de l’Excellence
              </h2>
              <p className="text-xl text-swiss-silver/70 max-w-3xl mx-auto">
                Parcourez plus de 250 ans d’histoire horlogère suisse, marquée
                par l’innovation, le savoir-faire et l’excellence technique.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-12 transform -translate-x-12 w-1 bg-swiss-silver/30 h-full"></div>
              <div className="space-y-12">
                {timeline.map((t, i) => (
                  <div
                    key={t.date}
                    className={`timeline-item flex items-center ${i % 2 === 0 ? "" : "flex-row-reverse"}`}
                  >
                    <div className="w-12 pr-8 text-right">
                      <div className="bg-swiss-charcoal/50 rounded-xl p-6 border border-swiss-silver/20">
                        <h3 className="font-playfair text-2xl font-bold mb-2 text-swiss-silver">
                          {t.date}
                        </h3>
                        <h4 className="text-xl font-semibold mb-3">
                          {t.title}
                        </h4>
                        <p className="text-swiss-silver/70">{t.details}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-swiss-silver rounded-full border-4 border-swiss-black flex-shrink-0 z-10"></div>
                    <div className="flex-1 pl-8" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Manufactures */}
        <section id="manufactures" className="py-20 bg-swiss-charcoal/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Les Cinq Légendes
              </h2>
              <p className="text-xl text-swiss-silver/70 max-w-3xl mx-auto">
                Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif et une contribution exceptionnelle à l’horlogerie de luxe.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {manufactures.map((m) => (
                <div
                  key={m.name}
                  className="manufacture-card bg-swiss-black border border-swiss-silver/20 rounded-2xl p-8 cursor-pointer group transition-all hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
                >
                  <div className="text-center mb-6">
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover rounded-xl mb-4 hover:scale-110 transition-transform"
                    />
                    <h3 className="font-playfair text-2xl font-bold mb-2">
                      {m.name}
                    </h3>
                    <p className="text-swiss-silver/60 text-sm">
                      Depuis {m.since}
                    </p>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-swiss-silver">
                      Spécialités
                    </h4>
                    <div className="space-y-2">
                      {m.specialties.map((s) => (
                        <div key={s} className="flex items-center text-sm">
                          <span className="w-2 h-2 bg-swiss-silver rounded-full mr-3" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-swiss-silver/70 text-sm group-hover:text-swiss-silver transition-colors">
                      Découvrir l’histoire
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Innovations */}
        <section id="innovations" className="py-20 innovation-visual">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                Innovations Révolutionnaires
              </h2>
              <p className="text-xl text-swiss-silver/70 max-w-3xl mx-auto">
                Les manufactures suisses ont révolutionné l’horlogerie avec des
                innovations techniques et des designs iconiques qui ont marqué
                l’histoire.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {innovations.map((i) => (
                <div
                  key={i.title}
                  className="bg-swiss-black/50 border border-swiss-silver/20 rounded-xl p-6"
                >
                  <div className="text-4xl mb-4">{i.icon}</div>
                  <h3 className="font-playfair text-xl font-bold mb-3">
                    {i.title}
                  </h3>
                  <p className="text-swiss-silver/70 text-sm mb-4">
                    {i.details}
                  </p>
                  <div className="text-xs text-swiss-silver/50">{i.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Visualization */}
        <section className="py-20 precision-grid">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
                L’Excellence en Chiffres
              </h2>
              <p className="text-xl text-swiss-silver/70 max-w-3xl mx-auto">
                Analyse comparative des manufactures suisses à travers les âges.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-swiss-charcoal/30 border border-swiss-silver/20 rounded-xl p-8">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-center">
                  Âge des Manufactures
                </h3>
                {/* <ReactECharts option={optionPie} style={{height:'320px'}} /> */}
                <div
                  id="ageChart"
                  className="h-80 flex items-center justify-center text-swiss-silver/70"
                >
                  {/* Placeholder pour ECharts */}
                  Graphique À Insérer
                </div>
              </div>
              <div className="bg-swiss-charcoal/30 border border-swiss-silver/20 rounded-xl p-8">
                <h3 className="font-playfair text-2xl font-bold mb-6 text-center">
                  Innovations par Décennie
                </h3>
                {/* <ReactECharts option={optionLine} style={{height:'320px'}} /> */}
                <div
                  id="innovationChart"
                  className="h-80 flex items-center justify-center text-swiss-silver/70"
                >
                  {/* Placeholder pour ECharts */}
                  Graphique À Insérer
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-swiss-black border-t border-swiss-silver/20 py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-swiss-silver to-swiss-white rounded-full flex items-center justify-center">
                <span className="text-swiss-black font-bold text-sm">SW</span>
              </div>
              <span className="font-playfair text-xl font-bold">
                SwissWatch Excellence
              </span>
            </div>
            <p className="text-swiss-silver/60 text-sm mb-6">
              L’excellence horlogère suisse depuis 1755
            </p>
            <div className="text-xs text-swiss-silver/40">
              © 2024 SwissWatch Excellence. Tous droits réservés.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
