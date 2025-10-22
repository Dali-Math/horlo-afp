// app/quiz/[id]/page.tsx
import { notFound } from 'next/navigation';
import InteractiveQuiz from '@/components/Quiz/InteractiveQuiz';
import { getQuizById } from '@/data/quizzes';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function QuizPage({ params }: { params: { id: string } }) {
  const quiz = getQuizById(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-dark-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Bouton retour */}
        <Link 
          href="/quiz" 
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

// Générer les métadonnées SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const quiz = getQuizById(params.id);

  if (!quiz) {
    return {
      title: 'Quiz introuvable',
    };
  }

  return {
    title: `${quiz.title} | HorloLearn`,
    description: quiz.description,
    openGraph: {
      title: quiz.title,
      description: quiz.description,
      type: 'website',
    },
  };
}

// Générer les routes statiques (optionnel)
export async function generateStaticParams() {
  const quizzes = [
    { id: 'echappement-suisse' },
    { id: 'base-horlogerie' },
    { id: 'calibre-eta2824' },
  ];

  return quizzes.map((quiz) => ({
    id: quiz.id,
  }));
}
