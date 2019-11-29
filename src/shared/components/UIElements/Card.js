import React from 'react';
import './Card.css';

const Card = ({ className, style, children }) => (
  <div className={`card ${className}`} style={style}>
    {children}
  </div>
);

export default Card;

