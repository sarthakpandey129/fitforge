"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, TorusKnot, Icosahedron, Cylinder } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function BackgroundObjects() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef(new THREE.Vector2());

  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.mouse.x * Math.PI) / 8, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.mouse.y * Math.PI) / 8, 0.05);
    
    if (group.current) {
      group.current.rotation.y = mouse.current.x;
      group.current.rotation.x = -mouse.current.y;
    }
  });

  // Dark obsidian
  const matDark = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#080808",
    metalness: 0.8,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  }), []);

  // Chrome / Silver
  const matChrome = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#e0e0e0",
    metalness: 1.0,
    roughness: 0.15,
  }), []);

  // Glowing blue accent (very subtle)
  const matAccent = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0a0a0c",
    emissive: "#1a3b5c",
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.4,
  }), []);

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2} position={[-6, 3, -6]}>
        <TorusKnot args={[0.8, 0.25, 100, 16]} material={matChrome} />
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5} position={[5, -2, -8]}>
        <Icosahedron args={[1.5, 0]} material={matDark} />
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5} position={[-5, -4, -10]}>
        <Cylinder args={[1, 1, 3, 32]} material={matDark} rotation={[Math.PI / 4, 0, 0]} />
      </Float>

      <Float speed={2.5} rotationIntensity={2} floatIntensity={1} position={[4, 5, -12]}>
        <Icosahedron args={[2, 1]} material={matAccent} />
      </Float>

      <Sparkles count={150} scale={15} size={1.5} speed={0.3} opacity={0.4} color="#ffffff" />
    </group>
  );
}

export default function DashboardSceneCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.2} />
        <Environment preset="studio" environmentIntensity={0.8} />
        
        {/* Cinematic Rim Lighting */}
        <spotLight position={[10, 10, -5]} angle={0.4} penumbra={1} intensity={10} color="#ffffff" />
        <spotLight position={[-10, -10, 5]} angle={0.4} penumbra={1} intensity={20} color="#1a3b5c" />
        
        <BackgroundObjects />
      </Canvas>
    </div>
  );
}
