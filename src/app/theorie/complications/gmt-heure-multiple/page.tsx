"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Globe, ChevronRight, ArrowLeft, Plane, Clock, MapPin, Compass } from 'lucide-react';

const GMTHeureMultiplePage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Aiguille 24 heures',
      desc: 'Aiguille supplémentaire effectuant un tour complet en 24h pour le second fuseau horaire',
      icon: Clock
    },
    {
      title: 'Lunette bidirectionnelle',
      desc: 'Lunette graduée sur 24h permettant de lire instantanément un troisième fuseau',
      icon: Compass
    },
    {
      title: 'Ajustement indépendant',
      desc: 'Réglage de l\'heure locale par saut d\'1h sans perturber la précision du mouvement',
      icon: MapPin
    },
    {
      title: 'Usage aviation',
      desc: 'Outil essentiel pour pilotes permettant le suivi simultané de plusieurs zones horaires',
      icon: Plane
    }
  ];

  const timeline = [
    { year: '1955', event: 'Invention de la GMT-Master pour Pan Am', maker: 'Rolex' },
    { year: '1959', event: 'Première GMT avec date rapide', maker: 'Rolex GMT-Master' },
    { year: '1983', event: 'Introduction du réglage indépendant', maker: 'Rolex GMT-Master II' },
    { year: '2005', event: 'GMT Worldtime avec 24 fuseaux', maker: 'Patek Philippe' },
    { year: '2020+', event: 'GMT nouvelle génération avec affichage digital', maker: 'Manufactures modernes' }
  ];

  const brands = [
    { name: 'Rolex', specialty: 'Inventeur et pionnier', heritage: 'GMT-Master depuis 1955' },
    { name: 'Omega', specialty: 'GMT Seamaster Pro', heritage: 'Depuis 1960' },
    { name: 'Breitling', specialty: 'Aviation instruments', heritage: 'Navitimer GMT' },
    { name: 'Patek Philippe', specialty: 'Worldtime complications', heritage: 'Haute horlogerie' },
    { name: 'Grand Seiko', specialty: 'GMT Spring Drive', heritage: 'Excellence japonaise' }
  ];

  const timezones = [
    { city: 'New York', offset: '-5h', color: 'bg-blue-500' },
    { city: 'Londres', offset: '+0h', color: 'bg-green-500' },
    { city: 'Paris', offset: '+1h', color: 'bg-purple-500' },
    { city: 'Dubai', offset: '+4h', color: 'bg-amber-500' },
    { city: 'Tokyo', offset: '+9h', color: 'bg-red-500' },
    { city: 'Sydney', offset: '+11h', color: 'bg-teal-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-indigo-600/20"></div>
        
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-cyan-200 dark:border-cyan-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Globe className="text-cyan-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Complication Voyageur
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            GMT / Heure Multiple
          </h1>
          
          <p className={`text-xl md:text-2xl text-cyan-600 dark:text-cyan-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Dual Time / Greenwich Mean Time
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Le monde au poignet : maîtriser le temps sur tous les continents
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            La complication <strong className="text-cyan-600 dark:text-cyan-400">GMT</strong> (Greenwich Mean Time), ou <em>Heure Multiple</em>, permet d'afficher deux ou trois fuseaux horaires simultanément. Créée à l'origine pour les pilotes et les grands voyageurs, elle s'est imposée comme une fonction incontournable des montres contemporaines.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette complication incarne l'esprit du voyage moderne : rester connecté avec le monde entier tout en gardant un œil sur son fuseau d'origine. Un outil devenu indispensable à l'ère de la mondialisation.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1955</p>
            <p className="text-lg opacity-90">Rolex GMT-Master</p>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-4xl font-bold mb-2">8'000 – 50'000 CHF</p>
            <p className="text-lg opacity-90">≈ 200 composants</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Fuseaux max</p>
            <p className="text-5xl font-bold mb-2">3</p>
            <p className="text-lg opacity-90">Simultanés</p>
          </div>
        </div>

        {/* Carte des fuseaux */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">Fuseaux Horaires Mondiaux</h2>
          </div>
          
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            Une montre GMT permet de suivre <strong className="text-cyan-400">plusieurs fuseaux simultanément</strong>, idéal pour les voyageurs fréquents et professionnels internationaux.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {timezones.map((zone, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer hover:scale-105"
                onClick={() => setSelectedTimezone(zone.city)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 ${zone.color} rounded-full`}></div>
                  <div className="flex-1">
                    <p className="text-lg font-bold text-white">{zone.city}</p>
                    <p className="text-sm text-gray-400">UTC {zone.offset}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-cyan-900/30 rounded-xl p-6 border border-cyan-700/50">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-cyan-400">Note :</strong> Les montres Worldtime peuvent afficher jusqu'à 24 fuseaux horaires simultanément via des disques rotatifs, tandis que les GMT classiques se limitent à 2-3 zones pour plus de lisibilité.
            </p>
          </div>
        </section>

        {/* Mécanisme */}
        <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 mb-16 shadow-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Une montre GMT possède une <strong className="text-cyan-600">aiguille supplémentaire</strong> effectuant un tour complet du cadran en 24 heures. Celle-ci indique un second fuseau horaire sur une lunette ou un cadran gradué.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Les versions plus avancées (GMT-Master II, par exemple) permettent d'ajuster indépendamment l'aiguille des heures locales par sauts d'une heure, sans perturber le mouvement ni arrêter la trotteuse. La lunette bidirectionnelle permet quant à elle de lire un troisième fuseau horaire.
            </p>

            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6 border border-cyan-200 dark:border-cyan-800 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-cyan-900 dark:text-cyan-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Module GMT</strong> : Rouage supplémentaire démultipliant à 24h au lieu de 12h</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Mécanisme de saut</strong> : Permet l'ajustement par heure sans dérégler le mouvement</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Lunette rotative</strong> : Graduée sur 24h pour la lecture d'un troisième fuseau</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-cyan-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Affichage jour/nuit</strong> : Indique visuellement si l'heure GMT est de jour ou de nuit</span>
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
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl">
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

        {/* Histoire Pan Am */}
        <section className="bg-gradient-to-r from-cyan-900 to-blue-900 rounded-3xl p-12 text-white shadow-2xl border border-cyan-700 mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <Plane size={40} />
            L'Histoire Pan Am
          </h2>
          <p className="text-xl leading-relaxed mb-6">
            En 1954, la compagnie aérienne <strong className="text-cyan-300">Pan American World Airways</strong> demande à Rolex de développer une montre permettant à ses pilotes de suivre simultanément l'heure de leur position et celle de leur base à New York.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed">
            Le résultat : la <strong>GMT-Master</strong>, reconnaissable à sa lunette bicolore rouge et bleue (surnommée "Pepsi"), devient instantanément l'outil officiel des pilotes long-courriers. Cette montre révolutionnaire posera les bases de toutes les complications GMT modernes.
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
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(2, 4)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-cyan-400 to-blue-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{item.maker}</p>
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
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-cyan-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-1">
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
        <p className="text-sm">© 2025 GMT / Heure Multiple – Référence mondiale pour voyageurs</p>
      </footer>
    </div>
  );
};

export default GMTHeureMultiplePage;
