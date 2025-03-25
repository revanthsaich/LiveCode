import React from "react";

const SaveButton = ({ htmlCode, cssCode, jsCode, layout }) => {
  const handleSave = () => {
    const projectData = {
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      layout,
    };
    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
      Save Project
    </button>
  );
};

export default SaveButton;