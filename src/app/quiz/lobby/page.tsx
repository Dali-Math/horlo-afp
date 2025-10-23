import { useSocket } from "@/lib/useSocket";

export default function Lobby() {
  const { send } = useSocket((data) => {
    console.log("📩 Reçu :", data);
  });

  return (
    <button
      onClick={() => send({ type: "create-room" })}
      className="bg-blue-500 text-white p-2 rounded"
    >
      Créer une partie
    </button>
  );
}
