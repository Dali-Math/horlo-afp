export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { roomStore } from '@/lib/room-store';

export async function GET(request: NextRequest) {
  try {
    const rooms = await roomStore.getAll?.(); // si ton store le permet
    return NextResponse.json({ rooms: rooms || [] });
  } catch (error) {
    console.error('Error in /api/debug/rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { roomCode } = await request.json();
    if (!roomCode) {
      return NextResponse.json({ error: 'Missing roomCode' }, { status: 400 });
    }

    await roomStore.delete?.(roomCode);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting room:', error);
    return NextResponse.json({ error: 'Failed to delete room' }, { status: 500 });
  }
}
