"use client";

import { Search } from 'lucide-react';

interface FloatingSearchButtonProps {
  onClick: () => void;
}

export default function FloatingSearchButton({ onClick }: FloatingSearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 left-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group z-40"
      aria-label="Ouvrir la recherche"
    >
      <Search className="w-6 h-6" />
      <span className="absolute left-full ml-3 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
        Rechercher (Ctrl+K)
      </span>
    </button>
  );
}
