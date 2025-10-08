export interface CourseData {
  id?: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface ParsedSchedule {
  totalCourses: number;
  courses: CourseData[];
}

export interface PlanningData {
  courses: CourseData[];
  metadata?: {
    totalCourses?: number;
    source?: string;
    lastUpdated?: string;
  };
}

export interface PlanningState {
  data: PlanningData | null;
  isLoading: boolean;
  error: string | null;
}

export type ViewMode = 'calendar' | 'table';
