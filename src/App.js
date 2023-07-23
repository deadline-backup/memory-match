import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import GameBoard from './GameBoard';
import './Card.css';

const symbols = ['🐶', '🐱', '🐭', '🦊', '🐸', '🦄', '🦓', '🐢'];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [board, setBoard] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disableClick, setDisableClick] = useState(false);

  const flipTimeoutRef = useRef(null);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledSymbols = shuffle([...symbols, ...symbols]);
    const newBoard = [];
    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push({
          symbol: shuffledSymbols[i * 4 + j],
          flipped: false,
          matched: false,
        });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
    setOpenedCards([]);
    setMatchedPairs(0);
    setDisableClick(false);
  };

  const flipCard = (row, col) => {
    if (!board[row][col].matched && !board[row][col].flipped && openedCards.length < 2 && !disableClick) {
      const newBoard = [...board];
      newBoard[row][col].flipped = true;
      setBoard(newBoard);
      setOpenedCards([...openedCards, { row, col }]);

      if (openedCards.length === 1) {
        setDisableClick(true);
      }
    }
  };

  const checkMatch = () => {
    const [card1, card2] = openedCards;
    const newBoard = [...board];

    if (newBoard[card1.row][card1.col].symbol === newBoard[card2.row][card2.col].symbol) {
      newBoard[card1.row][card1.col].matched = true;
      newBoard[card2.row][card2.col].matched = true;
      setMatchedPairs(matchedPairs + 1);

      if (matchedPairs + 1 === symbols.length) {
        setTimeout(() => alert('Congratulations! You matched all pairs.'), 500);
      }
    } else {
      setTimeout(() => {
        newBoard[card1.row][card1.col].flipped = false;
        newBoard[card2.row][card2.col].flipped = false;
        setBoard(newBoard);
        setOpenedCards([]);
        setDisableClick(false);
      }, 700);
    }

    setBoard(newBoard);
    setOpenedCards([]);
    setDisableClick(false); // Reset the disableClick state to false after the cards are matched (whether they match or not)
  };

  useEffect(() => {
    if (openedCards.length === 2) {
      flipTimeoutRef.current = setTimeout(checkMatch, 700);
    }

    return () => clearTimeout(flipTimeoutRef.current);
  }, [openedCards]);

  return (
    <div className="App">
      <h1>Memory Match Game</h1>
      <GameBoard board={board} onCardClick={flipCard} />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
