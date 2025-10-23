// lib/room-store.ts
import { Redis } from '@upstash/redis';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  ready: boolean;
  currentAnswer: number | null;
  hasAnswered: boolean;
}

export interface Room {
  code: string;
  host: string;
  players: Player[];
  gameState: any | null;
  createdAt: number;
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const roomStore = {
  async create(roomCode: string, host: Player): Promise<Room> {
    const room: Room = {
      code: roomCode,
      host: host.id,
      players: [host],
      gameState: null,
      createdAt: Date.now(),
    };
    await redis.set(`room:${roomCode}`, room);
    return room;
  },

  async get(roomCode: string): Promise<Room | null> {
    return await redis.get<Room>(`room:${roomCode}`);
  },

  async addPlayer(roomCode: string, player: Player): Promise<boolean> {
    const room = await redis.get<Room>(`room:${roomCode}`);
    if (!room || room.players.length >= 2) return false;

    room.players.push(player);
    await redis.set(`room:${roomCode}`, room);
    return true;
  },

  async delete(roomCode: string): Promise<void> {
    await redis.del(`room:${roomCode}`);
  },
};
