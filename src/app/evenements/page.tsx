// app/evenements/page.tsx (VERSION DEBUG)

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { eventsData } from '@/lib/eventsData';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Événements Horlogers | HorloLearn',
  description: 'Retrouvez tous les événements, salons et rendez-vous importants du monde de l\'horlogerie.',
  // ... (le reste des métadonnées est inchangé)
};

export default function EventsPage() {
  // --- LOGIQUE DE FILTRAGE (inchangée) ---
  const todayString = new Date().toISOString().split('T')[0];

  const events = eventsData.filter(event => {
    return event.date >= todayString;
  });

  // --- SECTION DE DÉBOGAGE ---
  // Cette section va nous montrer ce qui se passe
  // --- FIN DE LA SECTION DE DÉBOGAGE ---

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

        {/* --- AFFICHAGE DES INFORMATIONS DE DÉBOGAGE --- */}
        <div style={{ backgroundColor: '#1f2937', color: '#f3f4f6', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', fontFamily: 'monospace' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>🔍 Informations de Débogage</h2>
          <p><strong>Date du jour (YYYY-MM-DD):</strong> {todayString}</p>
          <p><strong>Nombre d'événements trouvés après filtrage:</strong> {events.length}</p>
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Voir le contenu de `eventsData`</summary>
            <pre style={{ marginTop: '0.5rem', backgroundColor: '#111827', padding: '1rem', borderRadius: '0.25rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontSize: '0.875rem' }}>
              {JSON.stringify(eventsData, null, 2)}
            </pre>
          </details>
        </div>
        {/* --- FIN DE L'AFFICHAGE DE DÉBOGAGE --- */}

        {events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event.id}
                href={`/evenements/${event.slug}`}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{format(new Date(event.date), 'dd MMMM yyyy', { locale: fr })}</span>
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
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Aucun événement à venir n'est programmé pour le moment.
            </p>
          </div>
        )}

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
