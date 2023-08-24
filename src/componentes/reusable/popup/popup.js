import React, { useState } from 'react';
import './popup.scss';

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopUp = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handlePopUp}>Mostrar Pop-Up</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>¡Hola! Este es el mensaje del pop-up.</p>
            <button onClick={closePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
