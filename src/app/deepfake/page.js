"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineFileUpload } from "react-icons/md";

import "../home/HomePage.css";
import "./DeepfakeDetect.css";

// Images from local imports
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

export default function DeepfakeDetect() {
  const router = useRouter();

  const [selectedPlatform, setSelectedPlatform] = useState("NONE");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [radio, setRadio] = useState("fake");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [score, setScore] = useState(null);
  const [isFake, setIsFake] = useState(false);

  const platforms = [
    { name: "Instagram", value: "INSTAGRAM", icon: instagramLogo },
    { name: "Twitter", value: "TWITTER", icon: twitterLogo },
    { name: "Facebook", value: "FACEBOOK", icon: facebookLogo },
    { name: "Snapchat", value: "SNAPCHAT", icon: snapchatLogo },
  ];

  const currentPlatform = platforms.find((p) => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.value);
    setMenuOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setImagePreview(previewURL);
      const randomScore = (Math.random() * 100).toFixed(2);
      setScore(randomScore);
      setIsFake(randomScore > 50);
    }
  };

  return (
    <div className="home-page">
      <div className="top-bar">
        <img
          src={policeLogo.src}
          alt="Logo"
          className="logo"
          onClick={() => router.push("/homepage")}
          style={{ cursor: "pointer" }}
        />

        {isMobile ? (
          <img
            src={menuIcon.src}
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
                      onClick={() => {
                        handleSelectPlatform(platform);
                      }}
                    >
                      <img src={platform.icon.src} alt={platform.name} />
                      {platform.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-items">
              <div className="nav-item selected">
                <img src={deepfakeIcon.src} alt="Deepfake" />
                <span>Deepfake Detect</span>
              </div>
              <div className="nav-item" onClick={() => router.push("/reverse-search")}>
                <img src={reverseSearchIcon.src} alt="Reverse Search" />
                <span>Reverse Image Search</span>
              </div>
              <div className="nav-item" onClick={() => router.push("/analytics")}>
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
          onClick={() => router.push("/logout")}
        />
      </div>

      {isMobile && menuOpen && (
        <div className="mobile-dropdown">
          <div className="dropdown-item-title">Navigation</div>
          <div className="dropdown-item" onClick={() => { router.push("/deepfake"); setMenuOpen(false); }}>
            <img src={deepfakeIcon.src} alt="Deepfake" />
            Deepfake Detect
          </div>
          <div className="dropdown-item" onClick={() => { router.push("/reverse-search"); setMenuOpen(false); }}>
            <img src={reverseSearchIcon.src} alt="Reverse Search" />
            Reverse Image Search
          </div>
          <div className="dropdown-item" onClick={() => { router.push("/analytics"); setMenuOpen(false); }}>
            <img src={analyticsIcon.src} alt="Analytics" />
            Analytics
          </div>

          <div className="dropdown-item-title">Select Platform</div>
          {platforms.map((platform) => (
            <div
              key={platform.value}
              className="dropdown-item"
              onClick={() => {
                handleSelectPlatform(platform);
              }}
            >
              <img src={platform.icon.src} alt={platform.name} />
              {platform.name}
            </div>
          ))}
        </div>
      )}

      <div className="deepfake-detect-container">
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="fake"
              checked={radio === "fake"}
              onChange={() => setRadio("fake")}
            />
            Fake Detect
          </label>
          <label>
            <input
              type="radio"
              value="violent"
              checked={radio === "violent"}
              onChange={() => setRadio("violent")}
            />
            Violent Detect
          </label>
        </div>

        <div className="upload-section">
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden-file-input"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              Open file/Image
            </label>
          </div>

          <button className="upload-btn" onClick={handleUploadClick}>
            <MdOutlineFileUpload size={16} style={{ marginRight: "4px" }} />
            Upload
          </button>
        </div>

        {imagePreview && (
          <div className="result-container">
            <div className="preview-image">
              <span className="image-tag">ORIGINAL</span>
              <img src={imagePreview} alt="Uploaded" />
            </div>
            <div className="result-box">
              {radio === "fake" ? (
                <>
                  Image is <strong>{isFake ? "Fake" : "Real"}</strong> with a score of <strong>{score}%</strong>
                </>
              ) : (
                <>
                  Image is <strong>{isFake ? "Violent" : "Non-violent"}</strong> with a score of <strong>{score}%</strong>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
