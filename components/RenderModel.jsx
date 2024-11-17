"use client";
import React, {
  Suspense,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import SnowHut from "./models/snowHut";
import gsap from "gsap";

const RenderModel = forwardRef((props, ref) => {
  const cameraRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);

  const initialPosition = { x: -17, y:3, z: -25}; // Original starting position
  const initialLookAt = { x:0, y: 0, z: 0 }; // Original look-at target

  // Function to zoom to the SnowHut
  const handleZoomToSnowHut = () => {
    if (isAnimating || !cameraRef.current) return;

    setIsAnimating(true);

    const targetPosition = { x: -1, y: 0, z: 5 };
    const lookAtPosition = { x: 0, y: 0, z: 0 };

    gsap.to(cameraRef.current.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        cameraRef.current.lookAt(
          lookAtPosition.x,
          lookAtPosition.y,
          lookAtPosition.z
        );
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });
  };


  const handelZoomToGarden = () => {
    
  }

  // Function to reset the camera to the original starting position
  const handleResetView = () => {
    if (isAnimating || !cameraRef.current) return;

    setIsAnimating(true);

    gsap.to(cameraRef.current.position, {
      x: initialPosition.x,
      y: initialPosition.y,
      z: initialPosition.z,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        cameraRef.current.lookAt(
          initialLookAt.x,
          initialLookAt.y,
          initialLookAt.z
        );
      },
      onComplete: () => {
        setIsAnimating(false);
      },
    });
  };

  // Expose methods via ref for parent to call
  useImperativeHandle(ref, () => ({
    handleIconClick: (icon) => {
      if (icon === "music") {
        handleZoomToSnowHut();
      }
    },
    resetView: handleResetView, // Expose the reset view function
  }));

  return (
    <div className="relative w-screen h-screen">
      <Canvas className="w-full h-full">
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[initialPosition.x, initialPosition.y, initialPosition.z]}
            ref={cameraRef}
          />
          <OrbitControls enabled={!isAnimating} />
          <ambientLight intensity={0.5} />
          <SnowHut />
        </Suspense>
      </Canvas>
    </div>
  );
});

RenderModel.displayName = "RenderModel"; // Required for forwardRef components

export default RenderModel;
