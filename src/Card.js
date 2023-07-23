import React from 'react';
import './Card.css';

function Card({ symbol, flipped, matched, onClick }) {
  return (
    <div className={`card ${flipped ? 'flipped' : ''} ${matched ? 'matched' : ''}`} onClick={onClick}>
      {flipped || matched ? symbol : ''}
    </div>
  );
}

export default Card;
