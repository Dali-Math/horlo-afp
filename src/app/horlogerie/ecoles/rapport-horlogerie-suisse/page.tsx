'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  ChevronRight, 
  FileText,
  Clock,
  Award,
  TrendingUp,
  Globe
} from 'lucide-react'

export default function RapportHorlogerieSuisse() {
  const [isLoading, setIsLoading] = useState(true)

  const stats = [
    { icon: Award, label: 'Excellence Suisse', value: '100%' },
    { icon: TrendingUp, label: 'Croissance Annuelle', value: '+8.5%' },
    { icon: Globe, label: 'Pays Exportateurs', value: '150+' },
    { icon: Clock, label: 'Années d\'Histoire', value: '500+' },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-amber-500/10">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link 
              href="/suisse" 
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Horlogerie Suisse
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Rapport 2024</span>
          </div>

          {/* Title Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-amber-400">Rapport Officiel 2024</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-white">L'Horlogerie</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500">
                  Suisse
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Excellence, tradition et innovation au cœur de l'industrie horlogère mondiale. 
                Découvrez l'analyse complète du secteur suisse.
              </p>

              {/* Info Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                <FileText className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">
                  Rapport officiel réservé à la consultation en ligne
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <stat.icon className="w-5 h-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-amber-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Document Viewer Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="relative">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm rounded-2xl">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Chargement du rapport...</p>
              </div>
            </div>
          )}

          {/* Document Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-slate-900">
            {/* Frame Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50 backdrop-blur-sm border-b border-amber-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <FileText className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">
                    Rapport Horlogerie Suisse 2024
                  </h3>
                  <p className="text-xs text-gray-400">
                    Document officiel - Dernière mise à jour : Octobre 2024
                  </p>
                </div>
              </div>
            </div>

            {/* iFrame */}
            <iframe
              src="/horlogerie/rapport-horlogerie-suisse.html"
              className="w-full h-[150vh] bg-white"
              onLoad={() => setIsLoading(false)}
              title="Rapport Horlogerie Suisse 2024"
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-amber-500/20 rounded-xl">
                <Award className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  À propos de ce rapport
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-3xl">
                  Ce document présente une analyse approfondie de l'industrie horlogère suisse, 
                  couvrant les aspects économiques, techniques et culturels qui font la renommée 
                  mondiale de l'horlogerie helvétique. Il s'adresse aux professionnels, étudiants 
                  et passionnés d'horlogerie.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">150+</div>
                <div className="text-sm text-gray-400">Pages d'analyse</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">2024</div>
                <div className="text-sm text-gray-400">Données actualisées</div>
              </div>
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="text-2xl font-bold text-amber-400 mb-1">🇨🇭</div>
                <div className="text-sm text-gray-400">Made in Switzerland</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
