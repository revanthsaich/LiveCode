import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const API_BASE_URL = "http://localhost:8000/auth"; // Backend URL

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false); // Default: Registration mode
  const navigate = useNavigate();



  const validateInputs = () => {
    if (!username || !password) {
      setMessage("Username and password are required");
      return false;
    }

    if (!isLogin && !email) {
      setMessage("Email is required for registration");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isLogin && !emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${API_BASE_URL}/register/`, {
        username,
        password,
        email,
      });

      setMessage(response.data.message);

      // Automatically log in the user after registration
      const loginResponse = await api.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });

      localStorage.setItem("accessToken", loginResponse.data.access);
      localStorage.setItem("refreshToken", loginResponse.data.refresh);
      localStorage.setItem("username", username);

      window.dispatchEvent(new Event("storage")); // Force Navbar Update

      navigate("/projects"); // Redirect to chat page
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || "Registration failed");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await api.post(`${API_BASE_URL}/login/`, {
        username,
        password,
      });

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("username", username);

      window.dispatchEvent(new Event("storage")); // Force Navbar Update

      setMessage("Login successful");
      navigate("/projects"); // Redirect to chat page
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.error || "Invalid credentials");
      } else {
        setMessage("An unexpected error occurred");
      }
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="bg-base-100 shadow-lg rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          {isLogin ? "Login" : "Register"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full mb-2"
        />

        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full mb-2"
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        {isLogin ? (
          <button onClick={handleLogin} className="btn btn-accent w-full mb-2">
            Login
          </button>
        ) : (
          <button onClick={handleRegister} className="btn btn-primary w-full mb-2">
            Register
          </button>
        )}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="btn btn-outline w-full"
        >
          {isLogin ? "New User? Register" : "Already Registered? Login"}
        </button>

        {message && <p className="mt-4 text-error">{message}</p>}
      </div>
    </div>
  );
};

export default Auth;