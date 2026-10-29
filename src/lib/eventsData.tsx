// src/lib/eventsData.tsx

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
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
    date: '2025-04-01',
    location: 'Genève, Suisse',
    imageUrl: '/images/Geneva_Clock_Tower_Architectural_Detail_Swiss_Horology.jpg',
    tags: ['Salon', 'Watches & Wonders', 'Genève'],
    slug: '/evenements/watches-wonders-geneve-2025'
  },
  {
    id: 'gphg-2025',
    title: 'Grand Prix d\'Horlogerie de Genève (GPHG) 2025',
    description: "La cérémonie annuelle récompensant l'excellence et l'innovation horlogère internationale.",
    date: '2025-11-13',
    location: 'Théâtre du Léman, Genève',
    imageUrl: '/images/macro_precision_swiss_watch_movement_omega_coaxial.jpg',
    tags: ['Cérémonie', 'GPHG', 'Excellence'],
    slug: '/evenements/gphg-2025'
  },
  {
    id: 'salon-international-horlogerie-2025',
    title: 'Journées Horlogères de la Vallée de Joux',
    description: "Rencontre exclusive des artisans horlogers, métrologues et indépendants de la Vallée de Joux.",
    date: '2025-06-15',
    location: 'Le Sentier, Vallée de Joux',
    imageUrl: '/assets/images/districts_horlogers_suisse.png',
    tags: ['Artisans', 'Tradition', 'Vallée de Joux'],
    slug: '/evenements/salon-international-horlogerie-2025'
  },
  {
    id: 'exposition-breguet-2025',
    title: 'Hommage au Tourbillon et à l\'Ancre Suisse',
    description: "Rétrospective technique sur les inventions d'Abraham-Louis Breguet et la métrologie des échappements.",
    date: '2025-09-20',
    location: 'Neuchâtel, Suisse',
    imageUrl: '/images/tourbillon_breguet.png',
    tags: ['Histoire', 'Tourbillon', 'Breguet'],
    slug: '/evenements/exposition-breguet-2025'
  },
  {
    id: 'conference-micro-rotor-2025',
    title: 'Colloque Haute Fréquence & Micromécanique',
    description: "Conférence technique sur les nouveaux échappements silicium, la métrologie COSC et le réglage dynamique.",
    date: '2025-10-05',
    location: 'La Chaux-de-Fonds, Suisse',
    imageUrl: '/images/macro_swiss_watch_movement_precision_caliber.jpg',
    tags: ['Conférence', 'Micromécanique', 'COSC'],
    slug: '/evenements/conference-micro-rotor-2025'
  }
];
