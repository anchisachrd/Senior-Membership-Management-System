import React from "react";
import { FiEye } from "react-icons/fi";
import { LuFile } from "react-icons/lu";

function DeathDocPreview({ label, docPath }) {



    const fileName = docPath
    
    ? docPath.replace(/^upload\//, "") // remove /upload
    : "ไม่มีไฟล์"

    const isFileAvailable = !!docPath;
  return (
    <div class="mt-5">
      <label
        for="copy_house_member"
        class="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-md p-2 w-full">
        <div className="flex items-center space-x-2">
          <LuFile className="text-gray-700 h-5 w-5" />
          <span className="text-md text-gray-700">
            {fileName}
          </span>
        </div>

        {/* Eye Icon: Open preview in a new window */}
        <a
          href={isFileAvailable ? `http://localhost:3000/death-docs/${docPath}` : "#"}
          
          target="_blank"
          rel="noreferrer"
          className={`ml-auto ${
            isFileAvailable ? "text-gray-600 hover:text-gray-900" : "text-gray-400 cursor-not-allowed pointer-events-none"
          }`}
        >
          <FiEye className={`h-5 w-5 ${isFileAvailable ? "text-blue-500" : "text-gray-400"}`} />
        </a>
      </div>
    </div>
    
  );
}

export default DeathDocPreview;
