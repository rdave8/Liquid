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
    abi: [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"contributeData","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"distributeRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"getParticipantContribution","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"participant","type":"address"}],"name":"isParticipant","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"participants","outputs":[{"internalType":"uint256","name":"contribution","type":"uint256"},{"internalType":"bool","name":"hasContributed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"roundNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"startNewRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"testCreate","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"testJoin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"trainingInProgress","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],
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