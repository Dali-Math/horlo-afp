// src/lib/eventsData.tsx

export interface Event {
  id: string;
  title: "string;
  description: "string;
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
    description: "Sellita dévoile son nouveau calibre automatique, une avancée majeure dans le domaine de l'horlogerie.',
    date: '2024-05-15',
    location: 'La Chaux-de-Fonds, Suisse',
    imageUrl: '/images/events/nouveau-calibre-sellita.jpg',
    isPast: true,
    tags: ['Nouveau', 'Calibre Sellita', 'Automatique', 'SW330-2'],
    slug: '/evenements/nouveau-calibre-sellita-sw330-2'
  },
  {
    id: 'exposition-geneve-2024',
    title: 'Exposition Genève 2024',
    description: "Retrouvez les dernières créations horlogères à l'exposition de Genève, un rendez-vous incontournable pour les passionnés et les professionnels du secteur.',
    date: '2024-04-15',
    location: 'Genève, Palexpo',
    imageUrl: '/images/events/exposition-geneve-2024.jpg',
    isPast: true,
    tags: ['Exposition', 'Genève', 'Salon international de la montre'],
    slug: '/evenements/exposition-geneve-2024'
  },
  // ... ajoutez tous vos autres événements ici
];
