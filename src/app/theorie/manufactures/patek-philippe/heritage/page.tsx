'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function HeritagePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const vantaBgRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    };

    const initVanta = async () => {
      try {
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        }
        if (!(window as any).VANTA || !(window as any).VANTA.WAVES) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js');
        }
        if (vantaBgRef.current && (window as any).VANTA?.WAVES && !vantaEffectRef.current) {
          vantaEffectRef.current = (window as any).VANTA.WAVES({
            el: vantaBgRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x1a2332,
            shininess: 30.0,
            waveHeight: 15.0,
            waveSpeed: 0.75,
            zoom: 0.65,
          });
        }
      } catch (error) {
        console.error('Error loading Vanta:', error);
      }
    };

    // Timeline animation
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.timeline-item').forEach(item => {
      timelineObserver.observe(item);
    });

    // Scroll reveal animation
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      scrollObserver.observe(el);
    });

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      if (vantaBgRef.current) {
        const speed = scrolled * 0.3;
        vantaBgRef.current.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    initVanta();

    return () => {
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
      window.removeEventListener('scroll', handleScroll);
      timelineObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          overflow-x: hidden;
          padding-top: 67px; /* Compense la barre de navigation du site (72px) + la barre de la page */
        }
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          background: linear-gradient(135deg, var(--gold), #f4d03f);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .vanta-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          will-change: transform;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }
        
        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline {
          position: relative;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, var(--gold), rgba(212, 175, 55, 0.3));
          transform: translateX(-50%);
        }
        
        .timeline-item {
          position: relative;
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }
        
        .timeline-item.revealed {
          opacity: 1;
          transform: translateY(0);
        }
        
        .timeline-item:nth-child(odd) .timeline-content {
          margin-right: 55%;
          text-align: right;
        }
        
        .timeline-item:nth-child(even) .timeline-content {
          margin-left: 55%;
          text-align: left;
        }
        
        .timeline-marker {
          position: absolute;
          left: 50%;
          top: 2rem;
          width: 20px;
          height: 20px;
          background: var(--gold);
          border: 4px solid white;
          border-radius: 50%;
          transform: translateX(-50%);
          z-index: 10;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
        }
        
        .timeline-year {
          position: absolute;
          left: 50%;
          top: 0;
          background: var(--gold);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: bold;
          transform: translateX(-50%);
          z-index: 5;
        }
        
        .heritage-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
        }
        
        .heritage-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .quote-section {
          background: linear-gradient(135deg, var(--deep-blue), var(--charcoal));
          position: relative;
          overflow: hidden;
        }
        
        .quote-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .quote-text {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          line-height: 1.4;
          position: relative;
          z-index: 2;
        }
        
        @media (max-width: 768px) {
          .timeline::before {
            left: 2rem;
          }
          
          .timeline-item:nth-child(odd) .timeline-content,
          .timeline-item:nth-child(even) .timeline-content {
            margin-left: 4rem;
            margin-right: 0;
            text-align: left;
          }
          
          .timeline-marker {
            left: 2rem;
          }
          
          .timeline-year {
            left: 2rem;
          }
          
          .quote-text {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <Link href="/theorie/manufactures/patek-philippe"><span className="text-yellow-600">Patek</span> Philippe</Link>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/theorie/manufactures/patek-philippe" className="nav-link text-gray-700 hover:text-yellow-600">Accueil</Link>
              <Link href="/theorie/manufactures/patek-philippe/collections" className="nav-link text-gray-700 hover:text-yellow-600">Collections</Link>
              <Link href="/theorie/manufactures/patek-philippe/heritage" className="nav-link text-yellow-600 font-semibold">Patrimoine</Link>
              <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className="nav-link text-gray-700 hover:text-yellow-600">Savoir-faire</Link>
              <Link href="/theorie/manufactures/patek-philippe/innovation" className="nav-link text-gray-700 hover:text-yellow-600">Innovation</Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-white border-t border-gray-200`}>
          <div className="px-6 py-4 space-y-4">
            <Link href="/theorie/manufactures/patek-philippe" className="block text-gray-700 hover:text-yellow-600">Accueil</Link>
            <Link href="/theorie/manufactures/patek-philippe/collections" className="block text-gray-700 hover:text-yellow-600">Collections</Link>
            <Link href="/theorie/manufactures/patek-philippe/heritage" className="block text-yellow-600 font-semibold">Patrimoine</Link>
            <Link href="/theorie/manufactures/patek-philippe/savoir-faire" className="block text-gray-700 hover:text-yellow-600">Savoir-faire</Link>
            <Link href="/theorie/manufactures/patek-philippe/innovation" className="block text-gray-700 hover:text-yellow-600">Innovation</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div ref={vantaBgRef} className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Notre<br/>Héritage
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plus de 180 ans d'excellence horlogère, façonnés par la passion, l'innovation et le savoir-faire suisse
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Chronologie d'Excellence</h2>
            <p className="text-xl text-gray-600">Les moments qui ont défini l'histoire de Patek Philippe</p>
          </div>
          
          <div className="timeline">
            {[
              {
                year: "1839",
                title: "Fondation de la Manufacture",
                desc: "Antoine Norbert de Patek, officier polonais en exil, et François Czapek, horloger tchèque, fondent Patek, Czapek & Cie à Genève. Leur vision : créer des montres d'exception pour une clientèle d'élite.",
                icon: "fa-map-marker-alt",
                tag: "Genève, Suisse"
              },
              {
                year: "1845",
                title: "L'Invention Révolutionnaire",
                desc: "Jean Adrien Philippe rejoint l'entreprise et apporte son invention révolutionnaire : le remontoir à couronne. Cette innovation transforme l'industrie horlogère et établit les bases de la montre moderne.",
                icon: "fa-cog",
                tag: "Brevet du remontoir à couronne"
              },
              {
                year: "1851",
                title: "Naissance de Patek Philippe",
                desc: "Patek Philippe & Cie est officiellement créée. La même année, la manufacture expose à la Grande Exposition de Londres et reçoit la reconnaissance internationale pour son excellence horlogère.",
                icon: "fa-crown",
                tag: "Reconnaissance royale"
              },
              {
                year: "1868",
                title: "La Première Montre-bracelet",
                desc: "Patek Philippe crée la première montre-bracelet avec remontoir à couronne pour la Comtesse Koscowicz de Hongrie. Cette pièce historique marque le début de l'ère des montres-bracelets de luxe.",
                icon: "fa-gem",
                tag: "Première montre-bracelet de luxe"
              },
              {
                year: "1889",
                title: "Le Calibre à Répétition",
                desc: "La manufacture développe un calibre de montre à répétition minutes avec mécanisme de sonnerie breveté. Cette complication deviendra l'une des spécialités emblématiques de Patek Philippe.",
                icon: "fa-music",
                tag: "Brevet de la sonnerie"
              },
              {
                year: "1932",
                title: "La Calatrava est Née",
                desc: "Introduction de la célèbre collection Calatrava, nommée d'après l'ordre de Calatrava. Son design pur et intemporel devient l'emblème de l'élégance horlogère classique et influence l'industrie entière.",
                icon: "fa-star",
                tag: "Design iconique"
              },
              {
                year: "1976",
                title: "L'Ère du Sport de Luxe",
                desc: "Lancement du Nautilus, conçu par le légendaire Gérald Genta. Cette montre sportive en acier révolutionne le concept du luxe sportif et devient l'une des pièces les plus convoitées au monde.",
                icon: "fa-anchor",
                tag: "Révolution du luxe sportif"
              },
              {
                year: "1989",
                title: "150 Ans d'Excellence",
                desc: "Pour célébrer ses 150 ans, Patek Philippe crée la montre la plus compliquée du monde à l'époque : le Calibre 89 avec 33 complications. Un chef-d'œuvre technique qui défie l'imagination.",
                icon: "fa-trophy",
                tag: "Record mondial"
              },
              {
                year: "1999",
                title: "La Twenty~4 pour Elle",
                desc: "Lancement de la collection Twenty~4, spécialement conçue pour la femme moderne. Cette ligne combine élégance quotidienne et mécanique de haute précision, ouvrant une nouvelle ère pour l'horlogerie féminine.",
                icon: "fa-female",
                tag: "Horlogerie féminine"
              },
              {
                year: "2014",
                title: "Innovation Perpétuelle",
                desc: "Présentation du Calibre 1755, l'un des mouvements les plus minces jamais créés pour une montre à répétition minutes. Cette prouesse technique démontre l'engagement continu de Patek Philippe vers l'innovation.",
                icon: "fa-microchip",
                tag: "Technologie d'avant-garde"
              }
            ].map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <div className="flex items-center text-yellow-600">
                      <i className={`fas ${item.icon} mr-2`}></i>
                      <span>{item.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section py-20 text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <i className="fas fa-quote-left text-6xl text-yellow-600 opacity-50"></i>
          </div>
          <blockquote className="quote-text mb-8">
            "Vous ne possédez jamais réellement une montre Patek Philippe. 
            Vous en assurez simplement la garde pour les générations suivantes."
          </blockquote>
          <div className="text-xl text-yellow-600 font-semibold">
            — Slogan Patek Philippe
          </div>
        </div>
      </section>

      {/* Heritage Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Les Valeurs du Patrimoine</h2>
            <p className="text-xl text-gray-600">Les principes fondamentaux qui ont guidé Patek Philippe depuis 1839</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-white">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-crown text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600">
                L'engagement inébranlable envers la qualité supérieure dans chaque aspect 
                de la fabrication horlogère, depuis les matériaux jusqu'à la finition.
              </p>
            </div>
            
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-white">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-dna text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Héritage</h3>
              <p className="text-gray-600">
                La transmission du savoir-faire de génération en génération, 
                perpétuant les traditions horlogères suisses les plus authentiques.
              </p>
            </div>
            
            <div className="heritage-card rounded-xl p-8 text-center scroll-reveal bg-white">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-lightbulb text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                La recherche constante de nouvelles solutions techniques et esthétiques 
                pour repousser les limites de l'art horloger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Legacy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Une Affaire de Famille</h2>
              <p className="text-xl text-gray-600 mb-8">
                Depuis ses débuts, Patek Philippe est restée une entreprise familiale indépendante. 
                Cette indépendance permet à la manufacture de préserver ses valeurs fondamentales 
                et de maintenir une qualité exceptionnelle sans compromis.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Indépendance Totale</h4>
                    <p className="text-gray-600">Contrôle complet sur chaque étape de la production</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Tradition Vivante</h4>
                    <p className="text-gray-600">Savoir-faire transmis de maître en apprenti</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Vision à Long Terme</h4>
                    <p className="text-gray-600">Développement durable et pérennité garantie</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
  <div className="relative h-[400px] rounded-lg overflow-hidden group">
    <img
      src="/images/atelier-patek.jpg"
      alt="Atelier Patek Philippe"
      className="w-full h-full object-cover rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105"
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
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez la longue lignée de collectionneurs qui perpétuent l'héritage Patek Philippe
          </p>
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
            <div className="text-3xl font-bold mb-4">
              <span className="text-yellow-600">Patek</span> Philippe
            </div>
            <p className="text-gray-400 mb-6">La référence mondiale en horlogerie suisse</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-600 transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-500 text-sm">
                © 2024 Patek Philippe. Tous droits réservés. | Référence Mondiale en Horlogerie Suisse
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
