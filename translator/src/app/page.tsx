"use client";
 
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

 
export default function Home() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
          <div className="text-center">
            
            <h1 className="text-4xl text-white">TransLator</h1>
          </div>
        </div>
      </div>
      </div>
    </WavyBackground>
  );
}
