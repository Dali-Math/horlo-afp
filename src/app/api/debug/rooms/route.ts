// src/app/api/debug/rooms/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// ✅ Connexion à Redis (utilise les variables d’environnement Vercel)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// ✅ Endpoint GET pour lister toutes les rooms existantes
export async function GET() {
  try {
    // Récupère toutes les clés correspondant aux rooms
    const keys = await redis.keys('room:*');

    if (keys.length === 0) {
      return NextResponse.json({
        message: 'Aucune room trouvée dans Redis.',
        rooms: [],
      });
    }

    // Récupère les données associées à chaque clé
    const rooms = await Promise.all(
      keys.map(async (key) => {
        const data = await redis.get(key);
        return { key, data };
      })
    );

    return NextResponse.json({
      count: rooms.length,
      rooms,
    });
  } catch (err) {
    console.error('Erreur récupération rooms :', err);
    return NextResponse.json(
      { error: 'Impossible de récupérer les rooms Redis.' },
      { status: 500 }
    );
  }
}
