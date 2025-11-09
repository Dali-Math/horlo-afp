import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';

declare global {
  interface Window {
    VANTA: any;
  }
}

const CraftsmanshipPage: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.VANTA) {
      const effect = window.VANTA.TOPOLOGY({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xd4af37,
        backgroundColor: 0xf8f6f0
      });
      setVantaEffect(effect);
    }

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    // Animate mastery indicators
    const masteryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.querySelector('.mastery-progress');
          if (progress) {
            setTimeout(() => {
              (progress as HTMLElement).style.width = (progress as HTMLElement).style.width || '100%';
            }, 500);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.mastery-indicator').forEach(el => {
      masteryObserver.observe(el);
    });

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#vanta-bg');
      if (parallax) {
        const speed = scrolled * 0.2;
        (parallax as HTMLElement).style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
      window.removeEventListener('scroll', handleScroll);
      elements.forEach(el => observer.unobserve(el));
      document.querySelectorAll('.mastery-indicator').forEach(el => {
        masteryObserver.unobserve(el);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Savoir-Faire - Patek Philippe Référence Mondiale</title>
        <meta name="description" content="Le savoir-faire suisse : chaque composant est fabriqué et assemblé à la main par des maîtres horlogers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <button
                onClick={() => router.push('/')}
                className="nav-link"
              >
                <span className="text-yellow-600">Patek</span> Philippe
              </button>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => router.push('/')} className="nav-link text-gray-700 hover:text-yellow-600">Accueil</button>
              <button onClick={() => router.push('/collections')} className="nav-link text-gray-700 hover:text-yellow-600">Collections</button>
              <button onClick={() => router.push('/heritage')} className="nav-link text-gray-700 hover:text-yellow-600">Patrimoine</button>
              <button onClick={() => router.push('/craftsmanship')} className="nav-link text-yellow-600 font-semibold">Savoir-faire</button>
              <button onClick={() => router.push('/innovation')} className="nav-link text-gray-700 hover:text-yellow-600">Innovation</button>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700">
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => router.push('/')} className="block text-gray-700 hover:text-yellow-600">Accueil</button>
              <button onClick={() => router.push('/collections')} className="block text-gray-700 hover:text-yellow-600">Collections</button>
              <button onClick={() => router.push('/heritage')} className="block text-gray-700 hover:text-yellow-600">Patrimoine</button>
              <button onClick={() => router.push('/craftsmanship')} className="block text-yellow-600 font-semibold">Savoir-faire</button>
              <button onClick={() => router.push('/innovation')} className="block text-gray-700 hover:text-yellow-600">Innovation</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div id="vanta-bg" className="vanta-bg"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-6 leading-tight">
            Le Savoir-Faire<br>Suisse
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Chaque montre Patek Philippe est le fruit de siècles de tradition horlogère et d'un artisanat d'exception
          </p>
        </div>
      </section>

      {/* Master Craftsmen */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Maîtres Horlogers</h2>
            <p className="text-xl text-gray-600">Des artisans dévoués dont l'expertise se transmet de génération en génération</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="scroll-reveal">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=800&h=600&fit=crop"
                  alt="Maître horloger au travail"
                  className="rounded-lg shadow-2xl w-full"
                />
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
                Chaque maître horloger Patek Philippe passe par une formation rigoureuse de plus de dix ans. 
                Cette expertise approfondie garantit que chaque composant, chaque ajustement, 
                chaque finition atteigne la perfection absolue.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Formation de 10 à 15 ans minimum</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Apprentissage auprès de maîtres confirmés</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Certification interne Patek Philippe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-gray-700">Formation continue tout au long de la carrière</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Le Processus de Fabrication</h2>
            <p className="text-xl text-gray-600">Chaque étape du processus est réalisée avec une précision millimétrée</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Conception</h3>
              </div>
              <p className="text-gray-600 text-center">
                Les ingénieurs et designers créent des plans détaillés pour chaque composant, 
                optimisant à la fois la fonctionnalité et l'esthétique.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fabrication</h3>
              </div>
              <p className="text-gray-600 text-center">
                Chaque composant est fabriqué à la main ou avec des machines spécialisées 
                selon des tolérances extrêmement strictes.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Assemblage</h3>
              </div>
              <p className="text-gray-600 text-center">
                Les maîtres horlogers assemblent chaque mouvement avec une précision chirurgicale, 
                ajustant chaque pièce à la perfection.
              </p>
              <div className="process-line"></div>
            </div>
            
            <div className="process-step scroll-reveal">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contrôle Qualité</h3>
              </div>
              <p className="text-gray-600 text-center">
                Des tests rigoureux garantissent que chaque montre répond aux standards 
                d'excellence Patek Philippe avant d'être certifiée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Domaines d'Expertise</h2>
            <p className="text-xl text-gray-600">Les spécialités qui définissent l'excellence Patek Philippe</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="craft-card rounded-xl p-8 scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-cogs text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Mécanique Fine</h3>
              <p className="text-gray-600 text-center mb-6">
                La création de mouvements mécaniques complexes avec des complications 
                sophistiquées qui repoussent les limites de l'ingénierie horlogère.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Précision</span>
                  <span className="text-sm font-semibold text-gray-900">99.99%</span>
                </div>
                <div className="mastery-indicator">
                  <div className="mastery-progress" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="craft-card rounded-xl p-8 scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-gem text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Joaillerie</h3>
              <p className="text-gray-600 text-center mb-6">
                Le sertissage de diamants et pierres précieuses avec une précision 
                exceptionnelle, transformant chaque montre en une œuvre d'art précieuse.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Qualité</span>
                  <span className="text-sm font-semibold text-gray-900">IF/VVS</span>
                </div>
                <div className="mastery-indicator">
                  <div className="mastery-progress" style={{width: '95%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="craft-card rounded-xl p-8 scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-palette text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Arts Décoratifs</h3>
              <p className="text-gray-600 text-center mb-6">
                Les techniques traditionnelles de décoration comme le guillochage, 
                l'émail et la gravure qui donnent à chaque montre son caractère unique.
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Complexité</span>
                  <span className="text-sm font-semibold text-gray-900">Master</span>
                </div>
                <div className="mastery-indicator">
                  <div className="mastery-progress" style={{width: '90%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">L'Artisanat en Action</h2>
            <p className="text-xl text-gray-300">
              Découvrez l'intérieur de l'atelier Patek Philippe et observez nos maîtres horlogers à l'œuvre
            </p>
          </div>
          
          <div className="video-container scroll-reveal">
            <div className="video-placeholder" onClick={() => alert('Vidéo en cours de chargement...')}>
              <div className="play-button">
                <i className="fas fa-play text-2xl text-white ml-2"></i>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 scroll-reveal">
            <p className="text-gray-400">
              Chaque montre nécessite en moyenne 9 mois de fabrication et l'intervention de 50 artisans spécialisés
            </p>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Standards de Qualité</h2>
              <p className="text-xl text-gray-600 mb-8">
                Chaque montre Patek Philippe doit répondre à des critères de qualité exceptionnels 
                avant d'être certifiée et livrée à nos clients.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Tests de Précision</h4>
                    <p className="text-gray-600">24 jours de tests chronométriques rigoureux</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Contrôle Esthétique</h4>
                    <p className="text-gray-600">Inspection minutieuse de chaque détail visuel</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Tests d'Étanchéité</h4>
                    <p className="text-gray-600">Vérification de la résistance à l'eau et à l'humidité</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-check text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Certification Finale</h4>
                    <p className="text-gray-600">Poinçon Patek Philippe et certificat d'authenticité</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop"
                  alt="Contrôle qualité"
                  className="rounded-lg shadow-2xl w-full"
                />
                <div className="absolute top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded-lg">
                  <div className="text-sm font-semibold">Certifié</div>
                  <div className="text-xs">Patek Philippe
