'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { 
  BookOpen, Users, Download, Video, Sparkles, ArrowRight, 
  TrendingUp, Heart, Clock, Share2, Zap, Trophy, Star, ChevronDown
} from 'lucide-react'

export default function HomePage() {
  const [liveUsers, setLiveUsers] = useState(48)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden">
      
      {/* HERO SECTION 3D AVEC PARALLAX */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Fond animé avec grille 3D */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grille perspective */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              transform: `perspective(1000px) rotateX(60deg) translateZ(-200px) translateY(${mousePosition.y * 2}px) translateX(${mousePosition.x * 2}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
          
          {/* Particules flottantes */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: 0.2 + Math.random() * 0.3
              }}
            />
          ))}

          {/* Cercles 3D avec effet depth */}
          <div 
            className="absolute top-20 left-10 w-96 h-96 border-4 border-blue-500 rounded-full blur-sm"
            style={{
              transform: `translate3d(${mousePosition.x * -15}px, ${mousePosition.y * -15}px, 0) scale(${1 + mousePosition.y * 0.01})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute bottom-20 right-20 w-80 h-80 border-4 border-cyan-500 rounded-full blur-sm"
            style={{
              transform: `translate3d(${mousePosition.x * 20}px, ${mousePosition.y * 20}px, 0) scale(${1 - mousePosition.y * 0.01})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-indigo-500 rounded-full blur-sm"
            style={{
              transform: `translate3d(calc(-50% + ${mousePosition.x * 10}px), calc(-50% + ${mousePosition.y * 10}px), 0) rotate(${mousePosition.x}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          />

          {/* Engrenage SVG animé 3D */}
          <svg
            className="absolute top-1/4 right-1/4 w-64 h-64 opacity-10"
            viewBox="0 0 200 200"
            style={{
              transform: `rotate(${mousePosition.x * 2}deg) scale(${1 + mousePosition.y * 0.02})`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="text-blue-400"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-400"/>
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={100 + 60 * Math.cos((i * 30 * Math.PI) / 180)}
                y2={100 + 60 * Math.sin((i * 30 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="3"
                className="text-blue-400"
              />
            ))}
          </svg>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          {/* Badge animé avec glow */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-xl border border-blue-400/50 text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg shadow-blue-500/50 animate-pulse">
            <Sparkles className="w-5 h-5" />
            Bibliothèque Collaborative
          </div>

          {/* Titre avec effet gradient animé */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white">L'horlogerie suisse</span>
            <br />
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-gradient"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite'
              }}
            >
              n'a jamais été aussi accessible
            </span>
          </h1>

          <p className="text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Explorez <strong className="text-white">2,500+ ressources</strong> partagées par des passionnés pour des passionnés
          </p>

          {/* Stats cards avec effet 3D hover */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
            {[
              { value: '2,500+', label: 'Ressources', icon: BookOpen, color: 'blue' },
              { value: '1,200+', label: 'Passionnés', icon: Users, color: 'green' },
              { value: '150h+', label: 'Vidéos', icon: Video, color: 'purple' },
              { value: '100%', label: 'Gratuit', icon: Star, color: 'amber' }
            ].map((stat, index) => (
              <div
                key={index}
                className="group bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-8 py-6 min-w-[160px] hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x * 0.5}deg) rotateX(${mousePosition.y * -0.5}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <stat.icon className={`w-8 h-8 text-${stat.color}-400 mx-auto mb-2 group-hover:scale-125 transition-transform`} />
                <div className={`text-4xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs avec effet glow */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            <Link
              href="/theorie"
              className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/80 hover:scale-105"
            >
              <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Explorer maintenant
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            </Link>
            <Link
              href="/communaute"
              className="group bg-slate-800/70 backdrop-blur-xl hover:bg-slate-700/70 border-2 border-slate-600 hover:border-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 hover:scale-105"
            >
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Rejoindre la communauté
            </Link>
          </div>

          {/* Live indicator avec animation pulse */}
          <div className="inline-flex items-center gap-3 bg-green-500/10 backdrop-blur-xl border border-green-500/30 px-6 py-3 rounded-full">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-300 font-semibold">{liveUsers} passionnés en ligne</span>
          </div>
        </div>

        {/* Scroll indicator animé */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-400" />
        </div>
      </section>

      {/* SECTION CARTES INTERACTIVES 3D */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Une bibliothèque vivante</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Aucune inscription • Aucun diplôme • Juste la passion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: BookOpen, 
                title: 'Documentation', 
                desc: 'Guides, schémas techniques et glossaire illustré',
                color: 'blue',
                link: '/theorie'
              },
              { 
                icon: Video, 
                title: 'Tutoriels', 
                desc: 'Vidéos détaillées : démontage, huilage, réglage',
                color: 'green',
                link: '/pratique'
              },
              { 
                icon: Users, 
                title: 'Communauté', 
                desc: 'Partagez et apprenez avec des passionnés',
                color: 'purple',
                link: '/communaute'
              }
            ].map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  transform: `perspective(1000px) rotateY(0deg)`,
                  transition: 'all 0.3s ease-out'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left - rect.width / 2
                  const y = e.clientY - rect.top - rect.height / 2
                  card.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)'
                }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${card.color}-500/0 to-${card.color}-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`bg-${card.color}-500/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <card.icon className={`w-10 h-10 text-${card.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                  <div className={`text-${card.color}-400 font-semibold inline-flex items-center gap-2 group-hover:gap-4 transition-all`}>
                    Découvrir
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RESSOURCE DE LA SEMAINE - CARTE 3D */}
      <section className="py-32 px-4 bg-gradient-to-b from-transparent to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div 
            className="group relative bg-gradient-to-br from-slate-800/80 to-blue-900/40 backdrop-blur-2xl border-2 border-slate-700/50 rounded-3xl p-12 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)'
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-400/30">
                <TrendingUp className="w-5 h-5" />
                Ressource de la semaine
              </div>
              
              <h3 className="text-4xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                Guide complet ETA 2824-2
              </h3>
              
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Document PDF haute résolution : démontage complet, éclaté annoté, couples de serrage et procédures de réglage. Partagé par la communauté.
              </p>
              
              <div className="flex items-center gap-4 flex-wrap">
                <button className="group/btn bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-3 shadow-lg shadow-blue-600/50 hover:shadow-blue-500/80 hover:scale-105">
                  <Download className="w-6 h-6 group-hover/btn:animate-bounce" />
                  Télécharger gratuitement
                </button>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-5 h-5" />
                  <span>Lecture : 15 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVITÉ EN DIRECT - CARDS ANIMÉES */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">Activité en direct</h2>
              <p className="text-slate-400 text-lg">Ce qui se passe maintenant sur HorloLearn</p>
            </div>
            <div className="flex items-center gap-3 bg-green-500/10 backdrop-blur-xl border border-green-500/30 px-6 py-3 rounded-full">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-300 font-bold">LIVE</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Pierre M.', action: 'A partagé', content: '"Guide démontage Valjoux 7750"', icon: Download, color: 'blue', time: '2 min' },
              { name: 'Sophie D.', action: 'A complété', content: '"Quiz Échappement Suisse"', icon: Trophy, color: 'green', time: '5 min' },
              { name: '12 personnes', action: 'Discutent', content: '"Meilleurs outils de réglage"', icon: Share2, color: 'purple', time: '8 min' }
            ].map((activity, index) => (
              <div
                key={index}
                className={`group bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-${activity.color}-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-${activity.color}-500/20`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-${activity.color}-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`text-sm font-bold text-${activity.color}-400`}>
                      {activity.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{activity.name}</p>
                    <p className="text-xs text-slate-500">Il y a {activity.time}</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-4">
                  {activity.action} : {activity.content}
                </p>
                <button className={`text-${activity.color}-400 hover:text-${activity.color}-300 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all`}>
                  <activity.icon className="w-5 h-5" />
                  Voir plus
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL AVEC EFFET 3D */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-16 text-center overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(37, 99, 235, 0.5)'
            }}
          >
            {/* Animated circles */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl font-bold text-white mb-6">
                Prêt à explorer ?
              </h2>
              <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                Rejoignez <strong>1,200+ passionnés</strong> et accédez gratuitement à toutes les ressources
              </p>
              <Link
                href="/theorie"
                className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all shadow-2xl hover:scale-110 hover:shadow-white/30"
              >
                Commencer l'exploration
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
