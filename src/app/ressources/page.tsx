'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import FiltersBar from './FiltersBar';
import ResourceCard from './ResourceCard';
import ExternalLinksCTA from './ExternalLinksCTA';

type Category = 'all' | 'technique' | 'historique' | 'glossaire' | 'pdf' | 'externe';

interface Resource {
  id: number;
  category: string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: string;
  link: string;
}

export default function RessourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  // Complete resources data with various categories
  const resources: Resource[] = [
    {
      id: 1,
      category: 'technique',
      title: 'Guide du chronographe',
      description: 'PDF complet expliquant le fonctionnement du chronographe mécanique.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      link: '#',
    },
    {
      id: 2,
      category: 'historique',
      title: 'Les grandes maisons suisses',
      description: "Article retraçant l'évolution des manufactures horlogères depuis le XIXe siècle.",
      buttonText: "Lire l'article",
      buttonIcon: '🌐',
      link: '#',
    },
    {
      id: 3,
      category: 'glossaire',
      title: '100 termes essentiels',
      description: "Glossaire interactif des termes techniques de l'horlogerie.",
      buttonText: 'Consulter',
      buttonIcon: '📘',
      link: '#',
    },
    {
      id: 4,
      category: 'pdf',
      title: 'Planche de démontage calibre ETA',
      description: 'Document PDF haute résolution pour les étudiants AFP.',
      buttonText: 'Télécharger',
      buttonIcon: '⬇️',
      link: '#',
    },
    {
      id: 5,
      category: 'externe',
      title: 'Archives FHH',
      description: "Liens vers des documents et catalogues d'époque (Fondation Haute Horlogerie).",
      buttonText: 'Visiter le site',
      buttonIcon: '🌍',
      link: '#',
    },
    {
      id: 6,
      category: 'technique',
      title: 'Mécanismes de répétition',
      description: 'Analyse technique des complications sonnantes et répétitions minutes.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      link: '#',
    },
    {
      id: 7,
      category: 'historique',
      title: 'Histoire de la montre-bracelet',
      description: "De la montre de poche à la montre-bracelet moderne : une évolution fascinante.",
      buttonText: "Lire l'article",
      buttonIcon: '🌐',
      link: '#',
    },
    {
      id: 8,
      category: 'pdf',
      title: 'Schémas techniques - Calibre automatique',
      description: 'Plans détaillés des mécanismes de remontage automatique.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      link: '#',
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
            {filteredResources.map((resource, index) => (
              <ResourceCard
                key={resource.id}
                category={resource.category}
                title={resource.title}
                description={resource.description}
                buttonText={resource.buttonText}
                buttonIcon={resource.buttonIcon}
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
