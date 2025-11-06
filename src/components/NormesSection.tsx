import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scale, FileText, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

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
      setExpandedSections(new Set());
    }
  };

  const standards = {
    '7200': {
      title: 'ISO 7200:2004',
      subtitle: 'Cartouches d\'inscription',
      description: 'Specification des champs de donnees pour les cartouches et tetes de documents techniques',
      icon: FileText,
      color: 'blue',
      sections: [
        {
          id: 'presentation',
          title: 'Presentation generale',
          content: 'La norme ISO 7200:2004 definit les elements d\'information qui doivent figurer dans les cartouches d\'inscription et les tetes de documents techniques. Elle s\'applique a tous les types de documents techniques, y compris les plans horlogers. Cette norme internationale garantit l\'harmonisation et la standardisation des informations techniques, facilitant ainsi la comprehension et l\'interpretation des documents quelle que soit leur provenance. En horlogerie, ISO 7200 est particulierement important car les pieces sont complexes et miniatures, necessitant une documentation precise et normalisee pour la fabrication et la maintenance.'
        },
        {
          id: 'champs',
          title: 'Structure des champs',
          content: 'Le cartouche selon ISO 7200 est organise en zones fonctionnelles: Zone d\'identification (obligatoire) - Longueur maximale: 170 mm - Position: coin inferieur droit - Contient les informations d\'identification du document. Champ titre (obligatoire) - Longueur recommandee: 25-30 caracteres - Doit etre clair et descriptif - Format normalise pour assurer la lisibilite. Zone d\'administration - Auteur, verificateur, date - Indice de revision - Methode de projection. Champs techniques - Materiau, traitement de surface, masse - Tolerances generales, echelle - Dimensions de reference selon l\'application. Zone libre - Reservee aux informations specifiques a l\'entreprise - Logo, references internes, numerotation proprietaire'
        },
        {
          id: 'applications',
          title: 'Applications en horlogerie',
          content: 'En horlogerie, ISO 7200 s\'adapte aux specificites du secteur: Composants critiques - Platines et ponts de mouvement - Roues et pignons - Axes et pivots (precision micrometrique) - Rouages de complications. Informations specifiques - Designation normalisee des materiaux (CuNi18Zn20 pour maillechort) - Tolerances ISO 2768-m ou f selon la precision - Traitements de surface horlogers (rhodiage, anglage) - Indices de revision pour les modifications. Documentations techniques - Plans de fabrication - Fiches techniques de pieces - Notices de montage - Documents de controle qualite. Gestion documentaire - Archivage numerique et physique - Tracabilite des modifications - Conformite reglementaire'
        },
        {
          id: 'bonnes-pratiques',
          title: 'Bonnes pratiques',
          content: 'Pour une application efficace d\'ISO 7200 en horlogerie: Conception du cartouche - Utiliser des champs de hauteur uniforme (8-10 mm) - Respecter les espacements minimaux - Maintenir une lisibilite optimale - Prevoir l\'evolution future du document. Choix des informations - Renseigner tous les champs obligatoires - Evaluer la pertinence des champs conditionnels - Eviter les redondances avec les annotations du dessin - Harmoniser les designations normalisees. Maintenance documentaire - Mettre a jour systematiquement l\'indice de revision - Documenter les modifications dans le tableau de revision - Maintenir la coherence entre versions - Assurer la diffusion aux utilisateurs concernes. Controle qualite - Verifier la conformite lors de la creation - Controler les mises a jour - Valider les informations techniques'
        }
      ]
    },
    '5457': {
      title: 'ISO 5457:1999',
      subtitle: 'Formats de dessin',
      description: 'Specification des formats, marges et elements d\'annotation des documents de dessin technique',
      icon: Scale,
      color: 'green',
      sections: [
        {
          id: 'presentation',
          title: 'Presentation generale',
          content: 'La norme ISO 5457:1999 definit les formats standards pour les documents de dessin technique. Cette norme garantit l\'interchangeabilite et l\'archivage optimal des documents techniques. En horlogerie, le choix du format est crucial car les pieces sont de taille reduite mais necessitent une precision extreme. ISO 5457 definit non seulement les dimensions mais aussi les marges, zones de pliage et emplacements reserves pour les annotations.'
        },
        {
          id: 'champs',
          title: 'Formats et caracteristiques',
          content: 'Formats standardises selon ISO 5457: Serie A recommandee pour l\'horlogerie - A0: 841 x 1189 mm - A1: 594 x 841 mm - A2: 420 x 594 mm - A3: 297 x 420 mm - A4: 210 x 297 mm. Marges obligatoires - Formats A0, A1: Marge 20 mm - Formats A2, A3, A4: Marge 10 mm'
        }
      ]
    }
  };

  const activeNorm = standards[activeStandard];
  const colorClasses = {
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', light: 'bg-blue-50', dark: 'bg-blue-900/20' },
    green: { bg: 'bg-green-500', border: 'border-green-500', light: 'bg-green-50', dark: 'bg-green-900/20' }
  };
  const currentColors = colorClasses[activeNorm.color as keyof typeof colorClasses];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Normes ISO
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Comprendre et appliquer les normes ISO 7200 et ISO 5457 dans vos documents horlogers
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8">
          {Object.entries(standards).map(([key, norm]) => {
            const Icon = norm.icon;
            const isActive = activeStandard === key;
            return (
              <button key={key} onClick={() => setActiveStandard(key as '7200' | '5457')}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? `${colorClasses[norm.color as keyof typeof colorClasses].bg} text-white shadow-lg scale-105`
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}>
                <Icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold">{norm.title}</div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'opacity-70'}`}>{norm.subtitle}</div>
                </div>
              </button>
            );
          })}
        </motion.div>

        <motion.div key={activeStandard} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }} className={`rounded-2xl border-2 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
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

          <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sections detaillees
              </h3>
              <div className="flex space-x-2">
                <button onClick={() => toggleAll(true)}
                  className="px-3 py-1 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                  Tout deployer
                </button>
                <button onClick={() => toggleAll(false)}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors">
                  Tout replier
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {activeNorm.sections.map((section) => (
              <div key={section.id} className="rounded-xl overflow-hidden">
                <button onClick={() => toggleSection(section.id)}
                  className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                  <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className={`p-6 pt-0 ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}>
                        <div className="prose prose-sm max-w-none">
                          {section.content.split('...').map((paragraph, idx) => (
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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className={`mt-12 p-8 rounded-2xl ${
            darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
          }`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${
              darkMode ? 'text-purple-300' : 'text-purple-800'
            }`}>
              Ressources Complementaires
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                Documentation officielle
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-purple-100' : 'text-purple-600'}`}>
                <li>Texte officiel ISO 7200:2004 (boutique ISO)</li>
                <li>Guide d'application ISO 5457:1999</li>
                <li>Normes horlogeres Swiss FH</li>
                <li>Documentation technique horlogere</li>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-3 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                Liens utiles
              </h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-purple-100' : 'text-purple-600'}`}>
                <li>Site officiel ISO (www.iso.org)</li>
                <li>Association Suisse des Horlogers</li>
                <li>Cours specialises DAO horloger</li>
                <li>Modeles de cartouches normalises</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
