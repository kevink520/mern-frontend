import React from 'react';
import './MainHeader.css';

const MainHeader = ({ children }) => (
  <header className="main-header">
    {children}
  </header>
);

export default MainHeader;

