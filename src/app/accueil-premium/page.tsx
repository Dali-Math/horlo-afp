// app/page.tsx
'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Palette, Code, Smartphone, Accessibility, Sun, Moon, 
  Watch, Museum, PlayCircle, Timeline, Architecture, HistoryEdu, 
  IntegrationInstructions, AutoAwesome, TouchApp, Visibility, Speed,
  Contrast, SpaceBar, Highlight, Devices, TextFields, Description,
  CheckCircle, Download, Copy
} from 'lucide-react';

// ==========================================
// 1. TYPES ET CONTEXTES
// ==========================================

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

// ==========================================
// 2. COMPOSANTS RÉUTILISABLES
// ==========================================

const FadeIn = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const Card = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  children, 
  className = '' 
}: { 
  icon: any; 
  title: string; 
  subtitle?: string; 
  children?: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 hover:bg-white/15 ${className}`}
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-yellow-400 mr-4" />
      <h3 className="font-semibold text-xl text-gray-100">{title}</h3>
    </div>
    {subtitle && <p className="text-gray-400 text-sm mb-4 ml-12">{subtitle}</p>}
    {children}
  </motion.div>
);

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start mb-3 text-lg">
    <CheckCircle className="w-5 h-5 text-sky-400 mr-3 mt-1 flex-shrink-0" />
    <span className="text-gray-200">{children}</span>
  </li>
);

const CodeBlock = ({ code }: { code: string }) => (
  <div className="bg-black/30 rounded-lg p-4 mt-4 font-mono text-sm text-sky-400 overflow-hidden">
    <div className="flex justify-between mb-2 border-b border-white/10 pb-2">
      <span className="text-gray-200 font-semibold">page.tsx</span>
      <div className="flex gap-2">
        <Copy className="w-4 h-4 cursor-pointer hover:text-yellow-400" />
        <Download className="w-4 h-4 cursor-pointer hover:text-yellow-400" />
      </div>
    </div>
    <pre className="whitespace-pre-wrap overflow-hidden">{code}</pre>
  </div>
);

// ==========================================
// 3. COMPOSANTS SPÉCIFIQUES
// ==========================================

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/10 border-2 border-yellow-400 rounded-full px-5 py-2 flex items-center gap-2 hover:bg-yellow-400/20 transition-colors"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-yellow-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
      <span className="text-gray-100 font-medium">
        {theme === 'dark' ? 'Sombre' : 'Clair'}
      </span>
    </motion.button>
  );
};

const TimelineHorlogerie = () => {
  const timelineData = [
    { year: '1510', event: 'Première montre portable', icon: '⌚' },
    { year: '1675', event: 'Spiral réglant', icon: '🔁' },
    { year: '1770', event: 'Montres automatiques', icon: '🌀' },
    { year: '1969', event: 'Montre-bracelet automatique', icon: '⚙️' },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 pb-4">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-lg p-4 min-w-max hover:bg-white/10 transition-colors"
          >
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-bold text-yellow-400 text-lg">{item.year}</div>
            <div className="text-gray-300 text-sm">{item.event}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MuseesGrid = () => {
  const musees = [
    { name: 'Musée international d\'horlogerie', city: 'La Chaux-de-Fonds' },
    { name: 'Patek Philippe Museum', city: 'Genève' },
    { name: 'Musée d\'horlogerie du Locle', city: 'Le Locle' },
    { name: 'Omega Museum', city: 'Biel/Bienne' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {musees.map((musee, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Museum className="w-6 h-6 text-yellow-400 mb-2" />
          <h4 className="font-semibold text-gray-100">{musee.name}</h4>
          <p className="text-gray-400 text-sm">{musee.city}</p>
        </motion.div>
      ))}
    </div>
  );
};

const VideosGrid = () => {
  const videos = [
    { title: 'Naissance d\'une Rolex', type: 'Documentaire' },
    { title: 'Complications horlogères', type: 'Tutoriel' },
    { title: 'Manufacture Patek Philippe', type: 'Visite' },
    { title: 'Histoire de l\'horlogerie', type: 'Cours' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {videos.map((video, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <PlayCircle className="w-6 h-6 text-yellow-400 mb-2" />
          <h4 className="font-semibold text-gray-100">{video.title}</h4>
          <p className="text-gray-400 text-sm">{video.type}</p>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// 4. COMPOSANT PRINCIPAL
// ==========================================

export default function SwissWatchesPage() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        
        {/* SLIDE 1: Référence Mondiale */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/swiss-watch-mechanism/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row items-center gap-16">
            <FadeIn className="lg:w-3/5">
              <h1 className="font-oswald text-6xl font-bold mb-6 leading-tight">
                Référence Mondiale en <span className="text-yellow-400">Horlogerie Suisse</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Transformer votre page en une référence absolue pour l'horlogerie suisse avec une expérience utilisateur immersive et un mode sombre/clair intégré
              </p>
            </FadeIn>
            <FadeIn className="lg:w-2/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card icon={Clock} title="Excellence Suisse" subtitle="Tradition et innovation" />
                <Card icon={Sun} title="Mode Sombre/Clair" subtitle="Expérience adaptative" />
                <Card icon={AutoAwesome} title="Design Premium" subtitle="Élégance et modernité" />
                <Card icon={Globe} title="Référence Mondiale" subtitle="Portée internationale" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* SLIDE 2: Structure de la page */}
        <section className="relative min-h-screen flex flex-col py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/swiss-watch-mechanism-dark/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex-1">
            <FadeIn>
              <h2 className="font-oswald text-4xl font-bold mb-4">
                Structure de la page avec <span className="text-yellow-400">mode sombre/clair intégré</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-3xl">
                Architecture moderne et adaptable pour une expérience utilisateur exceptionnelle
              </p>
            </FadeIn>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card icon={Architecture} title="Architecture de la page" subtitle="Organisation modulaire">
                  <ul className="mt-4">
                    <FeatureItem>Structure <span className="text-sky-400 font-semibold">modulaire</span> avec composants réutilisables</FeatureItem>
                    <FeatureItem>Next.js 13+ avec App Router</FeatureItem>
                    <FeatureItem>State management pour le thème</FeatureItem>
                    <FeatureItem>CSS-in-JS avec Tailwind CSS</FeatureItem>
                  </ul>
                </Card>
                <Card icon={ViewQuilt} title="Organisation des sections" subtitle="Layout responsive">
                  <ul className="mt-4">
                    <FeatureItem>En-tête avec navigation adaptative</FeatureItem>
                    <FeatureItem>Timeline interactive des dates clés</FeatureItem>
                    <FeatureItem>Grille responsive pour musées et vidéos</FeatureItem>
                    <FeatureItem>Pied de page avec citation inspirante</FeatureItem>
                  </ul>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card icon={DarkMode} title="Mode Sombre/Clair" subtitle="Expérience utilisateur">
                  <ul className="mt-4">
                    <FeatureItem>Détection automatique du système</FeatureItem>
                    <FeatureItem>Transition fluide entre thèmes</FeatureItem>
                    <FeatureItem>Stockage local des préférences</FeatureItem>
                    <FeatureItem>Palette de couleurs optimisée</FeatureItem>
                  </ul>
                  <div className="flex justify-center mt-6">
                    <ThemeToggle />
                  </div>
                </Card>
                <Card icon={IntegrationInstructions} title="Intégration complète" subtitle="Déploiement simple">
                  <ul className="mt-4">
                    <FeatureItem>Code <span className="text-sky-400 font-semibold">100% intégré</span> dans page.tsx</FeatureItem>
                    <FeatureItem>Sans dépendances externes problématiques</FeatureItem>
                    <FeatureItem>Optimisé pour les performances</FeatureItem>
                    <FeatureItem>Compatible avec tous navigateurs</FeatureItem>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 3: Composants React */}
        <section className="relative min-h-screen flex flex-col py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/swiss-watch-components/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex-1">
            <FadeIn>
              <h2 className="font-oswald text-4xl font-bold mb-4">
                Composants React/Next.js pour l'<span className="text-yellow-400">horlogerie suisse</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Architecture modulaire et réutilisable pour une expérience immersive
              </p>
            </FadeIn>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <Card icon={Timeline} title="TimelineHorlogerie" subtitle="src/app/culture/TimelineHorlogerie.tsx">
                <div className="flex gap-2 mb-4">
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Animation</span>
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Interactive</span>
                </div>
                <ul className="mt-4">
                  <FeatureItem>Timeline horizontale <span className="text-sky-400 font-semibold">animée</span></FeatureItem>
                  <FeatureItem>Défilement fluide et responsive</FeatureItem>
                  <FeatureItem>Grandes dates de l'horlogerie</FeatureItem>
                </ul>
                <CodeBlock code="{timelineData.map((item, index) => (<TimelineCard key={index} {...item} />))}" />
              </Card>

              <Card icon={HistoryEdu} title="HistoireHorlogerie" subtitle="src/app/culture/HistoireHorlogerie.tsx">
                <div className="flex gap-2 mb-4">
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Culture</span>
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Références</span>
                </div>
                <ul className="mt-4">
                  <FeatureItem>Ressources <span className="text-sky-400 font-semibold">encyclopédiques</span></FeatureItem>
                  <FeatureItem>Timeline verticale intégrée</FeatureItem>
                  <FeatureItem>Liens vers références externes</FeatureItem>
                </ul>
                <CodeBlock code="<FadeIn><HistoireContent /></FadeIn>" />
              </Card>

              <Card icon={Museum} title="MuséesHorlogerie" subtitle="src/app/culture/MuseesHorlogerie.tsx">
                <div className="flex gap-2 mb-4">
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Grille</span>
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Responsive</span>
                </div>
                <ul className="mt-4">
                  <FeatureItem>Grille <span className="text-sky-400 font-semibold">2 colonnes</span> responsive</FeatureItem>
                  <FeatureItem>Cartes avec icônes et liens</FeatureItem>
                  <FeatureItem>Musées suisses de référence</FeatureItem>
                </ul>
                <CodeBlock code="<GridContainer>{musees.map(musee => <MuseeCard {...musee} />)}</GridContainer>" />
              </Card>

              <Card icon={PlayCircle} title="VideosHorlogerie" subtitle="src/app/culture/VideosHorlogerie.tsx">
                <div className="flex gap-2 mb-4">
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Multimédia</span>
                  <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Intégration</span>
                </div>
                <ul className="mt-4">
                  <FeatureItem>Cartes YouTube/RTS avec <span className="text-sky-400 font-semibold">miniatures</span></FeatureItem>
                  <FeatureItem>Documentaires et tutoriels</FeatureItem>
                  <FeatureItem>Effets de survol élégants</FeatureItem>
                </ul>
                <CodeBlock code="<VideoCard thumbnail={thumbnail} title={title} url={url} />" />
              </Card>
            </div>
          </div>
        </section>

        {/* SLIDE 4: Implémentation du thème */}
        <section className="relative min-h-screen flex flex-col py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/dark-light-mode-watch/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex-1">
            <FadeIn>
              <h2 className="font-oswald text-4xl font-bold mb-4">
                Implémentation du <span className="text-yellow-400">mode sombre/clair</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Techniques et meilleures pratiques pour une expérience utilisateur fluide
              </p>
            </FadeIn>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card icon={Code} title="Structure du thème" subtitle="Gestion d'état">
                  <ul className="mt-4">
                    <FeatureItem>Contexte React pour <span className="text-sky-400 font-semibold">gestion d'état</span></FeatureItem>
                    <FeatureItem>Détection automatique du système</FeatureItem>
                    <FeatureItem>Persistance avec localStorage</FeatureItem>
                    <FeatureItem>CSS variables pour transitions fluides</FeatureItem>
                  </ul>
                  <CodeBlock code={`const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});`} />
                </Card>
                
                <Card icon={Palette} title="Palette de couleurs" subtitle="Accessibilité">
                  <ul className="mt-4">
                    <FeatureItem>Contraste optimal pour <span className="text-sky-400 font-semibold">accessibilité</span></FeatureItem>
                    <FeatureItem>Cohérence visuelle entre thèmes</FeatureItem>
                  </ul>
                  <div className="flex gap-3 mt-4">
                    <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center text-xs font-bold text-gray-100">#0a0a0a</div>
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-900">#f3f4f6</div>
                    <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center text-xs font-bold text-gray-900">#facc15</div>
                    <div className="w-16 h-16 bg-sky-400 rounded-lg flex items-center justify-center text-xs font-bold text-gray-900">#38bdf8</div>
                  </div>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card icon={IntegrationInstructions} title="Intégration Next.js" subtitle="SSR compatible">
                  <ul className="mt-4">
                    <FeatureItem>App Router avec <span className="text-sky-400 font-semibold">layout.tsx</span></FeatureItem>
                    <FeatureItem>CSS-in-JS avec Tailwind CSS</FeatureItem>
                    <FeatureItem>Classes conditionnelles dynamiques</FeatureItem>
                    <FeatureItem>SSR compatible avec thème client</FeatureItem>
                  </ul>
                  <CodeBlock code={`// Tailwind config
