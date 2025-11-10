"use client";

import Head from "next/head";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Données collections, timeline, savoir-faire
const collections = [
  {
    title: "Calatrava",
    description: "L'essence même de l'élégance horlogère. Symbole intemporel du style Patek Philippe avec son design pur et ses lignes classiques.",
  },
  {
    title: "Nautilus",
    description: "L'icône du sport de luxe. Conçu par Gérald Genta, le Nautilus combine robustesse et élégance dans un design emblématique.",
  },
  {
    title: "Aquanaut",
    description: "L'aventure moderne. Design contemporain avec bracelet Tropical innovant, parfait pour l'homme actif et élégant.",
  },
  {
    title: "Complications",
    description: "L'art de la complexité. Montres avec fonctions avancées alliant innovation technique et beauté esthétique.",
  },
  {
    title: "Grandes Complications",
    description: "Le sommet de l'horlogerie. Créations exceptionnelles avec plusieurs complications, représentant l'excellence absolue.",
  },
  {
    title: "Twenty~4",
    description: "L'art déco revisité. Collection inspirée des années 1920 avec des formes géométriques audacieuses et un style raffiné.",
  },
];

const timeline = [
  {
    year: "1839",
    text: "Antoine Norbert de Patek, aristocrate polonais exilé, fonde Patek, Czapek & Cie à Genève avec François Czapek. Début d'une aventure qui révolutionnera l'horlogerie mondiale.",
  },
  {
    year: "1844",
    text: "Patek rencontre Jean Adrien Philippe lors de l'Exposition Industrielle de Paris. Philippe présente son système de remontoir à couronne qui rendra obsolète les clés.",
  },
  {
    year: "1851",
    text: "La Reine Victoria et le Prince Albert achètent des montres Patek Philippe lors de la Grande Exposition de Londres. Début de la reconnaissance internationale.",
  },
  {
    year: "1868",
    text: "Création de la première montre-bracelet avec remontoir à couronne par Patek Philippe. Innovation qui transformera l'industrie horlogère.",
  },
  {
    year: "1889",
    text: "Patek Philippe dépose le brevet pour son mécanisme de calendrier perpétuel, l'une des complications les plus complexes de l'horlogerie.",
  },
];

const savoirFaire = [
  "Chaque Patek Philippe est le fruit de centaines d'heures de travail artisanal, alliant tradition séculaire et innovation constante. Nos maîtres horlogers transmettent leur savoir-faire de génération en génération.",
  "Mouvements développés et assemblés à la main avec une précision extrême, chaque composant est poli et décoré selon les plus hauts standards.",
  "Sertissage artisanal de diamants et pierres précieuses selon les techniques traditionnelles suisses les plus exigeantes.",
  "Émaux, gravures et guillochages réalisés par des artistes spécialisés utilisant des techniques ancestrales préservées.",
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function PatekPhilippePage() {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let effect: any = null;
    if (typeof window !== "undefined" && (window as any).VANTA && (window as any).VANTA.BIRDS) {
      effect = (window as any).VANTA.BIRDS({
        el: vantaRef.current,
        backgroundColor: 0xf8f6f0,
        color1: 0xd4af37,
        color2: 0x1a2332,
        birdSize: 1.3,
        wingSpan: 25,
      });
    }
    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Patek Philippe - Référence Mondiale en Horlogerie Suisse</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
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

      <main className="relative z-10">
        {/* HERO & ACCROCHE */}
        <motion.section initial="hidden" animate="show" variants={fadeIn} className="text-center py-16 px-4">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-6 text-[var(--deep-blue)]">RÉFÉRENCE MONDIALE EN HORLOGERIE SUISSE</h1>
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl italic my-4 text-[var(--gold)]"
          >
            <i className="fa-solid fa-quote-left mr-2 text-[var(--gold)] opacity-60"/>Vous ne possédez jamais complètement une Patek Philippe. Vous en êtes le gardien pour les générations futures.<i className="fa-solid fa-quote-right ml-2 text-[var(--gold)] opacity-60"/>
          </motion.blockquote>
        </motion.section>

        {/* TIMELINE */}
        <section className="bg-gray-100 py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-semibold text-center mb-8">Timeline historique</motion.h2>
            <div className="space-y-8">
              {timeline.map((event, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: idx % 2 === 0 ? -50 : 50 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.6, delay: idx * 0.16 } },
                  }}
                  className="flex flex-col md:flex-row items-start md:items-center mb-4"
                >
                  <div className="font-bold text-lg text-[var(--deep-blue)] md:w-32 shrink-0">{event.year}</div>
                  <div className="bg-white p-4 rounded shadow md:ml-4">{event.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section className="py-16 px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="text-center text-2xl font-semibold mb-8">Collections emblématiques</motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {collections.map((col, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.13 }}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-50 hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                {/* Dummy image 100% compatible, jamais bloquant */}
                <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500">
                  <i className="fa-solid fa-image text-4xl"/>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">{col.title}</h3>
                  <p className="text-base">{col.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* INNOVATIONS */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-semibold mb-6 text-center">Innovations & expertise</motion.h2>
            <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="list-disc ml-10 text-lg space-y-2">
              <li>Patek Philippe a révolutionné l'horlogerie avec plus de 70 brevets déposés depuis 1839</li>
              <li>Innovations révolutionnaires qui ont façonné l'horlogerie moderne</li>
              <li>Fabrication intégrée contrôlant chaque étape de la production</li>
              <li>D'expérience ininterrompue dans l'art horloger suisse</li>
              <li>Production artisanale limitée garantissant l'exclusivité</li>
            </motion.ul>
          </div>
        </section>

        {/* SAVOIR-FAIRE */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="text-2xl font-semibold mb-6 text-center">Le savoir-faire d’exception</motion.h2>
            <motion.ul initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="list-disc ml-10 space-y-2 text-lg">
              {savoirFaire.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </motion.ul>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeIn} className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.06, backgroundColor: "#3b4866" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-8 py-3 bg-[var(--deep-blue)] text-[var(--gold)] rounded-lg font-bold shadow hover:bg-blue-700 transition text-lg"
            >
              Plongez dans l'histoire, les collections et l'excellence horlogère suisse
            </motion.button>
          </motion.div>
        </section>
      </main>
    </>
  );
}
