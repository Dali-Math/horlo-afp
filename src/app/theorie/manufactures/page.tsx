// app/[locale]/theorie/manufactures/page.tsx

import React from "react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Les Grandes Manufactures Horlogères Suisses - Référence Mondiale | HorloLearn",
  description: "Découvrez les manufactures horlogères suisses de légende : Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega. Histoire, innovations et savoir-faire d'exception depuis 1755.",
  keywords: "manufactures suisses, Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin, Omega, horlogerie de luxe",
};

export default function ManufacturesPage() {
  return (
    <>
      <style jsx global>{`
        /* Custom Styles */
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
          background: url('/api/placeholder/1920/1080') center/cover;
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
        }
        
        .manufacture-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        
        .manufacture-card:hover {
          transform: translateY(-8px) rotateX(5deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        
        .watch-movement {
          background: radial-gradient(circle at center, #2d2d2d 0%, #0a0a0a 100%);
          border: 2px solid #c0c0c0;
        }
        
        .precision-grid {
          background-image: 
            linear-gradient(rgba(192, 192, 192, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(192, 192, 192, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .luxury-button {
          background: linear-gradient(135deg, #c0c0c0 0%, #e5e5e5 50%, #c0c0c0 100%);
          border: 1px solid #a0a0a0;
          transition: all 0.3s ease;
        }
        
        .luxury-button:hover {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #d4af37 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
        
        .typewriter {
          overflow: hidden;
          border-right: 2px solid #d4af37;
          white-space: nowrap;
          margin: 0 auto;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #d4af37; }
        }
        
        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        
        .innovation-visual {
          background: linear-gradient(45deg, #0a0a0a 25%, transparent 25%), 
                      linear-gradient(-45deg, #0a0a0a 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #0a0a0a 75%), 
                      linear-gradient(-45deg, transparent 75%, #0a0a0a 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
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
          animation: shine 3s infinite;
        }
        
        @keyframes shine {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Tailwind custom colors */
        :root {
          --swiss-black: #0a0a0a;
          --swiss-white: #fafafa;
          --swiss-silver: #c0c0c0;
          --swiss-charcoal: #2d2d2d;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] backdrop-blur-md border-b border-[#c0c0c0]/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#c0c0c0] to-[#fafafa] rounded-full flex items-center justify-center">
                <span className="text-[#0a0a0a] font-bold text-sm">SW</span>
              </div>
              <span className="font-playfair text-xl font-bold text-[#fafafa]">SwissWatch Excellence</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Accueil</a>
              <a href="#timeline" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Histoire</a>
              <a href="#manufactures" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Manufactures</a>
              <a href="#innovations" className="text-[#c0c0c0] hover:text-[#fafafa] transition-colors">Innovations</a>
            </div>
            
            <button className="luxury-button px-6 py-2 rounded-full text-[#2d2d2d] font-semibold">
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
            
            <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gold-gradient typewriter">Les Grandes Manufactures</span><br>
              <span className="text-[#fafafa]">Horlogères Suisses</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#c0c0c0]/80 max-w-4xl mx-auto mb-8 leading-relaxed">
              Découvrez l'excellence horlogère suisse à travers ses cinq manufactures légendaires : 
              Patek Philippe, Rolex, Audemars Piguet, Vacheron Constantin et Omega.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="excellence-badge rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#c0c0c0] mb-2">175+</div>
              <div className="text-sm text-[#c0c0c0]/70">Ans d'excellence</div>
            </div>
            <div className="excellence-badge rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#c0c0c0] mb-2">5</div>
              <div className="text-sm text-[#c0c0c0]/70">Manufactures légendaires</div>
            </div>
            <div className="excellence-badge rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#c0c0c0] mb-2">269</div>
              <div className="text-sm text-[#c0c0c0]/70">Années d'histoire</div>
            </div>
            <div className="excellence-badge rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-[#c0c0c0] mb-2">🇨🇭</div>
              <div className="text-sm text-[#c0c0c0]/70">Excellence suisse</div>
            </div>
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
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]">L'Évolution de l'Excellence</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Parcourez plus de 250 ans d'histoire horlogère suisse, marquée par l'innovation, 
              le savoir-faire et l'excellence technique.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#c0c0c0]/30 h-full"></div>
            
            <div className="space-y-12">
              <div className="timeline-item flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                    <h3 className="font-playfair text-2xl font-bold mb-2 text-[#c0c0c0]">1755</h3>
                    <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">Naissance de Vacheron Constantin</h4>
                    <p className="text-[#c0c0c0]/70">Jean-Marc Vacheron fonde ce qui deviendra la plus ancienne manufacture horlogère suisse.</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              <div className="timeline-item flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                    <h3 className="font-playfair text-2xl font-bold mb-2 text-[#c0c0c0]">1839</h3>
                    <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">Fondation de Patek Philippe</h4>
                    <p className="text-[#c0c0c0]/70">Antoine Norbert de Patek et Adrien Philippe créent la manufacture de prestige absolu.</p>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                    <h3 className="font-playfair text-2xl font-bold mb-2 text-[#c0c0c0]">1848</h3>
                    <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">Naissance d'Omega</h4>
                    <p className="text-[#c0c0c0]/70">Louis Brandt fonde Omega, qui deviendra la référence de précision et d'aventure.</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
              
              <div className="timeline-item flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                    <h3 className="font-playfair text-2xl font-bold mb-2 text-[#c0c0c0]">1875</h3>
                    <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">Création d'Audemars Piguet</h4>
                    <p className="text-[#c0c0c0]/70">Jules-Louis Audemars et Edward-Auguste Piguet fondent leur manufacture d'avant-garde.</p>
                  </div>
                </div>
              </div>
              
              <div className="timeline-item flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-[#2d2d2d]/50 rounded-xl p-6 border border-[#c0c0c0]/20">
                    <h3 className="font-playfair text-2xl font-bold mb-2 text-[#c0c0c0]">1905</h3>
                    <h4 className="text-xl font-semibold mb-3 text-[#fafafa]">Naissance de Rolex</h4>
                    <p className="text-[#c0c0c0]/70">Hans Wilsdorf fonde la marque qui révolutionnera l'horlogerie de sport et de luxe.</p>
                  </div>
                </div>
                <div className="w-8 h-8 bg-[#c0c0c0] rounded-full border-4 border-[#0a0a0a] flex-shrink-0 z-10"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufactures Section */}
      <section id="manufactures" className="py-20 bg-[#2d2d2d]/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]">Les Cinq Légendes</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Chaque manufacture incarne une philosophie unique, un savoir-faire distinctif 
              et une contribution exceptionnelle à l'horlogerie de luxe.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Patek Philippe */}
            <div className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8 cursor-pointer">
              <div className="text-center mb-6">
                <img src="/api/placeholder/400/300" alt="Patek Philippe" 
                     className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-4xl mb-2">👑</div>
                <h3 className="font-playfair text-2xl font-bold mb-2 text-[#fafafa]">Patek Philippe</h3>
                <p className="text-[#c0c0c0]/60 text-sm">Depuis 1839</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Quantièmes perpétuels</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Calatrava</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Nautilus</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Grandes complications</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-[#c0c0c0]/70 text-sm group-hover:text-[#c0c0c0] transition-colors">
                  Découvrir l'histoire →
                </span>
              </div>
            </div>
            
            {/* Rolex */}
            <div className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8 cursor-pointer">
              <div className="text-center mb-6">
                <img src="/api/placeholder/400/300" alt="Rolex" 
                     className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-playfair text-2xl font-bold mb-2 text-[#fafafa]">Rolex</h3>
                <p className="text-[#c0c0c0]/60 text-sm">Depuis 1905</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Oyster Perpetual</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Submariner</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Daytona</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>GMT-Master</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-[#c0c0c0]/70 text-sm group-hover:text-[#c0c0c0] transition-colors">
                  Découvrir l'histoire →
                </span>
              </div>
            </div>
            
            {/* Audemars Piguet */}
            <div className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8 cursor-pointer">
              <div className="text-center mb-6">
                <img src="/api/placeholder/400/300" alt="Audemars Piguet" 
                     className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-4xl mb-2">🔷</div>
                <h3 className="font-playfair text-2xl font-bold mb-2 text-[#fafafa]">Audemars Piguet</h3>
                <p className="text-[#c0c0c0]/60 text-sm">Depuis 1875</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Royal Oak</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Royal Oak Offshore</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Tourbillons</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Grandes complications</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-[#c0c0c0]/70 text-sm group-hover:text-[#c0c0c0] transition-colors">
                  Découvrir l'histoire →
                </span>
              </div>
            </div>
            
            {/* Vacheron Constantin */}
            <div className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8 cursor-pointer">
              <div className="text-center mb-6">
                <img src="/api/placeholder/400/300" alt="Vacheron Constantin" 
                     className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-4xl mb-2">⭐</div>
                <h3 className="font-playfair text-2xl font-bold mb-2 text-[#fafafa]">Vacheron Constantin</h3>
                <p className="text-[#c0c0c0]/60 text-sm">Depuis 1755</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Patrimony</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Overseas</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Métiers d'Art</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Grandes complications</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-[#c0c0c0]/70 text-sm group-hover:text-[#c0c0c0] transition-colors">
                  Découvrir l'histoire →
                </span>
              </div>
            </div>
            
            {/* Omega */}
            <div className="manufacture-card bg-[#0a0a0a] border border-[#c0c0c0]/20 rounded-2xl p-8 cursor-pointer">
              <div className="text-center mb-6">
                <img src="/api/placeholder/400/300" alt="Omega" 
                     className="w-full h-48 object-cover rounded-xl mb-4" />
                <div className="text-4xl mb-2">🌙</div>
                <h3 className="font-playfair text-2xl font-bold mb-2 text-[#fafafa]">Omega</h3>
                <p className="text-[#c0c0c0]/60 text-sm">Depuis 1848</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-[#c0c0c0]">Spécialités</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Speedmaster</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Seamaster</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Constellation</span>
                  </div>
                  <div className="flex items-center text-sm text-[#fafafa]">
                    <span className="w-2 h-2 bg-[#c0c0c0] rounded-full mr-3"></span>
                    <span>Master Chronometer</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-[#c0c0c0]/70 text-sm group-hover:text-[#c0c0c0] transition-colors">
                  Découvrir l'histoire →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovations Section */}
      <section id="innovations" className="py-20 innovation-visual">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]">Innovations Révolutionnaires</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Les manufactures suisses ont révolutionné l'horlogerie avec des innovations 
              techniques et des designs iconiques qui ont marqué l'histoire.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Quantième Perpétuel</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Patek Philippe révolutionne l'horlogerie avec le premier quantième perpétuel 
                automatique en 1962.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">Innovation majeure</div>
            </div>
            
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Étanchéité Oyster</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Rolex introduit la première montre étanche au monde en 1926, 
                révolutionnant l'horlogerie sportive.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">1926</div>
            </div>
            
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Moonwatch</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Omega Speedmaster devient la première montre sur la Lune en 1969, 
                choisie par la NASA.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">1969</div>
            </div>
            
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Royal Oak</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Audemars Piguet crée le premier luxury sport watch en acier inoxydable 
                en 1972.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">1972</div>
            </div>
            
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Métiers d'Art</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Vacheron Constantin perpétue les techniques traditionnelles de 
                décoration horlogère.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">Tradition</div>
            </div>
            
            <div className="bg-[#0a0a0a]/50 border border-[#c0c0c0]/20 rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-playfair text-xl font-bold mb-3 text-[#fafafa]">Master Chronometer</h3>
              <p className="text-[#c0c0c0]/70 text-sm mb-4">
                Omega développe la certification Master Chronometer, 
                dépassant les normes industrielles.
              </p>
              <div className="text-xs text-[#c0c0c0]/50">2015</div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className="py-20 precision-grid">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-[#fafafa]">L'Excellence en Chiffres</h2>
            <p className="text-xl text-[#c0c0c0]/70 max-w-3xl mx-auto">
              Analyse comparative des manufactures suisses à travers les âges.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#2d2d2d]/30 border border-[#c0c0c0]/20 rounded-xl p-8">
              <h3 className="font-playfair text-2xl font-bold mb-6 text-center text-[#fafafa]">Âge des Manufactures</h3>
              <div className="h-80 flex items-center justify-center text-[#c0c0c0]">
                <p>Graphique d'âge des manufactures</p>
              </div>
            </div>
            
            <div className="bg-[#2d2d2d]/30 border border-[#c0c0c0]/20 rounded-xl p-8">
              <h3 className="font-playfair text-2xl font-bold mb-6 text-center text-[#fafafa]">Innovations par Décennie</h3>
              <div className="h-80 flex items-center justify-center text-[#c0c0c0]">
                <p>Graphique d'innovations par décennie</p>
              </div>
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
            <span className="font-playfair text-xl font-bold text-[#fafafa]">SwissWatch Excellence</span>
          </div>
          
          <p className="text-[#c0c0c0]/60 text-sm mb-6">
            L'excellence horlogère suisse depuis 1755
          </p>
          
          <div className="text-xs text-[#c0c0c0]/40">
            © 2024 SwissWatch Excellence. Tous droits réservés.
          </div>
        </div>
      </footer>

      <script dangerouslySetInnerHTML={{
        __html: `
          // Smooth scrolling function
          function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
              behavior: 'smooth'
            });
          }

          // Initialize animations on scroll
          function initScrollAnimations() {
            const timelineItems = document.querySelectorAll('.timeline-item');
            const manufactureCards = document.querySelectorAll('.manufacture-card');
            
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                  }
                }
              });
            }, { threshold: 0.1 });
            
            timelineItems.forEach(item => observer.observe(item));
            manufactureCards.forEach(card => observer.observe(card));
          }

          // Initialize everything when DOM is loaded
          document.addEventListener('DOMContentLoaded', function() {
            initScrollAnimations();
          });
        `
      }} />
    </>
  );
}
