// src/lib/eventsData.tsx

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string; // Format 'YYYY-MM-DD'
  location: string;
  imageUrl: string;
  tags: string[];
  slug: string;
}

export const eventsData: Event[] = [
  {
    id: 'watches-wonders-geneve-2025',
    title: 'Watches & Wonders Genève 2025',
    description: "Le plus grand salon horloger du monde revient à Genève pour une édition promise inoubliable.",
    date: '2025-04-01', // DATE FUTURE
    location: 'Genève, Suisse',
    imageUrl: '/images/events/watches-wonders-geneve-2025.jpg',
    tags: ['Salon', 'Watches & Wonders', 'Genève'],
    slug: '/evenements/watches-wonders-geneve-2025'
  },
  {
    id: 'grand-prix-horlogerie-2025',
    title: 'Grand Prix d\'Horlogerie de Genève 2025',
    description: 'La cérémonie de remise des prix la plus prestigieuse de l\'industrie horlogère.',
    date: '2025-11-12', // DATE FUTURE
    location: 'Genève, Suisse',
    imageUrl: '/images/events/gphg-2025.jpg',
    tags: ['Cérémonie', 'Récompense', 'Genève'],
    slug: '/evenements/grand-prix-horlogerie-2025'
  },
  {
    id: 'salon-international-horlogerie-2025',
    title: 'Salon International de l\'Horlogerie 2025',
    description: "Un salon dédié aux maisons indépendantes et à l'artisanat d'excellence.",
    date: '2025-09-10', // DATE FUTURE
    location: 'Paris, France',
    imageUrl: '/images/events/salon-international-horlogerie-2025.jpg',
    tags: ['Salon', 'Exposition', 'Paris'],
    slug: '/evenements/salon-international-horlogerie-2025'
  },
  {
    id: 'exposition-breguet-innovation',
    title: 'Exposition Breguet : L\'Art de l\'Innovation',
    description: "Une plongée dans l'histoire des inventions qui ont marqué l'horlogerie grâce à Abraham-Louis Breguet.",
    date: '2025-06-15', // DATE FUTURE
    location: 'La Chaux-de-Fonds, Suisse',
    imageUrl: '/images/events/exposition-breguet-2025.jpg',
    tags: ['Exposition', 'Histoire', 'Breguet'],
    slug: '/evenements/exposition-breguet-innovation'
  },
  {
    id: 'conference-micro-rotor-futur',
    title: 'Conférence : Le Futur du Micro-Rotor',
    description: "Les experts discutent des dernières avancées et des tendances futures pour le micro-rotor.",
    date: '2025-10-20', // DATE FUTURE
    location: 'Bienne, Suisse',
    imageUrl: '/images/events/conference-micro-rotor-2025.jpg',
    tags: ['Conférence', 'Technique', 'Mouvement'],
    slug: '/evenements/conference-micro-rotor-futur'
  }
];
