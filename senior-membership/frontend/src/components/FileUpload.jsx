import React, { useState, useEffect } from "react";
import { LuFile } from "react-icons/lu";
import { FiEye } from "react-icons/fi";

const FileUpload = ({ label, name, value, onChange, error, touched }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (value && value instanceof Blob) {  // Ensure it's a valid file
      const url = URL.createObjectURL(value);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [value]);
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange(file);  // Ensure only a file is passed
    }
  };

  const handlePreview = (event) => {
    event.preventDefault();
    if (previewUrl) {
      window.open(previewUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Preview not available for this file.");
    }
  };

  return (
    <div className="mt-5">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleFileChange}  // Use handleFileChange instead of directly passing onChange
        className={`bg-light ${
          error && touched ? "bg-red-100" : "border border-gray-400"
        } text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500`}
      />
      {value instanceof File && (
        <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2 w-full">
          <div className="flex items-center space-x-2">
            <LuFile className="text-gray-700 h-5 w-5" />
            <span className="text-md text-gray-700">{value.name}</span>
          </div>
          <a href="#" onClick={handlePreview} className="text-gray-600 hover:text-gray-900 ml-auto">
            <FiEye className="text-blue-500 h-5 w-5" />
          </a>
        </div>
      )}
      {error && touched && <div className="text-red-600 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FileUpload;
