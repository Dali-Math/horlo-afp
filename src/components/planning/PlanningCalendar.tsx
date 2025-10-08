"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';

// Debug log to verify planning prop propagation
// This will help diagnose empty calendar after PDF import
// eslint-disable-next-line no-console
const logPlanning = (planning: any) => {
  try {
    console.log('PlanningCalendar received planning:', planning);
    console.log('Planning courses:', planning?.courses);
    console.log('Number of courses:', planning?.courses?.length);
  } catch {}
};

// Define types locally to avoid import errors
interface CourseData {
  day: string;
  startTime?: string;
  endTime?: string;
  time?: string;
  subject: string;
  teacher?: string;
  professor?: string;
  room?: string;
}

interface PlanningData {
  courses: CourseData[];
}

type PlanningCalendarProps = {
  planning: PlanningData | null;
  viewMode: "table" | "calendar";
};

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00'];

const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planning, viewMode }) => {
  // Debug log - specific format requested
  console.log("📦 Planning reçu:", planning);
  
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  
  // Add debug log at component start
  logPlanning(planning);
  
  // Early return if no planning data
  if (!planning || !planning.courses) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <Clock className="w-12 h-12 text-gray-400 mx-auto" />
          <p className="text-gray-600">Aucun cours planifié</p>
        </div>
      </div>
    );
  }

  // Normalize course data
  const normalizedCourses = useMemo(() => {
    return planning.courses.map(course => ({
      ...course,
      day: course.day.toLowerCase(),
      startTime: course.startTime || course.time?.split('-')[0]?.trim() || '',
      endTime: course.endTime || course.time?.split('-')[1]?.trim() || '',
      teacher: course.teacher || course.professor || 'Non spécifié'
    }));
  }, [planning.courses]);

  // Helper to get courses for a specific day and time slot
  const getCourseForSlot = (day: string, timeSlot: string) => {
    return normalizedCourses.find(
      course =>
        course.day === day &&
        course.startTime === timeSlot
    );
  };

  // Calculate course duration in 30-minute slots
  const getCourseDuration = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 1;
    const start = TIME_SLOTS.indexOf(startTime);
    const end = TIME_SLOTS.indexOf(endTime);
    return end > start ? end - start : 1;
  };

  return (
    <div className="space-y-4">
      {viewMode === 'calendar' ? (
        // Calendar view
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="grid grid-cols-8 gap-px bg-gray-200 rounded-lg overflow-hidden">
              {/* Header row */}
              <div className="bg-gray-50 p-3 font-medium text-gray-700 text-sm">
                Heure
              </div>
              {DAYS.map(day => (
                <div
                  key={day}
                  className="bg-gray-50 p-3 font-medium text-gray-700 text-sm text-center capitalize"
                >
                  {day}
                </div>
              ))}

              {/* Time slots */}
              {TIME_SLOTS.map(timeSlot => (
                <React.Fragment key={timeSlot}>
                  <div className="bg-white p-3 text-sm text-gray-600">
                    {timeSlot}
                  </div>
                  {DAYS.map(day => {
                    const course = getCourseForSlot(day, timeSlot);
                    if (course) {
                      const duration = getCourseDuration(course.startTime, course.endTime);
                      return (
                        <motion.button
                          key={`${day}-${timeSlot}`}
                          onClick={() => setSelectedCourse(course)}
                          className="bg-gradient-to-br from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-3 text-left hover:shadow-md transition-all"
                          style={{ gridRow: `span ${duration}` }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-800 text-sm">
                              {course.subject}
                            </div>
                            <div className="text-xs text-gray-600">
                              {course.startTime} - {course.endTime}
                            </div>
                            {course.teacher && (
                              <div className="text-xs text-gray-500">
                                {course.teacher}
                              </div>
                            )}
                            {course.room && (
                              <div className="text-xs text-gray-500">
                                {course.room}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    }
                    return (
                      <div
                        key={`${day}-${timeSlot}`}
                        className="bg-white p-3"
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Table view
        <div className="space-y-3">
          {normalizedCourses.map((course, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedCourse(course)}
              className="w-full bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 p-4 text-left rounded-r-lg hover:shadow-md transition-all"
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <div className="text-xs text-gray-500 uppercase">Jour</div>
                  <div className="font-medium text-gray-800 capitalize">{course.day}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Horaire</div>
                  <div className="font-medium text-gray-800">
                    {course.startTime} - {course.endTime}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Cours</div>
                  <div className="font-medium text-gray-800">{course.subject}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase">Professeur</div>
                  <div className="font-medium text-gray-800">{course.teacher}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Course details modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Détails du cours
              </h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Jour</p>
                  <p className="text-sm text-gray-600 capitalize">{selectedCourse.day}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Horaire</p>
                  <p className="text-sm text-gray-600">
                    {selectedCourse.startTime}
                    {selectedCourse.endTime && ` - ${selectedCourse.endTime}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Professeur</p>
                  <p className="text-sm text-gray-600">{selectedCourse.teacher}</p>
                </div>
              </div>
              
              {selectedCourse.room && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Salle</p>
                    <p className="text-sm text-gray-600">{selectedCourse.room}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PlanningCalendar;
