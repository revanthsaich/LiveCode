import React, { useState } from "react";
import { FiLayout } from "react-icons/fi";

const LayoutSelector = ({ setLayout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Define layout options
  const layouts = [
    {
      name: "Default",
      thumbnail: "https://via.placeholder.com/150", // Replace with actual image path
      layout: "default",
    },
    {
      name: "All in Row",
      thumbnail: "https://via.placeholder.com/150", // Replace with actual image path
      layout: "all-in-row",
    },
    {
      name: "All in Column",
      thumbnail: "https://via.placeholder.com/150", // Replace with actual image path
      layout: "all-in-column",
    },
    {
      name: "1 Row + 1 Column",
      thumbnail: "https://via.placeholder.com/150", // Replace with actual image path
      layout: "row-column",
    },
  ];

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const selectLayout = (layout) => {
    setLayout(layout);
    setIsOpen(false);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleModal}
        className="btn btn-primary gap-2"
        aria-label="Select Layout"
      >
        <FiLayout className="text-xl" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open" style={{ zIndex: 1000 }}>
          <div className="modal-box bg-base-100 shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Choose a Layout</h2>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
              aria-label="Close Modal"
            >
              ×
            </button>

            {/* Layout Options */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              {layouts.map((layout, index) => (
                <div
                  key={index}
                  className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-colors"
                  onClick={() => selectLayout(layout.layout)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${layout.name} layout`}
                >
                  {/* Thumbnail */}
                  <img
                    src={layout.thumbnail}
                    alt={`${layout.name} layout`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSelector;