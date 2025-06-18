"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './HomePage.css';
import ContentCardSlider from '../components/slider';

import policeLogo from '../Assets/PoliceLogo.jpeg';
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
import searchIcon from '..//Assets/search-icon.png'
import Cookie from '../lib/cookie';
import axios from "../lib/axios"
import { collapseClasses } from '@mui/material';

const items = [
  {
    id: 2,
    mediaType: 'iframe',
    mediaSrc: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    username: 'tech.talks',
    likes: 75,
    timestamp: '2/6/25, 11:00 AM',
    location: 'shimla',
    description: 'Latest gadget review: does it really fly or is it just hype?',
    comments: [
      { user: 'gadgetGeek', text: 'Great review!' },
      { user: 'techie_boy', text: 'Need one of these 👀' },
    ],
    postlink: 'https://github.com/',
  },
  {
    id: 3,
    mediaType: 'iframe',
    mediaSrc: 'https://www.youtube.com/embed/tgbNymZ7vqY',
    username: 'tech.talks',
    likes: 75,
    timestamp: '2/6/25, 11:00 AM',
    location: 'shimla',
    description: 'Latest gadget review: does it really fly or is it just hype?',
    comments: [
      { user: 'gadgetGeek', text: 'Great review!' },
      { user: 'techie_boy', text: 'Need one of these 👀' },
    ],
    postlink: 'https://github.com/',
  },
  {
    id: 1,
    mediaType: 'video',
    mediaSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
    username: 'village.life',
    likes: 21,
    timestamp: '31/5/25, 6:30 PM',
    location: 'khet',
    description: 'Witness the legendary origin of Wonder Woman as she fights for good with her sword and magic lasso.',
    comments: [
      { user: 'Shyam', text: 'looks nice' },
      { user: 'dhole.12', text: 'she fights fsdfsdfsdfssdf sdf sdf sdf sf s fsdf sd fw rw eg dfg dh d erf sd fs df sd gsd refsd fsdor good with her sword and magic lasso' },
    ],
    postlink: 'https://github.com/',
  },

];




