"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function WatchModel() {
  const { scene } = useGLTF("/models/luxury_watch.glb", true);
  
  // Safety check: return null if scene is not loaded
  if (!scene) return null;
  
  const hourRef = useRef<THREE.Object3D>();
  const minuteRef = useRef<THREE.Object3D>();
  const secondRef = useRef<THREE.Object3D>();

  useFrame(() => {
    const now = new Date();
    if (hourRef.current)
      hourRef.current.rotation.z = -((now.getHours() % 12) + now.getMinutes() / 60) * 30 * (Math.PI / 180);
    if (minuteRef.current)
      minuteRef.current.rotation.z = -now.getMinutes() * 6 * (Math.PI / 180);
    if (secondRef.current)
      secondRef.current.rotation.z = -now.getSeconds() * 6 * (Math.PI / 180);
  });

  return (
    <>
      {/* Fallback mesh instead of primitive */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      <Environment preset="studio" />
    </>
  );
}

export default function LuxuryWatch3D() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} />
      <WatchModel />
      {/* OrbitControls disabled for testing */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </Canvas>
  );
}
