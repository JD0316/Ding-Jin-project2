import React from 'react';
import { Link } from 'react-router-dom';
import './GameSelection.css';

// Hardcoded mock data as required
const games = [
  { title: 'The Daily Challenge (Normal)', author: 'by AI Bot', link: '/games/normal' },
  { title: 'Beginner\'s Luck (Easy)', author: 'by John Smith', link: '/games/easy' },
  { title: 'Weekend Puzzle (Normal)', author: 'by Jane Doe', link: '/games/normal' },
  { title: 'Mind Bender (Normal)', author: 'by The Puzzle Master', link: '/games/normal' },
];

function GameSelection() {
  return (
    <div className="container selection-container">
      <h1>Select a Game</h1>
      <ul className="game-list">
        {games.map((game, index) => (
          <li key={index}>
            <Link to={game.link}>
              <span className="game-title">{game.title}</span>
              <span className="game-author">{game.author}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameSelection;