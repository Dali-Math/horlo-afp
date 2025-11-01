'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const metadata = {
  title: 'Matériaux Horlogers Suisses - HorloLearn',
  description:
    "Excellence et innovation dans les matériaux horlogers suisses – étude complète du savoir-faire et des innovations du secteur.",
}

// Animation fade-in-up réutilisable
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function MateriauxHorlogersSuisse() {
  const [histoireTab, setHistoireTab] = useState<'XVIe' | 'XVIIIe' | 'XXe' | 'XXIe'>('XVIe')
  const [ecosystemeTab, setEcosystemeTab] = useState<'Jura' | 'Geneve' | 'Joux'>('Jura')
  const [avenirTab, setAvenirTab] = useState<'Durabilité' | 'Digitalisation' | 'Matériaux'>('Durabilité')

  useEffect(() => {
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault()
        const target = document.querySelector(anchor.getAttribute('href')!)
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 70
          window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
      })
    })

    // Animation chiffres
    const statNumbers = document.querySelectorAll('.stat-number')
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || '0')
      let current = 0
      const increment = target / 50
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        ;(stat as HTMLElement).textContent = Math.floor(current).toString()
      }, 30)
    })
  }, [])

  return (
    <main className="text-gray-800 bg-white dark:bg-black dark:text-white overflow-hidden">
      {/* ---------------- HERO ---------------- */}
      <motion.section
        id="accueil"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 bg-gradient-radial from-[#7B1F34] to-[#521522] text-white"
      >
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
          Excellence et Innovation
        </h1>
        <h2 className="text-3xl md:text-5xl font-serif mb-6">
          dans les Matériaux Horlogers Suisses
        </h2>
        <p className="max-w-2xl text-lg opacity-90 leading-relaxed">
          Une analyse complète de l'écosystème des matériaux horlogers suisses,
          démontrant pourquoi la Suisse demeure le leader mondial incontesté en
          matière d'innovation, de qualité et de savoir-faire.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            ['50', '% du marché mondial en valeur'],
            ['65', '000 emplois en Suisse'],
            ['500', "ans d'innovation continue"],
          ].map(([val, label], i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:-translate-y-1 transition"
            >
              <span className="stat-number block text-5xl font-bold" data-target={val}>
                0
              </span>
              <span className="text-sm opacity-80">{label}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a
            href="#materiaux"
            className="bg-[#E6004C] px-6 py-3 rounded-lg font-semibold hover:bg-[#C2003D] transition"
          >
            Découvrir les Matériaux →
          </a>
          <a
            href="#histoire"
            className="border-2 border-[#E6004C] px-6 py-3 rounded-lg font-semibold hover:bg-[#E6004C] transition"
          >
            Voir la Timeline
          </a>
        </div>
      </motion.section>

      {/* ---------------- HISTOIRE (avec fade-in) ---------------- */}
      <motion.section
        id="histoire"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-24 px-6 bg-neutral-100 dark:bg-neutral-900/40"
      >
        <h2 className="text-4xl font-serif text-[#E1263A] text-center font-bold mb-4">
          Chronologie Historique
        </h2>
        <p className="text-center text-lg mb-12 opacity-80">
          L'évolution des matériaux horlogers du XVIe siècle à aujourd'hui
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <Image
              src="/images/chronologie_historique.png"
              alt="Chronologie historique"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md"
          >
            <h3 className="text-2xl font-serif text-[#E1263A] mb-4">
              L'évolution de l'horlogerie suisse
            </h3>
            <div className="flex gap-2 flex-wrap mb-4">
              {['XVIe', 'XVIIIe', 'XXe', 'XXIe'].map(era => (
                <button
                  key={era}
                  onClick={() => setHistoireTab(era as any)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                    histoireTab === era
                      ? 'bg-[#E1263A] text-white border-[#E1263A]'
                      : 'border-gray-300 hover:border-[#E1263A] hover:text-[#E1263A]'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>

            <motion.p
              key={histoireTab}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-2"
            >
              {histoireTab === 'XVIe' &&
                "L'horlogerie suisse prend racine au XVIe siècle avec les horlogers huguenots à Genève. Naissance des premiers mécanismes de précision."}
              {histoireTab === 'XVIIIe' &&
                'Genève devient le centre mondial de l’horlogerie. La révolution industrielle permet la production en série tout en gardant un haut niveau artisanal.'}
              {histoireTab === 'XXe' &&
                'La montre-bracelet s’impose, l’ère du quartz bouleverse le marché, et la Suisse se repositionne sur le segment du luxe et de la précision.'}
              {histoireTab === 'XXIe' &&
                'L’innovation continue : matériaux high-tech, silicium, digitalisation et smartwatches marquent le XXIe siècle horloger.'}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------------- ECOSYSTEME ---------------- */}
      <motion.section
        id="ecosysteme"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-24 px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-serif text-[#E1263A] text-center font-bold mb-4">
          Écosystème Industriel
        </h2>
        <p className="text-center text-lg mb-12 opacity-80">
          Districts horlogers, formation et chaîne d'approvisionnement
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <Image
              src="/images/districts_horlogers_suisse.png"
              alt="Districts horlogers"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md"
          >
            <div className="flex gap-2 flex-wrap mb-4">
              {['Jura', 'Geneve', 'Joux'].map(region => (
                <button
                  key={region}
                  onClick={() => setEcosystemeTab(region as any)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                    ecosystemeTab === region
                      ? 'bg-[#E1263A] text-white border-[#E1263A]'
                      : 'border-gray-300 hover:border-[#E1263A] hover:text-[#E1263A]'
                  }`}
                >
                  {region === 'Geneve'
                    ? 'Genève'
                    : region === 'Joux'
                    ? 'Vallée de Joux'
                    : region}
                </button>
              ))}
            </div>

            <motion.p
              key={ecosystemeTab}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {ecosystemeTab === 'Jura' &&
                'Le Jura et Bienne regroupent les grandes manufactures suisses, cœur historique de la “Watch Valley”.'}
              {ecosystemeTab === 'Geneve' &&
                'Genève concentre les maisons les plus prestigieuses et le Poinçon de Genève, symbole de perfection artisanale.'}
              {ecosystemeTab === 'Joux' &&
                'La Vallée de Joux est le berceau des complications horlogères, abritant les plus grands maîtres du mouvement.'}
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* ---------------- AVENIR ---------------- */}
      <motion.section
        id="avenir"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-24 px-6 bg-neutral-100 dark:bg-neutral-900/40"
      >
        <h2 className="text-4xl font-serif text-[#E1263A] text-center font-bold mb-4">
          Vision d'Avenir
        </h2>
        <p className="text-center text-lg mb-12 opacity-80">
          Durabilité, digitalisation et nouveaux matériaux
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInUp}
            className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md"
          >
            <div className="flex gap-2 flex-wrap mb-4">
              {['Durabilité', 'Digitalisation', 'Matériaux'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setAvenirTab(opt as any)}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition ${
                    avenirTab === opt
                      ? 'bg-[#E1263A] text-white border-[#E1263A]'
                      : 'border-gray-300 hover:border-[#E1263A] hover:text-[#E1263A]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <motion.p key={avenirTab} variants={fadeInUp} initial="hidden" animate="visible">
              {avenirTab === 'Durabilité' &&
                "L'industrie horlogère suisse s'engage vers une production durable : or éthique, recyclage, énergies vertes."}
              {avenirTab === 'Digitalisation' &&
                'L’intégration du numérique transforme la fabrication, le service client et les montres connectées.'}
              {avenirTab === 'Matériaux' &&
                'Les matériaux du futur : graphène, composites légers et céramiques avancées repoussent les limites.'}
            </motion.p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Image
              src="/images/atelier_artisanal_traditionnel.png"
              alt="Atelier artisanal"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* ---------------- FOOTER ---------------- */}
      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-black text-white py-20 px-6"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-[#E1263A] font-serif text-xl mb-4">HorloLearn</h4>
            <p className="opacity-70 mb-4">
              L'excellence et l'innovation dans les matériaux horlogers suisses au service du
              savoir-faire.
            </p>
            <div className="flex gap-4 opacity-70">
              <Link href="#">Twitter</Link>
              <Link href="#">LinkedIn</Link>
              <Link href="#">YouTube</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[#E1263A] font-serif text-xl mb-4">Navigation</h4>
            <ul className="space-y-2 opacity-80">
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#histoire">Histoire</a></li>
              <li><a href="#ecosysteme">Écosystème</a></li>
              <li><a href="#avenir">Avenir</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#E1263A] font-serif text-xl mb-4">Ressources</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">Recherches</Link></li>
              <li><Link href="#">Partenaires</Link></li>
              <li><Link href="#">Actualités</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#E1263A] font-serif text-xl mb-4">Contact</h4>
            <ul className="space-y-2 opacity-80">
              <li><Link href="#">À propos</Link></li>
              <li><Link href="#">Équipe</Link></li>
              <li><Link href="#">Presse</Link></li>
              <li><Link href="#">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center opacity-70 text-sm">
          © 2025 HorloLearn — Rapport de Référence Mondial sur les Matériaux Horlogers Suisses
        </div>
      </motion.footer>
    </main>
  )
}
