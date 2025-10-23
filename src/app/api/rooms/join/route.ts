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

    if (!roomCode || !player) {
      console.log('❌ Missing roomCode or player data.');
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
    }

    const code = roomCode.trim().toUpperCase();
    const room = await roomStore.get(code);

    // ✅ Vérifier si la room existe
    if (!room) {
      console.log('❌ Room not found:', code);
      return NextResponse.json({ error: 'Code invalide ou partie introuvable.' }, { status: 404 });
    }

    // ✅ Vérifier si la room est pleine
    if (room.players.length >= 2) {
      console.log('⚠️ Room full:', code);
      return NextResponse.json({ error: 'Partie déjà pleine.' }, { status: 400 });
    }

    // ✅ Vérifier si le joueur est déjà dans la partie
    const alreadyInRoom = room.players.some(p => p.id === player.id);
    if (alreadyInRoom) {
      console.log('⚠️ Player already in room:', player.name);
      return NextResponse.json({ success: true });
    }

    // ✅ Ajouter le joueur
    room.players.push({
      id: player.id,
      name: player.name || 'Joueur',
      avatar: player.avatar || '🙂',
      score: 0,
      streak: 0,
      ready: false,
      currentAnswer: null,
      hasAnswered: false,
    });

    await roomStore.update(code, room);
    console.log(`✅ Player joined room ${code}: ${player.name}`);

    // ✅ Notifier via Pusher
    await pusher.trigger(`room-${code}`, 'player-joined', { player });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🔥 Error joining room:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la tentative de rejoindre la partie.' },
      { status: 500 }
    );
  }
}
