export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const preferredRegion = 'auto';

import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';
import { roomStore } from '@/lib/room-store';

// --- Sécurisation des variables d'environnement ---
const {
  PUSHER_APP_ID,
  NEXT_PUBLIC_PUSHER_KEY,
  PUSHER_SECRET,
  NEXT_PUBLIC_PUSHER_CLUSTER,
} = process.env;

if (!PUSHER_APP_ID || !NEXT_PUBLIC_PUSHER_KEY || !PUSHER_SECRET) {
  console.warn(
    '[Warning] Missing Pusher environment variables — /api/rooms/answer will not work properly in production.'
  );
}

// --- Initialisation Pusher ---
const pusher = new Pusher({
  appId: PUSHER_APP_ID ?? '',
  key: NEXT_PUBLIC_PUSHER_KEY ?? '',
  secret: PUSHER_SECRET ?? '',
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER ?? 'eu',
  useTLS: true,
});

// --- Handler POST : joueur envoie une réponse ---
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomCode, playerId, answer } = body || {};

    // Vérification des paramètres requis
    if (!roomCode || !playerId) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      );
    }

    // Récupération de la room
    const room = await roomStore.get(roomCode);
    if (!room) {
      return NextResponse.json(
        { error: 'Room not found' },
        { status: 404 }
      );
    }

    // Recherche du joueur
    const player = room.players.find((p: any) => p.id === playerId);
    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    // ✅ Mise à jour de la réponse selon ton modèle Player
    player.currentAnswer = answer ?? null;
    player.hasAnswered = true;

    // Mise à jour de la room dans Redis / mémoire locale
    await roomStore.update(roomCode, room);

    // Notification via Pusher
    try {
      await pusher.trigger(`room-${roomCode}`, 'player-answered', {
        playerId,
        answer,
      });
    } catch (pushError) {
      console.error('Pusher trigger failed:', pushError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error in /api/rooms/answer:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error?.message || error,
      },
      { status: 500 }
    );
  }
}

// --- GET : utilisé uniquement pour empêcher la pré-rendu pendant le build ---
export async function GET() {
  return NextResponse.json({
    status: 'answer endpoint active',
    timestamp: Date.now(),
  });
}

// --- HEAD : idem, pour bloquer la collecte de page data ---
export async function HEAD() {
  return NextResponse.json({ status: 'ok' });
}
