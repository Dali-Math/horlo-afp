'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  BookOpen, Users, Download, Video, Sparkles, 
  ArrowRight, TrendingUp, Heart, Clock, Share2
} from 'lucide-react'

export default function HomePage() {
  const [liveUsers, setLiveUsers] = useState(48)

  // Simulation utilisateurs en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      
      {/* HERO SECTION ÉPURÉ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Cercles décoratifs subtils */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 border-4 border-blue-400 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 border-4 border-blue-500 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-blue-300 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            Plateforme Éducative Collaborative
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            L'horlogerie suisse
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              n'a jamais été aussi accessible
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Plongez dans l'univers du savoir-faire horloger avec la première plateforme éducative collaborative francophone
          </p>

          {/* Stats minimalistes */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 min-w-[140px]">
              <div className="text-3xl font-bold text-blue-400 mb-1">2,500+</div>
              <div className="text-sm text-slate-400">Ressources partagées</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 min-w-[140px]">
              <div className="text-3xl font-bold text-blue-400 mb-1">1,200+</div>
              <div className="text-sm text-slate-400">Passionnés actifs</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 min-w-[140px]">
              <div className="text-3xl font-bold text-blue-400 mb-1">150h+</div>
              <div className="text-sm text-slate-400">Contenu vidéo</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl px-6 py-4 min-w-[140px]">
              <div className="text-3xl font-bold text-green-400 mb-1">0€</div>
              <div className="text-sm text-slate-400">D'inscription</div>
            </div>
          </div>

          {/* CTAs simples */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Link
              href="/theorie"
              className="group bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/50"
            >
              Commencer l'aventure
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ressources"
              className="bg-slate-800/70 hover:bg-slate-700 border border-slate-600 text-white px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Explorer les ressources
            </Link>
          </div>

          {/* Utilisateurs en ligne */}
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">{liveUsers} passionnés en ligne maintenant</span>
          </div>
        </div>
      </section>

      {/* SECTION COMMUNAUTAIRE */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-3 text-center">Une bibliothèque vivante</h2>
          <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto">
            Par les passionnés, pour les passionnés. Aucune certification, juste le plaisir du partage.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all">
              <div className="bg-blue-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Théorie Accessible</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Cours détaillés, schémas annotés et glossaire illustré pour comprendre l'horlogerie suisse.
              </p>
              <Link href="/theorie" className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-2">
                Découvrir
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all">
              <div className="bg-green-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Video className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Tutoriels Pratiques</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Démontage, remontage et réglage avec des guides vidéo détaillés et plans techniques.
              </p>
              <Link href="/pratique" className="text-green-400 hover:text-green-300 font-semibold inline-flex items-center gap-2">
                Explorer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all">
              <div className="bg-purple-500/10 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Communauté Active</h3>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Partagez vos découvertes, posez vos questions et apprenez avec d'autres passionnés.
              </p>
              <Link href="/communaute" className="text-purple-400 hover:text-purple-300 font-semibold inline-flex items-center gap-2">
                Rejoindre
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESSOURCE DE LA SEMAINE */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 to-blue-900/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                <TrendingUp className="w-4 h-4" />
                Ressource de la semaine
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                Guide complet ETA 2824-2
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed max-w-2xl">
                Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage et procédures de réglage. Partagé par la communauté.
              </p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Télécharger gratuitement
                </button>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Lecture : 15 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITÉ RÉCENTE */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Activité récente</h2>
              <p className="text-slate-400">Ce qui se passe sur HorloLearn</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">En direct</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Activity 1 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-400">PM</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Pierre M.</p>
                  <p className="text-xs text-slate-500">Il y a 2 min</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                📄 A partagé : "Guide démontage Valjoux 7750"
              </p>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-1">
                <Download className="w-4 h-4" />
                Télécharger
              </button>
            </div>

            {/* Activity 2 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-400">SD</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Sophie D.</p>
                  <p className="text-xs text-slate-500">Il y a 5 min</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                ✅ A complété : "Quiz Échappement Suisse"
              </p>
              <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                <Heart className="w-4 h-4" />
                Score : 10/10
              </div>
            </div>

            {/* Activity 3 */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-purple-400">12</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Discussion active</p>
                  <p className="text-xs text-slate-500">Il y a 8 min</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                💬 "Meilleurs outils de réglage"
              </p>
              <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                Rejoindre
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL SIMPLE */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à explorer l'horlogerie ?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Rejoignez 1,200+ passionnés et accédez gratuitement à toutes les ressources partagées
            </p>
            <Link
              href="/theorie"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg"
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
