"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';

// Debug log to verify planning prop propagation
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

// French day mapping for reliable normalization
const DAY_MAPPING: Record<string, string> = {
  'lundi': 'Lundi',
  'mardi': 'Mardi', 
  'mercredi': 'Mercredi',
  'jeudi': 'Jeudi',
  'vendredi': 'Vendredi',
  'samedi': 'Samedi',
  'dimanche': 'Dimanche',
  'lun': 'Lundi',
  'mar': 'Mardi',
  'mer': 'Mercredi', 
  'jeu': 'Jeudi',
  'ven': 'Vendredi',
  'sam': 'Samedi',
  'dim': 'Dimanche',
  'monday': 'Lundi',
  'tuesday': 'Mardi',
  'wednesday': 'Mercredi',
  'thursday': 'Jeudi',
  'friday': 'Vendredi',
  'saturday': 'Samedi',
  'sunday': 'Dimanche'
};

// Hour normalization mapping
const normalizeTime = (time: string): string => {
  if (!time) return '';
  
  // Convert 08:00 → 8:00, 14:30 → 14:30, etc.
  const cleanTime = time.replace(/^0(\d):/, '$1:');
  return cleanTime;
};

// Normalize day name
const normalizeDay = (day: string): string => {
  if (!day) return '';
  
  const lowerDay = day.toLowerCase().trim();
  return DAY_MAPPING[lowerDay] || day;
};

const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planning, viewMode }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Debug logging
  logPlanning(planning);
  
  // Process and normalize courses
  const processedCourses = useMemo(() => {
    if (!planning?.courses) return [];
    
    return planning.courses.map((course, index) => ({
      id: `course-${index}`,
      day: normalizeDay(course.day),
      startTime: normalizeTime(course.startTime || course.time || ''),
      endTime: normalizeTime(course.endTime || ''),
      subject: course.subject || 'Matière non définie',
      teacher: course.teacher || course.professor || 'Enseignant non défini',
      room: course.room || 'Salle non définie'
    }));
  }, [planning]);
  
  // Days of the week
  const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  // Time slots (8:00 to 18:00)
  const timeSlots = [
    '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];
  
  // Group courses by day and time
  const coursesByDayTime = useMemo(() => {
    const grouped: Record<string, Record<string, CourseData[]>> = {};
    
    daysOfWeek.forEach(day => {
      grouped[day] = {};
      timeSlots.forEach(time => {
        grouped[day][time] = [];
      });
    });
    
    processedCourses.forEach(course => {
      const day = course.day;
      const time = course.startTime;
      
      if (day && time && grouped[day] && grouped[day][time]) {
        grouped[day][time].push(course);
      }
    });
    
    return grouped;
  }, [processedCourses]);
  
  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prev => direction === 'next' ? prev + 1 : prev - 1);
  };
  
  const renderCalendarView = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <button
          onClick={() => navigateWeek('prev')}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Semaine précédente"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <h2 className="text-xl font-bold">
            Semaine du {new Date(Date.now() + currentWeek * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </h2>
        </div>
        
        <button
          onClick={() => navigateWeek('next')}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Semaine suivante"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-8 min-w-full">
          {/* Time column header */}
          <div className="bg-gray-50 p-3 border-r border-gray-200 font-semibold text-gray-700">
            Heure
          </div>
          
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div key={day} className="bg-gray-50 p-3 border-r border-gray-200 text-center font-semibold text-gray-700">
              {day}
            </div>
          ))}
          
          {/* Time slots and courses */}
          {timeSlots.map(time => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="bg-gray-50 p-3 border-r border-b border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {time}
              </div>
              
              {/* Course cells for each day */}
              {daysOfWeek.map(day => {
                const courses = coursesByDayTime[day]?.[time] || [];
                
                return (
                  <div
                    key={`${day}-${time}`}
                    className="border-r border-b border-gray-200 p-2 min-h-[60px] relative"
                  >
                    {courses.map((course, index) => (
                      <motion.div
                        key={`${course.id}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-blue-100 border-l-4 border-blue-500 rounded p-2 mb-1 text-xs hover:bg-blue-200 transition-colors cursor-pointer"
                        title={`${course.subject} - ${course.teacher} - ${course.room}`}
                      >
                        <div className="font-semibold text-blue-900 truncate">
                          {course.subject}
                        </div>
                        <div className="text-blue-700 flex items-center mt-1">
                          <User className="w-3 h-3 mr-1" />
                          <span className="truncate">{course.teacher}</span>
                        </div>
                        <div className="text-blue-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{course.room}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderTableView = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Jour</th>
              <th className="px-4 py-3 text-left font-semibold">Heure</th>
              <th className="px-4 py-3 text-left font-semibold">Matière</th>
              <th className="px-4 py-3 text-left font-semibold">Enseignant</th>
              <th className="px-4 py-3 text-left font-semibold">Salle</th>
            </tr>
          </thead>
          <tbody>
            {processedCourses.length > 0 ? (
              processedCourses.map((course, index) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">{course.day}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      {course.startTime}
                      {course.endTime && ` - ${course.endTime}`}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">{course.subject}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-500" />
                      {course.teacher}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                      {course.room}
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center space-y-2">
                    <Calendar className="w-8 h-8 text-gray-400" />
                    <p>Aucun cours trouvé</p>
                    <p className="text-sm">Importez un planning PDF pour voir les cours</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  // Debug info
  if (process.env.NODE_ENV === 'development') {
    console.log('PlanningCalendar render:', {
      planning,
      viewMode,
      coursesCount: processedCourses.length,
      processedCourses: processedCourses.slice(0, 3) // Show first 3 for debug
    });
  }
  
  return (
    <div className="p-4">
      {viewMode === 'calendar' ? renderCalendarView() : renderTableView()}
    </div>
  );
};

export default PlanningCalendar;
