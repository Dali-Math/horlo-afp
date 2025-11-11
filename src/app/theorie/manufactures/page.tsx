'use client';
import { useEffect, useRef } from "react";
import PageTaskbar from '@/components/PageTaskbar'
import * as echarts from "echarts";
import React from "react";
import Link from "next/link";

export default function ManufacturesPage() {
  const ageChartRef = useRef(null);
  const innovationChartRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!ageChartRef.current || !innovationChartRef.current) return;

    const ageChart = echarts.init(ageChartRef.current);
    const innovationChart = echarts.init(innovationChartRef.current);

    const ageOption = {
      tooltip: {
        trigger: "item",
        backgroundColor: "#111111",
        borderColor: "#a0a0a0",
        textStyle: { color: "#ffffff" },
        formatter: '{b}: {c} ans'
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            { value: 269, name: "Vacheron Constantin (1755)", itemStyle: { color: "#c9a961" } },
            { value: 185, name: "Patek Philippe (1839)", itemStyle: { color: "#a0a0a0" } },
            { value: 176, name: "Omega (1848)", itemStyle: { color: "#8b7355" } },
            { value: 149, name: "Audemars Piguet (1875)", itemStyle: { color: "#4a4a4a" } },
            { value: 119, name: "Rolex (1905)", itemStyle: { color: "#2d2d2d" } },
          ],
          label: { 
            color: "#ffffff", 
            fontSize: 12,
            formatter: '{b}\n{c} ans'
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(201, 169, 97, 0.5)'
            }
          }
        },
      ],
    };

    const innovationOption = {
      tooltip: {
        trigger: "axis",
        backgroundColor: "#111111",
        borderColor: "#a0a0a0",
        textStyle: { color: "#ffffff" },
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
        axisLine: { lineStyle: { color: "#a0a0a0" } },
        axisLabel: { color: "#ffffff" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#a0a0a0" } },
        axisLabel: { color: "#ffffff" },
        splitLine: { lineStyle: { color: "#2d2d2d" } },
      },
      series: [
        {
          data: [2, 3, 5, 4, 6, 8],
          type: "line",
          smooth: true,
          lineStyle: { color: "#c9a961", width: 3 },
          itemStyle: { color: "#c9a961" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(201, 169, 97, 0.3)" },
              { offset: 1, color: "rgba(201, 169, 97, 0.1)" },
            ]),
          },
        },
      ],
    };

    ageChart.setOption(ageOption);
    innovationChart.setOption(innovationOption);

    const handleResize = () => {
      ageChart.resize();
      innovationChart.resize();
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
      ageChart.dispose();
      innovationChart.dispose();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 0;
          background: #111111; /* GRIS PLUS CLAIR : moins agressif que #0a0a0a */
          color: #ffffff; /* BLANC PUR pour maximum lisibilité */
          font-family: 'Inter', sans-serif;
        }
        
        .hero-bg {
          background: linear-gradient(135deg, #111111 0%, #1f1f1f 50%, #111111 100%);
          position: relative; overflow: hidden;
        }
        
        .hero-bg::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          background: url('/images/manufactures/swiss-horology-hero.jpg') center/cover no-repeat;
          opacity: 0.15; /* OPACITÉ RÉDUITE pour moins d'effet "sale" */
          filter: brightness(0.9); /* LÉGÈREMENT PLUS SOMBRE pour meilleur contraste */
          z-index: 1;
        }
        
        .hero-content { position: relative; z-index: 2; }
        
        .gold-gradient {
          background: linear-gradient(135deg, #c9a961 0%, #e6c78a 50%, #c9a961 100%); /* OR PLUS SOFT */
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .manufacture-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          background: #1a1a1a; /* FOND PLUS CLAIR que le fond général */
          border: 1px solid #3a3a3a; /* BORDURE PLUS VISIBLE */
        }
        
        .manufacture-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(201, 169, 97, 0.25); /* OMBRE PLUS SOFT */
          border-color: #c9a961; /* BORDURE OR AU SURVOL */
        }
        
        .timeline-item {
          opacity: 0; transform: translateX(-50px);
          transition: all 0.6s ease-out;
        }
        
        .timeline-item.animate {
          opacity: 1; transform: translateX(0);
        }
        
        .precision-grid {
          background-image: 
            linear-gradient(rgba(160, 160, 160, 0.03) 1px, transparent 1px), /* GRIS PLUS CLAIR */
            linear-gradient(90deg, rgba(160, 160, 160, 0.03) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .luxury-button {
          background: linear-gradient(135deg, #a0a0a0 0%, #d0d0d0 50%, #a0a0a0 100%); /* ARGENT PLUS NEUTRE */
          border: 1px solid #909090;
          transition: all 0.3s ease; cursor: pointer;
          color: #111111; /* TEXT SOMBRE pour contraste */
          font-weight: 600;
        }
        
        .luxury-button:hover {
          background: linear-gradient(135deg, #c9a961 0%, #e6c78a 50%, #c9a961 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(201, 169, 97, 0.25);
        }
        
        .innovation-visual {
          background: #111111; position: relative;
        }
        
        .excellence-badge {
          background: #1f1f1f; /* FOND PLUS CLAIR */
          border: 1px solid #4a4a4a; /* BORDURE PLUS VISIBLE */
          position: relative; overflow: hidden;
        }
        
        .chart-container { 
          width: 100%; 
          height: 320px; 
        }
        
        /* ===== CLASSES POUR TEXTES LISIBLES ===== */
        .text-readable {
          color: #e0e0e0 !important; /* GRIS CLAIR au lieu de métallique */
          font-weight: 400;
          line-height: 1.6;
        }
      `}</style>
    
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/95 backdrop-blur-md border-b border-[#3a3a3a]/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#a0a0a0] to-[#e0e0e0] rounded-full flex items-center justify-center">
                <span className="text-[#111111] font-bold text-sm">SW</span>
              </div>
              <span className="text-xl font-bold text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>SwissWatch Excellence</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-readable hover:text-[#c9a961] transition-colors">Accueil</a>
              <a href="#timeline" className="text-readable hover:text-[#c9a961] transition-colors">Histoire</a>
              <a href="#manufactures" className="text-readable hover:text-[#c9a961] transition-colors">Manufactures</a>
              <a href="#innovations" className="text-readable hover:text-[#c9a961] transition-colors">Innovations</a>
            </div>
            
            <button className="luxury-button px-6 py-2 rounded-full font-semibold" onClick={() => scrollToSection('manufactures')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>
      <PageTaskbar />

      <section id="hero" className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="hero-content container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-[#3a3a3a]/20 border border-[#3a3a3a]/40 rounded-full px-6 py-3 mb-6">
              <span className="text-readable text-sm font-medium">Culture Horlogère Suisse</span>
              <span className="w-2 h-2 bg-[#c9a961] rounded-full"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
              <span className="gold-gradient block">Les Grandes Manufactures</span>
              <span className="text-[#ffffff]">Horlogères Suisses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-readable max-w-4xl mx-auto mb-8 leading-relaxed">
              Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires : 
              Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              {value: "175+", label: "Ans d'excellence"},
              {value: "5", label: "Manufactures légendaires"},
              {value: "269", label: "Années d'histoire"},
              {value: "🇨🇭", label: "Excellence suisse"}
            ].map((stat, i) => (
              <div key={i} className="excellence-badge rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-[#c9a961] mb-2">{stat.value}</div>
                <div className="text-sm text-readable">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('manufactures')} className="luxury-button px-12 py-4 rounded-full font-bold text-lg">
            Explorer l'Excellence
          </button>
        </div>
      </section>

      {/* SECTION TIMELINE AVEC COULEURS CORRIGÉES */}
      <section id="timeline" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>L'Évolution de l'Excellence</h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, 
              le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#3a3a3a]/30 h-full"></div>
            
            <div className="space-y-12">
              {[
                {year: "1755", title: "Naissance de Vacheron Constantin", desc: "Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse.", side: "left"},
                {year: "1839", title: "Fondation de Patek Philippe", desc: "Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu.", side: "right"},
                {year: "1848", title: "Naissance d'Omega", desc: "Louis Brandt fonde Omega, qui deviendra la référence de précision et d'aventure.", side: "left"},
                {year: "1875", title: "Création d'Audemars Piguet", desc: "Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d'avant-garde.", side: "right"},
                {year: "1905", title: "Naissance de Rolex", desc: "Hans Wilsdorf fonde la marque qui révolutionnera l'horlogerie de sport et de luxe.", side: "left"}
              ].map((item, i) => (
                <div key={i} className="timeline-item flex items-center">
                  {item.side === "left" ? (
                    <>
                      <div className="w-1/2 pr-8 text-right">
                        <div className="bg-[#1f1f1f]/70 rounded-xl p-6 border border-[#3a3a3a]/20">
                          <h3 className="text-2xl font-bold mb-2 text-[#c9a961]" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-[#ffffff]">{item.title}</h4>
                          <p className="text-readable text-base">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-[#c9a961] rounded-full border-4 border-[#111111] flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      <div className="w-8 h-8 bg-[#c9a961] rounded-full border-4 border-[#111111] flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8">
                        <div className="bg-[#1f1f1f]/70 rounded-xl p-6 border border-[#3a3a3a]/20">
                          <h3 className="text-2xl font-bold mb-2 text-[#c9a961]" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-[#ffffff]">{item.title}</h4>
                          <p className="text-readable text-base">{item.desc}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="manufactures" className="py-20 innovation-visual">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>Les Cinq Légendes</h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif 
              et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Patek Philippe", 
                icon: "👑", 
                year: "Depuis 1839", 
                specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"], 
                img: "/images/manufactures/patek-philippe-hero.jpg",
                href: "/theorie/manufactures/patek-philippe"
              },
              {name: "Rolex", icon: "⚡", year: "Depuis 1905", specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"], img: "/images/manufactures/rolex-hero.jpg"},
              {name: "Audemars Piguet", icon: "🔷", year: "Depuis 1875", specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"], img: "/images/manufactures/audemars-piguet-hero.jpg"},
              {name: "Vacheron Constantin", icon: "⭐", year: "Depuis 1755", specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"], img: "/images/manufactures/vacheron-constantin-hero.jpg"},
              {name: "Omega", icon: "🌙", year: "Depuis 1848", specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"], img: "/images/manufactures/omega-hero.jpg"}
            ].map((m, i) => (
              <div key={i} className="manufacture-card bg-[#1a1a1a] border border-[#3a3a3a] rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-[#2d2d2d]/50">
                    <img 
                      src={m.img} 
                      alt={m.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.currentTarget;
                        const parent = target.parentElement;
                        if (parent) {
                          target.style.display = 'none';
                          parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><span class="text-6xl">${m.icon}</span></div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-4xl mb-2">{m.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>{m.name}</h3>
                  <p className="text-readable text-sm">{m.year}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#c9a961]">Spécialités</h4>
                  <div className="space-y-2">
                    {m.specialties.map((item, j) => (
                      <div key={j} className="flex items-center text-sm text-[#ffffff]">
                        <span className="w-2 h-2 bg-[#c9a961] rounded-full mr-3"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <Link 
                    href={m.href || `/manufactures/${m.name.toLowerCase().replace(/ /g, "-")}`} 
                    className="text-readable hover:text-[#c9a961] transition-colors"
                  >
                    Découvrir l'histoire →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION INNOVATIONS AVEC COULEURS CORRIGÉES */}
      <section id="innovations" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>Innovations Révolutionnaires</h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Les manufactures suisses ont révolutionné l'horlogerie avec des innovations techniques 
              et des designs iconiques qui ont marqué l'histoire.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {icon: "⚙️", title: "Quantième Perpétuel", desc: "Patek Philippe révolutionne l'horlogerie avec le premier quantième perpétuel automatique en 1962.", year: "1962"},
              {icon: "🌊", title: "Étanchéité Oyster", desc: "Rolex introduit la première montre étanche au monde en 1926, révolutionnant l'horlogerie sportive.", year: "1926"},
              {icon: "🚀", title: "Moonwatch", desc: "Omega Speedmaster devient la première montre sur la Lune en 1969, choisie par la NASA.", year: "1969"},
              {icon: "💎", title: "Royal Oak", desc: "Audemars Piguet crée le premier luxury sport watch en acier inoxydable en 1972.", year: "1972"},
              {icon: "🎨", title: "Métiers d'Art", desc: "Vacheron Constantin perpétue les techniques traditionnelles de décoration horlogère.", year: "Tradition"},
              {icon: "⚡", title: "Master Chronometer", desc: "Omega développe la certification Master Chronometer, dépassant les normes industrielles.", year: "2015"}
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1a1a]/70 border border-[#3a3a3a] rounded-xl p-6 hover:border-[#c9a961]/50 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-readable text-base mb-4">{item.desc}</p>
                <div className="text-sm text-[#a0a0a0] font-medium">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="excellence" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Excellence en Chiffres
            </h2>
            <p className="text-xl text-readable max-w-3xl mx-auto">
              Analyse comparative des manufactures suisses à travers les âges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#1a1a1a]/70 border border-[#3a3a3a] rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>
                Âge des Manufactures
              </h3>
              <div ref={ageChartRef} className="chart-container"></div>
            </div>

            <div className="bg-[#1a1a1a]/70 border border-[#3a3a3a] rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>
                Innovations par Décennie
              </h3>
              <div ref={innovationChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#111111] border-t border-[#3a3a3a]/40 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-[#a0a0a0] to-[#e0e0e0] rounded-full flex items-center justify-center">
              <span className="text-[#111111] font-bold text-sm">SW</span>
            </div>
            <span className="text-xl font-bold text-[#ffffff]" style={{fontFamily: 'Playfair Display, serif'}}>SwissWatch Excellence</span>
          </div>
          
          <p className="text-readable text-sm mb-6">
            L'excellence horlogère suisse depuis 1755
          </p>
          
          <div className="text-xs text-[#a0a0a0]">
            © 2024 SwissWatch Excellence. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
