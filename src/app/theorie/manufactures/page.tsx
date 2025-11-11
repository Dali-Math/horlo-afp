'use client';

import { useEffect, useRef } from 'react';

export default function CraftsmanshipPage() {
  const skillChartRef = useRef(null);
  const timeChartRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.3/echarts.min.js';
    script.async = true;
    script.onload = () => {
      if (skillChartRef.current && timeChartRef.current && (window as any).echarts) {
        const echarts = (window as any).echarts;
        
        const skillChart = echarts.init(skillChartRef.current);
        const timeChart = echarts.init(timeChartRef.current);

        skillChart.setOption({
          tooltip: { trigger: "item", backgroundColor: "#1f1f1f", borderColor: "#555", textStyle: { color: "#f0f0f0" } },
          series: [{
            type: "pie",
            radius: ["40%", "70%"],
            data: [
              { value: 269, name: "Vacheron Constantin (1755)", itemStyle: { color: "#d4af37" } },
              { value: 185, name: "Patek Philippe (1839)", itemStyle: { color: "#c0c0c0" } },
              { value: 176, name: "Omega (1848)", itemStyle: { color: "#8b7355" } },
              { value: 149, name: "Audemars Piguet (1875)", itemStyle: { color: "#6b6b6b" } },
              { value: 119, name: "Rolex (1905)", itemStyle: { color: "#4a4a4a" } }
            ],
            label: { color: "#f0f0f0", fontSize: 12 }
          }]
        });

        timeChart.setOption({
          tooltip: { trigger: "axis", backgroundColor: "#1f1f1f", borderColor: "#555", textStyle: { color: "#f0f0f0" } },
          grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
          xAxis: {
            type: "category",
            data: ["1920s", "1940s", "1960s", "1980s", "2000s", "2020s"],
            axisLine: { lineStyle: { color: "#555" } },
            axisLabel: { color: "#f0f0f0" }
          },
          yAxis: {
            type: "value",
            axisLine: { lineStyle: { color: "#555" } },
            axisLabel: { color: "#f0f0f0" },
            splitLine: { lineStyle: { color: "#333" } }
          },
          series: [{
            data: [2, 3, 5, 4, 6, 8],
            type: "line",
            smooth: true,
            lineStyle: { color: "#d4af37", width: 3 },
            itemStyle: { color: "#d4af37" },
            areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(212,175,55,0.3)' }, { offset: 1, color: 'rgba(212,175,55,0.05)' }] } }
          }]
        });

        const handleResize = () => {
          skillChart.resize();
          timeChart.resize();
        };
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
          skillChart.dispose();
          timeChart.dispose();
        };
      }
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          background: #0a0a0a;
          color: #f0f0f0;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }
        
        /* NAVIGATION */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .nav-icon {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: black;
        }
        
        .nav-brand {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
        
        .nav-links {
          display: flex;
          gap: 40px;
        }
        
        .nav-links a {
          color: #999;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.3s;
        }
        
        .nav-links a:hover {
          color: white;
        }
        
        .nav-btn {
          background: white;
          color: black;
          border: none;
          padding: 10px 28px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .nav-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
        }
        
        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 40px 100px;
          background: url('https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1920&q=80') center/cover;
          position: relative;
        }
        
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.85), rgba(20, 20, 20, 0.75));
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1200px;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          padding: 8px 20px;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #999;
          margin-bottom: 40px;
        }
        
        .hero-dot {
          width: 6px;
          height: 6px;
          background: #d4af37;
          border-radius: 50%;
        }
        
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(48px, 7vw, 80px);
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 30px;
        }
        
        .hero-title .gold {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }
        
        .hero-subtitle {
          font-size: 18px;
          color: #bbb;
          max-width: 800px;
          margin: 0 auto 60px;
          line-height: 1.8;
        }
        
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto 50px;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 30px 20px;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        
        .stat-value {
          font-size: 36px;
          font-weight: 500;
          color: #d4af37;
          margin-bottom: 10px;
        }
        
        .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #888;
        }
        
        .hero-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #0a0a0a;
          border: none;
          padding: 16px 40px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .hero-btn:hover {
          background: white;
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 255, 255, 0.2);
        }
        
        /* SECTIONS */
        .section {
          padding: 120px 40px;
          background: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.015) 1px, transparent 0);
          background-size: 40px 40px;
        }
        
        .section:nth-child(even) {
          background-color: #0a0a0a;
        }
        
        .section:nth-child(odd) {
          background-color: #0f0f0f;
        }
        
        .section-content {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 400;
          margin-bottom: 20px;
          color: white;
        }
        
        .section-desc {
          font-size: 17px;
          color: #999;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.8;
        }
        
        /* TIMELINE */
        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(180deg, transparent, rgba(212,175,55,0.3), transparent);
        }
        
        .timeline-item {
          display: flex;
          margin-bottom: 80px;
          position: relative;
        }
        
        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }
        
        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        
        .timeline-content {
          width: calc(50% - 50px);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }
        
        .timeline-item:nth-child(odd) .timeline-content {
          text-align: right;
        }
        
        .timeline-year {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 500;
          color: #d4af37;
          margin-bottom: 15px;
        }
        
        .timeline-title {
          font-size: 20px;
          font-weight: 500;
          color: white;
          margin-bottom: 15px;
        }
        
        .timeline-desc {
          font-size: 14px;
          color: #999;
          line-height: 1.8;
        }
        
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 40px;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          background: #d4af37;
          border-radius: 50%;
          border: 4px solid #0a0a0a;
          box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.2);
        }
        
        /* CARDS GRID */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s;
        }
        
        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.5);
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15);
        }
        
        .card-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .card-body {
          padding: 30px;
          text-align: center;
        }
        
        .card-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }
        
        .card-title {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          color: white;
          margin-bottom: 10px;
        }
        
        .card-year {
          font-size: 13px;
          color: #888;
          margin-bottom: 25px;
        }
        
        .card-specialties {
          text-align: left;
          margin-bottom: 25px;
        }
        
        .card-specialties h4 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #888;
          margin-bottom: 15px;
        }
        
        .card-specialties ul {
          list-style: none;
        }
        
        .card-specialties li {
          font-size: 13px;
          color: #ccc;
          margin-bottom: 8px;
          padding-left: 15px;
          position: relative;
        }
        
        .card-specialties li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 4px;
          height: 4px;
          background: #d4af37;
          border-radius: 50%;
        }
        
        .card-link {
          color: #999;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.3s;
        }
        
        .card-link:hover {
          color: #d4af37;
        }
        
        /* INNOVATION CARDS */
        .innovation-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        
        .innovation-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
          transition: all 0.4s;
        }
        
        .innovation-card:hover {
          transform: translateY(-5px);
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .innovation-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .innovation-title {
          font-size: 20px;
          font-weight: 500;
          color: white;
          margin-bottom: 15px;
        }
        
        .innovation-desc {
          font-size: 14px;
          color: #999;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .innovation-year {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          color: #d4af37;
        }
        
        /* CHARTS */
        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .chart-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 40px;
        }
        
        .chart-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 500;
          color: white;
          margin-bottom: 30px;
          text-align: center;
        }
        
        .chart {
          width: 100%;
          height: 400px;
        }
        
        /* FOOTER */
        .footer {
          background: #0a0a0a;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px 40px;
          text-align: center;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 15px;
        }
        
        .footer-icon {
          width: 36px;
          height: 36px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
          color: black;
        }
        
        .footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
        
        .footer-desc {
          font-size: 14px;
          color: #888;
          margin-bottom: 20px;
        }
        
        .footer-copy {
          font-size: 12px;
          color: #666;
        }
        
        @media (max-width: 768px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .timeline-line, .timeline-dot { display: none; }
          .timeline-item { flex-direction: column !important; }
          .timeline-content { width: 100% !important; text-align: left !important; }
          .cards-grid, .innovation-grid { grid-template-columns: 1fr; }
          .charts-grid { grid-template-columns: 1fr; }
          .nav-links { display: none; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="nav-icon">SW</div>
            <span className="nav-brand">SwissWatch Excellence</span>
          </div>
          <div className="nav-links">
            <a href="#accueil">Accueil</a>
            <a href="#histoire">Histoire</a>
            <a href="#manufactures">Manufactures</a>
            <a href="#innovations">Innovations</a>
          </div>
          <button className="nav-btn">Explorer</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>Culture Horlogère Suisse</span>
            <div className="hero-dot"></div>
          </div>
          
          <h1 className="hero-title">
            <span className="gold">Les Grandes Manufactures</span>
            <span>Horlogères Suisses</span>
          </h1>
          
          <p className="hero-subtitle">
            Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires : Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega.
          </p>
          
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-value">175+</div>
              <div className="stat-label">Ans d'excellence</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">5</div>
              <div className="stat-label">Manufactures légendaires</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">269</div>
              <div className="stat-label">Années d'histoire</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">CH</div>
              <div className="stat-label">Excellence suisse</div>
            </div>
          </div>
          
          <button className="hero-btn">Explorer l'Excellence</button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">L'Évolution de l'Excellence</h2>
            <p className="section-desc">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="timeline">
            <div className="timeline-line"></div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1755</div>
                <h3 className="timeline-title">Naissance de Vacheron Constantin</h3>
                <p className="timeline-desc">Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1839</div>
                <h3 className="timeline-title">Fondation de Patek Philippe</h3>
                <p className="timeline-desc">Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1848</div>
                <h3 className="timeline-title">Naissance d'Omega</h3>
                <p className="timeline-desc">Louis Brandt fonde Omega, qui deviendra la référence de précision et d'aventure.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1875</div>
                <h3 className="timeline-title">Création d'Audemars Piguet</h3>
                <p className="timeline-desc">Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d'avant-garde.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1905</div>
                <h3 className="timeline-title">Naissance de Rolex</h3>
                <p className="timeline-desc">Hans Wilsdorf fonde la marque qui révolutionnera l'horlogerie de sport et de luxe.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MANUFACTURES */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Les Cinq Légendes</h2>
            <p className="section-desc">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="cards-grid">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop" alt="Patek Philippe" className="card-image" />
              <div className="card-body">
                <div className="card-icon">👑</div>
                <h3 className="card-title">Patek Philippe</h3>
                <p className="card-year">Depuis 1839</p>
                <div className="card-specialties">
                  <h4>Spécialités</h4>
                  <ul>
                    <li>Quantièmes perpétuels</li>
                    <li>Calatrava</li>
                    <li>Nautilus</li>
                    <li>Grandes complications</li>
                  </ul>
                </div>
                <a href="#" className="card-link">Découvrir l'histoire →</a>
              </div>
            </div>
            
            <div className="card">
              <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=400&fit=crop" alt="Rolex" className="card-image" />
              <div className="card-body">
                <div className="card-icon">⚡</div>
                <h3 className="card-title">Rolex</h3>
                <p className="card-year">Depuis 1905</p>
                <div className="card-specialties">
                  <h4>Spécialités</h4>
                  <ul>
                    <li>Oyster Perpetual</li>
                    <li>Submariner</li>
                    <li>Daytona</li>
                    <li>GMT-Master</li>
                  </ul>
                </div>
                <a href="#" className="card-link">Découvrir l'histoire →</a>
              </div>
            </div>
            
            <div className="card">
              <img src="https://images.unsplash.com/photo-1611881043896-9196b3a1101a?w=600&h=400&fit=crop" alt="Audemars Piguet" className="card-image" />
              <div className="card-body">
                <div className="card-icon">🔷</div>
                <h3 className="card-title">Audemars Piguet</h3>
                <p className="card-year">Depuis 1875</p>
                <div className="card-specialties">
                  <h4>Spécialités</h4>
                  <ul>
                    <li>Royal Oak</li>
                    <li>Royal Oak Offshore</li>
                    <li>Tourbillons</li>
                    <li>Grandes complications</li>
                  </ul>
                </div>
                <a href="#" className="card-link">Découvrir l'histoire →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INNOVATIONS */}
      <section className="section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Innovations Révolutionnaires</h2>
            <p className="section-desc">
              Les manufactures suisses ont révolutionné l'horlogerie avec des innovations techniques et des designs iconiques qui ont marqué l'histoire.
            </p>
          </div>
          
          <div className="innovation-grid">
            <div className="innovation-card">
              <div className="innovation-icon">⚙️</div
