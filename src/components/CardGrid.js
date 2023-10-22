import React, { useState, useEffect, useRef } from 'react';
import '../styles/CardGrid.css';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

const data = [
    {
      id: 1,
      name: "Rohan's Training Pool",
      model: "Linear Regression",
      progress: "Round 0 of 10",
      contributorstatus: "Open",
      differentialprivacy: "Disabled",
      bounty: "0.0015 ETH",
      description: "A machine learning training task utilizing linear regression to forecast disease occurrences from health data, aiming to enhance early disease detection and inform proactive healthcare interventions."
    },
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
    {
      id: 3,
      name: "Spam Email Detection",
      model: "Logistic Regression",
      progress: "Round 12 of 40",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "4.5 ETH",
      description: "Build a logistic regression model to detect spam emails and enhance email filtering."
    },
    {
      id: 4,
      name: "Customer Churn Analysis",
      model: "Random Forest",
      progress: "Round 25 of 80",
      contributorstatus: "Full",
      differentialprivacy: "Disabled",
      bounty: "7 ETH",
      description: "Use a random forest model to predict customer churn and develop strategies to retain customers."
    },
    {
      id: 6,
      name: "Recommendation System",
      model: "Neural Network",
      progress: "Round 35 of 70",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "7.5 ETH",
      description: "Create a neural network-based recommendation system for movies and products to enhance user experience."
    },
    {
      id: 7,
      name: "Customer Segmentation",
      model: "Decision Tree",
      progress: "Round 20 of 50",
      contributorstatus: "Full",
      differentialprivacy: "Disabled",
      bounty: "4 ETH",
      description: "Utilize a decision tree model to segment customers for targeted marketing campaigns."
    },
    {
      id: 8,
      name: "Image Generation",
      model: "Neural Network",
      progress: "Round 45 of 90",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "9 ETH",
      description: "Train a neural network to generate artistic images and explore the potential of AI in art creation."
    },
    {
      id: 9,
      name: "Sentiment Analysis",
      model: "Logistic Regression",
      progress: "Round 35 of 70",
      contributorstatus: "Full",
      differentialprivacy: "Disabled",
      bounty: "5.5 ETH",
      description: "Develop a logistic regression model to analyze social media sentiment and gauge public opinion."
    },
    {
      id: 11,
      name: "Language Translation",
      model: "Neural Network",
      progress: "Round 25 of 50",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "6.5 ETH",
      description: "Train a neural network for language translation to break down language barriers and facilitate communication."
    },
    {
      id: 12,
      name: "Credit Risk Assessment",
      model: "Logistic Regression",
      progress: "Round 30 of 60",
      contributorstatus: "Full",
      differentialprivacy: "Disabled",
      bounty: "5 ETH",
      description: "Build a logistic regression model to assess credit risk and improve lending decisions."
    },
    {
      id: 13,
      name: "Object Detection",
      model: "Neural Network",
      progress: "Round 40 of 120",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "7 ETH",
      description: "Train a neural network for object detection in images and video streams to enhance security systems."
    },
    {
      id: 15,
      name: "Speech Recognition",
      model: "Neural Network",
      progress: "Round 30 of 60",
      contributorstatus: "Full",
      differentialprivacy: "Enabled",
      bounty: "6 ETH",
      description: "Train a neural network for speech recognition to enable voice-controlled applications."
    },
    {
      id: 16,
      name: "Stock Market Forecasting",
      model: "Random Forest",
      progress: "Round 35 of 70",
      contributorstatus: "Full",
      differentialprivacy: "Disabled",
      bounty: "7.5 ETH",
      description: "Develop a random forest model to forecast stock market trends and assist investors."
    }
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
      <div className="card-grid">
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
                  <button className="file-button" onClick={handleFileUpload}>Upload Data</button>
                </>
              )}
              <button className="join-button" disabled={!write} onClick={() => write?.()}>Join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;