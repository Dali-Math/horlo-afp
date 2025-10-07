"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, User } from 'lucide-react';
import { PlanningData, CourseData } from './SmartPlanningIntelligent';

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

export function PlanningCalendar({ planning }: PlanningCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  // Group courses by day and assign colors
  const coursesByDay = useMemo(() => {
    const grouped: { [key: string]: CourseData[] } = {};
    const colorMap: { [subject: string]: string } = {};
    let colorIndex = 0;

    planning.courses.forEach(course => {
      // Assign color to subject if not already assigned
      if (!colorMap[course.subject]) {
        colorMap[course.subject] = SUBJECT_COLORS[colorIndex % SUBJECT_COLORS.length];
        colorIndex++;
      }

      // Add color to course
      const courseWithColor = {
        ...course,
        color: colorMap[course.subject]
      };

      if (!grouped[course.day]) {
        grouped[course.day] = [];
      }
      grouped[course.day].push(courseWithColor);
    });

    // Sort courses by start time within each day
    Object.keys(grouped).forEach(day => {
      grouped[day].sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));
    });

    return grouped;
  }, [planning.courses]);

  const getTimePosition = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (hours - 8) * 60 + minutes; // Starting from 8:00
    return (totalMinutes / 60) * 4; // 4 units per hour
  };

  const getCourseDuration = (startTime: string, endTime: string) => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    return ((endMinutes - startMinutes) / 60) * 4; // 4 units per hour
  };

  const formatTime = (time: string) => {
    return time.replace(':', 'h');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="text-blue-400" size={28} />
          <div>
            <h2 className="text-2xl font-bold text-white">
              📅 Emploi du temps
            </h2>
            <p className="text-slate-300 text-sm">
              {planning.metadata.totalCourses} cours • {planning.metadata.subjects.length} matières
            </p>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
            disabled={currentWeek === 0}
          >
            <ChevronLeft size={20} />
          </motion.button>
          
          <span className="text-white font-medium px-4">
            Semaine {currentWeek + 1}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-black/20 rounded-xl p-4 overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="text-slate-400 text-sm font-medium p-2">
              Horaires
            </div>
            {DAYS.map(day => (
              <div key={day} className="text-center">
                <div className="text-white font-semibold text-sm mb-1">{day}</div>
                <div className="text-slate-400 text-xs">
                  {coursesByDay[day]?.length || 0} cours
                </div>
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="relative">
            {/* Time Labels */}
            <div className="absolute left-0 top-0 bottom-0 w-20">
              {TIME_SLOTS.map((time, index) => (
                <div
                  key={time}
                  className="text-slate-400 text-xs py-2 text-right pr-2"
                  style={{ height: '32px' }}
                >
                  {index % 2 === 0 ? time : ''}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="ml-20 grid grid-cols-7 gap-2">
              {DAYS.map(day => (
                <div key={day} className="relative border-l border-slate-600 pl-2" style={{ minHeight: `${TIME_SLOTS.length * 32}px` }}>
                  {/* Hour Lines */}
                  {TIME_SLOTS.map((_, index) => (
                    <div
                      key={index}
                      className="absolute left-0 right-0 border-t border-slate-700/50"
                      style={{ top: `${index * 32}px` }}
                    />
                  ))}

                  {/* Courses */}
                  {coursesByDay[day]?.map((course, index) => {
                    const topPosition = getTimePosition(course.startTime!) * 8; // 8px per unit
                    const height = getCourseDuration(course.startTime!, course.endTime!) * 8;
                    
                    return (
                      <motion.div
                        key={`${course.id}-${index}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        className={`absolute left-1 right-1 bg-gradient-to-r ${course.color} rounded-lg p-2 cursor-pointer shadow-lg border border-white/20`}
                        style={{
                          top: `${topPosition}px`,
                          height: `${Math.max(height, 32)}px`
                        }}
                        onClick={() => setSelectedCourse(course)}
                      >
                        <div className="text-white text-xs font-semibold truncate">
                          {course.subject}
                        </div>
                        <div className="text-white/90 text-xs truncate">
                          {formatTime(course.startTime!)} - {formatTime(course.endTime!)}
                        </div>
                        {height > 50 && (
                          <>
                            <div className="text-white/80 text-xs truncate">
                              🏛️ {course.room}
                            </div>
                            {height > 70 && (
                              <div className="text-white/80 text-xs truncate">
                                👨‍🏫 {course.teacher}
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-slate-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                {selectedCourse.subject}
              </h3>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300">
                <Clock size={16} />
                <span>
                  {formatTime(selectedCourse.startTime!)} - {formatTime(selectedCourse.endTime!)}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300">
                <MapPin size={16} />
                <span>Salle {selectedCourse.room}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300">
                <User size={16} />
                <span>{selectedCourse.teacher}</span>
              </div>
              
              <div className="flex items-center space-x-2 text-slate-300">
                <Calendar size={16} />
                <span>{selectedCourse.day}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
