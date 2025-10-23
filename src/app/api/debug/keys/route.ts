export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });

    const keys = await redis.keys('*');

    return NextResponse.json({
      success: true,
      count: keys.length,
      keys,
    });
  } catch (error: any) {
    console.error('Redis connection failed:', error);
    return NextResponse.json(
      { success: false, error: 'Redis connection failed' },
      { status: 500 }
    );
  }
}
