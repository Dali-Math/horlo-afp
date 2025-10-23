// server.js
import { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const rooms = new Map(); // { code: { players: [ws1, ws2], state: {} } }

function broadcast(roomCode, data, exclude = null) {
  const room = rooms.get(roomCode);
  if (!room) return;
  for (const client of room.players) {
    if (client !== exclude && client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  }
}

wss.on("connection", (ws) => {
  console.log("🟢 Nouvelle connexion");

  ws.on("message", (msg) => {
    const data = JSON.parse(msg);
    console.log("📨", data);

    switch (data.type) {
      case "create-room": {
        const code = Math.random().toString(36).substr(2, 5).toUpperCase();
        rooms.set(code, { players: [ws], state: {} });
        ws.send(JSON.stringify({ type: "room-created", code }));
        break;
      }

      case "join-room": {
        const room = rooms.get(data.code);
        if (!room) {
          ws.send(JSON.stringify({ type: "error", message: "Room not found" }));
          return;
        }
        room.players.push(ws);
        broadcast(data.code, { type: "player-joined", code: data.code });
        break;
      }

      case "answer": {
        broadcast(data.code, { type: "player-answered", answer: data.answer }, ws);
        break;
      }

      case "ready": {
        broadcast(data.code, { type: "player-ready", player: data.player }, ws);
        break;
      }

      default:
        ws.send(JSON.stringify({ type: "error", message: "Unknown message type" }));
    }
  });

  ws.on("close", () => {
    console.log("🔴 Déconnexion");
    for (const [code, room] of rooms.entries()) {
      room.players = room.players.filter((p) => p !== ws);
      if (room.players.length === 0) rooms.delete(code);
    }
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Serveur WebSocket local en ligne sur ws://localhost:${PORT}`);
});
