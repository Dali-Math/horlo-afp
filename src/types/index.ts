export interface TimingData {
  timestamp: number;
  amplitude: number;
  beatError: number;
  rate: number;
  period: number;
  jitter: number;
  liftAngle: number;
  position: string;
  qFactor: number;
  temperature: number;
  profileId?: string;
}

export interface MeasurementRecord {
  id: string;
  timestamp: number;
  sessionResults: Record<string, TimingData[]>;
  averages: Record<string, any>;
  calibre: string;
  duration: number;
  notes?: string;
}

export interface SignatureProfile {
  id: string;
  name: string;
  beatRate: number;
  liftAngle: number;
  baseAmplitude: number;
  jitterPattern: 'stable' | 'sporadic' | 'choppy' | 'drifting';
  driftRate: number;
  description: string;
  typicalIssues?: string[];
}
