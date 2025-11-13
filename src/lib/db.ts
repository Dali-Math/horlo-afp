// lib/db.ts
import { openDB, DBSchema } from 'idb';

interface HorloLearnDB extends DBSchema {
  measurements: {
    key: string;
    value: {
      id: string;
      timestamp: number;
      sessionResults: Record<string, any>;
      averages: Record<string, any>;
      calibre: string;
      duration: number;
      notes: string;
    };
  };
  profiles: {
    key: string;
    value: {
      id: string;
      name: string;
      data: any;
    };
  };
}

export const initDB = async () => {
  return openDB<HorloLearnDB>('horlolearn-pro', 1, {
    upgrade(db) {
      db.createObjectStore('measurements', { keyPath: 'id' });
      db.createObjectStore('profiles', { keyPath: 'id' });
    },
  });
};

// Fonctions utilitaires
export const saveMeasurement = async (data: any) => {
  const db = await initDB();
  await db.add('measurements', {
    ...data,
    id: `meas_${Date.now()}`,
    timestamp: Date.now(),
  });
};

export const loadMeasurements = async () => {
  const db = await initDB();
  return await db.getAll('measurements');
};

export const clearOldMeasurements = async (keepDays = 30) => {
  const db = await initDB();
  const all = await db.getAll('measurements');
  const cutoff = Date.now() - keepDays * 24 * 60 * 60 * 1000;
  
  for (const meas of all) {
    if (meas.timestamp < cutoff) {
      await db.delete('measurements', meas.id);
    }
  }
};
