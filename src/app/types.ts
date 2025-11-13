
export interface Calibre {
  id: string;
  name: string;
  liftAngle: number;
  beatRate: number;
  minAmplitude: number;
  maxBeatError: number;
}

export interface Position {
  id: string;
  name: string;
  rotation: string;
  icon: string;
}

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
