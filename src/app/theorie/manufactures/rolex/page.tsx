// app/theorie/manufactures/rolex/page.tsx
import { Metadata } from 'next'
import Image from 'next/image'

// ==================== DONNÉES INTÉGRÉES ====================
const rolexData = {
  name: 'Rolex',
  meta: {
    title: 'Rolex - Manufacture Horlogère Suisse de Légende',
    description: "Guide complet de Rolex : histoire de 1905 à aujourd'hui, collections iconiques (Submariner, Daytona, GMT-Master), mouvements et certification Superlative Chronometer.",
    tagline: "Une Couronne pour chaque Succès"
  },
  
  // TIMELINE COMPLÈTE - 12 événements majeurs avec images Wikipedia
  timeline: [
    {
      date: '1905',
      title: 'Fondation à Londres',
      description: 'Hans Wilsdorf, 24 ans, crée avec son beau-frère Alfred Davis la société Wilsdorf & Davis. Importation de mouvements suisses montés dans des boîtiers anglais.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Hans_Wilsdorf.jpg/400px-Hans_Wilsdorf.jpg',
      alt: 'Hans Wilsdorf fondateur de Rolex'
    },
    {
      date: '1908',
      title: 'Naissance de la marque ROLEX',
      description: "Hans Wilsdorf enregistre la marque 'Rolex' - un nom court, facile à prononcer dans toutes les langues et qui sonne comme une remontée mécanique.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rolex_Oyster_Perpetuital_Datejust_16014.jpg/400px-Rolex_Oyster_Perpetuital_Datejust_16014.jpg',
      alt: 'Première montre Rolex'
    },
    {
      date: '1926',
      title: 'La Oyster - Première montre étanche',
      description: "Création de la Oyster avec couronne vissée. Mercedes Gleitze traverse la Manche avec une Oyster au poignet, prouvant son étanchéité.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Rolex_Oyster_case_1926.jpg/400px-Rolex_Oyster_case_1926.jpg',
      alt: 'Boîtier Oyster 1926'
    },
    {
      date: '1931',
      title: 'Perpetual Rotor',
      description: "Invention du rotor Perpetual, première masse oscillante à 360°. Révolutionne l'horlogerie automatique.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Rolex_perpetual_rotor.jpg/400px-Rolex_perpetual_rotor.jpg',
      alt: 'Mécanisme Perpetual Rotor'
    },
    {
      date: '1945',
      title: 'Datejust - Date sautante',
      description: "Première montre avec date qui change instantanément à minuit. Fenêtre date à 3h, couronne Oyster.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rolex_Datejust_sl.jpg/400px-Rolex_Datejust_sl.jpg',
      alt: 'Rolex Datejust 1945'
    },
    {
      date: '1953',
      title: 'Explorer & Submariner',
      description: "Sir Edmund Hillary porte une Oyster Perpetual sur l'Everest. Lancement de la Submariner, première montre de plongée étanche à 100m.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Rolex_Submariner_Date_16610.jpg/400px-Rolex_Submariner_Date_16610.jpg',
      alt: 'Rolex Submariner 1953'
    },
    {
      date: '1954',
      title: 'GMT-Master',
      description: "Créée pour les pilotes de Pan Am. Lunette rotative bicolore pour suivre deux fuseaux horaires.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Rolex_GMT_Master_II.jpg/400px-Rolex_GMT_Master_II.jpg',
      alt: 'Rolex GMT-Master'
    },
    {
      date: '1956',
      title: 'Day-Date',
      description: "Première montre affichant le jour en toutes lettres. Devenue la montre des leaders mondiaux.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Rolex_Day-Date_1803.jpg/400px-Rolex_Day-Date_1803.jpg',
      alt: 'Rolex Day-Date President'
    },
    {
      date: '1960',
      title: 'Deep Sea Special',
      description: "Descend à 10'916m dans la fosse des Mariannes avec le bathyscaphe Trieste. Intacte après la plongée.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Trieste_bathyscaphe_problem.jpg/400px-Trieste_bathyscaphe_problem.jpg',
      alt: 'Bathyscaphe Trieste'
    },
    {
      date: '1963',
      title: 'Cosmograph Daytona',
      description: "Créée pour les pilotes de course. Chronographe avec échelle tachymétrique sur la lunette.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rolex_Daytona_116520.jpg/400px-Rolex_Daytona_116520.jpg',
      alt: 'Rolex Daytona'
    },
    {
      date: '2008',
      title: 'Deepsea',
      description: "Étanchéité à 3'900m. Lunette en céramique Cerachrom, boîtier Ringlock.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Rolex_Deepsea.jpg/400px-Rolex_Deepsea.jpg',
      alt: 'Rolex Deepsea'
    },
    {
      date: '2015',
      title: 'Calibre 3255',
      description: "Nouvelle génération de mouvements. 14 brevets, 70h de réserve, précision -2/+2 sec/jour.",
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rolex_calibre_3255.jpg/400px-Rolex_calibre_3255.jpg',
      alt: 'Calibre Rolex 3255'
    }
  ],

  // COLLECTIONS ICONIQUES - 6 modèles principaux
  collections: [
    {
      name: 'Submariner',
      description: 'Montre de plongée par excellence, étanche à 300m',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rolex_Submariner_116610.jpg/400px-Rolex_Submariner_116610.jpg',
      price: 'À partir de CHF 9\'100',
      features: ['Calibre 3230/3235', 'Étanchéité 300m', 'Glisseur Cerachrom'],
      category: 'sport'
    },
    {
      name: 'Cosmograph Daytona',
      description: 'Chronographe légendaire des circuits automobiles',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Rolex_Daytona_116500_Ceramic.jpg/400px-Rolex_Daytona_116500_Ceramic.jpg',
      price: 'À partir de CHF 15\'100',
      features: ['Calibre 4130', 'Chronographe', 'Tachymètre'],
      category: 'sport'
    },
    {
      name: 'GMT-Master II',
      description: 'Deux fuseaux horaires pour les globe-trotters',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rolex_GMT_Master_II_Batman.jpg/400px-Rolex_GMT_Master_II_Batman.jpg',
      price: 'À partir de CHF 9\'700',
      features: ['Calibre 3285', 'Heure GMT', 'Lunette Cerachrom'],
      category: 'aviation'
    },
    {
      name: 'Datejust',
      description: 'L\'emblématique, élégance intemporelle depuis 1945',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Rolex_Datejust_41.jpg/400px-Rolex_Datejust_41.jpg',
      price: 'À partir de CHF 7\'500',
      features: ['Calibre 3235', 'Date instantanée', 'Bracelet Jubilee/Oyster'],
      category: 'classique'
    },
    {
      name: 'Day-Date',
      description: 'La montre des leaders, jour et date en toutes lettres',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Rolex_Day-Date_40_President.jpg/400px-Rolex_Day-Date_40_President.jpg',
      price: 'À partir de CHF 36\'500',
      features: ['Calibre 3255', 'Jour complet', 'Or 18 ct'],
      category: 'classique'
    },
    {
      name: 'Explorer',
      description: 'L\'aventure sur le poignet, testée sur l\'Everest',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Rolex_Explorer_214270.jpg/400px-Rolex_Explorer_214270.jpg',
      price: 'À partir de CHF 7\'200',
      features: ['Calibre 3230', 'Luminosité Chromalight', 'Robustesse extrême'],
      category: 'sport'
    }
  ],

  // MOUVEMENTS MANUFACTURE
  movements: [
    {
      name: 'Calibre 3235',
      description: 'Mouvement automatique avec date, nouvelle génération',
      specs: {
        'Réserve': '70 heures',
        'Précision': '-2/+2 sec/jour',
        'Fréquence': '28\'800 a/h',
        'Rubis': '31',
        'Brevets': '14 nouveaux brevets'
      }
    },
    {
      name: 'Calibre 4130',
      description: 'Chronographe automatique intégré',
      specs: {
        'Réserve': '72 heures',
        'Précision': '-2/+2 sec/jour',
        'Fréquence': '28\'800 a/h',
        'Rubis': '44',
        'Chronographe': 'Roue à colonnes'
      }
    },
    {
      name: 'Calibre 3285',
      description: 'Mouvement GMT avec deux fuseaux',
      specs: {
        'Réserve': '70 heures',
        'Précision': '-2/+2 sec/jour',
        'Fréquence': '28\'800 a/h',
        'Rubis': '31',
        'GMT': 'Indication indépendante'
      }
    }
  ]
}

