// app/api/rooms/join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

// Référence aux rooms (même Map que create)
// En production, utilisez Redis ou une DB partagée
declare global {
  var rooms: Map<string, any>;
}

if (!global.rooms) {
  global.rooms = new Map();
}

export async function POST(request: NextRequest) {
  try {
    const { roomCode, player } = await request.json();

    const room = global.rooms.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.players.length >= 2) {
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    // Ajouter le joueur
    room.players.push(player);
    global.rooms.set(roomCode, room);

    // Notifier les autres joueurs
    await pusher.trigger(`room-${roomCode}`, 'player-joined', {
      player,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
// app/api/rooms/join/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || '',
  key: process.env.NEXT_PUBLIC_PUSHER_KEY || '',
  secret: process.env.PUSHER_SECRET || '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
  useTLS: true,
});

// Référence aux rooms (même Map que create)
// En production, utilisez Redis ou une DB partagée
declare global {
  var rooms: Map<string, any>;
}

if (!global.rooms) {
  global.rooms = new Map();
}

export async function POST(request: NextRequest) {
  try {
    const { roomCode, player } = await request.json();

    const room = global.rooms.get(roomCode);

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (room.players.length >= 2) {
      return NextResponse.json({ error: 'Room is full' }, { status: 400 });
    }

    // Ajouter le joueur
    room.players.push(player);
    global.rooms.set(roomCode, room);

    // Notifier les autres joueurs
    await pusher.trigger(`room-${roomCode}`, 'player-joined', {
      player,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
}
