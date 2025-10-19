'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Clock, Users, Lightbulb, Award, ChevronDown } from 'lucide-react';

export default function HistoireHorlogerie() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('');
  const [selectedFigure, setSelectedFigure] = useState<string>('');

  const timeline = [
    {
      id: '1541',
      year: '1541',
      title: 'Genève, berceau de l\'horlogerie suisse',
      category: 'Origines',
      content: {
        intro: "L'industrie horlogère suisse naît à Genève au milieu du XVIe siècle. Le réformateur Jean Calvin, en bannissant le port d'objets ornementaux en 1541, contraint les orfèvres et joailliers genevois à se reconvertir vers l'art de l'horlogerie.",
        details: "Dès la fin du siècle, Genève acquiert une réputation d'excellence mondiale. En 1601, la première corporation d'horlogers suisse voit le jour sous le nom de « Maîtrise des horlogers de Genève ».",
        impact: "Impact Calvin : De l'orfèvrerie au génie horloger"
      }
    },
    {
      id: 'jeanrichard',
      year: '1665-1741',
      title: 'Daniel Jeanrichard : le génie du Jura',
      category: 'Pionniers',
      content: {
        intro: "Né en 1665 au hameau des Bressels (entre La Chaux-de-Fonds et Le Locle), Daniel Jeanrichard découvre l'horlogerie à 15 ans lorsqu'un marchand de chevaux lui confie une montre anglaise à réparer.",
        details: "En 1681, à seulement 16 ans, il conçoit sa propre montre — la toute première jamais fabriquée dans la région de Neuchâtel. Pour y parvenir, il imagine et construit tous les outils nécessaires, démontrant un génie autodidacte exceptionnel.",
        impact: "Innovation : L'établissage - Division du travail révolutionnaire",
        highlight: "Jeanrichard implante le système de l'établissage : une organisation divisée du travail où chaque artisan se spécialise dans une pièce spécifique, révolutionnant ainsi la production horlogère."
      }
    },
    {
      id: '1700',
      year: '1700',
      title: 'L\'expansion dans l\'Arc jurassien',
      category: 'Expansion',
      content: {
        intro: "Au début du XVIIIe siècle, Genève compte « trop » d'horlogers. Beaucoup quittent la région genevoise pour s'établir le long de l'Arc jurassien, de Genève à Schaffhouse.",
        details: "Ce développement est également favorisé par l'arrivée de Huguenots suite à la révocation de l'édit de Nantes par Louis XIV. Ces artisans de talent apportent des connaissances précieuses qui enrichissent l'industrie horlogère suisse naissante.",
        impact: "Migration horlogère : De Genève aux montagnes du Jura"
      }
    },
    {
      id: 'perrelet',
      year: '1770-1777',
      title: 'Abraham-Louis Perrelet et la montre automatique',
      category: 'Innovation',
      content: {
        intro: "En 1770, Abraham-Louis Perrelet crée la « montre à secousses » dite perpétuelle, considérée comme l'ancêtre de la montre automatique moderne.",
        details: "En 1777, il perfectionne son invention : le ressort du barillet s'arme uniquement grâce à l'énergie des mouvements naturels du porteur. Un système révolutionnaire qui inspire toute l'horlogerie automatique contemporaine.",
        impact: "Révolution : Premier remontage automatique au monde",
        highlight: "Le système capte l'énergie cinétique des mouvements du poignet pour remonter le ressort moteur, éliminant le besoin de remontage manuel quotidien."
      }
    },
    {
      id: '1790',
      year: '1790',
      title: 'L\'essor commercial',
      category: 'Commerce',
      content: {
        intro: "En 1790, Genève exporte déjà plus de 60'000 montres, témoignant d'une industrie florissante et d'une réputation mondiale solidement établie.",
        details: "La qualité suisse devient synonyme de précision et de fiabilité. Les montres genevoises sont recherchées dans toutes les cours européennes.",
        impact: "Exportation massive : 60'000 montres/an"
      }
    },
    {
      id: '1816',
      year: '1816',
      title: 'Le premier chronographe',
      category: 'Innovation',
      content: {
        intro: "Louis Moinet réalise le premier chronographe, également appelé « compteur de tierces ». Cette innovation marque le début des complications horlogères modernes.",
        details: "Le chronographe permet de mesurer des durées précises sans arrêter le fonctionnement normal de la montre. Innovation majeure pour la mesure du temps.",
        impact: "Complication majeure : Mesure précise du temps"
      }
    },
    {
      id: '1842',
      year: '1842',
      title: 'Adrien Philippe et le remontoir au pendant',
      category: 'Innovation',
      content: {
        intro: "Adrien Philippe, cofondateur de la prestigieuse manufacture Patek Philippe, invente la montre avec remontoir au pendant, supprimant le besoin d'une clé de remontage.",
        details: "Cette innovation simplifie radicalement l'usage quotidien des montres et devient rapidement le standard universel. La couronne de remontage est née.",
        impact: "Simplification : Fini la clé de remontage",
        highlight: "Le remontoir intégré à la couronne permet de remonter et régler la montre d'un simple geste, sans accessoire externe."
      }
    },
    {
      id: 'industrie',
      year: '1854-1876',
      title: 'La révolution industrielle américaine',
      category: 'Industrialisation',
      content: {
        intro: "En 1854, le visionnaire Aaron Lufkin Dennison crée la Waltham Watch Company avec une vision radicale : développer machines, systèmes de production, jauges et standardisation pour rendre chaque pièce interchangeable.",
        details: "En 1876, Jacques David de Longines fait un rapport détaillé de la méthode américaine aux autorités helvétiques. Ce rapport déclenche une réaction salutaire : l'industrie suisse adopte progressivement ces nouvelles méthodes pour préserver sa compétitivité.",
        impact: "⚠️ Menace existentielle : Production de masse américaine",
        highlight: "La Suisse réagit en adoptant l'industrialisation tout en préservant la qualité artisanale qui fait sa renommée.",
        warning: true
      }
    },
    {
      id: '1900',
      year: '1900',
      title: 'Mécanisation et standardisation',
      category: 'Modernisation',
      content: {
        intro: "Au début du XXe siècle, la mécanisation de la fabrication prend place grâce aux recherches d'horlogers réputés comme Frédéric Ingold et Georges Léschot.",
        details: "Augmentation de la productivité, interchangeabilité des composants et standardisation permettent à l'horlogerie suisse d'étendre sa suprématie mondiale tout en maintenant l'excellence de la finition manuelle.",
        impact: "Modernisation : Machines + Savoir-faire artisanal"
      }
    },
    {
      id: 'bracelet',
      year: '1918-1926',
      title: 'L\'ère de la montre-bracelet',
      category: 'Évolution',
      content: {
        intro: "La fin de la Première Guerre mondiale coïncide avec l'introduction de la montre-bracelet, qui remplace progressivement la montre de gousset.",
        details: "En 1926, la première montre-bracelet automatique est produite à Granges. Sa forme ronde traditionnelle est définitivement adoptée au début des années 1960.",
        impact: "Transition majeure : Du gousset au poignet",
        highlight: "Les soldats découvrent la praticité de la montre-bracelet au front. Le format devient rapidement le standard civil."
      }
    },
    {
      id: '1952',
      year: '1952',
      title: 'L\'électrification',
      category: 'Technologie',
      content: {
        intro: "Les premières montres électriques apparaissent en 1952, ouvrant la voie vers l'électronique horlogère.",
        details: "Remplacement du ressort moteur par une pile électrique. Précision accrue mais complexité technique importante.",
        impact: "Électronique : Première pile dans une montre"
      }
    },
    {
      id: 'beta21',
      year: '1967-1970',
      title: 'Beta 21 : triomphe technique, échec commercial',
      category: 'Crise',
      content: {
        intro: "En 1967, le Centre électronique horloger de Neuchâtel développe la première montre-bracelet à quartz du monde : la fameuse Beta 21.",
        details: "Ce projet réunit 21 manufactures suisses prestigieuses : Omega, Rolex, Patek Philippe, IWC, Longines, Zenith, et bien d'autres.",
        impact: "💥 Crise du quartz : Arrivée trop tard face à Seiko",
        highlight: "Malgré sa précision redoutable, la Beta 21 arrive 4 mois après la mise sur le marché de l'Astron de Seiko. Instable, fragile et énergivore, seulement 6000 mouvements produits avant abandon. La crise du quartz menace l'horlogerie mécanique suisse.",
        warning: true
      }
    },
    {
      id: 'renaissance',
      year: '1980-1990',
      title: 'Renaissance et repositionnement',
      category: 'Renaissance',
      content: {
        intro: "Face à la crise du quartz, l'industrie suisse démontre une capacité d'innovation remarquable. Le lancement de Swatch dans les années 1980 révolutionne le marché avec des montres à quartz accessibles et design.",
        details: "Parallèlement, l'horlogerie haut de gamme se repositionne sur l'excellence mécanique, l'artisanat d'art et les complications. Les fusions de groupes (Swatch Group, Richemont, LVMH) consolident le secteur.",
        impact: "Résilience : Swatch + Complications mécaniques",
        highlight: "Double stratégie gagnante : démocratisation du quartz ET sublimation de la mécanique haute gamme."
      }
    },
    {
      id: 'moderne',
      year: '2000-2025',
      title: 'L\'horlogerie du XXIe siècle',
      category: 'Modernité',
      content: {
        intro: "Forte de ses traditions mais résolument innovante, l'horlogerie suisse contemporaine allie matériaux high-tech (céramique, silicium, graphène), complications extrêmes et connectivité.",
        details: "Elle conserve son leadership mondial en incarnant l'excellence du « Swiss Made » : précision absolue, finitions impeccables et savoir-faire artisanal unique transmis depuis quatre siècles.",
        impact: "Excellence moderne : Tradition + Innovation technologique"
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
      details: 'Génie autodidacte qui crée sa première montre à 16 ans en fabriquant tous ses outils. Révolutionne la production avec la division du travail spécialisé.'
    },
    {
      id: 'perrelet-fig',
      name: 'Abraham-Louis Perrelet',
      years: '1729-1826',
      role: 'Inventeur de la montre automatique',
      achievement: 'Montre à secousses perpétuelle (1770-1777)',
      details: 'Crée le premier système de remontage automatique par les mouvements du porteur. Ancêtre de tous les calibres automatiques modernes.'
    },
    {
      id: 'moinet-fig',
      name: 'Louis Moinet',
      years: '1768-1853',
      role: 'Créateur du chronographe',
      achievement: 'Premier chronographe au monde (1816)',
      details: 'Invente le compteur de tierces permettant la mesure précise de durées. Ouvre la voie aux complications chronométriques.'
    },
    {
      id: 'philippe-fig',
      name: 'Adrien Philippe',
      years: '1815-1894',
      role: 'Cofondateur Patek Philippe',
      achievement: 'Remontoir au pendant (1842)',
      details: 'Supprime la clé de remontage en créant la couronne moderne. Simplifie radicalement l\'usage quotidien des montres.'
    },
    {
      id: 'dennison-fig',
      name: 'Aaron Lufkin Dennison',
      years: '1812-1895',
      role: 'Pionnier de l\'industrialisation',
      achievement: 'Waltham Watch Company (1854)',
      details: 'Révolutionne la production horlogère avec l\'interchangeabilité totale des pièces et la production de masse standardisée.'
    },
    {
      id: 'leschot-fig',
      name: 'Georges Léschot',
      years: '1800-1884',
      role: 'Mécanisation de la production',
      achievement: 'Standardisation et interchangeabilité',
      details: 'Développe machines et procédés de fabrication permettant la standardisation tout en préservant la qualité suisse.'
    },
  ];

  const innovations = [
    { title: 'Montre automatique', year: '1770-1777', description: 'Système de remontage par mouvements naturels du porteur' },
    { title: 'Chronographe', year: '1816', description: 'Première complication de mesure de durées précises' },
    { title: 'Remontoir au pendant', year: '1842', description: 'Suppression de la clé avec couronne intégrée' },
    { title: 'Interchangeabilité', year: '1900', description: 'Standardisation permettant production de masse qualitative' },
    { title: 'Montre-bracelet', year: '1918-1926', description: 'Transition du gousset au format poignet moderne' },
    { title: 'Beta 21 - Quartz', year: '1967-1970', description: 'Premier mouvement à quartz suisse électronique' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-950 dark:to-slate-900">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/theorie"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à la théorie
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Histoire de l'Horlogerie Suisse
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-12">
              Quatre siècles d'excellence, d'innovations et de savoir-faire qui ont positionné la Suisse comme 
              référence mondiale incontestée de l'art horloger.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">1541</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Origines à Genève</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">60K</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Montres exportées (1790)</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">21</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Manufactures Beta 21</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">N°1</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">Leader mondial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENU */}
      <article className="max-w-6xl mx-auto px-4 py-16">
        {/* TIMELINE */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Clock className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Chronologie
            </h2>
          </div>

          <div className="space-y-4">
            {timeline.map((period) => (
              <div key={period.id}>
                <button
                  onClick={() => setSelectedPeriod(selectedPeriod === period.id ? '' : period.id)}
                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-orange-400 dark:hover:border-orange-500 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex flex-col items-center">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-bold rounded-full">
                          {period.year}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{period.category}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                          {period.title}
                        </h3>
                        {selectedPeriod !== period.id && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                            {period.content.intro}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-slate-400 transition-transform flex-shrink-0 ml-4 ${
                        selectedPeriod === period.id ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>

                {selectedPeriod === period.id && (
                  <div className="mt-3 bg-slate-50 dark:bg-slate-900 border-l-4 border-orange-600 dark:border-orange-400 rounded-r-xl p-6">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {period.content.intro}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                      {period.content.details}
                    </p>
                    {period.content.highlight && (
                      <div className={`${period.content.warning ? 'bg-red-50 dark:bg-red-950/30 border-red-600 dark:border-red-500' : 'bg-orange-50 dark:bg-orange-950/30 border-orange-600 dark:border-orange-500'} border-l-4 rounded-r-lg p-4 mb-4`}>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                          {period.content.impact}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {period.content.highlight}
                        </p>
                      </div>
                    )}
                    {!period.content.highlight && (
                      <div className="bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-600 dark:border-orange-500 rounded-r-lg p-4">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {period.content.impact}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FIGURES */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Users className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Figures Emblématiques
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {figures.map((figure) => (
              <div key={figure.id}>
                <button
                  onClick={() => setSelectedFigure(selectedFigure === figure.id ? '' : figure.id)}
                  className="w-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:border-orange-400 dark:hover:border-orange-500 transition-all text-left"
                >
                  <h3 className="text-xl font-bold text-orange-600 dark:text-orange-400 mb-1">{figure.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">{figure.years}</p>
                  <p className="text-slate-900 dark:text-white font-semibold mb-2">{figure.role}</p>
                  {selectedFigure !== figure.id && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{figure.achievement}</p>
                  )}
                </button>

                {selectedFigure === figure.id && (
                  <div className="mt-3 bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-600 dark:border-orange-400 rounded-r-xl p-6">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                      <strong className="text-slate-900 dark:text-slate-100">Réalisation :</strong> {figure.achievement}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {figure.details}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INNOVATIONS */}
        <section className="mb-20">
          <div className="flex items-center mb-12">
            <Lightbulb className="w-8 h-8 text-orange-600 dark:text-orange-400 mr-3" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Innovations Majeures
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {innovations.map((innovation, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{innovation.title}</h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{innovation.year}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{innovation.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONCLUSION */}
        <section className="bg-gradient-to-br from-orange-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center">
          <Award className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Un héritage vivant
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-3xl mx-auto">
            L'horlogerie suisse incarne plus de quatre siècles d'excellence, d'innovation et de passion. Des ateliers 
            artisanaux de Daniel Jeanrichard aux manufactures high-tech contemporaines, elle a su traverser les crises, 
            s'adapter aux révolutions technologiques et maintenir son statut de référence mondiale absolue.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Aujourd'hui, le <em>« Swiss Made »</em> reste synonyme de précision, d'élégance intemporelle et de savoir-faire 
            artisanal unique — un patrimoine horloger inégalé que les horlogers suisses continuent d'enrichir chaque jour.
          </p>
        </section>
      </article>

      {/* FOOTER */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © 2025 HorloLearn - Formation en Horlogerie Suisse
          </p>
        </div>
      </footer>
    </div>
  );
}
