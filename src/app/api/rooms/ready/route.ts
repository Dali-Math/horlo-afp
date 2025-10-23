export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { roomStore } from '@/lib/room-store';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY ?? '',
  secret: process.env.PUSHER_SECRET ?? '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? 'eu',
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { roomCode, playerId } = await request.json();

    if (!roomCode || !playerId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const player = room.players.find((p: any) => p.id === playerId);
    if (player) {
      player.ready = true;
      await roomStore.update(roomCode, room);

      await pusher.trigger(`room-${roomCode}`, 'player-ready', { playerId });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/rooms/ready:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
