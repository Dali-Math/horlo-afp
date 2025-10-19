'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Import dynamique de Three.js (chargé uniquement côté client, sans SSR)
const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
})

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)

  // Toggle theme
  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div
      className="min-h-screen transition-colors duration-500"
      style={{
        backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
        color: isDark ? '#ffffff' : '#0a0a0a',
      }}
    >
      {/* Toggle Dark/Light */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full border-2 transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
          borderColor: '#d4af37',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
        }}
      >
        <span className="text-2xl">{isDark ? '☀️' : '🌙'}</span>
      </button>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas Three.js chargé dynamiquement */}
        <div 
          className="absolute inset-0"
          style={{ opacity: isDark ? 0.15 : 0.1 }}
        >
          <ThreeScene isDark={isDark} />
        </div>

        {/* Grille animée */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'gridMove 20s linear infinite',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 mb-8"
            style={{
              backgroundColor: isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(245, 245, 245, 0.8)',
              borderColor: '#d4af37',
              backdropFilter: 'blur(10px)',
            }}
          >
            <span className="text-xl">🇨🇭</span>
            <span
              className="font-semibold tracking-wider text-sm"
              style={{ color: '#d4af37' }}
            >
              HORLOGERIE SUISSE
            </span>
          </div>

          {/* Titre */}
          <h1
            className="font-light mb-6 leading-tight"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              letterSpacing: '0.5px',
              background: `linear-gradient(135deg, ${isDark ? '#ffffff' : '#0a0a0a'} 0%, #d4af37 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'fadeInDown 1s ease-out',
            }}
          >
            L'Excellence Horlogère
            <br />à Portée de Main
          </h1>

          {/* Sous-titre */}
          <p
            className="text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{
              color: isDark ? '#b0b0b0' : '#505050',
              animation: 'fadeInUp 1s ease-out 0.2s both',
            }}
          >
            Une bibliothèque vivante de savoirs horlogers partagés par des passionnés. 
            Tutoriels, ressources techniques et connaissances pratiques — entièrement gratuit.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-16">
            <Link
              href="/theorie"
              className="group px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: '#d4af37',
                color: '#0a0a0a',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
              }}
            >
              Explorer les Ressources →
            </Link>
            <Link
              href="/theorie"
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#d4af37',
                color: '#d4af37',
              }}
            >
              Découvrir HorloLearn
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ color: '#d4af37' }}
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION STATS */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: '100%', label: 'GRATUIT' },
              { value: '∞', label: 'RESSOURCES' },
              { value: '0', label: 'INSCRIPTION' },
              { value: '🇨🇭', label: 'QUALITÉ SUISSE' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
                }}
              >
                <div
                  className="text-5xl font-bold mb-3"
                  style={{ color: '#d4af37' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm tracking-widest"
                  style={{
                    color: isDark ? '#b0b0b0' : '#505050',
                    letterSpacing: '2px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION FEATURES */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-4xl font-light text-center mb-4"
            style={{ letterSpacing: '1px' }}
          >
            Une Plateforme Dédiée aux Passionnés
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-16"
            style={{
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
            }}
          />

          <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {[
              {
                emoji: '📚',
                title: 'Bibliothèque Technique',
                desc: 'Accédez à une collection complète de guides, schémas et documentation technique sur l\'horlogerie suisse.',
              },
              {
                emoji: '⚙️',
                title: 'Tutoriels Pratiques',
                desc: 'Apprenez le démontage, remontage et réglage avec des tutoriels détaillés étape par étape.',
              },
              {
                emoji: '🔍',
                title: 'Savoir-Faire Horloger',
                desc: 'Découvrez les secrets de fabrication des montres suisses et leur histoire fascinante.',
              },
              {
                emoji: '🤝',
                title: 'Communauté Passionnée',
                desc: 'Partagez vos connaissances et apprenez auprès d\'autres passionnés d\'horlogerie.',
              },
              {
                emoji: '🎯',
                title: 'Accès Immédiat',
                desc: 'Aucune inscription requise. Commencez votre exploration immédiatement et librement.',
              },
              {
                emoji: '🔄',
                title: 'Contenu Évolutif',
                desc: 'Nouvelles ressources ajoutées régulièrement par la communauté pour enrichir le savoir.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border-2 transition-all duration-400 hover:-translate-y-2"
                style={{
                  backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5',
                  borderColor: isDark ? '#2a2a2a' : '#e5e5e5',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4af37'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? '#2a2a2a' : '#e5e5e5'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p
                  style={{
                    color: isDark ? '#b0b0b0' : '#505050',
                    lineHeight: '1.8',
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION CTA FINALE */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-light mb-6"
            style={{ letterSpacing: '1px' }}
          >
            Prêt à Plonger dans l'Univers Horloger ?
          </h2>
          <p
            className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: isDark ? '#b0b0b0' : '#505050' }}
          >
            Rejoignez des milliers de passionnés qui explorent l'excellence horlogère suisse chaque jour. Aucune inscription, aucun engagement — juste la passion.
          </p>
          <Link
            href="/theorie"
            className="inline-block px-10 py-5 rounded-lg font-bold text-lg transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: '#d4af37',
              color: '#0a0a0a',
              boxShadow: '0 10px 30px rgba(212, 175, 55, 0.3)',
            }}
          >
            Commencer l'Exploration →
          </Link>
        </div>
      </section>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gridMove {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  )
}
