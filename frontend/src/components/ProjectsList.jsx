import React, { useEffect, useState } from "react";
import api from "../utils/api"; // Import the shared Axios instance
import { Link, useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu"; // Refresh icon
import { MdDeleteForever } from "react-icons/md"; // Delete icon

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Track refresh state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: "" });
  const navigate = useNavigate();

  // Function to fetch projects
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects/");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error.response?.data || error.message);
    } finally {
      setLoading(false);
      setRefreshing(false); // Reset refreshing state after completion
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch projects on component mount
  }, []);

  const handleCreateProject = async () => {
    if (!newProject.name.trim()) return;
    try {
      const response = await api.post("/projects/", {
        name: newProject.name,
      });
      setProjects((prev) => [...prev, response.data]); // Add the new project to the state
      setIsModalOpen(false);

      // Navigate to the Chat Page with the project name
      navigate(`/chat?project=${encodeURIComponent(response.data.name)}`);
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error.message);
    }
  };

  // Function to delete a project
  const handleDeleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/delete/${projectId}/`); // Ensure the URL matches the backend route
      setProjects((prev) => prev.filter((project) => project.id !== projectId)); // Remove the project from the state
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error.message);
      alert("Failed to delete the project.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header Section */}
      <div className="navbar bg-base-100 shadow-md">
        <h1 className="text-3xl font-bold text-primary">Your Projects</h1>
      </div>

      {/* New Project Button Below Header */}
      <div className="p-6 flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary w-full md:w-auto"
        >
          + New Project
        </button>

        {/* Refresh Button with Icon */}
        <button
          onClick={async () => {
            setRefreshing(true); // Start refreshing
            await fetchProjects(); // Fetch projects again
          }}
          disabled={refreshing} // Disable the button while refreshing
          className="btn btn-secondary gap-2"
        >
          {refreshing ? (
            <span className="loading loading-spinner"></span> // Show spinner while refreshing
          ) : (
            <LuRefreshCcw className="text-xl" />
          )}
          Refresh
        </button>
      </div>

      {/* Projects List */}
      <div className="p-6">
        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-base-300 h-40 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-neutral">No projects found. Start creating one!</p>
        ) : (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="card bg-base-100 shadow-xl p-5 rounded-lg transition-all hover:shadow-2xl relative"
              >
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-sm text-gray mt-2">
                  Created on: {new Date(project.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-around gap-2 mt-4">
                  <Link
                    to={`/chat?project=${encodeURIComponent(project.name)}`}
                    className="btn btn-secondary"
                  >
                    View Project
                  </Link>
                  {/* Delete Button with Icon */}
                  <button
                    onClick={() => handleDeleteProject(project.id)} // Delete button
                    className="btn btn-error gap-2 w-"
                    aria-label="Delete Project"
                  >
                    <MdDeleteForever className="text-xl" /> {/* Use the MdDeleteForever icon */}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold text-center mb-4">Create New Project</h2>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProject.name}
              onChange={(e) => setNewProject({ name: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;