import React from 'react';

const CardComponent = ({ title, cardText, onCardChange }) => {
  return (
    <div className="card" style={{ width: '30%', border: '1px solid black', padding: '10px', margin: '5px' }}>
      <h4>{title}</h4>
      <p>{cardText}</p>
      <input type="checkbox" onChange={() => onCardChange(title)} />
    </div>
  );
};

export default CardComponent;
