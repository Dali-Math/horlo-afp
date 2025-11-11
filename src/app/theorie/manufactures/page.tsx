'use client';
import { useEffect, useRef } from "react";
import React from "react";

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
    // Chargement des scripts ECharts
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript('https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js').then(() => {
      if (!ageChartRef.current || !innovationChartRef.current) return;

      const echarts = (window as any).echarts;
      const ageChart = echarts.init(ageChartRef.current);
      const innovationChart = echarts.init(innovationChartRef.current);

      const ageOption = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#1f1f1f",
          borderColor: "#d4af37",
          textStyle: { color: "#ffffff" },
          formatter: '{b}: {c} ans'
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            data: [
              { value: 269, name: "Vacheron Constantin", itemStyle: { color: "#d4af37" } },
              { value: 185, name: "Patek Philippe", itemStyle: { color: "#c9a961" } },
              { value: 176, name: "Omega", itemStyle: { color: "#b8964f" } },
              { value: 149, name: "Audemars Piguet", itemStyle: { color: "#8b7355" } },
              { value: 119, name: "Rolex", itemStyle: { color: "#a68a5d" } },
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
                shadowColor: 'rgba(212, 175, 55, 0.5)'
              }
            }
          },
        ],
      };

      const innovationOption = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#1f1f1f",
          borderColor: "#d4af37",
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
          axisLine: { lineStyle: { color: "#d4af37" } },
          axisLabel: { color: "#ffffff" },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#d4af37" } },
          axisLabel: { color: "#ffffff" },
          splitLine: { lineStyle: { color: "#3a3a3a" } },
        },
        series: [
          {
            data: [2, 3, 5, 4, 6, 8],
            type: "line",
            smooth: true,
            lineStyle: { color: "#d4af37", width: 3 },
            itemStyle: { color: "#d4af37" },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(212, 175, 55, 0.3)" },
                  { offset: 1, color: "rgba(212, 175, 55, 0.05)" },
                ]
              }
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
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        * { 
          box-sizing: border-box; 
          margin: 0;
          padding: 0;
        }
        
        body {
          background: linear-gradient(to bottom, #f8f6f0 0%, #ede8dc 100%);
          color: #2c2c2c;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }
        
        .hero-bg {
          background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
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
          background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
          z-index: 1;
        }
        
        .hero-content { 
          position: relative; 
          z-index: 2; 
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .manufacture-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          background: white;
          border: 2px solid #e8e8e8;
        }
        
        .manufacture-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
          border-color: #d4af37;
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
        
        .luxury-button {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          border: 2px solid #c9a02c;
          transition: all 0.3s ease; 
          cursor: pointer;
          color: #1a1a1a;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        
        .luxury-button:hover {
          background: linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #f4d03f 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
        }
        
        .excellence-badge {
          background: white;
          border: 2px solid #e8e8e8;
          position: relative; 
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        
        .chart-container { 
          width: 100%; 
          height: 320px; 
        }
        
        .section-light {
          background: white;
        }
        
        .section-cream {
          background: #f8f6f0;
        }
        
        .card-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
      `}</style>
    
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SW</span>
              </div>
              <span className="text-xl font-bold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                SwissWatch Excellence
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Accueil</a>
              <a href="#timeline" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Histoire</a>
              <a href="#manufactures" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Manufactures</a>
              <a href="#innovations" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Innovations</a>
            </div>
            
            <button className="luxury-button px-6 py-2 rounded-full font-semibold text-sm" onClick={() => scrollToSection('manufactures')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="hero-content container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
              <span className="text-white text-sm font-medium">Culture Horlogère Suisse</span>
              <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
              <span className="gold-gradient block">Les Grandes Manufactures</span>
              <span className="text-white">Horlogères Suisses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
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
              <div key={i} className="excellence-badge rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('manufactures')} className="luxury-button px-12 py-4 rounded-full font-bold text-lg">
            Explorer l'Excellence
          </button>
        </div>
      </section>

      <section id="timeline" className="py-20 section-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Évolution de l'Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, 
              le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-600/30 h-full"></div>
            
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
                        <div className="card-glass rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                          <h3 className="text-3xl font-bold mb-2 text-yellow-600" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-yellow-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      <div className="w-8 h-8 bg-yellow-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8">
                        <div className="card-glass rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                          <h3 className="text-3xl font-bold mb-2 text-yellow-600" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
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

      <section id="manufactures" className="py-20 section-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              Les Cinq Légendes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif 
              et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {name: "Patek Philippe", icon: "👑", year: "Depuis 1839", specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"], img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop"},
              {name: "Rolex", icon: "⚡", year: "Depuis 1905", specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"], img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop"},
              {name: "Audemars Piguet", icon: "🔷", year: "Depuis 1875", specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"], img: "https://images.unsplash.com/photo-1594534475821-eca9cca2e80e?w=800&h=600&fit=crop"},
              {name: "Vacheron Constantin", icon: "⭐", year: "Depuis 1755", specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"], img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop"},
              {name: "Omega", icon: "🌙", year: "Depuis 1848", specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"], img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=600&fit=crop"}
            ].map((m, i) => (
              <div key={i} className="manufacture-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-gray-100">
                    <img 
                      src={m.img} 
                      alt={m.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-4xl mb-3">{m.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>{m.name}</h3>
                  <p className="text-gray-600 text-sm font-medium">{m.year}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-yellow-600">Spécialités</h4>
                  <div className="space-y-2">
                    {m.specialties.map((item, j) => (
                      <div key={j} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <button className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors">
                    Découvrir l'histoire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="innovations" className="py-20 section-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              Innovations Révolutionnaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div key={i} className="card-glass border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-600 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">{item.desc}</p>
                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="excellence" className="py-20 section-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Excellence en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyse comparative des manufactures suisses à travers les âges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card-glass border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Âge des Manufactures
              </h3>
              <div ref={ageChartRef} className="chart-container"></div>
            </div>

            <div className="card-glass border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Innovations par Décennie
              </h3>
              <div ref={innovationChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            <span className="text-xl font-bold text-white" style={{fontFamily: 'Playfair Display, serif'}}>
              SwissWatch Excellence
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            L'excellence horlogère suisse depuis 1755
          </p>
          
          <div className="text-xs text-gray-500">
            © 2024 SwissWatch Excellence. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}'use client';
import { useEffect, useRef } from "react";
import React from "react";

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
    // Chargement des scripts ECharts
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript('https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js').then(() => {
      if (!ageChartRef.current || !innovationChartRef.current) return;

      const echarts = (window as any).echarts;
      const ageChart = echarts.init(ageChartRef.current);
      const innovationChart = echarts.init(innovationChartRef.current);

      const ageOption = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#1f1f1f",
          borderColor: "#d4af37",
          textStyle: { color: "#ffffff" },
          formatter: '{b}: {c} ans'
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            data: [
              { value: 269, name: "Vacheron Constantin", itemStyle: { color: "#d4af37" } },
              { value: 185, name: "Patek Philippe", itemStyle: { color: "#c9a961" } },
              { value: 176, name: "Omega", itemStyle: { color: "#b8964f" } },
              { value: 149, name: "Audemars Piguet", itemStyle: { color: "#8b7355" } },
              { value: 119, name: "Rolex", itemStyle: { color: "#a68a5d" } },
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
                shadowColor: 'rgba(212, 175, 55, 0.5)'
              }
            }
          },
        ],
      };

      const innovationOption = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#1f1f1f",
          borderColor: "#d4af37",
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
          axisLine: { lineStyle: { color: "#d4af37" } },
          axisLabel: { color: "#ffffff" },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#d4af37" } },
          axisLabel: { color: "#ffffff" },
          splitLine: { lineStyle: { color: "#3a3a3a" } },
        },
        series: [
          {
            data: [2, 3, 5, 4, 6, 8],
            type: "line",
            smooth: true,
            lineStyle: { color: "#d4af37", width: 3 },
            itemStyle: { color: "#d4af37" },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [
                  { offset: 0, color: "rgba(212, 175, 55, 0.3)" },
                  { offset: 1, color: "rgba(212, 175, 55, 0.05)" },
                ]
              }
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
    });
  }, []);

  return (
    <>
      <style jsx global>{`
        * { 
          box-sizing: border-box; 
          margin: 0;
          padding: 0;
        }
        
        body {
          background: linear-gradient(to bottom, #f8f6f0 0%, #ede8dc 100%);
          color: #2c2c2c;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          line-height: 1.6;
        }
        
        .hero-bg {
          background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
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
          background: radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
          z-index: 1;
        }
        
        .hero-content { 
          position: relative; 
          z-index: 2; 
        }
        
        .gold-gradient {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          -webkit-background-clip: text; 
          -webkit-text-fill-color: transparent; 
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .manufacture-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
          background: white;
          border: 2px solid #e8e8e8;
        }
        
        .manufacture-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.2);
          border-color: #d4af37;
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
        
        .luxury-button {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #d4af37 100%);
          border: 2px solid #c9a02c;
          transition: all 0.3s ease; 
          cursor: pointer;
          color: #1a1a1a;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        
        .luxury-button:hover {
          background: linear-gradient(135deg, #f4d03f 0%, #d4af37 50%, #f4d03f 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.4);
        }
        
        .excellence-badge {
          background: white;
          border: 2px solid #e8e8e8;
          position: relative; 
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0,0,0,0.05);
        }
        
        .chart-container { 
          width: 100%; 
          height: 320px; 
        }
        
        .section-light {
          background: white;
        }
        
        .section-cream {
          background: #f8f6f0;
        }
        
        .card-glass {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }
      `}</style>
    
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">SW</span>
              </div>
              <span className="text-xl font-bold text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                SwissWatch Excellence
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Accueil</a>
              <a href="#timeline" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Histoire</a>
              <a href="#manufactures" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Manufactures</a>
              <a href="#innovations" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">Innovations</a>
            </div>
            
            <button className="luxury-button px-6 py-2 rounded-full font-semibold text-sm" onClick={() => scrollToSection('manufactures')}>
              Explorer
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="hero-bg min-h-screen flex items-center justify-center pt-20">
        <div className="hero-content container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-6 backdrop-blur-sm">
              <span className="text-white text-sm font-medium">Culture Horlogère Suisse</span>
              <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
              <span className="gold-gradient block">Les Grandes Manufactures</span>
              <span className="text-white">Horlogères Suisses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
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
              <div key={i} className="excellence-badge rounded-xl p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <button onClick={() => scrollToSection('manufactures')} className="luxury-button px-12 py-4 rounded-full font-bold text-lg">
            Explorer l'Excellence
          </button>
        </div>
      </section>

      <section id="timeline" className="py-20 section-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Évolution de l'Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, 
              le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-yellow-600/30 h-full"></div>
            
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
                        <div className="card-glass rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                          <h3 className="text-3xl font-bold mb-2 text-yellow-600" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-yellow-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/2 pr-8"></div>
                      <div className="w-8 h-8 bg-yellow-600 rounded-full border-4 border-white shadow-lg flex-shrink-0 z-10"></div>
                      <div className="w-1/2 pl-8">
                        <div className="card-glass rounded-xl p-6 border-2 border-gray-200 shadow-lg">
                          <h3 className="text-3xl font-bold mb-2 text-yellow-600" style={{fontFamily: 'Playfair Display, serif'}}>{item.year}</h3>
                          <h4 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
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

      <section id="manufactures" className="py-20 section-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              Les Cinq Légendes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif 
              et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {name: "Patek Philippe", icon: "👑", year: "Depuis 1839", specialties: ["Quantièmes perpétuels", "Calatrava", "Nautilus", "Grandes complications"], img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=600&fit=crop"},
              {name: "Rolex", icon: "⚡", year: "Depuis 1905", specialties: ["Oyster Perpetual", "Submariner", "Daytona", "GMT-Master"], img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop"},
              {name: "Audemars Piguet", icon: "🔷", year: "Depuis 1875", specialties: ["Royal Oak", "Royal Oak Offshore", "Tourbillons", "Grandes complications"], img: "https://images.unsplash.com/photo-1594534475821-eca9cca2e80e?w=800&h=600&fit=crop"},
              {name: "Vacheron Constantin", icon: "⭐", year: "Depuis 1755", specialties: ["Patrimony", "Overseas", "Métiers d'Art", "Grandes complications"], img: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&h=600&fit=crop"},
              {name: "Omega", icon: "🌙", year: "Depuis 1848", specialties: ["Speedmaster", "Seamaster", "Constellation", "Master Chronometer"], img: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=600&fit=crop"}
            ].map((m, i) => (
              <div key={i} className="manufacture-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-full h-48 rounded-xl mb-4 overflow-hidden bg-gray-100">
                    <img 
                      src={m.img} 
                      alt={m.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-4xl mb-3">{m.icon}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>{m.name}</h3>
                  <p className="text-gray-600 text-sm font-medium">{m.year}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-yellow-600">Spécialités</h4>
                  <div className="space-y-2">
                    {m.specialties.map((item, j) => (
                      <div key={j} className="flex items-center text-sm text-gray-700">
                        <span className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="text-center pt-4 border-t border-gray-200">
                  <button className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors">
                    Découvrir l'histoire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="innovations" className="py-20 section-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              Innovations Révolutionnaires
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div key={i} className="card-glass border-2 border-gray-200 rounded-xl p-6 hover:border-yellow-600 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>{item.title}</h3>
                <p className="text-gray-600 text-base mb-4 leading-relaxed">{item.desc}</p>
                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="excellence" className="py-20 section-light">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
              L'Excellence en Chiffres
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Analyse comparative des manufactures suisses à travers les âges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="card-glass border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Âge des Manufactures
              </h3>
              <div ref={ageChartRef} className="chart-container"></div>
            </div>

            <div className="card-glass border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900" style={{fontFamily: 'Playfair Display, serif'}}>
                Innovations par Décennie
              </h3>
              <div ref={innovationChartRef} className="chart-container"></div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            <span className="text-xl font-bold text-white" style={{fontFamily: 'Playfair Display, serif'}}>
              SwissWatch Excellence
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-6">
            L'excellence horlogère suisse depuis 1755
          </p>
          
          <div className="text-xs text-gray-500">
            © 2024 SwissWatch Excellence. Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  );
}
