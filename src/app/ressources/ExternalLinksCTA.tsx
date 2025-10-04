import Link from 'next/link';

interface ExternalLink {
  title: string;
  url: string;
  description: string;
  icon: string;
}

const externalLinks: ExternalLink[] = [
  {
    title: 'Fondation de la Haute Horlogerie (FHH)',
    url: 'https://www.hautehorlogerie.org',
    description: 'Référence mondiale pour la culture et le patrimoine horloger',
    icon: '🌐'
  },
  {
    title: 'WOSTEP',
    url: 'https://www.wostep.ch',
    description: 'Formation professionnelle en horlogerie de renommée internationale',
    icon: '📄'
  },
  {
    title: 'Ranfft Watches',
    url: 'https://www.ranfft.de/cgi-bin/bidfun-db.cgi',
    description: 'Base de données technique de calibres historiques',
    icon: '🌐'
  },
  {
    title: 'Archive.org - Horlogerie',
    url: 'https://archive.org/search.php?query=horlogerie',
    description: 'Archives numériques de documents et ouvrages horlogers',
    icon: '📄'
  },
  {
    title: 'Watch-Wiki',
    url: 'https://watch-wiki.org',
    description: 'Encyclopédie collaborative de l\'horlogerie',
    icon: '🌐'
  }
];

export default function ExternalLinksCTA() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-neutral-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Liens externes recommandés
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Enrichissez votre veille documentaire en explorant les principaux sites horlogers internationaux.
          </p>
        </div>

        {/* External Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {externalLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/20 hover:-translate-y-1"
            >
              {/* Gold glow effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:via-yellow-500/5 group-hover:to-transparent transition-all duration-300" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-3xl">{link.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                      {link.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {link.description}
                </p>
              </div>

              {/* External link indicator */}
              <div className="absolute top-4 right-4 text-gray-500 group-hover:text-yellow-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl p-8 border border-neutral-700/50">
            <h3 className="text-xl font-semibold text-white mb-3">
              Vous connaissez une ressource incontournable ?
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl">
              Partagez vos sources favorites avec la communauté et enrichissons ensemble notre bibliothèque de références.
            </p>
            <Link
              href="/communaute"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/50 hover:scale-105"
            >
              <span>Proposer une source</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Decorative gold fade separator */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
      </div>
    </section>
  );
}
