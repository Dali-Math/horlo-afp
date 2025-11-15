'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Import UI Components
import { 
  Search, Filter, BookOpen, Award, Clock, 
  Zap, Globe, Download, Share2, Heart, 
  ChevronRight, Play, RotateCw, Eye,
  Layers, Settings, BarChart3, Users
} from 'lucide-react';

// Types
interface Concept {
  id: string;
  title: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  description: string;
  lastUpdated: string;
  popularity: number;
}

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  concepts: Concept[];
  progress?: number;
}

// Données enrichies
const modulesData: Module[] = [
  {
    id: 'architecture',
    title: "Architecture du Mouvement",
    icon: <Layers className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
    progress: 0,
    concepts: [
      {
        id: 'platine-ponts',
        title: "Platine & Ponts",
        category: "Structure",
        difficulty: "beginner",
        description: "Le squelette du mouvement : conception, matériaux, finitions",
        lastUpdated: "2025-01-15",
        popularity: 98
      },
      {
        id: 'systeme-fixation',
        title: "Systèmes de Fixation",
        category: "Assemblage",
        difficulty: "intermediate",
        description: "Vis, chocs, maintien des composants critiques",
        lastUpdated: "2025-01-14",
        popularity: 87
      },
      {
        id: 'stabilite-dimensionnelle',
        title: "Stabilité Dimensionnelle",
        category: "Physique",
        difficulty: "expert",
        description: "Dilatation thermique, matériaux composites",
        lastUpdated: "2025-01-13",
        popularity: 92
      },
      {
        id: 'finitions-decoratives',
        title: "Finitions Décoratives",
        category: "Esthétique",
        difficulty: "intermediate",
        description: "Côtes de Genève, perlage, anglage - Arts du décor",
        lastUpdated: "2025-01-16",
        popularity: 95
      }
    ]
  },
  {
    id: 'rouages',
    title: "Rouages & Transmission",
    icon: <Settings className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    concepts: [
      // Ajouter 8-10 concepts
    ]
  },
  {
    id: 'echappement',
    title: "Échappements",
    icon: <Zap className="w-6 h-6" />,
    color: "from-amber-500 to-orange-600",
    concepts: [
      // Ajouter concepts
    ]
  },
  {
    id: 'regulation',
    title: "Régulation",
    icon: <Clock className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    concepts: [
      // Ajouter concepts
    ]
  }
];

// Composant 3D lazy-loaded
const Movement3D = dynamic(() => import('@/components/3d/MovementViewer'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center">
    <div className="text-white text-center">
      <RotateCw className="w-12 h-12 animate-spin mx-auto mb-4" />
      Chargement du modèle 3D...
    </div>
  </div>
});

