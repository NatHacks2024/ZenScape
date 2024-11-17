"use client";
import React from "react";
import { Activity, HeartPulse, Wind, Music, LoaderPinwheel } from "lucide-react";


const Navigation = ({ onIconClick ,onReset,showGoBack = false}) => {
  const buttonList = [
    {
      label: "Meditation",
      icon: "activity",
      component: Activity,
    },
    {
      label: "Exercise",
      icon: "heart-pulse",
      component: HeartPulse,
    },
    {
      label: "Breathing",
      icon: "wind",
      component: Wind,
    },
    {
      label: "Music",
      icon: "music",
      component: Music,
    },
    {
      label: "Relaxation",
      icon: "loader-pinwheel",
      component: LoaderPinwheel,
    },
  ];

  return (
    <div className="absolute bottom-5 w-full flex justify-center gap-x-12 z-50">
        {buttonList.map((button, index) => (
            <div key={index} className="relative group/item">
                {/* Tooltip */}
                <div className="pointer-events-none absolute -top-8 left-1/2 transform -translate-x-1/2 -translate-y-1 bg-black/40 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-300 ease-in-out">
                    {button.label}
                </div>
                {/* Main Button */}
                <button
                    onClick={() => onIconClick(button.icon)}
                    className="relative block rounded-full p-4 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 hover:border-white active:bg-white/30 transition-all duration-300 ease-in-out cursor-pointer shadow-lg"
                    aria-label={button.label}
                >
                    <button.component
                        size={24}
                        className="text-white"
                    />
                </button>
            </div>
        ))}

        {/* Go Back Button */}
        {showGoBack && (
            <div className="relative group/item">
                <button
                    onClick={onReset}
                    className="relative block rounded-full p-4 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 hover:border-white active:bg-white/30 transition-all duration-300 ease-in-out cursor-pointer shadow-lg"
                >
                    Go Back
                </button>
            </div>
        )}
    </div>
);
};

export default Navigation;
