"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const ROWS = 20;
const COLS = 10;
const SPEED_START = 700;

const SHAPES = [
  [[1, 1, 1, 1]], // I
  [[1, 1], [1, 1]], // O
  [[0, 1, 0], [1, 1, 1]], // T
  [[1, 1, 0], [0, 1, 1]], // S
  [[0, 1, 1], [1, 1, 0]], // Z
  [[1, 0, 0], [1, 1, 1]], // L
  [[0, 0, 1], [1, 1, 1]], // J
];

const randomShape = () => SHAPES[Math.floor(Math.random() * SHAPES.length)];

export default function TetrisHorlogerTest() {
  const [board, setBoard] = useState<number[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(0))
  );
  const [piece, setPiece] = useState({
    shape: randomShape(),
    row: 0,
    col: 3,
  });
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(SPEED_START);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const mergePiece = (shape: number[][], r: number, c: number, value = 1) => {
    const newBoard = board.map((row) => [...row]);
    shape.forEach((row, y) =>
      row.forEach((val, x) => {
        if (val && r + y >= 0 && r + y < ROWS && c + x >= 0 && c + x < COLS) {
          newBoard[r + y][c + x] = value;
        }
      })
    );
    return newBoard;
  };

  const isValidMove = (shape: number[][], r: number, c: number) => {
    return shape.every((row, y) =>
      row.every((val, x) => {
        if (!val) return true;
        const newRow = r + y;
        const newCol = c + x;
        return (
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          (newRow < 0 || board[newRow][newCol] === 0)
        );
      })
    );
  };

  const moveDown = () => {
    const { shape, row, col } = piece;
    const newRow = row + 1;

    if (isValidMove(shape, newRow, col)) {
      setPiece({ ...piece, row: newRow });
    } else {
      const merged = mergePiece(shape, row, col);
      const cleared = clearLines(merged);
      setBoard(cleared.newBoard);
      setScore(score + cleared.lines * 100);
      if (cleared.lines > 0 && speed > 200) setSpeed(speed - 30);
      spawnNewPiece(cleared.newBoard);
    }
  };

  const clearLines = (newBoard: number[][]) => {
    let lines = 0;
    const filtered = newBoard.filter((row) => {
      if (row.every((cell) => cell)) {
        lines++;
        return false;
      }
      return true;
    });
    while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(0));
    return { newBoard: filtered, lines };
  };

  const spawnNewPiece = (b: number[][]) => {
    const newPiece = { shape: randomShape(), row: 0, col: 3 };
    if (!isValidMove(newPiece.shape, newPiece.row, newPiece.col)) {
      setGameOver(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    setPiece(newPiece);
  };

  const rotate = () => {
    const rotated = piece.shape[0].map((_, i) =>
      piece.shape.map((row) => row[i]).reverse()
    );
    if (isValidMove(rotated, piece.row, piece.col)) {
      setPiece({ ...piece, shape: rotated });
    }
  };

  const move = (dir: number) => {
    const newCol = piece.col + dir;
    if (isValidMove(piece.shape, piece.row, newCol)) {
      setPiece({ ...piece, col: newCol });
    }
  };

  useEffect(() => {
    if (gameOver) return;
    intervalRef.current = setInterval(moveDown, speed);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [piece, board, speed, gameOver]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (gameOver) return;
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
    if (e.key === "ArrowUp") rotate();
    if (e.key === "ArrowDown") moveDown();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const displayBoard = mergePiece(piece.shape, piece.row, piece.col);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
      <h1 className="text-3xl font-bold text-[#E2B44F] mb-4">
        ⚙️ Tetris Horloger – Test V2
      </h1>

      <div className="grid grid-cols-10 gap-[2px] bg-[#1a1a1a] p-2 rounded-lg shadow-[0_0_20px_#E2B44F40]">
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <motion.div
              key={`${y}-${x}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className={`w-6 h-6 rounded-sm ${
                cell
                  ? "bg-[#E2B44F] shadow-[0_0_8px_#E2B44F]"
                  : "bg-[#141414]"
              }`}
            />
          ))
        )}
      </div>

      <div className="flex items-center justify-between mt-6 w-64">
        <p className="text-lg">Score: <span className="text-[#E2B44F]">{score}</span></p>
        {gameOver && (
          <button
            onClick={() => window.location.reload()}
            className="bg-[#E2B44F] text-black px-4 py-1 rounded hover:bg-[#f2c85c]"
          >
            Rejouer
          </button>
        )}
      </div>
    </div>
  );
}
