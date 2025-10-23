// app/api/rooms/ready/route.ts
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
    const { roomCode, playerId } = await request.json();

    const room = await roomStore.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Marquer le joueur comme prêt
    const player = room.players.find(p => p.id === playerId);
    if (player) {
      player.ready = true;
      await roomStore.update(roomCode, room);

      // Notifier tous les joueurs
      await pusher.trigger(`room-${roomCode}`, 'player-ready', {
        playerId,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error setting player ready:', error);
    return NextResponse.json({ error: 'Failed to set ready' }, { status: 500 });
  }
}
