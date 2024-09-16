import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

const FileUpload = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursor-pointer">
      <IconPaperclip size={22} />
      <input
        id="file-upload"
        className="hidden"
        type="file"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default FileUpload;
