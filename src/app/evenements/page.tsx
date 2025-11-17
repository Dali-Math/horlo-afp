import { Metadata } from 'next';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { eventsData } from '@/lib/eventsData';
import ArticleLayout from '@/components/ArticleLayout';

export const metadata: Metadata = {
  title: 'Événements Horlogers | HorloLearn',
  description: 'Retrouvez tous les événements importants du monde de l\'horlogerie, des salons aux expositions, en passant par les actualités du secteur.',
  keywords: ['événements horlogers', 'salon international', 'exposition', 'Watches & Wonders', 'Genève'],
  openGraph: {
    title: 'Événements Horlogers | HorloLearn',
    description: 'Le calendrier des événements incontournables du monde de l\'horlogerie.',
    url: 'https://www.horlolearn.ch/evenements',
    images: [
      {
        url: 'https://www.horlolearn.ch/images/evenements/evenements-horlogers.jpg',
        width: 1200,
        height: 630,
        alt: 'Calendrier des événements horlogers',
      },
    ],
  },
};

export default function EventsPage() {
  const upcomingEvents = eventsData.filter(event => !event.isPast);

  return (
    <ArticleLayout
      frontMatter={
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Événements Horlogers
          </h1>
          <p className="Ne manquez aucune date importante. Restez connecté à la communauté horlogère.
          </p>
        </div>
      }
      title="Événements Horlogers"
      author="L'équipe HorloLearn"
      authorImage="/images/team/horlolearn-team.jpg"
    >
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-lg">
        {/* Événements à venir */}
        {upcomingEvents.map(event => (
          <Link
            key={event.id}
            href={`/evenements/${event.slug}`}
            className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative">
              {/* Badge si l'événement est nouveau */}
              {event.isPast ? (
                <span className="absolute top-2 right-2">
                  <span className="inline-block px-2 py-1 text-xs font-bold bg-green-500 text-white rounded-full">Nouveau</span>
                </span>
              ) : null}
              {/* Image de l'événement */}
              <Image
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{event.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{event.description}</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="text-xs text-slate-500">
                  {event.date}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        {/* Événements passés */}
        <h2 className="Événements Passés</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-lg">
          {eventsData.filter(event => event.isPast).map(event => (
            <Link
              key={event.id}
              href={`/evenements/${event.slug}`}
              className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-75"
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover opacity-60"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-100">{event.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{event.description}</p>
                <div className="absolute bottom-4 right-4">
                  <span className="text-xs text-slate-500">
                    {event.date}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
}
