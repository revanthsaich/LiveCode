import React, { useState, useEffect } from "react";
import api from "../utils/api"; // Import the shared Axios instance
import { useLocation, useNavigate } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import LayoutSelector from "../components/LayoutSelector";
import { FaSave, FaBars } from "react-icons/fa";

const ChatPage = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [layout, setLayout] = useState("default");
  const [projectName, setProjectName] = useState("MyProject"); // Default project name
  const [projects, setProjects] = useState([]); // List of projects
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility state
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the project name from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const initialProjectName = queryParams.get("project") || "MyProject";

  // Fetch the list of projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get("/projects/");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error.response?.data || error.message);
      }
    };

    fetchProjects();
  }, []);

  // Fetch the data for the selected project
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await api.get(`/projects/${initialProjectName}/`);
        const projectData = response.data;

        // Set the project's code in the state
        setHtmlCode(projectData.html_code || "");
        setCssCode(projectData.css_code || "");
        setJsCode(projectData.js_code || "");
        setProjectName(projectData.name); // Update the project name in the state
      } catch (error) {
        console.error("Error fetching project data:", error.response?.data || error.message);
        if (error.response?.status === 404) {
          alert("Project not found. Starting with a new project.");
        }
      }
    };

    fetchProjectData();
  }, [initialProjectName]);

  // Handle saving the current project
  const handleSave = async () => {
    const codeData = {
      name: projectName,
      html_code: htmlCode,
      css_code: cssCode,
      js_code: jsCode,
    };

    try {
      let response;

      // Check if the project exists
      try {
        response = await api.put(`/projects/${projectName}/`, codeData);
      } catch (error) {
        if (error.response?.status === 404) {
          // If the project doesn't exist, create a new one
          response = await api.post("/projects/", codeData);
        } else {
          throw error; // Re-throw the error if it's not a 404
        }
      }

      if (response.status === 200 || response.status === 201) {
        alert("Project saved successfully!");
      }
    } catch (error) {
      console.error("Error saving project:", error.response?.data || error.message);
      alert("An error occurred while saving the project.");
    }
  };

  // Handle opening a project from the sidebar
  const handleOpenProject = async (projectName) => {
    navigate(`/chat?project=${encodeURIComponent(projectName)}`);
    window.location.reload(); // Reload the page to load the new project
  };

  return (
    <div className="h-[100vh] pt-[7vh] flex overflow-hidden bg-base-200">
      {/* Sidebar */}
      <div
        className={`w-64 bg-base-100 border-r border-base-300 p-4 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-lg font-bold mb-4">Projects</h2>
        <ul className="space-y-2">
          {projects.length > 0 ? (
            projects.map((project) => (
              <li
                key={project.id}
                className={`p-2 rounded-lg cursor-pointer hover:bg-base-200 ${
                  project.name === projectName ? "bg-primary text-white" : ""
                }`}
                onClick={() => handleOpenProject(project.name)} // Open the project when clicked
              >
                {project.name}
              </li>
            ))
          ) : (
            <li className="text-neutral text-center">No projects found.</li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header Section */}
        <div className="navbar bg-base-100 shadow-md flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Toggle Sidebar Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
              className="btn btn-ghost btn-sm"
              aria-label="Toggle Sidebar"
            >
              <FaBars className="text-xl" />
            </button>
          </div>
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn btn-primary gap-2"
            aria-label="Save Code"
          >
            <FaSave className="text-xl" />
            Save
          </button>
        </div>

        {/* Editors and Preview */}
        <div className="flex justify-between px-10 py-10 flex-1 gap-4 overflow-hidden">
          {/* Editors */}
          <div className="flex flex-col flex-1 gap-4 overflow-hidden">
            <CodeEditor
              value={htmlCode}
              onChange={setHtmlCode}
              language="html"
            />
            <CodeEditor
              value={cssCode}
              onChange={setCssCode}
              language="css"
            />
            <CodeEditor
              value={jsCode}
              onChange={setJsCode}
              language="javascript"
            />
          </div>

          {/* Preview */}
          <div className="flex flex-1 flex-col gap-4">
            {/* Preview Label */}
            <div className="bg-primary text-white font-bold px-4 py-2 rounded-t-lg">
              Preview
            </div>
            {/* Preview Box */}
            <div className="flex-1 bg-white p-4 rounded-b-lg border border-base-300 overflow-auto">
              <Preview htmlCode={htmlCode} cssCode={cssCode} jsCode={jsCode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;