'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanningEvent {
  id?: string;
  userId: string;
  day: string;
  time: string;
  subject: string;
  description: string;
  color: string;
}

interface WeeklyPlannerProps {
  userId: string;
  onDataChange: (data: any[]) => void;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

const SUBJECT_COLORS = [
  { name: 'Théorie', color: '#3B82F6' },
  { name: 'Pratique', color: '#10B981' },
  { name: 'CAO/DAO', color: '#8B5CF6' },
  { name: 'Histoire', color: '#F59E0B' },
  { name: 'Stage', color: '#EF4444' },
  { name: 'Projet', color: '#EC4899' },
  { name: 'Autre', color: '#6B7280' },
];

export default function WeeklyPlanner({ userId, onDataChange }: WeeklyPlannerProps) {
  const [events, setEvents] = useState<PlanningEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<PlanningEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<PlanningEvent>>({
    day: '',
    time: '',
    subject: '',
    description: '',
    color: SUBJECT_COLORS[0].color
  });

  useEffect(() => {
    loadEvents();
  }, [userId]);

  useEffect(() => {
    onDataChange(events);
  }, [events]);

  const loadEvents = async () => {
    try {
      const q = query(collection(db, 'planning'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const loadedEvents: PlanningEvent[] = [];
      querySnapshot.forEach((doc) => {
        loadedEvents.push({ id: doc.id, ...doc.data() } as PlanningEvent);
      });
      setEvents(loadedEvents);
    } catch (error) {
      console.error('Erreur de chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = async () => {
    if (!formData.day || !formData.time || !formData.subject) return;
    
    try {
      const eventData = {
        userId,
        day: formData.day,
        time: formData.time,
        subject: formData.subject,
        description: formData.description || '',
        color: formData.color || SUBJECT_COLORS[0].color
      };
      
      const docRef = await addDoc(collection(db, 'planning'), eventData);
      setEvents([...events, { id: docRef.id, ...eventData }]);
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Erreur d\'ajout:', error);
    }
  };

  const handleUpdateEvent = async () => {
    if (!editingEvent?.id) return;
    
    try {
      const eventRef = doc(db, 'planning', editingEvent.id);
      await updateDoc(eventRef, {
        day: formData.day,
        time: formData.time,
        subject: formData.subject,
        description: formData.description,
        color: formData.color
      });
      
      setEvents(events.map(e => 
        e.id === editingEvent.id 
          ? { ...e, ...formData } as PlanningEvent
          : e
      ));
      setEditingEvent(null);
      resetForm();
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, 'planning', eventId));
      setEvents(events.filter(e => e.id !== eventId));
    } catch (error) {
      console.error('Erreur de suppression:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      day: '',
      time: '',
      subject: '',
      description: '',
      color: SUBJECT_COLORS[0].color
    });
  };

  const getEventForSlot = (day: string, time: string) => {
    return events.find(e => e.day === day && e.time === time);
  };

  if (loading) {
    return <div className="p-6 text-center">Chargement...</div>;
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Planning de la semaine</h2>
        <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un cours
        </Button>
      </div>

      {/* Planning Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-gray-100 p-2 text-sm font-semibold text-gray-700 w-24">Heure</th>
              {DAYS.map(day => (
                <th key={day} className="border border-gray-300 bg-gray-100 p-2 text-sm font-semibold text-gray-700">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(time => (
              <tr key={time}>
                <td className="border border-gray-300 bg-gray-50 p-2 text-sm font-medium text-gray-600 text-center">
                  {time}
                </td>
                {DAYS.map(day => {
                  const event = getEventForSlot(day, time);
                  return (
                    <td key={`${day}-${time}`} className="border border-gray-300 p-1 h-20">
                      {event ? (
                        <div 
                          className="h-full rounded p-2 relative group cursor-pointer"
                          style={{ backgroundColor: event.color + '20', borderLeft: `4px solid ${event.color}` }}
                          onClick={() => {
                            setEditingEvent(event);
                            setFormData(event);
                          }}
                        >
                          <div className="text-sm font-semibold" style={{ color: event.color }}>
                            {event.subject}
                          </div>
                          <div className="text-xs text-gray-600 truncate">
                            {event.description}
                          </div>
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(event.id!);
                              }}
                              className="bg-red-500 hover:bg-red-600 text-white rounded p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingEvent) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingEvent ? 'Éditer le cours' : 'Ajouter un cours'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jour</label>
                <select
                  value={formData.day}
                  onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Sélectionner</option>
                  {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heure</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Sélectionner</option>
                  {TIME_SLOTS.map(time => <option key={time} value={time}>{time}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matière</label>
                <select
                  value={formData.subject}
                  onChange={(e) => {
                    const selected = SUBJECT_COLORS.find(s => s.name === e.target.value);
                    setFormData({ 
                      ...formData, 
                      subject: e.target.value,
                      color: selected?.color || SUBJECT_COLORS[0].color
                    });
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">Sélectionner</option>
                  {SUBJECT_COLORS.map(subj => (
                    <option key={subj.name} value={subj.name}>{subj.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows={3}
                  placeholder="Détails du cours..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingEvent(null);
                  resetForm();
                }}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
              <Button
                onClick={editingEvent ? handleUpdateEvent : handleAddEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingEvent ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
