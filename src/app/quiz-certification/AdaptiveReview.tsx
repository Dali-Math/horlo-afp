'use client';

interface AdaptiveReviewProps {
  answers: Record<number, string>;
  score: number;
}

export default function AdaptiveReview({ answers, score }: AdaptiveReviewProps) {
  return (
    <div>
      <h2>Adaptive Review Placeholder</h2>
      <p>Score actuel : {score}</p>
      <p>Nombre de réponses : {Object.keys(answers).length}</p>
    </div>
  );
}
