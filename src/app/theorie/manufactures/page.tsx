'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default function CraftsmanshipPage() {
  const skillChartRef = useRef(null);
  const timeChartRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!skillChartRef.current || !timeChartRef.current) return;

    const skillChart = echarts.init(skillChartRef.current);
    const timeChart = echarts.init(timeChartRef.current);

    const skillOption = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#1f1f1f",
        borderColor: "#555555",
        textStyle: { color: "#f0f0f0" },
        formatter: '{b}: {c}%'
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            { value: 100, name: "Mécanique Fine", itemStyle: { color: "#d4af37" } },
            { value: 95, name: "Joaillerie", itemStyle: { color: "#c0c0c0" } },
            { value: 90, name: "Arts Décoratifs", itemStyle: { color: "#8b7355" } },
            { value: 85, name: "Polissage", itemStyle: { color: "#4a4a4a" } },
            { value: 88, name: "Assemblage", itemStyle: { color: "#2d2d2d" } },
          ],
          label: { 
            color: "#f0f0f0", 
            fontSize: 12,
            formatter: '{b}\n{c}%'
          },
        },
      ],
    };

    const timeOption = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#1f1f1f",
        borderColor: "#555555",
        textStyle: { color: "#f0f0f0" },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: ["Conception", "Fabrication", "Assemblage", "Décoration", "Contrôle", "Certification"],
        axisLine: { lineStyle: { color: "#555555" } },
        axisLabel: { color: "#f0f0f0", fontSize: 10 },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#555555" } },
        axisLabel: { color: "#f0f0f0" },
        splitLine: { lineStyle: { color: "#444444" } },
      },
      series: [
        {
          data: [30, 45, 60, 30, 15, 5],
          type: "line",
          smooth: true,
          lineStyle: { color: "#d4af37", width: 3 },
          itemStyle: { color: "#d4af37" },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(212, 175, 55, 0.3)'
              }, {
                offset: 1, color: 'rgba(212, 175, 55, 0.05)'
              }]
            }
          }
        },
      ],
    };

    skillChart.setOption(skillOption);
    timeChart.setOption(timeOption);

    const handleResize = () => {
      skillChart.resize();
      timeChart.resize();
    };

    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => observer.observe(item));

    return () => {
      window.removeEventListener("resize", handleResize);
      skillChart.dispose();
      timeChart.dispose();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-primary: #1f1f1f;
          --bg-secondary: #252525;
          --bg-card: #2a2a2a;
          --text-white: #f0f0f0;
          --text-gray: #bbbbbb;
          --text-muted: #888888;
          --gold: #d4af37;
          --border: #3a3a3a;
          --shadow: rgba(212, 175, 55, 0.15);
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          background: var(--bg-primary) !important;
          color: var(--text-white) !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-medium { font-weight: 500; }
        
        /* NAVIGATION */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(8px);
        }
        
        /* HÉRO */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 6rem;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 2rem;
          text-align: center;
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, var(--gold) 0%, #e6c78a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* TIMELINE */
        .timeline-container {
          max-width: 72rem;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
        }
        
        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 100%;
          background: var(--border);
        }
        
        .timeline-dot {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 12px;
          background: var(--gold);
          border-radius: 50%;
          border: 4px solid var(--bg-primary);
        }
        
        /* CARTES */
        .luxury-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }
        
        .luxury-card:hover {
          transform: translateY(-4px);
          border-color: var(--gold);
          box-shadow: 0 20px 40px -12px var(--shadow);
        }
        
        /* BOUTONS */
        .btn-luxe {
          background: linear-gradient(135deg, var(--gold) 0%, #e6c78a 100%);
          color: var(--bg-primary);
          font-weight: 500;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.875rem;
        }
        
        .btn-luxe:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--shadow);
        }
        
        /* GRAPHIQUES */
        .chart-container {
          width: 100%;
          height: 320px;
        }
        
        /* GRILLE */
        .precision-grid {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.01) 1px, transparent 0);
          background-size: 24px 24px;
        }

        @media (max-width: 768px) {
          .timeline-line { display: none; }
          .timeline-dot { display: none; }
        }
      `}</style>
    
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[var(--gold)] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-[var(--bg-primary)] font-bold text-sm">PP</span>
              </div>
              <span className="text-lg font-medium font-serif text-[var(--text-white)]">Patek Philippe</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Accueil</a>
              <a href="#timeline" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Processus</a>
              <a href="#expertise" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Expertise</a>
              <a href="#standards" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Qualité</a>
            </div>
            
            <button className="btn-luxe text-sm" onClick={() => scrollToSection('expertise')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>

      {/* HÉRO */}
      <section id="hero" className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="mb-6 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-full px-4 py-1.5">
              <span className="text-[var(--text-gray)] text-xs font-medium uppercase tracking-wider">Savoir-Faire Horloger</span>
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-normal font-serif leading-tight">
              <span className="gold-gradient block mb-1">Le Savoir-Faire</span>
              <span className="text-[var(--text-white)]">Patek Philippe</span>
            </h1>
            
            <p className="text-base md:text-lg text-[var(--text-gray)] max-w-3xl mx-auto leading-relaxed">
              Chaque montre Patek Philippe est le fruit de siècles de tradition horlogère et d'un artisanat d'exception
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {[
              {value: "10+", label: "Ans de formation"},
              {value: "250+", label: "Composants"},
              {value: "9", label: "Mois"},
              {value: "50", label: "Artisans"}
            ].map((stat, i) => (
              <div key={i} className="luxury-card p-4 text-center">
                <div className="text-2xl font-medium text-[var(--gold)] mb-1">{stat.value}</div>
                <div className="text-xs text-[var(--text-gray)] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('timeline')} className="btn-luxe">
            Découvrir l'Excellence
          </button>
        </div>
      </section>

      {/* TIMELINE - PROCESSUS */}
      <section id="timeline" className="precision-grid py-20" style={{background: 'var(--bg-secondary)'}}>
        <div className="timeline-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Le Processus de Fabrication</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
              Chaque étape du processus est réalisée avec une précision millimétrée
            </p>
          </div>
          
          <div className="timeline-line"></div>
          
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Conception",
                desc: "Les ingénieurs et designers créent des plans détaillés pour chaque composant, optimisant à la fois la fonctionnalité et l'esthétique.",
                side: "left"
              },
              {
                step: "2",
                title: "Fabrication",
                desc: "Chaque composant est fabriqué à la main ou avec des machines spécialisées selon des tolérances extrêmement strictes.",
                side: "right"
              },
              {
                step: "3",
                title: "Assemblage",
                desc: "Les maîtres horlogers assemblent chaque mouvement avec une précision chirurgicale, ajustant chaque pièce à la perfection.",
                side: "left"
              },
              {
                step: "4",
                title: "Contrôle Qualité",
                desc: "Des tests rigoureux garantissent que chaque montre répond aux standards d'excellence Patek Philippe avant d'être certifiée.",
                side: "right"
              }
            ].map((item, i) => (
              <div key={i} className="timeline-item relative">
                {item.side === "left" ? (
                  <>
                    <div className="flex">
                      <div className="w-full md:w-1/2 pr-0 md:pr-7 mb-4 md:mb-0">
                        <div className="luxury-card p-5 text-left md:text-right">
                          <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto md:ml-auto md:mr-0 mb-3">
                            <span className="text-[var(--bg-primary)] font-bold text-lg">{item.step}</span>
                          </div>
                          <h3 className="text-base font-medium text-[var(--text-white)] mb-2">{item.title}</h3>
                          <p className="text-xs text-[var(--text-gray)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="hidden md:block md:w-1/2"></div>
                    </div>
                    <div className="timeline-dot hidden md:block"></div>
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <div className="hidden md:block md:w-1/2"></div>
                      <div className="w-full md:w-1/2 pl-0 md:pl-7">
                        <div className="luxury-card p-5">
                          <div className="w-12 h-12 bg-[var(--gold)] rounded-full flex items-center justify-center mx-auto md:mx-0 mb-3">
                            <span className="text-[var(--bg-primary)] font-bold text-lg">{item.step}</span>
                          </div>
                          <h3 className="text-base font-medium text-[var(--text-white)] mb-2">{item.title}</h3>
                          <p className="text-xs text-[var(--text-gray)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-dot hidden md:block"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOMAINES D'EXPERTISE */}
      <section id="expertise" className="precision-grid py-20" style={{background: 'var(--bg-primary)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Domaines d'Expertise</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
              Les spécialités qui définissent l'excellence Patek Philippe
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "⚙️",
                title: "Mécanique Fine",
                desc: "La création de mouvements mécaniques complexes avec des complications sophistiquées qui repoussent les limites de l'ingénierie horlogère.",
                metric: "Précision",
                value: "99.99%"
              },
              {
                icon: "💎",
                title: "Joaillerie",
                desc: "Le sertissage de diamants et pierres précieuses avec une précision exceptionnelle, transformant chaque montre en une œuvre d'art précieuse.",
                metric: "Qualité",
                value: "IF/VVS"
              },
              {
                icon: "🎨",
                title: "Arts Décoratifs",
                desc: "Les techniques traditionnelles de décoration comme le guillochage, l'émail et la gravure qui donnent à chaque montre son caractère unique.",
                metric: "Complexité",
                value: "Master"
              }
            ].map((item, i) => (
              <div key={i} className="luxury-card p-5">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-base font-medium font-serif text-[var(--text-white)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--text-gray)] leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-[var(--border)]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[var(--text-gray)]">{item.metric}</span>
                    <span className="text-[var(--gold)] font-medium">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAÎTRES HORLOGERS */}
      <section className="precision-grid py-20" style={{background: 'var(--bg-secondary)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Maîtres Horlogers</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
              Des artisans dévoués dont l'expertise se transmet de génération en génération
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="luxury-card p-6">
              <h3 className="text-lg font-medium font-serif text-[var(--text-white)] mb-4">L'Art de la Perfection</h3>
              <p className="text-sm text-[var(--text-gray)] mb-6 leading-relaxed">
                Chaque maître horloger Patek Philippe passe par une formation rigoureuse de plus de dix ans. 
                Cette expertise approfondie garantit que chaque composant, chaque ajustement, 
                chaque finition atteigne la perfection absolue.
              </p>
              
              <div className="space-y-3">
                {[
                  "Formation de 10 à 15 ans minimum",
                  "Apprentissage auprès de maîtres confirmés",
                  "Certification interne Patek Philippe",
                  "Formation continue tout au long de la carrière"
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-xs text-[var(--text-white)]">
                    <span className="w-1 h-1 bg-[var(--gold)] rounded-full mr-2"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="luxury-card p-4">
              <div className="bg-[var(--bg-primary)] rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">👨‍🔧</div>
                <div className="text-3xl font-bold text-[var(--gold)] mb-2">10+</div>
                <div className="text-xs text-[var(--text-gray)] uppercase tracking-wide">Années de formation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STANDARDS DE QUALITÉ */}
      <section id="standards" className="precision-grid py-20" style={{background: 'var(--bg-primary)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Standards de Qualité</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
              Chaque montre Patek Philippe doit répondre à des critères de qualité exceptionnels
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {icon: "⏱️", title: "Tests de Précision", desc: "24 jours de tests chronométriques rigoureux"},
              {icon: "👁️", title: "Contrôle Esthétique", desc: "Inspection minutieuse de chaque détail visuel"},
              {icon: "💧", title: "Tests d'Étanchéité", desc: "Vérification de la résistance à l'eau"},
              {icon: "✓", title: "Certification Finale", desc: "Poinçon Patek Philippe et certificat"}
            ].map((item, i) => (
              <div key={i} className="luxury-card p-5 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-sm font-medium text-[var(--text-white)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--text-gray)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRAPHIQUES */}
      <section className="precision-grid py-20" style={{background: 'var(--bg-secondary)'}}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">L'Excellence en Chiffres</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">
              Analyse des compétences et du temps de fabrication
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="luxury-card p-5">
              <h3 className="text-lg font-medium font-serif text-[var(--text-white)] mb-4 text-center">Niveau de Maîtrise</h3>
              <div ref={skillChartRef} className="chart-container"></div>
            </div>

            <div className="luxury-card p-5">
              <h3 className="text-lg font-medium font-serif text-[var(--text-white)] mb-4 text-center">Temps par Étape (jours)</h3>
              <div ref={timeChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="precision-grid py-20" style={{background: 'var(--bg-primary)'}}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-normal font-serif mb-4 text-[var(--text-white)]">Vivez l'Expérience du Savoir-Faire</h2>
          <p className="text-sm text-[var(--text-gray)] mb-8 max-w-2xl mx-auto">
            Visitez notre manufacture à Genève et découvrez l'artisanat exceptionnel qui donne vie à chaque montre
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-luxe">
              Réserver une visite
            </button>
            <button className="bg-transparent border border-[var(--gold)] text-[var(--gold)] px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--gold)] hover:text-[var(--bg-primary)] transition-all">
              Découvrir l'innovation
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)] py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-7 h-7 bg-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="text-[var(--bg-primary)] font-bold text-xs">PP</span>
            </div>
            <span className="text-base font-medium font-serif text-[var(--text-white)]">Patek Philippe</span>
          </div>
          <p className="text-[var(--text-gray)] text-xs">
            La référence mondiale en horlogerie suisse
          </p>
          <div className="text-[10px] text-[var(--text-muted)] mt-4">
            © 2024 Patek Philippe. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
