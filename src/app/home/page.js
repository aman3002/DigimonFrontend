"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './HomePage.css';

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
import filterSearchIcon from '../Assets/filter-search.png';
import allLogo from '../Assets/allLogo.png';
import viralLogo from '../Assets/viralLogo.png';
import violentLogo from '../Assets/violentLogo.png';
import calendarIcon from '../Assets/calendarIcon.png';
import locationIcon from '../Assets/location.png';
import commentsIcon from '../Assets/bookIcon.png';
import personIcon from '../Assets/profile.png';
import heartIcon from '../Assets/heart.png';
import loginIcon from '../Assets/login.png';
import clockIcon from '../Assets/clock.png';

function HomePage() {
  const [selectedPlatform, setSelectedPlatform] = useState('NONE');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const [userLocation, setUserLocation] = useState("Shimla");
  const [userSearch, setUserSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState(['viral']);

  const handleCheckboxToggle = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
  ];

  const hashtags = [
    '#Manali',
    '#himachalpradesh',
    '#viral',
    '#food',
    '#reels',
    '#love',
    '#instagood'
  ];

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.value);
    setMenuOpen(false);
  };

  const currentPlatform = platforms.find(p => p.value === selectedPlatform);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 500;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter button style for top-right corner
  const filterButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'transparent', // ✅ corrected spelling
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    marginTop: '15px',
    marginRight: '10px',
  };


  const filterButtonHoverStyle = {
    ...filterButtonStyle,
    marginTop: '15px',
    marginRight: '10px',
    background: '#007bff',
    transform: 'scale(1)'
  };

  const filterIconStyle = {
    width: '24px',
    height: '24px',
    objectFit: 'contain'
  };

  // Mobile specific styles
  const mobileVillageInfoStyle = isMobile ? {
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: 'auto',
    padding: '15px',
    gap: '8px'
  } : {};

  const mobileInfoGroupStyle = isMobile ? {
    width: '100%',
    justifyContent: 'flex-start',
    marginBottom: '5px'
  } : {};

  const mobileCommentsHeaderStyle = isMobile ? {
    position: 'relative',
    top: '0',
    left: '0',
    justifyContent: 'center',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  } : {};

  const mobileCommentsTitleStyle = isMobile ? {
    position: 'relative',
    left: '0',
    top: '0',
    fontSize: '16px',
    margin: '0'
  } : {};

  const mobileCommentsIconStyle = isMobile ? {
    position: 'relative',
    top: '0',
    left: '0',
    margin: '0'
  } : {};

  // Mobile sidebar styles
  const mobileSidebarStyle = isMobile ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 10px',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '10px'
  } : {};

  const mobileFilterContainerStyle = isMobile ? {
    width: '100%',
    maxWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  } : {};

  const mobileFilterButtonsStyle = isMobile ? {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%',
    alignItems: 'center'
  } : {};

  const mobileDateInputsStyle = isMobile ? {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    alignItems: 'center',
    marginTop: '20px'
  } : {};

  const mobileLocationContainerStyle = isMobile ? {
    width: '100%',
    maxWidth: '280px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  } : {};

  const mobileSearchWrapperStyle = isMobile ? {
    width: '100%',
    maxWidth: '280px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  } : {};

  const mobileListWrapperStyle = isMobile ? {
    width: '100%',
    maxWidth: '280px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px'
  } : {};

  // Mobile dropdown styles - Fixed positioning
  const mobileDropdownStyle = {
    position: 'absolute',
    top: '100px', // Position below the top bar (adjust based on your top bar height)
    left: '0',
    right: '0',
    backgroundColor: 'black',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 999,
    maxHeight: '70vh',
    overflowY: 'auto',
    borderRadius: '0 0 8px 8px'
  };

  return (
    <div className="home-page">
      {/* Hamburger Menu Button in Top-Left Corner - Only show on screens <= 500px */}
      {isMobile && (
        <button
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: 'transparent',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000,
            marginTop: '15px',
            marginLeft: '10px',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src={menuIcon.src}
            alt="Menu"
            style={{
              width: '24px',
              height: '24px',
              objectFit: 'contain'
            }}
          />
        </button>
      )}

      {/* Mobile Navigation Dropdown - Only show on screens <= 500px */}
      {isMobile && menuOpen && (
        <div className="mobile-dropdown" style={mobileDropdownStyle}>
          <div className="dropdown-item-title">Navigation</div>
          <div className="dropdown-item" onClick={() => { router.push("/deepfake");; setMenuOpen(false); }}>
            <img src={deepfakeIcon.src} alt="Deepfake" />
            Deepfake Detect
          </div>
          <div className="dropdown-item" onClick={() => { router.push('/reverse-search'); setMenuOpen(false); }}>
            <img src={reverseSearchIcon.src} alt="Reverse Search" />
            Reverse Image Search
          </div>
          <div className="dropdown-item" onClick={() => { router.push('/analytics'); setMenuOpen(false); }}>
            <img src={analyticsIcon.src} alt="Analytics" />
            Analytics
          </div>

          <div className="dropdown-item-title">Select Platform</div>
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className="dropdown-item"
              onClick={() => handleSelectPlatform(platform)}
            >
              <img src={platform.icon.src} alt={platform.name} />
              {platform.name}
            </div>
          ))}
        </div>
      )}

      {/* Filter Button in Top-Right Corner - Only show on screens <= 500px */}
      {isMobile && (
        <button
          style={filterButtonStyle}
          onClick={toggleSidebar}
        >
          <img
            src={filterSearchIcon.src}
            alt="Filter Search"
            style={filterIconStyle}
          />
        </button>
      )}

      <div className="top-bar">
        {/* Empty space on left side for mobile screens */}
        {isMobile && (
          <div style={{ width: '40px', height: '40px' }}></div>
        )}

        <img src={policeLogo.src} alt="Logo" className="logo" />

        {!isMobile && (
          <>
            <span className="platform-label">Platform:</span>

            <div className="custom-dropdown">
              <button className="dropdown-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {currentPlatform ? (
                  <>
                    <img src={currentPlatform.icon.src} alt={currentPlatform.name} />
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
                      <img src={platform.icon.src} alt={platform.name} />
                      {platform.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-items">
              <div className="nav-item" onClick={() => router.push('/deepfake')}>
                <img src={deepfakeIcon.src} alt="Deepfake" />
                <span>Deepfake Detect</span>
              </div>
              <div className="nav-item" onClick={() => router.push('/reverse-search')}>
                <img src={reverseSearchIcon.src} alt="Reverse Search" />
                <span>Reverse Image Search</span>
              </div>
              <div className="nav-item" onClick={() => router.push('/analytics')}>
                <img src={analyticsIcon.src} alt="Analytics" />
                <span>Analytics</span>
              </div>
            </div>
          </>
        )}

        <img
          src={backIcon.src}
          alt="Logout"
          className="logout-icon"
          onClick={() => router.push('/logout')}
        />
      </div>

      {isMobile && <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>}

      <div className={`white-rectangle ${isMobile && sidebarOpen ? 'active' : ''}`} style={mobileSidebarStyle}>
        {isMobile && (
          <button className="sidebar-close" onClick={closeSidebar}>
            ×
          </button>
        )}

        <div className="filter-container" style={mobileFilterContainerStyle}>
          <div className="filter-buttons" style={mobileFilterButtonsStyle}>
            <label className="filter-btn all">
              <input
                type="checkbox"
                checked={selectedFilters.includes('all')}
                onChange={() => handleCheckboxToggle('all')}
              />
              All
            </label>
            <label className="filter-btn viral">
              <input
                type="checkbox"
                checked={selectedFilters.includes('viral')}
                onChange={() => handleCheckboxToggle('viral')}
              />
              Viral
            </label>
            <label className="filter-btn violent">
              <input
                type="checkbox"
                checked={selectedFilters.includes('violent')}
                onChange={() => handleCheckboxToggle('violent')}
              />
              Violent
            </label>
          </div>

          <div className="date-inputs" style={mobileDateInputsStyle}>
            <div className="date-box">
              <div className="date-wrapper">
                <label>Start</label>
                <input type="date" className="date-field" />
                <img src={calendarIcon.src} alt="Calendar" className="calendar-icon" />
              </div>
            </div>
            <div className="date-box">
              <div className="date-wrapper">
                <label>End</label>
                <input type="date" className="date-field" />
                <img src={calendarIcon.src} alt="Calendar" className="calendar-icon" />
              </div>
            </div>
          </div>
        </div>

        <div className="location-container" style={mobileLocationContainerStyle}>
          <div className="location-box">
            <div className="location-label">
              <div className='location-value2'>Location</div>
              <img src={locationIcon.src} alt="Location Icon" />
            </div>
            <div className="location-value-input-wrapper">
              <input
                type="text"
                placeholder="Enter location"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="location-value-input"
              />
            </div>
          </div>
        </div>

        <div className="search-value-input-wrapper" style={mobileSearchWrapperStyle}>
          <input
            type="text"
            placeholder="Search in list"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="search-value-input"
          />
        </div>

        <div className="list-value-wrapper" style={mobileListWrapperStyle}>
          {hashtags
            .filter(tag => !userSearch || tag.toLowerCase().includes(userSearch.toLowerCase()))
            .map((tag, index) => (
              <div key={index}>{tag}</div>
            ))
          }
        </div>
      </div>

      <div className="large-background-box">
        {/* First video section */}
        <div className="video-section-wrapper">
          <video className="video-player" controls>
            <source src="your-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="village-info-box" style={mobileVillageInfoStyle}>
            <div className="info-group" style={mobileInfoGroupStyle}>
              <img src={personIcon.src} className="icon person" alt="person" />
              <p className="username">Village.life</p>
            </div>
            <div className="info-group" style={mobileInfoGroupStyle}>
              <img src={heartIcon.src} className="icon heart" alt="heart" />
              <p className="likes">21</p>
            </div>
            <div className="info-group" style={mobileInfoGroupStyle}>
              <img src={clockIcon.src} className="icon clock" alt="clock" />
              <p className="timestamp">31/5/25 , 6:30 pm</p>
            </div>
            <div className="info-group" style={mobileInfoGroupStyle}>
              <img src={loginIcon.src} className="icon login" alt="login" />
            </div>
          </div>

          <div className="description-box">
            <p className="description-text">
              Witness the legendary origin of renowned Justice League member Wonder Woman as she fights for good with her sword and magic lasso. read more....
            </p>
          </div>

          {/* Updated comments header to match second video section */}
          <div className="comments-header" style={mobileCommentsHeaderStyle}>
            <img src={commentsIcon.src} className="icon comment" alt="comment" style={mobileCommentsIconStyle} />
            <p className="comment-title" style={mobileCommentsTitleStyle}>Comments</p>
          </div>

          <div className="comments-box">
            <div className="comment">
              <p className='comment'>Shyam: looks nice</p>
            </div>
            <div className="comment">
              <p className='comment'>dhole.12: she fights for good with her sword and magic lasso</p>
            </div>
          </div>
        </div>

        {/* Second video section */}
        <div className="video-section-wrapper-second">
          <video className="video-player-second" controls>
            <source src="your-second-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="village-info-box-second" style={mobileVillageInfoStyle}>
            <div className="info-group-second" style={mobileInfoGroupStyle}>
              <img src={personIcon.src} className="icon person" alt="person" />
              <p className="username-second">Village.nature</p>
            </div>
            <div className="info-group-second" style={mobileInfoGroupStyle}>
              <img src={heartIcon.src} className="icon-second" alt="heart" />
              <p className="likes-second">34</p>
            </div>
            <div className="info-group-second" style={mobileInfoGroupStyle}>
              <img src={clockIcon.src} className="icon-second" alt="clock" />
              <p className="timestamp-second">02/06/25, 11:15 am</p>
            </div>
            <div className="info-group-second" style={mobileInfoGroupStyle}>
              <img src={loginIcon.src} className="icon-second login" alt="login" />
            </div>
          </div>

          <div className="description-box-second">
            <p className="description-text">
              Witness the legendary origin of renowned Justice League member Wonder Woman as she fights for good with her sword and magic lasso. read more....
            </p>
          </div>

          <div className="comments-header-second">
            <img src={commentsIcon.src} className="icon-second comment" alt="comment" />
            <p className="comment-title-second">Comments</p>
          </div>

          <div className="comments-box-second">
            <div className="comment">
              <p className='comment'>Shyam: looks nice</p>
            </div>
            <div className="comment">
              <p className='comment'>dhole.12: she fights for good with her sword and magic lasso</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;