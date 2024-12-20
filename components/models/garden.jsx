/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Rail_Lin (https://sketchfab.com/Rail_Lin)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/garden-0561cd730cec40e388df029fa3e4568a
Title: Garden
*/
"use client";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Garden(props) {
  const { nodes, materials } = useGLTF(
    "/models/gardenGltf/scene-transformed.glb"
  );
  const modelRef = useRef();
  useFrame((state, delta, xrFrame) => {
    modelRef.current.position.y =
      -1.7 + Math.sin(state.clock.getElapsedTime() / 2) / 8;
  });
  return (
    <group
      {...props}
      dispose={null}
      ref={modelRef}
      scale={[0.1, 0.1, 0.1]}
      position={[0, -1.7, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <mesh
        name="Lamp004_0"
        castShadow
        receiveShadow
        geometry={nodes.Lamp004_0.geometry}
        material={materials.PaletteMaterial001}
        position={[5.409, 0.163, 0.462]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.101, 0.101, 0.124]}
      />
      <mesh
        name="Glass004_0"
        castShadow
        receiveShadow
        geometry={nodes.Glass004_0.geometry}
        material={materials.PaletteMaterial002}
        position={[5.412, 0.145, 0.462]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.095, 0.095, 0.123]}
      />
      <mesh
        name="Bush3021_0"
        castShadow
        receiveShadow
        geometry={nodes.Bush3021_0.geometry}
        material={materials.Bush3}
        position={[-2.482, 0.361, 10.22]}
        rotation={[-Math.PI / 2, 0, -2.664]}
        scale={[1.065, 1.34, 1.075]}
      />
      <mesh
        name="Bush4018_0"
        castShadow
        receiveShadow
        geometry={nodes.Bush4018_0.geometry}
        material={materials.Bush4}
        position={[6.786, 0.246, 15.162]}
        rotation={[-Math.PI / 2, 0, 0.36]}
        scale={0.964}
      />
    </group>
  );
}

useGLTF.preload("/models/gardenGltf/scene-transformed.glb");
