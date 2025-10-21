
'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';


function AtelierHorloger() {  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nextCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const [gameState, setGameState] = useState({
    score: 0,
    level: 1,
    lines: 0,
    gameRunning: false,
    gamePaused: false,
    playerPseudo: '',
    showPseudoModal: true,
    showGameOverModal: false,
  });
  
  const [pseudoInput, setPseudoInput] = useState('');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [gameOverLeaderboard, setGameOverLeaderboard] = useState<any[]>([]);
  const [finalStats, setFinalStats] = useState({ score: 0, lines: 0, level: 0, rank: '', certification: '' });
  const [historicalFact, setHistoricalFact] = useState('');
  const [encyclopediaEntry, setEncyclopediaEntry] = useState('');
  const [nextComponentName, setNextComponentName] = useState('---');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  
  // Système de badges
  const [badges, setBadges] = useState<any[]>([]);
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    totalGames: 0,
    totalLines: 0,
    bestScore: 0,
    quizCorrect: 0,
    quizTotal: 0,
  });

  const gameDataRef = useRef<any>({
    board: [],
    currentQuestionIndex: 0,
    currentPiece: null,
    nextPiece: null,
    dropInterval: null,
    gameStartTime: 0,
  });

  const COLS = 10;
  const ROWS = 20;
  const BLOCK_SIZE = 30;

  const COLORS = ['#c9a659', '#8b4513', '#dc143c', '#4169e1', '#32cd32', '#9370db', '#ff6347'];
  const PIECE_NAMES = ['⚖️ Balancier-Spiral', '⚙️ Échappement', '💎 Rubis', '⬛ Platine', '🔄 Rotor', '🎯 Rouage', '👑 Couronne'];
  const SHAPES = [[[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,0,0],[1,1,1]], [[0,0,1],[1,1,1]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]]];

  // Définition des badges - ULTRA DIFFICILES / HARDCORE
  const ALL_BADGES = [
    { id: 'apprentice', name: 'Apprenti Horloger', icon: '🔰', desc: 'Compléter 25 parties complètes', target: 25, stat: 'totalGames' },
    { id: 'precision_100', name: 'Précision Suisse', icon: '🎖️', desc: 'Assembler 100 lignes au total', target: 100, stat: 'totalLines' },
    { id: 'precision_500', name: 'Maître Artisan', icon: '⚙️', desc: 'Assembler 500 lignes au total', target: 500, stat: 'totalLines' },
    { id: 'precision_1000', name: 'Compagnon Certifié', icon: '🔧', desc: 'Assembler 1000 lignes au total', target: 1000, stat: 'totalLines' },
    { id: 'precision_2500', name: 'Grande Complication', icon: '👑', desc: 'Assembler 2500 lignes au total', target: 2500, stat: 'totalLines' },
    { id: 'quiz_master', name: 'Expert COSC', icon: '🎓', desc: 'Répondre correctement à 50 questions', target: 50, stat: 'quizCorrect' },
    { id: 'score_25000', name: 'Horloger Confirmé', icon: '💎', desc: 'Atteindre 25\'000 points en une partie', target: 25000, stat: 'bestScore' },
    { id: 'score_50000', name: 'Maître Horloger', icon: '🏆', desc: 'Atteindre 50\'000 points en une partie', target: 50000, stat: 'bestScore' },
    { id: 'score_100000', name: 'Légende Horlogère', icon: '⭐', desc: 'Atteindre 100\'000 points en une partie', target: 100000, stat: 'bestScore' },
    { id: 'veteran', name: 'Vétéran du Calibre', icon: '🛡️', desc: 'Jouer 100 parties complètes', target: 100, stat: 'totalGames' },
  ];

  const historicalFacts = [
    "En 1770, Abraham-Louis Perrelet invente le mécanisme de remontage automatique.",
    "Le spiral Breguet, avec sa courbe terminale, améliore la concentricité et la précision.",
    "Les rubis synthétiques sont introduits en horlogerie dès 1902 pour réduire les frottements.",
    "Un balancier à 28'800 alt/h effectue 691'200 oscillations par jour !",
    "Le Calibre 89 de Patek Philippe (1989) compte 1'728 composants et 33 complications."
  ];

  const encyclopediaEntries = [
    "<strong>Le Balancier-Spiral</strong> est l'organe régulateur du mouvement. Il oscille à fréquence constante (2.5 à 5 Hz).",
    "<strong>L'Échappement</strong> transforme l'énergie continue du barillet en impulsions régulières pour le balancier.",
    "<strong>Les Rubis</strong> sont des paliers en corindon synthétique qui réduisent les frottements à près de zéro.",
    "<strong>La Platine</strong> est la base du mouvement sur laquelle tous les composants sont assemblés."
  ];

  const quizQuestions = [
    {
      question: "Quelle est la fréquence standard d'un mouvement mécanique moderne ?",
      options: ["18'000 alt/h", "21'600 alt/h", "28'800 alt/h", "36'000 alt/h"],
      correct: 2
    },
    {
      question: "Combien de rubis contient typiquement un mouvement ETA 2824-2 ?",
      options: ["17 rubis", "21 rubis", "25 rubis", "31 rubis"],
      correct: 2
    },
    {
      question: "Qu'est-ce que l'échappement à ancre suisse ?",
      options: ["Un système de remontage", "Un mécanisme régulateur", "Un indicateur de réserve", "Un type de spiral"],
      correct: 1
    },
    {
      question: "Quelle est la réserve de marche typique d'un calibre automatique ?",
      options: ["24 heures", "38-42 heures", "7 jours", "14 jours"],
      correct: 1
    },
    {
      question: "Que signifie 'COSC' en horlogerie ?",
      options: ["Centre Optique Suisse Cadran", "Contrôle Officiel Suisse Chronomètres", "Comité Organisation Suisse Calibres", "Centre Observation Spiraux Chronomètres"],
      correct: 1
    }
  ];

  const loadHighScores = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('horlogerScores');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  };
  
  const loadPlayerStats = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('horlogerStats');
      return saved ? JSON.parse(saved) : { totalGames: 0, totalLines: 0, bestScore: 0, quizCorrect: 0, quizTotal: 0 };
    }
    return { totalGames: 0, totalLines: 0, bestScore: 0, quizCorrect: 0, quizTotal: 0 };
  };

  const savePlayerStats = (stats: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('horlogerStats', JSON.stringify(stats));
    }
  };

  const loadBadges = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('horlogerBadges');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  };

  const saveBadges = (badgesList: any[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('horlogerBadges', JSON.stringify(badgesList));
    }
  };

  const checkAndUnlockBadges = (currentStats: any) => {
    const unlockedBadges = loadBadges();
    let newBadge = null;

    for (const badge of ALL_BADGES) {
      if (!unlockedBadges.includes(badge.id)) {
        const statValue = currentStats[badge.stat] || 0;
        if (statValue >= badge.target) {
          unlockedBadges.push(badge.id);
          newBadge = badge;
          saveBadges(unlockedBadges);
          setBadges(unlockedBadges);
          break;
        }
      }
    }

    if (newBadge) {
      setTimeout(() => {
        alert(`🎉 NOUVEAU BADGE DÉBLOQUÉ!\n\n${newBadge.icon} ${newBadge.name}\n${newBadge.desc}`);
      }, 500);
    }
  };

  const updateStats = (updates: any) => {
    const currentStats = loadPlayerStats();
    const newStats = { ...currentStats, ...updates };
    savePlayerStats(newStats);
    setPlayerStats(newStats);
    checkAndUnlockBadges(newStats);
  };

  const saveHighScores = (scores: any[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('horlogerScores', JSON.stringify(scores));
    }
  };

  const addToLeaderboard = (pseudo: string, score: number, lines: number, level: number) => {
    let scores = loadHighScores();
    scores.push({ pseudo, score, lines, level, date: new Date().toISOString() });
    scores.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
    scores = scores.slice(0, 5);
    saveHighScores(scores);
    return scores;
  };

  useEffect(() => {
    setLeaderboard(loadHighScores());
    setPlayerStats(loadPlayerStats());
    setBadges(loadBadges());
    setHistoricalFact(historicalFacts[Math.floor(Math.random() * historicalFacts.length)]);
    setEncyclopediaEntry(encyclopediaEntries[Math.floor(Math.random() * encyclopediaEntries.length)]);
    initBoard();
    if (canvasRef.current) drawBoard();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.gameRunning || gameState.gamePaused) return;
      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft': movePiece(-1); break;
        case 'ArrowRight': movePiece(1); break;
        case 'ArrowDown': dropPiece(); break;
        case 'ArrowUp': rotatePiece(); break;
        case ' ': hardDrop(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.gameRunning, gameState.gamePaused]);

  const initBoard = () => {
    gameDataRef.current.board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
  };

  const createPiece = () => {
    const idx = Math.floor(Math.random() * SHAPES.length);
    return {
      shape: SHAPES[idx],
      color: COLORS[idx],
      name: PIECE_NAMES[idx],
      x: Math.floor(COLS / 2) - Math.floor(SHAPES[idx][0].length / 2),
      y: 0
    };
  };

  const adjustBrightness = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
    const gradient = ctx.createLinearGradient(x * BLOCK_SIZE, y * BLOCK_SIZE, (x + 1) * BLOCK_SIZE, (y + 1) * BLOCK_SIZE);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, adjustBrightness(color, 30));
    gradient.addColorStop(1, adjustBrightness(color, -30));
    ctx.fillStyle = gradient;
    ctx.fillRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x * BLOCK_SIZE + 1, y * BLOCK_SIZE + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fillRect(x * BLOCK_SIZE + 2, y * BLOCK_SIZE + 2, BLOCK_SIZE - 4, BLOCK_SIZE / 3);
  };

  const drawPiece = (ctx: CanvasRenderingContext2D, piece: any) => {
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          drawBlock(ctx, piece.x + col, piece.y + row, piece.color);
        }
      }
    }
  };

  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a1410');
    gradient.addColorStop(1, '#2a2010');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(139, 105, 20, 0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * BLOCK_SIZE);
      ctx.lineTo(COLS * BLOCK_SIZE, i * BLOCK_SIZE);
      ctx.stroke();
    }
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * BLOCK_SIZE, 0);
      ctx.lineTo(i * BLOCK_SIZE, ROWS * BLOCK_SIZE);
      ctx.stroke();
    }

    const board = gameDataRef.current.board;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (board[row][col]) drawBlock(ctx, col, row, board[row][col]);
      }
    }

    if (gameDataRef.current.currentPiece) {
      drawPiece(ctx, gameDataRef.current.currentPiece);
    }
  };

  const drawNextPiece = () => {
    const canvas = nextCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(26, 20, 16, 0.8)');
    gradient.addColorStop(1, 'rgba(42, 32, 16, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const nextPiece = gameDataRef.current.nextPiece;
    if (nextPiece) {
      const blockSize = 20;
      const offsetX = (canvas.width - nextPiece.shape[0].length * blockSize) / 2;
      const offsetY = (canvas.height - nextPiece.shape.length * blockSize) / 2;

      for (let row = 0; row < nextPiece.shape.length; row++) {
        for (let col = 0; col < nextPiece.shape[row].length; col++) {
          if (nextPiece.shape[row][col]) {
            const x = offsetX + col * blockSize;
            const y = offsetY + row * blockSize;
            const gradient = ctx.createLinearGradient(x, y, x + blockSize, y + blockSize);
            gradient.addColorStop(0, nextPiece.color);
            gradient.addColorStop(0.5, adjustBrightness(nextPiece.color, 30));
            gradient.addColorStop(1, adjustBrightness(nextPiece.color, -30));
            ctx.fillStyle = gradient;
            ctx.fillRect(x + 1, y + 1, blockSize - 2, blockSize - 2);
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
            ctx.strokeRect(x + 1, y + 1, blockSize - 2, blockSize - 2);
          }
        }
      }
      setNextComponentName(nextPiece.name);
    }
  };

  const checkCollision = (piece: any, offsetX = 0, offsetY = 0) => {
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = piece.x + col + offsetX;
          const newY = piece.y + row + offsetY;
          if (newX < 0 || newX >= COLS || newY >= ROWS) return true;
          if (newY >= 0 && gameDataRef.current.board[newY][newX]) return true;
        }
      }
    }
    return false;
  };

  const rotatePiece = () => {
    const piece = gameDataRef.current.currentPiece;
    if (!piece) return;
    const rotated = piece.shape[0].map((_: any, i: number) => piece.shape.map((row: any) => row[i]).reverse());
    const oldShape = piece.shape;
    piece.shape = rotated;
    if (checkCollision(piece)) piece.shape = oldShape;
    drawBoard();
  };

  const movePiece = (direction: number) => {
    const piece = gameDataRef.current.currentPiece;
    if (!piece) return;
    if (!checkCollision(piece, direction, 0)) {
      piece.x += direction;
      drawBoard();
    }
  };

  const dropPiece = () => {
    const piece = gameDataRef.current.currentPiece;
    if (!piece) return;
    if (!checkCollision(piece, 0, 1)) {
      piece.y++;
    } else {
      placePiece();
      clearLines();
      spawnNewPiece();
    }
    drawBoard();
  };

  const hardDrop = () => {
    const piece = gameDataRef.current.currentPiece;
    if (!piece) return;
    while (!checkCollision(piece, 0, 1)) piece.y++;
    placePiece();
    clearLines();
    spawnNewPiece();
    drawBoard();
  };

  const placePiece = () => {
    const piece = gameDataRef.current.currentPiece;
    if (!piece) return;
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const boardY = piece.y + row;
          const boardX = piece.x + col;
          if (boardY >= 0) gameDataRef.current.board[boardY][boardX] = piece.color;
        }
      }
    }
  };


  const showQuizQuestion = () => {
    const idx = gameDataRef.current.currentQuestionIndex;
    if (idx >= quizQuestions.length) {
      gameDataRef.current.currentQuestionIndex = 0;
      return;
    }
    const question = quizQuestions[idx];
    setCurrentQuestion(question);
    setSelectedAnswer(null);
    setQuestionAnswered(false);
  };

  const checkAnswer = (answerIndex: number) => {
    if (questionAnswered || !currentQuestion) return;
    
    setSelectedAnswer(answerIndex);
    setQuestionAnswered(true);
    
    if (answerIndex === currentQuestion.correct) {
      setGameState(prev => ({ ...prev, score: prev.score + 750 }));
      updateStats({ quizCorrect: playerStats.quizCorrect + 1, quizTotal: playerStats.quizTotal + 1 });
      setTimeout(() => {
        alert('✅ Excellent ! Maîtrise technique confirmée. +750 points');
        setCurrentQuestion(null);
        gameDataRef.current.currentQuestionIndex++;
      }, 500);
    } else {
      updateStats({ quizTotal: playerStats.quizTotal + 1 });
      setTimeout(() => {
        alert('❌ Réponse incorrecte. La bonne réponse: ' + currentQuestion.options[currentQuestion.correct]);
        setCurrentQuestion(null);
        gameDataRef.current.currentQuestionIndex++;
      }, 500);
    }
  };
  const clearLines = () => {
    let linesCleared = 0;
    const board = gameDataRef.current.board;
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row].every((cell: any) => cell !== 0)) {
        board.splice(row, 1);
        board.unshift(Array(COLS).fill(0));
        linesCleared++;
        row++;
      }
    }
    if (linesCleared > 0) {
      setGameState(prev => {
        const newLines = prev.lines + linesCleared;
        const newScore = prev.score + linesCleared * 150 * prev.level;
        const newLevel = Math.floor(newLines / 10) + 1;
        return { ...prev, lines: newLines, score: newScore, level: newLevel };
      });
      setHistoricalFact(historicalFacts[Math.floor(Math.random() * historicalFacts.length)]);
      setEncyclopediaEntry(encyclopediaEntries[Math.floor(Math.random() * encyclopediaEntries.length)]);
      
      // Afficher une question tous les 3 assemblages
      setGameState(prevState => {
        if (prevState.lines % 3 === 0 && prevState.lines > 0) {
          showQuizQuestion();
        }
        return prevState;
      });
    }
  };

  const spawnNewPiece = () => {
    gameDataRef.current.currentPiece = gameDataRef.current.nextPiece || createPiece();
    gameDataRef.current.nextPiece = createPiece();
    drawNextPiece();
    if (checkCollision(gameDataRef.current.currentPiece)) gameOver();
  };

  const gameOver = () => {
    if (gameDataRef.current.dropInterval) clearInterval(gameDataRef.current.dropInterval);
    
    updateStats({
      totalGames: playerStats.totalGames + 1,
      totalLines: playerStats.totalLines + gameState.lines,
      bestScore: Math.max(playerStats.bestScore, gameState.score)
    });
    
    let rank = '';
    let certification = '';
    if (gameState.lines < 10) {
      rank = 'Apprenti Horloger';
      certification = "Vous débutez dans l'art de l'horlogerie. Continuez à vous exercer !";
    } else if (gameState.lines < 25) {
      rank = 'Compagnon';
      certification = "Vous maîtrisez les bases de l'assemblage horloger. Bien joué !";
    } else if (gameState.lines < 50) {
      rank = 'Maître Horloger';
      certification = "Excellente maîtrise technique ! Vous êtes un véritable artisan.";
    } else if (gameState.lines < 100) {
      rank = 'Grande Complication';
      certification = "Expertise exceptionnelle ! Vous maîtrisez les assemblages complexes.";
    } else {
      rank = 'Légende de la Haute Horlogerie';
      certification = "Performance extraordinaire ! Vous êtes entré dans la légende des maîtres horlogers !";
    }
    const scores = addToLeaderboard(gameState.playerPseudo, gameState.score, gameState.lines, gameState.level);
    setGameOverLeaderboard(scores);
    setLeaderboard(scores);
    const playerRank = scores.findIndex((s: { pseudo: string; score: number }) => s.pseudo === gameState.playerPseudo && s.score === gameState.score) + 1;
    if (playerRank > 0 && playerRank <= 3) {
      certification += `\n\n🏆 INCROYABLE ! Vous êtes ${playerRank === 1 ? 'N°1 👑' : playerRank === 2 ? 'N°2 🥈' : 'N°3 🥉'} du classement !`;
    } else if (playerRank > 0 && playerRank <= 5) {
      certification += `\n\n✨ Félicitations ! Vous êtes dans le Top 5 (N°${playerRank}) !`;
    }
    setFinalStats({ score: gameState.score, lines: gameState.lines, level: gameState.level, rank, certification });
    setGameState(prev => ({ ...prev, gameRunning: false, showGameOverModal: true }));
  };

  const startGame = () => {
    initBoard();
    gameDataRef.current.gameStartTime = Date.now();
    setGameState(prev => ({ ...prev, score: 0, level: 1, lines: 0, gameRunning: true, gamePaused: false }));
    spawnNewPiece();
    drawBoard();
    const speed = Math.max(100, 1000 - (gameState.level - 1) * 100);
    gameDataRef.current.dropInterval = setInterval(dropPiece, speed);
    setHistoricalFact(historicalFacts[Math.floor(Math.random() * historicalFacts.length)]);
    setEncyclopediaEntry(encyclopediaEntries[Math.floor(Math.random() * encyclopediaEntries.length)]);
  };

  const savePseudoAndStart = () => {
    if (!pseudoInput.trim()) {
      alert('⚠️ Veuillez entrer un pseudo pour continuer');
      return;
    }
    setGameState(prev => ({ ...prev, playerPseudo: pseudoInput.trim(), showPseudoModal: false }));
  };

  const quickRestart = () => {
    setGameState(prev => ({ ...prev, showGameOverModal: false }));
    startGame();
  };

  const changePseudo = () => {
    setPseudoInput('');
    setGameState(prev => ({ ...prev, showGameOverModal: false, showPseudoModal: true }));
  };

  const togglePause = () => {
    setGameState(prev => {
      const newPausedState = !prev.gamePaused;
      
      if (newPausedState) {
        // On met en pause - arrêter l'intervalle
        if (gameDataRef.current.dropInterval) {
          clearInterval(gameDataRef.current.dropInterval);
          gameDataRef.current.dropInterval = null;
        }
      } else {
        // On reprend - redémarrer l'intervalle
        const speed = Math.max(100, 1000 - (prev.level - 1) * 100);
        gameDataRef.current.dropInterval = setInterval(dropPiece, speed);
      }
      
      return { ...prev, gamePaused: newPausedState };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#14141e] via-[#28201e] to-[#14141e] text-[#d4af37] p-5" style={{ fontFamily: "'Crimson Text', serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital@0;1&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        @keyframes gearRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .rotating-gear { display: inline-block; animation: gearRotate 4s linear infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 bg-gradient-to-br from-[#d4af3720] to-[#b8860b20] p-8 rounded-2xl border-2 border-[#d4af37]">
          <h1 className="font-cinzel text-5xl text-[#d4af37] mb-3 tracking-widest">
            <span className="rotating-gear">⚙️</span> ATELIER D'ASSEMBLAGE HORLOGER <span className="rotating-gear">⚙️</span>
          </h1>
          <div className="text-xl italic text-[#c9a659]">Manufacture de Haute Précision Suisse</div>
          <div className="inline-block mt-4 px-8 py-2 border-2 border-[#d4af37] rounded-full text-sm tracking-widest bg-[#d4af3710]">GENÈVE 1755</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6">
          <div className="bg-gradient-to-br from-[#3c281490] to-[#281e1490] border-2 border-[#8b6914] rounded-xl p-5">
            <h3 className="font-cinzel text-xl text-center border-b-2 border-[#8b6914] pb-2 mb-4">📊 Établi</h3>
            <div className="bg-[#00000066] p-4 rounded-xl text-center mb-3 border-2 border-[#d4af37]">
              <div className="text-xs text-[#c9a659]">Points</div>
              <div className="font-cinzel text-4xl font-bold text-[#d4af37]">{gameState.score}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-[#00000066] p-3 rounded-xl text-center border border-[#8b6914]">
                <div className="text-xs text-[#c9a659]">Calibre</div>
                <div className="font-cinzel text-2xl font-bold text-[#d4af37]">{gameState.level}</div>
              </div>
              <div className="bg-[#00000066] p-3 rounded-xl text-center border border-[#8b6914]">
                <div className="text-xs text-[#c9a659]">Assemblages</div>
                <div className="font-cinzel text-2xl font-bold text-[#d4af37]">{gameState.lines}</div>
              </div>
            </div>
            <div className="bg-[#00000066] p-3 rounded-xl mb-3 border border-[#8b6914] text-xs">
              <div className="font-cinzel text-[#d4af37] mb-2 text-center">Progression</div>
              <div className="h-5 bg-[#00000080] rounded-xl overflow-hidden border border-[#8b6914]">
                <div className="h-full bg-gradient-to-r from-[#d4af37] to-[#f0c14b] flex items-center justify-center text-[10px] font-bold text-[#1a1410]" style={{ width: `${Math.min(100, (gameState.lines / 100) * 100)}%` }}>
                  {Math.min(100, Math.round((gameState.lines / 100) * 100))}%
                </div>
              </div>
            </div>
            <div className="bg-[#00000050] p-3 rounded-xl mb-3 border border-[#8b6914] text-xs italic text-[#e0c87e] leading-relaxed">
              📜 {historicalFact}
            </div>
            {/* Bouton Badges */}
            <button
              onClick={() => setShowBadgesModal(true)}
              className="w-full bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-4 py-3 rounded-xl font-cinzel font-bold text-sm mb-3 hover:shadow-lg transition-all"
            >
              🏅 Mes Badges ({badges.length}/{ALL_BADGES.length})
            </button>

            {/* Statistiques */}
            <div className="bg-[#00000066] p-3 rounded-xl border border-[#d4af37] mb-3">
              <h4 className="font-cinzel text-[#d4af37] text-center mb-2 text-xs">📊 Statistiques</h4>
              <div className="space-y-1 text-[10px] text-[#c9a659]">
                <div className="flex justify-between">
                  <span>Parties:</span>
                  <strong className="text-[#d4af37]">{playerStats.totalGames}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Meilleur score:</span>
                  <strong className="text-[#d4af37]">{playerStats.bestScore}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Total lignes:</span>
                  <strong className="text-[#d4af37]">{playerStats.totalLines}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Quiz:</span>
                  <strong className="text-[#d4af37]">{playerStats.quizCorrect}/{playerStats.quizTotal}</strong>
                </div>
              </div>
            </div>
            
            <div className="bg-[#00000066] p-3 rounded-xl border border-[#d4af37]">
              <h4 className="font-cinzel text-[#d4af37] text-center mb-2 text-sm">🏆 Hall of Fame</h4>
              {leaderboard.length === 0 ? (
                <div className="text-center py-3 text-[#8b6914] italic text-xs">Aucun score</div>
              ) : (
                leaderboard.map((e, i) => (
                  <div key={i} className={`p-2 my-1 rounded flex items-center gap-2 text-xs ${i < 3 ? 'bg-[#d4af3720]' : ''}`}>
                    <span>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '⚙️'}</span>
                    <div className="flex-1">
                      <div className="font-bold text-[#d4af37]">{e.pseudo}</div>
                      <div className="text-[10px] text-[#a89152]">{e.lines} • Calibre {e.level}</div>
                    </div>
                    <div className="font-cinzel font-bold text-[#d4af37]">{e.score}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <canvas ref={canvasRef} width={300} height={600} className="border-4 border-[#d4af37] rounded-xl mb-4" style={{ background: 'linear-gradient(135deg, #1a1410, #2a2010)' }} />
            <div className="flex gap-3 mb-4">
              {!gameState.gameRunning ? (
                <button onClick={startGame} className="font-cinzel bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-6 py-3 rounded-lg font-bold uppercase">
                  ▶️ Démarrer
                </button>
              ) : (
                <button onClick={togglePause} className="font-cinzel bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-6 py-3 rounded-lg font-bold uppercase">
                  {gameState.gamePaused ? '▶️ Reprendre' : '⏸️ Pause'}
                </button>
              )}
            </div>
            <div className="bg-gradient-to-br from-[#00000099] to-[#281e1499] p-4 rounded-xl border-2 border-[#8b6914] text-center w-full max-w-[300px]">
              <h4 className="font-cinzel text-[#d4af37] mb-3">Prochain Composant</h4>
              <canvas ref={nextCanvasRef} width={120} height={120} className="mx-auto border-2 border-[#8b6914] rounded mb-2" style={{ background: 'rgba(0,0,0,0.3)' }} />
              <div className="text-[#d4af37] italic text-sm">{nextComponentName}</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#3c281490] to-[#281e1490] border-2 border-[#8b6914] rounded-xl p-5">
            <h3 className="font-cinzel text-xl text-center border-b-2 border-[#8b6914] pb-2 mb-4">🎓 Examen</h3>
            
            {/* Section Quiz */}
            {/* Section Quiz */}
            <div className="bg-gradient-to-br from-[#143c5050] to-[#14283c50] p-4 rounded-xl border-2 border-[#5a7fa0] mb-3">
              <h4 className="font-cinzel text-[#8bb4d9] text-center mb-3 text-sm">Questions Techniques</h4>
              <div className="bg-[#00000066] p-3 rounded-lg border-l-2 border-[#8bb4d9] text-xs">
                {!currentQuestion ? (
                  <div className="text-[#c9d4e0] leading-relaxed">
                    Complétez 3 assemblages pour débloquer l'examen technique !
                  </div>
                ) : (
                  <div>
                    <div className="text-[#c9d4e0] font-bold mb-3 leading-relaxed">
                      {currentQuestion.question}
                    </div>
                    <div className="space-y-2">
                      {currentQuestion.options.map((option: string, index: number) => (
                        <div
                          key={index}
                          onClick={() => checkAnswer(index)}
                          className={`p-2 rounded cursor-pointer transition-all ${
                            questionAnswered
                              ? index === currentQuestion.correct
                                ? 'bg-green-900/50 border-2 border-green-500 text-green-200'
                                : index === selectedAnswer
                                ? 'bg-red-900/50 border-2 border-red-500 text-red-200'
                                : 'bg-[#5a7fa020] text-[#c9d4e0]'
                              : 'bg-[#5a7fa020] hover:bg-[#5a7fa040] border-2 border-transparent hover:border-[#8bb4d9] text-[#c9d4e0]'
                          } ${questionAnswered ? 'pointer-events-none' : ''}`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Encyclopédie */}
            <div className="bg-[#00000050] p-3 rounded-xl mb-3 border border-[#8b6914] text-xs">
              <h4 className="font-cinzel text-[#d4af37] text-center mb-2">📚 Encyclopédie</h4>
              <div className="text-[#c9a659] leading-relaxed" dangerouslySetInnerHTML={{ __html: encyclopediaEntry }} />
            </div>
            
            {/* Objectifs */}
            <div className="bg-gradient-to-br from-[#8b691420] to-[#d4af3720] p-3 rounded-xl border-2 border-[#d4af37]">
              <h4 className="font-cinzel text-[#d4af37] text-center mb-2 text-sm">🏆 Objectifs</h4>
              <div className="text-[#e0c87e] text-xs">
                {[
                  [10, 'Apprenti'],
                  [25, 'Compagnon'],
                  [50, 'Maître Horloger'],
                  [100, 'Grande Complication'],
                ].map(([targetLines, rank], idx) => {
                  const target = targetLines as number;
                  const isCompleted = gameState.lines >= target;
                  const isCurrent = gameState.lines < target && (idx === 0 || gameState.lines >= ([10, 25, 50, 100][idx - 1]));
                  return (
                    <div 
                      key={idx} 
                      className={`py-1 border-b border-[#d4af3750] last:border-0 flex items-center justify-between ${
                        isCompleted ? 'text-green-400 font-bold' : isCurrent ? 'text-[#f0c14b]' : 'text-[#8b6914]'
                      }`}
                    >
                      <span>
                        {isCompleted ? '✅' : isCurrent ? '🔄' : '⭕'} Assembler {target} lignes: <strong>{rank}</strong>
                      </span>
                      {isCurrent && (
                        <span className="text-[#d4af37] text-[10px]">
                          {gameState.lines}/{target}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {gameState.showPseudoModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-[#281e14f0] to-[#3c2814f0] p-10 rounded-3xl text-center border-4 border-[#d4af37] max-w-xl">
            <h2 className="font-cinzel text-4xl text-[#d4af37] mb-5">⚙️ BIENVENUE ⚙️</h2>
            <div className="bg-[#d4af3720] p-5 rounded-xl mb-6 border-2 border-[#d4af37]">Entrez votre nom d'horloger</div>
            <input type="text" value={pseudoInput} onChange={(e) => setPseudoInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && savePseudoAndStart()} placeholder="Votre pseudo..." maxLength={20} autoFocus className="w-full p-3 text-lg font-cinzel bg-[#00000066] border-2 border-[#d4af37] rounded-xl text-[#d4af37] text-center mb-6 placeholder-[#8b6914]" />
            <button onClick={savePseudoAndStart} className="font-cinzel bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-8 py-3 rounded-xl font-bold uppercase">
              ✨ Commencer
            </button>
          </div>
        </div>
      )}

      {gameState.showGameOverModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-[#281e14f0] to-[#3c2814f0] p-8 rounded-3xl text-center border-4 border-[#d4af37] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-cinzel text-4xl text-[#d4af37] mb-4">⚙️ FIN ⚙️</h2>
            <div className="bg-[#d4af3720] p-4 rounded-xl mb-4 border-2 border-[#d4af37] whitespace-pre-line text-sm">{finalStats.certification}</div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[['Points', finalStats.score], ['Assemblages', finalStats.lines], ['Calibre', finalStats.level]].map(([label, val], i) => (
                <div key={i} className="bg-[#00000066] p-3 rounded-xl border-2 border-[#8b6914]">
                  <div className="text-xs text-[#c9a659]">{label}</div>
                  <div className="font-cinzel text-2xl font-bold text-[#d4af37]">{val}</div>
                </div>
              ))}
            </div>
            <div className="text-[#c9a659] italic mb-4">Rang: {finalStats.rank}</div>
            <div className="bg-[#00000080] p-4 rounded-xl mb-4 border-2 border-[#d4af37]">
              <h3 className="font-cinzel text-xl text-[#d4af37] mb-3">🏆 TOP 5 🏆</h3>
              {gameOverLeaderboard.length === 0 ? (
                <div className="text-center py-3 text-[#8b6914] italic text-sm">Premier horloger !</div>
              ) : (
                gameOverLeaderboard.map((e, i) => {
                  const isCurrent = e.score === finalStats.score && e.pseudo === gameState.playerPseudo;
                  return (
                    <div key={i} className={`p-2 my-2 rounded-lg flex items-center gap-2 text-sm ${isCurrent ? 'bg-[#d4af3750] border-2 border-[#d4af37]' : i < 3 ? 'bg-[#d4af3720]' : 'bg-[#00000033]'}`}>
                      <span className="text-xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
                      <div className="flex-1">
                        <div className="font-bold text-[#d4af37]">{e.pseudo} {isCurrent && '⭐'}</div>
                        <div className="text-xs text-[#a89152]">{e.lines} • Calibre {e.level}</div>
                      </div>
                      <div className="font-cinzel font-bold text-[#d4af37]">{e.score}</div>
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex gap-3 justify-center flex-wrap">
              <button onClick={quickRestart} className="font-cinzel bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-6 py-3 rounded-xl font-bold uppercase">
                ▶️ Nouvelle Partie
              </button>
              <button onClick={changePseudo} className="font-cinzel bg-gradient-to-br from-[#8b6914] to-[#6b5210] text-[#d4af37] px-6 py-3 rounded-xl font-bold uppercase">
                ✏️ Changer Pseudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

      {/* Modal Badges */}
      {showBadgesModal && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#281e14f0] to-[#3c2814f0] p-8 rounded-3xl border-4 border-[#d4af37] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-cinzel text-4xl text-[#d4af37] mb-6 text-center drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">
              🏅 Collection de Badges
            </h2>
            
            <div className="mb-6 text-center text-[#c9a659]">
              <span className="text-2xl font-bold text-[#d4af37]">{badges.length}</span> / {ALL_BADGES.length} badges débloqués
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {ALL_BADGES.map(badge => {
                const isUnlocked = badges.includes(badge.id);
                const progress = playerStats[badge.stat] || 0;
                const percent = Math.min(100, Math.round((progress / badge.target) * 100));
                
                return (
                  <div 
                    key={badge.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isUnlocked 
                        ? 'bg-gradient-to-br from-[#d4af3750] to-[#b8860b30] border-[#d4af37] shadow-lg shadow-[#d4af3730]' 
                        : 'bg-[#00000070] border-[#8b6914]'
                    }`}
                  >
                    <div className="text-5xl mb-3 text-center">
                      {isUnlocked ? badge.icon : '🔒'}
                    </div>
                    <div className={`font-cinzel text-center text-sm mb-2 ${isUnlocked ? 'text-[#d4af37] font-bold' : 'text-[#8b6914]'}`}>
                      {badge.name}
                    </div>
                    <div className={`text-xs text-center mb-3 ${isUnlocked ? 'text-[#c9a659]' : 'text-[#6b5210]'}`}>
                      {badge.desc}
                    </div>
                    
                    {!isUnlocked && (
                      <div>
                        <div className="w-full h-2 bg-[#00000080] rounded-full overflow-hidden mb-1">
                          <div 
                            className="h-full bg-gradient-to-r from-[#8b6914] to-[#d4af37]"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <div className="text-[10px] text-center text-[#8b6914]">
                          {progress} / {badge.target}
                        </div>
                      </div>
                    )}
                    
                    {isUnlocked && (
                      <div className="text-center text-green-400 text-sm font-bold">
                        ✅ DÉBLOQUÉ
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowBadgesModal(false)}
              className="font-cinzel bg-gradient-to-br from-[#d4af37] to-[#b8860b] text-[#1a1410] px-8 py-4 rounded-xl font-bold w-full text-lg uppercase hover:shadow-xl transition-all"
            >
              ✨ Fermer
            </button>
          </div>
        </div>
      )}
  );
}
export default dynamic(() => Promise.resolve(AtelierHorloger), { ssr: false });
