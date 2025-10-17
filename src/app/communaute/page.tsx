'use client';

import React, { useState, useCallback } from 'react';
import { 
  ChevronLeft, 
  Upload, 
  Calendar, 
  Clock, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Share2, 
  TrendingUp,
  FileText,
  Download,
  RefreshCw,
  CheckCircle,
  MapPin,
  GraduationCap,
  ChevronRight,
  List,
  Filter
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  type: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  date: Date;
  color: string;
  periods: number;
}

interface Discussion {
  id: string;
  author: string;
  avatar: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isHot: boolean;
}

// Données réelles du planning (basées sur votre PDF)
const realPlanningData: Course[] = [
  // Semaine du 13-18 octobre 2025
  {
    id: '1',
    title: 'Pratique d\'horlogerie',
    type: 'Atelier',
    teacher: 'V. Guilliou',
    room: 'Atelier 414',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 9, 13), // Lundi 13 oct
    color: 'bg-blue-500',
    periods: 414
  },
  {
    id: '2',
    title: 'Mathématiques',
    type: 'Cours',
    teacher: 'M. Achram',
    room: 'Salle 205',
    startTime: '17:15',
    endTime: '20:15',
    date: new Date(2025, 9, 16), // Jeudi 16 oct
    color: 'bg-orange-500',
    periods: 35
  },
  
  // Semaine du 20-25 octobre 2025
  {
    id: '3',
    title: 'Dessin Tech.',
    type: 'Cours',
    teacher: 'P. Wyss',
    room: 'Salle sèche',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 9, 20), // Lundi 20 oct
    color: 'bg-purple-500',
    periods: 55
  },
  {
    id: '4',
    title: 'Pratique',
    type: 'Atelier',
    teacher: 'V. Guilliou',
    room: 'Atelier 414',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 9, 22), // Mercredi 22 oct
    color: 'bg-purple-500',
    periods: 414
  },
  {
    id: '5',
    title: 'Micromécanique A',
    type: 'Atelier',
    teacher: 'H. Alves Garcia',
    room: 'Salle sèche',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 9, 24), // Vendredi 24 oct
    color: 'bg-red-500',
    periods: 50
  },
  
  // Novembre (exemples)
  {
    id: '6',
    title: 'Pratique d\'horlogerie',
    type: 'Atelier',
    teacher: 'V. Guilliou',
    room: 'Atelier 414',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 10, 3), // Lundi 3 nov
    color: 'bg-blue-500',
    periods: 414
  },
  {
    id: '7',
    title: 'Théorie d\'horlogerie',
    type: 'Cours',
    teacher: 'P. Rouge',
    room: 'Salle 205',
    startTime: '17:00',
    endTime: '20:45',
    date: new Date(2025, 10, 5), // Mercredi 5 nov
    color: 'bg-green-500',
    periods: 70
  },
  {
    id: '8',
    title: 'Micromécanique B',
    type: 'Atelier',
    teacher: 'H. Alves Garcia',
    room: 'Salle sèche',
    startTime: '17:30',
    endTime: '21:15',
    date: new Date(2025, 10, 8), // Samedi 8 nov
    color: 'bg-indigo-500',
    periods: 41
  }
];

const discussions: Discussion[] = [
  {
    id: '1',
    author: 'Jean-Marc L.',
    avatar: 'JM',
    title: 'Aide : Problème avec le démontage du pont de balancier ETA 2824',
    category: 'Pratique',
    replies: 12,
    views: 245,
    lastActivity: 'Il y a 5 min',
    isHot: true
  },
  {
    id: '2',
    author: 'Sophie D.',
    avatar: 'SD',
    title: 'Partage : Mon premier remontage complet réussi ! 🎉',
    category: 'Succès',
    replies: 28,
    views: 412,
    lastActivity: 'Il y a 1h',
    isHot: true
  },
  {
    id: '3',
    author: 'Thomas B.',
    avatar: 'TB',
    title: 'Question : Différence entre spiral Nivarox et Anachron ?',
    category: 'Théorie',
    replies: 8,
    views: 156,
    lastActivity: 'Il y a 2h',
    isHot: false
  },
  {
    id: '4',
    author: 'Marie P.',
    avatar: 'MP',
    title: 'Ressources : Collection de plans techniques ETA gratuits',
    category: 'Ressources',
    replies: 45,
    views: 892,
    lastActivity: 'Il y a 3h',
    isHot: true
  },
  {
    id: '5',
    author: 'Laurent K.',
    avatar: 'LK',
    title: 'Stage : Manufacture Horlogère cherche apprenti à Neuchâtel',
    category: 'Opportunités',
    replies: 15,
    views: 523,
    lastActivity: 'Il y a 5h',
    isHot: false
  }
];

