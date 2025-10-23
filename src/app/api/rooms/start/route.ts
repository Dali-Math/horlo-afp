export const dynamic = 'force-dynamic';

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
    const { roomCode, questions, difficulty } = await request.json();

    const room = await roomStore.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const gameState = {
      roomCode,
      currentQuestionIndex: 0,
      questions,
      difficulty,
      phase: 'playing',
      host: room.host,
    };

    room.gameState = gameState;
    await roomStore.update(roomCode, room);

    await pusher.trigger(`room-${roomCode}`, 'game-started', {
      gameState,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('🔥 Error starting game:', error);
    return NextResponse.json({ error: 'Failed to start game' }, { status: 500 });
  }
}
