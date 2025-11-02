'use client'

import { useState } from 'react'

type PeriodeKey = 'XVI-XVII' | 'XVIII-XIX' | 'XX' | 'XXI'

const PERIODES = {
  'XVI-XVII': {
    titre: "Les Origines : Orfèvrerie et Métaux Précieux",
    texte: [
      "L'horlogerie suisse naît à Genève au XVIe siècle.",
      "L'interdiction du port d'objets ornementaux par Jean Calvin contraint les orfèvres à se reconvertir.",
      "Les premiers garde-temps sont naturellement fabriqués en or et en argent.",
    ],
    materiaux: ['Or 18 carats', 'Argent sterling', 'Platine'],
  },
  'XVIII-XIX': {
    titre: "L’Ère de la Mécanique et des Alliages",
    texte: [
      "Le développement industriel permet la production d’alliages comme le laiton et l’acier trempé.",
      "L’ornementation progresse avec l’émaillage et la gravure fine.",
    ],
    materiaux: ['Acier', 'Laiton', 'Émail', 'Cuivre doré'],
  },
  XX: {
    titre: "Modernisation et Nouvelles Technologies",
    texte: [
      "L’arrivée du quartz et de nouveaux matériaux comme le titane et la céramique change l’industrie.",
      "Les montres deviennent à la fois précises et accessibles.",
    ],
    materiaux: ['Quartz', 'Titane', 'Céramique'],
  },
  XXI: {
    titre: "Innovation et Renaissance",
    texte: [
      "Retour à la haute horlogerie mécanique tout en intégrant les matériaux high-tech.",
      "Silicium, carbone et composites révolutionnent la précision.",
    ],
    materiaux: ['Silicium', 'Carbone', 'Composites', 'Or gris'],
  },
}

export default function Chronologie() {
  const [periode, setPeriode] = useState<PeriodeKey>('XVI-XVII')
  const p = PERIODES[periode]

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
      <h2 className="text-3xl font-bold text-center text-amber-400 mb-4">
        Chronologie Historique
      </h2>
      <p className="text-center text-gray-300 mb-10">
        L’évolution des matériaux horlogers du XVIe siècle à aujourd’hui
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image illustrative */}
        <div className="overflow-hidden rounded-2xl shadow-2xl">
          <img
            src="/images/materiaux/evolution.jpg"
            alt="Évolution horlogerie suisse"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bloc texte interactif */}
        <div className="bg-slate-900/40 border border-amber-500/20 rounded-2xl p-8 backdrop-blur-sm">
          {/* Onglets */}
          <div className="flex flex-wrap gap-3 mb-6">
            {(['XVI-XVII', 'XVIII-XIX', 'XX', 'XXI'] as PeriodeKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setPeriode(key)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition ${
                  periode === key
                    ? 'bg-amber-600 text-white border-amber-500'
                    : 'bg-transparent text-gray-200 border-white/10 hover:bg-white/5'
                }`}
              >
                {key === 'XVI-XVII'
                  ? 'XVIe–XVIIe'
                  : key === 'XVIII-XIX'
                  ? 'XVIIIe–XIXe'
                  : key === 'XX'
                  ? 'XXe siècle'
                  : 'XXIe siècle'}
              </button>
            ))}
          </div>

          {/* Contenu dynamique */}
          <h3 className="text-2xl font-bold text-amber-400 mb-4">{p.titre}</h3>
          <div className="space-y-2 text-gray-300 leading-relaxed mb-6">
            {p.texte.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {p.materiaux.map((m, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
