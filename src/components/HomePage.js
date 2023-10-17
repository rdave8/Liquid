import React from 'react';
import WaterWave from 'react-water-wave';
import '../styles/HomePage.css';
import background from '../resources/background.png'

const HomePage = () => {
  return (
    <WaterWave 
    imageUrl={background} 
    style={{ width: '100%', height: '100vh', backgroundSize: 'cover' }}
    resolution={512}
    dropRadius={50}
    perturbance={0.01}
    >
      {() => (
          <div className="center">
            <div className="title">Boundless Collaboration</div>
            <div className="subtitle">Safely tap into distributed data with fluid AI training pools</div>
            <div className="btns">
              <button>Join a Pool</button>
              <button>Create a Pool</button>
            </div>
          </div>
      )}
    </WaterWave>
  );
};

export default HomePage;