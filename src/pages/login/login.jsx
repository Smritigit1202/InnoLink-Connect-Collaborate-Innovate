import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import "./style.scss";

function Login() {
  const passwordInput = useRef();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toggleAuth, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login • Innolink";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.detail || "Invalid credentials. Please try again.");
        return;
      }

      // Store authentication tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      toggleAuth(); // Update authentication context
      navigate("/", { replace: true });
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <a className="auth-link" onClick={() => navigate("/accounts/signup")}>
  Don't have an account? Sign up
</a>


      </div>
    </div>
  );
}

export default Login;
