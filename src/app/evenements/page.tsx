// app/evenements/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { eventsData } from '@/lib/eventsData';

export const metadata: Metadata = {
  title: 'Événements Horlogers | HorloLearn',
  description: 'Retrouvez tous les événements, salons et rendez-vous importants du monde de l\'horlogerie, des salons aux expositions.',
  keywords: ['événements horlogers', 'salons horlogers', 'expositions horlogères', 'watches & wonders', 'genève', 'bâle', 'salon', 'genève'],
  openGraph: {
    title: 'Événements Horlogers | HorloLearn',
    description: 'Retrouvez tous les événements, salons et rendez-vous importants du monde de l\'horlogerie, des salons aux expositions.',
    url: 'https://www.horlolearn.ch/evenements',
    images: [
      {
        url: 'https://www.hlolearn.ch/images/evenements/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Événements Horlogers - HorloLearn',
      },
    ],
  },
};

export default function EventsPage() {
  const events = eventsData.filter(event => !event.isPast); // Ne montrer que les événements à venir

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Événements Horlogers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tous les événements, salons et rendez-vous importants du monde de l'horlogerie.
          </p>
        </header>

        <div className="grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/evenements/${event.slug}`}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-4 right-4 z-10">
                {event.isPast && (
                  <span className="Passé</span>
                )}
              </div>
              <div className="relative w-full h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  priority={event.isPast ? undefined : true}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(event.date, 'dd MMMM yyyy', { locale: 'fr-FR' })}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/theorie"
            className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 transition-colors duration-300"
          >
            Voir tous les cours de théorie
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
