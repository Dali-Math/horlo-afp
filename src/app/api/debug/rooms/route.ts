export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import { NextRequest, NextResponse } from 'next/server';
import { roomStore } from '@/lib/room-store';

// --- GET : consulter une room spécifique ou liste simplifiée ---
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('code');

    // Si aucun code n'est donné → message de debug générique
    if (!roomCode) {
      return NextResponse.json({
        status: 'debug endpoint active',
        usage: '/api/debug/rooms?code=ROOMCODE',
        timestamp: Date.now(),
      });
    }

    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found', code: roomCode },
        { status: 404 }
      );
    }

    return NextResponse.json({
      roomCode,
      players: room.players.length,
      host: room.host,
      createdAt: room.createdAt,
      hasGameState: !!room.gameState,
      data: room,
    });
  } catch (error: any) {
    console.error('Error in /api/debug/rooms (GET):', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message || error },
      { status: 500 }
    );
  }
}

// --- DELETE : supprimer une room (debug) ---
export async function DELETE(request: NextRequest) {
  try {
    const { roomCode } = await request.json();

    if (!roomCode) {
      return NextResponse.json(
        { error: 'Missing roomCode' },
        { status: 400 }
      );
    }

    await roomStore.delete(roomCode);

    return NextResponse.json({
      success: true,
      message: `Room ${roomCode} deleted.`,
    });
  } catch (error: any) {
    console.error('Error in /api/debug/rooms (DELETE):', error);
    return NextResponse.json(
      { error: 'Failed to delete room', details: error?.message || error },
      { status: 500 }
    );
  }
}

// --- HEAD : pour éviter les erreurs de "page data collection" pendant le build ---
export async function HEAD() {
  return NextResponse.json({ status: 'ok' });
}
