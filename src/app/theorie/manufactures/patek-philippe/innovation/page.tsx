'use client'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600', '700'] })

declare global {
  interface Window { THREE: any; VANTA: any }
}

const inventions = [
  {
    year: '1845',
    category: 'FONDATION',
    complexity: 85,
    title: 'Remontoir à Couronne',
    description: "L'invention de Jean Adrien Philippe qui a révolutionné l'industrie horlogère en permettant le remontage et le réglage des montres de manière inédite.",
    specs: [
      { label: 'Impact', value: 'Révolutionnaire' },
      { label: 'Adoption', value: 'Mondiale' },
    ],
  },
  {
    year: '1868',
    category: 'INNOVATION',
    complexity: 88,
    title: 'Montre-Bracelet',
    description: "La première montre-bracelet avec remontoir à couronne, créée pour la Comtesse Koscowicz, marquant le début d'une nouvelle ère horlogère.",
    specs: [
      { label: 'Précédent', value: 'Montres de poche' },
      { label: 'Innovation', value: 'Portable' },
    ],
  },
  {
    year: '1989',
    category: 'MASTERPIECE',
    complexity: 95,
    title: 'Calibre 89',
    description: "La montre la plus compliquée du monde en 1989 avec 33 complications, célébrant 150 ans d'excellence horlogère.",
    specs: [
      { label: 'Complications', value: '33 fonctions' },
      { label: 'Développement', value: '9 ans' },
    ],
  },
]

const timelineData = [
  { year: '1845', category: 'FONDATION', complexity: 90, title: 'Remontoir à Couronne', description: "Jean Adrien Philippe révolutionne l'horlogerie avec son invention du remontoir à couronne, permettant le remontage et le réglage des montres d'une manière jamais vue auparavant." },
  { year: '1889', category: 'ACOUSTIQUE', complexity: 90, title: 'Sonnerie à Répetition', description: "Développement d'un mécanisme de sonnerie breveté qui sonne les heures, les quarts et les minutes à la demande." },
  { year: '1925', category: 'CHRONOGRAPHE', complexity: 88, title: 'Calibre à Rattrapante', description: "Introduction du chronographe à rattrapante, permettant la mesure de temps intermédiaires sans arrêter le chronographe principal." },
  { year: '1962', category: 'MATÉRIAUX', complexity: 92, title: 'Spiral Silicium', description: "Patek Philippe pionnier dans l'utilisation du silicium pour les composants horlogers." },
  { year: '2011', category: 'PRÉCISION', complexity: 95, title: 'Oscillateur Gyromax®', description: "L'oscillateur Gyromax® révolutionnaire qui améliore la précision chronométrique." }
]

const futureTechs = [
  { icon: 'brain', title: 'IA Horlogère', status: 'BÊTA', color: 'blue', description: 'L\'intelligence artificielle révolutionne l\'ajustage des mouvements avec une précision inégalée.', specLabel: 'Précision améliorée', specValue: '+47%', progress: 94 },
  { icon: 'atom', title: 'Horlogerie Quantique', status: 'R&D', color: 'purple', description: 'L\'exploration des oscillateurs quantiques pour atteindre une stabilité temporelle jusque-là inégalée.', specLabel: 'Stabilité temporelle', specValue: '10^-12s', progress: 89 },
  { icon: 'leaf', title: 'Matériaux Durables', status: 'ECO', color: 'green', description: 'Développement de matériaux composites 100% recyclables et biodégradables.', specLabel: 'Réduction CO₂', specValue: '-78%', progress: 92 },
  { icon: 'microchip', title: 'Nano-Mécatronique', status: 'PROTOTYPE', color: 'red', description: 'Intégration de systèmes nano-mécatroniques pour des complications intelligentes.', specLabel: 'Taille des composants', specValue: 'Nanométrique', progress: 96 }
]

const techColorClasses: Record<string, string> = {
  blue: 'from-blue-600 to-blue-700',
  purple: 'from-purple-600 to-purple-700',
  green: 'from-green-600 to-green-700',
  red: 'from-red-600 to-red-700',
}
const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'FONDATION': return 'bg-yellow-500'
    case 'INNOVATION': return 'bg-blue-500'
    case 'MASTERPIECE': return 'bg-purple-500'
    case 'PRÉCISION': return 'bg-red-500'
    case 'CHRONOGRAPHE': return 'bg-green-500'
    case 'ACOUSTIQUE': return 'bg-purple-500'
    case 'MATÉRIAUX': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

