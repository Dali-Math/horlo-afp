// src/lib/eventsData.tsx

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  isPast: boolean;
  tags: string[];
  slug: string;
}

export const eventsData: Event[] = [
  {
    id: 'watches-wonders-2026',
    title: 'Watches & Wonders 2026 : Dates Confirmées',
    description: "L'événement horloger le plus important de l'année a officiellement annoncé ses dates.",
    date: '2024-05-21',
    location: "Genève, Suisse",
    imageUrl: '/images/events/watches-wonders-2026.jpg',
    isPast: true,
    tags: ['Événement', 'Watches & Wonders', 'Genève'],
    slug: '/evenements/watches-wonders-2026'
  },
  {
    id: 'nouveau-calibre-sellita-sw330-2',
    title: 'Nouveau Calibre Sellita SW330-2 Annoncé',
    description: "Sellita dévoile son nouveau calibre automatique, une avancée majeure dans le domaine de l'horlogerie.",  // Corrigé: guillemets doubles à la fin
    date: '2024-05-15',
    location: 'La Chaux-de-Fonds, Suisse',
    imageUrl: '/images/events/nouveau-calibre-sellita.jpg',
    isPast: true,
    tags: ['Nouveauté', 'Mouvement', 'Sellita'],
    slug: '/evenements/nouveau-calibre-sellita-sw330-2'
  },
  {
    id: 'salon-international-horlogerie-2024',
    title: 'Salon International de l\'Horlogerie 2024',
    description: 'Le salon international de l\'horlogerie rassemble les plus grandes marques horlogères du monde entier.',
    date: '2024-09-10',
    location: 'Paris, France',
    imageUrl: '/images/events/salon-international-horlogerie-2024.jpg',
    isPast: false,
    tags: ['Salon', 'Exposition', 'Paris'],
    slug: '/evenements/salon-international-horlogerie-2024'
  },
  {
    id: 'exposition-breguet-200-ans',
    title: 'Exposition Breguet : 200 Ans d\'Innovation',
    description: 'Une exposition exceptionnelle célébrant deux siècles d\'innovations horlogères de la maison Breguet.',
    date: '2024-11-15',
    location: 'Genève, Suisse',
    imageUrl: '/images/events/exposition-breguet-200-ans.jpg',
    isPast: false,
    tags: ['Exposition', 'Histoire', 'Breguet'],
    slug: '/evenements/exposition-breguet-200-ans'
  },
  {
    id: 'conference-micro-rotor',
    title: 'Conférence sur l\'Évolution du Micro-Rotor',
    description: 'Une conférence technique dédiée à l\'évolution et à l\'avenir du micro-rotor en horlogerie.',
    date: '2024-12-05',
    location: 'La Chaux-de-Fonds, Suisse',
    imageUrl: '/images/events/conference-micro-rotor.jpg',
    isPast: false,
    tags: ['Conférence', 'Technique', 'Mouvement'],
    slug: '/evenements/conference-micro-rotor'
  }
];
