import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
          <Link to="/">Liquid</Link>
        </div>
        <ul>
          <li>
            <Link to="/Join" className={currentPath === '/Join' ? 'active' : ''}>Join</Link>
          </li>
          <li>
            <Link to="/Create" className={currentPath === '/Create' ? 'active' : ''}>Create</Link>
          </li>
          <li>
            <Link to="/MyPools" className={currentPath === '/MyPools' ? 'active' : ''}>My Pools</Link>
          </li>
          <li>
            <Link className={`unconnected ${isConnected ? 'connected' : ''}`} href="#" onClick={connectWallet}>
              {isConnected ? 'Connected' : 'Connect Wallet'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;