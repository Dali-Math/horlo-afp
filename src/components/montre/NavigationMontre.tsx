'use client';

import { BookOpen, Cog, Watch, RotateCw, Settings, Trophy, TrendingUp, GraduationCap } from 'lucide-react';
import { useMontre } from './MontreMecaniqueProvider';
import { Badge } from '@/components/ui/Badge';

const tabs = [
  { id: 'introduction', label: 'Introduction', icon: BookOpen },
  { id: 'organes', label: 'Organes', icon: Cog },
  { id: 'animation', label: 'Animation', icon: Watch },
  { id: 'echappement', label: 'Échappement', icon: RotateCw },
  { id: 'schema', label: 'Schéma', icon: Settings },
  { id: 'comparaison', label: 'Comparaison', icon: Trophy },
  { id: 'statistiques', label: 'Statistiques', icon: TrendingUp },
  { id: 'quiz', label: 'Quiz', icon: GraduationCap }
];

export function NavigationMontre() {
  const { activeTab, setActiveTab, progression } = useMontre();

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-2 mb-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCompleted = progression[tab.id];

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all relative
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-300 hover:bg-slate-700/50'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isCompleted && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                  ✓
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
