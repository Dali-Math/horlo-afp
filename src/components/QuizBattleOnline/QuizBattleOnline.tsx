// components/QuizBattleOnline/QuizBattleOnline.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap, Shield, Flame, Copy, Wifi, Users } from 'lucide-react';
import { getQuestionsByDifficulty, type QuizQuestion } from '@/data/quiz-questions';
import Pusher from 'pusher-js';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  ready: boolean;
  currentAnswer: number | null;
  hasAnswered: boolean;
}

interface GameState {
  roomCode: string;
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  difficulty: 'facile' | 'moyen' | 'difficile' | 'mixte';
  phase: 'waiting' | 'playing' | 'showingAnswer' | 'finished';
  host: string;
}

export default function QuizBattleOnline() {
  const [gameMode, setGameMode] = useState<'menu' | 'create' | 'join' | 'lobby' | 'playing' | 'result'>('menu');
  const [roomCode, setRoomCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerAvatar, setPlayerAvatar] = useState('👤');
  const [playerId, setPlayerId] = useState('');
  
  const [localPlayer, setLocalPlayer] = useState<Player | null>(null);
  const [opponent, setOpponent] = useState<Player | null>(null);
  const [isHost, setIsHost] = useState(false);
  
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  
  const pusherRef = useRef<Pusher | null>(null);
  const channelRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const avatars = ['👤', '🧑', '👨', '👩', '🦹', '🥷', '🤠', '🤴', '👸', '🧙'];

  // Initialiser Pusher
  useEffect(() => {
    if (typeof window !== 'undefined') {
      pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'eu',
      });
    }

    return () => {
      if (pusherRef.current) {
        pusherRef.current.disconnect();
      }
    };
  }, []);

  // Générer un code de partie unique
  const generateRoomCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Créer une partie
  const createRoom = async () => {
    if (!playerName.trim()) {
      alert('⚠️ Entre ton pseudo !');
      return;
    }

    const code = generateRoomCode();
    const id = Math.random().toString(36).substring(7);
    
    setRoomCode(code);
    setPlayerId(id);
    setIsHost(true);
    
    const player: Player = {
      id,
      name: playerName,
      avatar: playerAvatar,
      score: 0,
      streak: 0,
      ready: false,
      currentAnswer: null,
      hasAnswered: false,
    };
    
    setLocalPlayer(player);
    
    // Créer la room sur le serveur
    await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode: code, host: player }),
    });

    // S'abonner au channel
    subscribeToRoom(code);
    setGameMode('lobby');
  };

  // Rejoindre une partie
  const joinRoom = async () => {
    if (!playerName.trim() || !inputCode.trim()) {
      alert('⚠️ Entre ton pseudo et le code !');
      return;
    }

    const code = inputCode.toUpperCase();
    const id = Math.random().toString(36).substring(7);
    
    setRoomCode(code);
    setPlayerId(id);
    setIsHost(false);
    
    const player: Player = {
      id,
      name: playerName,
      avatar: playerAvatar,
      score: 0,
      streak: 0,
      ready: false,
      currentAnswer: null,
      hasAnswered: false,
    };
    
    setLocalPlayer(player);

    // Vérifier que la room existe et rejoindre
    const response = await fetch('/api/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode: code, player }),
    });

    if (!response.ok) {
      alert('❌ Code invalide ou partie pleine !');
      return;
    }

    subscribeToRoom(code);
    setGameMode('lobby');
  };

  // S'abonner aux événements de la room
  const subscribeToRoom = (code: string) => {
    if (!pusherRef.current) return;

    channelRef.current = pusherRef.current.subscribe(`room-${code}`);

    // Joueur rejoint
    channelRef.current.bind('player-joined', (data: { player: Player }) => {
      if (data.player.id !== playerId) {
        setOpponent(data.player);
      }
    });

    // Joueur prêt
    channelRef.current.bind('player-ready', (data: { playerId: string }) => {
      if (data.playerId === playerId) {
        setLocalPlayer(prev => prev ? { ...prev, ready: true } : null);
      } else {
        setOpponent(prev => prev ? { ...prev, ready: true } : null);
      }
    });

    // Partie démarrée
    channelRef.current.bind('game-started', (data: { gameState: GameState }) => {
      setGameState(data.gameState);
      setGameMode('playing');
      loadQuestion(data.gameState.questions[0]);
    });

    // Réponse d'un joueur
    channelRef.current.bind('player-answered', (data: { playerId: string, answer: number }) => {
      if (data.playerId !== playerId) {
        setOpponent(prev => prev ? { ...prev, hasAnswered: true } : null);
      }
    });

    // Résultat de la question
    channelRef.current.bind('question-result', (data: { 
      correctAnswer: number,
      player1Score: number,
      player2Score: number,
      player1Id: string
    }) => {
      setShowFeedback(true);
      
      // Mettre à jour les scores
      if (data.player1Id === playerId) {
        setLocalPlayer(prev => prev ? { ...prev, score: data.player1Score } : null);
        setOpponent(prev => prev ? { ...prev, score: data.player2Score } : null);
      } else {
        setLocalPlayer(prev => prev ? { ...prev, score: data.player2Score } : null);
        setOpponent(prev => prev ? { ...prev, score: data.player1Score } : null);
      }

      setTimeout(() => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setLocalPlayer(prev => prev ? { ...prev, hasAnswered: false, currentAnswer: null } : null);
        setOpponent(prev => prev ? { ...prev, hasAnswered: false } : null);
      }, 3000);
    });

    // Question suivante
    channelRef.current.bind('next-question', (data: { question: QuizQuestion, index: number }) => {
      loadQuestion(data.question);
      setTimeLeft(15);
    });

    // Partie terminée
    channelRef.current.bind('game-over', (data: { winner: Player | null }) => {
      setGameMode('result');
    });
  };

  // Charger une question
  const loadQuestion = (question: QuizQuestion) => {
    setCurrentQuestion(question);
    setTimeLeft(15);
  };

  // Timer pour les questions
  useEffect(() => {
    if (gameMode === 'playing' && timeLeft > 0 && !showFeedback) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showFeedback && !localPlayer?.hasAnswered) {
      // Temps écoulé, réponse automatique (mauvaise)
      handleAnswer(-1);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameMode, timeLeft, showFeedback, localPlayer?.hasAnswered]);

  // Marquer comme prêt
  const setReady = async () => {
    await fetch('/api/rooms/ready', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode, playerId }),
    });
  };

  // Démarrer la partie (host uniquement)
  const startGame = async () => {
    if (!isHost) return;

    const difficulty: 'facile' | 'moyen' | 'difficile' | 'mixte' = 'mixte';
    const questions = getQuestionsByDifficulty(difficulty);

    await fetch('/api/rooms/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomCode, questions, difficulty }),
    });
  };

  // Répondre à une question
  const handleAnswer = async (answerIndex: number) => {
    if (localPlayer?.hasAnswered || showFeedback) return;

    setSelectedAnswer(answerIndex);
    setLocalPlayer(prev => prev ? { ...prev, hasAnswered: true, currentAnswer: answerIndex } : null);

    await fetch('/api/rooms/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        roomCode, 
        playerId, 
        answer: answerIndex,
        timeLeft 
      }),
    });
  };

  // Copier le code
  const copyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert('✅ Code copié !');
  };

  // Menu principal
  if (gameMode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-gradient-to-br from-blue-800/70 to-purple-800/70 backdrop-blur-xl rounded-3xl p-8 border-4 border-cyan-400 shadow-2xl"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
          >
            <Wifi className="w-12 h-12 text-white" />
          </motion.div>

          <h1 className="font-bebas text-5xl text-center text-cyan-400 mb-2">
            QUIZ BATTLE
          </h1>
          <p className="font-oswald text-center text-purple-200 text-xl mb-8">
            Mode Multijoueur Online 🌐
          </p>

          <div className="space-y-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode('create')}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bebas text-2xl rounded-xl border-2 border-cyan-300 shadow-lg"
            >
              🎮 CRÉER UNE PARTIE
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGameMode('join')}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bebas text-2xl rounded-xl border-2 border-purple-300 shadow-lg"
            >
              🔗 REJOINDRE UNE PARTIE
            </motion.button>
          </div>

          <div className="bg-blue-900/50 rounded-xl p-4 border border-cyan-400/30">
            <h3 className="font-oswald text-cyan-400 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Comment ça marche ?
            </h3>
            <ul className="font-inter text-sm text-purple-200 space-y-1">
              <li>• Un joueur crée une partie et partage le code</li>
              <li>• L'autre rejoint avec le code</li>
              <li>• Chacun joue sur son propre appareil</li>
              <li>• Duel en temps réel ! ⚔️</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  // Écran création de partie
  if (gameMode === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-gradient-to-br from-blue-800/70 to-purple-800/70 backdrop-blur-xl rounded-3xl p-8 border-4 border-cyan-400 shadow-2xl"
        >
          <h2 className="font-bebas text-4xl text-cyan-400 text-center mb-8">
            CRÉER UNE PARTIE
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="font-oswald text-cyan-300 mb-2 block">Ton pseudo</label>
              <input
                type="text"
                placeholder="Ton nom..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-blue-900/50 border-2 border-cyan-400/50 text-white font-oswald text-center text-lg focus:outline-none focus:border-cyan-400"
                maxLength={15}
              />
            </div>

            <div>
              <label className="font-oswald text-cyan-300 mb-2 block">Ton avatar</label>
              <div className="flex gap-2 justify-center flex-wrap">
                {avatars.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setPlayerAvatar(emoji)}
                    className={`text-3xl p-2 rounded-lg transition ${
                      playerAvatar === emoji 
                        ? 'bg-cyan-400 scale-125' 
                        : 'bg-blue-900/50 hover:bg-blue-900'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createRoom}
              className="w-full py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-blue-900 font-bebas text-2xl rounded-xl shadow-lg"
            >
              ✨ CRÉER LA PARTIE
            </motion.button>

            <button
              onClick={() => setGameMode('menu')}
              className="w-full py-3 bg-blue-900/50 border-2 border-cyan-400/30 text-cyan-400 font-oswald rounded-xl hover:bg-blue-900 transition"
            >
              ← Retour
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Écran rejoindre partie
  if (gameMode === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-gradient-to-br from-blue-800/70 to-purple-800/70 backdrop-blur-xl rounded-3xl p-8 border-4 border-purple-400 shadow-2xl"
        >
          <h2 className="font-bebas text-4xl text-purple-300 text-center mb-8">
            REJOINDRE UNE PARTIE
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <label className="font-oswald text-purple-300 mb-2 block">Code de la partie</label>
              <input
                type="text"
                placeholder="Ex: ABC123"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border-2 border-purple-400/50 text-white font-bebas text-center text-2xl focus:outline-none focus:border-purple-400 tracking-wider"
                maxLength={6}
              />
            </div>

            <div>
              <label className="font-oswald text-purple-300 mb-2 block">Ton pseudo</label>
              <input
                type="text"
                placeholder="Ton nom..."
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-purple-900/50 border-2 border-purple-400/50 text-white font-oswald text-center text-lg focus:outline-none focus:border-purple-400"
                maxLength={15}
              />
            </div>

            <div>
              <label className="font-oswald text-purple-300 mb-2 block">Ton avatar</label>
              <div className="flex gap-2 justify-center flex-wrap">
                {avatars.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setPlayerAvatar(emoji)}
                    className={`text-3xl p-2 rounded-lg transition ${
                      playerAvatar === emoji 
                        ? 'bg-purple-400 scale-125' 
                        : 'bg-purple-900/50 hover:bg-purple-900'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={joinRoom}
              className="w-full py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-purple-900 font-bebas text-2xl rounded-xl shadow-lg"
            >
              🔗 REJOINDRE
            </motion.button>

            <button
              onClick={() => setGameMode('menu')}
              className="w-full py-3 bg-purple-900/50 border-2 border-purple-400/30 text-purple-300 font-oswald rounded-xl hover:bg-purple-900 transition"
            >
              ← Retour
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Lobby (attente du 2ème joueur)
  if (gameMode === 'lobby') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-gradient-to-br from-blue-800/70 to-purple-800/70 backdrop-blur-xl rounded-3xl p-8 border-4 border-cyan-400 shadow-2xl"
        >
          <h2 className="font-bebas text-4xl text-cyan-400 text-center mb-4">
            LOBBY
          </h2>

          {/* Code de la partie */}
          <div className="bg-cyan-900/30 rounded-xl p-6 mb-6 border-2 border-cyan-400 text-center">
            <p className="font-oswald text-cyan-300 mb-2">Code de la partie :</p>
            <div className="flex items-center justify-center gap-3">
              <div className="font-bebas text-5xl text-cyan-400 tracking-wider">
                {roomCode}
              </div>
              <button
                onClick={copyCode}
                className="p-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition"
              >
                <Copy className="w-5 h-5 text-white" />
              </button>
            </div>
            <p className="font-inter text-xs text-cyan-200 mt-2">
              Partage ce code à ton adversaire !
            </p>
          </div>

          {/* Joueurs */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Joueur local */}
            <div className={`p-6 rounded-xl border-4 ${
              localPlayer?.ready ? 'bg-green-900/30 border-green-400' : 'bg-blue-900/30 border-blue-400'
            }`}>
              <div className="text-center">
                <div className="text-5xl mb-2">{localPlayer?.avatar}</div>
                <div className="font-oswald text-white mb-2">{localPlayer?.name}</div>
                <div className={`font-inter text-sm ${
                  localPlayer?.ready ? 'text-green-400' : 'text-blue-300'
                }`}>
                  {localPlayer?.ready ? '✅ Prêt' : '⏳ En attente'}
                </div>
              </div>
            </div>

            {/* Adversaire */}
            <div className={`p-6 rounded-xl border-4 ${
              opponent ? 
                opponent.ready ? 'bg-green-900/30 border-green-400' : 'bg-purple-900/30 border-purple-400'
              : 'bg-gray-900/30 border-gray-600'
            }`}>
              <div className="text-center">
                {opponent ? (
                  <>
                    <div className="text-5xl mb-2">{opponent.avatar}</div>
                    <div className="font-oswald text-white mb-2">{opponent.name}</div>
                    <div className={`font-inter text-sm ${
                      opponent.ready ? 'text-green-400' : 'text-purple-300'
                    }`}>
                      {opponent.ready ? '✅ Prêt' : '⏳ En attente'}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-5xl mb-2 opacity-30">👤</div>
                    <div className="font-inter text-sm text-gray-400">
                      En attente d'un adversaire...
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Boutons */}
          <div className="space-y-3">
            {!localPlayer?.ready && opponent && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={setReady}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bebas text-2xl rounded-xl shadow-lg"
              >
                ✅ JE SUIS PRÊT !
              </motion.button>
            )}

            {isHost && localPlayer?.ready && opponent?.ready && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bebas text-3xl rounded-xl shadow-lg animate-pulse"
              >
                🚀 LANCER LE DUEL !
              </motion.button>
            )}

            {!isHost && localPlayer?.ready && opponent?.ready && (
              <div className="text-center py-4 font-oswald text-cyan-300">
                ⏳ En attente que l'hôte lance la partie...
              </div>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // Écran de jeu - TODO: À implémenter avec la même logique que QuizBattle
  // mais avec synchronisation temps réel

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="text-white">Mode de jeu en cours de développement...</div>
    </div>
  );
}
