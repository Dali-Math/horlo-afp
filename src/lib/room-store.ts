// lib/room-store.ts
// Stockage en mémoire des rooms (pour développement)
// En production, utilisez Redis ou une base de données

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

// Map globale pour stocker les rooms
const rooms = new Map<string, Room>();

export const roomStore = {
  // Créer une room
  create(roomCode: string, host: Player): Room {
    const room: Room = {
      code: roomCode,
      host: host.id,
      players: [host],
      gameState: null,
      createdAt: Date.now(),
    };
    rooms.set(roomCode, room);
    return room;
  },

  // Obtenir une room
  get(roomCode: string): Room | undefined {
    return rooms.get(roomCode);
  },

  // Ajouter un joueur à une room
  addPlayer(roomCode: string, player: Player): boolean {
    const room = rooms.get(roomCode);
    if (!room || room.players.length >= 2) {
      return false;
    }
    room.players.push(player);
    rooms.set(roomCode, room);
    return true;
  },

  // Mettre à jour une room
  update(roomCode: string, updatedRoom: Room): void {
    rooms.set(roomCode, updatedRoom);
  },

  // Supprimer une room
  delete(roomCode: string): void {
    rooms.delete(roomCode);
  },

  // Nettoyer les vieilles rooms (> 1 heure)
  cleanup(): void {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    for (const [code, room] of rooms.entries()) {
      if (room.createdAt < oneHourAgo) {
        rooms.delete(code);
      }
    }
  },
};

// Nettoyer les vieilles rooms toutes les 10 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    roomStore.cleanup();
  }, 10 * 60 * 1000);
}
