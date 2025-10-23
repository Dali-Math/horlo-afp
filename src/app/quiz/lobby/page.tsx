"use client";

import { useState } from "react";
import { useSocket } from "@/lib/useSocket";

export default function LobbyPage() {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [joinedRoom, setJoinedRoom] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [status, setStatus] = useState("En attente...");
  const [isHost, setIsHost] = useState(false);

  const { send } = useSocket((data) => {
    console.log("📩 Message reçu :", data);

    if (data.type === "room-created") {
      setRoomCode(data.code);
      setStatus("Salle créée, en attente d’un joueur...");
    }

    if (data.type === "player-joined") {
      setStatus(`✅ ${data.name} a rejoint la salle !`);
    }

    if (data.type === "joined-room") {
      setStatus("Connecté à la salle !");
    }
  });

  function createRoom() {
    setIsHost(true);
    send({ type: "create-room", name: playerName });
  }

  function joinRoom() {
    send({ type: "join-room", code: joinedRoom, name: playerName });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎮 Lobby</h1>

      <input
        type="text"
        placeholder="Ton pseudo"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className="mb-4 px-4 py-2 rounded text-black w-64"
      />

      {!roomCode ? (
        <div className="flex flex-col gap-4">
          <button
            onClick={createRoom}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
          >
            Créer une partie
          </button>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Code de la salle"
              value={joinedRoom}
              onChange={(e) => setJoinedRoom(e.target.value.toUpperCase())}
              className="px-4 py-2 rounded text-black w-40"
            />
            <button
              onClick={joinRoom}
              className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold"
            >
              Rejoindre
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-lg">
            🏠 Code de ta salle : <strong>{roomCode}</strong>
          </p>
          <p className="mt-2">{status}</p>
        </div>
      )}
    </div>
  );
}
