'use client';

import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { 
  Clock, Gauge, Zap, Settings2, RotateCw, Book, Building2, Watch, Cpu, Wrench, Boxes, Gem, ChevronLeft, BookOpen, Cog
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES (TypeScript strict)
// ─────────────────────────────────────────────────────────────────────────────

interface Card {
  slug: string;
  titre: string;
  description: string;
  icon: React.ReactNode;
  tags?: string[];
  time?: string;
}

interface Section {
  id: string;
  title: string;
  cards: Card[];
}

// ─────────────────────────────────────────────────────────────────────────────
// DONNÉES (Source unique de vérité)
// ─────────────────────────────────────────────────────────────────────────────

const sections: Section[] = [
  {
    id: 'fonctionnement',
    title: "⚙️ Les Fondamentaux Mécaniques",
    cards: [
      {
        slug: 'introduction-montre-mecanique',
        titre: "Premiers Pas en Horlogerie",
        description: "Comprendre le cœur battant d'une montre mécanique : les grands principes qui font tic-tac.",
        icon: <Clock className="w-7 h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
        tags: ["Basics", "Mécanique"],
        time: "6 min"
      },
      {
        slug: 'barillet-ressort-moteur',
        titre: "Le Barillet : Source de Vie",
        description: "Cette petite boîte qui emmagasine l'énergie et la restitue pendant des heures.",
        icon: <Gauge className="w-7 h-7 text-yellow-600 dark:text-yellow-300" aria-hidden="true" />,
        tags: ["Énergie"],
        time: "8 min"
      },
      {
        slug: 'rouage',
        titre: "Le Rouage, Poème de Précision",
        description: "Un train d'engrenages où chaque dent compte. La magie des rapports de transmission.",
        icon: <Cog className="w-7 h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />,
        tags: ["Transmission"],
        time: "10 min"
      },
      {
        slug: 'echappement-ancre',
        titre: "L'Échappement : Cœur du Chronométrage",
        description: "Le régulateur suisse par excellence. Comprendre ce distributeur d'énergie millimétrique.",
        icon: <Zap className="w-7 h-7 text-purple-600 dark:text-purple-300" aria-hidden="true" />,
        tags: ["Ancre"],
        time: "12 min"
      },
      {
        slug: 'balancier-spiral',
        titre: "Balancier-Spiral : L'Âme Oscillante",
        description: "Cette roue qui danse et ce ressort qui chante. Le secret de la précision horlogère.",
        icon: <Settings2 className="w-7 h-7 text-green-600 dark:text-green-300" aria-hidden="true" />,
        tags: ["Réglage"],
        time: "15 min"
      },
      {
        slug: 'remontage',
        titre: "Le Remontage : De la main au poignet",
        description: "Manuel ou automatique ? Deux philosophies pour une même mission.",
        icon: <RotateCw className="w-7 h-7 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />,
        tags: ["Pratique"],
        time: "7 min"
      },
    ]
  },
  {
    id: 'materiaux',
    title: "🧱 L'Art des Matériaux",
    cards: [
      {
        slug: '/theorie/materiaux',
        titre: "Matières d'Exception",
        description: "De l'acier au céramique en passant par l'or rouge : ce qui fait la noblesse d'une montre.",
        icon: <Gem className="w-7 h-7 text-yellow-500 dark:text-yellow-400" aria-hidden="true" />,
        tags: ["Alliages"],
        time: "9 min"
      },
    ]
  },
  {
    id: 'mouvement',
    title: "🏗️ L'Architecture Cachée",
    cards: [
      {
        slug: 'mouvements',
        titre: "Platines & Ponts : La Squelette",
        description: "Quand la structure devient esthétique. Voyage au cœur du mouvement suisse.",
        icon: <Boxes className="w-7 h-7 text-slate-600 dark:text-slate-300" aria-hidden="true" />,
        tags: ["Architecture"],
        time: "11 min"
      },
    ]
  },
  {
    id: 'manufactures',
    title: "🏛️ Légendes du Jura",
    cards: [
      {
        slug: 'manufactures',
        titre: "Manufactures qui ont fait l'Histoire",
        description: "Patek, Rolex, Audemars... Pas des marques, des épopées humaines et techniques.",
        icon: <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
        tags: ["Histoire"],
        time: "18 min"
      },
    ]
  },
  {
    id: 'complications',
    title: "🌀 Les Grandes Complications",
    cards: [
      {
        slug: 'complications',
        titre: "Quand la Montre devient Œuvre d'Art",
        description: "Chronographe, quantième, tourbillon... La folie des grandeurs horlogères.",
        icon: <Watch className="w-7 h-7 text-purple-600 dark:text-purple-400" aria-hidden="true" />,
        tags: ["Mécanismes"],
        time: "22 min"
      },
    ]
  },
  {
    id: 'technologies',
    title: "🔬 Innovations & Avant-garde",
    cards: [
      {
        slug: 'technologies',
        titre: "De l'Electronique au Silicium",
        description: "Quartz, matériaux high-tech et la révolution silicium dans l'horlogerie suisse.",
        icon: <Cpu className="w-7 h-7 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />,
        tags: ["Silicium"],
        time: "13 min"
      },
    ]
  },
  {
    id: 'entretien',
    title: "🔧 L'Atelier des Artisans",
    cards: [
      {
        slug: 'entretien',
        titre: "Gestion d'un Atelier d'Entretien",
        description: "Les secrets du remontoir : diagnostic, révision, rituel du remontage manuel.",
        icon: <Wrench className="w-7 h-7 text-orange-600 dark:text-orange-400" aria-hidden="true" />,
        tags: ["Réparation"],
        time: "25 min"
      },
    ]
  },
  {
    id: 'histoire',
    title: "📚 Chroniques du Temps",
    cards: [
      {
        slug: 'histoire-horlogerie-suisse',
        titre: "Le Long Chemin du Comptoir",
        description: "Depuis les établissages du 16e siècle jusqu'aux crises qui forgent les légendes.",
        icon: <Book className="w-7 h-7 text-amber-600 dark:text-amber-400" aria-hidden="true" />,
        tags: ["Patrimoine"],
        time: "16 min"
      },
    ]
  },
  {
    id: 'lecture',
    title: "📐 Le Language Technique",
    cards: [
      {
        slug: 'lecture-de-plan',
        titre: "Lire comme un Horloger",
        description: "Comprendre les plans NIHS, les cotations et le langage secret des dessins techniques.",
        icon: <BookOpen className="w-7 h-7 text-slate-700 dark:text-slate-200" aria-hidden="true" />,
        tags: ["Normes"],
        time: "14 min"
      },
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS (Optimisés avec React.memo)
// ─────────────────────────────────────────────────────────────────────────────

const Card = memo(({ card }: { card: Card }) => {
  const baseUrl = '/theorie';
  const href = card.slug.startsWith('/') ? card.slug : `${baseUrl}/${card.slug}`;

  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
    >
      {/* Tags */}
      {card.tags && (
        <div className="flex gap-2 mb-3">
          {card.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-colors">
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      {/* Contenu principal */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg transition-colors group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">
          {card.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {card.titre}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>

      {/* Méta */}
      {card.time && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Clock className="w-3 h-3" aria-hidden="true" />
          <span>{card.time}</span>
        </div>
      )}
    </Link>
  );
});
Card.displayName = 'Card';

const Section = memo(({ section }: { section: Section }) => (
  <section id={section.id} className="mb-16 scroll-mt-24">
    <h2 className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 mb-5 pb-2 border-b border-slate-200 dark:border-slate-700">
      {section.title}
    </h2>
    <div className="grid md:grid-cols-2 gap-5">
      {section.cards.map(card => (
        <Card key={card.slug} card={card} />
      ))}
    </div>
  </section>
));
Section.displayName = 'Section';

// ─────────────────────────────────────────────────────────────────────────────
// PAGE PRINCIPALE (Component principal optimisé)
// ─────────────────────────────────────────────────────────────────────────────

export default function TheoriePage() {
  const memorizedSections = useMemo(() => sections, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 font-serif">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
            aria-label="Retour à l'accueil"
          >
            <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
            retour
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-slate-900 dark:text-white mb-4 tracking-tight">
            Théorie Horlogère Suisse
          </h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Ressources pour apprentis horlogers et passionnés. Un savoir-faire suisse, partagé.
          </p>
        </div>

        {/* Sections */}
        {memorizedSections.map(section => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-24 py-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Passionnément horloger depuis 2024
          </p>
        </div>
      </footer>
    </main>
  );
}
