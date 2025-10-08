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
