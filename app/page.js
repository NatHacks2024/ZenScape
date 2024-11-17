"use client";
import React, { useRef, useState, useEffect } from "react";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/index";


const MUSIC_LIBRARY = {
  positive: [
    '/music/positive/perfect-beauty-191271.mp3',
    '/music/positive/simple-way-neutral-dreamy-background-music-199363.mp3',
    '/music/positive/the-cradle-of-your-soul-15700.mp3',
    '/music/positive/whip-afro-dancehall-music-110235.mp3',
    '/music/positive/new-beginning-hopeful-and-inspirational-music-246942.mp3',
    '/music/positive/embrace-12278.mp3',
    '/music/positive/background-music-instrumental-207886.mp3',
  ],
  neutral: [
    '/music/neutral/beautiful-piano-amp-flute-instrumental-inspiring-music-233692.mp3',
    '/music/neutral/calm-piano-music-254992.mp3',
    '/music/neutral/please-calm-my-mind-125566.mp3',
    '/music/neutral/pondering-weak-and-weary-193890.mp3'
    
  ]
};

const getRandomSong = (mood) => {
  
  const songList = mood.toLowerCase() === 'neutral' ? 
    MUSIC_LIBRARY.neutral : 
    MUSIC_LIBRARY.positive;
  
  const randomIndex = Math.floor(Math.random() * songList.length);
  return songList[randomIndex];
};

const AudioPlayer = ({ mood = 'neutral' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);

  // Select a new random song when mood changes
  useEffect(() => {
    const newSong = getRandomSong(mood);
    setCurrentSong(newSong);
    
    if (audioRef.current) {
      audioRef.current.src = newSong;
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error('Error playing new mood music:', err);
          setError('Unable to play audio for current mood');
        });
      }
    }
  }, [mood]);

  // Select a new random song when current song ends
  const handleSongEnd = () => {
    setIsPlaying(false);
    const newSong = getRandomSong(mood);
    setCurrentSong(newSong);
    if (audioRef.current) {
      audioRef.current.src = newSong;
    }
  };

  const handlePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          // If no song is selected yet, select one
          if (!currentSong) {
            const newSong = getRandomSong(mood);
            setCurrentSong(newSong);
            audioRef.current.src = newSong;
          }
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (err) {
        console.error('Audio playback error:', err);
        setError('Unable to play audio');
      }
    }
  };

  // Extract song name from path for display
  const getCurrentSongName = () => {
    if (!currentSong) return '';
    const parts = currentSong.split('/');
    const filename = parts[parts.length - 1];
    return filename.replace('.mp3', '').replace(/-/g, ' ');
  };

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      <audio
        ref={audioRef}
        src={currentSong}
        onError={(e) => {
          console.error('Audio error:', e);
          setError('Failed to load audio file');
        }}
        onEnded={handleSongEnd}
      />
      
      <div className="flex flex-col items-center space-y-2">
        <div className="text-sm text-gray-600">
          {getCurrentSongName()}
        </div>
        
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
    </div>
  );
};

export default function Home() {
  const modelRef = useRef();
  const [showGoBack, setShowGoBack] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentMood, setCurrentMood] = useState('neutral');

  const updateMood = (newMood) => {
    setCurrentMood(newMood);
  };

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
      {showAudioPlayer && <AudioPlayer mood={currentMood} />}
    </div>
  );
}