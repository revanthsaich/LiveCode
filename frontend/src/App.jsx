import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Import the HomePage component
import ChatPage from "./pages/ChatPage";
import Auth from "./pages/Auth";
import ProjectsList from "./components/ProjectsList";

const App = () => {
  return (
    <Router>
        {/* Navbar is always visible */}
        <Navbar />

        {/* Define routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects" element={<ProjectsList />} />
          
          {/* Protected Routes */}
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
    </Router>
  );
};

export default App;