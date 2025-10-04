'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Store,
  Wrench,
  Presentation,
  Image as ImageIcon,
} from 'lucide-react';

type FilterCategory = 'Agenda' | 'Salons' | 'Ateliers' | 'Conférences' | 'Expositions';

interface FilterItem {
  id: FilterCategory;
  label: string;
  icon: React.ElementType;
}

const filters: FilterItem[] = [
  { id: 'Agenda', label: 'Agenda', icon: Calendar },
  { id: 'Salons', label: 'Salons', icon: Store },
  { id: 'Ateliers', label: 'Ateliers', icon: Wrench },
  { id: 'Conférences', label: 'Conférences', icon: Presentation },
  { id: 'Expositions', label: 'Expositions', icon: ImageIcon },
];

export default function FiltersBar() {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('Agenda');

  return (
    <section
      className="w-full py-8 bg-dark-900"
      aria-label="Filtres d'événements"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scrollable container on mobile */}
        <div className="overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-4 min-w-max sm:min-w-0 sm:justify-center"
            role="tablist"
            aria-label="Catégories d'événements"
          >
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilter === filter.id;

              return (
                <motion.button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`
                    flex flex-col items-center gap-2 px-6 py-4 rounded-lg
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
                    ${
                      isSelected
                        ? 'bg-dark-800 text-gold-500 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                        : 'bg-dark-800/50 text-light-100 hover:text-gold-500 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    }
                  `}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${filter.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {/* Icon above label */}
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-gold-500' : 'text-light-100'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Label */}
                  <span className="text-sm font-medium whitespace-nowrap">
                    {filter.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbar while maintaining functionality */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
