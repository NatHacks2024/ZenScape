"use client";
import React from "react";
import { Activity, HeartPulse, Wind, Music, LoaderPinwheel } from "lucide-react";


const Navigation = ({ onIconClick ,onReset,showGoBack = false}) => {
  const buttonList = [

    {
      label: "Music",
      icon: "music",
      component: Music,
    }
    //{
    //  //label: "Meditation",
    //  //icon: "activity",
    //  //component: Activity,
    //},//
    //{//
    //  //label: "Exercise",
    //  //icon: "heart-pulse",
    //  //component: HeartPulse,
    //},//
    //{//
    //  //label: "Breathing",
    //  //icon: "wind",
    //  //component: Wind,
    //},
    //{
    //  label: "Music",
    //  icon: "music",
    //  component: Music,
    //},
    //{
    //  //label: "Relaxation",
    //  //icon: "loader-pinwheel",
    //  //component: LoaderPinwheel,
    //},
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
                    className="relative w-40 h-20 flex items-center justify-center before:content-[''] 
                    before:absolute before:w-full before:h-full before:bg-white/10 before:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] 
                    before:border before:border-white/0 before:hover:bg-white/20 before:transition-all before:duration-300 hover:before:scale-105 active:before:bg-white/30"
                    //className=""
                    aria-label={button.label}
                >
                    <button.component
                        size={48}
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
                    className="relative w-40 h-20 flex items-center justify-center before:content-[''] 
                    before:absolute before:w-full before:h-full before:bg-white/10 before:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] 
                    before:border before:border-white/0 before:hover:bg-white/20 before:transition-all before:duration-300 hover:before:scale-105 active:before:bg-white/30"
                >
                    Go Back
                </button>
            </div>
        )}
    </div>
);
};

export default Navigation;
