// app/login/page.js
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "./LoginPage.css";
import policeLogo from "../../../public/policeLogo.png"; // Adjust path as needed

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/home"); // Navigate to /home
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <Image src={policeLogo} alt="Police Logo" className="police-logo" />
      </div>

      <div className="title-banner">Social Media Patrol Tool</div>

      <div className="login-box">
        <label>Username</label>
        <input type="text" placeholder="Enter username" />

        <label>Password</label>
        <input type="password" placeholder="Enter password" />

        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
