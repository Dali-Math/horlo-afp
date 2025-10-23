// app/api/rooms/answer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { roomStore } from '@/lib/room-store';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { roomCode, playerId, answer, timeLeft } = await request.json();

    const room = roomStore.get(roomCode);

    if (!room || !room.gameState) {
      return NextResponse.json({ error: 'Room or game not found' }, { status: 404 });
    }

    // Enregistrer la réponse
    const player = room.players.find(p => p.id === playerId);
    if (player) {
      player.currentAnswer = answer;
      player.hasAnswered = true;
    }

    // Notifier que le joueur a répondu
    await pusher.trigger(`room-${roomCode}`, 'player-answered', {
      playerId,
      answer,
    });

    // Vérifier si les 2 joueurs ont répondu
    const allAnswered = room.players.every(p => p.hasAnswered);

    if (allAnswered) {
      // Calculer les scores
      const currentQuestion = room.gameState.questions[room.gameState.currentQuestionIndex];
      const correctAnswer = currentQuestion.correctAnswer;

      room.players.forEach(player => {
        if (player.currentAnswer === correctAnswer) {
          // Bonne réponse
          const basePoints = currentQuestion.difficulty === 'facile' ? 100 :
                             currentQuestion.difficulty === 'moyen' ? 200 : 300;
          const bonusTime = timeLeft * 2; // Bonus de temps
          player.score += basePoints + bonusTime;
          player.streak += 1;
        } else {
          // Mauvaise réponse
          player.streak = 0;
        }
      });

      roomStore.update(roomCode, room);

      // Envoyer les résultats
      await pusher.trigger(`room-${roomCode}`, 'question-result', {
        correctAnswer,
        player1Score: room.players[0].score,
        player2Score: room.players[1].score,
        player1Id: room.players[0].id,
      });

      // Attendre 3 secondes puis passer à la question suivante
      setTimeout(async () => {
        const updatedRoom = roomStore.get(roomCode);
        if (!updatedRoom || !updatedRoom.gameState) return;

        const nextIndex = updatedRoom.gameState.currentQuestionIndex + 1;

        if (nextIndex < updatedRoom.gameState.questions.length) {
          // Question suivante
          updatedRoom.gameState.currentQuestionIndex = nextIndex;
          updatedRoom.players.forEach(p => {
            p.hasAnswered = false;
            p.currentAnswer = null;
          });
          roomStore.update(roomCode, updatedRoom);

          await pusher.trigger(`room-${roomCode}`, 'next-question', {
            question: updatedRoom.gameState.questions[nextIndex],
            index: nextIndex,
          });
        } else {
          // Partie terminée
          const winner = updatedRoom.players[0].score > updatedRoom.players[1].score
            ? updatedRoom.players[0]
            : updatedRoom.players[0].score < updatedRoom.players[1].score
            ? updatedRoom.players[1]
            : null; // Égalité

          await pusher.trigger(`room-${roomCode}`, 'game-over', {
            winner,
          });

          // Supprimer la room après 30 secondes
          setTimeout(() => {
            roomStore.delete(roomCode);
          }, 30000);
        }
      }, 3000);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling answer:', error);
    return NextResponse.json({ error: 'Failed to handle answer' }, { status: 500 });
  }
}
