import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;