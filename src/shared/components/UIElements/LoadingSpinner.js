import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ asOverlay }) => (
  <div className={`${asOverlay && 'loading-spinner__overlay'}`}>
    <div className="lds-dual-ring"></div>
  </div>
);

export default LoadingSpinner;

