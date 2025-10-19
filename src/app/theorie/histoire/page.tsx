'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, Users, Lightbulb, Award } from 'lucide-react';

export default function HistoireHorlogerie() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedFigure, setSelectedFigure] = useState<string>('');

  const timeline = [
    {
      id: '1541',
      year: '1541',
      title: 'Genève, berceau de l\'horlogerie suisse',
      icon: '🏛️',
      color: 'orange' as const,
      content: {
        intro: "L'industrie horlogère suisse naît à Genève au milieu du XVIe siècle. Le réformateur Jean Calvin, en bannissant le port d'objets ornementaux en 1541, contraint les orfèvres et joailliers genevois à se reconvertir vers l'art de l'horlogerie.",
        details: "Dès la fin du siècle, Genève acquiert une réputation d'excellence mondiale. En 1601, la première corporation d'horlogers suisse voit le jour sous le nom de « Maîtrise des horlogers de Genève ».",
        highlight: "Impact Calvin : De l'orfèvrerie au génie horloger"
      }
    },
    {
      id: 'jeanrichard',
      year: '1665-1741',
      title: 'Daniel Jeanrichard : le génie du Jura',
      icon: '⚙️',
      color: 'blue' as const,
      content: {
        intro: "Né en 1665 au hameau des Bressels (entre La Chaux-de-Fonds et Le Locle), Daniel Jeanrichard découvre l'horlogerie à 15 ans lorsqu'un marchand de chevaux lui confie une montre anglaise à réparer.",
        details: "En 1681, à seulement 16 ans, il conçoit sa propre montre — la toute première jamais fabriquée dans la région de Neuchâtel. Pour y parvenir, il imagine et construit tous les outils nécessaires, démontrant un génie autodidacte exceptionnel.",
        highlight: "Innovation : L'établissage - Division du travail révolutionnaire",
        innovation: "Jeanrichard implante le système de l'établissage : une organisation divisée du travail où chaque artisan se spécialise dans une pièce spécifique, révolutionnant ainsi la production horlogère."
      }
    },
    {
      id: '1700',
      year: '1700',
      title: 'L\'expansion dans l\'Arc jurassien',
      icon: '🗻',
      color: 'green' as const,
      content: {
        intro: "Au début du XVIIIe siècle, Genève compte « trop » d'horlogers. Beaucoup quittent la région genevoise pour s'établir le long de l'Arc jurassien, de Genève à Schaffhouse.",
        details: "Ce développement est également favorisé par l'arrivée de Huguenots suite à la révocation de l'édit de Nantes par Louis XIV. Ces artisans de talent apportent des connaissances précieuses qui enrichissent l'industrie horlogère suisse naissante.",
        highlight: "Migration horlogère : De Genève aux montagnes du Jura"
      }
    },
    {
      id: 'perrelet',
      year: '1770-1777',
      title: 'Abraham-Louis Perrelet et la montre automatique',
      icon: '🔄',
      color: 'purple' as const,
      content: {
        intro: "En 1770, Abraham-Louis Perrelet crée la « montre à secousses » dite perpétuelle, considérée comme l'ancêtre de la montre automatique moderne.",
        details: "En 1777, il perfectionne son invention : le ressort du barillet s'arme uniquement grâce à l'énergie des mouvements naturels du porteur. Un système révolutionnaire qui inspire toute l'horlogerie automatique contemporaine.",
        highlight: "Révolution : Premier remontage automatique au monde",
        innovation: "Le système capte l'énergie cinétique des mouvements du poignet pour remonter le ressort moteur, éliminant le besoin de remontage manuel quotidien."
      }
    },
    {
      id: '1790',
      year: '1790',
      title: 'L\'essor commercial',
      icon: '📈',
      color: 'cyan' as const,
      content: {
        intro: "En 1790, Genève exporte déjà plus de 60'000 montres, témoignant d'une industrie florissante et d'une réputation mondiale solidement établie.",
        details: "La qualité suisse devient synonyme de précision et de fiabilité. Les montres genevoises sont recherchées dans toutes les cours européennes.",
        highlight: "Exportation massive : 60'000 montres/an"
      }
    },
    {
      id: '1816',
      year: '1816',
      title: 'Le premier chronographe',
      icon: '⏱️',
      color: 'red' as const,
      content: {
        intro: "Louis Moinet réalise le premier chronographe, également appelé « compteur de tierces ». Cette innovation marque le début des complications horlogères modernes.",
        details: "Le chronographe permet de mesurer des durées précises sans arrêter le fonctionnement normal de la montre. Innovation majeure pour la mesure du temps.",
        highlight: "Complication majeure : Mesure précise du temps"
      }
    },
    {
      id: '1842',
      year: '1842',
      title: 'Adrien Philippe et le remontoir au pendant',
      icon: '🔑',
      color: 'yellow' as const,
      content: {
        intro: "Adrien Philippe, cofondateur de la prestigieuse manufacture Patek Philippe, invente la montre avec remontoir au pendant, supprimant le besoin d'une clé de remontage.",
        details: "Cette innovation simplifie radicalement l'usage quotidien des montres et devient rapidement le standard universel. La couronne de remontage est née.",
        highlight: "Simplification : Fini la clé de remontage",
        innovation: "Le remontoir intégré à la couronne permet de remonter et régler la montre d'un simple geste, sans accessoire externe."
      }
    },
    {
      id: 'industrie',
      year: '1854-1876',
      title: 'La révolution industrielle américaine',
      icon: '🏭',
      color: 'orange' as const,
      content: {
        intro: "En 1854, le visionnaire Aaron Lufkin Dennison crée la Waltham Watch Company avec une vision radicale : développer machines, systèmes de production, jauges et standardisation pour rendre chaque pièce interchangeable.",
        details: "En 1876, Jacques David de Longines fait un rapport détaillé de la méthode américaine aux autorités helvétiques. Ce rapport déclenche une réaction salutaire : l'industrie suisse adopte progressivement ces nouvelles méthodes pour préserver sa compétitivité.",
        highlight: "⚠️ Menace existentielle : Production de masse américaine",
        innovation: "La Suisse réagit en adoptant l'industrialisation tout en préservant la qualité artisanale qui fait sa renommée."
      }
    },
    {
      id: '1900',
      year: '1900',
      title: 'Mécanisation et standardisation',
      icon: '⚙️',
      color: 'blue' as const,
      content: {
        intro: "Au début du XXe siècle, la mécanisation de la fabrication prend place grâce aux recherches d'horlogers réputés comme Frédéric Ingold et Georges Léschot.",
        details: "Augmentation de la productivité, interchangeabilité des composants et standardisation permettent à l'horlogerie suisse d'étendre sa suprématie mondiale tout en maintenant l'excellence de la finition manuelle.",
        highlight: "Modernisation : Machines + Savoir-faire artisanal"
      }
    },
    {
      id: 'bracelet',
      year: '1918-1926',
      title: 'L\'ère de la montre-bracelet',
      icon: '⌚',
      color: 'green' as const,
      content: {
        intro: "La fin de la Première Guerre mondiale coïncide avec l'introduction de la montre-bracelet, qui remplace progressivement la montre de gousset.",
        details: "En 1926, la première montre-bracelet automatique est produite à Granges. Sa forme ronde traditionnelle est définitivement adoptée au début des années 1960.",
        highlight: "Transition majeure : Du gousset au poignet",
        innovation: "Les soldats découvrent la praticité de la montre-bracelet au front. Le format devient rapidement le standard civil."
      }
    },
    {
      id: '1952',
      year: '1952',
      title: 'L\'électrification',
      icon: '⚡',
      color: 'purple' as const,
      content: {
        intro: "Les premières montres électriques apparaissent en 1952, ouvrant la voie vers l'électronique horlogère.",
        details: "Remplacement du ressort moteur par une pile électrique. Précision accrue mais complexité technique importante.",
        highlight: "Électronique : Première pile dans une montre"
      }
    },
    {
      id: 'beta21',
      year: '1967-1970',
      title: 'Beta 21 : triomphe technique, échec commercial',
      icon: '💎',
      color: 'red' as const,
      content: {
        intro: "En 1967, le Centre électronique horloger de Neuchâtel développe la première montre-bracelet à quartz du monde : la fameuse Beta 21.",
        details: "Ce projet réunit 21 manufactures suisses prestigieuses : Omega, Rolex, Patek Philippe, IWC, Longines, Zenith, et bien d'autres.",
        highlight: "💥 Crise du quartz : Arrivée trop tard face à Seiko",
        innovation: "Malgré sa précision redoutable, la Beta 21 arrive 4 mois après la mise sur le marché de l'Astron de Seiko. Instable, fragile et énergivore, seulement 6000 mouvements produits avant abandon. La crise du quartz menace l'horlogerie mécanique suisse.",
        warning: true
      }
    },
    {
      id: 'renaissance',
      year: '1980-1990',
      title: 'Renaissance et repositionnement',
      icon: '🌅',
      color: 'cyan' as const,
      content: {
        intro: "Face à la crise du quartz, l'industrie suisse démontre une capacité d'innovation remarquable. Le lancement de Swatch dans les années 1980 révolutionne le marché avec des montres à quartz accessibles et design.",
        details: "Parallèlement, l'horlogerie haut de gamme se repositionne sur l'excellence mécanique, l'artisanat d'art et les complications. Les fusions de groupes (Swatch Group, Richemont, LVMH) consolident le secteur.",
        highlight: "Résilience : Swatch + Complications mécaniques",
        innovation: "Double stratégie gagnante : démocratisation du quartz ET sublimation de la mécanique haute gamme."
      }
    },
    {
      id: 'moderne',
      year: '2000-2025',
      title: 'L\'horlogerie du XXIe siècle',
      icon: '🚀',
      color: 'orange' as const,
      content: {
        intro: "Forte de ses traditions mais résolument innovante, l'horlogerie suisse contemporaine allie matériaux high-tech (céramique, silicium, graphène), complications extrêmes et connectivité.",
        details: "Elle conserve son leadership mondial en incarnant l'excellence du « Swiss Made » : précision absolue, finitions impeccables et savoir-faire artisanal unique transmis depuis quatre siècles.",
        highlight: "Excellence moderne : Tradition + Innovation technologique"
      }
    },
  ];

  const figures = [
    {
      id: 'jeanrichard-fig',
      name: 'Daniel Jeanrichard',
      years: '1665-1741',
      role: 'Fondateur de l\'horlogerie jurassienne',
      achievement: 'Première montre neuchâteloise (1681) et système de l\'établissage',
      details: 'Génie autodidacte qui crée sa première montre à 16 ans en fabriquant tous ses outils. Révolutionne la production avec la division du travail spécialisé.',
      icon: '⚙️'
    },
    {
      id: 'perrelet-fig',
      name: 'Abraham-Louis Perrelet',
      years: '1729-1826',
      role: 'Inventeur de la montre automatique',
      achievement: 'Montre à secousses perpétuelle (1770-1777)',
      details: 'Crée le premier système de remontage automatique par les mouvements du porteur. Ancêtre de tous les calibres automatiques modernes.',
      icon: '🔄'
    },
    {
      id: 'moinet-fig',
      name: 'Louis Moinet',
      years: '1768-1853',
      role: 'Créateur du chronographe',
      achievement: 'Premier chronographe au monde (1816)',
      details: 'Invente le compteur de tierces permettant la mesure précise de durées. Ouvre la voie aux complications chronométriques.',
      icon: '⏱️'
    },
    {
      id: 'philippe-fig',
      name: 'Adrien Philippe',
      years: '1815-1894',
      role: 'Cofondateur Patek Philippe',
      achievement: 'Remontoir au pendant (1842)',
      details: 'Supprime la clé de remontage en créant la couronne moderne. Simplifie radicalement l\'usage quotidien des montres.',
      icon: '🔑'
    },
    {
      id: 'dennison-fig',
      name: 'Aaron Lufkin Dennison',
      years: '1812-1895',
      role: 'Pionnier de l\'industrialisation',
      achievement: 'Waltham Watch Company (1854)',
      details: 'Révolutionne la production horlogère avec l\'interchangeabilité totale des pièces et la production de masse standardisée.',
      icon: '🏭'
    },
    {
      id: 'leschot-fig',
      name: 'Georges Léschot',
      years: '1800-1884',
      role: 'Mécanisation de la production',
      achievement: 'Standardisation et interchangeabilité',
      details: 'Développe machines et procédés de fabrication permettant la standardisation tout en préservant la qualité suisse.',
      icon: '🔧'
    },
  ];

  const innovations = [
    {
      icon: '🔄',
      title: 'Montre automatique',
      description: 'Abraham-Louis Perrelet révolutionne l\'horlogerie avec un système qui capte l\'énergie des mouvements du porteur pour remonter automatiquement le ressort.',
      year: '1770-1777',
      color: 'purple'
    },
    {
      icon: '⏱️',
      title: 'Chronographe',
      description: 'Louis Moinet crée le premier chronographe, ouvrant la voie aux complications de mesure du temps.',
      year: '1816',
      color: 'red'
    },
    {
      icon: '🔑',
      title: 'Remontoir au pendant',
      description: 'Adrien Philippe supprime la clé de remontage avec son ingénieux système de remontoir intégré à la couronne.',
      year: '1842',
      color: 'yellow'
    },
    {
      icon: '⚙️',
      title: 'Interchangeabilité',
      description: 'La standardisation des pièces permet une production de masse tout en maintenant la qualité suisse.',
      year: '1900',
      color: 'blue'
    },
    {
      icon: '⌚',
      title: 'Montre-bracelet',
      description: 'La transition de la montre de gousset vers la montre-bracelet moderne transforme l\'usage quotidien de l\'horlogerie.',
      year: '1918-1926',
      color: 'green'
    },
    {
      icon: '💎',
      title: 'Beta 21 - Quartz',
      description: 'Premier mouvement à quartz suisse développé par 21 manufactures prestigieuses, marquant l\'entrée dans l\'ère électronique.',
      year: '1967-1970',
      color: 'cyan'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <Link
            href="/theorie"
            className="inline-flex items-center text-sm text-slate-400 hover:text-orange-400 transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour à la théorie
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent leading-tight">
            Histoire de l'Horlogerie Suisse
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 font-light leading-relaxed max-w-3xl">
            Quatre siècles d'excellence, d'innovations et de savoir-faire qui ont positionné la Suisse comme 
            référence mondiale incontestée de l'art horloger.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">1541</div>
              <div className="text-sm text-slate-400">Origines à Genève</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">60K</div>
              <div className="text-sm text-slate-400">Montres exportées (1790)</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">21</div>
              <div className="text-sm text-slate-400">Manufactures Beta 21</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl p-4 hover:border-orange-500/50 transition-all">
              <div className="text-3xl font-bold text-orange-400 mb-1">N°1</div>
              <div className="text-sm text-slate-400">Leader mondial</div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE INTERACTIVE */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-12">
          <Clock className="w-10 h-10 text-orange-400 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Chronologie Interactive
          </h2>
        </div>

        <div className="space-y-6">
          {timeline.map((period) => {
            const colors = {
              orange: { border: 'border-orange-600 dark:border-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400' },
              blue: { border: 'border-blue-600 dark:border-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400' },
              green: { border: 'border-green-600 dark:border-green-400', bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-600 dark:text-green-400' },
              purple: { border: 'border-purple-600 dark:border-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400' },
              red: { border: 'border-red-600 dark:border-red-400', bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400' },
              cyan: { border: 'border-cyan-600 dark:border-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-950/30', text: 'text-cyan-600 dark:text-cyan-400' },
              yellow: { border: 'border-yellow-600 dark:border-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-950/30', text: 'text-yellow-600 dark:text-yellow-400' },
            };
            const colorScheme = colors[period.color];

            return (
              <div key={period.id}>
                <div
                  onClick={() => setSelectedPeriod(selectedPeriod === period.id ? '' : period.id)}
                  className={`bg-slate-900/80 backdrop-blur border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPeriod === period.id
                      ? `${colorScheme.border} shadow-lg`
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{period.icon}</span>
                      <div>
                        <span className={`inline-block px-3 py-1 ${colorScheme.bg} ${colorScheme.text} text-sm font-bold rounded-full mb-2`}>
                          {period.year}
                        </span>
                        <h3 className="text-xl font-bold text-slate-100">{period.title}</h3>
                        {selectedPeriod !== period.id && (
                          <p className="text-slate-400 text-sm mt-1 line-clamp-1">{period.content.intro}</p>
                        )}
                      </div>
                    </div>
                    <ChevronLeft 
                      className={`w-6 h-6 text-slate-400 transition-transform ${
                        selectedPeriod === period.id ? '-rotate-90' : 'rotate-180'
                      }`} 
                    />
                  </div>
                </div>

                {selectedPeriod === period.id && (
                  <div className={`mt-3 ${colorScheme.bg} rounded-xl p-6 border-l-4 ${colorScheme.border}`}>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {period.content.intro}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {period.content.details}
                    </p>
                    {period.content.innovation && (
                      <div className={`${period.content.warning ? 'bg-red-900/20 border-red-600' : 'bg-slate-800/50 border-slate-700'} border-l-4 rounded-r-lg p-4 mb-4`}>
                        <p className="text-sm font-semibold text-slate-200 mb-2">{period.content.highlight}</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{period.content.innovation}</p>
                      </div>
                    )}
                    {!period.content.innovation && (
                      <div className="bg-slate-800/50 border-l-4 border-slate-700 rounded-r-lg p-4">
                        <p className="text-sm font-semibold text-slate-200">{period.content.highlight}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FIGURES EMBLÉMATIQUES */}
      <section className="bg-slate-900/50 border-y border-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Users className="w-10 h-10 text-orange-400 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
              Figures Emblématiques
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {figures.map((figure) => (
              <div key={figure.id}>
                <div
                  onClick={() => setSelectedFigure(selectedFigure === figure.id ? '' : figure.id)}
                  className={`bg-slate-900 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedFigure === figure.id
                      ? 'border-orange-500 shadow-lg shadow-orange-500/20'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{figure.icon}</span>
                    {selectedFigure === figure.id && (
                      <ChevronLeft className="w-5 h-5 text-orange-400 -rotate-90" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-orange-400 mb-1">{figure.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{figure.years}</p>
                  <p className="text-slate-200 font-semibold mb-2">{figure.role}</p>
                  {selectedFigure !== figure.id && (
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{figure.achievement}</p>
                  )}
                </div>

                {selectedFigure === figure.id && (
                  <div className="mt-3 bg-orange-950/30 rounded-xl p-6 border-l-4 border-orange-500">
                    <p className="text-sm text-slate-300 leading-relaxed mb-3">{figure.achievement}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{figure.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATIONS MAJEURES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center mb-12">
          <Lightbulb className="w-10 h-10 text-orange-400 mr-3" />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Innovations & Premières Mondiales
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {innovations.map((innovation, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{innovation.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-orange-400">{innovation.title}</h3>
                    <span className="text-xs text-slate-500 font-mono">{innovation.year}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{innovation.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONCLUSION */}
      <section className="bg-gradient-to-br from-orange-950/20 via-slate-900 to-slate-950 border-t border-slate-800 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Award className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            Un héritage vivant
          </h2>
          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            L'horlogerie suisse incarne plus de quatre siècles d'excellence, d'innovation et de passion. Des ateliers 
            artisanaux de Daniel Jeanrichard aux manufactures high-tech contemporaines, elle a su traverser les crises, 
            s'adapter aux révolutions technologiques et maintenir son statut de référence mondiale absolue.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            Aujourd'hui, le <em>« Swiss Made »</em> reste synonyme de précision, d'élégance intemporelle et de savoir-faire 
            artisanal unique — un patrimoine horloger inégalé que les horlogers suisses continuent d'enrichir chaque jour.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            © 2025 HorloLearn - Formation en Horlogerie Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
