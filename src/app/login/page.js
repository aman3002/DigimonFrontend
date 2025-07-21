'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './LoginPage.css';
import policeLogo from '../../../public/PoliceLogo.jpeg';
import deepgaze from '../../../public/deegaze.jpg';
import axios from '../lib/axios';
import CryptoJS from 'crypto-js';
import Cookie from '../lib/cookie';


export default function LoginPage() {
  const router = useRouter();
  const cookies = Cookie();
  const userData = cookies.getpublicUserCookie();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const encryptionKey = 'Rc8XOG8YTNbwUab5';

  useEffect(() => {
    if (userData?.loggedIn) {
      router.push('/home');
    }
  }, []);
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

  function encryptText(keyStr, text) {
    const keyBytes = CryptoJS.SHA256(keyStr);
    const iv = CryptoJS.lib.WordArray.random(16);

    const cipher = CryptoJS.AES.encrypt(text, keyBytes, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7,
    });

    const ciphertextWithIV = iv.concat(cipher.ciphertext);
    return ciphertextWithIV.toString(CryptoJS.enc.Base64);
  }

  const handleSignIn = async () => {
    if (!username || !password) {
      setError('Username and password required');
      return;
    }

    const encryptedPassword = encryptText(encryptionKey, password);

    try {
      const response = await axios.post('/login', {
        username,
        password: encryptedPassword,
      });

      cookies.setpublicUserCookie({
        userId: response.data.userid,
        name: response.data.name,
        username,
        loggedIn: response.data.flag,
      });

      router.push('/home');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <Image
          src={policeLogo}
          alt="Police Logo"
          className="police-logo"
          style={{ borderRadius: '100px' }}
        />
      </div>

      <Image
        src={deepgaze}
        alt="Deepgaze Logo"
        className="police-logo"
        style={{ position: 'absolute', top: '50px', right: '50px', width: '185px' }}
      />

      <div className="title-banner">DigiMonitor</div>

      <div className="login-box">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignIn}>Sign In</button>
        {error && <p style={{ color: 'red', fontSize: 'small' }}>{error}</p>}
      </div>
    </div>
  );
}
