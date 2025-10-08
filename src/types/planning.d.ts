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
