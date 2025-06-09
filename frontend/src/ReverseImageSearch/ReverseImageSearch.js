import React, { useState, useEffect } from 'react';
import '../HomePage/HomePage.css';
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
import { useNavigate } from 'react-router-dom';
import { MdOutlineFileUpload } from 'react-icons/md';

function ReverseImageSearch() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState('NONE');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const platforms = [
    { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
    { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
    { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
    { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
  ];

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.value);
    setMenuOpen(false);
  };

  const currentPlatform = platforms.find(p => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
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
      setShowPreview(false); // Wait until Upload is clicked
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      setShowPreview(true);
    }
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
              <div className="nav-item active">
                <img src={reverseSearchIcon} alt="Reverse Search" />
                <span>Reverse Image Search</span>
              </div>
              <div className="nav-item" onClick={() => navigate('/analytics')}>
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

      {/* Reverse Image Search Section */}
      <div className="reverse-search-container-rev">
        <div className="upload-section-rev">
          <div className="file-input-container-rev">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input-rev"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label-rev">
              Open file/Image
            </label>
          </div>

          <button className="upload-btn-rev" onClick={handleUploadClick}>
            <MdOutlineFileUpload size={16} style={{ marginRight: '4px' }} />
            Upload
          </button>
        </div>

        {imagePreview && showPreview && (
          <div className="result-container-rev">
            <div className="preview-image-rev">
              <span className="image-tag-rev">ORIGINAL</span>
              <img src={imagePreview} alt="Uploaded" />
            </div>
            <div className="result-box-rev">
              Image uploaded successfully
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReverseImageSearch;