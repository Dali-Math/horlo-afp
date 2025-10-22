// app/quiz-test/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import InteractiveQuiz from '@/components/Quiz/InteractiveQuiz';
import { getQuizById } from '@/data/quizzes';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const foundQuiz = getQuizById(params.id);
    
    if (!foundQuiz) {
      // Rediriger vers la liste si le quiz n'existe pas
      router.push('/quiz-test');
      return;
    }
    
    setQuiz(foundQuiz);
    setLoading(false);
  }, [params.id, router]);

  if (loading || !quiz) {
    return (
      <main className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-inter text-light-200">Chargement du quiz...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Link 
          href="/quiz-test" 
          className="inline-flex items-center gap-2 mb-8 text-light-200 hover:text-gold transition font-inter text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux quiz
        </Link>

        {/* En-tête du quiz */}
        <div className="mb-12 text-center">
          <h1 className="font-bebas text-5xl md:text-6xl text-light-100 mb-4">
            {quiz.title}
          </h1>
          <p className="font-inter text-lg text-light-200 max-w-2xl mx-auto mb-6">
            {quiz.description}
          </p>
          
          {/* Informations du quiz */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10">
              <span className="text-gold font-oswald">
                {quiz.questions.length} questions
              </span>
            </div>
            
            {quiz.duration && (
              <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10">
                <span className="text-gold font-oswald">
                  ~{quiz.duration} minutes
                </span>
              </div>
            )}
            
            <div className="px-4 py-2 rounded-full bg-dark-800 border border-white/10">
              <span className="text-gold font-oswald">
                {quiz.passingScore}% pour réussir
              </span>
            </div>
          </div>
        </div>

        {/* Composant Quiz */}
        <InteractiveQuiz 
          quiz={quiz}
          onComplete={(result) => {
            console.log('Quiz terminé:', result);
            // Optionnel : analytics, partage social, etc.
          }}
        />
      </div>
    </main>
  );
}
