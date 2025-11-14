// app/page.tsx
'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function HomePage(): JSX.Element {
  useEffect(() => {
    // Initialize Mermaid and controls after DOM is loaded
    const initializeMermaidControls = () => {
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
    };

    // Smooth scrolling for TOC links
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

    // Highlight active section in TOC
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
        link.classList.remove('bg-yellow-500', 'text-black');
        if (link.getAttribute('href') === '#' + currentSection) {
          link.classList.add('bg-yellow-500', 'text-black');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Initialize Mermaid
    if (typeof window !== 'undefined') {
      (window as any).mermaid?.initialize({
        startOnLoad: true,
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

      setTimeout(initializeMermaidControls, 500);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Guide Complet des Métaux en Horlogerie</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Mermaid */}
        <Script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js" strategy="afterInteractive" />
        
        {/* Tailwind CSS */}
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </Head>

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
        
        .pull-quote {
          border-left: 4px solid var(--color-accent);
          background: rgba(166, 139, 91, 0.05);
          padding: 2rem;
          margin: 2rem 0;
          font-style: italic;
          font-size: 1.125rem;
          border-radius: 0 0.5rem 0.5rem 0;
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

        .mermaid-control-btn:hover {
          background: #f8fafc;
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-1px);
        }

        .mermaid-control-btn:active {
          transform: scale(0.95);
        }

        /* Enhanced node contrast for different colors */
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
        
        /* Ensure proper contrast for different node colors */
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
        
        .comparison-table tr:hover {
          background: rgba(166, 139, 91, 0.05);
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
        {/* Hero Section with Bento Layout */}
        <section className="p-8">
          <div className="bento-grid">
            <div className="bento-item bento-hero">
              <img 
                src="https://kimi-web-img.moonshot.cn/img/www.swisswatchexpo.com/23238b338e72f54fde90c79882e75973de8cb62b.png" 
                alt="Close-up macro photograph of luxury Swiss watch movement with metallic components" 
                className="absolute inset-0 w-full h-full object-cover opacity-30" 
              />
              <div className="relative z-10">
                <h1 className="hero-title serif-heading">Guide Complet des Métaux</h1>
                <p className="hero-subtitle">L&apos;Art et la Science des Matériaux Horlogers</p>
              </div>
            </div>

            <div className="bento-item bento-summary">
              <h3 className="serif-heading text-2xl font-bold mb-4 text-gray-800">Résumé Exécutif</h3>
              <p className="text-gray-600 mb-4">Une exploration approfondie des métaux et alliages utilisés en horlogerie, de l&apos;acier inoxydable aux métaux précieux, en passant par les matériaux innovants comme le titane et la céramique.</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 7 matériaux principaux analysés</li>
                <li>• Propriétés mécaniques comparées</li>
                <li>• Applications industrielles détaillées</li>
                <li>• Ressources pédagogiques intégrées</li>
              </ul>
            </div>

            <div className="bento-item bento-visual">
              <div className="text-center text-white">
                <i className="fas fa-clock text-6xl mb-4 opacity-80"></i>
                <p className="text-lg font-medium">L&apos;union du savoir-faire traditionnel et de l&apos;innovation moderne</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section id="introduction" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Introduction aux Matériaux Horlogers</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4">Vue d&apos;ensemble des métaux et alliages</h3>
                <p className="mb-4">L&apos;horlogerie, à l&apos;intersection de l&apos;art et de la science, repose sur une sélection rigoureuse des matériaux pour créer des garde-temps à la fois fonctionnels et esthétiques <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Chaque métal ou alliage joue un rôle spécifique, dicté par ses propriétés physiques, chimiques et mécaniques.</p>
                <p>Les matériaux les plus couramment utilisés vont des métaux communs comme <strong>l&apos;acier inoxydable</strong>, le <strong>laiton</strong> et le <strong>maillechort</strong>, aux métaux précieux comme <strong>l&apos;or</strong> et le <strong>platine</strong>, en passant par des matériaux innovants comme le <strong>titane</strong>, la <strong>céramique</strong> et le <strong>bronze</strong> <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
              </div>

              <div className="material-card">
                <h3 className="serif-heading text-2xl font-bold mb-4">Importance de la sélection des matériaux</h3>
                <p className="mb-4">La sélection des matériaux en horlogerie est un processus critique qui influence directement la <strong>performance, la durabilité, l&apos;esthétique et le coût</strong> d&apos;une montre. Chaque composant, du boîtier aux plus petits rouages, exige des propriétés spécifiques.</p>
                <p>Par exemple, le boîtier, qui protège le mouvement, doit être robuste et résistant à la corrosion, ce qui fait de l&apos;acier inoxydable un choix populaire <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>. Cependant, pour les personnes sensibles au nickel, le titane, qui est hypoallergénique, est une alternative supérieure <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html" className="citation" target="_blank" rel="noopener noreferrer">[355]</a>.</p>
              </div>
            </div>

            <div className="pull-quote">
              "La compréhension de ces matériaux est essentielle pour les élèves en formation horlogère et les passionnés, car elle éclaire les choix techniques et esthétiques des horlogers."
            </div>
          </div>
        </section>

        {/* Métaux de Précision Section */}
        <section id="metaux-precision" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Les Métaux de Précision : Propriétés et Applications</h2>

            {/* Acier Inoxydable */}
            <div id="acier" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">L&apos;Acier Inoxydable : Le Matériau de Base</h3>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Composition et alliages</h4>
                  <p className="mb-3">Les deux principaux alliages sont <strong>l&apos;acier 316L</strong> et <strong>l&apos;acier 904L</strong>, tous deux appartenant à la famille des aciers austénitiques <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf" className="citation" target="_blank" rel="noopener noreferrer">[325]</a>
                    <a href="https://www.chrono24.fr/magazine/durables-elegantes-et-intemporelles-quelle-est-lorigine-des-montres-en-acier-inoxydable-p_118021/" className="citation" target="_blank" rel="noopener noreferrer">[338]</a>.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li><strong>316L:</strong> 16-18% Cr, 10-14% Ni, 2-3% Mo</li>
                    <li><strong>904L:</strong> 19-23% Cr, 23-28% Ni, 4-5% Mo, 1-2% Cu</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Propriétés mécaniques</h4>
                  <p className="mb-3">Les aciers austénitiques offrent une excellente résistance à la corrosion, une facilité de mise en forme et un rendu esthétique variable selon la finition <a href="https://rnm-metallurgie.fr/wp-content/uploads/2017/07/TM439-Prof-horlogerie.pdf" className="citation" target="_blank" rel="noopener noreferrer">[325]</a>.</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>Dureté 316L:</strong> ~250 HV</li>
                    <li><strong>Durcissement surface:</strong> jusqu&apos;à 1200 HV</li>
                    <li><strong>Résistance corrosion:</strong> Excellente</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Applications</h4>
                  <p className="mb-3">L&apos;acier inoxydable est le matériau de prédilection pour les boîtiers et les bracelets de montres, grâce à sa combinaison unique de robustesse et d&apos;esthétique polyvalente <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <ul className="text-sm space-y-1">
                    <li><strong>316L:</strong> Montres de sport et classiques</li>
                    <li><strong>904L:</strong> Montres de plongée et haut de gamme</li>
                    <li><strong>Rolex:</strong> Oystersteel (904L)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Titane */}
            <div id="titane" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">Le Titane : Légèreté et Performance</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Caractéristiques uniques</h4>
                  <p className="mb-4">Le titane s&apos;est imposé comme un matériau de choix dans l&apos;industrie horlogère, en particulier pour les montres techniques et sportives <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[359]</a>.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Avantages clés:</h5>
                    <ul className="space-y-1 text-sm">
                      <li>• <strong>Légèreté:</strong> 45% plus léger que l&apos;acier</li>
                      <li>• <strong>Hypoallergénique:</strong> Idéal pour peaux sensibles</li>
                      <li>• <strong>Résistance corrosion:</strong> Supérieure à l&apos;acier</li>
                      <li>• <strong>Densité:</strong> ~4,51 g/cm³ vs ~7,8 g/cm³ (acier)</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Comparaison avec l&apos;acier</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Caractéristique</th>
                          <th className="p-2 text-left">Titane</th>
                          <th className="p-2 text-left">Acier</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-2 border-b">Poids</td>
                          <td className="p-2 border-b text-green-600">Très léger</td>
                          <td className="p-2 border-b">Lourd</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Résistance corrosion</td>
                          <td className="p-2 border-b text-green-600">Excellente</td>
                          <td className="p-2 border-b">Bonne</td>
                        </tr>
                        <tr>
                          <td className="p-2 border-b">Biocompatibilité</td>
                          <td className="p-2 border-b text-green-600">Hypoallergénique</td>
                          <td className="p-2 border-b">Peut contenir Ni</td>
                        </tr>
                        <tr>
                          <td className="p-2">Prix</td>
                          <td className="p-2 text-red-600">Plus cher</td>
                          <td className="p-2">Abordable</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Source: <a href="https://fr.haibowellti.com/info/titanium-watches-vs-stainless-steel-watches-96570776.html" className="citation" target="_blank" rel="noopener noreferrer">[355]</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Alliages Cuivreux */}
            <div id="alliages-cuivreux" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">Les Alliages Cuivreux Traditionnels</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Le Laiton : Utilisation historique</h4>
                  <p className="mb-4">Le laiton, un alliage de cuivre et de zinc, est l&apos;un des matériaux les plus historiquement significatifs en horlogerie <a href="https://www.machining-custom.com/fr/blog/brass-vs-aluminum-vs-stainless-steel.html" className="citation" target="_blank" rel="noopener noreferrer">[366]</a>.</p>
                  <ul className="space-y-2 mb-4">
                    <li><strong>Composition:</strong> Cuivre (Cu) + Zinc (Zn)</li>
                    <li><strong>Avantages:</strong> Excellente usinabilité, bonne résistance à la corrosion</li>
                    <li><strong>Applications:</strong> Platines, ponts, rouages historiques</li>
                  </ul>
                  <p className="text-sm text-gray-600">Utilisé traditionnellement pour la &quot;cage&quot; ou le &quot;bâti&quot; du mouvement <a href="https://fr.wikipedia.org/wiki/M%C3%A9canisme_(horlogerie)" className="citation" target="_blank" rel="noopener noreferrer">[349]</a>.</p>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Le Maillechort : Composition et avantages</h4>
                  <p className="mb-4">Le maillechort, également connu sous le nom d&apos;argentan, est un alliage de cuivre, de nickel et de zinc <a href="https://inside.code41watches.com/fr/les-differents-materiaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[214]</a>.</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold mb-2">Composition typique:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Cuivre:</strong> 45-65%</li>
                      <li>• <strong>Nickel:</strong> 5-25%</li>
                      <li>• <strong>Zinc:</strong> 20-45%</li>
                    </ul>
                  </div>
                  <p className="text-sm">Résistance supérieure à la corrosion et rigidité accrue par rapport au laiton <a href="https://www.tartaix.com/content/103-maillechort" className="citation" target="_blank" rel="noopener noreferrer">[329]</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Métaux Précieux Section */}
        <section id="metaux-precieux" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Les Métaux Précieux en Horlogerie de Luxe</h2>

            {/* Or */}
            <div id="or" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">L&apos;Or : Un Symbole de Luxe</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Alliages d&apos;or</h4>
                  <p className="mb-4">L&apos;or est utilisé sous forme d&apos;alliage pour améliorer la dureté et la résistance. La teneur en or fin est exprimée en carats <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                      <span><strong>Or jaune:</strong> Or + Cuivre + Argent</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-rose-400 rounded-full mr-3"></div>
                      <span><strong>Or rose:</strong> Or + Cuivre (proportion plus élevée)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-200 rounded-full mr-3"></div>
                      <span><strong>Or blanc:</strong> Or + Métaux blancs (Ni, Pd, Ag)</span>
                    </div>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Propriétés et traitement</h4>
                  <p className="mb-4">Après durcissement par alliage, l&apos;or 18 carats atteint une dureté de 120 à 200 HV, suffisante pour résister à l&apos;usure quotidienne <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <ul className="space-y-2">
                    <li><strong>Dureté:</strong> 120-200 HV (or 18K)</li>
                    <li><strong>Traitements:</strong> Polissage, satinage, rhodiage</li>
                    <li><strong>Résistance:</strong> Inoxydable et inaltérable</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Applications</h4>
                  <p className="mb-4">L&apos;or est principalement utilisé pour les boîtiers de montres de luxe et les éléments décoratifs <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <ul className="space-y-2">
                    <li><strong>Boîtiers:</strong> Symboles de prestige</li>
                    <li><strong>Cadrans:</strong> Souvent avec guillochage</li>
                    <li><strong>Éléments:</strong> Aiguilles, index, couronnes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Platine */}
            <div id="platine" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">Le Platine : L&apos;Excellence Rare</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Caractéristiques et densité</h4>
                  <p className="mb-4">Le platine est un métal précieux encore plus rare et plus dense que l&apos;or, réservé aux garde-temps les plus exclusifs <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h5 className="font-semibold mb-2">Propriétés remarquables:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Densité:</strong> ~21,45 g/cm³ (vs ~19,3 g/cm³ or)</li>
                      <li>• <strong>Standard horloger:</strong> Platine 950 (95% pur)</li>
                      <li>• <strong>Résistance corrosion:</strong> Légendaire</li>
                      <li>• <strong>Éclat:</strong> Blanc-grisâtre inaltérable</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Applications haut de gamme</h4>
                  <p className="mb-4">Le platine est réservé aux pièces les plus prestigieuses de la haute horlogerie, un symbole de statut et de valeur <a href="http://watches-lexic.ch/pages/fr/tec/exp6.htm" className="citation" target="_blank" rel="noopener noreferrer">[436]</a>.</p>
                  <ul className="space-y-2 mb-4">
                    <li><strong>Boîtiers:</strong> Présence unique et substantielle</li>
                    <li><strong>Éléments décoratifs:</strong> Cadrans, aiguilles, index</li>
                    <li><strong>Composants techniques:</strong> Rotors de remontage</li>
                  </ul>
                  <p className="text-sm text-gray-600">Son usinage et son polissage sont extrêmement complexes, contribuant à son coût élevé.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Matériaux Innovants Section */}
        <section id="materiaux-innovants" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Matériaux Innovants et Alternatifs</h2>

            {/* Céramique */}
            <div id="ceramique" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">La Céramique : Modernité et Résistance</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Propriétés exceptionnelles</h4>
                  <p className="mb-4">La céramique est un matériau non métallique apprécié pour sa légèreté, sa résistance exceptionnelle aux rayures et son aspect futuriste <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Caractéristiques techniques:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Dureté:</strong> 1200-1500 HV (pratiquement inrayable)</li>
                      <li>• <strong>Densité:</strong> ~6 g/cm³ (légère)</li>
                      <li>• <strong>Hypoallergénique:</strong> Totalement sûr</li>
                      <li>• <strong>Esthétique:</strong> Aspect moderne et futuriste</li>
                    </ul>
                  </div>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Procédés et applications</h4>
                  <p className="mb-4">La fabrication de pièces en céramique est un processus complexe et hautement technologique, utilisant de la zircone yttriée (ZrO2) <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-fire text-orange-500 mr-3"></i>
                      <span><strong>Frittage:</strong> Chauffage à 1500°C</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-cubes text-blue-500 mr-3"></i>
                      <span><strong>Applications:</strong> Boîtiers, lunettes, bracelets</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-500 mr-3"></i>
                      <span><strong>Marques pionnières:</strong> Rado, Omega, Chanel</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bronze */}
            <div id="bronze" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">Le Bronze : Un Matériau au Patine Vivante</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Composition et évolution</h4>
                  <p className="mb-4">Le bronze, un alliage de cuivre et d&apos;étain, a connu un regain d&apos;intérêt pour son évolution naturelle au fil du temps <a href="https://58facettes.fr/blogs/magazine/les-metaux-utilises-en-horlogerie" className="citation" target="_blank" rel="noopener noreferrer">[433]</a>.</p>
                  <div className="bg-gradient-to-r from-orange-400 to-green-600 p-4 rounded-lg text-white mb-4">
                    <h5 className="font-semibold mb-2">Processus de patine:</h5>
                    <p className="text-sm">Cuivre brillant → Teintes brunes → Vertes (comme la Statue de la Liberté)</p>
                  </div>
                  <p className="text-sm">Chaque montre développe une patine unique selon l&apos;environnement et l&apos;utilisation.</p>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Montres de plongée</h4>
                  <p className="mb-4">Le bronze est particulièrement bien adapté aux montres de plongée, avec une excellente résistance à la corrosion dans l&apos;eau salée.</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <i className="fas fa-water text-blue-500 mr-3"></i>
                      <span><strong>Résistance:</strong> Excellente en milieu marin</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-history text-orange-500 mr-3"></i>
                      <span><strong>Charactère:</strong> Patine unique et vintage</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-medal text-yellow-500 mr-3"></i>
                      <span><strong>Marques:</strong> Panerai, Tudor, Oris</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Souvent produites en éditions limitées, renforçant leur attrait collecteur.</p>
                </div>
              </div>
            </div>

            {/* Avant-Garde */}
            <div id="avant-garde" className="mb-12">
              <h3 className="serif-heading text-3xl font-bold mb-6 text-center">Autres Matériaux d&apos;Avant-Garde</h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Carbone Forgé</h4>
                  <p className="mb-4">Matériau composite de pointe utilisé dans l&apos;horlogerie haut de gamme, en particulier pour les montres de sport et de course automobile.</p>
                  <ul className="space-y-2">
                    <li><strong>Structure:</strong> Fibres de carbone dans résine polymère</li>
                    <li><strong>Avantages:</strong> Ultra-léger et rigide</li>
                    <li><strong>Esthétique:</strong> Motif de fibres noires distinctif</li>
                    <li><strong>Marques:</strong> Audemars Piguet, Richard Mille</li>
                  </ul>
                </div>

                <div className="material-card">
                  <h4 className="font-bold text-xl mb-3">Liquidmetal®</h4>
                  <p className="mb-4">Alliage amorphe (métal vitreux) introduit pour ses propriétés uniques, avec une structure atomique désordonnée.</p>
                  <ul className="space-y-2">
                    <li><strong>Dureté:</strong> 3x plus dur que l&apos;acier inoxydable</li>
                    <li><strong>Propriétés:</strong> Dureté, élasticité, résistance corrosion</li>
                    <li><strong>Applications:</strong> Lunettes tournantes, inserts de boîtier</li>
                    <li><strong>Pionnier:</strong> Omega (avec céramique)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques et Comparatifs Section */}
        <section id="techniques-comparatifs" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Schémas Techniques et Comparatifs Visuels</h2>

            {/* Diagramme de structure métallique */}
            <div className="mb-12">
              <h3 className="serif-heading text-2xl font-bold mb-6 text-center">Structure granulaire métallique</h3>
              <div className="mermaid-container">
                <div className="mermaid-controls">
                  <button className="mermaid-control-btn zoom-in" title="Agrandir">
                    <i className="fas fa-search-plus"></i>
                  </button>
                  <button className="mermaid-control-btn zoom-out" title="Réduire">
                    <i className="fas fa-search-minus"></i>
                  </button>
                  <button className="mermaid-control-btn reset-zoom" title="Réinitialiser">
                    <i className="fas fa-expand-arrows-alt"></i>
                  </button>
                  <button className="mermaid-control-btn fullscreen" title="Plein écran">
                    <i className="fas fa-expand"></i>
                  </button>
                </div>
                <div className="mermaid">
                  {`graph TD
                  A["Structure Métallique"] --> B["Grains cristallins"]
                  A --> C["Joints de grains"]
                  A --> D["Dislocations"]

                  B --> B1["Taille du grain"]
                  B --> B2["Forme du grain"]
                  B --> B3["Orientation"]

                  C --> C1["Interfaces entre cristaux"]
                  C --> C2["Sites de corrosion potentielle"]
                  C --> C3["Barrière au mouvement des dislocations"]

                  D --> D1["Défauts dans la structure"]
                  D --> D2["Influence sur la ductilité"]
                  D --> D3["Rôle dans le durcissement"]

                  style A fill:#f8f6f0,stroke:#2c1810,stroke-width:3px,color:#1a1208
                  style B fill:#ffffff,stroke:#8b7355,stroke-width:2px,color:#1a1208
                  style C fill:#fef3c7,stroke:#a68b5b,stroke-width:2px,color:#1a1208
                  style D fill:#ecfdf5,stroke:#059669,stroke-width:2px,color:#1a1208
                  style B1 fill:#fafafa,stroke:#6b7280,stroke-width:1px,color:#1a1208
                  style B2 fill:#fafafa,stroke:#6b7280,stroke-width:1px,color:#1a1208
                  style B3 fill:#fafafa,stroke:#6b7280,stroke-width:1px,color:#1a1208
                  style C1 fill:#fef3c7,stroke:#d97706,stroke-width:1px,color:#1a1208
                  style C2 fill:#fef3c7,stroke:#d97706,stroke-width:1px,color:#1a1208
                  style C3 fill:#fef3c7,stroke:#d97706,stroke-width:1px,color:#1a1208
                  style D1 fill:#ecfdf5,stroke:#059669,stroke-width:1px,color:#1a1208
                  style D2 fill:#ecfdf5,stroke:#059669,stroke-width:1px,color:#1a1208
                  style D3 fill:#ecfdf5,stroke:#059669,stroke-width:1px,color:#1a1208`}
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4">
                La taille, la forme et l&apos;orientation des grains influencent directement les propriétés mécaniques du métal.
              </p>
            </div>

            {/* Tableau comparatif complet */}
            <div className="mb-12">
              <h3 className="serif-heading text-2xl font-bold mb-6 text-center">Tableau comparatif des propriétés des matériaux</h3>
              <div className="overflow-x-auto">
                <table className="comparison-table w-full">
                  <thead>
                    <tr>
                      <th className="p-3 text-left">Matériau</th>
                      <th className="p-3 text-center">Densité (g/cm³)</th>
                      <th className="p-3 text-center">Dureté (HV)</th>
                      <th className="p-3 text-center">Résistance à la Corrosion</th>
                      <th className="p-3 text-center">Hypoallergénicité</th>
                      <th className="p-3 text-center">Coût</th>
                      <th className="p-3 text-left">Applications Typiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-semibold">Acier 316L</td>
                      <td className="p-3 text-center">~7.9</td>
                      <td className="p-3 text-center">~200</td>
                      <td className="p-3 text-center text-green-600">Très Bonne</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-green-600">Faible</td>
                      <td className="p-3">Boîtiers, bracelets, composants internes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Acier 904L</td>
                      <td className="p-3 text-center">~8.0</td>
                      <td className="p-3 text-center">~250</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-yellow-600">Moyen</td>
                      <td className="p-3">Boîtiers haut de gamme (Rolex)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Titane Grade 5</td>
                      <td className="p-3 text-center">~4.5</td>
                      <td className="p-3 text-center">~350</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-orange-600">Élevé</td>
                      <td className="p-3">Boîtiers sportifs, montres de plongée</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Or 18K Jaune</td>
                      <td className="p-3 text-center">~15.4</td>
                      <td className="p-3 text-center">~150</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-red-600">Très Élevé</td>
                      <td className="p-3">Boîtiers et éléments décoratifs de luxe</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Or 18K Blanc</td>
                      <td className="p-3 text-center">~15.4</td>
                      <td className="p-3 text-center">~150</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-yellow-600">Variable (Ni)</td>
                      <td className="p-3 text-center text-red-600">Très Élevé</td>
                      <td className="p-3">Boîtiers et éléments décoratifs de luxe</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Platine 950</td>
                      <td className="p-3 text-center">~21.4</td>
                      <td className="p-3 text-center">~130</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-red-600">Extrêmement Élevé</td>
                      <td className="p-3">Boîtiers de pièces ultra-prestiges</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Céramique</td>
                      <td className="p-3 text-center">~6.0</td>
                      <td className="p-3 text-center">~1200</td>
                      <td className="p-3 text-center text-green-600">Excellente</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-orange-600">Moyen à Élevé</td>
                      <td className="p-3">Boîtiers, lunettes, bracelets</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Bronze</td>
                      <td className="p-3 text-center">~8.8</td>
                      <td className="p-3 text-center">~100</td>
                      <td className="p-3 text-center text-yellow-600">Bonne</td>
                      <td className="p-3 text-center text-green-600">Oui</td>
                      <td className="p-3 text-center text-green-600">Faible</td>
                      <td className="p-3">Boîtiers de montres de plongée vintage</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* PDF de Référence Section */}
        <section id="pdf-reference" className="p-8">
          <div className="section-card p-8">
            <h2 className="serif-heading text-4xl font-bold mb-8 text-center">Intégration du PDF de Référence : &quot;Métaux Communs&quot;</h2>

            <div className="material-card mb-8">
              <h3 className="serif-heading text-2xl font-bold mb-4">Ressource Pédagogique Complémentaire</h3>
              <p className="mb-4">Pour approfondir les connaissances sur les matériaux de base utilisés dans l&apos;industrie horlogère, un document de référence intitulé <strong>&quot;Métaux Communs&quot;</strong> est mis à disposition.</p>
              <p className="mb-4">Ce PDF, hébergé dans le dépôt GitHub <code>horlo-afp</code>, constitue une ressource pédagogique précieuse pour les élèves en formation et les passionnés. Il est conçu pour être consulté directement sur la page, offrant une expérience de lecture fluide et intégrée.</p>
              <p>Ce document fournit des informations fondamentales sur les propriétés, les compositions et les applications des métaux les plus couramment rencontrés en horlogerie. Il sert de complément essentiel aux explications détaillées présentées dans ce guide.</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold text-lg mb-4">Visionneuse de PDF Intégrée</h4>
              <p className="mb-4 text-sm text-gray-600">Si le PDF ne s&apos;affiche pas correctement, vous pouvez le télécharger directement en cliquant sur le lien ci-dessous.</p>
              <div className="text-center">
                <a href="https://github.com/Dali-Math/horlo-afp/blob/main/public/pdfs/metaux-communs.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  <i className="fas fa-download mr-2"></i>
                  Télécharger le PDF &quot;Métaux Communs&quot;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="p-8 bg-gray-900 text-white">
          <div className="text-center">
            <h3 className="serif-heading text-2xl font-bold mb-4">Guide Complet des Métaux en Horlogerie</h3>
            <p className="text-gray-400 mb-6">Une ressource pédagogique dédiée aux élèves en formation horlogère et aux passionnés</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2024 Horlo-AFP</span>
              <span>•</span>
              <span>Ressource éducative</span>
              <span>•</span>
              <span>Matériaux horlogers</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
