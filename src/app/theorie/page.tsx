'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  Clock, Gauge, Zap, Settings2, ChevronLeft, BookOpen, Cog, RotateCw, Book,
  Building2, Watch, Cpu, Wrench, Boxes, Gem, Heart, ChevronRight,
  ExternalLink, Menu, X, ArrowUp, Search
} from 'lucide-react';

// --- Styles CSS personnalisés pour les animations avancées ---
// J'utilise une balise <style> pour garder tout au même endroit.
// Dans un projet réel, vous mettriez ceci dans votre fichier CSS global.
const customStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes heartbeat {
    0% { transform: scale(1); }
    25% { transform: scale(1.3); }
    50% { transform: scale(1); }
    75% { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-heartbeat {
    animation: heartbeat 0.8s ease-in-out;
  }

  .animate-slideInRight {
    animation: slideInRight 0.3s ease-out forwards;
  }

  .animate-bounce-once {
    animation: bounce 0.6s;
  }

  .ripple {
    position: relative;
    overflow: hidden;
  }

  .ripple::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
    border-radius: 100%;
    transform: scale(1) translate(-50%);
    transform-origin: 50% 50%;
  }

  .ripple:focus:not(:active)::after {
    animation: ripple 0.6s ease-out;
  }
`;

// --- Hook personnalisé pour détecter si un élément est visible ---
const useOnScreen = (ref: React.RefObject<HTMLDivElement>) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Déclenche l'animation quand 10% de l'élément est visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

// --- Types et données (inchangés) ---
interface PageItem {
  slug: string;
  titre: string;
  description: string;
  icon: React.ReactNode;
  tag?: 'fondamental' | 'avancé' | 'pratique' | 'culture';
  readTime?: string;
}

const pagesFonctionnement: PageItem[] = [
  { slug: 'introduction-montre-mecanique', titre: "Introduction à la montre mécanique", description: "Les bases du fonctionnement, les grands organes et les principes essentiels.", icon: <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" />, tag: 'fondamental', readTime: '15 min' },
  { slug: 'barillet-ressort-moteur', titre: "Le Barillet et le Ressort Moteur", description: "Le cœur de la montre : source d'énergie, réserve de marche et types de ressorts.", icon: <Gauge className="w-7 h-7 text-yellow-600 dark:text-yellow-300" />, tag: 'fondamental', readTime: '20 min' },
  { slug: 'rouage', titre: "Le Rouage (Train d'engrenages)", description: "La transmission de l'énergie, les calculs de rapports et les différents types de roues.", icon: <Cog className="w-7 h-7 text-blue-600 dark:text-blue-400" />, tag: 'fondamental', readTime: '25 min' },
  { slug: 'echappement-ancre', titre: "L'Échappement à Ancre Suisse", description: "L'organe de distribution : son rôle, ses composants et le cycle des phases.", icon: <Zap className="w-7 h-7 text-purple-600 dark:text-purple-300" />, tag: 'avancé', readTime: '30 min' },
  { slug: 'balancier-spiral', titre: "Le Balancier-Spiral", description: "Le régulateur de temps : oscillations, réglage de la précision et matériaux modernes.", icon: <Settings2 className="w-7 h-7 text-green-600 dark:text-green-300" />, tag: 'avancé', readTime: '35 min' },
  { slug: 'remontage', titre: "Le Remontage", description: "Systèmes manuels et automatiques, la couronne et le mécanisme de remontage.", icon: <RotateCw className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />, tag: 'pratique', readTime: '20 min' },
];
const pagesMateriaux: PageItem[] = [{ slug: 'materiaux', titre: "Matériaux en Horlogerie", description: "Aciers, métaux précieux, titane, céramiques, silicium... Découvrez leurs usages.", icon: <Gem className="w-7 h-7 text-yellow-500 dark:text-yellow-400" />, tag: 'culture', readTime: '40 min' }];
const pagesMouvement: PageItem[] = [{ slug: 'mouvements', titre: "Architecture du Mouvement", description: "Platine, ponts, viroles, decoration : comprendre la structure d'un calibre.", icon: <Boxes className="w-7 h-7 text-slate-600 dark:text-slate-300" />, tag: 'fondamental', readTime: '25 min' }];
const pagesHistoireCulture: PageItem[] = [{ slug: 'histoire-horlogerie-suisse', titre: "Histoire de l'Horlogerie Suisse", description: "Des origines à nos jours : l'établissage, les crises, et l'essor du Made in Switzerland.", icon: <Book className="w-7 h-7 text-amber-600 dark:text-amber-400" />, tag: 'culture', readTime: '30 min' }];
const pagesManufactures: PageItem[] = [{ slug: 'manufactures', titre: "Grandes Manufactures Suisses", description: "Patek Philippe, Rolex, Audemars Piguet... Histoire, innovations et savoir-faire unique.", icon: <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />, tag: 'culture', readTime: '45 min' }];
const pagesComplications: PageItem[] = [{ slug: 'complications', titre: "Complications Horlogères", description: "Chronographe, quantième perpétuel, tourbillon, sonnerie : explications des mécanismes.", icon: <Watch className="w-7 h-7 text-purple-600 dark:text-purple-400" />, tag: 'avancé', readTime: '50 min' }];
const pagesTechnologies: PageItem[] = [{ slug: 'technologies', titre: "Technologies Modernes", description: "Quartz, co-axial, montres connectées et les matériaux de demain.", icon: <Cpu className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />, tag: 'avancé', readTime: '35 min' }];
const pagesEntretien: PageItem[] = [{ slug: 'entretien', titre: "Entretien & Maintenance", description: "Guide pratique : révision, diagnostic, huiles et outils de l'horloger.", icon: <Wrench className="w-7 h-7 text-orange-600 dark:text-orange-400" />, tag: 'pratique', readTime: '40 min' }];
const pagesLecturePlan: PageItem[] = [{ slug: 'lecture-de-plan', titre: "Lecture de Plans Horlogers", description: "Maîtriser les vues techniques, le cartouche, les tolérances et les normes (ISO/NIHS).", icon: <BookOpen className="w-7 h-7 text-slate-700 dark:text-slate-200" />, tag: 'pratique', readTime: '30 min' }];


// Composant pour une section animée
const AnimatedSection: React.FC<{ id: string; title: string; children: React.ReactNode; color: string }> = ({ id, title, children, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  return (
    <section 
      ref={ref}
      id={id}
      className={`mb-16 scroll-mt-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      aria-labelledby={`heading-${id}`}
    >
      <h2 className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400 mb-6`}>
        {title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  );
};


// Composant principal
export default function TheoriePage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [animatingHeart, setAnimatingHeart] = useState<string | null>(null);

  const allSections = [
    { id: 'fonctionnement', title: '⚙️ Mécanismes', pages: pagesFonctionnement, color: 'blue' },
    { id: 'materiaux', title: '🧱 Matériaux', pages: pagesMateriaux, color: 'yellow' },
    { id: 'mouvement', title: '🏗️ Architecture', pages: pagesMouvement, color: 'slate' },
    { id: 'manufactures', title: '🏛️ Manufactures', pages: pagesManufactures, color: 'indigo' },
    { id: 'complications', title: '🌀 Complications', pages: pagesComplications, color: 'purple' },
    { id: 'technologies', title: '🔬 Technologies', pages: pagesTechnologies, color: 'cyan' },
    { id: 'entretien', title: '🔧 Pratique', pages: pagesEntretien, color: 'orange' },
    { id: 'histoire', title: '📚 Culture', pages: pagesHistoireCulture, color: 'amber' },
    { id: 'plans', title: '📐 Plans', pages: pagesLecturePlan, color: 'slate' }
  ];

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => 
      prev.includes(slug) 
        ? prev.filter(item => item !== slug)
        : [...prev, slug]
    );
    // Déclenche l'animation du cœur
    setAnimatingHeart(slug);
    setTimeout(() => setAnimatingHeart(null), 800); // Durée de l'animation
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      if (shouldShow !== showScrollTop) {
        setShowScrollTop(shouldShow);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollTop]);

  const getTagColor = (tag?: string) => {
    switch (tag) {
      case 'fondamental': return 'text-blue-700 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
      case 'avancé': return 'text-purple-700 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300';
      case 'pratique': return 'text-orange-700 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-300';
      case 'culture': return 'text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const filteredSections = allSections.map(section => ({
    ...section,
    pages: section.pages.filter(page =>
      page.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.pages.length > 0);

  return (
    <>
      <style>{customStyles}</style>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Accueil
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <nav className="bg-blue-50 dark:bg-slate-800 py-3 px-4 border-b border-blue-100 dark:border-slate-700">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Vous êtes ici : 
              <span className="font-medium text-blue-600 dark:text-blue-400"> Centre de ressources théoriques</span>
            </p>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Hero section */}
          <section className="text-center mb-12 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Centre de Ressources Horlogères
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Explorez notre bibliothèque de connaissances pour approfondir votre compréhension de l'horlogerie suisse. 
              Des bases de la mécanique aux complications les plus complexes, trouvez ici l'information que vous cherchez.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un article, un terme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </section>

          {/* Table of contents */}
          {!searchTerm && (
            <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-12 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                📚 Explorer par thématique
              </h2>
              <nav className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {allSections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-150 transform active:scale-95 hover:shadow-md"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <span className="block text-sm font-medium text-slate-900 dark:text-white">
                      {section.title}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {section.pages.length} article{section.pages.length > 1 ? 's' : ''}
                    </span>
                  </button>
                ))}
              </nav>
            </section>
          )}

          {/* Sections content */}
          {filteredSections.length > 0 ? (
            filteredSections.map((section, sectionIndex) => (
              <AnimatedSection key={section.id} id={section.id} title={section.title} color={section.color}>
                {section.pages.map((page, pageIndex) => (
                  <article
                    key={page.slug}
                    className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{animationDelay: `${pageIndex * 0.1}s`}}
                  >
                    <Link href={`/theorie/${page.slug}`} className="block p-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500"></div>
                      <div className="relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200">
                            {page.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(page.slug);
                              }}
                              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-150"
                            >
                              <Heart 
                                className={`w-5 h-5 transition-colors duration-200 ${
                                  favorites.includes(page.slug) 
                                    ? 'fill-red-500 text-red-500' 
                                    : 'text-slate-400 hover:text-red-500'
                                } ${animatingHeart === page.slug ? 'animate-heartbeat' : ''}`} 
                              />
                            </button>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {page.titre}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                          {page.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {page.tag && (
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getTagColor(page.tag)}`}>
                                {page.tag}
                              </span>
                            )}
                            {page.readTime && (
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {page.readTime} de lecture
                              </span>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </AnimatedSection>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">Aucun article trouvé pour "{searchTerm}".</p>
            </div>
          )}

          {/* Section "Pour aller plus loin" */}
          <section className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 p-8 rounded-xl mt-16 animate-fadeInUp">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                🌟 Pour aller plus loin
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Vous souhaitez mettre en pratique ces connaissances ? Découvrez nos guides pratiques, 
                nos fiches techniques ou explorez les outils interactifs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/outils"
                  className="ripple inline-flex items-center justify-center px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-all duration-150 transform active:scale-95 shadow-md"
                >
                  <Cog className="w-5 h-5 mr-2" />
                  Outils & Calculatrices
                </Link>
                <Link 
                  href="/lexique"
                  className="ripple inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-150 transform active:scale-95 shadow-md border border-slate-300 dark:border-slate-600"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lexique Horloger
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Mobile menu */}
        <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setMobileMenuOpen(false)} />
          <nav className={`fixed right-0 top-0 h-full w-80 bg-white dark:bg-slate-900 shadow-xl p-6 overflow-y-auto transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Navigation</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <ul className="space-y-3">
              {allSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-150 transform active:scale-95"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-150 transform active:scale-110 z-40 ${showScrollTop ? 'animate-bounce-once' : ''}`}
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </main>
    </>
  );
}
