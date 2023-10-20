import React, { useState, useEffect } from 'react';
import '../styles/CreatePoolForm.css'

const CreatePoolForm = () => {
  const [poolName, setPoolName] = useState('');
  const [poolDescription, setPoolDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxContributors, setMaxContributors] = useState(0);
  const [algorithm, setAlgorithm] = useState('algorithm1');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const basePrice = 100;
    const algorithmMultiplier = algorithm === 'algorithm2' ? 1.5 : 1;

    const totalPrice = basePrice * algorithmMultiplier * (1 + maxContributors * 0.05);
    setPrice(totalPrice.toFixed(2));
  }, [maxContributors, algorithm]);

  const handleMaxContributorsChange = (event) => {
    setMaxContributors(parseInt(event.target.value) || 0);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div className="form-wrapper">
        <div className="form-container">
        <h2>Pool Configuration</h2>
        <label htmlFor="poolName" className="form-label">Pool Name</label>
        <input
            type="text"
            id="poolName"
            className="form-input"
            placeholder="Enter Pool Name"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
        />

        <label htmlFor="poolDescription" className="form-label">Pool Description</label>
        <textarea
            id="poolDescription"
            className="form-input"
            rows="3"
            placeholder="Enter Pool Description"
            value={poolDescription}
            onChange={(e) => setPoolDescription(e.target.value)}
        ></textarea>

        <div className="form-toggle">
            <label htmlFor="isPrivate" className="form-label">Pool Type</label>
            <input
            type="checkbox"
            id="isPrivate"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            />
            <label htmlFor="isPrivate">{isPrivate ? 'Private' : 'Public'}</label>
        </div>

        <label htmlFor="maxContributors" className="form-label">Max Contributors</label>
        <input
            type="number"
            id="maxContributors"
            className="form-input"
            placeholder="Enter Max Contributors"
            value={maxContributors}
            onChange={handleMaxContributorsChange}
        />

        <label htmlFor="algorithm" className="form-label">Model   </label>
        <select
            id="algorithm"
            className="form-select"
            value={algorithm}
            onChange={handleAlgorithmChange}
        >
            <option value="algorithm1">Algorithm 1</option>
            <option value="algorithm2">Algorithm 2</option>
            <option value="algorithm3">Algorithm 3</option>
        </select>

        <div className="form-price">
            Estimated Price: <span id="price">${price}</span>
        </div>
        </div>
    </div>
  );
};

export default CreatePoolForm;
