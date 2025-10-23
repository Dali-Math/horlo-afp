export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { roomStore } from '@/lib/room-store';

// Cette route permet de tester/inspecter une room spécifique (ex: ?code=XYZ)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomCode = searchParams.get('code');

    if (!roomCode) {
      return NextResponse.json(
        { error: 'Missing ?code parameter' },
        { status: 400 }
      );
    }

    const room = await roomStore.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json({ room });
  } catch (error) {
    console.error('Error in /api/debug/rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
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
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
