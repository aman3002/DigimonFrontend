import React, { useState, useEffect } from 'react';
import './Analytics.css';

import policeLogo from '../Assets/policeLogo.png';
import instagramLogo from '../Assets/instagramLogo.png';
import twitterLogo from '../Assets/twitterLogo.png';
import facebookLogo from '../Assets/facebookLogo.png';
import snapchatLogo from '../Assets/snapchatLogo.png';
import deepfakeIcon from '../Assets/deepfakeDetectIcon.png';
import reverseSearchIcon from '../Assets/reverseImageSearchIcon.png';
import analyticsIcon from '../Assets/analyticsIcon.png';
import backIcon from '../Assets/BackIcon.png';
import menuIcon from '../Assets/menuIcon.png';

import { useNavigate } from 'react-router-dom';

function Analytics() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState('NONE');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false);

  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
  ];

  const currentPlatform = platforms.find(p => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.value);
    setMenuOpen(false);
  };

  return (
    <div className="home-page">
      <div className="top-bar">
        <img
          src={policeLogo}
          alt="Logo"
          className="logo"
          onClick={() => navigate('/homepage')}
          style={{ cursor: 'pointer' }}
        />

        {isMobile ? (
          <img
            src={menuIcon}
            alt="Menu"
            className="hamburger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        ) : (
          <>
            <span className="platform-label">Platform:</span>
            <div className="custom-dropdown">
              <button className="dropdown-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {currentPlatform ? (
                  <>
                    <img src={currentPlatform.icon} alt={currentPlatform.name} />
                    {currentPlatform.name}
                  </>
                ) : (
                  <>NONE</>
                )}
              </button>

              {menuOpen && (
                <div className="dropdown-menu">
                  {platforms.map((platform) => (
                    <div
                      key={platform.value}
                      className="dropdown-item"
                      onClick={() => handleSelectPlatform(platform)}
                    >
                      <img src={platform.icon} alt={platform.name} />
                      {platform.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-items">
              <div className="nav-item" onClick={() => navigate('/deepfake')}>
                <img src={deepfakeIcon} alt="Deepfake" />
                <span>Deepfake Detect</span>
              </div>
              <div className="nav-item" onClick={() => navigate('/reverse-search')}>
                <img src={reverseSearchIcon} alt="Reverse Search" />
                <span>Reverse Image Search</span>
              </div>
              <div className="nav-item active">
                <img src={analyticsIcon} alt="Analytics" />
                <span>Analytics</span>
              </div>
            </div>
          </>
        )}

        <img
          src={backIcon}
          alt="Logout"
          className="logout-icon"
          onClick={() => navigate('/logout')}
        />
      </div>

      {isMobile && menuOpen && (
        <div className="mobile-dropdown">
          <div className="dropdown-item-title">Navigation</div>
          <div className="dropdown-item" onClick={() => { navigate('/deepfake'); setMenuOpen(false); }}>
            <img src={deepfakeIcon} alt="Deepfake" />
            Deepfake Detect
          </div>
          <div className="dropdown-item" onClick={() => { navigate('/reverse-search'); setMenuOpen(false); }}>
            <img src={reverseSearchIcon} alt="Reverse Search" />
            Reverse Image Search
          </div>
          <div className="dropdown-item" onClick={() => { navigate('/analytics'); setMenuOpen(false); }}>
            <img src={analyticsIcon} alt="Analytics" />
            Analytics
          </div>

          <div className="dropdown-item-title">Select Platform</div>
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className="dropdown-item"
              onClick={() => handleSelectPlatform(platform)}
            >
              <img src={platform.icon} alt={platform.name} />
              {platform.name}
            </div>
          ))}
        </div>
      )}

      {/* Chart Grid */}
      <div className="chart-grid">
        <div className="chart-box">📊 Post Type Distribution</div>
        <div className="chart-box">📈 Engagement by Post Type</div>
        <div className="chart-box">🏷️ Top Hashtags in Caption</div>
        <div className="chart-box">📍 Top Location Searches</div>
        <div className="chart-box">⚠️ Violent Searches</div>
        <div className="chart-box">🕒 Engagement Over Time</div>
      </div>
    </div>
  );
}

export default Analytics;
