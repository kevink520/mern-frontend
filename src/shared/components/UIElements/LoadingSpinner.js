import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ asOverlay }) => (
  <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
);

export default LoadingSpinner;

