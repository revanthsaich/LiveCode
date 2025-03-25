import React from "react";
import { FiX } from "react-icons/fi";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, dummyChats = [] }) => {
  return (
    <div
      className={`fixed top-1 left-0 h-full w-80 bg-base-100 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } rounded-r-2xl overflow-hidden`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-base-content">Chat History</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-error hover:text-white rounded-full transition-all duration-300"
          >
            <FiX className="w-6 h-6 text-error" />
          </button>
        </div>

        {/* Chat List */}
        <div className="space-y-4">
          {dummyChats.length > 0 ? (
            dummyChats.map((chat) => (
              <div
                key={chat.id}
                className="p-4 hover:bg-base-200 rounded-2xl cursor-pointer transition-all duration-300 border border-base-300 hover:border-primary"
              >
                <p className="text-base-content font-medium">{chat.text}</p>
                <span className="text-sm text-neutral">{chat.timestamp}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-neutral">No chat history available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;