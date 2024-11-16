"use client";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect } from "react";
import Garden from "./models/garden";
import SnowHut from "./models/snowHut";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CameraOrbitController = () => {
  const { camera, gl } = useThree();

  useEffect(() => {
    //const controls = new OrbitControls(camera, gl.domElement);
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  return null;
};
const RenderModel = ({ children }) => {
  return (
    <Canvas className={"w-screen h-screen -z-10 relative canvas "}>
      <Suspense fallback={null}>
        <PerspectiveCamera makeDefault position={[-3, -1, -5]} />
        <OrbitControls />

        <directionalLight color="red" position={[0, 5, 0]} intensity={0.3} />
        <SnowHut />
        {/* <Environment preset="sunset" /> */}
      </Suspense>
    </Canvas>
  );
};

export default RenderModel;
