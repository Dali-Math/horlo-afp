'use client';

import { useState } from 'react';

type Category = 'all' | 'technique' | 'historique' | 'glossaire' | 'pdf' | 'externe';

interface Filter {
  id: Category;
  label: string;
  icon: string;
}

const filters: Filter[] = [
  { id: 'all', label: 'Tout', icon: '🔍' },
  { id: 'technique', label: 'Technique', icon: '🔧' },
  { id: 'historique', label: 'Historique', icon: '⏳' },
  { id: 'glossaire', label: 'Glossaire', icon: '📘' },
  { id: 'pdf', label: 'PDF', icon: '📄' },
  { id: 'externe', label: 'Liens externes', icon: '🌐' },
];

interface FiltersBarProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function FiltersBar({ selectedCategory, onCategoryChange }: FiltersBarProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(0);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % filters.length;
      setFocusedIndex(nextIndex);
      document.getElementById(`filter-${filters[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + filters.length) % filters.length;
      setFocusedIndex(prevIndex);
      document.getElementById(`filter-${filters[prevIndex].id}`)?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCategoryChange(filters[index].id);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-black/50 to-transparent py-6 backdrop-blur-sm sticky top-0 z-40 animate-fade-in-slide-up">
      <div className="container mx-auto px-4">
        <div 
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
          role="tablist"
          aria-label="Filtres de ressources"
        >
          {filters.map((filter, index) => {
            const isSelected = selectedCategory === filter.id;
            return (
              <button
                key={filter.id}
                id={`filter-${filter.id}`}
                role="tab"
                aria-selected={isSelected}
                aria-controls="resources-list"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onCategoryChange(filter.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedIndex(index)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-full
                  whitespace-nowrap transition-all duration-300
                  bg-black/60 backdrop-blur-sm
                  border border-[#D4AF37]/30
                  hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
                  focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50
                  ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10 shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                      : ''
                  }
                  animate-fade-in
                `}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="text-lg" aria-hidden="true">
                  {filter.icon}
                </span>
                <span
                  className={`
                    text-sm font-medium transition-colors
                    ${
                      isSelected
                        ? 'text-[#D4AF37]'
                        : 'text-gray-300 hover:text-white'
                    }
                  `}
                >
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
