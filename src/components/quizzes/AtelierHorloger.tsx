import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AtelierHorlogerProps {
  onExit?: () => void;
}

const AtelierHorloger: React.FC<AtelierHorlogerProps> = ({ onExit }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Sauvegarde des styles d'origine
    const origBodyOverflow = document.body.style.overflow;
    const origHtmlOverflow = document.documentElement.style.overflow;

    // Verrouillage absolu du scroll sur le body et le html de la page parent
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'HORLO_QUIT' && onExit) {
        onExit();
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      document.body.style.overflow = origBodyOverflow;
      document.documentElement.style.overflow = origHtmlOverflow;
      window.removeEventListener('message', handleMessage);
    };
  }, [onExit]);

  if (!mounted) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: '#0d0a06',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <iframe
        src="/atelier-horloger-tetris.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0,
        }}
        title="Atelier Horloger Tetris"
      />
    </div>,
    document.body
  );
};

export default AtelierHorloger;
