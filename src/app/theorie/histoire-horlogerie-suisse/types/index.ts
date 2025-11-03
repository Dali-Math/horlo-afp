// types/index.ts

export interface Period {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface Region {
  name: string;
  description: string;
  image: string;
  specialty?: string;
}

export interface Manufacture {
  name: string;
  founded: string;
  specialty: string;
  description: string;
  image: string;
  famous?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export type Theme = 'light' | 'dark';
