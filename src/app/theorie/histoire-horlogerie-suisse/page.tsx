'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// ================================
// STYLES CSS ULTRA-OPTIMISÉS VERSION FINALE
// ================================
const styles = `
  * { 
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
    scroll-behavior: smooth;
  }
  
  :root {
    --bg-primary: #fafbfc;
    --bg-secondary: #ffffff;
    --bg-tertiary: #f8f9fa;
    --bg-dark: #1a1a1a;
    --text-primary: #1a1a1a;
    --text-secondary: #4a5568;
    --text-muted: #718096;
    --border-color: #e2e8f0;
    --shadow-light: rgba(0,0,0,0.04);
    --shadow-medium: rgba(0,0,0,0.08);
    --shadow-strong: rgba(0,0,0,0.15);
    --accent-primary: #2563eb;
    --accent-secondary: #7c3aed;
    --accent-tertiary: #dc2626;
    --gold-primary: #d4af37;
    --gold-secondary: #ffd700;
    --gold-tertiary: #fff200;
    --platinum: #e5e4e2;
    --gradient-gold: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #fff200 100%);
    --gradient-premium: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #d4af37 100%);
    --gradient-luxury: linear-gradient(135deg, #1a1f2e 0%, #2d3748 50%, #4a5568 100%);
  }

  [data-theme="dark"] {
    --bg-primary: #0f0f0f;
    --bg-secondary: #1a1a1a;
    --bg-tertiary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #e2e8f0;
    --text-muted: #a0aec0;
    --border-color: #374151;
    --shadow-light: rgba(255,255,255,0.05);
    --shadow-medium: rgba(255,255,255,0.1);
    --shadow-strong: rgba(255,255,255,0.15);
    --accent-primary: #3b82f6;
    --accent-secondary: #8b5cf6;
    --accent-tertiary: #f87171;
    --gradient-luxury: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #2d3748 100%);
  }

  body { 
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; 
    line-height: 1.7; 
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: all 0.4s ease;
    overflow-x: hidden;
    font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .container { max-width: 1600px; margin: 0 auto; padding: 0 20px; }
  
  /* Header Ultra-Premium Optimisé */
  .header { 
    background: var(--bg-secondary); 
    box-shadow: 0 4px 30px var(--shadow-light);
    position: sticky; 
    top: 0; 
    z-index: 1000; 
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 2px solid var(--gold-primary);
    transition: all 0.3s ease;
  }
  .header.scrolled {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(25px) saturate(200%);
  }
  .header-content { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 1.5rem 0; 
    transition: all 0.3s ease;
  }
  .header.scrolled .header-content {
    padding: 1rem 0;
  }
  .logo { 
    font-size: 2.5rem; 
    font-weight: 900; 
    background: var(--gradient-premium);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    user-select: none;
  }
  .logo::after {
    content: '🇨🇭';
    position: absolute;
    right: -40px;
    top: -5px;
    font-size: 2rem;
    animation: float 3s ease-in-out infinite;
  }
  .logo:hover { 
    transform: scale(1.08) rotate(1deg);
    filter: brightness(1.2);
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  .nav { display: flex; gap: 3rem; list-style: none; }
  .nav a { 
    text-decoration: none; 
    color: var(--text-secondary); 
    font-weight: 700; 
    cursor: pointer; 
    position: relative;
    padding: 1rem 0;
    transition: all 0.4s ease;
    font-size: 1.1rem;
    user-select: none;
  }
  .nav a:hover, .nav a.active { 
    color: var(--accent-primary); 
    transform: translateY(-2px);
  }
  .nav a::after { 
    content: ''; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    width: 0; 
    height: 3px; 
    background: var(--gradient-gold); 
    transition: width 0.4s ease; 
    border-radius: 2px;
  }
  .nav a:hover::after, .nav a.active::after { width: 100%; }

  /* Theme Toggle Ultra-Premium */
  .theme-toggle {
    background: var(--gradient-premium);
    border: none;
    color: white;
    padding: 15px 25px;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 800;
    transition: all 0.4s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  .theme-toggle::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s ease;
  }
  .theme-toggle:hover::before { left: 100%; }
  .theme-toggle:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
  }
  .theme-icon {
    font-size: 1.4rem;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }
  
  /* Hero Ultra-Spectaculaire Optimisé */
  .hero { 
    background: var(--gradient-premium);
    color: white; 
    padding: 8rem 0; 
    text-align: center; 
    position: relative; 
    overflow: hidden;
    min-height: 100vh;
    display: flex;
    align-items: center;
    isolation: isolate;
  }
  .hero::before { 
    content: ''; 
    position: absolute; 
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.1">
    <path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"/>
    <circle cx="100" cy="40" r="3" fill="white" opacity="0.4"/>
    <circle cx="300" cy="60" r="2" fill="white" opacity="0.3"/>
    <circle cx="500" cy="30" r="1.5" fill="white" opacity="0.2"/>
    <circle cx="700" cy="50" r="2.5" fill="white" opacity="0.4"/>
    <circle cx="900" cy="35" r="2" fill="white" opacity="0.3"/>
    </svg>');
    z-index: 1;
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(0deg, var(--bg-primary) 0%, transparent 100%);
    z-index: 2;
  }
  .hero-content { position: relative; z-index: 3; }
  .hero h1 { 
    font-size: clamp(2.5rem, 5vw, 5rem); 
    font-weight: 1000; 
    margin-bottom: 2rem; 
    text-shadow: 0 8px 16px rgba(0,0,0,0.4);
    animation: heroTitleFloat 2s ease-out;
    background: linear-gradient(135deg, #ffffff 0%, #ffd700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.1;
  }
  @keyframes heroTitleFloat {
    0% { opacity: 0; transform: translateY(50px) scale(0.8); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  .hero p { 
    font-size: clamp(1.2rem, 2.5vw, 2rem); 
    margin-bottom: 3rem; 
    opacity: 0.95; 
    animation: heroSubtitleFloat 1s ease-out 0.5s both;
    font-weight: 600;
  }
  @keyframes heroSubtitleFloat {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .hero-svg { 
    margin: 4rem auto; 
    width: clamp(200px, 35vw, 300px); 
    height: clamp(200px, 35vw, 300px); 
    animation: heroFloat 4s ease-in-out infinite;
    cursor: pointer;
    filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.6));
    user-select: none;
  }
  @keyframes heroFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    25% { transform: translateY(-10px) rotate(1deg); }
    50% { transform: translateY(-15px) rotate(0deg); }
    75% { transform: translateY(-5px) rotate(-1deg); }
  }
  .hero-svg:hover { 
    animation: none;
    transform: scale(1.15) rotate(5deg);
    transition: all 0.6s ease;
    filter: drop-shadow(0 0 50px rgba(255, 215, 0, 0.8));
  }
  .btn { 
    background: var(--gradient-gold);
    color: #1a1a1a;
    padding: 20px 50px; 
    border: none; 
    border-radius: 40px; 
    font-weight: 900; 
    font-size: 1.3rem;
    cursor: pointer; 
    transition: all 0.4s ease;
    animation: heroButtonFloat 1s ease-out 1s both;
    box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
    position: relative;
    overflow: hidden;
    user-select: none;
  }
  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s ease;
  }
  .btn:hover::before { left: 100%; }
  .btn:hover { 
    transform: translateY(-5px) scale(1.1); 
    box-shadow: 0 20px 50px rgba(212, 175, 55, 0.7);
  }
  @keyframes heroButtonFloat {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Sections Ultra-Premium Optimisées */
  .section { 
    padding: 6rem 0; 
    transition: all 0.4s ease;
    position: relative;
  }
  .section:nth-child(even) { 
    background: var(--bg-secondary); 
    margin: 0 3rem;
    border-radius: 30px;
    box-shadow: 0 10px 40px var(--shadow-light);
  }
  .section:nth-child(odd) { 
    background: var(--bg-primary); 
  }
  .section h2 { 
    font-size: clamp(2rem, 4vw, 3.5rem); 
    font-weight: 1000; 
    margin-bottom: 4rem; 
    text-align: center; 
    color: var(--text-primary); 
    position: relative;
    background: var(--gradient-premium);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .section h2::after { 
    content: ''; 
    position: absolute; 
    left: 50%; 
    transform: translateX(-50%); 
    bottom: -20px; 
    width: 120px; 
    height: 6px; 
    background: var(--gradient-gold); 
    border-radius: 3px;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
  }
  
  /* Grids Ultra-Premium Optimisées */
  .grid { 
    display: grid; 
    gap: 3rem; 
    margin-top: 4rem; 
  }
  .stats-grid { 
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
  }
  .cards-grid { 
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); 
  }
  .manufactures-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
  .premium-grid {
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  }
  .luxury-grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
  
  /* Cards Ultra-Premium Optimisées */
  .card { 
    background: var(--bg-secondary); 
    padding: 3rem; 
    border-radius: 25px; 
    box-shadow: 0 12px 35px var(--shadow-light); 
    transition: all 0.5s ease; 
    border: 2px solid transparent;
    position: relative;
    overflow: hidden;
    will-change: transform;
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-gold);
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .card:hover::before { opacity: 1; }
  .card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent);
    transition: left 0.6s ease;
  }
  .card:hover::after { left: 100%; }
  .card:hover { 
    transform: translateY(-15px) scale(1.03); 
    box-shadow: 0 25px 50px var(--shadow-strong);
    border-color: var(--gold-primary);
  }
  .card img { 
    width: 100%; 
    height: 280px; 
    object-fit: cover; 
    border-radius: 20px; 
    margin-bottom: 2rem; 
    transition: all 0.5s ease;
    box-shadow: 0 8px 25px var(--shadow-medium);
    will-change: transform;
  }
  .card:hover img { 
    transform: scale(1.12); 
    box-shadow: 0 15px 35px var(--shadow-strong);
  }
  .card h3 { 
    font-size: 1.6rem; 
    font-weight: 900; 
    color: var(--text-primary); 
    margin-bottom: 1rem;
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
  }
  .card .subtitle { 
    color: var(--accent-primary); 
    font-weight: 800; 
    margin-bottom: 1rem; 
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.95rem;
  }
  .card .since { 
    color: var(--text-muted); 
    font-size: 0.95rem; 
    margin-bottom: 1.5rem; 
    font-style: italic;
    font-weight: 600;
  }
  .card .desc { 
    color: var(--text-secondary); 
    line-height: 1.8; 
    font-size: 1rem;
  }
  
  /* Stat Cards Ultra-Premium Optimisées */
  .stat-card { 
    background: var(--bg-secondary); 
    padding: 3.5rem 2.5rem; 
    border-radius: 25px; 
    text-align: center; 
    border: 2px solid var(--border-color); 
    box-shadow: 0 12px 35px var(--shadow-light); 
    transition: all 0.5s ease; 
    position: relative; 
    overflow: hidden;
    will-change: transform;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-premium);
  }
  .stat-card:hover { 
    transform: translateY(-12px) scale(1.08); 
    box-shadow: 0 20px 45px var(--shadow-strong);
    border-color: var(--gold-primary);
  }
  .stat-number { 
    font-size: clamp(2.5rem, 4vw, 3.5rem); 
    font-weight: 1000; 
    background: var(--gradient-premium);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    line-height: 1;
  }
  .stat-label { 
    font-size: 1.1rem; 
    color: var(--text-secondary); 
    text-transform: uppercase; 
    letter-spacing: 1.2px; 
    font-weight: 800;
    line-height: 1.3;
  }

  /* Timeline Ultra-Premium Optimisée */
  .timeline { 
    position: relative; 
    max-width: 1200px; 
    margin: 5rem auto; 
    padding: 0 3rem;
  }
  .timeline::before { 
    content: ''; 
    position: absolute; 
    left: 50%; 
    transform: translateX(-50%); 
    width: 6px; 
    height: 100%; 
    background: var(--gradient-premium); 
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(102, 126, 234, 0.4);
  }
  .timeline-item { 
    position: relative; 
    margin-bottom: 6rem; 
    display: flex; 
    align-items: center;
    opacity: 0;
    animation: slideInTimeline 1s ease-out forwards;
    will-change: transform, opacity;
  }
  .timeline-item:nth-child(1) { animation-delay: 0.2s; }
  .timeline-item:nth-child(2) { animation-delay: 0.4s; }
  .timeline-item:nth-child(3) { animation-delay: 0.6s; }
  .timeline-item:nth-child(4) { animation-delay: 0.8s; }
  .timeline-item:nth-child(5) { animation-delay: 1s; }
  .timeline-item:nth-child(6) { animation-delay: 1.2s; }

  @keyframes slideInTimeline {
    from { opacity: 0; transform: translateX(-80px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .timeline-item:nth-child(even) { 
    flex-direction: row-reverse; 
  }
  .timeline-content { 
    flex: 1; 
    padding: 3rem; 
    background: var(--bg-secondary); 
    border: 2px solid var(--border-color);
    border-radius: 25px; 
    box-shadow: 0 12px 35px var(--shadow-light); 
    margin: 0 3rem; 
    transition: all 0.5s ease; 
    position: relative;
    will-change: transform;
  }
  .timeline-content::before {
    content: '';
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
  }
  .timeline-item:nth-child(odd) .timeline-content::before {
    right: -40px;
    border-left-color: var(--bg-secondary);
  }
  .timeline-item:nth-child(even) .timeline-content::before {
    left: -40px;
    border-right-color: var(--bg-secondary);
  }
  .timeline-content:hover { 
    transform: translateY(-8px) scale(1.02); 
    box-shadow: 0 20px 50px var(--shadow-strong);
    border-color: var(--gold-primary);
  }
  .timeline-year { 
    font-size: clamp(2rem, 3vw, 2.5rem); 
    font-weight: 1000; 
    background: var(--gradient-premium);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem; 
    line-height: 1;
  }
  .timeline-title { 
    font-size: clamp(1.2rem, 2vw, 1.6rem); 
    font-weight: 900; 
    margin-bottom: 1.5rem; 
    color: var(--text-primary);
    line-height: 1.2;
  }
  .timeline-desc { 
    color: var(--text-secondary); 
    line-height: 1.9; 
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }
  .timeline-image { 
    width: 100%; 
    height: 250px; 
    border-radius: 20px; 
    overflow: hidden; 
    margin-top: 2rem;
    box-shadow: 0 8px 25px var(--shadow-medium);
  }
  .timeline-image img { 
    width: 100%; 
    height: 100%; 
    object-fit: cover; 
    transition: all 0.5s ease;
    will-change: transform;
  }
  .timeline-content:hover .timeline-image img { transform: scale(1.08); }
  .timeline-marker { 
    width: 30px; 
    height: 30px; 
    background: var(--gold-primary); 
    border: 6px solid var(--bg-secondary); 
    border-radius: 50%; 
    position: absolute; 
    left: 50%; 
    transform: translateX(-50%); 
    z-index: 10; 
    box-shadow: 0 0 0 12px rgba(212, 175, 55, 0.3);
    transition: all 0.5s ease;
    cursor: pointer;
  }
  .timeline-marker:hover { 
    transform: translateX(-50%) scale(1.3); 
    box-shadow: 0 0 0 20px rgba(212, 175, 55, 0.5);
  }
  
  /* Sections Premium Spécialisées */
  .premium-section {
    background: var(--bg-tertiary);
    border: 2px solid var(--gold-primary);
    position: relative;
  }
  .premium-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: var(--gradient-gold);
  }
  .luxury-section {
    background: var(--gradient-luxury);
    color: white;
    position: relative;
  }
  .luxury-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="white" opacity="0.03">
    <path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"/>
    </svg>');
  }
  .luxury-content {
    position: relative;
    z-index: 2;
  }
  .luxury-title {
    color: var(--gold-secondary) !important;
    text-shadow: 0 4px 8px rgba(0,0,0,0.5);
    background: linear-gradient(135deg, var(--gold-secondary) 0%, var(--gold-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .elegant-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    border: 1px solid rgba(255,215,0,0.3);
    backdrop-filter: blur(10px);
  }
  
  /* Loading Animation */
  .loading {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
  }
  .loading.loaded {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Scroll Indicator */
  .scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: var(--gradient-gold);
    transform-origin: left;
    transform: scaleX(0);
    z-index: 1001;
    transition: transform 0.3s ease;
  }
  
  /* Footer Ultra-Premium */
  .footer { 
    background: var(--bg-secondary); 
    border-top: 3px solid var(--gold-primary);
    color: var(--text-primary); 
    text-align: center; 
    padding: 5rem 0; 
    position: relative;
  }
  .footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-premium);
  }
  .footer a { 
    color: var(--accent-primary); 
    text-decoration: none; 
    font-weight: 700;
    transition: all 0.3s ease;
  }
  .footer a:hover { 
    text-decoration: underline; 
    color: var(--gold-primary);
    transform: translateY(-2px);
  }
  
  /* Responsive Ultra-Premium Optimisé */
  @media (max-width: 1024px) {
    .nav { display: none; }
    .container { padding: 0 15px; }
  }
  
  @media (max-width: 768px) {
    .hero h1 { font-size: clamp(2rem, 6vw, 3rem); }
    .hero p { font-size: clamp(1rem, 4vw, 1.4rem); }
    .section { padding: 4rem 0; }
    .section h2 { font-size: clamp(1.8rem, 5vw, 2.5rem); }
    .timeline::before { left: 30px; }
    .timeline-item { 
      flex-direction: column !important; 
      align-items: flex-start; 
    }
    .timeline-content { 
      margin: 0 0 0 70px; 
      padding: 2rem; 
    }
    .timeline-marker { left: 30px; }
    .timeline-item:nth-child(even) .timeline-content::before {
      left: -40px;
      border-right-color: var(--bg-secondary);
      border-left-color: transparent;
    }
    .hero-svg { width: 200px; height: 200px; }
    .grid { gap: 2rem; }
    .logo::after { right: -30px; font-size: 1.5rem; }
    .card { padding: 2rem; }
    .card img { height: 220px; }
  }

  @media (max-width: 480px) {
    .container { padding: 0 10px; }
    .section { margin: 0 1rem; border-radius: 20px; }
    .card { padding: 1.5rem; }
    .card h3 { font-size: 1.4rem; }
    .stat-card { padding: 2.5rem 1.5rem; }
    .timeline-content { margin: 0 0 0 50px; padding: 1.5rem; }
  }

  /* Optimisations Performance */
  .card, .stat-card, .timeline-content {
    contain: layout style paint;
  }
  
  .hero-svg, .theme-toggle, .btn, .logo {
    contain: layout style;
  }

  /* Préchargement Images */
  img {
    loading: lazy;
    decoding: async;
  }
  
  /* Réduction des animations pour les utilisateurs qui préfère */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .hero-float, .logo::after, .theme-icon {
      animation: none !important;
    }
  }

  /* Print Styles */
  @media print {
    .header, .theme-toggle, .hero-svg, .btn, .scroll-indicator {
      display: none !important;
    }
    .section {
      page-break-inside: avoid;
      margin: 0 !important;
      padding: 2rem 0 !important;
    }
    .card, .stat-card {
      box-shadow: none !important;
      border: 1px solid #ccc !important;
    }
  }

  /* Accessibilité */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Focus states */
  .nav a:focus,
  .theme-toggle:focus,
  .btn:focus,
  .card:focus {
    outline: 3px solid var(--accent-primary);
    outline-offset: 2px;
  }

  /* Scrollbar Customisation */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg-primary);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--gradient-gold);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--gradient-premium);
  }

  /* Firefox */
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--gold-primary) var(--bg-primary);
  }
`;

