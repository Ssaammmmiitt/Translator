"use client";

import React, { ChangeEvent, useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import FileUpload from "@/components/Inputs/FileUpload";
import LinkPaste from "@/components/Inputs/LinkPaste";
import "regenerator-runtime/runtime";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import TextArea from "@/components/Inputs/TextArea";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import { rtfToText } from "@/lib/rtfToText";
import useTranslate from "@/app/hooks/useTranslate";
import { source } from "framer-motion/client";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favourite, setFavourite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLinkPaste = (text: string) => {
    setSourceText(text);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleFavourite = () => {
    setFavourite(!favourite);
  };

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-20">
      {/* Centering container for the content */}
      <div className="relative p-10 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl inter-var font-bold text-neutral-200">
            TransLator
          </h1>
          <p className="mt-3 text--400 text-white/75">
            TransLator : Global Conversations Made Simple.
          </p>

          <div className="mt-7 sm:mt-2 mx-auto max-w-3xl relative">
            <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div className="relative p-3 z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-800 border-neutral-700 shadow-gray-900/20">
                <TextArea
                  id="source-language"
                  value={sourceText}
                  placeholder="Enter text to translate"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setSourceText(e.target.value)
                  }
                />

                <div className="flex flex-row justify-between w-full p-4 text-white">
                  <span className="cursor-pointer flex space-x-2 flex-row">
                    <SpeechRecognitionComponent setSourceText={setSourceText} />
                    <IconVolume
                      size={22}
                      onClick={() => {
                        handleAudioPlayback(sourceText);
                      }}
                    />
                    {/* File upload component */}

                    <FileUpload handleFileUpload={handleFileUpload} />
                    <LinkPaste handleLinkPaste={handleLinkPaste} />
                  </span>
                  <span className="pr-4 text-sm">{sourceText.length}/2000</span>
                </div>
              </div>

              <div className="relative p-3 z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-800 border-neutral-700 shadow-gray-900/20">
                <TextArea
                  id="target-language"
                  value={targetText}
                  onChange={() => {}}
                  placeholder="Target Language"
                />
                <div className="flex flex-row justify-between w-full">
                  <span className="cursor-pointer flex items-center space-x-2 flex-row">
                    <LanguageSelector
                      selectedLanguage={selectedLanguage}
                      setSelectedLanguage={setSelectedLanguage}
                      languages={languages}
                    />
                    <IconVolume
                      size={22}
                      onClick={() => {
                        handleAudioPlayback(targetText);
                      }}
                    />
                  </span>
                  <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                    <IconCopy
                      size={22}
                      onClick={() => {
                        handleCopyToClipboard;
                      }}
                    />
                    {copied && (
                      <span className="text-sm text-green-500">Copied!</span>
                    )}
                    <IconThumbUp size={22} onClick={() => {}} />
                    <IconThumbDown size={22} />
                    <IconStar
                      size={22}
                      onClick={() => {
                        handleFavourite;
                      }}
                      className={favourite ? "text-yellow-500" : ""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}
