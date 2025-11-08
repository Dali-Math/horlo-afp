"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Music, ChevronRight, ArrowLeft, Bell, Volume2, Waves, Zap } from 'lucide-react';

const SonneriePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Sonnerie des heures',
      desc: 'Marteau frappant le timbre basse pour chaque heure écoulée avec son grave et profond',
      icon: Bell
    },
    {
      title: 'Sonnerie des quarts',
      desc: 'Double frappe (ding-dong) sur deux timbres pour chaque quart d\'heure',
      icon: Music
    },
    {
      title: 'Sonnerie des minutes',
      desc: 'Frappe sur timbre aigu pour chaque minute après le dernier quart',
      icon: Volume2
    },
    {
      title: 'Régulateur centrifuge',
      desc: 'Contrôle la vitesse de frappe pour une cadence musicale régulière et harmonieuse',
      icon: Zap
    },
    {
      title: 'Accord des timbres',
      desc: 'Ajustement manuel de chaque timbre pour obtenir la pureté sonore parfaite',
      icon: Waves
    }
  ];

  const timeline = [
    { year: '1676', event: 'Première sonnerie à heures pour horloges', maker: 'Edward Barlow' },
    { year: '1750', event: 'Invention du minute repeater moderne', maker: 'Abraham-Louis Breguet' },
    { year: '1892', event: 'Premier minute repeater bracelet', maker: 'Omega' },
    { year: '1989', event: 'Calibre 89 avec grande sonnerie', maker: 'Patek Philippe' },
    { year: '2000+', event: 'Renaissance des sonneries cathédrales', maker: 'Manufactures contemporaines' }
  ];

  const brands = [
    { name: 'Patek Philippe', specialty: 'Maître incontesté', heritage: 'Grandmaster Chime' },
    { name: 'Vacheron Constantin', specialty: 'Sonneries cathédrales', heritage: 'Les Cabinotiers' },
    { name: 'Audemars Piguet', specialty: 'Sonneries ultra-plates', heritage: 'Royal Oak Concept' },
    { name: 'Jaeger-LeCoultre', specialty: 'Sonneries innovantes', heritage: 'Reverso Répétition' },
    { name: 'Breguet', specialty: 'Héritage du fondateur', heritage: 'Tradition 7087' }
  ];

  const soundSequence = [
    { time: '10:37', sequence: ['10 coups graves (heures)', '2 ding-dong (quarts)', '7 coups aigus (minutes)'] },
    { time: '3:15', sequence: ['3 coups graves (heures)', '1 ding-dong (1 quart)', 'Pas de minutes'] },
    { time: '12:00', sequence: ['12 coups graves (heures)', 'Pas de quarts', 'Pas de minutes'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-900">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-fuchsia-600/20"></div>
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-purple-200 dark:border-purple-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Music className="text-purple-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Complication Sonore d'Exception
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Sonnerie
          </h1>
          
          <p className={`text-xl md:text-2xl text-purple-600 dark:text-purple-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Minute Repeater
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            La symphonie mécanique du temps
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            La <strong className="text-purple-600 dark:text-purple-400">sonnerie</strong>, ou <em>minute repeater</em>, est une complication fascinante capable de sonner mécaniquement les heures, quarts et minutes à la demande. Véritable symphonie horlogère, elle fait appel à un système de marteaux frappant des timbres accordés pour produire un son pur et harmonieux.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette complication représente l'apogée de la maîtrise horlogère : transformer l'énergie mécanique en musique du temps, avec une précision absolue et une qualité sonore comparable à un instrument miniature.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1750</p>
            <p className="text-lg opacity-90">Abraham-Louis Breguet</p>
          </div>
          <div className="bg-gradient-to-br from-fuchsia-600 to-pink-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-3xl font-bold mb-2">300'000 – 3'000'000 CHF</p>
            <p className="text-lg opacity-90">≈ 800 composants</p>
          </div>
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Développement</p>
            <p className="text-5xl font-bold mb-2">5000+</p>
            <p className="text-lg opacity-90">Heures/modèle</p>
          </div>
        </div>

        {/* Démonstration sonore */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">Séquence Sonore</h2>
          </div>
          
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            Chaque minute repeater suit une <strong className="text-purple-400">séquence sonore codifiée</strong> permettant d'identifier l'heure exacte uniquement par l'écoute.
          </p>

          <div className="space-y-4">
            {soundSequence.map((example, index) => (
              <div key={index} className="bg-purple-900/30 rounded-2xl p-6 border border-purple-700/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                    {example.time}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-purple-300">Séquence de sonnerie</p>
                  </div>
                </div>
                <ul className="space-y-2 ml-20">
                  {example.sequence.map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-200">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-pink-900/20 rounded-xl p-6 border border-pink-700/50">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-pink-400">Note :</strong> Les montres les plus sophistiquées peuvent sonner jusqu'à 36 coups (12h45) en une seule activation. Les sonneries cathédrales utilisent jusqu'à 3 timbres pour une richesse sonore exceptionnelle.
            </p>
          </div>
        </section>

        {/* Mécanisme */}
        <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 mb-16 shadow-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-purple-400 to-pink-600 rounded-full"></div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Lorsqu'on actionne le curseur ou le bouton de répétition, une séquence mécanique complexe libère l'énergie stockée dans un <strong className="text-purple-600">ressort barillet spécifique</strong>. Cette énergie alimente les marteaux, qui frappent les timbres avec une précision chronométrique.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Les marteaux frappent selon un ordre précis : d'abord les heures (sons graves), puis les quarts (sons doubles), et enfin les minutes (sons aigus). L'accord acoustique des timbres, souvent réalisé à la main, confère à chaque montre son caractère sonore unique, comparable à un instrument de musique miniature.
            </p>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-900 dark:text-purple-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Ressort de répétition</strong> : Stocke l'énergie libérée par le curseur d'activation</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Limaçons programmateurs</strong> : Cames en spirale définissant heures, quarts et minutes</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Régulateur centrifuge</strong> : Ailettes contrôlant la vitesse de frappe (≈4 coups/seconde)</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Timbres accordés</strong> : Lames d'acier tempéré façonnées et ajustées manuellement</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Système de sécurité</strong> : Empêche le déclenchement pendant le remontage</span>
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
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(0, 2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-purple-400 to-pink-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">{item.maker}</p>
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
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-purple-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">
                  {brand.specialty}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {brand.heritage}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section patrimoine acoustique */}
        <section className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 text-white shadow-2xl border border-purple-700 mb-16">
          <h2 className="text-4xl font-bold mb-6 text-center">Le Patrimoine Acoustique</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-purple-300 mb-2">350+</p>
              <p className="text-gray-200">Heures d'accord manuel</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-pink-300 mb-2">0.01</p>
              <p className="text-gray-200">Millimètres de précision</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-fuchsia-300 mb-2">3</p>
              <p className="text-gray-200">Années de formation maître horloger</p>
            </div>
          </div>
          <p className="text-center text-gray-200 mt-8 text-lg max-w-3xl mx-auto">
            Chaque sonnerie est unique : son timbre, sa résonance et sa musicalité sont le résultat d'un ajustement artisanal minutieux, faisant de chaque montre un instrument à part entière.
          </p>
        </section>

        {/* CTA */}
<div className="text-center">
  <Link href="/theorie/complications">
    <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-lg font-semibold">
      <ArrowLeft size={24} />
      Retour aux complications
    </button>
  </Link>
</div>
</main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-slate-800 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">© 2025 Sonnerie Minute Repeater – Référence mondiale en complications sonores</p>
      </footer>
    </div>
  );
};

export default SonneriePage;
