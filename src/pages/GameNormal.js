import React, { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import SudokuGrid from '../components/SudokuGrid';
import GameWonModal from '../components/GameWonModal';
import './GamePage.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

function GameNormal() {
  const { board, timer, isGameWon, difficulty, createNewGame, resetGame } = useGame();

  useEffect(() => {
    // Only create a new game if the difficulty is not already set to medium
    if (difficulty !== 'medium') {
      createNewGame('medium');
    }
  }, [createNewGame, difficulty]);

  return (
    <div className="container game-container">
      {isGameWon && <GameWonModal />}
      <div className="game-header">
        <h1>Normal Game (9x9)</h1>
        <div className="timer">Time: {formatTime(timer)}</div>
      </div>
      
      <SudokuGrid board={board} />

      <div className="game-controls">
        <button onClick={resetGame}>Reset</button>
        <button onClick={() => createNewGame('medium')}>New Game</button>
      </div>
    </div>
  );
}

export default GameNormal;