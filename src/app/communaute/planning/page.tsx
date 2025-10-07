"use client";
import SmartPlanningIntelligent from '@/components/planning/SmartPlanningIntelligent';
import { Toaster } from 'react-hot-toast';

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            📅 Planning Intelligent
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Importez et gérez votre planning scolaire avec mise à jour automatique.
            <br />
            Analysez votre PDF et visualisez vos cours de façon moderne.
          </p>
        </div>

        {/* Smart Planning Component */}
        <SmartPlanningIntelligent />
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #475569',
          },
        }}
      />
    </div>
  );
}
