import React, { useState } from 'react';
import '../styles/CreatePage.css';
import CreatePoolForm from './CreatePoolForm';
import CreateButton from './CreateButton';
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'

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

  const { config } = usePrepareContractWrite({
    address: '0xac8ff620b259f8a56f527c01598849a954608e74',
    abi: [
      {
        name: 'testCreate',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [0.001],
        outputs: [],
      },
    ],
    functionName: 'testCreate',
  })
  const { write } = useContractWrite(config)

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
      <CreateButton disabled={!write} onClick={() => write?.()}></CreateButton>
    </>
  );
};

export default CreatePage;