'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const VantaWavesBG = dynamic(() => import('../../../../../components/VantaWavesBackground'), { ssr: false })

export default function HeritagePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Scroll reveal pour timeline et cards (animation simple)
    const revealEls = document.querySelectorAll('.scroll-reveal, .timeline-item')
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('revealed') }) },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .vanta-bg { will-change: transform; }
        .scroll-reveal, .timeline-item {
          opacity: 0; transform: translateY(30px); transition: all .6s;
        }
        .scroll-reveal.revealed, .timeline-item.revealed {
          opacity: 1; transform: translateY(0);
        }
        .timeline { position: relative; }
        .timeline::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 3px;
          background: linear-gradient(to bottom, var(--gold), rgba(212,175,55,0.3));
          transform: translateX(-50%);
        }
        .timeline-marker {
          position: absolute; left: 50%; top: 2rem; width: 20px; height: 20px;
          background: var(--gold); border: 4px solid white; border-radius: 50%;
          transform: translateX(-50%); z-index: 10; box-shadow: 0 0 0 4px rgba(212,175,55,0.2);
        }
        .timeline-year {
          position: absolute; left: 50%; top: 0; background: var(--gold); color: white;
          padding: 0.5rem 1rem; border-radius: 20px; font-weight: bold;
          transform: translateX(-50%); z-index: 5;
        }
      `}</style>
      {/* Menu mobile */}
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-6 py-4 space-y-4">
          <Link href="/theorie/manufactures/patek-philippe"><span className="block text-gray-700 hover:text-yellow-600">Accueil</span></Link>
          <Link href="/theorie/manufactures/patek-philippe/collections"><span className="block text-gray-700 hover:text-yellow-600">Collections</span></Link>
          <Link href="/theorie/manufactures/patek-philippe/heritage"><span className="block text-yellow-600 font-semibold">Patrimoine</span></Link>
          <Link href="/theorie/manufactures/patek-philippe/savoir-faire"><span className="block text-gray-700 hover:text-yellow-600">Savoir-faire</span></Link>
          <Link href="/theorie/manufactures/patek-philippe/innovation"><span className="block text-gray-700 hover:text-yellow-600">Innovation</span></Link>
        </div>
      </div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <VantaWavesBG />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">Notre<br />Héritage</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plus de 180 ans d'excellence horlogère, façonnés par la passion, l'innovation et le savoir-faire suisse
          </p>
        </div>
      </section>
      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chronologie d'Excellence</h2>
            <p className="text-xl text-gray-600">Les moments qui ont défini l'histoire de Patek Philippe</p>
          </div>
          <div className="timeline">
            {[
              { year: "1839", title: "Fondation de la Manufacture", desc: "Antoine Norbert de Patek, officier polonais en exil, et François Czapek, horloger tchèque, fondent Patek, Czapek & Cie à Genève.", icon: "fa-map-marker-alt", tag: "Genève, Suisse" },
              { year: "1845", title: "L'Invention Révolutionnaire", desc: "Jean Adrien Philippe apporte le remontoir à couronne.", icon: "fa-cog", tag: "Brevet du remontoir à couronne" },
              { year: "1851", title: "Naissance de Patek Philippe", desc: "Exposition à Londres, reconnaissance internationale.", icon: "fa-crown", tag: "Reconnaissance royale" },
              { year: "1868", title: "La Première Montre-bracelet", desc: "Première montre-bracelet pour la Comtesse Koscowicz.", icon: "fa-gem", tag: "Première montre-bracelet de luxe" },
              { year: "1889", title: "Le Calibre à Répétition", desc: "Calibre de répétition minutes breveté.", icon: "fa-music", tag: "Brevet de la sonnerie" },
              { year: "1932", title: "La Calatrava est Née", desc: "Naissance du design intemporel Calatrava.", icon: "fa-star", tag: "Design iconique" },
              { year: "1976", title: "L'Ère du Sport de Luxe", desc: "Lancement du Nautilus, luxe sportif.", icon: "fa-anchor", tag: "Révolution du luxe sportif" },
              { year: "1989", title: "150 Ans d'Excellence", desc: "Calibre 89, montre la plus compliquée du monde.", icon: "fa-trophy", tag: "Record mondial" },
              { year: "1999", title: "La Twenty~4 pour Elle", desc: "Collection féminine Twenty~4.", icon: "fa-female", tag: "Horlogerie féminine" },
              { year: "2014", title: "Innovation Perpétuelle", desc: "Calibre 1755, ultra-mince, répétition minutes.", icon: "fa-microchip", tag: "Technologie d'avant-garde" }
            ].map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content"><div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <div className="flex items-center text-yellow-600"><i className={`fas ${item.icon} mr-2`}></i><span>{item.tag}</span></div>
                </div></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Quote Section */}
      <section className="quote-section py-20 text-white relative" style={{ background: "linear-gradient(135deg,var(--deep-blue),var(--charcoal))" }}>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8"><i className="fas fa-quote-left text-6xl text-yellow-600 opacity-50"></i></div>
          <blockquote className="quote-text mb-8">
            "Vous ne possédez jamais réellement une montre Patek Philippe. Vous en assurez simplement la garde pour les générations suivantes."
          </blockquote>
          <div className="text-xl text-yellow-600 font-semibold">— Slogan Patek Philippe</div>
        </div>
      </section>
      {/* Valeurs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Les Valeurs du Patrimoine</h2>
            <p className="text-xl text-gray-600">Les principes fondamentaux qui ont guidé Patek Philippe depuis 1839</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Excellence', icon: 'fa-crown', desc: 'L’engagement envers la qualité supérieure dans chaque aspect de la fabrication horlogère.' },
              { title: 'Héritage', icon: 'fa-dna', desc: 'La transmission du savoir-faire de génération en génération.' },
              { title: 'Innovation', icon: 'fa-lightbulb', desc: 'La recherche constante de nouvelles solutions techniques et esthétiques.' }
            ].map((val, idx) => (
              <div key={idx} className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-white">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`fas ${val.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-600">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Family Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Une Affaire de Famille</h2>
              <p className="text-xl text-gray-600 mb-8">Depuis ses débuts, Patek Philippe est restée une entreprise familiale indépendante. Cette indépendance permet la préservation des valeurs et d’une qualité exceptionnelle sans compromis.</p>
              <div className="space-y-6">
                {[
                  { label: "Indépendance Totale", desc: "Contrôle complet sur chaque étape de la production" },
                  { label: "Tradition Vivante", desc: "Savoir-faire transmis de maître en apprenti" },
                  { label: "Vision à Long Terme", desc: "Développement durable et pérennité garantie" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-check text-white text-sm"></i>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative h-[400px] rounded-lg overflow-hidden group">
                <Image
                  src="/images/atelier-patek.jpg"
                  alt="Atelier Patek Philippe"
                  fill
                  className="object-cover rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/images/atelier-patek-blur.jpg"
                  sizes="(max-width:768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-yellow-600">5</div>
                  <div className="text-sm text-gray-600">Générations de maîtres horlogers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Devenez Gardien du Temps</h2>
          <p className="text-xl text-gray-300 mb-8">Rejoignez la longue lignée de collectionneurs qui perpétuent l'héritage Patek Philippe</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/theorie/manufactures/patek-philippe/collections" className="bg-yellow-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-700 transition-all duration-300 transform hover:scale-105">
              Explorer les collections
            </Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Découvrir le savoir-faire
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-4"><span className="text-yellow-600">Patek</span> Philippe</div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-facebook text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors"><i className="fab fa-youtube text-xl"></i></a>
            </div>
            <div className="border-t border-gray-800 pt-6"><p className="text-gray-500 text-sm">© 2024 Patek Philippe. Tous droits réservés.</p></div>
          </div>
        </div>
      </footer>
    </>
  )
}
