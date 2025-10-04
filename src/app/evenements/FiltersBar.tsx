'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Store,
  Wrench,
  Presentation,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

type FilterCategory = 'Tous' | 'Salons' | 'Ateliers' | 'Conférences' | 'Expositions';

interface FilterItem {
  id: FilterCategory;
  label: string;
  icon: React.ElementType;
}

const filters: FilterItem[] = [
  { id: 'Tous', label: 'Tous', icon: Sparkles },
  { id: 'Salons', label: 'Salons', icon: Store },
  { id: 'Ateliers', label: 'Ateliers', icon: Wrench },
  { id: 'Conférences', label: 'Conférences', icon: Presentation },
  { id: 'Expositions', label: 'Expositions', icon: ImageIcon },
];

interface FiltersBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FiltersBar({ selectedCategory, onCategoryChange }: FiltersBarProps) {
  return (
    <motion.section
      className="w-full py-8 bg-gradient-to-b from-gray-900 to-gray-800"
      aria-label="Filtres d'événements"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal scrollable container on mobile */}
        <div className="overflow-x-auto scrollbar-hide">
          <div
            className="flex gap-4 min-w-max sm:min-w-0 sm:justify-center"
            role="tablist"
            aria-label="Catégories d'événements"
          >
            {filters.map((filter, index) => {
              const Icon = filter.icon;
              const isSelected = selectedCategory === filter.id;

              return (
                <motion.button
                  key={filter.id}
                  onClick={() => onCategoryChange(filter.id)}
                  className={`
                    flex flex-col items-center gap-2 px-6 py-4 rounded-lg
                    transition-all duration-300
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500
                    ${
                      isSelected
                        ? 'bg-gray-800 text-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]'
                        : 'bg-gray-800/50 text-gray-100 hover:text-yellow-500 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                    }
                  `}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${filter.id}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                >
                  {/* Icon above label */}
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? 'text-yellow-500' : 'text-gray-100'
                    }`}
                    aria-hidden="true"
                  />
                  {/* Label */}
                  <span className="text-sm font-medium whitespace-nowrap font-['Inter']">
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
    </motion.section>
  );
}