export default function CommunautePage() {
  const [activeTab, setActiveTab] = useState<'planning' | 'discussions'>('planning');
  const [viewMode, setViewMode] = useState<'week' | 'month' | 'list'>('week');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    return new Date(2025, 9, 13); // Semaine du 13 octobre 2025
  });
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // Octobre 2025
  const [planningInfo, setPlanningInfo] = useState<{
    module: string;
    code: string;
    totalPeriods: number;
    totalCourses: number;
  } | null>(null);

  // Obtenir le lundi de la semaine donnée
  function getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  // Obtenir la semaine courante (lundi à samedi)
  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      setTimeout(() => {
        setCourses(realPlanningData);
        setPlanningInfo({
          module: 'Formation modulaire en Horlogerie - Module de Base',
          code: 'HORL1_S925',
          totalPeriods: 701,
          totalCourses: 215
        });
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2500);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsAnalyzing(true);
      
      setTimeout(() => {
        setCourses(realPlanningData);
        setPlanningInfo({
          module: 'Formation modulaire en Horlogerie - Module de Base',
          code: 'HORL1_S925',
          totalPeriods: 701,
          totalCourses: 215
        });
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2500);
    }
  }, []);

  const formatDate = (date: Date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()]
    };
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToPreviousMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const exportToCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HorloLearn//Planning//FR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:Planning Horlogerie',
      'X-WR-TIMEZONE:Europe/Zurich',
      ...courses.map(course => {
        const startDateTime = new Date(course.date);
        const [startHours, startMinutes] = course.startTime.split(':');
        startDateTime.setHours(parseInt(startHours), parseInt(startMinutes), 0);
        
        const endDateTime = new Date(course.date);
        const [endHours, endMinutes] = course.endTime.split(':');
        endDateTime.setHours(parseInt(endHours), parseInt(endMinutes), 0);
        
        const formatICSDate = (date: Date) => {
          return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        return [
          'BEGIN:VEVENT',
          `UID:${course.id}@horlolearn.ch`,
          `DTSTAMP:${formatICSDate(new Date())}`,
          `DTSTART:${formatICSDate(startDateTime)}`,
          `DTEND:${formatICSDate(endDateTime)}`,
          `SUMMARY:${course.title}`,
          `LOCATION:${course.room}`,
          `DESCRIPTION:Type: ${course.type}\\nFormateur: ${course.teacher}\\nPériodes: ${course.periods}`,
          'STATUS:CONFIRMED',
          'TRANSP:OPAQUE',
          'END:VEVENT'
        ].join('\n');
      }),
      'END:VCALENDAR'
    ].join('\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'planning-horlogerie.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Pratique': return 'bg-blue-100 text-blue-700';
      case 'Théorie': return 'bg-purple-100 text-purple-700';
      case 'Succès': return 'bg-green-100 text-green-700';
      case 'Ressources': return 'bg-orange-100 text-orange-700';
      case 'Opportunités': return 'bg-pink-100 text-pink-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  // Render Vue Semaine
  const renderWeekView = () => {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousWeek}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h3 className="text-xl font-bold text-slate-900">
            Semaine du {weekDays[0].getDate()} {formatDate(weekDays[0]).month} au {weekDays[5].getDate()} {formatDate(weekDays[5]).month} {weekDays[0].getFullYear()}
          </h3>
          <button
            onClick={goToNextWeek}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="grid grid-cols-6 gap-4">
          {weekDays.map((day, index) => {
            const dayInfo = formatDate(day);
            const dayCourses = courses.filter(
              c => c.date.toDateString() === day.toDateString()
            );
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`rounded-xl p-4 border-2 transition-all min-h-[200px] ${
                  isToday
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="text-center mb-3">
                  <p className={`text-sm font-semibold ${
                    isToday ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {dayInfo.day}
                  </p>
                  <p className={`text-2xl font-bold ${
                    isToday ? 'text-blue-600' : 'text-slate-900'
                  }`}>
                    {dayInfo.date}
                  </p>
                  <p className="text-xs text-slate-500">{dayInfo.month}</p>
                </div>

                {dayCourses.length > 0 ? (
                  <div className="space-y-2">
                    {dayCourses.map((course) => (
                      <div
                        key={course.id}
                        className={`${course.color} rounded-lg p-3 text-white cursor-pointer hover:opacity-90 transition-opacity`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-3 h-3" />
                          <p className="text-xs font-bold">
                            {course.startTime} - {course.endTime}
                          </p>
                        </div>
                        <p className="text-sm font-semibold mb-1">
                          {course.title}
                        </p>
                        <p className="text-xs opacity-90">{course.type}</p>
                        <p className="text-xs opacity-75 mt-1">{course.periods} périodes</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-400">Pas de cours</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Vue Mois
  const renderMonthView = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const days = [];
    for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    
    const monthCourses = courses.filter(c => 
      c.date.getMonth() === currentMonth.getMonth() &&
      c.date.getFullYear() === currentMonth.getFullYear()
    );
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>
          <h2 className="text-2xl font-bold text-slate-900 capitalize">
            {currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>
        
        {/* Grille calendrier */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
            <div key={d} className="text-center font-bold text-slate-600 py-2 text-sm">{d}</div>
          ))}
          
          {/* Espaces vides avant le 1er jour du mois */}
          {Array.from({ length: (firstDay.getDay() + 6) % 7 }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          
          {/* Jours du mois */}
          {days.map(day => {
            const dayCourses = monthCourses.filter(c => 
              c.date.toDateString() === day.toDateString()
            );
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div key={day.toISOString()} className={`aspect-square border rounded-lg p-2 ${
                isToday ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
              } transition-all cursor-pointer`}>
                <div className={`text-sm font-semibold mb-1 ${
                  isToday ? 'text-blue-600' : 'text-slate-900'
                }`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayCourses.map(course => (
                    <div key={course.id} className={`${course.color} text-white text-[10px] rounded px-1 py-0.5 truncate`}>
                      {course.title.split(' ')[0]}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Légende */}
        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-sm font-bold text-slate-900 mb-3">Légende :</h3>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(monthCourses.map(c => c.title))).map(title => {
              const course = monthCourses.find(c => c.title === title);
              return (
                <div key={title} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${course?.color}`}></div>
                  <span className="text-sm text-slate-700">{title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats du mois */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 mb-1">Cours ce mois</p>
            <p className="text-2xl font-bold text-blue-900">{monthCourses.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 mb-1">Total heures</p>
            <p className="text-2xl font-bold text-green-900">
              {Math.round(monthCourses.length * 3.75)}h
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 mb-1">Matières différentes</p>
            <p className="text-2xl font-bold text-purple-900">
              {new Set(monthCourses.map(c => c.title)).size}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Render Vue Liste
  const renderListView = () => {
    const sortedCourses = [...courses].sort((a, b) => a.date.getTime() - b.date.getTime());
    
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Tous les cours (Sept 2025 → Mai 2026)
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrer</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedCourses.map(course => (
            <div key={course.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all">
              <div className="flex items-start gap-4">
                <div className={`${course.color} rounded-lg p-3 text-white flex-shrink-0`}>
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 mb-1 capitalize">
                    {course.date.toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                      {course.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {course.periods} périodes
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{course.startTime} - {course.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{course.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{course.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            Espace collaboratif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Communauté HorloLearn
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Échangez avec d'autres apprenants, partagez vos expériences et gérez votre planning scolaire
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-blue-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">1,247</p>
              <p className="text-sm text-slate-600">Membres actifs</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">3,456</p>
              <p className="text-sm text-slate-600">Discussions</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <Share2 className="w-8 h-8 text-green-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">892</p>
              <p className="text-sm text-slate-600">Ressources partagées</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-8 h-8 text-orange-600" />
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">156</p>
              <p className="text-sm text-slate-600">Cours partagés</p>
            </div>
          </div>
        </section>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
            <button
              onClick={() => setActiveTab('planning')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'planning'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Planning Intelligent
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'discussions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Discussions
            </button>
          </div>
        </div>

        {/* Planning Intelligent Section */}
        {activeTab === 'planning' && (
          <section className="space-y-8">
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600">
                <Upload className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Import PDF automatique</h3>
                <p className="text-sm text-slate-600">
                  Uploadez votre planning PDF une seule fois et profitez de 3 vues différentes.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-600">
                <Calendar className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">3 vues disponibles</h3>
                <p className="text-sm text-slate-600">
                  Vue hebdomadaire, mensuelle et liste complète pour une planification optimale.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600">
                <Download className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Export calendrier</h3>
                <p className="text-sm text-slate-600">
                  Exportez en .ics pour Google Calendar, Outlook ou Apple Calendar.
                </p>
              </div>
            </div>

            {/* Upload Section */}
            {!analysisComplete && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Upload className="w-6 h-6 text-blue-600" />
                  Importez votre planning
                </h2>
                
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer"
                >
                  {!isAnalyzing ? (
                    <>
                      <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-slate-900 mb-2">
                        Glissez-déposez votre PDF ici
                      </p>
                      <p className="text-sm text-slate-600 mb-4">
                        ou cliquez pour sélectionner un fichier
                      </p>
                      <label className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
                        Choisir un fichier
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-slate-500 mt-4">
                        Formats acceptés : PDF (max 5 MB)
                      </p>
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                      <p className="text-lg font-semibold text-slate-900 mb-2">
                        Analyse en cours...
                      </p>
                      <p className="text-sm text-slate-600 mb-4">
                        Extraction des cours, dates et horaires
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Planning Display */}
            {analysisComplete && planningInfo && (
              <div className="space-y-6">
                {/* Success Alert */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                        <p className="font-bold text-green-900">{planningInfo.module}</p>
                      </div>
                      <p className="text-sm text-green-800 mb-3">
                        Code module : <span className="font-semibold">{planningInfo.code}</span>
                      </p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-slate-600 mb-1">Période</p>
                          <p className="text-lg font-bold text-blue-600">Sept 2025 → Mai 2026</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-slate-600 mb-1">Total cours</p>
                          <p className="text-lg font-bold text-green-600">{planningInfo.totalCourses}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <p className="text-slate-600 mb-1">Total périodes</p>
                          <p className="text-lg font-bold text-purple-600">{planningInfo.totalPeriods}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Mode Selector */}
                <div className="flex items-center justify-between">
                  <div className="bg-white rounded-xl shadow-lg p-2 inline-flex gap-2">
                    <button
                      onClick={() => setViewMode('week')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        viewMode === 'week' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      Vue Semaine
                    </button>
                    <button
                      onClick={() => setViewMode('month')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        viewMode === 'month' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Calendar className="w-5 h-5" />
                      Vue Mois
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                        viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <List className="w-5 h-5" />
                      Vue Liste
                    </button>
                  </div>

                  <button
                    onClick={exportToCalendar}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Exporter (.ics)
                  </button>
                </div>

                {/* Conditional View Rendering */}
                {viewMode === 'week' && renderWeekView()}
                {viewMode === 'month' && renderMonthView()}
                {viewMode === 'list' && renderListView()}

                {/* Quick Actions */}
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-slate-900">Actualiser le planning</span>
                  </button>
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <Download className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-slate-900">Télécharger en PDF</span>
                  </button>
                  <button className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all border border-slate-200 flex items-center gap-3">
                    <Share2 className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-slate-900">Partager avec un ami</span>
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Discussions Section */}
        {activeTab === 'discussions' && (
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Discussions récentes</h2>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Nouvelle discussion
              </button>
            </div>

            <div className="space-y-4">
              {discussions.map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-200 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {discussion.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                              {discussion.title}
                            </h3>
                            {discussion.isHot && (
                              <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold">
                                🔥 HOT
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-600">
                            Par <span className="font-semibold">{discussion.author}</span> • {discussion.lastActivity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                          {discussion.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            {discussion.replies} réponses
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {discussion.views} vues
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="bg-white text-slate-700 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors border border-slate-200">
                Charger plus de discussions
              </button>
            </div>
          </section>
        )}

        {/* Community Guidelines */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Règles de la communauté</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2">🤝 Respect</h3>
              <p className="text-blue-100 text-sm">
                Soyez respectueux et courtois envers tous les membres de la communauté.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">💡 Partage</h3>
              <p className="text-blue-100 text-sm">
                Partagez vos connaissances et aidez les autres apprenants à progresser.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">🎯 Qualité</h3>
              <p className="text-blue-100 text-sm">
                Privilégiez les contenus de qualité et les discussions constructives.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">© 2025 HorloLearn - Passion & Découverte Horlogère Suisse</p>
        </div>
      </footer>
    </div>
  );
}
