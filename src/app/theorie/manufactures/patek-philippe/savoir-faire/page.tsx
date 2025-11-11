'use client'
import { useEffect, useRef } from 'react'

// Typings globaux pour les scripts CDN
declare global {
  interface Window { THREE: any; VANTA: any }
}

export default function SavoirFairePage() {
  const script1Ref = useRef<HTMLScriptElement | null>(null)
  const script2Ref = useRef<HTMLScriptElement | null>(null)
  const vantaInstanceRef = useRef<any>(null)
  const threeReadyRef = useRef(false)

  useEffect(() => {
    // 1. Chargement sécurisé de Three.js
    const loadScripts = async () => {
      return new Promise<void>((resolve) => {
        if (window.THREE) { threeReadyRef.current = true; resolve(); return }
        const script1 = document.createElement('script')
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
        script1.async = true
        script1.onload = () => { threeReadyRef.current = true; resolve() }
        script1.onerror = () => { resolve() }
        document.body.appendChild(script1)
        script1Ref.current = script1
      })
    }
    // 2. Initialisation de Vanta.js
    const initVanta = () => {
      if (!window.VANTA || !threeReadyRef.current) return
      const vantaElement = document.getElementById('vanta-bg')
      if (!vantaElement) return
      try {
        vantaInstanceRef.current = window.VANTA.TOPOLOGY({
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200, minWidth: 200,
          scale: 1, scaleMobile: 1,
          color: 0xd4af37,
          backgroundColor: 0xf8f6f0
        })
      } catch (error) { /* ignore */ }
    }
    // 3. Chargement du script Vanta
    const script2 = document.createElement('script')
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js'
    script2.async = true
    script2.onload = () => setTimeout(initVanta, 150)
    document.body.appendChild(script2)
    script2Ref.current = script2

    // 4. Animations scroll reveal
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') })
    }, observerOptions)
    document.querySelectorAll('.scroll-reveal').forEach(el => { scrollObserver.observe(el) })

    // 5. Cleanup
    return () => {
      if (vantaInstanceRef.current) vantaInstanceRef.current.destroy()
      script1Ref.current?.remove()
      script2Ref.current?.remove()
    }
  }, [])

  return (
    <div className="font-sans bg-cream overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        :root { --gold: #D4AF37; --deep-blue: #1a2332; --cream: #f8f6f0; --charcoal: #2c2c2c; --silver: #e8e8e8; }
        .hero-title { font-family: 'Playfair Display', serif; font-weight: 600; background: linear-gradient(135deg, var(--gold), #f4d03f); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .vanta-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .scroll-reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s ease; }
        .scroll-reveal.revealed { opacity: 1; transform: translateY(0); }
        .craft-card { backdrop-filter: blur(10px); background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); transition: all 0.4s; position: relative; overflow: hidden; }
        .craft-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(0,0,0,0.1);}
        .process-step { position: relative; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.4s; }
        .process-step:hover { transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.15);}
        .mastery-indicator{width:100%;height:8px;background:#e5e7eb;border-radius:4px;overflow:hidden;position:relative;}
        .mastery-progress{height:100%;background:linear-gradient(90deg,var(--gold),#f4d03f);border-radius:4px;transition:width 2s;}
      `}</style>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Le Savoir-Faire<br />Suisse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Chaque montre Patek Philippe est le fruit de siècles de tradition horlogère et d'un artisanat d'exception
          </p>
        </div>
      </section>

      {/* MAÎTRES HORLOGERS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Maîtres Horlogers</h2>
            <p className="text-xl text-gray-600">Des artisans dévoués dont l'expertise se transmet de génération en génération</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&h=600&fit=crop"
                     alt="Maître horloger au travail"
                     className="rounded-lg shadow-2xl w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-600">10+</div>
                  <div className="text-sm text-gray-600">Années de formation</div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">L'Art de la Perfection</h3>
              <p className="text-xl text-gray-600 mb-8">
                Chaque maître horloger Patek Philippe passe par une formation rigoureuse de plus de dix ans.<br />
                Cette expertise approfondie garantit que chaque composant, chaque ajustement, <br />
                chaque finition atteigne la perfection absolue.
              </p>
              <div className="space-y-4">
                {[
                  'Formation de 10 à 15 ans minimum',
                  'Apprentissage auprès de maîtres confirmés',
                  'Certification interne Patek Philippe',
                  'Formation continue tout au long de la carrière'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SAVOIR-FAIRE D'EXCEPTION */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-neutral-900 to-amber-950 overflow-hidden shadow-2xl border-b border-yellow-700/20">
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-5 py-2 rounded-full border border-yellow-500/20 bg-yellow-100/5 text-xs uppercase tracking-widest text-yellow-400 mb-4 font-semibold">
              Savoir-Faire d'Exception
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-200 text-transparent bg-clip-text">
              L'Excellence Patek Philippe
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto mb-5">
              Chaque montre <span className="text-yellow-400 font-medium">Patek Philippe</span> incarne des siècles de tradition horlogère — façonnée par des artisans d'élite, révélant la beauté du temps avec une précision inégalée.
            </p>
            <blockquote className="italic text-yellow-100/90 text-sm md:text-base border-l-4 border-yellow-500/30 pl-4 max-w-xl mx-auto">
              « Vous ne possédez jamais complètement une montre Patek Philippe. Vous en êtes juste le gardien pour les générations futures. »
            </blockquote>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { icon: 'fa-user-graduate', title: 'Maîtres Horlogers', desc: '10 à 15 ans de formation auprès de maîtres confirmés, savoir-faire transmis de génération en génération.' },
              { icon: 'fa-drafting-compass', title: 'Processus Millimétré', desc: 'Conception détaillée, fabrication ultra-précise, assemblage manuel parfait, contrôle qualité strict.' },
              { icon: 'fa-gem', title: 'Domaines d\'Excellence', desc: 'Mécanique fine (99.99%), Joaillerie (pierres IF/VVS), Arts décoratifs (savoir-faire Master).' }
            ].map((card, idx) => (
              <div key={idx}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-yellow-600/20 hover:border-yellow-500/40 shadow-lg hover:shadow-yellow-500/10 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-yellow-500/30 transition-shadow">
                    <i className={`fas ${card.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="font-serif text-xl text-white font-semibold">{card.title}</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS DE FABRICATION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Processus de Fabrication</h2>
            <p className="text-xl text-gray-600">Chaque étape du processus est réalisée avec une précision millimétrée</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: 1, title: 'Conception', desc: 'Les ingénieurs et designers créent des plans détaillés pour chaque composant, optimisant à la fois la fonctionnalité et l\'esthétique.' },
              { num: 2, title: 'Fabrication', desc: 'Chaque composant est fabriqué à la main ou avec des machines spécialisées selon des tolérances extrêmement strictes.' },
              { num: 3, title: 'Assemblage', desc: 'Les maîtres horlogers assemblent chaque mouvement avec une précision chirurgicale, ajustant chaque pièce à la perfection.' },
              { num: 4, title: 'Contrôle Qualité', desc: 'Des tests rigoureux garantissent que chaque montre répond aux standards d\'excellence Patek Philippe avant d\'être certifiée.' }
            ].map((step, idx) => (
              <div key={idx} className="process-step scroll-reveal">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-center">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINES D'EXPERTISE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Domaines d'Expertise</h2>
            <p className="text-xl text-gray-600">Les spécialités qui définissent l'excellence Patek Philippe</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: 'cogs', title: 'Mécanique Fine', desc: 'La création de mouvements mécaniques complexes avec des complications sophistiquées qui repoussent les limites de l\'ingénierie horlogère.', level: 'Précision', value: '99.99%', progress: '100%' },
              { icon: 'gem', title: 'Joaillerie', desc: 'Le sertissage de diamants et pierres précieuses avec une précision exceptionnelle, transformant chaque montre en une œuvre d\'art précieuse.', level: 'Qualité', value: 'IF/VVS', progress: '95%' },
              { icon: 'palette', title: 'Arts Décoratifs', desc: 'Les techniques traditionnelles de décoration comme le guillochage, l\'émail et la gravure qui donnent à chaque montre son caractère unique.', level: 'Complexité', value: 'Master', progress: '90%' }
            ].map((area, idx) => (
              <div key={idx} className="craft-card rounded-xl p-8 scroll-reveal">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas fa-${area.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{area.title}</h3>
                <p className="text-gray-600 text-center mb-6">{area.desc}</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{area.level}</span>
                    <span className="text-sm font-semibold text-gray-900">{area.value}</span>
                  </div>
                  <div className="mastery-indicator">
                    <div className="mastery-progress" style={{ width: area.progress }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STANDARDS QUALITÉ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Standards de Qualité</h2>
              <p className="text-xl text-gray-600 mb-8">
                Chaque montre Patek Philippe doit répondre à des critères de qualité exceptionnels <br />
                avant d'être certifiée et livrée à nos clients.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Tests de Précision', desc: '24 jours de tests chronométriques rigoureux' },
                  { title: 'Contrôle Esthétique', desc: 'Inspection minutieuse de chaque détail visuel' },
                  { title: 'Tests d\'Étanchéité', desc: 'Vérification de la résistance à l\'eau et à l\'humidité' },
                  { title: 'Certification Finale', desc: 'Poinçon Patek Philippe et certificat d\'authenticité' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
                     alt="Contrôle qualité"
                     className="rounded-lg shadow-2xl w-full" />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Certifié</div>
                  <div className="text-xs">Patek Philippe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Vivez l'Expérience du Savoir-Faire</h2>
          <p className="text-xl text-gray-300 mb-8">
            Visitez notre manufacture à Genève et découvrez l'artisanat exceptionnel qui donne vie à chaque montre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Réserver une visite
            </button>
            <button onClick={() => window.location.href = '/innovation'} className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Découvrir l'innovation
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              {['instagram', 'facebook', 'twitter', 'youtube'].map(social => (
                <a key={social} href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                  <i className={`fab fa-${social} text-xl`}></i>
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
