import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import { getSudoku } from 'sudoku-gen';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

const findConflicts = (board) => {
  const conflicts = new Set();
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

export const GameProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState(null);
  const [initialBoard, setInitialBoard] = useState([]); // To store the original puzzle
  const [board, setBoard] = useState([]);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isGameActive) {
      timerRef.current = setInterval(() => setTimer(prev => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isGameActive]);

  const createNewGame = useCallback((level) => {
    setDifficulty(level);
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
    setInitialBoard(JSON.parse(JSON.stringify(formattedBoard))); // Deep copy
    setBoard(formattedBoard);
    setSelectedCell({ row: null, col: null });
    setTimer(0);
    setIsGameWon(false);
    setIsGameActive(true);
  }, []);

  const resetGame = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard))); // Restore from initial state
    setTimer(0);
    setIsGameWon(false);
    setIsGameActive(true);
    setSelectedCell({ row: null, col: null });
  };

  const selectCell = (row, col) => {
    if (isGameWon || !board[row]?.[col]?.isEditable) return;
    setSelectedCell({ row, col });
  };

  const updateCellValue = (value) => {
    if (selectedCell.row === null || isGameWon) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    const { row, col } = selectedCell;
    newBoard[row][col].value = value;
    const conflicts = findConflicts(newBoard);
    let isBoardFull = true;
    for (let r = 0; r < newBoard.length; r++) {
      for (let c = 0; c < newBoard.length; c++) {
        newBoard[r][c].isError = conflicts.has(`${r}-${c}`);
        if (newBoard[r][c].value === 0) isBoardFull = false;
      }
    }
    setBoard(newBoard);
    if (isBoardFull && conflicts.size === 0) {
      setIsGameWon(true);
      setIsGameActive(false);
    }
  };

  const value = {
    difficulty, board, selectedCell, timer, isGameActive, isGameWon,
    createNewGame, selectCell, updateCellValue, resetGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};