import React, { useState, useEffect } from 'react';
import './App.css';

const symbols = ['🐶', '🐱', '🐭', '🦊', '🐸', '🦄', '🦓', '🐢'];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [cards, setCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [disableClick, setDisableClick] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const shuffledCards = shuffle([...symbols, ...symbols]);
    setCards(shuffledCards.map((symbol, index) => ({ symbol, index, flipped: false, matched: false })));
    setOpenedCards([]);
    setMatchedPairs(0);
    setDisableClick(false);
  };

  const flipCard = (index) => {
    if (openedCards.length < 2 && !disableClick) {
      const card = cards[index];
      if (!card.matched && !card.flipped) {
        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);
        setOpenedCards([...openedCards, card]);

        if (openedCards.length === 1) {
          setDisableClick(true);
          setTimeout(checkMatch, 1000);
        }
      }
    }
  };

  const checkMatch = () => {
    const [card1, card2] = openedCards;
    const newCards = [...cards];

    if (card1.symbol === card2.symbol) {
      newCards[card1.index].matched = true;
      newCards[card2.index].matched = true;
      setMatchedPairs(matchedPairs + 1);

      if (matchedPairs + 1 === symbols.length) {
        setTimeout(() => alert('Congratulations! You matched all pairs.'), 500);
      }
    } else {
      newCards[card1.index].flipped = false;
      newCards[card2.index].flipped = false;
    }

    setCards(newCards);
    setOpenedCards([]);
    setDisableClick(false);
  };

  return (
    <div className="App">
      <h1>Memory Match Game</h1>
      <div className="gameBoard">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => flipCard(index)}
          >
            {card.flipped ? card.symbol : ''}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
