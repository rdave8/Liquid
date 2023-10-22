import React, { useState, useEffect, useRef } from 'react';
import '../styles/CardGrid1.css';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const data = [
    {
      id: 2,
      name: "Stock Price Prediction",
      model: "Linear Regression",
      progress: "Round 20 of 60",
      contributorstatus: "Open",
      differentialprivacy: "Enabled",
      bounty: "8 ETH",
      description: "Develop a linear regression model to predict stock prices based on historical data and market indicators."
    },
  ];

const CardGrid1 = () => {
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

  const { config } = usePrepareContractWrite({
    address: '0xac8ff620b259f8a56f527c01598849a954608e74',
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"contributeData","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"getParticipantContribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"isParticipant","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"participants","outputs":[{"internalType":"uint256","name":"contribution","type":"uint256"},{"internalType":"bool","name":"hasContributed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"roundNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"startNewRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"testCreate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"testJoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trainingInProgress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
    functionName: 'testJoin',
  })
  const { write } = useContractWrite(config)

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
      <div className="card-grid1">
        {data.map((card) => (
          <div key={card.id} className="card" onClick={(e) => handleCardClick(card, e)}>
            <div className="card-name">{card.name}</div>
            <div className="stat-label">Model: <span className="card-stat">{card.model}</span></div>
            <div className="stat-label">Progress: <span className="card-stat">{card.progress}</span></div>
            <div className="stat-label">Contributor Status: <span className={card.contributorstatus === 'Full' ? 'red-text' : 'green-text'}>{card.contributorstatus}</span></div>
            <div className="stat-label">Differential Privacy: <span className="card-stat">{card.differentialprivacy}</span></div>
            <div className="stat-label">Bounty: <span className="green-text">{card.bounty}</span></div>
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
            <div className="popup-stat-label">Contributor Status: <span className={selectedCard.contributorstatus === 'Full' ? 'red-text' : 'green-text'}>{selectedCard.contributorstatus}</span></div>
            <div className="popup-stat-label">Differential Privacy: <span className="popup-card-stat">{selectedCard.differentialprivacy}</span></div>
            <div className="popup-stat-label">Bounty: <span className="green-text">{selectedCard.bounty}</span></div>
            <div className="button-container">
              {fileUploaded ? (
                <button className="file-button-uploaded">Data Uploaded</button>
              ) : (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                  <button className="file-button" onClick={handleFileUpload}>Upload Additional Data</button>
                </>
              )}
              <button className="join-button" disabled={!write} onClick={() => write()}>Claim Rewards</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid1;