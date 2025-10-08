export interface CourseData {
  id?: string;
  day: string;
  time: string;
  subject: string;
  teacher?: string;
  room?: string;
  startTime?: string;
  endTime?: string;
  duration?: string;
}
export interface ParsedSchedule {
  courses: CourseData[];
  metadata?: Record<string, any>;
}
export interface PlanningData {
  courses: CourseData[];
  metadata?: Record<string, any>;
}

// View mode type for calendar/table toggle
export type ViewMode = 'calendar' | 'table';

// Planning state interface for state management
export interface PlanningState {
  data: PlanningData | null;
  isLoading: boolean;
  error: string | null;
}
