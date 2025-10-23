// app/api/debug/clear/route.ts
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

export async function GET() {
  try {
    const keys = await redis.keys("room:*");

    if (!keys || keys.length === 0) {
      return NextResponse.json({ message: "Aucune room à supprimer." });
    }

    for (const key of keys) {
      await redis.del(key);
    }

    return NextResponse.json({
      success: true,
      deleted: keys.length,
      message: `🧹 ${keys.length} room(s) supprimée(s) de Redis.`,
    });
  } catch (err) {
    console.error("Erreur clear rooms:", err);
    return NextResponse.json({ error: "Échec du nettoyage Redis." }, { status: 500 });
  }
}
