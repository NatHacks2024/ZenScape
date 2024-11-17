"use client";
import React, { useRef, useState } from "react";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/index";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const handlePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        console.error('Audio playback error:', err);
        setError('Unable to play audio');
      }
    }
  };

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      <audio
        ref={audioRef}
        src="/music/perfect-beauty-191271.mp3"
        onError={(e) => {
          console.error('Audio error:', e);
          setError('Failed to load audio file');
        }}
        onEnded={() => setIsPlaying(false)}
      />
      
      <button
        onClick={handlePlayPause}
        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const modelRef = useRef();
  const [showGoBack, setShowGoBack] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const handleNavigation = (icon) => {
    console.log("Navigation triggered in Home:", icon);
    if (modelRef.current) {
      modelRef.current.handleIconClick(icon);
    }
    if (icon === "music") {
      setShowGoBack(true);
      setShowAudioPlayer(true);
    } else {
      setShowGoBack(false);
      setShowAudioPlayer(false);
    }
  };

  const handleReset = () => {
    console.log("Reset View triggered in Home");
    if (modelRef.current) {
      modelRef.current.resetView();
    }
    setShowGoBack(false);
    setShowAudioPlayer(false);
  };

  return (
    <div className="relative h-screen w-screen">
      <RenderModel ref={modelRef} />
      <Navigation
        onIconClick={handleNavigation}
        showGoBack={showGoBack}
        onReset={handleReset}
      />
      {showAudioPlayer && <AudioPlayer />}
    </div>
  );
}