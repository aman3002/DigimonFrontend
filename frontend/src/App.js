import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import HomePage from './HomePage/HomePage';
import DeepfakeDetect from './DeepfakeDetect/DeepfakeDetect';
import ReverseImageSearch from './ReverseImageSearch/ReverseImageSearch';
import Analytics from './Analytics/Analytics';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/deepfake" element={<DeepfakeDetect />} />
        <Route path="/reverse-search" element={<ReverseImageSearch />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/logout" element = {<LoginPage/>} />
        <Route path="/homepage" element = {<HomePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
