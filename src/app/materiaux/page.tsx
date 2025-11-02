'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ChevronRight, 
  Gem, 
  Layers, 
  Sparkles, 
  Award,
  FileText 
} from 'lucide-react'

export default function MateriauxHorlogersSuisse() {
  const [isLoading, setIsLoading] = useState(true)

  const infos = [
    { icon: Gem, label: 'Matériaux d’Excellence', value: '9 Types' },
    { icon: Layers, label: 'Catégories', value: '3 Principales' },
    { icon: Sparkles, label: 'Innovations récentes', value: 'Silicium, Titane' },
    { icon: Award, label: 'Origine', value: '100% Suisse' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-24 right-24 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-24 left-24 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link 
              href="/horlogerie" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Horlogerie Suisse
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Matériaux Horlogers</span>
          </div>

          {/* Title */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-amber-400">
                  Swiss Watch Materials
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">Excellence et Innovation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                  dans les Matériaux Horlogers
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                L’union parfaite entre tradition, recherche et design suisse. 
                Découvrez comment les matériaux d’exception façonnent l’avenir 
                de la haute horlogerie.
              </p>

              <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Page de référence — HorloLearn.ch
                </span>
              </div>
            </div>

            {/* Statistiques */}
            <div className="grid grid-cols-2 gap-4">
              {infos.map((info, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <info.icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    {info.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {info.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- DOCUMENT VIEWER --- */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Chargement de la page...</p>
              </div>
            </div>
          )}

          <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Layers className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Matériaux Horlogers Suisses
                  </h3>
                  <p className="text-xs text-gray-400">
                    Présentation officielle des matériaux utilisés dans la haute horlogerie
                  </p>
                </div>
              </div>
            </div>

            {/* Intégration de la page HTML */}
            <iframe
              src="/materiaux-horlogers-suisse.html"
              className="w-full h-[150vh] bg-white"
              onLoad={() => setIsLoading(false)}
              title="Matériaux Horlogers Suisses"
            />
          </div>
        </div>
      </section>

      {/* --- INFO SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  À propos de cette page
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-3xl">
                  Cette page met en avant les principaux matériaux utilisés en horlogerie suisse :
                  acier inoxydable, or, laiton, titane, céramique, silicium, rubis et bois. 
                  Chaque matériau représente un équilibre unique entre innovation, esthétique et tradition.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">9</div>
                <div className="text-sm text-gray-400">Matériaux présentés</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">2025</div>
                <div className="text-sm text-gray-400">Données mises à jour</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">🇨🇭</div>
                <div className="text-sm text-gray-400">Swiss Made Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
