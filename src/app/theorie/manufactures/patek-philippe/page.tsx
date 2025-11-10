"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "1839",
    title: "Fondation de la Manufacture",
    text: "Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek. Début d'une aventure qui révolutionnera l'horlogerie mondiale."
  },
  {
    year: "1844",
    title: "Rencontre Historique à Paris",
    text: "Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris. Philippe présente son système de remontoir à couronne qui rendra obsolète les clés."
  },
  {
    year: "1851",
    title: "Consécration Royale",
    text: "La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la Grande Exposition de Londres. Début de la reconnaissance internationale."
  },
  {
    year: "1868",
    title: "Première Montre-bracelet",
    text: "Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe. Innovation qui transformera l'industrie horlogère."
  },
  {
    year: "1889",
    title: "Brevet du Calendrier Perpétuel",
    text: "Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel, l'une des complications les plus complexes de l'horlogerie."
  }
];

const collections = [
  {
    emoji: "⌚",
    title: "Calatrava",
    desc: "L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe avec son design pur et ses lignes classiques.",
    details: [
      "À partir de €25,000",
      "Mouvement automatique",
      "Cadran émail",
      "Boîtier or"
    ]
  },
  {
    emoji: "🏆",
    title: "Nautilus",
    desc: "L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse et élégance dans un design emblématique.",
    details: [
      "À partir de €35,000",
      "Étanche 120m",
      "Boîtier acier",
      "Bracelet intégré"
    ]
  },
  {
    emoji: "💎",
    title: "Aquanaut",
    desc: "L'aventure moderne. Design contemporain avec bracelet Tropical innovant, parfait pour l'homme actif et élégant.",
    details: [
      "À partir de €28,000",
      "Bracelet caoutchouc",
      "Étanche 120m",
      "Design sportif"
    ]
  },
  {
    emoji: "⚙️",
    title: "Complications",
    desc: "L'art de la complexité. Montres avec fonctions avancées alliant innovation technique et beauté esthétique.",
    details: [
      "À partir de €45,000",
      "Chronographe",
      "Calendrier",
      "Phase lune"
    ]
  },
  {
    emoji: "👑",
    title: "Grandes Complications",
    desc: "Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs complications, représentant l'excellence absolue.",
    details: [
      "À partir de €150,000",
      "Sonnerie",
      "Répétition minutes",
      "Tourbillon"
    ]
  },
  {
    emoji: "🎨",
    title: "Gondolo",
    desc: "L'art déco revisité. Collection inspirée des années 1920 avec des formes géométriques audacieuses et un style raffiné.",
    details: [
      "À partir de €30,000",
      "Forme tonneau",
      "Design rétro",
      "Cadran guilloché"
    ]
  }
];

const savoirFaire = [
  {
    emoji: "⚙️",
    title: "Mécanique Fine",
    desc: "Mouvements développés et assemblés à la main avec une précision extrême, chaque composant est poli et décoré selon les plus hauts standards."
  },
  {
    emoji: "💎",
    title: "Joaillerie",
    desc: "Sertissage artisanal de diamants et pierres précieuses selon les techniques traditionnelles suisses les plus exigeantes."
  },
  {
    emoji: "🎨",
    title: "Arts Décoratifs",
    desc: "Émaux, gravures et guillochages réalisés par des artistes spécialisés utilisant des techniques ancestrales préservées."
  }
];

