'use client';

import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Info } from 'lucide-react';

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  link?: string; // ✅ Ajout pour corriger le typage
};

type EventCardProps = {
  event: Event;
  index: number;
};

export default function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.div
      className="group bg-zinc-800/60 border border-amber-500/20 rounded-xl p-6 shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* Titre */}
      <h3 className="font-['Bebas_Neue'] text-2xl text-amber-400 mb-2 group-hover:text-amber-300 transition-colors">
        {event.title}
      </h3>

      {/* Date */}
      <div className="flex items-center text-gray-400 text-sm mb-1">
        <CalendarDays className="w-4 h-4 mr-2 text-amber-400" />
        {event.date}
      </div>

      {/* Lieu */}
      <div className="flex items-center text-gray-400 text-sm mb-3">
        <MapPin className="w-4 h-4 mr-2 text-amber-400" />
        {event.location}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm font-['Inter'] leading-relaxed mb-4">
        {event.description}
      </p>

      {/* Bouton d’action */}
      {event.link && (
        <motion.a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 text-amber-400 font-medium hover:text-amber-300 transition-colors"
        >
          <Info className="w-4 h-4" />
          En savoir plus
        </motion.a>
      )}
    </motion.div>
  );
}
