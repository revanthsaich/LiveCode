import React, { useState, useEffect } from "react";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css"; // Import a Prism.js theme

const CodeEditor = ({ value, onChange, language }) => {
  const [code, setCode] = useState(value);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    onChange(newCode); // Sync changes with parent component
  };

  return (
    <div className="bg-gray-800 text-white rounded overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-700 sticky top-0 z-10">
        <span className="text-sm font-bold">{language.toUpperCase()}</span>
      </div>

      {/* Scrollable Editor Content */}
      <div className="flex-grow overflow-y-auto">
        <Editor
          value={code}
          onValueChange={handleCodeChange}
          highlight={(code) =>
            highlight(code, languages[language], language)
          }
          padding={16}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            minHeight: "300px",
          }}
          className="bg-gray-800 text-white"
        />
      </div>
    </div>
  );
};

export default CodeEditor;