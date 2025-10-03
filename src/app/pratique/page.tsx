'use client';

import { useState } from 'react';
import { 
  Video, 
  FileText, 
  Wrench, 
  FolderOpen, 
  Cog, 
  LineChart, 
  ChevronRight, 
  ChevronDown,
  ExternalLink 
} from 'lucide-react';

interface Resource {
  title: string;
  url: string;
  description?: string;
}

interface Section {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  resources: Resource[];
}

const sections: Section[] = [
  {
    id: 'video',
    icon: Video,
    title: 'Tutoriels Vidéo',
    subtitle: 'Démonstrations pratiques en détail',
    color: 'from-rose-50 to-pink-50 border-rose-200',
    resources: [
      { title: 'Wristwatch Revival', url: 'https://www.youtube.com/@WristwatchRevival', description: 'Restaurations complètes de montres vintage' },
      { title: 'Nekkid Watchmaker', url: 'https://www.youtube.com/@nekkidwatchmaker', description: 'Techniques détaillées et explications' },
      { title: 'Marshall Watch Co.', url: 'https://www.youtube.com/@marshallwatchco', description: 'Réparations et maintenance' },
      { title: "Arthur's Crafty Lab", url: 'https://www.youtube.com/@ArthursCraftyLab', description: 'Modifications et personnalisations' },
      { title: 'Hayes Horology', url: 'https://www.youtube.com/@HayesHorology', description: 'Cours pratiques pour débutants' }
    ]
  },
  {
    id: 'guides',
    icon: FileText,
    title: 'Guides PDF',
    subtitle: 'Documentation technique complète',
    color: 'from-amber-50 to-yellow-50 border-amber-200',
    resources: [
      { title: 'Cousins UK', url: 'https://www.cousinsuk.com/pages/technical-guides', description: 'Guides techniques professionnels' },
      { title: 'Esslinger Watch School', url: 'https://www.esslinger.com/watch-school/', description: 'Cours et manuels d\'horlogerie' },
      { title: 'Watchmaking Weebly', url: 'https://watchmaking.weebly.com/', description: 'Ressources et tutoriels' },
      { title: 'Ofrei', url: 'https://www.ofrei.com/page_288.html', description: 'Manuels de réparation' }
    ]
  },
  {
    id: 'tools',
    icon: Wrench,
    title: 'Outils',
    subtitle: 'Équipement et fournitures',
    color: 'from-blue-50 to-cyan-50 border-blue-200',
    resources: [
      { title: 'Esslinger Tools', url: 'https://www.esslinger.com/watch-repair-tools/', description: 'Catalogue complet d\'outils' },
      { title: 'Cousins UK', url: 'https://www.cousinsuk.com/category/watch-tools', description: 'Outils horlogers professionnels' },
      { title: 'Bergeon', url: 'https://www.bergeon.swiss/en/', description: 'Outils suisses de haute qualité' },
      { title: 'Horotec', url: 'https://www.horotec.ch/', description: 'Équipement technique spécialisé' }
    ]
  },
  {
    id: 'projects',
    icon: FolderOpen,
    title: 'Projets',
    subtitle: 'Exercices et pratiques',
    color: 'from-emerald-50 to-teal-50 border-emerald-200',
    resources: [
      { title: 'r/Watchmaking Wiki', url: 'https://www.reddit.com/r/Watchmaking/wiki/index/', description: 'Guide complet pour débutants' },
      { title: 'Watch Repair Talk', url: 'https://www.watchrepairtalk.com/', description: 'Forum technique et discussions' },
      { title: 'NAWCC School', url: 'https://www.nawcc.org/index.php/education/school-of-horology', description: 'École d\'horlogerie' }
    ]
  },
  {
    id: 'parts',
    icon: Cog,
    title: 'Pièces',
    subtitle: 'Fournisseurs et catalogues',
    color: 'from-violet-50 to-purple-50 border-violet-200',
    resources: [
      { title: 'Cousins UK', url: 'https://www.cousinsuk.com/', description: 'Pièces détachées variées' },
      { title: 'Esslinger', url: 'https://www.esslinger.com/', description: 'Fournitures horlogères complètes' },
      { title: 'Ofrei', url: 'https://www.ofrei.com/', description: 'Pièces de montres vintage' },
      { title: 'Jules Borel', url: 'https://www.julesborel.com/', description: 'Matériel horloger professionnel' },
      { title: 'Ranfft Database', url: 'https://www.ranfft.de/cgi-bin/bidfun-db.cgi', description: 'Base de données mouvements' }
    ]
  },
  {
    id: 'diagrams',
    icon: LineChart,
    title: 'Diagrammes',
    subtitle: 'Schémas et spécifications',
    color: 'from-slate-50 to-gray-50 border-slate-200',
    resources: [
      { title: 'ETA', url: 'https://www.eta.ch/en/our-products', description: 'Fiches techniques mouvements ETA' },
      { title: 'Miyota', url: 'https://www.miyotamovement.com/', description: 'Documentation technique Miyota' },
      { title: 'Sellita', url: 'https://www.sellita.ch/en/', description: 'Spécifications mouvements Sellita' }
    ]
  }
];

export default function Pratique() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
            Pratique Horlogère
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light">
            Ressources essentielles pour maîtriser l'art de l'horlogerie
          </p>
        </div>

        {/* Grid Layout - 2 columns × 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSection === section.id;
            
            return (
              <div
                key={section.id}
                className={`
                  group relative overflow-hidden
                  bg-gradient-to-br ${section.color}
                  rounded-2xl border-2 shadow-lg
                  transition-all duration-300 ease-out
                  hover:shadow-2xl hover:scale-[1.02]
                  ${isOpen ? 'md:col-span-2' : ''}
                `}
              >
                {/* Card Header - Clickable */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    {/* Icon */}
                    <div className="flex-shrink-0 p-3 sm:p-4 bg-white/80 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-semibold text-slate-900 mb-2 tracking-tight">
                        {section.title}
                      </h2>
                      <p className="text-sm sm:text-base text-slate-600 font-light">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronDown className="w-6 h-6 text-slate-700 transition-transform duration-300" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-slate-700 group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                  </div>
                </button>

                {/* Accordion Content - Animated */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2">
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50">
                      <ul className="space-y-3 sm:space-y-4">
                        {section.resources.map((resource, idx) => (
                          <li key={idx}>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white/80 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-slate-900 group-hover/link:text-blue-600 transition-colors">
                                    {resource.title}
                                  </span>
                                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover/link:text-blue-600 transition-colors flex-shrink-0" />
                                </div>
                                {resource.description && (
                                  <p className="text-sm text-slate-600 font-light">
                                    {resource.description}
                                  </p>
                                )}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-sm text-slate-500 font-light">
            💡 Cliquez sur chaque carte pour découvrir les ressources disponibles
          </p>
        </div>
      </div>
    </div>
  );
}
