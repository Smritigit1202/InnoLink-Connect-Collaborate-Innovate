import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ini.scss";

function Ini() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div>
        <h1>Innolink</h1>
        <p className="tagline">   Let's Link Businesses!!</p>
        <div className="btn-container">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="signup-btn" onClick={() => navigate("/accounts/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ini;
