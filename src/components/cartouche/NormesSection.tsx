import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileText, BookOpen, ExternalLink, ChevronDown, ChevronUp, Download } from 'lucide-react';

interface NormesSectionProps {
  darkMode: boolean;
}

export const NormesSection: React.FC<NormesSectionProps> = ({ darkMode }) => {
  const [activeStandard, setActiveStandard] = useState<'7200' | '5457'>('7200');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['presentation']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleAll = (expand: boolean) => {
    if (expand) {
      setExpandedSections(new Set(['presentation', 'champs', 'applications', 'bonnes-pratiques', 'exemples']));
    } else {
      setExpandedSections(new Set([]));
    }
  };

  const standards = {
    '7200': {
      title: 'ISO 7200:2004',
      subtitle: 'Cartouches d\'inscription',
      description: 'Spécification des champs de données pour les cartouches et têtes de documents techniques',
      icon: FileText,
      color: 'blue',
      sections: [
        {
          id: 'presentation',
          title: 'Présentation générale',
          content: `La norme ISO 7200:2004 définit les éléments d'information qui doivent figurer dans les cartouches d'inscription et les têtes de documents techniques. Elle s'applique à tous les types de documents techniques, y compris les plans horlogers.

Cette norme internationale garantit l'harmonisation et la standardisation des informations techniques, facilitant ainsi la compréhension et l'interprétation des documents quelle que soit leur provenance.

En horlogerie, ISO 7200 est particulièrement important car les pièces sont complexes et miniatures, nécessitant une documentation précise et normalisée pour la fabrication et la maintenance.`
        },
        {
          id: 'champs',
          title: 'Structure des champs',
          content: `Le cartouche selon ISO 7200 est organisé en zones fonctionnelles :

**Zone d'identification (obligatoire) :**
- Longueur maximale : 170 mm
- Position : coin inférieur droit
- Contient les informations d'identification du document

**Champ titre (obligatoire) :**
- Longueur recommandée : 25-30 caractères
- Doit être clair et descriptif
- Format normalisé pour assurer la lisibilité

**Zone d'administration :**
- Auteur, vérificateur, date
- Indice de révision
- Méthode de projection

**Champs techniques :**
- Matériau, traitement de surface, masse
- Tolérances générales, échelle
- Dimensions de référence selon l'application

**Zone libre :**
- Réservée aux informations spécifiques à l'entreprise
- Logo, références internes, numérotation propriétaire`
        },
        {
          id: 'applications',
          title: 'Applications en horlogerie',
          content: `En horlogerie, ISO 7200 s'adapte aux spécificités du secteur :

**Composants critiques :**
- Platines et ponts de mouvement
- Roues et pignons
- Axes et pivots (précision micrométrique)
- Rouages de complications

**Informations spécifiques :**
- Désignation normalisée des matériaux (CuNi18Zn20 pour maillechort)
- Tolérances ISO 2768-m ou f selon la précision
- Traitements de surface horlogers (rhodiage, anglage)
- Indices de révision pour les modifications

**Documentations techniques :**
- Plans de fabrication
- Fiches techniques de pièces
- Notices de montage
- Documents de contrôle qualité

**Gestion documentaire :**
- Archivage numérique et physique
- Traçabilité des modifications
- Conformité réglementaire`
        },
        {
          id: 'bonnes-pratiques',
          title: 'Bonnes pratiques',
          content: `Pour une application efficace d'ISO 7200 en horlogerie :

**Conception du cartouche :**
- Utiliser des champs de hauteur uniforme (8-10 mm)
- Respecter les espacements minimaux
- Maintenir une lisibilité optimale
- Prévoir l'évolution future du document

**Choix des informations :**
- Renseigner tous les champs obligatoires
- Évaluer la pertinence des champs conditionnels
- Éviter les redondances avec les annotations du dessin
- Harmoniser les désignations normalisées

**Maintenance documentaire :**
- Mettre à jour systématiquement l'indice de révision
- Documenter les modifications dans le tableau de révision
- Maintenir la cohérence entre versions
- Assurer la diffusion aux utilisateurs concernés

**Contrôle qualité :**
- Vérifier la conformité lors de la création
- Contrôler les mises à jour
- Valider les informations techniques`
        },
        {
          id: 'exemples',
          title: 'Exemples pratiques',
          content: `Exemples d'application d'ISO 7200 en horlogerie :

**Exemple 1 - Platine de mouvement :**
- Titre : "Platine calibre 2824-2"
- Matériau : "CuNi18Zn20"
- Échelle : "2:1" (agrandissement nécessaire)
- Tolérance : "ISO 2768-m"
- Méthode : "E" (projection européenne)

**Exemple 2 - Roue de complications :**
- Titre : "Roue calendrier АП2"
- Matériau : "CuZn40" (laiton)
- Masse : "0.15g" (précision critique)
- Traitement : "Rhodiage"
- Indice : "C" (troisième révision)

**Exemple 3 - Pivots de balancier :**
- Titre : "Pivots balancier 453"
- Matériau : "X5CrNi18-10"
- Tolérance : "ISO 2768-f" (fine)
- Échelle : "10:1" (agrandissement important)
- Format : "A4" (pièce unitaire)`
        }
      ]
    },
    '5457': {
      title: 'ISO 5457:1999',
      subtitle: 'Formats de dessin',
      description: 'Spécification des formats, marges et éléments d\'annotation des documents de dessin technique',
      icon: Scale,
      color: 'green',
      sections: [
        {
          id: 'presentation',
          title: 'Présentation générale',
          content: `La norme ISO 5457:1999 définit les formats standards pour les documents de dessin technique. Cette norme garantit l'interchangeabilité et l'archivage optimal des documents techniques.

En horlogerie, le choix du format est crucial car les pièces sont de taille réduite mais nécessitent une précision extrême. ISO 5457 définit non seulement les dimensions mais aussi les marges, zones de pliage et emplacements reserved pour les annotations.

La norme s'applique particulièrement bien à l'horlogerie en规定ant des formats adaptés aux pièces de précision tout en permettant une lecture confortable des cotes et annotations.`
        },
        {
          id: 'champs',
          title: 'Formats et caractéristiques',
          content: `Formats standardisés selon ISO 5457 :

**Série A (recommandée pour l'horlogerie) :**
- A0 : 841 × 1189 mm (rarement utilisé)
- A1 : 594 × 841 mm (plans complexes)
- A2 : 420 × 594 mm (ensembles cohérents)
- A3 : 297 × 420 mm (platines complètes)
- A4 : 210 × 297 mm (pièces unitaires)

**Marges obligatoires :**
- Formats A0, A1 : Marge 20 mm
- Formats A2, A3, A4 : Marge 10 mm
- Marge de pliage : 5 mm supplémentaire
- Zone de classement : 20 mm sur le côté

**Zone du cartouche :**
- Position : Coin inférieur droit
- Largeur : Maximum 170 mm
- Hauteur : Variable selon le contenu
- Alignement : Selon les dimensions normalisées

**Éléments supplémentaires :**
- Zone de pliage (facultative)
- Indication de modification
- Symboles de projection`
        },
        {
          id: 'applications',
          title: 'Choix du format en horlogerie',
          content: `Recommandations spécifiques au secteur horloger :

**Format A4 (210×297mm) :**
- Usage : Pièces unitaires, composants simples
- Avantages : Coût réduit, archivage facile
- Exemples : Pivots, axes, vis spécialisées
- Échelle recommandée : 2:1 à 10:1

**Format A3 (297×420mm) :**
- Usage : Platines, ponts, ensembles cohérents
- Avantages : Plus d'espace pour détails
- Exemples : Platine de mouvement, ponts de complications
- Échelle recommandée : 1:1 à 5:1

**Format A2 (420×594mm) :**
- Usage : Mouvements complets, éclatés complexes
- Avantages : Vue d'ensemble possible
- Exemples : Assemblages complets, plans d'ensemble
- Échelle recommandée : 1:2 à 1:1

**Facteurs de choix :**
- Complexité de la pièce
- Densité de cotation nécessaire
- Exigences de traçabilité
- Contraintes d'archivage`
        },
        {
          id: 'bonnes-pratiques',
          title: 'Optimisation et archivage',
          content: `Optimisation de l'utilisation d'ISO 5457 en horlogerie :

**Optimisation de l'espace :**
- Utiliser l'ensemble de la zone utile
- Éviter les zones vides importantes
- Équilibrer densité de'information et lisibilité
- Prévoir l'évolution future du document

**Contraintes d'impression :**
- Vérifier la qualité d'impression à l'échelle chosen
- Assurer la lisibilité des cotes critiques
- Tester la reproduction photomécanique
- Prévoir les variations d'échelle

**Archivage physique :**
- Respecter les pliages selon la norme
- Protéger les bords par marge de sécurité
- Utiliser des pochettes normalisées
- Maintenir l'identification claire

**Archivage numérique :**
- Conservation des formats vectoriels
- Métadonnées normalisées
- Liens vers versions successives
- Sauvegarde multi-sites`
        },
        {
          id: 'exemples',
          title: 'Applications spécifiques',
          content: `Cas d'application d'ISO 5457 dans différents contextes horlogers :

**Mouvements de montre :**
- Format : A3 pour platines complètes
- Échelle : 2:1 à 5:1 selon la complexité
- Cartouche : Position standard en bas à droite
- Zone libre : Pour références internes

**Composants de complications :**
- Format : A4 pour pièces unitaires
- Échelle : 5:1 à 10:1 pour détails critiques
- Tolérances : Indication dans cartouche
- Traitements : Spécifiés dans zone technique

**Plans d'ensemble :**
- Format : A2 pour vue complète
- Échelle : 1:1 ou 1:2 pour repérage
- Références : Liens vers plans de détail
- Documentation : Nomenclature complète

**Fiches techniques :**
- Format : A4 pour documentation
- Échelle : Variable selon le contenu
- Cartouche : Adapté à la fonction documentaire
- Sécurité : Classification si nécessaire

**Contrôle qualité :**
- Format : A4 pour fiches de contrôle
- Échelle : Agrandie pour zones critiques
- Tolérances : Spécification détaillée
- Traçabilité : Références complètes`
        }
      ]
    }
  };

  const activeNorm = standards[activeStandard];
  const colorClasses = {
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      light: 'bg-blue-50',
      dark: 'bg-blue-900/20'
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      light: 'bg-green-50',
      dark: 'bg-green-900/20'
    }
  };

  const currentColors = colorClasses[activeNorm.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Normes ISO
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Comprendre et appliquer les normes ISO 7200 et ISO 5457 dans vos documents horlogers
          </p>
        </motion.div>

        {/* Sélection des normes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          {Object.entries(standards).map(([key, norm]) => {
            const Icon = norm.icon;
            const isActive = activeStandard === key;
            
            return (
              <button
                key={key}
                onClick={() => setActiveStandard(key as '7200' | '5457')}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? `${colorClasses[norm.color as keyof typeof colorClasses].bg} text-white shadow-lg scale-105`
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold">{norm.title}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'opacity-70'}`}>
                    {norm.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Contenu de la norme active */}
        <motion.div
          key={activeStandard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`rounded-2xl border-2 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          {/* En-tête de la norme */}
          <div className={`p-8 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 ${currentColors.bg} rounded-2xl flex items-center justify-center`}>
                <activeNorm.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {activeNorm.title}
                </h2>
                <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {activeNorm.subtitle}
                </p>
              </div>
            </div>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {activeNorm.description}
            </p>
          </div>

          {/* Contrôles */}
          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sections détaillées
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAll(true)}
                  className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Tout déployer
                </button>
                <button
                  onClick={() => toggleAll(false)}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                >
                  Tout replier
                </button>
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="p-6 space-y-4">
            {activeNorm.sections.map((section, index) => (
              <div key={section.id} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-4 text-left flex items-center justify-between transition-colors hover:${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <h4 className={`text-lg font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h4>
                  {expandedSections.has(section.id) ? (
                    <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.has(section.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-6 pt-0 ${
                        darkMode ? 'bg-gray-750' : 'bg-gray-50'
                      }`}>
                        <div className="prose prose-sm max-w-none">
                          {section.content.split('\n').map((paragraph, idx) => (
                            <p key={idx} className={`mb-3 leading-relaxed ${
                              darkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ressources et liens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-2xl ${
            darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${
              darkMode ? 'text-purple-300' : 'text-purple-800'
            }`}>
              Ressources Complémentaires
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                📚 Documentation officielle :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-purple-100' : 'text-purple-600'
              }`}>
                <li>• Texte officiel ISO 7200:2004 (boutique ISO)</li>
                <li>• Guide d'application ISO 5457:1999</li>
                <li>• Normes horlogères Swiss (FH)</li>
                <li>• Documentation technique horlogère</li>
              </ul>
            </div>
            
            <div>
              <h4 className={`font-semibold mb-3 ${
                darkMode ? 'text-purple-200' : 'text-purple-700'
              }`}>
                🔗 Liens utiles :
              </h4>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-purple-100' : 'text-purple-600'
              }`}>
                <li>• Site officiel ISO (www.iso.org)</li>
                <li>• Association Suisse des Horlogers</li>
                <li>• Cours spécialisés DAO horloger</li>
                <li>• Modèles de cartouches normalisés</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default NormesSection;
