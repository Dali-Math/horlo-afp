"use client";

import { Search } from 'lucide-react';

interface FloatingSearchButtonProps {
  onClick: () => void;
}

export default function FloatingSearchButton({ onClick }: FloatingSearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-16 sm:bottom-24 left-3 sm:left-6 w-11 h-11 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-40 active:scale-95"
      aria-label="Ouvrir la recherche"
      title="Recherche (Ctrl+K)"
    >
      <Search className="w-5 h-5 sm:w-6 sm:h-6" />
      <span className="hidden sm:block absolute left-full ml-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Rechercher (Ctrl+K)
      </span>
    </button>
  );
}
