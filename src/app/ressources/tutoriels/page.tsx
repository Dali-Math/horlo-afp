import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Video, FileText, CheckCircle } from 'lucide-react';

const tutorials = [
  {
    id: 1,
    title: "Démontage et nettoyage d'un mouvement mécanique",
    level: 'Intermédiaire',
    duration: '45 min',
    description: "Apprenez les techniques professionnelles de démontage, nettoyage et remontage d'un calibre mécanique suisse.",
    steps: 8,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    title: 'Huilage précis des rouages',
    level: 'Avancé',
    duration: '30 min',
    description: "Maîtrisez l'art délicat du huilage : choix des huiles, dosage précis et points d'application critiques.",
    steps: 6,
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 3,
    title: 'Réglage du spiral et de la raquette',
    level: 'Avancé',
    duration: '60 min',
    description: "Technique de réglage fin pour optimiser la précision chronométrique d'un mouvement.",
    steps: 10,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 4,
    title: 'Pose et ajustement des aiguilles',
    level: 'Débutant',
    duration: '20 min',
    description: "Guide pas à pas pour poser correctement les aiguilles sans endommager le cadran ou le mouvement.",
    steps: 5,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    title: "Remplacement d'un verre saphir",
    level: 'Intermédiaire',
    duration: '35 min',
    description: "Technique professionnelle de dépose et repose d'un verre saphir avec joint d'étanchéité.",
    steps: 7,
    color: 'from-cyan-500 to-teal-600'
  },
  {
    id: 6,
    title: "Changement de pile et test d'étanchéité",
    level: 'Débutant',
    duration: '25 min',
    description: "Procédure complète de remplacement de pile sur mouvement quartz avec contrôle d'étanchéité.",
    steps: 6,
    color: 'from-red-500 to-rose-600'
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'Débutant':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Intermédiaire':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Avancé':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

export default function TutorielsGuides() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src="/images/unitas-6497.jpg"
          alt="Mouvement Unitas 6497 en atelier suisse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 bg-clip-text text-transparent">
              Tutoriels Guidés
            </h1>
            <p className="text-lg sm:text-xl text-slate-200 max-w-2xl mx-auto">
              Formations pratiques pas à pas de l'horlogerie suisse
            </p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Back Button */}
        <Link className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-8 group" href="/pratique">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour à Pratique
        </Link>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 mb-12">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-3 text-white">Apprenez l'horlogerie étape par étape</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Nos tutoriels guidés vous accompagnent dans l'apprentissage des techniques horlogères suisses.
                Chaque tutoriel comprend des instructions détaillées, des photos haute résolution et des conseils de professionnels.
              </p>

              {/* Contenu pédagogique suisse — Unitas 6497 */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-emerald-400">Tutoriels — Unitas 6497 (démontage et remontage)</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <h4 className="font-semibold text-white mb-2">Démontage (séquence recommandée)</h4>
                    <ol className="list-decimal list-inside text-slate-300 space-y-1">
                      <li>Désarmement du barillet: maintenir l'ancre dégagée et laisser filer le ressort en contrôle.</li>
                      <li>Dépose du balancier-spiral: vis pont, levée délicate, protection du spiral.</li>
                      <li>Dépose de l'ancre et de son pont, puis contrôle visuel des palettes.</li>
                      <li>Dépose des ponts de rouage et extraction des mobiles: seconde, moyenne, centre.</li>
                      <li>Ouverture du barillet: ressort hors, inspection crochet/œillet, parois lubrifiées.</li>
                      <li>Côté cadran: dépose cadran et aiguilles, tirette, sautoir, pignon coulant, minuterie.</li>
                      <li>Nettoyage: pré-dégraissage, machine (bains adaptés), séchage sans chaleur excessive.</li>
                      <li>Contrôles: jeu axial/radial, état dents, pivots, endshake et parallélisme des ponts.</li>
                    </ol>
                  </div>

                  <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                    <h4 className="font-semibold text-white mb-2">Remontage et huilage</h4>
                    <ol className="list-decimal list-inside text-slate-300 space-y-1">
                      <li>Ressort de barillet neuf ou reconditionné: graisse de paroi (Moebius 8217) et axe (D5).</li>
                      <li>Remontage du rouage, alignement des paliers, pose des ponts sans contrainte.</li>
                      <li>Huilage rouages: huiles fines (9010/9020 selon pivot), quantité minimale visible.</li>
                      <li>Pose de l'ancre, test de liberté du train par impulsion légère.</li>
                      <li>Balancier-spiral: axe propre, goupille/raquette centrée, chute symétrique.</li>
                      <li>Côté cadran: minuterie, tirette/sautoir lubrifiés (9501), contrôle du tirette-stop.</li>
                      <li>Réglage de base: amplitude > 270° à plat, repère proche 0 ms, delta < 10 s/j.</li>
                      <li>Contrôle final: mise en boîte, étanchéité si applicable, propreté cadran/aiguilles.</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                  <h4 className="font-semibold text-white mb-2">Bonnes pratiques et conseils techniques</h4>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    <li>Travailler sous loupe 5x–10x, brucelles non magnétiques, pointes propres.</li>
                    <li>Ne jamais forcer un pont: rechercher l'engrènement naturel des pivots dans les pierres.</li>
                    <li>Appliquer les lubrifiants par capillarité; éviter toute sur-huilage des palettes.</li>
                    <li>Magnétisme: vérifier et démagnétiser avant réglage fin.</li>
                    <li>Documentation: référentiels ETA/Unitas et fiches techniques pour couples et tolérances.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-400">Vidéos HD</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-400">Fiches PDF</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-slate-400">Exercices pratiques</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tutorials.map((tutorial, index) => (
            <div
              key={tutorial.id}
              className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Header */}
              <div className={`w-full h-2 mb-4 rounded-t-xl bg-gradient-to-r ${tutorial.color}`}></div>

              {/* Level Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(tutorial.level)}`}>
                  {tutorial.level}
                </span>
                <span className="text-sm text-slate-400">{tutorial.duration}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {tutorial.description}
              </p>

              {/* Steps Count */}
              <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {tutorial.steps} étapes détaillées
              </div>

              {/* CTA Button */}
              <button className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50">
                Commencer le tutoriel
              </button>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Ressources complémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Bibliothèque de vidéos</h3>
              <p className="text-slate-300 mb-4">Plus de 50 heures de contenu vidéo HD avec zoom sur les gestes techniques critiques.</p>
              <button className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-2">Accéder aux vidéos →</button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-semibold mb-3 text-emerald-400">Fiches techniques PDF</h3>
              <p className="text-slate-300 mb-4">Documentation détaillée téléchargeable pour référence en atelier.</p>
              <button className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-2">Télécharger les fiches →</button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Prêt à perfectionner vos compétences ?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">Suivez nos tutoriels et devenez un expert en horlogerie suisse</p>
            <Link href="/ressources/certification">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/50">
                Valider mes compétences
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
