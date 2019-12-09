import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

const Button = ({ href, to, exact, type, onClick, disabled, size, inverse, info, danger, children, style }) => {
  if (href) {
    return <a
      className={`button button--${size || 'default'} ${!!inverse &&
      'button--inverse'} ${!!info && 'button--info'} ${!!danger && 'button--danger'}`} 
      href={href}
      style={style}
    >
      {children}
    </a>;
  }

  if (to) {
    return <Link 
      to={to}
      exact={exact}
      className={`button button--${size || 'default'} ${!!inverse &&
        'button--inverse'} ${!!info && 'button--info'} ${!!danger && 'button--danger'}`}
      style={style}
    >
      {children}
    </Link>;
  }

  return <button
    className={`button button--${size || 'default'} ${!!inverse &&
      'button--inverse'} ${!!info && 'button--info'} ${!!danger && 'button--danger'}`}
    type={type}
    onClick={onClick}
    disabled={disabled}
    style={style}
  >
    {children}
  </button>;
};

export default Button;

