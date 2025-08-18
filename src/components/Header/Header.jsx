import React, {useState} from 'react';
import Registration from '../Registration/Registration';

const Header = () => {

  const [showRegistration, setShowRegistration] = useState(false);

  const handleSignInClick = () => {
    setShowRegistration(true);
  };

  const closePopup = () => {
    setShowRegistration(false);
  };

  return (
    <>
    <header className="stock-header">
      <div className="stock-logo">maangas</div>
      <div>
        <nav className="stock-nav">
          <button className="nav-button active">Predict</button>
          <button className="nav-button">Analyze</button>
          <button className="nav-button">Model</button>
          <button className="nav-button">About Us</button>
          <button className="nav-button" onClick={handleSignInClick}>Sign-In</button>
        </nav>
      </div>
    </header>

    {showRegistration && (
      <div className="registrationPopup" onClick={closePopup}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={closePopup}>X</button>
        <Registration onClose={closePopup} />
        </div>
      </div>
  )}
  </>

  );
};

export default Header;