// lib/room-store.ts
// Gestion des rooms avec Upstash Redis (et fallback mémoire pour le dev local)

import { Redis } from "@upstash/redis";

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

// --- Configuration Redis ---
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

// --- Fallback local (si Redis absent) ---
const localRooms = new Map<string, Room>();

export const roomStore = {
  // Créer une room
  async create(roomCode: string, host: Player): Promise<Room> {
    const room: Room = {
      code: roomCode,
      host: host.id,
      players: [host],
      gameState: null,
      createdAt: Date.now(),
    };

    if (redis) {
      await redis.set(`room:${roomCode}`, room);
    } else {
      localRooms.set(roomCode, room);
    }

    return room;
  },

  // Obtenir une room
  async get(roomCode: string): Promise<Room | null> {
    if (redis) {
      const room = await redis.get<Room>(`room:${roomCode}`);
      return room || null;
    }
    return localRooms.get(roomCode) || null;
  },

  // Mettre à jour une room
  async update(roomCode: string, updatedRoom: Room): Promise<void> {
    if (redis) {
      await redis.set(`room:${roomCode}`, updatedRoom);
    } else {
      localRooms.set(roomCode, updatedRoom);
    }
  },

  // Ajouter un joueur
  async addPlayer(roomCode: string, player: Player): Promise<boolean> {
    const room = await this.get(roomCode);
    if (!room || room.players.length >= 2) return false;

    room.players.push(player);
    await this.update(roomCode, room);
    return true;
  },

  // Supprimer une room
  async delete(roomCode: string): Promise<void> {
    if (redis) {
      await redis.del(`room:${roomCode}`);
    } else {
      localRooms.delete(roomCode);
    }
  },

  // Nettoyage automatique (fallback local)
  cleanup(): void {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [code, room] of localRooms.entries()) {
      if (room.createdAt < oneHourAgo) {
        localRooms.delete(code);
      }
    }
  },
};

// Supprime les vieilles rooms toutes les 10 minutes (local seulement)
if (typeof window === "undefined" && !redis) {
  setInterval(() => roomStore.cleanup(), 10 * 60 * 1000);
}