// ==================== METADATA POUR SEO ====================
export const metadata: Metadata = {
  title: 'Rolex - Guide Complet | HorloLearn',
  description: rolexData.meta.description,
  keywords: 'Rolex, Submariner, Daytona, GMT-Master, Datejust, manufacture horlogère suisse, calibre 3235',
  openGraph: {
    title: rolexData.meta.title,
    description: rolexData.meta.description,
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rolex_Submariner_116610.jpg/800px-Rolex_Submariner_116610.jpg'],
    type: 'article',
    locale: 'fr_CH'
  }
}

// ==================== COMPOSANTS SIMPLE ====================
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-4xl font-bold text-center mb-12 text-slate-800 dark:text-white font-serif">
    {children}
  </h2>
)

const FeatureCard = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300">{description}</p>
  </div>
)

export default function RolexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Rolex_Submariner_116610.jpg/1200px-Rolex_Submariner_116610.jpg"
          alt="Rolex Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center text-white max-w-4xl px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-serif">ROLEX</h1>
          <p className="text-xl md:text-2xl mb-8">{rolexData.meta.tagline}</p>
          <p className="text-lg mb-12 opacity-90">{rolexData.meta.description}</p>
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 rounded-full font-semibold transition-colors">
            Découvrir l'Histoire
          </button>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle>Timeline Historique Rolex</SectionTitle>
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-8 md:left-1/2 h-full w-1 bg-green-500" />
            {rolexData.timeline.map((event, i) => (
              <div key={i} className={`flex mb-16 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-5/12 md:pr-8">
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-xl shadow-lg ml-12 md:ml-0">
                    <img src={event.image} alt={event.alt} className="w-full h-48 object-cover rounded-lg mb-4" />
                    <span className="text-2xl font-bold text-green-600 font-mono">{event.date}</span>
                    <h3 className="text-xl font-bold mt-2 mb-2 dark:text-white">{event.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{event.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-2/12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <SectionTitle>Collections Iconiques</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rolexData.collections.map((collection, i) => (
              <article key={i} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                <img src={collection.image} alt={collection.name} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 dark:text-white">{collection.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{collection.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.features.map((f, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full">{f}</span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-green-600">{collection.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MOUVEMENTS */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <SectionTitle>Mouvements Manufacture</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rolexData.movements.map((movement, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{movement.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{movement.description}</p>
                <div className="space-y-2">
                  {Object.entries(movement.specs).map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1">
                      <span className="text-sm text-slate-500">{k}</span>
                      <span className="font-semibold dark:text-white">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      /* CERTIFICATION */
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <SectionTitle>Superlative Chronometer</SectionTitle>
          <p className="text-xl mb-8 dark:text-slate-100">
            Chaque Rolex est certifiée selon des critères bien plus stricts que le COSC : -2/+2 secondes par jour, 24 jours de tests, 100% des montres contrôlées.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard icon="⏱️" title="-2/+2" description="Secondes par jour de tolérance" />
            <FeatureCard icon="🛡️" title="24 jours" description="De tests rigoureux" />
            <FeatureCard icon="✅" title="100%" description="Des montres contrôlées" />
          </div>
        </div>
      </section>

      /* FOOTER */
      <footer className="py-12 bg-slate-900 text-white text-center">
        <p className="mb-4">© 2025 HorloLearn - La référence en horlogerie suisse</p>
        <p className="text-sm text-slate-400">Toutes les images provenant de sources libres (Wikimedia Commons)</p>
      </footer>

    </main>
  )
}
