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
  id?: string;
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
  '20:00', '20:30', '21:00'
];

const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planning, viewMode }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  
  // Add debug log at component start
  logPlanning(planning);
  
  // Early return if no planning data
  if (!planning || !planning.courses) {
    console.log('PlanningCalendar: No planning data or courses found');
    return (
      <div className="text-center p-8">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Aucun planning chargé</p>
        <p className="text-gray-400 text-sm mt-2">
          Importez un fichier PDF pour voir votre planning
        </p>
      </div>
    );
  }

  const processedCourses = useMemo(() => {
    console.log('Processing courses:', planning.courses);
    
    return planning.courses.map((course, index) => {
      // Normalize day to lowercase for matching
      const normalizedDay = course.day.toLowerCase();
      const dayIndex = DAYS.findIndex(day => day.includes(normalizedDay) || normalizedDay.includes(day));
      
      // Handle time - support both time and startTime/endTime
      let startTime = course.startTime || course.time;
      let endTime = course.endTime;
      
      // If time contains a range (e.g., "14:00-15:30"), split it
      if (startTime && startTime.includes('-')) {
        const [start, end] = startTime.split('-');
        startTime = start.trim();
        endTime = end.trim();
      }
      
      // If no endTime, assume 1 hour duration
      if (!endTime && startTime) {
        const [hours, minutes] = startTime.split(':').map(Number);
        const endHour = hours + 1;
        endTime = `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
      
      const processedCourse = {
        ...course,
        dayIndex,
        startTime,
        endTime,
        teacher: course.teacher || course.professor || 'Non spécifié',
        id: course.id || `course-${index}`
      };
      
      console.log('Processed course:', processedCourse);
      return processedCourse;
    }).filter(course => course.dayIndex !== -1); // Filter out invalid days
  }, [planning.courses]);

  console.log('Final processed courses:', processedCourses);

  const getCoursesAtTime = (dayIndex: number, timeSlot: string) => {
    const courses = processedCourses.filter(course => {
      return course.dayIndex === dayIndex && 
             course.startTime === timeSlot;
    });
    
    console.log(`Courses for day ${dayIndex}, time ${timeSlot}:`, courses);
    return courses;
  };

  if (viewMode === 'table') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Jour</th>
              <th className="border border-gray-300 p-2">Heure</th>
              <th className="border border-gray-300 p-2">Matière</th>
              <th className="border border-gray-300 p-2">Professeur</th>
              <th className="border border-gray-300 p-2">Salle</th>
            </tr>
          </thead>
          <tbody>
            {processedCourses.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2 capitalize">{course.day}</td>
                <td className="border border-gray-300 p-2">
                  {course.startTime}{course.endTime ? ` - ${course.endTime}` : ''}
                </td>
                <td className="border border-gray-300 p-2">{course.subject}</td>
                <td className="border border-gray-300 p-2">{course.teacher}</td>
                <td className="border border-gray-300 p-2">{course.room || 'Non spécifiée'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-8 gap-1 mb-4">
          {/* Header */}
          <div className="bg-gray-100 p-3 text-center font-semibold text-gray-700">
            Horaire
          </div>
          {DAYS.slice(0, 7).map((day) => (
            <div key={day} className="bg-gray-100 p-3 text-center font-semibold text-gray-700 capitalize">
              {day}
            </div>
          ))}

          {/* Time slots and courses */}
          {TIME_SLOTS.map((timeSlot) => (
            <React.Fragment key={timeSlot}>
              {/* Time column */}
              <div className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-600 border-r">
                {timeSlot}
              </div>
              
              {/* Day columns */}
              {DAYS.slice(0, 7).map((day, dayIndex) => {
                const coursesAtTime = getCoursesAtTime(dayIndex, timeSlot);
                
                return (
                  <div key={`${day}-${timeSlot}`} className="border border-gray-200 min-h-[60px] p-1">
                    {coursesAtTime.map((course, courseIndex) => (
                      <motion.div
                        key={`${course.id}-${courseIndex}`}
                        className="bg-blue-100 border border-blue-300 rounded p-2 mb-1 cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => setSelectedCourse(course)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="text-xs font-semibold text-blue-800 truncate">
                          {course.subject}
                        </div>
                        <div className="text-xs text-blue-600 truncate">
                          {course.teacher}
                        </div>
                        {course.room && (
                          <div className="text-xs text-blue-500 truncate">
                            {course.room}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
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
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlanningCalendar;
