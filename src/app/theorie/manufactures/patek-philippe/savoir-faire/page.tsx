'use client';

import { useEffect } from 'react';

export default function CraftsmanshipPage() {
  useEffect(() => {
    // Load external scripts
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js';
    script2.async = true;
    
    let vantaInstance: any;

    script2.onload = () => {
      if (typeof window !== 'undefined' && (window as any).VANTA) {
        vantaInstance = (window as any).VANTA.TOPOLOGY({
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
      }
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    const handleMobileMenu = () => {
      mobileMenu?.classList.toggle('hidden');
    };
    
    mobileMenuBtn?.addEventListener('click', handleMobileMenu);

    // Video play function
    const playVideo = () => {
      const videoContainer = document.querySelector('.video-container');
      const placeholder = document.querySelector('.video-placeholder');
      
      if (placeholder && videoContainer) {
        // Create iframe for YouTube video
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.borderRadius = '1rem';
        
        // Replace placeholder with video
        (placeholder as HTMLElement).style.display = 'none';
        videoContainer.appendChild(iframe);
      }
    };

    // Attach video play to placeholder
    const videoPlaceholder = document.querySelector('.video-placeholder');
    videoPlaceholder?.addEventListener('click', playVideo);

    // Scroll reveal animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    // Animate mastery indicators when they come into view
    const masteryObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = (entry.target as HTMLElement).querySelector('.mastery-progress');
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

    // Parallax effect for hero section
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector('#vanta-bg');
      if (parallax) {
        const speed = scrolled * 0.2;
        (parallax as HTMLElement).style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mobileMenuBtn?.removeEventListener('click', handleMobileMenu);
      videoPlaceholder?.removeEventListener('click', playVideo);
      if (vantaInstance) {
        vantaInstance.destroy();
      }
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="font-sans bg-cream overflow-x-hidden" style={{ background: 'var(--cream)' }}>
      <style jsx global>{`
        :root {
          --gold: #D4AF37;
          --deep-blue: #1a2332;
          --cream: #f8f6f0;
          --charcoal: #2c2c2c;
          --silver: #e8e8e8;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--cream);
          overflow-x: hidden;
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
          z-index: -1;
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
        
        .craft-card {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        
        .craft-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }
        
        .craft-card:hover::before {
          left: 100%;
        }
        
        .craft-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .process-step {
          position: relative;
          padding: 2rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: all 0.4s ease;
        }
        
        .process-step:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        .process-step::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid white;
        }
        
        .process-line {
          position: absolute;
          top: 50%;
          right: -2rem;
          width: 4rem;
          height: 2px;
          background: var(--gold);
          transform: translateY(-50%);
        }
        
        .process-line::after {
          content: '';
          position: absolute;
          right: -5px;
          top: -4px;
          width: 0;
          height: 0;
          border-left: 8px solid var(--gold);
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        
        .process-step:last-child .process-line {
          display: none;
        }
        
        .mastery-indicator {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }
        
        .mastery-progress {
          height: 100%;
          background: linear-gradient(90deg, var(--gold), #f4d03f);
          border-radius: 4px;
          transition: width 2s ease;
          position: relative;
        }
        
        .mastery-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .video-container {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
          background: #000;
          border-radius: 1rem;
          overflow: hidden;
        }
        
        .video-placeholder {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--deep-blue), var(--charcoal));
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .video-placeholder:hover {
          background: linear-gradient(135deg, var(--charcoal), var(--deep-blue));
        }
        
        .play-button {
          width: 80px;
          height: 80px;
          background: var(--gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }
        
        .play-button:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
        }
        
        .play-button i {
          color: white;
          font-size: 2rem;
          margin-left: 4px;
        }
        
        @media (max-width: 768px) {
          .process-line {
            display: none;
          }
          
          .process-step {
            margin-bottom: 2rem;
          }
        }
      `}</style>

      {/* Hero Section */}
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
                  <div className="mastery-progress" style={{ width: '100%' }}></div>
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
                  <div className="mastery-progress" style={{ width: '95%' }}></div>
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
                  <div className="mastery-progress" style={{ width: '90%' }}></div>
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
            <div className="video-placeholder">
              <div className="play-button">
                <i className="fas fa-play"></i>
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

      {/* Call to Action */}
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
            <button onClick={() => window.location.href = 'innovation.html'} className="border-2 border-yellow-600 text-yellow-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 hover:text-white transition-all duration-300">
              Découvrir l'innovation
            </button>
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
    </div>
  );
}
