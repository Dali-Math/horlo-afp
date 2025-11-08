'use client';
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import React from "react";
import Link from "next/link";

export default function ManufacturesPage() {
  const ageChartRef = useRef(null);
  const innovationChartRef = useRef(null);

  // Fonction pour le scrolling smooth
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
      {/* Styles globaux */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          background: #0a0a0a;
          color: #fafafa;
          font-family: 'Inter', sans-serif;
        }

        .hero-bg {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, transparent 100%);
          opacity: 0.3;
          z-index: 1;
        }
        
        .hero-content {
          position: relative;
          z-index: 2;
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .manufacture-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .manufacture-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(212, 175, 55, 0.3);
        }
        
        .timeline-item {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.6s ease-out;
        }
        
        .timeline-item.animate {
          opacity: 1;
          transform: translateX(0);
        }
        
        .precision-grid {
          background-image: 
            linear-gradient(rgba(192, 192, 192, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 192, 192, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .luxury-button {
          background: linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 50%, #c0c0c0 100%);
          border: 1px solid #a0a0a0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .luxury-button:hover {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
        
        .innovation-visual {
          background: #0a0a0a;
          position: relative;
        }
        
        .innovation-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(45deg, #0a0a0a 25%, transparent 25%), 
            linear-gradient(-45deg, #0a0a0a 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #0a0a0a 75%), 
            linear-gradient(-45deg, transparent 75%, #0a0a0a 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          opacity: 0.1;
        }
        
        .excellence-badge {
          background: linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%);
          border: 2px solid #c0c0c0;
          position: relative;
          overflow: hidden;
        }
        
        .excellence-badge::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.1) 50%, transparent 70%);
          animation: shine 4s infinite linear;
        }
        
        @keyframes shine {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .chart-container {
          width: 100%;
          height: 320px;
        }
      `}</style>
    
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c0c0c0]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#c0c0c0] to-[#fafafa] rounded-full flex items-center justify-center">
                <span className="text-[#0a0a0a] font-bold text-sm">SW</span>
              </div>
              <span className="text-xl font-bold text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>SwissWatch Excellence</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Accueil</a>
              <a href="#timeline" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Histoire</a>
              <a href="#manufactures" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Manufactures</a>
              <a href="#innovations" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Innovations</a>
            </div>
            
            <button className="luxury-button px-6 py-2 rounded-full text-[#2d2d2d] font-semibold" onClick={() => scrollToSection('manufactures')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="hero-content container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-[#c0c0c0]/10 border border-[#c0c0c0]/30 rounded-full px-6 py-3 mb-6">
              <span className="text-[#c0c0c0] text-sm font-medium">Culture Horlogère Suisse</span>
              <span className="w-2 h-2 bg-[#c0c0c0] rounded-full"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
              <span className="gold-gradient block">Les Grandes Manufactures</span>
              <span className="text-[#fafafa]">Horlogères Suisses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#c0c0c0]/80 max-w-4xl mx-auto mb-8 leading-relaxed">
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
                <div className="text-3xl font-bold text-[#c0c0c0] mb-2">{stat.value}</div>
                <div className="text-sm text-[#c0c0c0]/70">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('manufactures')} className="luxury-button px-12 py-4 rounded-full text-[#2d2d2d] font-bold text-lg">
            Explorer l'Excellence
          </button>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>L'Évolution de l'Excellence</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, 
              le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#c0c0c0]/30 h-full"></div>
            
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
                        <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                          <h3 className="text-2xl font-bold mb-2 text-[#c0c0c0]" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">{item.title}</h4>
                          <p className="text-[#c0c0c0]/70">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8">
                        <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                          <h3 className="text-2xl font-bold mb-2 text-[#c0c0c0]" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">{item.title}</h4>
                          <p className="text-[#c0c0c0]/70">{item.desc}</p>
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

      {/* Manufactures Section */}
      <section id="manufactures" className="py-20 innovation-visual">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>Les Cinq Légendes</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif 
              et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {name: "Patek Philippe", icon: "👑", year: "Depuis 1839", specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"]},
              {name: "Rolex", icon: "⚡", year: "Depuis 1905", specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"]},
              {name: "Audemars Piguet", icon: "🔷", year: "Depuis 1875", specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"]},
              {name: "Vacheron Constantin", icon: "⭐", year: "Depuis 1755", specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"]},
              {name: "Omega", icon: "🌙", year: "Depuis 1848", specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"]}
            ].map((m, i) => (
              <div key={i} className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-[#2d2d2d] to-[#0a0a0a] rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-6xl">{m.icon}</span>
                  </div>
                  <div className="text-4xl mb-2">{m.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>{m.name}</h3>
                  <p className="text-[#c0c0c0]/60 text-sm">{m.year}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                  <div className="space-y-2">
                    {m.specialties.map((item, j) => (
                      <div key={j} className="flex items-center text-sm text-[#fafafa]">
                        <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="text-[#c0c0c0]/70 text-sm hover:text-[#c0c0c0] transition-colors cursor-pointer">
                    Découvrir l'histoire →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section id="innovations" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>Innovations Révolutionnaires</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Les manufactures suisses ont révolutionné l'horlogerie avec des innovations 
              techniques et des designs iconiques qui ont marqué l'histoire.
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
              <div key={i} className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6 hover:border-[#d4af37]/50 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-[#c0c0c0]/70 text-sm mb-4">{item.desc}</p>
                <div className="text-xs text-[#c0c0c0]/50">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence en Chiffres */}
      <section id="excellence" className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Excellence en Chiffres
            </h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Analyse comparative des manufactures suisses à travers les âges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#0a0a0a]/60 border border-[#c0c0c0]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>
                Âge des Manufactures
              </h3>
              <div ref={ageChartRef} className="chart-container"></div>
            </div>

            <div className="bg-[#0a0a0a]/60 border border-[#c0c0c0]/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>
                Innovations par Décennie
              </h3>
              <div ref={innovationChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#c0c0c0]/20 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-[#c0c0c0] to-[#fafafa] rounded-full flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold text-sm">SW</span>
            </div>
            <span className="text-xl font-bold text-[#fafafa]" style={{fontFamily: 'Playfair Display, serif'}}>SwissWatch Excellence</span>
          </div>
          
          <p className="text-[#c0c0c0]/60 text-sm mb-6">
            L'excellence horlogère suisse depuis 1755
          </p>
          
          <div className="text-xs text-[#c0c0c0]/40">
            © 2024 SwissWatch Excellence. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
