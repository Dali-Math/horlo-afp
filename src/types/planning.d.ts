export type CourseData = {
  id?: string;
  day?: string;
  time?: string;
  startTime?: string;
  endTime?: string;
  subject: string;
  teacher?: string;
  room?: string;
};

export type ParsedSchedule = {
  totalCourses: number;
  courses: CourseData[];
};

export type PlanningData = {
  courses: CourseData[];
  metadata?: {
    totalCourses?: number;
    source?: string;
    lastUpdated?: string;
  };
};

export type PlanningState = {
  data: PlanningData | null;
  isLoading: boolean;
  error: string | null;
};

export type ViewMode = 'calendar' | 'table';
