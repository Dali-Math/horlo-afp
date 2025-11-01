'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export const metadata = {
  title: 'Matériaux Horlogers Suisses - HorloLearn',
  description:
    "Excellence et innovation dans les matériaux horlogers suisses – étude complète du savoir-faire et des innovations du secteur.",
}

export default function MateriauxHorlogersSuisse() {
  useEffect(() => {
    // Smooth scrolling
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
    <main className="text-gray-800 bg-white dark:bg-black dark:text-white">
      {/* Hero */}
      <section
        id="accueil"
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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:-translate-y-1 transition">
            <span className="stat-number block text-5xl font-bold text-white" data-target="50">
              0
            </span>
            <span className="text-sm opacity-80">% du marché mondial en valeur</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:-translate-y-1 transition">
            <span className="stat-number block text-5xl font-bold text-white" data-target="65">
              0
            </span>
            <span className="text-sm opacity-80">000 emplois en Suisse</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:-translate-y-1 transition">
            <span className="stat-number block text-5xl font-bold text-white" data-target="500">
              0
            </span>
            <span className="text-sm opacity-80">ans d'innovation continue</span>
          </div>
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
      </section>

      {/* Section – Executive Summary */}
      <section id="executive-summary" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-[#E1263A] text-center font-bold mb-4">
          Executive Summary
        </h2>
        <p className="text-center text-lg mb-12 max-w-2xl mx-auto opacity-80">
          L'écosystème horloger suisse représente un modèle unique au monde,
          alliant savoir-faire ancestral, innovation technologique et excellence
          de la qualité pour maintenir son leadership mondial.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-serif text-[#E1263A] mb-4">
              Leadership Mondial Incontesté
            </h3>
            <p className="mb-4">
              La Suisse domine le marché horloger mondial avec plus de 50% de parts de marché en
              valeur. Cette supériorité repose sur un écosystème industriel intégré unique,
              combinant formation d'excellence, innovation continue et positionnement premium.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Innovation continue en matériaux de pointe</li>
              <li>Écosystème industriel intégré et performant</li>
              <li>Formation d'excellence et transmission du savoir</li>
              <li>Positionnement premium sur les marchés mondiaux</li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/materials_dashboard.png"
              alt="Dashboard des matériaux"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Matériaux Traditionnels */}
      <section id="materiaux" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-[#E1263A] text-center font-bold mb-4">
          Matériaux Traditionnels
        </h2>
        <p className="text-center text-lg mb-12 opacity-80">
          Les piliers métalliques de l'horlogerie suisse
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md hover:-translate-y-1 transition">
            <h3 className="text-2xl font-serif text-[#E1263A] mb-3">Or 18 Carats</h3>
            <p className="mb-4">
              L'or 18 carats reste le matériau de prestige par excellence, disponible en jaune, rose
              et blanc, alliant beauté intemporelle et robustesse.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Résistance à la corrosion et à l'oxydation</li>
              <li>Densité élevée et robustesse</li>
              <li>Aspect noble et prestigieux</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md hover:-translate-y-1 transition">
            <h3 className="text-2xl font-serif text-[#E1263A] mb-3">Acier Inoxydable 316L</h3>
            <p className="mb-4">
              Matériau de référence pour les boîtiers et bracelets modernes grâce à sa résistance
              exceptionnelle et sa biocompatibilité.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Résistance supérieure à la corrosion</li>
              <li>Hypoallergénique et durable</li>
              <li>Facile à polir et entretenir</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-md hover:-translate-y-1 transition">
            <h3 className="text-2xl font-serif text-[#E1263A] mb-3">Platine</h3>
            <p className="mb-4">
              Métal rare et dense, symbole du luxe absolu, utilisé pour les pièces les plus
              prestigieuses.
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Densité la plus élevée des métaux précieux</li>
              <li>Résistance incomparable à l'usure</li>
              <li>Valeur et rareté exceptionnelles</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
