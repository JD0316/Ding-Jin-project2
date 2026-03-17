# Sudoku Master - React Single-Player Game

This project is a single-player version of the classic puzzle game, Sudoku, built with React. It expands upon a previous static HTML/CSS project by introducing full game logic, state management via React Context, and dynamic component-based rendering. The application features two game modes: a 6x6 easy mode and a 9x9 normal mode, both with randomly generated puzzles.

---

## Project Information

- **GitHub Repo:** https://github.com/JD0316/Ding-Jin-project2.git
- **Collaborators:** N/A

---

## Writeup

### What were some challenges you faced while making this app?

One of the biggest challenges was designing a robust and bug-free state management system using the React Context API. Specifically, implementing the real-time conflict detection (`findConflicts` function) proved to be quite tricky. Refactoring this logic multiple times to correctly and efficiently identify all rule violations across rows, columns, and subgrids for both 6x6 and 9x9 boards was a significant but rewarding learning experience in debugging and algorithmic thinking.

### Given more time, what additional features, functional or design changes would you make?

Given more time, I would focus on enhancing the user experience and adding more "game-like" features. First, I would implement the "Hint" system bonus, which would highlight a solvable cell for the user. Second, I would add a backend service and database to support user accounts, allowing players to save their progress, track their best times, and compete on a persistent global high-score leaderboard. Finally, I would add more visual polish, such as different board themes (e.g., a dark mode) and more satisfying animations for winning the game or clearing an error.

### What assumptions did you make while working on this assignment?

I made a few key assumptions while developing the app. First, I assumed that the `sudoku-gen` library, while useful, might not produce perfectly balanced puzzles for all difficulties, which led me to create my own logic for generating a clean 6x6 board from a 9x9 source. I also assumed that for the mocked pages (like High Scores and Login), a clean and simple presentation was sufficient, as the focus of this project was the core game functionality. Finally, I assumed that a global context was the best fit for state management, as nearly every component of the game needed access to the board state or game status.

### How long did this assignment take to complete?

This assignment took approximately 25 hours to complete.

### What bonus points did you accomplish?

- **Local Storage (3 Bonus Points):** Accomplished. The entire game state (including the current board, timer, and difficulty) is automatically saved to `window.localStorage` after every move. When the application is re-opened, it restores the previous game state, allowing the user to seamlessly continue where they left off. This logic is encapsulated entirely within `src/context/GameContext.js`, ensuring that other components remain unaware of the implementation details, and the local storage is cleared automatically when a new game is started or a puzzle is solved.

---

## Getting Started Locally

To run this project on your local machine:

1. Clone the repository:
   ```sh
   git clone https://github.com/JD0316/Ding-Jin-project2.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
This will open the app in your browser at `http://localhost:3000`.