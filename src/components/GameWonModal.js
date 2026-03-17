import React from 'react';
import { useGame } from '../context/GameContext';
import './GameWonModal.css';

function GameWonModal() {
  const { createNewGame, difficulty, timer } = useGame();

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You solved the puzzle in {formatTime(timer)}.</p>
        <button onClick={() => createNewGame(difficulty)}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameWonModal;