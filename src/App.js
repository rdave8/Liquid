import React from 'react';
import { BrowserRouter as HashRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { mainnet, scrollSepolia } from 'wagmi/chains';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import JoinPage from './components/JoinPage';
import CreatePage from './components/CreatePage';
import MyPoolsPage from './components/MyPoolsPage';

const projectId = '1f29a8c8db4fac6874df6817069a9f47'
const metadata = {
  name: 'Liquid',
  url: 'https://liquidai.eth.limo',
}
const chains = [mainnet, scrollSepolia]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains })

const App = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
    <HashRouter >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/Join" element={<JoinPage />} />
        <Route exact path="/Create" element={<CreatePage />} />
        <Route exact path="/MyPools" element={<MyPoolsPage />} />
      </Routes>
    </HashRouter>
    </WagmiConfig>
  );
};

export default App;