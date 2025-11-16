'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface MontreContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  globalAnimation: boolean;
  setGlobalAnimation: (value: boolean) => void;
  progression: Record<string, boolean>;
  updateProgression: (tab: string) => void;
}

const MontreContext = createContext<MontreContextType | undefined>(undefined);

export function MontreProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('introduction');
  const [globalAnimation, setGlobalAnimation] = useState(true);
  const [progression, setProgression] = useState({
    introduction: true,
    organes: false,
    animation: false,
    echappement: false,
    schema: false,
    comparaison: false,
    statistiques: false,
    quiz: false
  });

  const updateProgression = (tab: string) => {
    setProgression(prev => ({ ...prev, [tab]: true }));
  };

  return (
    <MontreContext.Provider value={{
      activeTab,
      setActiveTab,
      globalAnimation,
      setGlobalAnimation,
      progression,
      updateProgression
    }}>
      {children}
    </MontreContext.Provider>
  );
}

export function useMontre() {
  const context = useContext(MontreContext);
  if (!context) throw new Error('useMontre must be used within MontreProvider');
  return context;
}
