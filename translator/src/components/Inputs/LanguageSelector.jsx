import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black text-white flex items-center flex-row">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="flex text-sm font-medium flex-row rounded-full py-1 text-green-500 bg-black border-none focus:outline-none"
      >
        {languages.map((language) => (
          <option key={language} className="text-green-500" value={language} >
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
