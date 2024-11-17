"use client";
import React, { useState, useRef, Suspense, useEffect, forwardRef, useImperativeHandle } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import SnowHut from "./models/snowHut";
import Garden from "./models/garden";
import * as THREE from "three";
import gsap from "gsap";

const CameraOrbitController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

const zoomModel = forwardRef((props, ref) => {
  const cameraRef = useRef();
  const sceneRef = useRef();
  const [isAnimating, setIsAnimating] = useState(false);
  const [popup, setPopup] = useState({ visible: false, message: "" });

  useImperativeHandle(ref, () => ({
    handleIconClick: (icon) => {
      console.log("Icon clicked in zoomModel:", icon);
      if (isAnimating) return;
      setIsAnimating(true);
      if (icon === "activity") {
        zoomToModel("snowHut", "Welcome to the Snow Hut!");
      } else if (icon === "heart-pulse") {
        zoomToModel("garden", "Welcome to the Garden!");
      }
    }
  }));

  const zoomToModel = (targetName, message) => {
    console.log("Zooming to:", targetName);
    const scene = sceneRef.current;
    if (!scene) {
      console.log("No scene reference");
      return;
    }
    const model = scene.getObjectByName(targetName);
    console.log("Found model:", model);
    if (model && cameraRef.current) {
      const camera = cameraRef.current;
      const targetPosition = new THREE.Vector3();
      model.getWorldPosition(targetPosition);
      gsap.to(camera.position, {
        x: targetPosition.x + 2,
        y: targetPosition.y + 2,
        z: targetPosition.z + 10,
        duration: 2,
        onUpdate: () => {
          camera.lookAt(targetPosition);
        },
        onComplete: () => {
          setPopup({ visible: true, message });
          setIsAnimating(false);
        },
      });
    }
  };

  return (
    <div className="relative h-screen w-screen">
      {popup.visible && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow-lg z-50">
          {popup.message}
          <button
            onClick={() => setPopup({ visible: false, message: "" })}
            className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
      )}
      <Canvas className="w-screen h-screen -z-10 relative canvas">
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[-3, -1, -5]}
            ref={cameraRef}
          />
          <OrbitControls enabled={!isAnimating} makeDefault />
          <directionalLight color="red" position={[0, 5, 0]} intensity={0.3} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <group ref={sceneRef}>
            <SnowHut name="snowHut" position={[-2, 0, 0]} />
            <Garden name="garden" position={[2, 0, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
});

zoomModel.displayName = 'zoomModel';
export default zoomModel;