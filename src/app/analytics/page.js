"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import "./Analytics.css";

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
import InstagramAnalytics from "../components/insta_analytics";
import Cookie from "../lib/cookie";


export default function Analytics() {

  // // // user login check
  // const cookies = Cookie();
  // const user = cookies.getpublicUserCookie();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!user?.loggedIn) {
  //     router.push("/login");
  //   }
  // }, []);

  // if (!user?.loggedIn) return null;




  const [selectedPlatform, setSelectedPlatform] = useState("NONE");
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const platforms = [
    { name: "Instagram", value: "INSTAGRAM", icon: instagramLogo },
    { name: "Twitter", value: "TWITTER", icon: twitterLogo },
    { name: "Facebook", value: "FACEBOOK", icon: facebookLogo },
    { name: "Snapchat", value: "SNAPCHAT", icon: snapchatLogo },
  ];

  const currentPlatform = platforms.find(p => p.value === selectedPlatform);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelectPlatform = (platform) => {
    setSelectedPlatform(platform.value);
    setMenuOpen(false);
  };

  return (
    <div >
      <div className="top-bar">
        <img
          src={policeLogo.src}
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
                        router.push("/home");
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
              <div className="nav-item" onClick={() => router.push("/deepfake")}>
                <img src={deepfakeIcon.src} alt="Deepfake" />
                <span>Deepfake Detect</span>
              </div>
              <div className="nav-item" onClick={() => router.push("/reverse-search")}>
                <img src={reverseSearchIcon.src} alt="Reverse Search" />
                <span>Reverse Image Search</span>
              </div>
              <div className="nav-item active">
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
                router.push("/home");
              }}
            >
              <img src={platform.icon.src} alt={platform.name} />
              {platform.name}
            </div>
          ))}
        </div>
      )}





      {/* intagram analytics start here  */}

      <InstagramAnalytics />
    </div>
  );
}
