export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import { NextRequest, NextResponse } from 'next/server';
import { roomStore } from '@/lib/room-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('code');

    // Si aucun code n’est fourni, on renvoie juste un message générique
    if (!roomCode) {
      return NextResponse.json({
        status: 'debug endpoint active',
        usage: '/api/debug/rooms?code=ROOMCODE',
      });
    }

    const room = await roomStore.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ room });
  } catch (error: any) {
    console.error('Error in /api/debug/rooms:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message || error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { roomCode } = await request.json();

    if (!roomCode) {
      return NextResponse.json({ error: 'Missing roomCode' }, { status: 400 });
    }

    await roomStore.delete(roomCode);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting room:', error);
    return NextResponse.json(
      { error: 'Failed to delete room', details: error.message || error },
      { status: 500 }
    );
  }
}

// Route GET par défaut pour empêcher Vercel de "collecter" la page pendant le build
export async function HEAD() {
  return NextResponse.json({ status: 'ok' });
}
