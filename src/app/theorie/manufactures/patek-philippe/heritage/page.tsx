'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

// Composant dynamique Vanta Waves pour le background Hero
const VantaWavesBG = dynamic(() => import('../../../../../components/VantaWavesBackground'), { ssr: false })

// Timeline premium verticale alternée façon haute horlogerie
function Timeline() {
  const events = [
    {
      year: '1839',
      title: 'Fondation de la Manufacture',
      desc: "Antoine Norbert de Patek, officier polonais en exil, et François Czapek, horloger tchèque, fondent Patek, Czapek & Cie à Genève. Leur vision : créer des montres d'exception pour une clientèle d'élite.",
      tag: 'Genève, Suisse',
    },
    {
      year: '1845',
      title: "L'Invention Révolutionnaire",
      desc: "Jean Adrien Philippe rejoint l'entreprise et apporte son invention révolutionnaire : le remontoir à couronne. Cette innovation transforme l'industrie horlogère : base de la montre moderne.",
      tag: 'Brevet du remontoir à couronne',
    },
    {
      year: '1851',
      title: 'Naissance de Patek Philippe',
      desc: "Patek Philippe & Cie est officiellement créée. La même année, la manufacture expose à la Grande Exposition de Londres : reconnaissance internationale pour son excellence horlogère.",
      tag: 'Reconnaissance royale',
    },
    {
      year: '1868',
      title: 'La Première Montre-bracelet',
      desc: "Patek Philippe crée la première montre-bracelet avec remontoir à couronne pour la Comtesse Koscowicz de Hongrie. Début des montres-bracelets de luxe.",
      tag: 'Première montre-bracelet de luxe',
    },
    {
      year: '1889',
      title: 'Le Calibre à Répétition',
      desc: "La manufacture développe un calibre à répétition minutes avec mécanisme breveté. Devenue une spécialité emblématique.",
      tag: 'Brevet de la sonnerie',
    },
    {
      year: '1932',
      title: 'La Calatrava est Née',
      desc: "Introduction de la célèbre Calatrava, au design pur devenu étendard de l'élégance classique horlogère et référence du style intemporel.",
      tag: 'Design iconique',
    },
    {
      year: '1976',
      title: "L'Ère du Sport de Luxe",
      desc: "Lancement du Nautilus, conçu par Gérald Genta. Cette montre sportive en acier révolutionne le luxe sportif.",
      tag: 'Révolution du luxe sportif',
    },
    {
      year: '1989',
      title: "150 Ans d'Excellence",
      desc: "Pour les 150 ans, création du Calibre 89 : 33 complications, alors la montre la plus complexe au monde.",
      tag: 'Record mondial',
    },
    {
      year: '1999',
      title: 'La Twenty~4 pour Elle',
      desc: "Lancement de la collection Twenty~4 pour femmes. Allie élégance moderne et mécanique de haute précision.",
      tag: "Horlogerie féminine",
    },
    {
      year: '2014',
      title: 'Innovation Perpétuelle',
      desc: "Présentation du calibre 1755, l’un des mouvements les plus minces jamais créés pour répétition minutes.",
      tag: "Technologie d'avant-garde",
    },
  ]

  useEffect(() => {
    // Reveal animation only for timeline
    const els = document.querySelectorAll('.timeline-fancy-item')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.2 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Chronologie d'Excellence</h2>
          <p className="text-xl text-gray-600">Les moments qui ont défini l'histoire de Patek Philippe</p>
        </div>
        <div className="relative">
          {/* Ligne centrale */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 z-0 rounded bg-gradient-to-b from-yellow-500 via-yellow-200 to-yellow-500/0" />
          <ol className="relative">
            {events.map((event, i) => (
              <li
                key={event.year}
                className={`timeline-fancy-item mb-20 md:mb-0 grid md:grid-cols-2 items-center 
                  ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'} 
                  ${i === events.length - 1 ? '' : ''}`}
                style={{ position: 'relative' }}
              >
                {/* Année + marqueur */}
                <div className={`md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 flex flex-col items-center ${i % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'} `}>
                  <span className="block h-12 w-12 rounded-full shadow-lg ring-2 ring-yellow-500 bg-white flex items-center justify-center font-bold text-yellow-600 text-xl border-4 border-yellow-400">
                    {event.year}
                  </span>
                  <span className="block w-0.5 h-24 bg-gradient-to-b from-yellow-400 to-transparent hidden md:block" />
                </div>
                {/* Carte à gauche/droite */}
                <div className={`relative md:w-[85%] mx-auto ${i % 2 === 0 ? 'md:col-start-1 text-right' : 'md:col-start-2 text-left'}`}>
                  <div className="bg-white shadow-xl border-l-8 border-yellow-400 rounded-xl px-7 py-5 my-7 max-w-xl mx-auto
                    transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl">
                    <h3 className="text-2xl font-extrabold mb-2 text-gray-900 tracking-tight">{event.title}</h3>
                    <p className="text-gray-600 mb-2">{event.desc}</p>
                    <div className="text-yellow-600 font-semibold">{event.tag}</div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <style jsx>{`
        .timeline-fancy-item {
          opacity: 0;
          transform: translateY(45px);
          transition: all .75s cubic-bezier(.23,1.02,.26,.98);
        }
        .timeline-fancy-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

export default function HeritagePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

      {/* Timeline luxe */}
      <Timeline />

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
