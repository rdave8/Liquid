import React, { useState, useEffect } from 'react';
import '../styles/CreatePoolForm.css'

const CreatePoolForm = ({ onFormChange }) => {
  const [poolName, setPoolName] = useState('');
  const [poolDescription, setPoolDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxContributors, setMaxContributors] = useState('');
  const [approvedAddresses, setApprovedAddresses] = useState('');
  const [differentialPrivacy, setDifferentialPrivacy] = useState(false);
  const [algorithm, setAlgorithm] = useState('NeuralNetwork');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const basePrice = 0.5;

    let algorithmMultiplier = 0.01;
    if (algorithm === 'LogisticRegression') {
      algorithmMultiplier = 0.0125;
    } else if (algorithm === 'DecisionTree') {
      algorithmMultiplier = 0.0225;
    } else if (algorithm === 'RandomForest') {
      algorithmMultiplier = 0.05;
    } else if (algorithm === 'NeuralNetwork') {
      algorithmMultiplier = 0.075;
    } 

    let totalPrice = basePrice;
    if (isPrivate) {
      totalPrice = 2*basePrice + algorithmMultiplier * 10;
    } else {
      totalPrice = basePrice + algorithmMultiplier * maxContributors;
    }

    if (differentialPrivacy) {
      totalPrice += 0.25;
    }

    setPrice(totalPrice);
    onFormChange('price', totalPrice);
  }, [isPrivate, maxContributors, differentialPrivacy, algorithm]);

  const handlePoolNameChange = (event) => {
    const value = event.target.value;
    setPoolName(value);
    onFormChange('poolName', value);
  };

  const handlePoolDescriptionChange = (event) => {
    const value = event.target.value;
    setPoolDescription(value);
    onFormChange('poolDescription', value);
  };

  const handleIsPrivateChange = () => {
    const value = !isPrivate;
    setIsPrivate(value);
    onFormChange('isPrivate', value);
  };

  const handleMaxContributorsChange = (event) => {
    const value = event.target.value;
    setMaxContributors(parseInt(value));
    onFormChange('maxContributors', value);
  };

  const handleApprovedAddressesChange = (event) => {
    const value = event.target.value;
    setApprovedAddresses(value);
    onFormChange('approvedAddresses', value);
  };

  const handleDifferentialPrivacyChange = () => {
    const value = !differentialPrivacy;
    setDifferentialPrivacy(value);
    onFormChange('differentialPrivacy', value);
  };

  const handleAlgorithmChange = (event) => {
    const value = event.target.value;
    setAlgorithm(event.target.value);
    onFormChange('algorithm', value);
  };

  return (
    <div className="form-container">
      <h2>Pool Configuration</h2>
      <label htmlFor="poolName" className="form-label">Pool Name</label>
      <input
        type="text"
        id="poolName"
        className="form-input"
        placeholder="Enter Pool Name"
        value={poolName}
        onChange={handlePoolNameChange}
      />

      <label htmlFor="poolDescription" className="form-label">Pool Description</label>
      <textarea
        id="poolDescription"
        className="form-input"
        rows="3"
        placeholder="Enter Pool Description"
        value={poolDescription}
        onChange={handlePoolDescriptionChange}
      ></textarea>

      <label htmlFor="poolTypePublic" className="form-label">Pool Type</label>
      <div className="radio-input">
        <label>
          <input 
          className="pool-type" 
          id="poolTypePublic" 
          type="radio" 
          checked={!isPrivate}
          value={!isPrivate}
          onChange={handleIsPrivateChange}
          />
          <span>Public</span>
        </label>
        <label>
          <input 
          name="pool-typePrivate" 
          id="poolType" 
          type="radio"
          checked={isPrivate}
          value={isPrivate}
          onChange={handleIsPrivateChange}
          />
          <span>Private</span>
        </label>
        <span className="selection"></span>
      </div>

      {!isPrivate && (
        <div>
          <label htmlFor="maxContributors" className="form-label">Max Contributors</label>
            <input
              type="number"
              id="maxContributors"
              className="form-input"
              placeholder="Enter Max Contributors"
              value={maxContributors}
              onChange={handleMaxContributorsChange}
          />
        </div>
      )}

      {isPrivate && (
        <div>
          <label htmlFor="approvedAddresses" className="form-label">Approved Addresses</label>
          <textarea
            id="approvedAddresses"
            className="form-input"
            rows="3"
            placeholder="Enter Approved Addresses"
            value={approvedAddresses}
            onChange={handleApprovedAddressesChange}
          ></textarea>
        </div>
      )}

      <div className="form-toggle">
        <label htmlFor="differentialPrivacy" className="form-label">Differential Privacy</label>
        <label className="switch">
          <input type="checkbox" id="differentialPrivacy" checked={differentialPrivacy} onChange={handleDifferentialPrivacyChange} />
          <span className="slider"></span>
        </label>
      </div>


      <label htmlFor="algorithm" className="form-label">Model</label>
      <select
        id="algorithm"
        className="form-select"
        value={algorithm}
        onChange={handleAlgorithmChange}
      >
        <option value="LinearRegression">Linear Regression</option>
        <option value="LogisticRegression">Logistic Regression</option>
        <option value="DecisionTree">Decision Tree</option>
        <option value="RandomForest">Random Forest</option>
        <option value="NeuralNetwork">Neural Network</option>
      </select>

      <div className="form-price">
        Estimated Maximum Cost: {price} ETH
      </div>
    </div>
  );
};

export default CreatePoolForm;
