import React from 'react';

const Header = () => {
  return (
    <header className="stock-header">
      <div className="stock-logo">maangas</div>
      <div>
        <nav className="stock-nav">
          <button className="nav-button active">Predict</button>
          <button className="nav-button">Analyze</button>
          <button className="nav-button">Model</button>
          <button className="nav-button">About Us</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;