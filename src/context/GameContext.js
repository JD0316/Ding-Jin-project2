import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { getSudoku } from 'sudoku-gen';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const findConflicts = (board) => {
  const conflicts = new Set();
  if (!board || board.length === 0) return conflicts;
  const size = board.length;
  for (let i = 0; i < size; i++) {
    const rowCounts = {}, colCounts = {};
    for (let j = 0; j < size; j++) {
      const rowVal = board[i][j].value;
      if (rowVal !== 0) rowCounts[rowVal] = (rowCounts[rowVal] || 0) + 1;
      const colVal = board[j][i].value;
      if (colVal !== 0) colCounts[colVal] = (colCounts[colVal] || 0) + 1;
    }
    for (let j = 0; j < size; j++) {
      if (board[i][j].value !== 0 && rowCounts[board[i][j].value] > 1) conflicts.add(`${i}-${j}`);
      if (board[j][i].value !== 0 && colCounts[board[j][i].value] > 1) conflicts.add(`${j}-${i}`);
    }
  }
  const subgridRows = size === 9 ? 3 : 3, subgridCols = size === 9 ? 3 : 2;
  for (let boxRow = 0; boxRow < size; boxRow += subgridRows) {
    for (let boxCol = 0; boxCol < size; boxCol += subgridCols) {
      const subgridCounts = {};
      for (let r = 0; r < subgridRows; r++) {
        for (let c = 0; c < subgridCols; c++) {
          const val = board[boxRow + r][boxCol + c].value;
          if (val !== 0) subgridCounts[val] = (subgridCounts[val] || 0) + 1;
        }
      }
      for (let r = 0; r < subgridRows; r++) {
        for (let c = 0; c < subgridCols; c++) {
          const val = board[boxRow + r][boxCol + c].value;
          if (val !== 0 && subgridCounts[val] > 1) conflicts.add(`${boxRow + r}-${boxCol + c}`);
        }
      }
    }
  }
  return conflicts;
};

// --- Local Storage Logic ---
const getInitialState = () => {
  try {
    const savedState = localStorage.getItem('sudokuGameState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error("Could not load state from local storage", error);
  }
  return null;
};

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(getInitialState() || {
    difficulty: null,
    initialBoard: [],
    board: [],
    selectedCell: { row: null, col: null },
    timer: 0,
    isGameActive: false,
    isGameWon: false,
  });

  const timerRef = useRef(null);

  // Effect to save state to local storage whenever it changes
  useEffect(() => {
    try {
      // Don't save if the game is not active and not won (i.e., initial state)
      if (gameState.isGameActive || gameState.isGameWon) {
        localStorage.setItem('sudokuGameState', JSON.stringify(gameState));
      }
    } catch (error) {
      console.error("Could not save state to local storage", error);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.isGameActive) {
      timerRef.current = setInterval(() => {
        setGameState(prev => ({ ...prev, timer: prev.timer + 1 }));
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState.isGameActive]);

  const createNewGame = useCallback((level) => {
    const difficultyForGen = level === 'easy' ? 'medium' : level;
    const rawBoard = getSudoku(difficultyForGen);
    const puzzle = rawBoard.puzzle.split('');
    const size = level === 'easy' ? 6 : 9;
    const formattedBoard = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const index = i * (difficultyForGen === 'easy' ? 6 : 9) + j;
        let value = puzzle[index] === '-' ? 0 : parseInt(puzzle[index], 10);
        if (level === 'easy' && value > 6) value = 0;
        row.push({ value: value, isEditable: value === 0, isError: false });
      }
      formattedBoard.push(row);
    }
    
    localStorage.removeItem('sudokuGameState'); // Clear old state
    setGameState({
      difficulty: level,
      initialBoard: JSON.parse(JSON.stringify(formattedBoard)),
      board: formattedBoard,
      selectedCell: { row: null, col: null },
      timer: 0,
      isGameWon: false,
      isGameActive: true,
    });
  }, []);

  const resetGame = () => {
    localStorage.removeItem('sudokuGameState');
    setGameState(prev => ({
      ...prev,
      board: JSON.parse(JSON.stringify(prev.initialBoard)),
      timer: 0,
      isGameWon: false,
      isGameActive: true,
      selectedCell: { row: null, col: null },
    }));
  };

  const selectCell = (row, col) => {
    if (gameState.isGameWon || !gameState.board[row]?.[col]?.isEditable) return;
    setGameState(prev => ({ ...prev, selectedCell: { row, col } }));
  };

  const updateCellValue = (value) => {
    if (gameState.selectedCell.row === null || gameState.isGameWon) return;
    const newBoard = gameState.board.map(row => row.map(cell => ({ ...cell })));
    const { row, col } = gameState.selectedCell;
    newBoard[row][col].value = value;
    const conflicts = findConflicts(newBoard);
    let isBoardFull = true;
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard.length; c++) {
        newBoard[r][c].isError = conflicts.has(`${r}-${c}`);
        if (newBoard[r][c].value === 0) isBoardFull = false;
      }
    }
    
    const gameWon = isBoardFull && conflicts.size === 0;
    if (gameWon) {
      localStorage.removeItem('sudokuGameState'); // Clear storage on win
    }

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      isGameWon: gameWon,
      isGameActive: !gameWon,
    }));
  };

  const value = { ...gameState, createNewGame, selectCell, updateCellValue, resetGame };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};