function HomePage() {

  // // user login check
  const cookies = Cookie();
  const user = cookies.getpublicUserCookie();
  const router = useRouter();
  useEffect(() => {
    if (!user?.loggedIn) {
      router.push("/login");
    }
  }, []);

  if (!user?.loggedIn) return null;


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  // user filter states
  const [items, setItems] = useState([])
  const [selectedPlatform, setSelectedPlatform] = useState('INSTAGRAM');
  const [userLocation, setUserLocation] = useState("--tehsil--");
  const [userSearch, setUserSearch] = useState(''); // search keyword or any keyword in hashtags
  const [isViolent, setIsViolent] = useState(false);
  const [isViralSelected, setIsViralSelected] = useState(false);
  const [IsPredictedToBeViral, setIsPredictedToBeViral] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [hashtags, setKeywords] = useState([])
  const [selectedHashtag, setSelectedHashtag] = useState(null)

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPageNo(newPage);
    }
  };


  // user filter state end 
  const getKeyword = async () => {
    let word = ""
    if (selectedPlatform == "INSTAGRAM") {
      word = "instagram"
    }
    else if (selectedPlatform == "TWITTER") {
      word = "twitter"
    }
    else if (selectedPlatform == "SNAPCHAT") {
      word = "snapchat"
    }
    else if (selectedPlatform == "FACEBOOK") {
      word = "fb"
    }
    try {
      const response = await axios.get(`/${word}ViralKeywords`)
      if (response.status == 200) {
        console.log(response)
        setKeywords(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const getData = async () => {
    try {
      const response = await axios.post("/instagram/filter", {
        pageNo: pageNo,
        startDate: startDate,
        endDate: endDate,
        isViralSelected: isViralSelected,
        isViolent: isViolent,
        IsPredictedToBeViral: IsPredictedToBeViral,
        selectedPlatform: selectedPlatform,
        userLocation: userLocation
      })
      console.log(response)
      if (response.status == 200) {
        setItems(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  function adjustTimestamp(timestamp, platform) {
    const date = new Date(timestamp);
    if (platform.toLowerCase() === "facebook") {
      date.setMinutes(date.getMinutes() - 330);
    }
    return date.toLocaleString(); // or .toISOString()
  }


  useEffect(() => { getKeyword() }, [selectedPlatform])
  useEffect(() => {
    if (selectedHashtag) {
      getSelectedKeywordData()
    }
    else {
      getData()
    }
  }, [selectedHashtag, isViolent, IsPredictedToBeViral, userLocation, pageNo, startDate, endDate, isViralSelected, selectedPlatform])
  const Cities = [
    '--tehsil--',
    'Panchkula',
    'Raipur rani',
    'Kalka'
  ];


  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
  ];

  // const hashtags = [
  //   '#Manali',
  //   '#himachalpradesh',
  //   '#viral',
  //   '#food',
  //   '#reels',
  //   '#love',
  //   '#instagood'
  // ];

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
  const getSelectedKeywordData = async () => {
    let word = ""

    if (selectedPlatform == "INSTAGRAM") {
      word = "instagram"
    }
    else if (selectedPlatform == "TWITTER") {
      word = "twitter"
    }
    else if (selectedPlatform == "SNAPCHAT") {
      word = "snapchat"
    }
    else if (selectedPlatform == "FACEBOOK") {
      word = "fb"
    }
    try {
      const response = await axios.post("/dataContainsKeywordInDb", {
        page: pageNo,
        pageNo: pageNo,
        startDate: startDate,
        endDate: endDate,
        isViralSelected: isViralSelected,
        isViolent: isViolent,
        IsPredictedToBeViral: IsPredictedToBeViral,
        selectedPlatform: selectedPlatform,
        userLocation: userLocation,
        keyword: selectedHashtag,
        collection2: `${word}_selenium`,
        collection1: `${word}_viral_keywords`
      })
      if (response.status == 200) {
        console.log(response)
        setItems(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

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




  const handleSelectLocation = (city) => {
    setUserLocation(city);
    setLocationMenuOpen(false);
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

        <img src={policeLogo.src} style={{ marginRight: '30px', borderRadius: '100px' }} alt="Logo" className="logo" />

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
              <div className="nav-item" onClick={() => router.push('/deepfake')} >
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
          onClick={() => {
            cookies.clearUserCookie();
            router.push("/login");
          }}
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
                checked={IsPredictedToBeViral}
                onChange={() => setIsPredictedToBeViral(prev => !prev)}
              />
              All
            </label>

            <label className="filter-btn viral">
              <input
                type="checkbox"
                checked={isViralSelected}
                onChange={() => setIsViralSelected(prev => !prev)}
              />
              Viral
            </label>

            <label className="filter-btn violent">
              <input
                type="checkbox"
                checked={isViolent}
                onChange={() => setIsViolent(prev => !prev)}
              />
              Violent
            </label>
          </div>

          <div className="date-inputs" style={mobileDateInputsStyle}>
            <div className="date-box">
              <div className="date-wrapper" onClick={() => startDateRef.current && startDateRef.current.showPicker && startDateRef.current.showPicker()} style={{ cursor: 'pointer' }}>
                <label style={{ fontSize: '21px' }}>Start</label>
                <input type="date" className="date-field" value={startDate} onChange={e => setStartDate(e.target.value)} ref={startDateRef} />
                <img src={calendarIcon.src} alt="Calendar" className="calendar-icon" onClick={e => { e.stopPropagation(); startDateRef.current && startDateRef.current.showPicker && startDateRef.current.showPicker(); }} style={{ cursor: 'pointer' }} />
              </div>
            </div>
            <div className="date-box">
              <div className="date-wrapper" onClick={() => endDateRef.current && endDateRef.current.showPicker && endDateRef.current.showPicker()} style={{ cursor: 'pointer' }}>
                <label style={{ fontSize: '21px' }}>End</label>
                <input type="date" className="date-field" value={endDate} onChange={e => setEndDate(e.target.value)} ref={endDateRef} />
                <img src={calendarIcon.src} alt="Calendar" className="calendar-icon" onClick={e => { e.stopPropagation(); endDateRef.current && endDateRef.current.showPicker && endDateRef.current.showPicker(); }} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="location-container" style={mobileLocationContainerStyle}>
          <div className="location-box">
            <div className="location-label location-value2" onClick={() => setLocationMenuOpen(!locationMenuOpen)}>
              Location
              <img src={locationIcon.src} alt="Location Icon" />
            </div>
          </div>
          <div className="selected-location">{userLocation}</div>
          {locationMenuOpen && (
            <div className="location-dropdown">
              {Cities.map((city) => (
                <div
                  key={city}
                  className="location-dropdown-item"
                  onClick={() => handleSelectLocation(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
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
              <div
                key={index}
                onClick={() => setSelectedHashtag(tag)}
                style={{ cursor: 'pointer', padding: '6px 10px' }}
              >
                {tag}
              </div>
            ))}
        </div>
      </div>


















      <div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>

          <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '40px', gap: '10px' }}>
            <span>{selectedHashtag}</span>
            {selectedHashtag && (
              <button
                onClick={() => setSelectedHashtag(null)}
                style={{
                  background: '#ff4d4f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="pagination-container">
            <button
              className="pagination-button"
              onClick={() => handlePageChange(1)}
              disabled={pageNo === 1}
            >
              ⏮
            </button>

            <button
              className="pagination-button"
              onClick={() => handlePageChange(pageNo - 1)}
              disabled={pageNo === 1}
            >
              &#8592;
            </button>
            <h4>{pageNo}</h4>
            <button
              className="pagination-button"
              onClick={() => handlePageChange(pageNo + 1)}
            // disabled={currentPage}
            >
              &#8594;
            </button>

            {/* <button
          className="pagination-button"
          onClick={() => handlePageChange(totalPages)}
          // disabled={currentPage === totalPages}
        > */}
            {/* ⏭ */}
            {/* </button> */}
          </div>
        </div>
        <ContentCardSlider
          items={items.map(item => ({
            ...item,
            timestamp: adjustTimestamp(item.timestamp, selectedPlatform)
          }))}
        />

      </div>

    </div>
  );
}

export default HomePage;