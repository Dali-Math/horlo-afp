import HeroSection from './HeroSection';
import ResourceCard from './ResourceCard';

export default function RessourcesPage() {
  // Mock data for 5 resources
  const resources = [
    {
      id: 1,
      category: 'Technique',
      title: 'Guide du chronographe',
      description: 'PDF complet expliquant le fonctionnement du chronographe mécanique.',
      buttonText: 'Télécharger',
      buttonIcon: '📄',
      link: '#',
    },
    {
      id: 2,
      category: 'Historique',
      title: 'Les grandes maisons suisses',
      description: 'Article retraçant l\'évolution des manufactures horlogères depuis le XIXe siècle.',
      buttonText: 'Lire l\'article',
      buttonIcon: '🌐',
      link: '#',
    },
    {
      id: 3,
      category: 'Glossaire',
      title: '100 termes essentiels',
      description: 'Glossaire interactif des termes techniques de l\'horlogerie.',
      buttonText: 'Consulter',
      buttonIcon: '📘',
      link: '#',
    },
    {
      id: 4,
      category: 'PDF',
      title: 'Planche de démontage calibre ETA',
      description: 'Document PDF haute résolution pour les étudiants AFP.',
      buttonText: 'Télécharger',
      buttonIcon: '⬇️',
      link: '#',
    },
    {
      id: 5,
      category: 'Liens externes',
      title: 'Archives FHH',
      description: 'Liens vers des documents et catalogues d\'époque (Fondation Haute Horlogerie).',
      buttonText: 'Visiter le site',
      buttonIcon: '🌍',
      link: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <HeroSection />
      
      {/* Resources Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
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
      </section>
    </div>
  );
}
