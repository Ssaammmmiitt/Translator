"use client";

import React, { ChangeEvent,useState } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import "regenerator-runtime/runtime";
import TextArea from "@/components/Inputs/TextArea"
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition"
import { IconVolume } from "@tabler/icons-react";

export default function Home() {

const[sourceText,setSourceText] = useState<string>("")

const handleAudioPlayback = (text:string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
};

  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      {/* Centering container for the content */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl inter-var font-bold text-neutral-200">
            TransLator
          </h1>
          <p className="mt-3 text--400 text-white/75">
            TransLator : Global Conversations Made Simple.
          </p>

          <div className="mt-7 sm:mt-2 mx-auto max-w-3xl relative">
            <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
              <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-800 border-neutral-700 shadow-gray-900/20">
                <TextArea 
                id="source-language"
                value={sourceText}
                placeholder="Enter text to translate"
                onChange={(e:ChangeEvent<HTMLTextAreaElement>)=> setSourceText(e.target.value)}
                />

                <div className="flex flex-row justify-between w-full p-4">
                  <span className="cursor-pointer flex space-x-2 flex-row">
                    <SpeechRecognitionComponent setSourceText={setSourceText}/>
                    <IconVolume size={22} onClick={()=>{handleAudioPlayback(sourceText)}} />
                    {/* File upload component */}
                  
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WavyBackground>
  );
}
