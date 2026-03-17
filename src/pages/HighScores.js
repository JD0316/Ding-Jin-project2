import React from 'react';
import './HighScores.css';

// Hardcoded mock data as required
const scores = [
  { rank: 1, username: 'PlayerOne', puzzlesCompleted: 152 },
  { rank: 2, username: 'SudokuFan', puzzlesCompleted: 148 },
  { rank: 3, username: 'GridMaster', puzzlesCompleted: 135 },
  { rank: 4, username: 'NumberNinja', puzzlesCompleted: 120 },
  { rank: 5, username: 'PuzzlePro', puzzlesCompleted: 112 },
  { rank: 6, username: 'LogicLover', puzzlesCompleted: 98 },
];

function HighScores() {
  return (
    <div className="container scores-container">
      <h1>High Scores</h1>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Puzzles Completed</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.rank}>
              <td>{score.rank}</td>
              <td>{score.username}</td>
              <td>{score.puzzlesCompleted}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HighScores;