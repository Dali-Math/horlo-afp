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
  PlayCircle
} from 'lucide-react';

interface Section {
  titre: string;
  contenu: string;
  duree: string;
}

interface Cours {
  id: string;
  titre: string;
  description: string;
  duree: string;
  niveau: string;
  sections: Section[];
}

const coursData: Record<string, Cours> = {
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
          <p>La mesure du temps est l'une des plus anciennes préoccupations de l'humanité. Dès l'Antiquité, les civilisations ont développé des systèmes sophistiqués pour mesurer le passage du temps, motivées par des besoins agricoles, religieux et sociaux.</p>
          
          <h3>Les premiers instruments (3500 av. J.-C. - 1300 ap. J.-C.)</h3>
          
          <h4>Cadrans solaires</h4>
          <p>Les premiers cadrans solaires apparaissent en Égypte vers 1500 av. J.-C. Ces instruments utilisaient l'ombre projetée par un gnomon (tige verticale) pour indiquer l'heure. Leur précision était limitée par la météo et ils ne fonctionnaient pas la nuit.</p>
          <ul>
            <li><strong>Avantages</strong> : Simple, fiable en journée ensoleillée, pas d'entretien</li>
            <li><strong>Inconvénients</strong> : Inutilisable la nuit, imprécis par temps couvert, nécessite un calibrage selon la latitude</li>
          </ul>

          <h4>Clepsydres (horloges à eau)</h4>
          <p>Utilisées en Grèce et à Rome dès 1400 av. J.-C., les clepsydres mesuraient le temps par l'écoulement régulier d'eau d'un récipient à un autre. Plus sophistiquées que les cadrans solaires, elles fonctionnaient jour et nuit.</p>
          <ul>
            <li><strong>Types</strong> : À écoulement simple, à flotteur, à débit régulé</li>
            <li><strong>Précision</strong> : Environ ±15 minutes par jour</li>
            <li><strong>Problème majeur</strong> : Variation du débit avec la température</li>
          </ul>

          <h4>Sabliers</h4>
          <p>Apparus au Moyen Âge (VIIIe siècle), les sabliers utilisaient l'écoulement régulier de sable fin. Très populaires en navigation maritime (mesure des quarts de travail), ils étaient plus fiables que les clepsydres car insensibles aux températures modérées.</p>

          <h3>L'ère mécanique (1300 - 1800)</h3>
          
          <h4>Les premières horloges mécaniques</h4>
          <p>Au XIVe siècle, les premières horloges mécaniques apparaissent en Europe. Ces mécanismes monumentaux, pesant plusieurs tonnes, équipent les églises et les tours des villes. Elles utilisent un poids suspendu comme source d'énergie et un échappement à foliot comme régulateur.</p>
          
          <blockquote>
            "L'invention de l'horloge mécanique marque le début de la révolution temporelle. Pour la première fois, l'humanité maîtrise le temps indépendamment des astres." - David Landes, historien
          </blockquote>

          <h4>L'échappement à foliot (1300)</h4>
          <p>Premier système de régulation mécanique, le foliot est une barre horizontale oscillante qui contrôle la vitesse de rotation des rouages. Précision : environ ±30 minutes par jour.</p>

          <h4>Le ressort spiral (1657)</h4>
          <p>Christiaan Huygens invente le pendule à ressort spiral, améliorant considérablement la précision (±10 secondes par jour). Cette innovation permet la miniaturisation et la création des premières montres portables.</p>

          <h3>La révolution horlogère suisse (1750 - aujourd'hui)</h3>
          
          <h4>L'échappement à ancre (1755)</h4>
          <p>Thomas Mudge invente l'échappement à ancre, qui deviendra le standard de l'horlogerie moderne. Adopté et perfectionné par les horlogers suisses, ce système offre une précision sans précédent (±5 secondes par jour).</p>

          <h4>L'industrialisation horlogère</h4>
          <p>Au XIXe siècle, la Suisse devient le centre mondial de l'horlogerie grâce à :</p>
          <ul>
            <li>La production en série de pièces standardisées</li>
            <li>L'excellence des écoles d'horlogerie (Le Locle, La Chaux-de-Fonds)</li>
            <li>L'innovation constante (chronographe, répétition minutes, tourbillon)</li>
            <li>Le savoir-faire transmis de génération en génération</li>
          </ul>

          <h4>L'ère du quartz (1969)</h4>
          <p>Seiko présente la première montre à quartz grand public (Astron). Révolution technique : précision de ±15 secondes par mois, prix abordable. Cette innovation faillit détruire l'horlogerie mécanique suisse ("crise du quartz" 1970-1985).</p>

          <h4>La renaissance mécanique (1985 - aujourd'hui)</h4>
          <p>L'horlogerie mécanique suisse renaît en se positionnant sur le luxe, l'artisanat et la tradition. Les montres mécaniques deviennent des objets d'art, des symboles de statut et des investissements. Les complications horlogères atteignent des sommets de complexité jamais vus.</p>

          <div class="info-box">
            <strong>💡 Chiffres clés :</strong>
            <ul>
              <li>2024 : 17 millions de montres suisses exportées</li>
              <li>Valeur moyenne : 1,200 CHF par montre</li>
              <li>Leader mondial du luxe horloger (>60% du marché en valeur)</li>
            </ul>
          </div>
        `,
        duree: "15 min"
      },
      {
        titre: "Les grandes inventions horlogères",
        contenu: `
          <h2>Les révolutions techniques qui ont façonné l'horlogerie moderne</h2>
          
          <h3>1. L'échappement à ancre suisse (1750)</h3>
          
          <h4>L'invention</h4>
          <p>Thomas Mudge, horloger britannique, invente l'échappement à ancre en 1750. Ce système révolutionnaire améliore drastiquement la précision et la fiabilité des montres mécaniques.</p>
          
          <h4>Principe de fonctionnement</h4>
          <p>L'échappement à ancre utilise une ancre (pièce en forme d'ancre de navire) qui oscille entre deux positions, libérant alternativement les dents d'une roue d'échappement. Ce mouvement régulier divise le temps en intervalles égaux.</p>
          
          <h4>Pourquoi "suisse" ?</h4>
          <p>Bien qu'inventé en Angleterre, l'échappement à ancre a été perfectionné et standardisé par les horlogers suisses au XIXe siècle. Ils ont optimisé les angles, les matériaux (rubis synthétiques pour les palettes) et les procédés de fabrication, créant ainsi le standard mondial encore utilisé aujourd'hui.</p>
          
          <h4>Impact</h4>
          <ul>
            <li><strong>Précision</strong> : De ±30 min/jour à ±5 sec/jour</li>
            <li><strong>Fiabilité</strong> : Moins de pannes mécaniques</li>
            <li><strong>Longévité</strong> : Durée de vie multipliée par 10</li>
            <li><strong>Standardisation</strong> : Pièces interchangeables entre manufactures</li>
          </ul>

          <h3>2. Le spiral réglant Breguet (1795)</h3>
          
          <h4>Le problème initial</h4>
          <p>Les spiraux plats classiques, inventés par Christiaan Huygens, avaient un défaut majeur : leur développement n'était pas concentrique, causant des irrégularités de marche.</p>
          
          <h4>La solution de Breguet</h4>
          <p>Abraham-Louis Breguet découvre qu'en donnant une forme spéciale à la dernière spire du spiral (courbe terminale surélevée), on obtient un développement parfaitement concentrique. Cette invention améliore la précision de 30 à 50%.</p>
          
          <h4>Caractéristiques techniques</h4>
          <ul>
            <li><strong>Matériau</strong> : Acier trempé bleu (classique) ou alliages modernes (Nivarox, Parachrom)</li>
            <li><strong>Épaisseur</strong> : 0.02 à 0.03 mm</li>
            <li><strong>Longueur</strong> : 12 à 15 cm</li>
            <li><strong>Nombre de spires</strong> : 12 à 18</li>
          </ul>

          <div class="success-box">
            ✅ <strong>Record actuel :</strong> Le spiral en silicium (utilisé par Patek Philippe, Rolex, Omega) est insensible aux champs magnétiques et offre une précision de ±1 sec/jour.
          </div>

          <h3>3. Le remontage automatique (1770)</h3>
          
          <h4>L'invention d'Abraham-Louis Perrelet</h4>
          <p>En 1770, l'horloger suisse Perrelet invente le premier système de remontage automatique pour montre de poche. Un poids oscillant (masse oscillante) remonte le ressort moteur grâce aux mouvements du porteur.</p>
          
          <h4>Évolution moderne</h4>
          <p>Le système moderne, perfectionné par John Harwood (1923) et Rolex (1931), utilise un rotor bi-directionnel qui remonte le ressort dans les deux sens de rotation.</p>
          
          <h4>Avantages</h4>
          <ul>
            <li>Pas besoin de remontage manuel quotidien</li>
            <li>Réserve de marche constante (si portée régulièrement)</li>
            <li>Moins de risque de surtension du ressort</li>
          </ul>
          
          <h4>Types de rotors</h4>
          <ul>
            <li><strong>Rotor central (Rolex, ETA)</strong> : Tour complet 360°, efficace</li>
            <li><strong>Micro-rotor (Piaget)</strong> : Discret, permet un mouvement plus fin</li>
            <li><strong>Rotor périphérique (Bulgari)</strong> : Très fin, complexe à fabriquer</li>
          </ul>

          <h3>4. Le chronographe mécanique (1816)</h3>
          
          <h4>Louis Moinet : le pionnier</h4>
          <p>En 1816, Louis Moinet crée le premier chronographe au monde, capable de mesurer 1/60e de seconde. Destiné à l'astronomie, ce mécanisme battait à 30 Hz (216,000 A/h), une prouesse technique inégalée pendant 150 ans.</p>
          
          <h4>Adolphe Nicole et la remise à zéro (1862)</h4>
          <p>Nicole invente le système de remise à zéro des aiguilles de chronographe, rendant l'instrument pratique pour des mesures répétées.</p>
          
          <h4>Le chronographe moderne</h4>
          <p>Aujourd'hui, les chronographes mécaniques se divisent en deux catégories :</p>
          <ul>
            <li><strong>Chronographes à roue à colonnes</strong> : Mécanisme traditionnel, doux, coûteux (Zenith El Primero, Patek Philippe)</li>
            <li><strong>Chronographes à came</strong> : Moderne, robuste, économique (ETA 7750, Valjoux)</li>
          </ul>

          <h3>5. Le tourbillon (1795)</h3>
          
          <h4>Le génie d'Abraham-Louis Breguet</h4>
          <p>En 1795, Breguet invente le tourbillon pour compenser les effets de la gravité sur la précision des montres en position verticale. L'échappement et le balancier sont montés dans une cage rotative qui tourne sur elle-même (généralement 1 tour par minute).</p>
          
          <h4>Principe physique</h4>
          <p>En position verticale, la gravité affecte différemment le balancier selon sa position dans son cycle. Le tourbillon "moyenne" ces erreurs en faisant tourner tout le système, annulant ainsi les variations.</p>
          
          <h4>Complexité technique</h4>
          <ul>
            <li><strong>Nombre de pièces</strong> : 70 à 100 composants</li>
            <li><strong>Poids de la cage</strong> : 0.3 à 0.5 gramme</li>
            <li><strong>Temps de fabrication</strong> : 40 à 80 heures par horloger expert</li>
            <li><strong>Précision d'assemblage</strong> : ±0.01 mm</li>
          </ul>
          
          <blockquote>
            "Le tourbillon est le sommet de l'art horloger. Il ne s'agit plus seulement de mesurer le temps, mais de le transcender par la beauté du geste technique." - Philippe Dufour, maître horloger
          </blockquote>

          <h3>6. La répétition minutes (1783)</h3>
          
          <h4>L'invention</h4>
          <p>Abraham-Louis Breguet (encore lui !) perfectionne le mécanisme de répétition minutes vers 1783. Ce système permet à la montre de sonner l'heure, les quarts et les minutes sur demande.</p>
          
          <h4>Utilité historique</h4>
          <p>Avant l'électricité, lire l'heure dans l'obscurité était impossible. La répétition minutes permettait de connaître l'heure en actionnant un poussoir, la montre sonnant alors l'heure avec des timbres métalliques.</p>
          
          <h4>Exemple de sonnerie</h4>
          <p>Pour 10h47 :</p>
          <ul>
            <li>10 coups graves (les heures)</li>
            <li>9 coups doubles grave+aigu (les 3 quarts d'heure = 45 minutes)</li>
            <li>2 coups aigus (les 2 minutes supplémentaires)</li>
          </ul>
          <p>Total : 21 coups pour indiquer précisément 10h47</p>
          
          <div class="warning-box">
            ⚠️ <strong>Complexité :</strong> Une répétition minutes compte 250 à 300 pièces rien que pour le mécanisme de sonnerie. C'est l'une des complications les plus difficiles à maîtriser. Prix : 200,000 à 2,000,000 CHF.
          </div>
        `,
        duree: "20 min"
      }
    ]
  }
};

export default function CoursPage({ params }: { params: { id: string } }) {
  const [sectionActive, setSectionActive] = useState(0);
  const [sectionsCompletees, setSectionsCompletees] = useState<number[]>([]);
  
  const cours = coursData[params.id];
  
  if (!cours) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cours introuvable</h1>
          <Link href="/theorie" className="text-blue-600 hover:underline text-lg">
            ← Retour à la liste des cours
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
      {/* Header */}
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
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 sticky top-24">
              <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Table des matières
              </h3>
              <nav className="space-y-2">
                {cours.sections.map((section, idx) => (
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

              <div className="p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: sectionCourante.contenu }}
                />

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
                  .prose h4 {
                    color: #475569;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                  }
                  .prose p {
                    color: #475569;
                    margin-bottom: 1rem;
                    line-height: 1.8;
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
