import React from 'react';
import { Link } from 'react-router-dom';
import WaterWave from 'react-water-wave';
import '../styles/HomePage.css';
import background from '../resources/background1.jpg'

const HomePage = () => {
  return (
    <WaterWave
    imageUrl={background} 
    style={{ width: '100%', height: '100vh', backgroundSize: 'cover', zIndex: 1}}
    resolution={512}
    dropRadius={70}
    perturbance={0.1}
    >
      {() => (
        <>
          <div className="bg"></div>
          <div className="center">
            <div className="title">Boundless Collaboration</div>
            <div className="subtitle">Safely tap into distributed data with fluid AI training pools</div>
            <div className="btns">
              <Link to="/Join"><button className='left-button'>Join a Pool</button></Link>
              <Link to="/Create"><button className='right-button'> Create a Pool</button></Link>
            </div>
          </div>
        </>
      )}
    </WaterWave>
  );
};

export default HomePage;