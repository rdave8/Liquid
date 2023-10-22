import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi'
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { isConnected } = useAccount()
  const { open } = useWeb3Modal();

  const [, setIsConnected] = useState(!!localStorage.getItem('isConnected'));

  const connectWallet = () => {
    open();
    if (isConnected) {
      setIsConnected(true);
      localStorage.setItem('isConnected', 'true');
    }
  };

  useEffect(() => {
    const localIsConnected = localStorage.getItem('isConnected');
    if (localIsConnected === 'true') {
      setIsConnected(true);
    }
  }, []);

  return (
    <nav>
      <div className="menu">
        <div className="logo">
          <a href="/">Liquid</a>
        </div>
        <ul>
          <li>
            <a href="/Join" className={currentPath === '/Join' ? 'active' : ''}>Join</a>
          </li>
          <li>
            <a href="/Create" className={currentPath === '/Create' ? 'active' : ''}>Create</a>
          </li>
          <li>
            <a href="/LearnMore" className={currentPath === '/LearnMore' ? 'active' : ''}>Learn More</a>
          </li>
          <li>
            <a className={`unconnected ${isConnected ? 'connected' : ''}`} href="#" onClick={connectWallet}>
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;