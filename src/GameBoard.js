import React from 'react';
import './GameBoard.css';
import Card from './Card';

function GameBoard({ board, onCardClick }) {
  return (
    <div className="gameBoard">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((card, colIndex) => (
            <Card
              key={`${rowIndex}-${colIndex}`}
              symbol={card.symbol}
              flipped={card.flipped}
              matched={card.matched}
              onClick={() => onCardClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
