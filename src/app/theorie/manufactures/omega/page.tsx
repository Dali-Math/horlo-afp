'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Rocket, Waves, Award, Zap } from 'lucide-react';

export default function OmegaPage() {
  const [selectedMission, setSelectedMission] = useState<string>('');

  const missions = [
    {
      id: 'apollo11',
      year: '1969',
      title: 'Apollo 11 : Premier Pas sur la Lune',
      description: 'Neil Armstrong et Buzz Aldrin posent le pied sur la Lune avec la Speedmaster au poignet.',
      details: 'Le 21 juillet 1969, Buzz Aldrin devient le deuxième homme à marcher sur la Lune, portant sa Speedmaster Professional par-dessus sa combinaison spatiale. La montre fonctionne parfaitement malgré les conditions extrêmes : -156°C à +121°C, vide spatial, radiations. Neil Armstrong laisse la sienne dans le module lunaire comme chronographe de secours.',
      icon: '🌙',
      color: 'blue' as const
    },
    {
      id: 'apollo13',
      year: '1970',
      title: 'Apollo 13 : La Speedmaster Sauve l\'Équipage',
      description: 'Après une explosion, la Speedmaster devient le seul instrument de chronométrage fiable.',
      details: 'Le 13 avril 1970, une explosion détruit les systèmes électroniques d\'Apollo 13. L\'équipage utilise la Speedmaster de Jack Swigert pour chronométrer avec précision absolue l\'allumage de 14 secondes du moteur nécessaire pour la correction de trajectoire de retour sur Terre. Sans cette précision, l\'équipage aurait dérivé dans l\'espace. NASA décerne à Omega le "Snoopy Award".',
      icon: '🚨',
      color: 'red' as const
    },
    {
      id: 'gemini',
      year: '1965',
      title: 'Programme Gemini : Première Sortie Spatiale',
      description: 'Ed White effectue la première sortie spatiale américaine avec une Speedmaster.',
      details: 'Le 3 juin 1965, Ed White réalise la première sortie extravéhiculaire (EVA) américaine lors de Gemini 4. Sa Speedmaster ST 105.003 résiste au vide spatial, aux écarts thermiques extrêmes et aux radiations pendant 23 minutes. Démonstration éclatante de robustesse.',
      icon: '👨‍🚀',
      color: 'purple' as const
    },
    {
      id: 'shuttle',
      year: '1981-2011',
      title: 'Programme Navette Spatiale',
      description: 'La Speedmaster accompagne toutes les missions de la Navette spatiale américaine.',
      details: '135 missions de la navette spatiale entre 1981 et 2011. La Speedmaster Professional reste l\'équipement standard de tous les astronautes NASA. Modifications spéciales : bracelet Velcro renforcé, boîtier renforcé pour les vibrations extrêmes au décollage.',
      icon: '🚀',
      color: 'orange' as const
    },
  ];

  const bondFilms = [
    { year: '1995', title: 'GoldenEye', watch: 'Seamaster 300M Quartz', actor: 'Pierce Brosnan' },
    { year: '1997', title: 'Tomorrow Never Dies', watch: 'Seamaster 300M Auto', actor: 'Pierce Brosnan' },
    { year: '2006', title: 'Casino Royale', watch: 'Seamaster Planet Ocean', actor: 'Daniel Craig' },
    { year: '2012', title: 'Skyfall', watch: 'Seamaster Aqua Terra', actor: 'Daniel Craig' },
    { year: '2015', title: 'Spectre', watch: 'Seamaster 300', actor: 'Daniel Craig' },
    { year: '2021', title: 'No Time to Die', watch: 'Seamaster Diver 300M 007', actor: 'Daniel Craig' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link 
            href="/theorie/manufactures" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Manufactures
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="mb-6">
            <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium px-4 py-1.5 rounded-full">
              Manufacture de Bienne
            </span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <Rocket className="w-16 h-16 text-red-600 dark:text-red-400" />
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-3">
                Omega
              </h1>
              <p className="text-xl text-red-600 dark:text-red-400 font-semibold italic">
                "First Watch on the Moon"
              </p>
            </div>
          </div>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl mb-8">
            Fondée en 1848 à La Chaux-de-Fonds par Louis Brandt, Omega est devenue synonyme de précision chronométrique 
            absolue. De la conquête spatiale avec la Speedmaster Moonwatch aux profondeurs océaniques avec la Seamaster, 
            Omega a marqué l'histoire de l'exploration humaine.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-red-700 dark:text-red-300 mb-1">1848</div>
              <div className="text-xs font-medium text-red-600 dark:text-red-400">Année de fondation</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">1969</div>
              <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Moonwatch Apollo 11</div>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-green-700 dark:text-green-300 mb-1">30+</div>
              <div className="text-xs font-medium text-green-600 dark:text-green-400">Jeux Olympiques</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-4">
              <div className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-1">300m</div>
              <div className="text-xs font-medium text-purple-600 dark:text-purple-400">Étanchéité Seamaster</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* SECTION 1: HISTOIRE */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">
            Louis Brandt : Les Débuts (1848)
          </h2>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-6 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En <strong className="text-slate-900 dark:text-slate-100">1848</strong>, Louis Brandt, jeune horloger de 23 ans, 
              ouvre un modeste atelier d'assemblage de montres à La Chaux-de-Fonds, en Suisse. Il assemble des montres de 
              poche à partir de composants fournis par des artisans locaux.
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Après la mort de Louis en 1879, ses fils <strong className="text-slate-900 dark:text-slate-100">Louis-Paul</strong> et 
              <strong className="text-slate-900 dark:text-slate-100"> César Brandt</strong> révolutionnent l'entreprise en la 
              transférant à Bienne (1880) et en adoptant les méthodes de production de masse.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-l-4 border-blue-600 dark:border-blue-400 p-6 rounded-r-lg">
            <div className="flex items-start">
              <span className="text-4xl mr-4">Ω</span>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  1894 : Naissance du Nom "Omega"
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  En 1894, les frères Brandt lancent le <strong className="text-slate-900 dark:text-slate-100">calibre Omega</strong>, 
                  un mouvement révolutionnaire par sa conception novatrice, sa précision et sa simplicité d'entretien. Le succès 
                  est tel qu'en 1903, la société prend officiellement le nom d'<strong className="text-slate-900 dark:text-slate-100">Omega Watch Co.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: SPEEDMASTER MOONWATCH INTERACTIVE */}
        <section className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Rocket className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Speedmaster Moonwatch : La Conquête Spatiale
            </h2>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-950 dark:to-gray-800 text-white rounded-2xl p-8 mb-6">
            <h3 className="text-3xl font-bold mb-4 text-center">21 Juillet 1969 : Apollo 11</h3>
            <p className="text-xl text-center mb-4 italic text-gray-200">
              "One small step for man, one giant leap for mankind"
            </p>
            <p className="text-gray-200 leading-relaxed text-center max-w-3xl mx-auto">
              Neil Armstrong et Buzz Aldrin posent le pied sur la Lune. Au poignet d'Aldrin : l'<strong className="text-white">Omega Speedmaster</strong>, 
              première montre portée sur la Lune. Un moment historique pour l'humanité et pour l'horlogerie.
            </p>
          </div>

          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            Cliquez sur chaque mission pour découvrir l'histoire spatiale de la Speedmaster :
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {missions.map((mission) => {
              const colors = {
                blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
                red: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
                purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
                orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
              };

              return (
                <div key={mission.id}>
                  <div
                    onClick={() => setSelectedMission(selectedMission === mission.id ? '' : mission.id)}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedMission === mission.id
                        ? 'border-red-600 dark:border-red-400 shadow-lg'
                        : 'border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-red-400 dark:hover:border-red-500'
                    } ${colors[mission.color]}`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-4xl">{mission.icon}</span>
                      <div className="flex-1">
                        <span className="inline-block px-3 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded-full mb-2">
                          {mission.year}
                        </span>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {mission.title}
                        </h4>
                        {selectedMission !== mission.id && (
                          <p className="text-slate-700 dark:text-slate-300 text-sm line-clamp-2">
                            {mission.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {selectedMission === mission.id && (
                    <div className="mt-3 bg-white dark:bg-slate-800 rounded-xl p-6 border-l-4 border-red-600 dark:border-red-400">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {mission.details}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">🔬 Tests Rigoureux NASA (1964)</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En 1964, la NASA cherche un chronographe fiable pour ses missions spatiales. Seule la Speedmaster réussit 
              l'intégralité des tests extrêmes :
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Résistance thermique : 0°C à 93°C</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Accélérations : jusqu'à 12 g</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 mr-2">✓</span>
                    <span>Étanchéité et résistance aux chocs</span>
                  </li>
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">✓</span>
                    <span>Antimagnétique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">✓</span>
                    <span>Remontage manuel (sécurité)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 dark:text-red-400 mr-2">✓</span>
                    <span>Vide spatial absolu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: SEAMASTER & JAMES BOND */}
        <section className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Waves className="w-10 h-10 text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Seamaster : Plongée & James Bond 007
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">🤿 Seamaster Diver 300M</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                Lancée en 1993, référence mondiale de la plongée professionnelle :
              </p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>Étanchéité 300m</strong> (30 bars)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>Valve à hélium</strong> : décompression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>Lunette unidirectionnelle</strong> : sécurité</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span><strong>Cadran vagues</strong> : design iconique</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-950 dark:to-gray-800 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🕴️ James Bond depuis 1995</h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Depuis <strong>GoldenEye</strong> (1995), James Bond porte exclusivement des Omega Seamaster :
              </p>
              <div className="space-y-2 text-sm">
                {bondFilms.map((film) => (
                  <div key={film.year} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <div className="font-bold text-white">{film.title} ({film.year})</div>
                    <div className="text-gray-300 text-xs">{film.watch} • {film.actor}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: INNOVATIONS */}
        <section className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mr-3" />
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Innovations Techniques
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: '1894', title: 'Calibre Omega 19 Lignes', description: 'Premier mouvement révolutionnaire avec couronne de remontage latérale.', icon: '⚙️' },
              { year: '1932', title: 'Chronométrage Olympique', description: 'Première manufacture à chronométrer les JO (Los Angeles). Plus de 30 éditions.', icon: '🏅' },
              { year: '1999', title: 'Échappement Co-Axial', description: 'Invention de George Daniels adoptée par Omega. Réduit frottements 90%.', icon: '🔧' },
              { year: '2013', title: 'Master Chronometer', description: 'Certification METAS : résistance à 15\'000 gauss (champs magnétiques).', icon: '🧲' },
              { year: '2019', title: 'Moonshine Gold', description: 'Alliage d\'or exclusif plus résistant à l\'oxydation que l\'or classique.', icon: '✨' },
              { year: '2020', title: 'Calibre 321 Relancé', description: 'Relance du calibre historique d\'Apollo 11 avec techniques modernes.', icon: '🚀' },
            ].map((innovation) => (
              <div key={innovation.year} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-4xl">{innovation.icon}</span>
                  <div>
                    <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-bold px-2 py-1 rounded mb-2">
                      {innovation.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{innovation.title}</h3>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm">{innovation.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: JEUX OLYMPIQUES */}
        <section className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400 mr-3" />
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
              Chronométreur Officiel Olympique
            </h2>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-center">
              Depuis <strong className="text-slate-900 dark:text-slate-100">1932</strong>, Omega a chronométré plus de 
              <strong className="text-slate-900 dark:text-slate-100"> 30 éditions des Jeux Olympiques</strong>. La marque 
              est devenue synonyme de précision chronométrique sportive au plus haut niveau mondial.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { year: '1932', city: 'Los Angeles' },
                { year: '2008', city: 'Beijing' },
                { year: '2012', city: 'London' },
                { year: '2024', city: 'Paris' },
              ].map((event) => (
                <div key={event.year} className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{event.year}</div>
                  <div className="text-sm text-slate-700 dark:text-slate-300">{event.city}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
          <Link 
            href="/theorie/manufactures" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium text-lg"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour aux Manufactures
          </Link>
        </div>
      </article>

      {/* FOOTER */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 HorloLearn - Formation en Horlogerie Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