// ================================
// DONNÉES ULTRA-COMPLÈTES VERSION FINALE
// ================================
const data = {
  stats: [
    { number: "500+", label: "Années d'Excellence" },
    { number: "24 MdsCHF", label: "CA Industrie (2024)" },
    { number: "N°1", label: "Mondial Luxe" },
    { number: "99%", label: "Horlogerie World" },
    { number: "6", label: "Régions Historiques" },
    { number: "35000+", label: "Emplois Directs" },
    { number: "100+", label: "Marques Premium" },
    { number: "42%", label: "Marché Global" }
  ],
  timeline: [
    {
      year: "1541",
      title: "Les Origines : Jean Calvin et la Naissance à Genève",
      desc: "Jean Calvin bannit le port d'objets ornementaux à Genève, forçant orfèvres et joailliers à se reconvertir dans l'horlogerie. Cette décision fondatrice marque la naissance officielle de l'industrie horlogère suisse.",
      img: "/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
    },
    {
      year: "1685",
      title: "Les Réfugiés Huguenots : Expansion dans l'Arc Jurassien",
      desc: "La révocation de l'Édit de Nantes entraîne l'arrivée massive de réfugiés huguenots français apportant capitaux, savoir-faire technique et réseaux commerciaux, démocratisant l'horlogerie.",
      img: "/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
    },
    {
      year: "1740",
      title: "Vallée de Joux : Berceau de la Haute Horlogerie",
      desc: "Les agriculteurs combiers utilisent les longs hivers pour fabriquer des pièces horlogères. Naissance des 'fermes horlogères' avec fenêtres supplémentaires pour la lumière, origem des complications.",
      img: "/imgs/Vallee_de_Joux_Swiss_Alps_Landscape_Lake_Forest.jpg"
    },
    {
      year: "1801",
      title: "L'Innovation : Le Tourbillon de Breguet",
      desc: "Abraham-Louis Breguet révolutionne l'horlogerie avec le tourbillon, mécanisme compensant les effets gravitationnels. Cette invention aberration marquer à jamais la haute horlogerie.",
      img: "/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
    },
    {
      year: "1848",
      title: "Industrialisation : Omega et l'Ère Moderne",
      desc: "Louis Brandt crée Omega à La Chaux-de-Fonds. L'industrialisation transforme l'horlogerie de l'artisanat vers la production en série, démocratisant l'accès aux montres suisses.",
      img: "/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
    },
    {
      year: "1983",
      title: "La Renaissance : Swatch Sauve l'Industrie",
      desc: "Nicolas Hayek fonde le Swatch Group suite à la crise du quartz. L'innovation horlogère et la gestion revolutionary sauvent l'industrie suisse d'un effondrement certain.",
      img: "/imgs/Biel-Bienne-Switzerland-Cite-du-Temps-Omega-Swatch-Headquarters.jpg"
    }
  ],
  regions: [
    {
      name: "Genève",
      subtitle: "Capitale de l'Excellence",
      since: "1541",
      desc: "Siège de Patek Philippe, Rolex, Vacheron Constantin. Genève concentre l'élite horlogère mondiale dans ses manufactures centenaires au cœur de la Vieille Ville.",
      img: "/imgs/geneva_luxury_watchmaking_craftsman_at_work.jpg"
    },
    {
      name: "Vallée de Joux",
      subtitle: "Berceau de la Haute Horlogerie",
      since: "1740",
      desc: "26 fermes horlogères historiques dans les Alpes suisses. Berceau d'Audemars Piguet, Jaeger-LeCoultre, où naissent les complications les plus complexes au monde.",
      img: "/imgs/Vallee_de_Joux_Audemars_Piguet_Museum_Swiss_Alps_Landscape.jpg"
    },
    {
      name: "Neuchâtel",
      subtitle: "Innovation Technique",
      since: "XVIIe siècle",
      desc: "Centre d'innovation avec l'École Polytechnique Fédérale. Pionnier des systèmes de chronométrage de précision, de l'ESG à l'atome.",
      img: "/imgs/Neuchatel_Switzerland_historic_city_lake_architecture_watchmaking_clock_tower.jpg"
    },
    {
      name: "Bienne/Biel",
      subtitle: "Épicentre Industriel",
      since: "XXe siècle",
      desc: "Swatch Group concentre plus de 70% des forces de production. Omega siège dans cette ville twin, symbole de l'horlogerie industrielle moderne.",
      img: "/imgs/Bienne_Switzerland_Old_Town_Square_Watchmaking_City.jpg"
    },
    {
      name: "La Chaux-de-Fonds",
      subtitle: "Patrimoine UNESCO",
      since: "XVIIIe siècle",
      desc: "Ville horlogère unique au monde, entièrement reconstruite après un incendie. Architecture en ligne droite pour maximiser la lumière, patrimoine mondial UNESCO.",
      img: "/imgs/la_chaux_de_fonds_swiss_watchmaking_cityscape_unesco_heritage.jpg"
    },
    {
      name: "Schaffhouse",
      subtitle: "Excellence Germanophone",
      since: "XIXe siècle",
      desc: "IWC Schaffhausen symboles de l'élégance germano-suisse. Manufacture centenaire prospérant au cœur du Rhin, entre tradition et innovation.",
      img: "/imgs/Schaffhausen_Switzerland_Fronwagplatz_city_square.jpg"
    }
  ],
  manufactures: [
    {
      name: "Vacheron Constantin",
      year: "1755",
      location: "Genève",
      desc: "La plus ancienne manufacture horlogère active au monde. 270 ans d'excellence continue, symbole de l'art horloger genevois, manufacture majeure du Richemont Group.",
      img: "/imgs/Vacheron_Constantin_Tourbillon_Green_Dial_Luxury_Swiss_Watch.jpg"
    },
    {
      name: "Blancpain",
      year: "1735",
      location: "Le Brassus",
      desc: "Première manufacture horlogère au monde. Sixty Fathoms révolutionne la plongée sous-marine. Haute horlogerie dans la Vallée de Joux, savoir-faire ancestral.",
      img: "/imgs/blancpain_fifty_fathoms_luxury_swiss_dive_watch_product_shot.jpg"
    },
    {
      name: "Jaeger-LeCoultre",
      year: "1833",
      location: "Le Sentier",
      desc: "Reverso iconique, calibres manufacture complets. Inventé en 1931, le Reverso personnalisation epitomise l'élégance Art Déco. 2000 calibres développés en 190 ans.",
      img: "/imgs/jaeger_lecoultre_reverso_blue_dial_luxury_watch.jpg"
    },
    {
      name: "Patek Philippe",
      year: "1839",
      location: "Genève",
      desc: "Grandes complications, transmission de génération en génération. Manufacture genevoise d'exception, symbole absolu de la haute horlogerie mondiale, often créée pour les rois.",
      img: "/imgs/Patek_Philippe_Rose_Gold_Grand_Complications_Watch.jpg"
    },
    {
      name: "Omega",
      year: "1848",
      location: "Bienne",
      desc: "Speedmaster, montres spatiales NASA. Chronographe officielles des Jeux Olympiques. Innovation Co-Axial, précision chronométrique exceptionnelle depuis 175 ans.",
      img: "/imgs/Omega_Seamaster_Chronograph_Luxury_Watch_White_Background.jpg"
    },
    {
      name: "Audemars Piguet",
      year: "1875",
      location: "Le Brassus",
      desc: "Royal Oak révolutionne l'horlogerie en 1972. Bracelet intégré en acier, design révolutionnaire Gerald Genta. Haute horlogerie contemporaine dans la Vallée de Joux.",
      img: "/imgs/audemars_piguet_royal_oak_rose_gold_black_dial_luxury_swiss_watch.jpg"
    },
    {
      name: "Rolex",
      year: "1905",
      location: "Genève",
      desc: "Oyster Perpetual, montres de sport robustes. Submariner, Daytona, Datejust icons intemporelles. 100% manufacture, précision et fiabilité absolues.",
      img: "/imgs/rolex_submariner_gold_luxury_swiss_watch_product_photo.jpg"
    },
    {
      name: "IWC Schaffhausen",
      year: "1868",
      location: "Schaffhouse",
      desc: "Portugaise, Pilots, élégance germano-suisse. Coffres de montre uniques en acajou. Tradition horlogère depuis 155 ans au cœur de la confédération helvétique.",
      img: "/imgs/IWC_Schaffhausen_Headquarters_Historic_Building_Switzerland.jpg"
    }
  ],
  premiumBrands: [
    {
      name: "Bulgari",
      subtitle: "L'Art de Rome",
      year: "1884",
      location: "Rome/Suisse",
      desc: "Collection Octo iconique, fusion de l'art italien et de l'horlogerie suisse. Innovation technique, design élégant, rayonnement international.",
      img: "/imgs/bulgari_octo_luxury_watch.jpg"
    },
    {
      name: "Richard Mille",
      subtitle: "Révolution Technique",
      year: "2001",
      location: "Genève",
      desc: "Matériaux ultralégers, Carbon TPT, design futuriste. Montres de course extrêmes, innovation maximale, haute technologie.",
      img: "/imgs/richard_mille_skeleton_watch.jpg"
    },
    {
      name: "Ulysse Nardin",
      subtitle: "Marine Excellence",
      year: "1846",
      location: "Le Locle",
      desc: "Marine, Freak révolutionnaires, échappements haute performance. Innovation constante, précision marine, design submarine.",
      img: "/imgs/ulysse_nardin_marine_chronograph.jpg"
    },
    {
      name: "Breguet",
      subtitle: "Heritage Magistral",
      year: "1775",
      location: "Vallée de Joux",
      desc: "Tourbillon inventé par Breguet (1801). Classique, Tradition, Marine. Héritage exceptionnel, innovations fundamentales.",
      img: "/imgs/breguet_tourbillon_classique.jpg"
    },
    {
      name: "TAG Heuer",
      subtitle: "Sport & Precision",
      year: "1860",
      location: "La Chaux-de-Fonds",
      desc: "Carrera, Monaco, Monaco Grand Prix. Chronographes sportifs, Formula 1, précision racing. Heritage automobile depuis 160 ans.",
      img: "/imgs/tag_heuer_carrera_chronograph.jpg"
    },
    {
      name: "Breitling",
      subtitle: "Aviation Heritage",
      year: "1884",
      location: "Grenoble/Suisse",
      desc: "Navitimer, Aviator, instruments aviateurs. Chronographes aviation, design fonctionnel, précision extreme.",
      img: "/imgs/breitling_navitimer_aviation.jpg"
    },
    {
      name: "Chopard",
      subtitle: "Art & Sport",
      year: "1860",
      location: "Fleurier",
      desc: "Mille Miglia, Happy Sport, haute joaillerie. Fusion art, sport, haute technologie. Monte Carlo, excellence racing.",
      img: "/imgs/chopard_mille_miglia_racing.jpg"
    },
    {
      name: "Hublot",
      subtitle: "Fusion Innovation",
      year: "1980",
      location: "Nyon",
      desc: "Big Bang, Spirit of Big Bang, fusion matériaux. Design révolutionnaire, diversification composants, innovation constante.",
      img: "/imgs/hublot_big_bang_fusion.jpg"
    },
    {
      name: "Zenith",
      subtitle: "El Primero",
      year: "1865",
      location: "Le Locle",
      desc: "El Primero, premier chronographe automatique. Pilot Type 20, Heritage. Précision exception, innovation historique.",
      img: "/imgs/zenith_el_primero_chronograph.jpg"
    },
    {
      name: "Tissot",
      subtitle: "Accessible Luxury",
      year: "1853",
      location: "Le Locle",
      desc: "T-Touch,Quickster, innovation accessible. Tradition Suiss, précision qualité, democratisation horlogerie suisse.",
      img: "/imgs/tissot_t_touch_smartwatch.jpg"
    }
  ],
  mechanisms: [
    {
      name: "Tourbillon Carrousel",
      subtitle: "Complication Supreme",
      desc: "Mécanisme révolutionnaire compensant les effets gravitationnels sur la précision horlogère. Invention de Breguet (1801), símbolo absoluto de la haute horlogerie.",
      img: "/imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg"
    },
    {
      name: "Grandes Complications",
      subtitle: "Art Horloger Suprême",
      desc: "Associations de plusieurs complications sophistiquées : calendrier perpétuel, répétitive minutes, phases de lune, réserve de marche étendue.",
      img: "/imgs/luxury_swiss_watch_tourbillon_complication_macro_mechanism.jpg"
    },
    {
      name: "Mouvement Manufacture",
      subtitle: "Précision Mécanique",
      desc: "Calibres entièrement conçus et manufacturés en interne. Finitions d'exception, decorations du métier, ponts anglés et rodiés à la main.",
      img: "/imgs/patek-philippe-swiss-luxury-watch-movement-gears-close-up.jpeg"
    },
    {
      name: "Échappement Co-Axial",
      subtitle: "Innovation Omega",
      desc: "Géorges Daniels révolutionne l'échappement en 1974. Friction réduite, lubrification étendue, précision maximale. Innovation exclusive Omega depuis 1999.",
      img: "/imgs/luxury_swiss_watch_tourbillon_mechanism_render_macro_photograph.jpg"
    }
  ],
  heritage: [
    {
      name: "Pocket Watches Vintage",
      subtitle: "Pièces Historiques",
      desc: "Montres de poche transmettre de génération en génération. Artisanat horloger d'exception, témoins du savoir-faire séculaire, patrimoine vivante.",
      img: "/imgs/vintage_gold_pocket_watch_historical_timepiece_wooden_table.jpg"
    },
    {
      name: "Heritage Horloger Suisse",
      subtitle: "Transmission Sécutaire",
      desc: "Savoir-faire ancestral transmis de maître à apprenti. Techniques traditionnelles préservées, métiers d'art unique au monde, heritage vivante.",
      img: "/imgs/vintage_swiss_heritage_pocket_watch_gold_chain.jpg"
    },
    {
      name: "Chronomètres Historiques",
      subtitle: "Précision d'Exception",
      desc: "Chronomètres de marine, observatoires, défis techniques. Maîtrise de la précision absolue, calculs astronomiques, navigation terrestre et maritime.",
      img: "/imgs/vintage_swiss_hirt_chronometer_gold_pocket_watch_historical.jpg"
    }
  ],
  innovations: [
    {
      name: "Co-Axial Escapement",
      year: "1999",
      desc: "Géorges Daniels révolutionne l'échappement. Friction réduite de 50%, lubrification étendue, précision améliorée. Innovation exclusive Omega.",
      img: "/imgs/luxury_swiss_watch_tourbillon_complication_macro.jpg"
    },
    {
      name: "Silicium",
      year: "2008",
      desc: "Patek Philippe introduce le silicium. Anti-magnétisme, poids réduit, précision accrue. Révolution des matériaux horlogers.",
      img: "/imgs/luxury_swiss_watch_tourbillon_mechanism_macro.jpg"
    },
    {
      name: "Ceramic",
      year: "2000s",
      desc: "Rolex, Audemars Piguet adoptent la céramique. Résistance aux rayures, couleur stable, innovation matériaux.",
      img: "/imgs/luxury_swiss_watch_tourbillon_carrousel_macro_mechanism.jpg"
    },
    {
      name: "Carbon Fiber",
      year: "2010s",
      desc: "Matériaux ultralégers pour la haute performance. Robustesse exception, poids minimal, technology aerospace.",
      img: "/imgs/luxury_swiss_watch_tourbillon_mechanism_render_macro_photograph.jpg"
    }
  ],
  territories: [
    {
      name: "Vallée de Joux",
      subtitle: "Alpes Suisses Pristine",
      desc: "Paysage alpin exception, berceau de la haute horlogerie. Lacs du Jura, forêts virgin, air pure pour la fabrication de mouvements de précision.",
      img: "/imgs/vallee_de_joux_swiss_jura_lakes_landscape.jpg"
    },
    {
      name: "Région Neuchâtel",
      subtitle: "Vue Lacustre Historique",
      desc: "Région horlogère historique au bord du lac. Innovation technique, recherche appliquée, centre universitaire d'excellence horlogère.",
      img: "/imgs/neuchatel-switzerland-city-lake-view-historic-watchmaking-region.jpg"
    },
    {
      name: "Ateliers Horlogers",
      subtitle: "Artisans du Temps",
      desc: "Espaces de création où naissent les montres d'exception. Maîtres horlogers, apprentis, transmission des savoirs, precision absolue.",
      img: "/imgs/swiss_luxury_watchmaking_atelier_craftsmen_watches.jpg"
    },
    {
      name: "Outils de Précision",
      subtitle: "Instrumentation Haute",
      desc: "Instruments sophistiqués pour l'assemblage horloger. Micromètres, loupes, outils aux mesures infimes, technology de pointe.",
      img: "/imgs/swiss_watchmaking_precision_tools_elegant_layout.jpg"
    }
  ],
  collections: [
    {
      name: "Patek Philippe Collection",
      subtitle: "Excellence Genèveoise",
      desc: "Collection exclusive Patek Philippe, montres d'exception. Grandes complications, transmission de génération, savoir-faire d'artisan genevois.",
      img: "/imgs/Patek_Philippe_luxury_Swiss_watch_elegant_design_product_photography.jpg"
    },
    {
      name: "Royal Oak Collection",
      subtitle: "Révolution Design",
      desc: "Royal Oak, bracelet intégré, acier inoxydable. Gerald Genta révolutionne le design horloger, symbole de la modernité Suisse.",
      img: "/imgs/audemars_piguet_royal_oak_perpetual_calendar_blue_luxury_watch.jpg"
    },
    {
      name: "Nautilus Heritage",
      subtitle: "Icône Sportive",
      desc: "Nautilus, design iconique, bracelet intégré, haute horlogerie sportive. Référence absolue des montres de sport luxueuses.",
      img: "/imgs/Patek-Philippe-Nautilus-Luxury-Swiss-Watch-Blue-Dial.jpg"
    }
  ],
  premiumFeatures: [
    {
      name: "Grandes Complications",
      subtitle: "Art Horloger Supreme",
      desc: "Réunion de plusieurs complications horlogères : calendrier perpétuel, répétition minutes, phases de lune, chronographe, perpétuel.",
      img: "/imgs/patek_philippe_grand_complications_rose_gold.jpg"
    },
    {
      name: "Haute Joaillerie",
      subtitle: "Éclat Exceptionnel",
      desc: "Sertissage de diamants, émeraudes, rubis. Techniques joaillières d'exception, design artistique, fusion art et horlogerie.",
      img: "/imgs/patek_philippe_diamond_jewelry_luxury.jpg"
    },
    {
      name: "Tourbillon d'Exception",
      subtitle: "Mécanisme Prestige",
      desc: "Tourbillon haute complication, régulation gravitaire, précision exception. Summum de l'art horloger, beauté technique.",
      img: "/imgs/vacheron_constantin_tourbillon_extraordinary.jpg"
    },
    {
      name: "Squelette Artistique",
      subtitle: "Transparence Horlogère",
      desc: "Mouvements ajourés, transparence artistique. Finition decoration, art mécanique, beauté visible du mécanisme.",
      img: "/imgs/audemars_piguet_royal_oak_skeleton_artistic.jpg"
    },
    {
      name: "Matériaux Ultra-Légers",
      subtitle: "Innovation Matériaux",
      desc: "Carbon TPT, titane grade 5, aluminium aerospace. Innovation technique, performance maximale, resistance exception.",
      img: "/imgs/richard_mille_carbon_ultra_light.jpg"
    },
    {
      name: "Émaux d'Art",
      subtitle: "Art Heritage",
      desc: "Émail cloisonné, miniature, exceptionnelles. Artisans d'art exceptionnels, techniques millénaires, précision artistique.",
      img: "/imgs/patek_philippe_enamel_art_dial.jpg"
    }
  ]
};

