"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlineFileUpload } from 'react-icons/md';
import { CircularProgress } from '@mui/material';

import axiosWsp from '../lib/axioswsp';
import axios from '../lib/axios';

import '../home/HomePage.css';
import './ReverseImageSearch.css';

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

import ReverseImageSearchList from '../components/ReverseImageSearchList';
import Cookie from '../lib/cookie';

export default function ReverseImageSearch() {

  // // user login check
  // const cookies = Cookie();
  // const user = cookies.getpublicUserCookie();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!user?.loggedIn) {
  //     router.push("/login");
  //   }
  // }, []);

  // if (!user?.loggedIn) return null;



  const [selectedPlatform, setSelectedPlatform] = useState('NONE');
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState([]);

  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
  ];

  const handleSelectPlatform = (platform) => {
    router.push('/home');
  };
  const currentPlatform = platforms.find((p) => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
      setOrigins([]);
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      const response = await axiosWsp.post('/reverse_image_search', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOrigins(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching reverse search results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* Top Bar */}
      <div className="top-bar">
        <img src={policeLogo.src} alt="Logo" className="logo" onClick={() => router.push('/homepage')} style={{ cursor: 'pointer', marginRight: '30px' }} />
        {isMobile ? (
          <img src={menuIcon.src} alt="Menu" className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)} />
        ) : (
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
                    <div key={platform.value} className="dropdown-item" onClick={() => handleSelectPlatform(platform)}>
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
              <div className="nav-item selected">
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
        <img src={backIcon.src} alt="Logout" className="logout-icon" onClick={() => {
          cookies.clearUserCookie();
          router.push("/login");
        }} />
      </div>
      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="mobile-dropdown">
          <div className="dropdown-item-title">Navigation</div>
          <div className="dropdown-item" onClick={() => { router.push('/deepfake'); setMenuOpen(false); }}>
            <img src={deepfakeIcon.src} alt="Deepfake" /> Deepfake Detect
          </div>
          <div className="dropdown-item" onClick={() => { router.push('/reverse-search'); setMenuOpen(false); }}>
            <img src={reverseSearchIcon.src} alt="Reverse Search" /> Reverse Image Search
          </div>
          <div className="dropdown-item" onClick={() => { router.push('/analytics'); setMenuOpen(false); }}>
            <img src={analyticsIcon.src} alt="Analytics" /> Analytics
          </div>
          <div className="dropdown-item-title">Select Platform</div>
          {platforms.map((platform) => (
            <div key={platform.value} className="dropdown-item" onClick={() => handleSelectPlatform(platform)}>
              <img src={platform.icon.src} alt={platform.name} /> {platform.name}
            </div>
          ))}
        </div>
      )}

      {/* Reverse Image Search Section */}
      <div className="reverse-search-container-rev">
        <div className="upload-section-rev">
          <div className="file-input-container-rev">
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleFileChange}
              className="hidden-file-input-rev"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label-rev">
              Open file/Image
            </label>
          </div>
          <button className="upload-btn-rev" onClick={handleUploadClick} disabled={loading || !selectedFile}>
            <MdOutlineFileUpload size={30} style={{ marginRight: '4px' }} /> Upload
          </button>
        </div>

        {loading && (
          <div className="loader-container-rev" style={{ marginLeft: '220px', marginTop: '10px' }}>
            <CircularProgress />
            &nbsp;&nbsp;<span>Please wait...</span>
          </div>
        )}

        {origins.length > 0 && (
          <div className="results-container-rev">
            <ReverseImageSearchList list={origins} setOrigins={setOrigins} />
          </div>
        )}

        {imagePreview && !loading && origins.length === 0 && (
          <div className="result-container-rev">
            <div className="preview-image-rev">
              <span className="image-tag-rev">ORIGINAL</span>
              <img src={imagePreview} alt="Uploaded" />
            </div>
            <div className="result-box-rev">Upload the image to see matches</div>
          </div>
        )}
      </div>
    </div>
  );
}
