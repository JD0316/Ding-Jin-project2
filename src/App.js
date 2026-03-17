import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { GameProvider } from './context/GameContext';
import './App.css';

import Home from './pages/Home';
import Rules from './pages/Rules';
import Login from './pages/Login';
import Register from './pages/Register';
import HighScores from './pages/HighScores';
import GameSelection from './pages/GameSelection';
import GameNormal from './pages/GameNormal';
import GameEasy from './pages/GameEasy';


function App() {
  return (
    <GameProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/scores" element={<HighScores />} />
            <Route path="/games" element={<GameSelection />} />
            <Route path="/games/normal" element={<GameNormal />} />
            <Route path="/games/easy" element={<GameEasy />} />
          </Routes>
        </main>
      </Router>
    </GameProvider>
  );
}

export default App;