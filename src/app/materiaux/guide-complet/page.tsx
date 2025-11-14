// app/page.tsx
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import AlloyMixer from '@/components/AlliageSimulator';

// Page principale
export default function HomePage(): JSX.Element {
  const [mermaidReady, setMermaidReady] = useState(false);

  const initializeMermaidControls = useCallback(() => {
    const containers = document.querySelectorAll<HTMLElement>('.mermaid-container');
    
    containers.forEach(container => {
      const mermaidElement = container.querySelector<HTMLElement>('.mermaid');
      if (!mermaidElement) return;

      let scale = 1;
      let isDragging = false;
      let startX = 0, startY = 0, translateX = 0, translateY = 0;
      let isTouch = false;
      let touchStartTime = 0;
      let initialDistance = 0;
      let initialScale = 1;
      let isPinching = false;

      const zoomInBtn = container.querySelector<HTMLElement>('.zoom-in');
      const zoomOutBtn = container.querySelector<HTMLElement>('.zoom-out');
      const resetBtn = container.querySelector<HTMLElement>('.reset-zoom');
      const fullscreenBtn = container.querySelector<HTMLElement>('.fullscreen');

      const updateTransform = () => {
        mermaidElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        container.classList.toggle('zoomed', scale > 1);
        mermaidElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      };

      zoomInBtn?.addEventListener('click', () => {
        scale = Math.min(scale * 1.25, 4);
        updateTransform();
      });

      zoomOutBtn?.addEventListener('click', () => {
        scale = Math.max(scale / 1.25, 0.3);
        if (scale <= 1) {
          translateX = 0;
          translateY = 0;
        }
        updateTransform();
      });

      resetBtn?.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
      });

      fullscreenBtn?.addEventListener('click', () => {
        container.requestFullscreen?.();
      });

      const getTouchDistance = (touch1: Touch, touch2: Touch) => {
        return Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      };

      const handleMouseDown = (e: MouseEvent) => {
        if (isTouch) return;
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        updateTransform();
        e.preventDefault();
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (isDragging && !isTouch) {
          translateX = e.clientX - startX;
          translateY = e.clientY - startY;
          updateTransform();
        }
      };

      const handleMouseUp = () => {
        if (isDragging && !isTouch) {
          isDragging = false;
          updateTransform();
        }
      };

      mermaidElement.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);

      mermaidElement.addEventListener('touchstart', (e: TouchEvent) => {
        isTouch = true;
        touchStartTime = Date.now();

        if (e.touches.length === 1) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        } else if (e.touches.length === 2) {
          isPinching = true;
          isDragging = false;
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          initialDistance = getTouchDistance(touch1, touch2);
          initialScale = scale;
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchmove', (e: TouchEvent) => {
        if (e.touches.length === 1 && isDragging && !isPinching) {
          const touch = e.touches[0];
          translateX = touch.clientX - startX;
          translateY = touch.clientY - startY;
          updateTransform();
        } else if (e.touches.length === 2 && isPinching) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = getTouchDistance(touch1, touch2);
          if (initialDistance > 0) {
            const newScale = Math.min(Math.max(
              initialScale * (currentDistance / initialDistance),
              0.3
            ), 4);
            scale = newScale;
            updateTransform();
          }
        }
        e.preventDefault();
      }, { passive: false });

      mermaidElement.addEventListener('touchend', (e: TouchEvent) => {
        if (e.touches.length === 0) {
          isDragging = false;
          isPinching = false;
          initialDistance = 0;
          setTimeout(() => { isTouch = false; }, 100);
        } else if (e.touches.length === 1 && isPinching) {
          isPinching = false;
          isDragging = true;
          const touch = e.touches[0];
          startX = touch.clientX - translateX;
          startY = touch.clientY - translateY;
        }
        updateTransform();
      });

      container.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(scale * delta, 0.3), 4);
        if (newScale !== scale) {
          const scaleDiff = newScale / scale;
          translateX = translateX * scaleDiff;
          translateY = translateY * scaleDiff;
          scale = newScale;
          if (scale <= 1) {
            translateX = 0;
            translateY = 0;
          }
          updateTransform();
        }
      });

      updateTransform();
    });
  }, []);

  useEffect(() => {
    const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
    tocLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section[id], div[id]');
      const tocLinks = document.querySelectorAll<HTMLAnchorElement>('.toc-link');
      
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      tocLinks.forEach(link => {
        link.classList.remove('bg-yellow-500', 'text-black', 'dark:bg-yellow-600');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('bg-yellow-500', 'dark:bg-yellow-600', 'text-black');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mermaidReady) return;

    const init = () => {
      if (typeof window !== 'undefined' && (window as any).mermaid) {
        (window as any).mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: '#f8f6f0',
            primaryTextColor: '#1a1208',
            primaryBorderColor: '#2c1810',
            lineColor: '#8b7355',
            secondaryColor: '#ffffff',
            tertiaryColor: '#fef3c7',
            background: '#ffffff',
            mainBkg: '#f8f6f0',
            secondBkg: '#ffffff',
            tertiaryBkg: '#fef3c7',
            nodeBorder: '#2c1810',
            clusterBkg: '#f9fafb',
            defaultLinkColor: '#8b7355',
            titleColor: '#1a1208',
            edgeLabelBackground: '#ffffff',
            nodeTextColor: '#1a1208'
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            padding: 20
          },
          fontFamily: 'Inter, sans-serif',
          fontSize: '13px'
        });

        (window as any).mermaid.init(undefined, '.mermaid');
        
        setTimeout(initializeMermaidControls, 500);
      }
    };

    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('load', init);
      return () => window.removeEventListener('load', init);
    }
  }, [mermaidReady, initializeMermaidControls]);

  return (
    <>
      <Head>
        <title>Guide Complet des Métaux en Horlogerie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
      
      <Script 
        src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" 
        strategy="afterInteractive" 
        onLoad={() => setMermaidReady(true)} 
      />
      
      <Script 
        src="https://cdn.tailwindcss.com" 
        strategy="beforeInteractive" 
      />

      <style jsx global>{`
        :root {
          --color-primary: #2c1810;
          --color-secondary: #8b7355;
          --color-accent: #a68b5b;
          --color-light: #f8f6f0;
          --color-dark: #1a1208;
        }
        
        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--color-light);
          color: var(--color-dark);
          line-height: 1.7;
          overflow-x: hidden;
        }

        @media (prefers-color-scheme: dark) {
          body {
            background-color: #1a1a1a;
            color: #e5e5e5;
          }
        }
        
        .serif-heading {
          font-family: 'Playfair Display', serif;
        }
        
        .hero-gradient {
          background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-primary) 50%, var(--color-secondary) 100%);
        }
        
        .toc-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: var(--color-dark);
          color: var(--color-light);
          overflow-y: auto;
          z-index: 1000;
          padding: 2rem 1.5rem;
          border-right: 3px solid var(--color-accent);
        }
        
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }
        
        .toc-link {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--color-light);
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }
        
        .toc-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-left-color: var(--color-accent);
          transform: translateX(4px);
        }
        
        .section-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .section-card {
            background: #2a2a2a;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border-color: #444;
          }
        }
        
        .citation {
          display: inline-block;
          background: var(--color-accent);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          text-decoration: none;
          margin: 0 0.25rem;
          transition: all 0.3s ease;
        }
        
        .citation:hover {
          background: var(--color-primary);
          transform: scale(1.05);
        }
        
        .chart-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .chart-container {
            background: #2a2a2a;
          }
        }
        
        .pull-quote {
          border-left: 4px solid var(--color-accent);
          background: rgba(166, 139, 91, 0.05);
          padding: 2rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.125rem;
          border-radius: 0 0.5rem 0.5rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .pull-quote {
            background: rgba(166, 139, 91, 0.15);
          }
        }
        
        .mermaid-container {
          display: flex;
          justify-content: center;
          min-height: 300px;
          max-height: 800px;
          background: #ffffff;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 30px;
          margin: 30px 0;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-container {
            background: #2a2a2a;
            border-color: #444;
          }
        }

        .mermaid-container .mermaid {
          width: 100%;
          max-width: 100%;
          height: 100%;
          cursor: grab;
          transition: transform 0.3s ease;
          transform-origin: center center;
          display: flex;
          justify-content: center;
          align-items: center;
          touch-action: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .mermaid-container .mermaid svg {
          max-width: 100%;
          height: 100%;
          display: block;
          margin: 0 auto;
        }

        .mermaid-container .mermaid:active {
          cursor: grabbing;
        }

        .mermaid-container.zoomed .mermaid {
          height: 100%;
          width: 100%;
          cursor: grab;
        }

        .mermaid-controls {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          gap: 10px;
          z-index: 20;
          background: rgba(255, 255, 255, 0.95);
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-controls {
            background: rgba(42, 42, 42, 0.95);
          }
        }

        .mermaid-control-btn {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
          font-size: 14px;
          min-width: 36px;
          height: 36px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn {
            background: #3a3a3a;
            border-color: #555;
            color: #e5e5e5;
          }
        }

        .mermaid-control-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-1px);
        }

        @media (prefers-color-scheme: dark) {
          .mermaid-control-btn:hover {
            background: #4a4a4a;
          }
        }

        .mermaid-control-btn:active {
          transform: scale(0.95);
        }

        .mermaid .node rect,
        .mermaid .node circle,
        .mermaid .node ellipse,
        .mermaid .node polygon {
          stroke-width: 2px;
          stroke: var(--color-primary);
        }
        
        .mermaid .node .label {
          color: var(--color-dark) !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }
        
        .mermaid .edgeLabel {
          background-color: rgba(255, 255, 255, 0.9) !important;
          color: var(--color-dark) !important;
          font-weight: 500 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
          font-size: 11px !important;
        }
        
        .mermaid .edge-thickness-normal {
          stroke-width: 2px;
        }
        
        .mermaid .edge-pattern-solid {
          stroke: var(--color-secondary);
        }
        
        .mermaid .node[class*="fill-"] .label {
          color: var(--color-dark) !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9) !important;
        }
        
        .mermaid .node[style*="fill:"] .label {
          color: var(--color-dark) !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9) !important;
        }
        
        .bento-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 2rem;
          height: 60vh;
        }
        
        .bento-item {
          border-radius: 1rem;
          overflow: hidden;
          position: relative;
        }
        
        .bento-hero {
          grid-row: 1 / 3;
          background: linear-gradient(135deg, rgba(44, 24, 16, 0.8) 0%, rgba(139, 115, 85, 0.6) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        
        .bento-summary {
          background: white;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (prefers-color-scheme: dark) {
          .bento-summary {
            background: #2a2a2a;
          }
        }
        
        .bento-visual {
          background: linear-gradient(45deg, var(--color-accent), var(--color-secondary));
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          font-style: italic;
          color: white;
          text-align: center;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          z-index: 2;
          position: relative;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          margin-top: 1rem;
          z-index: 2;
          position: relative;
        }
        
        .material-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin: 1.5rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-left: 4px solid var(--color-accent);
          transition: transform 0.3s ease;
        }

        @media (prefers-color-scheme: dark) {
          .material-card {
            background: #2a2a2a;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          }
        }
        
        .material-card:hover {
          transform: translateY(-4px);
        }
        
        .comparison-table {
          background: white;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table {
            background: #2a2a2a;
          }
        }
        
        .comparison-table th {
          background: var(--color-primary);
          color: white;
          padding: 1rem;
          font-weight: 600;
        }
        
        .comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table td {
            border-bottom-color: rgba(255, 255, 255, 0.1);
          }
        }
        
        .comparison-table tr:hover {
          background: rgba(166, 139, 91, 0.05);
        }

        @media (prefers-color-scheme: dark) {
          .comparison-table tr:hover {
            background: rgba(166, 139, 91, 0.15);
          }
        }
        
        @media (max-width: 1024px) {
          .toc-fixed {
            display: none;
          }
          
          .main-content {
            margin-left: 0;
          }
          
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto;
            height: auto;
          }
          
          .bento-hero {
            grid-row: 1;
            padding: 3rem 1rem;
          }
          
          .hero-title {
            font-size: 2.5rem;
          }
          
          .mermaid-control-btn:not(.reset-zoom) {
            display: none;
          }
          .mermaid-controls {
            top: auto;
            bottom: 15px;
            right: 15px;
          }
        }

        @media (max-width: 768px) {
          section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .bento-hero {
            padding: 2rem 1rem;
          }

          .bento-summary h3 {
            font-size: 1.5rem;
          }

          .bento-summary p {
            font-size: 0.95rem;
          }

          .bento-summary ul li {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.5rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .bento-summary h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>

      {/* Fixed Table of Contents */}
      <nav className="toc-fixed">
        <h3 className="serif-heading text-xl font-bold mb-6 text-center border-b border-gray-600 pb-4">Table des Matières</h3>
        <div className="space-y-2">
          <a href="#introduction" className="toc-link"><i className="fas fa-play-circle mr-2"></i>Introduction</a>
          <a href="#metaux-precision" className="toc-link"><i className="fas fa-cog mr-2"></i>Métaux de Précision</a>
          <div className="ml-4 space-y-1">
            <a href="#acier" className="toc-link text-sm"><i className="fas fa-circle mr-2"></i>Acier Inoxydable</a>
            <a href="#titane" className="toc-link text-sm"><i className="fas fa-feather mr-2"></i>Titane</a>
            <a href="#alliages-cuivreux" className="toc-link text-sm"><i className="fas fa-coins mr-2"></i>Alliages Cuivreux</a>
          </div>
          <a href="#metaux-precieux" className="toc-link"><i className="fas fa-gem mr-2"></i>Métaux Précieux</a>
          <div className="ml-4 space-y-1">
            <a href="#or" className="toc-link text-sm"><i className="fas fa-crown mr-2"></i>Or</a>
            <a href="#platine" className="toc-link text-sm"><i className="fas fa-star mr-2"></i>Platine</a>
          </div>
          <a href="#materiaux-innovants" className="toc-link"><i className="fas fa-rocket mr-2"></i>Matériaux Innovants</a>
          <div className="ml-4 space-y-1">
            <a href="#ceramique" className="toc-link text-sm"><i className="fas fa-shield-alt mr-2"></i>Céramique</a>
            <a href="#bronze" className="toc-link text-sm"><i className="fas fa-mountain mr-2"></i>Bronze</a>
            <a href="#avant-garde" className="toc-link text-sm"><i className="fas fa-atom mr-2"></i>Avant-Garde</a>
          </div>
          <a href="#techniques-comparatifs" className="toc-link"><i className="fas fa-chart-bar mr-2"></i>Techniques &amp; Comparatifs</a>
          <a href="#pdf-reference" className="toc-link"><i className="fas fa-file-pdf mr-2"></i>PDF de Référence</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section avec Bento Grid */}
        <section className="p-8">
          <div className="bento-grid">
            <div className="bento-hero bento-item">
              <div>
                <h1 className="hero-title serif-heading">Les Métaux en Horlogerie</h1>
                <p className="hero-subtitle">Un Guide Complet et Technique</p>
              </div>
            </div>
            
            <div className="bento-summary bento-item">
              <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Résumé Exécutif</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ce guide explore en profondeur les matériaux métalliques utilisés dans l&apos;horlogerie moderne, 
                de l&apos;acier inoxydable aux alliages d&apos;avant-garde.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>✓ Propriétés techniques détaillées</li>
                <li>✓ Comparatifs visuels interactifs</li>
                <li>✓ Standards industriels</li>
                <li>✓ Innovations récentes</li>
              </ul>
            </div>
            
            <div className="bento-visual bento-item flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">⚙️</div>
                <p className="text-xl font-bold">Métaux de Précision</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section id="introduction" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">Introduction</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                L&apos;horlogerie de précision repose sur un choix minutieux de matériaux qui doivent allier résistance mécanique, 
                stabilité dimensionnelle et esthétique raffinée. Les métaux utilisés dans la fabrication des montres ont évolué 
                au fil des siècles, passant du laiton traditionnel aux superalliages contemporains.
              </p>
              
              <div className="pull-quote">
                &quot;Le choix du métal n&apos;est pas qu&apos;une question d&apos;esthétique : c&apos;est une décision technique qui 
                influence la durabilité, le confort et la valeur patrimoniale d&apos;une montre.&quot;
                <span className="citation">[1]</span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ce guide technique examine les propriétés physiques, chimiques et métallurgiques des principaux métaux 
                utilisés en horlogerie, ainsi que les innovations récentes qui repoussent les limites de la science des matériaux.
              </p>
            </div>
          </div>
        </section>

        {/* Section Techniques et Comparatifs avec SIMULATEUR */}
        <section id="techniques-comparatifs" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">
              Schémas Techniques et Comparatifs Visuels
            </h2>

            {/* SIMULATEUR INTÉGRÉ */}
            <div className="mb-12">
              <AlloyMixer />
            </div>

            {/* Tableau comparatif des métaux */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Tableau Comparatif des Métaux</h3>
              <div className="overflow-x-auto">
                <table className="comparison-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Métal</th>
                      <th>Densité (g/cm³)</th>
                      <th>Dureté (HV)</th>
                      <th>Résistance Corrosion</th>
                      <th>Coût Relatif</th>
                      <th>Applications</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr>
                      <td className="font-semibold">Acier 316L</td>
                      <td className="text-center">7.9</td>
                      <td className="text-center">150-200</td>
                      <td className="text-center">⭐⭐⭐⭐</td>
                      <td className="text-center">€</td>
                      <td>Sport, quotidien</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Acier 904L</td>
                      <td className="text-center">8.0</td>
                      <td className="text-center">200-250</td>
                      <td className="text-center">⭐⭐⭐⭐⭐</td>
                      <td className="text-center">€€</td>
                      <td>Luxe, plongée</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Titane Grade 5</td>
                      <td className="text-center">4.5</td>
                      <td className="text-center">300-350</td>
                      <td className="text-center">⭐⭐⭐⭐⭐</td>
                      <td className="text-center">€€€</td>
                      <td>Sport, aéro</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Or 18K</td>
                      <td className="text-center">15.4</td>
                      <td className="text-center">120-150</td>
                      <td className="text-center">⭐⭐⭐⭐⭐</td>
                      <td className="text-center">€€€€€</td>
                      <td>Luxe, prestige</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Platine 950</td>
                      <td className="text-center">21.4</td>
                      <td className="text-center">100-130</td>
                      <td className="text-center">⭐⭐⭐⭐⭐</td>
                      <td className="text-center">€€€€€€</td>
                      <td>Exception, museum</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Bronze CuSn8</td>
                      <td className="text-center">8.8</td>
                      <td className="text-center">80-100</td>
                      <td className="text-center">⭐⭐⭐</td>
                      <td className="text-center">€</td>
                      <td>Vintage, marine</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes méthodologiques */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-lg">
              <h4 className="font-bold mb-3 text-blue-900 dark:text-blue-300 text-lg">📌 Notes Méthodologiques</h4>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                <li>• <strong>Dureté Vickers (HV)</strong> : Mesure de la résistance à la pénétration selon norme ISO 6507</li>
                <li>• <strong>Résistance à la corrosion</strong> : Évaluée selon tests en brouillard salin (ASTM B117)</li>
                <li>• <strong>Coût relatif</strong> : Basé sur les prix du marché international des métaux (2025)</li>
                <li>• <strong>Applications</strong> : Utilisations recommandées selon standards horlogers</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section Métaux de Précision */}
        <section id="metaux-precision" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Métaux de Précision</h2>

            {/* Acier Inoxydable */}
            <div id="acier" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">⚙️</span> Acier Inoxydable
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  L&apos;acier inoxydable est l&apos;un des matériaux les plus polyvalents et répandus en horlogerie moderne. 
                  Sa résistance à la corrosion, sa durabilité et son rapport qualité-prix en font un choix privilégié pour 
                  une large gamme de montres, des modèles d&apos;entrée de gamme aux pièces de haute horlogerie.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Types d&apos;Acier</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h5 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">316L (1.4404)</h5>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><strong>Composition :</strong> Fe + 16-18% Cr + 10-14% Ni + 2-3% Mo</li>
                      <li><strong>Dureté :</strong> 150-200 HV</li>
                      <li><strong>Applications :</strong> Boîtiers, bracelets, boucles</li>
                      <li><strong>Avantages :</strong> Excellent rapport qualité/prix, biocompatible</li>
                      <li><strong>Norme :</strong> ASTM A240 / EN 1.4404</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h5 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">904L (Oystersteel®)</h5>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><strong>Composition :</strong> Fe + 19-23% Cr + 23-28% Ni + 4-5% Mo</li>
                      <li><strong>Dureté :</strong> 200-250 HV</li>
                      <li><strong>Applications :</strong> Montres de luxe (Rolex)</li>
                      <li><strong>Avantages :</strong> Résistance chimique supérieure, finition miroir</li>
                      <li><strong>Norme :</strong> ASTM B625 / UNS N08904</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 rounded">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>💡 Point Technique :</strong> Le 904L contient plus de nickel et de molybdène que le 316L, 
                    ce qui lui confère une résistance exceptionnelle aux environnements chlorurés (eau de mer, piscines).
                    <span className="citation">[2]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Titane */}
            <div id="titane" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">🪶</span> Titane
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Le titane est réputé pour son exceptionnelle légèreté (40% plus léger que l&apos;acier) combinée à une 
                  résistance mécanique élevée. Son ratio résistance/poids en fait un matériau de choix pour les montres 
                  de sport et l&apos;aéronautique.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Grade 5 (Ti-6Al-4V)</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li><strong>Composition :</strong> Ti + 6% Al + 4% V</li>
                    <li><strong>Densité :</strong> 4.43 g/cm³ (vs 7.9 pour acier 316L)</li>
                    <li><strong>Dureté :</strong> 300-350 HV</li>
                    <li><strong>Module d&apos;Young :</strong> 113.8 GPa</li>
                    <li><strong>Résistance à la traction :</strong> 895-930 MPa</li>
                    <li><strong>Biocompatibilité :</strong> Excellente (implants médicaux)</li>
                    <li><strong>Norme :</strong> ASTM B265 Grade 5 / AMS 4911</li>
                  </ul>
                </div>

                <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Traitements de Surface</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h5 className="font-bold mb-2 text-blue-900 dark:text-blue-300">Sablage</h5>
                    <p className="text-sm text-blue-800 dark:text-blue-400">Aspect mat, masque les micro-rayures</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h5 className="font-bold mb-2 text-purple-900 dark:text-purple-300">DLC (Diamond-Like Carbon)</h5>
                    <p className="text-sm text-purple-800 dark:text-purple-400">Dureté 1500-3000 HV, couleur noire</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h5 className="font-bold mb-2 text-green-900 dark:text-green-300">Anodisation</h5>
                    <p className="text-sm text-green-800 dark:text-green-400">Couleurs variées, protection accrue</p>
                  </div>
                </div>

                <div className="mt-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-600 p-4 rounded">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    <strong>✓ Avantage Clé :</strong> Le titane Grade 5 présente une couche d&apos;oxyde de titane (TiO₂) 
                    naturelle qui le protège de la corrosion, même sans traitement de surface additionnel.
                    <span className="citation">[3]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Alliages Cuivreux */}
            <div id="alliages-cuivreux" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">🥉</span> Alliages Cuivreux
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Les alliages à base de cuivre offrent d&apos;excellentes propriétés mécaniques et une facilité de mise en forme, 
                  bien que leur résistance à la corrosion soit généralement inférieure aux aciers inoxydables.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-700">
                    <h4 className="font-bold text-lg mb-3 text-amber-900 dark:text-amber-300">Laiton (CuZn)</h4>
                    <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-400">
                      <li><strong>Composition typique :</strong> Cu 65% + Zn 35%</li>
                      <li><strong>Dureté :</strong> 60-90 HV</li>
                      <li><strong>Usage :</strong> Platines, ponts (mouvements mécaniques)</li>
                      <li><strong>Traitement :</strong> Placage rhodium ou doré</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                    <h4 className="font-bold text-lg mb-3 text-orange-900 dark:text-orange-300">Bronze (CuSn)</h4>
                    <ul className="space-y-2 text-sm text-orange-800 dark:text-orange-400">
                      <li><strong>Composition :</strong> Cu 92% + Sn 8%</li>
                      <li><strong>Dureté :</strong> 80-100 HV</li>
                      <li><strong>Usage :</strong> Boîtiers de montres de plongée</li>
                      <li><strong>Particularité :</strong> Patine unique au fil du temps</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Métaux Précieux */}
        <section id="metaux-precieux" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Métaux Précieux</h2>

            {/* Or */}
            <div id="or" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">👑</span> Or
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  L&apos;or est le métal précieux par excellence en horlogerie de luxe. Sa malléabilité, son inaltérabilité 
                  et son prestige en font un matériau de choix pour les pièces d&apos;exception.
                </p>

                <h4 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-gray-100">Titrages et Alliages</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
                    <h5 className="font-bold text-lg mb-3 text-yellow-900 dark:text-yellow-300">Or Jaune 18K (750‰)</h5>
                    <ul className="space-y-2 text-sm text-yellow-800 dark:text-yellow-400">
                      <li><strong>Composition :</strong> Au 75% + Ag 15% + Cu 10%</li>
                      <li><strong>Densité :</strong> 15.4 g/cm³</li>
                      <li><strong>Dureté :</strong> 120-150 HV</li>
                      <li><strong>Couleur :</strong> Jaune classique</li>
                    </ul>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-lg border-2 border-pink-300 dark:border-pink-700">
                    <h5 className="font-bold text-lg mb-3 text-pink-900 dark:text-pink-300">Or Rose 18K (750‰)</h5>
                    <ul className="space-y-2 text-sm text-pink-800 dark:text-pink-400">
                      <li><strong>Composition :</strong> Au 75% + Cu 22.5% + Ag 2.5%</li>
                      <li><strong>Densité :</strong> 15.0 g/cm³</li>
                      <li><strong>Dureté :</strong> 130-160 HV</li>
                      <li><strong>Couleur :</strong> Rose/rouge (cuivre)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-2 border-gray-300 dark:border-gray-700">
                    <h5 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">Or Blanc 18K (750‰)</h5>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><strong>Composition :</strong> Au 75% + Pd 15% + Ag 10%</li>
                      <li><strong>Densité :</strong> 15.6 g/cm³</li>
                      <li><strong>Dureté :</strong> 140-170 HV</li>
                      <li><strong>Traitement :</strong> Rhodiage (brillance)</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-600 p-4 rounded">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>📌 Hallmark :</strong> Le poinçon 750‰ garantit 75% d&apos;or pur (18 carats). 
                    Les 25% restants sont des métaux d&apos;alliage qui influencent la couleur et les propriétés mécaniques.
                    <span className="citation">[4]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Platine */}
            <div id="platine" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">⭐</span> Platine
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Le platine est le métal le plus noble et le plus dense utilisé en horlogerie. Sa rareté exceptionnelle 
                  (30 fois plus rare que l&apos;or) et ses propriétés uniques en font le summum du luxe horloger.
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
                  <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-gray-100">Platine 950 (950‰)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Propriétés Physiques</h5>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li><strong>Composition :</strong> Pt 95% + Ru/Ir 5%</li>
                        <li><strong>Densité :</strong> 21.4 g/cm³ (très lourd)</li>
                        <li><strong>Dureté :</strong> 100-130 HV</li>
                        <li><strong>Point de fusion :</strong> 1768°C</li>
                        <li><strong>Température de travail :</strong> 1200-1400°C</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Caractéristiques</h5>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>✓ Inoxydable et inaltérable</li>
                        <li>✓ Hypoallergénique</li>
                        <li>✓ Couleur blanc-gris naturel</li>
                        <li>✓ Ne nécessite pas de rhodiage</li>
                        <li>✓ Poids substantiel (prestige au poignet)</li>
                        <li>✓ Difficulté d&apos;usinage élevée</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 dark:border-purple-600 p-4 rounded">
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    <strong>💎 Fait Remarquable :</strong> Le platine est si dense qu&apos;un cube de 30 cm de côté pèserait 
                    environ 578 kg. En horlogerie, cette densité confère un poids distinctive qui est perçu comme un signe 
                    de luxe absolu.
                    <span className="citation">[5]</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Matériaux Innovants */}
        <section id="materiaux-innovants" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">Matériaux Innovants</h2>

            {/* Céramique */}
            <div id="ceramique" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">🛡️</span> Céramique Haute Performance
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  La céramique technique est devenue incontournable en horlogerie moderne grâce à sa dureté exceptionnelle 
                  et sa résistance aux rayures.
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mt-6">
                  <h4 className="font-bold mb-4 text-gray-900 dark:text-gray-100">Zircone (ZrO₂)</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Propriétés</h5>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li><strong>Dureté :</strong> 1200-1400 HV (diamant : 10000)</li>
                        <li><strong>Densité :</strong> 6.0 g/cm³</li>
                        <li><strong>Module d&apos;Young :</strong> 210 GPa</li>
                        <li><strong>Résistance flexion :</strong> 900-1200 MPa</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Avantages</h5>
                      <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <li>✓ Quasi-inrayable</li>
                        <li>✓ Hypoallergénique</li>
                        <li>✓ Léger (vs métaux)</li>
                        <li>✓ Couleurs variées (dopage)</li>
                        <li>✓ Toucher soyeux</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-600 p-4 rounded">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>🔬 Process :</strong> La céramique horlogère est obtenue par frittage à 1450°C de poudre de 
                    zircone stabilisée à l&apos;yttrium, puis usinée avec des outils diamant.
                    <span className="citation">[6]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bronze */}
            <div id="bronze" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">🏛️</span> Bronze Maritime
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  Le bronze connaît un regain d&apos;intérêt pour les montres de plongée grâce à sa patine unique qui évolue 
                  avec le temps, rendant chaque pièce unique.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-700">
                    <h4 className="font-bold mb-3 text-amber-900 dark:text-amber-300">CuSn8 (Bronze au étain)</h4>
                    <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-400">
                      <li><strong>Composition :</strong> Cu 92% + Sn 8%</li>
                      <li><strong>Dureté :</strong> 80-100 HV</li>
                      <li><strong>Densité :</strong> 8.8 g/cm³</li>
                      <li><strong>Patine :</strong> Développe une couche de Cu₂O (vert-de-gris)</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-700">
                    <h4 className="font-bold mb-3 text-teal-900 dark:text-teal-300">Bronze d&apos;Aluminium</h4>
                    <ul className="space-y-2 text-sm text-teal-800 dark:text-teal-400">
                      <li><strong>Composition :</strong> Cu + 9-11% Al</li>
                      <li><strong>Dureté :</strong> 150-200 HV</li>
                      <li><strong>Couleur :</strong> Doré</li>
                      <li><strong>Avantage :</strong> Meilleure résistance corrosion</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-600 p-4 rounded">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>🌊 Utilisation Maritime :</strong> Le bronze CuSn8 est traditionnellement utilisé pour les 
                    hélices de bateaux et les instruments maritimes, d&apos;où son adoption pour les montres de plongée vintage.
                    <span className="citation">[7]</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Matériaux d'Avant-Garde */}
            <div id="avant-garde" className="material-card">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <span className="text-3xl">🚀</span> Matériaux d&apos;Avant-Garde
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300">
                  L&apos;horlogerie contemporaine repousse les limites de la science des matériaux avec des innovations 
                  issues de l&apos;aéronautique, du spatial et de la recherche universitaire.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h4 className="font-bold mb-2 text-purple-900 dark:text-purple-300">Carbone Forgé</h4>
                    <p className="text-sm text-purple-800 dark:text-purple-400">
                      Fibres de carbone compressées à haute température. Dureté ~1200 HV, aspect marbré unique.
                    </p>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                    <h4 className="font-bold mb-2 text-indigo-900 dark:text-indigo-300">Magic Gold</h4>
                    <p className="text-sm text-indigo-800 dark:text-indigo-400">
                      Or 18K + céramique. Dureté 1000 HV (vs 120 pour or classique). Brevet Hublot.
                    </p>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-700">
                    <h4 className="font-bold mb-2 text-pink-900 dark:text-pink-300">Alacrite 602</h4>
                    <p className="text-sm text-pink-800 dark:text-pink-400">
                      Superalliage Co-Cr. Dureté ~450 HV, couleur blanc-argent, hypoallergénique.
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h4 className="font-bold mb-2 text-blue-900 dark:text-blue-300">Tantalum (Ta)</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-400">
                      Densité 16.6 g/cm³. Très résistant à la corrosion. Couleur gris-bleu. Rare en horlogerie.
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h4 className="font-bold mb-2 text-green-900 dark:text-green-300">Silicium (Si)</h4>
                    <p className="text-sm text-green-800 dark:text-green-400">
                      Révolution pour les spiraux et échappements. Antimagnétique, ultra-précis, léger.
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h4 className="font-bold mb-2 text-red-900 dark:text-red-300">Saphir (Al₂O₃)</h4>
                    <p className="text-sm text-red-800 dark:text-red-400">
                      Dureté 2300 HV. Transparent, peut être coloré. Boîtiers et ponts avant-gardistes.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 dark:border-indigo-600 p-4 rounded">
                  <p className="text-sm text-indigo-800 dark:text-indigo-300">
                    <strong>🔬 Innovation Continue :</strong> Les laboratoires horlogers développent constamment de nouveaux 
                    matériaux : graphène, nanotubes de carbone, alliages à mémoire de forme... L&apos;avenir de l&apos;horlogerie 
                    passera par la maîtrise de ces matériaux de pointe.
                    <span className="citation">[8]</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section PDF de Référence */}
        <section id="pdf-reference" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              Références et Bibliographie
            </h2>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sources Techniques</h3>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>[1]</strong> Baillod, G. (2023). <em>Matériaux en Horlogerie : Guide Technique</em>. 
                    Éditions Horlogères Suisses.
                  </li>
                  <li>
                    <strong>[2]</strong> ASTM International. (2024). <em>ASTM A240 / B625 : Standard Specification for 
                    Chromium and Chromium-Nickel Stainless Steel Plate, Sheet, and Strip</em>.
                  </li>
                  <li>
                    <strong>[3]</strong> ASM International. (2023). <em>Titanium Alloys Handbook</em>. Materials Park, OH.
                  </li>
                  <li>
                    <strong>[4]</strong> Fédération de l&apos;Industrie Horlogère Suisse (FH). (2024). <em>Normes de Titrage 
                    des Métaux Précieux</em>.
                  </li>
                  <li>
                    <strong>[5]</strong> Johnson Matthey. (2025). <em>Platinum Properties and Applications</em>. Technical Report.
                  </li>
                  <li>
                    <strong>[6]</strong> Ceramtec. (2024). <em>Advanced Ceramics for Watchmaking</em>. Application Note.
                  </li>
                  <li>
                    <strong>[7]</strong> Institut de Science des Matériaux de Paris (ISMP). (2023). <em>Corrosion des Alliages 
                    Cuivreux en Milieu Marin</em>.
                  </li>
                  <li>
                    <strong>[8]</strong> Forsey, R., Greubel, S. (2024). <em>Innovation in Watchmaking Materials</em>. 
                    Academy of Independent Watchmaking.
                  </li>
                </ol>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">Normes Internationales</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <h4 className="font-bold mb-2 text-blue-900 dark:text-blue-300">ISO</h4>
                  <ul className="text-sm space-y-1 text-blue-800 dark:text-blue-400">
                    <li>• ISO 6507 : Dureté Vickers</li>
                    <li>• ISO 4287 : État de surface</li>
                    <li>• ISO 9227 : Brouillard salin</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <h4 className="font-bold mb-2 text-green-900 dark:text-green-300">ASTM</h4>
                  <ul className="text-sm space-y-1 text-green-800 dark:text-green-400">
                    <li>• ASTM A240 : Aciers inoxydables</li>
                    <li>• ASTM B265 : Titane et alliages</li>
                    <li>• ASTM B625 : Superalliages</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-300 dark:border-amber-700 p-6 rounded-xl text-center">
                <p className="text-lg font-semibold text-amber-900 dark:text-amber-300 mb-3">
                  📚 Guide Complet Disponible
                </p>
                <p className="text-sm text-amber-800 dark:text-amber-400 mb-4">
                  Pour une version PDF complète de ce guide technique avec schémas détaillés, 
                  tableaux comparatifs et études de cas, contactez votre fournisseur horloger.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    📥 Télécharger PDF Complet
                  </button>
                  <button className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-amber-900 dark:text-amber-300 border-2 border-amber-600 dark:border-amber-500 rounded-lg font-semibold transition-all duration-300">
                    🔗 Partager ce Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white p-8 mt-12">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm text-gray-400 mb-4">
              © 2025 Guide Technique des Métaux en Horlogerie | Tous droits réservés
            </p>
            <p className="text-xs text-gray-500">
              Ce document est fourni à titre informatif uniquement. Les spécifications techniques peuvent varier 
              selon les fabricants et les normes en vigueur. Consultez toujours les fiches techniques officielles 
              pour des applications critiques.
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Mentions Légales</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
