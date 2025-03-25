import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { motion } from "framer-motion";
import api from "../utils/api"; // Import the shared Axios instance
import Squares from "./Squares";

const Hero = () => {
  const navigate = useNavigate(); // Hook for navigation
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // Function to generate a random project name
  const generateRandomProjectName = () => {
    const randomString = Math.random().toString(36).substring(7); // Generate a random string
    return `Project_${randomString}`; // Combine with a prefix
  };

  // Handle "Test Code" button click
  const handleTestCodeClick = async () => {
    if (!isLoggedIn) {
      navigate("/auth"); // Redirect to login if not logged in
      return;
    }

    try {
      const projectName = generateRandomProjectName(); // Generate a random project name

      // Create a new project in the backend
      const response = await api.post("/projects/", {
        name: projectName,
        html_code: "<h1>Hello, World!</h1>", // Default HTML code
        css_code: "body { background-color: #f0f0f0; }", // Default CSS code
        js_code: "console.log('Welcome to your project!');", // Default JS code
      });

      // Navigate to the Chat Page with the project name
      navigate(`/chat?project=${encodeURIComponent(response.data.name)}`);
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);
      alert("Failed to create a new project. Please try again.");
    }
  };

  return (
    <section className="hero min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Squares Animated Background */}
      <div
        className="absolute inset-0 z-0 opacity-60 blur-md pointer-events-none"
        style={{ filter: "blur(1px)" }}
      >
        <Squares
          speed={0.3}
          squareSize={35}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          <span className="text-green-400">Code.</span>
          <span className="text-cyan-400">Compile.</span>
          <span className="text-yellow-400">Create.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl max-w-3xl mt-6 text-gray-400"
        >
          Build, preview, and share your web projects with{" "}
          <span className="text-primary">real-time execution</span>. Your personal
          cloud-based coding environment.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex gap-6 mt-8 justify-center"
        >
          <button
            onClick={handleTestCodeClick} // Handle "Test Code" button click
            className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform"
            aria-label={isLoggedIn ? "Test Code" : "Get Started"}
          >
            {isLoggedIn ? "Test Code" : "Get Started"}
          </button>

          <Link to="/projects">
            <button
              className="btn btn-outline btn-lg text-white border-gray-500 hover:bg-gray-800 hover:text-green-400 shadow-lg hover:scale-105 transition-transform"
              aria-label="Explore Projects"
            >
              Explore Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;