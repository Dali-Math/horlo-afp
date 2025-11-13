export interface TimingData {
  timestamp: number;
  amplitude: number;
  beatError: number;
  rate: number;
  period: number;
  jitter: number;
  liftAngle: number;
  position: string;
  qFactor?: number;
  temperature?: number;
}

export type SessionResults = Record<string, TimingData[]>;

export interface Averages {
  amplitude: { avg: number; std: number };
  beatError: { avg: number; abs: number };
  rate: { avg: number; std: number };
  jitter: { avg: number };
  qFactor: { avg: number };
  isochronism: number;
  count: number;
  isCOSC: boolean;
  diagnostics: string[];
}
