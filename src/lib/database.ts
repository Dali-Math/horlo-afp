// src/lib/database.ts
import spiralsDatabase from './spirals-database.json';

export const database = spiralsDatabase;

export type MaterialKey = keyof typeof database.materials;
export type FrequencyKey = keyof typeof database.frequencies;
