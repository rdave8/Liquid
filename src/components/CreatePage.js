import React, { useState } from 'react';
import '../styles/CreatePage.css';
import CreatePoolForm from './CreatePoolForm';
import CreateButton from './CreateButton';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    poolName: '',
    poolDescription: '',
    isPrivate: false,
    approvedAddresses: '',
    differentialPrivacy: false,
    rounds: 0,
    maxContributors: 0,
    algorithm: 'NeuralNetwork',
    price: 0,
  });

  const testForm = () => {
    alert(
      `Pool Name: ${formData.poolName}\n` +
      `Pool Description: ${formData.poolDescription}\n` +
      `Pool Type: ${formData.isPrivate ? 'Private' : 'Public'}\n` +
      `Approved Addresses: ${formData.approvedAddresses}\n` +
      `Differential Privacy: ${formData.differentialPrivacy ? 'Enabled' : 'Disabled'}\n` +
      `Max Contributors: ${formData.maxContributors}\n` +
      `Rounds: ${formData.rounds}\n` +
      `Model: ${formData.algorithm}\n` +
      `Estimated Price: $${formData.price}`
    );
  };

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <>
      <div className="bg"></div>
      <CreatePoolForm onFormChange={handleFormChange} />
      <CreateButton onClick={testForm} />
    </>
  );
};

export default CreatePage;
