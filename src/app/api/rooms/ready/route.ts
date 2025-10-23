export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto'; // sécurité supplémentaire pour build Vercel

import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { roomStore } from '@/lib/room-store';

// Sécurisation du chargement Pusher (évite crash si variables manquantes)
const { PUSHER_APP_ID, NEXT_PUBLIC_PUSHER_KEY, PUSHER_SECRET, NEXT_PUBLIC_PUSHER_CLUSTER } = process.env;

if (!PUSHER_APP_ID || !NEXT_PUBLIC_PUSHER_KEY || !PUSHER_SECRET) {
  console.warn('[Warning] Missing Pusher environment variables — /api/rooms/ready will not function correctly in production.');
}

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
    const { roomCode, playerId } = body || {};

    if (!roomCode || !playerId) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    const playerIndex = room.players.findIndex((p: any) => p.id === playerId);
    if (playerIndex === -1) {
      return NextResponse.json({ error: 'Player not found in room' }, { status: 404 });
    }

    // Mise à jour de l’état "ready"
    room.players[playerIndex].ready = true;
    await roomStore.update(roomCode, room);

    // Événement Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, 'player-ready', { playerId });
    } catch (pushError) {
      console.error('Pusher trigger failed:', pushError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/rooms/ready:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message || error },
      { status: 500 }
    );
  }
}

export async function GET() {
  // pour empêcher Next de tenter de "collecter" cette route
  return NextResponse.json({ status: 'ready endpoint active' });
}
