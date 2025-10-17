'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  BookOpen,
  Clock,
  Award,
  PlayCircle,
  FileText,
  Image as ImageIcon,
  Video,
  Download
} from 'lucide-react';

// Base de données des cours (à terme, mettre dans une DB ou fichier séparé)
const coursData: Record<string, any> = {
  '1': {
    id: '1',
    titre: "Introduction à l'horlogerie",
    description: "Histoire, principes fondamentaux et terminologie de base de l'horlogerie mécanique.",
    duree: "45 min",
    niveau: "Débutant",
    sections: [
      {
        titre: "L'histoire de la mesure du temps",
        contenu: `
          <h2>De l'Antiquité à nos jours</h2>
          <p>La mesure du temps est l'une des plus anciennes préoccupations de l'humanité. Dès l'Antiquité, les civilisations ont développé des systèmes sophistiqués pour mesurer le passage du temps.</p>
          
          <h3>Les premiers instruments</h3>
          <ul>
            <li><strong>Cadrans solaires</strong> : Utilisés en Égypte dès 1500 av. J.-C.</li>
            <li><strong>Clepsydres</strong> : Horloges à eau utilisées en Grèce et à Rome</li>
            <li><strong>Sabliers</strong> : Apparus au Moyen Âge</li>
          </ul>

          <h3>L'ère mécanique</h3>
          <p>Au XIVe siècle, les premières horloges mécaniques apparaissent en Europe. Ces mécanismes monumentaux équipent les églises et les tours des villes.</p>
          
          <blockquote>
            "L'horlogerie mécanique représente l'une des plus grandes innovations techniques de l'humanité."
          </blockquote>
        `,
        duree: "10 min"
      },
      {
        titre: "Les grandes inventions horlogères",
        contenu: `
          <h2>Les révolutions techniques</h2>
          
          <h3>1. L'échappement à ancre (1750)</h3>
          <p>Invention de <strong>Thomas Mudge</strong> qui améliore considérablement la précision des montres. L'échappement à ancre devient le standard de l'horlogerie suisse.</p>
          
          <h3>2. Le spiral réglant (1675)</h3>
          <p>Christiaan Huygens invente le spiral, permettant une régulation précise du balancier.</p>
          
          <h3>3. Le remontage automatique (1770)</h3>
          <p>Abraham-Louis Perrelet crée le premier système de remontage automatique, ancêtre de nos montres automatiques modernes.</p>
          
          <h3>4. Le chronographe (1816)</h3>
          <p>Louis Moinet développe le premier chronographe pour des observations astronomiques.</p>
        `,
        duree: "15 min"
      },
      {
        titre: "Terminologie de base",
        contenu: `
          <h2>Lexique horloger essentiel</h2>
          
          <h3>Composants principaux</h3>
          <ul>
            <li><strong>Mouvement</strong> : Le mécanisme interne de la montre</li>
            <li><strong>Calibre</strong> : Référence technique du mouvement</li>
            <li><strong>Barillet</strong> : Contient le ressort moteur</li>
            <li><strong>Balancier</strong> : Organe oscillant régulant la marche</li>
            <li><strong>Spiral</strong> : Ressort fixé au balancier</li>
            <li><strong>Échappement</strong> : Mécanisme libérant l'énergie par impulsions</li>
            <li><strong>Ancre</strong> : Pièce de l'échappement en forme d'ancre</li>
          </ul>

          <h3>Mesures horlogères</h3>
          <ul>
            <li><strong>Alternances/heure (A/h)</strong> : Nombre de battements du balancier</li>
            <li><strong>Fréquence (Hz)</strong> : Oscillations par seconde</li>
            <li><strong>Réserve de marche</strong> : Autonomie après remontage complet</li>
            <li><strong>Amplitude</strong> : Angle de rotation du balancier</li>
          </ul>

          <div class="info-box">
            <strong>À retenir :</strong> Une montre à 28,800 A/h bat 8 fois par seconde (4 Hz).
          </div>
        `,
        duree: "12 min"
      },
      {
        titre: "Les différents types de montres",
        contenu: `
          <h2>Classification des montres mécaniques</h2>
          
          <h3>1. Montre mécanique à remontage manuel</h3>
          <p>Le ressort moteur doit être remonté quotidiennement via la couronne.</p>
          <ul>
            <li>✅ Tradition horlogère pure</li>
            <li>✅ Mécanisme plus fin</li>
            <li>❌ Nécessite un remontage régulier</li>
          </ul>

          <h3>2. Montre automatique</h3>
          <p>Un rotor oscillant remonte automatiquement le ressort grâce aux mouvements du poignet.</p>
          <ul>
            <li>✅ Autonomie prolongée</li>
            <li>✅ Pratique au quotidien</li>
            <li>❌ Mécanisme plus épais</li>
          </ul>

          <h3>3. Montre à quartz</h3>
          <p>Utilise un cristal de quartz vibrant à haute fréquence (32,768 Hz) pour une précision extrême.</p>
          <ul>
            <li>✅ Très précise (±15 sec/mois)</li>
            <li>✅ Peu d'entretien</li>
            <li>❌ Pas de mécanique visible</li>
          </ul>

          <h3>4. Montres à complications</h3>
          <p>Ajoutent des fonctions supplémentaires : chronographe, phases de lune, quantième perpétuel, répétition minutes, tourbillon...</p>
        `,
        duree: "8 min"
      }
    ]
  },
  '2': {
    id: '2',
    titre: "Anatomie d'un mouvement",
    description: "Découvrez les composants essentiels d'un mouvement horloger et leur fonction.",
    duree: "1h 30min",
    niveau: "Débutant",
    sections: [
      {
        titre: "Le barillet et la source d'énergie",
        contenu: `
          <h2>Le cœur énergétique de la montre</h2>
          
          <h3>Qu'est-ce que le barillet ?</h3>
          <p>Le barillet est un cylindre métallique contenant le <strong>ressort moteur</strong>, source d'énergie de tout mouvement mécanique.</p>
          
          <h3>Fonctionnement</h3>
          <ol>
            <li>Le ressort est enroulé via la couronne (remontage manuel) ou le rotor (automatique)</li>
            <li>En se détendant, il transmet son énergie au train de rouages</li>
            <li>Un système antiretour empêche le ressort de se dérouler brusquement</li>
          </ol>

          <h3>Caractéristiques techniques</h3>
          <ul>
            <li><strong>Longueur du ressort</strong> : 300 à 500 mm</li>
            <li><strong>Épaisseur</strong> : 0.08 à 0.12 mm</li>
            <li><strong>Couple</strong> : Varie selon l'état d'armage</li>
            <li><strong>Matériau</strong> : Acier spécial (Nivaflex, etc.)</li>
          </ul>

          <div class="warning-box">
            ⚠️ <strong>Important :</strong> Ne jamais forcer lors du remontage. Un ressort cassé nécessite une intervention professionnelle.
          </div>
        `,
        duree: "20 min"
      },
      {
        titre: "Le train de rouages",
        contenu: `
          <h2>La transmission de l'énergie</h2>
          
          <h3>Composition du train de rouages</h3>
          <p>Ensemble d'engrenages transmettant l'énergie du barillet à l'échappement en réduisant progressivement la vitesse.</p>
          
          <h3>Les rouages principaux</h3>
          <ol>
            <li><strong>Roue de barillet</strong> : 1 tour en 6 à 8 heures</li>
            <li><strong>Roue de centre</strong> : 1 tour par heure (porte l'aiguille des minutes)</li>
            <li><strong>Roue de moyenne</strong> : 1 tour en 8 minutes environ</li>
            <li><strong>Roue de seconde</strong> : 1 tour par minute (porte la trotteuse)</li>
            <li><strong>Roue d'échappement</strong> : 1 tour en 10 secondes environ</li>
          </ol>

          <h3>Calculs de démultiplication</h3>
          <p>Le rapport entre les nombres de dents permet de calculer la vitesse de rotation de chaque roue.</p>
          
          <blockquote>
            Exemple : Si la roue de barillet a 80 dents et pignon de 10 dents → rapport 8:1
          </blockquote>
        `,
        duree: "25 min"
      },
      {
        titre: "L'échappement",
        contenu: `
          <h2>Le régulateur de précision</h2>
          
          <h3>Rôle de l'échappement</h3>
          <p>L'échappement est le mécanisme qui :</p>
          <ul>
            <li>Libère l'énergie du train de rouages par impulsions régulières</li>
            <li>Entretient les oscillations du balancier</li>
            <li>Divise le temps en intervalles mesurables</li>
          </ul>

          <h3>L'échappement suisse à ancre</h3>
          <p>Standard de l'horlogerie suisse depuis le XIXe siècle, il se compose de :</p>
          <ul>
            <li><strong>Roue d'échappement</strong> : Dentée en forme de scie</li>
            <li><strong>Ancre</strong> : Pièce oscillante en forme d'ancre de navire</li>
            <li><strong>Palette d'entrée et palette de sortie</strong> : En rubis</li>
            <li><strong>Ellipse (sur le balancier)</strong> : Actionne l'ancre</li>
          </ul>

          <h3>Fonctionnement (cycle)</h3>
          <ol>
            <li>L'ellipse pousse une corne de l'ancre</li>
            <li>L'ancre bascule, libérant une dent de la roue d'échappement</li>
            <li>La roue avance d'une dent et transmet une impulsion au balancier</li>
            <li>L'ancre bascule de l'autre côté</li>
            <li>Le cycle recommence</li>
          </ol>
        `,
        duree: "30 min"
      },
      {
        titre: "L'organe réglant (balancier-spiral)",
        contenu: `
          <h2>Le cœur battant de la montre</h2>
          
          <h3>Le balancier</h3>
          <p>Volant oscillant qui définit la précision du mouvement. Chaque oscillation complète correspond à une "alternance".</p>
          
          <h3>Caractéristiques</h3>
          <ul>
            <li><strong>Inertie</strong> : Résistance aux variations de couple</li>
            <li><strong>Diamètre</strong> : 8 à 14 mm selon le calibre</li>
            <li><strong>Matériau</strong> : Glucydur, maillechort, etc.</li>
            <li><strong>Vis de réglage</strong> : Pour ajuster l'inertie</li>
          </ul>

          <h3>Le spiral</h3>
          <p>Ressort très fin (0.02 mm d'épaisseur) fixé au balancier, qui détermine la fréquence d'oscillation.</p>
          
          <h3>Fréquences courantes</h3>
          <ul>
            <li><strong>18,000 A/h</strong> (2.5 Hz) : Montres anciennes</li>
            <li><strong>21,600 A/h</strong> (3 Hz) : Standard classique</li>
            <li><strong>28,800 A/h</strong> (4 Hz) : Standard moderne</li>
            <li><strong>36,000 A/h</strong> (5 Hz) : Haute fréquence (Zenith El Primero)</li>
          </ul>

          <div class="success-box">
            ✅ <strong>À retenir :</strong> Plus la fréquence est élevée, plus la montre est théoriquement précise.
          </div>
        `,
        duree: "15 min"
      }
    ]
  }
  // Ajouter les autres cours ici (3, 4, 5, 6)
};

