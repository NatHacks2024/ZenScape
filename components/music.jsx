"use client";
import React, { useState, useRef } from "react";

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
      <div className="flex flex-col items-center p-4 space-y-4 bg-white rounded-lg shadow-md">
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
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>
    );
  };
 
export default AudioPlayer;