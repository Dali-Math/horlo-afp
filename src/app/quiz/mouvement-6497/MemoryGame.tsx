"use client";
import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  // Use actual image filenames from /public/images/quiz/6497/
  const images = [
    '/images/quiz/6497/ancre.png',
    '/images/quiz/6497/balancier.png',
    '/images/quiz/6497/barillet.png',
    '/images/quiz/6497/spiral.png',
    '/images/quiz/6497/platine.png'
  ];

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeCards = () => {
    // Create pairs by duplicating each image
    const pairedImages = [...images, ...images];
    // Shuffle the pairs
    const shuffledImages = pairedImages.sort(() => Math.random() - 0.5);
    const gameCards: Card[] = shuffledImages.map((img, index) => ({
      id: index,
      image: img,
      isFlipped: false,
      isMatched: false
    }));
    setCards(gameCards);
  };

  const startGame = () => {
    initializeCards();
    setGameStarted(true);
    setTime(0);
    setGameWon(false);
    setFlippedCards([]);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || gameWon) return;
    if (flippedCards.includes(cardId)) return;
    if (cards[cardId].isMatched) return;
    if (flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      if (cards[firstCard].image === cards[secondCard].image) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === firstCard || card.id === secondCard
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1500);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setGameWon(true);
      setGameStarted(false);
    }
  }, [cards]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <style jsx>{`
        .memory-container {
          display: grid;
          grid-template-columns: 3fr 1fr;
          align-items: start;
          justify-content: center;
          gap: 4rem;
          max-width: 1600px;
          margin: 3rem auto;
          padding: 2rem 4rem;
        }
        .memory-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.6rem;
          justify-items: center;
          margin-right: 3rem;
        }
        .memory-sidebar {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          margin-top: 1rem;
        }
        .memory-card {
          width: 100px;
          height: 100px;
          perspective: 1000px;
          cursor: pointer;
        }
        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          cursor: pointer;
        }
        .card-flipped .card-inner {
          transform: rotateY(180deg);
        }
        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .card-front {
          background: linear-gradient(135deg, #d19c28, #e2b44f);
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }
        .card-back {
          background: #fffef8;
          transform: rotateY(180deg);
          border: 2px solid #e2b44f;
        }
        .card-back img {
          max-width: 85%;
          max-height: 85%;
          object-fit: contain;
        }
        .card-matched {
          opacity: 0.6;
          transform: scale(0.9);
        }
        .memory-panel {
          background: #fffef8;
          border: 2px solid #e2b44f;
          border-radius: 1.5rem;
          padding: 2rem;
          width: 260px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          text-align: center;
        }
        .memory-panel h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 0.5rem;
        }
        .memory-panel .time {
          font-size: 2rem;
          font-weight: 700;
          color: #d19c28;
          margin-bottom: 1rem;
        }
        .start-btn {
          background: #d19c28;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 1rem;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .start-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        }
        .hint {
          margin-top: 1rem;
          font-size: 0.9rem;
          color: #555;
        }
        /* Responsive */
        @media (max-width: 1024px) {
          .memory-container {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
          .memory-sidebar {
            justify-content: center;
          }
          .memory-panel {
            width: 100%;
            max-width: 400px;
          }
          .memory-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
        @media (max-width: 768px) {
          .memory-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      
      <div className="memory-container">
        <div className="memory-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`memory-card ${
                card.isFlipped || card.isMatched ? 'card-flipped' : ''
              } ${card.isMatched ? 'card-matched' : ''}`}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="card-inner">
                <div className="card-front">?</div>
                <div className="card-back">
                  <img src={card.image} alt={`Carte ${card.id + 1}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="memory-sidebar">
          <div className="memory-panel">
            <h3>Temps écoulé</h3>
            <div className="time">{formatTime(time)}</div>
            <button className="start-btn" onClick={startGame}>
              {gameStarted ? 'Recommencer' : 'Commencer'}
            </button>
            {gameWon && (
              <div className="hint">
                🎉 Félicitations ! Vous avez terminé en {formatTime(time)} !
              </div>
            )}
            {!gameStarted && !gameWon && (
              <div className="hint">
                Trouvez toutes les paires d'images identiques
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
