import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="container home-container">
      <h1>Welcome to Sudoku Master</h1>
      <p>This is a React version of the popular puzzle game.</p>
      {/* Correcting the filename to img.png */}
      <img src={`${process.env.PUBLIC_URL}/assets/img.png`} alt="Sudoku Art" className="hero-img" />
      <br />
      <Link to="/games" className="btn-start">Start Game</Link>
    </div>
  );
}

export default Home;