export default function InnovationPage() {
  const router = useRouter()
  const script1Ref = useRef<HTMLScriptElement | null>(null)
  const script2Ref = useRef<HTMLScriptElement | null>(null)
  const vantaInstanceRef = useRef<any>(null)
  const threeReadyRef = useRef(false)
  const observersRef = useRef<IntersectionObserver[]>([])

  useEffect(() => {
    const loadScripts = async () => {
      return new Promise<void>((resolve) => {
        if (window.THREE) { threeReadyRef.current = true; resolve(); return }
        const script1 = document.createElement('script')
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
        script1.async = true
        script1.onload = () => { threeReadyRef.current = true; resolve() }
        script1.onerror = () => { resolve() }
        document.body.appendChild(script1)
        script1Ref.current = script1
      })
    }
    const initVanta = () => {
      if (!window.VANTA || !threeReadyRef.current) return
      const vantaElement = document.getElementById('vanta-bg')
      if (!vantaElement) return
      vantaInstanceRef.current = window.VANTA.HALO({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200, minWidth: 200,
        scale: 1, scaleMobile: 1,
        amplitudeFactor: 0.5, xOffset: 0.25, yOffset: 0.1, size: 1.5,
        backgroundColor: 0xf8f6f0, baseColor: 0xd4af37
      })
    }
    const script2 = document.createElement('script')
    script2.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.halo.min.js'
    script2.async = true
    script2.onload = () => { setTimeout(initVanta, 100) }
    document.body.appendChild(script2)
    script2Ref.current = script2

    // Scroll reveal + metrics
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    const scrollObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') })
    }, observerOptions)
    document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el))
    observersRef.current.push(scrollObserver)

    // Parallax Vanta
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = document.getElementById('vanta-bg')
      if (parallax) { parallax.style.transform = `translateY(${scrolled * 0.3}px)` }
    }
    window.addEventListener('scroll', handleScroll)

    loadScripts().then(() => setTimeout(() => { if (window.VANTA && threeReadyRef.current) initVanta() }, 250))
    return () => {
      if (vantaInstanceRef.current) vantaInstanceRef.current.destroy()
      script1Ref.current?.remove(); script2Ref.current?.remove()
      observersRef.current.forEach(observer => observer.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={`font-sans bg-cream overflow-x-hidden ${inter.className}`} style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        :root { --gold: #D4AF37; --deep-blue: #1a2332; --cream: #f8f6f0; --charcoal: #2c2c2c; }
        .hero-title { font-family: 'Playfair Display', serif; font-weight: 600; background: linear-gradient(135deg, var(--gold), #f4d03f); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .vanta-bg { position: absolute !important; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
        .innovation-card { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); transition: all 0.4s; }
        .innovation-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1);}
        .patent-badge {position:absolute;top:1rem;right:1rem;background:var(--gold);color:white;padding:0.5rem 1rem;border-radius:20px;font-size:0.75rem;font-weight:bold;z-index:10;}
        .innovation-timeline { position:relative; }
        .innovation-timeline::before { content:'';position:absolute;left:2rem;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--gold),rgba(212,175,55,0.3)); }
        .timeline-item { position:relative;margin-bottom:3rem;padding-left:5rem;}
        .timeline-marker { position:absolute;left:1.25rem;top:1rem;width:1.5rem;height:1.5rem;background:var(--gold);border:3px solid white;border-radius:50%;box-shadow:0 0 0 3px rgba(212,175,55,0.2);}
        .complexity-meter{width:100%;height:12px;background:#e5e7eb;border-radius:6px;overflow:hidden;position:relative;}
        .complexity-fill{height:100%;background:linear-gradient(90deg,var(--gold),#f4d03f,#ffd700);border-radius:6px;transition:width 2s ease;}
      `}</style>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className={`hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight ${playfair.className}`}>Innovation<br />Horlogère</h1>
          <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed`}>
            Repousser les limites de l'impossible depuis 1839 avec des avancées technologiques révolutionnaires
          </p>
          <button
            onClick={() => router.push('/collections')}
            className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
          >Découvrir les innovations</button>
        </div>
      </section>
      {/* Inventions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Inventions Révolutionnaires</h2>
            <p className="text-xl text-gray-600">Les innovations qui ont transformé l'industrie horlogère</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {inventions.map((invention, idx) => (
              <div key={idx} className="innovation-card rounded-xl overflow-hidden scroll-reveal">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-6xl text-gray-400"><i className="fas fa-clock"></i></div>
                  </div>
                  <div className="patent-badge">{`BREVET ${invention.year}`}</div>
                </div>
                <div className="p-6">
                  <h3 className={`text-2xl font-bold text-gray-900 mb-3 ${playfair.className}`}>{invention.title}</h3>
                  <p className="text-gray-600 mb-4">{invention.description}</p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg">
                    {invention.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between border-b border-white/10 py-2 last:border-0">
                        <span className="text-gray-300">{spec.label}</span>
                        <span className="text-yellow-400">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Chronologie d'Innovation</h2>
            <p className="text-xl text-gray-600">Les jalons technologiques qui ont façonné l'avenir horloger</p>
          </div>
          <div className="innovation-timeline">
            {timelineData.map((item, idx) => (
              <div key={idx} className="timeline-item scroll-reveal">
                <div className="timeline-marker"></div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-2xl font-bold text-gray-900 ${playfair.className}`}>{item.year} - {item.title}</h3>
                    <span className={`${getCategoryColor(item.category)} text-white px-3 py-1 rounded-full text-sm font-semibold`}>{item.category}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="complexity-meter"><div className="complexity-fill" style={{ width: `${item.complexity}%` }}></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* RESEARCH LAB */}
      <section className="py-20 bg-gradient-to-b from-[#1a2332] to-[#2c2c2c] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>Recherche & Développement</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Notre centre de R&D repousse constamment les frontières de l'horlogerie avec des technologies de pointe et des partenariats avec les institutions scientifiques les plus prestigieuses.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'flask', title: 'Laboratoires d\'Excellence', count: '15', label: 'Laboratoires spécialisés' },
              { icon: 'users', title: 'Équipe de Recherche', count: '200+', label: 'Chercheurs et ingénieurs' },
              { icon: 'award', title: 'Brevets d\'Invention', count: '100+', label: 'Brevets déposés' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-8 scroll-reveal">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas fa-${item.icon} text-2xl text-white`}></i>
                </div>
                <h3 className={`text-2xl font-bold mb-4 text-center ${playfair.className}`}>{item.title}</h3>
                <p className="text-gray-300 text-center mb-6">
                  {item.title.includes('Laboratoires') && 'Des laboratoires équipés des technologies les plus avancées pour tester et développer de nouveaux matériaux et mécanismes.'}
                  {item.title.includes('Équipe') && 'Une équipe d\'ingénieurs, physiciens et horlogers dédiée à l\'innovation et au développement de technologies révolutionnaires.'}
                  {item.title.includes('Brevets') && 'Plus de 100 brevets déposés au fil des décennies, témoignant de notre engagement constant envers l\'innovation.'}
                </p>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{item.count}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Future Tech */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 ${playfair.className}`}>Technologies d'Avenir</h2>
            <p className="text-xl text-gray-600">Les innovations qui façonneront l'horlogerie de demain</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {futureTechs.map((tech, idx) => {
              const colorClasses = techColorClasses[tech.color]
              const statusClass = tech.status === 'BÊTA' ? 'ai-indicator'
                : tech.status === 'R&D' ? 'quantum-indicator'
                : tech.status === 'ECO' ? 'bg-green-600'
                : 'bg-red-600'
              return (
                <div key={idx} className="future-tech rounded-xl p-8 scroll-reveal bg-gradient-to-br from-neutral-900 to-neutral-800">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses} rounded-full flex items-center justify-center mr-4`}>
                      <i className={`fas fa-${tech.icon} text-2xl text-white`}></i>
                    </div>
                    <div className="flex items-center">
                      <h3 className={`text-2xl font-bold text-white ${playfair.className}`}>{tech.title}</h3>
                      <span className={`${statusClass} text-white px-2 py-1 rounded text-xs font-semibold ml-2`}>
                        {tech.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">{tech.description}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{tech.specLabel}</span>
                      <span className="text-sm font-semibold text-white">{tech.specValue}</span>
                    </div>
                    <div className="complexity-meter">
                      <div className="complexity-fill" style={{ width: `${tech.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* Impact */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>Impact de l'Innovation</h2>
            <p className="text-xl text-gray-300">Les chiffres qui témoignent de notre engagement envers l'excellence</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { count: '100', label: 'Brevets Déposés', sub: 'Inventions protégées' },
              { count: '33', label: 'Complications Record', sub: 'Sur le Calibre 89' },
              { count: '200', label: 'Chercheurs', sub: 'Dédiés à l\'innovation' },
              { count: '99', label: '% Précision', sub: 'Standards qualité' }
            ].map((metric, idx) => (
              <div key={idx} className="text-center scroll-reveal">
                <div className="text-5xl font-bold text-yellow-600 mb-4">{metric.count}</div>
                <h3 className={`text-xl font-semibold mb-2 ${playfair.className}`}>{metric.label}</h3>
                <p className="text-gray-400">{metric.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${playfair.className}`}>L'Avenir de l'Horlogerie</h2>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez-nous dans notre quête constante d'innovation et de perfection horlogère
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/collections')}
              className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105"
            >Découvrir les innovations</button>
            <button
              onClick={() => router.push('/heritage')}
              className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300"
            >Explorer l'héritage</button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className={`text-3xl font-bold mb-4 ${playfair.className}`}>
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">© 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