export default function CoursPage({ params }: { params: { id: string } }) {
  const [sectionActive, setSectionActive] = useState(0);
  const [sectionsCompletees, setSectionsCompletees] = useState<number[]>([]);
  
  const cours = coursData[params.id];
  
  if (!cours) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cours introuvable</h1>
          <Link href="/theorie" className="text-blue-600 hover:underline">
            Retour à la liste des cours
          </Link>
        </div>
      </div>
    );
  }

  const sectionCourante = cours.sections[sectionActive];
  const progression = Math.round((sectionsCompletees.length / cours.sections.length) * 100);

  const marquerComplete = () => {
    if (!sectionsCompletees.includes(sectionActive)) {
      setSectionsCompletees([...sectionsCompletees, sectionActive]);
    }
    if (sectionActive < cours.sections.length - 1) {
      setSectionActive(sectionActive + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header fixe avec progression */}
      <header className="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/theorie" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Retour aux cours
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {cours.duree}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                {cours.niveau}
              </span>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progression}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Progression : {progression}% ({sectionsCompletees.length}/{cours.sections.length} sections complétées)
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Sidebar : Table des matières */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 sticky top-24">
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Table des matières
              </h3>
              <nav className="space-y-2">
                {cours.sections.map((section: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSectionActive(idx)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      sectionActive === idx
                        ? 'bg-blue-600 text-white font-semibold'
                        : sectionsCompletees.includes(idx)
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{section.titre}</span>
                      {sectionsCompletees.includes(idx) && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-xs opacity-75 mt-1 block">{section.duree}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              
              {/* Header de la section */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">
                    Section {sectionActive + 1}/{cours.sections.length}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {sectionCourante.duree}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-2">{sectionCourante.titre}</h1>
                <p className="text-blue-100">Cours : {cours.titre}</p>
              </div>

              {/* Contenu de la section */}
              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: sectionCourante.contenu }}
                  style={{
                    lineHeight: '1.8',
                    fontSize: '1.1rem'
                  }}
                />

                {/* Styles personnalisés pour le contenu */}
                <style jsx global>{`
                  .prose h2 {
                    color: #1e293b;
                    font-size: 2rem;
                    font-weight: bold;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 3px solid #3b82f6;
                  }
                  .prose h3 {
                    color: #334155;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                  }
                  .prose p {
                    color: #475569;
                    margin-bottom: 1rem;
                  }
                  .prose ul, .prose ol {
                    margin-left: 1.5rem;
                    margin-bottom: 1.5rem;
                  }
                  .prose li {
                    color: #475569;
                    margin-bottom: 0.5rem;
                  }
                  .prose strong {
                    color: #1e293b;
                    font-weight: 600;
                  }
                  .prose blockquote {
                    border-left: 4px solid #3b82f6;
                    padding-left: 1.5rem;
                    font-style: italic;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 1rem 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1.5rem 0;
                  }
                  .info-box, .warning-box, .success-box {
                    padding: 1rem 1.5rem;
                    border-radius: 0.75rem;
                    margin: 1.5rem 0;
                    border-left: 4px solid;
                  }
                  .info-box {
                    background: #eff6ff;
                    border-color: #3b82f6;
                    color: #1e40af;
                  }
                  .warning-box {
                    background: #fef3c7;
                    border-color: #f59e0b;
                    color: #92400e;
                  }
                  .success-box {
                    background: #dcfce7;
                    border-color: #22c55e;
                    color: #166534;
                  }
                `}</style>
              </div>

              {/* Navigation */}
              <div className="border-t border-slate-200 p-6 bg-slate-50 flex items-center justify-between">
                <button
                  onClick={() => sectionActive > 0 && setSectionActive(sectionActive - 1)}
                  disabled={sectionActive === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-slate-200 text-slate-700 hover:bg-slate-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Précédent
                </button>

                <button
                  onClick={marquerComplete}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  {sectionActive < cours.sections.length - 1 ? (
                    <>
                      Suivant
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Terminer le cours
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CTA Quiz */}
            {progression === 100 && (
              <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
                <Award className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-4">Félicitations ! 🎉</h2>
                <p className="text-xl mb-6">
                  Vous avez terminé le cours "{cours.titre}"
                </p>
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
                >
                  <PlayCircle className="w-5 h-5" />
                  Passer le quiz de validation
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
