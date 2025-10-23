// app/api/debug/keys/route.ts
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET() {
  try {
    const keys = await redis.keys('room:*');
    return NextResponse.json({
      count: keys.length,
      keys,
    });
  } catch (error) {
    console.error('❌ Redis debug error:', error);
    return NextResponse.json({ error: 'Redis connection failed' }, { status: 500 });
  }
}
