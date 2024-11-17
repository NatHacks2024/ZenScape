"use client";
import React from "react";
import {
  Activity,
  HeartPulse,
  Wind,
  Music,
  LoaderPinwheel,
} from "lucide-react";

const Navigation = ({ onIconClick, onReset, showGoBack = false }) => {
  const buttonList = [
    {
      label: "Music",
      icon: "music",
      component: Music,
    },
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
            className="rounded-xl w-24 bg-slate-300 px-3.5 py-2.5 text-sm font-semibold text-dark shadow-lg hover:bg-slate-500 hover:scale-125 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
            //className=""
            aria-label={button.label}
          >
            Start
          </button>
        </div>
      ))}

      {/* Go Back Button */}
      {showGoBack && (
        <div className="relative group/item">
          <button
            onClick={onReset}
            className="rounded-xl bg-slate-300 w-24 px-3.5 py-2.5 text-sm font-semibold text-dark shadow-sm hover:bg-slate-500 hover:scale-125 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
