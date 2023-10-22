import React, { useState, useEffect, useRef } from 'react';
import '../styles/CardGrid.css';

const data = [
    {
      id: 1,
      name: 'Card 1',
      model: 'Model A',
      progress: 'Round 3 of 10',
      contributerstatus: 'Full',
      differentialprivacy: 'Enabled',
      bounty: '$500',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        id: 1,
        name: 'Card 1',
        model: 'Model A',
        progress: 'Round 3 of 10',
        contributerstatus: 'Full',
        differentialprivacy: 'Enabled',
        bounty: '$500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 1,
        name: 'Card 1',
        model: 'Model A',
        progress: 'Round 3 of 10',
        contributerstatus: 'Full',
        differentialprivacy: 'Enabled',
        bounty: '$500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        id: 1,
        name: 'Card 1',
        model: 'Model A',
        progress: 'Round 3 of 10',
        contributerstatus: 'Full',
        differentialprivacy: 'Enabled',
        bounty: '$500',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
  ];

const CardGrid = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const popupRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleCardClick = (card, e) => {
    e.stopPropagation(); // Prevent click event from propagating to the window
    setSelectedCard(card);
  };

  const closePopup = () => {
    setSelectedCard(null);
  };

  const handleFileUpload = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      // Handle file upload here (e.g., send to a server or process locally)
      setFileUploaded(true);
    }
  };

  const handleJoin = () => {
    // Implement your 'join' functionality here
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="card-grid">
        {data.map((card) => (
          <div key={card.id} className="card" onClick={(e) => handleCardClick(card, e)}>
            <div className="card-name">{card.name}</div>
            <div className="stat-label">Model: <span className="card-stat">{card.model}</span></div>
            <div className="stat-label">Progress: <span className="card-stat">{card.progress}</span></div>
            <div className="stat-label">Contributer Status: <span className={card.contributerstatus === 'Full' ? 'red-text' : 'green-text'}>{card.contributerstatus}</span></div>
            <div className="stat-label">Differential Privacy: <span className="card-stat">{card.differentialprivacy}</span></div>
            <div className="stat-label">Bounty: <span className="card-stat">{card.bounty}</span></div>
        </div>
        ))}
      </div>

      {selectedCard && (
        <div className="popup">
          <div className="popup-content" ref={popupRef}>
          <div className="popup-card-name">{selectedCard.name}</div>
            <div className="popup-stat-label"><span className="popup-card-stat">{selectedCard.description}</span></div>
            <div className="popup-stat-label">Model: <span className="popup-card-stat">{selectedCard.model}</span></div>
            <div className="popup-stat-label">Progress: <span className="popup-card-stat">{selectedCard.progress}</span></div>
            <div className="popup-stat-label">Contributer Status: <span className={selectedCard.contributerstatus === 'Full' ? 'red-text' : 'green-text'}>{selectedCard.contributerstatus}</span></div>
            <div className="popup-stat-label">Differential Privacy: <span className="popup-card-stat">{selectedCard.differentialprivacy}</span></div>
            <div className="popup-stat-label">Bounty: <span className="popup-card-stat">{selectedCard.bounty}</span></div>
            <div className="button-container">
              {fileUploaded ? (
                <button className="file-button-uploaded">Files Uploaded</button>
              ) : (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <button className="file-button" onClick={handleFileUpload}>Upload Files</button>
                </>
              )}
              <button className="join-button" onClick={handleJoin}>Join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;