// Composant principal
export default function HorologicalReferencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // États
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | '3d'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Simuler chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrage intelligent
  const filteredModules = modulesData.map(module => ({
    ...module,
    concepts: module.concepts.filter(concept => {
      const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          concept.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'all' || concept.difficulty === selectedDifficulty;
      const matchesCategory = selectedCategory === 'all' || concept.category === selectedCategory;
      
      return matchesSearch && matchesDifficulty && matchesCategory;
    })
  })).filter(module => module.concepts.length > 0);

  // Actions
  const toggleFavorite = (conceptId: string) => {
    setFavorites(prev => 
      prev.includes(conceptId) 
        ? prev.filter(id => id !== conceptId)
        : [...prev, conceptId]
    );
  };

  const openConcept = (moduleId: string, conceptId: string) => {
    router.push(`/theorie/mouvements/${conceptId}?module=${moduleId}`);
  };

  const shareConcept = async (concept: Concept) => {
    const shareData = {
      title: `${concept.title} - HorloLearn`,
      text: concept.description,
      url: `${window.location.origin}/theorie/mouvements/${concept.id}`
    };
    
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.url);
      // Afficher toast
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Clock className="w-16 h-16 text-blue-500 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Chargement de la Référence...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header intelligence avec Search Augmentée */}
      <motion.header 
        className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-8xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo & Breadcrumb */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                <Globe className="w-6 h-6" />
                <span className="font-bold text-lg">HorloLearn</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span className="text-slate-300">Référence Technique</span>
            </div>

            {/* Search Bar avec IA */}
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un concept (ex: 'coq balancier', 'coefficient dilatation')..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <motion.div 
                  className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Résultats de recherche avec AI suggestions */}
                  <div className="p-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold">Suggestions IA</span>
                    </div>
                    <ul className="space-y-1">
                      <li className="hover:bg-slate-700/50 p-2 rounded cursor-pointer">"Platine 3/4 vs ponts séparés"</li>
                      <li className="hover:bg-slate-700/50 p-2 rounded cursor-pointer">"Coefficient de dilatation maillechort"</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors" title="Mode 3D">
                <Eye className="w-5 h-5" onClick={() => setViewMode('3d')} />
              </button>
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors" title="Progression">
                <BarChart3 className="w-5 h-5" />
              </button>
              <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors" title="Communauté">
                <Users className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <motion.div 
            className="flex gap-4 mt-4 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <select 
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm"
            >
              <option value="all">Tous niveaux</option>
              <option value="beginner">Débutant</option>
              <option value="intermediate">Intermédiaire</option>
              <option value="expert">Expert</option>
            </select>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm"
            >
              <option value="all">Toutes catégories</option>
              <option value="Structure">Structure</option>
              <option value="Assemblage">Assemblage</option>
              <option value="Physique">Physique</option>
              <option value="Esthétique">Esthétique</option>
            </select>

            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-sm transition-colors"
            >
              <Filter className="w-4 h-4 inline mr-1" />
              {viewMode === 'grid' ? 'Vue Liste' : 'Vue Grille'}
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section avec 3D */}
      <section className="relative h-screen max-h-[900px] overflow-hidden">
        {/* 3D Background */}
        {viewMode === '3d' && (
          <div className="absolute inset-0">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Movement3D />
            </Canvas>
          </div>
        )}

        {/* Content Overlay */}
        <div className="relative z-10 max-w-8xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Layers className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-6xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Référence Technique Horlogère
                </h1>
                <p className="text-xl text-slate-300 mt-2">
                  L'encyclopédie interactive du mouvement mécanique
                </p>
              </div>
            </div>

            {/* Stats de référence */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { label: "Concepts", value: "247", icon: <BookOpen /> },
                { label: "Quiz", value: "89", icon: <Award /> },
                { label: "Modèles 3D", value: "156", icon: <Cube /> },
                { label: "Expertises", value: "34", icon: <Users /> },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <div className="text-3xl font-bold text-blue-400">{stat.value}</div>
                  <div className="text-slate-400 flex items-center gap-2 mt-1">
                    {stat.icon}
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contenu Modulaire */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {filteredModules.map((module) => (
            <motion.div
              key={module.id}
              className="mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Module Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{module.title}</h2>
                    {module.progress !== undefined && (
                      <div className="flex items-center gap-3 mt-2">
                        <div className="w-48 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400">{module.progress}% complété</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {selectedModule === module.id ? 'Masquer' : 'Voir plus'} →
                </button>
              </div>

              {/* Concepts Grid/List */}
              <div className={`
                ${viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                  : 'space-y-4'}
              `}>
                <AnimatePresence>
                  {module.concepts.map((concept) => (
                    <motion.div
                      key={concept.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className={`
                        ${viewMode === 'grid'
                          ? 'bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 hover:bg-slate-700/50 transition-all cursor-pointer group'
                          : 'flex items-center justify-between bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-blue-500/50 transition-all cursor-pointer group'
                        }
                      `}
                      onClick={() => openConcept(module.id, concept.id)}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                            {concept.title}
                          </h3>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(concept.id);
                            }}
                            className="text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <Heart className={`w-5 h-5 ${favorites.includes(concept.id) ? 'fill-red-400 text-red-400' : ''}`} />
                          </button>
                        </div>
                        
                        <p className="text-slate-400 text-sm mb-4">{concept.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className={`
                            px-2 py-1 rounded-full
                            ${concept.difficulty === 'beginner' && 'bg-green-500/20 text-green-400'}
                            ${concept.difficulty === 'intermediate' && 'bg-amber-500/20 text-amber-400'}
                            ${concept.difficulty === 'expert' && 'bg-red-500/20 text-red-400'}
                          `}>
                            {concept.difficulty}
                          </span>
                          <span>{concept.popularity}% populaire</span>
                        </div>

                        {selectedModule === module.id && viewMode === 'list' && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            className="mt-4 pt-4 border-t border-slate-700"
                          >
                            <div className="flex gap-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openConcept(module.id, concept.id);
                                }}
                                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-sm transition-colors flex items-center gap-1"
                              >
                                <Play className="w-4 h-4" /> Lire
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shareConcept(concept);
                                }}
                                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors flex items-center gap-1"
                              >
                                <Share2 className="w-4 h-4" /> Partager
                              </button>
                              <button className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors flex items-center gap-1">
                                <Download className="w-4 h-4" /> PDF
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* Footer de référence */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-32">
        <div className="max-w-8xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Standards</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>ISO 3158 (mouvements)</li>
                <li>ISO 1413 (chocs)</li>
                <li>NIHS 92-10 (résistance magnétique)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lgmb-4">Manufactures</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Patek Philippe</li>
                <li>Vacheron Constantin</li>
                <li>A. Lange & Söhne</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Technologies</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Silicium (2000s)</li>
                <li>Co-Axial (1999)</li>
                <li>Spring Drive (1999)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Communauté</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Forum technique</li>
                <li>Contribuer</li>
                <li>Certifications</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © 2025 HorloLearn - Référence Technique Certifiée | Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </div>
        </div>
      </footer>
    </main>
  );
}

// Composant 3D simple (à enrichir)
function Movement3D() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 0.2]} />
      <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
