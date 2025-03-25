import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import { FaCode } from "react-icons/fa";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  // Update theme on initial render
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for localStorage changes (User Login/Logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/auth"); // Redirect to login page
  };

  // Prevent navigation to Projects if user is not logged in
  const handleProjectsClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    if (!username) {
      navigate("/auth"); // Redirect to login page
    }
    else{
      navigate("/rojects");
    }
  };

  return (
    <nav className="navbar bg-base-100 fixed w-full shadow-lg z-50">
      <div className="navbar-start">
        <div className="flex items-center gap-2 pl-2 cursor-default">
          <FaCode size={30} />
          <span className="text-xl font-bold"  onClick={() => navigate("/")}>CodeCraft</span>
        </div>
      </div>

      <div className="navbar-center hidden font-bold lg:flex">
        <ul className="menu menu-horizontal gap-8 px-1">
          <li>
            <button onClick={() => navigate("/")} className="btn btn-ghost">
              Home
            </button>
          </li>
          <li>
            <button
              onClick={(e) => handleProjectsClick(e)}
              className="btn btn-ghost"
            >
              Projects
            </button>
          </li>
        </ul>
      </div>

      <div className="navbar-end flex items-center">
        {username ? (
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">👤 {username}</span>
            <button
              onClick={handleLogout}
              className="btn bg-gray-200 text-black hover:bg-gray-300 border-none shadow-md transition-transform"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="btn bg-gray-100 text-black hover:bg-gray-200 border-none shadow-md transition-transform"
          >
            Login
          </button>
        )}
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;