'use client';
import { useEffect, useRef } from "react";
import PageTaskbar from '@/components/PageTaskbar'
import * as echarts from "echarts";
import React from "react";
import Link from "next/link";

export default function ManufacturesPage() {
  const ageChartRef = useRef(null);
  const innovationChartRef = useRef(null);

  // Fonction pour le scrolling fluide
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Attendre que les refs soient disponibles
    if (!ageChartRef.current || !innovationChartRef.current) return;

    // Initialiser les graphiques
    const ageChart = echarts.init(ageChartRef.current);
    const innovationChart = echarts.init(innovationChartRef.current);

    // Configuration du graphique d'âge
    const ageOption = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#0a0a0a",
        borderColor: "#c0c0c0",
        textStyle: { color: "#fafafa" },
        formatter: '{b}: {c} ans'
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            { value: 269, name: "Vacheron Constantin (1755)", itemStyle: { color: "#d4af37" } },
            { value: 185, name: "Patek Philippe (1839)", itemStyle: { color: "#c0c0c0" } },
            { value: 176, name: "Omega (1848)", itemStyle: { color: "#8b7355" } },
            { value: 149, name: "Audemars Piguet (1875)", itemStyle: { color: "#4a4a4a" } },
            { value: 119, name: "Rolex (1905)", itemStyle: { color: "#2d2d2d" } },
          ],
          label: { 
            color: "#fafafa", 
            fontSize: 12,
            formatter: '{b}\n{c} ans'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(212, 175, 55, 0.5)'
            }
          }
        },
      ],
    };

    // Configuration du graphique d'innovation
    const innovationOption = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#0a0a0a",
        borderColor: "#c0c0c0",
        textStyle: { color: "#fafafa" },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: ["1920s", "1940s", "1960s", "1980s", "2000s", "2020s"],
        axisLine: { lineStyle: { color: "#c0c0c0" } },
        axisLabel: { color: "#fafafa" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#c0c0c0" } },
        axisLabel: { color: "#fafafa" },
        splitLine: { lineStyle: { color: "#2d2d2d" } },
      },
      series: [
        {
          data: [2, 3, 5, 4, 6, 8],
          type: "line",
          smooth: true,
          lineStyle: { color: "#d4af37", width: 3 },
          itemStyle: { color: "#d4af37" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(212, 175, 55, 0.3)" },
              { offset: 1, color: "rgba(212, 175, 55, 0.1)" },
            ]),
          },
        },
      ],
    };

    ageChart.setOption(ageOption);
    innovationChart.setOption(innovationOption);

    // Gestion du redimensionnement
    const handleResize = () => {
      ageChart.resize();
      innovationChart.resize();
    };

    window.addEventListener("resize", handleResize);

    // Animation au défilement
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
      ageChart.dispose();
      innovationChart.dispose();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Styles globaux - FORCAGE MODE SOMBRE PERMANENT */}
      <style jsx global>{`
        /* FORCAGE TOTAL DU MODE SOMBRE */
        html, body, #__next {
          background: #0a0a0a !important;
          color: #fafafa !important;
          color-scheme: dark !important;
        }
        
        * {
          color-scheme: dark !important;
        }

        /* Variables personnalisées pour le thème sombre uniquement */
        :root {
          --bg-primary: #0a0a0a;
          --bg-secondary: #1a1a1a;
          --bg-card: #2d2d2d;
          --text-white: #fafafa;
          --text-gray: #c0c0c0;
          --text-muted: #a0a0a0;
          --gold: #d4af37;
          --gold-light: #ffd700;
          --border: #3a3a3a;
          --border-light: #c0c0c0;
          --shadow: rgba(212, 175, 55, 0.15);
          --shadow-strong: rgba(212, 175, 55, 0.25);
        }

        body {
          background: var(--bg-primary) !important;
          color: var(--text-white) !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-medium { font-weight: 500; }

        /* Navigation fixe avec backdrop */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* Hero Section */
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
          background: url('/images/manufactures/swiss-horology-hero.jpg') center/cover no-repeat;
          opacity: 0.08;
          filter: brightness(0.8);
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

        /* Gradient doré */
        .gold-gradient {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: shimmer 4s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Timeline */
        .timeline-container {
          max-width: 6xl;
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
          z-index: 1;
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
          z-index: 2;
        }

        /* Cards */
        .luxury-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .luxury-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          transition: left 0.6s;
        }
        
        .luxury-card:hover::before {
          left: 100%;
        }
        
        .luxury-card:hover {
          transform: translateY(-6px);
          border-color: var(--gold);
          box-shadow: 0 25px 50px -12px var(--shadow-strong);
        }

        /* Bouton */
        .btn-luxe {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
          background-size: 200% 200%;
          color: var(--bg-primary);
          font-weight: 600;
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.875rem;
          position: relative;
          overflow: hidden;
        }
        
        .btn-luxe:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px -8px var(--shadow-strong);
          background-position: 100% 50%;
        }

        /* Grille de précision */
        .precision-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(192, 192, 192, 0.02) 1px, transparent 0);
          background-size: 24px 24px;
        }

        /* Animations */
        .timeline-item {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .timeline-item.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .chart-container {
          width: 100%;
          height: 320px;
        }

        /* Footer */
        footer {
          background: var(--bg-primary);
          border-top: 1px solid var(--border);
        }
      `}</style>
    
      {/* Navigation */}
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-[var(--gold)] rounded-full flex items-center justify-center shadow-sm">
                <span className="text-[var(--bg-primary)] font-bold text-sm">SW</span>
              </div>
              <span className="text-lg font-medium font-serif text-[var(--text-white)]">SwissWatch Excellence</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Accueil</a>
              <a href="#timeline" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Histoire</a>
              <a href="#manufactures" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Manufactures</a>
              <a href="#innovations" className="text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors text-sm font-medium">Innovations</a>
            </div>
            
            <button className="btn-luxe text-sm" onClick={() => scrollToSection('manufactures')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>
      <PageTaskbar />

      {/* Hero Section */}
      <section id="hero" className="hero-section precision-grid">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="mb-6 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-[var(--border)]/30 border border-[var(--border)] rounded-full px-4 py-1.5">
              <span className="text-[var(--text-gray)] text-xs font-medium uppercase tracking-wider">Culture Horlogère Suisse</span>
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-normal font-serif leading-tight">
              <span className="gold-gradient block mb-1">Les Grandes Manufactures</span>
              <span className="text-[var(--text-white)]">Horlogères Suisses</span>
            </h1>
            
            <p className="text-base md:text-lg text-[var(--text-gray)] max-w-3xl mx-auto leading-relaxed">
              Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
            {[
              {value: "175+", label: "Ans d'excellence"},
              {value: "5", label: "Manufactures"},
              {value: "269", label: "Années d'histoire"},
              {value: "🇨🇭", label: "Suisse"}
            ].map((stat, i) => (
              <div key={i} className="luxury-card p-4 text-center">
                <div className="text-2xl font-medium text-[var(--gold)] mb-1">{stat.value}</div>
                <div className="text-xs text-[var(--text-gray)] uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('manufactures')} className="btn-luxe">
            Explorer l'Excellence
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="precision-grid py-20" style={{background: 'var(--bg-secondary)'}}>
        <div className="timeline-container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">L'Évolution de l'Excellence</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">Parcourez plus de 250 ans d'histoire horlogère suisse</p>
          </div>
          
          <div className="timeline-line"></div>
          
          <div className="space-y-6">
            {[
              {year: "1755", title: "Naissance de Vacheron Constantin", desc: "Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse.", side: "left"},
              {year: "1839", title: "Fondation de Patek Philippe", desc: "Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu.", side: "right"},
              {year: "1848", title: "Naissance d'Omega", desc: "Louis Brandt fonde Omega, référence de précision et d'aventure.", side: "left"},
              {year: "1875", title: "Création d'Audemars Piguet", desc: "Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d'avant-garde.", side: "right"},
              {year: "1905", title: "Naissance de Rolex", desc: "Hans Wilsdorf fonde la marque qui révolutionnera l'horlogerie de sport.", side: "left"}
            ].map((item, i) => (
              <div key={i} className="timeline-item relative">
                {item.side === "left" ? (
                  <>
                    <div className="flex">
                      <div className="w-1/2 pr-7">
                        <div className="luxury-card p-5 text-right">
                          <div className="text-lg font-medium font-serif text-[var(--gold)] mb-1">{item.year}</div>
                          <h3 className="text-base font-medium text-[var(--text-white)] mb-2">{item.title}</h3>
                          <p className="text-xs text-[var(--text-gray)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-1/2"></div>
                    </div>
                    <div className="timeline-dot"></div>
                  </>
                ) : (
                  <>
                    <div className="flex">
                      <div className="w-1/2"></div>
                      <div className="w-1/2 pl-7">
                        <div className="luxury-card p-5">
                          <div className="text-lg font-medium font-serif text-[var(--gold)] mb-1">{item.year}</div>
                          <h3 className="text-base font-medium text-[var(--text-white)] mb-2">{item.title}</h3>
                          <p className="text-xs text-[var(--text-gray)] leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    <div className="timeline-dot"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufactures Section */}
      <section id="manufactures" className="precision-grid py-20" style={{background: 'var(--bg-primary)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Les Cinq Légendes</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">Chaque manufacture incarne une philosophie unique et un savoir-faire distinctif</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Patek Philippe", 
                icon: "👑", 
                year: "Depuis 1839", 
                specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"], 
                href: "/theorie/manufactures/patek-philippe"
              },
              {name: "Rolex", icon: "⚡", year: "Depuis 1905", specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"], img: "/images/manufactures/rolex-hero.jpg"},
              {name: "Audemars Piguet", icon: "🔷", year: "Depuis 1875", specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"], img: "/images/manufactures/audemars-piguet-hero.jpg"},
              {name: "Vacheron Constantin", icon: "⭐", year: "Depuis 1755", specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"], img: "/images/manufactures/vacheron-constantin-hero.jpg"},
              {name: "Omega", icon: "🌙", year: "Depuis 1848", specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"], img: "/images/manufactures/omega-hero.jpg"}
            ].map((m, i) => (
              <div key={i} className="luxury-card group">
                <div className="p-5">
                  <div className="w-full h-40 rounded-lg mb-3 overflow-hidden bg-[var(--bg-primary)]">
                    <img 
                      src={`https://i44loxxykine2.ok.kimi.link/resources/${m.name.toLowerCase().replace(/ /g, "-")}-hero.jpg`}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const parent = target.parentElement;
                        if (parent) {
                          target.style.display = 'none';
                          parent.innerHTML = `<div class='w-full h-full flex items-center justify-center text-5xl'>${m.icon}</div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-center mb-3">
                    <h3 className="text-base font-medium font-serif text-[var(--text-white)] mb-1">{m.name}</h3>
                    <p className="text-xs text-[var(--text-gray)]">{m.year}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-[var(--gold)] mb-2 uppercase tracking-wide">Spécialités</h4>
                    <div className="space-y-1">
                      {m.specialties.map((item, j) => (
                        <div key={j} className="flex items-center text-xs text-[var(--text-white)]">
                          <span className="w-1 h-1 bg-[var(--gold)] rounded-full mr-2"></span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center pt-2 border-t border-[var(--border)]">
                    <Link 
                      href={m.href || `/manufactures/${m.name.toLowerCase().replace(/ /g, "-")}`} 
                      className="text-xs text-[var(--text-gray)] hover:text-[var(--gold)] transition-colors font-medium"
                    >
                      Découvrir →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section id="innovations" className="precision-grid py-20" style={{background: 'var(--bg-secondary)'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">Innovations Révolutionnaires</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">Les manufactures suisses ont révolutionné l'horlogerie avec des innovations techniques</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {icon: "⚙️", title: "Quantième Perpétuel", desc: "Patek Philippe révolutionne l'horlogerie avec le premier quantième perpétuel automatique en 1962.", year: "1962"},
              {icon: "🌊", title: "Étanchéité Oyster", desc: "Rolex introduit la première montre étanche au monde en 1926, révolutionnant l'horlogerie sportive.", year: "1926"},
              {icon: "🚀", title: "Moonwatch", desc: "Omega Speedmaster devient la première montre sur la Lune en 1969, choisie par la NASA.", year: "1969"},
              {icon: "💎", title: "Royal Oak", desc: "Audemars Piguet crée le premier luxury sport watch en acier inoxydable en 1972.", year: "1972"},
              {icon: "🎨", title: "Métiers d'Art", desc: "Vacheron Constantin perpétue les techniques traditionnelles de décoration horlogère.", year: "Tradition"},
              {icon: "⚡", title: "Master Chronometer", desc: "Omega développe la certification Master Chronometer, dépassant les normes industrielles.", year: "2015"}
            ].map((item, i) => (
              <div key={i} className="luxury-card p-5 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-base font-medium font-serif text-[var(--text-white)] mb-2">{item.title}</h3>
                <p className="text-xs text-[var(--text-gray)] leading-relaxed mb-3">{item.desc}</p>
                <div className="text-[10px] text-[var(--gold)] font-medium uppercase tracking-wider">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence en Chiffres */}
      <section id="excellence" className="precision-grid py-20" style={{background: 'var(--bg-primary)'}}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-normal font-serif mb-2 text-[var(--text-white)]">L'Excellence en Chiffres</h2>
            <p className="text-[var(--text-gray)] max-w-2xl mx-auto">Analyse comparative des manufactures suisses</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="luxury-card p-5">
              <h3 className="text-lg font-medium font-serif text-[var(--text-white)] mb-4 text-center">Âge des Manufactures</h3>
              <div ref={ageChartRef} className="chart-container"></div>
            </div>

            <div className="luxury-card p-5">
              <h3 className="text-lg font-medium font-serif text-[var(--text-white)] mb-4 text-center">Innovations par Décennie</h3>
              <div ref={innovationChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)] py-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <div className="w-7 h-7 bg-[var(--gold)] rounded-full flex items-center justify-center">
              <span className="text-[var(--bg-primary)] font-bold text-xs">SW</span>
            </div>
            <span className="text-base font-medium font-serif text-[var(--text-white)]">SwissWatch Excellence</span>
          </div>
          <p className="text-[var(--text-gray)] text-xs">
            L'excellence horlogère suisse depuis 1755
          </p>
          <div className="text-[10px] text-[var(--text-muted)] mt-4">
            © 2024 SwissWatch Excellence
          </div>
        </div>
      </footer>
    </>
  );
}
