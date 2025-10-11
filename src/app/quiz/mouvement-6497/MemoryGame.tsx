"use client";
import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  image: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  // Use actual image filenames from /public/images/quiz/6497/
  const images = [
    { src: '/images/quiz/6497/ancre.png', name: 'Ancre' },
    { src: '/images/quiz/6497/balancier.png', name: 'Balancier' },
    { src: '/images/quiz/6497/barillet.png', name: 'Barillet' },
    { src: '/images/quiz/6497/spiral.png', name: 'Spiral' },
    { src: '/images/quiz/6497/platine.png', name: 'Platine' }
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
      image: img.src,
      name: img.name,
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

  return (
    <>
      <style jsx global>{`
        .memory-game-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 4rem;
          padding: 2rem;
          flex-wrap: wrap;
        }

        .memory-grid {
          display: grid;
          grid-template-columns: repeat(5, 120px);
          grid-gap: 15px;
          justify-content: center;
          align-items: center;
        }

        .memory-card {
          background-color: #d4a52d;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 120px;
          transition: transform 0.2s ease;
        }

        .memory-card:hover {
          transform: scale(1.05);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .memory-panel {
          width: 220px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .timer-box {
          background: #fff8e6;
          border: 1px solid #e2b44f;
          border-radius: 12px;
          padding: 1.2rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .timer-title {
          font-weight: 600;
          color: #222;
        }

        .timer-value {
          font-size: 1.5rem;
          color: #d4a52d;
          margin: 0.5rem 0;
        }

        .start-btn,
        .reset-btn {
          background-color: #e2b44f;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          margin-top: 0.6rem;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s ease;
        }

        .start-btn:hover,
        .reset-btn:hover {
          background-color: #d19f41;
        }

        .hint {
          font-size: 0.85rem;
          color: #666;
          margin-top: 0.6rem;
        }

        /* Responsive mobile / tablette */
        @media (max-width: 1024px) {
          .memory-game-container {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }

          .memory-grid {
            grid-template-columns: repeat(4, 100px);
          }

          .memory-card {
            width: 100px;
            height: 100px;
          }

          .memory-panel {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 600px) {
          .memory-grid {
            grid-template-columns: repeat(3, 90px);
            gap: 12px;
          }

          .memory-card {
            width: 90px;
            height: 90px;
          }

          .timer-value {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="memory-game-container">
        <div className="memory-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`memory-card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <img
                src={card.isFlipped || card.isMatched ? card.image : '/images/back.png'}
                alt={card.name}
                className="card-image"
              />
            </div>
          ))}
        </div>
        <div className="memory-panel">
          <div className="timer-box">
            <p className="timer-title">⏱️ Temps écoulé :</p>
            <p className="timer-value">
              {Math.floor(time / 60).toString().padStart(2, '0')}:{(time % 60).toString().padStart(2, '0')}
            </p>
            {!gameStarted ? (
              <button onClick={startGame} className="start-btn">🎮 Commencer</button>
            ) : (
              <button onClick={startGame} className="reset-btn">🔄 Recommencer</button>
            )}
            <p className="hint">💡 Trouvez toutes les paires d'images identiques avant la fin du temps !</p>
          </div>
        </div>
      </div>
    </>
  );
}
