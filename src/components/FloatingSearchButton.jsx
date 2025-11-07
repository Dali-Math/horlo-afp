// components/FloatingSearchButton.tsx
import { Search } from 'lucide-react';

export default function FloatingSearchButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700..."
    >
      <Search className="w-6 h-6" />
    </button>
  );
}
