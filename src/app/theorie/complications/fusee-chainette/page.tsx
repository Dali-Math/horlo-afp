"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Settings, ChevronRight, ArrowLeft, Gauge, Zap, Link as LinkIcon, Cog } from 'lucide-react';

const FuseeChainettePage = () => {
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
      title: 'Force constante',
      desc: 'Compensation automatique de la baisse du couple du ressort pour une précision chronométrique absolue',
      icon: Gauge
    },
    {
      title: 'Cône spiralé',
      desc: 'Fusée conique dont le profil est calculé mathématiquement pour équilibrer la force motrice',
      icon: Settings
    },
    {
      title: 'Chaînette d\'acier',
      desc: 'Chaîne ultra-fine (100+ maillons) reliant le barillet à la fusée avec une précision micrométrique',
      icon: LinkIcon
    },
    {
      title: 'Stabilité chronométrique',
      desc: 'Élimination des variations d\'amplitude du balancier pour une marche parfaitement régulière',
      icon: Zap
    }
  ];

  const timeline = [
    { year: '1525', event: 'Invention du système fusée-chaîne', maker: 'Horlogers allemands' },
    { year: '1675', event: 'Adoption dans les chronomètres de marine', maker: 'John Harrison' },
    { year: '1800', event: 'Miniaturisation pour montres de poche', maker: 'Abraham-Louis Breguet' },
    { year: '1980', event: 'Abandon progressif (complexité)', maker: 'Industrie horlogère' },
    { year: '2004', event: 'Renaissance en haute horlogerie', maker: 'A. Lange & Söhne' }
  ];

  const brands = [
    { name: 'Breguet', specialty: 'Pionnier historique', heritage: 'Tradition 7047PT' },
    { name: 'Zenith', specialty: 'Academy Georges Favre-Jacot', heritage: 'Fusée-chaîne moderne' },
    { name: 'Romain Gauthier', specialty: 'Maître indépendant', heritage: 'Logical One' },
    { name: 'F.P. Journe', specialty: 'Chronomètre à Résonance', heritage: 'Haute précision' },
    { name: 'A. Lange & Söhne', specialty: 'Renaissance du système', heritage: 'Richard Lange' }
  ];

  const mechanismSteps = [
    { phase: 'Ressort tendu', force: 'Maximum', position: 'Petit diamètre fusée', effect: 'Rapport démultiplié' },
    { phase: 'Mi-réserve', force: 'Moyenne', position: 'Diamètre moyen fusée', effect: 'Rapport équilibré' },
    { phase: 'Ressort détendu', force: 'Minimum', position: 'Grand diamètre fusée', effect: 'Rapport multiplié' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50 dark:from-slate-950 dark:via-slate-900 dark:to-stone-950">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-stone-600/20 via-gray-600/20 to-slate-600/20"></div>
        
        <div className="absolute top-20 left-10 w-96 h-96 bg-stone-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gray-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-stone-200 dark:border-stone-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Settings className="text-stone-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Mécanisme Antique Ressuscité
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Fusée & Chaînette
          </h1>
          
          <p className={`text-xl md:text-2xl text-stone-600 dark:text-stone-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Fusee & Chain
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Le génie mécanique de la Renaissance au service de la précision absolue
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Le système de <strong className="text-stone-600 dark:text-stone-400">Fusée et Chaînette</strong> est un mécanisme antique conçu pour garantir une force constante transmise au balancier. Utilisé dès le XVIe siècle dans les montres de marine et les chronomètres de précision, il revient aujourd'hui dans certaines réalisations de haute horlogerie pour son raffinement mécanique et sa stabilité chronométrique.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette complication incarne le summum de la complexité mécanique : transformer une force variable en une transmission parfaitement constante, défiant ainsi les lois naturelles de la physique horlogère.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-stone-600 to-gray-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1525</p>
            <p className="text-lg opacity-90">Horlogers allemands</p>
          </div>
          <div className="bg-gradient-to-br from-gray-600 to-slate-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-3xl font-bold mb-2">150'000 – 1'500'000 CHF</p>
            <p className="text-lg opacity-90">≈ 900 composants</p>
          </div>
          <div className="bg-gradient-to-br from-slate-600 to-stone-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Chaînette</p>
            <p className="text-5xl font-bold mb-2">100+</p>
            <p className="text-lg opacity-90">Maillons ultra-fins</p>
          </div>
        </div>

        {/* Principe de compensation */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-stone-400 to-gray-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">Principe de Compensation</h2>
          </div>
          
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            La fusée compense la <strong className="text-stone-400">perte progressive de couple</strong> du ressort barillet grâce à un profil conique mathématiquement calculé.
          </p>

          <div className="space-y-4">
            {mechanismSteps.map((step, index) => (
              <div key={index} className="bg-stone-900/30 rounded-2xl p-6 border border-stone-700/50">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div className="md:col-span-1">
                    <p className="text-lg font-bold text-stone-300">{step.phase}</p>
                  </div>
                  <div className="md:col-span-3 space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 w-32">Force ressort:</span>
                      <span className="text-white font-medium">{step.force}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 w-32">Position chaîne:</span>
                      <span className="text-white font-medium">{step.position}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 w-32">Effet:</span>
                      <span className="text-stone-300 font-medium">{step.effect}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-900/20 rounded-xl p-6 border border-gray-700/50">
            <p className="text-sm text-gray-300 leading-relaxed">
              <strong className="text-gray-400">Résultat :</strong> Quelle que soit la réserve de marche, la force transmise au balancier reste constante, garantissant une amplitude et donc une précision chronométrique parfaitement stable sur toute la durée de fonctionnement.
            </p>
          </div>
        </section>

        {/* Mécanisme */}
        <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 mb-16 shadow-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-stone-400 to-gray-600 rounded-full"></div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              La fusée est un <strong className="text-stone-600">cône spiralé</strong> relié au barillet par une chaînette ultra-fine. Au fur et à mesure que le ressort du barillet se détend, la chaînette s'enroule sur la fusée, modifiant le rapport de transmission et compensant la baisse du couple.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Ce système assure ainsi une tension constante, améliorant drastiquement la précision du balancier. Jadis abandonnée pour sa complexité extrême de fabrication, la fusée et chaînette a été réintroduite par certaines manufactures modernes, qui l'utilisent comme gage d'excellence et de savoir-faire artisanal.
            </p>

            <div className="bg-stone-50 dark:bg-stone-900/20 rounded-xl p-6 border border-stone-200 dark:border-stone-800 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-stone-900 dark:text-stone-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-stone-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Cône spiralé</strong> : Profil mathématique compensant la courbe de détente du ressort</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-stone-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Chaînette d'acier</strong> : 100 à 150 maillons (0.1mm chacun) façonnés individuellement</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-stone-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Barillet moteur</strong> : Ressort puissant logé dans un tambour de grand diamètre</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-stone-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Mécanisme d'inversion</strong> : Système permettant de remonter sans détacher la chaîne</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-stone-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Indicateur de réserve</strong> : Affichage visuel de la position de la chaîne</span>
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
                    <div className="bg-gradient-to-br from-stone-500 to-gray-600 p-3 rounded-xl">
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

        {/* Complexité de fabrication */}
        <section className="bg-gradient-to-r from-stone-900 to-gray-900 rounded-3xl p-12 text-white shadow-2xl border border-stone-700 mb-16">
          <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
            <Cog size={40} />
            Complexité de Fabrication
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <p className="text-5xl font-bold text-stone-300 mb-2">500+</p>
              <p className="text-gray-200">Heures d'usinage manuel</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-gray-300 mb-2">0.01</p>
              <p className="text-gray-200">mm de tolérance</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-slate-300 mb-2">5</p>
              <p className="text-gray-200">Années de maîtrise</p>
            </div>
          </div>
          <p className="text-lg text-gray-200 leading-relaxed">
            La fabrication d'une fusée-chaînette demande des centaines d'heures de travail artisanal. Chaque maillon de la chaîne doit être façonné individuellement, le profil de la fusée calculé mathématiquement et ajusté empiriquement. C'est l'une des complications les plus difficiles à réaliser en horlogerie.
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
                  <div className="w-16 h-16 bg-gradient-to-br from-stone-500 to-gray-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(0, 2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-stone-400 to-gray-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">{item.maker}</p>
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
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-stone-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-stone-600 dark:text-stone-400 font-medium mb-1">
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
        <p className="text-sm">© 2025 Fusée & Chaînette – Référence mondiale en force constante</p>
      </footer>
    </div>
  );
};

export default FuseeChainettePage;
