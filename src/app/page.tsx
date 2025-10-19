'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Clock, Sparkles, TrendingUp, Users, BookOpen, Video, Download, 
  Award, ChevronRight, Play, MapPin, Zap, Heart, Star, ArrowRight,
  Settings, CheckCircle2, Trophy, Target, Compass, Rocket
} from 'lucide-react'

export default function HomePage() {
  const [activeOnboarding, setActiveOnboarding] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [liveUsers, setLiveUsers] = useState(47)

  // Animation des statistiques au scroll
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section')
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight && !statsAnimated) {
          setStatsAnimated(true)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [statsAnimated])

  // Simulation utilisateurs en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const profiles = [
    {
      id: 'beginner',
      icon: '🔰',
      title: 'Débutant',
      subtitle: 'Curieux',
      description: 'Je découvre l\'horlogerie',
      color: 'blue'
    },
    {
      id: 'amateur',
      icon: '⚙️',
      title: 'Pratiquant',
      subtitle: 'Amateur',
      description: 'J\'ai un atelier',
      color: 'green'
    },
    {
      id: 'expert',
      icon: '🏆',
      title: 'Expert',
      subtitle: 'Professionnel',
      description: 'Je maîtrise',
      color: 'amber'
    }
  ]

  const interests = [
    { id: 'demontage', icon: '🔧', label: 'Démontage / Remontage' },
    { id: 'histoire', icon: '📚', label: 'Histoire horlogère' },
    { id: 'complications', icon: '⚙️', label: 'Complications techniques' },
    { id: 'restauration', icon: '🎨', label: 'Restauration' },
    { id: 'comparatifs', icon: '📊', label: 'Comparatifs mouvements' },
    { id: 'videos', icon: '🎥', label: 'Tutoriels vidéo' },
    { id: 'pdf', icon: '📖', label: 'Documentation PDF' },
    { id: 'manufactures', icon: '🏭', label: 'Manufactures suisses' }
  ]

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    )
  }

  const startOnboarding = () => {
    setActiveOnboarding(true)
    setOnboardingStep(1)
  }

  const nextOnboardingStep = () => {
    if (onboardingStep < 3) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setActiveOnboarding(false)
      // Rediriger vers dashboard personnalisé
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      
      {/* HERO SECTION IMMERSIVE */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Fond animé avec engrenages SVG */}
        <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10">
          <svg className="absolute w-full h-full" viewBox="0 0 1200 800">
            {/* Engrenages animés */}
            <g className="animate-spin-slow origin-center" style={{ transformOrigin: '300px 200px', animationDuration: '20s' }}>
              <circle cx="300" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="8" className="text-blue-600 dark:text-blue-400"/>
              <circle cx="300" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-600 dark:text-blue-400"/>
            </g>
            <g className="animate-spin-slow origin-center" style={{ transformOrigin: '900px 300px', animationDuration: '25s', animationDirection: 'reverse' }}>
              <circle cx="900" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="8" className="text-blue-600 dark:text-blue-400"/>
              <circle cx="900" cy="300" r="75" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-600 dark:text-blue-400"/>
            </g>
            <g className="animate-spin-slow origin-center" style={{ transformOrigin: '600px 600px', animationDuration: '30s' }}>
              <circle cx="600" cy="600" r="60" fill="none" stroke="currentColor" strokeWidth="6" className="text-blue-600 dark:text-blue-400"/>
              <circle cx="600" cy="600" r="45" fill="none" stroke="currentColor" strokeWidth="3" className="text-blue-600 dark:text-blue-400"/>
            </g>
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge animé */}
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-8 animate-pulse">
            <Sparkles className="w-5 h-5" />
            Plateforme Éducative Collaborative
          </div>

          {/* Titre principal */}
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            L'horlogerie suisse
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              n'a jamais été aussi accessible
            </span>
          </h1>

          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-12">
            Plongez dans l'univers du savoir-faire horloger avec la première plateforme éducative collaborative francophone
          </p>

          {/* Stats animées */}
          <div id="stats-section" className="flex items-center justify-center gap-6 flex-wrap mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl px-8 py-6 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[180px] hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {statsAnimated ? '2,500+' : '0'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Ressources partagées</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl px-8 py-6 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[180px] hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {statsAnimated ? '1,200+' : '0'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Passionnés actifs</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl px-8 py-6 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[180px] hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {statsAnimated ? '150h+' : '0'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Contenu vidéo</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl px-8 py-6 shadow-lg border border-slate-200 dark:border-slate-700 min-w-[180px] hover:scale-105 transition-transform">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-1">
                0€
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">D'inscription</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={startOnboarding}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl transition-all flex items-center gap-3"
            >
              <Rocket className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              Commencer l'aventure
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/theorie"
              className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all border-2 border-slate-200 dark:border-slate-700 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Explorer les cours
            </Link>
          </div>

          {/* Utilisateurs en ligne */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm">{liveUsers} passionnés en ligne maintenant</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-slate-400 dark:text-slate-600 rotate-90" />
        </div>
      </section>

      {/* ONBOARDING MODAL */}
      {activeOnboarding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Étape {onboardingStep} / 3
                </span>
                <button
                  onClick={() => setActiveOnboarding(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(onboardingStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Étape 1 : Profil */}
            {onboardingStep === 1 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Qui êtes-vous ? 🧑‍🎓</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Choisissez votre niveau pour personnaliser votre expérience
                </p>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {profiles.map(profile => (
                    <button
                      key={profile.id}
                      onClick={() => setSelectedProfile(profile.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        selectedProfile === profile.id
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 shadow-lg scale-105'
                          : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                      }`}
                    >
                      <div className="text-4xl mb-3">{profile.icon}</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {profile.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {profile.subtitle}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {profile.description}
                      </p>
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextOnboardingStep}
                  disabled={!selectedProfile}
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Étape 2 : Intérêts */}
            {onboardingStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Qu'est-ce qui vous passionne ? 💡</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Sélectionnez vos centres d'intérêt (plusieurs choix possibles)
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {interests.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                        selectedInterests.includes(interest.id)
                          ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
                      }`}
                    >
                      <span className="text-2xl">{interest.icon}</span>
                      <span className="text-slate-900 dark:text-white font-medium flex-1">
                        {interest.label}
                      </span>
                      {selectedInterests.includes(interest.id) && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setOnboardingStep(1)}
                    className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-4 rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={nextOnboardingStep}
                    disabled={selectedInterests.length === 0}
                    className="flex-1 bg-blue-600 dark:bg-blue-500 text-white px-6 py-4 rounded-xl font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuer
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3 : Dashboard personnalisé */}
            {onboardingStep === 3 && (
              <div>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Votre parcours personnalisé 🎯</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Voici vos prochaines étapes recommandées
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Module recommandé #1
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      Les bases du mouvement mécanique - Débutants
                    </p>
                    <Link href="/theorie" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Commencer maintenant
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-600 dark:border-green-400 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Video className="w-5 h-5 text-green-600 dark:text-green-400" />
                      Tutoriel suggéré
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      Démontage ETA 2824-2 (vidéo 15 min)
                    </p>
                    <button className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:underline">
                      Regarder maintenant
                      <Play className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-600 dark:border-amber-400 p-6 rounded-lg">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <Download className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      Ressource à télécharger
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 mb-3">
                      Guide complet ETA 2824-2 (PDF haute résolution)
                    </p>
                    <button className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold hover:underline">
                      Télécharger gratuitement
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={nextOnboardingStep}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  Commencer mon apprentissage
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARCOURS VISUELS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center">Commencez maintenant</h2>
          <p className="text-center text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            Choisissez le parcours qui vous correspond
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Parcours 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                🚀 Démarrage Rapide
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                30 minutes pour comprendre les bases
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Les bases du mouvement mécanique
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Identifier les composants
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Quiz de validation
                </div>
              </div>
              <Link
                href="/theorie"
                className="w-full bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                Commencer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Parcours 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-blue-600 dark:border-blue-400 p-8 hover:shadow-2xl transition-all hover:scale-105 relative">
              <div className="absolute -top-3 -right-3 bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                POPULAIRE
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Settings className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                ⚙️ Parcours Pratique
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                5 heures de formation complète
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Démontage ETA 2824
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Huilage et remontage
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Réglage de précision
                </div>
              </div>
              <Link
                href="/pratique"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Découvrir
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Parcours 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 p-8 hover:shadow-2xl transition-all hover:scale-105">
              <div className="bg-amber-100 dark:bg-amber-900/30 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                🎓 Maîtrise Complète
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                20 heures de formation avancée
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Programme complet AFP
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Complications & restauration
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  Certification communautaire
                </div>
              </div>
              <Link
                href="/theorie"
                className="w-full bg-amber-600 dark:bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                Explorer
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION "VOUS NE SAVIEZ PAS..." */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">Le saviez-vous ?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 rounded-xl border-l-4 border-blue-600 dark:border-blue-400">
              <div className="text-4xl mb-4">💎</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                La Suisse produit moins de 3% des montres mondiales mais représente <strong className="text-slate-900 dark:text-white">50% de la valeur</strong> du marché horloger.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-8 rounded-xl border-l-4 border-green-600 dark:border-green-400">
              <div className="text-4xl mb-4">⏱️</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Un mouvement ETA 2824-2 bat <strong className="text-slate-900 dark:text-white">28,800 fois par heure</strong>, soit 8 battements par seconde pendant des années !
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-8 rounded-xl border-l-4 border-amber-600 dark:border-amber-400">
              <div className="text-4xl mb-4">🏔️</div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                La Vallée de Joux abrite les <strong className="text-slate-900 dark:text-white">plus grandes manufactures</strong> de haute horlogerie au monde depuis 1740.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE FEED COMMUNAUTAIRE */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Activité en direct</h2>
              <p className="text-slate-700 dark:text-slate-300">La communauté HorloLearn en temps réel</p>
            </div>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">En direct</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">PM</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">Pierre M.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Il y a 2 min</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                🆕 A partagé : "Guide démontage Valjoux 7750"
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Download className="w-4 h-4" />
                <span>Télécharger</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">SD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">Sophie D.</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Il y a 5 min</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                ⭐ A complété : "Quiz Échappement Suisse"
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <Trophy className="w-4 h-4" />
                <span>Score : 10/10</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">12</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white">Discussion active</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Il y a 8 min</p>
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                💬 "Meilleurs outils de réglage"
              </p>
              <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                <Users className="w-4 h-4" />
                <span>Rejoindre la discussion</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/communaute"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Voir toute l'activité
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à maîtriser l'art horloger ?
            </h2>
            <p className="text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto text-lg">
              Rejoignez 1,200+ passionnés et accédez gratuitement à toutes les ressources
            </p>
            <button
              onClick={startOnboarding}
              className="bg-white text-blue-600 dark:text-blue-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-100 transition-colors shadow-lg inline-flex items-center gap-3"
            >
              <Rocket className="w-6 h-6" />
              Commencer gratuitement
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
