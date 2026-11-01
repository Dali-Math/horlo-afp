import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AtelierHorlogerProps {
  onExit?: () => void;
}

const AtelierHorloger: React.FC<AtelierHorlogerProps> = ({ onExit }) => {
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'HORLO_QUIT' && onExit) {
        onExit();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onExit]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#0d0a06] text-[#d4af37]">
      {onExit && (
        <div className="px-4 py-2.5 bg-[#171008] border-b border-[#d4af3733] flex items-center justify-between z-10">
          <button
            onClick={onExit}
            className="px-4 py-2 rounded-xl bg-[#281e1490] hover:bg-[#3c2814] text-[#d4af37] border-2 border-[#8b6914] flex items-center gap-2 text-xs font-mono transition shadow-md hover:border-[#d4af37] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span className="font-bold tracking-wider uppercase">← Quitter l'atelier</span>
          </button>
          <div className="text-xs font-mono text-[#c9a659]">
            Manufacture de Haute Horlogerie • Genève 1755
          </div>
        </div>
      )}
      <iframe
        src="/atelier-horloger-tetris.html"
        className="w-full flex-1 border-0 min-h-[92vh]"
        title="Atelier Horloger Tetris"
      />
    </div>
  );
};

export default AtelierHorloger;
