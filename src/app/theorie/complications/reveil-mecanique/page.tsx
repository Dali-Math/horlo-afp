"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Bell, ChevronRight, ArrowLeft, AlarmClock, Volume2, Vibrate, Clock } from 'lucide-react';

const ReveilMecaniquePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Barillet indépendant',
      desc: 'Ressort dédié au mécanisme de réveil, séparé du mouvement principal pour autonomie totale',
      icon: Clock
    },
    {
      title: 'Marteau vibrant',
      desc: 'Système de percussion rapide frappant une cloche ou membrane pour signal sonore ou vibratoire',
      icon: Vibrate
    },
    {
      title: 'Réglage programmable',
      desc: 'Cadran secondaire permettant de définir l\'heure de déclenchement avec précision',
      icon: AlarmClock
    },
    {
      title: 'Son harmonieux',
      desc: 'Timbre accordé produisant un son distinctif, signature sonore de chaque manufacture',
      icon: Volume2
    }
  ];

  const timeline = [
    { year: '1914', event: 'Premiers réveils mécaniques de poche', maker: 'Eterna' },
    { year: '1947', event: 'Cricket : premier réveil bracelet', maker: 'Vulcain' },
    { year: '1956', event: 'Memovox : réveil avec date', maker: 'Jaeger-LeCoultre' },
    { year: '1960', event: 'Adoption par présidents américains', maker: 'Vulcain Cricket' },
    { year: '2010+', event: 'Renaissance des réveils modernes', maker: 'Manufactures contemporaines' }
  ];

  const brands = [
    { name: 'Vulcain', specialty: 'Inventeur du Cricket', heritage: 'Depuis 1947' },
    { name: 'Jaeger-LeCoultre', specialty: 'Memovox légendaire', heritage: 'Master Control Memovox' },
    { name: 'Breguet', specialty: 'Réveil Type XX', heritage: 'Haute complication' },
    { name: 'Omega', specialty: 'Seamaster Alarm', heritage: 'Réveil plongée' },
    { name: 'Tudor', specialty: 'Advisor Alarm', heritage: 'Vintage collection' }
  ];

  const useCases = [
    { time: '6:00', use: 'Réveil matinal quotidien', icon: '☀️' },
    { time: '12:00', use: 'Rappel de rendez-vous important', icon: '📅' },
    { time: '18:00', use: 'Fin de journée de travail', icon: '🏢' },
    { time: '22:00', use: 'Rappel de prise de médicament', icon: '💊' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 dark:from-slate-950 dark:via-red-950 dark:to-slate-900">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-orange-600/20 to-amber-600/20"></div>
        
        <div className="absolute top-20 right-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-red-200 dark:border-red-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Bell className="text-red-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Complication Sonore Utilitaire
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Réveil Mécanique
          </h1>
          
          <p className={`text-xl md:text-2xl text-red-600 dark:text-red-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Mechanical Alarm
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            L'ancêtre mécanique du réveil moderne : utilité et ingéniosité horlogère
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Le <strong className="text-red-600 dark:text-red-400">réveil mécanique</strong> est une complication sonore permettant d'émettre un son vibrant à l'heure programmée. Véritable ancêtre du réveil moderne, il incarne la fusion entre utilité quotidienne et ingéniosité horlogère suisse.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette complication pratique transforme la montre en assistant personnel mécanique, rappelant rendez-vous et obligations avec la fiabilité d'un mouvement entièrement autonome.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-red-600 to-orange-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1947</p>
            <p className="text-lg opacity-90">Vulcain Cricket</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-amber-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-4xl font-bold mb-2">8'000 – 50'000 CHF</p>
            <p className="text-lg opacity-90">≈ 350 composants</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-red-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Durée sonnerie</p>
            <p className="text-5xl font-bold mb-2">20"</p>
            <p className="text-lg opacity-90">Vibration continue</p>
          </div>
        </div>

        {/* Démonstration interactive */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-red-400 to-orange-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">Cas d'Usage Quotidiens</h2>
          </div>
          
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            Le réveil mécanique s'impose comme un <strong className="text-red-400">outil pratique</strong> pour tous les moments de la journée nécessitant un rappel précis.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-red-900/30 rounded-2xl p-6 border border-red-700/50 hover:border-red-500 transition-all cursor-pointer"
                onClick={() => setIsRinging(!isRinging)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <p className="text-2xl font-bold text-white mb-1">{useCase.time}</p>
                    <p className="text-gray-300">{useCase.use}</p>
                  </div>
                  <Bell className={`${isRinging ? 'animate-bounce text-red-400' : 'text-red-600'}`} size={28} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-orange-900/20 rounded-xl p-6 border border-orange-700/50">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-orange-400">Astuce :</strong> Les réveils mécaniques Cricket de Vulcain étaient particulièrement prisés par les présidents américains Eisenhower et Truman pour leurs réunions diplomatiques.
            </p>
          </div>
        </section>

        {/* Mécanisme */}
        <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 mb-16 shadow-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-red-400 to-orange-600 rounded-full"></div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Le réveil mécanique repose sur un <strong className="text-red-600">barillet indépendant</strong> alimentant un marteau miniature frappant une cloche interne ou une membrane métallique. À l'heure réglée, un déclencheur libère le mécanisme, produisant une vibration ou un son distinctif.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Certaines montres utilisent des timbres pour un son plus harmonieux et musical, tandis que d'autres misent sur la vibration pure, héritage des premières "Cricket" de Vulcain. Le son peut durer de 15 à 30 secondes selon la réserve du barillet dédié.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-red-900 dark:text-red-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Barillet d'alarme</strong> : Ressort indépendant remontable séparément du mouvement principal</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Disque programmateur</strong> : Came rotative permettant de régler l'heure de déclenchement</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Marteau vibrant</strong> : Oscillateur rapide (≈120 coups/minute) frappant la membrane</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Membrane résonante</strong> : Disque métallique amplifiant le son ou la vibration</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-red-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Système ON/OFF</strong> : Curseur d'activation/désactivation de l'alarme</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Caractéristiques Techniques
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-red-500 to-orange-600 p-3 rounded-xl">
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Cricket Legend */}
        <section className="bg-gradient-to-r from-red-900 to-orange-900 rounded-3xl p-12 text-white shadow-2xl border border-red-700 mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <AlarmClock size={40} />
            La Légende du Cricket
          </h2>
          <p className="text-xl leading-relaxed mb-6">
            En 1947, <strong className="text-red-300">Vulcain</strong> révolutionne l'horlogerie avec le Cricket, premier réveil mécanique au poignet. Son nom provient de son son distinctif, rappelant le chant du grillon.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-red-800/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-red-200 mb-2">1955</p>
              <p className="text-gray-200">Offert au président Eisenhower</p>
            </div>
            <div className="bg-orange-800/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-orange-200 mb-2">1965</p>
              <p className="text-gray-200">Utilisé par LBJ à la Maison Blanche</p>
            </div>
            <div className="bg-amber-800/50 rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-amber-200 mb-2">2023</p>
              <p className="text-gray-200">Rééditions modernes à succès</p>
            </div>
          </div>
          <p className="text-lg text-gray-200 leading-relaxed">
            Le Cricket devient rapidement la montre préférée des diplomates et chefs d'État, symbole de ponctualité et de sophistication mécanique.
          </p>
        </section>

        {/* Timeline */}
        <section className="mb-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-700">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Histoire & Évolution
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(2, 4)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-red-400 to-orange-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">{item.maker}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Manufactures */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Manufactures de Prestige
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-red-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-red-600 dark:text-red-400 font-medium mb-1">
                  {brand.specialty}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {brand.heritage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
<div className="text-center mt-12">
  <Link href="/theorie/complications">
    <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-xl hover:shadow-2xl">
      <ArrowLeft size={24} />
      Retour aux complications
    </button>
  </Link>
</div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-slate-800 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">© 2025 Réveil Mécanique – Référence mondiale en complications sonores utilitaires</p>
      </footer>
    </div>
  );
};

export default ReveilMecaniquePage;
