"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "./ScrollManager";

/* ── Helpers ──────────────────────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(e0: number, e1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

/* ================================================================== */
/*  Exploding Supplement Canister (High Fidelity)                      */
/* ================================================================== */

function ExplodingCanister({ progress }: { progress: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  
  // Materials
  const capMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#050505",
    metalness: 0.9,
    roughness: 0.2,
    clearcoat: 0.8,
  }), []);

  const sealMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#ffffff",
    metalness: 1.0,
    roughness: 0.1,
  }), []);

  const shellMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#0a0a0c",
    metalness: 0.6,
    roughness: 0.7, // Matte black finish
    clearcoat: 0.1,
    side: THREE.DoubleSide // To render inside of open cylinders
  }), []);

  const innerMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#1a1a1c",
    metalness: 0.9,
    roughness: 0.3,
  }), []);

  const scoopMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#e0e0e0",
    metalness: 0.4,
    roughness: 0.2,
    clearcoat: 1.0,
  }), []);

  // Refs for each layer
  const lid = useRef<THREE.Group>(null);
  const shellTop = useRef<THREE.Group>(null);
  const shellBottom = useRef<THREE.Group>(null);
  const fuelCore = useRef<THREE.Group>(null);
  const scoop = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const p = progress.current ?? 0;
    const t = clock.elapsedTime;
    
    // Smoothly map scroll to explosion factor (0 to 1)
    const explodeT = smoothstep(0.1, 0.8, p);
    
    // Global continuous rotation + explosion rotation
    if (group.current) {
      group.current.rotation.y = t * 0.1 + explodeT * Math.PI * 0.25;
      group.current.rotation.x = 0.1 + explodeT * 0.1;
      group.current.rotation.z = -0.05 + explodeT * 0.05;
    }

    // Apply explosion offsets
    if (lid.current) {
      lid.current.position.y = lerp(1.5, 4.5, explodeT);
      lid.current.rotation.y = explodeT * Math.PI * 1.5; // Twists off
    }
    
    if (shellTop.current) {
      shellTop.current.position.y = lerp(0.6, 2.0, explodeT);
    }
    
    if (shellBottom.current) {
      shellBottom.current.position.y = lerp(-0.6, -2.5, explodeT);
    }

    if (scoop.current) {
      // Scoop floats out smoothly
      scoop.current.position.y = lerp(0, 1.2, explodeT);
      scoop.current.position.x = lerp(0, 2.2, explodeT);
      scoop.current.position.z = lerp(0, 1.5, explodeT);
      scoop.current.rotation.z = lerp(0, Math.PI / 4, explodeT);
      scoop.current.rotation.x = t * 0.3 * explodeT;
      scoop.current.rotation.y = t * 0.5 * explodeT;
    }

    // Pulse effects for the core when exploded
    if (fuelCore.current) {
      const pulse = Math.sin(t * 2) * 0.05 * explodeT;
      fuelCore.current.scale.setScalar(1 + explodeT * 0.1 + pulse);
      fuelCore.current.rotation.y = t * -0.2;
    }
  });

  return (
    <group ref={group}>
      {/* 1. Lid / Cap (Hollow inside) */}
      <group ref={lid}>
        <mesh material={capMat}>
          <cylinderGeometry args={[1.6, 1.6, 0.4, 64, 1, false]} />
        </mesh>
        {/* Shiny inner ring */}
        <mesh material={sealMat} position={[0, -0.2, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 64]} />
        </mesh>
      </group>

      {/* 3. Outer Shell Top Half (Hollow cylinder) */}
      <group ref={shellTop}>
        <mesh material={shellMat}>
          <cylinderGeometry args={[1.5, 1.5, 1.2, 64, 1, true]} />
        </mesh>
        {/* Inner rim */}
        <mesh material={innerMat} position={[0, -0.6, 0]}>
          <ringGeometry args={[1.4, 1.5, 64]} />
        </mesh>
        <mesh material={innerMat} position={[0, 0.6, 0]}>
          <ringGeometry args={[1.4, 1.5, 64]} />
        </mesh>
      </group>

      {/* 4. Glowing Fuel Core (Particles instead of solid block) */}
      <group ref={fuelCore}>
        <Sparkles 
          count={400} 
          scale={[2.2, 3.5, 2.2]} 
          size={2} 
          speed={0.4} 
          opacity={0.8} 
          color="#2997ff" 
        />
        <Sparkles 
          count={200} 
          scale={[1.5, 2.5, 1.5]} 
          size={4} 
          speed={0.8} 
          opacity={1} 
          color="#ffffff" 
        />
        {/* Central glowing core abstract shape */}
        <mesh>
          <icosahedronGeometry args={[0.8, 2]} />
          <meshBasicMaterial color="#2997ff" wireframe transparent opacity={0.15} />
        </mesh>
      </group>

      {/* 5. The Scoop */}
      <group ref={scoop}>
        <mesh material={scoopMat} position={[0, -0.2, 0]} rotation={[Math.PI, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh material={scoopMat} position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.8, 16]} />
        </mesh>
      </group>

      {/* 6. Outer Shell Bottom Half (Hollow cylinder with a base) */}
      <group ref={shellBottom}>
        <mesh material={shellMat}>
          <cylinderGeometry args={[1.5, 1.5, 1.2, 64, 1, true]} />
        </mesh>
        {/* Inner rim */}
        <mesh material={innerMat} position={[0, 0.6, 0]}>
          <ringGeometry args={[1.4, 1.5, 64]} />
        </mesh>
        {/* Solid base */}
        <mesh material={capMat} position={[0, -0.6, 0]}>
          <cylinderGeometry args={[1.55, 1.55, 0.1, 64]} />
        </mesh>
      </group>
    </group>
  );
}