// ================================
// COMPOSANT PRINCIPAL VERSION FINALE OPTIMISÉE
// ================================
export default function HorlogeriePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Theme Management optimisé
  useEffect(() => {
    const savedTheme = localStorage.getItem('horlolearn-theme-v2-final');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    
    // Temps de chargement simulé
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('horlolearn-theme-v2-final', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Scroll Progress Indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.pageYOffset;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercentage);
      
      // Header scroll effect
      if (headerRef.current) {
        if (scrollTop > 100) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer pour navigation active optimisé
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.2, 0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Animation au scroll optimisée
  useEffect(() => {
    if (isLoading) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.loading');
    elements.forEach((element) => animateObserver.observe(element));

    return () => animateObserver.disconnect();
  }, [isLoading]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  const handleButtonClick = useCallback(() => {
    alert('🇨🇭 HorloLearn Version 2.0 Finale - L\'Excellence Horlogère Suisse Ultime ! 🎉✨🏆');
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        <div style={{
          textAlign: 'center',
          animation: 'pulse 2s infinite'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            background: 'var(--gradient-gold)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🇨🇭
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
            Chargement de l'Excellence Horlogère...
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />
      
      {/* Header Ultra-Premium */}
      <header className="header" ref={headerRef}>
        <div className="container">
          <div className="header-content">
            <div 
              className="logo" 
              onClick={() => scrollToSection('hero')}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && scrollToSection('hero')}
            >
              HorloLearn 2.0
            </div>
            <nav>
              <ul className="nav">
                <li><a 
                  onClick={() => scrollToSection('hero')} 
                  className={activeSection === 'hero' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('hero')}
                >
                  Accueil
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('stats')} 
                  className={activeSection === 'stats' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('stats')}
                >
                  Statistiques
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('timeline')} 
                  className={activeSection === 'timeline' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('timeline')}
                >
                  Chronologie
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('regions')} 
                  className={activeSection === 'regions' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('regions')}
                >
                  Régions
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('manufactures')} 
                  className={activeSection === 'manufactures' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('manufactures')}
                >
                  Manufactures
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('premium-brands')} 
                  className={activeSection === 'premium-brands' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('premium-brands')}
                >
                  Marques Premium
                </a></li>
                <li><a 
                  onClick={() => scrollToSection('innovations')} 
                  className={activeSection === 'innovations' ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && scrollToSection('innovations')}
                >
                  Innovations
                </a></li>
              </ul>
            </nav>
            <button 
              className="theme-toggle" 
              onClick={toggleTheme}
              aria-label={`Basculer vers le thème ${isDarkMode ? 'clair' : 'sombre'}`}
            >
              <span className="theme-icon">{isDarkMode ? '☀️' : '🌙'}</span>
              <span>{isDarkMode ? 'Clair' : 'Sombre'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Ultra-Spectaculaire */}
      <section id="hero" className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>🇨🇭 L'Excellence Horlogère Suisse</h1>
            <p>500+ Années d'Innovation Continue | Version 2.0 Finale Monumentale</p>
            
            {/* SVG Watch Ultra-Premium */}
            <div 
              className="hero-svg"
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && scrollToSection('stats')}
              onClick={() => scrollToSection('stats')}
              aria-label="Aller aux statistiques"
            >
              <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="watchRadialGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="70%" stopColor="rgba(255,215,0,0.8)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0.9)" />
                  </radialGradient>
                  <linearGradient id="watchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="50%" stopColor="rgba(255,215,0,0.8)" />
                    <stop offset="100%" stopColor="rgba(212,175,55,0.9)" />
                  </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="120" fill="none" stroke="url(#watchGradient)" strokeWidth="5"/>
                <circle cx="150" cy="150" r="95" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="4"/>
                <circle cx="150" cy="150" r="70" fill="url(#watchRadialGradient)" opacity="0.8"/>
                <circle cx="150" cy="150" r="10" fill="rgba(255,215,0,1)"/>
                
                {/* Hour markers premium */}
                {[0, 60, 120, 180, 240, 300, 30, 90, 150, 210, 270, 330].map((angle, index) => (
                  <line
                    key={index}
                    x1="150"
                    y1="150"
                    x2={150 + (angle % 30 === 0 ? 105 : 95) * Math.cos((angle * Math.PI) / 180)}
                    y2={150 + (angle % 30 === 0 ? 105 : 95) * Math.sin((angle * Math.PI) / 180)}
                    stroke="url(#watchGradient)"
                    strokeWidth={angle % 30 === 0 ? "4" : "2"}
                  />
                ))}
                
                {/* Watch hands premium */}
                <line
                  x1="150"
                  y1="150"
                  x2={150 + 85 * Math.cos((90 * Math.PI) / 180)}
                  y2={150 + 85 * Math.sin((90 * Math.PI) / 180)}
                  stroke="url(#watchGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <line
                  x1="150"
                  y1="150"
                  x2={150 + 65 * Math.cos((270 * Math.PI) / 180)}
                  y2={150 + 65 * Math.sin((270 * Math.PI) / 180)}
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <line
                  x1="150"
                  y1="150"
                  x2={150 + 45 * Math.cos((30 * Math.PI) / 180)}
                  y2={150 + 45 * Math.sin((30 * Math.PI) / 180)}
                  stroke="rgba(255,215,0,1)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle cx="150" cy="150" r="5" fill="rgba(255,215,0,1)"/>
              </svg>
            </div>
            
            <button 
              className="btn" 
              onClick={handleButtonClick}
              aria-label="Découvrir l'excellence horlogère suisse"
            >
              🇨🇭 Made in Swiss Excellence 2.0
            </button>
          </div>
        </div>
      </section>

      {/* Statistiques Ultra-Premium */}
      <section id="stats" className="section">
        <div className="container">
          <h2 className="loading">🇨🇭 Excellence Horlogère en Chiffres</h2>
          <div className="grid stats-grid">
            {data.stats.map((stat, index) => (
              <div key={index} className="stat-card loading">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Ultra-Premium */}
      <section id="timeline" className="section">
        <div className="container">
          <h2 className="loading">🇨🇭 500 Ans d'Histoire Horlogère</h2>
          <div className="timeline">
            {data.timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-content loading">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p className="timeline-desc">{item.desc}</p>
                  {item.img && (
                    <div className="timeline-image">
                      <img 
                        src={item.img} 
                        alt={`${item.title} - ${item.year}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                </div>
                <div className="timeline-marker"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Régions Horlogères Premium */}
      <section id="regions" className="section">
        <div className="container">
          <h2 className="loading">🗺️ Géographie Horlogère Suisse</h2>
          <div className="grid cards-grid">
            {data.regions.map((region, index) => (
              <div key={index} className="card loading">
                <img 
                  src={region.img} 
                  alt={`Région de ${region.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <h3>{region.name}</h3>
                <div className="subtitle">{region.subtitle}</div>
                <div className="since">Depuis {region.since}</div>
                <p className="desc">{region.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufactures Légendaires Premium */}
      <section id="manufactures" className="section">
        <div className="container">
          <h2 className="loading">🏛️ Manufactures Légendaires</h2>
          <div className="grid manufactures-grid">
            {data.manufactures.map((manufacture, index) => (
              <div key={index} className="card loading">
                <img 
                  src={manufacture.img} 
                  alt={`Montre ${manufacture.name}`}
                  loading="lazy"
                  decoding="async"
                />
                <h3>{manufacture.name}</h3>
                <div className="subtitle">Fondée en {manufacture.year}</div>
                <div className="since">📍 {manufacture.location}</div>
                <p className="desc">{
