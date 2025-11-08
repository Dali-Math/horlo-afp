
"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Sun, ChevronRight, ArrowLeft, Clock, Compass, TrendingUp } from 'lucide-react';

const EquationTempsPage = () => {
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
      title: 'Différence temps solaire/moyen',
      desc: 'Affichage précis de l\'écart entre le temps solaire vrai et le temps civil (-16 à +14 minutes)',
      icon: Sun
    },
    {
      title: 'Came annuelle sculptée',
      desc: 'Programme mécanique sur 365 jours reproduisant la courbe de l\'analemme solaire',
      icon: Compass
    },
    {
      title: 'Synchronisation calendaire',
      desc: 'Intégration avec le calendrier annuel pour une lecture contextuelle du temps',
      icon: Clock
    },
    {
      title: 'Indicateurs astronomiques',
      desc: 'Position du Soleil, solstices, équinoxes et parfois signes du zodiaque',
      icon: TrendingUp
    }
  ];

  const timeline = [
    { year: '1660', event: 'Découverte mathématique de l\'équation du temps', maker: 'Christiaan Huygens' },
    { year: '1780', event: 'Premières applications en horlogerie', maker: 'Abraham-Louis Breguet' },
    { year: '1850', event: 'Miniaturisation pour montres de poche', maker: 'Ateliers genevois' },
    { year: '1990', event: 'Renaissance dans l\'horlogerie moderne', maker: 'Vacheron Constantin' },
    { year: '2010+', event: 'Combinaison avec calendriers perpétuels', maker: 'Manufactures contemporaines' }
  ];

  const brands = [
    { name: 'Vacheron Constantin', specialty: 'Maître absolu', heritage: 'Les Cabinotiers' },
    { name: 'Audemars Piguet', specialty: 'Complications astronomiques', heritage: 'Jules Audemars' },
    { name: 'Breguet', specialty: 'Héritage du fondateur', heritage: 'Tradition No. 7067' },
    { name: 'Patek Philippe', specialty: 'Haute complication', heritage: 'Sky Moon Tourbillon' },
    { name: 'Blancpain', specialty: 'Le Brassus innovations', heritage: 'Villeret collection' }
  ];

  const analemmaPoints = [
    { month: 'Janvier', offset: '-4 min', position: 'top-12 left-1/2' },
    { month: 'Avril', offset: '+4 min', position: 'top-1/3 right-12' },
    { month: 'Juillet', offset: '-6 min', position: 'bottom-1/3 right-12' },
    { month: 'Novembre', offset: '+16 min', position: 'bottom-12 left-1/3' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-orange-950">
      
      {/* Hero avec parallax */}
      <header 
        className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-yellow-600/20"></div>
        
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl mb-8 border border-amber-200 dark:border-amber-800 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <Sun className="text-amber-600" size={24} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Complication Astronomique Rare
            </span>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Équation du Temps
          </h1>
          
          <p className={`text-xl md:text-2xl text-amber-600 dark:text-amber-400 mb-8 font-light italic transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Equation of Time
          </p>

          <p className={`text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Le dialogue entre temps civil et temps solaire
          </p>
        </div>
      </header>

      {/* Introduction */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 p-12 mb-16">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            L'<strong className="text-amber-600 dark:text-amber-400">équation du temps</strong> est une complication horlogère rare et fascinante, conçue pour indiquer la différence entre le temps solaire vrai – mesuré par le mouvement réel du Soleil – et le temps moyen utilisé par nos horloges modernes. Cette différence peut atteindre jusqu'à ±16 minutes au cours de l'année.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Cette complication incarne le lien entre l'astronomie et l'horlogerie, révélant les irrégularités naturelles du mouvement terrestre transformées en mécanisme d'une précision absolue.
          </p>
        </section>

        {/* Stats principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Invention</p>
            <p className="text-5xl font-bold mb-2">1660</p>
            <p className="text-lg opacity-90">Christiaan Huygens</p>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Prix estimé</p>
            <p className="text-3xl font-bold mb-2">150'000 – 1'000'000 CHF</p>
            <p className="text-lg opacity-90">≈ 550 composants</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600 to-amber-600 rounded-2xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all">
            <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Variation max</p>
            <p className="text-5xl font-bold mb-2">±16</p>
            <p className="text-lg opacity-90">Minutes/an</p>
          </div>
        </div>

        {/* Analemme visuel */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-12 mb-16 text-white shadow-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full"></div>
            <h2 className="text-4xl font-bold">L'Analemme Solaire</h2>
          </div>
          
          <p className="text-xl text-gray-100 leading-relaxed mb-8">
            La courbe en forme de <strong className="text-amber-400">8 allongé</strong> que dessine le Soleil dans le ciel à la même heure chaque jour de l'année.
          </p>

          <div className="relative bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl h-96 border border-amber-700/50 overflow-hidden">
            {/* Représentation simplifiée de l'analemme */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 300" className="w-64 h-96 opacity-60">
                <path
                  d="M 100 50 Q 120 100 110 150 Q 100 200 90 250 Q 80 200 90 150 Q 80 100 100 50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-amber-400"
                />
              </svg>
            </div>
            
            {analemmaPoints.map((point, index) => (
              <div key={index} className={`absolute ${point.position} transform -translate-x-1/2 -translate-y-1/2`}>
                <div className="bg-amber-500 rounded-full w-3 h-3 animate-pulse"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <p className="text-xs font-bold text-amber-300">{point.month}</p>
                  <p className="text-xs text-gray-300">{point.offset}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mécanisme */}
        <section className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-3xl p-12 mb-16 shadow-xl border border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-12 bg-gradient-to-b from-amber-400 to-orange-600 rounded-full"></div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Mécanisme & Fonctionnement</h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              L'équation du temps repose sur un <strong className="text-amber-600">mécanisme différentiel complexe</strong> qui compare deux rotations distinctes : celle du Soleil apparent dans sa course elliptique et celle d'un temps moyen fictif parfaitement régulier.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              La lecture se fait par une aiguille spécifique ou un affichage en cadran secondaire, souvent accompagné d'une échelle graduée. Certaines montres combinent cette complication avec un calendrier annuel ou un indicateur zodiacal, créant ainsi un véritable observatoire au poignet.
            </p>

            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800 mt-8">
              <h3 className="text-xl font-semibold mb-4 text-amber-900 dark:text-amber-300">Architecture mécanique</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Came de l'équation</strong> : Profil sculpté représentant 365 jours de variation</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Palpeur à ressort</strong> : Lit le profil de la came avec précision micrométrique</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Différentiel</strong> : Compare temps moyen et temps solaire en temps réel</span>
                </li>
                <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <ChevronRight className="text-amber-600 flex-shrink-0 mt-1" size={20} />
                  <span><strong>Afficheur rétrograde</strong> : Indication visuelle sur échelle ±16 minutes</span>
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
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
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
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {item.year.slice(0, 2)}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-amber-400 to-orange-600 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{item.year}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{item.event}</p>
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">{item.maker}</p>
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
                className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-6 shadow-xl border-2 border-transparent hover:border-amber-500 transition-all hover:scale-105"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {brand.name}
                </h3>
                <p className="text-amber-600 dark:text-amber-400 font-medium mb-1">
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
        <p className="text-sm">© 2025 Équation du Temps – Référence mondiale en horlogerie astronomique</p>
      </footer>
    </div>
  );
};

export default EquationTempsPage;
