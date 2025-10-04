"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
      {/* Texture légère (papier/métal brossé) */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Contenu principal avec animation fade-up */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="text-center animate-fade-up">
          {/* Titre principal - Bebas Neue/Oswald style */}
          <h1 className="font-['Bebas_Neue',_'Oswald',_sans-serif] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider mb-6">
            📚 Sources horlogères
          </h1>
          
          {/* Sous-titre - Inter, gris clair */}
          <p className="font-['Inter',_sans-serif] text-base sm:text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            Documents techniques, guides, glossaires et ressources pour approfondir l'art horloger.
          </p>
        </div>
      </div>

      {/* Séparation dorée subtile en bas - gradient horizontal */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
    </section>
  );
}
