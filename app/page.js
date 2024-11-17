"use client";
import React, { useRef, useState } from "react";
import RenderModel from "@/components/RenderModel";
import Navigation from "@/components/index";

export default function Home() {
  const modelRef = useRef();
  const [showGoBack, setShowGoBack] = useState(false); // State to manage the visibility of "Go Back"

  const handleNavigation = (icon) => {
    console.log("Navigation triggered in Home:", icon);

    if (modelRef.current) {
      modelRef.current.handleIconClick(icon);
    }

    if (icon === "music") {
      setShowGoBack(true); // Show "Go Back" when Music is clicked
    } else {
      setShowGoBack(false); // Hide "Go Back" for other icons
    }
  };

  const handleReset = () => {
    console.log("Reset View triggered in Home");
    if (modelRef.current) {
      modelRef.current.resetView(); // Call the reset view method in RenderModel
    }
    setShowGoBack(false); // Hide "Go Back" after resetting
  };

  return (
    <div className="relative h-screen w-screen">
      <RenderModel ref={modelRef} />
      <Navigation
        onIconClick={handleNavigation}
        showGoBack={showGoBack} // Pass showGoBack state
        onReset={handleReset}
      />
    </div>
  );
}
