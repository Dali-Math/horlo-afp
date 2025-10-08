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
