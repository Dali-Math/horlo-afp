"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';

// Define types locally to avoid import errors
interface CourseData {
  day: string;
  startTime?: string;
  endTime?: string;
  time?: string;
  subject: string;
  teacher: string;
  room?: string;
}

interface PlanningData {
  courses: CourseData[];
}

interface PlanningCalendarProps {
  planning: PlanningData;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

const SUBJECT_COLORS = [
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600', 
  'from-purple-500 to-purple-600',
  'from-red-500 to-red-600',
  'from-yellow-500 to-yellow-600',
  'from-indigo-500 to-indigo-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-orange-500 to-orange-600',
  'from-cyan-500 to-cyan-600'
];

// Change to default export
const PlanningCalendar: React.FC<PlanningCalendarProps> = ({ planning }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  // Process courses data
  const processedCourses = useMemo(() => {
    if (!planning?.courses || !Array.isArray(planning.courses)) {
      return [];
    }

    return planning.courses.map((course, index) => {
      // Normalize day names
      const normalizedDay = course.day?.toLowerCase();
      const dayIndex = DAYS.findIndex(day => 
        day.toLowerCase().includes(normalizedDay) || 
        normalizedDay?.includes(day.toLowerCase())
      );

      // Parse time information
      let startTime = course.startTime;
      let endTime = course.endTime;

      if (!startTime && course.time) {
        const timeMatch = course.time.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
        if (timeMatch) {
          startTime = timeMatch[1];
          endTime = timeMatch[2];
        }
      }

      return {
        ...course,
        dayIndex: dayIndex >= 0 ? dayIndex : 0,
        startTime,
        endTime,
        colorIndex: index % SUBJECT_COLORS.length
      };
    });
  }, [planning]);

  // Get unique subjects for color consistency
  const subjectColors = useMemo(() => {
    const subjects = new Set(processedCourses.map(course => course.subject));
    const colorMap: Record<string, string> = {};
    Array.from(subjects).forEach((subject, index) => {
      colorMap[subject] = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
    });
    return colorMap;
  }, [processedCourses]);

  // Function to get courses for a specific day and time slot
  const getCoursesAtTime = (dayIndex: number, timeSlot: string) => {
    return processedCourses.filter(course => {
      if (course.dayIndex !== dayIndex) return false;
      if (!course.startTime) return false;

      const courseStart = course.startTime;
      const courseEnd = course.endTime || course.startTime;

      return timeSlot >= courseStart && timeSlot < courseEnd;
    });
  };

  // Function to calculate course duration in time slots
  const getCourseDuration = (course: any) => {
    if (!course.startTime || !course.endTime) return 1;
    
    const startIndex = TIME_SLOTS.indexOf(course.startTime);
    const endIndex = TIME_SLOTS.indexOf(course.endTime);
    
    if (startIndex >= 0 && endIndex > startIndex) {
      return endIndex - startIndex;
    }
    return 1;
  };

  // Get courses for current week (for now, showing all courses)
  const weekCourses = processedCourses;

  return (
    <div className="planning-calendar">
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
          disabled={currentWeek === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Calendar className="w-5 h-5" />
          Semaine {currentWeek + 1}
        </div>
        
        <button
          onClick={() => setCurrentWeek(prev => prev + 1)}
          className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-8 gap-1 text-sm">
        {/* Header - Time column */}
        <div className="p-2 text-center font-semibold text-gray-400">
          <Clock className="w-4 h-4 mx-auto" />
        </div>
        
        {/* Header - Day columns */}
        {DAYS.slice(0, 7).map((day, dayIndex) => (
          <div key={day} className="p-2 text-center font-semibold text-[#E2B44F]">
            {day}
          </div>
        ))}

        {/* Time slots and courses */}
        {TIME_SLOTS.map((timeSlot, timeIndex) => (
          <React.Fragment key={timeSlot}>
            {/* Time label */}
            <div className="p-2 text-center text-gray-400 text-xs font-mono">
              {timeSlot}
            </div>
            
            {/* Day columns */}
            {DAYS.slice(0, 7).map((_, dayIndex) => {
              const coursesAtTime = getCoursesAtTime(dayIndex, timeSlot);
              
              return (
                <div key={`${dayIndex}-${timeSlot}`} className="relative min-h-[40px] border border-slate-700">
                  {coursesAtTime.map((course, courseIndex) => {
                    // Only render course if this is its start time
                    if (course.startTime !== timeSlot) return null;
                    
                    const duration = getCourseDuration(course);
                    const colorClass = subjectColors[course.subject] || 'from-gray-500 to-gray-600';
                    
                    return (
                      <motion.div
                        key={`${course.subject}-${courseIndex}`}
                        className={`absolute inset-0 bg-gradient-to-br ${colorClass} rounded m-0.5 p-1 text-xs text-white cursor-pointer overflow-hidden`}
                        style={{
                          height: `${duration * 40 - 4}px`,
                          zIndex: 10
                        }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedCourse(course)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="font-semibold truncate">{course.subject}</div>
                        <div className="text-xs opacity-90 truncate">{course.teacher}</div>
                        <div className="text-xs opacity-75 truncate">{course.room}</div>
                        <div className="text-xs opacity-75">{course.startTime}-{course.endTime}</div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 m-4 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#E2B44F] mb-4">{selectedCourse.subject}</h3>
            
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#E2B44F]" />
                <span>{selectedCourse.teacher}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#E2B44F]" />
                <span>{selectedCourse.startTime} - {selectedCourse.endTime}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#E2B44F]" />
                <span>{selectedCourse.day}</span>
              </div>
              
              {selectedCourse.room && (
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#E2B44F]" />
                  <span>{selectedCourse.room}</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedCourse(null)}
              className="w-full mt-6 bg-[#E2B44F] hover:bg-[#d4a043] text-black font-semibold py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PlanningCalendar;
