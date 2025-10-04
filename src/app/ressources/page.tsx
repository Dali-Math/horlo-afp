'use client';
import { useState } from 'react';
import HeroSection from './HeroSection';
import FiltersBar from './FiltersBar';
import ResourceCard from './ResourceCard';
import ExternalLinksCTA from './ExternalLinksCTA';

type Category = 'all' | 'technique' | 'historique' | 'glossaire' | 'pdf' | 'externe';
type ActionType = 'internal' | 'external' | 'download';

interface Resource {
  id: number;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: string;
  actionType: ActionType;
  link: string;
}

export default function RessourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Complete resources data with hybrid action types
  const resources: Resource[] = [
    {
      id: 1,
      category: 'technique',
      title: 'Guide du chronographe',
      description: 'Découvrez le fonctionnement du chronographe mécanique, un mécanisme emblématique de l\'horlogerie.',
      buttonText: 'Lire l\'article',
      buttonIcon: '📖',
      actionType: 'internal',
      link: '/ressources/chronographe',
    },
    {
      id: 2,
      category: 'historique',
      title: 'Les grandes maisons suisses',
      description: "Article retraçant l'évolution des manufactures horlogères depuis le XIXe siècle.",
      buttonText: "Lire l'article",
      buttonIcon: '📖',
      actionType: 'internal',
      link: '/ressources/maisons-suisses',
    },
    {
      id: 3,
      category: 'glossaire',
      title: '100 termes essentiels',
      description: "Dictionnaire officiel de la Fondation de la Haute Horlogerie.",
      buttonText: 'Consulter',
      buttonIcon: '🔍',
      actionType: 'external',
      link: 'https://www.hautehorlogerie.org/fr/encyclopedie/dictionnaire/',
    },
    {
      id: 4,
      category: 'pdf',
      title: 'Planche de démontage calibre ETA',
      description: 'Document PDF haute résolution pour les étudiants AFP.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      actionType: 'download',
      link: '/docs/planche-demontage-eta.pdf',
    },
    {
      id: 5,
      category: 'externe',
      title: 'Archives FHH',
      description: "Liens vers des documents et catalogues d'époque (Fondation Haute Horlogerie).",
      buttonText: 'Visiter le site',
      buttonIcon: '🌍',
      actionType: 'external',
      link: 'https://www.hautehorlogerie.org/fr/fondation/',
    },
    {
      id: 6,
      category: 'technique',
      title: 'Termes techniques essentiels',
      description: 'Glossaire complet des termes techniques de l\'horlogerie pour débutants et professionnels.',
      buttonText: 'Lire l\'article',
      buttonIcon: '📖',
      actionType: 'internal',
      link: '/ressources/termes-techniques',
    },
    {
      id: 7,
      category: 'pdf',
      title: 'Guide PDF du chronographe',
      description: 'Téléchargez le guide complet du chronographe au format PDF.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      actionType: 'download',
      link: '/docs/guide-chronographe.pdf',
    },
  ];

  // Filter resources based on selected category
  const filteredResources =
    selectedCategory === 'all'
      ? resources
      : resources.filter((resource) => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Filters Bar */}
      <FiltersBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Resources Grid */}
      <section
        id="resources-list"
        className="max-w-7xl mx-auto px-6 py-16"
        role="region"
        aria-label="Liste des ressources"
      >
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                category={resource.category}
                title={resource.title}
                description={resource.description}
                buttonText={resource.buttonText}
                buttonIcon={resource.buttonIcon}
                actionType={resource.actionType}
                link={resource.link}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              Aucune ressource trouvée dans cette catégorie.
            </p>
          </div>
        )}
      </section>

      {/* External Links & CTA Section */}
      <ExternalLinksCTA />
    </div>
  );
}
