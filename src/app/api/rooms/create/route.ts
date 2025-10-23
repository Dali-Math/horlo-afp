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
    const { roomCode, host } = body || {};

    if (!roomCode || !host) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Créer la room
    const newRoom = await roomStore.create(roomCode, host);

    // Notifier via Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, 'room-created', { roomCode, host });
    } catch (pushError) {
      console.error('Pusher trigger failed:', pushError);
    }

    return NextResponse.json({ success: true, room: newRoom });
  } catch (error: any) {
    console.error('Error in /api/rooms/create:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message || error },
      { status: 500 }
    );
  }
}

// Empêche Next.js de tenter de collecter des données à build
export async function GET() {
  return NextResponse.json({ status: 'create endpoint active' });
}

export async function HEAD() {
  return NextResponse.json({ status: 'ok' });
}
