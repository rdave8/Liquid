import React from 'react';
import '../styles/CreateButton.css'

const CreateButton = ({ onClick }) => {
  return (
    <button className="create-button" onClick={onClick}>
      Create
    </button>
  );
};

export default CreateButton;
