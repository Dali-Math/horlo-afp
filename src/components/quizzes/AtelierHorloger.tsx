import React, { useEffect } from 'react';

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
    <div className="w-full h-screen bg-[#0d0a06] overflow-hidden">
      <iframe
        src="/atelier-horloger-tetris.html"
        className="w-full h-full border-0 block"
        title="Atelier Horloger Tetris"
      />
    </div>
  );
};

export default AtelierHorloger;