darkMode: ['class', '[data-theme="dark"]'],

// Component usage
className={\`bg-\${theme === 'dark' ? 'gray-900' : 'white'}\`}`} />
                </Card>
                
                <Card icon={AutoAwesome} title="Composant de bascule" subtitle="UI/UX">
                  <ul className="mt-4">
                    <FeatureItem>Icônes adaptatifs <span className="text-sky-400 font-semibold">lucide-react</span></FeatureItem>
                    <FeatureItem>Animation de transition fluide</FeatureItem>
                    <FeatureItem>Positionnement stratégique</FeatureItem>
                  </ul>
                  <div className="flex justify-center gap-4 mt-6">
                    <div className="bg-white/10 border-2 border-yellow-400 rounded-full px-5 py-2 flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-100">Clair</span>
                    </div>
                    <div className="bg-white/10 border-2 border-yellow-400 rounded-full px-5 py-2 flex items-center gap-2">
                      <Moon className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-100">Sombre</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 5: Meilleures pratiques UX */}
        <section className="relative min-h-screen flex flex-col py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/luxury-swiss-watch-experience/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex-1">
            <FadeIn>
              <h2 className="font-oswald text-4xl font-bold mb-4">
                Meilleures pratiques pour une expérience <span className="text-yellow-400">immersive</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Conseils pour créer une interface engageante qui met en valeur l'horlogerie suisse
              </p>
            </FadeIn>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card icon={TouchApp} title="Interactivité et engagement" subtitle="Micro-interactions">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Micro-interactions</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Animations fluides</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Feedback immédiat</span>
                  </div>
                  <ul className="mt-4">
                    <FeatureItem>Transitions <span className="text-sky-400 font-semibold">subtiles</span> entre sections</FeatureItem>
                    <FeatureItem>Éléments interactifs au survol</FeatureItem>
                    <FeatureItem>Performance optimisée (60fps)</FeatureItem>
                  </ul>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-black/30 rounded-lg p-4 text-center">
                      <TouchApp className="w-7 h-7 text-yellow-400 mb-2 mx-auto" />
                      <h4 className="font-semibold mb-1">Gestes</h4>
                      <p className="text-gray-400 text-sm">Swipe pour timeline</p>
                    </div>
                    <div className="bg-black/30 rounded-lg p-4 text-center">
                      <ZoomIn className="w-7 h-7 text-yellow-400 mb-2 mx-auto" />
                      <h4 className="font-semibold mb-1">Zoom</h4>
                      <p className="text-gray-400 text-sm">Détails des montres</p>
                    </div>
                  </div>
                </Card>
                
                <Card icon={Visibility} title="Hiérarchie visuelle" subtitle="Design system">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Contraste</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Équilibre</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Focalisation</span>
                  </div>
                  <ul className="mt-4">
                    <FeatureItem>Typographie <span className="text-sky-400 font-semibold">hiérarchisée</span></FeatureItem>
                    <FeatureItem>Espace blanc stratégique</FeatureItem>
                    <FeatureItem>Points focaux intentionnels</FeatureItem>
                  </ul>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card icon={Smartphone} title="Design responsive" subtitle="Mobile-first">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Mobile-first</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Adaptatif</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Cohérent</span>
                  </div>
                  <ul className="mt-4">
                    <FeatureItem>Expérience <span className="text-sky-400 font-semibold">optimisée</span> tous écrans</FeatureItem>
                    <FeatureItem>Navigation adaptative</FeatureItem>
                    <FeatureItem>Images responsives optimisées</FeatureItem>
                  </ul>
                </Card>
                
                <Card icon={Accessibility} title="Accessibilité et inclusion" subtitle="WCAG 2.1">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">WCAG 2.1</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Navigation clavier</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Lecture d'écran</span>
                  </div>
                  <ul className="mt-4">
                    <FeatureItem>Contraste de couleurs <span className="text-sky-400 font-semibold">optimal</span></FeatureItem>
                    <FeatureItem>Textes redimensionnables</FeatureItem>
                    <FeatureItem>Descriptions alternatives riches</FeatureItem>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 6: Code complet */}
        <section className="relative min-h-screen flex flex-col py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center filter brightness-30"
            style={{ backgroundImage: 'url(https://picsum.photos/seed/swiss-watch-code-integration/1280/720.jpg)' }}
          />
          <div className="relative z-10 max-w-7xl mx-auto px-8 flex-1">
            <FadeIn>
              <h2 className="font-oswald text-4xl font-bold mb-4">
                Code complet intégré dans un seul <span className="text-yellow-400">page.tsx</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Solution optimisée pour créer une référence mondiale en horlogerie suisse
              </p>
            </FadeIn>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Card icon={Architecture} title="Structure du fichier" subtitle="Monolithe intelligent">
                  <div className="flex gap-2 mb-4">
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Modulaire</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Auto-contenu</span>
                    <span className="bg-sky-400/20 text-sky-400 px-3 py-1 rounded-full text-sm">Optimisé</span>
                  </div>
                  <ul className="mt-4">
                    <FeatureItem>Composants <span className="text-sky-400 font-semibold">internes</span> au fichier</FeatureItem>
                    <FeatureItem>Gestion du thème intégrée</FeatureItem>
                    <FeatureItem>Aucune dépendance externe problématique</FeatureItem>
                    <FeatureItem>Performance et SEO optimisés</FeatureItem>
                  </ul>
                  <div className="flex gap-3 mt-6">
                    <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center flex-1">
                      <Code className="w-6 h-6 text-yellow-400 mr-3" />
                      <span className="font-semibold">Next.js 13+</span>
                    </div>
                    <div className="bg-white/10 rounded-lg px-4 py-3 flex items-center flex-1">
                      <Palette className="w-6 h-6 text-yellow-400 mr-3" />
                      <span className="font-semibold">Tailwind CSS</span>
                    </div>
                  </div>
                </Card>
                
                <Card icon={IntegrationInstructions} title="Intégration simple" subtitle="Plug & Play">
                  <ul className="mt-4">
                    <FeatureItem>Remplacement <span className="text-sky-400 font-semibold">direct</span> de votre page</FeatureItem>
                    <FeatureItem>Personnalisation facile</FeatureItem>
                    <FeatureItem>Maintenance simplifiée</FeatureItem>
                  </ul>
                </Card>
              </div>
              
              <div className="space-y-8">
                <Card icon={Code} title="Extrait du code" subtitle="Aperçu complet">
                  <div className="bg-black/30 rounded-lg p-4 mt-4 font-mono text-sm text-sky-400 overflow-hidden flex-1">
                    <div className="flex justify-between mb-3 border-b border-white/10 pb-2">
                      <span className="text-gray-200 font-semibold">page.tsx</span>
                      <div className="flex gap-2">
                        <Copy className="w-4 h-4 cursor-pointer hover:text-yellow-400" />
                        <Download className="w-4 h-4 cursor-pointer hover:text-yellow-400" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">1</span><span><span className="text-pink-400">import</span> { useState, useEffect } <span className="text-pink-400">from</span> <span className="text-green-400">'react'</span>;</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">2</span><span><span className="text-pink-400">import</span> { Clock, Museum, PlayCircle, Timeline } <span className="text-pink-400">from</span> <span className="text-green-400">'lucide-react'</span>;</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">3</span><span></span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">4</span><span><span className="text-gray-500">// Thème Context</span></span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">5</span><span><span className="text-pink-400">const</span> <span className="text-blue-400">ThemeContext</span> = createContext({</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">6</span><span>  theme: <span className="text-green-400">'dark'</span>,</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">7</span><span>  <span className="text-blue-400">toggleTheme</span>: () => {}</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">8</span><span>});</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">9</span><span></span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">10</span><span><span className="text-gray-500">// Timeline Component</span></span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">11</span><span><span className="text-pink-400">const</span> <span className="text-blue-400">TimelineHorlogerie</span> = () => {</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">12</span><span>  <span className="text-pink-400">const</span> timelineData = [</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">13</span><span>    { year: <span className="text-green-400">'1510'</span>, event: <span className="text-green-400">'Première montre portable'</span>, icon: <span className="text-green-400">'⌚'</span> },</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">14</span><span>    { year: <span className="text-green-400">'1675'</span>, event: <span className="text-green-400">'Spiral réglant'</span>, icon: <span className="text-green-400">'🔁'</span> },</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">15</span><span>    <span className="text-gray-500">// ... autres données</span></span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">16</span><span>  ];</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">17</span><span>  </span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">18</span><span>  <span className="text-pink-400">return</span> (</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">19</span><span>    &lt;div className=<span className="text-green-400">"timeline-container"</span>&gt;</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">20</span><span>      {timelineData.<span className="text-blue-400">map</span>((item, index) =&gt; (</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">21</span><span>        &lt;TimelineCard key={index} {...item} /&gt;</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">22</span><span>      ))}</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">23</span><span>    &lt;/div&gt;</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">24</span><span>  );</span></div>
                      <div className="flex mb-1"><span className="text-gray-500 w-8 text-right mr-4">25</span><span>};</span></div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black/50 py-12 px-8 text-center">
          <FadeIn>
            <p className="text-2xl font-oswald mb-4">
              "L'horlogerie suisse n'est pas une industrie, c'est une <span className="text-yellow-400">passion</span>"
            </p>
            <p className="text-gray-400">
              Transformez votre vision en réalité avec une expérience utilisateur d'exception
            </p>
            <div className="mt-8 flex justify-center">
              <ThemeToggle />
            </div>
          </FadeIn>
        </footer>

      </div>
    </ThemeContext.Provider>
  );
}
