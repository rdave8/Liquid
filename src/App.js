// App.js
import React from 'react';
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import JoinPage from './components/JoinPage';
import CreatePage from './components/CreatePage';
import LearnMorePage from './components/LearnMorePage';

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" component={HomePage} />
        <Route path="/Join" component={JoinPage} />
        <Route path="/Create" component={CreatePage} />
        <Route path="/LearnMore" component={LearnMorePage} />
      </Routes>
    </HashRouter>
  );
};

export default App;