export default function Page() {
  const vantaRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let effect: any = null;
    if (typeof window !== "undefined" && (window as any).VANTA && (window as any).VANTA.BIRDS) {
      effect = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        backgroundColor: 0xf8f6f0,
        color1: 0xd4af37,
        color2: 0x1a2332,
        birdSize: 1.2,
        wingSpan: 24
      });
    }
    return () => { if (effect) effect.destroy(); };
  }, []);
  return (
    <>
      <Head>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
        <style>{`
          :root {
            --gold: #D4AF37;
            --deep-blue: #1a2332;
            --cream: #f8f6f0;
            --charcoal: #2c2c2c;
            --silver: #e8e8e8;
          }
          body {
            font-family: 'Inter', 'Playfair Display', serif;
            background: var(--cream);
          }
        `}</style>
      </Head>
      <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10"/>
      {/* Navigation/Menu */}
      <header className="flex flex-wrap items-center justify-between p-6 bg-[var(--cream)] text-[var(--deep-blue)] font-bold border-b border-[var(--silver)]">
        <span className="text-2xl font-playfair tracking-widest">Patek Philippe</span>
        <nav className="space-x-5 text-lg">
          <a href="#home" className="hover:text-[var(--gold)]">Accueil</a>
          <a href="#heritage" className="hover:text-[var(--gold)]">Héritage</a>
          <a href="#collections" className="hover:text-[var(--gold)]">Collections</a>
          <a href="#innovation" className="hover:text-[var(--gold)]">Innovation</a>
          <a href="#craftsmanship" className="hover:text-[var(--gold)]">Savoir-faire</a>
        </nav>
      </header>
      {/* Accroche & citation */}
      <section className="text-center py-12 px-4" id="home">
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</h1>
        <blockquote className="max-w-3xl mx-auto text-xl italic my-4 text-[var(--gold)] font-serif">
          « Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures. »
        </blockquote>
        <div className="flex flex-wrap justify-center gap-6 text-lg my-6">
          <div>
            <div className="text-2xl font-bold">1839</div>
            Fondation
          </div>
          <div>
            <div className="text-2xl font-bold">70+</div>
            Brevets
          </div>
          <div>
            <div className="text-2xl font-bold">100%</div>
            Indépendance
          </div>
        </div>
        <div className="text-[var(--deep-blue)] font-semibold text-lg mt-2">185 Ans d'Excellence</div>
      </section>

      <section className="py-12 px-4 max-w-3xl mx-auto" id="heritage">
        {timeline.map((event, i) => (
          <div key={event.year} className="mb-10 flex items-start gap-5">
            <div className="flex-shrink-0 text-[var(--gold)] font-bold text-lg min-w-[60px]">{event.year}</div>
            <div>
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p>{event.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Collections */}
      <section className="py-12 px-4" id="collections">
        <h2 className="text-2xl font-semibold mb-7 text-center">Collections Légendaires</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {collections.map((col, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:scale-105 transition-transform border-t-4 border-[var(--charcoal)]">
              <div className="text-4xl mb-2">{col.emoji}</div>
              <h3 className="text-xl font-bold mb-1">{col.title}</h3>
              <p className="mb-2 text-center">{col.desc}</p>
              <ul className="mt-2 mb-1 text-sm text-[var(--charcoal)] text-center space-y-1">
                {col.details.map((d, k) => <li key={k}>{d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Innovations */}
      <section className="py-12 px-4 bg-gray-50" id="innovation">
        <h2 className="text-2xl font-semibold mb-7 text-center">Innovations Révolutionnaires</h2>
        <ul className="grid gap-7 md:grid-cols-2 max-w-4xl mx-auto text-lg">
          <li>
            <span className="text-3xl text-[var(--gold)] font-bold block">70+</span>
            Brevets déposés depuis 1839
          </li>
          <li>
            <span className="text-3xl text-[var(--gold)] font-bold block">100%</span>
            Indépendance familiale et de production
          </li>
          <li>
            <span className="text-3xl text-[var(--gold)] font-bold block">185</span>
            Ans d’excellence ininterrompue
          </li>
          <li>
            <span className="text-3xl text-[var(--gold)] font-bold block">~60K</span>
            Montres/an, production artisanale limitée
          </li>
        </ul>
        <div className="max-w-xl mx-auto mt-8 text-center text-lg">
          <strong>Innovations révolutionnaires qui ont façonné l'horlogerie moderne.</strong>
          <br/>
          Fabrication intégrée contrôlant chaque étape de la production.
        </div>
      </section>

      {/* Savoir-faire */}
      <section className="py-12 px-4" id="craftsmanship">
        <h2 className="text-2xl font-semibold mb-7 text-center">Savoir-faire Exceptionnel</h2>
        <p className="max-w-2xl mx-auto mb-8 text-center text-lg">
          Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal, alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent leur savoir-faire de génération en génération.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {savoirFaire.map((sf, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-[var(--gold)]">
              <div className="text-4xl mb-2">{sf.emoji}</div>
              <h3 className="font-bold mb-1">{sf.title}</h3>
              <p className="text-center">{sf.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Explorer / CTA */}
      <section className="py-12 px-4 text-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-2">Découvrez l'Univers Patek Philippe</h2>
        <p className="mb-5 text-lg">Plongez dans l'histoire, les collections et l'excellence horlogère suisse</p>
        <div className="flex justify-center flex-wrap gap-6">
          <a href="https://2zbi2vrxx4aro.ok.kimi.link/heritage.html" className="px-5 py-3 rounded bg-[var(--deep-blue)] text-[var(--gold)] font-bold shadow hover:scale-105 transition">Explorer l'Héritage</a>
          <a href="https://2zbi2vrxx4aro.ok.kimi.link/collections.html" className="px-5 py-3 rounded bg-[var(--gold)] text-[var(--deep-blue)] font-bold shadow hover:scale-105 transition">Voir les Collections</a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center mt-8 mb-2 text-sm text-gray-700">
        <div className="mb-2 font-serif italic">
          "Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures."
        </div>
        <div>© 2024 Patek Philippe SA. Tous droits réservés. Référence mondiale en horlogerie suisse.</div>
        <a href="https://www.kimi.com/" className="text-[var(--gold)] hover:underline">KimiKimi OK Computer</a>
      </footer>
    </>
  );
}
