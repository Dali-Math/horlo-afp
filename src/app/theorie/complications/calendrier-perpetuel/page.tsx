"use client";


import React, { useState, useEffect } from 'react';
import { Calendar, ChevronRight, ArrowLeft, Clock, Moon, Sparkles } from 'lucide-react';

const CalendrierPerpetuelPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Indication automatique du jour',
      desc: 'Affichage perpétuel du jour de la semaine avec passage instantané à minuit',
      icon: Clock
    },
    {
      title: 'Gestion des mois courts',
      desc: 'Reconnaissance automatique des mois de 28, 30 et 31 jours',
      icon: Calendar
    },
    {
      title: 'Années bissextiles',
      desc: 'Gestion automatique jusqu\'en 2100 avec came de 48 mois',
      icon: Sparkles
    },
    {
      title: 'Phase de lune précise',
      desc: 'Indication lunaire haute précision avec écart de 1 jour en 122 ans',
      icon: Moon
    }
  ];

  const timeline = [
    { year: '1762', event: 'Premiers travaux sur les calendriers mécaniques', maker: 'Horlogers genevois' },
    { year: '1884', event: 'Premier calendrier perpétuel de poche', maker: 'Patek Philippe' },
    { year: '1925', event: 'Premier calendrier perpétuel bracelet', maker: 'Patek Philippe' },
    { year: '1985', event: 'Calendrier perpétuel ultra-plat révolutionnaire', maker: 'Audemars Piguet' },
    { year: '2000+', event: 'Nouvelle génération avec affichage digital', maker: 'Manufactures modernes' }
  ];

  const brands = [
    { name: 'Patek Philippe', specialty: 'Pionnier absolu', heritage: 'Depuis 1884' },
    { name: 'Vacheron Constantin', specialty: 'Excellence traditionnelle', heritage: 'Depuis 1755' },
    { name: 'Audemars Piguet', specialty: 'Innovation technique', heritage: 'Depuis 1875' },
    { name: 'IWC Schaffhausen', specialty: 'Ingénierie de précision', heritage: 'Depuis 1868' },
    { name: 'A. Lange & Söhne', specialty: 'Perfectionnisme germanique', heritage: 'Depuis 1845' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20"></div>
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-blue-200 dark:border-blue-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Calendar className="text-blue-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Grande Complication Horlogère
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Calendrier Perpétuel
          </h1>
          
          <p className={`text-xl md:text-2xl text-blue-600 dark:text-blue-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Perpetual Calendar
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            La mémoire mécanique du temps
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Le <strong className="text-blue-600 dark:text-blue-400">calendrier perpétuel</strong> représente l'une des complications les plus sophistiquées de l'horlogerie suisse. Ce chef-d'œuvre mécanique ajuste automatiquement la date selon la longueur des mois et tient compte des années bissextiles, sans intervention humaine jusqu'en 2100.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette prouesse technique incarne le génie horloger helvétique : transformer le temps astronomique en une mécanique d'une précision absolue, logée dans quelques centimètres cubes.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1884</p>
            <p className="text-lg opacity-90">Patek Philippe</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-4xl font-bold mb-2">50'000 – 500'000 CHF</p>
            <p className="text-lg opacity-90">≈ 600 composants</p>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Précision</p>
            <p className="text-5xl font-bold mb-2">2100</p>
            <p className="text-lg opacity-90">Sans ajustement</p>
          </div>
        </div>

        {/* Mécanisme */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-100 leading-relaxed">
              Ce mécanisme extraordinaire repose sur un <strong className="text-blue-400">train d'engrenages complexe</strong> lié à la roue des heures et à un programme mécanique de 48 mois.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Il détermine avec une précision absolue la durée exacte de chaque mois (28, 30 ou 31 jours) et ajoute automatiquement un jour supplémentaire tous les quatre ans pour les années bissextiles. La came de programmation, véritable cerveau mécanique, encode 1461 jours (4 années) sur sa périphérie.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Roue de 48 mois</strong> : Programme les longueurs de mois sur 4 ans</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Came des mois</strong> : Détermine le nombre de jours (28/30/31)</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Levier de saut</strong> : Exécute le changement instantané à minuit</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Étoile des jours</strong> : Commande l'affichage du jour de la semaine</span>
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
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
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

        {/* Timeline */}
        <section className="mb-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-gray-200 dark:border-slate-700">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Histoire & Évolution
          </h2>
          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(0, 2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-400 to-indigo-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">{item.maker}</p>
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
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-blue-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">
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
        <div className="text-center">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg font-semibold">
            <ArrowLeft size={24} />
            Retour aux complications
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-slate-800 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">© 2025 Calendrier Perpétuel – Référence mondiale en horlogerie suisse</p>
      </footer>
    </div>
  );
};

export default CalendrierPerpetuelPage;
