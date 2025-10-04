'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  category?: string;
}

interface EventCardProps {
  event: Event;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative bg-gradient-to-br from-gray-900/70 to-gray-800/70 backdrop-blur-sm rounded-xl border border-yellow-600/30 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
    >
      {/* Image or Icon Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Sparkles 
              className="w-16 h-16 text-yellow-500/50 animate-pulse" 
              strokeWidth={1.5}
            />
          </div>
        )}
        
        {/* Gold Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        {event.category && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/50 rounded-full">
            <span className="text-xs font-['Bebas_Neue'] text-yellow-400 tracking-wider">
              {event.category}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="font-['Bebas_Neue'] text-2xl text-yellow-400 tracking-wide leading-tight group-hover:text-yellow-300 transition-colors">
          {event.title}
        </h3>

        {/* Date and Location */}
        <div className="space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-yellow-500/70" strokeWidth={2} />
            <span className="font-['Inter']">{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-yellow-500/70" strokeWidth={2} />
            <span className="font-['Inter']">{event.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-['Inter'] text-sm text-gray-400 leading-relaxed line-clamp-3">
          {event.description}
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)'
          }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 font-['Bebas_Neue'] text-lg tracking-wider rounded-lg shadow-lg shadow-yellow-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label={`En savoir plus sur ${event.title}`}
        >
          + d'infos
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-yellow-400/10 to-yellow-500/5 blur-xl" />
      </div>
    </motion.article>
  );
}
