'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, googleProvider } from '@/lib/firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';
import { Calendar, Clock, Plus, Download, LogOut, Shield } from 'lucide-react';
import WeeklyPlanner from '@/components/planning/WeeklyPlanner';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

export default function PlanningPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [planningData, setPlanningData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setPlanningData([]);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.setFontSize(20);
    pdf.text('Mon Planning Horlogerie', 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Utilisateur: ${user?.displayName || user?.email}`, 20, 40);
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 20, 50);
    
    // Ajouter les données du planning
    let yPos = 70;
    planningData.forEach((item, index) => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 20;
      }
      pdf.text(`${item.day} ${item.time}: ${item.subject} - ${item.description}`, 20, yPos);
      yPos += 10;
    });
    
    pdf.save(`planning-horlogerie-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Shield className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                📅 Mon Planning Horlogerie
              </h1>
              
              <p className="text-gray-600 mb-8 text-lg">
                Organisez vos cours, stages et projets horlogers avec un planning personnalisé et sécurisé.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="h-5 w-5 text-amber-600 mr-2" />
                  <span className="font-semibold text-amber-800">Connexion requise</span>
                </div>
                <p className="text-amber-700 text-sm">
                  Pour accéder à votre planning personnel et garantir la sécurité de vos données, 
                  une authentification Google est nécessaire.
                </p>
              </div>
              
              <Button 
                onClick={handleGoogleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg flex items-center mx-auto"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Se connecter avec Google
              </Button>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center justify-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Planning semainier
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2 text-green-500" />
                  Gestion horaires
                </div>
                <div className="flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2 text-purple-500" />
                  Export PDF
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  📅 Mon Planning Horlogerie
                </h1>
                <p className="text-gray-600">
                  Bienvenue, {user.displayName || user.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={exportToPDF}
                variant="outline"
                className="flex items-center"
                disabled={planningData.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter PDF
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center text-red-600 hover:text-red-700"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        {/* Planning Component */}
        <div className="bg-white rounded-xl shadow-sm">
          <WeeklyPlanner 
            userId={user.uid}
            onDataChange={setPlanningData}
          />
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Vos données sont stockées de manière sécurisée et privée</p>
        </div>
      </div>
    </div>
  );
}