/* ================================================================== */
/*  CameraController — pulls back to give text room                    */
/* ================================================================== */

function CameraController({ progress }: { progress: React.RefObject<number> }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = progress.current ?? 0;
    
    const explodeT = smoothstep(0.1, 0.8, p);
    
    // Increased distance so object doesn't overwhelm the screen
    const targetZ = lerp(8, 16, explodeT); 
    const targetY = lerp(0.5, 0, explodeT);
    
    // Move the camera to keep the object centered or offset based on text
    const targetX = lerp(0, 2, smoothstep(0.2, 0.4, p)) 
                  + lerp(0, -4, smoothstep(0.4, 0.6, p)) 
                  + lerp(0, 2, smoothstep(0.6, 0.8, p));

    camera.position.z = lerp(camera.position.z, targetZ, 0.04);
    camera.position.y = lerp(camera.position.y, targetY, 0.04);
    camera.position.x = lerp(camera.position.x, targetX, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ================================================================== */
/*  LightingRig — dramatic studio lighting                            */
/* ================================================================== */

function LightingRig() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <Environment preset="studio" environmentIntensity={1.0} />
      
      <spotLight
        position={[8, 10, 8]}
        intensity={30}
        angle={0.4}
        penumbra={1}
        color="#ffffff"
      />
      
      <spotLight
        position={[-8, 4, -8]}
        intensity={40}
        angle={0.5}
        penumbra={1}
        color="#2997ff"
      />
      
      <spotLight
        position={[8, 0, -8]}
        intensity={20}
        angle={0.5}
        penumbra={1}
        color="#ffffff"
      />
    </>
  );
}

/* ================================================================== */
/*  Main Scene Export                                                   */
/* ================================================================== */

export default function HeroScene() {
  const { progress } = useScrollProgress();

  return (
    <>
      <color attach="background" args={["#030303"]} />
      <LightingRig />
      <CameraController progress={progress} />

      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <ExplodingCanister progress={progress} />
      </Float>
    </>
  );
}
