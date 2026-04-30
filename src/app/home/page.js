"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './HomePage.css';
import ContentCardSlider from '../components/slider';
import PreviewGrid from '../components/PreviewGrid';
import '../components/PreviewGrid.css';

import policeLogo from '../Assets/PoliceLogo.png';
import instagramLogo from '../Assets/instagramLogo.png';
import twitterLogo from '../Assets/twitterLogo.png';
import facebookLogo from '../Assets/facebookLogo.png';
import whatsappLogo from "../Assets/whatsappLogo.png"
import telegramLogo from "../Assets/telegramLogo.png"
import ccu from "../Assets/ccu.png"
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
import { Search } from "lucide-react";
import { CircularProgress, Button } from '@mui/material';
import PopupModal from '../components/PopUp';
import RadioSelector from '../components/TypeSelector';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import UserPopupModal from '../components/SearchAllUsers';
import { SettingsBackupRestore } from '@mui/icons-material';
import SendMailPopupModal from '../components/SendMailPopUp';
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
  const [userLocation, setUserLocation] = useState("--Tehsil--");
  const [selectWatchedUser, setSelectWatchedUser] = useState("--Select-User--")
  const [userSearch, setUserSearch] = useState(''); // search keyword or any keyword in hashtags
  const [isViolent, setIsViolent] = useState(false);
  const [isViralSelected, setIsViralSelected] = useState(false);
  const [IsPredictedToBeViral, setIsPredictedToBeViral] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1);
  const [hashtags, setKeywords] = useState([])
  const [selectedHashtag, setSelectedHashtag] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [captionSearch, setCaptionSearch] = useState(null)
  const [selectedOption, setSelectedOption] = useState('socialmedia');
  const [watchlists, setWatchlist] = useState([])
  const [modalOpen, setModalOpen] = useState(false);
  const [watchlistHashtags, setWatchlistHashtags] = useState([])
  const users = ['user1', 'user2', 'user3'];
  const [sexual, setSexual] = useState(false)
  const [takeDown, setTakeDown] = useState(false)
  const [showGridPreview, setShowGridPreview] = useState(true)


  const handleSubmit = (value) => {
    console.log("User entered:", value);
    setCaptionSearch(value)
    setShowModal(false);
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      setPageNo(newPage);
    }
  };
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const fetchLocation = async () => {
      const getLocationByIP = async () => {
        try {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          console.log("📍 IP Location:", data);
          setLocation(data);
          await axios.post("/location", {
            lat: data.latitude,
            lng: data.longitude,
            location: data,
            source: "ip"
          });
        } catch (err) {
          // console.error("🌐 IP location error:", err);
        }
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await res.json();
              // console.log("📍 GPS Location:", data.address);
              setLocation(data.address);

              await axios.post("/location", {
                lat: latitude,
                lng: longitude,
                location: data.address,
                source: "gps"
              });
            } catch (err) {
              // console.error("🗺️ Error in reverse geocoding:", err);
              await getLocationByIP(); // fallback if reverse fails
            }
          },
          async (error) => {
            // console.warn("⚠️ Geolocation error:", error.message);
            await getLocationByIP(); // fallback on denial or error
          },
          { enableHighAccuracy: true }
        );
      } else {
        await getLocationByIP(); // fallback if geolocation unsupported
      }
    };

    fetchLocation();
  }, []);
  const MenuProps = {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    // This is important to fix misalignment in MUI v5+
    disablePortal: true,
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
    else if (selectedPlatform == "WHATSAPP") {
      word = "whatsapp"
    }
    else if (selectedPlatform == "TELEGRAM") {
      word = "telegram"
    }
    else if (selectedPlatform == "YOUTUBE") {
      word = "youtube"
    }
    let watch = ""
    if (selectedPlatform == "INSTAGRAM") {
      watch = "insta"
    }
    else if (selectedPlatform == "TWITTER") {
      watch = "twitter"
    }
    else if (selectedPlatform == "SNAPCHAT") {
      watch = "snapchat"
    }
    else if (selectedPlatform == "FACEBOOK") {
      watch = "fb"
    }
    else if (selectedPlatform == "WHATSAPP") {
      watch = "whatsapp"
    }
    else if (selectedPlatform == "TELEGRAM") {
      watch = "telegram"
    }
    else if (selectedPlatform == "YOUTUBE") {
      watch = "youtube"
    }
    console.log(selectedOption, "options")
    setLoading(true)
    if (selectedOption === "socialmedia") {
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
    else {
      try {
        const response = await axios.post(`/ViralKeywordsInWatchlist`, { collection: `${watch}_watchlist_data` })
        if (response.status == 200) {
          console.log(response)
          setWatchlistHashtags(response.data.data)
        }
      }
      catch (e) {
        console.log(e)
      }
      finally {
        setLoading(false)
      }

    }
  }
  const getData = async () => {
    let word = ""
    word = selectedOption == "socialmedia" ? "instagram" : "watchlist"
    try {
      setLoading(true)
      setItems([]) // Clear previous items

      const response = await axios.post(`/${word}/filter`, {
        pageNo: pageNo,
        ...(showGridPreview ? { pageSize: 9 } : {}),
        startDate: startDate,
        endDate: endDate,
        isViralSelected: isViralSelected,
        isViolent: isViolent,
        isSexual: sexual,
        caption: captionSearch,
        selectedUser: selectWatchedUser,
        all: IsPredictedToBeViral,
        selectedPlatform: selectedPlatform,
        userLocation: userLocation
      })
      console.log(response, "getdaya")
      if (response.status == 200) {
        setItems(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }
    //  if(pageNo!==1||hashtags.length!=0)
    //     setLoading(false)
  }
  function adjustTimestamp(timestamp, platform) {
    const date = new Date(timestamp);
    if (platform.toLowerCase() === "facebook") {
      date.setMinutes(date.getMinutes() - 330);
    }
    else if (platform.toLowerCase() === "snapchat") {
      date.setMinutes(date.getMinutes() + 330);
    }
    return date.toLocaleString(); // or .toISOString()
  }

  useEffect(() => {
    setUserSearch("")
    setSexual(false)
    setIsViolent(false)
    setPageNo(1)
    setSelectedHashtag(null)
    setStartDate(null)
    setSelectWatchedUser("--Select-User--")
    setEndDate(null)
    setIsPredictedToBeViral(false)
    setIsViralSelected(false)
    setUserLocation("--tehsil--")
    getKeyword()
  }, [selectedOption])

  useEffect(() => {
    setUserSearch("")
    setIsViolent(false)
    setSexual(false)
    setPageNo(1)
    setSelectedHashtag(null)
    setStartDate(null)
    setSelectedOption("socialmedia")
    setEndDate(null)
    setIsPredictedToBeViral(false)
    setIsViralSelected(false)
    setUserLocation("--tehsil--")
    setShowGridPreview(true)
    getKeyword()
  }, [selectedPlatform])
  useEffect(() => {
    if (selectedHashtag) {
      getSelectedKeywordData()
    }
    else {
      getData()
    }

  }, [selectedHashtag, sexual, isViolent, IsPredictedToBeViral, userLocation, pageNo, startDate, endDate, watchlists, isViralSelected, selectedPlatform, captionSearch, selectedOption, selectWatchedUser])
  const Cities = [
    '--tehsil--',
    "Solapur North", "Solapur South", "Akkalkot", "Barshi", "Mohol", "Karmala", "Pandharpur"
  ];


  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    // { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'YouTube', value: 'YOUTUBE', icon: { src: 'https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg' } },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
    // { name: 'Whatsapp', value: 'WHATSAPP', icon: whatsappLogo },
    { name: 'Telegram', value: 'TELEGRAM', icon: telegramLogo },
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
      word = selectedOption == "socialmedia" ? "instagram" : "insta"
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
    else if (selectedPlatform == "WHATSAPP") {
      word = "whatsapp"
    }
    else if (selectedPlatform == "TELEGRAM") {
      word = "telegram"
    }
    else if (selectedPlatform == "YOUTUBE") {
      word = "youtube"
    }
    try {
      const portal = selectedOption == "socialmedia" ? "selenium" : "watchlist_data"
      const apiLink = selectedOption == "socialmedia" ? "Db" : "Watchlist"
      setLoading(true)
      setItems([]) // Clear previous items

      const response = await axios.post(`/dataContainsKeywordIn${apiLink}`, {
        page: pageNo,
        pageNo: pageNo,
        ...(showGridPreview ? { pageSize: 9 } : {}),
        startDate: startDate,
        endDate: endDate,
        isViralSelected: isViralSelected,
        isSexual: sexual,
        isViolent: isViolent,
        all: IsPredictedToBeViral,
        selectUser: selectWatchedUser,
        selectedPlatform: selectedPlatform,
        caption: captionSearch,
        userLocation: userLocation,
        keyword: selectedHashtag,
        collection2: `${word}_${portal}`,
        collection1: `${word}_watchlist_viral_keywords`
      })
      if (response.status == 200) {
        console.log(response)

        setItems(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
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


  const watchlist = async () => {
    try {
      let word = ""

      if (selectedPlatform == "INSTAGRAM") {
        word = "Instagram"
      }
      else if (selectedPlatform == "TWITTER") {
        word = "Twitter"
      }
      else if (selectedPlatform == "SNAPCHAT") {
        word = "Snapchat"
      }
      else if (selectedPlatform == "FACEBOOK") {
        word = "Fb"
      }
      else if (selectedPlatform == "WHATSAPP") {
        word = "whatsapp"
      }
      else if (selectedPlatform == "TELEGRAM") {
        word = "telegram"
      }
      else if (selectedPlatform == "YOUTUBE") {
        word = "Youtube"
      }
      // setLoading(true)
      const response = await axios.get(`/watchlist${word}`, {})
      console.log(response, "watchlist")
      if (response.status == 200) {
        setWatchlist(response.data.result)
      }
    }
    catch (e) {

    }

  }
  useEffect(() => {
    watchlist()
  }, [selectedPlatform])
  const addNewUserToList = async (username, userid) => {
    try {
      const response = await axios.post("/addNewUserToList", { username, userid })
      if (response.status == 200) {
        alert(response.data.data)
      }
    }
    catch (e) {
      console.log(e)
    }
  }

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
  const sendMail = async (link, type, reason) => {
    try {
      const response = await axios.post("/sendMail", { link: link, type, reason })
      if (response.status == 200) {
        alert("Report Submitted we will take action as soon as possible")
      }
    }
    catch (e) {

    }
  }

  const container = (
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
          {/* {selectedPlatform.name=="INSTAGRAM"&&
                    <RadioSelector mobile={isMobile} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
          } */}
          <div className="dropdown-item" onClick={() => { router.push("/deepfake");; setMenuOpen(false); }}>
            <img src={deepfakeIcon.src} alt="Deepfake" />

            Deepfake Detect
          </div>
          {/*<div className="dropdown-item" onClick={() => { router.push('/reverse-search'); setMenuOpen(false); }}>
            <img src={reverseSearchIcon.src} alt="Reverse Search" />
            Reverse Image Search
          </div> */}
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

        <img src={user.name.includes("HITAC") ? ccu.src : policeLogo.src} style={{ marginRight: '30px', borderRadius: '100px' }} alt="Logo" className="logo" />

        {!isMobile && (
          <>
            <span className="platform-label">Platform :</span>

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

            <div style={{
              display: 'flex',
              gap: '60px',
              marginLeft: 'auto',
              marginRight: '30px',
            }}>
              {/* {
              !isMobile&&selectedPlatform=="INSTAGRAM"&&
              <div className="nav-item" >
                <span style={{ fontSize: '25px',paddingBottom:5 }}><RadioSelector mobile={isMobile} selectedOption={selectedOption} setSelectedOption={setSelectedOption} /></span>
              </div>
              } */}
              <div className="nav-item" onClick={() => router.push('/deepfake')} >
                <img src={deepfakeIcon.src} alt="Deepfake" />
                <span style={{ fontSize: '25px' }}>Deepfake Detect</span>
              </div>
              {/* <div className="nav-item" onClick={() => router.push('/reverse-search')}>
                <img src={reverseSearchIcon.src} alt="Reverse Search" />
                <span style={{ fontSize: '25px' }}>Reverse Image Search</span>
              </div> */}
              <div className="nav-item" onClick={() => router.push('/analytics')}>
                <img src={analyticsIcon.src} alt="Analytics" />
                <span style={{ fontSize: '25px' }}>Analytics</span>
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
            <label className="filter-btn all" style={{ paddingLeft: "2.5vw", paddingRight: "2.5vw" }}>
              <input
                type="checkbox"
                checked={IsPredictedToBeViral}
                onChange={() => setIsPredictedToBeViral(prev => !prev)}
              />
              Predicted To Be Viral
            </label>

            <label className="filter-btn viral">
              <input
                type="checkbox"
                checked={isViralSelected}
                onChange={() => setIsViralSelected(prev => !prev)}
              />
              Viral
            </label>
          </div>
          <div className="filter-buttons" style={mobileFilterButtonsStyle}>

            <label className="min-h-screen flex items-center justify-center" >
              <button
                style={{ "backgroundColor": "yellowgreen", paddingLeft: "3vw", paddingRight: "3.5vw" }}
                className="filter-btn bg-blue-600  px-6 py-3 rounded shadow flex items-center gap-2"
                onClick={() => setShowModal(true)}
              >
                <Search size={25} />  Caption Search {/* search icon */}
              </button>

              <PopupModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleSubmit}
              />
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

          <div className="filter-buttons" style={{ mobileFilterButtonsStyle }}>
            <label className="filter-btn sexual" style={{ paddingLeft: "3vw", paddingRight: "3.5vw" }} >
              <input
                type="checkbox"
                checked={sexual}
                onChange={() => setSexual(prev => !prev)}
              />
              Sexual Content
            </label>

            <label className="filter-btn blocker" style={{ marginLeft: 1, paddingLeft: "0.5vw", paddingRight: 0 }}>
              <button
                className=" filter-btn"
                onClick={() => setTakeDown(true)}
                style={{ backgroundColor: "transparent", color: "white", border: 0, maxWidth: "fit-content", margin: 0, padding: 0 }}
              >
                Take Down
              </button>

              <SendMailPopupModal
                isOpen={takeDown}
                onClose={() => setTakeDown(false)}
                onSubmit={sendMail}
              />
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
        {selectedOption == "socialmedia" &&
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
          </div>}
        <div className="search-value-input-wrapper" style={mobileSearchWrapperStyle}>
          <input
            type="text"
            placeholder="Keyword Search"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            className="search-value-input"
          />
        </div>

        <div className="list-value-wrapper" style={mobileListWrapperStyle}>
          {(selectedOption == "socialmedia" ? hashtags : watchlistHashtags)
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
        {!showGridPreview && <div style={{ display: 'flex', flexDirection: 'row' }}>

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
            <span>{captionSearch}</span>

            {captionSearch && (
              <button
                onClick={() => setCaptionSearch(null)}
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
          {selectedOption == "watchlist" && !isMobile &&
            <div style={{ width: '20vw', marginTop: '10px', paddingLeft: 100 }}>

              <select
                id="user-select"
                value={selectWatchedUser}
                onChange={(e) => setSelectWatchedUser(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '4px',
                  backgroundColor: '#121212',
                  color: 'white',
                  border: '1px solid skyblue',
                  fontSize: '16px',
                }}
              >
                <option value="--Select-User--">-- Select User --</option>
                {watchlists.map((item) => (
                  <option key={item.username} value={item.username} style={{ padding: 5 }}>
                    {item.username}
                  </option>
                ))}
              </select>
            </div>}
          {selectedOption === "watchlist" && isMobile && (
            <div
              style={{
                width: '100%',
                marginTop: '10px',
                paddingLeft: '20px',
                paddingRight: '20px',
                zIndex: 9999,
                position: 'relative', // required for zIndex to take effect
              }}
            >
              <select
                id="user-select"
                value={selectWatchedUser}
                onChange={(e) => setSelectWatchedUser(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  backgroundColor: '#121212',
                  color: 'white',
                  border: '1px solid skyblue',
                  fontSize: '16px',
                  appearance: 'none',
                  WebkitAppearance: 'none', // for iOS Safari
                  zIndex: 9999,
                  position: 'relative',
                  pointerEvents: 'auto', // allow touch interactions
                }}
              >
                <option value="--Select-User--">-- Select User --</option>
                {watchlists.map((item) => (
                  <option
                    key={item.username}
                    value={item.username}
                    style={{ padding: 5, backgroundColor: '#121212', color: 'white' }}
                  >
                    {item.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedOption == "watchlist" && <div>
            <Button
              onClick={() => { setModalOpen(true) }}
              variant="contained"
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                marginTop: 1,
                marginLeft: 10,
                fontSize: "16px",
                border: "2px white solid",
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#222',
                },
              }}
            >
              Search Users
            </Button>
            <UserPopupModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              selectedPlatform={currentPlatform}
              watchlist={watchlists}
              watchlistUpdate={watchlist}
              onAddUser={addNewUserToList}
            />
          </div>}
        </div>}

        {(() => {
          const normalizedItems = items.map(item => ({
            ...item, currentPlatform, watchlists, watchlist, selectedOption,
            id: item.id || item._id,
            mediaType: item.mediaType || item.media_type,
            mediaSrc: item.mediaSrc || item.video_link || item.media_link,
            likes: item.likes || item.likes_count || item.views,
            description: item.description || item.caption,
            comments: item.comments || [],
            postlink: item.postlink || item.original_video_link || item.post_link,
            userProfileLink: item.userProfileLink || item.user_profile_link || item.profile_link,
            location: item.location || item.place,
            timestamp: adjustTimestamp(item.timestamp || item.upload_date || item.dateTime_of_post_str, selectedPlatform)
          }));

          if (showGridPreview) {
            return (
              <PreviewGrid
                items={normalizedItems}
                platformName={currentPlatform?.name || ''}
                onItemClick={() => setShowGridPreview(false)}
              />
            );
          }

          return (
            <>
              <div style={{ paddingLeft: '20px', paddingTop: '8px' }}>
                <button
                  className="preview-back-btn"
                  onClick={() => setShowGridPreview(true)}
                >
                  <span className="preview-back-btn-arrow">←</span>
                  Back to Grid
                </button>
              </div>
              <ContentCardSlider items={normalizedItems} />
            </>
          );
        })()}

      </div>

    </div>
  );
  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <CircularProgress />
        </Box>
      ) : (
        container
      )}
    </>
  );

}

export default HomePage;