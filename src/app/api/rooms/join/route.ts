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
    const { roomCode, player } = await request.json();
    const normalized = roomCode.trim().toUpperCase();

    const room = await roomStore.get(normalized);
    if (!room) {
      console.log('❌ Room not found:', normalized);
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.players.length >= 2) {
      console.log('❌ Room full:', normalized);
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    const already = room.players.find(p => p.id === player.id);
    if (!already) {
      room.players.push(player);
      await roomStore.update(normalized, room);
      console.log(`✅ Player joined ${normalized}:`, player.name);
    }

    await pusher.trigger(`room-${normalized}`, 'player-joined', {
      player,
      players: room.players,
      roomCode: normalized,
    });

    return NextResponse.json({ success: true, room });
  } catch (error) {
    console.error('🔥 Error joining room:', error);
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
