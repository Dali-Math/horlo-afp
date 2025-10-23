// app/api/rooms/join/route.ts
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
    const { roomCode, player } = await request.json();

    // ✅ ATTENTION : on attend la Promise ici
    const room = await roomStore.get(roomCode);

    if (!room) {
      console.log('❌ Room not found:', roomCode);
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.players.length >= 2) {
      console.log('❌ Room full:', roomCode);
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    // ✅ Ajouter le joueur manuellement (au lieu de .addPlayer pour tracer)
    room.players.push(player);
    await roomStore.update(roomCode, room);

    console.log(`✅ Player joined room ${roomCode}:`, player.name);

    // 🔔 Notifier les autres joueurs
    await pusher.trigger(`room-${roomCode}`, 'player-joined', { player });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('🔥 Error joining room:', error);
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
