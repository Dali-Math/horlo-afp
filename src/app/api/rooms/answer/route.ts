export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { roomStore } from '@/lib/room-store';

const { PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER } = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID ?? '',
  key: NEXT_PUBLIC_PUSHER_KEY ?? '',
  secret: PUSHER_SECRET ?? '',
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER ?? 'eu',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomCode, playerId, answer } = body || {};

    if (!roomCode || !playerId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const player = room.players.find((p: any) => p.id === playerId);
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    // ✅ Sauvegarder la réponse du joueur selon ton modèle
    player.currentAnswer = answer ?? null;
    player.hasAnswered = true;

    await roomStore.update(roomCode, room);

    // ✅ Notifier via Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, 'player-answered', { playerId, answer });
    } catch (pushError) {
      console.error('Pusher trigger failed:', pushError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/rooms/answer:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message || error },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'answer endpoint active' });
}

export async function HEAD() {
  return NextResponse.json({ status: 'ok' });
}
