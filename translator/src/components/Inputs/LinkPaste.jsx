import React from "react";
import { IconLink } from "@tabler/icons-react";

const LinkPaste = ({ handleLinkPaste }) => {
  return (
    <label
      htmlFor="link-input"
      className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row"
    >
      <IconLink size={20} />
      <input
        type="text"
        id="link input"
        placeholder="Paste link here"
        className="hidden"
        onPaste={handleLinkPaste}
      />
    </label>
  );
};

export default LinkPaste;
