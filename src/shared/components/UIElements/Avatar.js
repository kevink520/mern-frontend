import React from 'react';
import './Avatar.css';

const Avatar = ({ className, style, image, alt, width }) => (
  <div className={`avatar ${className}`} style={style}>
    <img
      src={image}
      alt={alt}
      style={{ width, height: width, ...style }}
    />
  </div>
);

export default Avatar;

