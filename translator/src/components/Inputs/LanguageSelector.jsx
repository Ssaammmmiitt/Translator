import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className=" bg-[#000000]  flex flex-row rounded-full text-white py-1"
      >
        {languages.map((language) => (
          <option key={language} value={language} >
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
