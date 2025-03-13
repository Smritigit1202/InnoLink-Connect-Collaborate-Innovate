import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/Auth";
import "./style.scss";

function Signup() {
  const passwordInput = useRef();
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    fullName: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up • Innolink";
    if (user?.loggedIn) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePassword = () => {
    const input = passwordInput.current;
    input.type = input.type === "password" ? "text" : "password";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: formData.username,
        email: formData.emailOrPhone,
        password: formData.password,
        fullName: formData.fullName,
      });

      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Mobile number or email address"
            required
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="input-field"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="input-field"
            onChange={handleChange}
          />
          <div className="password-wrapper">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="input-field"
              ref={passwordInput}
              onChange={handleChange}
            />
            <button type="button" className="toggle-password" onClick={handleTogglePassword}>
              Show
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Create Account"}
          </button>
        </form>
        <a className="auth-link" onClick={() => navigate("/login")}>
          Already have an account? Login
        </a>
        
      </div>
    </div>
  );
}

export default Signup;
