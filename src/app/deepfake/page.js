
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdOutlineFileUpload } from "react-icons/md";
import { CircularProgress } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import axios from '../lib/axios';
import axiosWsp from '../lib/axioswsp';

import "../home/HomePage.css";
import "./DeepfakeDetect.css";

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
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import Cookie from "../lib/cookie";
import whatsappLogo from "../Assets/whatsappLogo.png"
import telegramLogo from "../Assets/telegramLogo.png"
import ccu from "../Assets/ccu.png"
export default function DeepfakeDetect() {

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



  const [selectedPlatform, setSelectedPlatform] = useState("NONE");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [radio, setRadio] = useState("fake");
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const platforms =  [
      { name: 'Instagram', value: 'INSTAGRAM', icon: instagramLogo },
      { name: 'Twitter', value: 'TWITTER', icon: twitterLogo },
      { name: 'Facebook', value: 'FACEBOOK', icon: facebookLogo },
      { name: 'Snapchat', value: 'SNAPCHAT', icon: snapchatLogo },
      { name: 'Whatsapp', value: 'WHATSAPP', icon: whatsappLogo },
      { name: 'Telegram', value: 'TELEGRAM', icon: telegramLogo },
    ];

  const currentPlatform = platforms.find((p) => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectPlatform = (platform) => {
    window.location.href = '/home'
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(file);
    const previewURL = URL.createObjectURL(file);
    setImagePreview(previewURL);

    // Optional cleanup
    return () => URL.revokeObjectURL(previewURL);
  }
};


  const activeLearning = (media_link, is_correct) => {
    axios.post('/mediaAl', { media_link, is_correct })
      .then(() => { })
      .catch(() => { });
  };
  
const handleUploadClick = () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append('file', selectedFile);
  console.log(selectedFile,"sgs")

  const fileType = selectedFile.type.startsWith('video') ? 'video' : 'img';
  formData.append('file_type', fileType);
  formData.append('input_type', radio === 'fake' ? '0' : '1');

  setLoading(true);
  setResult(null);
  setFeedback(null);

  const endpoint =
    radio === 'fake'
      ? ('/predictFromMedia')
      : fileType=="img"?'/imageViolentNonviolent':'/videoViolentNonviolent';

  axiosWsp
    .post(endpoint, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response) => {
      console.log(response)
      setResult(response.data);
    })
    .catch((e) => {
      alert('Error processing file',e);
    })
    .finally(() => {
      setLoading(false);
    });
};
useEffect(()=>{setResult(null)
  
},[selectedFile,radio])
  return (
    <div className="home-page">
      <div className="top-bar">
        <img
          src={user.name.includes("HITAC")?ccu.src:policeLogo.src}
          alt="Logo"
          className="logo"
          onClick={() => router.push("/homepage")}
          style={{ cursor: "pointer", marginRight: '30px', borderRadius: '100px' }}
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
                  <div style={{ fontSize: '4vh' }}>None</div>
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

            <div style={{
              display: 'flex',
              gap: '60px',
              marginLeft: 'auto',
              marginRight: '30px',
            }}>
              <div className="nav-item" onClick={() => router.push('/deepfake')} >
                <img src={deepfakeIcon.src} alt="Deepfake" />
                <span style={{ fontSize: '25px' }}>Deepfake Detect</span>
              </div>
              <div className="nav-item" onClick={() => router.push('/reverse-search')}>
                <img src={reverseSearchIcon.src} alt="Reverse Search" />
                <span style={{ fontSize: '25px' }}>Reverse Image Search</span>
              </div>
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


        <RadioGroup
          row
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
        >
          <FormControlLabel value="fake" control={<Radio />} label="Fake Detect" />
          <FormControlLabel value="violent" control={<Radio />} label="Violent Detect" />
        </RadioGroup>

        <div className="upload-section">
          <div className="file-input-container">
            <input
              type="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="hidden-file-input"
              id="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              Open file/Image
            </label>
          </div>

          <button className="upload-btn" onClick={handleUploadClick} disabled={loading || !selectedFile}>
            <MdOutlineFileUpload size={30} style={{ marginRight: "4px" }} />
            Upload
          </button>
        </div>

        {loading && (
          <div className="loader-container">
            <CircularProgress />
            <span>Please wait...</span>
          </div>
        )}
{imagePreview && selectedFile && (
  <div className="result-container">
    <div className="preview-media">
      <span className="image-tag">PREVIEW</span>

      {selectedFile.type.startsWith("image") ? (
        <img src={imagePreview} alt="Uploaded preview" />
      ) : selectedFile.type.startsWith("video") ? (
        <video
          key={imagePreview} // 🔁 Forces re-render when src changes
          controls
          width="100%"
          height="auto"
        >
          <source src={imagePreview} type={selectedFile.type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Unsupported file type</p>
      )}
    </div>
  
            {result &&
              <div className="result-box">
                {radio === "fake" ? (
                  <>Image is <strong>{result.label}</strong> with a score of <strong>{(parseFloat(result.score) ).toFixed(2)}%</strong></>
                ) : (
                  <>Image is <strong>{result.label}</strong> with a score of <strong>{(parseFloat(result.score)).toFixed(2)}%</strong></>
                )}
                <div className="feedback-buttons">
                  <ThumbUpOffAltIcon
                    style={{ cursor: 'pointer', color: feedback === 1 ? 'green' : undefined }}
                    onClick={() => { activeLearning(result.s3link, 1); setFeedback(1); }}
                  />
                  <ThumbDownOffAltIcon
                    style={{ cursor: 'pointer', color: feedback === 0 ? 'red' : undefined }}
                    onClick={() => { activeLearning(result.s3link, 0); setFeedback(0); }}
                  />
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}
